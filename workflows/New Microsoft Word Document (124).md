# New Microsoft Word Document (124)

Source: New Microsoft Word Document (124).docx

import \{ useState, useEffect \} from 'react';

import \{ base44 \} from '@/api/base44Client';

const CONNECTOR\_ID = '69df3bb81c5fadb4a0d33a7a'; // Meta Facebook Instagram connector

const PLATFORMS = \[

  \{ name: 'Facebook', icon: '📘', color: '\#1877F2', desc: 'Pages, posts, comments, insights' \},

  \{ name: 'Instagram', icon: '📸', color: '\#E1306C', desc: 'Feed posts, stories, comments' \},

  \{ name: 'LinkedIn', icon: '💼', color: '\#0A66C2', desc: 'Company page, posts, analytics' \},

  \{ name: 'Twitter/X', icon: '🐦', color: '\#1DA1F2', desc: 'Tweets, replies, analytics' \},

  \{ name: 'TikTok', icon: '🎵', color: '\#000000', desc: 'Video posts, analytics' \},

\];

export default function ConnectAccounts\(\) \{

  const \[user, setUser\] = useState\(null\);

  const \[connected, setConnected\] = useState\(false\);

  const \[loading, setLoading\] = useState\(true\);

  const \[connecting, setConnecting\] = useState\(false\);

  const \[disconnecting, setDisconnecting\] = useState\(false\);

  const checkConnection = async \(\) => \{

    try \{

      const authed = await base44\.auth\.isAuthenticated\(\);

      if \(\!authed\) \{ setLoading\(false\); return; \}

      const me = await base44\.auth\.me\(\);

      setUser\(me\);

      // Try to detect connection by calling a lightweight test

      setConnected\(false\); // Will be updated after OAuth flow

    \} catch \{

      setConnected\(false\);

    \}

    setLoading\(false\);

  \};

  useEffect\(\(\) => \{ checkConnection\(\); \}, \[\]\);

  const handleConnect = async \(\) => \{

    setConnecting\(true\);

    const url = await base44\.connectors\.connectAppUser\(CONNECTOR\_ID\);

    const popup = window\.open\(url, '\_blank'\);

    const timer = setInterval\(\(\) => \{

      if \(\!popup || popup\.closed\) \{

        clearInterval\(timer\);

        setConnected\(true\);

        setConnecting\(false\);

      \}

    \}, 500\);

  \};

  const handleDisconnect = async \(\) => \{

    setDisconnecting\(true\);

    await base44\.connectors\.disconnectAppUser\(CONNECTOR\_ID\);

    setConnected\(false\);

    setDisconnecting\(false\);

  \};

  if \(loading\) return \(

    <div style=\{\{ padding: '60px', textAlign: 'center', color: '\#555' \}\}>Loading\.\.\.</div>

  \);

  if \(\!user\) return \(

    <div style=\{\{ padding: '60px', textAlign: 'center' \}\}>

      <div style=\{\{ fontSize: 32, marginBottom: 12 \}\}>🔒</div>

      <div style=\{\{ color: '\#fff', fontWeight: 700, marginBottom: 8 \}\}>Sign in required</div>

      <button onClick=\{\(\) => base44\.auth\.redirectToLogin\(\)\} style=\{\{ background: '\#e74c3c', border: 'none', color: '\#fff', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer' \}\}>Sign In</button>

    </div>

  \);

  return \(

    <div style=\{\{ padding: '24px', maxWidth: 900, margin: '0 auto' \}\}>

      <h1 style=\{\{ fontSize: 22, fontWeight: 900, color: '\#fff', margin: '0 0 6px' \}\}>🔌 Connect Social Accounts</h1>

      <div style=\{\{ fontSize: 12, color: '\#555', marginBottom: 30 \}\}>Connect your Meta account to enable posting, monitoring, and analytics</div>

      \{/\* Meta OAuth Connection \*/\}

      <div style=\{\{ background: 'rgba\(255,255,255,0\.04\)', border: \`2px solid $\{connected ? '\#27ae60' : 'rgba\(255,255,255,0\.1\)'\}\`, borderRadius: 16, padding: 28, marginBottom: 24 \}\}>

        <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 \}\}>

          <div>

            <div style=\{\{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 \}\}>

              <span style=\{\{ fontSize: 32 \}\}>📘📸</span>

              <div>

                <div style=\{\{ fontSize: 16, fontWeight: 900, color: '\#fff' \}\}>Meta — Facebook & Instagram</div>

                <div style=\{\{ fontSize: 12, color: '\#555' \}\}>Manage Pages, post content, monitor comments, track insights</div>

              </div>

            </div>

            <div style=\{\{ display: 'flex', gap: 6, flexWrap: 'wrap' \}\}>

              \{\['Post to Pages', 'Read Comments', 'Instagram Publishing', 'Page Insights', 'Lead Monitoring'\]\.map\(f => \(

                <span key=\{f\} style=\{\{ fontSize: 10, background: 'rgba\(255,255,255,0\.07\)', color: '\#888', padding: '3px 8px', borderRadius: 8 \}\}>\{f\}</span>

              \)\)\}

            </div>

          </div>

          <div style=\{\{ display: 'flex', flexDirection: 'column', alignItems: 'flex\-end', gap: 8 \}\}>

            <div style=\{\{ display: 'flex', alignItems: 'center', gap: 6 \}\}>

              <div style=\{\{ width: 8, height: 8, borderRadius: '50%', background: connected ? '\#27ae60' : '\#555', boxShadow: connected ? '0 0 8px \#27ae60' : 'none' \}\} />

              <span style=\{\{ fontSize: 11, fontWeight: 700, color: connected ? '\#27ae60' : '\#555' \}\}>\{connected ? 'CONNECTED' : 'NOT CONNECTED'\}</span>

            </div>

            \{\!connected ? \(

              <button onClick=\{handleConnect\} disabled=\{connecting\} style=\{\{ background: '\#1877F2', border: 'none', color: '\#fff', borderRadius: 8, padding: '12px 24px', fontWeight: 900, fontSize: 13, cursor: 'pointer' \}\}>

                \{connecting ? '⏳ Connecting\.\.\.' : '🔗 Connect Meta Account'\}

              </button>

            \) : \(

              <button onClick=\{handleDisconnect\} disabled=\{disconnecting\} style=\{\{ background: 'rgba\(231,76,60,0\.15\)', border: '1px solid rgba\(231,76,60,0\.3\)', color: '\#e74c3c', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 12, cursor: 'pointer' \}\}>

                \{disconnecting ? 'Disconnecting\.\.\.' : '🔌 Disconnect'\}

              </button>

            \)\}

          </div>

        </div>

      </div>

      \{/\* Other Platforms \(Coming Soon\) \*/\}

      <div style=\{\{ fontSize: 11, fontWeight: 700, color: '\#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 \}\}>Other Platforms</div>

      <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto\-fill, minmax\(260px, 1fr\)\)', gap: 12 \}\}>

        \{PLATFORMS\.filter\(p => p\.name \!== 'Facebook' && p\.name \!== 'Instagram'\)\.map\(p => \(

          <div key=\{p\.name\} style=\{\{ background: 'rgba\(255,255,255,0\.03\)', border: '1px solid rgba\(255,255,255,0\.06\)', borderRadius: 12, padding: 16, opacity: 0\.6 \}\}>

            <div style=\{\{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 \}\}>

              <span style=\{\{ fontSize: 24 \}\}>\{p\.icon\}</span>

              <div>

                <div style=\{\{ fontSize: 13, fontWeight: 700, color: '\#fff' \}\}>\{p\.name\}</div>

                <div style=\{\{ fontSize: 10, color: '\#555' \}\}>\{p\.desc\}</div>

              </div>

            </div>

            <div style=\{\{ fontSize: 10, fontWeight: 700, color: '\#444', background: 'rgba\(255,255,255,0\.05\)', borderRadius: 6, padding: '5px 8px', textAlign: 'center' \}\}>

              🔜 Coming Soon

            </div>

          </div>

        \)\)\}

      </div>

      \{/\* Instructions \*/\}

      <div style=\{\{ background: 'rgba\(52,152,219,0\.08\)', border: '1px solid rgba\(52,152,219,0\.2\)', borderRadius: 12, padding: 18, marginTop: 24 \}\}>

        <div style=\{\{ fontSize: 11, fontWeight: 700, color: '\#3498db', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 \}\}>📋 Setup Instructions</div>

        \{\[

          '1\. Click "Connect Meta Account" — a Meta login window will open',

          '2\. Log in with the Facebook account that manages your Business Page',

          '3\. Grant all requested permissions \(Pages, Instagram, Insights\)',

          '4\. The window will close automatically — your account will be connected',

          '5\. Return to AI Composer to start creating and scheduling content',

        \]\.map\(\(step, i\) => \(

          <div key=\{i\} style=\{\{ fontSize: 12, color: '\#aaa', padding: '4px 0', lineHeight: 1\.6 \}\}>\{step\}</div>

        \)\)\}

      </div>

    </div>

  \);

\}
