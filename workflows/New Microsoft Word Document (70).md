# New Microsoft Word Document (70)

Source: New Microsoft Word Document (70).docx

import \{ useState \} from 'react';

const PLATFORMS = \[

  \{ name: 'Facebook', icon: '📘', color: '\#1877F2', status: 'connected', followers: 1240, posts: 18, engagement: '4\.2%' \},

  \{ name: 'Instagram', icon: '📸', color: '\#E1306C', status: 'connected', followers: 890, posts: 24, engagement: '5\.8%' \},

  \{ name: 'LinkedIn', icon: '💼', color: '\#0A66C2', status: 'connected', followers: 450, posts: 12, engagement: '3\.1%' \},

  \{ name: 'TikTok', icon: '🎵', color: '\#000000', status: 'connected', followers: 2100, posts: 42, engagement: '8\.5%' \},

  \{ name: 'Twitter/X', icon: '🐦', color: '\#1DA1F2', status: 'not\_connected', followers: 0, posts: 0, engagement: '0%' \},

  \{ name: 'YouTube', icon: '▶️', color: '\#FF0000', status: 'not\_connected', followers: 0, posts: 0, engagement: '0%' \},

\];

export default function HQSocialConsole\(\) \{

  const \[selectedPlatform, setSelectedPlatform\] = useState\(null\);

  const connected = PLATFORMS\.filter\(p => p\.status === 'connected'\)\.length;

  return \(

    <div style=\{\{ background: 'rgba\(255,255,255,0\.03\)', border: '1px solid rgba\(225,48,108,0\.2\)', borderRadius: 12, padding: 16 \}\}>

      <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'center', marginBottom: 12 \}\}>

        <div style=\{\{ fontSize: 11, fontWeight: 900, color: '\#E1306C', textTransform: 'uppercase', letterSpacing: 1 \}\}>📣 Social Media Console</div>

        <span style=\{\{ fontSize: 10, color: '\#666', fontWeight: 700 \}\}>\{connected\}/6 connected</span>

      </div>

      \{/\* Platform grid \*/\}

      <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(3, 1fr\)', gap: 8, marginBottom: 12 \}\}>

        \{PLATFORMS\.map\(p => \(

          <div

            key=\{p\.name\}

            onClick=\{\(\) => setSelectedPlatform\(p\.name\)\}

            style=\{\{

              background: p\.status === 'connected' ? p\.color \+ '15' : 'rgba\(255,255,255,0\.02\)',

              border: \`1px solid $\{p\.status === 'connected' ? p\.color \+ '40' : 'rgba\(255,255,255,0\.1\)'\}\`,

              borderRadius: 8,

              padding: 10,

              cursor: 'pointer',

              opacity: p\.status === 'connected' ? 1 : 0\.5,

            \}\}

          >

            <div style=\{\{ fontSize: 16, marginBottom: 4 \}\}>\{p\.icon\}</div>

            <div style=\{\{ fontSize: 10, fontWeight: 700, color: '\#ccc' \}\}>\{p\.name\}</div>

            \{p\.status === 'connected' && \(

              <>

                <div style=\{\{ fontSize: 9, color: '\#666', marginTop: 3 \}\}>\{p\.followers\.toLocaleString\(\)\} followers</div>

                <div style=\{\{ fontSize: 9, color: '\#666' \}\}>\{p\.engagement\} engagement</div>

              </>

            \)\}

            \{p\.status === 'not\_connected' && \(

              <div style=\{\{ fontSize: 8, color: '\#666', marginTop: 3 \}\}>Not connected</div>

            \)\}

          </div>

        \)\)\}

      </div>

      \{/\* Quick actions \*/\}

      <div style=\{\{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 \}\}>

        <a href='/SocialHQ' style=\{\{ background: 'rgba\(225,48,108,0\.2\)', border: '1px solid rgba\(225,48,108,0\.3\)', color: '\#E1306C', borderRadius: 6, padding: '8px', fontSize: 10, fontWeight: 700, textAlign: 'center', textDecoration: 'none' \}\}>

          📤 Publish Post

        </a>

        <a href='/SocialHQ' style=\{\{ background: 'rgba\(225,48,108,0\.2\)', border: '1px solid rgba\(225,48,108,0\.3\)', color: '\#E1306C', borderRadius: 6, padding: '8px', fontSize: 10, fontWeight: 700, textAlign: 'center', textDecoration: 'none' \}\}>

          📊 Analytics

        </a>

      </div>

      \{/\* Stats \*/\}

      <div style=\{\{ marginTop: 10, fontSize: 9, color: '\#666', background: 'rgba\(0,0,0,0\.2\)', borderRadius: 6, padding: 8 \}\}>

        <div style=\{\{ fontWeight: 700, marginBottom: 4 \}\}>30\-Day Summary</div>

        <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(3, 1fr\)', gap: 4 \}\}>

          \{\[

            \{ label: 'Total Posts', val: 96 \},

            \{ label: 'Total Reach', val: '145K' \},

            \{ label: 'Avg Engagement', val: '5\.3%' \},

          \]\.map\(s => \(

            <div key=\{s\.label\}>

              <div style=\{\{ fontSize: 11, fontWeight: 900, color: '\#fff' \}\}>\{s\.val\}</div>

              <div style=\{\{ fontSize: 8, color: '\#999' \}\}>\{s\.label\}</div>

            </div>

          \)\)\}

        </div>

      </div>

    </div>

  \);

\}
