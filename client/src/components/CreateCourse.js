import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const STEPS = ['Podstawy', 'Moduły & Lekcje', 'Slajdy', 'Handbook', 'Quiz', 'Podgląd'];

function getYoutubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return m ? m[1] : null;
}

// Simple markdown to HTML converter
function mdToHtml(text) {
  if (!text) return '';
  return text
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:12px 0"/>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbulipcobda])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '');
}

function MarkdownToolbar({ textareaRef, value, onChange }) {
  const insert = (before, after = '') => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart, end = el.selectionEnd;
    const selected = value.slice(start, end) || 'tekst';
    const newVal = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(newVal);
    setTimeout(() => { el.focus(); el.setSelectionRange(start + before.length, start + before.length + selected.length); }, 0);
  };
  const insertLine = (prefix) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const newVal = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    onChange(newVal);
  };
  return (
    <div className="md-toolbar">
      <button type="button" onClick={() => insertLine('# ')} title="H1">H1</button>
      <button type="button" onClick={() => insertLine('## ')} title="H2">H2</button>
      <button type="button" onClick={() => insertLine('### ')} title="H3">H3</button>
      <span className="md-sep"/>
      <button type="button" onClick={() => insert('**', '**')} title="Pogrubienie"><strong>B</strong></button>
      <button type="button" onClick={() => insert('*', '*')} title="Kursywa"><em>I</em></button>
      <button type="button" onClick={() => insert('`', '`')} title="Kod">{'<>'}</button>
      <span className="md-sep"/>
      <button type="button" onClick={() => insertLine('- ')} title="Lista">• Lista</button>
      <button type="button" onClick={() => insertLine('> ')} title="Cytat">❝</button>
      <span className="md-sep"/>
      <button type="button" onClick={() => insert('![alt](', ')')} title="Obraz z URL">🔗 Obraz URL</button>
      <button type="button" onClick={() => {
        const input = document.createElement('input');
        input.type = 'file'; input.accept = 'image/*';
        input.onchange = e => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = ev => {
            const dataUrl = ev.target.result;
            const el = textareaRef.current;
            if (!el) return;
            const pos = el.selectionStart;
            const newVal = value.slice(0, pos) + `![${file.name}](${dataUrl})` + value.slice(pos);
            onChange(newVal);
          };
          reader.readAsDataURL(file);
        };
        input.click();
      }} title="Upload obrazka z dysku">🖼️ Upload</button>
      <button type="button" onClick={() => insert('[tekst](', ')')} title="Link">🔗</button>
    </div>
  );
}

const defaultLesson = () => ({ title: '', content: '', video_url: '', duration: 15, type: 'text' });
const defaultModule = () => ({ title: '', description: '', lessons: [defaultLesson()] });
const defaultSlide = () => ({ title: '', content: '', notes: '', layout: 'list' });
const defaultChapter = () => ({ title: '', content: '' });
const defaultQuestion = () => ({ question: '', scenario: '', options: ['', '', '', ''], correct_answer: 0, explanation: '' });

const CreateCourse = ({ user, showToast, editMode = false }) => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [trainerNotes, setTrainerNotes] = useState('');

  const [info, setInfo] = useState({ title: '', description: '', level: 'Beginner', duration: '2 hours', price: 0, is_free: true, thumbnail: '' });
  const [modules, setModules] = useState([defaultModule()]);
  const [slides, setSlides] = useState([defaultSlide()]);
  const [chapters, setChapters] = useState([defaultChapter()]);
  const [questions, setQuestions] = useState([defaultQuestion()]);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const slideTextareaRef = useRef(null);
  const chapterTextareaRef = useRef(null);
  const lessonTextareaRef = useRef(null);

  const loadCourse = useCallback(async () => {
    if (!editMode || !courseId) return;
    try {
      const [courseRes, slidesRes, handbookRes] = await Promise.all([
        fetch(`http://localhost:3002/api/courses/${courseId}`),
        fetch(`http://localhost:3002/api/courses/${courseId}/slides`),
        fetch(`http://localhost:3002/api/courses/${courseId}/handbook`),
      ]);
      const data = await courseRes.json();
      const slidesData = slidesRes.ok ? await slidesRes.json() : { slides: [] };
      const handbookData = handbookRes.ok ? await handbookRes.json() : { chapters: [] };

      if (courseRes.ok && data) {
        // Course info
        setInfo({
          title: data.title,
          description: data.description || '',
          level: data.level || 'Beginner',
          duration: data.duration || '2 hours',
          price: data.price || 0,
          is_free: !!data.is_free,
          thumbnail: data.thumbnail || ''
        });

        // Modules & lessons
        if (data.modules?.length) {
          setModules(data.modules.map(m => ({
            ...m,
            lessons: m.lessons?.length
              ? m.lessons.map(l => ({ ...l, type: l.video_url ? 'video' : 'text' }))
              : [defaultLesson()]
          })));
        }

        // Slides
        if (slidesData.slides?.length) {
          setSlides(slidesData.slides.map(s => ({
            title: s.title || '',
            content: s.content || '',
            notes: s.notes || '',
            layout: s.layout || 'list',
          })));
          setActiveSlideIdx(0);
        }

        // Handbook chapters
        if (handbookData.chapters?.length) {
          setChapters(handbookData.chapters.map(c => ({
            title: c.title || '',
            content: c.content || '',
          })));
          setActiveChapterIdx(0);
        }

        // Quiz questions
        if (data.quiz?.questions?.length) {
          setQuestions(data.quiz.questions.map(q => {
            let options = q.options;
            if (typeof options === 'string') {
              try { options = JSON.parse(options); } catch { options = ['', '', '', '']; }
            }
            return {
              question: q.question || '',
              scenario: q.scenario || '',
              options: Array.isArray(options) ? options : ['', '', '', ''],
              correct_answer: q.correct_answer ?? 0,
              explanation: q.explanation || '',
            };
          }));
        }
      }
    } catch (err) { console.error('Error loading course:', err); }
  }, [editMode, courseId]);

  useEffect(() => { loadCourse(); }, [loadCourse]);

  // ---- MODULE/LESSON HELPERS ----
  const addModule = () => { setModules([...modules, defaultModule()]); setActiveModuleIdx(modules.length); setActiveLessonIdx(0); };
  const removeModule = (i) => { if (modules.length === 1) return; const m = [...modules]; m.splice(i, 1); setModules(m); setActiveModuleIdx(Math.max(0, i - 1)); };
  const updateModule = (i, field, val) => { const m = [...modules]; m[i] = { ...m[i], [field]: val }; setModules(m); };
  const moveModule = (i, dir) => {
    const m = [...modules]; const j = i + dir;
    if (j < 0 || j >= m.length) return;
    [m[i], m[j]] = [m[j], m[i]];
    setModules(m); setActiveModuleIdx(j);
  };
  const addLesson = (mi) => { const m = [...modules]; m[mi].lessons.push(defaultLesson()); setModules(m); setActiveLessonIdx(m[mi].lessons.length - 1); };
  const removeLesson = (mi, li) => { const m = [...modules]; if (m[mi].lessons.length === 1) return; m[mi].lessons.splice(li, 1); setModules(m); setActiveLessonIdx(Math.max(0, li - 1)); };
  const updateLesson = (mi, li, field, val) => { const m = [...modules]; m[mi].lessons[li] = { ...m[mi].lessons[li], [field]: val }; setModules(m); };
  const moveLesson = (mi, li, dir) => {
    const m = [...modules]; const ls = [...m[mi].lessons]; const j = li + dir;
    if (j < 0 || j >= ls.length) return;
    [ls[li], ls[j]] = [ls[j], ls[li]];
    m[mi] = { ...m[mi], lessons: ls }; setModules(m); setActiveLessonIdx(j);
  };

  // ---- SLIDE HELPERS ----
  const addSlide = () => { setSlides([...slides, defaultSlide()]); setActiveSlideIdx(slides.length); };
  const removeSlide = (i) => { if (slides.length === 1) return; const s = [...slides]; s.splice(i, 1); setSlides(s); setActiveSlideIdx(Math.max(0, i - 1)); };
  const updateSlide = (i, field, val) => { const s = [...slides]; s[i] = { ...s[i], [field]: val }; setSlides(s); };
  const moveSlide = (i, dir) => {
    const s = [...slides]; const j = i + dir;
    if (j < 0 || j >= s.length) return;
    [s[i], s[j]] = [s[j], s[i]];
    setSlides(s); setActiveSlideIdx(j);
  };
  const duplicateSlide = (i) => {
    const s = [...slides]; s.splice(i + 1, 0, { ...s[i] });
    setSlides(s); setActiveSlideIdx(i + 1);
  };

  // ---- CHAPTER HELPERS ----
  const addChapter = () => { setChapters([...chapters, defaultChapter()]); setActiveChapterIdx(chapters.length); };
  const removeChapter = (i) => { if (chapters.length === 1) return; const c = [...chapters]; c.splice(i, 1); setChapters(c); setActiveChapterIdx(Math.max(0, i - 1)); };
  const updateChapter = (i, field, val) => { const c = [...chapters]; c[i] = { ...c[i], [field]: val }; setChapters(c); };
  const moveChapter = (i, dir) => {
    const c = [...chapters]; const j = i + dir;
    if (j < 0 || j >= c.length) return;
    [c[i], c[j]] = [c[j], c[i]];
    setChapters(c); setActiveChapterIdx(j);
  };

  // ---- QUIZ HELPERS ----
  const addQuestion = () => setQuestions([...questions, defaultQuestion()]);
  const removeQuestion = (i) => { if (questions.length === 1) return; const q = [...questions]; q.splice(i, 1); setQuestions(q); };
  const updateQuestion = (i, field, val) => { const q = [...questions]; q[i] = { ...q[i], [field]: val }; setQuestions(q); };
  const updateOption = (qi, oi, val) => { const q = [...questions]; q[qi].options[oi] = val; setQuestions(q); };
  const moveQuestion = (i, dir) => {
    const q = [...questions]; const j = i + dir;
    if (j < 0 || j >= q.length) return;
    [q[i], q[j]] = [q[j], q[i]]; setQuestions(q);
  };

  const handleSubmit = async (isDraft = false, submitForReview = false) => {
    if (!info.title || !info.description) { showToast && showToast('Podaj tytuł i opis kursu', 'error'); return; }
    setSaving(true);
    const payload = {
      title: info.title, description: info.description, level: info.level, duration: info.duration,
      price: info.is_free ? 0 : info.price, is_free: info.is_free, thumbnail: info.thumbnail,
      trainer_id: user?.id,
      modules: modules.map(m => ({ title: m.title, description: m.description, lessons: m.lessons.map(l => ({ title: l.title, content: l.content, video_url: l.video_url || null, duration: parseInt(l.duration) || 15 })) })),
      quiz: { title: `${info.title} — Quiz`, passing_score: 80, questions: questions.map(q => ({ question: q.question, scenario: q.scenario, options: q.options, correct_answer: parseInt(q.correct_answer), explanation: q.explanation })) },
      slides: slides.filter(s => s.title || s.content).map((s, i) => ({ title: s.title, content: s.content, notes: s.notes, layout: s.layout, slide_number: i + 1, order_index: i + 1 })),
      handbook: chapters.filter(c => c.title || c.content).map((c, i) => ({ title: c.title, content: c.content, chapter_number: i + 1, order_index: i + 1 })),
    };

    try {
      const url = editMode ? `http://localhost:3002/api/admin/update-course/${courseId}` : 'http://localhost:3002/api/admin/create-course';
      const method = editMode ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (res.ok) {
        const savedCourseId = data.courseId || courseId;
        // Set status
        if (isDraft) {
          await fetch(`http://localhost:3002/api/courses/${savedCourseId}/draft`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: '{}' });
          showToast && showToast('Zapisano jako szkic', 'info');
        } else if (submitForReview) {
          await fetch(`http://localhost:3002/api/courses/${savedCourseId}/submit`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ trainer_notes: trainerNotes }) });
          showToast && showToast('Kurs wysłany do weryfikacji!', 'success');
        } else {
          showToast && showToast(editMode ? 'Kurs zaktualizowany!' : 'Kurs opublikowany!', 'success');
        }
        navigate('/');
      } else {
        showToast && showToast(data.error || 'Błąd zapisu', 'error');
      }
    } catch (err) {
      showToast && showToast('Błąd połączenia', 'error');
    }
    setSaving(false);
  };

  const canGoNext = () => {
    if (step === 0) return info.title && info.description;
    return true;
  };

  const currentModule = modules[activeModuleIdx] || modules[0];
  const currentLesson = currentModule?.lessons?.[activeLessonIdx] || currentModule?.lessons?.[0];
  const ytId = getYoutubeId(currentLesson?.video_url || '');

  return (
    <div className="course-builder">
      {/* Top bar */}
      <div className="builder-topbar">
        <button className="builder-back" onClick={() => navigate('/')}>← Wróć</button>
        <div className="builder-steps">
          {STEPS.map((s, i) => (
            <button key={i} className={`builder-step-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`} onClick={() => i < step && setStep(i)}>
              <span className="step-num">{i < step ? '✓' : i + 1}</span>
              <span className="step-label">{s}</span>
            </button>
          ))}
        </div>
        <div className="builder-topbar-actions">
          <button className="button-secondary" onClick={() => navigate('/')}>Anuluj</button>
          <button className="button-secondary" onClick={() => handleSubmit(true)} disabled={saving}>💾 Zapisz szkic</button>
          <button className="button-primary" onClick={() => handleSubmit(false, true)} disabled={saving}>{saving ? 'Zapisywanie...' : editMode ? '↑ Wyślij do weryfikacji' : '↑ Wyślij do weryfikacji'}</button>
        </div>
      </div>

      <div className="builder-body">

        {/* STEP 0: Course Info */}
        {step === 0 && (
          <div className="builder-step-content">
            <div className="builder-step-header"><h2>Podstawy kursu</h2><p>Podaj kluczowe informacje o kursie. To pierwsza rzecz jaką widzą uczniowie.</p></div>
            <div className="builder-form-grid">
              <div className="builder-form-main">
                <div className="bf-group"><label>Tytuł kursu *</label><input type="text" value={info.title} onChange={e => setInfo({...info, title: e.target.value})} placeholder="np. Sztuka Promptowania AI: Gemini Masterclass" /></div>
                <div className="bf-group"><label>Opis kursu *</label><textarea value={info.description} onChange={e => setInfo({...info, description: e.target.value})} rows="4" placeholder="Opisz czego się uczniowie nauczą, dla kogo jest kurs, jakie są wymagania..." /></div>
                <div className="bf-grid-2">
                  <div className="bf-group"><label>Poziom trudności</label>
                    <select value={info.level} onChange={e => setInfo({...info, level: e.target.value})}>
                      <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                    </select>
                  </div>
                  <div className="bf-group"><label>Czas trwania</label><input type="text" value={info.duration} onChange={e => setInfo({...info, duration: e.target.value})} placeholder="np. 4 hours" /></div>
                </div>
                <div className="bf-group price-group">
                  <label className="checkbox-label"><input type="checkbox" checked={info.is_free} onChange={e => setInfo({...info, is_free: e.target.checked})} /> Kurs bezpłatny</label>
                  {!info.is_free && <input type="number" value={info.price} onChange={e => setInfo({...info, price: parseFloat(e.target.value)})} placeholder="Cena w USD" />}
                </div>
              </div>
              <div className="builder-form-side">
                <div className="course-preview-card">
                  <div className="preview-thumb" style={{background: 'linear-gradient(135deg, #cc0000 0%, #1c1e2a 100%)'}} />
                  <div className="preview-info">
                    <h3>{info.title || 'Tytuł kursu'}</h3>
                    <p>{info.description?.substring(0, 80) || 'Opis kursu...'}</p>
                    <div className="preview-badges">
                      <span>{info.level}</span>
                      <span>{info.duration}</span>
                      <span>{info.is_free ? 'FREE' : `$${info.price}`}</span>
                    </div>
                  </div>
                </div>
                <div className="builder-tips">
                  <h4>💡 Wskazówki</h4>
                  <ul>
                    <li>Dobry tytuł = konkretna obietnica wartości</li>
                    <li>Opis powinien zawierać "czego się nauczysz"</li>
                    <li>Podaj realistyczny czas ukończenia</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Modules & Lessons */}
        {step === 1 && (
          <div className="builder-modules-editor">
            <div className="modules-sidebar">
              <div className="sidebar-header"><h3>Struktura kursu</h3><button className="btn-add-small" onClick={addModule}>+ Moduł</button></div>
              {modules.map((mod, mi) => (
                <div key={mi}>
                  <div className={`module-sidebar-item ${mi === activeModuleIdx ? 'active' : ''}`} onClick={() => { setActiveModuleIdx(mi); setActiveLessonIdx(0); }}>
                    <span className="module-sidebar-num">M{mi + 1}</span>
                    <span className="module-sidebar-title">{mod.title || 'Nowy moduł'}</span>
                    <div className="sidebar-item-actions" onClick={e => e.stopPropagation()}>
                      <button className="btn-reorder" onClick={() => moveModule(mi, -1)} disabled={mi === 0} title="Przesuń w górę">↑</button>
                      <button className="btn-reorder" onClick={() => moveModule(mi, 1)} disabled={mi === modules.length - 1} title="Przesuń w dół">↓</button>
                      <button className="btn-remove-small" onClick={() => removeModule(mi)}>✕</button>
                    </div>
                  </div>
                  {mi === activeModuleIdx && mod.lessons.map((lesson, li) => (
                    <div key={li} className={`lesson-sidebar-item ${li === activeLessonIdx ? 'active' : ''}`} onClick={() => setActiveLessonIdx(li)}>
                      <span className="lesson-type-icon">{lesson.video_url ? '🎬' : '📄'}</span>
                      <span className="lesson-sidebar-name">{lesson.title || `Lekcja ${li + 1}`}</span>
                      <div className="sidebar-item-actions" onClick={e => e.stopPropagation()}>
                        <button className="btn-reorder" onClick={() => moveLesson(mi, li, -1)} disabled={li === 0}>↑</button>
                        <button className="btn-reorder" onClick={() => moveLesson(mi, li, 1)} disabled={li === mod.lessons.length - 1}>↓</button>
                        <button className="btn-remove-small" onClick={() => removeLesson(mi, li)}>✕</button>
                      </div>
                    </div>
                  ))}
                  {mi === activeModuleIdx && (
                    <button className="btn-add-lesson" onClick={() => addLesson(mi)}>+ Dodaj lekcję</button>
                  )}
                </div>
              ))}
            </div>

            <div className="modules-editor-main">
              {/* Module editor */}
              <div className="editor-section">
                <h3>Moduł {activeModuleIdx + 1}</h3>
                <div className="bf-group"><label>Nazwa modułu</label><input type="text" value={currentModule?.title || ''} onChange={e => updateModule(activeModuleIdx, 'title', e.target.value)} placeholder="np. Fundamenty Promptowania" /></div>
                <div className="bf-group"><label>Opis modułu</label><input type="text" value={currentModule?.description || ''} onChange={e => updateModule(activeModuleIdx, 'description', e.target.value)} placeholder="Krótki opis zawartości modułu" /></div>
              </div>

              {/* Lesson editor */}
              {currentLesson && (
                <div className="editor-section lesson-editor">
                  <h3>Lekcja {activeLessonIdx + 1}</h3>
                  <div className="lesson-type-tabs">
                    <button className={`lesson-type-btn ${currentLesson.type !== 'video' ? 'active' : ''}`} onClick={() => updateLesson(activeModuleIdx, activeLessonIdx, 'type', 'text')}>📄 Tekst</button>
                    <button className={`lesson-type-btn ${currentLesson.type === 'video' ? 'active' : ''}`} onClick={() => updateLesson(activeModuleIdx, activeLessonIdx, 'type', 'video')}>🎬 Wideo</button>
                  </div>

                  <div className="bf-group"><label>Tytuł lekcji</label><input type="text" value={currentLesson.title || ''} onChange={e => updateLesson(activeModuleIdx, activeLessonIdx, 'title', e.target.value)} placeholder="np. Czym jest prompt?" /></div>

                  {currentLesson.type === 'video' && (
                    <div className="video-url-section">
                      <div className="bf-group">
                        <label>🎬 URL wideo (YouTube)</label>
                        <input type="text" value={currentLesson.video_url || ''} onChange={e => updateLesson(activeModuleIdx, activeLessonIdx, 'video_url', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
                        {ytId && (
                          <div className="yt-preview">
                            <iframe title="YouTube Preview" src={`https://www.youtube.com/embed/${ytId}`} frameBorder="0" allowFullScreen style={{width:'100%',height:'220px',borderRadius:'8px'}} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="bf-group">
                    <label>Treść lekcji</label>
                    <textarea value={currentLesson.content || ''} onChange={e => updateLesson(activeModuleIdx, activeLessonIdx, 'content', e.target.value)} rows="8" placeholder="Wpisz treść lekcji... Możesz używać HTML dla formatowania." />
                  </div>
                  <div className="bf-group bf-short"><label>Czas trwania (min)</label><input type="number" value={currentLesson.duration || 15} onChange={e => updateLesson(activeModuleIdx, activeLessonIdx, 'duration', e.target.value)} min="1" /></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Slides Builder */}
        {step === 2 && (
          <div className="builder-slides-editor">
            <div className="slides-builder-sidebar">
              <div className="sidebar-header"><h3>Slajdy ({slides.length})</h3><button className="btn-add-small" onClick={addSlide}>+ Slajd</button></div>
              {slides.map((s, i) => (
                <div key={i} className={`slide-sidebar-item ${i === activeSlideIdx ? 'active' : ''}`} onClick={() => setActiveSlideIdx(i)}>
                  <span className="slide-sidebar-num">{i + 1}</span>
                  <span className="slide-sidebar-title">{s.title || 'Nowy slajd'}</span>
                  <div className="sidebar-item-actions" onClick={e => e.stopPropagation()}>
                    <button className="btn-reorder" onClick={() => moveSlide(i, -1)} disabled={i === 0} title="W górę">↑</button>
                    <button className="btn-reorder" onClick={() => moveSlide(i, 1)} disabled={i === slides.length - 1} title="W dół">↓</button>
                    <button className="btn-reorder" onClick={() => duplicateSlide(i)} title="Duplikuj">⧉</button>
                    <button className="btn-remove-small" onClick={() => removeSlide(i)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="slides-editor-main">
              <div className="editor-section">
                <h3>Slajd {activeSlideIdx + 1}</h3>
                <div className="bf-group"><label>Układ slajdu</label>
                  <div className="layout-picker">
                    {['cover','list','two-column','quote','table'].map(layout => (
                      <button key={layout} className={`layout-option ${slides[activeSlideIdx]?.layout === layout ? 'active' : ''}`} onClick={() => updateSlide(activeSlideIdx, 'layout', layout)}>
                        {layout === 'cover' ? '🎯 Okładka' : layout === 'list' ? '📋 Lista' : layout === 'two-column' ? '⬛⬛ Dwie kolumny' : layout === 'quote' ? '💬 Cytat' : '📊 Tabela'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bf-group"><label>Tytuł slajdu</label><input type="text" value={slides[activeSlideIdx]?.title || ''} onChange={e => updateSlide(activeSlideIdx, 'title', e.target.value)} placeholder="Nagłówek slajdu" /></div>
                <div className="bf-group"><label>Treść slajdu <span style={{fontSize:'11px',color:'var(--text-muted)'}}>— obsługuje Markdown: **bold**, *italic*, # H1, - lista, ![img](url)</span></label>
                  <MarkdownToolbar textareaRef={slideTextareaRef} value={slides[activeSlideIdx]?.content || ''} onChange={v => updateSlide(activeSlideIdx, 'content', v)} />
                  <textarea ref={slideTextareaRef} value={slides[activeSlideIdx]?.content || ''} onChange={e => updateSlide(activeSlideIdx, 'content', e.target.value)} rows="12" placeholder="## Nagłówek&#10;**Pogrubienie**, *kursywa*&#10;- punkt 1&#10;- punkt 2&#10;&#10;![opis](https://url-do-obrazka.jpg)" style={{fontFamily:'monospace',fontSize:'13px'}} /></div>
                <div className="bf-group"><label>Notatki prezentera</label><textarea value={slides[activeSlideIdx]?.notes || ''} onChange={e => updateSlide(activeSlideIdx, 'notes', e.target.value)} rows="3" placeholder="Notatki dla prowadzącego (niewidoczne dla uczniów)" /></div>
              </div>
              <div className="slide-preview-box">
                <h4>Podgląd na żywo</h4>
                <div className={`slide-preview slide-layout-${slides[activeSlideIdx]?.layout || 'list'}`}>
                  <div className="sp-layout-badge">{slides[activeSlideIdx]?.layout || 'list'}</div>
                  <h3>{slides[activeSlideIdx]?.title || 'Tytuł slajdu'}</h3>
                  <div className="sp-content" dangerouslySetInnerHTML={{ __html: mdToHtml(slides[activeSlideIdx]?.content || '') }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Handbook Editor */}
        {step === 3 && (
          <div className="builder-handbook-editor">
            <div className="handbook-builder-sidebar">
              <div className="sidebar-header"><h3>Rozdziały ({chapters.length})</h3><button className="btn-add-small" onClick={addChapter}>+ Rozdział</button></div>
              {chapters.map((c, i) => (
                <div key={i} className={`chapter-sidebar-item ${i === activeChapterIdx ? 'active' : ''}`} onClick={() => setActiveChapterIdx(i)}>
                  <span className="chapter-sidebar-num">{i + 1}</span>
                  <span style={{flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.title || 'Nowy rozdział'}</span>
                  <div className="sidebar-item-actions" onClick={e => e.stopPropagation()}>
                    <button className="btn-reorder" onClick={() => moveChapter(i, -1)} disabled={i === 0}>↑</button>
                    <button className="btn-reorder" onClick={() => moveChapter(i, 1)} disabled={i === chapters.length - 1}>↓</button>
                    <button className="btn-remove-small" onClick={() => removeChapter(i)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="handbook-editor-main">
              <div className="editor-section">
                <h3>Rozdział {activeChapterIdx + 1} — Handbook</h3>
                <div className="bf-group"><label>Tytuł rozdziału</label><input type="text" value={chapters[activeChapterIdx]?.title || ''} onChange={e => updateChapter(activeChapterIdx, 'title', e.target.value)} placeholder="np. Fundamenty AI Prompt Engineering" /></div>
                <div className="bf-group">
                  <label>Treść rozdziału <span style={{fontSize:'11px',color:'var(--text-muted)'}}>— Markdown: **bold**, # H1, - lista, ![img](url)</span></label>
                  <MarkdownToolbar textareaRef={chapterTextareaRef} value={chapters[activeChapterIdx]?.content || ''} onChange={v => updateChapter(activeChapterIdx, 'content', v)} />
                  <textarea ref={chapterTextareaRef} value={chapters[activeChapterIdx]?.content || ''} onChange={e => updateChapter(activeChapterIdx, 'content', e.target.value)} rows="22" placeholder={'# Nagłówek\n\n**Pogrubienie**, *kursywa*\n\n## Podrozdział\n\n- punkt 1\n- punkt 2\n\n![opis](https://url-obrazka.jpg)'} style={{fontFamily:'monospace',fontSize:'13px'}} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Quiz Builder */}
        {step === 4 && (
          <div className="builder-quiz-editor">
            <div className="quiz-builder-header">
              <h2>Builder Quizu</h2>
              <p>Dodaj scenariuszowe pytania sprawdzające wiedzę. Dobre pytania = wartościowy certyfikat.</p>
              <button className="button-secondary" onClick={addQuestion}>+ Nowe pytanie</button>
            </div>
            <div className="quiz-questions-list">
              {questions.map((q, qi) => (
                <div key={qi} className="quiz-question-builder">
                  <div className="qb-header">
                    <span className="qb-num">Pytanie {qi + 1}</span>
                    <div className="qb-header-actions">
                      <button className="btn-reorder" onClick={() => moveQuestion(qi, -1)} disabled={qi === 0} title="W górę">↑</button>
                      <button className="btn-reorder" onClick={() => moveQuestion(qi, 1)} disabled={qi === questions.length - 1} title="W dół">↓</button>
                      <button className="btn-remove-small" onClick={() => removeQuestion(qi)}>✕ Usuń</button>
                    </div>
                  </div>
                  <div className="bf-group"><label>Scenariusz (opcjonalnie)</label><textarea value={q.scenario || ''} onChange={e => updateQuestion(qi, 'scenario', e.target.value)} rows="3" placeholder="Opisz sytuację, w jakiej znajdzie się uczestnik..." /></div>
                  <div className="bf-group"><label>Pytanie *</label><input type="text" value={q.question || ''} onChange={e => updateQuestion(qi, 'question', e.target.value)} placeholder="Jakie działanie jest poprawne w tej sytuacji?" /></div>
                  <div className="qb-options">
                    <label>Odpowiedzi (zaznacz poprawną)</label>
                    {q.options.map((opt, oi) => (
                      <div key={oi} className={`qb-option ${q.correct_answer === oi ? 'correct' : ''}`}>
                        <button type="button" className={`correct-marker ${q.correct_answer === oi ? 'active' : ''}`} onClick={() => updateQuestion(qi, 'correct_answer', oi)}>{q.correct_answer === oi ? '✓' : '○'}</button>
                        <input type="text" value={opt} onChange={e => updateOption(qi, oi, e.target.value)} placeholder={`Opcja ${String.fromCharCode(65 + oi)}`} />
                      </div>
                    ))}
                  </div>
                  <div className="bf-group"><label>Wyjaśnienie odpowiedzi</label><textarea value={q.explanation || ''} onChange={e => updateQuestion(qi, 'explanation', e.target.value)} rows="2" placeholder="Dlaczego ta odpowiedź jest poprawna? Co uczestnik powinien zapamiętać?" /></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Preview */}
        {step === 5 && (
          <div className="builder-preview">
            <div className="builder-step-header"><h2>Podgląd kursu</h2><p>Sprawdź jak wygląda Twój kurs przed publikacją.</p></div>
            <div className="preview-summary">
              <div className="preview-card-big">
                <div className="preview-card-top"><h2>{info.title}</h2><p>{info.description}</p></div>
                <div className="preview-meta">
                  <span>📊 {info.level}</span><span>⏱ {info.duration}</span>
                  <span>🗂 {modules.length} modułów</span>
                  <span>📖 {modules.reduce((s,m) => s + (m.lessons?.length||0), 0)} lekcji</span>
                  <span>📊 {slides.filter(s=>s.title).length} slajdów</span>
                  <span>📚 {chapters.filter(c=>c.title).length} rozdziałów handbook</span>
                  <span>❓ {questions.length} pytań quizowych</span>
                </div>
              </div>
              <div className="preview-modules">
                <h3>Struktura kursu:</h3>
                {modules.map((m, mi) => (
                  <div key={mi} className="preview-module-row">
                    <strong>Moduł {mi+1}: {m.title}</strong>
                    <div className="preview-lessons-list">{m.lessons.map((l, li) => <span key={li} className="preview-lesson-chip">{l.video_url ? '🎬' : '📄'} {l.title || `Lekcja ${li+1}`}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="preview-publish-actions">
              <button className="button-secondary btn-large" onClick={() => setStep(0)}>← Edytuj kurs</button>
              <button className="button-secondary btn-large" onClick={() => handleSubmit(true, false)} disabled={saving}>💾 Zapisz szkic</button>
              <button className="button-primary btn-large" onClick={() => handleSubmit(false, true)} disabled={saving}>{saving ? 'Wysyłanie...' : '↑ Wyślij do weryfikacji'}</button>
            </div>
            <div className="builder-step-header" style={{marginTop:'32px'}}>
              <h3>Uwagi dla admina (opcjonalnie)</h3>
              <p>Możesz dodać komentarz — sugestię ceny, pytania, uwagi do kursu.</p>
            </div>
            <div className="bf-group">
              <textarea value={trainerNotes} onChange={e => setTrainerNotes(e.target.value)} rows="4" placeholder="np. Proponowana cena: 199 PLN. Kurs ukończyłem testy na grupie 10 osób..." />
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        {step < 5 && (
          <div className="builder-nav">
            {step > 0 && <button className="button-secondary" onClick={() => setStep(step - 1)}>← Wstecz</button>}
            <button className="button-primary" onClick={() => setStep(step + 1)} disabled={!canGoNext()}>
              Dalej: {STEPS[step + 1]} →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CreateCourse;
