# New Microsoft Word Document (14)

Source: New Microsoft Word Document (14).docx

import ReactMarkdown from 'react\-markdown';

import \{ Sparkles, User, Loader, CheckCircle2, AlertCircle, Wrench \} from 'lucide\-react';

const NAVY = '\#0B1F45';

const GOLD = '\#D4A843';

const GREEN = '\#16a34a';

/\*\*

 \* Message bubble for the Setup Concierge chat\.

 \* Renders user/assistant messages, markdown content, and tool\-call status\.

 \*/

export default function MessageBubble\(\{ message \}\) \{

  const isUser = message\.role === 'user';

  return \(

    <div style=\{\{

      display: 'flex', gap: 10,

      flexDirection: isUser ? 'row\-reverse' : 'row',

      marginBottom: 14,

    \}\}>

      \{/\* Avatar \*/\}

      <div style=\{\{

        width: 32, height: 32, borderRadius: '50%',

        background: isUser ? '\#e2e8f0' : \`linear\-gradient\(135deg, $\{GOLD\}, $\{NAVY\}\)\`,

        color: isUser ? '\#475569' : '\#fff',

        display: 'flex', alignItems: 'center', justifyContent: 'center',

        flexShrink: 0,

        marginTop: 2,

      \}\}>

        \{isUser ? <User size=\{16\} /> : <Sparkles size=\{16\} />\}

      </div>

      \{/\* Message body \*/\}

      <div style=\{\{

        maxWidth: '78%',

        display: 'flex', flexDirection: 'column',

        alignItems: isUser ? 'flex\-end' : 'flex\-start',

      \}\}>

        \{message\.content && \(

          <div style=\{\{

            background: isUser ? NAVY : '\#fff',

            color: isUser ? '\#fff' : '\#0f172a',

            padding: '10px 14px',

            borderRadius: 14,

            borderTopLeftRadius: isUser ? 14 : 4,

            borderTopRightRadius: isUser ? 4 : 14,

            border: isUser ? 'none' : '1px solid \#e2e8f0',

            boxShadow: isUser ? 'none' : '0 1px 2px rgba\(0,0,0,0\.04\)',

            fontSize: 14, lineHeight: 1\.55,

          \}\}>

            \{isUser ? \(

              <p style=\{\{ margin: 0 \}\}>\{message\.content\}</p>

            \) : \(

              <ReactMarkdown

                components=\{\{

                  p: \(\{ children \}\) => <p style=\{\{ margin: '4px 0', lineHeight: 1\.6 \}\}>\{children\}</p>,

                  ul: \(\{ children \}\) => <ul style=\{\{ margin: '6px 0', paddingLeft: 20 \}\}>\{children\}</ul>,

                  ol: \(\{ children \}\) => <ol style=\{\{ margin: '6px 0', paddingLeft: 20 \}\}>\{children\}</ol>,

                  li: \(\{ children \}\) => <li style=\{\{ margin: '3px 0' \}\}>\{children\}</li>,

                  code: \(\{ inline, children \}\) => inline ? \(

                    <code style=\{\{

                      background: '\#1e293b', color: '\#fbbf24',

                      padding: '1px 6px', borderRadius: 4,

                      fontFamily: 'monospace', fontSize: 12,

                    \}\}>\{children\}</code>

                  \) : \(

                    <pre style=\{\{

                      background: '\#1e293b', color: '\#e2e8f0',

                      padding: 10, borderRadius: 6, overflow: 'auto',

                      fontSize: 12, margin: '8px 0',

                    \}\}><code>\{children\}</code></pre>

                  \),

                  a: \(\{ href, children \}\) => \(

                    <a href=\{href\} target="\_blank" rel="noopener noreferrer" style=\{\{ color: NAVY, fontWeight: 700 \}\}>\{children\}</a>

                  \),

                  strong: \(\{ children \}\) => <strong style=\{\{ color: NAVY \}\}>\{children\}</strong>,

                \}\}

              >

                \{message\.content\}

              </ReactMarkdown>

            \)\}

          </div>

        \)\}

        \{/\* Tool call indicators \*/\}

        \{message\.tool\_calls?\.length > 0 && \(

          <div style=\{\{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 4 \}\}>

            \{message\.tool\_calls\.map\(\(tc, i\) => \(

              <ToolCallChip key=\{i\} toolCall=\{tc\} />

            \)\)\}

          </div>

        \)\}

      </div>

    </div>

  \);

\}

function ToolCallChip\(\{ toolCall \}\) \{

  const \{ name, status \} = toolCall;

  const friendlyName = \(name || ''\)\.split\('\.'\)\.pop\(\)\.replace\(/\_/g, ' '\);

  const cfg = \{

    pending:     \{ Icon: Loader,        color: '\#94a3b8', label: 'Working\.\.\.', spin: true \},

    in\_progress: \{ Icon: Loader,        color: GOLD,      label: 'Working\.\.\.', spin: true \},

    running:     \{ Icon: Loader,        color: GOLD,      label: 'Working\.\.\.', spin: true \},

    completed:   \{ Icon: CheckCircle2,  color: GREEN,     label: 'Done' \},

    success:     \{ Icon: CheckCircle2,  color: GREEN,     label: 'Done' \},

    failed:      \{ Icon: AlertCircle,   color: '\#dc2626', label: 'Failed' \},

    error:       \{ Icon: AlertCircle,   color: '\#dc2626', label: 'Failed' \},

  \}\[status\] || \{ Icon: Wrench, color: '\#64748b', label: '' \};

  const \{ Icon, color, label, spin \} = cfg;

  return \(

    <div style=\{\{

      display: 'inline\-flex', alignItems: 'center', gap: 6,

      background: '\#fff', border: '1px solid \#e2e8f0',

      padding: '4px 10px', borderRadius: 12,

      fontSize: 11, color: '\#475569', fontWeight: 600,

    \}\}>

      <Icon size=\{11\} color=\{color\} style=\{spin ? \{ animation: 'spin 1s linear infinite' \} : \{\}\} />

      <span style=\{\{ textTransform: 'capitalize' \}\}>\{friendlyName\}</span>

      \{label && <span style=\{\{ color, fontWeight: 700 \}\}>· \{label\}</span>\}

    </div>

  \);

\}
