# setupconcierge

Source: setupconcierge.docx

import { useState, useEffect, useRef, useCallback } from 'react';

import { base44 } from '@/api/base44Client';

import { Send, Sparkles, Loader, RefreshCw, ArrowLeft, Zap } from 'lucide-react';

import IntegrationCard from '@/components/concierge/IntegrationCard';

import MessageBubble from '@/components/concierge/MessageBubble';

import AutomationToggles from '@/components/concierge/AutomationToggles';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';


export default function SetupConcierge() {

  const [email, setEmail] = useState('');

  const [emailInput, setEmailInput] = useState('');

  const [conversation, setConversation] = useState(null);

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState('');

  const [sending, setSending] = useState(false);

  const [status, setStatus] = useState(null);

  const [statusLoading, setStatusLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const unsubRef = useRef(null);

  const loadStatus = useCallback(async (userEmail) => {

    setStatusLoading(true);

    try {

      const res = await base44.functions.invoke('getIntegrationStatus', { user_email: userEmail });

      const data = res.data || res;

      if (data.ok) setStatus(data);

    } catch (e) {

      console.error('loadStatus failed:', e);

    }

    setStatusLoading(false);

  }, []);

  const initConversation = useCallback(async (userEmail) => {

    try {

      const conv = await base44.agents.createConversation({

        agent_name: 'setup_concierge',

        metadata: {

          name: `Setup Session — ${userEmail}`,

          description: 'Setup Concierge guided integration setup',

          user_email: userEmail,

        },

      });

      setConversation(conv);

      if (unsubRef.current) unsubRef.current();

      unsubRef.current = base44.agents.subscribeToConversation(conv.id, (data) => {

        if (data?.messages) setMessages(data.messages);

      });

      await base44.agents.addMessage(conv, {

        role: 'user',

        content: `Hi! My email is ${userEmail}. Please check my integration status and recommend what to set up first. Use the getIntegrationStatus function with my email.`,

      });

    } catch (e) {

      console.error('initConversation failed:', e);

    }

  }, []);

  useEffect(() => {

    document.title = 'Setup Concierge AI · ProFlow CRM';

    const saved = localStorage.getItem('homelink_user_email');

    if (saved) {

      setEmail(saved);

      loadStatus(saved);

      initConversation(saved);

    }

    return () => { if (unsubRef.current) unsubRef.current(); };

  }, [loadStatus, initConversation]);

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  }, [messages]);

  function handleEmailSubmit(e) {

    e.preventDefault();

    if (!emailInput.includes('@')) return;

    const clean = emailInput.trim().toLowerCase();

    localStorage.setItem('homelink_user_email', clean);

    setEmail(clean);

    loadStatus(clean);

    initConversation(clean);

  }

  async function sendMessage(text) {

    if (!text.trim() || !conversation || sending) return;

    setSending(true);

    setInput('');

    try {

      await base44.agents.addMessage(conversation, { role: 'user', content: text });

      setTimeout(() => loadStatus(email), 2500);

    } catch (e) {

      console.error('Send failed:', e);

    }

    setSending(false);

  }

  function handleSubmit(e) {

    e.preventDefault();

    sendMessage(input);

  }

  function resetSession() {

    if (!window.confirm('Start a fresh setup session?')) return;

    setMessages([]);

    setConversation(null);

    initConversation(email);

  }

  if (!email) {

    return (

      <div style={gateWrap}>

        <div style={gateCard}>

          <div style={gateIcon}>

            <Sparkles size={28} color="#fff" />

          </div>

          <h1 style={{ fontSize: 24, fontWeight: 900, color: NAVY, margin: '0 0 8px' }}>

            Meet Your Setup Concierge

          </h1>

          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 24 }}>

            An AI assistant that walks you through connecting every integration your CRM needs — Apify, Twilio, Google, and more. Personalized guidance, real-time validation, zero confusion.

          </p>

          <form onSubmit={handleEmailSubmit}>

            <label style={labelSty}>YOUR EMAIL</label>

            <input

              type="email"

              required

              placeholder="your@email.com"

              value={emailInput}

              onChange={e => setEmailInput(e.target.value)}

              style={inputSty}

            />

            <button type="submit" style={ctaBtn}>

              <Sparkles size={16} /> Start Setup Concierge

            </button>

          </form>

        </div>

      </div>

    );

  }

  return (

    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      <header style={headerSty}>

        <a href="/CRM" style={headerLink}>

          <ArrowLeft size={15} /> CRM

        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

          <Sparkles size={15} color={GOLD} />

          <span style={{ color: '#fff', fontWeight: 800, fontSize: 13 }}>Setup Concierge</span>

        </div>

        <button onClick={resetSession} style={resetBtn}>

          <RefreshCw size={12} /> Reset

        </button>

      </header>

      <main style={mainGrid}>

        <section style={chatPanel}>

          <div style={chatHeader}>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>

              <Zap size={16} color={GOLD} />

              <div style={{ fontWeight: 900, fontSize: 14 }}>Your AI Setup Concierge</div>

            </div>

            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>

              Personalized integration setup · Real-time validation · Plain-English support

            </div>

          </div>

          <div style={messagesArea}>

            {messages.length === 0 && (

              <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>

                <Loader size={20} style={{ animation: 'spin 1s linear infinite', marginBottom: 10 }} />

                <div style={{ fontSize: 13 }}>Connecting to your concierge...</div>

              </div>

            )}

            {messages.map((m, i) => <MessageBubble key={i} message={m} />)}

            <div ref={messagesEndRef} />

          </div>

          <form onSubmit={handleSubmit} style={inputBar}>

            <input

              type="text"

              value={input}

              onChange={e => setInput(e.target.value)}

              placeholder="Ask anything about setup..."

              disabled={sending || !conversation}

              style={chatInput}

            />

            <button type="submit" disabled={sending || !input.trim()} style={{

              ...sendBtn,

              background: input.trim() && !sending ? GOLD : '#cbd5e1',

              cursor: sending ? 'not-allowed' : 'pointer',

            }}>

              {sending ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <><Send size={14} /> Send</>}

            </button>

          </form>

        </section>

        <aside style={asideSty}>

          <div style={progressCard}>

            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>

              SETUP PROGRESS

            </div>

            <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1, marginBottom: 12 }}>

              {statusLoading ? '...' : `${status?.completion_percent || 0}%`}

            </div>

            <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 4, overflow: 'hidden', marginBottom: 10 }}>

              <div style={{ height: '100%', width: `${status?.completion_percent || 0}%`, background: GOLD, transition: 'width 0.4s' }} />

            </div>

            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>

              {status?.connected_count || 0} of {status?.total_count || 0} integrations connected

            </div>

          </div>

          {status?.recommended_next && (

            <div style={recCard}>

              <div style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: 1, marginBottom: 6 }}>

                ⚡ RECOMMENDED NEXT

              </div>

              <div style={{ fontWeight: 900, color: NAVY, fontSize: 15, marginBottom: 4 }}>

                {status.recommended_next.label}

              </div>

              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12, lineHeight: 1.5 }}>

                {status.recommended_next.purpose}

              </div>

              <button onClick={() => sendMessage(`Help me set up ${status.recommended_next.label} step by step`)} style={recBtn}>

                Ask the Concierge to Help →

              </button>

            </div>

          )}

          <div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: '0 4px' }}>

              <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', letterSpacing: 0.5, textTransform: 'uppercase' }}>

                Your Integrations

              </div>

              <button onClick={() => loadStatus(email)} disabled={statusLoading} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>

                <RefreshCw size={13} style={statusLoading ? { animation: 'spin 1s linear infinite' } : {}} />

              </button>

            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

              {status?.integrations && Object.entries(status.integrations).map(([key, integration]) => (

                <IntegrationCard key={key} integrationKey={key} integration={integration} userEmail={email} />

              ))}

            </div>

          </div>

          <AutomationToggles userEmail={email} />

        </aside>

      </main>

      <style>{`

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media (max-width: 900px) {

          main { grid-template-columns: 1fr !important; }

        }

      `}</style>

    </div>

  );

}

const gateWrap = { minHeight: '100vh', background: '#f8fafc', fontFamily: "'Segoe UI', Arial, sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 };

const gateCard = { background: '#fff', borderRadius: 16, padding: 36, maxWidth: 460, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' };

const gateIcon = { width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg, ${GOLD}, ${NAVY})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 };

const labelSty = { fontSize: 11, fontWeight: 800, color: '#475569', letterSpacing: 0.5, display: 'block', marginBottom: 6 };

const inputSty = { width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 14, marginBottom: 14, boxSizing: 'border-box' };

const ctaBtn = { width: '100%', background: GOLD, color: '#fff', border: 'none', padding: '13px', borderRadius: 8, fontWeight: 900, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 };

const headerSty = { background: NAVY, padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };

const headerLink = { color: '#fff', fontWeight: 900, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 };

const resetBtn = { background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 };

const mainGrid = { maxWidth: 1400, margin: '0 auto', padding: '20px 16px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: 20 };

const chatPanel = { background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 110px)', overflow: 'hidden' };

const chatHeader = { padding: '16px 20px', borderBottom: '1px solid #f1f5f9', background: `linear-gradient(135deg, ${NAVY}, #122B5E)`, color: '#fff' };

const messagesArea = { flex: 1, overflowY: 'auto', padding: 20, background: '#f8fafc' };

const chipBtn = { background: '#fff', border: '1px solid #e2e8f0', padding: '7px 12px', borderRadius: 16, fontSize: 12, color: NAVY, fontWeight: 600, cursor: 'pointer' };

const inputBar = { padding: 14, borderTop: '1px solid #f1f5f9', background: '#fff', display: 'flex', gap: 8 };

const chatInput = { flex: 1, padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 13, outline: 'none' };

const sendBtn = { color: '#fff', border: 'none', borderRadius: 10, padding: '0 18px', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 13 };

const asideSty = { display: 'flex', flexDirection: 'column', gap: 14, height: 'calc(100vh - 110px)', overflowY: 'auto' };

const progressCard = { background: `linear-gradient(135deg, ${NAVY}, #122B5E)`, borderRadius: 14, padding: 20, color: '#fff' };

const recCard = { background: '#fffbeb', border: `2px solid ${GOLD}`, borderRadius: 14, padding: 16 };

const recBtn = { width: '100%', background: GOLD, color: '#fff', border: 'none', padding: '10px', borderRadius: 8, fontWeight: 800, fontSize: 12, cursor: 'pointer' };
