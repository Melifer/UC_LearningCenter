# UniCredit Learning Center

Internal employee training platform for UniCredit bank staff. Provides mandatory compliance trainings (EBA, GDPR, AML, internal policies) with certificate issuance, progress tracking, and admin course management.

## Quick start (local development)

```bash
# 1. Install dependencies
cd backend && npm install
cd ../client && npm install

# 2. Start everything
cd .. && ./start.sh
```

Open http://localhost:3003

**Demo accounts** (email-only login — no password):
- `admin@unicredit.pl` — admin dashboard
- `jan.kowalski@unicredit.pl` — employee view

---

## Deployment to production server

### Option 1 — VPS / Cloud (recommended)

Requirements: Ubuntu 22+, Node.js 18+, nginx

```bash
# On the server:
git clone https://github.com/Melifer/UC_LearningCenter.git
cd UC_LearningCenter

# Install deps
cd backend && npm install --production
cd ../client && npm install && npm run build

# Build output is in client/build/ — serve via Express or nginx
# To serve with Express, configure server.js to serve static files:
# app.use(express.static(path.join(__dirname, '../client/build')))
```

**Run backend as a daemon (PM2):**
```bash
npm install -g pm2
pm2 start backend/server.js --name "uc-learning-backend"
pm2 startup && pm2 save
```

**nginx config** (reverse proxy):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Serve React app
    location / {
        root /path/to/UC_LearningCenter/client/build;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API to backend
    location /api {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Option 2 — Cyberfolks shared hosting

Cyberfolks supports Node.js via their control panel:

1. Log in to cPanel → **Setup Node.js App**
2. Create app: Application root = `backend/`, startup file = `server.js`, Node version ≥ 18
3. Run in SSH: `npm install --production` in the backend folder
4. Build frontend: locally run `cd client && npm run build`, then upload `client/build/` contents to `public_html/` (or subdirectory)
5. Configure `.htaccess` in `public_html/` for SPA routing:
   ```
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QSA,L]
   ```
6. Update `API_URL` in frontend if backend runs on a different port/domain

### Environment variables

Create `backend/.env`:
```
PORT=3002
# Add any secrets here (JWT secret for future SSO integration)
```

---

## Adding new courses

1. **Via Markdown** (recommended): Write a `.md` file following the format in `docs/courses/eba-ict-security-risk-management.md`, then go to Admin Dashboard → Import Markdown.

2. **Via builder**: Admin Dashboard → New Training → 6-step visual builder.

---

## Tech stack

- **Frontend**: React 18, React Router v6, DM Sans font
- **Backend**: Node.js, Express.js
- **Database**: SQLite3 (auto-created at `backend/learning_center.db`)
- **PDF**: pdfkit (certificates)
- **Auth**: Email-only SSO prep (future: connect to corporate SSO)
