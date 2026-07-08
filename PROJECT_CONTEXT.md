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

- **Logo**: `/images/unicredit-logo.png` (140×28px, official from unicredit.pl)
- **Red**: `#da291c`
- **Navy**: `#003B6E`  
- **Black**: `#0d0d0d`
- **White**: `#ffffff`
- **Font**: DM Sans (Google Fonts)

---

## Demo Accounts

```
admin@unicredit.pl   — admin role
jan.kowalski@unicredit.pl — user role
admin@test.com — admin (legacy)
user@test.com  — user (legacy)
```
All logins use email only (no password prompt).

---

## Removed Features (do not re-add unless asked)

- ❌ Trainer/trainer role — removed, only user/admin
- ❌ Slides viewer (SlidesViewer.js) — removed
- ❌ Handbook viewer (HandbookViewer.js) — removed
- ❌ Messaging system (MessageCenter.js) — removed
- ❌ Payment/pricing — removed, all courses free
- ❌ Email notifications toggle — removed
- ❌ Registration page — removed (SSO auto-provision)
- ❌ Dark theme toggle — removed, light-only
- ❌ "Courses" link in header nav — removed (dashboard shows all courses)
- ❌ Admin tabs (Users, Overview, Settings, Payouts) — removed, only Courses tab
