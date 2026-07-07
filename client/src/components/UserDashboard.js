import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({ user, showToast }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchData = useCallback(async () => {
    try {
      const [allRes, myRes] = await Promise.all([
        fetch(`http://localhost:3002/api/courses?role=user&userId=${user.id}`),
        fetch(`http://localhost:3002/api/my-courses/${user.id}`),
      ]);
      const allData = allRes.ok ? (await allRes.json()).courses || [] : [];
      const myData = myRes.ok ? (await myRes.json()).courses || [] : [];

      setCourses(allData);
      setEnrollments(myData);

      if (myData.length > 0) {
        const progResults = await Promise.all(
          myData.map(c => fetch(`http://localhost:3002/api/course/${c.id}/progress/${user.id}`)
            .then(r => r.json()).catch(() => ({})))
        );
        const map = {};
        myData.forEach((c, i) => { map[c.id] = progResults[i]; });
        setProgress(map);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [user.id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const getEnrollment = (courseId) => enrollments.find(e => e.id === courseId);
  const isEnrolled = (courseId) => !!getEnrollment(courseId);
  // Course completed = quiz passed = completed_at is set
  const isCompleted = (courseId) => !!(getEnrollment(courseId)?.completed_at);

  const handleStart = async (courseId) => {
    if (!isEnrolled(courseId)) {
      const res = await fetch('http://localhost:3002/api/enroll', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, courseId })
      });
      if (!res.ok) { const d = await res.json(); showToast && showToast(d.error || 'Error', 'error'); return; }
      showToast && showToast('Enrolled successfully', 'success');
      await fetchData();
    }
    navigate(`/course/${courseId}`);
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
  const isOverdue = (deadline) => deadline ? new Date(deadline) < new Date() : false;

  const enrolledIds = new Set(enrollments.map(e => e.id));
  const mandatory = courses.filter(c => c.mandatory);
  const completedCount = enrollments.filter(e => e.completed_at).length;
  const inProgressCount = enrollments.filter(e => !e.completed_at && (progress[e.id]?.percentage || 0) > 0).length;
  const overdueCount = mandatory.filter(c => isOverdue(c.deadline) && !isCompleted(c.id)).length;

  const filtered = courses.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || (c.description || '').toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'all' || c.level === levelFilter;
    const completed = isCompleted(c.id);
    const inProgress = isEnrolled(c.id) && !completed && (progress[c.id]?.percentage || 0) > 0;
    const matchStatus =
      statusFilter === 'all' ? true :
      statusFilter === 'mandatory' ? c.mandatory :
      statusFilter === 'inprogress' ? inProgress :
      statusFilter === 'completed' ? completed : true;
    return matchSearch && matchLevel && matchStatus;
  });

  if (loading) return <div className="course-loading"><div className="loading-spinner"></div></div>;

  return (
    <div className="container user-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user.name || user.email.split('@')[0]}!</h1>
          <p className="dashboard-subtitle">UniCredit Learning Center — Your training dashboard</p>
        </div>
        <button className="button-secondary" onClick={() => navigate('/certificates')}>🎓 My certificates</button>
      </div>

      <div className="dashboard-stats">
        {[
          { icon:'📚', val: courses.length, label:'Available', key:'all' },
          { icon:'🔴', val: mandatory.length, label:'Mandatory', key:'mandatory' },
          { icon:'🎯', val: inProgressCount, label:'In Progress', key:'inprogress' },
          { icon:'✅', val: completedCount, label:'Completed', key:'completed' },
        ].map(s => (
          <div key={s.key} className={`stat-card clickable ${statusFilter === s.key ? 'active' : ''}`} onClick={() => setStatusFilter(s.key)}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {overdueCount > 0 && (
        <div className="overdue-alert">
          ⚠️ You have <strong>{overdueCount}</strong> overdue mandatory training{overdueCount > 1 ? 's' : ''}
        </div>
      )}

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
          <button className="button-secondary" onClick={() => { setSearch(''); setLevelFilter('all'); setStatusFilter('all'); }}>Clear filters</button>
        </div>
      ) : (
        <div className="uc-courses-grid">
          {filtered.map(course => {
            const prog = progress[course.id] || {};
            const pct = prog.percentage || 0;
            const enrolled = isEnrolled(course.id);
            const completed = isCompleted(course.id);
            const inProgress = enrolled && !completed && pct > 0;
            const overdue = isOverdue(course.deadline) && !completed;

            return (
              <div key={course.id} className={`uc-course-card ${completed ? 'uc-course-card--completed' : ''} ${overdue ? 'uc-course-card--overdue' : ''}`}>
                <div className="uc-course-badges">
                  {course.mandatory ? <span className="badge-mandatory">🔴 MANDATORY</span> : <span className="badge-optional">Optional</span>}
                  {course.refresher_months > 0 && <span className="badge-refresher">♻️ Every {course.refresher_months}mo</span>}
                  {completed && <span className="badge-completed">✅ Completed</span>}
                </div>
                <h3 className="uc-course-title" onClick={() => navigate(`/course/${course.id}`)}>{course.title}</h3>
                <p className="uc-course-desc">{course.description}</p>
                <div className="uc-course-meta">
                  <span>{course.level}</span><span>·</span><span>{course.duration}</span>
                  {course.deadline && <><span>·</span><span className={overdue ? 'text-overdue' : ''}>{overdue ? '⚠️ ' : '⏰ '}Due: {formatDate(course.deadline)}</span></>}
                </div>
                {enrolled && !completed && (
                  <div className="uc-progress-bar">
                    <div className="uc-progress-fill" style={{ width: `${pct}%` }}></div>
                    <span className="uc-progress-label">{pct}%</span>
                  </div>
                )}
                <button className={`button-primary uc-start-btn ${completed ? 'button-secondary' : ''}`} onClick={() => handleStart(course.id)}>
                  {completed ? '🎓 Review training' : inProgress ? `Continue (${pct}%)` : '▶ Start'}
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
