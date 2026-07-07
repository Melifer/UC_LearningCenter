import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    return '<table class="slide-table"><tbody>' + rows.join('') + '</tbody></table>';
  });
  return text
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbulipcobdatse])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '');
}

const SlidesViewer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const slideAreaRef = useRef(null);
  const activeThumbnailRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:3002/api/courses/${courseId}/slides`)
      .then(r => r.ok ? r.json() : { slides: [] })
      .then(d => setSlides(d.slides || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [courseId]);

  const goToSlide = (index, e) => {
    if (e) { e.preventDefault(); e.currentTarget.blur(); }
    setCurrentSlide(index);
    // Scroll slide display to top, not the page
    if (slideAreaRef.current) {
      slideAreaRef.current.scrollTop = 0;
    }
  };

  const nextSlide = () => goToSlide(Math.min(currentSlide + 1, slides.length - 1));
  const prevSlide = () => goToSlide(Math.max(currentSlide - 1, 0));

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, slides.length]);

  // Scroll active thumbnail into view without moving the page
  useEffect(() => {
    if (activeThumbnailRef.current) {
      activeThumbnailRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [currentSlide]);

  if (loading) return <div className="slides-viewer-container"><div className="loading-spinner" style={{margin:'40px auto'}}></div></div>;

  if (slides.length === 0) return (
    <div className="container" style={{padding:'48px 24px',textAlign:'center'}}>
      <div style={{fontSize:'48px',marginBottom:'16px'}}>📊</div>
      <h3>Brak slajdów</h3>
      <button className="button-secondary" onClick={() => navigate(`/course/${courseId}`)}>← Wróć do kursu</button>
    </div>
  );

  const slide = slides[currentSlide];

  return (
    <div className="slides-viewer-container">
      <div className="slides-topbar">
        <button className="sidebar-back-btn" onClick={() => navigate(`/course/${courseId}`)}>← Wróć do kursu</button>
        <span className="slides-title">Slajdy szkoleniowe</span>
        <span className="slides-counter">{currentSlide + 1} / {slides.length}</span>
      </div>

      <div className="slides-layout">
        {/* Thumbnail sidebar */}
        <div className="slides-sidebar">
          {slides.map((s, i) => (
            <button
              key={s.id || i}
              ref={i === currentSlide ? activeThumbnailRef : null}
              className={`slide-thumb ${i === currentSlide ? 'active' : ''}`}
              onClick={(e) => goToSlide(i, e)}
            >
              <span className="slide-thumb-num">{i + 1}</span>
              <span className="slide-thumb-title">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Main slide area */}
        <div className="slide-main" ref={slideAreaRef}>
          <div className={`slide-card ${slide.layout === 'cover' ? 'slide-card--cover' : ''}`}>
            <div className="slide-header">
              <h2 className="slide-title">{slide.title}</h2>
              {slide.layout !== 'cover' && (
                <span className="slide-num-badge">{currentSlide + 1}/{slides.length}</span>
              )}
            </div>
            <div
              className="slide-content"
              dangerouslySetInnerHTML={{ __html: mdToHtml(slide.content) }}
            />
            {slide.notes && (
              <div className="slide-notes">
                <span className="slide-notes-label">📝 Notatki</span>
                <p>{slide.notes}</p>
              </div>
            )}
          </div>

          <div className="slides-nav-buttons">
            <button
              className="slide-nav-btn"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >← Poprzedni</button>
            <div className="slides-progress-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`slide-dot ${i === currentSlide ? 'active' : ''}`}
                  onClick={(e) => goToSlide(i, e)}
                  aria-label={`Slajd ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="slide-nav-btn"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
            >Następny →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidesViewer;
