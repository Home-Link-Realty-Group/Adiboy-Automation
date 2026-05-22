# stripeconnect

Source: stripeconnect.docx

import { useState, useEffect } from 'react';

import { base44 } from '@/api/base44Client';

import { CheckCircle2, AlertCircle, Loader, ExternalLink, Plus, Store, CreditCard, RefreshCw, ArrowRight, Package } from 'lucide-react';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const GREEN = '#16a34a';

const RED = '#dc2626';

// PLACEHOLDER — replace with your real platform subscription Price ID after creating it

// in Stripe Dashboard → Products. Or use stripe_create_product/stripe_create_price tools.

const PLATFORM_SUB_PRICE_ID = 'price_REPLACE_WITH_YOUR_PLATFORM_PRICE_ID';

export default function StripeConnect() {

  const [email, setEmail] = useState('');

  const [emailInput, setEmailInput] = useState('');

  const [account, setAccount] = useState(null);

  const [status, setStatus] = useState(null);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [busy, setBusy] = useState('');

  const [error, setError] = useState('');

  // Onboarding form

  const [displayName, setDisplayName] = useState('');

  const [contactEmail, setContactEmail] = useState('');

  // New product form

  const [showProductForm, setShowProductForm] = useState(false);

  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });

  useEffect(() => {

    document.title = 'Stripe Connect | Home-Link CRM';

    const saved = localStorage.getItem('homelink_user_email');

    if (saved) {

      setEmail(saved);

      loadAccount(saved);

    } else {

      setLoading(false);

    }

    // Handle return from Stripe onboarding

    const params = new URLSearchParams(window.location.search);

    const returnedAccountId = params.get('accountId');

    if (returnedAccountId && saved) {

      setTimeout(() => loadAccount(saved), 800);

    }

  }, []);

  async function loadAccount(userEmail) {

    setLoading(true);

    try {

      const records = await base44.entities.ConnectedAccount.filter({

        user_email: userEmail.toLowerCase(),

      });

      if (records && records.length > 0) {

        const acct = records[0];

        setAccount(acct);

        await refreshStatus(acct.stripe_account_id);

        await loadProducts(acct.stripe_account_id);

      }

    } catch (e) { console.error(e); }

    setLoading(false);

  }

  async function refreshStatus(accountId) {

    try {

      const res = await base44.functions.invoke('connectAccountStatus', { account_id: accountId });

      const data = res.data || res;

      if (data.ok) setStatus(data);

    } catch (e) { console.error(e); }

  }

  async function loadProducts(accountId) {

    try {

      const res = await base44.functions.invoke('connectProducts', {

        action: 'list',

        account_id: accountId,

      });

      const data = res.data || res;

      if (data.ok) setProducts(data.products || []);

    } catch (e) { console.error(e); }

  }

  function handleEmailSubmit(e) {

    e.preventDefault();

    if (!emailInput.includes('@')) return;

    const clean = emailInput.trim().toLowerCase();

    localStorage.setItem('homelink_user_email', clean);

    setEmail(clean);

    setContactEmail(clean);

    loadAccount(clean);

  }

  async function handleCreateAccount(e) {

    e.preventDefault();

    setBusy('create');

    setError('');

    try {

      const res = await base44.functions.invoke('connectCreateAccount', {

        user_email: email,

        display_name: displayName,

        contact_email: contactEmail || email,

      });

      const data = res.data || res;

      if (data.ok && data.onboarding_url) {

        // Redirect to Stripe-hosted onboarding

        window.location.href = data.onboarding_url;

      } else {

        setError(data.error || 'Failed to create account');

      }

    } catch (e) {

      setError(e.message);

    }

    setBusy('');

  }

  async function handleResumeOnboarding() {

    setBusy('onboard');

    try {

      const res = await base44.functions.invoke('connectRefreshOnboarding', {

        account_id: account.stripe_account_id,

      });

      const data = res.data || res;

      if (data.ok && data.onboarding_url) {

        window.location.href = data.onboarding_url;

      } else {

        setError(data.error || 'Failed to generate onboarding link');

      }

    } catch (e) { setError(e.message); }

    setBusy('');

  }

  async function handleCreateProduct(e) {

    e.preventDefault();

    setBusy('product');

    setError('');

    try {

      const res = await base44.functions.invoke('connectProducts', {

        action: 'create',

        account_id: account.stripe_account_id,

        name: newProduct.name,

        description: newProduct.description,

        price_cents: Math.round(parseFloat(newProduct.price) * 100),

        currency: 'usd',

      });

      const data = res.data || res;

      if (data.ok) {

        setNewProduct({ name: '', description: '', price: '' });

        setShowProductForm(false);

        await loadProducts(account.stripe_account_id);

      } else {

        setError(data.error || 'Failed to create product');

      }

    } catch (e) { setError(e.message); }

    setBusy('');

  }

  async function handleSubscribe() {

    setBusy('subscribe');

    try {

      const res = await base44.functions.invoke('connectCheckout', {

        action: 'subscribe',

        account_id: account.stripe_account_id,

        price_id: PLATFORM_SUB_PRICE_ID,

      });

      const data = res.data || res;

      if (data.ok && data.url) {

        if (window.self !== window.top) {

          alert('Checkout works only from the published app, not the preview.');

          setBusy('');

          return;

        }

        window.location.href = data.url;

      } else {

        setError(data.error || 'Failed to start subscription');

      }

    } catch (e) { setError(e.message); }

    setBusy('');

  }

  async function handleBillingPortal() {

    setBusy('portal');

    try {

      const res = await base44.functions.invoke('connectCheckout', {

        action: 'portal',

        account_id: account.stripe_account_id,

      });

      const data = res.data || res;

      if (data.ok && data.url) window.location.href = data.url;

    } catch (e) { setError(e.message); }

    setBusy('');

  }

  // ─── EMAIL GATE ─────────────────────────────────────────────────

  if (!email) {

    return (

      <div style={pageStyle}>

        <div style={{ maxWidth: 460, margin: '120px auto', background: '#fff', padding: 32, borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

          <h1 style={{ fontSize: 24, fontWeight: 900, color: NAVY, margin: '0 0 8px' }}>Stripe Connect</h1>

          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Sign in to manage your connected Stripe account.</p>

          <form onSubmit={handleEmailSubmit}>

            <input type="email" required placeholder="your@email.com" value={emailInput} onChange={e => setEmailInput(e.target.value)} style={inputStyle} />

            <button type="submit" style={{ ...btnPrimary, width: '100%', marginTop: 12 }}>Continue →</button>

          </form>

        </div>

      </div>

    );

  }

  // ─── LOADING ────────────────────────────────────────────────────

  if (loading) {

    return (

      <div style={pageStyle}>

        <div style={{ textAlign: 'center', padding: 80 }}>

          <Loader size={28} className="spin" />

          <div style={{ marginTop: 12, color: '#64748b' }}>Loading your Connect account...</div>

        </div>

      </div>

    );

  }

  // ─── NO ACCOUNT YET — onboarding form ────────────────────────────

  if (!account) {

    return (

      <div style={pageStyle}>

        <Header email={email} />

        <main style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>

          <div style={card}>

            <h2 style={{ fontSize: 22, fontWeight: 900, color: NAVY, margin: '0 0 8px' }}>Connect Your Stripe Account</h2>

            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, marginBottom: 22 }}>

              Create a Stripe Connect account to accept payments from your customers. We'll redirect you to Stripe to complete onboarding (KYC, bank info, etc.).

            </p>

            {error && <ErrorBox msg={error} />}

            <form onSubmit={handleCreateAccount}>

              <Field label="Business / Display Name" value={displayName} onChange={setDisplayName} required placeholder="Acme Real Estate LLC" />

              <Field label="Contact Email" value={contactEmail || email} onChange={setContactEmail} type="email" required />

              <button type="submit" disabled={busy === 'create'} style={{ ...btnPrimary, marginTop: 8 }}>

                {busy === 'create' ? <><Loader size={15} className="spin" /> Creating…</> : <>Create Account & Onboard <ArrowRight size={14} /></>}

              </button>

            </form>

          </div>

        </main>

      </div>

    );

  }

  // ─── EXISTING ACCOUNT ───────────────────────────────────────────

  const ready = status?.ready_to_process_payments;

  const onboardingComplete = status?.onboarding_complete;

  return (

    <div style={pageStyle}>

      <Header email={email} />

      <main style={{ maxWidth: 1100, margin: '24px auto', padding: '0 20px 60px' }}>

        {error && <ErrorBox msg={error} onClose={() => setError('')} />}

        {/* STATUS BANNER */}

        <div style={{

          ...card,

          background: ready ? '#f0fdf4' : '#fffbeb',

          border: `2px solid ${ready ? GREEN : GOLD}`,

        }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>

            <div style={{

              width: 48, height: 48, borderRadius: '50%',

              background: ready ? GREEN : GOLD, color: '#fff',

              display: 'flex', alignItems: 'center', justifyContent: 'center',

            }}>

              {ready ? <CheckCircle2 size={26} /> : <AlertCircle size={26} />}

            </div>

            <div style={{ flex: 1 }}>

              <div style={{ fontSize: 18, fontWeight: 900, color: NAVY }}>

                {ready ? 'Ready to Accept Payments ✓' : 'Onboarding Required'}

              </div>

              <div style={{ fontSize: 13, color: '#475569', marginTop: 3 }}>

                Account: <code style={code}>{account.stripe_account_id}</code> · Status:{' '}

                <strong>{status?.requirements_status || 'loading…'}</strong>

              </div>

            </div>

            <button onClick={() => refreshStatus(account.stripe_account_id)} style={btnGhost} title="Refresh from Stripe">

              <RefreshCw size={14} /> Refresh

            </button>

          </div>

          {!onboardingComplete && (

            <button onClick={handleResumeOnboarding} disabled={busy === 'onboard'} style={{ ...btnPrimary, marginTop: 14 }}>

              {busy === 'onboard' ? <><Loader size={14} className="spin" /> Generating link…</> : <>Continue Onboarding <ExternalLink size={13} /></>}

            </button>

          )}

        </div>

        {/* TWO COLUMNS: Products & Subscription */}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 20, marginTop: 20 }}>

          {/* PRODUCTS */}

          <div style={card}>

            <div style={sectionHeader}>

              <Package size={18} color={NAVY} />

              <h3 style={h3}>Your Products</h3>

              {ready && (

                <button onClick={() => setShowProductForm(!showProductForm)} style={btnSmall}>

                  <Plus size={13} /> New

                </button>

              )}

            </div>

            {!ready && <Note>Complete onboarding to start creating products.</Note>}

            {showProductForm && (

              <form onSubmit={handleCreateProduct} style={{ background: '#f8fafc', padding: 14, borderRadius: 8, marginBottom: 12 }}>

                <Field label="Name" value={newProduct.name} onChange={v => setNewProduct(p => ({ ...p, name: v }))} required placeholder="Premium Buyer List Access" />

                <Field label="Description" value={newProduct.description} onChange={v => setNewProduct(p => ({ ...p, description: v }))} placeholder="Optional" />

                <Field label="Price (USD)" value={newProduct.price} onChange={v => setNewProduct(p => ({ ...p, price: v }))} required type="number" placeholder="49.99" />

                <button type="submit" disabled={busy === 'product'} style={{ ...btnPrimary, marginTop: 6 }}>

                  {busy === 'product' ? 'Creating…' : 'Create Product'}

                </button>

              </form>

            )}

            {products.length === 0 && ready && !showProductForm && (

              <Note>No products yet. Click "New" to create your first one.</Note>

            )}

            {products.map(p => (

              <div key={p.id} style={productRow}>

                <div style={{ flex: 1 }}>

                  <div style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>{p.name}</div>

                  {p.description && <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{p.description}</div>}

                  <div style={{ fontSize: 13, fontWeight: 700, color: GREEN, marginTop: 4 }}>

                    {p.default_price ? formatMoney(p.default_price.unit_amount, p.default_price.currency) : '—'}

                  </div>

                </div>

              </div>

            ))}

            {ready && products.length > 0 && (

              <a href={`/StripeConnect/Store/${account.stripe_account_id}`} style={{ ...btnPrimary, marginTop: 14, textDecoration: 'none' }}>

                <Store size={14} /> View Public Storefront <ArrowRight size={13} />

              </a>

            )}

          </div>

          {/* SUBSCRIPTION */}

          <div style={card}>

            <div style={sectionHeader}>

              <CreditCard size={18} color={NAVY} />

              <h3 style={h3}>Platform Subscription</h3>

            </div>

            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>

              Subscribe your business to the Home-Link platform. Billed directly to this connected account.

            </p>

            {account.subscription_status === 'active' ? (

              <>

                <div style={{ background: '#f0fdf4', borderRadius: 8, padding: 14, marginBottom: 12 }}>

                  <div style={{ fontSize: 12, color: GREEN, fontWeight: 800, letterSpacing: 0.5 }}>● ACTIVE SUBSCRIPTION</div>

                  <div style={{ fontSize: 13, color: '#475569', marginTop: 4 }}>

                    Renews: {account.subscription_current_period_end ? new Date(account.subscription_current_period_end).toLocaleDateString() : '—'}

                  </div>

                </div>

                <button onClick={handleBillingPortal} disabled={busy === 'portal'} style={btnPrimary}>

                  {busy === 'portal' ? 'Opening…' : <>Manage Billing <ExternalLink size={13} /></>}

                </button>

              </>

            ) : (

              <button onClick={handleSubscribe} disabled={busy === 'subscribe'} style={btnPrimary}>

                {busy === 'subscribe' ? <><Loader size={14} className="spin" /> Redirecting…</> : <>Subscribe Now <ArrowRight size={13} /></>}

              </button>

            )}

          </div>

        </div>

      </main>

      <style>{`

        @keyframes spin { to { transform: rotate(360deg); } }

        .spin { animation: spin 1s linear infinite; }

      `}</style>

    </div>

  );

}

// ─── SHARED COMPONENTS ──────────────────────────────────────────────

function Header({ email }) {

  return (

    <header style={{ background: NAVY, padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

      <a href="/CRM" style={{ color: '#fff', fontWeight: 900, textDecoration: 'none', fontSize: 15 }}>← Home-Link CRM</a>

      <div style={{ color: '#a0b0c8', fontSize: 12 }}>Stripe Connect · {email}</div>

    </header>

  );

}

function Field({ label, value, onChange, type = 'text', required, placeholder }) {

  return (

    <div style={{ marginBottom: 12 }}>

      <label style={labelStyle}>{label.toUpperCase()}</label>

      <input

        type={type} value={value} onChange={e => onChange(e.target.value)}

        required={required} placeholder={placeholder} style={inputStyle}

      />

    </div>

  );

}

function ErrorBox({ msg, onClose }) {

  return (

    <div style={{ background: '#fef2f2', border: `1px solid ${RED}40`, color: '#991b1b', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>

      <AlertCircle size={15} /> <span style={{ flex: 1 }}>{msg}</span>

      {onClose && <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#991b1b', cursor: 'pointer', fontWeight: 800 }}>×</button>}

    </div>

  );

}

function Note({ children }) {

  return <div style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic', padding: '8px 0' }}>{children}</div>;

}

function formatMoney(cents, currency) {

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: (currency || 'usd').toUpperCase() }).format((cents || 0) / 100);

}

// ─── STYLES ─────────────────────────────────────────────────────────

const pageStyle = { minHeight: '100vh', background: '#f8fafc', fontFamily: "'Segoe UI', Arial, sans-serif" };

const card = { background: '#fff', borderRadius: 14, padding: 24, border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };

const inputStyle = { width: '100%', padding: '11px 14px', border: '1.5px solid #cbd5e1', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' };

const labelStyle = { fontSize: 11, fontWeight: 800, color: '#475569', display: 'block', marginBottom: 6, letterSpacing: 0.5 };

const code = { background: '#1e293b', color: '#fbbf24', padding: '2px 7px', borderRadius: 4, fontFamily: 'monospace', fontSize: 11 };

const btnPrimary = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: GOLD, color: '#fff', border: 'none', padding: '11px 20px', borderRadius: 8, fontWeight: 800, fontSize: 13, cursor: 'pointer' };

const btnGhost = { display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', color: NAVY, border: '1.5px solid #e2e8f0', padding: '8px 14px', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' };

const btnSmall = { display: 'inline-flex', alignItems: 'center', gap: 4, background: NAVY, color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: 12, cursor: 'pointer', marginLeft: 'auto' };

const sectionHeader = { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid #f1f5f9' };

const h3 = { fontSize: 16, fontWeight: 900, color: NAVY, margin: 0 };

const productRow = { display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' };
