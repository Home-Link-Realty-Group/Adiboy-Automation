# New Microsoft Word Document (86)

Source: New Microsoft Word Document (86).docx

// Shared Fortune 500 layout for all subscriber-facing SaaS pages.

// Wraps each page with: navy/gold header, ambient background blobs,

// persistent left sidebar nav, and a content area.

// Pages pass their own content as children — no business logic touched.

import { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import {

  LayoutDashboard, Users, Phone, PhoneCall, Calculator, ClipboardList,

  FolderOpen, Calendar, Zap, SlidersHorizontal, BarChart3, Settings as SettingsIcon,

  ChevronLeft, ChevronRight, Search, Bell, LogOut, CreditCard, Headphones,

  Database, Target, Mail, MessageSquare, FileText, TrendingUp, Building2,

  Sparkles

} from 'lucide-react';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const NAV_GROUPS = [

  {

    label: 'Operations',

    items: [

      { to: '/Dashboard',          label: 'Dashboard',         icon: LayoutDashboard, accent: '#3b82f6' },

      { to: '/CRM',                label: 'CRM',               icon: Users,           accent: '#8b5cf6' },

      { to: '/CallLists',          label: 'Call Lists',        icon: ClipboardList,   accent: '#ec4899' },

      { to: '/EnterprisePowerDialer', label: 'Power Dialer',   icon: PhoneCall,       accent: '#16a34a' },

      { to: '/CallGrade',          label: 'Call Coach',        icon: Headphones,      accent: '#0891b2' },

      { to: '/DealAnalyzer',       label: 'Deal Analyzer',     icon: Calculator,      accent: '#D4A843' },

      { to: '/ProductivityHub',    label: 'Productivity Hub',  icon: Calendar,        accent: '#f59e0b' },

      { to: '/DocumentVault',      label: 'Document Vault',    icon: FolderOpen,      accent: '#64748b' },

    ],

  },

  {

    label: 'Lead Tools',

    items: [

      { to: '/LeadImport',         label: 'Lead Import',       icon: Database,        accent: '#3b82f6' },

      { to: '/LeadScorer',         label: 'Lead Scorer',       icon: Target,          accent: '#dc2626' },

      { to: '/LeadPrioritizer',    label: 'Lead Prioritizer',  icon: TrendingUp,      accent: '#10b981' },

      { to: '/SkipTracer',         label: 'Skip Tracer',       icon: Search,          accent: '#0891b2' },

      { to: '/PreForeclosureScraper', label: 'Pre-Foreclosure', icon: Building2,      accent: '#dc2626' },

      { to: '/CashBuyerFinder',    label: 'Cash Buyers',       icon: Users,           accent: '#16a34a' },

      { to: '/ListBuilder',        label: 'List Builder',      icon: ClipboardList,   accent: '#8b5cf6' },

      { to: '/VacantLeads',        label: 'Vacant Leads',      icon: FileText,        accent: '#f59e0b' },

    ],

  },

  {

    label: 'Growth & Analytics',

    items: [

      { to: '/HQ',                 label: 'Mission HQ',        icon: BarChart3,       accent: '#0B1F45' },

      { to: '/AutomationCenter',   label: 'Automations',       icon: Zap,             accent: '#f59e0b' },

      { to: '/ControlCenter',      label: 'Control Center',    icon: SlidersHorizontal, accent: '#8b5cf6' },

      { to: '/SEODashboard',       label: 'SEO Dashboard',     icon: TrendingUp,      accent: '#10b981' },

      { to: '/BehaviorAnalytics',  label: 'Behavior Analytics', icon: BarChart3,      accent: '#ec4899' },

      { to: '/EmailSignature',     label: 'Email Tools',       icon: Mail,            accent: '#0891b2' },

      { to: '/ReferralEngine',     label: 'Referrals',         icon: MessageSquare,   accent: '#D4A843' },

    ],

  },

  {

    label: 'Account',

    items: [

      { to: '/MyAccount',          label: 'My Account',        icon: CreditCard,      accent: '#16a34a' },

      { to: '/Settings',           label: 'Settings',          icon: SettingsIcon,    accent: '#3b82f6' },

    ],

  },

];

export default function SaaSLayout({ children, title, subtitle, accent = NAVY, icon: PageIcon, badge, headerRight }) {

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(() => {

    try { return localStorage.getItem('saas_sidebar_collapsed') === '1'; } catch { return false; }

  });

  const [search, setSearch] = useState('');

  useEffect(() => {

    try { localStorage.setItem('saas_sidebar_collapsed', collapsed ? '1' : '0'); } catch {}

  }, [collapsed]);

  // Filter nav by search

  const q = search.trim().toLowerCase();

  const filteredGroups = q

    ? NAV_GROUPS.map(g => ({ ...g, items: g.items.filter(i => i.label.toLowerCase().includes(q)) })).filter(g => g.items.length)

    : NAV_GROUPS;

  const sidebarWidth = collapsed ? 64 : 240;

  return (

    <div style={{

      minHeight: '100vh',

      background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',

      fontFamily: "'Segoe UI', Arial, sans-serif",

      position: 'relative',

    }}>

      {/* Ambient blobs */}

      <div aria-hidden="true" style={{

        position: 'fixed', top: -120, right: -120, width: 360, height: 360,

        borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}22, transparent 70%)`,

        pointerEvents: 'none', zIndex: 0,

      }} />

      <div aria-hidden="true" style={{

        position: 'fixed', bottom: -160, left: -160, width: 420, height: 420,

        borderRadius: '50%', background: `radial-gradient(circle, ${accent}22, transparent 70%)`,

        pointerEvents: 'none', zIndex: 0,

      }} />

      {/* Top header */}

      <header style={{

        background: `linear-gradient(135deg, ${NAVY} 0%, #1a3a7a 100%)`,

        padding: '12px 24px',

        display: 'flex', justifyContent: 'space-between', alignItems: 'center',

        position: 'sticky', top: 0, zIndex: 100,

        boxShadow: '0 4px 20px rgba(11,31,69,0.15)',

        borderBottom: `1px solid ${GOLD}33`,

      }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>

          <button

            onClick={() => setCollapsed(c => !c)}

            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}

            style={{

              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',

              color: '#fff', borderRadius: 8, padding: 6, cursor: 'pointer',

              display: 'flex', alignItems: 'center', justifyContent: 'center',

            }}>

            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}

          </button>

          <Link to="/Dashboard" style={{ color: '#fff', fontWeight: 900, fontSize: 15, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>

            <Sparkles size={16} color={GOLD} />

            ProFlow CRM

          </Link>

        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

          {headerRight}

          <button aria-label="Notifications" style={{

            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',

            color: '#fff', borderRadius: 8, padding: '6px 8px', cursor: 'pointer',

            display: 'flex', alignItems: 'center', gap: 6, fontSize: 12,

          }}>

            <Bell size={14} />

          </button>

          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 6 }}>

            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 8px #16a34a' }} />

            Live

          </span>

        </div>

      </header>

      <div style={{ display: 'flex', position: 'relative', zIndex: 1 }}>

        {/* Sidebar */}

        <aside style={{

          width: sidebarWidth,

          flexShrink: 0,

          background: '#fff',

          borderRight: '1px solid #e2e8f0',

          minHeight: 'calc(100vh - 56px)',

          position: 'sticky', top: 56, alignSelf: 'flex-start',

          maxHeight: 'calc(100vh - 56px)',

          overflowY: 'auto',

          transition: 'width 0.2s ease',

          boxShadow: '2px 0 8px rgba(11,31,69,0.04)',

        }}>

          {/* Search */}

          {!collapsed && (

            <div style={{ padding: '12px 12px 8px', position: 'sticky', top: 0, background: '#fff', zIndex: 2 }}>

              <div style={{ position: 'relative' }}>

                <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />

                <input

                  type="search"

                  placeholder="Search…"

                  value={search}

                  onChange={e => setSearch(e.target.value)}

                  style={{

                    width: '100%', padding: '7px 10px 7px 30px',

                    border: '1.5px solid #e2e8f0', borderRadius: 8,

                    fontSize: 12, boxSizing: 'border-box',

                    background: '#f8fafc',

                  }}

                />

              </div>

            </div>

          )}

          <nav style={{ padding: '4px 8px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>

            {filteredGroups.map(group => (

              <div key={group.label}>

                {!collapsed && (

                  <div style={{

                    fontSize: 9, fontWeight: 900, color: '#94a3b8',

                    letterSpacing: 1.2, textTransform: 'uppercase',

                    padding: '6px 10px 4px',

                  }}>

                    {group.label}

                  </div>

                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                  {group.items.map(item => {

                    const Icon = item.icon;

                    const isActive = location.pathname === item.to;

                    return (

                      <Link

                        key={item.to}

                        to={item.to}

                        title={collapsed ? item.label : undefined}

                        style={{

                          display: 'flex', alignItems: 'center',

                          gap: collapsed ? 0 : 10,

                          padding: collapsed ? '9px 0' : '8px 10px',

                          justifyContent: collapsed ? 'center' : 'flex-start',

                          borderRadius: 8,

                          background: isActive ? `linear-gradient(135deg, ${item.accent}, ${item.accent}dd)` : 'transparent',

                          color: isActive ? '#fff' : '#475569',

                          fontWeight: isActive ? 800 : 600,

                          fontSize: 12.5, textDecoration: 'none',

                          boxShadow: isActive ? `0 4px 12px ${item.accent}55` : 'none',

                          transition: 'all 0.15s',

                          position: 'relative',

                        }}

                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f1f5f9'; }}

                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}

                      >

                        <div style={{

                          width: 22, height: 22, borderRadius: 6,

                          background: isActive ? 'rgba(255,255,255,0.22)' : `${item.accent}1a`,

                          display: 'flex', alignItems: 'center', justifyContent: 'center',

                          flexShrink: 0,

                        }}>

                          <Icon size={12.5} color={isActive ? '#fff' : item.accent} strokeWidth={2.4} />

                        </div>

                        {!collapsed && <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>}

                      </Link>

                    );

                  })}

                </div>

              </div>

            ))}

          </nav>

        </aside>

        {/* Main */}

        <main style={{ flex: 1, minWidth: 0, padding: '0 0 40px' }}>

          {/* Per-page hero */}

          {(title || subtitle || PageIcon) && (

            <div style={{

              background: `linear-gradient(135deg, ${accent} 0%, ${NAVY} 100%)`,

              padding: '28px 32px 70px',

              position: 'relative', overflow: 'hidden',

            }}>

              <div aria-hidden="true" style={{

                position: 'absolute', inset: 0, opacity: 0.08,

                backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',

                backgroundSize: '32px 32px',

                maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 70%)',

                WebkitMaskImage: 'radial-gradient(ellipse at top, black 30%, transparent 70%)',

              }} />

              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>

                {PageIcon && (

                  <div style={{

                    width: 56, height: 56, borderRadius: 14,

                    background: 'rgba(255,255,255,0.15)',

                    backdropFilter: 'blur(10px)',

                    border: '1px solid rgba(255,255,255,0.25)',

                    display: 'flex', alignItems: 'center', justifyContent: 'center',

                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)', flexShrink: 0,

                  }}>

                    <PageIcon size={26} color="#fff" strokeWidth={2.2} />

                  </div>

                )}

                <div style={{ flex: 1, minWidth: 0 }}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>

                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>

                      ⚡ ProFlow Workspace

                    </span>

                    {badge && (

                      <span style={{

                        background: GOLD, color: NAVY, fontSize: 9, fontWeight: 900,

                        letterSpacing: 1, padding: '3px 7px', borderRadius: 4,

                      }}>{badge}</span>

                    )}

                  </div>

                  <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: -0.5, textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>

                    {title}

                  </h1>

                  {subtitle && (

                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>

                      {subtitle}

                    </div>

                  )}

                </div>

              </div>

            </div>

          )}

          {/* Content card pulled up over hero */}

          <div style={{

            maxWidth: 1400, margin: (title || PageIcon) ? '-50px auto 0' : '0 auto',

            padding: '0 24px',

            position: 'relative', zIndex: 2,

          }}>

            {children}

          </div>

        </main>

      </div>

    </div>

  );

}
