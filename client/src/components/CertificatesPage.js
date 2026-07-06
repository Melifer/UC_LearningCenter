import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const CertificatesPage = ({ user }) => {
  const navigate = useNavigate();
  const [certs, setCerts] = useState([]);
  const [totalCPE, setTotalCPE] = useState(0);
  const [yearCPE, setYearCPE] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCerts = useCallback(async () => {
    const res = await fetch(`http://localhost:3002/api/users/${user.id}/certificates`);
    if (res.ok) { const d = await res.json(); setCerts(d.certificates); setTotalCPE(d.totalCPE); setYearCPE(d.yearCPE); }
    setLoading(false);
  }, [user.id]);

  useEffect(() => { fetchCerts(); }, [fetchCerts]);

  if (loading) return <div className="course-loading"><div className="loading-spinner"></div></div>;

  return (
    <div className="container">
      <div className="catalog-header">
        <button className="sidebar-back-btn" onClick={() => navigate('/')}>← Dashboard</button>
        <h1>Certyfikaty</h1>
      </div>

      <div className="cpe-summary">
        <div className="cpe-card">
          <span className="cpe-num">{yearCPE}h</span>
          <span>CPE w {new Date().getFullYear()}</span>
        </div>
        <div className="cpe-card total">
          <span className="cpe-num">{totalCPE}h</span>
          <span>CPE łącznie (wszystkie lata)</span>
        </div>
        <div className="cpe-card">
          <span className="cpe-num">{certs.length}</span>
          <span>Certyfikaty</span>
        </div>
      </div>

      {certs.length === 0 ? (
        <div className="empty-state-small">
          <p>Brak certyfikatów. Ukończ kurs i zalicz quiz aby zdobyć certyfikat.</p>
          <button className="button-primary" onClick={() => navigate('/browse')}>Przeglądaj kursy</button>
        </div>
      ) : (
        <div className="certs-grid">
          {certs.map(cert => (
            <div key={cert.courseId} className="cert-card">
              <div className="cert-card-icon">🎓</div>
              <div className="cert-card-info">
                <h4>{cert.title}</h4>
                <p>Ukończono: {new Date(cert.completed_at).toLocaleDateString('pl-PL', { year:'numeric', month:'long', day:'numeric' })}</p>
                <p className="cert-cpe">{cert.cpeHours} CPE Hours</p>
              </div>
              <div className="cert-card-actions">
                <a href={`http://localhost:3002/api/certificate/${user.id}/${cert.courseId}`} target="_blank" rel="noreferrer" className="button-primary cert-dl-btn">📄 Pobierz PDF</a>
                <button className="button-secondary" onClick={() => navigate(`/course/${cert.courseId}`)}>Kurs →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
