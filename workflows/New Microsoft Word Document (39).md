# New Microsoft Word Document (39)

Source: New Microsoft Word Document (39).docx

import \{ useEffect \} from 'react';

import \{ ArrowLeft, ArrowRight, Crown, ChevronDown \} from 'lucide\-react';

const NAVY = '\#0B1F45';

const GOLD = '\#D4A843';

export const ALL\_PHASES = \[

  \{ id: 'A', slug: 'BuyerList',              label: 'Building Cash Buyer List',  href: '/DealProcess/BuyerList' \},

  \{ id: 'B', slug: 'LeadCapture',            label: 'Lead Capture & Intake',     href: '/DealProcess/LeadCapture' \},

  \{ id: 'C', slug: 'LeadQualification',      label: 'Lead Qualification',         href: '/DealProcess/LeadQualification' \},

  \{ id: 'D', slug: 'DealAnalysis',           label: 'Deal Analysis',              href: '/DealProcess/DealAnalysis' \},

  \{ id: 'E', slug: 'OfferManagement',        label: 'Offer Management',           href: '/DealProcess/OfferManagement' \},

  \{ id: 'F', slug: 'ContractTracking',       label: 'Contract Tracking',          href: '/DealProcess/ContractTracking' \},

  \{ id: 'G', slug: 'MarketingToBuyers',      label: 'Marketing to Buyers',        href: '/DealProcess/MarketingToBuyers' \},

  \{ id: 'H', slug: 'TransactionCoordination',label: 'Transaction Coordination',   href: '/DealProcess/TransactionCoordination' \},

  \{ id: 'I', slug: 'ClosingPayout',          label: 'Closing & Payout',           href: '/DealProcess/ClosingPayout' \},

  \{ id: 'J', slug: 'PostDealFollowUp',       label: 'Post\-Deal Follow\-Up',        href: '/DealProcess/PostDealFollowUp' \},

\];

/\*\*

 \* Shared layout shell for all 10 deal\-process phase pages\.

 \* Provides hero, phase navigation, and consistent page chrome\.

 \*/

export default function PhasePageShell\(\{

  phaseId,           // 'A' through 'J'

  phaseNumber,       // 1–10

  title,

  subtitle,

  outcome,           // The single key outcome of this phase

  seoTitle,

  seoDescription,

  children,

\}\) \{

  const idx = ALL\_PHASES\.findIndex\(p => p\.id === phaseId\);

  const prev = idx > 0 ? ALL\_PHASES\[idx \- 1\] : null;

  const next = idx < ALL\_PHASES\.length \- 1 ? ALL\_PHASES\[idx \+ 1\] : null;

  useEffect\(\(\) => \{

    if \(seoTitle\) document\.title = seoTitle;

    if \(seoDescription\) \{

      let meta = document\.querySelector\('meta\[name="description"\]'\);

      if \(\!meta\) \{

        meta = document\.createElement\('meta'\);

        meta\.name = 'description';

        document\.head\.appendChild\(meta\);

      \}

      meta\.content = seoDescription;

    \}

  \}, \[seoTitle, seoDescription\]\);

  return \(

    <div style=\{\{ minHeight: '100vh', background: '\#f8fafc', fontFamily: "'Segoe UI', Arial, sans\-serif" \}\}>

      \{/\* Top nav \*/\}

      <header style=\{\{

        background: NAVY, padding: '14px 32px',

        display: 'flex', justifyContent: 'space\-between', alignItems: 'center',

        position: 'sticky', top: 0, zIndex: 100,

        boxShadow: '0 2px 12px rgba\(0,0,0,0\.15\)',

      \}\}>

        <a href="/DealProcess" style=\{\{ color: '\#fff', fontWeight: 900, fontSize: 15, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 \}\}>

          <ArrowLeft size=\{16\} /> Deal Process Hub

        </a>

        <div style=\{\{ display: 'flex', gap: 14, alignItems: 'center' \}\}>

          <span style=\{\{ color: '\#a0b0c8', fontSize: 12 \}\}>Phase \{phaseNumber\} of 10</span>

          <a href="/Pricing" style=\{\{

            background: GOLD, color: '\#fff', padding: '7px 16px', borderRadius: 8,

            textDecoration: 'none', fontWeight: 800, fontSize: 12,

            display: 'flex', alignItems: 'center', gap: 6,

          \}\}>

            <Crown size=\{13\} /> Upgrade

          </a>

        </div>

      </header>

      \{/\* Hero \*/\}

      <section style=\{\{

        background: \`linear\-gradient\(135deg, $\{NAVY\} 0%, \#122B5E 100%\)\`,

        padding: '60px 32px 80px', color: '\#fff',

        borderBottom: \`4px solid $\{GOLD\}\`,

        position: 'relative', overflow: 'hidden',

      \}\}>

        \{/\* Decorative grid \*/\}

        <div style=\{\{

          position: 'absolute', inset: 0,

          backgroundImage: 'radial\-gradient\(circle at 1px 1px, rgba\(255,255,255,0\.05\) 1px, transparent 0\)',

          backgroundSize: '40px 40px',

        \}\} />

        <div style=\{\{ maxWidth: 1280, margin: '0 auto', position: 'relative' \}\}>

          <div style=\{\{

            display: 'inline\-flex', alignItems: 'center', gap: 10,

            background: 'rgba\(212,168,67,0\.15\)', color: GOLD,

            padding: '6px 14px', borderRadius: 20,

            fontSize: 11, fontWeight: 800, letterSpacing: 2,

            border: \`1px solid $\{GOLD\}40\`, marginBottom: 22,

          \}\}>

            PHASE \{phaseId\} · \{String\(phaseNumber\)\.padStart\(2, '0'\)\} OF 10

          </div>

          <h1 style=\{\{

            fontSize: 'clamp\(32px, 5vw, 52px\)', fontWeight: 900,

            margin: '0 0 16px', lineHeight: 1\.1, maxWidth: 900,

          \}\}>

            \{title\}

          </h1>

          <p style=\{\{

            fontSize: 18, color: 'rgba\(255,255,255,0\.78\)',

            maxWidth: 720, lineHeight: 1\.6, margin: '0 0 28px',

          \}\}>

            \{subtitle\}

          </p>

          \{outcome && \(

            <div style=\{\{

              display: 'inline\-flex', alignItems: 'center', gap: 12,

              background: 'rgba\(22,163,74,0\.15\)', border: '1px solid rgba\(22,163,74,0\.4\)',

              padding: '10px 18px', borderRadius: 10,

            \}\}>

              <span style=\{\{ fontSize: 11, color: '\#86efac', fontWeight: 800, letterSpacing: 1 \}\}>KEY OUTCOME</span>

              <span style=\{\{ fontSize: 14, fontWeight: 700, color: '\#fff' \}\}>\{outcome\}</span>

            </div>

          \)\}

        </div>

      </section>

      \{/\* Phase progress bar \*/\}

      <div style=\{\{

        background: '\#fff', borderBottom: '1px solid \#e2e8f0',

        padding: '14px 32px', overflowX: 'auto',

      \}\}>

        <div style=\{\{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 6, alignItems: 'center' \}\}>

          \{ALL\_PHASES\.map\(p => \{

            const active = p\.id === phaseId;

            const passed = ALL\_PHASES\.findIndex\(x => x\.id === p\.id\) < idx;

            return \(

              <a key=\{p\.id\} href=\{p\.href\} style=\{\{

                flex: '0 0 auto', textDecoration: 'none',

                padding: '7px 13px', borderRadius: 8,

                background: active ? NAVY : passed ? '\#dcfce7' : '\#f1f5f9',

                color: active ? '\#fff' : passed ? '\#166534' : '\#64748b',

                fontWeight: active ? 800 : 600, fontSize: 12,

                whiteSpace: 'nowrap',

                border: active ? \`2px solid $\{GOLD\}\` : '1px solid transparent',

              \}\}>

                \{p\.id\}\. \{p\.label\}

              </a>

            \);

          \}\)\}

        </div>

      </div>

      \{/\* Page body \*/\}

      <main style=\{\{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px 80px' \}\}>

        \{children\}

      </main>

      \{/\* Prev / Next \*/\}

      <nav style=\{\{

        background: '\#fff', borderTop: '1px solid \#e2e8f0',

        padding: '24px 32px',

      \}\}>

        <div style=\{\{

          maxWidth: 1280, margin: '0 auto',

          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,

        \}\}>

          \{prev ? \(

            <a href=\{prev\.href\} style=\{\{

              padding: 18, borderRadius: 12, background: '\#f8fafc',

              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14,

              border: '1px solid \#e2e8f0', transition: 'all 0\.2s',

            \}\}>

              <ArrowLeft size=\{18\} color=\{NAVY\} />

              <div>

                <div style=\{\{ fontSize: 11, color: '\#64748b', fontWeight: 700, letterSpacing: 1 \}\}>PREVIOUS PHASE</div>

                <div style=\{\{ fontSize: 14, fontWeight: 800, color: NAVY \}\}>\{prev\.label\}</div>

              </div>

            </a>

          \) : <div />\}

          \{next ? \(

            <a href=\{next\.href\} style=\{\{

              padding: 18, borderRadius: 12, background: NAVY, color: '\#fff',

              textDecoration: 'none', display: 'flex', alignItems: 'center',

              justifyContent: 'flex\-end', gap: 14,

            \}\}>

              <div style=\{\{ textAlign: 'right' \}\}>

                <div style=\{\{ fontSize: 11, color: GOLD, fontWeight: 700, letterSpacing: 1 \}\}>NEXT PHASE</div>

                <div style=\{\{ fontSize: 14, fontWeight: 800 \}\}>\{next\.label\}</div>

              </div>

              <ArrowRight size=\{18\} color=\{GOLD\} />

            </a>

          \) : <div />\}

        </div>

      </nav>

      \{/\* Footer \*/\}

      <footer style=\{\{ background: NAVY, color: 'rgba\(255,255,255,0\.6\)', padding: '32px', textAlign: 'center', fontSize: 12 \}\}>

        Home\-Link CRM · The complete wholesaling SaaS platform · <a href="/Pricing" style=\{\{ color: GOLD, textDecoration: 'none', fontWeight: 700 \}\}>Start your 7\-day free trial →</a>

      </footer>

    </div>

  \);

\}
