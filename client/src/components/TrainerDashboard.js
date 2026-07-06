import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const STATUS_LABELS = {
  draft: { label: 'Szkic', color: '#888', bg: 'rgba(128,128,128,0.1)' },
  pending_review: { label: '⏳ Czeka na zatwierdzenie', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  approved: { label: '✓ Zatwierdzony', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  rejected: { label: '✗ Odrzucony', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
};

const TrainerDashboard = ({ user, showToast }) => {
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');

  const fetchMyCourses = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:3002/api/trainer/courses/${user.id}`);
      if (res.ok) setMyCourses((await res.json()).courses || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [user.id]);

  useEffect(() => { fetchMyCourses(); }, [fetchMyCourses]);

  const handleDelete = async (courseId, title) => {
    if (!window.confirm(`Usunąć kurs "${title}"?`)) return;
    const res = await fetch(`http://localhost:3002/api/admin/courses/${courseId}`, { method: 'DELETE' });
    if (res.ok) { showToast && showToast('Kurs usunięty', 'success'); fetchMyCourses(); }
    else showToast && showToast('Błąd usuwania', 'error');
  };

  const handleSubmitForReview = async (courseId) => {
    const res = await fetch(`http://localhost:3002/api/courses/${courseId}/submit`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({})
    });
    if (res.ok) { showToast && showToast('Kurs wysłany do weryfikacji!', 'success'); fetchMyCourses(); }
    else showToast && showToast('Błąd', 'error');
  };

  if (loading) return <div className="container"><div className="loading">Ładowanie...</div></div>;

  const totalStudents = myCourses.reduce((s, c) => s + (c.enrolled_count || 0), 0);

  return (
    <div className="container trainer-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Studio Trenera</h1>
          <p className="dashboard-subtitle">Twórz i zarządzaj kursami</p>
        </div>
        <div className="header-actions-group">
          <button className="button-secondary" onClick={() => navigate('/trainer/students')}>👥 Uczniowie</button>
          <button className="button-secondary" onClick={() => navigate('/messages')}>✉️ Wiadomości</button>
          <button className="button-secondary" onClick={() => navigate('/trainer/earnings')}>💰 Zarobki</button>
          <button className="button-primary btn-large" onClick={() => navigate('/trainer/create-course')}>+ Nowy kurs</button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card"><div className="stat-icon">📚</div><div className="stat-value">{myCourses.length}</div><div className="stat-label">Moje kursy</div></div>
        <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-value">{myCourses.filter(c=>c.status==='approved').length}</div><div className="stat-label">Zatwierdzone</div></div>
        <div className="stat-card"><div className="stat-icon">⏳</div><div className="stat-value">{myCourses.filter(c=>c.status==='pending_review').length}</div><div className="stat-label">W weryfikacji</div></div>
        <div className="stat-card"><div className="stat-icon">👥</div><div className="stat-value">{totalStudents}</div><div className="stat-label">Uczniów</div></div>
      </div>

      <div className="dashboard-tabs">
        <button className={`tab-button ${activeTab==='courses'?'active':''}`} onClick={() => setActiveTab('courses')}>📚 Moje kursy</button>
        <button className={`tab-button ${activeTab==='guide'?'active':''}`} onClick={() => setActiveTab('guide')}>📖 Jak tworzyć</button>
      </div>

      {activeTab === 'courses' && (
        <section className="dashboard-section">
          {myCourses.length === 0 ? (
            <div className="trainer-empty-state">
              <div style={{fontSize:'80px',marginBottom:'24px'}}>🎓</div>
              <h2>Stwórz swój pierwszy kurs</h2>
              <p>Platforma daje pełne narzędzia — moduły, slajdy, wideo, quizy, certyfikaty.</p>
              <button className="button-primary btn-large" onClick={() => navigate('/trainer/create-course')}>✦ Zacznij teraz</button>
            </div>
          ) : (
            <div className="trainer-courses-grid">
              {myCourses.map(course => {
                const st = STATUS_LABELS[course.status || 'draft'] || STATUS_LABELS.draft;
                return (
                  <div key={course.id} className="trainer-course-card-pro">
                    <div className="tcp-header">
                      <span className="course-status-badge" style={{ color: st.color, background: st.bg, padding:'4px 10px', borderRadius:'10px', fontSize:'12px', fontWeight:700 }}>{st.label}</span>
                      <span className="tcp-price">{course.is_free ? <span className="badge-free">FREE</span> : <span>{course.price} PLN</span>}</span>
                    </div>
                    <h3 className="tcp-title">{course.title}</h3>
                    <p className="tcp-desc">{course.description?.substring(0,100)}...</p>
                    {course.rejection_reason && (
                      <div style={{padding:'8px 12px',background:'rgba(239,68,68,0.1)',borderRadius:'6px',fontSize:'12px',color:'#ef4444',marginBottom:'8px'}}>
                        ✗ Odrzucono: {course.rejection_reason}
                      </div>
                    )}
                    <div className="tcp-stats">
                      <span>👥 {course.enrolled_count||0} uczniów</span>
                      <span>⏱ {course.duration}</span>
                    </div>
                    <div className="tcp-actions">
                      <button className="btn-action" onClick={() => navigate(`/course/${course.id}`)}>👁 Podgląd</button>
                      <button className="btn-action" onClick={() => navigate(`/trainer/edit-course/${course.id}`)}>✏️ Edytuj</button>
                      {(course.status === 'draft' || course.status === 'rejected' || !course.status) && (
                        <button className="btn-action" style={{color:'#22c55e',borderColor:'#22c55e'}} onClick={() => handleSubmitForReview(course.id)}>↑ Wyślij do weryfikacji</button>
                      )}
                    {course.status !== 'approved' && (
                      <button className="btn-action danger" onClick={() => handleDelete(course.id, course.title)}>🗑️ Usuń</button>
                    )}
                    </div>
                  </div>
                );
              })}
              <div className="trainer-add-course-card" onClick={() => navigate('/trainer/create-course')}>
                <div className="add-icon">+</div>
                <span>Nowy kurs</span>
              </div>
            </div>
          )}
        </section>
      )}

      {activeTab === 'guide' && (
        <section className="dashboard-section trainer-guide">
          <h2>Jak stworzyć świetny kurs?</h2>
          <div className="guide-steps">
            {[
              { n:'01', title:'Podstawy kursu', desc:'Tytuł, opis, poziom, czas. Zapisz jako szkic i kontynuuj kiedy chcesz.', icon:'📋' },
              { n:'02', title:'Moduły i lekcje', desc:'Podziel wiedzę na moduły. Dodawaj tekst, wideo z YouTube lub upload.', icon:'🗂️' },
              { n:'03', title:'Slajdy (opcjonalne)', desc:'Wizualna prezentacja z markdown, obrazkami i podglądem na żywo.', icon:'📊' },
              { n:'04', title:'Handbook (opcjonalne)', desc:'Szczegółowa dokumentacja dla uczniów do przeglądania w dowolnym czasie.', icon:'📚' },
              { n:'05', title:'Quiz + Certyfikat', desc:'Scenariuszowe pytania z wyjaśnieniami. Po zdaniu quiz uczniowie dostają certyfikat.', icon:'✅' },
              { n:'06', title:'Wyślij do weryfikacji', desc:'Admin przegląda i zatwierdza kurs. Możesz dołączyć uwagi i sugestię ceny.', icon:'🚀' },
            ].map(s => (
              <div key={s.n} className="guide-step">
                <div className="guide-step-num">{s.n}</div>
                <div className="guide-step-icon">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'40px'}}>
            <button className="button-primary btn-large" onClick={() => navigate('/trainer/create-course')}>✦ Zacznij tworzyć kurs</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default TrainerDashboard;
