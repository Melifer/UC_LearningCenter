import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const HandbookViewer = () => {
  const { courseId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [activeChapter, setActiveChapter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHandbook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const fetchHandbook = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/courses/${courseId}/handbook`);
      const data = await response.json();
      
      if (response.ok && data.chapters) {
        setChapters(data.chapters);
      }
    } catch (err) {
      console.error('Error fetching handbook:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredChapters = chapters.filter(chapter =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="container"><div className="loading">Loading handbook...</div></div>;
  }

  if (chapters.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No handbook available</h3>
          <p>This course doesn't have handbook documentation yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="handbook-viewer-container">
      <div className="handbook-sidebar">
        <div className="handbook-search">
          <input
            type="text"
            placeholder="Search handbook..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <nav className="handbook-toc">
          <h3>Table of Contents</h3>
          {filteredChapters.map((chapter, index) => (
            <button
              key={chapter.id}
              className={`toc-item ${activeChapter === index ? 'active' : ''}`}
              onClick={() => setActiveChapter(index)}
            >
              <span className="toc-number">{chapter.chapter_number}</span>
              <span className="toc-title">{chapter.title}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="handbook-content">
        {filteredChapters.length > 0 ? (
          <>
            <div className="chapter-header">
              <span className="chapter-badge">Chapter {filteredChapters[activeChapter].chapter_number}</span>
              <h1>{filteredChapters[activeChapter].title}</h1>
            </div>
            <div 
              className="chapter-body"
              dangerouslySetInnerHTML={{ __html: filteredChapters[activeChapter].content }}
            />
            <div className="chapter-navigation">
              {activeChapter > 0 && (
                <button 
                  className="chapter-nav-button prev"
                  onClick={() => setActiveChapter(activeChapter - 1)}
                >
                  ← Previous Chapter
                </button>
              )}
              {activeChapter < filteredChapters.length - 1 && (
                <button 
                  className="chapter-nav-button next"
                  onClick={() => setActiveChapter(activeChapter + 1)}
                >
                  Next Chapter →
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="no-results">
            <h3>No results found</h3>
            <p>Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandbookViewer;
