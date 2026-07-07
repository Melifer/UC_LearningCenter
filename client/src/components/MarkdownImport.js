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
      const res = await fetch('http://localhost:3002/api/admin/import-markdown', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Błąd parsowania pliku');
        setLoading(false);
        return;
      }
      showToast && showToast('Plik wczytany — sprawdź i opublikuj kurs', 'success');
      navigate('/admin/create-course', { state: { importedCourse: data.course } });
    } catch (err) {
      setError('Błąd sieci: ' + err.message);
    }
    setLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const exampleFormat = `---
title: "Tytuł szkolenia"
description: "Opis szkolenia"
level: "Intermediate"
duration: "2 hours"
mandatory: true
deadline: "2026-12-31"
refresher_months: 12
passing_score: 100
---

# Module 1: Tytuł modułu

## Lesson 1.1: Tytuł lekcji
Treść lekcji w **markdown**...

---SLIDES---

## Slide 1
**Title:** Tytuł slajdu
**Content:**
Treść slajdu...

---HANDBOOK---

## Chapter 1: Tytuł rozdziału
Treść rozdziału...

---QUIZ---
**Passing Score:** 100

### Q1
**Question:** Treść pytania?
**Options:**
A) Opcja A
B) Opcja B
C) Opcja C
D) Opcja D
**Correct:** B
**Explanation:** Wyjaśnienie odpowiedzi...`;

  return (
    <div className="container md-import-page">
      <div className="catalog-header">
        <button className="sidebar-back-btn" onClick={() => navigate('/')}>← Dashboard</button>
        <div>
          <h1>Import kursu z Markdown</h1>
          <p className="dashboard-subtitle">Wczytaj plik .md ze strukturą kursu — sprawdź i opublikuj</p>
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
                <p>Parsowanie pliku...</p>
              </div>
            ) : (
              <div className="md-dropzone-inner">
                <div className="md-dropzone-icon">📄</div>
                <h3>Przeciągnij plik .md tutaj</h3>
                <p>lub kliknij aby wybrać plik</p>
                <small>Maksymalny rozmiar: 5 MB</small>
              </div>
            )}
          </div>

          {error && (
            <div className="import-error">
              <strong>Błąd:</strong> {error}
            </div>
          )}

          <div className="md-import-info">
            <h4>Co zostanie zaimportowane:</h4>
            <ul>
              <li>✅ Metadane kursu (tytuł, opis, poziom, czas trwania)</li>
              <li>✅ Oznaczenia: obowiązkowy, termin, refresher</li>
              <li>✅ Moduły i lekcje z treścią</li>
              <li>✅ Slajdy szkoleniowe</li>
              <li>✅ Handbook (podręcznik)</li>
              <li>✅ Quiz z pytaniami i wyjaśnieniami</li>
            </ul>
            <p className="md-import-note">
              Po wczytaniu pliku możesz przejrzeć i edytować całość przed publikacją.
            </p>
          </div>
        </div>

        <div className="md-format-section">
          <h3>Format pliku Markdown</h3>
          <pre className="md-format-code">{exampleFormat}</pre>
          <div className="md-format-notes">
            <h4>Uwagi:</h4>
            <ul>
              <li><code>mandatory: true/false</code> — szkolenie obowiązkowe</li>
              <li><code>deadline: "YYYY-MM-DD"</code> — termin wykonania (opcjonalne)</li>
              <li><code>refresher_months: 12</code> — odnawialność co N miesięcy (0 = brak)</li>
              <li><code>passing_score: 100</code> — % poprawnych odpowiedzi wymagany do zaliczenia</li>
              <li>Sekcje oddzielane <code>---SLIDES---</code>, <code>---HANDBOOK---</code>, <code>---QUIZ---</code></li>
              <li>Pytania quizu numerowane jako <code>### Q1</code>, <code>### Q2</code>, itd.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownImport;
