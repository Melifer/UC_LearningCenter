import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ user, onUserUpdate, showToast }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [certs, setCerts] = useState([]);
  const [totalCPE, setTotalCPE] = useState(0);
  const [yearCPE, setYearCPE] = useState(0);
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    const res = await fetch(`http://localhost:3002/api/users/${user.id}`);
    if (res.ok) { const d = await res.json(); setProfile({ name: d.user.name || '', email: d.user.email || '' }); }
    const certRes = await fetch(`http://localhost:3002/api/users/${user.id}/certificates`);
    if (certRes.ok) { const cd = await certRes.json(); setCerts(cd.certificates); setTotalCPE(cd.totalCPE); setYearCPE(cd.yearCPE); }
  }, [user.id]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const handleSaveProfile = async () => {
    setSaving(true);
    const res = await fetch(`http://localhost:3002/api/users/${user.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: profile.name, email: profile.email })
    });
    const data = await res.json();
    if (res.ok) {
      showToast && showToast('Profil zaktualizowany', 'success');
      onUserUpdate && onUserUpdate(data.user);
    } else { showToast && showToast(data.error || 'Błąd zapisu', 'error'); }
    setSaving(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) { showToast && showToast('Hasła nie są identyczne', 'error'); return; }
    const res = await fetch(`http://localhost:3002/api/users/${user.id}/password`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword })
    });
    const data = await res.json();
    if (res.ok) { showToast && showToast('Hasło zmienione', 'success'); setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); }
    else showToast && showToast(data.error || 'Błąd', 'error');
  };

  return (
    <div className="container profile-page">
      <div className="profile-header">
        <button className="sidebar-back-btn" onClick={() => navigate('/')}>← Dashboard</button>
        <div className="profile-avatar-big">{(profile.name || user.name || 'U')[0].toUpperCase()}</div>
        <div>
          <h1>{profile.name || user.name}</h1>
          <span className={`role-badge role-${user.role}`}>{user.role}</span>
        </div>
      </div>

      <div className="profile-stats-row">
        <div className="profile-stat clickable" onClick={() => navigate('/certificates')}>
          <span className="ps-val">{certs.length}</span>
          <span className="ps-label">Certyfikaty →</span>
        </div>
        <div className="profile-stat"><span className="ps-val">{yearCPE}h</span><span className="ps-label">CPE {new Date().getFullYear()}</span></div>
        <div className="profile-stat"><span className="ps-val">{totalCPE}h</span><span className="ps-label">CPE łącznie</span></div>
      </div>

      <div className="dashboard-tabs">
        {[['profile','👤 Profil']].map(([key,label]) => (
          <button key={key} className={`tab-button ${activeTab===key?'active':''}`} onClick={() => setActiveTab(key)}>{label}</button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="profile-form-card">
          <h3>Dane osobowe</h3>
          <div className="bf-grid-2">
            <div className="bf-group"><label>Imię i nazwisko</label><input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} placeholder="Jan Kowalski" /></div>
            <div className="bf-group"><label>Adres email</label><input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} /></div>
          </div>
          <p className="sso-note">🔐 Logowanie odbywa się przez SSO UniCredit. Dane są synchronizowane z katalogu firmowego.</p>
          <button className="button-primary" onClick={handleSaveProfile} disabled={saving}>{saving ? 'Zapisywanie...' : 'Zapisz zmiany'}</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
