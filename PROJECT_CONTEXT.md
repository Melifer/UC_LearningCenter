# BiBest Learning Center — Project Context

> **Dla AI:** Ten plik to kompleksowy kontekst projektu. Przeczytaj go zanim zaczniesz pracę. Zawiera architekturę, stan implementacji i zadania do zrobienia.

---

## 🏗️ Stack technologiczny

| Warstwa | Technologia | Port |
|---------|-------------|------|
| Frontend | React 18 (CRA), React Router v6 | 3003 |
| Backend | Node.js + Express.js | 3002 |
| Baza danych | SQLite3 (plik: `backend/learning_center.db`) | — |
| PDF | pdfkit | — |
| Hosting docelowy | Cyberfolks (shared hosting) | — |

**Uruchamianie lokalne:**
```bash
# Backend
cd backend && node server.js

# Frontend
cd client && PORT=3003 npm start
```

---

## 📁 Struktura projektu

```
LearningCenter/
├── backend/
│   ├── server.js                  # Główny serwer Express (~1700 linii)
│   ├── learning_center.db         # SQLite baza danych
│   ├── migrate-legacy-content.js  # Migracja slajdów ze starego systemu
│   ├── migrate-quiz.js            # Migracja quizów
│   └── seed-pro-course.js         # Seed kursu demo
├── client/
│   ├── public/index.html          # title: "BiBest Learning Center"
│   └── src/
│       ├── App.js                 # Router, theme, session management
│       ├── styles.css             # ~6000 linii CSS, design system
│       └── components/
│           ├── Login.js           # Split-screen, demo accounts
│           ├── Register.js        # Split-screen, z imieniem
│           ├── Header.js          # Logo graduation cap SVG, unread messages badge
│           ├── Footer.js
│           ├── Dashboard.js       # Router: UserDashboard | TrainerDashboard | AdminDashboard
│           ├── UserDashboard.js   # Kursy in-progress/not-started/completed, katalog
│           ├── TrainerDashboard.js# Kursy z statusami, submit do weryfikacji, stats
│           ├── AdminDashboard.js  # Users/Kursy/Weryfikacja/Wypłaty/Ustawienia
│           ├── CourseList.js      # Katalog kursów z filtrem, search, enrolled badge
│           ├── CoursePage.js      # Sidebar + lekcje + progress + resources
│           ├── LessonView.js      # Sidebar nawigacja, prev/next, YouTube embed
│           ├── QuizPage.js        # Scenariusze, nawigacja, explanations po quizie
│           ├── CreateCourse.js    # 6-krokowy builder: info/moduły/slajdy/handbook/quiz/preview
│           ├── SlidesViewer.js    # Slajdy z markdown rendering
│           ├── HandbookViewer.js  # Handbook z sidebar TOC, search
│           ├── ProfilePage.js     # Dane konta, zmiana hasła, link do certyfikatów
│           ├── CertificatesPage.js# CPE stats, lista certyfikatów, PDF download
│           ├── MessageCenter.js   # Inbox/Sent, compose, odpowiedź
│           ├── TrainerEarnings.js # Zarobki per kurs, wniosek o wypłatę
│           └── TrainerStudents.js # Lista uczniów z progressem, masowe wiadomości
└── legacy/                        # Stary system — tylko jako referencja do migracji
```

---

## 🗄️ Schemat bazy danych (SQLite)

### Tabele

| Tabela | Opis | Kluczowe kolumny |
|--------|------|------------------|
| `users` | Użytkownicy | id, name, email, password (bcrypt), role (user/trainer/admin), email_notifications |
| `courses` | Kursy | id, title, description, level, duration, price, is_free, created_by, status (draft/pending_review/approved/rejected), trainer_notes, rejection_reason, commission_rate |
| `modules` | Moduły kursu | id, course_id, title, description, order_index, is_demo |
| `lessons` | Lekcje | id, module_id, title, content, video_url, duration, order_index |
| `slides` | Slajdy | id, course_id, slide_number, title, content, notes, order_index |
| `handbook` | Rozdziały handbook | id, course_id, chapter_number, title, content, order_index |
| `quizzes` | Quizy | id, course_id, title, passing_score |
| `quiz_questions` | Pytania quizowe | id, quiz_id, question, options (JSON), correct_answer, scenario, explanation |
| `enrollments` | Zapisy na kursy | id, user_id, course_id, enrolled_at, completed_at, payment_status |
| `user_progress` | Postęp lekcji | id, user_id, lesson_id, completed, completed_at |
| `quiz_results` | Wyniki quizów | id, user_id, quiz_id, score, passed, completed_at |
| `messages` | Wiadomości | id, from_user_id, to_user_id (NULL=broadcast), course_id, subject, content, read |
| `payout_requests` | Wnioski o wypłatę | id, trainer_id, amount, status (pending/completed/rejected), admin_note |
| `platform_settings` | Ustawienia | key, value (trainer_commission_pct=70 domyślnie) |
| `trainer_earnings` | Zarobki (tabela pomocnicza) | id, trainer_id, course_id, user_id, amount |

### Konta testowe
```
admin@test.com     / admin   → role: admin
trainer@test.com   / trainer → role: trainer
user@test.com      / user    → role: user
melifer@bibest.pl  / melifer123 → role: trainer (autor kursu demo)
```

---

## 🔌 API Endpoints (backend/server.js)

### Auth
- `POST /api/register` — rejestracja (name, email, password)
- `POST /api/login` — logowanie

### Courses
- `GET /api/courses?role=&userId=` — lista (filtr po statusie: user widzi tylko approved)
- `GET /api/courses/:id` — szczegóły z modułami, lekcjami, quiz, trainer_name
- `POST /api/enroll` — zapis na kurs
- `GET /api/my-courses/:userId` — kursy użytkownika
- `GET /api/courses/:id/slides` — slajdy kursu
- `GET /api/courses/:id/handbook` — handbook kursu

### Learning
- `POST /api/lesson/complete` — oznacz lekcję jako ukończoną
- `POST /api/quiz/submit` — wyślij odpowiedzi quizu
- `GET /api/certificate/:userId/:courseId` — generuj PDF certyfikat
- `GET /api/course/:courseId/progress/:userId` — postęp w kursie

### Users/Profile
- `GET /api/users/:userId` — profil użytkownika
- `PUT /api/users/:userId` — aktualizuj profil
- `PUT /api/users/:userId/password` — zmień hasło
- `GET /api/users/:userId/certificates` — certyfikaty + CPE stats

### Course Approval Workflow
- `PUT /api/courses/:id/submit` — trener wysyła do weryfikacji
- `PUT /api/courses/:id/draft` — zapisz jako szkic
- `PUT /api/courses/:id/approve` — admin zatwierdza
- `PUT /api/courses/:id/reject` — admin odrzuca (z powodem)
- `GET /api/admin/pending-courses` — lista do weryfikacji

### Trainer
- `GET /api/trainer/courses/:userId` — kursy trenera (all statusy)
- `POST /api/trainer/create-course` — utwórz kurs (z modułami, slajdami, handbook, quiz)
- `PUT /api/trainer/update-course/:id` — aktualizuj kurs (rebuild)
- `GET /api/trainer/earnings/:trainerId` — zarobki per kurs (uwzględnia per-course commission_rate)
- `POST /api/trainer/payout-request` — wniosek o wypłatę
- `GET /api/trainer/students/:trainerId` — uczniowie z progressem

### Admin
- `GET /api/admin/users` — wszyscy użytkownicy
- `POST /api/admin/users` — dodaj użytkownika
- `DELETE /api/admin/users/:id` — usuń użytkownika
- `PUT /api/admin/users/:id/role` — zmień rolę
- `GET /api/admin/courses` — wszystkie kursy
- `PUT /api/admin/courses/:id` — edytuj metadane kursu
- `DELETE /api/admin/courses/:id` — usuń kurs (kaskadowo)
- `POST /api/admin/courses/:id/duplicate` — duplikuj kurs (pełna kopia jako draft)
- `PUT /api/admin/courses/:id/commission` — ustaw prowizję trenera per kurs
- `POST /api/admin/assign-course` — przypisz kurs do usera
- `GET /api/admin/stats` — statystyki platformy + recent activity
- `GET /api/admin/pending-courses` — kursy do weryfikacji
- `GET /api/admin/payouts` — wnioski o wypłatę
- `PUT /api/admin/payouts/:id` — przetwórz wniosek (completed/rejected)
- `GET /api/admin/settings` — ustawienia platformy
- `PUT /api/admin/settings/:key` — aktualizuj ustawienie
- `POST /api/upload/image` — upload obrazka (base64)

### Messaging
- `POST /api/messages` — wyślij wiadomość
- `GET /api/messages/:userId` — inbox
- `GET /api/messages/:userId/sent` — wysłane
- `PUT /api/messages/:id/read` — oznacz jako przeczytane
- `GET /api/messages/:userId/unread-count` — liczba nieprzeczytanych (polling co 30s)
- `GET /api/messaging/contacts/:userId` — lista kontaktów (zależna od roli)

---

## ✅ Co jest zaimplementowane

### Uwierzytelnianie i role
- [x] Rejestracja i logowanie (bcrypt)
- [x] 3 role: user, trainer, admin
- [x] Persistowanie sesji w localStorage (UWAGA: bez JWT — patrz TODO)
- [x] Theme toggle (dark/light) z localStorage

### User Dashboard
- [x] Statystyki klikalne (filtry: wszystkie/w trakcie/ukończone)
- [x] Sekcje: In Progress → Not Started → Completed
- [x] Katalog dostępnych kursów z zapisem i ceną PLN
- [x] Link do certyfikatów

### Course Experience
- [x] CoursePage: sidebar z modułami/lekcjami, progress bars
- [x] LessonView: sidebar nawigacja, breadcrumbs, prev/next, YouTube embed (youtu.be + watch?v=)
- [x] Oznaczanie lekcji jako ukończone → auto-przejście do następnej po 1.2s
- [x] SlidesViewer: markdown rendering, podgląd notatek prezentera
- [x] HandbookViewer: TOC sidebar, wyszukiwanie
- [x] QuizPage: scenariusze, nawigacja między pytaniami, progress, explanations po wyniku
- [x] Certyfikat PDF (jedna strona A4 landscape, dark design, CPE hours, autor kursu)
- [x] CertificatesPage: stats CPE roczne + łącznie, lista certyfikatów

### Course Builder (Trainer)
- [x] 6-krokowy wizard: Podstawy → Moduły&Lekcje → Slajdy → Handbook → Quiz → Podgląd
- [x] YouTube URL embed z live preview
- [x] Upload obrazka z dysku (base64 w markdown)
- [x] Markdown toolbar (H1-H3, bold, italic, code, lista, cytat, obraz, link)
- [x] Live preview slajdów
- [x] Reordering ↑↓ modułów, lekcji, slajdów, rozdziałów, pytań
- [x] Duplikowanie slajdów
- [x] Tryb draft (Zapisz szkic) i Submit do weryfikacji
- [x] Uwagi trenera dla admina przy submisji
- [x] Edycja istniejących kursów (loaduje slajdy, handbook, quiz)

### Trainer Module
- [x] TrainerDashboard: statystyki, lista kursów ze statusami
- [x] Status badge: draft/pending_review/approved/rejected
- [x] Zablokowane usuwanie zatwierdzonych kursów
- [x] TrainerStudents: lista uczniów, progress bars, filtr po kursie, masowe wiadomości
- [x] TrainerEarnings: zarobki per kurs, prowizja per kurs (override globalnej), wniosek o wypłatę

### Admin Panel
- [x] AdminDashboard: 6 zakładek (Przegląd/Weryfikacja/Użytkownicy/Kursy/Wypłaty/Ustawienia)
- [x] Klikalne statystyki w Przeglądzie → nawigacja do zakładek
- [x] Recent Activity z prawdziwymi danymi z bazy
- [x] Weryfikacja kursów: approve/reject z powodem
- [x] Użytkownicy: info o mailingu, zarządzanie rolami, quick assign
- [x] Kursy: prowizja per kurs (input w tabeli), duplikowanie kursów
- [x] Wypłaty: approve/reject wniosków trenera
- [x] Ustawienia: globalna prowizja trenera (%)

### Messaging
- [x] MessageCenter: Inbox + Sent zakładki
- [x] Compose z wyborem odbiorcy (broadcast lub konkretna osoba)
- [x] Odpowiedź z pre-filled adresatem
- [x] Badge nieprzeczytanych w Header (polling 30s)
- [x] Kontakty zależne od roli (user→trainer/admin, trainer→admins+uczniowie, admin→wszyscy)

### Profil/Konto
- [x] ProfilePage: zmiana imienia/emaila, preferencje mailingowe, zmiana hasła
- [x] Stat cards z CPE → link do CertificatesPage

### Infrastructure
- [x] Toast notifications (success/error/info/warning, auto-dismiss)
- [x] Loading spinners
- [x] Filtrowanie kursów po statusie (drafty niewidoczne dla userów)
- [x] Prowizja per kurs z fallback na globalną

---

## ❌ Co jest TODO (przed produkcją)

### 🔴 KRYTYCZNE (blokery bezpieczeństwa)

1. **JWT Authentication**
   - Aktualnie: `localStorage.setItem('user', JSON.stringify({id, role, name}))` — można zmienić w DevTools
   - Potrzeba: `npm install jsonwebtoken` + middleware `verifyToken` na każdym chronionym endpoincie
   - Frontend: axios interceptors z Authorization: Bearer header

2. **Zmienne środowiskowe**
   - Aktualnie: 40+ miejsc z hardcoded `http://localhost:3002`
   - Potrzeba: `client/.env` z `REACT_APP_API_URL=` + `backend/.env` z `JWT_SECRET=`, `PORT=`
   - Zastąpienie wszystkich `http://localhost:3002` przez `process.env.REACT_APP_API_URL`

3. **Autoryzacja endpointów**
   - Aktualnie: żaden endpoint nie weryfikuje czy token jest ważny i czy rola zgadza się z akcją
   - Potrzeba: middleware `requireRole('admin')`, `requireAuth()` na każdym endpoincie

4. **React Production Build**
   - Aktualnie: `npm start` (dev server)
   - Potrzeba: `npm run build` + serwowanie przez nginx lub Express static

### 🟡 WYSOKIE PRIORYTETY

5. **Stripe płatności**
   - Aktualnie: kurs płatny → enrollment.payment_status = 'pending' i na tym koniec
   - Potrzeba: Stripe Checkout session, webhook `/api/stripe/webhook` który ustawia `completed`

6. **Email transakcyjny (SendGrid/Resend)**
   - Potrzeba: potwierdzenie rejestracji, reset hasła, powiadomienie o zapisie, certyfikat na email

7. **Reset hasła**
   - Potrzeba: `POST /api/auth/forgot-password` → token email → `POST /api/auth/reset-password`

8. **PM2 process manager**
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name "bibest-api"
   pm2 startup && pm2 save
   ```

9. **HTTPS / SSL**
   - Let's Encrypt (certbot) lub przez panel Cyberfolks

10. **Storage plików**
    - Aktualnie: obrazki jako base64 inline w treści kursu (trafia do SQLite — wolne/duże)
    - Potrzeba: upload na dysk `/uploads/` lub S3/Cloudinary

### 🟢 WAŻNE (po MVP)

11. Google OAuth (Passport.js)
12. Rate limiting (`npm install express-rate-limit`)
13. Logowanie błędów (Winston + Sentry)
14. Backup bazy danych (cron job)
15. Demo content dla płatnych kursów (oznaczenie modułów jako demo)
16. SEO: meta tags, og:image per kurs
17. Strony prawne: RODO, Regulamin, Polityka prywatności (wymagane UE)
18. Cookie consent banner
19. Google Analytics / Plausible

---

## 🎨 Design System

- **Kolory:** `--uc-red: #cc0000`, dark mode domyślnie, light mode przez `body.light-theme`
- **Fonty:** Inter (UI), Montserrat (nagłówki) — Google Fonts
- **CSS Variables:** `--bg-primary`, `--bg-card`, `--bg-surface`, `--text-primary`, `--text-secondary`, `--border-color`
- **Breakpoints:** responsive, mobile collapse w sidebar
- **Branding:** "BiBest Learning Center", graduation cap SVG logo

---

## 🚀 Deployment (Cyberfolks)

**Planowana architektura:**
```
Internet → nginx (HTTPS 443)
              ├── /          → React build (static files)
              └── /api/*     → Node.js :3002 (reverse proxy)
```

**Pliki do dodania przed deploymentem:**
- `backend/.env` (PORT, JWT_SECRET, DATABASE_URL)
- `client/.env.production` (REACT_APP_API_URL=https://api.twojadomena.pl)
- `nginx.conf`
- `ecosystem.config.js` (PM2)

---

## 📊 Dane demo w bazie

- **Kurs:** "AI Prompt Engineering: Gemini Masterclass" (ID: 4)
  - Autor: Melifer (melifer@bibest.pl)
  - 5 modułów, 13 lekcji, 3 z YouTube
  - 5 slajdów, 4 rozdziały handbook
  - 5 scenariuszowych pytań quizowych
  - Status: approved

---

*Ostatnia aktualizacja: 2026-07-06*
