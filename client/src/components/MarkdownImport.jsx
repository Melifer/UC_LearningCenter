import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MarkdownImport = ({ showToast }) => {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown')) {
      setError('Wybierz plik w formacie .md lub .markdown');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/import-markdown', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Error parsowania pliku');
        setLoading(false);
        return;
      }
      showToast && showToast('File imported — review and publish', 'success');
      navigate('/admin/create-course', { state: { importedCourse: data.course } });
    } catch (err) {
      setError('Error sieci: ' + err.message);
    }
    setLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const exampleFormat = `---
title: "Training Title"
description: "Training description"
level: "Intermediate"
duration: "2 hours"
mandatory: true
deadline: "2026-12-31"
refresher_months: 12
passing_score: 100
---

# Module 1: Module Title

## Lesson 1.1: Lesson Title
Lesson content in **markdown**...

---QUIZ---
**Passing Score:** 100

### Q1
**Question:** Question text?
**Options:**
A) Option A
B) Option B
C) Option C
D) Option D
**Correct:** B
**Explanation:** Why this answer is correct...`;

  return (
    <div className="container md-import-page">
      <div className="catalog-header">
        <button className="sidebar-back-btn" onClick={() => navigate('/')}>← Dashboard</button>
        <div>
          <h1>Import course from Markdown</h1>
          <p className="dashboard-subtitle">Upload a .md file with course structure — review and publish</p>
        </div>
      </div>

      <div className="md-import-layout">
        <div className="md-dropzone-section">
          <div
            className={`md-dropzone ${dragging ? 'md-dropzone--dragging' : ''} ${loading ? 'md-dropzone--loading' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => !loading && document.getElementById('md-file-input').click()}
          >
            <input
              id="md-file-input"
              type="file"
              accept=".md,.markdown"
              style={{ display: 'none' }}
              onChange={(e) => handleFile(e.target.files[0])}
            />
            {loading ? (
              <div className="md-dropzone-inner">
                <div className="loading-spinner"></div>
                <p>Parsing file...</p>
              </div>
            ) : (
              <div className="md-dropzone-inner">
                <div className="md-dropzone-icon">📄</div>
                <h3>Drag .md file here</h3>
                <p>or click to select file</p>
                <small>Maksymalny rozmiar: 5 MB</small>
              </div>
            )}
          </div>

          {error && (
            <div className="import-error">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div className="md-import-info">
            <h4>What will be imported:</h4>
            <ul>
              <li>✅ Course metadata (title, description, level, duration)</li>
              <li>✅ Flags: mandatory, deadline, refresher cycle</li>
              <li>✅ Modules and lessons with content</li>
              <li>✅ Quiz with questions and explanations</li>
            </ul>
            <p className="md-import-note">
              After importing, you can review and edit everything before publishing.
            </p>
          </div>
        </div>

        <div className="md-format-section">
          <h3>Markdown File Format</h3>
          <pre className="md-format-code">{exampleFormat}</pre>
          <div className="md-format-notes">
            <h4>Notes:</h4>
            <ul>
              <li><code>mandatory: true/false</code> — mark as mandatory training</li>
              <li><code>deadline: "YYYY-MM-DD"</code> — completion deadline (optional)</li>
              <li><code>refresher_months: 12</code> — renewal cycle in months (0 = none)</li>
              <li><code>passing_score: 100</code> — % correct answers required to pass</li>
              <li>Sections separated by <code>---QUIZ---</code></li>
              <li>Quiz questions numbered as <code>### Q1</code>, <code>### Q2</code>, etc.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownImport;
