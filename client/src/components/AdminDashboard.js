import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ user, showToast }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [stats, setStats] = useState({});
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [assignUserId, setAssignUserId] = useState('');
  const [assignCourseId, setAssignCourseId] = useState('');
  const [newUser, setNewUser] = useState({ name:'', email:'', password:'', role:'user' });
  const [rejectReason, setRejectReason] = useState('');
  const [rejectCourseId, setRejectCourseId] = useState(null);

  const fetchAdminData = useCallback(async () => {
    try {
      const [usersRes, coursesRes, statsRes, pendingRes, payoutsRes, settingsRes] = await Promise.all([
        fetch('http://localhost:3002/api/admin/users'),
        fetch('http://localhost:3002/api/admin/courses'),
        fetch('http://localhost:3002/api/admin/stats'),
        fetch('http://localhost:3002/api/admin/pending-courses'),
        fetch('http://localhost:3002/api/admin/payouts'),
        fetch('http://localhost:3002/api/admin/settings'),
      ]);
      if (usersRes.ok) setUsers((await usersRes.json()).users || []);
      if (coursesRes.ok) setCourses((await coursesRes.json()).courses || []);
      if (statsRes.ok) setStats(await statsRes.json());
      if (pendingRes.ok) setPendingCourses((await pendingRes.json()).courses || []);
      if (payoutsRes.ok) setPayouts((await payoutsRes.json()).payouts || []);
      if (settingsRes.ok) setSettings((await settingsRes.json()).settings || {});
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAdminData(); }, [fetchAdminData]);

  const handleDeleteUser = async (userId, name) => {
    if (!window.confirm(`Usunąć użytkownika "${name}"?`)) return;
    const res = await fetch(`http://localhost:3002/api/admin/users/${userId}`, { method: 'DELETE' });
    if (res.ok) { showToast && showToast('Użytkownik usunięty', 'success'); fetchAdminData(); }
  };

  const handleChangeRole = async (userId, newRole) => {
    const res = await fetch(`http://localhost:3002/api/admin/users/${userId}/role`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: newRole })
    });
    if (res.ok) { showToast && showToast('Rola zaktualizowana', 'success'); fetchAdminData(); }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3002/api/admin/users', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newUser)
    });
    const data = await res.json();
    if (res.ok) { showToast && showToast('Użytkownik dodany', 'success'); setShowAddUser(false); setNewUser({name:'',email:'',password:'',role:'user'}); fetchAdminData(); }
    else showToast && showToast(data.error || 'Błąd', 'error');
  };

  const handleAssignCourse = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3002/api/admin/assign-course', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: parseInt(assignUserId), courseId: parseInt(assignCourseId) })
    });
    const data = await res.json();
    if (res.ok) { showToast && showToast('Kurs przypisany', 'success'); setShowAssign(false); setAssignUserId(''); setAssignCourseId(''); }
    else showToast && showToast(data.error || 'Błąd', 'error');
  };

  const handleApproveCourse = async (courseId) => {
    const res = await fetch(`http://localhost:3002/api/courses/${courseId}/approve`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: '{}' });
    if (res.ok) { showToast && showToast('Kurs zatwierdzony ✓', 'success'); fetchAdminData(); }
  };

  const handleRejectCourse = async () => {
    const res = await fetch(`http://localhost:3002/api/courses/${rejectCourseId}/reject`, {
      method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ reason: rejectReason })
    });
    if (res.ok) { showToast && showToast('Kurs odrzucony', 'info'); setRejectCourseId(null); setRejectReason(''); fetchAdminData(); }
  };

  const handleProcessPayout = async (payoutId, status) => {
    const res = await fetch(`http://localhost:3002/api/admin/payouts/${payoutId}`, {
      method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ status })
    });
    if (res.ok) { showToast && showToast(status === 'completed' ? 'Wypłata zrealizowana' : 'Odrzucono wniosek', 'success'); fetchAdminData(); }
  };

  const handleSaveSetting = async (key, value) => {
    const res = await fetch(`http://localhost:3002/api/admin/settings/${key}`, {
      method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ value })
    });
    if (res.ok) { showToast && showToast('Ustawienie zapisane', 'success'); fetchAdminData(); }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Usunąć kurs?')) return;
    const res = await fetch(`http://localhost:3002/api/admin/courses/${courseId}`, { method: 'DELETE' });
    if (res.ok) { showToast && showToast('Kurs usunięty', 'success'); fetchAdminData(); }
  };

  const handleDuplicateCourse = async (courseId, title) => {
    const res = await fetch(`http://localhost:3002/api/admin/courses/${courseId}/duplicate`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId: user.id })
    });
    const data = await res.json();
    if (res.ok) {
      showToast && showToast(`Kopia kursu "${title}" utworzona`, 'success');
      fetchAdminData();
    } else showToast && showToast(data.error || 'Błąd kopiowania', 'error');
  };

  const handleSetCommission = async (courseId, rate) => {
    const res = await fetch(`http://localhost:3002/api/admin/courses/${courseId}/commission`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commission_rate: rate === '' ? null : rate })
    });
    if (res.ok) { showToast && showToast('Prowizja zaktualizowana', 'success'); fetchAdminData(); }
    else showToast && showToast('Błąd', 'error');
  };

  if (loading) return <div className="container"><div className="loading">Ładowanie...</div></div>;

  const pendingPayouts = payouts.filter(p => p.status === 'pending');

  return (
    <div className="container dashboard admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Panel Administratora</h1>
          <p className="dashboard-subtitle">Zarządzaj platformą, użytkownikami i kursami</p>
        </div>
        <div className="header-actions-group">
          <button className="button-secondary" onClick={() => navigate('/messages')}>✉️ Wiadomości</button>
          <button className="button-primary" onClick={() => setShowAddUser(true)}>➕ Dodaj użytkownika</button>
        </div>
      </div>

      <div className="dashboard-tabs">
        {[
          ['overview','📊 Przegląd'],
          ['approval', `⏳ Weryfikacja ${pendingCourses.length > 0 ? `(${pendingCourses.length})` : ''}`],
          ['users','👥 Użytkownicy'],
          ['courses','📚 Kursy'],
          ['payouts', `💰 Wypłaty ${pendingPayouts.length > 0 ? `(${pendingPayouts.length})` : ''}`],
          ['settings','⚙️ Ustawienia'],
        ].map(([key, label]) => (
          <button key={key} className={`tab-button ${activeTab===key?'active':''}`} onClick={() => setActiveTab(key)}>{label}</button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === 'overview' && (
        <>
          <div className="dashboard-stats">
            {[
              { icon:'👥', val: stats.totalUsers||0, label:'Użytkownicy', tab:'users' },
              { icon:'📚', val: stats.totalCourses||0, label:'Kursy', tab:'courses' },
              { icon:'✅', val: stats.completedEnrollments||0, label:'Ukończenia', tab:null },
              { icon:'📖', val: stats.activeEnrollments||0, label:'Aktywne zapisy', tab:null },
            ].map((s, i) => (
              <div key={i} className={`stat-card ${s.tab ? 'clickable' : ''}`} onClick={() => s.tab && setActiveTab(s.tab)}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <section className="dashboard-section">
            <h2>Ostatnia aktywność</h2>
            {(stats.recentActivity||[]).length === 0 ? <div className="empty-state-small"><p>Brak aktywności</p></div> : (
              <div className="activity-list">
                {(stats.recentActivity||[]).map((a, i) => (
                  <div key={i} className="activity-item">
                    <span className="activity-icon">{a.icon}</span>
                    <div className="activity-content"><p>{a.message}</p><span className="activity-time">{a.time}</span></div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* COURSE APPROVAL */}
      {activeTab === 'approval' && (
        <section className="dashboard-section">
          <h2>Kursy do weryfikacji ({pendingCourses.length})</h2>
          {pendingCourses.length === 0 ? <div className="empty-state-small"><p>Brak kursów oczekujących na zatwierdzenie.</p></div> : (
            <div className="approval-list">
              {pendingCourses.map(course => (
                <div key={course.id} className="approval-card">
                  <div className="approval-info">
                    <h3>{course.title}</h3>
                    <p><strong>Trener:</strong> {course.trainer_name} · <strong>Poziom:</strong> {course.level} · <strong>Czas:</strong> {course.duration}</p>
                    <p className="approval-desc">{course.description}</p>
                    {course.trainer_notes && <div className="trainer-notes-box"><strong>📝 Uwagi trenera:</strong> {course.trainer_notes}</div>}
                    <p style={{fontSize:'12px',color:'var(--text-muted)'}}>Przesłano: {new Date(course.created_at).toLocaleDateString('pl-PL')}</p>
                  </div>
                  <div className="approval-actions">
                    <button className="button-secondary" onClick={() => navigate(`/course/${course.id}`)}>👁 Podgląd</button>
                    <button className="btn-action" style={{color:'#22c55e',borderColor:'#22c55e'}} onClick={() => handleApproveCourse(course.id)}>✓ Zatwierdź</button>
                    <button className="btn-action danger" onClick={() => setRejectCourseId(course.id)}>✗ Odrzuć</button>
                    <button className="btn-action" onClick={() => navigate(`/trainer/edit-course/${course.id}`)}>✏️ Edytuj</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* USERS */}
      {activeTab === 'users' && (
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Użytkownicy ({users.length})</h2>
            <div className="header-actions-group">
              <button className="button-secondary" onClick={() => setShowAssign(true)}>📚 Przypisz kurs</button>
              <button className="button-primary" onClick={() => setShowAddUser(true)}>➕ Dodaj</button>
            </div>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr><th>Imię</th><th>Email</th><th>Rola</th><th>Zapisany</th><th>Ukończone</th><th>Mailing</th><th>Dołączył</th><th>Akcje</th></tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td><strong>{u.name}</strong></td>
                    <td>{u.email}</td>
                    <td><select value={u.role} onChange={e => handleChangeRole(u.id, e.target.value)} className="role-select"><option value="user">User</option><option value="trainer">Trainer</option><option value="admin">Admin</option></select></td>
                    <td>{u.enrolled_count||0}</td>
                    <td>{u.completed_count||0}</td>
                    <td><span style={{padding:'3px 8px',borderRadius:'10px',fontSize:'11px',fontWeight:700, background: u.email_notifications !== 0 ? 'rgba(34,197,94,0.1)' : 'rgba(128,128,128,0.1)', color: u.email_notifications !== 0 ? '#22c55e' : '#888'}}>{u.email_notifications !== 0 ? '✓ Tak' : '✗ Nie'}</span></td>
                    <td>{new Date(u.created_at).toLocaleDateString('pl-PL')}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon-action" onClick={() => { setAssignUserId(String(u.id)); setShowAssign(true); }} title="Przypisz kurs">📚</button>
                        <button className="btn-icon-action danger" onClick={() => handleDeleteUser(u.id, u.name)} title="Usuń">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* COURSES */}
      {activeTab === 'courses' && (
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Kursy ({courses.length})</h2>
            <button className="button-primary" onClick={() => navigate('/trainer/create-course')}>➕ Nowy kurs</button>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead><tr><th>Tytuł</th><th>Status</th><th>Poziom</th><th>Cena</th><th>Prowizja trenera</th><th>Zapisanych</th><th>Akcje</th></tr></thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td><strong>{course.title}</strong></td>
                    <td><span style={{fontSize:'12px',padding:'3px 8px',borderRadius:'10px',background:'rgba(34,197,94,0.1)',color:'#22c55e'}}>{course.status||'approved'}</span></td>
                    <td>{course.level}</td>
                    <td>{course.is_free ? <span className="badge-free">FREE</span> : `${course.price} PLN`}</td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                        <input
                          type="number" min="0" max="100" step="1"
                          defaultValue={course.commission_rate !== null && course.commission_rate !== undefined ? course.commission_rate : ''}
                          placeholder={`${settings.trainer_commission_pct||70}% (glob.)`}
                          style={{width:'90px',padding:'4px 8px',background:'rgba(255,255,255,0.04)',border:'1px solid var(--border-color)',borderRadius:'6px',color:'var(--text-primary)',fontSize:'13px'}}
                          onBlur={e => handleSetCommission(course.id, e.target.value)}
                        />
                        <span style={{fontSize:'11px',color:'var(--text-muted)'}}>%</span>
                        {(course.commission_rate === null || course.commission_rate === undefined) && (
                          <span style={{fontSize:'10px',color:'var(--text-muted)'}}>↑ globalny</span>
                        )}
                      </div>
                    </td>
                    <td>{course.enrolled_count||0}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-action" onClick={() => navigate(`/course/${course.id}`)}>👁</button>
                        <button className="btn-action" onClick={() => navigate(`/trainer/edit-course/${course.id}`)}>✏️</button>
                        <button className="btn-action" onClick={() => { setAssignCourseId(String(course.id)); setShowAssign(true); }}>📋</button>
                        <button className="btn-action" onClick={() => handleDuplicateCourse(course.id, course.title)} title="Kopiuj kurs">⧉ Kopiuj</button>
                        <button className="btn-action danger" onClick={() => handleDeleteCourse(course.id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* PAYOUTS */}
      {activeTab === 'payouts' && (
        <section className="dashboard-section">
          <h2>Wnioski o wypłatę</h2>
          {payouts.length === 0 ? <div className="empty-state-small"><p>Brak wniosków o wypłatę.</p></div> : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead><tr><th>Trener</th><th>Email</th><th>Kwota</th><th>Status</th><th>Data</th><th>Akcje</th></tr></thead>
                <tbody>
                  {payouts.map(p => (
                    <tr key={p.id}>
                      <td><strong>{p.trainer_name}</strong></td>
                      <td>{p.trainer_email}</td>
                      <td style={{fontWeight:700,color:'var(--uc-red)'}}>{p.amount.toFixed(2)} PLN</td>
                      <td><span style={{padding:'3px 8px',borderRadius:'10px',fontSize:'12px',fontWeight:700, background: p.status==='completed'?'rgba(34,197,94,0.1)':p.status==='rejected'?'rgba(239,68,68,0.1)':'rgba(245,158,11,0.1)', color: p.status==='completed'?'#22c55e':p.status==='rejected'?'#ef4444':'#f59e0b'}}>{p.status}</span></td>
                      <td>{new Date(p.created_at).toLocaleDateString('pl-PL')}</td>
                      <td>
                        {p.status === 'pending' && (
                          <div className="table-actions">
                            <button className="btn-action" style={{color:'#22c55e',borderColor:'#22c55e'}} onClick={() => handleProcessPayout(p.id, 'completed')}>✓ Zrealizuj</button>
                            <button className="btn-action danger" onClick={() => handleProcessPayout(p.id, 'rejected')}>✗ Odrzuć</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* SETTINGS */}
      {activeTab === 'settings' && (
        <section className="dashboard-section">
          <h2>Ustawienia platformy</h2>
          <div className="profile-form-card" style={{maxWidth:'500px'}}>
            <div className="bf-group">
              <label>Prowizja trenera (%)</label>
              <input type="number" defaultValue={settings.trainer_commission_pct||70} min="0" max="100"
                onBlur={e => handleSaveSetting('trainer_commission_pct', e.target.value)} />
              <small style={{color:'var(--text-muted)'}}>Trener otrzymuje ten % od każdej sprzedaży. Reszta to przychód platformy.</small>
            </div>
          </div>
        </section>
      )}

      {/* MODAL: ADD USER */}
      {showAddUser && (
        <div className="modal-overlay" onClick={() => setShowAddUser(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>Dodaj użytkownika</h2><button className="modal-close" onClick={() => setShowAddUser(false)}>✕</button></div>
            <form onSubmit={handleAddUser} className="modal-form">
              <div className="bf-group"><label>Imię i nazwisko</label><input type="text" value={newUser.name} onChange={e => setNewUser({...newUser, name:e.target.value})} required /></div>
              <div className="bf-group"><label>Email</label><input type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email:e.target.value})} required /></div>
              <div className="bf-group"><label>Hasło</label><input type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password:e.target.value})} required /></div>
              <div className="bf-group"><label>Rola</label><select value={newUser.role} onChange={e => setNewUser({...newUser, role:e.target.value})}><option value="user">User</option><option value="trainer">Trainer</option><option value="admin">Admin</option></select></div>
              <div className="modal-footer">
                <button type="button" className="button-secondary" onClick={() => setShowAddUser(false)}>Anuluj</button>
                <button type="submit" className="button-primary">Dodaj</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ASSIGN COURSE */}
      {showAssign && (
        <div className="modal-overlay" onClick={() => setShowAssign(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>Przypisz kurs</h2><button className="modal-close" onClick={() => setShowAssign(false)}>✕</button></div>
            <form onSubmit={handleAssignCourse} className="modal-form">
              <div className="bf-group"><label>Użytkownik</label><select value={assignUserId} onChange={e => setAssignUserId(e.target.value)} required><option value="">-- Wybierz --</option>{users.filter(u=>u.role==='user').map(u=><option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}</select></div>
              <div className="bf-group"><label>Kurs</label><select value={assignCourseId} onChange={e => setAssignCourseId(e.target.value)} required><option value="">-- Wybierz --</option>{courses.map(c=><option key={c.id} value={c.id}>{c.title}</option>)}</select></div>
              <div className="modal-footer">
                <button type="button" className="button-secondary" onClick={() => setShowAssign(false)}>Anuluj</button>
                <button type="submit" className="button-primary">Przypisz</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REJECT COURSE */}
      {rejectCourseId && (
        <div className="modal-overlay" onClick={() => setRejectCourseId(null)}>
          <div className="modal-box modal-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>Odrzuć kurs</h2><button className="modal-close" onClick={() => setRejectCourseId(null)}>✕</button></div>
            <div className="modal-form">
              <div className="bf-group"><label>Powód odrzucenia (widoczny dla trenera)</label><textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows="3" placeholder="np. Brakuje quizu, opis zbyt ogólny..." /></div>
              <div className="modal-footer">
                <button className="button-secondary" onClick={() => setRejectCourseId(null)}>Anuluj</button>
                <button className="button-danger" onClick={handleRejectCourse}>Odrzuć kurs</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
