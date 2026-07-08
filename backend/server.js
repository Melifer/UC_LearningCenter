const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { parseCourseMarkdown } = require('./utils/markdownParser');

const app = express();
const PORT = process.env.PORT || 3002;
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

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

  // Runtime migrations - add columns if missing
  db.all("PRAGMA table_info(courses)", (err, columns) => {
    if (!columns) return;
    const names = columns.map(c => c.name);
    if (!names.includes('is_published')) db.run("ALTER TABLE courses ADD COLUMN is_published INTEGER DEFAULT 1", () => {});
    if (!names.includes('status')) db.run("ALTER TABLE courses ADD COLUMN status TEXT DEFAULT 'published'", () => {});
    if (!names.includes('mandatory')) db.run("ALTER TABLE courses ADD COLUMN mandatory INTEGER DEFAULT 0", () => {});
    if (!names.includes('deadline')) db.run("ALTER TABLE courses ADD COLUMN deadline TEXT", () => {});
    if (!names.includes('refresher_months')) db.run("ALTER TABLE courses ADD COLUMN refresher_months INTEGER DEFAULT 0", () => {});
    if (!names.includes('trainer_notes')) db.run("ALTER TABLE courses ADD COLUMN trainer_notes TEXT", () => {});
    if (!names.includes('rejection_reason')) db.run("ALTER TABLE courses ADD COLUMN rejection_reason TEXT", () => {});
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
async function createCourseFromParsed(parsed, createdBy) {
  try {
    const { info, modules, slides, handbook, quiz, passing_score } = parsed;
    const courseId = await new Promise((resolve, reject) =>
      db.run(
        'INSERT INTO courses (title, description, level, duration, created_by, status, mandatory, deadline, refresher_months) VALUES (?,?,?,?,?,?,?,?,?)',
        [info.title, info.description, info.level, info.duration, createdBy, parsed.status || 'draft',
         info.mandatory ? 1 : 0, info.deadline || null, info.refresher_months || 0],
        function(e) { e ? reject(e) : resolve(this.lastID); }
      )
    );

    for (const [mi, mod] of (modules || []).entries()) {
      const modId = await new Promise((resolve, reject) =>
        db.run('INSERT INTO modules (course_id, title, description, order_index) VALUES (?,?,?,?)',
          [courseId, mod.title, mod.description || '', mi + 1],
          function(e) { e ? reject(e) : resolve(this.lastID); })
      );
      for (const [li, lesson] of (mod.lessons || []).entries()) {
        await new Promise(resolve =>
          db.run('INSERT INTO lessons (module_id, title, content, video_url, duration, order_index) VALUES (?,?,?,?,?,?)',
            [modId, lesson.title, lesson.content, lesson.video_url || null, lesson.duration || 15, li + 1], resolve)
        );
      }
    }

    for (const s of (slides || [])) {
      await new Promise(resolve =>
        db.run('INSERT INTO slides (course_id, slide_number, title, content, notes, order_index) VALUES (?,?,?,?,?,?)',
          [courseId, s.slide_number, s.title, s.content, s.notes || '', s.order_index], resolve)
      );
    }

    for (const c of (handbook || [])) {
      await new Promise(resolve =>
        db.run('INSERT INTO handbook (course_id, chapter_number, title, content, order_index) VALUES (?,?,?,?,?)',
          [courseId, c.chapter_number, c.title, c.content, c.order_index], resolve)
      );
    }

    if (quiz && quiz.questions && quiz.questions.length > 0) {
      const quizId = await new Promise((resolve, reject) =>
        db.run('INSERT INTO quizzes (course_id, title, passing_score) VALUES (?,?,?)',
          [courseId, `${info.title} — Quiz`, quiz.passing_score || passing_score || 100],
          function(e) { e ? reject(e) : resolve(this.lastID); })
      );
      for (const q of quiz.questions) {
        await new Promise(resolve =>
          db.run('INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, scenario, explanation) VALUES (?,?,?,?,?,?)',
            [quizId, q.question, q.options, q.correct_answer, q.scenario || null, q.explanation || null], resolve)
        );
      }
    }

    console.log(`Course created from markdown: "${info.title}" (id=${courseId})`);
    return courseId;
  } catch (err) {
    console.error('Error creating course from parsed markdown:', err.message);
    throw err;
  }
}

async function createDefaultData() {
  // Konta testowe / demo
  const defaultUsers = [
    { email: 'admin@bibest.eu', password: 'admin', role: 'admin', name: 'Admin BiBest' },
    { email: 'user@bibest.eu', password: 'user', role: 'user', name: 'Demo User' },
    // Legacy test accounts
    { email: 'admin@test.com', password: 'admin', role: 'admin', name: 'Admin User' },
    { email: 'user@test.com', password: 'user', role: 'user', name: 'John Doe' }
  ];

  for (const user of defaultUsers) {
    db.get('SELECT * FROM users WHERE email = ?', [user.email], async (err, row) => {
      if (!row) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        db.run(
          'INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)',
          [user.email, hashedPassword, user.role, user.name],
          (err) => { if (!err) console.log(`Default user created: ${user.email}`); }
        );
      } else if (row.role !== user.role || row.name !== user.name) {
        // Ensure role and name are correct even if auto-provisioned with wrong values
        db.run('UPDATE users SET role = ?, name = ? WHERE email = ?', [user.role, user.name, user.email],
          (err) => { if (!err) console.log(`Default user updated: ${user.email} → role=${user.role}`); }
        );
      }
    });
  }

  // Remove legacy test courses (AI Governance, Machine Learning Fundamentals)
  const legacyTitles = ['AI Governance & Ethics', 'Machine Learning Fundamentals'];
  legacyTitles.forEach(title => {
    db.get('SELECT id FROM courses WHERE title=?', [title], (err, row) => {
      if (row) {
        db.run('DELETE FROM lessons WHERE module_id IN (SELECT id FROM modules WHERE course_id=?)', [row.id]);
        db.run('DELETE FROM modules WHERE course_id=?', [row.id]);
        db.run('DELETE FROM quiz_questions WHERE quiz_id IN (SELECT id FROM quizzes WHERE course_id=?)', [row.id]);
        db.run('DELETE FROM quizzes WHERE course_id=?', [row.id]);
        db.run('DELETE FROM enrollments WHERE course_id=?', [row.id]);
        db.run('DELETE FROM courses WHERE id=?', [row.id], () => console.log(`Removed legacy course: ${title}`));
      }
    });
  });
  setTimeout(() => {
    db.get('SELECT COUNT(*) as count FROM courses', (err, row) => {
      if (!err && row.count === 0) {
        const mdPath = path.join(__dirname, '../docs/courses/eba-ict-security-risk-management.md');
        if (fs.existsSync(mdPath)) {
          try {
            const mdText = fs.readFileSync(mdPath, 'utf-8');
            const parsed = parseCourseMarkdown(mdText);
            // Auto-publish seeded course
            parsed.status = 'published';
            db.get("SELECT id FROM users WHERE role='admin' LIMIT 1", (err, adminUser) => {
              const adminId = adminUser ? adminUser.id : 1;
              createCourseFromParsed(parsed, adminId);
              console.log('EBA ICT course loaded and published from markdown');
            });
          } catch (e) {
            console.error('Failed to load EBA course:', e.message);
          }
        }
      }
    });
  }, 1000); // Delay to ensure users are created first
}

// ============ ENDPOINTS API ============

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

// ============ SSO-PREP AUTH ============

function nameFromEmail(email) {
  const local = (email || '').split('@')[0];
  return local.split('.').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ') || email;
}

// SSO-prep login: accepts email only, auto-creates user if not exists
app.post('/api/auth/sso-login', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (user) {
      return res.json({
        message: 'Login successful',
        user: { id: user.id, email: user.email, role: user.role, name: user.name || nameFromEmail(user.email) }
      });
    }

    // Auto-provision new user
    const name = nameFromEmail(email);
    const hashedPassword = await bcrypt.hash(Math.random().toString(36), 10);
    db.run('INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, 'user', name],
      function(err) {
        if (err) return res.status(500).json({ error: 'Error creating user' });
        res.status(201).json({
          message: 'User provisioned and logged in',
          user: { id: this.lastID, email, role: 'user', name }
        });
      }
    );
  });
});

// Legacy password login (kept for admin CLI/testing)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });
      res.json({ message: 'Login successful', user: { id: user.id, email: user.email, role: user.role, name: user.name } });
    } catch (error) {
      res.status(500).json({ error: 'Error verifying password' });
    }
  });
});

// Pobierz wszystkie kursy
app.get('/api/courses', (req, res) => {
  const { role } = req.query;
  let query;

  if (role === 'admin') {
    query = `SELECT c.*, (SELECT COUNT(*) FROM enrollments WHERE course_id=c.id) as enrolled_count FROM courses c ORDER BY c.created_at DESC`;
  } else {
    query = `SELECT c.*, (SELECT COUNT(*) FROM enrollments WHERE course_id=c.id) as enrolled_count FROM courses c WHERE c.status='published' OR c.status='approved' OR c.status IS NULL ORDER BY c.created_at DESC`;
  }

  db.all(query, [], (err, courses) => {
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
// Reset all progress for a user on logout
app.delete('/api/users/:userId/progress', (req, res) => {
  const { userId } = req.params;
  db.serialize(() => {
    db.run('DELETE FROM enrollments WHERE user_id = ?', [userId]);
    db.run('DELETE FROM user_progress WHERE user_id = ?', [userId]);
    db.run('DELETE FROM quiz_results WHERE user_id = ?', [userId], (err) => {
      if (err) return res.status(500).json({ error: 'Reset failed' });
      res.json({ message: 'Progress reset' });
    });
  });
});

app.post('/api/enroll', (req, res) => {
  const { userId, courseId } = req.body;

  db.get('SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?', [userId, courseId], (err, enrollment) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (enrollment) return res.status(400).json({ error: 'Already enrolled in this course' });

    db.run(
      'INSERT INTO enrollments (user_id, course_id, payment_status) VALUES (?, ?, ?)',
      [userId, courseId, 'completed'],
      function(err) {
        if (err) return res.status(500).json({ error: 'Error enrolling in course' });
        res.status(201).json({ message: 'Enrolled successfully', enrollmentId: this.lastID, paymentRequired: false });
      }
    );
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
    const completedDate = new Date(data.completed_at).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    const certId = `LC-${userId}-${courseId}-${new Date(data.completed_at).getFullYear()}`;

    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=certificate-${certId}.pdf`);
    doc.pipe(res);

    // Arial TTF — full Unicode/Polish character support
    const FONT      = '/System/Library/Fonts/Supplemental/Arial.ttf';
    const FONT_BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf';
    const LOGO_PATH = path.join(__dirname, '../client/public/images/BiBestLearningCenter.png');

    const W = doc.page.width;
    const H = doc.page.height;

    // Background - clean white
    doc.rect(0, 0, W, H).fill('#ffffff');

    // Red left bar
    doc.rect(0, 0, 12, H).fill('#da291c');

    // Red top accent
    doc.rect(12, 0, W - 12, 8).fill('#da291c');

    // Light gray background area
    doc.rect(12, 8, W - 12, H - 8).fill('#fafafa');

    // Header area - white panel
    doc.rect(32, 24, W - 64, 70).fill('#ffffff').stroke('#e0e0e8');

    // BiBest logo in header
    if (fs.existsSync(LOGO_PATH)) {
      doc.image(LOGO_PATH, 44, 30, { height: 50 });
    } else {
      doc.font(FONT_BOLD).fontSize(18).fillColor('#da291c').text('BiBest', 52, 38);
      doc.font(FONT).fontSize(11).fillColor('#555566').text('Learning Center', 52, 60);
    }

    // Cert ID
    doc.font(FONT).fontSize(8).fillColor('#999999')
       .text(`Certificate No: ${certId}`, W - 280, 50, { width: 240, align: 'right' });

    // Main title
    doc.font(FONT_BOLD).fontSize(30).fillColor('#da291c')
       .text('CERTIFICATE OF COMPLETION', 32, 118, { width: W - 64, align: 'center' });

    // Decorative line
    doc.moveTo(W * 0.25, 160).lineTo(W * 0.75, 160).lineWidth(1.5).stroke('#da291c');

    // Sub-header
    doc.font(FONT).fontSize(11).fillColor('#666677')
       .text('This is to certify that', 32, 176, { width: W - 64, align: 'center' });

    // Participant name — Arial Bold handles Polish characters
    const displayName = (data.name && data.name.trim()) ? data.name : nameFromEmail(data.email);
    doc.font(FONT_BOLD).fontSize(28).fillColor('#1a1a2e')
       .text(displayName, 32, 198, { width: W - 64, align: 'center' });

    // Completion text
    doc.font(FONT).fontSize(11).fillColor('#666677')
       .text('has successfully completed the training', 32, 238, { width: W - 64, align: 'center' });

    // Course title
    doc.font(FONT_BOLD).fontSize(18).fillColor('#da291c')
       .text(data.title, 60, 260, { width: W - 120, align: 'center' });

    // CPE badge
    const badgeY = 308;
    doc.rect(W/2 - 90, badgeY, 180, 48).fill('#1a1a2e');
    doc.font(FONT_BOLD).fontSize(22).fillColor('#da291c')
       .text(`${cpeHours} CPE`, W/2 - 90, badgeY + 6, { width: 180, align: 'center' });
    doc.font(FONT).fontSize(9).fillColor('#aaaaaa')
       .text('Continuing Professional Education Hours', W/2 - 90, badgeY + 30, { width: 180, align: 'center' });

    // Date
    doc.font(FONT).fontSize(11).fillColor('#555566')
       .text(`Completed: ${completedDate}`, 32, 374, { width: W - 64, align: 'center' });

    // Footer — left side only
    const sigY = H - 72;
    doc.moveTo(60, sigY).lineTo(240, sigY).lineWidth(0.5).stroke('#cccccc');

    doc.font(FONT).fontSize(9).fillColor('#555566')
       .text('BiBest Learning Center', 60, sigY + 6, { width: 180, align: 'center' })
       .text('Training & Development', 60, sigY + 18, { width: 180, align: 'center' });

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

// ============ ADMIN COURSE ENDPOINTS ============

// Pobierz kursy admina
app.get('/api/admin/courses/:userId', (req, res) => {
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

// Utwórz nowy kurs (Admin)
app.post('/api/admin/create-course', async (req, res) => {
  const { title, description, level, duration, modules, quiz, trainer_id, slides, handbook, mandatory, deadline, refresher_months, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const courseId = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO courses (title, description, level, duration, created_by, status, mandatory, deadline, refresher_months) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, level || 'Intermediate', duration || 'Self-paced', trainer_id, status || 'draft', mandatory ? 1 : 0, deadline || null, refresher_months || 0],
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

// Update course (Admin)
app.put('/api/admin/update-course/:courseId', async (req, res) => {
  const { courseId } = req.params;
  const { title, description, level, duration, modules, quiz, slides, handbook, mandatory, deadline, refresher_months, status } = req.body;

  try {
    await new Promise((resolve, reject) => {
      db.run('UPDATE courses SET title=?, description=?, level=?, duration=?, mandatory=?, deadline=?, refresher_months=?, status=COALESCE(?, status) WHERE id=?',
        [title, description, level, duration, mandatory ? 1 : 0, deadline || null, refresher_months || 0, status || null, courseId],
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
                time: new Date(a.completed_at || a.enrolled_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
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
  if (!['user', 'admin'].includes(role)) {
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

  if (!['user', 'admin'].includes(role)) {
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

// ============ COURSE PUBLISH WORKFLOW ============

// Publish course (Admin)
app.put('/api/courses/:courseId/publish', (req, res) => {
  const { courseId } = req.params;
  db.run("UPDATE courses SET status='published' WHERE id=?", [courseId], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Course published' });
  });
});

// Unpublish (set to draft) (Admin)
app.put('/api/courses/:courseId/unpublish', (req, res) => {
  const { courseId } = req.params;
  db.run("UPDATE courses SET status='draft' WHERE id=?", [courseId], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Course unpublished' });
  });
});

// Legacy: keep submit/approve/draft for backward compat
app.put('/api/courses/:courseId/submit', (req, res) => {
  db.run("UPDATE courses SET status='published' WHERE id=?", [req.params.courseId], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Course published' });
  });
});
app.put('/api/courses/:courseId/draft', (req, res) => {
  db.run("UPDATE courses SET status='draft' WHERE id=?", [req.params.courseId], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Saved as draft' });
  });
});
app.put('/api/courses/:courseId/approve', (req, res) => {
  db.run("UPDATE courses SET status='published' WHERE id=?", [req.params.courseId], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Course published' });
  });
});
app.get('/api/admin/pending-courses', (req, res) => {
  const query = `SELECT c.*, u.name as creator_name FROM courses c LEFT JOIN users u ON c.created_by=u.id WHERE c.status='draft' ORDER BY c.created_at DESC`;
  db.all(query, [], (err, courses) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ courses });
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
        'INSERT INTO courses (title, description, level, duration, created_by, status, thumbnail, mandatory, deadline, refresher_months) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [`${original.title} (kopia)`, original.description, original.level, original.duration,
         adminId || original.created_by, 'draft', original.thumbnail, original.mandatory || 0, original.deadline || null, original.refresher_months || 0],
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

// ============ MARKDOWN IMPORT ============

// Import course from markdown file
app.post('/api/admin/import-markdown', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const text = req.file.buffer.toString('utf-8');
    const parsed = parseCourseMarkdown(text);
    res.json({ success: true, course: parsed });
  } catch (err) {
    res.status(400).json({ error: 'Błąd parsowania: ' + err.message });
  }
});

// Image upload endpoint
app.post('/api/upload/image', (req, res) => {
  // Simple base64 storage (for production use proper file storage)
  const { imageData, filename } = req.body;
  if (!imageData) return res.status(400).json({ error: 'No image data' });
  // Return as data URL for now
  res.json({ url: imageData, filename: filename || 'image.png' });
});

// ============ PRODUCTION: Serve React build ============
const buildPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(buildPath, 'index.html'));
    }
  });
  console.log('Serving React build from client/dist/');
}

app.listen(PORT, () => {
  console.log(`BiBest Learning Center API running on port ${PORT}`);
});

// Obsługa zamykania połączenia z bazą danych
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) return console.error(err.message);
    console.log('Closed the database connection.');
    process.exit(0);
  });
});
