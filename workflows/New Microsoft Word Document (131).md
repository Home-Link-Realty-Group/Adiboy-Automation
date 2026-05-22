# New Microsoft Word Document (131)

Source: New Microsoft Word Document (131).docx

export default function SocialSidebar\(\{ activeTab, setActiveTab, counts \}\) \{

  const tabs = \[

    \{ id: 'dashboard', icon: '📊', label: 'Dashboard' \},

    \{ id: 'composer', icon: '✍️', label: 'AI Composer' \},

    \{ id: 'library', icon: '📚', label: 'Post Library', badge: counts?\.drafts \},

    \{ id: 'calendar', icon: '📅', label: 'Content Calendar' \},

    \{ id: 'campaigns', icon: '🚀', label: 'Campaigns' \},

    \{ id: 'analytics', icon: '📈', label: 'Analytics' \},

    \{ id: 'comments', icon: '💬', label: 'Comments', badge: counts?\.newComments \},

    \{ id: 'imageeditor', icon: '🖼️', label: 'Image Editor' \},

    \{ id: 'connect', icon: '🔌', label: 'Connect Accounts' \},

  \];

  return \(

    <aside style=\{\{

      width: 210, background: '\#0a0a1a', borderRight: '1px solid rgba\(255,255,255,0\.07\)',

      display: 'flex', flexDirection: 'column', flexShrink: 0, minHeight: '100vh', position: 'sticky', top: 0

    \}\}>

      <div style=\{\{ padding: '22px 16px 16px', borderBottom: '1px solid rgba\(255,255,255,0\.07\)' \}\}>

        <div style=\{\{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 \}\}>

          <span style=\{\{ fontSize: 20 \}\}>📣</span>

          <div>

            <div style=\{\{ fontSize: 12, fontWeight: 900, color: '\#fff', letterSpacing: 0\.5 \}\}>Social HQ</div>

            <div style=\{\{ fontSize: 9, color: '\#444', letterSpacing: 0\.5 \}\}>Home\-Link Realty Group</div>

          </div>

        </div>

      </div>

      <nav style=\{\{ flex: 1, padding: '8px 0' \}\}>

        \{tabs\.map\(t => \(

          <button key=\{t\.id\} onClick=\{\(\) => setActiveTab\(t\.id\)\} style=\{\{

            display: 'flex', alignItems: 'center', gap: 10, width: '100%',

            padding: '11px 16px', background: activeTab === t\.id ? 'rgba\(231,76,60,0\.15\)' : 'transparent',

            border: 'none', borderLeft: activeTab === t\.id ? '3px solid \#e74c3c' : '3px solid transparent',

            color: activeTab === t\.id ? '\#fff' : '\#555', cursor: 'pointer', fontSize: 12,

            fontWeight: activeTab === t\.id ? 700 : 400, textAlign: 'left', transition: 'all 0\.15s'

          \}\}

            onMouseEnter=\{e => \{ if \(activeTab \!== t\.id\) e\.currentTarget\.style\.color = '\#aaa'; \}\}

            onMouseLeave=\{e => \{ if \(activeTab \!== t\.id\) e\.currentTarget\.style\.color = '\#555'; \}\}>

            <span style=\{\{ fontSize: 14 \}\}>\{t\.icon\}</span>

            <span style=\{\{ flex: 1 \}\}>\{t\.label\}</span>

            \{t\.badge > 0 && \(

              <span style=\{\{ background: '\#e74c3c', color: '\#fff', fontSize: 9, fontWeight: 900, padding: '2px 6px', borderRadius: 10, minWidth: 16, textAlign: 'center' \}\}>

                \{t\.badge\}

              </span>

            \)\}

          </button>

        \)\)\}

      </nav>

      <div style=\{\{ padding: '14px 16px', borderTop: '1px solid rgba\(255,255,255,0\.06\)', display: 'flex', flexDirection: 'column', gap: 8 \}\}>

        <a href="/HQ" style=\{\{ color: '\#444', fontSize: 11, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 \}\}>

          ← Back to HQ

        </a>

      </div>

    </aside>

  \);

\}
