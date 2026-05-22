# stripestorefront

Source: stripestorefront.docx

/\*\*

 \* Public storefront for a connected account\.

 \*

 \* URL pattern: /StripeConnect/Store/:accountId

 \*

 \* NOTE: Using the Stripe account ID in the URL is fine for a demo, but in

 \* production you should use a slug \(e\.g\. /store/acme\-realty\) and look up the

 \* account ID server\-side\. This avoids leaking Stripe internals to end users\.

 \*/

import \{ useState, useEffect \} from 'react';

import \{ useParams \} from 'react\-router\-dom';

import \{ base44 \} from '@/api/base44Client';

import \{ ShoppingCart, Loader, CheckCircle2, AlertCircle, Package \} from 'lucide\-react';

const NAVY = '\#0B1F45';

const GOLD = '\#D4A843';

const GREEN = '\#16a34a';

// PLACEHOLDER — your platform's cut on every transaction \(in cents\)

// 5% → set to 5% of the price, or use a flat fee like 100 \($1\)\.

// Compute dynamically server\-side in production\. For demo: 5% rounded down\.

function calcAppFee\(priceCents\) \{

  return Math\.floor\(priceCents \* 0\.05\);

\}

export default function StripeConnectStorefront\(\) \{

  const \{ accountId \} = useParams\(\);

  const \[products, setProducts\] = useState\(\[\]\);

  const \[loading, setLoading\] = useState\(true\);

  const \[buying, setBuying\] = useState\(''\);

  const \[error, setError\] = useState\(''\);

  const \[merchantName, setMerchantName\] = useState\(''\);

  useEffect\(\(\) => \{

    document\.title = 'Storefront | Home\-Link';

    if \(accountId\) loadStore\(\);

    // Show a success toast if returning from checkout

    const params = new URLSearchParams\(window\.location\.search\);

    if \(params\.get\('success'\) === 'true'\) \{

      // Could trigger a toast here; minimal demo just leaves URL state visible\.

    \}

  \}, \[accountId\]\);

  async function loadStore\(\) \{

    setLoading\(true\);

    try \{

      // Fetch products list

      const productsRes = await base44\.functions\.invoke\('connectProducts', \{

        action: 'list',

        account\_id: accountId,

      \}\);

      const pd = productsRes\.data || productsRes;

      if \(pd\.ok\) setProducts\(pd\.products || \[\]\);

      // Fetch merchant display name

      const statusRes = await base44\.functions\.invoke\('connectAccountStatus', \{ account\_id: accountId \}\);

      const sd = statusRes\.data || statusRes;

      if \(sd\.ok && sd\.account?\.display\_name\) setMerchantName\(sd\.account\.display\_name\);

    \} catch \(e\) \{ console\.error\(e\); \}

    setLoading\(false\);

  \}

  async function handleBuy\(product\) \{

    if \(window\.self \!== window\.top\) \{

      alert\('Checkout works only from the published app, not the preview\.'\);

      return;

    \}

    if \(\!product\.default\_price\) \{

      setError\('This product has no price configured\.'\);

      return;

    \}

    setBuying\(product\.id\);

    setError\(''\);

    try \{

      const res = await base44\.functions\.invoke\('connectCheckout', \{

        action: 'storefront',

        account\_id: accountId,

        price\_id: product\.default\_price\.id,

        quantity: 1,

        application\_fee\_cents: calcAppFee\(product\.default\_price\.unit\_amount\),

      \}\);

      const data = res\.data || res;

      if \(data\.ok && data\.url\) \{

        window\.location\.href = data\.url;

      \} else \{

        setError\(data\.error || 'Failed to start checkout'\);

      \}

    \} catch \(e\) \{ setError\(e\.message\); \}

    setBuying\(''\);

  \}

  const params = new URLSearchParams\(window\.location\.search\);

  const justSucceeded = params\.get\('success'\) === 'true';

  const justCanceled = params\.get\('canceled'\) === 'true';

  return \(

    <div style=\{\{ minHeight: '100vh', background: '\#f8fafc', fontFamily: "'Segoe UI', Arial, sans\-serif" \}\}>

      <header style=\{\{ background: NAVY, padding: '18px 24px', textAlign: 'center', color: '\#fff' \}\}>

        <div style=\{\{ fontSize: 11, color: GOLD, letterSpacing: 2, fontWeight: 800, marginBottom: 4 \}\}>SECURE STOREFRONT · POWERED BY STRIPE</div>

        <h1 style=\{\{ fontSize: 22, fontWeight: 900, margin: 0 \}\}>\{merchantName || 'Storefront'\}</h1>

      </header>

      <main style=\{\{ maxWidth: 900, margin: '32px auto', padding: '0 20px 60px' \}\}>

        \{justSucceeded && \(

          <div style=\{\{ background: '\#f0fdf4', border: \`2px solid $\{GREEN\}\`, borderRadius: 12, padding: 16, marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center' \}\}>

            <CheckCircle2 size=\{26\} color=\{GREEN\} />

            <div>

              <div style=\{\{ fontWeight: 900, color: GREEN \}\}>Payment successful\! 🎉</div>

              <div style=\{\{ fontSize: 13, color: '\#166534' \}\}>You'll receive a receipt by email shortly\.</div>

            </div>

          </div>

        \)\}

        \{justCanceled && \(

          <div style=\{\{ background: '\#fef2f2', border: '1\.5px solid \#fecaca', borderRadius: 12, padding: 16, marginBottom: 20, color: '\#991b1b', fontSize: 14 \}\}>

            Checkout canceled\. No charge was made\.

          </div>

        \)\}

        \{error && \(

          <div style=\{\{ background: '\#fef2f2', color: '\#991b1b', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 \}\}>

            <AlertCircle size=\{15\} /> \{error\}

          </div>

        \)\}

        \{loading ? \(

          <div style=\{\{ textAlign: 'center', padding: 80, color: '\#64748b' \}\}>

            <Loader size=\{26\} className="spin" />

            <div style=\{\{ marginTop: 10 \}\}>Loading products…</div>

          </div>

        \) : products\.length === 0 ? \(

          <div style=\{\{ background: '\#fff', borderRadius: 12, padding: 60, textAlign: 'center', color: '\#64748b' \}\}>

            <Package size=\{36\} style=\{\{ margin: '0 auto 12px', opacity: 0\.4 \}\} />

            <div style=\{\{ fontWeight: 700, color: NAVY, marginBottom: 4 \}\}>No products available yet</div>

            <div style=\{\{ fontSize: 13 \}\}>This merchant hasn't published any products\.</div>

          </div>

        \) : \(

          <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto\-fill, minmax\(280px, 1fr\)\)', gap: 18 \}\}>

            \{products\.map\(p => \(

              <div key=\{p\.id\} style=\{\{ background: '\#fff', borderRadius: 14, padding: 22, border: '1\.5px solid \#e2e8f0', display: 'flex', flexDirection: 'column' \}\}>

                <div style=\{\{ flex: 1 \}\}>

                  <div style=\{\{ fontWeight: 900, color: NAVY, fontSize: 17, marginBottom: 8 \}\}>\{p\.name\}</div>

                  \{p\.description && <div style=\{\{ fontSize: 13, color: '\#64748b', lineHeight: 1\.55, marginBottom: 14 \}\}>\{p\.description\}</div>\}

                </div>

                <div style=\{\{ fontSize: 24, fontWeight: 900, color: GREEN, marginBottom: 14 \}\}>

                  \{p\.default\_price ? formatMoney\(p\.default\_price\.unit\_amount, p\.default\_price\.currency\) : '—'\}

                </div>

                <button

                  onClick=\{\(\) => handleBuy\(p\)\}

                  disabled=\{buying === p\.id || \!p\.default\_price\}

                  style=\{\{

                    background: GOLD, color: '\#fff', border: 'none',

                    padding: '12px', borderRadius: 8, fontWeight: 800,

                    fontSize: 13, cursor: buying === p\.id ? 'not\-allowed' : 'pointer',

                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,

                  \}\}>

                  \{buying === p\.id ? <><Loader size=\{14\} className="spin" /> Loading…</> : <><ShoppingCart size=\{14\} /> Buy Now</>\}

                </button>

              </div>

            \)\)\}

          </div>

        \)\}

        <div style=\{\{ marginTop: 36, textAlign: 'center', fontSize: 11, color: '\#94a3b8' \}\}>

          🔒 Secure checkout powered by Stripe · Account ID: <code>\{accountId\}</code>

        </div>

      </main>

      <style>\{\`@keyframes spin \{ to \{ transform: rotate\(360deg\); \} \} \.spin \{ animation: spin 1s linear infinite; \}\`\}</style>

    </div>

  \);

\}

function formatMoney\(cents, currency\) \{

  return new Intl\.NumberFormat\('en\-US', \{ style: 'currency', currency: \(currency || 'usd'\)\.toUpperCase\(\) \}\)\.format\(\(cents || 0\) / 100\);

\}
