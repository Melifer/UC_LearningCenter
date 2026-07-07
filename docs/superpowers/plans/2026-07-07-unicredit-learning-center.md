# UniCredit Learning Center — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform BiBest Learning Center into UniCredit's internal corporate training platform for bank employees — with mandatory/refresher course tracking, markdown-based course import, simplified SSO-prep auth, and UniCredit brand identity.

**Architecture:** React 18 SPA (port 3003) + Express/SQLite backend (port 3002). Auth simplified to email-only (SSO prep). Course workflow: admin imports MD → edits visually → publishes. Users see all published courses on landing page with mandatory/deadline/refresher indicators. Certificates personalized from email mask firstname.lastname@unicredit.country.

**Tech Stack:** React 18, React Router v6, Express.js, SQLite3, pdfkit, gray-matter (new dep for MD frontmatter)

---

## Phase 1 — Branding & Cleanup

### Task 1.1: Install gray-matter for markdown parsing

**Files:**
- Modify: `backend/package.json`

- [ ] Install gray-matter in backend
```bash
cd backend && npm install gray-matter
```
Expected: `gray-matter` added to `node_modules` and `package.json`

- [ ] Commit
```bash
git add backend/package.json backend/package-lock.json
git commit -m "chore: add gray-matter for markdown frontmatter parsing"
```

---

### Task 1.2: Rename portal — HTML title, Header, Footer, public/index.html

**Files:**
- Modify: `client/public/index.html`
- Modify: `client/src/components/Header.js`
- Modify: `client/src/components/Footer.js`

- [ ] Update `client/public/index.html` — change `<title>` and any meta references
  - Replace: `BiBest Learning Center` → `UniCredit Learning Center`

- [ ] Update `client/src/components/Header.js`
  - Replace logo text "BiBest Learning Center" → "UniCredit Learning Center"
  - Remove subtitle "Professional Training Platform" (the `<p>` or `<span>` below the logo)

- [ ] Update `client/src/components/Footer.js`
  - Replace "BiBest Learning Center" → "UniCredit Learning Center"

- [ ] Commit
```bash
git add client/public/index.html client/src/components/Header.js client/src/components/Footer.js
git commit -m "feat: rebrand to UniCredit Learning Center"
```

---

### Task 1.3: Update Login page

**Files:**
- Modify: `client/src/components/Login.js`

- [ ] Replace hero copy:
  - `<h2>` → "Twoje centrum<br/><span>szkoleń UniCredit</span>"
  - Description → "Platforma szkoleń wewnętrznych UniCredit. Obowiązkowe szkolenia z polityk, regulacji i procedur organizacji."
  - Stats: `5+` → `20+`, `Kursów` stays; `100%` → `100%` `Compliance`; `PDF` stays
  - Features:
    - "Szkolenia obowiązkowe i uzupełniające"
    - "Śledzenie postępów i przypomnień"
    - "Certyfikaty PDF po ukończeniu"
    - "Regulacje bankowe (EBA, GDPR, AML)"

- [ ] Change form to email-only (SSO prep) — remove password field:
  - Remove `<div className="login-field">` block for password
  - Change button text to "Zaloguj się"
  - Update `handleSubmit` to call new `/api/auth/sso-login` endpoint (just email)
  - Remove `demoAccounts` divider section — replace with info banner:
    ```jsx
    <div className="sso-info-banner">
      <span>🔐 Platforma korzysta z logowania korporacyjnego SSO</span>
    </div>
    ```
  - Keep two demo buttons (Admin/User) but clicking them POSTs just email

- [ ] Remove `<Link to="/register">` text at bottom

- [ ] Commit
```bash
git add client/src/components/Login.js
git commit -m "feat: update login page for UniCredit SSO-prep (email-only auth)"
```

---

### Task 1.4: Remove Register route and component

**Files:**
- Modify: `client/src/App.js`
- Delete: `client/src/components/Register.js`
- Modify: `client/src/components/Header.js` (if Register link exists)

- [ ] In `App.js`: Remove `import Register` and `<Route path="/register" ...>` 
- [ ] Delete `client/src/components/Register.js`
- [ ] Remove any Register links from Header

- [ ] Commit
```bash
git add -A
git commit -m "feat: remove user registration (SSO-managed identity)"
```

---

### Task 1.5: Backend — SSO-prep login endpoint

**Files:**
- Modify: `backend/server.js`

- [ ] Add new endpoint `POST /api/auth/sso-login`:
  - Accepts `{ email }` only — no password
  - Looks up user by email
  - If not found: creates user with name derived from email (`jan.kowalski@unicredit.pl` → `Jan Kowalski`), role `user`
  - Returns `{ user: { id, email, role, name } }`
  - Helper function `nameFromEmail(email)`:
    ```js
    function nameFromEmail(email) {
      const local = email.split('@')[0]; // jan.kowalski
      return local.split('.').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    }
    ```

- [ ] Keep old `POST /api/login` (password-based) as fallback for admin CLI access

- [ ] Commit
```bash
git add backend/server.js
git commit -m "feat: add SSO-prep endpoint POST /api/auth/sso-login (email-only)"
```

---

### Task 1.6: Fix black bar at bottom of /browse

**Files:**
- Modify: `client/src/styles.css`

- [ ] Find the CSS rule causing black background at page bottom (likely `body`, `html`, or `.course-loading` or `.container` with `min-height` + background)
  - Inspect: look for `background: #000` or `background: var(--bg-*)` on `body`/`html` at end of page
  - The issue is likely that `body` has dark background but the `main` content area doesn't fill the viewport
  - Fix: ensure `.container` or `main` has `min-height: calc(100vh - header_height - footer_height)`
  - Or: add `background: var(--bg-primary)` to `html, body { height: 100%; }` consistently

- [ ] Commit
```bash
git add client/src/styles.css
git commit -m "fix: remove black bar at bottom of browse page"
```

---

## Phase 2 — Remove Unused Modules

### Task 2.1: Remove MessageCenter

**Files:**
- Delete: `client/src/components/MessageCenter.js`
- Modify: `client/src/App.js`
- Modify: `client/src/components/Header.js`
- Modify: `backend/server.js`

- [ ] In `App.js`: Remove `import MessageCenter` and `/messages` route
- [ ] In `Header.js`: Remove messages nav link (✉️ icon + unread badge) and related `useState`/`useEffect` for unread count
- [ ] Delete `client/src/components/MessageCenter.js`
- [ ] In `backend/server.js`: Remove all messaging endpoints (GET/POST `/api/messages/*`, GET `/api/messaging/contacts/:userId`)

- [ ] Commit
```bash
git add -A
git commit -m "feat: remove messaging module"
```

---

### Task 2.2: Remove email notifications

**Files:**
- Modify: `client/src/components/ProfilePage.js`
- Modify: `backend/server.js`

- [ ] In `ProfilePage.js`: 
  - Remove `email_notifications` from state
  - Remove the toggle UI block
  - Remove from `handleSaveProfile` body
- [ ] In `backend/server.js`:
  - Remove `email_notifications` from `PUT /api/users/:userId` handler

- [ ] Commit
```bash
git add client/src/components/ProfilePage.js backend/server.js
git commit -m "feat: remove email notifications toggle"
```

---

### Task 2.3: Remove password change from ProfilePage

**Files:**
- Modify: `client/src/components/ProfilePage.js`

Since auth is now email-only SSO, password change makes no sense.

- [ ] Remove the "Zmień hasło" tab and `handleChangePassword` function and form
- [ ] If ProfilePage has tabs: remove 'password' tab, simplify to single view

- [ ] Commit
```bash
git add client/src/components/ProfilePage.js
git commit -m "feat: remove password change from profile (SSO auth)"
```

---

## Phase 3 — DB Schema + Backend Changes

### Task 3.1: DB migrations for new course fields

**Files:**
- Modify: `backend/server.js`

- [ ] In `initializeDatabase()`, add runtime migrations for new columns:
  ```js
  // Mandatory/deadline/refresher fields
  db.all("PRAGMA table_info(courses)", (err, columns) => {
    if (!columns) return;
    const names = columns.map(c => c.name);
    if (!names.includes('mandatory')) db.run("ALTER TABLE courses ADD COLUMN mandatory INTEGER DEFAULT 0", () => {});
    if (!names.includes('deadline')) db.run("ALTER TABLE courses ADD COLUMN deadline TEXT", () => {});
    if (!names.includes('refresher_months')) db.run("ALTER TABLE courses ADD COLUMN refresher_months INTEGER DEFAULT 0", () => {});
    if (!names.includes('status')) db.run("ALTER TABLE courses ADD COLUMN status TEXT DEFAULT 'published'", () => {});
    if (!names.includes('trainer_notes')) db.run("ALTER TABLE courses ADD COLUMN trainer_notes TEXT", () => {});
    if (!names.includes('rejection_reason')) db.run("ALTER TABLE courses ADD COLUMN rejection_reason TEXT", () => {});
  });
  // Remove email_notifications from users if present (add if missing)
  db.all("PRAGMA table_info(users)", (err, columns) => {
    if (!columns) return;
    const names = columns.map(c => c.name);
    if (!names.includes('email_notifications')) db.run("ALTER TABLE users ADD COLUMN email_notifications INTEGER DEFAULT 1", () => {});
  });
  ```

- [ ] Update `GET /api/courses` endpoint:
  - Remove trainer-special logic (already done)
  - Add `mandatory`, `deadline`, `refresher_months` to SELECT
  - All published courses visible to all: `WHERE status = 'published' OR status = 'approved' OR status IS NULL`

- [ ] Update `GET /api/courses/:id` to include new fields in SELECT

- [ ] Commit
```bash
git add backend/server.js
git commit -m "feat: add mandatory/deadline/refresher_months fields to courses DB"
```

---

### Task 3.2: Simplify course status + admin publish endpoint

**Files:**
- Modify: `backend/server.js`

- [ ] Add `PUT /api/courses/:id/publish` endpoint (sets `status = 'published'`)
- [ ] Add `PUT /api/courses/:id/unpublish` endpoint (sets `status = 'draft'`)
- [ ] Remove submit/approve/reject endpoints OR keep for backward compat but note as deprecated

- [ ] Update `POST /api/admin/create-course` and `PUT /api/admin/update-course/:id`:
  - Remove `price`, `is_free`, `commission_rate` from body handling
  - Add `mandatory`, `deadline`, `refresher_months` to body + DB update

- [ ] Remove all payout endpoints: `GET /api/admin/payouts`, `PUT /api/admin/payouts/:id`, `POST /api/trainer/payout-request`, `GET /api/trainer/earnings/:id`

- [ ] Remove `trainer_commission_pct` from settings usage

- [ ] Commit
```bash
git add backend/server.js
git commit -m "feat: simplify course status to draft/published, remove payouts"
```

---

### Task 3.3: Auto-enrollment on first visit to course

**Files:**
- Modify: `backend/server.js`

Since all courses are free and internal, enrollment should happen automatically when a user accesses a course (or we can just make it auto at enrollment click). Keep the enrollment table but default payment_status to `completed`.

- [ ] Update `POST /api/enroll`: set `payment_status = 'completed'` always
- [ ] Remove payment_status gating from any completion logic

- [ ] Commit
```bash
git add backend/server.js
git commit -m "feat: all course enrollments auto-complete (no payment)"
```

---

## Phase 4 — Frontend Feature Changes

### Task 4.1: Rewrite UserDashboard as CourseList

**Files:**
- Modify: `client/src/components/UserDashboard.js`

The user landing page should be the same view as `CourseList` but enriched with progress indicators and mandatory badges.

- [ ] Replace UserDashboard content with:
  - Same search + level filters as CourseList
  - Cards showing: title, level, mandatory badge (🔴 OBOWIĄZKOWE), deadline (if set), refresher badge (♻️ co X mies.), enrollment status (progress bar or "Rozpocznij")
  - Keep "in progress" / "completed" sections above the catalog (collapsible or always visible)

- [ ] Card structure:
  ```jsx
  <div className="course-card-uc">
    {course.mandatory && <span className="badge-mandatory">🔴 OBOWIĄZKOWE</span>}
    {course.refresher_months > 0 && <span className="badge-refresher">♻️ Refresher co {course.refresher_months}mies.</span>}
    {course.deadline && <span className="badge-deadline">⏰ Do: {formatDate(course.deadline)}</span>}
    <h3>{course.title}</h3>
    <p>{course.description}</p>
    <div className="course-meta">{course.level} · {course.duration}</div>
    {/* progress bar if enrolled */}
    <button onClick={() => handleStart(course.id)}>
      {enrolled ? (progress > 0 ? 'Kontynuuj' : 'Rozpocznij') : 'Zapisz się i rozpocznij'}
    </button>
  </div>
  ```

- [ ] Commit
```bash
git add client/src/components/UserDashboard.js
git commit -m "feat: rewrite user landing as course catalog with mandatory/refresher badges"
```

---

### Task 4.2: Simplify AdminDashboard — Courses tab only

**Files:**
- Modify: `client/src/components/AdminDashboard.js`

- [ ] Remove all tabs except 'courses': delete Overview, Users, Settings, Payouts, Verification tabs
- [ ] Remove all tab-related state: `activeTab`, `users`, `payouts`, `stats`, `settings`
- [ ] Remove all unused handlers: `handleDeleteUser`, `handleChangeRole`, `handleAddUser`, `handleProcessPayout`, `handleSaveSetting`, `handleAssignCourse`
- [ ] Remove modals: AddUser, AssignCourse
- [ ] Remove all fetches except courses
- [ ] Keep: courses list, publish/unpublish toggle, edit, delete, duplicate, create new
- [ ] Add publish/unpublish toggle button per course (calls new endpoints)
- [ ] Show mandatory/deadline/refresher in course row

- [ ] Commit
```bash
git add client/src/components/AdminDashboard.js
git commit -m "feat: simplify AdminDashboard to courses-only view"
```

---

### Task 4.3: Update CreateCourse — remove price fields, add mandatory/deadline/refresher

**Files:**
- Modify: `client/src/components/CreateCourse.js`

Step 1 "Informacje podstawowe":
- [ ] Remove: `price`, `is_free` fields
- [ ] Add to Step 1:
  ```jsx
  <div className="form-group">
    <label>Szkolenie obowiązkowe</label>
    <input type="checkbox" checked={info.mandatory} onChange={e => setInfo({...info, mandatory: e.target.checked})} />
    <span>Wymagane dla wszystkich pracowników</span>
  </div>
  <div className="form-group">
    <label>Termin wykonania</label>
    <input type="date" value={info.deadline || ''} onChange={e => setInfo({...info, deadline: e.target.value})} />
  </div>
  <div className="form-group">
    <label>Refresher (co ile miesięcy)</label>
    <input type="number" min="0" placeholder="0 = brak" value={info.refresher_months || 0} onChange={e => setInfo({...info, refresher_months: parseInt(e.target.value) || 0})} />
  </div>
  ```

- [ ] Remove `trainerNotes` state and UI block (Step 6 submit notes)
- [ ] Update payload to include `mandatory`, `deadline`, `refresher_months`
- [ ] Change submit text: "Wyślij do weryfikacji" → "Publikuj" (calls publish endpoint after save)
- [ ] Remove "Zapisz jako szkic i wyślij do weryfikacji" option — replace with "Zapisz jako szkic" and "Publikuj"

- [ ] Commit
```bash
git add client/src/components/CreateCourse.js
git commit -m "feat: update CreateCourse with mandatory/deadline/refresher, remove price"
```

---

### Task 4.4: Add Publish/Unpublish to App.js routes

**Files:**
- Modify: `client/src/App.js`

- [ ] Change trainer routes (already renamed to `/admin/*`) — verify they work
- [ ] Remove `/messages` route (already done in 2.1)

- [ ] Commit
```bash
git add client/src/App.js
git commit -m "chore: clean up routes after module removal"
```

---

## Phase 5 — Markdown Import Feature

### Task 5.1: Backend markdown parser utility

**Files:**
- Create: `backend/utils/markdownParser.js`

- [ ] Create `backend/utils/markdownParser.js` with full parser:

```js
const matter = require('gray-matter');

/**
 * Parses a course markdown file into structured course data.
 * 
 * Expected markdown structure:
 * ---
 * title: "Course Title"
 * description: "..."
 * level: "Intermediate"        # Beginner | Intermediate | Advanced
 * duration: "3 hours"
 * language: "en"
 * mandatory: true
 * deadline: "2026-12-31"
 * refresher_months: 12
 * passing_score: 100
 * ---
 * 
 * # Module 1: Title
 * ## Lesson 1.1: Title
 * Lesson content...
 * 
 * ---SLIDES---
 * ## Slide 1
 * **Layout:** cover
 * **Title:** Slide Title
 * **Content:**
 * Content text...
 * 
 * ---HANDBOOK---
 * ## Chapter 1: Title
 * Content...
 * 
 * ---QUIZ---
 * **Passing Score:** 100
 * 
 * ### Q1
 * **Question:** Question text?
 * **Options:**
 * A) Option A
 * B) Option B
 * C) Option C
 * D) Option D
 * **Correct:** B
 * **Explanation:** ...
 */
function parseCourseMarkdown(mdText) {
  const { data: frontmatter, content } = matter(mdText);

  // Split into sections by ---SLIDES---, ---HANDBOOK---, ---QUIZ---
  const [modulesRaw, ...rest] = content.split(/^---(?:SLIDES|HANDBOOK|QUIZ)---$/m);
  const slidesStart = content.indexOf('---SLIDES---');
  const handbookStart = content.indexOf('---HANDBOOK---');
  const quizStart = content.indexOf('---QUIZ---');

  const getSection = (start, end) => {
    if (start === -1) return '';
    const from = start + (content.indexOf('\n', start) + 1);
    const to = end !== -1 ? end : content.length;
    return content.slice(from, to).trim();
  };

  const modulesText = slidesStart !== -1 ? content.slice(0, slidesStart) :
                      handbookStart !== -1 ? content.slice(0, handbookStart) :
                      quizStart !== -1 ? content.slice(0, quizStart) : content;
  const slidesText = getSection(slidesStart, handbookStart !== -1 ? handbookStart : quizStart !== -1 ? quizStart : undefined);
  const handbookText = getSection(handbookStart, quizStart !== -1 ? quizStart : undefined);
  const quizText = getSection(quizStart, undefined);

  return {
    info: {
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      level: frontmatter.level || 'Intermediate',
      duration: frontmatter.duration || '1 hour',
      language: frontmatter.language || 'en',
      mandatory: frontmatter.mandatory === true,
      deadline: frontmatter.deadline || null,
      refresher_months: parseInt(frontmatter.refresher_months) || 0,
    },
    passing_score: parseInt(frontmatter.passing_score) || 100,
    modules: parseModules(modulesText),
    slides: parseSlides(slidesText),
    handbook: parseHandbook(handbookText),
    quiz: parseQuiz(quizText, frontmatter.passing_score),
  };
}

function parseModules(text) {
  if (!text.trim()) return [];
  const modules = [];
  // Split on # Module N: Title (H1 headings)
  const moduleBlocks = text.split(/^# /m).filter(Boolean);
  moduleBlocks.forEach(block => {
    const lines = block.split('\n');
    const moduleTitle = lines[0].replace(/^Module \d+:\s*/i, '').trim();
    const moduleContent = lines.slice(1).join('\n');
    // Split on ## Lesson N.N: Title (H2 headings)
    const lessonBlocks = moduleContent.split(/^## /m).filter(Boolean);
    const lessons = lessonBlocks.map(lb => {
      const llines = lb.split('\n');
      const lessonTitle = llines[0].replace(/^Lesson \d+\.\d+:\s*/i, '').trim();
      const lessonContent = llines.slice(1).join('\n').trim();
      return { title: lessonTitle, content: lessonContent, duration: 15, video_url: null };
    });
    if (moduleTitle) modules.push({ title: moduleTitle, description: '', lessons });
  });
  return modules;
}

function parseSlides(text) {
  if (!text.trim()) return [];
  const slides = [];
  const slideBlocks = text.split(/^## /m).filter(Boolean);
  slideBlocks.forEach((block, i) => {
    const lines = block.split('\n');
    const slideHeading = lines[0].trim();
    const body = lines.slice(1).join('\n');
    const layout = extractField(body, 'Layout') || 'default';
    const title = extractField(body, 'Title') || slideHeading;
    const contentStart = body.indexOf('**Content:**\n');
    const content = contentStart !== -1 ? body.slice(contentStart + 13).trim() : body.trim();
    const notes = extractField(body, 'Notes') || '';
    slides.push({ title, content, notes, layout, slide_number: i + 1, order_index: i + 1 });
  });
  return slides;
}

function parseHandbook(text) {
  if (!text.trim()) return [];
  const chapters = [];
  const chapterBlocks = text.split(/^## /m).filter(Boolean);
  chapterBlocks.forEach((block, i) => {
    const lines = block.split('\n');
    const chapterTitle = lines[0].replace(/^Chapter \d+:\s*/i, '').trim();
    const content = lines.slice(1).join('\n').trim();
    chapters.push({ title: chapterTitle, content, chapter_number: i + 1, order_index: i + 1 });
  });
  return chapters;
}

function parseQuiz(text, defaultScore) {
  if (!text.trim()) return { passing_score: parseInt(defaultScore) || 100, questions: [] };
  const lines = text.split('\n');
  let passing_score = parseInt(defaultScore) || 100;
  const psLine = lines.find(l => l.startsWith('**Passing Score:**'));
  if (psLine) passing_score = parseInt(psLine.replace('**Passing Score:**', '').trim()) || 100;

  const questions = [];
  const questionBlocks = text.split(/^### Q\d+/m).filter(Boolean);
  questionBlocks.forEach(block => {
    const question = extractField(block, 'Question');
    const correctLetter = (extractField(block, 'Correct') || 'A').trim().toUpperCase();
    const explanation = extractField(block, 'Explanation') || '';
    const scenario = extractField(block, 'Scenario') || '';
    // Parse options: lines starting with A) B) C) D)
    const optionLines = block.split('\n').filter(l => /^[A-D]\)/.test(l.trim()));
    const options = optionLines.map(l => l.replace(/^[A-D]\)\s*/, '').trim());
    const correct_answer = ['A', 'B', 'C', 'D'].indexOf(correctLetter);
    if (question && options.length) {
      questions.push({ question, options: JSON.stringify(options), correct_answer: correct_answer >= 0 ? correct_answer : 0, explanation, scenario });
    }
  });

  return { passing_score, questions };
}

function extractField(text, fieldName) {
  const regex = new RegExp(`\\*\\*${fieldName}:\\*\\*\\s*(.+?)(?=\\n|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

module.exports = { parseCourseMarkdown };
```

- [ ] Commit
```bash
git add backend/utils/markdownParser.js
git commit -m "feat: add markdown course parser utility"
```

---

### Task 5.2: Backend markdown import endpoint

**Files:**
- Modify: `backend/server.js`

- [ ] Install `multer` for file upload handling:
```bash
cd backend && npm install multer
```

- [ ] Add endpoint `POST /api/admin/import-markdown` (multipart/form-data with file):
```js
const multer = require('multer');
const { parseCourseMarkdown } = require('./utils/markdownParser');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

app.post('/api/admin/import-markdown', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const text = req.file.buffer.toString('utf-8');
    const parsed = parseCourseMarkdown(text);
    res.json({ success: true, course: parsed });
  } catch (err) {
    res.status(400).json({ error: 'Failed to parse markdown: ' + err.message });
  }
});
```

- [ ] Commit
```bash
git add backend/server.js backend/package.json backend/package-lock.json
git commit -m "feat: add POST /api/admin/import-markdown endpoint"
```

---

### Task 5.3: Frontend — Markdown Import component

**Files:**
- Create: `client/src/components/MarkdownImport.js`
- Modify: `client/src/components/AdminDashboard.js`
- Modify: `client/src/App.js`

- [ ] Create `client/src/components/MarkdownImport.js`:
  - File drag-and-drop / click to upload `.md` file
  - POST to `/api/admin/import-markdown`
  - On success: navigate to `/admin/create-course` with state containing parsed course data
  - Show parse errors inline
  ```jsx
  const MarkdownImport = ({ showToast }) => {
    const navigate = useNavigate();
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleFile = async (file) => {
      if (!file || !file.name.endsWith('.md')) {
        setError('Wybierz plik .md'); return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('http://localhost:3002/api/admin/import-markdown', { method: 'POST', body: formData });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) { setError(data.error); return; }
      navigate('/admin/create-course', { state: { importedCourse: data.course } });
    };
    
    return (
      <div className="md-import-container">
        <h2>Importuj kurs z Markdown</h2>
        <div className={`md-dropzone ${dragging ? 'dragging' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => document.getElementById('md-file-input').click()}>
          {loading ? <div className="loading-spinner" /> : 
            <div><p>📄 Przeciągnij plik .md lub kliknij aby wybrać</p><small>Maks. 5MB</small></div>}
          <input id="md-file-input" type="file" accept=".md" style={{display:'none'}}
            onChange={e => handleFile(e.target.files[0])} />
        </div>
        {error && <div className="import-error">{error}</div>}
        <div className="md-format-hint">
          <h4>Format pliku:</h4>
          <pre>{`---\ntitle: "Tytuł kursu"\nmandatory: true\ndeadline: "2026-12-31"\nrefresher_months: 12\npassing_score: 100\n---\n\n# Module 1: Tytuł\n## Lesson 1.1: Tytuł\nTreść lekcji...\n\n---SLIDES---\n## Slide 1\n**Title:** ...\n**Content:**\nTreść...\n\n---HANDBOOK---\n## Chapter 1: Tytuł\nTreść...\n\n---QUIZ---\n### Q1\n**Question:** Pytanie?\n**Options:**\nA) ...\nB) ...\n**Correct:** A\n**Explanation:** ...`}</pre>
        </div>
      </div>
    );
  };
  ```

- [ ] In `AdminDashboard.js`: Add "Import Markdown" button in courses header → navigates to `/admin/import-markdown`

- [ ] In `App.js`: Add route `/admin/import-markdown` → `<MarkdownImport>`

- [ ] In `CreateCourse.js`: Read `location.state?.importedCourse` with `useLocation()` and pre-fill all state on mount

- [ ] Commit
```bash
git add client/src/components/MarkdownImport.js client/src/components/AdminDashboard.js client/src/App.js client/src/components/CreateCourse.js
git commit -m "feat: markdown course import with visual preview/edit flow"
```

---

## Phase 6 — Certificates & CSS

### Task 6.1: Update PDF certificate — UniCredit branding

**Files:**
- Modify: `backend/server.js` (certificate endpoint ~line 700-800)

- [ ] In `GET /api/certificate/:userId/:courseId`:
  - Update `data.name`: parse from email if name not set properly
    ```js
    function nameFromEmail(email) {
      const local = email.split('@')[0];
      return local.split('.').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    }
    // Use: data.name = user.name || nameFromEmail(user.email)
    ```
  - Change color from `#cc0000` → `#da291c` (UniCredit red)
  - Change "Learning Center" → "UniCredit Learning Center"  
  - Remove "Professional Training Platform" subtitle
  - Change signature lines: "UniCredit Learning Center" / "Training & Development" instead of trainer name
  - Background: keep dark (#1a1a2e or similar professional dark) or switch to white/light
  - Add "UniCredit S.A." branding text in footer

- [ ] Commit
```bash
git add backend/server.js
git commit -m "feat: update PDF certificate with UniCredit branding and email-derived name"
```

---

### Task 6.2: CSS overhaul — UniCredit corporate identity

**Files:**
- Modify: `client/src/styles.css`

UniCredit design language:
- Primary red: `#da291c`
- Dark navy: `#1a1a2e` (or `#0d1b2a`)
- White: `#ffffff`
- Light gray bg: `#f5f5f5`
- Font: `'Helvetica Neue', Arial, sans-serif` (already close to current)
- Clean, corporate, minimal shadows

- [ ] Update CSS variables:
  ```css
  :root {
    --brand-red: #da291c;
    --brand-dark: #1a1a2e;
    --bg-primary: #ffffff;
    --bg-secondary: #f5f7fa;
    --bg-card: #ffffff;
    --text-primary: #1a1a2e;
    --text-secondary: #555566;
    --text-muted: #888899;
    --border-color: #e0e0e8;
    --accent: #da291c;
    --accent-hover: #b81e14;
  }
  ```
- [ ] Update `.header` background to white with bottom border (like unicredit.pl)
- [ ] Update `.button-primary` to `#da291c`
- [ ] Update login hero: UniCredit-style with red left panel
- [ ] Add mandatory/refresher/deadline badge styles
- [ ] Add markdown import dropzone styles
- [ ] Remove dark-theme toggle (or keep as optional class)
- [ ] Fix bottom black bar issue (body background consistency)

- [ ] Commit
```bash
git add client/src/styles.css
git commit -m "feat: UniCredit corporate CSS theme (red #da291c, clean corporate)"
```

---

## Phase 7 — First Course: EBA ICT Security

### Task 7.1: Create EBA ICT course markdown file

**Files:**
- Create: `docs/courses/eba-ict-security-risk-management.md`

- [ ] Fetch and read EBA Guidelines PDF content:
  URL: https://www.eba.europa.eu/sites/default/files/document_library/Publications/Guidelines/2020/GLs%20on%20ICT%20and%20security%20risk%20management/872936/Final%20draft%20Guidelines%20on%20ICT%20and%20security%20risk%20management.pdf

- [ ] Create professional course with:
  - Frontmatter: mandatory=true, refresher_months=12, passing_score=100, level=Intermediate
  - 5 modules covering EBA Guidelines structure:
    1. Introduction & Scope
    2. ICT Risk Management Framework
    3. ICT Security Risk
    4. ICT Operations Risk
    5. ICT Project and Change Risk
  - ~15 lessons total
  - 10+ slides
  - Full handbook (executive summary + each module)
  - 10 quiz questions, passing_score: 100 (all correct required)

- [ ] Commit
```bash
git add docs/courses/eba-ict-security-risk-management.md
git commit -m "content: add EBA ICT & Security Risk Management course (markdown)"
```

---

### Task 7.2: Load EBA course as seed data

**Files:**
- Modify: `backend/server.js`

- [ ] In `createDefaultData()`: After user creation, load EBA course from markdown if courses table is empty:
  ```js
  const { parseCourseMarkdown } = require('./utils/markdownParser');
  const fs = require('fs');
  const path = require('path');
  
  db.get('SELECT COUNT(*) as count FROM courses', (err, row) => {
    if (!err && row.count === 0) {
      const mdPath = path.join(__dirname, '../docs/courses/eba-ict-security-risk-management.md');
      if (fs.existsSync(mdPath)) {
        const mdText = fs.readFileSync(mdPath, 'utf-8');
        const parsed = parseCourseMarkdown(mdText);
        createCourseFromParsed(parsed, 1); // created_by admin user id=1
      }
    }
  });
  ```

- [ ] Implement `createCourseFromParsed(parsed, userId)` function that inserts into: courses, modules, lessons, slides, handbook, quizzes, quiz_questions

- [ ] Commit
```bash
git add backend/server.js
git commit -m "feat: seed EBA ICT course from markdown on first startup"
```

---

## Phase 8 — Documentation

### Task 8.1: Update PROJECT_CONTEXT.md

**Files:**
- Modify: `PROJECT_CONTEXT.md`

- [ ] Complete rewrite to reflect new architecture:
  - New name: UniCredit Learning Center
  - Updated component list (removed: MessageCenter, TrainerDashboard, etc.)
  - New DB schema with mandatory/deadline/refresher fields
  - New API endpoints
  - Auth: SSO-prep email-only
  - Roles: user / admin
  - Course workflow: admin creates/imports → publishes → visible to all

- [ ] Commit
```bash
git add PROJECT_CONTEXT.md
git commit -m "docs: update PROJECT_CONTEXT.md for UniCredit Learning Center"
```

---

### Task 8.2: Update README.md

**Files:**
- Modify: `README.md`

- [ ] Update with:
  - Project name and description
  - Setup instructions (npm install in both backend/ and client/)
  - Start commands (or reference start.sh)
  - Auth note: email-only for SSO prep
  - Course import: markdown format description with link to example

- [ ] Final commit
```bash
git add README.md
git commit -m "docs: update README.md for UniCredit Learning Center"
```

---

### Task 8.3: Final push

- [ ] Push all changes
```bash
git push origin main
```

---

## File Map Summary

| File | Action | Phase |
|------|--------|-------|
| `backend/utils/markdownParser.js` | CREATE | 5.1 |
| `docs/courses/eba-ict-security-risk-management.md` | CREATE | 7.1 |
| `client/src/components/MarkdownImport.js` | CREATE | 5.3 |
| `client/src/components/Login.js` | MODIFY | 1.3 |
| `client/src/components/Header.js` | MODIFY | 1.2, 2.1 |
| `client/src/components/Footer.js` | MODIFY | 1.2 |
| `client/src/components/AdminDashboard.js` | MODIFY | 4.2, 5.3 |
| `client/src/components/UserDashboard.js` | MODIFY | 4.1 |
| `client/src/components/CreateCourse.js` | MODIFY | 4.3, 5.3 |
| `client/src/components/ProfilePage.js` | MODIFY | 2.2, 2.3 |
| `client/src/components/Register.js` | DELETE | 1.4 |
| `client/src/components/MessageCenter.js` | DELETE | 2.1 |
| `client/src/App.js` | MODIFY | 1.4, 2.1, 4.4, 5.3 |
| `client/src/styles.css` | MODIFY | 1.6, 6.2 |
| `client/public/index.html` | MODIFY | 1.2 |
| `backend/server.js` | MODIFY | 1.5, 2.1, 2.2, 3.1-3.3, 5.2, 6.1, 7.2 |
| `PROJECT_CONTEXT.md` | MODIFY | 8.1 |
| `README.md` | MODIFY | 8.2 |
