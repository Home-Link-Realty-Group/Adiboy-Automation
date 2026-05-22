# InfoCallOut

Source: InfoCallOut.docx

import \{ Info, AlertTriangle, ShieldCheck, Lightbulb \} from 'lucide\-react';

const VARIANTS = \{

  info:    \{ bg: '\#eff6ff', border: '\#3b82f6', text: '\#1e40af', icon: Info \},

  warn:    \{ bg: '\#fffbeb', border: '\#f59e0b', text: '\#92400e', icon: AlertTriangle \},

  success: \{ bg: '\#f0fdf4', border: '\#16a34a', text: '\#166534', icon: ShieldCheck \},

  tip:     \{ bg: '\#faf5ff', border: '\#a855f7', text: '\#6b21a8', icon: Lightbulb \},

\};

/\*\*

 \* Visual callout for inline tips, warnings, and helpful info inside the wizard\.

 \*/

export default function InfoCallout\(\{ variant = 'info', title, children \}\) \{

  const v = VARIANTS\[variant\] || VARIANTS\.info;

  const Icon = v\.icon;

  return \(

    <div style=\{\{

      background: v\.bg,

      border: \`1\.5px solid $\{v\.border\}40\`,

      borderLeft: \`4px solid $\{v\.border\}\`,

      borderRadius: 10,

      padding: '12px 16px',

      margin: '14px 0',

      display: 'flex', gap: 12, alignItems: 'flex\-start',

    \}\}>

      <Icon size=\{18\} color=\{v\.border\} style=\{\{ flexShrink: 0, marginTop: 2 \}\} />

      <div style=\{\{ flex: 1, fontSize: 13, color: v\.text, lineHeight: 1\.6 \}\}>

        \{title && <div style=\{\{ fontWeight: 800, marginBottom: 4 \}\}>\{title\}</div>\}

        \{children\}

      </div>

    </div>

  \);

\}
