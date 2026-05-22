import { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Play, Pause, Square } from 'lucide-react';

const NAVY = '#0B1F45';
const GOLD = '#D4A843';
const GREEN = '#27ae60';
const DISPO_OPTIONS = ['Answered', 'No Answer', 'Busy', 'Voicemail', 'Wrong Number', 'Callback'];

export default function AutoDialerPro() {
  const [sheetUrl, setSheetUrl] = useState('');
  const [twimlUrl, setTwimlUrl] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [idx, setIdx] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [dialed, setDialed] = useState(0);
  const [results, setResults] = useState([]);
  const [dispositions, setDispositions] = useState({});
  const dialLoop = useRef(null);

  const handleStart = async () => {
    if (!sheetUrl.includes('/d/') || !twimlUrl) {
      setError('Enter Google Sheet URL and TwiML URL');
      return;
    }

    const sheetId = sheetUrl.split('/d/')[1].split('/')[0];
    setLoading(true);
    setError('');

    try {
      const res = await base44.functions.invoke('autoDialerRun', {
        action: 'start',
        sheetId,
        twimlUrl,
      });

      setSessionId(res.sessionId);
      setTotalLeads(res.totalLeads);
      setIdx(0);
      setDialed(0);
      setResults([]);
      setStatus('dialing');
      setPaused(false);
      startLoop(res.sessionId);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const startLoop = (sid) => {
    dialLoop.current = setInterval(async () => {
      try {
        const res = await base44.functions.invoke('autoDialerRun', {
          action: 'dialNext',
          sessionId: sid,
        });

        setIdx(res.idx);
        setDialed(res.dialed);
        setResults(res.results || []);

        if (res.done) {
          clearInterval(dialLoop.current);
          setStatus('complete');
        }
      } catch (err) {
        setError(err.message);
        clearInterval(dialLoop.current);
      }
    }, 3000);
    setLoading(false);
  };

  const handlePause = async () => {
    await base44.functions.invoke('autoDialerRun', {
      action: 'pause',
      sessionId,
    });
    setPaused(true);
    clearInterval(dialLoop.current);
  };

  const handleResume = async () => {
    await base44.functions.invoke('autoDialerRun', {
      action: 'resume',
      sessionId,
    });
    setPaused(false);
    startLoop(sessionId);
  };

  const handleStop = async () => {
    clearInterval(dialLoop.current);
    await base44.functions.invoke('autoDialerRun', {
      action: 'cleanup',
      sessionId,
    });
    setStatus('complete');
  };

  const setDispo = async (callSid, dispo) => {
    await base44.functions.invoke('autoDialerRun', {
      action: 'setDispo',
      sessionId,
      disposition: { sid: callSid, value: dispo },
    });
    setDispositions((prev) => ({ ...prev, [callSid]: dispo }));
  };

  const handleReset = () => {
    setStatus('idle');
    setSheetUrl('');
    setTwimlUrl('');
    setSessionId(null);
    setResults([]);
    setError('');
    setDispositions({});
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ fontSize: 32, fontWeight: 900, color: NAVY, marginBottom: 24 }}>📞 Auto Dialer</h1>

      {error && (
        <div style={{ background: '#ffebee', border: '2px solid #d32f2f', color: '#d32f2f', padding: 16, borderRadius: 8, marginBottom: 16, fontWeight: 600 }}>
          ✗ {error}
        </div>
      )}

      {/* Setup */}
      {status === 'idle' && (
        <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 12, marginBottom: 20, border: '2px solid #ddd' }}>
          <label style={{ display: 'block', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>Google Sheet URL</label>
          <input
            type="text"
            placeholder="https://docs.google.com/spreadsheets/d/{ID}/..."
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '2px solid #ddd',
              borderRadius: 8,
              fontSize: 14,
              boxSizing: 'border-box',
              marginBottom: 12,
            }}
          />

          <label style={{ display: 'block', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>TwiML Bin URL</label>
          <input
            type="text"
            placeholder="https://handler.twilio.com/twiml/{ID}"
            value={twimlUrl}
            onChange={(e) => setTwimlUrl(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '2px solid #ddd',
              borderRadius: 8,
              fontSize: 14,
              boxSizing: 'border-box',
              marginBottom: 16,
            }}
          />

          <button
            onClick={handleStart}
            disabled={loading || !sheetUrl || !twimlUrl}
            style={{
              width: '100%',
              padding: '16px',
              background: loading ? '#ccc' : GOLD,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 900,
              fontSize: 16,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Loading...' : '▶️ START DIALING'}
          </button>
        </div>
      )}

      {/* Live Dialing */}
      {(status === 'dialing' || status === 'complete') && (
        <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '2px solid #ddd' }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div style={{ textAlign: 'center', padding: '14px', background: '#f8f9fa', borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: '#999', fontWeight: 700, marginBottom: 4 }}>STATUS</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: paused ? '#ff9800' : status === 'dialing' ? GREEN : NAVY }}>
                {paused ? 'PAUSED' : status === 'dialing' ? 'DIALING' : 'DONE'}
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '14px', background: '#f8f9fa', borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: '#999', fontWeight: 700, marginBottom: 4 }}>PROGRESS</div>
              <div style={{ fontSize: 18, fontWeight: 900 }}>
                {idx} / {totalLeads}
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '14px', background: '#f8f9fa', borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: '#999', fontWeight: 700, marginBottom: 4 }}>DIALED</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: GREEN }}>{dialed}</div>
            </div>
          </div>

          {/* Controls */}
          {status === 'dialing' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {!paused ? (
                <button
                  onClick={handlePause}
                  style={{
                    padding: '12px',
                    background: '#ff9800',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  ⏸ PAUSE
                </button>
              ) : (
                <button
                  onClick={handleResume}
                  style={{
                    padding: '12px',
                    background: GREEN,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  ▶ RESUME
                </button>
              )}
              <button
                onClick={handleStop}
                style={{
                  padding: '12px',
                  background: '#d32f2f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                ■ STOP
              </button>
            </div>
          )}

          {/* Results with Dispositions */}
          <div style={{ maxHeight: 500, overflowY: 'auto', borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
            {results.map((r) => (
              <div
                key={r.sid}
                style={{
                  padding: '12px',
                  borderBottom: '1px solid #f0f0f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: NAVY }}>{r.name}</div>
                  <div style={{ color: '#999' }}>{r.phone}</div>
                  {r.status === 'failed' && <div style={{ color: '#d32f2f', marginTop: 2 }}>✗ {r.error}</div>}
                </div>
                {r.status === 'dialed' && (
                  <select
                    value={dispositions[r.sid] || ''}
                    onChange={(e) => setDispo(r.sid, e.target.value)}
                    style={{
                      padding: '6px 8px',
                      borderRadius: 6,
                      border: '1px solid #ddd',
                      fontSize: 11,
                      fontWeight: 600,
                      minWidth: 120,
                      background: '#fff',
                    }}
                  >
                    <option value="">Set Dispo</option>
                    {DISPO_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                )}
                {r.status === 'dialed' && !dispositions[r.sid] && <span style={{ color: GREEN, fontWeight: 800 }}>✓</span>}
              </div>
            ))}
          </div>

          {status === 'complete' && (
            <button
              onClick={handleReset}
              style={{
                width: '100%',
                marginTop: 16,
                padding: '12px',
                background: NAVY,
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Start Over
            </button>
          )}
        </div>
      )}
    </div>
  );
}
