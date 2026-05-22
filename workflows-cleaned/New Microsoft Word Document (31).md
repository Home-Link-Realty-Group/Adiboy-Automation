# New Microsoft Word Document (31)

Source: New Microsoft Word Document (31).docx

import React, { useState } from 'react';

import { DailyKPI } from '@/api/entities';

export default function KPITab({ todayKPI, kpiEdit, setKpiEdit, onRefresh }) {

  const today = new Date().toISOString().split('T')[0];

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false);

  async function saveKPI() {

    try {

      setSaving(true);

      setError(null);

      setSuccess(false);

      if (todayKPI) {

        await DailyKPI.update(todayKPI.id, { ...kpiEdit });

      } else {

        await DailyKPI.create({ date: today, goal_calls: 60, goal_talk_time: 3, goal_offers: 3, ...kpiEdit });

      }

      setSuccess(true);

      onRefresh?.();

      setTimeout(() => setSuccess(false), 3000);

    } catch (e) {

      setError('Failed to save KPIs: ' + e.message);

      console.error('KPI save error:', e);

    } finally {

      setSaving(false);

    }

  }

  return (

    <div>

      <h2 className="text-2xl font-black text-slate-900 mb-5 md:text-xl">📈 Daily KPIs</h2>

      <div className="bg-white rounded-lg p-6 shadow-sm max-w-sm md:max-w-full md:p-4">

        <div className="text-sm font-bold mb-4 text-slate-700">Today — {today}</div>

        <div className="space-y-4">

          {[

            ['calls_made', '📞 Calls Made', 'goal_calls', 60],

            ['talk_time_hours', '⏱ Talk Time (hrs)', 'goal_talk_time', 3],

            ['offers_made', '💼 Offers Made', 'goal_offers', 3],

            ['followups_completed', '✅ Follow-Ups Done', null, null],

          ].map(([k, label, goal, goalDefault]) => (

            <div key={k}>

              <label className="text-sm font-semibold text-slate-700 block mb-2">{label}</label>

              <div className="flex items-center gap-3">

                <input

                  type="number"

                  min={0}

                  value={kpiEdit[k] || 0}

                  onChange={(e) => setKpiEdit((p) => ({ ...p, [k]: +e.target.value }))}

                  className="w-20 px-3 py-2 border border-slate-300 rounded text-base font-bold"

                />

                {goal && (

                  <span className="text-sm text-slate-500">

                    Goal: {todayKPI?.[goal] || goalDefault}

                  </span>

                )}

              </div>

            </div>

          ))}

        </div>

        {error && <div className="text-red-500 text-sm mt-3">{error}</div>}

        {success && <div className="text-green-600 text-sm mt-3">✅ KPIs saved!</div>}

        <button

          onClick={saveKPI}

          disabled={saving}

          className="mt-5 px-6 py-2 bg-red-500 text-white rounded font-bold hover:bg-red-600 disabled:opacity-50 w-full md:text-sm"

        >

          {saving ? 'Saving...' : 'Save KPIs'}

        </button>

      </div>

    </div>

  );

}
