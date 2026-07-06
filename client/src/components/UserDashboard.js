import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({ user, showToast }) => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  const fetchData = useCallback(async () => {
    try {
      const [myCRes, allCRes] = await Promise.all([
        fetch(`http://localhost:3002/api/my-courses/${user.id}`),
        fetch(`http://localhost:3002/api/courses?role=${user.role}&userId=${user.id}`),
      ]);
      const myData = await myCRes.json();
      const allData = await allCRes.json();

      const enrolled = myData.courses || [];
      setEnrolledCourses(enrolled);
      setAllCourses(allData.courses || []);

      if (enrolled.length > 0) {
        const progResults = await Promise.all(
          enrolled.map(c => fetch(`http://localhost:3002/api/course/${c.id}/progress/${user.id}`).then(r => r.json()))
        );
        const map = {};
        enrolled.forEach((c, i) => { map[c.id] = progResults[i]; });
        setProgress(map);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [user.id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const completedCourses = enrolledCourses.filter(c => c.completed_at);
  const inProgressCourses = enrolledCourses.filter(c => !c.completed_at && progress[c.id]?.completed > 0);
  const notStartedCourses = enrolledCourses.filter(c => !c.completed_at && !progress[c.id]?.completed);
  const enrolledIds = new Set(enrolledCourses.map(c => c.id));
  const availableCourses = allCourses.filter(c => !enrolledIds.has(c.id) && c.status !== 'draft');

  const handleContinue = (courseId) => {
    const prog = progress[courseId];
    if (prog?.lessons) {
      const first = prog.lessons.find(l => !l.completed);
      if (first) { navigate(`/course/${courseId}/lesson/${first.id}`); return; }
    }
    navigate(`/course/${courseId}`);
  };

  const handleEnroll = async (courseId) => {
    const res = await fetch('http://localhost:3002/api/enroll', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, courseId })
    });
    if (res.ok) { showToast && showToast('Zapisano na kurs!', 'success'); fetchData(); }
    else { const d = await res.json(); showToast && showToast(d.error || 'Błąd', 'error'); }
  };

  if (loading) return <div className="course-loading"><div className="loading-spinner"></div></div>;

  return (
    <div className="container user-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Witaj, {user.name}! 👋</h1>
          <p className="dashboard-subtitle">Twoja ścieżka nauki</p>
        </div>
      </div>

      {/* Stats - all clickable */}
      <div className="dashboard-stats">
        <div className={`stat-card clickable ${activeFilter==='all'?'active':''}`} onClick={() => setActiveFilter('all')}>
          <div className="stat-icon">📚</div>
          <div className="stat-value">{enrolledCourses.length}</div>
          <div className="stat-label">Moje kursy</div>
        </div>
        <div className={`stat-card clickable ${activeFilter==='inprogress'?'active':''}`} onClick={() => setActiveFilter('inprogress')}>
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{inProgressCourses.length}</div>
          <div className="stat-label">W trakcie</div>
        </div>
        <div className={`stat-card clickable ${activeFilter==='completed'?'active':''}`} onClick={() => setActiveFilter('completed')}>
          <div className="stat-icon">✅</div>
          <div className="stat-value">{completedCourses.length}</div>
          <div className="stat-label">Ukończone</div>
        </div>
        <div className="stat-card clickable" onClick={() => navigate('/certificates')}>
          <div className="stat-icon">🎓</div>
          <div className="stat-value">{completedCourses.length}</div>
          <div className="stat-label">Certyfikaty →</div>
        </div>
      </div>

      {/* Enrolled courses - in progress first */}
      {enrolledCourses.length > 0 && (activeFilter === 'all' || activeFilter === 'inprogress' || activeFilter === 'completed') && (
        <section className="dashboard-section">
          <h2>
            {activeFilter === 'completed' ? '✅ Ukończone kursy' :
             activeFilter === 'inprogress' ? '🎯 Kursy w trakcie' : '📚 Moje kursy'}
          </h2>

          {/* In Progress */}
          {(activeFilter === 'all' || activeFilter === 'inprogress') && inProgressCourses.length > 0 && (
            <>
              {activeFilter === 'all' && <h4 className="sub-section-label">Kontynuuj naukę</h4>}
              <div className="enrolled-courses-grid">
                {inProgressCourses.map(course => {
                  const prog = progress[course.id] || { percentage: 0 };
                  return (
                    <div key={course.id} className="enrolled-course-card">
                      <div className="ecc-progress-bar"><div className="ecc-progress-fill" style={{ width: `${prog.percentage}%` }}></div></div>
                      <div className="ecc-body">
                        <span className="badge-inprogress">{prog.percentage}% ukończone</span>
                        <h3 onClick={() => navigate(`/course/${course.id}`)}>{course.title}</h3>
                        <p>{course.level} · {course.duration}</p>
                      </div>
                      <div className="ecc-actions">
                        <button className="button-primary" onClick={() => handleContinue(course.id)}>▶ Kontynuuj</button>
                        <button className="button-secondary" onClick={() => navigate(`/course/${course.id}`)}>Przegląd</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Not started */}
          {activeFilter === 'all' && notStartedCourses.length > 0 && (
            <>
              <h4 className="sub-section-label" style={{marginTop:'28px'}}>Nie rozpoczęte</h4>
              <div className="enrolled-courses-grid">
                {notStartedCourses.map(course => (
                  <div key={course.id} className="enrolled-course-card not-started">
                    <div className="ecc-progress-bar"><div className="ecc-progress-fill" style={{ width: '0%' }}></div></div>
                    <div className="ecc-body">
                      <span style={{fontSize:'12px',color:'var(--text-muted)'}}>Nie rozpoczęto</span>
                      <h3 onClick={() => navigate(`/course/${course.id}`)}>{course.title}</h3>
                      <p>{course.level} · {course.duration}</p>
                    </div>
                    <div className="ecc-actions">
                      <button className="button-primary" onClick={() => navigate(`/course/${course.id}`)}>▶ Zacznij</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Completed */}
          {(activeFilter === 'all' || activeFilter === 'completed') && completedCourses.length > 0 && (
            <>
              {activeFilter === 'all' && <h4 className="sub-section-label" style={{marginTop:'28px'}}>Ukończone</h4>}
              <div className="enrolled-courses-grid">
                {completedCourses.map(course => (
                  <div key={course.id} className="enrolled-course-card completed">
                    <div className="ecc-progress-bar"><div className="ecc-progress-fill" style={{ width: '100%', background: '#22c55e' }}></div></div>
                    <div className="ecc-body">
                      <span className="badge-completed">✓ Ukończony</span>
                      <h3 onClick={() => navigate(`/course/${course.id}`)}>{course.title}</h3>
                      <p>{course.level} · Ukończono: {new Date(course.completed_at).toLocaleDateString('pl-PL')}</p>
                    </div>
                    <div className="ecc-actions">
                      <a href={`http://localhost:3002/api/certificate/${user.id}/${course.id}`} target="_blank" rel="noreferrer" className="button-primary" style={{textDecoration:'none'}}>🎓 Certyfikat</a>
                      <button className="button-secondary" onClick={() => navigate(`/course/${course.id}`)}>Wróć</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* Available courses */}
      {availableCourses.length > 0 && activeFilter === 'all' && (
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Dostępne kursy</h2>
            <button className="button-secondary" onClick={() => navigate('/browse')}>Katalog →</button>
          </div>
          <div className="available-courses-grid">
            {availableCourses.slice(0, 6).map(course => (
              <div key={course.id} className="available-course-card" onClick={() => navigate(`/course/${course.id}`)}>
                <div className="acc-thumb"><span className="acc-level">{course.level}</span></div>
                <div className="acc-body">
                  <h3>{course.title}</h3>
                  <p>{course.description?.substring(0, 80)}...</p>
                  <div className="acc-meta">
                    <span>⏱ {course.duration}</span>
                    <span className={course.is_free ? 'price-free' : 'price-paid'}>{course.is_free ? '🆓 Bezpłatny' : `${course.price} PLN`}</span>
                  </div>
                </div>
                <div className="acc-footer">
                  <button className="button-primary" onClick={e => { e.stopPropagation(); handleEnroll(course.id); }}>
                    {course.is_free ? 'Zapisz się' : `Kup za ${course.price} PLN`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default UserDashboard;
