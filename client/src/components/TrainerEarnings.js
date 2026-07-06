import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const TrainerEarnings = ({ user, showToast }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ courses: [], totalGross: 0, totalNet: 0, totalPaidOut: 0, available: 0, globalCommissionPct: 70 });
  const [loading, setLoading] = useState(true);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');

  const fetchData = useCallback(async () => {
    const res = await fetch(`http://localhost:3002/api/trainer/earnings/${user.id}`);
    if (res.ok) setData(await res.json());
    setLoading(false);
  }, [user.id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handlePayoutRequest = async (e) => {
    e.preventDefault();
    const amount = parseFloat(payoutAmount);
    if (!amount || amount > data.available) { showToast && showToast('Nieprawidłowa kwota', 'error'); return; }
    const res = await fetch('http://localhost:3002/api/trainer/payout-request', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trainer_id: user.id, amount }),
    });
    if (res.ok) { showToast && showToast('Wniosek o wypłatę wysłany do admina', 'success'); setShowPayoutModal(false); fetchData(); }
    else showToast && showToast('Błąd', 'error');
  };

  if (loading) return <div className="course-loading"><div className="loading-spinner"></div></div>;

  return (
    <div className="container trainer-earnings">
      <div className="profile-header">
        <button className="sidebar-back-btn" onClick={() => navigate('/')}>← Dashboard</button>
        <h1>Zarobki</h1>
      </div>

      <div className="earnings-summary">
        <div className="earning-card"><span className="earning-val">{data.totalGross.toFixed(2)} PLN</span><span className="earning-label">Przychód brutto</span></div>
        <div className="earning-card highlight"><span className="earning-val">{data.totalNet.toFixed(2)} PLN</span><span className="earning-label">Twój udział</span></div>
        <div className="earning-card"><span className="earning-val">{data.totalPaidOut.toFixed(2)} PLN</span><span className="earning-label">Wypłacono</span></div>
        <div className="earning-card available">
          <span className="earning-val">{data.available.toFixed(2)} PLN</span>
          <span className="earning-label">Do wypłaty</span>
          <button
            className="button-primary"
            style={{marginTop:'12px',fontSize:'13px',padding:'8px 16px',opacity: data.available <= 0 ? 0.4 : 1}}
            disabled={data.available <= 0}
            onClick={() => { setPayoutAmount(data.available.toFixed(2)); setShowPayoutModal(true); }}
          >
            💸 Zlec wypłatę
          </button>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Kursy i sprzedaż</h2>
        {data.courses.length === 0 ? <div className="empty-state-small"><p>Brak danych</p></div> : (
          <table className="admin-table">
            <thead><tr><th>Kurs</th><th>Cena</th><th>Prowizja</th><th>Zapisanych</th><th>Płatnych</th><th>Brutto</th><th>Twój udział</th></tr></thead>
            <tbody>
              {data.courses.map(c => (
                <tr key={c.courseId}>
                  <td><strong>{c.title}</strong></td>
                  <td>{c.price > 0 ? `${c.price} PLN` : <span className="badge-free">FREE</span>}</td>
                  <td>
                    <span style={{fontWeight:700,color:'var(--uc-red)'}}>{c.commission_pct}%</span>
                    {c.uses_global_rate && <span style={{fontSize:'10px',color:'var(--text-muted)',marginLeft:'4px'}}>(globalny)</span>}
                  </td>
                  <td>{c.enrolled_count}</td>
                  <td>{c.paid_count}</td>
                  <td>{c.gross.toFixed(2)} PLN</td>
                  <td style={{color:'var(--uc-red)',fontWeight:700}}>{c.net.toFixed(2)} PLN</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showPayoutModal && (
        <div className="modal-overlay" onClick={() => setShowPayoutModal(false)}>
          <div className="modal-box modal-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>Wniosek o wypłatę</h2><button className="modal-close" onClick={() => setShowPayoutModal(false)}>✕</button></div>
            <form onSubmit={handlePayoutRequest} className="modal-form">
              <div className="bf-group"><label>Kwota (dostępne: {data.available.toFixed(2)} PLN)</label><input type="number" value={payoutAmount} onChange={e => setPayoutAmount(e.target.value)} max={data.available} min="0.01" step="0.01" required /></div>
              <div className="modal-footer">
                <button type="button" className="button-secondary" onClick={() => setShowPayoutModal(false)}>Anuluj</button>
                <button type="submit" className="button-primary">Wyślij wniosek</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerEarnings;
