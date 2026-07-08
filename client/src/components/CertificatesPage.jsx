import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const CertificatesPage = ({ user }) => {
  const navigate = useNavigate();
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCerts = useCallback(async () => {
    const res = await fetch(`/api/users/${user.id}/certificates`);
    if (res.ok) { const d = await res.json(); setCerts(d.certificates || []); }
    setLoading(false);
  }, [user.id]);

  useEffect(() => { fetchCerts(); }, [fetchCerts]);

  if (loading) return <div className="course-loading"><div className="loading-spinner"></div></div>;

  return (
    <div className="container">
      <div className="catalog-header">
        <button className="sidebar-back-btn" onClick={() => navigate('/')}>← Dashboard</button>
        <div>
          <h1>Your Certificates</h1>
          <p className="session-notice" style={{ marginTop: 6 }}>⚠️ Session progress is cleared on sign-out — download your certificates before logging out.</p>
        </div>
      </div>

      {certs.length === 0 ? (
        <div className="empty-state-small" style={{ marginTop: 40 }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>🎓</p>
          <p>No certificates yet this session.</p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '8px 0 20px' }}>Complete a training and pass the quiz to earn your certificate.</p>
          <button className="button-primary" onClick={() => navigate('/')}>Browse trainings</button>
        </div>
      ) : (
        <div className="certs-grid" style={{ marginTop: 24 }}>
          {certs.map(cert => (
            <div key={cert.courseId} className="cert-card">
              <div className="cert-card-icon">🎓</div>
              <div className="cert-card-info">
                <h4>{cert.title}</h4>
                <p>Completed: {new Date(cert.completed_at).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                {cert.cpeHours > 0 && <p className="cert-cpe">{cert.cpeHours} CPE Hours</p>}
              </div>
              <div className="cert-card-actions">
                <a
                  href={`/api/certificate/${user.id}/${cert.courseId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="button-primary cert-dl-btn"
                >
                  📄 Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;

