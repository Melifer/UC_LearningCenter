import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseList = ({ user }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  const fetchData = useCallback(async () => {
    try {
      const [allRes, myRes] = await Promise.all([
        fetch(`http://localhost:3002/api/courses?role=${user?.role || 'user'}&userId=${user?.id || ''}`),
        user ? fetch(`http://localhost:3002/api/my-courses/${user.id}`) : Promise.resolve(null),
      ]);
      if (allRes.ok) setCourses((await allRes.json()).courses || []);
      if (myRes) { const d = await myRes.json(); setEnrolledIds(new Set((d.courses||[]).map(c => c.id))); }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = courses.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description?.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'all' || c.level === levelFilter;
    return matchSearch && matchLevel;
  });

  if (loading) return <div className="course-loading"><div className="loading-spinner"></div></div>;

  return (
    <div className="container">
      <div className="catalog-header">
        <div>
          <button className="sidebar-back-btn" onClick={() => navigate('/')}>← Dashboard</button>
          <h1>Katalog kursów</h1>
          <p className="dashboard-subtitle">{courses.length} kursów dostępnych na platformie</p>
        </div>
      </div>

      <div className="catalog-filters">
        <input
          className="catalog-search"
          type="text"
          placeholder="🔍 Szukaj kursów..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="level-filters">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
            <button key={lvl} className={`level-filter-btn ${levelFilter === lvl ? 'active' : ''}`} onClick={() => setLevelFilter(lvl)}>
              {lvl === 'all' ? 'Wszystkie' : lvl}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state-small"><p>Brak kursów spełniających kryteria wyszukiwania.</p></div>
      ) : (
        <div className="catalog-grid">
          {filtered.map(course => {
            const isEnrolled = enrolledIds.has(course.id);
            return (
              <div key={course.id} className="catalog-card" onClick={() => navigate(`/course/${course.id}`)}>
                <div className="catalog-card-thumb">
                  <span className="catalog-level-badge">{course.level}</span>
                  {isEnrolled && <span className="catalog-enrolled-badge">✓ Zapisany</span>}
                </div>
                <div className="catalog-card-body">
                  <h3>{course.title}</h3>
                  <p>{course.description?.substring(0, 100)}...</p>
                  <div className="catalog-meta">
                    <span>⏱ {course.duration}</span>
                    {course.mandatory && <span className="badge-mandatory" style={{fontSize:'11px'}}>OBOWIĄZKOWE</span>}
                    {course.refresher_months > 0 && <span style={{fontSize:'11px',color:'#1d6fa4'}}>♻️ co {course.refresher_months} mies.</span>}
                  </div>
                </div>
                <div className="catalog-card-footer">
                  <button className={isEnrolled ? 'button-secondary' : 'button-primary'} onClick={e => { e.stopPropagation(); navigate(`/course/${course.id}`); }}>
                    {isEnrolled ? '▶ Kontynuuj naukę' : 'Zobacz kurs →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseList;
