# New Microsoft Word Document (98)

Source: New Microsoft Word Document (98).docx

import { useState, useEffect } from 'react';

import { base44 } from '@/api/base44Client';

import { Calendar, Filter, Download, Loader } from 'lucide-react';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

export default function AuditLogger() {

  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(false);

  const [dateFilter, setDateFilter] = useState('all');

  const [actionFilter, setActionFilter] = useState('all');

  useEffect(() => {

    fetchLogs();

  }, []);

  async function fetchLogs() {

    setLoading(true);

    try {

      // In production, fetch from AuditLog entity

      const mockLogs = [

        { id: 1, timestamp: new Date(Date.now() - 3600000), user: 'jacob@homelink.com', action: 'Call Initiated', entity: 'Lead #123', ipAddress: '192.168.1.1', status: 'success' },

        { id: 2, timestamp: new Date(Date.now() - 7200000), user: 'admin@homelink.com', action: 'User Role Changed', entity: 'agent@homelink.com -> Supervisor', ipAddress: '10.0.0.1', status: 'success' },

        { id: 3, timestamp: new Date(Date.now() - 86400000), user: 'jacob@homelink.com', action: 'Lead Data Exported', entity: 'CSV Export', ipAddress: '192.168.1.1', status: 'success' },

        { id: 4, timestamp: new Date(Date.now() - 172800000), user: 'unknown', action: 'Failed Login Attempt', entity: 'User Account', ipAddress: '203.0.113.45', status: 'failure' },

      ];

      setLogs(mockLogs);

    } catch (err) {

      console.error('Failed to fetch audit logs:', err);

    } finally {

      setLoading(false);

    }

  }

  const filteredLogs = logs.filter(log => {

    let matches = true;


    if (dateFilter !== 'all') {

      const now = new Date();

      const logDate = new Date(log.timestamp);

      const daysDiff = (now - logDate) / (1000 * 60 * 60 * 24);


      if (dateFilter === '24h' && daysDiff > 1) matches = false;

      if (dateFilter === '7d' && daysDiff > 7) matches = false;

      if (dateFilter === '30d' && daysDiff > 30) matches = false;

    }

    if (actionFilter !== 'all' && log.action !== actionFilter) matches = false;

    return matches;

  });

  const actions = ['all', ...new Set(logs.map(l => l.action))];

  return (

    <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>

        <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: 0 }}>🔍 Audit Log</h2>

        <button

          onClick={() => {

            const csv = ['Timestamp,User,Action,Entity,IP,Status', ...filteredLogs.map(l =>

              `"${l.timestamp}","${l.user}","${l.action}","${l.entity}","${l.ipAddress}","${l.status}"`

            )].join('\n');

            const blob = new Blob([csv], { type: 'text/csv' });

            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');

            a.href = url;

            a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;

            a.click();

          }}

          style={{

            background: GOLD,

            color: '#fff',

            border: 'none',

            borderRadius: 6,

            padding: '8px 14px',

            fontWeight: 700,

            fontSize: 12,

            cursor: 'pointer',

            display: 'flex',

            alignItems: 'center',

            gap: 6,

          }}>

          <Download size={14} /> Export CSV

        </button>

      </div>

      {/* FILTERS */}

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>

        <div>

          <label style={{ fontSize: 11, fontWeight: 700, color: '#666', display: 'block', marginBottom: 4 }}>Date</label>

          <select

            value={dateFilter}

            onChange={(e) => setDateFilter(e.target.value)}

            style={{

              padding: '6px 10px',

              border: '1px solid #ddd',

              borderRadius: 6,

              fontSize: 12,

              fontFamily: 'inherit',

            }}>

            <option value="all">All Time</option>

            <option value="24h">Last 24 Hours</option>

            <option value="7d">Last 7 Days</option>

            <option value="30d">Last 30 Days</option>

          </select>

        </div>

        <div>

          <label style={{ fontSize: 11, fontWeight: 700, color: '#666', display: 'block', marginBottom: 4 }}>Action</label>

          <select

            value={actionFilter}

            onChange={(e) => setActionFilter(e.target.value)}

            style={{

              padding: '6px 10px',

              border: '1px solid #ddd',

              borderRadius: 6,

              fontSize: 12,

              fontFamily: 'inherit',

            }}>

            {actions.map(action => (

              <option key={action} value={action}>

                {action === 'all' ? 'All Actions' : action}

              </option>

            ))}

          </select>

        </div>

        <div style={{ fontSize: 11, color: '#666', fontWeight: 700, alignSelf: 'flex-end' }}>

          {filteredLogs.length} events

        </div>

      </div>

      {/* LOGS TABLE */}

      {loading ? (

        <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>

          <Loader size={24} style={{ animation: 'spin 1s linear infinite' }} />

        </div>

      ) : (

        <div style={{ overflowX: 'auto' }}>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>

            <thead>

              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>

                <th style={{ padding: 10, textAlign: 'left', fontWeight: 700, color: '#333' }}>Timestamp</th>

                <th style={{ padding: 10, textAlign: 'left', fontWeight: 700, color: '#333' }}>User</th>

                <th style={{ padding: 10, textAlign: 'left', fontWeight: 700, color: '#333' }}>Action</th>

                <th style={{ padding: 10, textAlign: 'left', fontWeight: 700, color: '#333' }}>Entity</th>

                <th style={{ padding: 10, textAlign: 'left', fontWeight: 700, color: '#333' }}>IP Address</th>

                <th style={{ padding: 10, textAlign: 'left', fontWeight: 700, color: '#333' }}>Status</th>

              </tr>

            </thead>

            <tbody>

              {filteredLogs.map((log, idx) => (

                <tr key={log.id} style={{ background: idx % 2 === 0 ? '#fff' : '#f9f9f9', borderBottom: '1px solid #e0e0e0' }}>

                  <td style={{ padding: 10, color: '#666' }}>

                    {new Date(log.timestamp).toLocaleString()}

                  </td>

                  <td style={{ padding: 10, color: '#333', fontWeight: 600 }}>{log.user}</td>

                  <td style={{ padding: 10, color: '#333' }}>{log.action}</td>

                  <td style={{ padding: 10, color: '#666' }}>{log.entity}</td>

                  <td style={{ padding: 10, color: '#666', fontFamily: 'monospace', fontSize: 11 }}>{log.ipAddress}</td>

                  <td style={{ padding: 10 }}>

                    <span style={{

                      background: log.status === 'success' ? '#d1fae5' : '#fee2e2',

                      color: log.status === 'success' ? '#065f46' : '#991b1b',

                      padding: '3px 8px',

                      borderRadius: 4,

                      fontWeight: 700,

                      textTransform: 'capitalize',

                    }}>

                      {log.status}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}
