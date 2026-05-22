# New Microsoft Word Document (62)

Source: New Microsoft Word Document (62).docx

import React from 'react';

export default function HQHeader\(\{ time \}\) \{

  return \(

    <div className="bg\-white/5 border\-b border\-white/10 px\-6 py\-3 flex justify\-between items\-center">

      <div className="flex items\-center gap\-3">

        <div className="w\-9 h\-9 rounded\-full bg\-gradient\-to\-br from\-red\-500 to\-red\-700 flex items\-center justify\-center text\-lg font\-black text\-white">

          H

        </div>

        <div>

          <div className="text\-lg font\-black tracking\-widest">HOME\-LINK HQ</div>

          <div className="text\-xs text\-white/40 tracking\-wide">REALTY GROUP LLC — COMMAND CENTER</div>

        </div>

      </div>

      <div className="text\-right hidden sm:block">

        <div className="text\-xl font\-black font\-mono text\-red\-400">

          \{time\.toLocaleTimeString\('en\-US', \{ hour: '2\-digit', minute: '2\-digit', second: '2\-digit' \}\)\}

        </div>

        <div className="text\-xs text\-white/40">

          \{time\.toLocaleDateString\('en\-US', \{ weekday: 'long', month: 'long', day: 'numeric' \}\)\}

        </div>

      </div>

    </div>

  \);

\}
