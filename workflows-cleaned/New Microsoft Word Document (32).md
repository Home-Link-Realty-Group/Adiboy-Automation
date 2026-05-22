# New Microsoft Word Document (32)

Source: New Microsoft Word Document (32).docx

import React, { useState, useMemo, memo } from 'react';

import { Lead } from '@/api/entities';

import MotivationScoreCard from './MotivationScoreCard';

const STATUSES = ['New Lead', 'Attempted Contact', 'Contacted', 'Offer Made', 'Negotiating', 'Under Contract', 'Closed', 'Dead', 'Inactive', 'Responded'];

const STATUS_COLORS = {

  'New Lead': '#3498db', 'Attempted Contact': '#e67e22', 'Contacted': '#9b59b6',

  'Offer Made': '#f39c12', 'Negotiating': '#e74c3c', 'Under Contract': '#27ae60',

  'Dead': '#95a5a6', 'Closed': '#1a1a2e', 'Inactive': '#bbb', 'Responded': '#16a085'

};

function LeadPipelineComponent({ leads, onLeadUpdate, onCall }) {

  const [selectedLead, setSelectedLead] = useState(null);

  const [showAddLead, setShowAddLead] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [filterScore, setFilterScore] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');

  const [newLead, setNewLead] = useState({

    name: '', phone: '', email: '', address: '', city: '', state: 'TX',

    status: 'New Lead', source: 'Manual', priority: 'Medium', touch_count: 0

  });

  const [error, setError] = useState(null);

  const [saving, setSaving] = useState(false);

  async function addLead() {

    try {

      setSaving(true);

      setError(null);

      if (!newLead.name || !newLead.phone) {

        setError('Name and phone are required');

        return;

      }

      const next = new Date();

      next.setDate(next.getDate() + 1);

      await Lead.create({

        ...newLead,

        touch_count: 0,

        last_contact_date: new Date().toISOString().split('T')[0],

        next_followup_date: next.toISOString().split('T')[0],

      });

      setShowAddLead(false);

      setNewLead({ name: '', phone: '', email: '', address: '', city: '', state: 'TX', status: 'New Lead', source: 'Manual', priority: 'Medium', touch_count: 0 });

      onLeadUpdate?.();

    } catch (e) {

      setError('Failed to add lead: ' + e.message);

      console.error('Add lead error:', e);

    } finally {

      setSaving(false);

    }

  }

  const filteredLeads = useMemo(() => {

    return leads.filter((l) => {

      const q = searchQuery.toLowerCase();

      const matchSearch = !q || (l.name || '').toLowerCase().includes(q) || (l.phone || '').includes(q);

      const score = l.motivation_total_score || 0;

      const matchScore = filterScore === 'all' || (filterScore === 'must' && score >= 18) || (filterScore === 'high' && score >= 15 && score < 18) || (filterScore === 'monitor' && score >= 10 && score < 15);

      const matchStatus = filterStatus === 'all' || l.status === filterStatus;

      return matchSearch && matchScore && matchStatus;

    }).sort((a, b) => (b.motivation_total_score || 0) - (a.motivation_total_score || 0));

  }, [leads, searchQuery, filterScore, filterStatus]);

  return (

    <div>

      <div className="flex justify-between items-center mb-5 md:flex-col md:gap-3">

        <h2 className="text-2xl font-black md:text-xl">👥 Lead Pipeline</h2>

        <button

          onClick={() => setShowAddLead(true)}

          className="px-4 py-2 bg-red-500 text-white rounded font-bold hover:bg-red-600"

        >

          + Add Lead

        </button>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-lg p-4 mb-4 space-y-3 md:space-y-2">

        <input

          value={searchQuery}

          onChange={(e) => setSearchQuery(e.target.value)}

          placeholder="🔍 Search name, phone, address..."

          className="w-full px-3 py-2 border border-slate-300 rounded text-sm md:text-xs"

        />

        <div className="grid grid-cols-4 gap-3 md:grid-cols-2">

          <select value={filterScore} onChange={(e) => setFilterScore(e.target.value)} className="px-3 py-2 border border-slate-300 rounded text-sm md:text-xs">

            <option value="all">All Scores</option>

            <option value="must">🔥 Score 18+</option>

            <option value="high">✅ Score 15+</option>

            <option value="monitor">📋 Score 10-14</option>

          </select>

          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-300 rounded text-sm md:text-xs">

            <option value="all">All Status</option>

            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}

          </select>

          <span className="text-sm md:text-xs text-slate-600 col-span-2 md:col-span-2">{filteredLeads.length} leads</span>

        </div>

      </div>

      {/* Lead cards */}

      <div className="space-y-3">

        {filteredLeads.map((lead) => {

          const score = lead.motivation_total_score || 0;

          const scoreColor = score >= 18 ? '#e63946' : score >= 15 ? '#f5a623' : score >= 10 ? '#3498db' : '#aaa';

          return (

            <div key={lead.id} className="space-y-2">

              <div

                onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}

                style={{ borderLeft: `5px solid ${scoreColor}` }}

                className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition md:p-3"

              >

                <div className="flex justify-between items-start flex-wrap gap-2">

                  <div className="flex-1">

                    <div className="flex items-center gap-2 flex-wrap mb-2">

                      <span className="font-bold text-sm">{lead.name}</span>

                      {score > 0 && <span className="text-xs font-bold px-2 py-1 rounded bg-slate-200" style={{ color: scoreColor }}>{score}/20</span>}

                      <span className="text-xs font-bold px-2 py-1 rounded text-white" style={{ background: STATUS_COLORS[lead.status] || '#aaa' }}>{lead.status}</span>

                      {lead.is_vacant && <span className="text-xs font-bold px-2 py-1 rounded bg-orange-100 text-orange-700">🏚️ VACANT</span>}

                    </div>

                    <div className="text-xs text-slate-600">{lead.address}, {lead.city}</div>

                    <div className="flex items-center gap-3 mt-1 flex-wrap">

                      <span className="text-xs text-slate-500">{lead.source} • Touch #{lead.touch_count || 0}</span>

                      {lead.phone

                        ? <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded px-2 py-0.5">📞 {lead.phone}</span>

                        : <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded px-2 py-0.5">⚠️ No Phone</span>

                      }

                    </div>

                  </div>

                  <div className="flex gap-2 md:gap-1 md:flex-col md:w-full">

                    <button

                      onClick={(e) => { e.stopPropagation(); onCall?.(lead); }}

                      className="px-3 py-2 bg-red-500 text-white rounded text-sm font-semibold hover:bg-red-600 md:w-full md:py-1 md:text-xs"

                    >

                      📞 Call

                    </button>

                  </div>

                </div>

              </div>

              {/* Expanded details */}

              {selectedLead?.id === lead.id && (

                <div className="bg-slate-50 rounded-lg p-4 space-y-4 md:p-3 md:space-y-3">

                  <div className="grid grid-cols-2 gap-4 md:gap-2">

                    <div>

                      <div className="text-xs font-bold text-slate-600 mb-2">LEAD DETAILS</div>

                      {[

                        ['Phone', lead.phone],

                        ['Email', lead.email],

                        ['ARV', lead.arv_estimate ? '$' + lead.arv_estimate.toLocaleString() : '—'],

                        ['Equity', lead.equity_percent ? lead.equity_percent + '%' : '—'],

                      ].map(([k, v]) => v && v !== '—' ? (

                        <div key={k} className="flex gap-2 mb-2 text-xs">

                          <span className="text-slate-500 font-semibold">{k}:</span>

                          <span className="text-slate-700">{v}</span>

                        </div>

                      ) : null)}

                    </div>

                    <MotivationScoreCard lead={lead} onUpdate={onLeadUpdate} />

                  </div>

                </div>

              )}

            </div>

          );

        })}

      </div>

      {/* Add Lead Modal */}

      {showAddLead && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-96 overflow-y-auto">

            <h3 className="text-lg font-bold mb-4">+ Add New Lead</h3>

            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

            <div className="space-y-3">

              {[['name', 'Name'], ['phone', 'Phone'], ['email', 'Email'], ['address', 'Address'], ['city', 'City']].map(([k, l]) => (

                <div key={k}>

                  <label className="text-xs text-slate-600 block mb-1">{l}</label>

                  <input

                    value={newLead[k] || ''}

                    onChange={(e) => setNewLead((p) => ({ ...p, [k]: e.target.value }))}

                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm"

                  />

                </div>

              ))}

              <div className="flex gap-3 mt-4">

                <button

                  onClick={addLead}

                  disabled={saving}

                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded font-bold hover:bg-red-600 disabled:opacity-50"

                >

                  {saving ? 'Adding...' : 'Add Lead'}

                </button>

                <button

                  onClick={() => setShowAddLead(false)}

                  className="flex-1 px-4 py-2 bg-slate-300 text-slate-700 rounded font-bold hover:bg-slate-400"

                >

                  Cancel

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default memo(LeadPipelineComponent);
