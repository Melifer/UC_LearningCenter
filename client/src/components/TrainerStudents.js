import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const TrainerStudents = ({ user, showToast }) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseFilter, setCourseFilter] = useState('all');
  const [showMessage, setShowMessage] = useState(false);
  const [msgTarget, setMsgTarget] = useState(null); // null = all, {id, name} = specific
  const [msgForm, setMsgForm] = useState({ subject: '', content: '' });
  const [sending, setSending] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await fetch(`http://localhost:3002/api/trainer/students/${user.id}`);
    if (res.ok) setStudents((await res.json()).students || []);
    setLoading(false);
  }, [user.id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const courses = [...new Map(students.map(s => [s.course_id, { id: s.course_id, title: s.course_title }])).values()];
  const filtered = courseFilter === 'all' ? students : students.filter(s => s.course_id === parseInt(courseFilter));

  // Group by student
  const grouped = filtered.reduce((acc, s) => {
    const key = s.id;
    if (!acc[key]) acc[key] = { id: s.id, name: s.name, email: s.email, courses: [] };
    acc[key].courses.push({ course_id: s.course_id, course_title: s.course_title, progress_pct: s.progress_pct, completed_at: s.completed_at, enrolled_at: s.enrolled_at });
    return acc;
  }, {});
  const studentList = Object.values(grouped);

  const openMessage = (target) => {
    setMsgTarget(target);
    setMsgForm({ subject: '', content: '' });
    setShowMessage(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!msgForm.content.trim()) return;
    setSending(true);

    const targets = msgTarget ? [msgTarget.id] : studentList.map(s => s.id);
    let ok = true;
    for (const toId of targets) {
      const res = await fetch('http://localhost:3002/api/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from_user_id: user.id, to_user_id: toId, subject: msgForm.subject, content: msgForm.content }),
      });
      if (!res.ok) { ok = false; }
    }

    if (ok) {
      showToast && showToast(msgTarget ? `Wiadomość wysłana do ${msgTarget.name}` : `Wiadomość wysłana do ${targets.length} uczniów`, 'success');
      setShowMessage(false);
    } else {
      showToast && showToast('Błąd wysyłania', 'error');
    }
    setSending(false);
  };

  if (loading) return <div className="course-loading"><div className="loading-spinner"></div></div>;

  return (
    <div className="container">
      <div className="catalog-header">
        <button className="sidebar-back-btn" onClick={() => navigate('/')}>← Dashboard</button>
        <h1>Moi uczniowie</h1>
      </div>

      <div className="students-toolbar">
        <div className="level-filters">
          <button className={`level-filter-btn ${courseFilter==='all'?'active':''}`} onClick={() => setCourseFilter('all')}>
            Wszystkie kursy ({studentList.length} uczniów)
          </button>
          {courses.map(c => (
            <button key={c.id} className={`level-filter-btn ${courseFilter===c.id?'active':''}`} onClick={() => setCourseFilter(c.id)}>
              {c.title}
            </button>
          ))}
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          {studentList.length > 0 && (
            <button className="button-primary" onClick={() => openMessage(null)}>
              ✉️ Napisz do wszystkich ({studentList.length})
            </button>
          )}
        </div>
      </div>

      {studentList.length === 0 ? (
        <div className="empty-state-small">
          <p>Brak uczniów zapisanych na Twoje kursy.</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Uczeń</th>
              <th>Email</th>
              <th>Kurs</th>
              <th>Postęp</th>
              <th>Status</th>
              <th>Zapisany</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map(student => (
              student.courses.map((c, ci) => (
                <tr key={`${student.id}-${c.course_id}`}>
                  {ci === 0 && (
                    <td rowSpan={student.courses.length}>
                      <strong>{student.name}</strong>
                    </td>
                  )}
                  {ci === 0 && (
                    <td rowSpan={student.courses.length} style={{fontSize:'12px',color:'var(--text-secondary)'}}>
                      {student.email}
                    </td>
                  )}
                  <td style={{fontSize:'13px'}}>{c.course_title}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                      <div style={{flex:1,height:'6px',background:'rgba(255,255,255,0.08)',borderRadius:'3px',overflow:'hidden',minWidth:'60px'}}>
                        <div style={{height:'100%',width:`${c.progress_pct}%`,background: c.completed_at ? '#22c55e' : 'var(--uc-red)',borderRadius:'3px'}}></div>
                      </div>
                      <span style={{fontSize:'12px',fontWeight:700,color:c.completed_at?'#22c55e':'var(--uc-red)',flexShrink:0}}>{c.progress_pct}%</span>
                    </div>
                  </td>
                  <td>
                    {c.completed_at
                      ? <span className="badge-completed">✓ Ukończony</span>
                      : c.progress_pct > 0
                        ? <span className="badge-inprogress">W trakcie</span>
                        : <span style={{fontSize:'12px',color:'var(--text-muted)'}}>Nie rozpoczęty</span>
                    }
                  </td>
                  <td style={{fontSize:'12px',color:'var(--text-muted)'}}>{new Date(c.enrolled_at).toLocaleDateString('pl-PL')}</td>
                  {ci === 0 && (
                    <td rowSpan={student.courses.length}>
                      <button className="btn-action" onClick={() => openMessage({ id: student.id, name: student.name })}>
                        ✉️ Wiadomość
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ))}
          </tbody>
        </table>
      )}

      {showMessage && (
        <div className="modal-overlay" onClick={() => setShowMessage(false)}>
          <div className="modal-box modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{msgTarget ? `Wiadomość do: ${msgTarget.name}` : `Wiadomość do wszystkich (${studentList.length})`}</h2>
              <button className="modal-close" onClick={() => setShowMessage(false)}>✕</button>
            </div>
            <form onSubmit={handleSendMessage} className="modal-form">
              <div className="bf-group">
                <label>Temat</label>
                <input type="text" value={msgForm.subject} onChange={e => setMsgForm({...msgForm, subject: e.target.value})} placeholder="Temat wiadomości" />
              </div>
              <div className="bf-group">
                <label>Treść *</label>
                <textarea value={msgForm.content} onChange={e => setMsgForm({...msgForm, content: e.target.value})} rows="6" required placeholder="Wpisz treść..." />
              </div>
              <div className="modal-footer">
                <button type="button" className="button-secondary" onClick={() => setShowMessage(false)}>Anuluj</button>
                <button type="submit" className="button-primary" disabled={sending}>
                  {sending ? 'Wysyłanie...' : `✉️ Wyślij${!msgTarget ? ` (${studentList.length})` : ''}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerStudents;
