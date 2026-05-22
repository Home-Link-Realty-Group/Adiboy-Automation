# settings

Source: settings.docx

import { useState, useEffect, useCallback } from 'react';

import { useSearchParams } from 'react-router-dom';

import {

  User, Calculator, TrendingUp, Eye, Bell, Phone, Mail, Zap, ShieldCheck,

  Settings as SettingsIcon, ArrowLeft, Loader, Check

} from 'lucide-react';

import { getPreferences, savePreferences, getDefaults } from '@/lib/userPreferences';

import ProfileSection from '@/components/settings/sections/ProfileSection';

import DealDefaultsSection from '@/components/settings/sections/DealDefaultsSection';

import ARVAnalysisSection from '@/components/settings/sections/ARVAnalysisSection';

import DisplaySection from '@/components/settings/sections/DisplaySection';

import NotificationsSection from '@/components/settings/sections/NotificationsSection';

import DialerSection from '@/components/settings/sections/DialerSection';

import CommunicationsSection from '@/components/settings/sections/CommunicationsSection';

import AutomationsSection from '@/components/settings/sections/AutomationsSection';

import ComplianceSection from '@/components/settings/sections/ComplianceSection';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const SECTIONS = [

  { id: 'Profile',         label: 'Profile',         icon: User,        Component: ProfileSection,        accent: '#3b82f6', tint: '#dbeafe' },

  { id: 'DealDefaults',    label: 'Deal Defaults',   icon: Calculator,  Component: DealDefaultsSection,   accent: '#D4A843', tint: '#fef3c7' },

  { id: 'ARVAnalysis',     label: 'ARV Analysis',    icon: TrendingUp,  Component: ARVAnalysisSection,    accent: '#10b981', tint: '#d1fae5', badge: 'NEW' },

  { id: 'Display',         label: 'Display & Region',icon: Eye,         Component: DisplaySection,        accent: '#8b5cf6', tint: '#ede9fe' },

  { id: 'Notifications',   label: 'Notifications',   icon: Bell,        Component: NotificationsSection,  accent: '#ec4899', tint: '#fce7f3' },

  { id: 'Dialer',          label: 'Dialer & Calls',  icon: Phone,       Component: DialerSection,         accent: '#16a34a', tint: '#dcfce7' },

  { id: 'Communications',  label: 'Communications',  icon: Mail,        Component: CommunicationsSection, accent: '#0891b2', tint: '#cffafe' },

  { id: 'Automations',     label: 'Automations',     icon: Zap,         Component: AutomationsSection,    accent: '#f59e0b', tint: '#fef3c7' },

  { id: 'Compliance',      label: 'Compliance',      icon: ShieldCheck, Component: ComplianceSection,     accent: '#dc2626', tint: '#fee2e2' },

];

// Settings page — Mission Control

export const SETTINGS_VERSION = 'v2';

export default function Settings() {

  const [searchParams, setSearchParams] = useSearchParams();

  const activeId = searchParams.get('section') || 'Profile';

  const [email, setEmail] = useState('');

  const [emailInput, setEmailInput] = useState('');

  const [prefs, setPrefs] = useState(getDefaults());

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {

    document.title = 'Settings · ProFlow CRM';

    // Clear any stuck chunk-reload counter from the ErrorBoundary so future

    // reloads can proceed if needed

    try { sessionStorage.removeItem('chunk_reload_attempts'); } catch {}

    const saved = localStorage.getItem('homelink_user_email');

    if (saved) {

      setEmail(saved);

      load(saved);

    }

  }, []);

  const load = useCallback(async (userEmail) => {

    setLoading(true);

    const p = await getPreferences(userEmail);

    setPrefs(p);

    setLoading(false);

  }, []);

  function handleEmailSubmit(e) {

    e.preventDefault();

    if (!emailInput.includes('@')) return;

    const clean = emailInput.trim().toLowerCase();

    localStorage.setItem('homelink_user_email', clean);

    setEmail(clean);

    load(clean);

  }

  function handleChange(updates) {

    setPrefs(p => ({ ...p, ...updates }));

  }

  async function handleSave() {

    if (!email) return;

    setSaving(true);

    await savePreferences(email, prefs);

    setSaving(false);

    setSavedFlash(true);

    setTimeout(() => setSavedFlash(false), 2000);

  }

  function setSection(id) { setSearchParams({ section: id }); }

  if (!email) return <EmailGate emailInput={emailInput} setEmailInput={setEmailInput} onSubmit={handleEmailSubmit} />;

  const activeSection = SECTIONS.find(s => s.id === activeId) || SECTIONS[0];

  const ActiveSection = activeSection.Component;

  const ActiveIcon = activeSection.icon;

  return (

    <div style={{

      minHeight: '100vh',

      background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',

      fontFamily: "'Segoe UI', Arial, sans-serif",

      position: 'relative',

    }}>

      {/* Ambient background blobs */}

      <div aria-hidden="true" style={{

        position: 'fixed', top: -120, right: -120, width: 360, height: 360,

        borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}22, transparent 70%)`,

        pointerEvents: 'none', zIndex: 0,

      }} />

      <div aria-hidden="true" style={{

        position: 'fixed', bottom: -160, left: -160, width: 420, height: 420,

        borderRadius: '50%', background: `radial-gradient(circle, ${activeSection.accent}22, transparent 70%)`,

        pointerEvents: 'none', zIndex: 0, transition: 'background 0.5s',

      }} />

      <header style={{

        background: `linear-gradient(135deg, ${NAVY} 0%, #1a3a7a 100%)`,

        padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',

        position: 'sticky', top: 0, zIndex: 100,

        boxShadow: '0 4px 20px rgba(11,31,69,0.15)',

        borderBottom: `1px solid ${GOLD}33`,

      }}>

        <a href="/CRM" style={{ color: '#fff', fontWeight: 900, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>

          <ArrowLeft size={15} /> Back to CRM

        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

          <SettingsIcon size={16} color={GOLD} className="settings-spin-slow" />

          <span style={{ color: '#fff', fontWeight: 900, fontSize: 14, letterSpacing: 0.5 }}>Mission Control · Settings</span>

        </div>

        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 6 }}>

          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 8px #16a34a', animation: 'pulse 2s infinite' }} />

          {email}

        </div>

      </header>

      {savedFlash && (

        <div style={{

          position: 'fixed', top: 70, right: 24, zIndex: 200,

          background: '#16a34a', color: '#fff',

          padding: '10px 18px', borderRadius: 10,

          display: 'flex', alignItems: 'center', gap: 8,

          boxShadow: '0 6px 20px rgba(22,163,74,0.35)',

          fontSize: 13, fontWeight: 700,

          animation: 'slideIn 0.25s ease',

        }}>

          <Check size={15} /> Saved

        </div>

      )}

      {/* HERO BANNER */}

      <div style={{

        position: 'relative', zIndex: 1,

        background: `linear-gradient(135deg, ${activeSection.accent} 0%, ${NAVY} 100%)`,

        padding: '32px 24px 80px',

        transition: 'background 0.5s ease',

        overflow: 'hidden',

      }}>

        {/* Decorative grid pattern */}

        <div aria-hidden="true" style={{

          position: 'absolute', inset: 0, opacity: 0.08,

          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',

          backgroundSize: '32px 32px',

          maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 70%)',

          WebkitMaskImage: 'radial-gradient(ellipse at top, black 30%, transparent 70%)',

        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>

            <div style={{

              width: 64, height: 64, borderRadius: 16,

              background: 'rgba(255,255,255,0.15)',

              backdropFilter: 'blur(10px)',

              border: '1px solid rgba(255,255,255,0.25)',

              display: 'flex', alignItems: 'center', justifyContent: 'center',

              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',

            }}>

              <ActiveIcon size={28} color="#fff" strokeWidth={2.2} />

            </div>

            <div style={{ flex: 1, minWidth: 0 }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>

                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>

                  ⚙️ Personalize your CRM

                </span>

                {activeSection.badge && (

                  <span style={{

                    background: GOLD, color: NAVY, fontSize: 10, fontWeight: 900,

                    letterSpacing: 1, padding: '3px 8px', borderRadius: 4,

                  }}>{activeSection.badge}</span>

                )}

              </div>

              <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: -0.5, textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>

                {activeSection.label}

              </h1>

              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>

                Section <strong style={{ color: '#fff' }}>{SECTIONS.findIndex(s => s.id === activeId) + 1}</strong> of <strong style={{ color: '#fff' }}>{SECTIONS.length}</strong>

                <span style={{ margin: '0 10px', opacity: 0.4 }}>·</span>

                <span>Changes save instantly to your account</span>

              </div>

            </div>

            <div style={{ display: 'flex', gap: 8 }}>

              {SECTIONS.map((s, i) => (

                <div key={s.id} style={{

                  width: 26, height: 4, borderRadius: 2,

                  background: s.id === activeId ? '#fff' : 'rgba(255,255,255,0.25)',

                  transition: 'all 0.2s',

                  boxShadow: s.id === activeId ? '0 0 12px rgba(255,255,255,0.6)' : 'none',

                }} />

              ))}

            </div>

          </div>

        </div>

      </div>

      <main style={{

        maxWidth: 1200, margin: '-56px auto 0', padding: '0 20px 40px',

        display: 'grid', gridTemplateColumns: '260px minmax(0, 1fr)', gap: 24,

        position: 'relative', zIndex: 2,

      }}>

        <aside className="settings-aside" style={{

          alignSelf: 'flex-start',

          display: 'flex', flexDirection: 'column', gap: 14,

        }}>

          <nav className="settings-nav" style={{

            background: '#fff',

            borderRadius: 14,

            padding: 10,

            border: '1px solid #e2e8f0',

            boxShadow: '0 8px 24px rgba(11,31,69,0.08)',

            display: 'flex', flexDirection: 'column', gap: 3,

          }}>

            {SECTIONS.map(s => {

              const isActive = activeId === s.id;

              const Icon = s.icon;

              return (

                <button key={s.id} onClick={() => setSection(s.id)}

                  className="settings-nav-btn"

                  style={{

                    display: 'flex', alignItems: 'center', gap: 11,

                    padding: '11px 12px', borderRadius: 10,

                    background: isActive ? `linear-gradient(135deg, ${s.accent}, ${s.accent}dd)` : 'transparent',

                    border: 'none',

                    color: isActive ? '#fff' : '#475569',

                    fontWeight: isActive ? 800 : 600, fontSize: 13,

                    cursor: 'pointer', textAlign: 'left', width: '100%',

                    boxShadow: isActive ? `0 4px 14px ${s.accent}55` : 'none',

                    transition: 'all 0.2s',

                    flexShrink: 0,

                    position: 'relative',

                  }}>

                  <div style={{

                    width: 26, height: 26, borderRadius: 7,

                    background: isActive ? 'rgba(255,255,255,0.22)' : s.tint,

                    display: 'flex', alignItems: 'center', justifyContent: 'center',

                    flexShrink: 0,

                  }}>

                    <Icon size={14} color={isActive ? '#fff' : s.accent} strokeWidth={2.4} />

                  </div>

                  <span style={{ flex: 1 }}>{s.label}</span>

                  {s.badge && (

                    <span style={{

                      background: isActive ? 'rgba(255,255,255,0.25)' : GOLD,

                      color: '#fff', fontSize: 9, fontWeight: 900, letterSpacing: 0.5,

                      padding: '2px 6px', borderRadius: 4,

                    }}>

                      {s.badge}

                    </span>

                  )}

                </button>

              );

            })}

          </nav>

        </aside>

        <div className="settings-content-fade" key={activeId}>

          {loading ? (

            <div style={{

              background: '#fff', borderRadius: 14, padding: 60, textAlign: 'center',

              border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(11,31,69,0.06)',

            }}>

              <Loader size={20} style={{ animation: 'spin 1s linear infinite', color: GOLD }} />

              <div style={{ marginTop: 10, fontSize: 13, color: '#64748b' }}>Loading your preferences…</div>

            </div>

          ) : (

            <ActiveSection

              prefs={prefs}

              email={email}

              onChange={handleChange}

              onSave={handleSave}

              saving={saving}

            />

          )}

        </div>

      </main>

      <style>{`

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

        @keyframes fadeUp { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .settings-spin-slow { animation: spinSlow 12s linear infinite; }

        .settings-content-fade { animation: fadeUp 0.35s ease-out; }

        .settings-nav-btn:hover { transform: translateX(2px); }

        @media (max-width: 880px) {

          main { grid-template-columns: 1fr !important; margin-top: -40px !important; }

          .settings-aside {

            position: relative !important; top: 0 !important;

            max-height: none !important; overflow: visible !important;

          }

          .settings-nav {

            flex-direction: row !important; flex-wrap: wrap; gap: 6px !important;

            overflow: visible !important; padding: 8px !important;

          }

          .settings-nav button { width: auto !important; flex: 1 1 auto !important; }

          .settings-help-note { display: none; }

        }

      `}</style>

    </div>

  );

}

function EmailGate({ emailInput, setEmailInput, onSubmit }) {

  return (

    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Segoe UI', Arial, sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>

      <div style={{ background: '#fff', borderRadius: 16, padding: 36, maxWidth: 460, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>

        <div style={{ width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg, ${GOLD}, ${NAVY})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>

          <SettingsIcon size={28} color="#fff" />

        </div>

        <h1 style={{ fontSize: 24, fontWeight: 900, color: NAVY, margin: '0 0 8px' }}>Settings</h1>

        <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 24 }}>

          Enter your email to load your preferences.

        </p>

        <form onSubmit={onSubmit}>

          <input type="email" required placeholder="your@email.com"

            value={emailInput} onChange={e => setEmailInput(e.target.value)}

            style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 14, marginBottom: 14, boxSizing: 'border-box' }} />

          <button type="submit" style={{ width: '100%', background: GOLD, color: '#fff', border: 'none', padding: '13px', borderRadius: 8, fontWeight: 900, fontSize: 14, cursor: 'pointer' }}>

            Open Settings

          </button>

        </form>

      </div>

    </div>

  );

}
