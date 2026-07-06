import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) { setError('Hasła nie są identyczne'); return; }
    if (password.length < 4) { setError('Hasło musi mieć co najmniej 4 znaki'); return; }
    if (!name.trim()) { setError('Podaj imię i nazwisko'); return; }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3002/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) { setError(data.error || 'Błąd rejestracji'); setLoading(false); return; }
      navigate('/login');
    } catch {
      setError('Błąd połączenia. Spróbuj ponownie.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="login-hero-content">


          <div className="hero-headline">
            <h2>Dołącz do<br/><span>tysięcy uczących się</span></h2>
            <p>Stwórz darmowe konto i uzyskaj dostęp do profesjonalnych kursów z certyfikatami.</p>
          </div>

          <div className="hero-features">
            <div className="hero-feature"><span>🎓</span> Certyfikaty PDF po ukończeniu kursu</div>
            <div className="hero-feature"><span>📊</span> Śledzenie postępów w czasie rzeczywistym</div>
            <div className="hero-feature"><span>📚</span> Pełny dostęp do materiałów i handbook</div>
            <div className="hero-feature"><span>🆓</span> Pierwsze kursy całkowicie za darmo</div>
          </div>
        </div>
      </div>

      <div className="login-form-panel">
        <div className="login-form-wrapper">
          <h2 className="login-form-title">Utwórz konto</h2>
          <p className="login-form-sub">Wypełnij formularz — zajmie to 30 sekund.</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label>Imię i nazwisko</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Jan Kowalski" autoComplete="name" />
            </div>
            <div className="login-field">
              <label>Adres email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="twoj@email.com" autoComplete="email" />
            </div>
            <div className="login-field">
              <label>Hasło</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min. 4 znaki" autoComplete="new-password" />
            </div>
            <div className="login-field">
              <label>Potwierdź hasło</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required placeholder="Wpisz ponownie" autoComplete="new-password" />
            </div>
            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? <span className="btn-spinner"></span> : 'Zarejestruj się'}
            </button>
          </form>

          <p className="login-register-link">Masz już konto? <Link to="/login">Zaloguj się</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
