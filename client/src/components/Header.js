import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  return (
    <header className="app-header">
      <div className="header-logo-container">
        <Link to="/" className="header-logo-link">
          {/* UniCredit logo mark — stylized U emblem */}
          <svg className="uc-logo-svg" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="22" cy="22" r="22" fill="#da291c"/>
            <path d="M14 14v10.5C14 29.19 17.58 33 22 33s8-3.81 8-8.5V14h-4v10.5c0 2.49-1.79 4.5-4 4.5s-4-2.01-4-4.5V14h-4z" fill="white"/>
          </svg>
          <div className="header-brand">
            <span className="header-brand-name">UniCredit</span>
            <span className="header-brand-sub">Learning Center</span>
          </div>
        </Link>
      </div>

      {user && (
        <nav className="header-nav">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/browse" className="nav-link">Courses</Link>
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
