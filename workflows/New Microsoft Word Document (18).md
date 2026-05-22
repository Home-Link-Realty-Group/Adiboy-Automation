# New Microsoft Word Document (18)

Source: New Microsoft Word Document (18).docx

import StatusLight from '@/components/concierge/StatusLight';

import ToggleSwitch from '@/components/concierge/ToggleSwitch';

const NAVY = '\#0B1F45';

const GREEN = '\#16a34a';

const RED = '\#dc2626';

/\*\*

 \* Control center row\.

 \* LEFT: vertical full\-height 3D toggle switch\.

 \* MIDDLE: title \+ description \+ status light \+ badge\.

 \* RIGHT: workflow blueprint diagram\.

 \*/

export default function ControlCard\(\{

  enabled,

  onToggle,

  title,

  description,

  badge,

  badgeColor,

  blueprint,

  disabled = false,

  disabledReason,

\}\) \{

  return \(

    <div style=\{\{

      background: enabled

        ? 'linear\-gradient\(135deg, \#f0fdf4 0%, \#ecfdf5 50%, \#f0f9ff 100%\)'

        : disabled

          ? 'linear\-gradient\(135deg, \#f8fafc 0%, \#f1f5f9 100%\)'

          : 'linear\-gradient\(135deg, \#fef2f2 0%, \#fff1f2 50%, \#fdf2f8 100%\)',

      borderRadius: 14,

      border: \`1\.5px solid $\{enabled ? '\#bbf7d0' : disabled ? '\#e2e8f0' : '\#fecaca'\}\`,

      borderLeft: \`5px solid $\{enabled ? GREEN : disabled ? '\#cbd5e1' : RED\}\`,

      padding: 18,

      display: 'grid',

      gridTemplateColumns: '70px minmax\(220px, 1fr\) minmax\(280px, 1\.6fr\)',

      gap: 18,

      alignItems: 'stretch',

      transition: 'all 0\.25s',

      minHeight: 170,

      boxShadow: enabled

        ? '0 4px 16px rgba\(22,163,74,0\.10\), 0 1px 3px rgba\(11,31,69,0\.05\)'

        : disabled

          ? '0 2px 10px rgba\(11,31,69,0\.06\)'

          : '0 4px 16px rgba\(220,38,38,0\.10\), 0 1px 3px rgba\(11,31,69,0\.05\)',

    \}\}

    className="control\-card"

    >

      \{/\* LEFT: ON above \+ vertical toggle \+ OFF below \*/\}

      <div style=\{\{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 \}\}>

        <span style=\{\{

          fontSize: 11, fontWeight: 900, letterSpacing: 1\.5,

          color: enabled ? GREEN : '\#94a3b8',

          textShadow: enabled ? '0 0 8px rgba\(34,197,94,0\.5\)' : 'none',

          transition: 'all 0\.25s',

          fontFamily: 'monospace',

        \}\}>ON</span>

        <ToggleSwitch

          checked=\{enabled\}

          onChange=\{onToggle\}

          disabled=\{disabled\}

          label=\{title\}

          height=\{140\}

        />

        <span style=\{\{

          fontSize: 11, fontWeight: 900, letterSpacing: 1\.5,

          color: \!enabled && \!disabled ? RED : '\#94a3b8',

          textShadow: \!enabled && \!disabled ? '0 0 8px rgba\(220,38,38,0\.4\)' : 'none',

          transition: 'all 0\.25s',

          fontFamily: 'monospace',

        \}\}>OFF</span>

      </div>

      \{/\* MIDDLE: workflow name \+ description \*/\}

      <div style=\{\{ minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' \}\}>

        <div style=\{\{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' \}\}>

          <StatusLight on=\{enabled\} size=\{12\} />

          <span style=\{\{

            fontSize: 10, fontWeight: 800, letterSpacing: 1,

            color: enabled ? GREEN : disabled ? '\#94a3b8' : RED,

            textTransform: 'uppercase',

          \}\}>

            \{enabled ? 'Active' : disabled ? 'Locked' : 'Paused'\}

          </span>

          \{badge && \(

            <span style=\{\{

              fontSize: 9, fontWeight: 800, letterSpacing: 0\.5,

              background: badgeColor || '\#f1f5f9',

              color: badgeColor ? '\#fff' : '\#475569',

              padding: '2px 7px', borderRadius: 4,

            \}\}>

              \{badge\}

            </span>

          \)\}

        </div>

        <div style=\{\{ fontWeight: 900, fontSize: 16, color: NAVY, marginBottom: 6, lineHeight: 1\.25 \}\}>

          \{title\}

        </div>

        <div style=\{\{ fontSize: 12\.5, color: '\#64748b', lineHeight: 1\.55 \}\}>

          \{description\}

        </div>

        \{disabled && disabledReason && \(

          <div style=\{\{

            marginTop: 10, fontSize: 11, color: '\#92400e',

            background: '\#fffbeb', border: '1px solid \#fde68a',

            padding: '5px 9px', borderRadius: 6, display: 'inline\-block', alignSelf: 'flex\-start',

          \}\}>

            ⚠️ \{disabledReason\}

          </div>

        \)\}

      </div>

      \{/\* RIGHT: whiteboard blueprint \*/\}

      <div style=\{\{ display: 'flex', alignItems: 'center' \}\}>\{blueprint\}</div>

    </div>

  \);

\}
