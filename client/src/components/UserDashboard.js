import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({ user, showToast }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState(new Set());
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // all | mandatory | inprogress | completed

  const fetchData = useCallback(async () => {
    try {
      const [allRes, myRes] = await Promise.all([
        fetch(`http://localhost:3002/api/courses?role=user&userId=${user.id}`),
        fetch(`http://localhost:3002/api/my-courses/${user.id}`),
      ]);
      const allData = allRes.ok ? (await allRes.json()).courses || [] : [];
      const myData = myRes.ok ? (await myRes.json()).courses || [] : [];

      setCourses(allData);
      setEnrolledIds(new Set(myData.map(c => c.id)));

      if (myData.length > 0) {
        const progResults = await Promise.all(
          myData.map(c => fetch(`http://localhost:3002/api/course/${c.id}/progress/${user.id}`).then(r => r.json()).catch(() => ({})))
        );
        const map = {};
        myData.forEach((c, i) => { map[c.id] = progResults[i]; });
        setProgress(map);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [user.id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleStart = async (courseId) => {
    if (!enrolledIds.has(courseId)) {
      const res = await fetch('http://localhost:3002/api/enroll', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, courseId })
      });
      if (!res.ok) { const d = await res.json(); showToast && showToast(d.error || 'Błąd', 'error'); return; }
      showToast && showToast('Zapisano na szkolenie', 'success');
    }

    const prog = progress[courseId];
    if (prog?.lessons) {
      const first = prog.lessons.find(l => !l.completed);
      if (first) { navigate(`/course/${courseId}/lesson/${first.id}`); return; }
    }
    navigate(`/course/${courseId}`);
  };

  const formatDate = (d) => {
    if (!d) return null;
    return new Date(d).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const isOverdue = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  const filtered = courses.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || (c.description || '').toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'all' || c.level === levelFilter;
    const prog = progress[c.id];
    const pct = prog?.percentage || 0;
    const completed = enrolledIds.has(c.id) && pct === 100;
    const inProgress = enrolledIds.has(c.id) && pct > 0 && pct < 100;
    const matchStatus =
      statusFilter === 'all' ? true :
      statusFilter === 'mandatory' ? c.mandatory :
      statusFilter === 'inprogress' ? inProgress :
      statusFilter === 'completed' ? completed : true;
    return matchSearch && matchLevel && matchStatus;
  });

  const mandatory = courses.filter(c => c.mandatory);
  const overdueCount = mandatory.filter(c => isOverdue(c.deadline) && !((progress[c.id]?.percentage || 0) === 100)).length;
  const completedCount = courses.filter(c => enrolledIds.has(c.id) && (progress[c.id]?.percentage || 0) === 100).length;
  const inProgressCount = courses.filter(c => enrolledIds.has(c.id) && (progress[c.id]?.percentage || 0) > 0 && (progress[c.id]?.percentage || 0) < 100).length;

  if (loading) return <div className="course-loading"><div className="loading-spinner"></div></div>;

  return (
    <div className="container user-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Witaj, {user.name || user.email}!</h1>
          <p className="dashboard-subtitle">UniCredit Learning Center — Twoje szkolenia</p>
        </div>
        <button className="button-secondary" onClick={() => navigate('/certificates')}>🎓 Moje certyfikaty</button>
      </div>

      <div className="dashboard-stats">
        <div className={`stat-card clickable ${statusFilter==='all'?'active':''}`} onClick={() => setStatusFilter('all')}>
          <div className="stat-icon">📚</div>
          <div className="stat-value">{courses.length}</div>
          <div className="stat-label">Dostępnych</div>
        </div>
        <div className={`stat-card clickable ${statusFilter==='mandatory'?'active':''}`} onClick={() => setStatusFilter('mandatory')}>
          <div className="stat-icon">🔴</div>
          <div className="stat-value">{mandatory.length}</div>
          <div className="stat-label">Obowiązkowych</div>
        </div>
        <div className={`stat-card clickable ${statusFilter==='inprogress'?'active':''}`} onClick={() => setStatusFilter('inprogress')}>
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{inProgressCount}</div>
          <div className="stat-label">W trakcie</div>
        </div>
        <div className={`stat-card clickable ${statusFilter==='completed'?'active':''}`} onClick={() => setStatusFilter('completed')}>
          <div className="stat-icon">✅</div>
          <div className="stat-value">{completedCount}</div>
          <div className="stat-label">Ukończonych</div>
        </div>
      </div>

      {overdueCount > 0 && (
        <div className="overdue-alert">
          ⚠️ Masz <strong>{overdueCount}</strong> przeterminowane szkolenie{overdueCount > 1 ? 'a' : ''} obowiązkowe
        </div>
      )}

      <div className="catalog-filters">
        <input
          className="catalog-search"
          type="text"
          placeholder="🔍 Szukaj szkoleń..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="level-filters">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map(l => (
            <button key={l} className={`filter-btn ${levelFilter === l ? 'active' : ''}`} onClick={() => setLevelFilter(l)}>
              {l === 'all' ? 'Wszystkie' : l}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state-small">
          <p>Brak szkoleń spełniających kryteria wyszukiwania.</p>
          <button className="button-secondary" onClick={() => { setSearch(''); setLevelFilter('all'); setStatusFilter('all'); }}>Wyczyść filtry</button>
        </div>
      ) : (
        <div className="uc-courses-grid">
          {filtered.map(course => {
            const prog = progress[course.id] || {};
            const pct = prog.percentage || 0;
            const enrolled = enrolledIds.has(course.id);
            const completed = enrolled && pct === 100;
            const inProgress = enrolled && pct > 0 && pct < 100;
            const overdue = isOverdue(course.deadline) && !completed;

            return (
              <div key={course.id} className={`uc-course-card ${completed ? 'uc-course-card--completed' : ''} ${overdue ? 'uc-course-card--overdue' : ''}`}>
                <div className="uc-course-badges">
                  {course.mandatory && <span className="badge-mandatory">🔴 OBOWIĄZKOWE</span>}
                  {!course.mandatory && <span className="badge-optional">Nieobowiązkowe</span>}
                  {course.refresher_months > 0 && <span className="badge-refresher">♻️ co {course.refresher_months} mies.</span>}
                  {completed && <span className="badge-completed">✅ Zaliczone</span>}
                </div>

                <h3 className="uc-course-title" onClick={() => navigate(`/course/${course.id}`)}>{course.title}</h3>
                <p className="uc-course-desc">{course.description}</p>

                <div className="uc-course-meta">
                  <span>{course.level}</span>
                  <span>·</span>
                  <span>{course.duration}</span>
                  {course.deadline && (
                    <>
                      <span>·</span>
                      <span className={overdue ? 'text-overdue' : ''}>{overdue ? '⚠️ ' : '⏰ '}Do: {formatDate(course.deadline)}</span>
                    </>
                  )}
                </div>

                {enrolled && (
                  <div className="uc-progress-bar">
                    <div className="uc-progress-fill" style={{ width: `${pct}%` }}></div>
                    <span className="uc-progress-label">{pct}%</span>
                  </div>
                )}

                <button
                  className={`button-primary uc-start-btn ${completed ? 'button-secondary' : ''}`}
                  onClick={() => handleStart(course.id)}
                >
                  {completed ? '🎓 Powtórz szkolenie' : inProgress ? `Kontynuuj (${pct}%)` : '▶ Rozpocznij'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
