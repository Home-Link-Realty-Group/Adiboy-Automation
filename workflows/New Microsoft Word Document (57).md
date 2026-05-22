# New Microsoft Word Document (57)

Source: New Microsoft Word Document (57).docx

import React, \{ memo \} from 'react';

const DAILY\_GOALS = \{ calls: 50, contacts: 15, offers: 3 \};

function HQCallTracker\(\{ callCount, contactCount, offerCount, streak, dayComplete, onIncrement, onReset \}\) \{

  const counters = \[

    \{ label: 'Calls Made', count: callCount, goal: DAILY\_GOALS\.calls, pct: Math\.min\(\(callCount / DAILY\_GOALS\.calls\) \* 100, 100\), color: 'text\-red\-400', bg: 'border\-red\-400/25', icon: '📞', key: 'calls' \},

    \{ label: 'Contacts Reached', count: contactCount, goal: DAILY\_GOALS\.contacts, pct: Math\.min\(\(contactCount / DAILY\_GOALS\.contacts\) \* 100, 100\), color: 'text\-amber\-400', bg: 'border\-amber\-400/25', icon: '🤝', key: 'contacts' \},

    \{ label: 'Offers Made', count: offerCount, goal: DAILY\_GOALS\.offers, pct: Math\.min\(\(offerCount / DAILY\_GOALS\.offers\) \* 100, 100\), color: 'text\-green\-400', bg: 'border\-green\-400/25', icon: '💼', key: 'offers' \},

  \];

  return \(

    <div className="bg\-white/5 border border\-red\-500/30 rounded\-xl p\-5 mb\-5">

      <div className="flex flex\-wrap justify\-between items\-center mb\-5 gap\-3">

        <div>

          <h2 className="text\-lg font\-black">⚡ TODAY'S CALL TRACKER</h2>

          <p className="text\-sm text\-white/40 mt\-1">Hit your numbers\. Every single day\.</p>

        </div>

        <div className="flex flex\-wrap items\-center gap\-2">

          \{streak > 0 && \(

            <span className="px\-3 py\-1 bg\-gradient\-to\-r from\-amber\-500 to\-orange\-500 rounded\-full text\-sm font\-bold">

              🔥 \{streak\} Day Streak

            </span>

          \)\}

          \{dayComplete && \(

            <span className="px\-3 py\-1 bg\-gradient\-to\-r from\-green\-500 to\-teal\-500 rounded\-full text\-sm font\-bold">

              ✅ DAY COMPLETE\!

            </span>

          \)\}

          <button

            onClick=\{onReset\}

            className="px\-3 py\-1 bg\-white/10 border border\-white/15 text\-white/60 rounded text\-xs hover:bg\-white/15"

          >

            Reset

          </button>

        </div>

      </div>

      <div className="grid grid\-cols\-3 gap\-3 mb\-4 sm:grid\-cols\-1">

        \{counters\.map\(\(item\) => \(

          <div key=\{item\.key\} className=\{\`bg\-black/30 rounded\-xl p\-4 text\-center border $\{item\.bg\}\`\}>

            <div className="text\-xl">\{item\.icon\}</div>

            <div className=\{\`text\-3xl font\-black mt\-2 $\{item\.color\}\`\}>

              \{item\.count\}<span className="text\-sm text\-white/30">/\{item\.goal\}</span>

            </div>

            <div className="text\-xs text\-white/40 mb\-3">\{item\.label\}</div>

            <div className="h\-1\.5 bg\-white/10 rounded\-full overflow\-hidden mb\-4">

              <div

                className="h\-full rounded\-full transition\-all duration\-500"

                style=\{\{ width: \`$\{item\.pct\}%\`, background: item\.key === 'calls' ? '\#e74c3c' : item\.key === 'contacts' ? '\#f39c12' : '\#27ae60' \}\}

              />

            </div>

            <button

              onClick=\{\(\) => onIncrement\(item\.key\)\}

              className="w\-full py\-2 rounded\-lg text\-sm font\-bold text\-white border\-none cursor\-pointer"

              style=\{\{ background: item\.key === 'calls' ? '\#e74c3c' : item\.key === 'contacts' ? '\#f39c12' : '\#27ae60' \}\}

            >

              \+ LOG ONE

            </button>

          </div>

        \)\)\}

      </div>

      <div className="bg\-red\-500/10 border border\-red\-500/25 rounded\-lg p\-3">

        <div className="text\-xs font\-bold text\-red\-400 mb\-2">⚡ QUICK LINKS</div>

        <div className="flex flex\-wrap gap\-2">

          <a href="tel:\+18558101786" className="px\-3 py\-2 rounded\-lg bg\-gradient\-to\-r from\-red\-500 to\-red\-700 text\-white text\-xs font\-bold no\-underline">📞 \(855\) 810\-1786</a>

          <a href="/CRM" className="px\-3 py\-2 rounded\-lg bg\-blue\-500/20 text\-blue\-400 text\-xs font\-bold no\-underline">👥 CRM</a>

          <a href="/CallLists" className="px\-3 py\-2 rounded\-lg bg\-red\-500/20 text\-red\-400 text\-xs font\-bold no\-underline">📋 Call Lists</a>

          <a href="/LeadImport" className="px\-3 py\-2 rounded\-lg bg\-purple\-500/20 text\-purple\-400 text\-xs font\-bold no\-underline">📥 Import</a>

          <a href="/AutomationCenter" className="px\-3 py\-2 rounded\-lg bg\-teal\-500/20 text\-teal\-400 text\-xs font\-bold no\-underline">⚡ Automations</a>

        </div>

      </div>

    </div>

  \);

\}

export default memo\(HQCallTracker\);
