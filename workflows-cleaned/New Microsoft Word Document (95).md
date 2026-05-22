# New Microsoft Word Document (95)

Source: New Microsoft Word Document (95).docx

import { useState } from 'react';

import { Shield, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

import AuditLogger from './AuditLogger';

import TwoFactorSetup from './TwoFactorSetup';

import RoleBasedAccessControl from './RoleBasedAccessControl';

import CallRecordingConsent from './CallRecordingConsent';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const GREEN = '#27ae60';

export default function ComplianceDashboard() {

  const [activeTab, setActiveTab] = useState('overview');

  const complianceScore = 78; // Calculate based on all factors

  const metrics = [

    { label: 'TCPA Compliance', score: 92, status: 'excellent' },

    { label: 'Call Recording Consent', score: 78, status: 'good' },

    { label: 'Data Security', score: 85, status: 'good' },

    { label: 'Audit Trail Completeness', score: 65, status: 'fair' },

  ];

  return (

    <div style={{ minHeight: '100vh', background: '#f5f7fa', padding: 20 }}>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* HEADER */}

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>

          <Shield size={32} color={GOLD} />

          <div>

            <h1 style={{ fontSize: 28, fontWeight: 900, color: NAVY, margin: '0 0 4px' }}>

              Compliance & Security Dashboard

            </h1>

            <p style={{ fontSize: 13, color: '#666', margin: 0 }}>

              Monitor TCPA compliance, audit logs, access control, and call recording consent

            </p>

          </div>

        </div>

        {/* COMPLIANCE SCORE */}

        <div style={{

          background: '#fff',

          borderRadius: 12,

          padding: 20,

          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',

          marginBottom: 24,

        }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>

            <h2 style={{ fontSize: 16, fontWeight: 900, color: NAVY, margin: 0 }}>Overall Compliance Score</h2>

            <div style={{ fontSize: 28, fontWeight: 900, color: GREEN }}>

              {complianceScore}%

            </div>

          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>

            {metrics.map(metric => (

              <div

                key={metric.label}

                style={{

                  background: '#f9f9f9',

                  border: '1px solid #e0e0e0',

                  borderRadius: 10,

                  padding: 12,

                }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>

                  <span style={{ fontSize: 11, fontWeight: 700, color: '#666' }}>

                    {metric.label}

                  </span>

                  <span style={{

                    fontSize: 14,

                    fontWeight: 900,

                    color: metric.status === 'excellent' ? GREEN : metric.status === 'good' ? GOLD : '#f39c12',

                  }}>

                    {metric.score}%

                  </span>

                </div>

                <div style={{ height: 4, background: '#e0e0e0', borderRadius: 2, overflow: 'hidden' }}>

                  <div

                    style={{

                      width: `${metric.score}%`,

                      height: '100%',

                      background: metric.status === 'excellent' ? GREEN : metric.status === 'good' ? GOLD : '#f39c12',

                      borderRadius: 2,

                    }}

                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* TABS */}

        <div style={{

          display: 'flex',

          gap: 10,

          marginBottom: 20,

          borderBottom: '2px solid #e0e0e0',

          overflowX: 'auto',

        }}>

          {[

            { id: 'overview', label: '📊 Overview' },

            { id: 'audit', label: '🔍 Audit Logs' },

            { id: '2fa', label: '🔐 Two-Factor' },

            { id: 'rbac', label: '👥 Access Control' },

            { id: 'recording', label: '🎙️ Recording Consent' },

          ].map(tab => (

            <button

              key={tab.id}

              onClick={() => setActiveTab(tab.id)}

              style={{

                padding: '12px 16px',

                background: 'none',

                border: 'none',

                borderBottom: activeTab === tab.id ? `3px solid ${GOLD}` : '3px solid transparent',

                color: activeTab === tab.id ? NAVY : '#999',

                fontWeight: activeTab === tab.id ? 900 : 600,

                fontSize: 13,

                cursor: 'pointer',

                whiteSpace: 'nowrap',

              }}>

              {tab.label}

            </button>

          ))}

        </div>

        {/* TAB CONTENT */}

        <div>

          {activeTab === 'overview' && (

            <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>

              <h2 style={{ fontSize: 16, fontWeight: 900, color: NAVY, marginBottom: 16 }}>Security Overview</h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>

                <div style={{ background: '#d1fae5', border: `2px solid ${GREEN}`, borderRadius: 10, padding: 14 }}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>

                    <CheckCircle size={18} color={GREEN} />

                    <span style={{ fontWeight: 900, color: '#065f46', fontSize: 12 }}>TCPA Protected</span>

                  </div>

                  <div style={{ fontSize: 11, color: '#065f46' }}>

                    All leads have proper consent documentation

                  </div>

                </div>

                <div style={{ background: '#d1fae5', border: `2px solid ${GREEN}`, borderRadius: 10, padding: 14 }}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>

                    <CheckCircle size={18} color={GREEN} />

                    <span style={{ fontWeight: 900, color: '#065f46', fontSize: 12 }}>2FA Enabled</span>

                  </div>

                  <div style={{ fontSize: 11, color: '#065f46' }}>

                    Admin accounts require two-factor authentication

                  </div>

                </div>

                <div style={{ background: '#d1fae5', border: `2px solid ${GREEN}`, borderRadius: 10, padding: 14 }}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>

                    <CheckCircle size={18} color={GREEN} />

                    <span style={{ fontWeight: 900, color: '#065f46', fontSize: 12 }}>Audit Logged</span>

                  </div>

                  <div style={{ fontSize: 11, color: '#065f46' }}>

                    All actions tracked with timestamps and IP addresses

                  </div>

                </div>

                <div style={{ background: '#fef3c7', border: `2px solid ${GOLD}`, borderRadius: 10, padding: 14 }}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>

                    <AlertCircle size={18} color={GOLD} />

                    <span style={{ fontWeight: 900, color: '#92400e', fontSize: 12 }}>Recording Consent</span>

                  </div>

                  <div style={{ fontSize: 11, color: '#92400e' }}>

                    Review consent status for recent calls

                  </div>

                </div>

              </div>

            </div>

          )}

          {activeTab === 'audit' && <AuditLogger />}

          {activeTab === '2fa' && <TwoFactorSetup userEmail="jacob@homelink.com" />}

          {activeTab === 'rbac' && <RoleBasedAccessControl />}

          {activeTab === 'recording' && (

            <CallRecordingConsent leadName="John Smith" leadPhone="(555) 123-4567" />

          )}

        </div>

      </div>

    </div>

  );

}
