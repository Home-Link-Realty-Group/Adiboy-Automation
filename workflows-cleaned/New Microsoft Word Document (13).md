# New Microsoft Word Document (13)

Source: New Microsoft Word Document (13).docx

import { useState, useEffect } from 'react';

import { CheckCircle2, AlertCircle, ArrowRight, Lock } from 'lucide-react';

import { base44 } from '@/api/base44Client';

import ToggleSwitch from './ToggleSwitch';

import StatusLight from './StatusLight';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const GREEN = '#16a34a';

/**

 * Single integration tile in the concierge dashboard.

 * When connected, shows an on/off toggle to enable/disable usage.

 */

export default function IntegrationCard({ integration, integrationKey, userEmail }) {

  const { connected, label, purpose, setup_url, critical, platform_managed, details } = integration;

  const [enabled, setEnabled] = useState(true);

  // Load toggle state from localStorage

  useEffect(() => {

    if (!connected || !userEmail || !integrationKey) return;

    const saved = localStorage.getItem(`hl_int_enabled_${userEmail}`);

    if (saved) {

      try {

        const parsed = JSON.parse(saved);

        if (parsed[integrationKey] !== undefined) setEnabled(parsed[integrationKey]);

      } catch { /* ignore */ }

    }

  }, [connected, userEmail, integrationKey]);

  function handleToggle(value) {

    setEnabled(value);

    if (!userEmail || !integrationKey) return;

    const key = `hl_int_enabled_${userEmail}`;

    let current = {};

    try { current = JSON.parse(localStorage.getItem(key) || '{}'); } catch { /* ignore */ }

    current[integrationKey] = value;

    localStorage.setItem(key, JSON.stringify(current));

    base44.functions.invoke('saveAutomationToggles', {

      user_email: userEmail,

      integration_enabled: current,

    }).catch(() => { /* silent */ });

  }

  const statusColor = !connected

    ? (critical ? '#dc2626' : '#94a3b8')

    : enabled ? GREEN : '#f59e0b';

  const statusBg = !connected

    ? (critical ? '#fef2f2' : '#f8fafc')

    : enabled ? '#f0fdf4' : '#fffbeb';

  return (

    <div style={{

      background: '#fff',

      borderRadius: 14,

      padding: 16,

      border: `1.5px solid ${connected ? (enabled ? GREEN + '40' : '#fde68a') : '#e2e8f0'}`,

      borderLeft: `4px solid ${statusColor}`,

      transition: 'all 0.2s',

      opacity: connected && !enabled ? 0.75 : 1,

    }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 10 }}>

        <div style={{ flex: 1, minWidth: 0 }}>

          <div style={{ fontWeight: 900, fontSize: 14, color: NAVY, marginBottom: 3, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>

            {label}

            {critical && !connected && (

              <span style={{

                fontSize: 9, fontWeight: 800,

                background: '#fef2f2', color: '#991b1b',

                padding: '2px 6px', borderRadius: 4, letterSpacing: 0.5,

              }}>

                NEEDED

              </span>

            )}

            {platform_managed && (

              <span style={{

                fontSize: 9, fontWeight: 800,

                background: '#eff6ff', color: '#1e40af',

                padding: '2px 6px', borderRadius: 4, letterSpacing: 0.5,

              }}>

                PLATFORM

              </span>

            )}

            {connected && !enabled && (

              <span style={{

                fontSize: 9, fontWeight: 800,

                background: '#fffbeb', color: '#92400e',

                padding: '2px 6px', borderRadius: 4, letterSpacing: 0.5,

              }}>

                PAUSED

              </span>

            )}

          </div>

          <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.45 }}>{purpose}</div>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>

          <div style={{

            width: 28, height: 28, borderRadius: '50%',

            background: statusBg,

            display: 'flex', alignItems: 'center', justifyContent: 'center',

          }}>

            {connected ? <CheckCircle2 size={16} color={enabled ? GREEN : '#f59e0b'} /> : critical ? <AlertCircle size={16} color="#dc2626" /> : <Lock size={13} color="#94a3b8" />}

          </div>

          {connected && (

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

              <StatusLight on={enabled} size={9} />

              <ToggleSwitch

                checked={enabled}

                onChange={handleToggle}

                size="sm"

                label={`Enable ${label}`}

              />

            </div>

          )}

        </div>

      </div>

      {connected && enabled && details && (

        <div style={{

          background: '#f0fdf4', borderRadius: 8, padding: '6px 10px',

          fontSize: 10, color: '#166534', marginTop: 8,

        }}>

          {Object.entries(details).filter(([_, v]) => v).map(([k, v]) => (

            <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>

              <span style={{ textTransform: 'capitalize' }}>{k.replace(/_/g, ' ')}:</span>

              <strong>{String(v)}</strong>

            </div>

          ))}

        </div>

      )}

      {!connected && setup_url && (

        <a href={setup_url} style={{

          display: 'inline-flex', alignItems: 'center', gap: 6,

          background: critical ? GOLD : '#f1f5f9',

          color: critical ? '#fff' : NAVY,

          padding: '6px 12px', borderRadius: 8,

          textDecoration: 'none', fontWeight: 800, fontSize: 11,

          marginTop: 8,

        }}>

          {critical ? 'Connect Now' : 'Set Up'} <ArrowRight size={11} />

        </a>

      )}

    </div>

  );

}
