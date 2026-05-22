# New Microsoft Word Document (36)

Source: New Microsoft Word Document (36).docx

import React from 'react';

const DISTRESS_FLAGS = [

  { key: 'is_pre_foreclosure', label: 'Pre-Foreclosure', icon: '🔴' },

  { key: 'has_tax_lien', label: 'Tax Lien', icon: '🔴' },

  { key: 'has_code_violation', label: 'Code Violation', icon: '🟡' },

  { key: 'is_vacant', label: 'Vacant', icon: '🟠' },

  { key: 'is_absentee', label: 'Absentee Owner', icon: '🟠' },

  { key: 'is_free_and_clear', label: 'Free & Clear', icon: '🟢' },

];

function getStackedCount(lead) {

  let count = 0;

  if (lead.is_pre_foreclosure) count++;

  if (lead.has_tax_lien) count++;

  if (lead.has_code_violation) count++;

  if (lead.is_vacant) count++;

  if (lead.is_absentee) count++;

  if (lead.distress_flags) count += lead.distress_flags.split(',').filter(Boolean).length;

  return Math.min(count, 8);

}

function getScoreColor(score) {

  if (score >= 18) return '#e63946';

  if (score >= 15) return '#f5a623';

  if (score >= 10) return '#3498db';

  return '#aaa';

}

export default function StackedLeadsTab({ leads, onCall }) {

  const stackedLeads = leads

    .filter((l) => (l.stacked_flags_count || getStackedCount(l)) >= 2)

    .sort((a, b) => getStackedCount(b) - getStackedCount(a));

  return (

    <div>

      <h2 className="text-2xl font-black text-slate-900 mb-3 md:text-xl">🔥 Stacked Leads</h2>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-5 text-sm text-slate-700">

        <strong>💡 Stack leads</strong> — absentee + tax delinquent + code violation = maximum motivation and negotiating power.

      </div>

      {stackedLeads.length === 0 ? (

        <div className="text-center py-16 text-slate-400">No stacked leads yet.</div>

      ) : (

        <div className="space-y-3">

          {stackedLeads.map((l) => {

            const count = getStackedCount(l);

            const score = l.motivation_total_score || 0;

            return (

              <div

                key={l.id}

                style={{ borderLeft: `5px solid ${getScoreColor(score)}` }}

                className="bg-white rounded-lg p-4 shadow-sm md:p-3"

              >

                <div className="flex justify-between items-start flex-wrap gap-2">

                  <div className="flex-1">

                    <div className="flex items-center gap-2 flex-wrap mb-2">

                      <span className="font-bold text-sm">{l.name}</span>

                      <span className="text-xs font-bold px-2 py-1 rounded bg-red-500 text-white">

                        {count} STACKED FLAGS

                      </span>

                      <span className="text-xs font-bold px-2 py-1 rounded text-white" style={{ background: getScoreColor(score) }}>

                        {score}/20

                      </span>

                    </div>

                    <div className="text-xs text-slate-600 mb-2">{l.address}, {l.city}</div>

                    <div className="flex flex-wrap gap-2">

                      {DISTRESS_FLAGS.filter((f) => l[f.key]).map((f) => (

                        <span key={f.key} className="text-xs px-2 py-1 rounded bg-red-50 border border-red-200 text-red-700">

                          {f.icon} {f.label}

                        </span>

                      ))}

                    </div>

                  </div>

                  <button

                    onClick={() => onCall?.(l)}

                    className="px-3 py-2 bg-red-500 text-white rounded text-sm font-semibold hover:bg-red-600 md:w-full"

                  >

                    📞 Call

                  </button>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>

  );

}
