import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import CoursePage from './components/CoursePage';
import LessonView from './components/LessonView';
import QuizPage from './components/QuizPage';
import CreateCourse from './components/CreateCourse';
import MarkdownImport from './components/MarkdownImport';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import ProfilePage from './components/ProfilePage';
import CertificatesPage from './components/CertificatesPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      try {
        const parsed = JSON.parse(loggedInUser);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch {}
    }
  }, []);

  const showToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    // Reset all progress so courses appear fresh on next login
    if (user?.id) {
      fetch(`/api/users/${user.id}/progress`, { method: 'DELETE' }).catch(() => {});
    }
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };
  const handleUserUpdate = (updatedUser) => {
    const merged = { ...user, ...updatedUser };
    localStorage.setItem('user', JSON.stringify(merged));
    setUser(merged);
  };

  return (
    <Router>
      <div>
        <Header user={user} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
            <Route path="/" element={isAuthenticated ? <Dashboard user={user} showToast={showToast} /> : <Navigate to="/login" />} />
            <Route path="/browse" element={isAuthenticated ? <CourseList user={user} /> : <Navigate to="/login" />} />
            <Route path="/course/:courseId" element={isAuthenticated ? <CoursePage user={user} showToast={showToast} /> : <Navigate to="/login" />} />
            <Route path="/course/:courseId/lesson/:lessonId" element={isAuthenticated ? <LessonView user={user} showToast={showToast} /> : <Navigate to="/login" />} />
            <Route path="/course/:courseId/quiz" element={isAuthenticated ? <QuizPage user={user} showToast={showToast} /> : <Navigate to="/login" />} />
            <Route path="/certificates" element={isAuthenticated ? <CertificatesPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/admin/create-course" element={isAuthenticated && user?.role === 'admin' ? <CreateCourse user={user} showToast={showToast} /> : <Navigate to="/" />} />
            <Route path="/admin/edit-course/:courseId" element={isAuthenticated && user?.role === 'admin' ? <CreateCourse user={user} showToast={showToast} editMode={true} /> : <Navigate to="/" />} />
            <Route path="/admin/import-markdown" element={isAuthenticated && user?.role === 'admin' ? <MarkdownImport showToast={showToast} /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </Router>
  );
}

export default App;
