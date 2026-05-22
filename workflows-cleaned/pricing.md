# pricing

Source: pricing.docx

import { useState } from 'react';

import { Check, X, Loader, Phone, Database, Search, Users, Shield, Zap } from 'lucide-react';

import { base44 } from '@/api/base44Client';

import SettingsGearIcon from '@/components/SettingsGearIcon';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const GREEN = '#16a34a';

const PLANS = [

  {

    id: 'starter',

    name: 'Starter',

    price: 97,

    tagline: 'For new wholesalers getting their first deals',

    cta: 'Start 7-Day Free Trial',

    features: [

      { label: '100 leads per month', included: true },

      { label: 'Basic CRM with motivation scoring', included: true },

      { label: '5-line Power Dialer (BYO Twilio)', included: true },

      { label: 'Email support', included: true },

      { label: 'Skip tracing add-on', included: false },

      { label: '8-line Power Dialer', included: false },

      { label: 'Pre-foreclosure scraper', included: false },

      { label: 'Voicemail drop (record in-app)', included: false },

      { label: 'Priority support', included: false },

    ],

    highlight: false,

  },

  {

    id: 'pro',

    name: 'Pro',

    price: 197,

    tagline: 'For active wholesalers closing 1+ deals/month',

    cta: 'Start 7-Day Free Trial',

    badge: 'MOST POPULAR',

    features: [

      { label: '1,000 leads per month', included: true },

      { label: 'Full CRM + AI motivation scoring', included: true },

      { label: '8-line Power Dialer (BYO Twilio)', included: true },

      { label: '15-line blast (Enterprise only)', included: false },

      { label: 'Skip tracing (unlimited)', included: true },

      { label: 'Pre-foreclosure scraper', included: true },

      { label: 'Cash buyer finder', included: true },

      { label: 'Email + chat support', included: true },

      { label: 'Voicemail drop (record in-app)', included: false },

      { label: 'White label branding', included: false },

    ],

    highlight: true,

  },

  {

    id: 'enterprise',

    name: 'Enterprise',

    price: 497,

    tagline: 'For agencies, teams, and high-volume operators',

    cta: 'Start 7-Day Free Trial',

    features: [

      { label: 'Unlimited leads', included: true },

      { label: 'Everything in Pro', included: true },

      { label: '⚡ 15-line Power Dialer (max blast)', included: true },

      { label: '🎙️ Voicemail drop (record in-app)', included: true },

      { label: 'White label branding', included: true },

      { label: 'Up to 10 team seats', included: true },

      { label: 'API access', included: true },

      { label: 'Priority phone support', included: true },

      { label: 'Dedicated account manager', included: true },

      { label: 'Custom integrations', included: true },

    ],

    highlight: false,

  },

];

const FAQ = [

  { q: 'What happens after the 7-day free trial?', a: 'Your card is charged the monthly price. Cancel anytime before day 7 and you won\'t be charged.' },

  { q: 'Can I cancel anytime?', a: 'Yes — one click from your account dashboard. No phone calls, no retention pressure.' },

  { q: 'What payment methods do you accept?', a: 'All major credit cards (Visa, Mastercard, Amex, Discover) via Stripe. Secure and PCI-compliant.' },

  { q: 'Can I switch plans later?', a: 'Yes — upgrade or downgrade anytime. Prorated billing handled automatically.' },

  { q: 'Is there a setup fee?', a: 'No. Zero setup fees, zero hidden costs. Just the monthly subscription.' },

];

export default function Pricing() {

  const [loading, setLoading] = useState(null);

  const [email, setEmail] = useState('');

  const [name, setName] = useState('');

  const [showForm, setShowForm] = useState(null);

  const [error, setError] = useState('');

  async function handleStartTrial(planId) {

    if (window.self !== window.top) {

      alert('Checkout works only from the published app, not the preview. Please open the live site.');

      return;

    }

    if (!email || !email.includes('@')) {

      setError('Please enter a valid email');

      return;

    }

    setLoading(planId);

    setError('');

    try {

      const res = await base44.functions.invoke('createCheckoutSession', {

        plan: planId,

        email,

        name,

      });

      const data = res.data || res;

      if (data.url) {

        window.location.href = data.url;

      } else {

        setError(data.error || 'Failed to create checkout');

        setLoading(null);

      }

    } catch (e) {

      setError(e.message);

      setLoading(null);

    }

  }

  return (

    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* HEADER */}

      <header style={{ background: NAVY, padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>

        <a href="/" style={{ color: '#fff', fontWeight: 900, fontSize: 16, textDecoration: 'none' }}>⚡ ProFlow CRM</a>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>

          <a href="/MyAccount" style={{ color: '#a0b0c8', fontSize: 13, textDecoration: 'none' }}>Sign In</a>

          <a href="#pricing" style={{ background: GOLD, color: '#fff', padding: '8px 18px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Start Free Trial</a>

          <SettingsGearIcon tone="dark" />

        </div>

      </header>

      {/* HERO */}

      <section style={{ padding: '60px 24px 40px', textAlign: 'center', background: `linear-gradient(180deg, ${NAVY} 0%, #122B5E 100%)`, color: '#fff' }}>

        <div style={{ maxWidth: 800, margin: '0 auto' }}>

          <div style={{ display: 'inline-block', background: 'rgba(212,168,67,0.2)', color: GOLD, padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 18 }}>

            ⚡ THE ONLY CRM BUILT BY WHOLESALERS, FOR WHOLESALERS

          </div>

          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, margin: '0 0 18px', lineHeight: 1.2 }}>

            Close Your First Deal in 60 Days — or Get Your Money Back

          </h1>

          <p style={{ fontSize: 17, color: '#a0b0c8', maxWidth: 620, margin: '0 auto 28px', lineHeight: 1.6 }}>

            Stop juggling 12 tools. Get the complete wholesaling stack — pre-foreclosure scraper, 10-line dialer, skip tracer, and motivation-scoring CRM — in one platform.

          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', fontSize: 13, color: '#a0b0c8' }}>

            <span>✅ 7-day free trial</span>

            <span>✅ No setup fees</span>

            <span>✅ Cancel anytime</span>

            <span>✅ Secured by Stripe</span>

          </div>

        </div>

      </section>

      {/* PRICING CARDS */}

      <section id="pricing" style={{ padding: '60px 24px', background: '#f8fafc' }}>

        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Email capture */}

          <div style={{ background: '#fff', borderRadius: 14, padding: 24, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', maxWidth: 560, margin: '0 auto 32px' }}>

            <div style={{ fontWeight: 800, fontSize: 16, color: NAVY, marginBottom: 12, textAlign: 'center' }}>

              Enter your details to start your free trial

            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>

              <input

                type="text"

                placeholder="Your name"

                value={name}

                onChange={e => setName(e.target.value)}

                style={{ padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 14 }}

              />

              <input

                type="email"

                placeholder="your@email.com"

                value={email}

                onChange={e => setEmail(e.target.value)}

                style={{ padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 14 }}

              />

            </div>

            {error && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 8, textAlign: 'center' }}>{error}</div>}

          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, maxWidth: 1100, margin: '0 auto' }}>

            {PLANS.map(plan => (

              <div key={plan.id} style={{

                background: '#fff',

                border: plan.highlight ? `3px solid ${GOLD}` : '1.5px solid #e2e8f0',

                borderRadius: 16,

                padding: 28,

                position: 'relative',

                boxShadow: plan.highlight ? '0 8px 32px rgba(212,168,67,0.2)' : '0 2px 8px rgba(0,0,0,0.04)',

                transform: plan.highlight ? 'scale(1.03)' : 'none',

              }}>

                {plan.badge && (

                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: GOLD, color: '#fff', padding: '4px 14px', borderRadius: 20, fontSize: 11, fontWeight: 800, letterSpacing: 1 }}>

                    {plan.badge}

                  </div>

                )}

                <div style={{ fontWeight: 900, fontSize: 22, color: NAVY, marginBottom: 6 }}>{plan.name}</div>

                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16, minHeight: 36 }}>{plan.tagline}</div>

                <div style={{ marginBottom: 20 }}>

                  <span style={{ fontSize: 44, fontWeight: 900, color: NAVY }}>${plan.price}</span>

                  <span style={{ fontSize: 14, color: '#64748b', marginLeft: 4 }}>/month</span>

                </div>

                <button

                  onClick={() => handleStartTrial(plan.id)}

                  disabled={loading === plan.id}

                  style={{

                    width: '100%',

                    background: plan.highlight ? GOLD : NAVY,

                    color: '#fff',

                    border: 'none',

                    borderRadius: 10,

                    padding: '14px',

                    fontWeight: 800,

                    fontSize: 14,

                    cursor: loading === plan.id ? 'not-allowed' : 'pointer',

                    marginBottom: 24,

                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,

                  }}>

                  {loading === plan.id ? <><Loader size={16} className="animate-spin" /> Redirecting...</> : plan.cta}

                </button>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>

                  {plan.features.map((f, i) => (

                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 13, color: f.included ? NAVY : '#94a3b8' }}>

                      {f.included ? <Check size={16} color={GREEN} /> : <X size={16} color="#cbd5e1" />}

                      <span style={{ textDecoration: f.included ? 'none' : 'line-through' }}>{f.label}</span>

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>

          <div style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: '#64748b' }}>

            🔒 All plans include 256-bit SSL, GDPR compliance, and daily backups · Powered by Stripe

          </div>

        </div>

      </section>

      {/* FEATURES STRIP */}

      <section style={{ padding: '60px 24px', background: '#fff' }}>

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 900, color: NAVY, marginBottom: 8 }}>Everything You Need to Close Deals</h2>

          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 40, fontSize: 15 }}>Replace 8 separate tools with one platform</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>

            {[

              { icon: Database, label: 'Pre-Foreclosure Scraper', desc: 'Pull motivated seller leads daily from county records' },

              { icon: Search, label: 'Skip Tracer', desc: 'Find phone numbers for any property owner in seconds' },

              { icon: Phone, label: '10-Line Power Dialer', desc: 'Blast 10 simultaneous calls. First to answer connects.' },

              { icon: Zap, label: 'AI Motivation Scoring', desc: 'Auto-score every lead 0-100 based on distress signals' },

              { icon: Users, label: 'Cash Buyer Finder', desc: 'Build your buyer list from public records' },

              { icon: Shield, label: 'TCPA Compliant', desc: 'Built-in DNC checks + TrustedForm certification' },

            ].map((f, i) => (

              <div key={i} style={{ padding: 20, borderRadius: 12, background: '#f8fafc', textAlign: 'center' }}>

                <f.icon size={32} color={GOLD} style={{ marginBottom: 12 }} />

                <div style={{ fontWeight: 800, color: NAVY, marginBottom: 6, fontSize: 15 }}>{f.label}</div>

                <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>{f.desc}</div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FAQ */}

      <section style={{ padding: '60px 24px', background: '#f8fafc' }}>

        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 900, color: NAVY, marginBottom: 32 }}>Frequently Asked Questions</h2>

          {FAQ.map((item, i) => (

            <details key={i} style={{ background: '#fff', borderRadius: 10, padding: '16px 20px', marginBottom: 10, border: '1px solid #e2e8f0' }}>

              <summary style={{ cursor: 'pointer', fontWeight: 700, color: NAVY, fontSize: 15 }}>{item.q}</summary>

              <div style={{ marginTop: 12, color: '#475569', lineHeight: 1.7, fontSize: 14 }}>{item.a}</div>

            </details>

          ))}

        </div>

      </section>

      {/* FINAL CTA */}

      <section style={{ background: NAVY, padding: '60px 24px', textAlign: 'center' }}>

        <div style={{ maxWidth: 600, margin: '0 auto', color: '#fff' }}>

          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 14 }}>Ready to Close Your First Deal?</h2>

          <p style={{ color: '#a0b0c8', marginBottom: 28, fontSize: 15 }}>Join hundreds of wholesalers running their entire business on ProFlow CRM.</p>

          <a href="#pricing" style={{ display: 'inline-block', background: GOLD, color: '#fff', padding: '16px 36px', borderRadius: 10, textDecoration: 'none', fontWeight: 800, fontSize: 15 }}>

            Start Your 7-Day Free Trial →

          </a>

        </div>

      </section>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }`}</style>

    </div>

  );

}
