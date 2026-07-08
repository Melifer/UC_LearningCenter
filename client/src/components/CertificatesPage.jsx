import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const CertificatesPage = ({ user }) => {
  const navigate = useNavigate();
  const [certs, setCerts] = useState([]);
  const [totalCPE, setTotalCPE] = useState(0);
  const [yearCPE, setYearCPE] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCerts = useCallback(async () => {
    const res = await fetch(`/api/users/${user.id}/certificates`);
    if (res.ok) { const d = await res.json(); setCerts(d.certificates); setTotalCPE(d.totalCPE); setYearCPE(d.yearCPE); }
    setLoading(false);
  }, [user.id]);

  useEffect(() => { fetchCerts(); }, [fetchCerts]);

  if (loading) return <div className="course-loading"><div className="loading-spinner"></div></div>;

  return (
    <div className="container">
      <div className="catalog-header">
        <button className="sidebar-back-btn" onClick={() => navigate('/')}>← Dashboard</button>
        <h1>Certificates</h1>
      </div>

      <div className="cpe-summary">
        <div className="cpe-card">
          <span className="cpe-num">{yearCPE}h</span>
          <span>CPE in {new Date().getFullYear()}</span>
        </div>
        <div className="cpe-card total">
          <span className="cpe-num">{totalCPE}h</span>
          <span>CPE total (all time)</span>
        </div>
        <div className="cpe-card">
          <span className="cpe-num">{certs.length}</span>
          <span>Certificates</span>
        </div>
      </div>

      {certs.length === 0 ? (
        <div className="empty-state-small">
          <p>No certificates yet. Complete a course and pass the quiz to earn your certificate.</p>
          <button className="button-primary" onClick={() => navigate('/browse')}>Browse courses</button>
        </div>
      ) : (
        <div className="certs-grid">
          {certs.map(cert => (
            <div key={cert.courseId} className="cert-card">
              <div className="cert-card-icon">🎓</div>
              <div className="cert-card-info">
                <h4>{cert.title}</h4>
                <p>Completed: {new Date(cert.completed_at).toLocaleDateString('en-GB', { year:'numeric', month:'long', day:'numeric' })}</p>
                <p className="cert-cpe">{cert.cpeHours} CPE Hours</p>
              </div>
              <div className="cert-card-actions">
                <a href={`/api/certificate/${user.id}/${cert.courseId}`} target="_blank" rel="noreferrer" className="button-primary cert-dl-btn">📄 Download PDF</a>
                <button className="button-secondary" onClick={() => navigate(`/course/${cert.courseId}`)}>Course →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
