# UniCredit Learning Center — Project Context

> **Dla AI:** Ten plik to kompleksowy kontekst projektu. Przeczytaj go zanim zaczniesz pracę.

---

## 🏗️ Stack technologiczny

| Warstwa | Technologia | Port |
|---------|-------------|------|
| Frontend | React 18 (CRA), React Router v6 | 3003 |
| Backend | Node.js + Express.js | 3002 |
| Baza danych | SQLite3 (plik: `backend/learning_center.db`) | — |
| PDF | pdfkit | — |
| Markdown parser | gray-matter + własny parser | — |

**Uruchamianie:**
```bash
cd backend && node server.js
cd client && PORT=3003 npm start
# lub:
./start.sh
```

---

## 🎯 Cel platformy

Wewnętrzna platforma szkoleń UniCredit dla pracowników banku. Umożliwia:
- Realizację szkoleń obowiązkowych (compliance, regulacje bankowe)
- Śledzenie terminów i odnawianie szkoleń (refresher)
- Certyfikaty PDF personalizowane na podstawie emaila pracownika
- Import szkoleń z pliku Markdown przez admina

---

## 👥 Role użytkowników

| Rola | Możliwości |
|------|-----------|
| `user` | Przeglądanie i realizacja kursów, certyfikaty |
| `admin` | Zarządzanie kursami, import MD, publikacja |

**Brak rejestracji** — konta tworzone przez SSO (lub auto-provisioning po emailu).

**Auth:** `POST /api/auth/sso-login` — przyjmuje tylko email, auto-tworzy usera jeśli nie istnieje. Imię/nazwisko z emaila: `jan.kowalski@unicredit.pl` → `Jan Kowalski`.

---

## 📁 Struktura projektu

```
LearningCenter/
├── backend/
│   ├── server.js                  # Express (~1600 linii)
│   ├── utils/markdownParser.js    # Parser kursów z .md
│   └── package.json
├── client/
│   └── src/
│       ├── App.js
│       ├── styles.css             # UniCredit brand (red #da291c)
│       └── components/
│           ├── Login.js           # Email-only SSO prep
│           ├── Dashboard.js       # Router: UserDashboard | AdminDashboard
│           ├── UserDashboard.js   # Katalog kursów z postępem i oznaczeniami
│           ├── AdminDashboard.js  # Zarządzanie kursami (publish/unpublish)
│           ├── CourseList.js      # /browse — katalog
│           ├── CoursePage.js      # Szczegóły kursu
│           ├── LessonView.js      # Widok lekcji
│           ├── QuizPage.js        # Quiz
│           ├── CreateCourse.js    # Builder kursu (6 kroków) + import MD pre-fill
│           ├── MarkdownImport.js  # Upload .md → pre-fill CreateCourse
│           ├── SlidesViewer.js    # Slajdy
│           ├── HandbookViewer.js  # Handbook
│           ├── ProfilePage.js     # Profil (bez hasła, bez email notif.)
│           └── CertificatesPage.js
├── docs/
│   ├── courses/
│   │   └── eba-ict-security-risk-management.md  # Pierwsze szkolenie
│   └── superpowers/plans/
└── legacy/                        # Stary system — tylko referencja
```

---

## 🗄️ Schemat bazy danych

| Tabela | Kluczowe kolumny |
|--------|-----------------|
| `users` | id, email, password, role (user/admin), name |
| `courses` | id, title, description, level, duration, created_by, status (draft/published), mandatory (0/1), deadline (date), refresher_months (int) |
| `modules` | id, course_id, title, description, order_index |
| `lessons` | id, module_id, title, content, video_url, duration, order_index |
| `slides` | id, course_id, slide_number, title, content, notes, order_index |
| `handbook` | id, course_id, chapter_number, title, content, order_index |
| `quizzes` | id, course_id, title, passing_score |
| `quiz_questions` | id, quiz_id, question, options (JSON), correct_answer, scenario, explanation |
| `enrollments` | id, user_id, course_id, enrolled_at, completed_at, payment_status (always 'completed') |
| `user_progress` | id, user_id, lesson_id, completed, completed_at |
| `quiz_results` | id, user_id, quiz_id, score, passed, completed_at |

---

## 🔌 API Endpoints

### Auth
- `POST /api/auth/sso-login` — logowanie email-only (SSO prep), auto-provisioning
- `POST /api/login` — legacy password login (admin/testing)

### Courses
- `GET /api/courses?role=` — lista (user=published, admin=wszystkie)
- `GET /api/courses/:id` — szczegóły z modułami, lekcjami, quiz
- `POST /api/enroll` — zapis (payment_status=completed zawsze)
- `GET /api/my-courses/:userId` — kursy użytkownika
- `GET /api/courses/:id/slides` — slajdy
- `GET /api/courses/:id/handbook` — handbook
- `PUT /api/courses/:id/publish` — opublikuj
- `PUT /api/courses/:id/unpublish` — cofnij do draft

### Learning
- `POST /api/lesson/complete` — ukończ lekcję
- `POST /api/quiz/submit` — wyślij quiz
- `GET /api/certificate/:userId/:courseId` — PDF certyfikat
- `GET /api/course/:courseId/progress/:userId` — postęp

### Admin
- `GET /api/admin/courses` — wszystkie kursy
- `POST /api/admin/create-course` — nowy kurs
- `PUT /api/admin/update-course/:id` — aktualizuj
- `DELETE /api/admin/courses/:id` — usuń
- `POST /api/admin/courses/:id/duplicate` — duplikuj
- `POST /api/admin/import-markdown` — import z .md (multipart)

---

## 📄 Format Markdown (import kursów)

```markdown
---
title: "Tytuł"
description: "Opis"
level: "Intermediate"
duration: "3 hours"
mandatory: true
deadline: "2026-12-31"
refresher_months: 12
passing_score: 100
---

# Module 1: Tytuł
## Lesson 1.1: Tytuł
Treść...

---SLIDES---
## Slide 1
**Title:** ...
**Content:**
...

---HANDBOOK---
## Chapter 1: Tytuł
...

---QUIZ---
### Q1
**Question:** Pytanie?
**Options:**
A) ...
B) ...
**Correct:** B
**Explanation:** ...
```

---

## 🎨 Brand

- Czerwień UniCredit: `#da291c`
- Ciemny granat: `#1a1a2e`
- Tło: biały/jasny szary `#f5f7fa`
- Font: Helvetica Neue / Arial

---

## 🔑 Konta demo

```
admin@unicredit.pl / admin → role: admin
jan.kowalski@unicredit.pl / user → role: user
admin@test.com / admin → role: admin (legacy)
user@test.com / user → role: user (legacy)
```
