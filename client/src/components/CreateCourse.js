import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const STEPS = ['Basics', 'Modules & Lessons', 'Quiz', 'Preview'];

function getYoutubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return m ? m[1] : null;
}

function mdToHtml(text) {
  if (!text) return '';
  return text
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbulipcobda])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '');
}

const defaultLesson   = () => ({ title: '', content: '', video_url: '', duration: 15, type: 'text' });
const defaultModule   = () => ({ title: '', description: '', lessons: [defaultLesson()] });
const defaultQuestion = () => ({ question: '', scenario: '', options: ['', '', '', ''], correct_answer: 0, explanation: '' });

const CreateCourse = ({ user, showToast, editMode = false }) => {
  const navigate  = useNavigate();
  const { courseId } = useParams();
  const location  = useLocation();
  const [step, setStep]     = useState(0);
  const [saving, setSaving] = useState(false);

  const [info, setInfo] = useState({
    title: '', description: '', level: 'Intermediate', duration: '2 hours',
    thumbnail: '', mandatory: false, deadline: '', refresher_months: 0
  });
  const [modules,   setModules]   = useState([defaultModule()]);
  const [questions, setQuestions] = useState([defaultQuestion()]);
  const [activeModuleIdx,  setActiveModuleIdx]  = useState(0);
  const [activeLessonIdx,  setActiveLessonIdx]  = useState(0);

  // ---- Load existing course for edit mode ----
  const loadCourse = useCallback(async () => {
    if (!editMode || !courseId) return;
    try {
      const res  = await fetch(`http://localhost:3002/api/courses/${courseId}`);
      const data = await res.json();
      if (!res.ok || !data) return;

      setInfo({
        title:            data.title             || '',
        description:      data.description       || '',
        level:            data.level             || 'Intermediate',
        duration:         data.duration          || '2 hours',
        thumbnail:        data.thumbnail         || '',
        mandatory:        !!data.mandatory,
        deadline:         data.deadline          || '',
        refresher_months: data.refresher_months  || 0,
      });

      if (data.modules?.length) {
        setModules(data.modules.map(m => ({
          ...m,
          lessons: m.lessons?.length
            ? m.lessons.map(l => ({ ...l, type: l.video_url ? 'video' : 'text' }))
            : [defaultLesson()]
        })));
      }

      if (data.quiz?.questions?.length) {
        setQuestions(data.quiz.questions.map(q => {
          let opts = q.options;
          if (typeof opts === 'string') { try { opts = JSON.parse(opts); } catch { opts = ['','','','']; } }
          return { question: q.question || '', scenario: q.scenario || '', options: Array.isArray(opts) ? opts : ['','','',''], correct_answer: q.correct_answer ?? 0, explanation: q.explanation || '' };
        }));
      }
    } catch (err) { console.error('Error loading course:', err); }
  }, [editMode, courseId]);

  useEffect(() => { loadCourse(); }, [loadCourse]);

  // ---- Pre-fill from markdown import ----
  useEffect(() => {
    const imported = location.state?.importedCourse;
    if (!imported || editMode) return;
    const { info: iInfo, modules: iModules, quiz: iQuiz } = imported;
    if (iInfo) setInfo({ title: iInfo.title||'', description: iInfo.description||'', level: iInfo.level||'Intermediate', duration: iInfo.duration||'2 hours', thumbnail:'', mandatory:!!iInfo.mandatory, deadline:iInfo.deadline||'', refresher_months:iInfo.refresher_months||0 });
    if (iModules?.length) setModules(iModules.map(m => ({ title:m.title, description:m.description||'', lessons:(m.lessons||[]).map(l => ({ title:l.title, content:l.content||'', video_url:'', duration:l.duration||15, type:'text' })) })));
    if (iQuiz?.questions?.length) {
      setQuestions(iQuiz.questions.map(q => {
        let opts = q.options;
        if (typeof opts === 'string') { try { opts = JSON.parse(opts); } catch { opts = ['','','','']; } }
        return { question:q.question||'', scenario:q.scenario||'', options:opts||['','','',''], correct_answer:q.correct_answer||0, explanation:q.explanation||'' };
      }));
    }
  }, [location.state, editMode]);

  // ---- Module helpers ----
  const addModule    = () => { setModules([...modules, defaultModule()]); setActiveModuleIdx(modules.length); setActiveLessonIdx(0); };
  const removeModule = (i) => { if (modules.length === 1) return; const m=[...modules]; m.splice(i,1); setModules(m); setActiveModuleIdx(Math.max(0,i-1)); };
  const updateModule = (i, f, v) => { const m=[...modules]; m[i]={...m[i],[f]:v}; setModules(m); };
  const moveModule   = (i, d) => { const m=[...modules],j=i+d; if(j<0||j>=m.length)return; [m[i],m[j]]=[m[j],m[i]]; setModules(m); setActiveModuleIdx(j); };
  const addLesson    = (mi) => { const m=[...modules]; m[mi].lessons.push(defaultLesson()); setModules(m); setActiveLessonIdx(m[mi].lessons.length-1); };
  const removeLesson = (mi,li) => { const m=[...modules]; if(m[mi].lessons.length===1)return; m[mi].lessons.splice(li,1); setModules(m); setActiveLessonIdx(Math.max(0,li-1)); };
  const updateLesson = (mi,li,f,v) => { const m=[...modules]; m[mi].lessons[li]={...m[mi].lessons[li],[f]:v}; setModules(m); };
  const moveLesson   = (mi,li,d) => { const m=[...modules],ls=[...m[mi].lessons],j=li+d; if(j<0||j>=ls.length)return; [ls[li],ls[j]]=[ls[j],ls[li]]; m[mi]={...m[mi],lessons:ls}; setModules(m); setActiveLessonIdx(j); };

  // ---- Quiz helpers ----
  const addQuestion    = () => setQuestions([...questions, defaultQuestion()]);
  const removeQuestion = (i) => { if(questions.length===1)return; const q=[...questions]; q.splice(i,1); setQuestions(q); };
  const updateQuestion = (i,f,v) => { const q=[...questions]; q[i]={...q[i],[f]:v}; setQuestions(q); };
  const updateOption   = (qi,oi,v) => { const q=[...questions]; q[qi].options[oi]=v; setQuestions(q); };
  const moveQuestion   = (i,d) => { const q=[...questions],j=i+d; if(j<0||j>=q.length)return; [q[i],q[j]]=[q[j],q[i]]; setQuestions(q); };

  const handleSubmit = async (isDraft = false) => {
    if (!info.title || !info.description) { showToast && showToast('Please enter a title and description', 'error'); return; }
    setSaving(true);
    const payload = {
      title: info.title, description: info.description, level: info.level, duration: info.duration,
      thumbnail: info.thumbnail, trainer_id: user?.id,
      mandatory: info.mandatory ? 1 : 0,
      deadline: info.deadline || null,
      refresher_months: parseInt(info.refresher_months) || 0,
      status: isDraft ? 'draft' : 'published',
      modules: modules.map(m => ({ title:m.title, description:m.description, lessons:m.lessons.map(l => ({ title:l.title, content:l.content, video_url:l.video_url||null, duration:parseInt(l.duration)||15 })) })),
      quiz: { title:`${info.title} — Quiz`, passing_score:100, questions:questions.map(q => ({ question:q.question, scenario:q.scenario, options:q.options, correct_answer:parseInt(q.correct_answer), explanation:q.explanation })) },
      slides: [], handbook: [],
    };
    try {
      const url = editMode ? `http://localhost:3002/api/admin/update-course/${courseId}` : 'http://localhost:3002/api/admin/create-course';
      const res = await fetch(url, { method: editMode?'PUT':'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
      const data = await res.json();
      if (res.ok) {
        showToast && showToast(isDraft ? 'Saved as draft' : editMode ? 'Training updated ✓' : 'Training published ✓', isDraft?'info':'success');
        navigate('/');
      } else {
        showToast && showToast(data.error || 'Save failed', 'error');
      }
    } catch { showToast && showToast('Connection error', 'error'); }
    setSaving(false);
  };

  const canGoNext = () => step === 0 ? (info.title && info.description) : true;

  const currentModule = modules[activeModuleIdx] || modules[0];
  const currentLesson = currentModule?.lessons?.[activeLessonIdx] || currentModule?.lessons?.[0];
  const ytId = getYoutubeId(currentLesson?.video_url || '');

  return (
    <div className="course-builder">
      {/* Top bar */}
      <div className="builder-topbar">
        <button className="builder-back" onClick={() => navigate('/')}>← Back</button>
        <div className="builder-steps">
          {STEPS.map((s, i) => (
            <button key={i} className={`builder-step-dot ${i===step?'active':''} ${i<step?'done':''}`} onClick={() => i<step && setStep(i)}>
              <span className="step-num">{i<step?'✓':i+1}</span>
              <span className="step-label">{s}</span>
            </button>
          ))}
        </div>
        <div className="builder-topbar-actions">
          <button className="button-secondary" onClick={() => navigate('/')}>Cancel</button>
          <button className="button-secondary" onClick={() => handleSubmit(true)} disabled={saving}>💾 Save draft</button>
          <button className="button-primary" onClick={() => handleSubmit(false)} disabled={saving}>{saving?'Saving...':editMode?'✓ Update':'✓ Publish'}</button>
        </div>
      </div>

      <div className="builder-body">

        {/* STEP 0: Course Basics */}
        {step === 0 && (
          <div className="builder-step-content">
            <div className="builder-step-header">
              <h2>Training basics</h2>
              <p>Enter the key information about this training.</p>
            </div>
            <div className="builder-form-grid">
              <div className="builder-form-main">
                <div className="bf-group">
                  <label>Training title *</label>
                  <input type="text" value={info.title} onChange={e => setInfo({...info,title:e.target.value})} placeholder="e.g. EBA ICT & Security Risk Management Guidelines" />
                </div>
                <div className="bf-group">
                  <label>Description *</label>
                  <textarea value={info.description} onChange={e => setInfo({...info,description:e.target.value})} rows="4" placeholder="Describe the scope, regulatory requirements, and target audience..." />
                </div>
                <div className="bf-grid-2">
                  <div className="bf-group">
                    <label>Difficulty level</label>
                    <select value={info.level} onChange={e => setInfo({...info,level:e.target.value})}>
                      <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                    </select>
                  </div>
                  <div className="bf-group">
                    <label>Duration</label>
                    <input type="text" value={info.duration} onChange={e => setInfo({...info,duration:e.target.value})} placeholder="e.g. 3 hours" />
                  </div>
                </div>
                <div className="bf-grid-2">
                  <div className="bf-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={info.mandatory} onChange={e => setInfo({...info,mandatory:e.target.checked})} />
                      <span>Mandatory training</span>
                    </label>
                  </div>
                  <div className="bf-group">
                    <label>Refresher every (months, 0 = none)</label>
                    <input type="number" min="0" value={info.refresher_months} onChange={e => setInfo({...info,refresher_months:parseInt(e.target.value)||0})} placeholder="e.g. 12" />
                  </div>
                </div>
                <div className="bf-group">
                  <label>Completion deadline (optional)</label>
                  <input type="date" value={info.deadline||''} onChange={e => setInfo({...info,deadline:e.target.value})} />
                </div>
              </div>
              <div className="builder-form-side">
                <div className="course-preview-card">
                  <div className="preview-thumb" style={{background:'linear-gradient(135deg,#da291c 0%,#003B6E 100%)'}} />
                  <div className="preview-info">
                    <h3>{info.title||'Training title'}</h3>
                    <p>{info.description?.substring(0,80)||'Description...'}</p>
                    <div className="preview-badges">
                      <span>{info.level}</span>
                      <span>{info.duration}</span>
                      {info.mandatory && <span style={{color:'#da291c',fontWeight:700}}>MANDATORY</span>}
                      {info.refresher_months > 0 && <span>♻️ {info.refresher_months}mo</span>}
                    </div>
                  </div>
                </div>
                <div className="builder-tips">
                  <h4>💡 Tips</h4>
                  <ul>
                    <li>Mark as mandatory for regulatory compliance requirements</li>
                    <li>Refresher = automatic renewal notification after N months</li>
                    <li>Deadline = visible due date for all employees</li>
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
              <div className="sidebar-header">
                <h3>Course structure</h3>
                <button className="btn-add-small" onClick={addModule}>+ Module</button>
              </div>
              {modules.map((mod, mi) => (
                <div key={mi}>
                  <div className={`module-sidebar-item ${mi===activeModuleIdx?'active':''}`} onClick={() => { setActiveModuleIdx(mi); setActiveLessonIdx(0); }}>
                    <span className="module-sidebar-num">M{mi+1}</span>
                    <span className="module-sidebar-title">{mod.title||'New module'}</span>
                    <div className="sidebar-item-actions" onClick={e=>e.stopPropagation()}>
                      <button className="btn-reorder" onClick={()=>moveModule(mi,-1)} disabled={mi===0}>↑</button>
                      <button className="btn-reorder" onClick={()=>moveModule(mi,1)} disabled={mi===modules.length-1}>↓</button>
                      <button className="btn-remove-small" onClick={()=>removeModule(mi)}>✕</button>
                    </div>
                  </div>
                  {mi===activeModuleIdx && mod.lessons.map((lesson,li)=>(
                    <div key={li} className={`lesson-sidebar-item ${li===activeLessonIdx?'active':''}`} onClick={()=>setActiveLessonIdx(li)}>
                      <span className="lesson-type-icon">{lesson.video_url?'🎬':'📄'}</span>
                      <span className="lesson-sidebar-name">{lesson.title||`Lesson ${li+1}`}</span>
                      <div className="sidebar-item-actions" onClick={e=>e.stopPropagation()}>
                        <button className="btn-reorder" onClick={()=>moveLesson(mi,li,-1)} disabled={li===0}>↑</button>
                        <button className="btn-reorder" onClick={()=>moveLesson(mi,li,1)} disabled={li===mod.lessons.length-1}>↓</button>
                        <button className="btn-remove-small" onClick={()=>removeLesson(mi,li)}>✕</button>
                      </div>
                    </div>
                  ))}
                  {mi===activeModuleIdx && (
                    <button className="btn-add-lesson" onClick={()=>addLesson(mi)}>+ Add lesson</button>
                  )}
                </div>
              ))}
            </div>

            <div className="modules-editor-main">
              <div className="editor-section">
                <h3>Module {activeModuleIdx+1}</h3>
                <div className="bf-group">
                  <label>Module name</label>
                  <input type="text" value={currentModule?.title||''} onChange={e=>updateModule(activeModuleIdx,'title',e.target.value)} placeholder="e.g. Introduction to ICT Risk Management" />
                </div>
                <div className="bf-group">
                  <label>Module description</label>
                  <input type="text" value={currentModule?.description||''} onChange={e=>updateModule(activeModuleIdx,'description',e.target.value)} placeholder="Brief description of module content" />
                </div>
              </div>

              {currentLesson && (
                <div className="editor-section lesson-editor">
                  <h3>Lesson {activeLessonIdx+1}</h3>
                  <div className="lesson-type-tabs">
                    <button className={`lesson-type-btn ${currentLesson.type!=='video'?'active':''}`} onClick={()=>updateLesson(activeModuleIdx,activeLessonIdx,'type','text')}>📄 Text</button>
                    <button className={`lesson-type-btn ${currentLesson.type==='video'?'active':''}`} onClick={()=>updateLesson(activeModuleIdx,activeLessonIdx,'type','video')}>🎬 Video</button>
                  </div>
                  <div className="bf-group">
                    <label>Lesson title</label>
                    <input type="text" value={currentLesson.title||''} onChange={e=>updateLesson(activeModuleIdx,activeLessonIdx,'title',e.target.value)} placeholder="e.g. Why ICT Risk Management Matters" />
                  </div>
                  {currentLesson.type==='video' && (
                    <div className="bf-group">
                      <label>🎬 Video URL (YouTube)</label>
                      <input type="text" value={currentLesson.video_url||''} onChange={e=>updateLesson(activeModuleIdx,activeLessonIdx,'video_url',e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
                      {ytId && <div className="yt-preview"><iframe title="Preview" src={`https://www.youtube.com/embed/${ytId}`} frameBorder="0" allowFullScreen style={{width:'100%',height:'220px',borderRadius:'8px'}} /></div>}
                    </div>
                  )}
                  <div className="bf-group">
                    <label>Lesson content <span style={{fontSize:'11px',color:'var(--text-muted)'}}>— supports Markdown: **bold**, *italic*, # Heading, - list</span></label>
                    <textarea value={currentLesson.content||''} onChange={e=>updateLesson(activeModuleIdx,activeLessonIdx,'content',e.target.value)} rows="12" placeholder="Write lesson content in Markdown format..." style={{fontFamily:'monospace',fontSize:'13px'}} />
                  </div>
                  <div className="bf-group bf-short">
                    <label>Duration (minutes)</label>
                    <input type="number" value={currentLesson.duration||15} onChange={e=>updateLesson(activeModuleIdx,activeLessonIdx,'duration',e.target.value)} min="1" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Quiz */}
        {step === 2 && (
          <div className="builder-quiz-editor">
            <div className="quiz-builder-header">
              <h2>Quiz builder</h2>
              <p>Add knowledge-check questions. Passing score: 100% (all questions must be answered correctly).</p>
              <button className="button-secondary" onClick={addQuestion}>+ Add question</button>
            </div>
            <div className="quiz-questions-list">
              {questions.map((q,qi) => (
                <div key={qi} className="quiz-question-builder">
                  <div className="qb-header">
                    <span className="qb-num">Question {qi+1}</span>
                    <div className="qb-header-actions">
                      <button className="btn-reorder" onClick={()=>moveQuestion(qi,-1)} disabled={qi===0}>↑</button>
                      <button className="btn-reorder" onClick={()=>moveQuestion(qi,1)} disabled={qi===questions.length-1}>↓</button>
                      <button className="btn-remove-small" onClick={()=>removeQuestion(qi)}>✕ Remove</button>
                    </div>
                  </div>
                  <div className="bf-group">
                    <label>Scenario (optional)</label>
                    <textarea value={q.scenario||''} onChange={e=>updateQuestion(qi,'scenario',e.target.value)} rows="2" placeholder="Describe the situation the participant finds themselves in..." />
                  </div>
                  <div className="bf-group">
                    <label>Question *</label>
                    <input type="text" value={q.question||''} onChange={e=>updateQuestion(qi,'question',e.target.value)} placeholder="What is the correct action in this situation?" />
                  </div>
                  <div className="qb-options">
                    <label>Answer options (click ○ to mark correct)</label>
                    {q.options.map((opt,oi) => (
                      <div key={oi} className={`qb-option ${q.correct_answer===oi?'correct':''}`}>
                        <button type="button" className={`correct-marker ${q.correct_answer===oi?'active':''}`} onClick={()=>updateQuestion(qi,'correct_answer',oi)}>{q.correct_answer===oi?'✓':'○'}</button>
                        <input type="text" value={opt} onChange={e=>updateOption(qi,oi,e.target.value)} placeholder={`Option ${String.fromCharCode(65+oi)}`} />
                      </div>
                    ))}
                  </div>
                  <div className="bf-group">
                    <label>Explanation</label>
                    <textarea value={q.explanation||''} onChange={e=>updateQuestion(qi,'explanation',e.target.value)} rows="2" placeholder="Why is this the correct answer? What should the participant remember?" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Preview */}
        {step === 3 && (
          <div className="builder-preview">
            <div className="builder-step-header">
              <h2>Preview</h2>
              <p>Review your training before publishing.</p>
            </div>
            <div className="preview-summary">
              <div className="preview-card-big">
                <div className="preview-card-top">
                  <h2>{info.title}</h2>
                  <p>{info.description}</p>
                  {info.mandatory && <span className="badge-mandatory">MANDATORY</span>}
                </div>
                <div className="preview-meta">
                  <span>📊 {info.level}</span>
                  <span>⏱ {info.duration}</span>
                  <span>🗂 {modules.length} modules</span>
                  <span>📖 {modules.reduce((s,m)=>s+(m.lessons?.length||0),0)} lessons</span>
                  <span>❓ {questions.length} quiz questions</span>
                  {info.refresher_months>0 && <span>♻️ Refresher every {info.refresher_months}mo</span>}
                  {info.deadline && <span>⏰ Due: {new Date(info.deadline).toLocaleDateString('en-GB')}</span>}
                </div>
              </div>
              <div className="preview-modules">
                <h3>Course structure:</h3>
                {modules.map((m,mi) => (
                  <div key={mi} className="preview-module-row">
                    <strong>Module {mi+1}: {m.title}</strong>
                    <div className="preview-lessons-list">
                      {m.lessons.map((l,li) => <span key={li} className="preview-lesson-chip">{l.video_url?'🎬':'📄'} {l.title||`Lesson ${li+1}`}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="preview-publish-actions">
              <button className="button-secondary btn-large" onClick={()=>setStep(0)}>← Edit</button>
              <button className="button-secondary btn-large" onClick={()=>handleSubmit(true)} disabled={saving}>💾 Save draft</button>
              <button className="button-primary btn-large" onClick={()=>handleSubmit(false)} disabled={saving}>{saving?'Publishing...':editMode?'✓ Update':'✓ Publish training'}</button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step < 3 && (
          <div className="builder-nav">
            {step > 0 && <button className="button-secondary" onClick={()=>setStep(step-1)}>← Back</button>}
            <button className="button-primary" onClick={()=>setStep(step+1)} disabled={!canGoNext()}>
              Next: {STEPS[step+1]} →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CreateCourse;
