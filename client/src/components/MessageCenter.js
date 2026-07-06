import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const MessageCenter = ({ user, showToast }) => {
  const navigate = useNavigate();
  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('inbox');
  const [showCompose, setShowCompose] = useState(false);
  const [compose, setCompose] = useState({ to_user_id: '', subject: '', content: '' });
  const [sending, setSending] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchData = useCallback(async () => {
    const [inboxRes, sentRes, contactsRes] = await Promise.all([
      fetch(`http://localhost:3002/api/messages/${user.id}`),
      fetch(`http://localhost:3002/api/messages/${user.id}/sent`),
      fetch(`http://localhost:3002/api/messaging/contacts/${user.id}`),
    ]);
    if (inboxRes.ok) setInbox((await inboxRes.json()).messages || []);
    if (sentRes.ok) setSent((await sentRes.json()).messages || []);
    if (contactsRes.ok) setContacts((await contactsRes.json()).contacts || []);
  }, [user.id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!compose.content.trim()) return;
    setSending(true);
    const res = await fetch('http://localhost:3002/api/messages', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from_user_id: user.id,
        to_user_id: compose.to_user_id ? parseInt(compose.to_user_id) : null,
        subject: compose.subject,
        content: compose.content
      }),
    });
    if (res.ok) {
      showToast && showToast('Wiadomość wysłana', 'success');
      setShowCompose(false);
      setCompose({ to_user_id: '', subject: '', content: '' });
      setActiveTab('sent');
      fetchData();
    } else showToast && showToast('Błąd wysyłania', 'error');
    setSending(false);
  };

  const markRead = async (msg) => {
    setSelected(msg);
    if (!msg.read && activeTab === 'inbox') {
      await fetch(`http://localhost:3002/api/messages/${msg.id}/read`, { method: 'PUT' });
      fetchData();
    }
  };

  const unreadCount = inbox.filter(m => !m.read).length;
  const messages = activeTab === 'inbox' ? inbox : sent;

  return (
    <div className="container message-center">
      <div className="mc-header">
        <button className="sidebar-back-btn" onClick={() => navigate('/')}>← Dashboard</button>
        <h1>Wiadomości {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}</h1>
        <button className="button-primary" onClick={() => setShowCompose(true)}>✏️ Nowa wiadomość</button>
      </div>

      <div className="dashboard-tabs" style={{marginBottom:'0'}}>
        <button className={`tab-button ${activeTab==='inbox'?'active':''}`} onClick={() => { setActiveTab('inbox'); setSelected(null); }}>
          📥 Odebrane {unreadCount > 0 && <span className="unread-badge" style={{marginLeft:'6px'}}>{unreadCount}</span>}
        </button>
        <button className={`tab-button ${activeTab==='sent'?'active':''}`} onClick={() => { setActiveTab('sent'); setSelected(null); }}>
          📤 Wysłane {sent.length > 0 && <span style={{marginLeft:'4px',fontSize:'11px',color:'var(--text-muted)'}}>({sent.length})</span>}
        </button>
      </div>

      <div className="mc-layout">
        <div className="mc-list">
          {messages.length === 0 ? (
            <div className="mc-empty" style={{flexDirection:'column',gap:'8px'}}>
              <span style={{fontSize:'32px'}}>{activeTab === 'inbox' ? '📥' : '📤'}</span>
              <p>{activeTab === 'inbox' ? 'Skrzynka odbiorcza pusta' : 'Brak wysłanych wiadomości'}</p>
              {activeTab === 'sent' && <button className="button-primary" style={{fontSize:'13px',padding:'8px 16px'}} onClick={() => setShowCompose(true)}>✏️ Napisz wiadomość</button>}
            </div>
          ) : messages.map(msg => {
            const nameField = activeTab === 'inbox' ? msg.from_name : msg.to_name;
            const nameLabel = activeTab === 'inbox' ? 'Od' : 'Do';
            return (
              <div key={msg.id}
                className={`mc-item ${activeTab==='inbox' && !msg.read ? 'unread' : ''} ${selected?.id === msg.id ? 'active' : ''}`}
                onClick={() => markRead(msg)}
              >
                <div className="mc-item-avatar">{(nameField || '?')[0].toUpperCase()}</div>
                <div className="mc-item-body">
                  <div className="mc-item-header">
                    <strong>{nameLabel}: {nameField || 'Broadcast'}</strong>
                    <span className="mc-item-time">{new Date(msg.created_at).toLocaleDateString('pl-PL')}</span>
                  </div>
                  {msg.subject && <div className="mc-item-subject">{msg.subject}</div>}
                  <div className="mc-item-preview">{msg.content?.substring(0, 80)}...</div>
                  {msg.course_title && <div style={{fontSize:'11px',color:'var(--text-muted)',marginTop:'2px'}}>📚 {msg.course_title}</div>}
                </div>
                {activeTab === 'inbox' && !msg.read && <div className="mc-unread-dot"></div>}
              </div>
            );
          })}
        </div>

        <div className="mc-content">
          {selected ? (
            <div className="mc-message-view">
              <div className="mc-message-header">
                <div>
                  <h3>{selected.subject || '(bez tematu)'}</h3>
                  {activeTab === 'inbox'
                    ? <p>Od: <strong>{selected.from_name}</strong> · {new Date(selected.created_at).toLocaleString('pl-PL')}</p>
                    : <p>Do: <strong>{selected.to_name || 'Broadcast (admini)'}</strong> · {new Date(selected.created_at).toLocaleString('pl-PL')}</p>
                  }
                  {selected.course_title && <p>Kurs: {selected.course_title}</p>}
                </div>
                {activeTab === 'inbox' && (
                  <button className="button-secondary" onClick={() => {
                    setCompose({ to_user_id: String(selected.from_user_id || ''), subject: `Re: ${selected.subject || ''}`, content: '' });
                    setShowCompose(true);
                  }}>↩ Odpowiedz</button>
                )}
              </div>
              <div className="mc-message-body">{selected.content}</div>
            </div>
          ) : (
            <div className="mc-empty">
              <p>Wybierz wiadomość aby ją przeczytać</p>
            </div>
          )}
        </div>
      </div>

      {showCompose && (
        <div className="modal-overlay" onClick={() => setShowCompose(false)}>
          <div className="modal-box modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nowa wiadomość</h2>
              <button className="modal-close" onClick={() => setShowCompose(false)}>✕</button>
            </div>
            <form onSubmit={handleSend} className="modal-form">
              <div className="bf-group">
                <label>Do</label>
                <select value={compose.to_user_id} onChange={e => setCompose({...compose, to_user_id: e.target.value})}>
                  <option value="">-- Wszyscy admini (broadcast) --</option>
                  {contacts.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.role})</option>
                  ))}
                </select>
              </div>
              <div className="bf-group">
                <label>Temat (opcjonalnie)</label>
                <input type="text" value={compose.subject} onChange={e => setCompose({...compose, subject: e.target.value})} placeholder="Temat wiadomości" />
              </div>
              <div className="bf-group">
                <label>Treść *</label>
                <textarea value={compose.content} onChange={e => setCompose({...compose, content: e.target.value})} rows="6" required placeholder="Wpisz treść wiadomości..." />
              </div>
              <div className="modal-footer">
                <button type="button" className="button-secondary" onClick={() => setShowCompose(false)}>Anuluj</button>
                <button type="submit" className="button-primary" disabled={sending}>
                  {sending ? 'Wysyłanie...' : '✉️ Wyślij'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageCenter;
