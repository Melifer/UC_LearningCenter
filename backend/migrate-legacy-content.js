// Migration script to import legacy slides and handbook content
// Run with: cd backend && node migrate-legacy-content.js

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const db = new sqlite3.Database('./learning_center.db');

console.log('Starting migration of legacy content...');
console.log('Reading legacy files...');

// Read legacy course.js for slides
const coursePath = path.join(__dirname, '../legacy/data/courses/ai-governance-pl/course.js');
let SLIDES = [];

try {
  const courseContent = fs.readFileSync(coursePath, 'utf8');
  // Parse SLIDES array from export const SLIDES = [...]
  const slidesMatch = courseContent.match(/export const SLIDES = (\[[\s\S]*?\n\]);/);
  if (slidesMatch) {
    // Using eval is normally dangerous, but here we trust our own legacy file
    SLIDES = eval(slidesMatch[1]);
    console.log(`✅ Loaded ${SLIDES.length} slides from legacy`);
  }
} catch (err) {
  console.error('Error reading course.js:', err.message);
}

// Read legacy app.js for handbook
const appPath = path.join(__dirname, '../legacy/app.js');
let HANDBOOK = [];

try {
  const appContent = fs.readFileSync(appPath, 'utf8');
  // Parse HANDBOOK_CHAPTERS array
  const handbookMatch = appContent.match(/const HANDBOOK_CHAPTERS = (\[[\s\S]*?\n    \]);/);
  if (handbookMatch) {
    HANDBOOK = eval(handbookMatch[1]);
    console.log(`✅ Loaded ${HANDBOOK.length} handbook chapters from legacy`);
  }
} catch (err) {
  console.error('Error reading app.js:', err.message);
}

// Znajdź kurs "AI Governance & Ethics"
db.get('SELECT id FROM courses WHERE title = ?', ['AI Governance & Ethics'], (err, course) => {
  if (err || !course) {
    console.error('❌ Error: AI Governance & Ethics course not found!');
    console.log('Please start the backend server first to create sample courses.');
    db.close();
    return;
  }

  const courseId = course.id;
  console.log(`\n📚 Found course ID: ${courseId}`);
  console.log('Migrating content...\n');

  // Wyczyść istniejące slajdy i handbook (jeśli są)
  db.run('DELETE FROM slides WHERE course_id = ?', [courseId], () => {
    db.run('DELETE FROM handbook WHERE course_id = ?', [courseId], () => {
      
      // Wstaw slajdy
      if (SLIDES.length > 0) {
        let slidesAdded = 0;
        const slideStmt = db.prepare('INSERT INTO slides (course_id, slide_number, title, content, notes, order_index) VALUES (?, ?, ?, ?, ?, ?)');
        
        SLIDES.forEach((slide, index) => {
          const slideNum = index + 1;
          slideStmt.run(
            courseId, 
            slideNum, 
            slide.title, 
            slide.html, 
            slide.notes || '', 
            slideNum, 
            (err) => {
              if (err) {
                console.error(`Error inserting slide ${slideNum}:`, err.message);
              } else {
                slidesAdded++;
              }
              if (slidesAdded + (SLIDES.length - slidesAdded) === SLIDES.length) {
                console.log(`✅ Migrated ${slidesAdded}/${SLIDES.length} slides`);
                checkCompletion();
              }
            }
          );
        });
        slideStmt.finalize();
      }

      // Wstaw handbook
      if (HANDBOOK.length > 0) {
        let chaptersAdded = 0;
        const handbookStmt = db.prepare('INSERT INTO handbook (course_id, chapter_number, title, content, order_index) VALUES (?, ?, ?, ?, ?)');
        
        HANDBOOK.forEach((chapter) => {
          handbookStmt.run(
            courseId, 
            chapter.num, 
            chapter.title, 
            chapter.content, 
            chapter.num, 
            (err) => {
              if (err) {
                console.error(`Error inserting chapter ${chapter.num}:`, err.message);
              } else {
                chaptersAdded++;
              }
              if (chaptersAdded + (HANDBOOK.length - chaptersAdded) === HANDBOOK.length) {
                console.log(`✅ Migrated ${chaptersAdded}/${HANDBOOK.length} handbook chapters`);
                checkCompletion();
              }
            }
          );
        });
        handbookStmt.finalize();
      }

      let completionCalls = 0;
      function checkCompletion() {
        completionCalls++;
        if (completionCalls === 2) {
          console.log('\n🎉 Migration completed successfully!');
          console.log('\nYou can now view:');
          console.log('  - Slides at: http://localhost:3003/course/1/slides');
          console.log('  - Handbook at: http://localhost:3003/course/1/handbook');
          db.close();
        }
      }
    });
  });
});
