# UniCredit Learning Center

Wewnętrzna platforma szkoleń pracowniczych UniCredit. Umożliwia realizację obowiązkowych i opcjonalnych szkoleń z polityk wewnętrznych i regulacji bankowych (EBA, GDPR, AML i inne).

## Szybki start

```bash
# Instalacja
cd backend && npm install
cd ../client && npm install

# Uruchomienie (backend + frontend)
./start.sh
# lub osobno:
cd backend && node server.js        # http://localhost:3002
cd client && PORT=3003 npm start    # http://localhost:3003
```

## Logowanie

Platforma używa logowania email-only (SSO prep). Wpisz służbowy email UniCredit — konto zostanie automatycznie utworzone przy pierwszym logowaniu.

**Konta demo:**
- `admin@unicredit.pl` — panel administratora
- `jan.kowalski@unicredit.pl` — widok pracownika

## Funkcje

### Dla pracowników (User)
- Katalog dostępnych szkoleń z oznaczeniami obowiązkowych
- Śledzenie postępu i terminów realizacji
- Quizy z progiem zdawalności (domyślnie 100% dla szkoleń obowiązkowych)
- Certyfikaty PDF generowane po ukończeniu
- Refresher — automatyczne powiadomienie o wymaganym odnowieniu szkolenia

### Dla administratorów
- Zarządzanie szkoleniami (tworzenie, edycja, publikacja)
- **Import z Markdown** — wczytaj plik `.md` ze strukturą kursu, przejrzyj i opublikuj
- Builder wizualny (6 kroków: Podstawy → Moduły → Slajdy → Handbook → Quiz → Podgląd)
- Publish/Unpublish jednym kliknięciem

## Import kursu z Markdown

Admin może importować szkolenia z pliku `.md`. Format:

```markdown
---
title: "Tytuł szkolenia"
mandatory: true
deadline: "2026-12-31"
refresher_months: 12
passing_score: 100
---

# Module 1: Tytuł
## Lesson 1.1: Tytuł lekcji
Treść...

---SLIDES---
---HANDBOOK---
---QUIZ---
```

Pełna dokumentacja formatu: [docs/superpowers/plans/](docs/superpowers/plans/)

## Pierwsze szkolenie

`docs/courses/eba-ict-security-risk-management.md` — profesjonalne szkolenie z wytycznych **EBA/GL/2019/04** (EBA ICT & Security Risk Management Guidelines). Ładowane automatycznie przy pierwszym uruchomieniu.

## Stack technologiczny

| Warstwa | Technologia |
|---------|-------------|
| Frontend | React 18, React Router v6 |
| Backend | Node.js, Express.js |
| Baza danych | SQLite3 |
| PDF | pdfkit |
| Markdown parser | gray-matter |

## Środowisko

- Backend: `http://localhost:3002`
- Frontend: `http://localhost:3003`
- Baza danych: `backend/learning_center.db` (auto-tworzona)
