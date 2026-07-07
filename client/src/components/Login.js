import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3002/api/auth/sso-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) { setError(data.error || 'Błąd logowania'); setLoading(false); return; }
      onLogin(data.user);
    } catch (err) {
      setError('Błąd sieci. Spróbuj ponownie.');
      setLoading(false);
    }
  };

  const demoAccounts = [
    { label: 'Admin', email: 'admin@unicredit.pl', color: '#da291c' },
    { label: 'User', email: 'jan.kowalski@unicredit.pl', color: '#1a1a2e' },
  ];

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="login-hero-content">
          <div className="uc-hero-logo">
            <svg viewBox="0 0 48 48" width="56" height="56" fill="none">
              <rect x="4" y="28" width="40" height="14" rx="3" fill="rgba(255,255,255,0.15)"/>
              <rect x="4" y="28" width="40" height="14" rx="3" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
              <path d="M24 6L44 16L24 26L4 16Z" fill="white" opacity="0.9"/>
              <line x1="38" y1="18" x2="38" y2="30" stroke="white" strokeWidth="2.5"/>
              <circle cx="38" cy="31" r="2.5" fill="white"/>
            </svg>
          </div>
          <div className="hero-headline">
            <h2>Twoje centrum<br/><span>szkoleń UniCredit</span></h2>
            <p>Wewnętrzna platforma szkoleń pracowniczych UniCredit. Szkolenia obowiązkowe z polityk, regulacji bankowych i procedur organizacji — w jednym miejscu.</p>
          </div>

          <div className="hero-stats">
            <div className="hero-stat"><span className="hero-stat-val">20+</span><span className="hero-stat-label">Szkoleń</span></div>
            <div className="hero-stat"><span className="hero-stat-val">100%</span><span className="hero-stat-label">Compliance</span></div>
            <div className="hero-stat"><span className="hero-stat-val">PDF</span><span className="hero-stat-label">Certyfikaty</span></div>
          </div>

          <div className="hero-features">
            <div className="hero-feature"><span>📋</span> Szkolenia obowiązkowe i uzupełniające</div>
            <div className="hero-feature"><span>🔔</span> Śledzenie terminów i przypomnień</div>
            <div className="hero-feature"><span>🎓</span> Certyfikaty PDF po ukończeniu</div>
            <div className="hero-feature"><span>🏦</span> Regulacje EBA, GDPR, AML i inne</div>
          </div>
        </div>
      </div>

      <div className="login-form-panel">
        <div className="login-form-wrapper">
          <div className="login-uc-brand">
            <span className="login-uc-name">UniCredit</span>
            <span className="login-uc-sub">Learning Center</span>
          </div>
          <h2 className="login-form-title">Zaloguj się</h2>
          <p className="login-form-sub">Podaj służbowy adres email UniCredit.</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label>Służbowy adres email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="imie.nazwisko@unicredit.pl" autoComplete="email" />
            </div>
            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? <span className="btn-spinner"></span> : 'Zaloguj się przez SSO'}
            </button>
          </form>

          <div className="sso-info-banner">
            <span>🔐 Platforma korzysta z logowania korporacyjnego SSO UniCredit</span>
          </div>

          <div className="login-divider"><span>konta demonstracyjne</span></div>

          <div className="demo-accounts">
            {demoAccounts.map(acc => (
              <button key={acc.label} className="demo-account-btn" style={{ '--acc-color': acc.color }}
                onClick={() => setEmail(acc.email)}>
                <span className="demo-role-badge" style={{ background: acc.color }}>{acc.label}</span>
                <span>{acc.email}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
