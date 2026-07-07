import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  return (
    <header className="app-header">
      <div className="header-logo-container">
        <Link to="/" className="header-logo-link">
          <img
            src="/images/unicredit-logo.png"
            alt="UniCredit"
            className="uc-logo-img"
          />
          <span className="header-brand-sub">Learning Center</span>
        </Link>
      </div>

      {user && (
        <nav className="header-nav">
          <Link to="/" className="nav-link">Dashboard</Link>
        </nav>
      )}

      <div className="header-controls">
        {user && (
          <div className="user-info">
            <Link to="/profile" className="user-avatar-link">
              <span className="user-avatar-small">{(user.name || 'U')[0].toUpperCase()}</span>
              <span className="user-welcome-text">
                {user.name}
                <span className={`role-tag role-${user.role}`}>{user.role}</span>
              </span>
            </Link>
            <button className="btn-logout" onClick={onLogout}>Log out</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
