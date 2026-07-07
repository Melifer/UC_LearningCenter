import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function getYoutubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return m ? m[1] : null;
}

function mdToHtml(text) {
  if (!text) return '';
  if (text.trim().startsWith('<')) return text;
  // Tables
  text = text.replace(/^\|(.+)\|\s*$/gm, (line) => {
    const cells = line.split('|').slice(1, -1).map(c => c.trim());
    return '<tr>' + cells.map(c => `<td>${c.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}</td>`).join('') + '</tr>';
  });
  text = text.replace(/(<tr>.*<\/tr>\n?)+/g, (m) => {
    const rows = m.trim().split('\n').filter(r => !r.match(/^<tr><td>[- |:]+<\/td>/));
    return '<table class="lesson-table"><tbody>' + rows.join('') + '</tbody></table>';
  });
  return text
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:16px 0"/>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbulipcobdatse])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '');
}

const LessonView = ({ user, showToast }) => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState({ lessons: [] });

  // Scroll fix: ref to active lesson button
  const activeLessonRef = useRef(null);
  const sidebarRef = useRef(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3002/api/courses/${courseId}`);
      const courseData = await res.json();
      if (!res.ok) return;
      setCourse(courseData);

      const flat = [];
      for (const mod of courseData.modules || []) {
        for (const l of mod.lessons || []) {
          flat.push({ ...l, moduleName: mod.title });
        }
      }
      setAllLessons(flat);
      setLesson(flat.find(l => l.id === parseInt(lessonId)) || null);

      if (user) {
        const progRes = await fetch(`http://localhost:3002/api/course/${courseId}/progress/${user.id}`);
        if (progRes.ok) {
          const progData = await progRes.json();
          setProgress(progData);
          const lp = progData.lessons?.find(l => l.id === parseInt(lessonId));
          setCompleted(lp?.completed === 1);
        }
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [courseId, lessonId, user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Scroll active lesson into view WITHOUT moving the page
  useEffect(() => {
    if (activeLessonRef.current) {
      activeLessonRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [lessonId]);

  const handleComplete = async () => {
    if (!user) return;
    setCompleting(true);
    try {
      const res = await fetch('http://localhost:3002/api/lesson/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, lessonId: parseInt(lessonId) })
      });
      if (res.ok) {
        setCompleted(true);
        showToast && showToast('Lesson completed! ✓', 'success');
        const idx = allLessons.findIndex(l => l.id === parseInt(lessonId));
        const next = allLessons[idx + 1];
        if (next) {
          setTimeout(() => navigate(`/course/${courseId}/lesson/${next.id}`), 1000);
        }
      } else {
        showToast && showToast('Error saving progress', 'error');
      }
    } catch { showToast && showToast('Connection error', 'error'); }
    finally { setCompleting(false); }
  };

  const isLessonDone = (id) => progress.lessons?.find(l => l.id === id)?.completed === 1;

  if (loading) return <div className="lesson-loading"><div className="loading-spinner"></div></div>;
  if (!lesson) return <div className="container"><div className="error-message">Lesson not found</div></div>;

  const currentIdx = allLessons.findIndex(l => l.id === parseInt(lessonId));
  const prevLesson = allLessons[currentIdx - 1];
  const nextLesson = allLessons[currentIdx + 1];
  const ytId = getYoutubeId(lesson.video_url);
  const totalDone = progress.lessons?.filter(l => l.completed).length || 0;
  const totalLessons = allLessons.length;
  const progressPct = totalLessons > 0 ? Math.round((totalDone / totalLessons) * 100) : 0;

  return (
    <div className="lesson-page-layout">
      <aside className="lesson-sidebar" ref={sidebarRef}>
        <div className="lesson-sidebar-top">
          <button className="sidebar-back-btn" onClick={() => navigate(`/course/${courseId}`)}>← Back to course</button>
          <div className="lesson-sidebar-progress">
            <div className="sidebar-progress-bar">
              <div className="sidebar-progress-fill" style={{ width: `${progressPct}%` }}></div>
            </div>
            <span>{totalDone}/{totalLessons} lessons • {progressPct}%</span>
          </div>
        </div>

        <nav className="lesson-nav-list">
          {(course?.modules || []).map((mod) => (
            <div key={mod.id} className="lesson-nav-module">
              <div className="lesson-nav-module-title">{mod.title}</div>
              {mod.lessons?.map((l) => {
                const done = isLessonDone(l.id);
                const active = l.id === parseInt(lessonId);
                return (
                  <button
                    key={l.id}
                    ref={active ? activeLessonRef : null}
                    className={`lesson-nav-item ${active ? 'active' : ''} ${done ? 'done' : ''}`}
                    onClick={(e) => { e.currentTarget.blur(); navigate(`/course/${courseId}/lesson/${l.id}`); }}
                  >
                    <span className="lesson-nav-check">{done ? '✓' : l.video_url ? '▶' : '○'}</span>
                    <span className="lesson-nav-name">{l.title}</span>
                  </button>
                );
              })}
            </div>
          ))}
          <div className="lesson-nav-module">
            <button
              className="lesson-nav-item quiz-nav-item"
              onClick={() => navigate(`/course/${courseId}/quiz`)}
            >
              <span className="lesson-nav-check">📝</span>
              <span className="lesson-nav-name">Final Quiz + Certificate</span>
            </button>
          </div>
        </nav>
      </aside>

      <main className="lesson-main">
        <div className="lesson-breadcrumb">
          <span onClick={() => navigate('/')} className="bc-link">Dashboard</span>
          <span className="bc-sep">›</span>
          <span onClick={() => navigate(`/course/${courseId}`)} className="bc-link">{course?.title}</span>
          <span className="bc-sep">›</span>
          <span className="bc-current">{lesson.title}</span>
        </div>

        <div className="lesson-module-tag">{lesson.moduleName}</div>
        <h1 className="lesson-title">{lesson.title}</h1>

        {completed && <div className="lesson-completed-banner">✓ Lesson completed</div>}

        {lesson.video_url && (
          <div className="lesson-video-wrapper">
            {ytId ? (
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?rel=0`}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video controls><source src={lesson.video_url} type="video/mp4" /></video>
            )}
          </div>
        )}

        {lesson.content && (
          <div className="lesson-content-body" dangerouslySetInnerHTML={{ __html: mdToHtml(lesson.content) }} />
        )}

        <div className="lesson-footer-nav">
          <div className="lesson-footer-left">
            {prevLesson ? (
              <button className="lesson-nav-btn prev" onClick={() => navigate(`/course/${courseId}/lesson/${prevLesson.id}`)}>
                ← {prevLesson.title}
              </button>
            ) : (
              <button className="lesson-nav-btn prev" onClick={() => navigate(`/course/${courseId}`)}>
                ← Course overview
              </button>
            )}
          </div>
          <div className="lesson-footer-center">
            {!completed ? (
              <button className="btn-complete-lesson" onClick={handleComplete} disabled={completing}>
                {completing ? 'Saving...' : '✓ Mark as complete'}
              </button>
            ) : (
              <span className="lesson-done-chip">✓ Completed</span>
            )}
          </div>
          <div className="lesson-footer-right">
            {nextLesson ? (
              <button className="lesson-nav-btn next" onClick={() => navigate(`/course/${courseId}/lesson/${nextLesson.id}`)}>
                {nextLesson.title} →
              </button>
            ) : (
              <button className="lesson-nav-btn next" onClick={() => navigate(`/course/${courseId}/quiz`)}>
                Final Quiz →
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonView;
