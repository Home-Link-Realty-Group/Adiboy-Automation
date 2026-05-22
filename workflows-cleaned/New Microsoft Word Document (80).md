# New Microsoft Word Document (80)

Source: New Microsoft Word Document (80).docx

import { useState } from 'react';

import { ExternalLink, CheckCircle2, AlertCircle, Database, Key, UserPlus, Loader } from 'lucide-react';

import { base44 } from '@/api/base44Client';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const GREEN = '#16a34a';

/**

 * Apify onboarding step. Required for lead scraping (FSBO, foreclosures, cash buyers).

 */

export default function ApifySetupGuide({ userEmail, onComplete }) {

  const [token, setToken] = useState('');

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState('');

  async function handleSave(e) {

    e.preventDefault();

    setError('');

    if (!token || token.length < 20) {

      setError('Apify token looks too short. Copy the full value from your Apify Settings → Integrations page.');

      return;

    }

    setSaving(true);

    try {

      const res = await base44.functions.invoke('verifyApifyToken', {

        user_email: userEmail,

        apify_token: token,

      });

      const data = res.data || res;

      if (data.ok) {

        onComplete();

      } else {

        setError(data.error || 'Verification failed — double-check your token.');

      }

    } catch (err) {

      setError(err.message || 'Save failed.');

    }

    setSaving(false);

  }

  return (

    <div>

      <div style={{ background: '#fffbeb', border: `1.5px solid ${GOLD}`, borderRadius: 12, padding: 18, marginBottom: 24 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>

          <Database size={18} color={GOLD} />

          <div style={{ fontWeight: 900, fontSize: 14, color: NAVY }}>Why You Need Apify</div>

        </div>

        <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: 0 }}>

          Apify is the engine behind every <strong>lead scraping feature</strong> in ProFlow CRM — pre-foreclosures, FSBO listings, expired MLS, vacant property data, and cash buyer lookups. You bring your own Apify account so <strong>you own the data and pay the wholesale Apify rates</strong> directly (no middleman markup).

        </p>

      </div>

      <h3 style={{ fontSize: 16, fontWeight: 900, color: NAVY, margin: '0 0 14px' }}>📋 What To Do On Apify's Website</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>

        <Step

          number="1"

          icon={UserPlus}

          title="Create Your Apify Account"

          description="Go to apify.com and click 'Sign up free' (top right). You can sign up with Google, GitHub, or email. The free plan includes monthly scraping credits — plenty to get started. No credit card required."

          link={{ label: 'Sign Up at Apify', url: 'https://apify.com/sign-up' }}

        />

        <Step

          number="2"

          icon={Key}

          title="Find Your Personal API Token"

          description="Once logged in, click your avatar (top right) → 'Settings' → 'Integrations'. You'll see a section called 'Personal API tokens'. Click 'Show' on the default token (or create a new one named 'ProFlow CRM'). Copy the entire token — it's a long string starting with 'apify_api_...'. Treat it like a password."

          link={{ label: 'Open Apify Settings', url: 'https://console.apify.com/account/integrations' }}

          warning="Never share your API token publicly. If leaked, click 'Regenerate' to invalidate the old one."

        />

        <Step

          number="3"

          icon={CheckCircle2}

          title="Add Billing (Optional)"

          description="The free tier is enough to get started. Only add a card later if you want to scale beyond the free monthly credits — and even then, Apify is pay-as-you-go, so you only pay for what you actually use."

        />

      </div>

      <div style={{ background: '#fff', border: `2px solid ${NAVY}`, borderRadius: 14, padding: 24 }}>

        <h3 style={{ fontSize: 16, fontWeight: 900, color: NAVY, margin: '0 0 6px' }}>🔑 Paste Your Apify API Token Here</h3>

        <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px' }}>We'll verify it instantly with Apify. If it works, you're done.</p>

        <form onSubmit={handleSave}>

          <div style={{ marginBottom: 14 }}>

            <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#475569', marginBottom: 5, letterSpacing: 0.5 }}>

              APIFY API TOKEN <span style={{ color: '#dc2626' }}>*</span>

            </label>

            <input

              type="password"

              required

              placeholder="apify_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

              value={token}

              onChange={e => setToken(e.target.value)}

              style={{

                width: '100%', padding: '11px 14px',

                border: '1.5px solid #e2e8f0', borderRadius: 8,

                fontSize: 14, fontFamily: 'monospace',

                boxSizing: 'border-box',

              }}

            />

            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>

              Found at <strong>console.apify.com → Settings → Integrations → Personal API tokens</strong>

            </div>

          </div>

          {error && (

            <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 8, padding: 12, marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 8 }}>

              <AlertCircle size={16} color="#dc2626" style={{ marginTop: 1, flexShrink: 0 }} />

              <div style={{ fontSize: 13, color: '#991b1b' }}>{error}</div>

            </div>

          )}

          <button type="submit" disabled={saving} style={{

            width: '100%',

            background: saving ? '#94a3b8' : GREEN,

            color: '#fff',

            border: 'none',

            borderRadius: 10,

            padding: '14px',

            fontWeight: 900,

            fontSize: 14,

            cursor: saving ? 'not-allowed' : 'pointer',

            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,

          }}>

            {saving ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Verifying with Apify…</> : <><CheckCircle2 size={16} /> Verify & Connect Apify</>}

          </button>

        </form>

      </div>

    </div>

  );

}

function Step({ number, icon: Icon, title, description, link, warning }) {

  return (

    <div style={{ display: 'flex', gap: 14 }}>

      <div style={{

        width: 36, height: 36, borderRadius: '50%',

        background: NAVY, color: '#fff',

        display: 'flex', alignItems: 'center', justifyContent: 'center',

        fontWeight: 900, fontSize: 14, flexShrink: 0,

      }}>{number}</div>

      <div style={{ flex: 1, paddingTop: 4 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>

          <Icon size={15} color={NAVY} />

          <div style={{ fontWeight: 800, fontSize: 14, color: NAVY }}>{title}</div>

        </div>

        <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.65, margin: '0 0 8px' }}>{description}</p>

        {link && (

          <a href={link.url} target="_blank" rel="noopener noreferrer" style={{

            display: 'inline-flex', alignItems: 'center', gap: 6,

            background: GOLD, color: '#fff',

            padding: '7px 14px', borderRadius: 8,

            textDecoration: 'none', fontWeight: 800, fontSize: 12,

            marginBottom: 4,

          }}>

            {link.label} <ExternalLink size={12} />

          </a>

        )}

        {warning && (

          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: '8px 10px', fontSize: 12, color: '#991b1b', marginTop: 6 }}>

            ⚠️ {warning}

          </div>

        )}

      </div>

    </div>

  );

}
