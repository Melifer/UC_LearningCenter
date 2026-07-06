import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout, theme, onThemeChange }) => {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.checked = theme === 'light';
  }, [theme]);

  useEffect(() => {
    if (!user) return;
    const fetchUnread = () =>
      fetch(`http://localhost:3002/api/messages/${user.id}/unread-count`)
        .then(r => r.ok ? r.json() : null)
        .then(d => d && setUnread(d.count));
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleThemeChange = (e) => {
    onThemeChange && onThemeChange(e.target.checked ? 'light' : 'dark');
  };

  return (
    <header className="app-header">
      <div className="header-logo-container">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="uc-logo">
            <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
              <rect x="4" y="28" width="40" height="14" rx="3" fill="var(--uc-red)" opacity="0.15"/>
              <rect x="4" y="28" width="40" height="14" rx="3" stroke="var(--uc-red)" strokeWidth="2"/>
              <path d="M24 6L44 16L24 26L4 16Z" fill="var(--uc-red)" opacity="0.9"/>
              <line x1="38" y1="18" x2="38" y2="30" stroke="var(--uc-red)" strokeWidth="2.5"/>
              <circle cx="38" cy="31" r="2.5" fill="var(--uc-red)"/>
              <rect x="14" y="28" width="20" height="3" fill="var(--uc-red)" opacity="0.5"/>
            </svg>
          </div>
          <div className="header-title-container">
            <h1 className="header-title">BiBest Learning Center</h1>
            <p className="header-subtitle">Professional Training Platform</p>
          </div>
        </Link>
      </div>
      
      {user && (
        <nav className="header-nav">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/browse" className="nav-link">Kursy</Link>
          {(user.role === 'trainer' || user.role === 'admin') && (
            <Link to="/trainer/create-course" className="nav-link">+ Nowy kurs</Link>
          )}
          <Link to="/messages" className="nav-link nav-messages">
            ✉️ {unread > 0 && <span className="nav-unread">{unread}</span>}
          </Link>
        </nav>
      )}
      
      <div className="header-controls">
        {user ? (
          <div id="user-info" className="user-info">
              <Link to="/profile" className="user-avatar-link">
                <span className="user-avatar-small">{(user.name || 'U')[0].toUpperCase()}</span>
                <span id="user-welcome">{user.name} <span className={`role-tag role-${user.role}`}>{user.role}</span></span>
              </Link>
              <button id="logout-button" className="button-secondary" onClick={onLogout}>Wyloguj</button>
          </div>
        ) : null}
        <div className="theme-switcher">
            <label htmlFor="theme-toggle" className="theme-toggle-label">
                <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.06l1.59-1.59a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.836 17.894a.75.75 0 011.06 0l1.59 1.59a.75.75 0 01-1.06 1.06l-1.59-1.59a.75.75 0 010-1.06zM12 21a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 21zM5.106 17.836a.75.75 0 010-1.06l1.59-1.591a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 01-1.06 0zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM6.106 5.106a.75.75 0 011.06 0l1.591 1.59a.75.75 0 01-1.06 1.06L6.106 6.166a.75.75 0 010-1.06z"></path></svg>
                <div className="toggle-switch">
                <input type="checkbox" id="theme-toggle" className="theme-toggle-checkbox" onChange={handleThemeChange} />
                    <div className="slider"></div>
                </div>
                <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.463-.69a.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-3.51 1.713-6.635 4.362-8.532a.75.75 0 01.819.162z" clipRule="evenodd"></path></svg>
            </label>
        </div>
      </div>
    </header>
  );
};

export default Header;
