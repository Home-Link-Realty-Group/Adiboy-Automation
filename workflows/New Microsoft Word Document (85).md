# New Microsoft Word Document (85)

Source: New Microsoft Word Document (85).docx

import \{ Sparkles, Lock, Phone, Database, ArrowRight \} from 'lucide\-react';

const NAVY = '\#0B1F45';

const GOLD = '\#D4A843';

/\*\*

 \* First step in onboarding — sets expectations\.

 \* User cannot skip past this without clicking "Begin Setup"\.

 \*/

export default function WelcomeStep\(\{ userEmail, planName, onContinue \}\) \{

  return \(

    <div>

      <div style=\{\{

        background: \`linear\-gradient\(135deg, $\{NAVY\}, \#122B5E\)\`,

        borderRadius: 16, padding: 32, color: '\#fff', marginBottom: 28,

        textAlign: 'center',

      \}\}>

        <div style=\{\{

          width: 64, height: 64, borderRadius: '50%',

          background: GOLD, margin: '0 auto 16px',

          display: 'flex', alignItems: 'center', justifyContent: 'center',

        \}\}>

          <Sparkles size=\{32\} color="\#fff" />

        </div>

        <h2 style=\{\{ fontSize: 28, fontWeight: 900, margin: '0 0 8px' \}\}>

          Welcome to ProFlow CRM

        </h2>

        <p style=\{\{ fontSize: 15, color: 'rgba\(255,255,255,0\.8\)', margin: '0 0 4px' \}\}>

          Your <strong style=\{\{ color: GOLD \}\}>\{planName\}</strong> subscription is active\.

        </p>

        <p style=\{\{ fontSize: 13, color: 'rgba\(255,255,255,0\.6\)', margin: 0 \}\}>

          \{userEmail\}

        </p>

      </div>

      <div style=\{\{ background: '\#fef2f2', border: '2px solid \#fca5a5', borderRadius: 12, padding: 20, marginBottom: 24, display: 'flex', gap: 14 \}\}>

        <Lock size=\{22\} color="\#dc2626" style=\{\{ flexShrink: 0, marginTop: 2 \}\} />

        <div>

          <div style=\{\{ fontWeight: 900, fontSize: 15, color: '\#991b1b', marginBottom: 6 \}\}>

            One\-Time Setup Required \(≈ 15 minutes\)

          </div>

          <div style=\{\{ fontSize: 13, color: '\#7f1d1d', lineHeight: 1\.6 \}\}>

            ProFlow CRM is a <strong>Bring\-Your\-Own\-Account</strong> platform\. You connect your own Twilio \(calls/SMS\) and Apify \(lead scraping\) accounts so you own your data and pay wholesale rates directly\. <strong>You cannot access the CRM until both critical accounts are connected and verified\.</strong> This protects you legally \(TCPA compliance\) and ensures every feature works the moment you log in\.

          </div>

        </div>

      </div>

      <div style=\{\{ marginBottom: 28 \}\}>

        <h3 style=\{\{ fontSize: 16, fontWeight: 900, color: NAVY, margin: '0 0 14px' \}\}>🎯 What You'll Connect Today</h3>

        <div style=\{\{ display: 'flex', flexDirection: 'column', gap: 12 \}\}>

          <RequirementCard

            icon=\{Phone\}

            title="Twilio Account"

            description="Powers Power Dialer, voicemail drop, two\-way SMS, and inbound call tracking\. You bring your own Twilio account so you pay wholesale rates directly — no markup from us\."

            timeEstimate="~10 min"

            critical

          />

          <RequirementCard

            icon=\{Database\}

            title="Apify Account"

            description="Powers pre\-foreclosure scraping, FSBO finder, vacant property lookup, and cash buyer discovery\. Free plan is plenty to get started — no credit card required\."

            timeEstimate="~5 min"

            critical

          />

        </div>

      </div>

      <div style=\{\{ background: '\#f8fafc', borderRadius: 12, padding: 18, marginBottom: 28, border: '1px solid \#e2e8f0' \}\}>

        <div style=\{\{ fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 8, letterSpacing: 0\.5 \}\}>📌 BEFORE YOU BEGIN, GRAB:</div>

        <ul style=\{\{ margin: 0, paddingLeft: 20, fontSize: 13, color: '\#475569', lineHeight: 1\.8 \}\}>

          <li>Your business email \(you'll use this on both platforms\)</li>

          <li>A personal cell phone \(Twilio sends a verification SMS\)</li>

          <li>About 15 minutes of focused time — don't skip steps</li>

        </ul>

      </div>

      <button onClick=\{onContinue\} style=\{\{

        width: '100%',

        background: GOLD,

        color: '\#fff',

        border: 'none',

        borderRadius: 12,

        padding: '16px',

        fontWeight: 900,

        fontSize: 15,

        cursor: 'pointer',

        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,

      \}\}>

        Begin Setup <ArrowRight size=\{18\} />

      </button>

    </div>

  \);

\}

function RequirementCard\(\{ icon: Icon, title, description, timeEstimate, critical \}\) \{

  return \(

    <div style=\{\{

      background: '\#fff', borderRadius: 12, padding: 16,

      border: '1\.5px solid \#e2e8f0',

      borderLeft: \`4px solid $\{critical ? '\#dc2626' : NAVY\}\`,

      display: 'flex', gap: 14, alignItems: 'flex\-start',

    \}\}>

      <div style=\{\{

        width: 40, height: 40, borderRadius: 8,

        background: '\#f1f5f9',

        display: 'flex', alignItems: 'center', justifyContent: 'center',

        flexShrink: 0,

      \}\}>

        <Icon size=\{20\} color=\{NAVY\} />

      </div>

      <div style=\{\{ flex: 1 \}\}>

        <div style=\{\{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' \}\}>

          <span style=\{\{ fontWeight: 900, fontSize: 14, color: NAVY \}\}>\{title\}</span>

          \{critical && <span style=\{\{ fontSize: 9, fontWeight: 800, color: '\#dc2626', background: '\#fef2f2', padding: '2px 6px', borderRadius: 3, letterSpacing: 0\.5 \}\}>REQUIRED</span>\}

          <span style=\{\{ fontSize: 11, color: '\#64748b', marginLeft: 'auto' \}\}>⏱ \{timeEstimate\}</span>

        </div>

        <p style=\{\{ fontSize: 12, color: '\#64748b', lineHeight: 1\.5, margin: 0 \}\}>\{description\}</p>

      </div>

    </div>

  \);

\}
