# New Microsoft Word Document (121)

Source: New Microsoft Word Document (121).docx

import \{ useMemo \} from 'react';

import \{ BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell \} from 'recharts';

const PLATFORM\_COLORS = \{ facebook: '\#1877F2', instagram: '\#E1306C', linkedin: '\#0A66C2', twitter: '\#1DA1F2' \};

const STATUS\_COLORS = \{ Published: '\#27ae60', Scheduled: '\#3498db', Draft: '\#9b59b6', Failed: '\#e74c3c' \};

export default function AnalyticsPanel\(\{ posts, campaigns \}\) \{

  const published = posts\.filter\(p => p\.status === 'Published'\);

  // Post volume by type

  const byType = useMemo\(\(\) => \{

    const counts = \{\};

    posts\.forEach\(p => \{ counts\[p\.post\_type || 'Custom'\] = \(counts\[p\.post\_type || 'Custom'\] || 0\) \+ 1; \}\);

    return Object\.entries\(counts\)\.map\(\(\[name, value\]\) => \(\{ name, value \}\)\);

  \}, \[posts\]\);

  // Posts by platform

  const byPlatform = useMemo\(\(\) => \{

    const counts = \{\};

    posts\.forEach\(p => \{

      \(p\.platforms || ''\)\.split\(','\)\.forEach\(pf => \{

        const k = pf\.trim\(\)\.toLowerCase\(\);

        if \(k\) counts\[k\] = \(counts\[k\] || 0\) \+ 1;

      \}\);

    \}\);

    return Object\.entries\(counts\)\.map\(\(\[name, value\]\) => \(\{ name: name\.charAt\(0\)\.toUpperCase\(\) \+ name\.slice\(1\), value, fill: PLATFORM\_COLORS\[name\] || '\#666' \}\)\);

  \}, \[posts\]\);

  // Status breakdown

  const byStatus = useMemo\(\(\) => \{

    const counts = \{\};

    posts\.forEach\(p => \{ counts\[p\.status\] = \(counts\[p\.status\] || 0\) \+ 1; \}\);

    return Object\.entries\(counts\)\.map\(\(\[name, value\]\) => \(\{ name, value, fill: STATUS\_COLORS\[name\] || '\#666' \}\)\);

  \}, \[posts\]\);

  // Reach over time \(last 10 published\)

  const reachOverTime = useMemo\(\(\) => \{

    return published\.slice\(\-10\)\.map\(\(p, i\) => \(\{

      name: p\.title?\.slice\(0, 14\) || \`Post $\{i \+ 1\}\`,

      reach: p\.reach || 0,

      likes: p\.likes || 0,

      leads: p\.leads\_generated || 0,

    \}\)\);

  \}, \[published\]\);

  const totalReach = published\.reduce\(\(s, p\) => s \+ \(p\.reach || 0\), 0\);

  const totalLikes = published\.reduce\(\(s, p\) => s \+ \(p\.likes || 0\), 0\);

  const totalLeads = published\.reduce\(\(s, p\) => s \+ \(p\.leads\_generated || 0\), 0\);

  const avgReach = published\.length ? Math\.round\(totalReach / published\.length\) : 0;

  const engagementRate = totalReach > 0 ? \(\(totalLikes / totalReach\) \* 100\)\.toFixed\(2\) : 0;

  const statBox = \(icon, val, label, color\) => \(

    <div style=\{\{ background: 'rgba\(255,255,255,0\.04\)', borderTop: \`2px solid $\{color\}\`, borderRadius: 12, padding: '16px', textAlign: 'center' \}\}>

      <div style=\{\{ fontSize: 22 \}\}>\{icon\}</div>

      <div style=\{\{ fontSize: 22, fontWeight: 900, color \}\}>\{val\}</div>

      <div style=\{\{ fontSize: 10, color: '\#555', marginTop: 2 \}\}>\{label\}</div>

    </div>

  \);

  const chartBox = \(title, children\) => \(

    <div style=\{\{ background: 'rgba\(255,255,255,0\.03\)', border: '1px solid rgba\(255,255,255,0\.07\)', borderRadius: 14, padding: 20 \}\}>

      <div style=\{\{ fontSize: 12, fontWeight: 800, color: '\#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 \}\}>\{title\}</div>

      \{children\}

    </div>

  \);

  const CustomTooltip = \(\{ active, payload, label \}\) => \{

    if \(\!active || \!payload?\.length\) return null;

    return \(

      <div style=\{\{ background: '\#1a1a2e', border: '1px solid rgba\(255,255,255,0\.1\)', borderRadius: 8, padding: '10px 14px', fontSize: 11 \}\}>

        <div style=\{\{ color: '\#fff', fontWeight: 700, marginBottom: 4 \}\}>\{label\}</div>

        \{payload\.map\(p => <div key=\{p\.name\} style=\{\{ color: p\.color \}\}>\{p\.name\}: \{p\.value\}</div>\)\}

      </div>

    \);

  \};

  return \(

    <div style=\{\{ padding: '24px', maxWidth: 1400, margin: '0 auto' \}\}>

      <div style=\{\{ marginBottom: 24 \}\}>

        <h1 style=\{\{ fontSize: 22, fontWeight: 900, color: '\#fff', margin: 0 \}\}>📈 Analytics</h1>

        <div style=\{\{ fontSize: 12, color: '\#555', marginTop: 4 \}\}>Performance across all platforms · \{published\.length\} published posts</div>

      </div>

      \{/\* KPI Strip \*/\}

      <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(6, 1fr\)', gap: 10, marginBottom: 24 \}\}>

        \{statBox\('✅', published\.length, 'Published', '\#27ae60'\)\}

        \{statBox\('👁', totalReach\.toLocaleString\(\), 'Total Reach', '\#3498db'\)\}

        \{statBox\('❤️', totalLikes\.toLocaleString\(\), 'Total Likes', '\#e74c3c'\)\}

        \{statBox\('🎯', totalLeads, 'Social Leads', '\#f39c12'\)\}

        \{statBox\('📊', \`$\{avgReach\}\`, 'Avg Reach / Post', '\#9b59b6'\)\}

        \{statBox\('⚡', \`$\{engagementRate\}%\`, 'Engagement Rate', '\#1abc9c'\)\}

      </div>

      <div style=\{\{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 \}\}>

        \{/\* Reach over time \*/\}

        \{chartBox\('📊 Reach & Likes Over Last 10 Posts',

          reachOverTime\.length === 0 ? \(

            <div style=\{\{ textAlign: 'center', padding: '40px 0', color: '\#444', fontSize: 12 \}\}>No published posts yet</div>

          \) : \(

            <ResponsiveContainer width="100%" height=\{220\}>

              <LineChart data=\{reachOverTime\}>

                <XAxis dataKey="name" tick=\{\{ fill: '\#555', fontSize: 9 \}\} />

                <YAxis tick=\{\{ fill: '\#555', fontSize: 9 \}\} />

                <Tooltip content=\{<CustomTooltip />\} />

                <Line type="monotone" dataKey="reach" stroke="\#3498db" strokeWidth=\{2\} dot=\{\{ fill: '\#3498db', r: 3 \}\} />

                <Line type="monotone" dataKey="likes" stroke="\#e74c3c" strokeWidth=\{2\} dot=\{\{ fill: '\#e74c3c', r: 3 \}\} />

                <Line type="monotone" dataKey="leads" stroke="\#f39c12" strokeWidth=\{2\} dot=\{\{ fill: '\#f39c12', r: 3 \}\} />

              </LineChart>

            </ResponsiveContainer>

          \)

        \)\}

        \{/\* Posts by platform \*/\}

        \{chartBox\('🌐 Posts by Platform',

          byPlatform\.length === 0 ? \(

            <div style=\{\{ textAlign: 'center', padding: '40px 0', color: '\#444', fontSize: 12 \}\}>No posts yet</div>

          \) : \(

            <div style=\{\{ display: 'flex', alignItems: 'center', gap: 20 \}\}>

              <ResponsiveContainer width="55%" height=\{180\}>

                <PieChart>

                  <Pie data=\{byPlatform\} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius=\{70\} innerRadius=\{35\}>

                    \{byPlatform\.map\(\(entry, i\) => <Cell key=\{i\} fill=\{entry\.fill\} />\)\}

                  </Pie>

                  <Tooltip content=\{<CustomTooltip />\} />

                </PieChart>

              </ResponsiveContainer>

              <div style=\{\{ flex: 1 \}\}>

                \{byPlatform\.map\(p => \(

                  <div key=\{p\.name\} style=\{\{ display: 'flex', justifyContent: 'space\-between', padding: '5px 0', borderBottom: '1px solid rgba\(255,255,255,0\.05\)' \}\}>

                    <span style=\{\{ fontSize: 11, color: p\.fill, fontWeight: 700 \}\}>\{p\.name\}</span>

                    <span style=\{\{ fontSize: 11, color: '\#aaa' \}\}>\{p\.value\} posts</span>

                  </div>

                \)\)\}

              </div>

            </div>

          \)

        \)\}

      </div>

      <div style=\{\{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 \}\}>

        \{/\* Posts by type \*/\}

        \{chartBox\('📝 Posts by Type',

          byType\.length === 0 ? \(

            <div style=\{\{ textAlign: 'center', padding: '40px 0', color: '\#444', fontSize: 12 \}\}>No posts yet</div>

          \) : \(

            <ResponsiveContainer width="100%" height=\{200\}>

              <BarChart data=\{byType\} layout="vertical">

                <XAxis type="number" tick=\{\{ fill: '\#555', fontSize: 9 \}\} />

                <YAxis dataKey="name" type="category" tick=\{\{ fill: '\#aaa', fontSize: 10 \}\} width=\{90\} />

                <Tooltip content=\{<CustomTooltip />\} />

                <Bar dataKey="value" fill="\#e74c3c" radius=\{\[0, 4, 4, 0\]\} />

              </BarChart>

            </ResponsiveContainer>

          \)

        \)\}

        \{/\* Status breakdown \*/\}

        \{chartBox\('🔄 Status Breakdown',

          byStatus\.length === 0 ? \(

            <div style=\{\{ textAlign: 'center', padding: '40px 0', color: '\#444', fontSize: 12 \}\}>No posts yet</div>

          \) : \(

            <div>

              \{byStatus\.map\(s => \(

                <div key=\{s\.name\} style=\{\{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba\(255,255,255,0\.05\)' \}\}>

                  <div style=\{\{ width: 10, height: 10, borderRadius: '50%', background: s\.fill, flexShrink: 0 \}\} />

                  <div style=\{\{ flex: 1, fontSize: 12, color: '\#aaa' \}\}>\{s\.name\}</div>

                  <div style=\{\{ fontSize: 14, fontWeight: 900, color: s\.fill \}\}>\{s\.value\}</div>

                  <div style=\{\{ fontSize: 10, color: '\#555' \}\}>\(\{Math\.round\(s\.value / posts\.length \* 100\)\}%\)</div>

                </div>

              \)\)\}

            </div>

          \)

        \)\}

      </div>

    </div>

  \);

\}
