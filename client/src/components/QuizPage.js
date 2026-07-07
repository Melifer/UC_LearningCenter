import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuizPage = ({ user }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    fetchQuizData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const fetchQuizData = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      const courseData = await response.json();
      if (response.ok && courseData.quiz) {
        setQuiz(courseData.quiz);
        const init = {};
        courseData.quiz.questions.forEach((_, i) => { init[i] = null; });
        setAnswers(init);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (qIdx, aIdx) => setAnswers({ ...answers, [qIdx]: aIdx });

  const handleSubmitQuiz = async () => {
    if (!user) return;
    if (Object.values(answers).some(a => a === null)) {
      // highlight unanswered - just don't submit
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, quizId: quiz.id, answers: Object.values(answers) })
      });
      const data = await res.json();
      if (res.ok) setResult({ ...data, questions: quiz.questions, userAnswers: { ...answers } });
    } catch (err) { console.error(err); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="container"><div className="loading">Loading quiz...</div></div>;
  if (!quiz) return <div className="container"><div className="error-message">Quiz not found.</div></div>;

  if (result) {
    return (
      <div className="quiz-results-page">
        <div className="container">
          <div className="result-hero">
            <div className={`result-badge-icon ${result.passed ? 'passed' : 'failed'}`}>{result.passed ? '🎓' : '📚'}</div>
            <h1>{result.passed ? 'Gratulacje! Zaliczono!' : 'Spróbuj ponownie'}</h1>
            <p className="result-subtitle">{result.message}</p>
            <div className="score-display">
              <div className={`score-circle ${result.passed ? 'pass' : 'fail'}`}>
                <span className="score-number">{result.score}%</span>
                <span className="score-label">Wynik</span>
              </div>
              <div className="score-details">
                <div className="score-stat"><span className="score-stat-val">{result.correctCount}</span><span className="score-stat-label">Poprawnych</span></div>
                <div className="score-stat"><span className="score-stat-val">{result.totalQuestions - result.correctCount}</span><span className="score-stat-label">Błędnych</span></div>
                <div className="score-stat"><span className="score-stat-val">{result.totalQuestions}</span><span className="score-stat-label">Pytań</span></div>
              </div>
            </div>
            <div className="result-actions">
              {result.passed && (
                <button className="button-primary" onClick={() => window.open(`/api/certificate/${user.id}/${courseId}`, '_blank')}>
                  🎓 Pobierz Certyfikat PDF
                </button>
              )}
              <button className="button-secondary" onClick={() => navigate(`/course/${courseId}`)}>← Back to course</button>
              {!result.passed && (
                <button className="button-secondary" onClick={() => { setResult(null); setAnswers({}); setCurrentQuestion(0); }}>🔄 Spróbuj ponownie</button>
              )}
            </div>
          </div>
          <div className="explanations-section">
            <h2>Omówienie odpowiedzi</h2>
            {(result.questions || []).map((question, qIdx) => {
              const options = JSON.parse(question.options);
              const userAns = result.userAnswers[qIdx];
              const correct = question.correct_answer;
              const isCorrect = userAns === correct;
              return (
                <div key={question.id} className={`explanation-card ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="explanation-header">
                    <span className={`explanation-badge ${isCorrect ? 'badge-correct' : 'badge-incorrect'}`}>{isCorrect ? '✓ Poprawna' : '✗ Niepoprawna'}</span>
                    <h3>Pytanie {qIdx + 1}</h3>
                  </div>
                  {question.scenario && <div className="question-scenario-box"><strong>Scenariusz:</strong> {question.scenario}</div>}
                  <p className="explanation-question-text">{question.question}</p>
                  <div className="answer-review">
                    {options.map((opt, oIdx) => {
                      let cls = 'option-review';
                      if (oIdx === correct) cls += ' correct-answer';
                      if (oIdx === userAns && !isCorrect) cls += ' wrong-answer';
                      return <div key={oIdx} className={cls}><span className="option-marker">{oIdx === correct ? '✓' : oIdx === userAns ? '✗' : '○'}</span>{opt}</div>;
                    })}
                  </div>
                  {question.explanation && <div className="explanation-text"><strong>💡 Wyjaśnienie:</strong> {question.explanation}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const questions = quiz.questions;
  const question = questions[currentQuestion];
  const options = JSON.parse(question.options);
  const answeredCount = Object.values(answers).filter(a => a !== null).length;

  return (
    <div className="quiz-page-wrapper">
      <div className="container quiz-page">
        <div className="quiz-header">
          <button className="button-secondary back-button" onClick={() => navigate(`/course/${courseId}`)}>← Back</button>
          <div className="quiz-title-area"><h1>{quiz.title}</h1><p className="quiz-info">{questions.length} pytań • Próg zaliczenia: {quiz.passing_score}%</p></div>
          <div className="quiz-counter">{answeredCount}/{questions.length} odpowiedzi</div>
        </div>
        <div className="quiz-progress-bar"><div className="quiz-progress-fill" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div></div>
        <div className="quiz-question-nav">
          {questions.map((_, i) => (
            <button key={i} className={`q-nav-dot ${i === currentQuestion ? 'active' : ''} ${answers[i] !== null ? 'answered' : ''}`} onClick={() => setCurrentQuestion(i)}>{i + 1}</button>
          ))}
        </div>
        <div className="question-card">
          <div className="question-number-badge">Pytanie {currentQuestion + 1} / {questions.length}</div>
          {question.scenario && <div className="question-scenario"><div className="scenario-label">📋 Scenariusz</div><p>{question.scenario}</p></div>}
          <h2 className="question-text">{question.question}</h2>
          <div className="options-list">
            {options.map((option, oIdx) => (
              <label key={oIdx} className={`option-item ${answers[currentQuestion] === oIdx ? 'selected' : ''}`}>
                <input type="radio" name={`q-${currentQuestion}`} value={oIdx} checked={answers[currentQuestion] === oIdx} onChange={() => handleAnswerChange(currentQuestion, oIdx)} />
                <span className="option-letter">{String.fromCharCode(65 + oIdx)}</span>
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="quiz-navigation">
          <button className="button-secondary" onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0}>← Poprzednie</button>
          {currentQuestion < questions.length - 1
            ? <button className="button-primary" onClick={() => setCurrentQuestion(currentQuestion + 1)}>Następne →</button>
            : <button className="button-primary submit-quiz" onClick={handleSubmitQuiz} disabled={submitting || answeredCount < questions.length}>{submitting ? 'Wysyłanie...' : `Wyślij Quiz (${answeredCount}/${questions.length})`}</button>
          }
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
