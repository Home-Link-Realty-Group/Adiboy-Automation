import { useState, useEffect, useRef } from 'react';
import { Settings, User, LogOut, ChevronDown } from 'lucide-react';
import { getPreferences } from '@/lib/userPreferences';

const NAVY = '#0B1F45';
const GOLD = '#D4A843';

/**
 * Drop into any page header. Shows profile avatar + dropdown with Settings link.
 * If no email in localStorage, shows a generic gear icon linking to /Settings.
 */
export default function SettingsGearIcon({ tone = 'dark' }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [prefs, setPrefs] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const e = localStorage.getItem('homelink_user_email') || '';
    setEmail(e);
    if (e) getPreferences(e).then(setPrefs);
  }, []);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const initials = (prefs?.full_name || email || '?').split(/[\s@]/)[0].slice(0, 2).toUpperCase();
  const avatarUrl = prefs?.avatar_url;

  function signOut() {
    localStorage.removeItem('homelink_user_email');
    window.location.href = '/';
  }

  // Not signed in → simple gear link
  if (!email) {
    return (
      <a href="/Settings" title="Settings" aria-label="Settings"
         style={{
           display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
           width: 36, height: 36, borderRadius: 8,
           background: tone === 'dark' ? 'rgba(255,255,255,0.08)' : '#f1f5f9',
           color: tone === 'dark' ? '#fff' : NAVY,
           textDecoration: 'none', cursor: 'pointer',
         }}>
        <Settings size={16} />
      </a>
    );
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Account menu"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '4px 10px 4px 4px', borderRadius: 22,
          background: tone === 'dark' ? 'rgba(255,255,255,0.08)' : '#f1f5f9',
          border: 'none', cursor: 'pointer',
          color: tone === 'dark' ? '#fff' : NAVY,
        }}
      >
        <Avatar avatarUrl={avatarUrl} initials={initials} size={28} />
        <ChevronDown size={13} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: '#fff', borderRadius: 12, minWidth: 240,
          boxShadow: '0 10px 40px rgba(15,31,69,0.18)',
          border: '1px solid #e2e8f0',
          zIndex: 1000, overflow: 'hidden',
        }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar avatarUrl={avatarUrl} initials={initials} size={36} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 800, color: NAVY, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {prefs?.full_name || email.split('@')[0]}
              </div>
              <div style={{ fontSize: 11, color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {email}
              </div>
            </div>
          </div>

          <MenuLink href="/Settings" icon={Settings} label="Settings" />
          <MenuLink href="/Settings?section=Profile" icon={User} label="Profile & Avatar" />
          <MenuLink href="/MyAccount" icon={User} label="My Account & Billing" />

          <button onClick={signOut} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '11px 16px',
            background: 'transparent', border: 'none',
            borderTop: '1px solid #f1f5f9',
            color: '#dc2626', fontWeight: 700, fontSize: 13,
            cursor: 'pointer', textAlign: 'left',
          }}>
            <LogOut size={15} /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}

function MenuLink({ href, icon: Icon, label }) {
  return (
    <a href={href} style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '11px 16px', textDecoration: 'none',
      color: NAVY, fontWeight: 600, fontSize: 13,
      transition: 'background 0.1s',
    }}
    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      <Icon size={15} color="#64748b" /> {label}
    </a>
  );
}

function Avatar({ avatarUrl, initials, size = 32 }) {
  if (avatarUrl) {
    return <img src={avatarUrl} alt="" width={size} height={size} style={{
      width: size, height: size, borderRadius: '50%', objectFit: 'cover',
      background: '#f1f5f9', display: 'block',
    }} />;
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${NAVY}, ${GOLD})`,
      color: '#fff', fontSize: Math.round(size * 0.4), fontWeight: 900,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {initials}
    </div>
  );
}
