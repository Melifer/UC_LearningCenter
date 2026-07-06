import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function mdToHtml(text) {
  if (!text) return '';
  if (text.trim().startsWith('<')) return text; // already HTML
  return text
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:12px 0"/>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbulipcobda])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '');
}

const SlidesViewer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const fetchSlides = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/courses/${courseId}/slides`);
      const data = await response.json();
      
      if (response.ok && data.slides) {
        setSlides(data.slides);
      }
    } catch (err) {
      console.error('Error fetching slides:', err);
    } finally {
      setLoading(false);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, slides.length]);

  if (loading) {
    return <div className="container"><div className="loading">Loading slides...</div></div>;
  }

  if (slides.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>No slides available</h3>
          <p>This course doesn't have presentation slides yet.</p>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="slides-viewer-container">
      <div className="slides-viewer">
        <div className="slides-topbar">
          <button className="sidebar-back-btn" onClick={() => navigate(`/course/${courseId}`)}>← Wróć do kursu</button>
          <h2>Slajdy prezentacyjne</h2>
        </div>
        <div className="slide-display">
          <div className="slide-number-indicator">
            {currentSlide + 1} / {slides.length}
          </div>
          <div className="slide-title-bar">
            <h2>{slide.title}</h2>
          </div>
          <div
            className="slide-content-html"
            dangerouslySetInnerHTML={{ __html: mdToHtml(slide.content) }}
          />
          {slide.notes && (
            <div className="slide-notes-section">
              <h4>📝 Presenter Notes:</h4>
              <p>{slide.notes}</p>
            </div>
          )}
        </div>

        <div className="slides-navigation">
          <button 
            className="nav-button prev" 
            onClick={prevSlide} 
            disabled={currentSlide === 0}
          >
            ← Previous
          </button>
          
          <div className="slides-thumbnails">
            {slides.map((s, index) => (
              <button
                key={s.id}
                className={`thumbnail-button ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              >
                {s.slide_number}
              </button>
            ))}
          </div>

          <button 
            className="nav-button next" 
            onClick={nextSlide} 
            disabled={currentSlide === slides.length - 1}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlidesViewer;
