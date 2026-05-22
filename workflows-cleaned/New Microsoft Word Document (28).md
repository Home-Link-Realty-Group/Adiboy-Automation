# New Microsoft Word Document (28)

Source: New Microsoft Word Document (28).docx

import React from 'react';

function FURow({ f, overdue }) {

  return (

    <div className="flex justify-between items-center py-3 border-b border-slate-100">

      <div>

        <div className="text-sm font-semibold">{f.lead_name}</div>

        <div className="text-xs text-slate-500">Touch #{f.touch_number} • {f.method}</div>

      </div>

      <span className={`text-xs font-bold ${overdue ? 'text-red-500' : 'text-green-600'}`}>

        {overdue ? `⚠️ ${f.scheduled_date}` : 'Today'}

      </span>

    </div>

  );

}

export default function FollowUpsTab({ followUps }) {

  const today = new Date().toISOString().split('T')[0];

  const todayFU = followUps.filter((f) => f.scheduled_date === today && f.status === 'Scheduled');

  const overdueFU = followUps.filter((f) => f.scheduled_date < today && f.status === 'Scheduled');

  return (

    <div className="space-y-4">

      <h2 className="text-2xl font-black text-slate-900 md:text-xl">📅 Follow-Ups</h2>

      {overdueFU.length > 0 && (

        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">

          <div className="text-sm font-bold text-red-600 mb-3">⚠️ OVERDUE ({overdueFU.length})</div>

          {overdueFU.map((f) => <FURow key={f.id} f={f} overdue />)}

        </div>

      )}

      <div className="bg-white rounded-lg p-4 shadow-sm">

        <div className="text-sm font-bold mb-3">Today ({todayFU.length})</div>

        {todayFU.length === 0 ? (

          <div className="text-sm text-slate-500">All clear — no follow-ups scheduled.</div>

        ) : (

          todayFU.map((f) => <FURow key={f.id} f={f} />)

        )}

      </div>

    </div>

  );

}
