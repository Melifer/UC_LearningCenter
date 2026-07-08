import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({ user, showToast }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/courses?role=user&userId=${user.id}`);
      const data = res.ok ? (await res.json()).courses || [] : [];
      setCourses(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [user.id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleStart = async (courseId) => {
    // Enroll for tracking purposes, then navigate
    await fetch('/api/enroll', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, courseId }),
    }).catch(() => {});
    navigate(`/course/${courseId}`);
  };

  const filtered = courses.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || (c.description || '').toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'all' || c.level === levelFilter;
    return matchSearch && matchLevel;
  });

  if (loading) return <div className="course-loading"><div className="loading-spinner"></div></div>;

  return (
    <div className="container user-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user.name || user.email.split('@')[0]}!</h1>
          <p className="dashboard-subtitle">BiBest Learning Center — {courses.length} trainings available</p>
          <p className="session-notice">⚠️ Session progress is cleared on sign-out.</p>
        </div>
        <button className="button-secondary" onClick={() => navigate('/certificates')}>🎓 My certificates</button>
      </div>

      <div className="catalog-filters">
        <input className="catalog-search" type="text" placeholder="🔍 Search trainings..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className="level-filters">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map(l => (
            <button key={l} className={`filter-btn ${levelFilter === l ? 'active' : ''}`} onClick={() => setLevelFilter(l)}>
              {l === 'all' ? 'All levels' : l}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state-small">
          <p>No trainings match your filters.</p>
          <button className="button-secondary" onClick={() => { setSearch(''); setLevelFilter('all'); }}>Clear filters</button>
        </div>
      ) : (
        <div className="uc-courses-grid">
          {filtered.map(course => (
            <div key={course.id} className="uc-course-card">
              <div className="uc-course-badges">
                {course.mandatory
                  ? <span className="badge-recommended">⭐ Recommended</span>
                  : <span className="badge-optional">Optional</span>}
                {course.refresher_months > 0 && <span className="badge-refresher">♻️ Every {course.refresher_months}mo</span>}
              </div>
              <h3 className="uc-course-title" onClick={() => navigate(`/course/${course.id}`)}>{course.title}</h3>
              <p className="uc-course-desc">{course.description}</p>
              <div className="uc-course-meta">
                <span>{course.level}</span><span>·</span><span>{course.duration}</span>
              </div>
              <button className="button-primary uc-start-btn" onClick={() => handleStart(course.id)}>
                ▶ Start Training
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
