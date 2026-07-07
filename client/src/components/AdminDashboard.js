import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ user, showToast }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3002/api/admin/courses');
      if (res.ok) setCourses((await res.json()).courses || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const handlePublish = async (courseId, publish) => {
    const endpoint = publish ? 'publish' : 'unpublish';
    const res = await fetch(`http://localhost:3002/api/courses/${courseId}/${endpoint}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: '{}' });
    if (res.ok) {
      showToast && showToast(publish ? 'Kurs opublikowany ✓' : 'Kurs cofnięty do draftu', 'success');
      fetchCourses();
    } else showToast && showToast('Błąd', 'error');
  };

  const handleDelete = async (courseId, title) => {
    if (!window.confirm(`Usunąć kurs "${title}"? Ta operacja jest nieodwracalna.`)) return;
    const res = await fetch(`http://localhost:3002/api/admin/courses/${courseId}`, { method: 'DELETE' });
    if (res.ok) { showToast && showToast('Kurs usunięty', 'success'); fetchCourses(); }
  };

  const handleDuplicate = async (courseId, title) => {
    const res = await fetch(`http://localhost:3002/api/admin/courses/${courseId}/duplicate`, {
      method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ adminId: user.id })
    });
    const data = await res.json();
    if (res.ok) { showToast && showToast(`Kopia kursu "${title}" gotowa`, 'success'); fetchCourses(); }
    else showToast && showToast(data.error || 'Błąd kopiowania', 'error');
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('pl-PL') : null;

  const filtered = courses.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter ||
      (statusFilter === 'published' && (c.status === 'published' || c.status === 'approved' || !c.status));
    return matchSearch && matchStatus;
  });

  const published = courses.filter(c => c.status === 'published' || c.status === 'approved' || !c.status).length;
  const drafts = courses.filter(c => c.status === 'draft').length;

  if (loading) return <div className="container"><div className="loading">Ładowanie...</div></div>;

  return (
    <div className="container dashboard admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Panel Administratora</h1>
          <p className="dashboard-subtitle">UniCredit Learning Center — zarządzanie szkoleniami</p>
        </div>
        <div className="header-actions-group">
          <button className="button-secondary" onClick={() => navigate('/admin/import-markdown')}>📄 Import Markdown</button>
          <button className="button-primary" onClick={() => navigate('/admin/create-course')}>➕ Nowe szkolenie</button>
        </div>
      </div>

      <div className="admin-stats-row">
        <div className="admin-stat-pill">
          <span className="stat-num">{courses.length}</span>
          <span>Wszystkich szkoleń</span>
        </div>
        <div className="admin-stat-pill admin-stat-pill--green">
          <span className="stat-num">{published}</span>
          <span>Opublikowanych</span>
        </div>
        <div className="admin-stat-pill admin-stat-pill--gray">
          <span className="stat-num">{drafts}</span>
          <span>Szkiców</span>
        </div>
        <div className="admin-stat-pill admin-stat-pill--red">
          <span className="stat-num">{courses.filter(c => c.mandatory).length}</span>
          <span>Obowiązkowych</span>
        </div>
      </div>

      <div className="admin-toolbar">
        <input
          className="catalog-search"
          type="text"
          placeholder="🔍 Szukaj szkoleń..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="admin-filter-btns">
          {[['all','Wszystkie'],['published','Opublikowane'],['draft','Szkice']].map(([v, l]) => (
            <button key={v} className={`filter-btn ${statusFilter === v ? 'active' : ''}`} onClick={() => setStatusFilter(v)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="admin-courses-list">
        {filtered.length === 0 ? (
          <div className="empty-state-small">
            <p>Brak szkoleń. Stwórz pierwsze szkolenie lub zaimportuj z Markdown.</p>
            <button className="button-primary" onClick={() => navigate('/admin/import-markdown')}>📄 Import Markdown</button>
          </div>
        ) : (
          filtered.map(course => {
            const isPublished = course.status === 'published' || course.status === 'approved' || !course.status;
            return (
              <div key={course.id} className={`admin-course-row ${isPublished ? 'admin-course-row--published' : 'admin-course-row--draft'}`}>
                <div className="admin-course-info">
                  <div className="admin-course-badges">
                    <span className={`status-badge ${isPublished ? 'status-published' : 'status-draft'}`}>
                      {isPublished ? '● Opublikowane' : '○ Szkic'}
                    </span>
                    {course.mandatory ? <span className="badge-mandatory">🔴 OBOWIĄZKOWE</span> : <span className="badge-optional">○ Nieobowiązkowe</span>}
                    {course.refresher_months > 0 && <span className="badge-refresher">♻️ co {course.refresher_months} mies.</span>}
                    {course.deadline && <span className="badge-deadline">⏰ do {formatDate(course.deadline)}</span>}
                  </div>
                  <h3 className="admin-course-title">{course.title}</h3>
                  <p className="admin-course-meta">
                    {course.level} · {course.duration} · {course.enrolled_count || 0} zapisanych
                  </p>
                </div>
                <div className="admin-course-actions">
                  <button className="btn-action" title="Podgląd" onClick={() => navigate(`/course/${course.id}`)}>👁</button>
                  <button className="btn-action" title="Edytuj" onClick={() => navigate(`/admin/edit-course/${course.id}`)}>✏️</button>
                  <button className="btn-action" title="Duplikuj" onClick={() => handleDuplicate(course.id, course.title)}>⧉</button>
                  {isPublished ? (
                    <button className="btn-action btn-unpublish" title="Cofnij do szkicu" onClick={() => handlePublish(course.id, false)}>
                      Cofnij
                    </button>
                  ) : (
                    <button className="btn-action btn-publish" title="Opublikuj" onClick={() => handlePublish(course.id, true)}>
                      Publikuj ✓
                    </button>
                  )}
                  <button className="btn-action danger" title="Usuń" onClick={() => handleDelete(course.id, course.title)}>🗑️</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
