import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CoursePage = ({ user, showToast }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
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
        const enrollment = enrollData.courses?.find(c => c.id === parseInt(courseId));
        setEnrolled(!!enrollment);
        // Course is completed only when quiz is passed (completed_at is set by quiz submit)
        setQuizPassed(!!(enrollment?.completed_at));
        if (enrollment && user) {
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
        showToast && showToast('Enrolled successfully! You can now start learning.', 'success');
        fetchAll();
      } else {
        showToast && showToast(data.error || 'Enrollment failed', 'error');
      }
    } catch { showToast && showToast('Connection error', 'error'); }
    finally { setEnrolling(false); }
  };

  const isLessonCompleted = (lessonId) =>
    progress.lessons?.find(l => l.id === lessonId)?.completed === 1;

  const getFirstUncompletedLesson = () => {
    if (!course) return null;
    for (const mod of course.modules || []) {
      for (const lesson of mod.lessons || []) {
        if (!isLessonCompleted(lesson.id)) return lesson.id;
      }
    }
    return course.modules?.[0]?.lessons?.[0]?.id || null;
  };

  if (loading) return <div className="course-loading"><div className="loading-spinner"></div></div>;
  if (!course) return <div className="container"><div className="error-message">Course not found</div></div>;

  const totalLessons = course.modules?.reduce((s, m) => s + (m.lessons?.length || 0), 0) || 0;
  const firstUncompletedId = getFirstUncompletedLesson();

  return (
    <div className="course-page-layout">
      <aside className="course-sidebar">
        <div className="course-sidebar-header">
          <button className="sidebar-back-btn" onClick={() => navigate('/')}>← Dashboard</button>
          <h2 className="sidebar-course-title">{course.title}</h2>
          {enrolled && (
            <div className="sidebar-progress">
              <div className="sidebar-progress-bar">
                <div className="sidebar-progress-fill" style={{ width: `${progress.percentage}%` }}></div>
              </div>
              <span className="sidebar-progress-text">{progress.completed}/{progress.total} lessons • {progress.percentage}%</span>
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
                      <span className="nav-lesson-icon">{done ? '✓' : lesson.video_url ? '▶' : '📄'}</span>
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
                className={`nav-lesson-item quiz-item ${quizPassed ? 'done' : ''} ${!enrolled ? 'locked' : ''}`}
                onClick={() => enrolled && navigate(`/course/${courseId}/quiz`)}
              >
                <span className="nav-lesson-icon">{quizPassed ? '✓' : '📝'}</span>
                <span className="nav-lesson-title">Final Quiz + Certificate</span>
              </button>
            </div>
          )}
        </nav>
      </aside>

      <main className="course-main-content">
        <div className="course-overview-hero">
          <div className="course-overview-badge">
            {course.level} · {course.duration}
            {course.mandatory && <span className="badge-mandatory" style={{marginLeft:'10px'}}>MANDATORY</span>}
          </div>
          <h1>{course.title}</h1>
          <p className="course-overview-desc">{course.description}</p>

          <div className="course-overview-stats">
            <span>🗂 {course.modules?.length || 0} modules</span>
            <span>📖 {totalLessons} lessons</span>
            <span>❓ {course.quiz?.questions?.length || 0} quiz questions</span>
            {course.refresher_months > 0 && <span>♻️ Refresher every {course.refresher_months}mo</span>}
            {course.deadline && <span style={{color:'#d97706'}}>⏰ Due: {new Date(course.deadline).toLocaleDateString('en-GB')}</span>}
          </div>

          {!enrolled ? (
            <button className="btn-enroll" onClick={handleEnroll} disabled={enrolling}>
              {enrolling ? 'Enrolling...' : '▶ Start course'}
            </button>
          ) : quizPassed ? (
            <div className="btn-completed-state">
              <span>🎓 Course completed</span>
              <button className="button-secondary" onClick={() => navigate(`/course/${courseId}/quiz`)}>
                Retake quiz
              </button>
            </div>
          ) : (
            <button className="btn-continue" onClick={() => firstUncompletedId && navigate(`/course/${courseId}/lesson/${firstUncompletedId}`)}>
              {progress.completed > 0 ? '▶ Continue learning' : '▶ Start learning'}
            </button>
          )}
        </div>

        {enrolled && (
          <div className="course-progress-overview">
            <h3>Your progress</h3>
            <div className="progress-big-bar">
              <div className="progress-big-fill" style={{ width: `${progress.percentage}%` }}></div>
            </div>
            <div className="progress-big-stats">
              <span>{progress.completed} completed</span>
              <span>{progress.total - progress.completed} remaining</span>
              <span className="progress-pct">{progress.percentage}%</span>
            </div>
            {progress.percentage === 100 && !quizPassed && (
              <div className="completion-banner">
                <span>📝</span>
                <div>
                  <strong>All lessons complete!</strong>
                  <p>Take the final quiz to receive your certificate.</p>
                </div>
                <button className="button-primary" onClick={() => navigate(`/course/${courseId}/quiz`)}>Take quiz →</button>
              </div>
            )}
            {quizPassed && (
              <div className="completion-banner" style={{background:'rgba(26,158,92,0.08)',borderColor:'rgba(26,158,92,0.3)'}}>
                <span>🎓</span>
                <div>
                  <strong>Course completed!</strong>
                  <p>You passed the quiz and earned your certificate.</p>
                </div>
                <button className="button-primary" onClick={() => navigate('/certificates')}>View certificate →</button>
              </div>
            )}
          </div>
        )}

        <div className="course-modules-list">
          <h3>Course content</h3>
          {(course.modules || []).map((mod, mi) => {
            const doneCount = mod.lessons?.filter(l => isLessonCompleted(l.id)).length || 0;
            return (
              <div key={mod.id} className="course-module-row">
                <div className="module-row-header">
                  <div className="module-row-left">
                    <span className="module-row-num">Module {mi + 1}</span>
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
