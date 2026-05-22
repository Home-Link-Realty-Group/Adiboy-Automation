# New Microsoft Word Document (66)

Source: New Microsoft Word Document (66).docx

import \{ useState, useEffect \} from 'react';

export default function HQLiveTicker\(\{ leads, followUps, deals \}\) \{

  const \[items, setItems\] = useState\(\[\]\);

  const \[offset, setOffset\] = useState\(0\);

  useEffect\(\(\) => \{

    const events = \[\];

    const today = new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\];

    const newLeads = leads\.filter\(l => \{

      const d = l\.created\_date?\.split\('T'\)\[0\];

      return d === today;

    \}\);

    newLeads\.forEach\(l => events\.push\(\{ icon: '🔥', text: \`NEW LEAD: $\{l\.name || 'Unknown'\} — $\{l\.city || ''\}\`, color: '\#e74c3c' \}\)\);

    const hotLeads = leads\.filter\(l => l\.priority === 'Hot'\);

    hotLeads\.forEach\(l => events\.push\(\{ icon: '⚡', text: \`HOT: $\{l\.name\} — Score $\{l\.motivation\_total\_score || '?'\}/20\`, color: '\#f39c12' \}\)\);

    const overdue = followUps\.filter\(f => f\.scheduled\_date < today && f\.status === 'Scheduled'\);

    if \(overdue\.length > 0\) events\.push\(\{ icon: '🚨', text: \`$\{overdue\.length\} OVERDUE FOLLOW\-UPS — ACT NOW\`, color: '\#e74c3c' \}\);

    const todayFU = followUps\.filter\(f => f\.scheduled\_date === today && f\.status === 'Scheduled'\);

    if \(todayFU\.length > 0\) events\.push\(\{ icon: '📞', text: \`$\{todayFU\.length\} FOLLOW\-UPS DUE TODAY\`, color: '\#3498db' \}\);

    const closedDeals = deals\.filter\(d => d\.status === 'Closed'\);

    closedDeals\.forEach\(d => events\.push\(\{ icon: '💰', text: \`CLOSED: $\{d\.property\_address\} — $$\{\(d\.assignment\_fee || 0\)\.toLocaleString\(\)\} PROFIT\`, color: '\#27ae60' \}\)\);

    const underContract = deals\.filter\(d => d\.status === 'Under Contract'\);

    underContract\.forEach\(d => events\.push\(\{ icon: '📝', text: \`UNDER CONTRACT: $\{d\.property\_address\}\`, color: '\#9b59b6' \}\)\);

    if \(events\.length === 0\) \{

      events\.push\(\{ icon: '🎯', text: 'SYSTEM ONLINE — Home\-Link HQ v5\.0 ACTIVE', color: '\#27ae60' \}\);

      events\.push\(\{ icon: '💪', text: 'GET AFTER IT — Every call is money in the bank', color: '\#e74c3c' \}\);

      events\.push\(\{ icon: '🏠', text: 'MISSION: 60 dials, 3\.5hrs talk time, 3 offers TODAY', color: '\#f39c12' \}\);

    \}

    setItems\(\[\.\.\.events, \.\.\.events, \.\.\.events\]\);

  \}, \[leads, followUps, deals\]\);

  useEffect\(\(\) => \{

    if \(items\.length === 0\) return;

    const interval = setInterval\(\(\) => \{

      setOffset\(prev => prev \- 1\);

    \}, 30\);

    return \(\) => clearInterval\(interval\);

  \}, \[items\]\);

  const totalWidth = items\.length \* 340;

  const wrappedOffset = \(\(offset % totalWidth\) \+ totalWidth\) % totalWidth;

  return \(

    <div style=\{\{

      background: 'linear\-gradient\(90deg, \#0a0a0a, \#1a0a0a, \#0a0a0a\)',

      borderTop: '1px solid rgba\(231,76,60,0\.4\)',

      borderBottom: '2px solid rgba\(231,76,60,0\.4\)',

      padding: '8px 0',

      overflow: 'hidden',

      position: 'relative',

      height: 36,

    \}\}>

      <div style=\{\{

        display: 'flex',

        gap: 0,

        position: 'absolute',

        whiteSpace: 'nowrap',

        transform: \`translateX\(\-$\{wrappedOffset\}px\)\`,

        willChange: 'transform',

      \}\}>

        \{items\.map\(\(item, i\) => \(

          <span key=\{i\} style=\{\{

            display: 'inline\-flex', alignItems: 'center', gap: 8,

            padding: '0 32px', fontSize: 12, fontWeight: 700,

            color: item\.color, letterSpacing: 0\.5,

          \}\}>

            <span>\{item\.icon\}</span>

            <span>\{item\.text\}</span>

            <span style=\{\{ color: 'rgba\(255,255,255,0\.15\)', margin: '0 8px' \}\}>◆</span>

          </span>

        \)\)\}

      </div>

    </div>

  \);

\}
