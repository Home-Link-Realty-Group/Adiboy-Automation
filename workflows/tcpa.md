# tcpa

Source: tcpa.docx

import \{ useState \} from "react";

const CONSENT\_LANGUAGE = \`By submitting this form, I consent to receive calls, texts, and emails from Home\-Link Realty Group LLC at the number and email provided, including autodialed and prerecorded messages, regarding the purchase of my property\. I understand I may opt out at any time by replying STOP\. Message and data rates may apply\.\`;

const LAWSUIT\_STATS = \[

  \{ label: "TCPA Lawsuits YTD Sept 2025", value: "\+57\.9%", sub: "2,128 lawsuits filed", color: "\#e74c3c" \},

  \{ label: "Q1 2025 Class Actions", value: "\+112%", sub: "vs same period 2024", color: "\#e74c3c" \},

  \{ label: "Sept 2025 Spike", value: "\+283%", sub: "month\-over\-month", color: "\#e74c3c" \},

  \{ label: "Average Settlement", value: "$6\.6M\+", sub: "per class action", color: "\#f39c12" \},

  \{ label: "Per\-Violation Fine", value: "$500–$1,500", sub: "per call/text", color: "\#f39c12" \},

  \{ label: "TX DTPA", value: "LIVE", sub: "Since Sept 2025", color: "\#e74c3c" \},

\];

const TRUSTEDFORM\_PRODUCTS = \[

  \{ name: "TrustedForm Certify", icon: "📋", color: "\#3498db", use: "Install on YOUR forms — generates certificates for leads you collect", when: "Home\-Link GetOffer form — install NOW", priority: "URGENT" \},

  \{ name: "TrustedForm Retain", icon: "💾", color: "\#27ae60", use: "Stores certificates in your account \(90\-day TTL otherwise\)", when: "Enable immediately — certificates expire", priority: "URGENT" \},

  \{ name: "TrustedForm Verify", icon: "✅", color: "\#9b59b6", use: "Validates consent language meets YOUR requirements before accepting a lead", when: "When buying leads from third parties", priority: "High" \},

  \{ name: "TrustedForm Insights", icon: "🔍", color: "\#f39c12", use: "Lead metadata: time on page, age of lead, originating domain", when: "Quality scoring and fraud detection", priority: "Medium" \},

  \{ name: "Auto\-Retain", icon: "🔄", color: "\#1abc9c", use: "Automatically retains all certificates from your forms", when: "Recommended for first\-party lead generators", priority: "URGENT" \},

\];

const CERT\_CONTENTS = \[

  "Timestamp — exact date and time of form submission",

  "IP Address — consumer's IP at time of submission",

  "Geolocation — mapped from IP",

  "Browser and Operating System",

  "Time on Page — how long they spent on the form",

  "Lead Age — time since form submission",

  "Session Replay — video\-like recording of every field filled, scroll, click",

  "Consent Language — exact text shown near submit button",

  "Page URL — the exact URL where the lead was generated",

  "Facebook Lead ID \(for Facebook Lead Ads\)",

  "Submit button click — documented proof they intentionally submitted",

\];

const CONSENT\_ELEMENTS = \[

  \{ num: 1, item: "Company name", example: '"Home\-Link Realty Group LLC"' \},

  \{ num: 2, item: "Types of communication", example: '"calls, texts, and emails"' \},

  \{ num: 3, item: "Technology type", example: '"including autodialed and prerecorded messages"' \},

  \{ num: 4, item: "Subject matter", example: '"regarding the purchase of my property"' \},

  \{ num: 5, item: "Opt\-out mechanism", example: '"I may opt out at any time by replying STOP"' \},

  \{ num: 6, item: "Fee acknowledgment", example: '"Message and data rates may apply"' \},

\];

const PITFALLS = \[

  \{ title: "Outdated Consent", desc: "Consent from 2022 may not meet 2025 standards\. Courts require current, specific, revocable consent\.", severity: "HIGH" \},

  \{ title: "Generic 'Agree to Terms' Checkbox", desc: "Does NOT hold up in court\. Must be specific to marketing calls/texts\.", severity: "HIGH" \},

  \{ title: "Improper Opt\-Out Handling", desc: "Delayed removal from contact list = violation\. STOP = immediate removal\.", severity: "HIGH" \},

  \{ title: "AI Messaging Systems", desc: "If AI initiates contact without explicit consent, you're liable\.", severity: "HIGH" \},

  \{ title: "Cross\-Channel Confusion", desc: "Opted out of texts but still getting emails = regulators may view as violation\.", severity: "MEDIUM" \},

  \{ title: "Purchased Lists", desc: "Cold calling a purchased list without documented consent = HIGH RISK\.", severity: "HIGH" \},

  \{ title: "Overseas VA Liability", desc: "Overseas callers push liability BACK onto you — you are still the responsible party\.", severity: "HIGH" \},

\];

const INSTALL\_STEPS = \[

  \{ step: 1, title: "Sign Up", detail: "Go to activeprospect\.com/trustedform/certify — free tier available" \},

  \{ step: 2, title: "Get Script", detail: "Dashboard → Issuing Certificates tab → copy JavaScript snippet" \},

  \{ step: 3, title: "Add to Page", detail: "Add snippet to GetOffer page just before closing </body> tag" \},

  \{ step: 4, title: "Hidden Field Auto\-Injected", detail: 'TrustedForm adds: <input type="hidden" name="xxTrustedFormCertUrl">' \},

  \{ step: 5, title: "Save to CRM", detail: "On form submit, capture cert URL and save to lead's trustedform\_cert\_url field" \},

  \{ step: 6, title: "Verify Working", detail: 'Chrome → Inspect DOM → search "xxTrustedFormCertUrl" → should show cert\.trustedform\.com URL' \},

\];

const ACTION\_ITEMS = \{

  urgent: \[

    \{ action: "Install TrustedForm Certify on GetOffer", why: "TCPA protection — TX DTPA is live", how: "Sign up at activeprospect\.com/trustedform/certify → get script" \},

    \{ action: "Enable Auto\-Retain", why: "Certificates expire in 90 days without retention", how: "Toggle in TrustedForm dashboard after signup" \},

    \{ action: "Verify consent language is within 50px of submit button", why: "TrustedForm SDK requirement for session replay capture", how: "Inspect GetOffer form layout — move text if needed" \},

    \{ action: "Set up TrustedForm for Facebook Lead Ads", why: "Facebook leads need their own certificates", how: "Connect Facebook Page to LeadConduit OR use API method" \},

  \],

  high: \[

    \{ action: "Add Sub\-ID tracking to all UTM parameters", why: "Know which ad/platform produces best leads", how: "Add utm\_content with ad version to all social links" \},

    \{ action: "Add trustedform\_cert\_url field to Lead CRM entity", why: "Store proof of consent with every lead", how: "Already added to Lead entity schema ✅" \},

    \{ action: "Scrub contact list against known TCPA litigants", why: "One litigant can file a class action", how: "Use LeadConduit built\-in scrub OR TCPA litigant databases" \},

    \{ action: "Document VA consent chain", why: "Overseas VA liability = your liability", how: "Require VAs to use only consent\-captured leads; document transfers" \},

  \],

  ongoing: \[

    \{ action: "Review consent language annually", why: "FCC rules change; old consent may not hold", how: "Schedule annual review — next: April 2027" \},

    \{ action: "Honor STOP requests immediately", why: "Delayed opt\-out = violation", how: "handleIncomingSms STOP handler already built ✅" \},

    \{ action: "Audit communication channels quarterly", why: "Every automated channel carries TCPA risk", how: "Review all functions that send SMS/email" \},

    \{ action: "Keep TrustedForm certificates for minimum 4 years", why: "Statute of limitations on TCPA claims", how: "Use Auto\-Retain \+ backup storage" \},

  \],

\};

const GLOSSARY = \[

  \{ term: "TrustedForm Certificate", def: "Digital proof\-of\-consent document generated per form submission" \},

  \{ term: "TrustedForm Certify", def: "The script/SDK you install on your form to generate certificates" \},

  \{ term: "TrustedForm Retain", def: "Storing a certificate in your account \(preventing expiry\)" \},

  \{ term: "TrustedForm Verify", def: "Checking that consent language on a certificate meets your requirements" \},

  \{ term: "Auto\-Retain", def: "Automatic retention of all certificates from your forms" \},

  \{ term: "Certificate TTL", def: "Time\-to\-live: 90 days for lead events, 3 days for non\-submits" \},

  \{ term: "Prior express written consent", def: "The legal standard required before SMS/call marketing under TCPA" \},

  \{ term: "One\-to\-one consent", def: "FCC rule: each company needs its OWN consent \(not shared consent\)" \},

  \{ term: "Litigant scrub", def: "Checking phone numbers against a list of known TCPA lawsuit filers" \},

  \{ term: "Sub\-ID", def: "Tracking parameter appended to lead data to identify source" \},

  \{ term: "LeadConduit", def: "ActiveProspect's lead flow / routing / management platform" \},

  \{ term: "DTPA", def: "Deceptive Trade Practices Act — Texas\-specific law with private right of action \(LIVE Sept 2025\)" \},

\];

const QUALITY\_CHECKLIST = \[

  \{ item: "TrustedForm certificate URL captured", desc: "Proof of consent — required" \},

  \{ item: "Phone number validated", desc: "Real number, not VOIP\-only" \},

  \{ item: "Email validated", desc: "Real domain, not spam trap" \},

  \{ item: "Address validated", desc: "Actual property exists" \},

  \{ item: "Litigant scrub", desc: "Check against known TCPA litigant lists" \},

  \{ item: "Intent score ≥4", desc: "Don't add noise to CRM" \},

  \{ item: "Duplicate check", desc: "Same phone/email not already in CRM" \},

  \{ item: "Originating domain verified", desc: "Lead came from a legitimate source \(TrustedForm Insights\)" \},

\];

export default function TCPACompliance\(\) \{

  const \[activeTab, setActiveTab\] = useState\("overview"\);

  const \[copiedConsent, setCopiedConsent\] = useState\(false\);

  const \[expandedPitfall, setExpandedPitfall\] = useState\(null\);

  const copyConsent = \(\) => \{

    navigator\.clipboard\.writeText\(CONSENT\_LANGUAGE\);

    setCopiedConsent\(true\);

    setTimeout\(\(\) => setCopiedConsent\(false\), 2000\);

  \};

  const tabs = \[

    \{ id: "overview", label: "⚖️ TCPA Law" \},

    \{ id: "trustedform", label: "📋 TrustedForm" \},

    \{ id: "consent", label: "✍️ Consent Language" \},

    \{ id: "actions", label: "✅ Action Items" \},

    \{ id: "quality", label: "🔍 Lead Quality" \},

    \{ id: "glossary", label: "📖 Glossary" \},

  \];

  return \(

    <div style=\{\{ minHeight: "100vh", background: "linear\-gradient\(135deg, \#0a0a0a 0%, \#1a1a2e 50%, \#0a0a0a 100%\)", color: "white", fontFamily: "'Segoe UI', Arial, sans\-serif" \}\}>

      \{/\* HEADER \*/\}

      <div style=\{\{ background: "rgba\(255,255,255,0\.03\)", borderBottom: "1px solid rgba\(255,255,255,0\.08\)", padding: "16px 28px", display: "flex", justifyContent: "space\-between", alignItems: "center" \}\}>

        <div style=\{\{ display: "flex", alignItems: "center", gap: 14 \}\}>

          <div style=\{\{ width: 44, height: 44, borderRadius: 12, background: "linear\-gradient\(135deg, \#e74c3c, \#c0392b\)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 \}\}>⚖️</div>

          <div>

            <div style=\{\{ fontSize: 20, fontWeight: 900, letterSpacing: 1 \}\}>TCPA & TRUSTEDFORM COMPLIANCE</div>

            <div style=\{\{ fontSize: 11, color: "rgba\(255,255,255,0\.4\)" \}\}>Home\-Link Realty Group LLC — Legal Protection Intelligence | Updated April 2026</div>

          </div>

        </div>

        <div style=\{\{ display: "flex", gap: 10, alignItems: "center" \}\}>

          <div style=\{\{ background: "rgba\(231,76,60,0\.15\)", border: "1px solid rgba\(231,76,60,0\.4\)", borderRadius: 20, padding: "5px 14px", fontSize: 11, color: "\#e74c3c", fontWeight: 700 \}\}>⚠️ TX DTPA LIVE</div>

          <a href="/HQ" style=\{\{ background: "rgba\(255,255,255,0\.06\)", color: "rgba\(255,255,255,0\.6\)", padding: "8px 16px", borderRadius: 7, textDecoration: "none", fontSize: 12 \}\}>← HQ</a>

        </div>

      </div>

      \{/\* WARNING BANNER \*/\}

      <div style=\{\{ background: "linear\-gradient\(90deg, \#c0392b, \#e74c3c, \#c0392b\)", padding: "10px 28px", textAlign: "center", fontSize: 13, fontWeight: 600 \}\}>

        ⚠️ TCPA violations do NOT require intent — honest mistake = $500–$1,500 per call/text\. Class action average: $6\.6M\+

      </div>

      \{/\* TABS \*/\}

      <div style=\{\{ padding: "0 28px", borderBottom: "1px solid rgba\(255,255,255,0\.08\)", display: "flex", gap: 2, overflowX: "auto" \}\}>

        \{tabs\.map\(t => \(

          <button key=\{t\.id\} onClick=\{\(\) => setActiveTab\(t\.id\)\} style=\{\{ padding: "13px 16px", background: "none", border: "none", color: activeTab === t\.id ? "\#e74c3c" : "rgba\(255,255,255,0\.5\)", borderBottom: activeTab === t\.id ? "2px solid \#e74c3c" : "2px solid transparent", cursor: "pointer", fontSize: 13, fontWeight: activeTab === t\.id ? 700 : 400, whiteSpace: "nowrap" \}\}>

            \{t\.label\}

          </button>

        \)\)\}

      </div>

      <div style=\{\{ padding: 28, maxWidth: 1300, margin: "0 auto" \}\}>

        \{/\* ── TCPA LAW OVERVIEW ── \*/\}

        \{activeTab === "overview" && \(

          <div>

            \{/\* Lawsuit Stats \*/\}

            <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fit, minmax\(180px, 1fr\)\)", gap: 12, marginBottom: 24 \}\}>

              \{LAWSUIT\_STATS\.map\(\(s, i\) => \(

                <div key=\{i\} style=\{\{ background: "rgba\(255,255,255,0\.04\)", borderRadius: 12, padding: 16, textAlign: "center", borderTop: \`3px solid $\{s\.color\}\` \}\}>

                  <div style=\{\{ fontSize: 26, fontWeight: 900, color: s\.color \}\}>\{s\.value\}</div>

                  <div style=\{\{ fontSize: 11, color: "rgba\(255,255,255,0\.7\)", fontWeight: 600, marginTop: 4 \}\}>\{s\.label\}</div>

                  <div style=\{\{ fontSize: 10, color: "rgba\(255,255,255,0\.35\)", marginTop: 2 \}\}>\{s\.sub\}</div>

                </div>

              \)\)\}

            </div>

            \{/\* FCC One\-to\-One Rule \*/\}

            <div style=\{\{ background: "rgba\(231,76,60,0\.08\)", border: "2px solid rgba\(231,76,60,0\.3\)", borderRadius: 14, padding: 20, marginBottom: 20 \}\}>

              <div style=\{\{ fontWeight: 800, fontSize: 15, color: "\#e74c3c", marginBottom: 10 \}\}>🚨 FCC ONE\-TO\-ONE CONSENT RULE \(Effective Jan 27, 2025\)</div>

              <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 \}\}>

                <div style=\{\{ background: "rgba\(0,0,0,0\.2\)", borderRadius: 8, padding: 14 \}\}>

                  <div style=\{\{ fontSize: 11, color: "\#e74c3c", fontWeight: 700, marginBottom: 6 \}\}>❌ BEFORE \(Old Rule\)</div>

                  <div style=\{\{ fontSize: 12, color: "rgba\(255,255,255,0\.6\)", lineHeight: 1\.7 \}\}>One blanket consent could cover multiple companies\. A lead gen site could sell your info to 20 companies with one checkbox\.</div>

                </div>

                <div style=\{\{ background: "rgba\(0,0,0,0\.2\)", borderRadius: 8, padding: 14 \}\}>

                  <div style=\{\{ fontSize: 11, color: "\#27ae60", fontWeight: 700, marginBottom: 6 \}\}>✅ NOW \(Current Rule\)</div>

                  <div style=\{\{ fontSize: 12, color: "rgba\(255,255,255,0\.6\)", lineHeight: 1\.7 \}\}>Each company must obtain its OWN written consent from the consumer before contacting them\. <strong style=\{\{ color: "white" \}\}>Home\-Link must be named explicitly\.</strong></div>

                </div>

              </div>

              <div style=\{\{ marginTop: 12, background: "rgba\(243,156,18,0\.1\)", borderRadius: 8, padding: 12, fontSize: 12, color: "rgba\(255,255,255,0\.7\)", lineHeight: 1\.7 \}\}>

                <strong style=\{\{ color: "\#f39c12" \}\}>⚡ Eleventh Circuit Update \(2025\):</strong> The mandatory 1:1 rule was partially vacated, but the best practice of individual consent per company still stands and is the SAFEST operational posture\. <strong style=\{\{ color: "white" \}\}>Do not rely on the vacatur as a compliance shield\.</strong>

              </div>

            </div>

            \{/\* What TCPA Restricts \*/\}

            <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 \}\}>

              <div style=\{\{ background: "rgba\(255,255,255,0\.03\)", borderRadius: 14, padding: 20 \}\}>

                <div style=\{\{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: "\#e74c3c" \}\}>🚫 TCPA Restricts</div>

                \{\["Telemarketing calls", "Automated dialing systems \(autodialers\)", "Prerecorded/AI\-generated messages", "Unsolicited texts"\]\.map\(\(item, i\) => \(

                  <div key=\{i\} style=\{\{ display: "flex", gap: 8, padding: "6px 0", borderBottom: "1px solid rgba\(255,255,255,0\.05\)", fontSize: 12, color: "rgba\(255,255,255,0\.65\)" \}\}>

                    <span style=\{\{ color: "\#e74c3c" \}\}>✕</span> \{item\}

                  </div>

                \)\)\}

              </div>

              <div style=\{\{ background: "rgba\(255,255,255,0\.03\)", borderRadius: 14, padding: 20 \}\}>

                <div style=\{\{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: "\#27ae60" \}\}>✅ Valid Consent Requirements</div>

                \{\["Written — electronic checkbox or signature counts", "Clear and conspicuous — not buried in fine print", "Specific — must name Home\-Link Realty Group LLC", "Revocable — consumer can withdraw at any time", "Documented — stored with timestamp, IP, exact language"\]\.map\(\(item, i\) => \(

                  <div key=\{i\} style=\{\{ display: "flex", gap: 8, padding: "6px 0", borderBottom: "1px solid rgba\(255,255,255,0\.05\)", fontSize: 12, color: "rgba\(255,255,255,0\.65\)" \}\}>

                    <span style=\{\{ color: "\#27ae60" \}\}>✓</span> \{item\}

                  </div>

                \)\)\}

              </div>

            </div>

            \{/\* Common Pitfalls \*/\}

            <div style=\{\{ background: "rgba\(255,255,255,0\.03\)", borderRadius: 14, padding: 20 \}\}>

              <div style=\{\{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: "\#f39c12" \}\}>⚠️ Common Pitfalls — Avoid These</div>

              <div style=\{\{ display: "flex", flexDirection: "column", gap: 8 \}\}>

                \{PITFALLS\.map\(\(p, i\) => \(

                  <div key=\{i\} onClick=\{\(\) => setExpandedPitfall\(expandedPitfall === i ? null : i\)\}

                    style=\{\{ background: "rgba\(255,255,255,0\.03\)", borderRadius: 9, padding: "12px 16px", border: \`1px solid $\{p\.severity === "HIGH" ? "rgba\(231,76,60,0\.25\)" : "rgba\(243,156,18,0\.2\)"\}\`, cursor: "pointer", borderLeft: \`3px solid $\{p\.severity === "HIGH" ? "\#e74c3c" : "\#f39c12"\}\` \}\}>

                    <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center" \}\}>

                      <div style=\{\{ fontWeight: 700, fontSize: 13 \}\}>\{p\.title\}</div>

                      <div style=\{\{ display: "flex", gap: 8, alignItems: "center" \}\}>

                        <span style=\{\{ fontSize: 9, background: p\.severity === "HIGH" ? "rgba\(231,76,60,0\.2\)" : "rgba\(243,156,18,0\.2\)", color: p\.severity === "HIGH" ? "\#e74c3c" : "\#f39c12", borderRadius: 10, padding: "2px 8px", fontWeight: 700 \}\}>\{p\.severity\}</span>

                        <span style=\{\{ color: "rgba\(255,255,255,0\.3\)", fontSize: 12 \}\}>\{expandedPitfall === i ? "▲" : "▼"\}</span>

                      </div>

                    </div>

                    \{expandedPitfall === i && <div style=\{\{ marginTop: 8, fontSize: 12, color: "rgba\(255,255,255,0\.55\)", lineHeight: 1\.6 \}\}>\{p\.desc\}</div>\}

                  </div>

                \)\)\}

              </div>

            </div>

          </div>

        \)\}

        \{/\* ── TRUSTEDFORM ── \*/\}

        \{activeTab === "trustedform" && \(

          <div>

            <div style=\{\{ background: "rgba\(52,152,219,0\.08\)", border: "1px solid rgba\(52,152,219,0\.3\)", borderRadius: 14, padding: 20, marginBottom: 24 \}\}>

              <div style=\{\{ fontWeight: 800, fontSize: 15, color: "\#3498db", marginBottom: 8 \}\}>What TrustedForm Is</div>

              <div style=\{\{ fontSize: 13, color: "rgba\(255,255,255,0\.65\)", lineHeight: 1\.8 \}\}>

                A third\-party independent consent documentation platform by ActiveProspect\. Records a <strong style=\{\{ color: "white" \}\}>video\-like session replay</strong> of every form interaction, generating a unique Certificate URL per submission — an <strong style=\{\{ color: "white" \}\}>independently verifiable proof</strong> that consent was obtained\.

                <br/><br/>

                <strong style=\{\{ color: "\#3498db" \}\}>If sued:</strong> You don't just say "they consented" — you show a certificate with a video replay proving exactly what language they saw, when they saw it, and that they clicked submit\.

              </div>

            </div>

            \{/\* Products \*/\}

            <div style=\{\{ marginBottom: 24 \}\}>

              <div style=\{\{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: "rgba\(255,255,255,0\.7\)" \}\}>TrustedForm Product Suite</div>

              <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fill, minmax\(280px, 1fr\)\)", gap: 14 \}\}>

                \{TRUSTEDFORM\_PRODUCTS\.map\(\(p, i\) => \(

                  <div key=\{i\} style=\{\{ background: "rgba\(255,255,255,0\.03\)", border: \`1px solid $\{p\.color\}30\`, borderRadius: 12, padding: 18, borderTop: \`3px solid $\{p\.color\}\` \}\}>

                    <div style=\{\{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 \}\}>

                      <div style=\{\{ width: 36, height: 36, borderRadius: 9, background: p\.color \+ "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 \}\}>\{p\.icon\}</div>

                      <div>

                        <div style=\{\{ fontWeight: 700, fontSize: 13 \}\}>\{p\.name\}</div>

                        <span style=\{\{ fontSize: 9, background: p\.priority === "URGENT" ? "rgba\(231,76,60,0\.2\)" : "rgba\(243,156,18,0\.15\)", color: p\.priority === "URGENT" ? "\#e74c3c" : "\#f39c12", borderRadius: 10, padding: "2px 8px", fontWeight: 700 \}\}>\{p\.priority\}</span>

                      </div>

                    </div>

                    <div style=\{\{ fontSize: 12, color: "rgba\(255,255,255,0\.55\)", marginBottom: 8, lineHeight: 1\.6 \}\}>\{p\.use\}</div>

                    <div style=\{\{ fontSize: 11, color: p\.color, fontWeight: 600 \}\}>→ \{p\.when\}</div>

                  </div>

                \)\)\}

              </div>

            </div>

            \{/\* Certificate Contents \*/\}

            <div style=\{\{ background: "rgba\(255,255,255,0\.03\)", borderRadius: 14, padding: 20, marginBottom: 20 \}\}>

              <div style=\{\{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: "\#27ae60" \}\}>📄 What Every Certificate Contains</div>

              <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 \}\}>

                \{CERT\_CONTENTS\.map\(\(item, i\) => \(

                  <div key=\{i\} style=\{\{ display: "flex", gap: 8, padding: "7px 0", borderBottom: "1px solid rgba\(255,255,255,0\.05\)", fontSize: 12, color: "rgba\(255,255,255,0\.65\)" \}\}>

                    <span style=\{\{ color: "\#27ae60", flexShrink: 0 \}\}>✅</span> \{item\}

                  </div>

                \)\)\}

              </div>

              <div style=\{\{ marginTop: 12, background: "rgba\(243,156,18,0\.08\)", borderRadius: 8, padding: 10, fontSize: 12, color: "\#f39c12", fontWeight: 600 \}\}>

                ⏱ Certificate TTL: 90 days for lead events · 3 days for non\-submits · Must claim within 90 days or it expires permanently

              </div>

            </div>

            \{/\* Install Steps \*/\}

            <div style=\{\{ background: "rgba\(255,255,255,0\.03\)", borderRadius: 14, padding: 20 \}\}>

              <div style=\{\{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: "\#9b59b6" \}\}>🔧 Install TrustedForm Certify on GetOffer — Step by Step</div>

              <div style=\{\{ display: "flex", flexDirection: "column", gap: 10 \}\}>

                \{INSTALL\_STEPS\.map\(\(s, i\) => \(

                  <div key=\{i\} style=\{\{ display: "flex", gap: 14, alignItems: "flex\-start", padding: "10px 14px", background: "rgba\(155,89,182,0\.06\)", borderRadius: 9, border: "1px solid rgba\(155,89,182,0\.15\)", borderLeft: "3px solid \#9b59b6" \}\}>

                    <div style=\{\{ width: 26, height: 26, borderRadius: "50%", background: "\#9b59b6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, flexShrink: 0 \}\}>\{s\.step\}</div>

                    <div>

                      <div style=\{\{ fontWeight: 700, fontSize: 13, marginBottom: 2 \}\}>\{s\.title\}</div>

                      <div style=\{\{ fontSize: 12, color: "rgba\(255,255,255,0\.55\)", fontFamily: s\.detail\.includes\("<"\) ? "monospace" : "inherit" \}\}>\{s\.detail\}</div>

                    </div>

                  </div>

                \)\)\}

              </div>

              <div style=\{\{ marginTop: 14, display: "flex", gap: 10 \}\}>

                <a href="https://activeprospect\.com/trustedform/certify" target="\_blank" rel="noopener noreferrer" style=\{\{ textDecoration: "none" \}\}>

                  <button style=\{\{ background: "\#9b59b6", border: "none", color: "white", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 12, fontWeight: 700 \}\}>🚀 Sign Up for TrustedForm →</button>

                </a>

                <a href="https://activeprospect\.com" target="\_blank" rel="noopener noreferrer" style=\{\{ textDecoration: "none" \}\}>

                  <button style=\{\{ background: "rgba\(255,255,255,0\.06\)", border: "1px solid rgba\(255,255,255,0\.15\)", color: "white", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 12 \}\}>ActiveProspect Docs →</button>

                </a>

              </div>

            </div>

          </div>

        \)\}

        \{/\* ── CONSENT LANGUAGE ── \*/\}

        \{activeTab === "consent" && \(

          <div>

            \{/\* Live Consent Block \*/\}

            <div style=\{\{ background: "rgba\(39,174,96,0\.08\)", border: "2px solid rgba\(39,174,96,0\.4\)", borderRadius: 14, padding: 24, marginBottom: 24 \}\}>

              <div style=\{\{ fontWeight: 800, fontSize: 15, color: "\#27ae60", marginBottom: 6 \}\}>✅ CURRENT DEPLOYED CONSENT LANGUAGE</div>

              <div style=\{\{ fontSize: 11, color: "rgba\(255,255,255,0\.4\)", marginBottom: 14 \}\}>Copy\-ready — TCPA compliant as of April 2026</div>

              <div style=\{\{ background: "rgba\(0,0,0,0\.35\)", borderRadius: 10, padding: 18, fontSize: 14, color: "rgba\(255,255,255,0\.85\)", lineHeight: 1\.8, fontStyle: "italic", marginBottom: 14, border: "1px solid rgba\(39,174,96,0\.2\)" \}\}>

                "\{CONSENT\_LANGUAGE\}"

              </div>

              <div style=\{\{ display: "flex", gap: 10, flexWrap: "wrap" \}\}>

                <button onClick=\{copyConsent\} style=\{\{ background: copiedConsent ? "\#27ae60" : "linear\-gradient\(135deg, \#27ae60, \#1abc9c\)", border: "none", color: "white", borderRadius: 8, padding: "10px 22px", cursor: "pointer", fontSize: 13, fontWeight: 700 \}\}>

                  \{copiedConsent ? "✅ Copied\!" : "📋 Copy Consent Language"\}

                </button>

                <div style=\{\{ background: "rgba\(243,156,18,0\.1\)", border: "1px solid rgba\(243,156,18,0\.3\)", borderRadius: 8, padding: "10px 16px", fontSize: 12, color: "\#f39c12", fontWeight: 600 \}\}>

                  ⚠️ Must be within 50px of submit button

                </div>

                <div style=\{\{ background: "rgba\(231,76,60,0\.1\)", border: "1px solid rgba\(231,76,60,0\.3\)", borderRadius: 8, padding: "10px 16px", fontSize: 12, color: "\#e74c3c", fontWeight: 600 \}\}>

                  ✗ Checkbox must be UNCHECKED by default

                </div>

              </div>

            </div>

            \{/\* Required Elements \*/\}

            <div style=\{\{ background: "rgba\(255,255,255,0\.03\)", borderRadius: 14, padding: 20, marginBottom: 20 \}\}>

              <div style=\{\{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: "\#3498db" \}\}>📋 6 Required Consent Elements \(TCPA Compliant\)</div>

              <div style=\{\{ display: "flex", flexDirection: "column", gap: 10 \}\}>

                \{CONSENT\_ELEMENTS\.map\(\(el, i\) => \(

                  <div key=\{i\} style=\{\{ display: "flex", gap: 14, alignItems: "center", padding: "10px 14px", background: "rgba\(52,152,219,0\.06\)", borderRadius: 9, border: "1px solid rgba\(52,152,219,0\.15\)", borderLeft: "3px solid \#3498db" \}\}>

                    <div style=\{\{ width: 26, height: 26, borderRadius: "50%", background: "\#3498db", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, flexShrink: 0 \}\}>\{el\.num\}</div>

                    <div style=\{\{ flex: 1 \}\}>

                      <div style=\{\{ fontWeight: 700, fontSize: 13 \}\}>\{el\.item\}</div>

                      <div style=\{\{ fontSize: 11, color: "\#3498db", fontFamily: "monospace", marginTop: 2 \}\}>\{el\.example\}</div>

                    </div>

                    <span style=\{\{ color: "\#27ae60", fontSize: 16 \}\}>✅</span>

                  </div>

                \)\)\}

              </div>

            </div>

            \{/\* Format Rules \*/\}

            <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 \}\}>

              <div style=\{\{ background: "rgba\(39,174,96,0\.06\)", border: "1px solid rgba\(39,174,96,0\.2\)", borderRadius: 12, padding: 18 \}\}>

                <div style=\{\{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "\#27ae60" \}\}>✅ Valid Formats</div>

                \{\["Plain text near submit button", "Unchecked checkbox with disclosure text", "Electronic signature with disclosure", "Inline text directly above/below submit"\]\.map\(\(f, i\) => \(

                  <div key=\{i\} style=\{\{ fontSize: 12, color: "rgba\(255,255,255,0\.6\)", padding: "4px 0", borderBottom: "1px solid rgba\(255,255,255,0\.05\)" \}\}>✓ \{f\}</div>

                \)\)\}

              </div>

              <div style=\{\{ background: "rgba\(231,76,60,0\.06\)", border: "1px solid rgba\(231,76,60,0\.2\)", borderRadius: 12, padding: 18 \}\}>

                <div style=\{\{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "\#e74c3c" \}\}>❌ Invalid Formats</div>

                \{\["Pre\-checked checkbox", "Buried in Terms & Conditions footer", "Generic 'agree to all terms' language", "Verbal consent only \(no documentation\)"\]\.map\(\(f, i\) => \(

                  <div key=\{i\} style=\{\{ fontSize: 12, color: "rgba\(255,255,255,0\.6\)", padding: "4px 0", borderBottom: "1px solid rgba\(255,255,255,0\.05\)" \}\}>✕ \{f\}</div>

                \)\)\}

              </div>

            </div>

          </div>

        \)\}

        \{/\* ── ACTION ITEMS ── \*/\}

        \{activeTab === "actions" && \(

          <div>

            \{\[

              \{ label: "🚨 URGENT — Do First", key: "urgent", color: "\#e74c3c", bg: "rgba\(231,76,60,0\.08\)", border: "rgba\(231,76,60,0\.3\)" \},

              \{ label: "⚡ HIGH PRIORITY", key: "high", color: "\#f39c12", bg: "rgba\(243,156,18,0\.08\)", border: "rgba\(243,156,18,0\.3\)" \},

              \{ label: "🔄 ONGOING", key: "ongoing", color: "\#27ae60", bg: "rgba\(39,174,96,0\.08\)", border: "rgba\(39,174,96,0\.3\)" \},

            \]\.map\(\(section, si\) => \(

              <div key=\{si\} style=\{\{ background: section\.bg, border: \`1px solid $\{section\.border\}\`, borderRadius: 14, padding: 20, marginBottom: 20 \}\}>

                <div style=\{\{ fontWeight: 800, fontSize: 15, color: section\.color, marginBottom: 14 \}\}>\{section\.label\}</div>

                <div style=\{\{ display: "flex", flexDirection: "column", gap: 10 \}\}>

                  \{ACTION\_ITEMS\[section\.key\]\.map\(\(item, i\) => \(

                    <div key=\{i\} style=\{\{ background: "rgba\(0,0,0,0\.2\)", borderRadius: 10, padding: "14px 16px", border: \`1px solid $\{section\.color\}15\` \}\}>

                      <div style=\{\{ fontWeight: 700, fontSize: 13, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 \}\}>

                        \{item\.action\.includes\("✅"\) ? <span style=\{\{ color: "\#27ae60" \}\}>✅</span> : <span style=\{\{ color: section\.color \}\}>→</span>\}

                        \{item\.action\}

                      </div>

                      <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 \}\}>

                        <div style=\{\{ fontSize: 11, color: "rgba\(255,255,255,0\.4\)" \}\}>

                          <span style=\{\{ color: "rgba\(255,255,255,0\.25\)", fontWeight: 700 \}\}>WHY: </span>

                          \{item\.why\}

                        </div>

                        <div style=\{\{ fontSize: 11, color: "rgba\(255,255,255,0\.4\)" \}\}>

                          <span style=\{\{ color: "rgba\(255,255,255,0\.25\)", fontWeight: 700 \}\}>HOW: </span>

                          \{item\.how\}

                        </div>

                      </div>

                    </div>

                  \)\)\}

                </div>

              </div>

            \)\)\}

            \{/\* Quick Links \*/\}

            <div style=\{\{ background: "rgba\(255,255,255,0\.03\)", borderRadius: 14, padding: 20 \}\}>

              <div style=\{\{ fontWeight: 700, fontSize: 14, marginBottom: 14 \}\}>🔗 Quick Access Links</div>

              <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fill, minmax\(220px, 1fr\)\)", gap: 10 \}\}>

                \{\[

                  \{ label: "Sign Up — TrustedForm", url: "https://activeprospect\.com/trustedform/certify", color: "\#9b59b6" \},

                  \{ label: "ActiveProspect LeadConduit", url: "https://activeprospect\.com/leadconduit", color: "\#3498db" \},

                  \{ label: "FCC TCPA Resources", url: "https://www\.fcc\.gov/consumers/guides/stop\-unwanted\-calls\-and\-texts", color: "\#e74c3c" \},

                  \{ label: "TCPA World \(Legal Updates\)", url: "https://www\.tcpaworld\.com", color: "\#f39c12" \},

                \]\.map\(\(link, i\) => \(

                  <a key=\{i\} href=\{link\.url\} target="\_blank" rel="noopener noreferrer" style=\{\{ textDecoration: "none" \}\}>

                    <div style=\{\{ background: link\.color \+ "12", border: \`1px solid $\{link\.color\}30\`, borderRadius: 9, padding: "12px 16px", cursor: "pointer" \}\}

                      onMouseEnter=\{e => e\.currentTarget\.style\.background = link\.color \+ "22"\} onMouseLeave=\{e => e\.currentTarget\.style\.background = link\.color \+ "12"\}>

                      <div style=\{\{ fontSize: 12, fontWeight: 700, color: link\.color \}\}>\{link\.label\} →</div>

                    </div>

                  </a>

                \)\)\}

              </div>

            </div>

          </div>

        \)\}

        \{/\* ── LEAD QUALITY ── \*/\}

        \{activeTab === "quality" && \(

          <div>

            <div style=\{\{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: "\#3498db" \}\}>🔍 Lead Quality Verification Checklist</div>

            <div style=\{\{ background: "rgba\(52,152,219,0\.06\)", border: "1px solid rgba\(52,152,219,0\.2\)", borderRadius: 14, padding: 20, marginBottom: 20 \}\}>

              <div style=\{\{ fontSize: 13, color: "rgba\(255,255,255,0\.6\)", marginBottom: 16 \}\}>Run every lead through this checklist BEFORE adding to CRM\. Reject any lead that fails a HIGH priority check\.</div>

              <div style=\{\{ display: "flex", flexDirection: "column", gap: 10 \}\}>

                \{QUALITY\_CHECKLIST\.map\(\(item, i\) => \(

                  <div key=\{i\} style=\{\{ display: "flex", gap: 14, alignItems: "center", padding: "12px 16px", background: "rgba\(52,152,219,0\.06\)", borderRadius: 9, border: "1px solid rgba\(52,152,219,0\.12\)", borderLeft: "3px solid \#3498db" \}\}>

                    <div style=\{\{ width: 24, height: 24, borderRadius: 6, border: "2px solid \#3498db", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 \}\}>

                      <span style=\{\{ color: "\#27ae60", fontSize: 14 \}\}>✓</span>

                    </div>

                    <div>

                      <div style=\{\{ fontWeight: 700, fontSize: 13 \}\}>\{item\.item\}</div>

                      <div style=\{\{ fontSize: 11, color: "rgba\(255,255,255,0\.4\)", marginTop: 1 \}\}>\{item\.desc\}</div>

                    </div>

                  </div>

                \)\)\}

              </div>

            </div>

            \{/\* Sub\-ID Tracking \*/\}

            <div style=\{\{ background: "rgba\(155,89,182,0\.06\)", border: "1px solid rgba\(155,89,182,0\.2\)", borderRadius: 14, padding: 20 \}\}>

              <div style=\{\{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: "\#9b59b6" \}\}>🔖 Sub\-ID / UTM Tracking — Know Your ROI Per Ad</div>

              <div style=\{\{ fontSize: 13, color: "rgba\(255,255,255,0\.6\)", marginBottom: 14, lineHeight: 1\.7 \}\}>

                Without Sub\-IDs: "Facebook produced 20 leads\." <span style=\{\{ color: "\#e74c3c" \}\}>Useless\.</span><br/>

                With Sub\-IDs: "Facebook pain\_point\_v1 → 14 leads → 2 contracts = $28k\. Ad \#2 → 6 leads → $0\. Kill Ad \#2\." <span style=\{\{ color: "\#27ae60" \}\}>Actionable\.</span>

              </div>

              <div style=\{\{ background: "rgba\(0,0,0,0\.3\)", borderRadius: 8, padding: 14, fontFamily: "monospace", fontSize: 12, color: "\#9b59b6", marginBottom: 14, border: "1px solid rgba\(155,89,182,0\.2\)" \}\}>

                ?utm\_source=facebook&utm\_medium=paid&utm\_campaign=pain\_point\_v1&utm\_content=ad\_creative\_1

              </div>

              <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fill, minmax\(200px, 1fr\)\)", gap: 8 \}\}>

                \{\[

                  \{ key: "utm\_source", ex: "facebook, instagram, craigslist, tiktok" \},

                  \{ key: "utm\_medium", ex: "paid, organic, email, sms" \},

                  \{ key: "utm\_campaign", ex: "pain\_point, foreclosure, inherited" \},

                  \{ key: "utm\_content", ex: "v1, v2, headline\_h3, body\_b2" \},

                \]\.map\(\(u, i\) => \(

                  <div key=\{i\} style=\{\{ background: "rgba\(155,89,182,0\.08\)", borderRadius: 7, padding: "10px 12px", border: "1px solid rgba\(155,89,182,0\.15\)" \}\}>

                    <div style=\{\{ fontFamily: "monospace", color: "\#9b59b6", fontSize: 11, fontWeight: 700, marginBottom: 3 \}\}>\{u\.key\}</div>

                    <div style=\{\{ fontSize: 10, color: "rgba\(255,255,255,0\.4\)" \}\}>\{u\.ex\}</div>

                  </div>

                \)\)\}

              </div>

            </div>

          </div>

        \)\}

        \{/\* ── GLOSSARY ── \*/\}

        \{activeTab === "glossary" && \(

          <div>

            <div style=\{\{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: "rgba\(255,255,255,0\.7\)" \}\}>📖 Key Terms Glossary</div>

            <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fill, minmax\(380px, 1fr\)\)", gap: 10 \}\}>

              \{GLOSSARY\.map\(\(item, i\) => \(

                <div key=\{i\} style=\{\{ background: "rgba\(255,255,255,0\.03\)", borderRadius: 10, padding: "14px 16px", border: "1px solid rgba\(255,255,255,0\.07\)", borderLeft: "3px solid rgba\(52,152,219,0\.5\)" \}\}>

                  <div style=\{\{ fontWeight: 700, fontSize: 13, color: "\#3498db", marginBottom: 4, fontFamily: "monospace" \}\}>\{item\.term\}</div>

                  <div style=\{\{ fontSize: 12, color: "rgba\(255,255,255,0\.55\)", lineHeight: 1\.6 \}\}>\{item\.def\}</div>

                </div>

              \)\)\}

            </div>

            <div style=\{\{ marginTop: 20, background: "rgba\(255,255,255,0\.03\)", borderRadius: 12, padding: 16, fontSize: 11, color: "rgba\(255,255,255,0\.3\)", lineHeight: 1\.8 \}\}>

              Intelligence compiled from 20\+ ActiveProspect blog articles \+ legal analysis from Gleam Law, Alpha Media, CompliancePoint, TCPA World, National Law Review\.<br/>

              Last updated: April 2026 | Apply to all lead gen operations, form design, SMS automation, and call handling\.

            </div>

          </div>

        \)\}

      </div>

      <div style=\{\{ textAlign: "center", padding: "16px", borderTop: "1px solid rgba\(255,255,255,0\.05\)", color: "rgba\(255,255,255,0\.18\)", fontSize: 10 \}\}>

        Home\-Link Realty Group LLC — TCPA & TrustedForm Compliance Reference — Not Legal Advice — Consult Attorney for Specific Situations

      </div>

      <style>\{\`\* \{ box\-sizing: border\-box; \} ::\-webkit\-scrollbar \{ width: 4px; \} ::\-webkit\-scrollbar\-thumb \{ background: rgba\(255,255,255,0\.1\); border\-radius: 2px; \}\`\}</style>

    </div>

  \);

\}
