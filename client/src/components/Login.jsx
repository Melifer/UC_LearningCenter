import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [nameInput, setNameInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // "John Smith" → john.smith@bibest.eu  |  raw email (contains @) → pass through
  // "Melifer" → admin@bibest.eu (owner shortcut)
  const resolveEmail = (val) => {
    const trimmed = val.trim();
    if (trimmed.toLowerCase() === 'melifer') return 'admin@bibest.eu';
    if (trimmed.includes('@')) return trimmed;
    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) return null;
    return `${parts[0].toLowerCase()}.${parts[parts.length - 1].toLowerCase()}@bibest.eu`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const email = resolveEmail(nameInput);
    if (!email) {
      setError('Please enter both your first and last name.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/auth/sso-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) { setError(data.error || 'Login failed'); setLoading(false); return; }
      onLogin(data.user);
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* ── Main split: hero | form ── */}
      <div className="login-main">

        <div className="login-hero">
          <div className="login-hero-content">
            <div className="hero-headline">
              <p className="bb-hero-tagline-pre">Don't just learn.</p>
              <h2><span>Transform your future</span></h2>
              <p>Learn the most in-demand skills and gain the exact tools you need to thrive in today's fast-paced world. BiBest Learning Center is a premium training platform designed to bridge the gap between theory and real-world execution.</p>
            </div>

            <div className="bb-features-grid">
              <div className="bb-feature-card">
                <div className="bb-feature-icon">🎯</div>
                <div className="bb-feature-body">
                  <strong>Curated Excellence</strong>
                  <span>Access masterclasses focused entirely on high-demand, modern skills.</span>
                </div>
              </div>
              <div className="bb-feature-card">
                <div className="bb-feature-icon">🛠️</div>
                <div className="bb-feature-body">
                  <strong>Practical Blueprint</strong>
                  <span>Shift from passive listening to active doing. We focus heavily on hands-on projects.</span>
                </div>
              </div>
              <div className="bb-feature-card">
                <div className="bb-feature-icon">🔄</div>
                <div className="bb-feature-body">
                  <strong>Continuous Evolution</strong>
                  <span>Our curriculum updates dynamically alongside market trends.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="login-form-wrapper">
            <div className="login-uc-brand">
              <img src="/images/BiBestLearningCenter.png" alt="BiBest Learning Center" className="bb-form-logo" />
            </div>
            <h2 className="login-form-title">Sign In</h2>

            {error && <div className="login-error">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-field">
                <label>Provide your First and Last Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  placeholder="e.g. John Smith"
                  autoComplete="name"
                />
                <p className="login-field-hint">* Your name will appear on your completion certificate.<br/>
                  <strong style={{ color: '#e53e3e' }}>⚠️ Session progress is cleared on sign-out.</strong>
                </p>
              </div>
              <button type="submit" className="login-submit" disabled={loading}>
                {loading ? <span className="btn-spinner"></span> : 'Sign In'}
              </button>
            </form>

          </div>{/* end .login-form-wrapper */}
        </div>{/* end .login-form-panel */}

      </div>{/* end .login-main */}

      {/* ── B2B strip ── */}
      <div className="login-b2b">
        <div className="bb-b2b-content">
          <div className="bb-b2b-text">
            <h3 className="bb-b2b-title">🏢 Upskill Your Team with BiBest</h3>
            <p className="bb-b2b-desc">Every organization has unique business goals. We offer the option to launch a private, fully customized instance of our platform — tailored to your company's specific training needs and security requirements.</p>
          </div>
          <div className="bb-b2b-action">
            <a href="mailto:michal.walus@bibest.eu" className="bb-b2b-cta">
              💬 Let's discuss implementation<br/>suited to your needs
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
