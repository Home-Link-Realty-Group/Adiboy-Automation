# New Microsoft Word Document (35)

Source: New Microsoft Word Document (35).docx

import React from 'react';

export default function ScoreBar({ value, max = 5, color = '#e63946' }) {

  return (

    <div className="flex items-center gap-2">

      {[1, 2, 3, 4, 5].map((i) => (

        <div

          key={i}

          className={`w-3 h-3 rounded-sm ${i <= value ? 'opacity-100' : 'opacity-30'}`}

          style={{ background: color }}

        />

      ))}

      <span className="text-xs text-slate-400 ml-2">{value || 0}/{max}</span>

    </div>

  );

}
