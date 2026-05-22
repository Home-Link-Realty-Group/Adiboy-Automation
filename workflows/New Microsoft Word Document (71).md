# New Microsoft Word Document (71)

Source: New Microsoft Word Document (71).docx

import \{ useState, useEffect \} from 'react';

import \{ base44 \} from '@/api/base44Client';

export default function HQSocialPanel\(\) \{

  const \[posts, setPosts\] = useState\(\[\]\);

  const \[campaigns, setCampaigns\] = useState\(\[\]\);

  const \[loading, setLoading\] = useState\(true\);

  useEffect\(\(\) => \{

    Promise\.all\(\[

      base44\.entities\.SocialPost\.list\('\-created\_date', 50\),

      base44\.entities\.SocialCampaign\.list\(\),

    \]\)\.then\(\(\[p, c\]\) => \{

      setPosts\(p || \[\]\);

      setCampaigns\(c || \[\]\);

      setLoading\(false\);

    \}\)\.catch\(\(\) => setLoading\(false\)\);

  \}, \[\]\);

  if \(loading\) return \(

    <div style=\{\{ background: 'rgba\(255,255,255,0\.03\)', border: '1px solid rgba\(255,255,255,0\.07\)', borderRadius: 12, padding: 20, textAlign: 'center', color: '\#444', fontSize: 11 \}\}>Loading social data\.\.\.</div>

  \);

  const published = posts\.filter\(p => p\.status === 'Published'\);

  const scheduled = posts\.filter\(p => p\.status === 'Scheduled'\);

  const drafts = posts\.filter\(p => p\.status === 'Draft'\);

  const activeCampaigns = campaigns\.filter\(c => c\.status === 'Active'\);

  const totalReach = published\.reduce\(\(s, p\) => s \+ \(p\.reach || 0\), 0\);

  const totalLikes = published\.reduce\(\(s, p\) => s \+ \(p\.likes || 0\), 0\);

  const totalLeads = published\.reduce\(\(s, p\) => s \+ \(p\.leads\_generated || 0\), 0\);

  const recentPosts = \[\.\.\.posts\]\.slice\(0, 4\);

  return \(

    <div style=\{\{ background: 'rgba\(255,255,255,0\.03\)', border: '1px solid rgba\(225,48,108,0\.2\)', borderRadius: 12, padding: 16 \}\}>

      <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'center', marginBottom: 14 \}\}>

        <div style=\{\{ fontSize: 11, fontWeight: 900, color: '\#E1306C', textTransform: 'uppercase', letterSpacing: 1 \}\}>📣 Social Media</div>

        <a href="/SocialHQ" style=\{\{ fontSize: 10, color: '\#E1306C', fontWeight: 700, textDecoration: 'none' \}\}>Open Social HQ →</a>

      </div>

      \{/\* KPIs \*/\}

      <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(6, 1fr\)', gap: 7, marginBottom: 14 \}\}>

        \{\[

          \{ label: 'Published', val: published\.length, color: '\#27ae60' \},

          \{ label: 'Scheduled', val: scheduled\.length, color: '\#3498db' \},

          \{ label: 'Drafts', val: drafts\.length, color: '\#9b59b6' \},

          \{ label: 'Reach', val: totalReach > 999 ? \(totalReach/1000\)\.toFixed\(1\)\+'K' : totalReach, color: '\#e67e22' \},

          \{ label: 'Likes', val: totalLikes, color: '\#e74c3c' \},

          \{ label: 'Leads', val: totalLeads, color: '\#f39c12' \},

        \]\.map\(s => \(

          <div key=\{s\.label\} style=\{\{ background: 'rgba\(255,255,255,0\.04\)', borderTop: \`2px solid $\{s\.color\}\`, borderRadius: 8, padding: '8px 4px', textAlign: 'center' \}\}>

            <div style=\{\{ fontSize: 14, fontWeight: 900, color: s\.color \}\}>\{s\.val\}</div>

            <div style=\{\{ fontSize: 8, color: '\#555', marginTop: 1 \}\}>\{s\.label\}</div>

          </div>

        \)\)\}

      </div>

      \{/\* Active Campaigns \*/\}

      \{activeCampaigns\.length > 0 && \(

        <div style=\{\{ marginBottom: 12 \}\}>

          <div style=\{\{ fontSize: 9, fontWeight: 700, color: '\#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 \}\}>Active Campaigns</div>

          \{activeCampaigns\.slice\(0, 2\)\.map\(c => \(

            <div key=\{c\.id\} style=\{\{ display: 'flex', justifyContent: 'space\-between', padding: '5px 0', borderBottom: '1px solid rgba\(255,255,255,0\.05\)', fontSize: 11 \}\}>

              <span style=\{\{ color: '\#ccc', fontWeight: 600 \}\}>\{c\.name\}</span>

              <span style=\{\{ color: '\#27ae60', fontWeight: 700, fontSize: 9 \}\}>ACTIVE · \{c\.total\_leads || 0\} leads</span>

            </div>

          \)\)\}

        </div>

      \)\}

      \{/\* Recent Posts \*/\}

      <div>

        <div style=\{\{ fontSize: 9, fontWeight: 700, color: '\#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 \}\}>Recent Posts</div>

        \{recentPosts\.length === 0 ? \(

          <div style=\{\{ fontSize: 11, color: '\#444', padding: '10px 0', textAlign: 'center' \}\}>

            No posts yet — <a href="/AdTemplates" style=\{\{ color: '\#e74c3c', textDecoration: 'none', fontWeight: 700 \}\}>use Ad Templates →</a>

          </div>

        \) : recentPosts\.map\(p => \(

          <div key=\{p\.id\} style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid rgba\(255,255,255,0\.05\)' \}\}>

            <div style=\{\{ flex: 1, overflow: 'hidden' \}\}>

              <div style=\{\{ fontSize: 10, color: '\#ccc', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' \}\}>\{p\.title || 'Post'\}</div>

              <div style=\{\{ fontSize: 9, color: '\#444' \}\}>\{p\.platforms\}</div>

            </div>

            <span style=\{\{ fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 6, marginLeft: 8, flexShrink: 0,

              background: p\.status === 'Published' ? '\#27ae6025' : p\.status === 'Scheduled' ? '\#3498db25' : '\#9b59b625',

              color: p\.status === 'Published' ? '\#27ae60' : p\.status === 'Scheduled' ? '\#3498db' : '\#9b59b6'

            \}\}>\{p\.status\}</span>

          </div>

        \)\)\}

      </div>

      \{/\* Quick Actions \*/\}

      <div style=\{\{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginTop: 12 \}\}>

        <a href="/AdTemplates" style=\{\{ background: 'rgba\(231,76,60,0\.12\)', border: '1px solid rgba\(231,76,60,0\.25\)', color: '\#e74c3c', borderRadius: 8, padding: '8px', fontSize: 10, fontWeight: 700, textDecoration: 'none', textAlign: 'center' \}\}>

          ⚡ Ad Templates

        </a>

        <a href="/SocialHQ" style=\{\{ background: 'rgba\(225,48,108,0\.12\)', border: '1px solid rgba\(225,48,108,0\.25\)', color: '\#E1306C', borderRadius: 8, padding: '8px', fontSize: 10, fontWeight: 700, textDecoration: 'none', textAlign: 'center' \}\}>

          📅 Content Calendar

        </a>

      </div>

    </div>

  \);

\}
