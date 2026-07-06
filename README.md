# BiBest Learning Center

Profesjonalna platforma e-learningowa (LMS) z pełnym workflow dla:
- **Użytkowników** — kursy, postęp, certyfikaty PDF, wiadomości
- **Trenerów** — kreator kursów (6-step wizard), zarobki, uczniowie
- **Adminów** — weryfikacja kursów, wypłaty, zarządzanie platformą

## Stack

- **Frontend:** React 18, React Router v6
- **Backend:** Node.js + Express.js
- **Baza:** SQLite3
- **PDF:** pdfkit

## Uruchomienie

```bash
# Backend (port 3002)
cd backend
npm install
node server.js

# Frontend (port 3003)
cd client
npm install
PORT=3003 npm start
```

## Konta testowe

| Email | Hasło | Rola |
|-------|-------|------|
| admin@test.com | admin | Admin |
| trainer@test.com | trainer | Trainer |
| user@test.com | user | User |
| melifer@bibest.pl | melifer123 | Trainer (autor kursu demo) |

## Dokumentacja

Zobacz [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) — kompletny opis architektury, API, stanu implementacji i zadań do zrobienia.
