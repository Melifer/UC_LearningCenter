# BiBest Learning Center — Project Context

> **For AI:** Read this file before starting any work. It contains architecture, current state, and key decisions.

---

## Stack

| Layer | Technology | Port |
|-------|------------|------|
| Frontend | React 19 + **Vite**, React Router v7 | 3003 |
| Backend | Node.js + Express.js | 3002 |
| Database | SQLite3 (`backend/learning_center.db`) | — |
| PDF | pdfkit | — |
| MD Parser | gray-matter + custom parser | — |

**Run locally:**
```bash
./start.sh
# or separately:
cd backend && node server.js   # port 3002
cd client && npm start         # Vite dev server on port 3003
```

**Build for production:**
```bash
cd client && npm run build
# Outputs to client/dist/ — served by Express static middleware
```

---

## Project Purpose

Premium training platform — BiBest Learning Center. Covers compliance, regulatory and skills-based trainings. Key characteristics:
- **No registration** — email-only SSO login (auto-provisions users from email)
- **Roles**: `user` (learner) and `admin` only
- **Mandatory courses** with deadlines and refresher cycles
- **Completion = passing the quiz** (not just lesson completion)
- All content in **English**

---

## Project Structure

```
UC_LearningCenter/
├── backend/
│   ├── server.js              # Express API (~1500 lines)
│   ├── utils/
│   │   └── markdownParser.js  # Parses .md files into course structure
│   └── package.json
├── client/
│   ├── public/
│   │   ├── images/
│   │   │   └── BiBestLearningCenter.png  # Transparent logo (2320×464px)
│   │   └── index.html
│   ├── dist/                  # Production build output (served by Express)
│   └── src/
│       ├── App.jsx            # Router, auth state
│       ├── styles.css         # BiBest brand CSS
│       └── components/
│           ├── Login.jsx        # BiBest hero + feature cards + SSO login form
│           ├── Header.jsx       # Logo from /images/
│           ├── Footer.jsx
│           ├── Dashboard.jsx    # Routes to UserDashboard or AdminDashboard
│           ├── UserDashboard.jsx
│           ├── AdminDashboard.jsx
│           ├── CourseList.jsx
│           ├── CoursePage.jsx
│           ├── LessonView.jsx
│           ├── QuizPage.jsx
│           ├── CreateCourse.jsx
│           ├── MarkdownImport.jsx
│           ├── ProfilePage.jsx
│           ├── CertificatesPage.jsx
│           └── Toast.jsx / ToastContainer.jsx
├── start.sh
├── .gitignore
├── README.md
└── PROJECT_CONTEXT.md
```

---

## Database Schema

| Table | Key columns |
|-------|------------|
| `users` | id, email, password, role (user/admin), name |
| `courses` | id, title, description, level, duration, created_by, **status** (draft/published), **mandatory** (0/1), **deadline** (date text), **refresher_months** (int) |
| `modules` | id, course_id, title, description, order_index |
| `lessons` | id, module_id, title, content (markdown), video_url, duration, order_index |
| `quizzes` | id, course_id, title, passing_score |
| `quiz_questions` | id, quiz_id, question, options (JSON), correct_answer, explanation, scenario |
| `enrollments` | id, user_id, course_id, enrolled_at, **completed_at** (set when quiz PASSED) |
| `user_progress` | id, user_id, lesson_id, completed, completed_at |
| `quiz_results` | id, user_id, quiz_id, score, passed, completed_at |
| `slides` | id, course_id, ... (not used in UI, kept for schema compat) |
| `handbook` | id, course_id, ... (not used in UI, kept for schema compat) |

**Important:** `enrollments.completed_at` is set ONLY when the quiz is submitted and passed. This drives the "completed" display across the platform.

---

## API Endpoints

### Auth
- `POST /api/auth/sso-login` — email-only, auto-creates user from email if new
- `POST /api/login` — legacy password-based (for CLI/testing)

### Courses
- `GET /api/courses?role=` — published courses for users, all for admins
- `GET /api/courses/:id` — course detail with modules, lessons, quiz
- `POST /api/enroll` — enroll (auto payment_status=completed)
- `GET /api/my-courses/:userId` — enrolled courses with completed_at
- `PUT /api/courses/:id/publish` / `unpublish`

### Learning
- `POST /api/lesson/complete`
- `POST /api/quiz/submit` — sets enrollment.completed_at if passed
- `GET /api/certificate/:userId/:courseId` — PDF cert
- `GET /api/course/:courseId/progress/:userId`

### Admin
- `GET/POST /api/admin/courses` — list/create
- `PUT /api/admin/update-course/:id`
- `DELETE /api/admin/courses/:id`
- `POST /api/admin/courses/:id/duplicate`
- `POST /api/admin/import-markdown` — parse .md file, return structured course data

---

## Course Markdown Format

```markdown
---
title: "Course Title"
description: "..."
level: "Intermediate"    # Beginner | Intermediate | Advanced
duration: "3 hours"
mandatory: true
deadline: "2026-12-31"
refresher_months: 12
passing_score: 100
---

# Module 1: Title

## Lesson 1.1: Title
Lesson content in **markdown**...

---QUIZ---
**Passing Score:** 100

### Q1
**Question:** Question text?
**Options:**
A) Option A
B) Option B
C) Option C
D) Option D
**Correct:** B
**Explanation:** Explanation text...
```

Note: `---SLIDES---` and `---HANDBOOK---` sections are parsed but NOT displayed in the UI (features removed).

---

## Branding

- **Logo**: `client/public/images/BiBestLearningCenter.png` — transparent PNG (2320×464px), white background removed via ImageMagick flood-fill
- **Red**: `#da291c`
- **Navy**: `#003B6E`
- **Font**: DM Sans (Google Fonts)
- **PDF certificates**: DejaVu Sans (bundled in `backend/fonts/`) — required for Polish characters; Helvetica does NOT support Polish

---

## Demo / Login Accounts

```
admin@bibest.eu   — admin role  (type "Melifer" in Sign In → logs in as admin)
user@bibest.eu    — user role
```

Login form accepts **First Last** (name, not email). Logic in `Login.jsx → resolveEmail()`:
- "John Smith" → `john.smith@bibest.eu`
- "Melifer" → `admin@bibest.eu` (owner shortcut)
- Raw email (contains @) → passed through as-is (demo buttons use this)

**Session reset on logout**: `App.jsx → handleLogout` calls `DELETE /api/users/:id/progress` which deletes `enrollments`, `user_progress`, `quiz_results`. Courses appear as "not started" on next login. DB activity is tracked during the session.

---

## Production Deployment (Cyberfolks / DirectAdmin)

**Live URL**: `https://learning.bibest.eu`

### Stack on server
- Node.js 22.22.2 via CloudLinux Node.js Selector (Phusion Passenger)
- **No native npm modules** — `sqlite3` and `bcrypt` replaced due to GLIBC_2.38 incompatibility with CentOS 7 server
  - `sqlite3` → **Node.js built-in `node:sqlite`** via adapter `backend/utils/db-adapter.js`
  - `bcrypt` → **`bcryptjs`** (pure JS)
- Required ENV variable in DA: `NODE_OPTIONS = --experimental-sqlite`

### Build & deploy process
```bash
# 1. Build frontend (base URL = / for subdomain root)
cd client && npm run build   # outputs to client/dist/

# 2. Create deploy package
cd .. && rm -rf _deploy && mkdir -p _deploy
cp backend/server.js _deploy/server.js
cp backend/package.json _deploy/package.json
cp -r backend/utils _deploy/utils
cp -r backend/fonts _deploy/fonts    # DejaVu fonts for PDF
cp -r docs _deploy/docs
mkdir -p _deploy/client/dist && cp -r client/dist/. _deploy/client/dist/
mkdir -p _deploy/client/public/images
cp client/public/images/BiBestLearningCenter.png _deploy/client/public/images/
cd _deploy && zip -r ../bibest-learning-center.zip . --exclude "*.DS_Store"
```

### Deploy directory structure on server
```
/home/wqlwgszjlw/domains/bibest.eu/learning/
  server.js          ← entry point
  package.json       ← bcryptjs, express, pdfkit, etc. (NO sqlite3, NO bcrypt)
  utils/
    db-adapter.js    ← node:sqlite compatibility layer
    markdownParser.js
  fonts/
    DejaVuSans.ttf
    DejaVuSans-Bold.ttf
  client/
    dist/            ← built React app (served by Express static)
    public/images/   ← logo PNG
  docs/courses/      ← markdown course files
```

### DA Node.js app configuration
| Setting | Value |
|---------|-------|
| App URI | `learning.bibest.eu/` |
| App Root Directory | `/home/wqlwgszjlw/domains/bibest.eu/learning` |
| Startup file | `server.js` |
| Mode | Production |
| ENV: NODE_OPTIONS | `--experimental-sqlite` |

### Critical gotcha — placeholder file
When DA creates a subdomain, it places a placeholder `index.html` at:
`/home/wqlwgszjlw/domains/bibest.eu/public_html/learning/index.html`

**This file must be deleted via FTP** otherwise Apache serves it instead of routing to Node.js (even with Passenger running).

Path to delete: `public_html/learning/index.html`

### FTP structure (Cyberduck connects to domains/bibest.eu/)
```
/               ← FTP root = /home/wqlwgszjlw/domains/bibest.eu/
  learning/     ← Node.js app files (NOT public_html!)
  public_html/
    learning/   ← DELETE index.html from here
    ...
```

---

## Removed Features (do not re-add unless asked)

- ❌ Trainer/trainer role — removed, only user/admin
- ❌ Slides viewer — removed
- ❌ Handbook viewer — removed
- ❌ Messaging system — removed
- ❌ Payment/pricing — removed, all courses free
- ❌ Status filter tabs (Mandatory/In Progress/Completed) in UserDashboard — removed
- ❌ Progress bars and completion badges in course catalog — removed (visual only; DB still tracks)
- ❌ Email notifications toggle — removed
- ❌ Registration page — removed (SSO auto-provision)
- ❌ Dark theme toggle — removed, light-only
- ❌ "Courses" link in header nav — removed (dashboard shows all courses)
- ❌ Admin tabs (Users, Overview, Settings, Payouts) — removed, only Courses tab
