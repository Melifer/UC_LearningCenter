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
    const res = await fetch(`http://localhost:3002/api/courses/${courseId}/${endpoint}`, {
      method: 'PUT', headers: {'Content-Type':'application/json'}, body: '{}'
    });
    if (res.ok) { showToast && showToast(publish ? 'Course published ✓' : 'Course unpublished', 'success'); fetchCourses(); }
    else showToast && showToast('Error', 'error');
  };

  const handleDelete = async (courseId, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`http://localhost:3002/api/admin/courses/${courseId}`, { method: 'DELETE' });
    if (res.ok) { showToast && showToast('Course deleted', 'success'); fetchCourses(); }
  };

  const handleDuplicate = async (courseId, title) => {
    const res = await fetch(`http://localhost:3002/api/admin/courses/${courseId}/duplicate`, {
      method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ adminId: user.id })
    });
    const data = await res.json();
    if (res.ok) { showToast && showToast(`Copy of "${title}" created`, 'success'); fetchCourses(); }
    else showToast && showToast(data.error || 'Duplicate failed', 'error');
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-GB') : null;

  const filtered = courses.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
    const isPublished = c.status === 'published' || c.status === 'approved' || !c.status;
    const matchStatus = statusFilter === 'all' || (statusFilter === 'published' && isPublished) || (statusFilter === 'draft' && !isPublished);
    return matchSearch && matchStatus;
  });

  const published = courses.filter(c => c.status === 'published' || c.status === 'approved' || !c.status).length;
  const drafts = courses.filter(c => c.status === 'draft').length;

  if (loading) return <div className="container"><div className="loading">Loading...</div></div>;

  return (
    <div className="container dashboard admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="dashboard-subtitle">UniCredit Learning Center — Training management</p>
        </div>
        <div className="header-actions-group">
          <button className="button-secondary" onClick={() => navigate('/admin/import-markdown')}>📄 Import Markdown</button>
          <button className="button-primary" onClick={() => navigate('/admin/create-course')}>➕ New training</button>
        </div>
      </div>

      <div className="admin-stats-row">
        {[
          { val: courses.length, label: 'Total courses' },
          { val: published, label: 'Published', cls: '--green' },
          { val: drafts, label: 'Drafts', cls: '--gray' },
          { val: courses.filter(c => c.mandatory).length, label: 'Mandatory', cls: '--red' },
        ].map((s, i) => (
          <div key={i} className={`admin-stat-pill admin-stat-pill${s.cls||''}`}>
            <span className="stat-num">{s.val}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="admin-toolbar">
        <input className="catalog-search" type="text" placeholder="🔍 Search courses..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className="admin-filter-btns">
          {[['all','All'],['published','Published'],['draft','Drafts']].map(([v, l]) => (
            <button key={v} className={`filter-btn ${statusFilter === v ? 'active' : ''}`} onClick={() => setStatusFilter(v)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="admin-courses-list">
        {filtered.length === 0 ? (
          <div className="empty-state-small">
            <p>No courses yet. Import from Markdown or create a new training.</p>
            <button className="button-primary" onClick={() => navigate('/admin/import-markdown')}>📄 Import Markdown</button>
          </div>
        ) : filtered.map(course => {
          const isPublished = course.status === 'published' || course.status === 'approved' || !course.status;
          return (
            <div key={course.id} className={`admin-course-row ${isPublished ? 'admin-course-row--published' : 'admin-course-row--draft'}`}>
              <div className="admin-course-info">
                <div className="admin-course-badges">
                  <span className={`status-badge ${isPublished ? 'status-published' : 'status-draft'}`}>
                    {isPublished ? '● Published' : '○ Draft'}
                  </span>
                  {course.mandatory ? <span className="badge-mandatory">🔴 MANDATORY</span> : <span className="badge-optional">Optional</span>}
                  {course.refresher_months > 0 && <span className="badge-refresher">♻️ {course.refresher_months}mo</span>}
                  {course.deadline && <span className="badge-deadline">⏰ Due {formatDate(course.deadline)}</span>}
                </div>
                <h3 className="admin-course-title">{course.title}</h3>
                <p className="admin-course-meta">{course.level} · {course.duration} · {course.enrolled_count || 0} enrolled</p>
              </div>
              <div className="admin-course-actions">
                <button className="btn-action" title="Preview" onClick={() => navigate(`/course/${course.id}`)}>👁</button>
                <button className="btn-action" title="Edit" onClick={() => navigate(`/admin/edit-course/${course.id}`)}>✏️</button>
                <button className="btn-action" title="Duplicate" onClick={() => handleDuplicate(course.id, course.title)}>⧉</button>
                {isPublished ? (
                  <button className="btn-action btn-unpublish" onClick={() => handlePublish(course.id, false)}>Unpublish</button>
                ) : (
                  <button className="btn-action btn-publish" onClick={() => handlePublish(course.id, true)}>Publish ✓</button>
                )}
                <button className="btn-action danger" title="Delete" onClick={() => handleDelete(course.id, course.title)}>🗑️</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
