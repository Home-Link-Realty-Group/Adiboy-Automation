# New Microsoft Word Document (34)

Source: New Microsoft Word Document (34).docx

import React, { useState, memo } from 'react';

import { Lead } from '@/api/entities';

const SCORE_LABELS = {

  equity: { 5: '50%+ equity', 4: '40-49%', 3: '30-39%', 2: '20-29%', 1: '<20%', 0: 'Unknown' },

  distress: { 5: 'Pre-foreclosure / Tax lien / Bankruptcy', 4: 'Code violation / Probate', 3: 'Divorce / Eviction', 2: 'Absentee / Expired listing', 1: 'None detected', 0: 'Unknown' },

  condition: { 5: 'Vacant / Boarded / Major repairs', 4: 'Needs significant work', 3: 'Cosmetic updates needed', 2: 'Minor updates', 1: 'Good condition', 0: 'Unknown' },

  urgency: { 5: 'Sell in <30 days', 4: '30-60 days', 3: '60-90 days', 2: '90-180 days', 1: 'No urgency / Flexible', 0: 'Unknown' },

};

const DISTRESS_FLAGS = [

  { key: 'is_pre_foreclosure', label: 'Pre-Foreclosure', icon: '🔴', points: 5 },

  { key: 'has_tax_lien', label: 'Tax Lien', icon: '🔴', points: 5 },

  { key: 'has_code_violation', label: 'Code Violation', icon: '🟡', points: 4 },

  { key: 'is_vacant', label: 'Vacant', icon: '🟠', points: 4 },

  { key: 'is_absentee', label: 'Absentee Owner', icon: '🟠', points: 3 },

  { key: 'is_free_and_clear', label: 'Free & Clear', icon: '🟢', points: 2 },

];

const getScoreColor = (score) => {

  if (score >= 18) return 'border-red-500 bg-red-500/10';

  if (score >= 15) return 'border-amber-400 bg-amber-400/10';

  if (score >= 10) return 'border-blue-400 bg-blue-400/10';

  return 'border-slate-400 bg-slate-400/10';

};

const getScoreLabel = (score) => {

  if (score >= 18) return '🔥 MUST PURSUE';

  if (score >= 15) return '✅ HIGH PRIORITY';

  if (score >= 10) return '📋 MONITOR';

  if (score > 0) return '❄️ LOW';

  return '⬜ UNSCORED';

};

function MotivationScoreCard({ lead, onUpdate }) {

  const [editing, setEditing] = useState(false);

  const [scores, setScores] = useState({

    score_equity: lead.score_equity || 0,

    score_distress: lead.score_distress || 0,

    score_condition: lead.score_condition || 0,

    score_urgency: lead.score_urgency || 0,

  });

  const [flags, setFlags] = useState({

    is_pre_foreclosure: lead.is_pre_foreclosure || false,

    has_tax_lien: lead.has_tax_lien || false,

    has_code_violation: lead.has_code_violation || false,

    is_vacant: lead.is_vacant || false,

    is_absentee: lead.is_absentee || false,

    is_free_and_clear: lead.is_free_and_clear || false,

  });

  const [error, setError] = useState(null);

  const [saving, setSaving] = useState(false);

  const total = scores.score_equity + scores.score_distress + scores.score_condition + scores.score_urgency;

  const stackedCount = Object.values(flags).filter(Boolean).length;

  async function save() {

    try {

      setSaving(true);

      setError(null);

      const distressFlagsList = DISTRESS_FLAGS.reduce((acc, f) => {

        if (flags[f.key]) acc.push(f.key);

        return acc;

      }, []);

      await Lead.update(lead.id, {

        ...scores,

        ...flags,

        motivation_total_score: total,

        stacked_flags_count: stackedCount,

        distress_flags: distressFlagsList.join(','),

        priority: total >= 15 ? 'High' : total >= 10 ? 'Medium' : 'Low',

      });

      setEditing(false);

      onUpdate?.();

    } catch (e) {

      setError('Failed to save score: ' + e.message);

      console.error('Save score error:', e);

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className={`border-2 rounded-lg p-5 mb-4 ${getScoreColor(total)}`}>

      <div className="flex justify-between items-start mb-4">

        <div>

          <div className="text-xs font-bold text-slate-300 mb-1">MOTIVATION SCORE</div>

          <div className="flex items-center gap-3">

            <span className="text-4xl font-black" style={{ color: total >= 18 ? '#e63946' : total >= 15 ? '#f5a623' : '#3498db' }}>

              {total}

            </span>

            <span className="text-xs text-slate-400">/20</span>

            <span className="text-xs font-bold px-3 py-1 rounded-full bg-opacity-20" style={{ background: total >= 18 ? '#e63946' : total >= 15 ? '#f5a623' : '#3498db' }}>

              {getScoreLabel(total)}

            </span>

          </div>

          <div className="text-xs text-slate-400 mt-1">Rule: Score 15+</div>

        </div>

        {stackedCount >= 2 && (

          <div className="text-center bg-red-500/20 border border-red-500 rounded-lg p-2">

            <div className="text-2xl font-black text-red-400">{stackedCount}</div>

            <div className="text-xs font-bold text-red-400">STACKED FLAGS</div>

            <div className="text-xs text-slate-400">HIGHEST PRIORITY</div>

          </div>

        )}

      </div>

      {/* Score inputs */}

      <div className="space-y-2 mb-4">

        {[

          { key: 'score_equity', label: '💰 Equity', cat: 'equity' },

          { key: 'score_distress', label: '⚠️ Distress', cat: 'distress' },

          { key: 'score_condition', label: '🏚️ Condition', cat: 'condition' },

          { key: 'score_urgency', label: '⏰ Urgency', cat: 'urgency' },

        ].map(({ key, label, cat }) => (

          <div key={key}>

            <div className="flex justify-between items-center mb-1">

              <span className="text-sm font-semibold">{label}</span>

              {editing ? (

                <div className="flex gap-2">

                  {[1, 2, 3, 4, 5].map((v) => (

                    <button

                      key={v}

                      onClick={() => setScores((s) => ({ ...s, [key]: v }))}

                      className={`w-6 h-6 rounded text-xs font-bold ${

                        scores[key] >= v ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-600'

                      }`}

                    >

                      {v}

                    </button>

                  ))}

                </div>

              ) : (

                <div className="flex gap-1">

                  {[1, 2, 3, 4, 5].map((i) => (

                    <div

                      key={i}

                      className={`w-2 h-2 rounded-sm ${

                        i <= scores[key]

                          ? scores[key] >= 4

                            ? 'bg-red-500'

                            : scores[key] >= 3

                            ? 'bg-amber-400'

                            : 'bg-blue-400'

                          : 'bg-slate-300'

                      }`}

                    />

                  ))}

                  <span className="text-xs text-slate-400 ml-2">{scores[key] || 0}/5</span>

                </div>

              )}

            </div>

            <div className="text-xs text-slate-400">{SCORE_LABELS[cat][scores[key]] || 'Not set'}</div>

          </div>

        ))}

      </div>

      {/* Distress flags */}

      <div className="border-t border-slate-300 pt-3 mb-4">

        <div className="text-xs font-bold mb-2">DISTRESS FLAGS</div>

        <div className="flex flex-wrap gap-2">

          {DISTRESS_FLAGS.map((f) => (

            <button

              key={f.key}

              onClick={() => editing && setFlags((fl) => ({ ...fl, [f.key]: !fl[f.key] }))}

              className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${

                flags[f.key]

                  ? 'bg-red-500/20 border border-red-500 text-red-400'

                  : 'bg-slate-300/20 border border-slate-300 text-slate-500'

              }`}

            >

              {f.icon} {f.label}

            </button>

          ))}

        </div>

      </div>

      {error && <div className="text-sm text-red-400 mb-3">{error}</div>}

      <div className="flex gap-2">

        {editing ? (

          <>

            <button

              onClick={save}

              disabled={saving}

              className="px-4 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 disabled:opacity-50"

            >

              {saving ? 'Saving...' : 'Save Score'}

            </button>

            <button

              onClick={() => setEditing(false)}

              className="px-4 py-2 bg-slate-600 text-white rounded font-semibold hover:bg-slate-700"

            >

              Cancel

            </button>

          </>

        ) : (

          <button

            onClick={() => setEditing(true)}

            className="px-4 py-2 bg-slate-600 text-white rounded font-semibold hover:bg-slate-700"

          >

            ✏️ Edit Score

          </button>

        )}

      </div>

    </div>

  );

}

export default memo(MotivationScoreCard);
