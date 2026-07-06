import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CoursePage = ({ user, showToast }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [progress, setProgress] = useState({ completed: 0, total: 0, percentage: 0, lessons: [] });

  const fetchAll = useCallback(async () => {
    try {
      const [courseRes, enrollRes] = await Promise.all([
        fetch(`http://localhost:3002/api/courses/${courseId}`),
        user ? fetch(`http://localhost:3002/api/my-courses/${user.id}`) : Promise.resolve(null),
      ]);
      const courseData = await courseRes.json();
      if (courseRes.ok) setCourse(courseData);

      if (enrollRes) {
        const enrollData = await enrollRes.json();
        const isEnrolled = enrollData.courses?.some(c => c.id === parseInt(courseId));
        setEnrolled(isEnrolled);
        if (isEnrolled && user) {
          const progRes = await fetch(`http://localhost:3002/api/course/${courseId}/progress/${user.id}`);
          if (progRes.ok) setProgress(await progRes.json());
        }
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [courseId, user]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleEnroll = async () => {
    if (!user) { navigate('/login'); return; }
    setEnrolling(true);
    try {
      const res = await fetch('http://localhost:3002/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, courseId: parseInt(courseId) })
      });
      const data = await res.json();
      if (res.ok) {
        setEnrolled(true);
        showToast && showToast('Zapisano na kurs! Możesz zacząć naukę.', 'success');
        fetchAll();
      } else {
        showToast && showToast(data.error || 'Błąd zapisu', 'error');
      }
    } catch { showToast && showToast('Błąd połączenia', 'error'); }
    finally { setEnrolling(false); }
  };

  const isLessonCompleted = (lessonId) =>
    progress.lessons.find(l => l.id === lessonId)?.completed === 1;

  const getFirstUncompletedLesson = () => {
    if (!course) return null;
    for (const mod of course.modules || []) {
      for (const lesson of mod.lessons || []) {
        if (!isLessonCompleted(lesson.id)) return lesson.id;
      }
    }
    return course.modules?.[0]?.lessons?.[0]?.id || null;
  };

  if (loading) return (
    <div className="course-loading">
      <div className="loading-spinner"></div>
      <p>Ładowanie kursu...</p>
    </div>
  );

  if (!course) return <div className="container"><div className="error-message">Kurs nie znaleziony</div></div>;

  const totalLessons = course.modules?.reduce((s, m) => s + (m.lessons?.length || 0), 0) || 0;
  const firstUncompletedId = getFirstUncompletedLesson();

  return (
    <div className="course-page-layout">
      {/* LEFT: Course sidebar with lesson list */}
      <aside className="course-sidebar">
        <div className="course-sidebar-header">
          <button className="sidebar-back-btn" onClick={() => navigate('/')}>← Dashboard</button>
          <h2 className="sidebar-course-title">{course.title}</h2>
          {enrolled && (
            <div className="sidebar-progress">
              <div className="sidebar-progress-bar">
                <div className="sidebar-progress-fill" style={{ width: `${progress.percentage}%` }}></div>
              </div>
              <span className="sidebar-progress-text">{progress.completed}/{progress.total} lekcji • {progress.percentage}%</span>
            </div>
          )}
        </div>

        <nav className="course-lesson-nav">
          {(course.modules || []).map((mod, mi) => {
            const modCompleted = mod.lessons?.every(l => isLessonCompleted(l.id));
            const modStarted = mod.lessons?.some(l => isLessonCompleted(l.id));
            return (
              <div key={mod.id} className="nav-module">
                <div className="nav-module-header">
                  <span className={`nav-module-check ${modCompleted ? 'done' : modStarted ? 'partial' : ''}`}>
                    {modCompleted ? '✓' : mi + 1}
                  </span>
                  <span className="nav-module-title">{mod.title}</span>
                </div>
                {mod.lessons?.map((lesson) => {
                  const done = isLessonCompleted(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      className={`nav-lesson-item ${done ? 'done' : ''} ${!enrolled ? 'locked' : ''}`}
                      onClick={() => enrolled && navigate(`/course/${courseId}/lesson/${lesson.id}`)}
                    >
                      <span className="nav-lesson-icon">
                        {done ? '✓' : lesson.video_url ? '▶' : '📄'}
                      </span>
                      <span className="nav-lesson-title">{lesson.title}</span>
                      <span className="nav-lesson-dur">{lesson.duration}m</span>
                    </button>
                  );
                })}
              </div>
            );
          })}

          {course.quiz && (
            <div className="nav-module">
              <button
                className={`nav-lesson-item quiz-item ${!enrolled ? 'locked' : ''}`}
                onClick={() => enrolled && navigate(`/course/${courseId}/quiz`)}
              >
                <span className="nav-lesson-icon">📝</span>
                <span className="nav-lesson-title">Quiz końcowy + Certyfikat</span>
              </button>
            </div>
          )}
        </nav>

        {enrolled && (
          <div className="sidebar-resources">
            <p className="resources-label">Materiały dodatkowe</p>
            <button className="resource-link-btn" onClick={() => navigate(`/course/${courseId}/slides`)}>📊 Slajdy</button>
            <button className="resource-link-btn" onClick={() => navigate(`/course/${courseId}/handbook`)}>📚 Handbook</button>
          </div>
        )}
      </aside>

      {/* RIGHT: Course overview / CTA */}
      <main className="course-main-content">
        <div className="course-overview-hero">
          <div className="course-overview-badge">{course.level} • {course.duration}</div>
          <h1>{course.title}</h1>
          <p className="course-overview-desc">{course.description}</p>
          {course.trainer_name && (
            <div className="course-trainer-info">
              <span className="trainer-avatar">{course.trainer_name[0]}</span>
              <span>Autor: <strong>{course.trainer_name}</strong></span>
            </div>
          )}

          <div className="course-overview-stats">
            <span>🗂 {course.modules?.length || 0} modułów</span>
            <span>📖 {totalLessons} lekcji</span>
            <span>❓ {course.quiz?.questions?.length || 0} pytań quizowych</span>
            <span>{course.is_free ? '🆓 Bezpłatny' : `💳 $${course.price}`}</span>
          </div>

          {!enrolled ? (
            <button className="btn-enroll" onClick={handleEnroll} disabled={enrolling}>
              {enrolling ? 'Zapisywanie...' : '▶ Zacznij za darmo'}
            </button>
          ) : (
            <button className="btn-continue" onClick={() => firstUncompletedId && navigate(`/course/${courseId}/lesson/${firstUncompletedId}`)}>
              {progress.completed > 0 ? '▶ Kontynuuj naukę' : '▶ Zacznij kurs'}
            </button>
          )}
        </div>

        {enrolled && (
          <div className="course-progress-overview">
            <h3>Twój postęp</h3>
            <div className="progress-big-bar">
              <div className="progress-big-fill" style={{ width: `${progress.percentage}%` }}></div>
            </div>
            <div className="progress-big-stats">
              <span>{progress.completed} ukończonych</span>
              <span>{progress.total - progress.completed} pozostałych</span>
              <span className="progress-pct">{progress.percentage}%</span>
            </div>

            {progress.percentage === 100 && (
              <div className="completion-banner">
                <span>🎓</span>
                <div>
                  <strong>Kurs ukończony!</strong>
                  <p>Przejdź do quizu aby zdobyć certyfikat.</p>
                </div>
                <button className="button-primary" onClick={() => navigate(`/course/${courseId}/quiz`)}>Zrób quiz →</button>
              </div>
            )}
          </div>
        )}

        <div className="course-modules-list">
          <h3>Zawartość kursu</h3>
          {(course.modules || []).map((mod, mi) => {
            const doneCount = mod.lessons?.filter(l => isLessonCompleted(l.id)).length || 0;
            return (
              <div key={mod.id} className="course-module-row">
                <div className="module-row-header">
                  <div className="module-row-left">
                    <span className="module-row-num">Moduł {mi + 1}</span>
                    <h4>{mod.title}</h4>
                    {mod.description && <p>{mod.description}</p>}
                  </div>
                  <span className="module-row-progress">{doneCount}/{mod.lessons?.length || 0}</span>
                </div>
                <div className="module-row-lessons">
                  {(mod.lessons || []).map((lesson) => {
                    const done = isLessonCompleted(lesson.id);
                    return (
                      <div key={lesson.id}
                        className={`lesson-row ${done ? 'done' : ''} ${!enrolled ? 'locked' : 'clickable'}`}
                        onClick={() => enrolled && navigate(`/course/${courseId}/lesson/${lesson.id}`)}>
                        <span className={`lesson-row-icon ${done ? 'done' : ''}`}>{done ? '✓' : lesson.video_url ? '▶' : '📄'}</span>
                        <span className="lesson-row-title">{lesson.title}</span>
                        <span className="lesson-row-dur">{lesson.duration} min</span>
                        {!enrolled && <span className="lesson-row-lock">🔒</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
