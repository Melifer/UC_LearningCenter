import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3002/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) { setError(data.error || 'Login failed'); setLoading(false); return; }
      onLogin(data.user);
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const demoAccounts = [
    { label: 'Admin', email: 'admin@test.com', pass: 'admin', color: '#cc0000' },
    { label: 'User', email: 'user@test.com', pass: 'user', color: '#22c55e' },
  ];

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="login-hero-content">

            <div className="hero-headline">
            <h2>Zostań ekspertem<br/><span>w swojej branży</span></h2>
            <p>Kompleksowe kursy prowadzone przez praktyków. Certyfikaty, quizy, materiały i wsparcie mentorskie.</p>
          </div>

          <div className="hero-stats">
            <div className="hero-stat"><span className="hero-stat-val">5+</span><span className="hero-stat-label">Kursów</span></div>
            <div className="hero-stat"><span className="hero-stat-val">100%</span><span className="hero-stat-label">Praktyczne</span></div>
            <div className="hero-stat"><span className="hero-stat-val">PDF</span><span className="hero-stat-label">Certyfikaty</span></div>
          </div>

          <div className="hero-features">
            <div className="hero-feature"><span>🎓</span> Certyfikaty PDF po ukończeniu</div>
            <div className="hero-feature"><span>📊</span> Interaktywne slajdy i quizy</div>
            <div className="hero-feature"><span>📚</span> Pełny handbook do każdego kursu</div>
            <div className="hero-feature"><span>🎬</span> Nagrania wideo + materiały</div>
          </div>
        </div>
      </div>

      <div className="login-form-panel">
        <div className="login-form-wrapper">
          <h2 className="login-form-title">Zaloguj się</h2>
          <p className="login-form-sub">Witaj z powrotem! Wpisz swoje dane.</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label>Adres email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="twoj@email.com" autoComplete="email" />
            </div>
            <div className="login-field">
              <label>Hasło</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" autoComplete="current-password" />
            </div>
            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? <span className="btn-spinner"></span> : 'Zaloguj się'}
            </button>
          </form>

          <div className="login-divider"><span>lub wersja demo</span></div>

          <div className="demo-accounts">
            {demoAccounts.map(acc => (
              <button key={acc.label} className="demo-account-btn" style={{ '--acc-color': acc.color }}
                onClick={() => { setEmail(acc.email); setPassword(acc.pass); }}>
                <span className="demo-role-badge" style={{ background: acc.color }}>{acc.label}</span>
                <span>{acc.email}</span>
              </button>
            ))}
          </div>

          <p className="login-register-link">Nie masz konta? <Link to="/register">Zarejestruj się</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
