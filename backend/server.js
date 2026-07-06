const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Połączenie z bazą danych SQLite
const db = new sqlite3.Database('./learning_center.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

// Inicjalizacja bazy danych - tworzenie wszystkich tabel
function initializeDatabase() {
  // Tabela użytkowników
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela kursów
  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      thumbnail TEXT,
      duration TEXT,
      level TEXT,
      price REAL DEFAULT 0,
      is_free BOOLEAN DEFAULT 0,
      created_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);

  // Tabela modułów kursu
  db.run(`
    CREATE TABLE IF NOT EXISTS modules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      order_index INTEGER,
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )
  `);

  // Tabela lekcji
  db.run(`
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      module_id INTEGER,
      title TEXT NOT NULL,
      content TEXT,
      video_url TEXT,
      duration INTEGER,
      order_index INTEGER,
      FOREIGN KEY (module_id) REFERENCES modules(id)
    )
  `);

  // Tabela quizów
  db.run(`
    CREATE TABLE IF NOT EXISTS quizzes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER,
      title TEXT NOT NULL,
      passing_score INTEGER DEFAULT 70,
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )
  `);

  // Tabela pytań quizowych
  db.run(`
    CREATE TABLE IF NOT EXISTS quiz_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quiz_id INTEGER,
      question TEXT NOT NULL,
      options TEXT NOT NULL,
      correct_answer INTEGER,
      explanation TEXT,
      scenario TEXT,
      FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
    )
  `);

  // Tabela slajdów szkoleniowych
  db.run(`
    CREATE TABLE IF NOT EXISTS slides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER,
      slide_number INTEGER,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      notes TEXT,
      order_index INTEGER DEFAULT 0,
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )
  `);

  // Tabela handbook (podręcznik/dokumentacja)
  db.run(`
    CREATE TABLE IF NOT EXISTS handbook (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER,
      chapter_number INTEGER,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      order_index INTEGER DEFAULT 0,
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )
  `);

  // Tabela zapisów na kursy
  db.run(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      course_id INTEGER,
      enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME,
      payment_status TEXT DEFAULT 'pending',
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )
  `);

  // Tabela postępów użytkowników
  db.run(`
    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      lesson_id INTEGER,
      completed BOOLEAN DEFAULT 0,
      completed_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (lesson_id) REFERENCES lessons(id)
    )
  `);

  // Tabela wyników quizów
  db.run(`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      quiz_id INTEGER,
      score INTEGER,
      passed BOOLEAN,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating tables:', err.message);
    } else {
      console.log('All tables created successfully.');
      
      // Migration: Add created_by column to courses if it doesn't exist
      db.all("PRAGMA table_info(courses)", (err, columns) => {
        const hasCreatedBy = columns.some(col => col.name === 'created_by');
        if (!hasCreatedBy) {
          db.run("ALTER TABLE courses ADD COLUMN created_by INTEGER", (err) => {
            if (!err) console.log('Added created_by column to courses table');
          });
        }
      });
      
      createDefaultData();
    }
  });

  // Runtime migrations - add columns if missing (ignoruj błąd jeśli kolumna już istnieje)
  db.all("PRAGMA table_info(courses)", (err, columns) => {
    if (!columns) return;
    const names = columns.map(c => c.name);
    if (!names.includes('is_published')) {
      db.run("ALTER TABLE courses ADD COLUMN is_published INTEGER DEFAULT 1", () => {});
    }
  });
  db.all("PRAGMA table_info(quiz_questions)", (err, columns) => {
    if (!columns) return;
    const names = columns.map(c => c.name);
    if (!names.includes('scenario')) {
      db.run("ALTER TABLE quiz_questions ADD COLUMN scenario TEXT", () => {});
    }
    if (!names.includes('explanation')) {
      db.run("ALTER TABLE quiz_questions ADD COLUMN explanation TEXT", () => {});
    }
  });
}
async function createDefaultData() {
  // Użytkownicy testowi
  const defaultUsers = [
    { email: 'admin@test.com', password: 'admin', role: 'admin', name: 'Admin User' },
    { email: 'trainer@test.com', password: 'trainer', role: 'trainer', name: 'Trainer Smith' },
    { email: 'user@test.com', password: 'user', role: 'user', name: 'John Doe' }
  ];

  for (const user of defaultUsers) {
    db.get('SELECT * FROM users WHERE email = ?', [user.email], async (err, row) => {
      if (!row) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        db.run(
          'INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)',
          [user.email, hashedPassword, user.role, user.name],
          (err) => {
            if (!err) console.log(`Default user created: ${user.email}`);
          }
        );
      }
    });
  }

  // Sprawdź czy już są kursy w bazie
  db.get('SELECT COUNT(*) as count FROM courses', async (err, row) => {
    if (!err && row.count === 0) {
      createSampleCourses();
    }
  });
}

// Tworzenie przykładowych kursów
function createSampleCourses() {
  const courses = [
    {
      title: 'AI Governance & Ethics',
      description: 'Learn about AI governance, EU AI Act, and ethical AI practices.',
      thumbnail: '/images/ai-governance.jpg',
      duration: '4 hours',
      level: 'Intermediate',
      price: 0,
      is_free: 1,
      modules: [
        {
          title: 'Introduction to AI Governance',
          description: 'Understanding the fundamentals of AI governance',
          lessons: [
            { title: 'What is AI Governance?', content: 'AI Governance is a framework of rules, practices, and processes...', duration: 15 },
            { title: 'Why AI Governance Matters', content: 'In today\'s rapidly evolving AI landscape...', duration: 20 }
          ]
        },
        {
          title: 'EU AI Act Overview',
          description: 'Deep dive into the EU AI Act regulations',
          lessons: [
            { title: 'Risk Tiers in EU AI Act', content: 'The EU AI Act categorizes AI systems into different risk levels...', duration: 25 },
            { title: 'Compliance Requirements', content: 'Organizations must adhere to specific compliance requirements...', duration: 30 }
          ]
        }
      ],
      quiz: {
        title: 'AI Governance Final Quiz',
        passing_score: 70,
        questions: [
          {
            question: 'What is the primary purpose of AI Governance?',
            options: JSON.stringify(['To slow down AI development', 'To ensure ethical and responsible AI use', 'To eliminate all AI systems', 'To increase costs']),
            correct_answer: 1
          },
          {
            question: 'Which risk tier in the EU AI Act represents the highest risk?',
            options: JSON.stringify(['Low Risk', 'Minimal Risk', 'High Risk', 'Unacceptable Risk']),
            correct_answer: 3
          }
        ]
      }
    },
    {
      title: 'Machine Learning Fundamentals',
      description: 'Master the basics of machine learning and build your first ML models.',
      thumbnail: '/images/ml-fundamentals.jpg',
      duration: '8 hours',
      level: 'Beginner',
      price: 99.99,
      is_free: 0,
      modules: [
        {
          title: 'Introduction to Machine Learning',
          description: 'Getting started with ML concepts',
          lessons: [
            { title: 'What is Machine Learning?', content: 'Machine Learning is a subset of artificial intelligence...', duration: 20 },
            { title: 'Types of Machine Learning', content: 'There are three main types of ML: Supervised, Unsupervised, and Reinforcement Learning...', duration: 25 }
          ]
        }
      ],
      quiz: {
        title: 'ML Fundamentals Quiz',
        passing_score: 75,
        questions: [
          {
            question: 'What type of learning uses labeled data?',
            options: JSON.stringify(['Unsupervised Learning', 'Supervised Learning', 'Reinforcement Learning', 'Deep Learning']),
            correct_answer: 1
          }
        ]
      }
    }
  ];

  courses.forEach((course, courseIndex) => {
    db.run(
      'INSERT INTO courses (title, description, thumbnail, duration, level, price, is_free) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [course.title, course.description, course.thumbnail, course.duration, course.level, course.price, course.is_free],
      function(err) {
        if (err) {
          console.error('Error creating course:', err);
          return;
        }
        
        const courseId = this.lastID;
        console.log(`Sample course created: ${course.title}`);

        // Dodaj moduły
        course.modules.forEach((module, moduleIndex) => {
          db.run(
            'INSERT INTO modules (course_id, title, description, order_index) VALUES (?, ?, ?, ?)',
            [courseId, module.title, module.description, moduleIndex + 1],
            function(err) {
              if (err) return;
              
              const moduleId = this.lastID;

              // Dodaj lekcje
              module.lessons.forEach((lesson, lessonIndex) => {
                db.run(
                  'INSERT INTO lessons (module_id, title, content, duration, order_index) VALUES (?, ?, ?, ?, ?)',
                  [moduleId, lesson.title, lesson.content, lesson.duration, lessonIndex + 1]
                );
              });
            }
          );
        });

        // Dodaj quiz
        if (course.quiz) {
          db.run(
            'INSERT INTO quizzes (course_id, title, passing_score) VALUES (?, ?, ?)',
            [courseId, course.quiz.title, course.quiz.passing_score],
            function(err) {
              if (err) return;
              
              const quizId = this.lastID;

              // Dodaj pytania quizowe
              course.quiz.questions.forEach((question) => {
                db.run(
                  'INSERT INTO quiz_questions (quiz_id, question, options, correct_answer) VALUES (?, ?, ?, ?)',
                  [quizId, question.question, question.options, question.correct_answer]
                );
              });
            }
          );
        }
      }
    );
  });
}

// ============ ENDPOINTS API ============

// Główny endpoint - informacja o API
app.get('/', (req, res) => {
  res.json({
    name: 'Learning Center API',
    version: '2.0.0',
    endpoints: {
      'POST /api/register': 'Register a new user',
      'POST /api/login': 'Login user',
      'GET /api/courses': 'Get all courses',
      'GET /api/courses/:id': 'Get course details',
      'POST /api/enroll': 'Enroll in a course',
      'GET /api/my-courses/:userId': 'Get user enrolled courses',
      'POST /api/lesson/complete': 'Mark lesson as completed',
      'POST /api/quiz/submit': 'Submit quiz answers',
      'GET /api/certificate/:userId/:courseId': 'Generate certificate PDF'
    }
  });
});

// Endpoint rejestracji
app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (row) return res.status(400).json({ error: 'User already exists' });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.run(
        'INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, 'user', name || email.split('@')[0]],
        function(err) {
          if (err) return res.status(500).json({ error: 'Error creating user' });
          res.status(201).json({
            message: 'User created successfully',
            user: { id: this.lastID, email, role: 'user', name: name || email.split('@')[0] }
          });
        }
      );
    } catch (error) {
      res.status(500).json({ error: 'Error hashing password' });
    }
  });
});

// Endpoint logowania
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error verifying password' });
    }
  });
});

// Pobierz wszystkie kursy (tylko zatwierdzone dla zwykłych users)
app.get('/api/courses', (req, res) => {
  const { role, userId } = req.query;
  
  let query;
  let params = [];

  if (role === 'admin') {
    // Admin widzi wszystko
    query = 'SELECT * FROM courses ORDER BY created_at DESC';
  } else if (role === 'trainer' && userId) {
    // Trainer widzi swoje (każdy status) + zatwierdzone innych
    query = `SELECT * FROM courses WHERE status = 'approved' OR created_by = ? ORDER BY created_at DESC`;
    params = [userId];
  } else {
    // User widzi tylko zatwierdzone
    query = `SELECT * FROM courses WHERE status = 'approved' OR status IS NULL ORDER BY created_at DESC`;
  }

  db.all(query, params, (err, courses) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ courses });
  });
});

// Pobierz szczegóły kursu z modułami i lekcjami
app.get('/api/courses/:id', (req, res) => {
  const { id } = req.params;

  db.get(`SELECT c.*, u.name as trainer_name, u.email as trainer_email 
    FROM courses c LEFT JOIN users u ON c.created_by = u.id 
    WHERE c.id = ?`, [id], (err, course) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // Pobierz moduły
    db.all('SELECT * FROM modules WHERE course_id = ? ORDER BY order_index', [id], (err, modules) => {
      if (err) return res.status(500).json({ error: 'Database error' });

      // Dla każdego modułu pobierz lekcje
      const modulesPromises = modules.map((module) => {
        return new Promise((resolve) => {
          db.all('SELECT * FROM lessons WHERE module_id = ? ORDER BY order_index', [module.id], (err, lessons) => {
            resolve({ ...module, lessons: lessons || [] });
          });
        });
      });

      Promise.all(modulesPromises).then((modulesWithLessons) => {
        // Pobierz quiz
        db.get('SELECT * FROM quizzes WHERE course_id = ?', [id], (err, quiz) => {
          if (quiz) {
            db.all('SELECT * FROM quiz_questions WHERE quiz_id = ?', [quiz.id], (err, questions) => {
              res.json({
                ...course,
                modules: modulesWithLessons,
                quiz: { ...quiz, questions: questions || [] }
              });
            });
          } else {
            res.json({
              ...course,
              modules: modulesWithLessons,
              quiz: null
            });
          }
        });
      });
    });
  });
});

// Zapisz się na kurs
app.post('/api/enroll', (req, res) => {
  const { userId, courseId } = req.body;

  // Sprawdź czy użytkownik już jest zapisany
  db.get('SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?', [userId, courseId], (err, enrollment) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (enrollment) return res.status(400).json({ error: 'Already enrolled in this course' });

    // Sprawdź czy kurs jest darmowy
    db.get('SELECT * FROM courses WHERE id = ?', [courseId], (err, course) => {
      if (err || !course) return res.status(404).json({ error: 'Course not found' });

      const paymentStatus = course.is_free ? 'completed' : 'pending';

      db.run(
        'INSERT INTO enrollments (user_id, course_id, payment_status) VALUES (?, ?, ?)',
        [userId, courseId, paymentStatus],
        function(err) {
          if (err) return res.status(500).json({ error: 'Error enrolling in course' });
          res.status(201).json({
            message: 'Enrolled successfully',
            enrollmentId: this.lastID,
            paymentRequired: !course.is_free
          });
        }
      );
    });
  });
});

// Pobierz kursy użytkownika
app.get('/api/my-courses/:userId', (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT c.*, e.enrolled_at, e.completed_at, e.payment_status
    FROM courses c
    JOIN enrollments e ON c.id = e.course_id
    WHERE e.user_id = ?
    ORDER BY e.enrolled_at DESC
  `;

  db.all(query, [userId], (err, courses) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ courses });
  });
});

// Oznacz lekcję jako ukończoną
app.post('/api/lesson/complete', (req, res) => {
  const { userId, lessonId } = req.body;

  // Sprawdź czy już istnieje rekord postępu
  db.get('SELECT * FROM user_progress WHERE user_id = ? AND lesson_id = ?', [userId, lessonId], (err, progress) => {
    if (progress) {
      // Zaktualizuj
      db.run(
        'UPDATE user_progress SET completed = 1, completed_at = CURRENT_TIMESTAMP WHERE user_id = ? AND lesson_id = ?',
        [userId, lessonId],
        (err) => {
          if (err) return res.status(500).json({ error: 'Database error' });
          res.json({ message: 'Lesson marked as completed' });
        }
      );
    } else {
      // Utwórz nowy rekord
      db.run(
        'INSERT INTO user_progress (user_id, lesson_id, completed, completed_at) VALUES (?, ?, 1, CURRENT_TIMESTAMP)',
        [userId, lessonId],
        (err) => {
          if (err) return res.status(500).json({ error: 'Database error' });
          res.json({ message: 'Lesson marked as completed' });
        }
      );
    }
  });
});

// Prześlij odpowiedzi quizu
app.post('/api/quiz/submit', (req, res) => {
  const { userId, quizId, answers } = req.body;

  // Pobierz pytania quizowe
  db.all('SELECT * FROM quiz_questions WHERE quiz_id = ?', [quizId], (err, questions) => {
    if (err || !questions) return res.status(404).json({ error: 'Quiz not found' });

    // Oblicz wynik
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);

    // Pobierz passing_score
    db.get('SELECT * FROM quizzes WHERE id = ?', [quizId], (err, quiz) => {
      const passed = score >= (quiz?.passing_score || 70);

      // Zapisz wynik
      db.run(
        'INSERT INTO quiz_results (user_id, quiz_id, score, passed) VALUES (?, ?, ?, ?)',
        [userId, quizId, score, passed ? 1 : 0],
        (err) => {
          if (err) return res.status(500).json({ error: 'Error saving quiz result' });

          // Jeśli zdany, oznacz kurs jako ukończony
          if (passed) {
            db.get('SELECT course_id FROM quizzes WHERE id = ?', [quizId], (err, quizData) => {
              if (quizData) {
                db.run(
                  'UPDATE enrollments SET completed_at = CURRENT_TIMESTAMP WHERE user_id = ? AND course_id = ?',
                  [userId, quizData.course_id]
                );
              }
            });
          }

          res.json({
            score,
            passed,
            correctCount,
            totalQuestions: questions.length,
            message: passed ? 'Congratulations! You passed the quiz!' : 'You need to score at least ' + (quiz?.passing_score || 70) + '% to pass.'
          });
        }
      );
    });
  });
});

// Generuj certyfikat PDF
app.get('/api/certificate/:userId/:courseId', (req, res) => {
  const { userId, courseId } = req.params;

  const query = `
    SELECT u.name, u.email, c.title, c.duration, e.completed_at,
      t.name as trainer_name
    FROM users u
    JOIN enrollments e ON u.id = e.user_id
    JOIN courses c ON e.course_id = c.id
    LEFT JOIN users t ON c.created_by = t.id
    WHERE u.id = ? AND c.id = ? AND e.completed_at IS NOT NULL
  `;

  db.get(query, [userId, courseId], (err, data) => {
    if (err || !data) {
      return res.status(404).json({ error: 'Certificate not available. Complete the course first.' });
    }

    const durationMatch = (data.duration || '').match(/\d+/);
    const cpeHours = durationMatch ? parseInt(durationMatch[0]) : 0;
    const completedDate = new Date(data.completed_at).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });
    const certId = `LC-${userId}-${courseId}-${new Date(data.completed_at).getFullYear()}`;

    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=certificate-${certId}.pdf`);
    doc.pipe(res);

    const W = doc.page.width;
    const H = doc.page.height;

    // Background
    doc.rect(0, 0, W, H).fill('#0c0d12');

    // Red accent bar left
    doc.rect(0, 0, 8, H).fill('#cc0000');

    // Red accent bar top
    doc.rect(8, 0, W - 16, 6).fill('#cc0000');

    // Red accent bar bottom
    doc.rect(8, H - 6, W - 16, 6).fill('#cc0000');

    // Red accent bar right
    doc.rect(W - 8, 0, 8, H).fill('#cc0000');

    // Inner subtle border
    doc.rect(24, 20, W - 48, H - 40).lineWidth(0.5).stroke('rgba(255,255,255,0.1)');

    // Header: Logo area
    doc.circle(60, 50, 18).lineWidth(3).stroke('#cc0000');
    doc.arc(60, 50, 13, Math.PI * 0.2, Math.PI * 0.8).lineWidth(3).stroke('#cc0000');

    doc.fontSize(13).font('Helvetica-Bold').fillColor('#ffffff')
       .text('Learning Center', 90, 40);
    doc.fontSize(9).font('Helvetica').fillColor('#888888')
       .text('Professional Training Platform', 90, 56);

    // Cert ID top right
    doc.fontSize(8).fillColor('#555555')
       .text(certId, W - 260, 45, { width: 220, align: 'right' });

    // Main "Certificate of Completion" title
    doc.fontSize(36).font('Helvetica-Bold').fillColor('#cc0000')
       .text('Certificate of Completion', 60, 95, { width: W - 120, align: 'center' });

    // Decorative line
    doc.moveTo(W * 0.2, 145).lineTo(W * 0.8, 145).lineWidth(1).stroke('#cc0000');

    // "This is to certify that"
    doc.fontSize(12).font('Helvetica').fillColor('#aaaaaa')
       .text('This is to certify that', 60, 160, { width: W - 120, align: 'center' });

    // Participant name
    doc.fontSize(30).font('Helvetica-Bold').fillColor('#ffffff')
       .text(data.name, 60, 182, { width: W - 120, align: 'center' });

    // "has successfully completed"
    doc.fontSize(12).font('Helvetica').fillColor('#aaaaaa')
       .text('has successfully completed', 60, 222, { width: W - 120, align: 'center' });

    // Course title
    doc.fontSize(20).font('Helvetica-Bold').fillColor('#cc0000')
       .text(data.title, 80, 242, { width: W - 160, align: 'center' });

    // CPE badge box
    const badgeY = 290;
    doc.rect(W/2 - 80, badgeY, 160, 44).fill('#1c1e2a');
    doc.rect(W/2 - 80, badgeY, 160, 44).lineWidth(1).stroke('#cc0000');
    doc.fontSize(22).font('Helvetica-Bold').fillColor('#cc0000')
       .text(`${cpeHours} CPE`, W/2 - 80, badgeY + 6, { width: 160, align: 'center' });
    doc.fontSize(9).font('Helvetica').fillColor('#888888')
       .text('Continuing Professional Education Hours', W/2 - 80, badgeY + 29, { width: 160, align: 'center' });

    // Date
    doc.fontSize(11).font('Helvetica').fillColor('#aaaaaa')
       .text(`Completed: ${completedDate}`, 60, 350, { width: W - 120, align: 'center' });

    // Footer: signatures
    const sigY = H - 80;
    doc.moveTo(80, sigY).lineTo(240, sigY).lineWidth(0.5).stroke('#444444');
    doc.moveTo(W - 240, sigY).lineTo(W - 80, sigY).lineWidth(0.5).stroke('#444444');

    doc.fontSize(9).font('Helvetica').fillColor('#888888')
       .text('Learning Center Platform', 80, sigY + 6, { width: 160, align: 'center' })
       .text('Issuer', 80, sigY + 18, { width: 160, align: 'center' });

    doc.fontSize(9).font('Helvetica').fillColor('#888888')
       .text(data.trainer_name || 'Learning Center', W - 240, sigY + 6, { width: 160, align: 'center' })
       .text('Course Author', W - 240, sigY + 18, { width: 160, align: 'center' });

    doc.end();
  });
});

// Pobierz postęp w kursie
app.get('/api/course/:courseId/progress/:userId', (req, res) => {
  const { courseId, userId } = req.params;

  const query = `
    SELECT l.id, l.title, l.module_id, COALESCE(up.completed, 0) as completed
    FROM lessons l
    JOIN modules m ON l.module_id = m.id
    LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ?
    WHERE m.course_id = ?
    ORDER BY m.order_index, l.order_index
  `;

  db.all(query, [userId, courseId], (err, lessons) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    const completed = lessons.filter(l => l.completed).length;
    const total = lessons.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    res.json({
      completed,
      total,
      percentage,
      lessons
    });
  });
});

// ============ TRAINER ENDPOINTS ============

// Pobierz kursy trenera
app.get('/api/trainer/courses/:userId', (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT c.*, 
      (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id) as enrolled_count,
      (SELECT COUNT(*) FROM modules WHERE course_id = c.id) as module_count
    FROM courses c
    WHERE c.created_by = ?
    ORDER BY c.created_at DESC
  `;

  db.all(query, [userId], (err, courses) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ courses });
  });
});

// Utwórz nowy kurs (Trainer)
app.post('/api/trainer/create-course', async (req, res) => {
  const { title, description, level, duration, price, is_free, modules, quiz, trainer_id, slides, handbook } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const courseId = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO courses (title, description, level, duration, price, is_free, created_by, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, 1)',
        [title, description, level || 'Beginner', duration || 'Self-paced', price || 0, is_free ? 1 : 0, trainer_id],
        function(err) { if (err) reject(err); else resolve(this.lastID); }
      );
    });

    if (modules && modules.length > 0) {
      for (const [mi, module] of modules.entries()) {
        const moduleId = await new Promise((resolve, reject) => {
          db.run('INSERT INTO modules (course_id, title, description, order_index) VALUES (?, ?, ?, ?)',
            [courseId, module.title, module.description || '', mi + 1],
            function(err) { if (err) reject(err); else resolve(this.lastID); }
          );
        });
        if (module.lessons) {
          for (const [li, lesson] of module.lessons.entries()) {
            await new Promise((resolve, reject) => {
              db.run('INSERT INTO lessons (module_id, title, content, video_url, duration, order_index) VALUES (?, ?, ?, ?, ?, ?)',
                [moduleId, lesson.title, lesson.content, lesson.video_url || null, lesson.duration || 15, li + 1],
                function(err) { if (err) reject(err); else resolve(); }
              );
            });
          }
        }
      }
    }

    if (quiz) {
      const quizId = await new Promise((resolve, reject) => {
        db.run('INSERT INTO quizzes (course_id, title, passing_score) VALUES (?, ?, ?)',
          [courseId, quiz.title, quiz.passing_score || 70],
          function(err) { if (err) reject(err); else resolve(this.lastID); }
        );
      });
      if (quiz.questions) {
        for (const q of quiz.questions) {
          await new Promise((resolve, reject) => {
            db.run('INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, scenario, explanation) VALUES (?, ?, ?, ?, ?, ?)',
              [quizId, q.question, JSON.stringify(q.options), q.correct_answer, q.scenario || null, q.explanation || null],
              function(err) { if (err) reject(err); else resolve(); }
            );
          });
        }
      }
    }

    if (slides && slides.length > 0) {
      for (const s of slides) {
        await new Promise((resolve, reject) => {
          db.run('INSERT INTO slides (course_id, slide_number, title, content, notes, order_index) VALUES (?, ?, ?, ?, ?, ?)',
            [courseId, s.slide_number, s.title, s.content, s.notes || '', s.order_index],
            function(err) { if (err) reject(err); else resolve(); }
          );
        });
      }
    }

    if (handbook && handbook.length > 0) {
      for (const c of handbook) {
        await new Promise((resolve, reject) => {
          db.run('INSERT INTO handbook (course_id, chapter_number, title, content, order_index) VALUES (?, ?, ?, ?, ?)',
            [courseId, c.chapter_number, c.title, c.content, c.order_index],
            function(err) { if (err) reject(err); else resolve(); }
          );
        });
      }
    }

    res.status(201).json({ message: 'Course created successfully', courseId });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ error: 'Error creating course' });
  }
});

// Update course (Trainer/Admin)
app.put('/api/trainer/update-course/:courseId', async (req, res) => {
  const { courseId } = req.params;
  const { title, description, level, duration, price, is_free, modules, quiz, slides, handbook } = req.body;

  try {
    await new Promise((resolve, reject) => {
      db.run('UPDATE courses SET title=?, description=?, level=?, duration=?, price=?, is_free=? WHERE id=?',
        [title, description, level, duration, price || 0, is_free ? 1 : 0, courseId],
        function(err) { if (err) reject(err); else resolve(); }
      );
    });

    // Delete and recreate modules/lessons
    await new Promise((r) => db.run('DELETE FROM user_progress WHERE lesson_id IN (SELECT l.id FROM lessons l JOIN modules m ON l.module_id=m.id WHERE m.course_id=?)', [courseId], r));
    await new Promise((r) => db.run('DELETE FROM lessons WHERE module_id IN (SELECT id FROM modules WHERE course_id=?)', [courseId], r));
    await new Promise((r) => db.run('DELETE FROM modules WHERE course_id=?', [courseId], r));

    if (modules) {
      for (const [mi, module] of modules.entries()) {
        const moduleId = await new Promise((resolve, reject) => {
          db.run('INSERT INTO modules (course_id, title, description, order_index) VALUES (?, ?, ?, ?)',
            [courseId, module.title, module.description || '', mi + 1],
            function(err) { if (err) reject(err); else resolve(this.lastID); }
          );
        });
        if (module.lessons) {
          for (const [li, lesson] of module.lessons.entries()) {
            await new Promise((resolve, reject) => {
              db.run('INSERT INTO lessons (module_id, title, content, video_url, duration, order_index) VALUES (?, ?, ?, ?, ?, ?)',
                [moduleId, lesson.title, lesson.content, lesson.video_url || null, lesson.duration || 15, li + 1],
                function(err) { if (err) reject(err); else resolve(); }
              );
            });
          }
        }
      }
    }

    // Slides
    await new Promise((r) => db.run('DELETE FROM slides WHERE course_id=?', [courseId], r));
    if (slides?.length) {
      for (const s of slides) {
        await new Promise((r) => db.run('INSERT INTO slides (course_id, slide_number, title, content, notes, order_index) VALUES (?,?,?,?,?,?)',
          [courseId, s.slide_number, s.title, s.content, s.notes||'', s.order_index], r));
      }
    }

    // Handbook
    await new Promise((r) => db.run('DELETE FROM handbook WHERE course_id=?', [courseId], r));
    if (handbook?.length) {
      for (const c of handbook) {
        await new Promise((r) => db.run('INSERT INTO handbook (course_id, chapter_number, title, content, order_index) VALUES (?,?,?,?,?)',
          [courseId, c.chapter_number, c.title, c.content, c.order_index], r));
      }
    }

    res.json({ message: 'Course updated successfully', courseId });
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ error: 'Error updating course' });
  }
});

// ============ ADMIN ENDPOINTS ============

// Pobierz wszystkich użytkowników (Admin)
app.get('/api/admin/users', (req, res) => {
  const query = `
    SELECT u.id, u.email, u.name, u.role, u.created_at,
      (SELECT COUNT(*) FROM enrollments WHERE user_id = u.id) as enrolled_count,
      (SELECT COUNT(*) FROM enrollments WHERE user_id = u.id AND completed_at IS NOT NULL) as completed_count
    FROM users u
    ORDER BY u.created_at DESC
  `;

  db.all(query, [], (err, users) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ users });
  });
});

// Pobierz wszystkie kursy (Admin)
app.get('/api/admin/courses', (req, res) => {
  const query = `
    SELECT c.*,
      (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id) as enrolled_count
    FROM courses c
    ORDER BY c.created_at DESC
  `;

  db.all(query, [], (err, courses) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ courses });
  });
});

// Pobierz statystyki (Admin)
app.get('/api/admin/stats', (req, res) => {
  db.get('SELECT COUNT(*) as totalUsers FROM users', (err, usersCount) => {
    db.get('SELECT COUNT(*) as totalCourses FROM courses', (err2, coursesCount) => {
      db.get('SELECT COUNT(*) as completedEnrollments FROM enrollments WHERE completed_at IS NOT NULL', (err3, completions) => {
        db.get('SELECT COUNT(*) as activeEnrollments FROM enrollments WHERE completed_at IS NULL', (err4, active) => {
          db.get('SELECT SUM(c.price) as revenue FROM courses c JOIN enrollments e ON c.id = e.course_id WHERE e.payment_status = "completed"', (err5, revenue) => {
            // Recent activity: last 10 enrollments/completions
            const activityQuery = `
              SELECT 
                u.name as user_name,
                c.title as course_title,
                e.enrolled_at,
                e.completed_at,
                CASE WHEN e.completed_at IS NOT NULL THEN 'completed' ELSE 'enrolled' END as type
              FROM enrollments e
              JOIN users u ON e.user_id = u.id
              JOIN courses c ON e.course_id = c.id
              ORDER BY COALESCE(e.completed_at, e.enrolled_at) DESC
              LIMIT 10
            `;
            db.all(activityQuery, [], (err6, activity) => {
              const recentActivity = (activity || []).map(a => ({
                icon: a.type === 'completed' ? '🎓' : '📚',
                message: a.type === 'completed'
                  ? `${a.user_name} completed "${a.course_title}"`
                  : `${a.user_name} enrolled in "${a.course_title}"`,
                time: new Date(a.completed_at || a.enrolled_at).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
              }));

              res.json({
                totalUsers: usersCount?.totalUsers || 0,
                totalCourses: coursesCount?.totalCourses || 0,
                completedEnrollments: completions?.completedEnrollments || 0,
                activeEnrollments: active?.activeEnrollments || 0,
                revenue: revenue?.revenue || 0,
                recentActivity
              });
            });
          });
        });
      });
    });
  });
});

// Dodaj nowego użytkownika (Admin)
app.post('/api/admin/users', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }
  if (!['user', 'trainer', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }
  try {
    const existing = await new Promise((resolve, reject) =>
      db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => err ? reject(err) : resolve(row))
    );
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role],
      function(err) {
        if (err) return res.status(500).json({ error: 'Error creating user' });
        res.status(201).json({ message: 'User created successfully', userId: this.lastID });
      }
    );
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Usuń użytkownika (Admin)
app.delete('/api/admin/users/:userId', (req, res) => {
  const { userId } = req.params;

  db.run('DELETE FROM users WHERE id = ?', [userId], (err) => {
    if (err) return res.status(500).json({ error: 'Error deleting user' });
    res.json({ message: 'User deleted successfully' });
  });
});

// Zmień rolę użytkownika (Admin)
app.put('/api/admin/users/:userId/role', (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['user', 'trainer', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  db.run('UPDATE users SET role = ? WHERE id = ?', [role, userId], (err) => {
    if (err) return res.status(500).json({ error: 'Error updating role' });
    res.json({ message: 'Role updated successfully' });
  });
});

// Przypisz kurs do użytkownika (Admin)
app.post('/api/admin/assign-course', (req, res) => {
  const { userId, courseId } = req.body;
  if (!userId || !courseId) return res.status(400).json({ error: 'userId and courseId required' });

  db.get('SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?', [userId, courseId], (err, enrollment) => {
    if (enrollment) {
      return res.status(400).json({ error: 'User already enrolled in this course' });
    }
    db.get('SELECT is_free FROM courses WHERE id = ?', [courseId], (err, course) => {
      if (!course) return res.status(404).json({ error: 'Course not found' });
      const paymentStatus = course?.is_free ? 'completed' : 'pending';
      db.run(
        'INSERT INTO enrollments (user_id, course_id, payment_status) VALUES (?, ?, ?)',
        [userId, courseId, paymentStatus],
        (err) => {
          if (err) return res.status(500).json({ error: 'Error assigning course' });
          res.json({ message: 'Course assigned successfully' });
        }
      );
    });
  });
});

// Edytuj kurs (Admin/Trainer)
app.put('/api/admin/courses/:courseId', (req, res) => {
  const { courseId } = req.params;
  const { title, description, duration, level, price, is_free } = req.body;

  db.run(
    'UPDATE courses SET title=?, description=?, duration=?, level=?, price=?, is_free=? WHERE id=?',
    [title, description, duration, level, price || 0, is_free ? 1 : 0, courseId],
    function(err) {
      if (err) return res.status(500).json({ error: 'Error updating course' });
      if (this.changes === 0) return res.status(404).json({ error: 'Course not found' });
      res.json({ message: 'Course updated successfully' });
    }
  );
});

// Pobierz szczegóły kursu do edycji (Admin/Trainer)
app.get('/api/admin/courses/:courseId', (req, res) => {
  const { courseId } = req.params;
  db.get('SELECT * FROM courses WHERE id = ?', [courseId], (err, course) => {
    if (err || !course) return res.status(404).json({ error: 'Course not found' });
    res.json({ course });
  });
});

// Usuń kurs (Admin)
app.delete('/api/admin/courses/:courseId', (req, res) => {
  const { courseId } = req.params;

  db.serialize(() => {
    db.run('DELETE FROM user_progress WHERE lesson_id IN (SELECT l.id FROM lessons l JOIN modules m ON l.module_id=m.id WHERE m.course_id=?)', [courseId]);
    db.run('DELETE FROM quiz_results WHERE quiz_id IN (SELECT id FROM quizzes WHERE course_id=?)', [courseId]);
    db.run('DELETE FROM quiz_questions WHERE quiz_id IN (SELECT id FROM quizzes WHERE course_id=?)', [courseId]);
    db.run('DELETE FROM quizzes WHERE course_id=?', [courseId]);
    db.run('DELETE FROM lessons WHERE module_id IN (SELECT id FROM modules WHERE course_id=?)', [courseId]);
    db.run('DELETE FROM modules WHERE course_id=?', [courseId]);
    db.run('DELETE FROM enrollments WHERE course_id=?', [courseId]);
    db.run('DELETE FROM slides WHERE course_id=?', [courseId]);
    db.run('DELETE FROM handbook WHERE course_id=?', [courseId]);
    db.run('DELETE FROM courses WHERE id=?', [courseId], function(err) {
      if (err) return res.status(500).json({ error: 'Error deleting course' });
      res.json({ message: 'Course deleted successfully' });
    });
  });
});

// ============ SLIDES & HANDBOOK ENDPOINTS ============

// Pobierz slajdy kursu
app.get('/api/courses/:courseId/slides', (req, res) => {
  const { courseId } = req.params;

  db.all(
    'SELECT * FROM slides WHERE course_id = ? ORDER BY order_index, slide_number',
    [courseId],
    (err, slides) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ slides });
    }
  );
});

// ============ USER PROFILE ENDPOINTS ============

// Get user profile
app.get('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  db.get(
    'SELECT id, name, email, role, created_at, email_notifications FROM users WHERE id = ?',
    [userId],
    (err, user) => {
      if (err || !user) return res.status(404).json({ error: 'User not found' });
      res.json({ user });
    }
  );
});

// Update user profile (name, email_notifications)
app.put('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, email, email_notifications } = req.body;

  // Check email uniqueness if changed
  if (email) {
    const existing = await new Promise(r => db.get('SELECT id FROM users WHERE email=? AND id!=?', [email, userId], (e, row) => r(row)));
    if (existing) return res.status(400).json({ error: 'Email already in use' });
  }

  db.run(
    'UPDATE users SET name=COALESCE(?,name), email=COALESCE(?,email), email_notifications=COALESCE(?,email_notifications) WHERE id=?',
    [name || null, email || null, email_notifications !== undefined ? (email_notifications ? 1 : 0) : null, userId],
    function(err) {
      if (err) return res.status(500).json({ error: 'Error updating profile' });
      db.get('SELECT id, name, email, role, email_notifications FROM users WHERE id=?', [userId], (e, u) => {
        res.json({ message: 'Profile updated', user: u });
      });
    }
  );
});

// Change password
app.put('/api/users/:userId/password', async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Both passwords required' });
  if (newPassword.length < 4) return res.status(400).json({ error: 'Password too short (min 4 chars)' });

  db.get('SELECT password FROM users WHERE id=?', [userId], async (err, user) => {
    if (!user) return res.status(404).json({ error: 'User not found' });
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(400).json({ error: 'Current password is incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);
    db.run('UPDATE users SET password=? WHERE id=?', [hashed, userId], (err) => {
      if (err) return res.status(500).json({ error: 'Error updating password' });
      res.json({ message: 'Password changed successfully' });
    });
  });
});

// Get user certificates with CPE info
app.get('/api/users/:userId/certificates', (req, res) => {
  const { userId } = req.params;
  const query = `
    SELECT c.id as courseId, c.title, c.duration, e.completed_at,
      (SELECT COUNT(*) FROM quiz_results qr JOIN quizzes q ON qr.quiz_id=q.id WHERE q.course_id=c.id AND qr.user_id=? AND qr.passed=1) as quiz_passed
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    WHERE e.user_id = ? AND e.completed_at IS NOT NULL
    ORDER BY e.completed_at DESC
  `;
  db.all(query, [userId, userId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    const certs = rows.map(r => ({
      ...r,
      cpeHours: parseInt((r.duration || '').match(/\d+/)?.[0] || 0)
    }));
    const totalCPE = certs.reduce((s, c) => s + c.cpeHours, 0);
    const currentYear = new Date().getFullYear();
    const yearCPE = certs.filter(c => new Date(c.completed_at).getFullYear() === currentYear).reduce((s, c) => s + c.cpeHours, 0);
    res.json({ certificates: certs, totalCPE, yearCPE });
  });
});

// Pobierz handbook kursu
app.get('/api/courses/:courseId/handbook', (req, res) => {
  const { courseId } = req.params;

  db.all(
    'SELECT * FROM handbook WHERE course_id = ? ORDER BY order_index, chapter_number',
    [courseId],
    (err, chapters) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ chapters });
    }
  );
});

// ============ COURSE APPROVAL WORKFLOW ============

// Submit course for review (Trainer)
app.put('/api/courses/:courseId/submit', (req, res) => {
  const { courseId } = req.params;
  const { trainer_notes } = req.body;
  db.run("UPDATE courses SET status='pending_review', trainer_notes=? WHERE id=?", [trainer_notes || null, courseId], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Course submitted for review' });
  });
});

// Save draft (Trainer)
app.put('/api/courses/:courseId/draft', (req, res) => {
  const { courseId } = req.params;
  db.run("UPDATE courses SET status='draft' WHERE id=?", [courseId], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Saved as draft' });
  });
});

// Approve course (Admin)
app.put('/api/courses/:courseId/approve', (req, res) => {
  const { courseId } = req.params;
  db.run("UPDATE courses SET status='approved', rejection_reason=NULL WHERE id=?", [courseId], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Course approved' });
  });
});

// Reject course (Admin)
app.put('/api/courses/:courseId/reject', (req, res) => {
  const { courseId } = req.params;
  const { reason } = req.body;
  db.run("UPDATE courses SET status='rejected', rejection_reason=? WHERE id=?", [reason || '', courseId], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Course rejected' });
  });
});

// Get pending review courses (Admin)
app.get('/api/admin/pending-courses', (req, res) => {
  const query = `SELECT c.*, u.name as trainer_name FROM courses c LEFT JOIN users u ON c.created_by=u.id WHERE c.status='pending_review' ORDER BY c.created_at DESC`;
  db.all(query, [], (err, courses) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ courses });
  });
});

// ============ MESSAGING SYSTEM ============

// Send message
app.post('/api/messages', (req, res) => {
  const { from_user_id, to_user_id, course_id, subject, content } = req.body;
  if (!from_user_id || !content) return res.status(400).json({ error: 'Missing required fields' });
  db.run('INSERT INTO messages (from_user_id, to_user_id, course_id, subject, content) VALUES (?,?,?,?,?)',
    [from_user_id, to_user_id || null, course_id || null, subject || null, content],
    function(err) {
      if (err) return res.status(500).json({ error: 'Error sending message' });
      res.status(201).json({ message: 'Message sent', id: this.lastID });
    });
});

// Get messages for user (inbox)
app.get('/api/messages/:userId', (req, res) => {
  const { userId } = req.params;
  const query = `
    SELECT m.*, 
      u.name as from_name, u.role as from_role,
      c.title as course_title
    FROM messages m
    JOIN users u ON m.from_user_id = u.id
    LEFT JOIN courses c ON m.course_id = c.id
    WHERE m.to_user_id = ? OR (m.to_user_id IS NULL AND (SELECT role FROM users WHERE id=?) IN ('admin'))
    ORDER BY m.created_at DESC LIMIT 50
  `;
  db.all(query, [userId, userId], (err, messages) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ messages });
  });
});

// Get sent messages for user
app.get('/api/messages/:userId/sent', (req, res) => {
  const { userId } = req.params;
  db.all(`SELECT m.*, u.name as to_name, c.title as course_title FROM messages m LEFT JOIN users u ON m.to_user_id=u.id LEFT JOIN courses c ON m.course_id=c.id WHERE m.from_user_id=? ORDER BY m.created_at DESC LIMIT 50`,
    [userId], (err, messages) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ messages });
    });
});

// Mark message as read
app.put('/api/messages/:messageId/read', (req, res) => {
  db.run('UPDATE messages SET read=1 WHERE id=?', [req.params.messageId], (err) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Marked as read' });
  });
});

// Unread count
app.get('/api/messages/:userId/unread-count', (req, res) => {
  const { userId } = req.params;
  db.get('SELECT COUNT(*) as count FROM messages WHERE to_user_id=? AND read=0', [userId], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ count: row?.count || 0 });
  });
});

// Get users for messaging (trainers/admins for user, users enrolled in trainer's course)
app.get('/api/messaging/contacts/:userId', (req, res) => {
  const { userId } = req.params;
  db.get('SELECT role FROM users WHERE id=?', [userId], (err, me) => {
    if (!me) return res.status(404).json({ error: 'User not found' });
    
    if (me.role === 'user') {
      // User can message trainers and admins
      db.all("SELECT id, name, role FROM users WHERE role IN ('trainer','admin') ORDER BY name", [], (err, users) => {
        res.json({ contacts: users || [] });
      });
    } else if (me.role === 'trainer') {
      // Trainer can message admins and users enrolled in their courses
      const query = `SELECT DISTINCT u.id, u.name, u.role FROM users u WHERE u.role='admin'
        UNION SELECT DISTINCT u.id, u.name, u.role FROM users u JOIN enrollments e ON u.id=e.user_id JOIN courses c ON e.course_id=c.id WHERE c.created_by=? ORDER BY name`;
      db.all(query, [userId], (err, users) => {
        res.json({ contacts: users || [] });
      });
    } else {
      // Admin can message everyone
      db.all('SELECT id, name, role FROM users WHERE id != ? ORDER BY name', [userId], (err, users) => {
        res.json({ contacts: users || [] });
      });
    }
  });
});

// ============ TRAINER EARNINGS ============

// Get trainer earnings
app.get('/api/trainer/earnings/:trainerId', (req, res) => {
  const { trainerId } = req.params;

  db.get("SELECT value FROM platform_settings WHERE key='trainer_commission_pct'", [], (err, setting) => {
    const globalCommissionPct = parseInt(setting?.value || 70);

    const query = `
      SELECT c.id as courseId, c.title, c.price, c.currency,
        c.commission_rate,
        COUNT(DISTINCT e.user_id) as enrolled_count,
        COUNT(DISTINCT CASE WHEN e.payment_status='completed' THEN e.user_id END) as paid_count
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id
      WHERE c.created_by = ?
      GROUP BY c.id
    `;

    db.all(query, [trainerId], (err, courses) => {
      if (err) return res.status(500).json({ error: 'DB error' });

      const earnings = courses.map(c => {
        // Per-course rate overrides global; null = use global
        const rate = (c.commission_rate !== null && c.commission_rate !== undefined)
          ? c.commission_rate / 100
          : globalCommissionPct / 100;
        const commissionPct = Math.round(rate * 100);
        return {
          ...c,
          gross: c.paid_count * c.price,
          net: Math.round(c.paid_count * c.price * rate * 100) / 100,
          commission_pct: commissionPct,
          uses_global_rate: c.commission_rate === null || c.commission_rate === undefined,
        };
      });

      const totalGross = earnings.reduce((s, e) => s + e.gross, 0);
      const totalNet = earnings.reduce((s, e) => s + e.net, 0);

      db.all('SELECT * FROM payout_requests WHERE trainer_id=? ORDER BY created_at DESC', [trainerId], (err2, payouts) => {
        const totalPaidOut = (payouts||[]).filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
        res.json({
          courses: earnings,
          totalGross,
          totalNet,
          totalPaidOut,
          available: totalNet - totalPaidOut,
          globalCommissionPct
        });
      });
    });
  });
});

// Request payout (Trainer)
app.post('/api/trainer/payout-request', (req, res) => {
  const { trainer_id, amount, note } = req.body;
  if (!trainer_id || !amount) return res.status(400).json({ error: 'Missing fields' });
  db.run('INSERT INTO payout_requests (trainer_id, amount, status) VALUES (?,?,?)', [trainer_id, amount, 'pending'], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.status(201).json({ message: 'Payout request submitted', id: this.lastID });
  });
});

// Get all payout requests (Admin)
app.get('/api/admin/payouts', (req, res) => {
  const query = `SELECT pr.*, u.name as trainer_name, u.email as trainer_email FROM payout_requests pr JOIN users u ON pr.trainer_id=u.id ORDER BY pr.created_at DESC`;
  db.all(query, [], (err, payouts) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ payouts });
  });
});

// Process payout (Admin)
app.put('/api/admin/payouts/:id', (req, res) => {
  const { id } = req.params;
  const { status, admin_note } = req.body;
  const processedAt = status === 'completed' ? new Date().toISOString() : null;
  db.run('UPDATE payout_requests SET status=?, admin_note=?, processed_at=? WHERE id=?',
    [status, admin_note || null, processedAt, id], function(err) {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ message: 'Payout updated' });
    });
});

// ============ PLATFORM SETTINGS ============

// Get settings (Admin)
app.get('/api/admin/settings', (req, res) => {
  db.all('SELECT key, value FROM platform_settings', [], (err, settings) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    const map = {};
    (settings || []).forEach(s => { map[s.key] = s.value; });
    res.json({ settings: map });
  });
});

// Update setting (Admin)
app.put('/api/admin/settings/:key', (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  db.run('INSERT OR REPLACE INTO platform_settings (key, value, updated_at) VALUES (?,?,CURRENT_TIMESTAMP)',
    [key, value], function(err) {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ message: 'Setting updated' });
    });
});

// Set commission rate for a specific course (Admin)
app.put('/api/admin/courses/:courseId/commission', (req, res) => {
  const { courseId } = req.params;
  const { commission_rate } = req.body;
  const rate = commission_rate === null || commission_rate === '' ? null : parseFloat(commission_rate);
  db.run('UPDATE courses SET commission_rate=? WHERE id=?', [rate, courseId], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Commission rate updated' });
  });
});

// Duplicate course (Admin)
app.post('/api/admin/courses/:courseId/duplicate', async (req, res) => {
  const { courseId } = req.params;
  const { adminId } = req.body;

  try {
    const original = await new Promise((resolve, reject) =>
      db.get('SELECT * FROM courses WHERE id=?', [courseId], (e, row) => e ? reject(e) : resolve(row))
    );
    if (!original) return res.status(404).json({ error: 'Course not found' });

    const newCourseId = await new Promise((resolve, reject) =>
      db.run(
        'INSERT INTO courses (title, description, level, duration, price, is_free, created_by, status, thumbnail) VALUES (?,?,?,?,?,?,?,?,?)',
        [`${original.title} (kopia)`, original.description, original.level, original.duration,
         original.price, original.is_free, adminId || original.created_by, 'draft', original.thumbnail],
        function(e) { e ? reject(e) : resolve(this.lastID); }
      )
    );

    // Copy modules & lessons
    const modules = await new Promise((resolve, reject) =>
      db.all('SELECT * FROM modules WHERE course_id=? ORDER BY order_index', [courseId], (e, rows) => e ? reject(e) : resolve(rows))
    );
    for (const mod of modules) {
      const newModId = await new Promise((resolve, reject) =>
        db.run('INSERT INTO modules (course_id, title, description, order_index) VALUES (?,?,?,?)',
          [newCourseId, mod.title, mod.description, mod.order_index],
          function(e) { e ? reject(e) : resolve(this.lastID); }
        )
      );
      const lessons = await new Promise((resolve, reject) =>
        db.all('SELECT * FROM lessons WHERE module_id=? ORDER BY order_index', [mod.id], (e, rows) => e ? reject(e) : resolve(rows))
      );
      for (const l of lessons) {
        await new Promise((resolve, reject) =>
          db.run('INSERT INTO lessons (module_id, title, content, video_url, duration, order_index) VALUES (?,?,?,?,?,?)',
            [newModId, l.title, l.content, l.video_url, l.duration, l.order_index],
            function(e) { e ? reject(e) : resolve(); }
          )
        );
      }
    }

    // Copy slides
    const slides = await new Promise((resolve, reject) =>
      db.all('SELECT * FROM slides WHERE course_id=?', [courseId], (e, rows) => e ? reject(e) : resolve(rows))
    );
    for (const s of slides) {
      await new Promise((resolve, reject) =>
        db.run('INSERT INTO slides (course_id, slide_number, title, content, notes, order_index) VALUES (?,?,?,?,?,?)',
          [newCourseId, s.slide_number, s.title, s.content, s.notes, s.order_index],
          function(e) { e ? reject(e) : resolve(); }
        )
      );
    }

    // Copy handbook
    const handbook = await new Promise((resolve, reject) =>
      db.all('SELECT * FROM handbook WHERE course_id=?', [courseId], (e, rows) => e ? reject(e) : resolve(rows))
    );
    for (const c of handbook) {
      await new Promise((resolve, reject) =>
        db.run('INSERT INTO handbook (course_id, chapter_number, title, content, order_index) VALUES (?,?,?,?,?)',
          [newCourseId, c.chapter_number, c.title, c.content, c.order_index],
          function(e) { e ? reject(e) : resolve(); }
        )
      );
    }

    // Copy quiz
    const quiz = await new Promise((resolve, reject) =>
      db.get('SELECT * FROM quizzes WHERE course_id=?', [courseId], (e, row) => e ? reject(e) : resolve(row))
    );
    if (quiz) {
      const newQuizId = await new Promise((resolve, reject) =>
        db.run('INSERT INTO quizzes (course_id, title, passing_score) VALUES (?,?,?)',
          [newCourseId, quiz.title, quiz.passing_score],
          function(e) { e ? reject(e) : resolve(this.lastID); }
        )
      );
      const questions = await new Promise((resolve, reject) =>
        db.all('SELECT * FROM quiz_questions WHERE quiz_id=?', [quiz.id], (e, rows) => e ? reject(e) : resolve(rows))
      );
      for (const q of questions) {
        await new Promise((resolve, reject) =>
          db.run('INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, scenario, explanation) VALUES (?,?,?,?,?,?)',
            [newQuizId, q.question, q.options, q.correct_answer, q.scenario, q.explanation],
            function(e) { e ? reject(e) : resolve(); }
          )
        );
      }
    }

    res.status(201).json({ message: 'Course duplicated', newCourseId });
  } catch (err) {
    console.error('Duplicate error:', err);
    res.status(500).json({ error: 'Error duplicating course' });
  }
});

// Get trainer's students with progress
app.get('/api/trainer/students/:trainerId', (req, res) => {
  const { trainerId } = req.params;
  const query = `
    SELECT DISTINCT u.id, u.name, u.email,
      c.id as course_id, c.title as course_title,
      e.enrolled_at, e.completed_at,
      (SELECT COUNT(*) FROM user_progress up JOIN lessons l ON up.lesson_id=l.id JOIN modules m ON l.module_id=m.id WHERE m.course_id=c.id AND up.user_id=u.id AND up.completed=1) as completed_lessons,
      (SELECT COUNT(*) FROM lessons l JOIN modules m ON l.module_id=m.id WHERE m.course_id=c.id) as total_lessons
    FROM enrollments e
    JOIN users u ON e.user_id = u.id
    JOIN courses c ON e.course_id = c.id
    WHERE c.created_by = ?
    ORDER BY c.title, u.name
  `;
  db.all(query, [trainerId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    const pct = r => r.total_lessons > 0 ? Math.round(r.completed_lessons / r.total_lessons * 100) : 0;
    res.json({ students: rows.map(r => ({ ...r, progress_pct: pct(r) })) });
  });
});

// Image upload endpoint
app.post('/api/upload/image', (req, res) => {
  // Simple base64 storage (for production use proper file storage)
  const { imageData, filename } = req.body;
  if (!imageData) return res.status(400).json({ error: 'No image data' });
  // Return as data URL for now
  res.json({ url: imageData, filename: filename || 'image.png' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Obsługa zamykania połączenia z bazą danych
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) return console.error(err.message);
    console.log('Closed the database connection.');
    process.exit(0);
  });
});
