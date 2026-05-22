# New Microsoft Word Document (56)

Source: New Microsoft Word Document (56).docx

import \{ useState \} from 'react';

const MODULES = \[

  \{ name: 'CRM', icon: '👥', desc: 'Pipeline & leads', path: '/CRM', color: '\#3498db' \},

  \{ name: 'Call Lists', icon: '📞', desc: 'Daily dialer', path: '/CallLists', color: '\#e74c3c' \},

  \{ name: 'Accounting', icon: '💼', desc: 'P&L tracking', path: '/Accounting', color: '\#f39c12' \},

  \{ name: 'Automations', icon: '⚡', desc: 'Workflows', path: '/AutomationCenter', color: '\#1abc9c' \},

  \{ name: 'Social HQ', icon: '📣', desc: 'All platforms', path: '/SocialHQ', color: '\#e74c3c' \},

  \{ name: 'Campaigns', icon: '🎯', desc: 'Ad templates', path: '/AdTemplates', color: '\#9b59b6' \},

  \{ name: 'Blog', icon: '✍️', desc: 'Content & SEO', path: '/Blog', color: '\#e67e22' \},

  \{ name: 'Docs', icon: '📁', desc: 'Contracts & files', path: '/DocumentVault', color: '\#3498db' \},

  \{ name: 'Growth', icon: '📈', desc: 'Playbooks', path: '/GrowthPlaybook', color: '\#16a34a' \},

  \{ name: 'Email', icon: '📧', desc: 'Drip campaigns', path: '/', color: '\#8e44ad' \},

  \{ name: 'Phone', icon: '☎️', desc: 'Call grading', path: '/CallGrade', color: '\#c0392b' \},

  \{ name: 'Referrals', icon: '🤝', desc: 'Partner network', path: '/ReferralEngine', color: '\#16a085' \},

\];

export default function HQBusinessConsole\(\) \{

  return \(

    <div style=\{\{ background: 'rgba\(255,255,255,0\.03\)', border: '1px solid rgba\(255,255,255,0\.07\)', borderRadius: 12, padding: 16 \}\}>

      <div style=\{\{ fontSize: 11, fontWeight: 900, color: '\#1abc9c', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 \}\}>🎯 Business Modules</div>

      <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(4, 1fr\)', gap: 8 \}\}>

        \{MODULES\.map\(m => \(

          <a key=\{m\.name\} href=\{m\.path\}

            style=\{\{

              background: \`$\{m\.color\}15\`,

              border: \`1px solid $\{m\.color\}40\`,

              borderRadius: 8,

              padding: 12,

              textDecoration: 'none',

              transition: 'all 0\.15s',

              cursor: 'pointer',

              textAlign: 'center',

            \}\}

            onMouseEnter=\{e => \{

              e\.currentTarget\.style\.transform = 'translateY\(\-2px\)';

              e\.currentTarget\.style\.borderColor = m\.color \+ '80';

            \}\}

            onMouseLeave=\{e => \{

              e\.currentTarget\.style\.transform = 'none';

              e\.currentTarget\.style\.borderColor = m\.color \+ '40';

            \}\}

          >

            <div style=\{\{ fontSize: 20, marginBottom: 4 \}\}>\{m\.icon\}</div>

            <div style=\{\{ fontSize: 10, fontWeight: 700, color: '\#ccc' \}\}>\{m\.name\}</div>

            <div style=\{\{ fontSize: 8, color: '\#666', marginTop: 2 \}\}>\{m\.desc\}</div>

          </a>

        \)\)\}

      </div>

    </div>

  \);

\}
