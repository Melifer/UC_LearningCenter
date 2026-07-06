import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function getYoutubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return m ? m[1] : null;
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

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3002/api/courses/${courseId}`);
      const courseData = await res.json();
      if (!res.ok) return;
      setCourse(courseData);

      // Flatten all lessons with module context
      const flat = [];
      for (const mod of courseData.modules || []) {
        for (const l of mod.lessons || []) {
          flat.push({ ...l, moduleName: mod.title, moduleId: mod.id });
        }
      }
      setAllLessons(flat);

      const found = flat.find(l => l.id === parseInt(lessonId));
      setLesson(found || null);

      if (user) {
        const progRes = await fetch(`http://localhost:3002/api/course/${courseId}/progress/${user.id}`);
        if (progRes.ok) {
          const progData = await progRes.json();
          setProgress(progData);
          const lp = progData.lessons.find(l => l.id === parseInt(lessonId));
          setCompleted(lp?.completed === 1);
        }
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [courseId, lessonId, user]);

  useEffect(() => { fetchData(); }, [fetchData]);

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
        showToast && showToast('Lekcja ukończona! 🎉', 'success');
        // Auto-go to next lesson after 1s
        const idx = allLessons.findIndex(l => l.id === parseInt(lessonId));
        const next = allLessons[idx + 1];
        if (next) {
          setTimeout(() => navigate(`/course/${courseId}/lesson/${next.id}`), 1200);
        }
      } else {
        showToast && showToast('Błąd zapisu postępu', 'error');
      }
    } catch { showToast && showToast('Błąd połączenia', 'error'); }
    finally { setCompleting(false); }
  };

  const isLessonDone = (id) => progress.lessons.find(l => l.id === id)?.completed === 1;

  if (loading) return (
    <div className="lesson-loading">
      <div className="loading-spinner"></div>
    </div>
  );

  if (!lesson) return <div className="container"><div className="error-message">Lekcja nie znaleziona</div></div>;

  const currentIdx = allLessons.findIndex(l => l.id === parseInt(lessonId));
  const prevLesson = allLessons[currentIdx - 1];
  const nextLesson = allLessons[currentIdx + 1];
  const ytId = getYoutubeId(lesson.video_url);
  const totalDone = progress.lessons?.filter(l => l.completed).length || 0;
  const totalLessons = allLessons.length;
  const progressPct = totalLessons > 0 ? Math.round((totalDone / totalLessons) * 100) : 0;

  return (
    <div className="lesson-page-layout">
      {/* LEFT SIDEBAR: Lesson navigation */}
      <aside className="lesson-sidebar">
        <div className="lesson-sidebar-top">
          <button className="sidebar-back-btn" onClick={() => navigate(`/course/${courseId}`)}>← Kurs</button>
          <div className="lesson-sidebar-progress">
            <div className="sidebar-progress-bar">
              <div className="sidebar-progress-fill" style={{ width: `${progressPct}%` }}></div>
            </div>
            <span>{totalDone}/{totalLessons} • {progressPct}%</span>
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
                    className={`lesson-nav-item ${active ? 'active' : ''} ${done ? 'done' : ''}`}
                    onClick={() => navigate(`/course/${courseId}/lesson/${l.id}`)}
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
              <span className="lesson-nav-name">Quiz + Certyfikat</span>
            </button>
          </div>
        </nav>

        <div className="lesson-sidebar-resources">
          <button className="resource-link-btn" onClick={() => navigate(`/course/${courseId}/slides`)}>📊 Slajdy</button>
          <button className="resource-link-btn" onClick={() => navigate(`/course/${courseId}/handbook`)}>📚 Handbook</button>
        </div>
      </aside>

      {/* MAIN: Lesson content */}
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

        {completed && (
          <div className="lesson-completed-banner">✓ Lekcja ukończona</div>
        )}

        {/* Video */}
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
              <video controls>
                <source src={lesson.video_url} type="video/mp4" />
              </video>
            )}
          </div>
        )}

        {/* Content */}
        {lesson.content && (
          <div className="lesson-content-body" dangerouslySetInnerHTML={{ __html: lesson.content }} />
        )}

        {/* Footer navigation */}
        <div className="lesson-footer-nav">
          <div className="lesson-footer-left">
            {prevLesson ? (
              <button className="lesson-nav-btn prev" onClick={() => navigate(`/course/${courseId}/lesson/${prevLesson.id}`)}>
                ← {prevLesson.title}
              </button>
            ) : (
              <button className="lesson-nav-btn prev" onClick={() => navigate(`/course/${courseId}`)}>
                ← Przegląd kursu
              </button>
            )}
          </div>

          <div className="lesson-footer-center">
            {!completed ? (
              <button className="btn-complete-lesson" onClick={handleComplete} disabled={completing}>
                {completing ? 'Zapisywanie...' : '✓ Oznacz jako ukończona'}
              </button>
            ) : (
              <span className="lesson-done-chip">✓ Ukończona</span>
            )}
          </div>

          <div className="lesson-footer-right">
            {nextLesson ? (
              <button className="lesson-nav-btn next" onClick={() => navigate(`/course/${courseId}/lesson/${nextLesson.id}`)}>
                {nextLesson.title} →
              </button>
            ) : (
              <button className="lesson-nav-btn next" onClick={() => navigate(`/course/${courseId}/quiz`)}>
                Quiz końcowy →
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonView;
