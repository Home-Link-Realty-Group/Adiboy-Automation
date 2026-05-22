# New Microsoft Word Document (25)

Source: New Microsoft Word Document (25).docx

import React, \{ memo \} from 'react';

import \{ base44 \} from '@/api/base44Client';

function CRMDashboardComponent\(\{ leads, deals, followUps, onCall \}\) \{

  const today = new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\];

  const activeLeads = leads\.filter\(\(l\) => \!\['Dead', 'Closed', 'Inactive'\]\.includes\(l\.status\)\);

  const highPriority = leads\.filter\(\(l\) => \(l\.motivation\_total\_score || 0\) >= 15 && \!\['Dead', 'Closed'\]\.includes\(l\.status\)\);

  const mustPursue = leads\.filter\(\(l\) => \(l\.motivation\_total\_score || 0\) >= 18\);

  const todayFU = followUps\.filter\(\(f\) => f\.scheduled\_date === today && f\.status === 'Scheduled'\);

  const overdueFU = followUps\.filter\(\(f\) => f\.scheduled\_date < today && f\.status === 'Scheduled'\);

  const totalRevenue = deals\.filter\(\(d\) => d\.status === 'Closed'\)\.reduce\(\(s, d\) => s \+ \(d\.assignment\_fee || 0\), 0\);

  const stats = \[

    \{ label: 'Total Leads', value: leads\.length, icon: '👥', color: 'border\-blue\-500', text: 'text\-blue\-500' \},

    \{ label: 'Active Pipeline', value: activeLeads\.length, icon: '🔄', color: 'border\-amber\-500', text: 'text\-amber\-500' \},

    \{ label: 'Score 15\+', value: highPriority\.length, icon: '✅', color: 'border\-green\-500', text: 'text\-green\-500' \},

    \{ label: 'Score 18\+ \(Must\)', value: mustPursue\.length, icon: '🔥', color: 'border\-red\-500', text: 'text\-red\-500' \},

    \{ label: 'Under Contract', value: leads\.filter\(\(l\) => l\.status === 'Under Contract'\)\.length, icon: '📝', color: 'border\-teal\-500', text: 'text\-teal\-500' \},

    \{ label: 'Revenue', value: '$' \+ totalRevenue\.toLocaleString\(\), icon: '💰', color: 'border\-emerald\-500', text: 'text\-emerald\-500' \},

  \];

  return \(

    <div className="space\-y\-6">

      <h2 className="text\-2xl font\-black text\-slate\-900 md:text\-xl">📊 Dashboard</h2>

      \{/\* Stats grid \*/\}

      <div className="grid grid\-cols\-3 gap\-3 md:grid\-cols\-2 sm:grid\-cols\-1">

        \{stats\.map\(\(stat\) => \(

          <div key=\{stat\.label\} className=\{\`bg\-white rounded\-lg p\-4 shadow\-sm border\-t\-4 $\{stat\.color\} md:p\-3\`\}>

            <div className="text\-2xl">\{stat\.icon\}</div>

            <div className=\{\`text\-2xl font\-black mt\-2 $\{stat\.text\} md:text\-xl\`\}>\{stat\.value\}</div>

            <div className="text\-xs text\-slate\-500">\{stat\.label\}</div>

          </div>

        \)\)\}

      </div>

      \{/\* Must pursue \*/\}

      \{mustPursue\.length > 0 && \(

        <div className="bg\-red\-50 border\-2 border\-red\-500 rounded\-lg p\-4">

          <div className="text\-sm font\-bold text\-red\-600 mb\-3">

            🔥 MUST PURSUE TODAY — Score 18\+ \(\{mustPursue\.length\}\)

          </div>

          <div className="space\-y\-3">

            \{mustPursue\.slice\(0, 5\)\.map\(\(l\) => \(

              <div key=\{l\.id\} className="flex justify\-between items\-center">

                <div>

                  <div className="text\-sm font\-bold">\{l\.name\}</div>

                  <div className="text\-xs text\-slate\-500">\{l\.address\}, \{l\.city\}</div>

                </div>

                <div className="flex items\-center gap\-3">

                  <span className="text\-sm font\-black px\-3 py\-1 rounded\-full bg\-red\-500 text\-white">

                    \{l\.motivation\_total\_score\}/20

                  </span>

                  <button

                    onClick=\{\(\) => onCall?\.\(l\)\}

                    className="px\-3 py\-1 bg\-red\-500 text\-white rounded text\-sm font\-semibold hover:bg\-red\-600"

                  >

                    📞 Call

                  </button>

                </div>

              </div>

            \)\)\}

          </div>

        </div>

      \)\}

      \{/\* Follow\-ups due \*/\}

      \{\(todayFU\.length \+ overdueFU\.length\) > 0 && \(

        <div className="bg\-white rounded\-lg p\-4 shadow\-sm">

          <div className="text\-sm font\-bold mb\-3">

            📅 Follow\-Ups Due \(\{todayFU\.length \+ overdueFU\.length\}\)

          </div>

          <div className="space\-y\-2">

            \{\[\.\.\.overdueFU, \.\.\.todayFU\]\.slice\(0, 6\)\.map\(\(f\) => \(

              <div key=\{f\.id\} className="flex justify\-between text\-sm">

                <span>

                  <span className="font\-semibold">\{f\.lead\_name\}</span>

                  <span className="text\-slate\-500"> — Touch \#\{f\.touch\_number\}</span>

                </span>

                <span className=\{\`text\-xs font\-bold $\{f\.scheduled\_date < today ? 'text\-red\-500' : 'text\-green\-600'\}\`\}>

                  \{f\.scheduled\_date < today ? '⚠️ OVERDUE' : 'Today'\}

                </span>

              </div>

            \)\)\}

          </div>

        </div>

      \)\}

    </div>

  \);

\}

export default memo\(CRMDashboardComponent\);
