# virtualmailbox

Source: virtualmailbox.docx

import { useState } from "react";

import { Building2 } from "lucide-react";

import SaaSLayout from "@/components/saas/SaaSLayout";

// ─────────────────────────────────────────────────────────────────────────────

// HOME-LINK REALTY GROUP — VIRTUAL MAILBOX SETUP CENTER

// Complete guide + address tracker for the business mailing address system

// ─────────────────────────────────────────────────────────────────────────────

const LOGO = "https://media.base44.com/images/public/69d48a8432b834f7bfa0beaa/4450143b1_Home-LinkLogo.png";

const COMPANY = "Home-Link Realty Group LLC";

// Best Dallas addresses from Anytime Mailbox — sorted by value

const TOP_ADDRESSES = [

  {

    rank: 1,

    badge: "⭐ Best Value",

    badgeColor: "#27ae60",

    name: "Dallas — Campbell Rd",

    address: "7522 Campbell Rd",

    city: "Dallas, TX 75248",

    price: "$9.99/mo",

    why: "North Dallas zip (75248) — high-income area, strong real estate market signal. Best price-to-credibility ratio in DFW.",

    url: "https://www.anytimemailbox.com/l/dallas-campbell-rd",

    pros: ["Most affordable Dallas address", "75248 = prestigious North Dallas zip", "Near major real estate activity zones", "Real street address (not PO Box)"],

  },

  {

    rank: 2,

    badge: "🏢 Most Professional",

    badgeColor: "#2563eb",

    name: "Dallas — McKinney Ave",

    address: "3839 McKinney Avenue",

    city: "Dallas, TX 75204",

    price: "$14.99/mo",

    why: "Uptown Dallas — the most recognized business district in DFW. Sellers and buyers immediately recognize McKinney Ave as legit.",

    url: "https://www.anytimemailbox.com/l/dallas-mckinney-ave",

    pros: ["Uptown Dallas — premium business area", "Instantly recognizable address to locals", "Strong Google Maps credibility", "Great for business cards + letterhead"],

  },

  {

    rank: 3,

    badge: "📍 Downtown Presence",

    badgeColor: "#7c3aed",

    name: "Dallas — Akard Street",

    address: "110 N Akard St",

    city: "Dallas, TX 75201",

    price: "$19.99/mo",

    why: "Downtown Dallas CBD. Maximum authority for a real estate company. 75201 is the most recognizable Dallas business zip code nationwide.",

    url: "https://www.anytimemailbox.com/l/dallas-akard-street",

    pros: ["Downtown Dallas 75201 zip", "Maximum corporate credibility", "Best for nationwide seller trust", "Strong for Google Business Profile ranking"],

  },

];

const SETUP_STEPS = [

  {

    phase: "Phase 1 — Get Your Address",

    color: "#27ae60",

    icon: "📬",

    steps: [

      {

        n: "1",

        title: "Sign up at Anytime Mailbox",

        action: "Go to anytimemailbox.com → click 'Get a Mailbox' → search 'Dallas, TX'",

        detail: "Select your preferred address from the list above. The $9.99 Campbell Rd address is the best starting point. You can upgrade later.",

        cta: "https://www.anytimemailbox.com/l/usa/texas",

        ctaLabel: "→ Open Anytime Mailbox Texas",

        tip: "Use your business email (jacob.levy@homelinkrealtygroup.com) when signing up — not your personal Gmail.",

        time: "10 min",

      },

      {

        n: "2",

        title: "Complete USPS Form 1583",

        action: "Anytime Mailbox will email you Form 1583 — the USPS authorization form for virtual mailboxes.",

        detail: "This is a federal requirement. You'll need: your government-issued ID, and a second ID (passport, credit card, or utility bill). You can notarize digitally through the Anytime Mailbox app — no in-person trip needed.",

        tip: "This takes about 15 minutes total. Do it the same day you sign up or your mailbox won't activate.",

        time: "15 min",

      },

      {

        n: "3",

        title: "Get your Suite number",

        action: "Once active, your address will look like: 7522 Campbell Rd Ste [YOUR #], Dallas, TX 75248",

        detail: "The suite number is assigned to you — it's what makes it a unique business address (not a PO Box). This is the address you'll use everywhere.",

        tip: "Write this address down immediately. You'll be updating it in 8+ places.",

        time: "Instant after activation",

      },

    ],

  },

  {

    phase: "Phase 2 — Update Your LLC",

    color: "#f59e0b",

    icon: "⚖️",

    steps: [

      {

        n: "4",

        title: "Update your LLC registered address with the State of Texas",

        action: "Go to sos.state.tx.us → Business Center → File a Change of Registered Agent/Address",

        detail: "You'll update your registered address for Home-Link Realty Group LLC to your new virtual mailbox address. This keeps your LLC in good standing and ensures legal mail reaches you.",

        cta: "https://www.sos.state.tx.us/corp/forms_option.shtml",

        ctaLabel: "→ Texas Secretary of State",

        tip: "The filing fee is typically $15. Takes 2–3 business days to process.",

        time: "20 min",

      },

      {

        n: "5",

        title: "Update your EIN / IRS records",

        action: "Call IRS Business & Specialty Tax Line: 1-800-829-4933",

        detail: "Let them know your business address has changed. They'll update your EIN records so tax correspondence goes to your new mailbox. You can also do this by mailing IRS Form 8822-B.",

        tip: "Have your EIN and old address ready when you call. Hold times average 20–40 min — call right when they open at 7am local time.",

        time: "30 min (call) or 2 weeks (mail)",

      },

    ],

  },

  {

    phase: "Phase 3 — Update Google Business Profile",

    color: "#2563eb",

    icon: "📍",

    steps: [

      {

        n: "6",

        title: "Add address to Google Business Profile",

        action: "Go to business.google.com → Edit Profile → Business location → Enter your new address",

        detail: "This is the BIGGEST impact action. A physical address unlocks Google Maps listing, local pack rankings, and the ability to receive Google reviews. Without an address, you're invisible in local search.",

        cta: "https://business.google.com",

        ctaLabel: "→ Open Google Business Profile",

        tip: "IMPORTANT: When asked 'Do you serve customers at this location?' — select NO (service area business). Then add your target service area: Dallas-Fort Worth, Texas, or Nationwide.",

        warning: "Google will send a postcard with a verification PIN to your new mailbox address. Anytime Mailbox will scan it and send it to you digitally. This usually takes 5–10 days. DON'T skip this step — it's what unlocks your Google Maps presence.",

        time: "10 min setup + 5-10 day postcard wait",

      },

      {

        n: "7",

        title: "Verify your GBP via postcard",

        action: "Check your Anytime Mailbox app daily until the Google postcard arrives → enter the 5-digit PIN in your GBP dashboard",

        detail: "Once verified, your business appears on Google Maps, in the Local Pack (the 3 businesses that show at the top of search results), and becomes eligible for Google Reviews. This is worth thousands in organic leads.",

        tip: "Set up the Anytime Mailbox app on your phone with push notifications so you know the second the postcard arrives.",

        time: "5 min (when postcard arrives)",

      },

    ],

  },

  {

    phase: "Phase 4 — Update All Business Listings",

    color: "#8b5cf6",

    icon: "📋",

    steps: [

      {

        n: "8",

        title: "Update your website",

        action: "Add the address to your website footer, contact page, and schema markup",

        detail: "Consistent NAP (Name, Address, Phone) across your website and listings is one of the top local SEO ranking factors. Every place that shows your business info needs to match exactly.",

        tip: "Your address format must be IDENTICAL everywhere: 'Home-Link Realty Group LLC · 7522 Campbell Rd Ste [#], Dallas, TX 75248 · (855) 810-1786'",

        time: "15 min — I'll do this for you",

      },

      {

        n: "9",

        title: "Submit to top business directories",

        action: "Update or create listings on: Yelp, Bing Places, Apple Maps, Facebook Business, BBB.org, Yellow Pages, Manta, Hotfrog",

        detail: "These citations reinforce your NAP consistency and feed Google's trust signals. Every consistent citation is a vote of confidence for your local ranking.",

        cta: "https://bingplaces.com",

        ctaLabel: "→ Bing Places (start here)",

        tip: "Use exactly the same business name, address, and phone number on every single directory. Even small differences (LLC vs no LLC, suite vs ste) hurt your ranking.",

        time: "45 min total for all directories",

      },

      {

        n: "10",

        title: "Apply for BBB Accreditation",

        action: "Go to bbb.org/get-accredited → select your state → fill out the application",

        detail: "BBB accreditation is a massive trust signal for motivated sellers who are skeptical. The BBB badge on your website can increase conversion rates by 15–20%. Application is free — accreditation costs $50–$150/year depending on business size.",

        cta: "https://www.bbb.org/get-accredited",

        ctaLabel: "→ Apply for BBB Accreditation",

        tip: "You'll need your business name, address, EIN, and a description of services. Takes about 20 minutes to fill out. Approval usually takes 2–4 weeks.",

        time: "20 min",

      },

    ],

  },

];

const COST_BREAKDOWN = [

  { item: "Anytime Mailbox (Campbell Rd, Dallas)", cost: "$9.99/mo", annual: "$120/yr", priority: "Required" },

  { item: "Texas LLC Address Update (Secretary of State)", cost: "$15 one-time", annual: "$15", priority: "Required" },

  { item: "BBB Accreditation", cost: "$50–$150/yr", annual: "$100", priority: "Recommended" },

  { item: "Google Business Profile", cost: "FREE", annual: "$0", priority: "Critical" },

  { item: "Bing / Yelp / Apple Maps", cost: "FREE", annual: "$0", priority: "High" },

];

const NAP_TEMPLATE = {

  name: "Home-Link Realty Group LLC",

  address: "7522 Campbell Rd Ste [YOUR SUITE #]",

  city: "Dallas, TX 75248",

  phone: "(855) 810-1786",

  email: "jacob.levy@homelinkrealtygroup.com",

  website: "https://home-link-realty-group.base44.app",

};

export default function VirtualMailbox() {

  const [activeTab, setActiveTab] = useState("guide");

  const [completedSteps, setCompletedSteps] = useState({});

  const [selectedAddress, setSelectedAddress] = useState(0);

  const [copiedNAP, setCopiedNAP] = useState(false);

  const [myAddress, setMyAddress] = useState({ suite: "", address: "", city: "", activated: false });

  function toggleStep(key) {

    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));

  }

  const totalSteps = SETUP_STEPS.reduce((a, p) => a + p.steps.length, 0);

  const doneSteps = Object.values(completedSteps).filter(Boolean).length;

  const progress = Math.round((doneSteps / totalSteps) * 100);

  const napText = `Home-Link Realty Group LLC\n${myAddress.address || "7522 Campbell Rd Ste [YOUR SUITE #]"}\n${myAddress.city || "Dallas, TX 75248"}\n(855) 810-1786\njacob.levy@homelinkrealtygroup.com`;

  function copyNAP() {

    navigator.clipboard.writeText(napText).then(() => {

      setCopiedNAP(true);

      setTimeout(() => setCopiedNAP(false), 3000);

    });

  }

  const TABS = [

    { id: "guide",     label: "📋 Setup Guide" },

    { id: "addresses", label: "📬 Choose Address" },

    { id: "nap",       label: "📐 NAP Template" },

    { id: "cost",      label: "💰 Cost Breakdown" },

    { id: "why",       label: "🎯 Why This Matters" },

  ];

  return (

    <SaaSLayout

      title="Virtual Mailbox Setup"

      subtitle={`Business address · GBP verification · NAP consistency — ${progress}% complete`}

      icon={Building2}

      accent="#0891b2"

      badge={`${progress}%`}

    >

      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 2px 12px rgba(11,31,69,0.06)", overflow: "hidden" }}>

      {/* Progress bar */}

      <div style={{ height: 4, background: "#e2e8f0" }}>

        <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #27ae60, #2ecc71)", transition: "width 0.4s ease" }} />

      </div>

      {/* Hero alert */}

      <div style={{ background: "linear-gradient(135deg, #fffbeb, #fef3c7)", borderBottom: "1px solid #fde68a", padding: "16px 24px", display: "flex", alignItems: "center", gap: 14 }}>

        <div style={{ fontSize: 32 }}>⚡</div>

        <div>

          <div style={{ fontWeight: 800, color: "#92400e", fontSize: 14 }}>Action Required — This is costing you leads right now</div>

          <div style={{ color: "#78350f", fontSize: 13, marginTop: 2 }}>Without a physical address, Google cannot verify your business, you don't appear on Google Maps, and motivated sellers who search "we buy houses Dallas" will find your competitors instead of you. Total fix cost: ~$10/month.</div>

        </div>

      </div>

      {/* Tabs */}

      <div style={{ borderBottom: "1px solid #e2e8f0", overflowX: "auto", background: "#f8fafc" }}>

        <div style={{ display: "flex", padding: "0 24px", whiteSpace: "nowrap" }}>

          {TABS.map(t => (

            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "15px 18px", border: "none", borderBottom: activeTab === t.id ? "3px solid #0891b2" : "3px solid transparent", background: "none", color: activeTab === t.id ? "#0891b2" : "#64748b", fontWeight: activeTab === t.id ? 800 : 500, fontSize: 13, cursor: "pointer", flexShrink: 0 }}>

              {t.label}

            </button>

          ))}

        </div>

      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px 40px" }}>

        {/* ═══════════════════ SETUP GUIDE ═══════════════════ */}

        {activeTab === "guide" && (

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Progress summary */}

            <div style={{ background: "#fff", borderRadius: 16, padding: "24px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>

              <div style={{ flex: 1, minWidth: 200 }}>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>

                  <span style={{ fontWeight: 700, color: "#0B1F45", fontSize: 15 }}>Setup Progress</span>

                  <span style={{ fontWeight: 800, color: "#27ae60" }}>{doneSteps}/{totalSteps} steps done</span>

                </div>

                <div style={{ height: 10, background: "#f1f5f9", borderRadius: 10, overflow: "hidden" }}>

                  <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #27ae60, #2ecc71)", borderRadius: 10, transition: "width 0.4s" }} />

                </div>

              </div>

              <div style={{ display: "flex", gap: 10 }}>

                <div style={{ background: "#f0fff4", borderRadius: 10, padding: "12px 18px", textAlign: "center" }}>

                  <div style={{ color: "#27ae60", fontSize: 20, fontWeight: 900 }}>$9.99</div>

                  <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>Per Month</div>

                </div>

                <div style={{ background: "#eff6ff", borderRadius: 10, padding: "12px 18px", textAlign: "center" }}>

                  <div style={{ color: "#2563eb", fontSize: 20, fontWeight: 900 }}>10 days</div>

                  <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>To Full Setup</div>

                </div>

              </div>

            </div>

            {/* Phases */}

            {SETUP_STEPS.map((phase, pi) => (

              <div key={pi} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

                {/* Phase header */}

                <div style={{ background: `${phase.color}12`, borderLeft: `5px solid ${phase.color}`, padding: "18px 24px", display: "flex", alignItems: "center", gap: 12 }}>

                  <span style={{ fontSize: 24 }}>{phase.icon}</span>

                  <div style={{ fontWeight: 900, color: "#0B1F45", fontSize: 16 }}>{phase.phase}</div>

                </div>

                {/* Steps */}

                <div style={{ padding: "8px 0" }}>

                  {phase.steps.map((step, si) => {

                    const key = `${pi}-${si}`;

                    const done = completedSteps[key];

                    return (

                      <div key={si} style={{ padding: "20px 24px", borderBottom: si < phase.steps.length - 1 ? "1px solid #f1f5f9" : "none", opacity: done ? 0.65 : 1, transition: "opacity 0.2s" }}>

                        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>

                          {/* Check circle */}

                          <button onClick={() => toggleStep(key)} style={{ width: 32, height: 32, borderRadius: "50%", background: done ? "linear-gradient(135deg, #27ae60, #2ecc71)" : "#f1f5f9", border: done ? "none" : "2px solid #dde3ec", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginTop: 2, fontSize: 14, color: done ? "#fff" : "#94a3b8", fontWeight: 900, transition: "all 0.2s" }}>

                            {done ? "✓" : step.n}

                          </button>

                          <div style={{ flex: 1 }}>

                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>

                              <span style={{ fontWeight: 800, color: "#0B1F45", fontSize: 15 }}>{step.title}</span>

                              <span style={{ background: "#f1f5f9", color: "#64748b", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>⏱ {step.time}</span>

                            </div>

                            <div style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>

                              <div style={{ color: "#374151", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>📋 What to do:</div>

                              <div style={{ color: "#374151", fontSize: 13 }}>{step.action}</div>

                            </div>

                            <div style={{ color: "#475569", fontSize: 13, lineHeight: 1.7, marginBottom: step.tip || step.warning ? 10 : 0 }}>{step.detail}</div>

                            {step.tip && (

                              <div style={{ background: "#f0fff4", borderRadius: 10, padding: "10px 14px", border: "1px solid #bbf7d0", marginBottom: step.warning ? 8 : 0 }}>

                                <span style={{ color: "#15803d", fontWeight: 700, fontSize: 13 }}>💡 Pro tip: </span>

                                <span style={{ color: "#374151", fontSize: 13 }}>{step.tip}</span>

                              </div>

                            )}

                            {step.warning && (

                              <div style={{ background: "#fffbeb", borderRadius: 10, padding: "10px 14px", border: "1px solid #fde68a" }}>

                                <span style={{ color: "#92400e", fontWeight: 700, fontSize: 13 }}>⚠️ Important: </span>

                                <span style={{ color: "#78350f", fontSize: 13 }}>{step.warning}</span>

                              </div>

                            )}

                            {step.cta && (

                              <div style={{ marginTop: 12 }}>

                                <a href={step.cta} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "9px 18px", background: phase.color, borderRadius: 8, color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: 13 }}>{step.ctaLabel}</a>

                              </div>

                            )}

                          </div>

                        </div>

                      </div>

                    );

                  })}

                </div>

              </div>

            ))}

            {/* All done state */}

            {doneSteps === totalSteps && (

              <div style={{ background: "linear-gradient(135deg, #f0fff4, #dcfce7)", borderRadius: 16, padding: "32px", textAlign: "center", border: "1px solid #bbf7d0" }}>

                <div style={{ fontSize: 56, marginBottom: 12 }}>🏆</div>

                <div style={{ fontWeight: 900, color: "#15803d", fontSize: 22, marginBottom: 8 }}>Virtual Mailbox Setup Complete!</div>

                <p style={{ color: "#374151", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>Home-Link Realty Group LLC now has a verified physical address, Google Business Profile, and consistent NAP citations across the web. Your local SEO is officially live.</p>

              </div>

            )}

          </div>

        )}

        {/* ═══════════════════ ADDRESS CHOOSER ═══════════════════ */}

        {activeTab === "addresses" && (

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            <div style={{ background: "#fff", borderRadius: 16, padding: "24px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

              <h2 style={{ margin: "0 0 6px", fontWeight: 900, color: "#0B1F45", fontSize: 20 }}>📬 Choose Your Dallas Address</h2>

              <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 24px" }}>All from Anytime Mailbox — real street addresses with suite numbers. Not PO Boxes. All work for Google Business Profile verification.</p>

              {TOP_ADDRESSES.map((addr, i) => (

                <div key={i} onClick={() => setSelectedAddress(i)} style={{ border: `2px solid ${selectedAddress === i ? addr.badgeColor : "#e2e8f0"}`, borderRadius: 14, padding: "22px", marginBottom: 14, cursor: "pointer", background: selectedAddress === i ? `${addr.badgeColor}08` : "#fff", transition: "all 0.2s" }}>

                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

                      <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2.5px solid ${addr.badgeColor}`, background: selectedAddress === i ? addr.badgeColor : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>

                        {selectedAddress === i && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff" }} />}

                      </div>

                      <div>

                        <div style={{ fontWeight: 900, color: "#0B1F45", fontSize: 16 }}>{addr.name}</div>

                        <div style={{ color: "#64748b", fontSize: 13 }}>{addr.address}, {addr.city}</div>

                      </div>

                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>

                      <span style={{ background: addr.badgeColor, color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{addr.badge}</span>

                      <span style={{ fontWeight: 900, color: addr.badgeColor, fontSize: 17 }}>{addr.price}</span>

                    </div>

                  </div>

                  <p style={{ color: "#475569", fontSize: 13, margin: "0 0 12px", lineHeight: 1.6 }}>{addr.why}</p>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>

                    {addr.pros.map((p, j) => (

                      <span key={j} style={{ background: `${addr.badgeColor}15`, color: addr.badgeColor, fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>✓ {p}</span>

                    ))}

                  </div>

                  {selectedAddress === i && (

                    <div style={{ marginTop: 16 }}>

                      <a href={addr.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "11px 22px", background: addr.badgeColor, borderRadius: 10, color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: 14 }}>🚀 Sign Up for This Address →</a>

                    </div>

                  )}

                </div>

              ))}

              <div style={{ background: "#f8fafc", borderRadius: 12, padding: "16px 18px", border: "1px solid #e2e8f0" }}>

                <div style={{ fontWeight: 700, color: "#374151", fontSize: 13, marginBottom: 4 }}>💡 My Recommendation</div>

                <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>Start with <strong>Campbell Rd ($9.99/mo)</strong> — it's in North Dallas (75248), costs less than a coffee per week, and does the job 100%. Once you're closing deals, upgrade to McKinney Ave for the Uptown Dallas prestige factor. The address is for credibility and mail — sellers don't drive by it.</div>

              </div>

            </div>

          </div>

        )}

        {/* ═══════════════════ NAP TEMPLATE ═══════════════════ */}

        {activeTab === "nap" && (

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            <div style={{ background: "#fff", borderRadius: 16, padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

              <h2 style={{ margin: "0 0 6px", fontWeight: 900, color: "#0B1F45", fontSize: 20 }}>📐 Your NAP Template</h2>

              <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 20px", lineHeight: 1.6 }}>NAP = Name, Address, Phone. This must be <strong>identical</strong> everywhere it appears online — your website, Google, Yelp, BBB, Facebook, etc. Even minor differences (LLC vs no LLC, "Ste" vs "Suite") hurt your local SEO ranking.</p>

              {/* Enter suite number */}

              <div style={{ background: "#f0fff4", borderRadius: 12, padding: "18px 20px", border: "1px solid #bbf7d0", marginBottom: 20 }}>

                <div style={{ fontWeight: 700, color: "#15803d", fontSize: 14, marginBottom: 10 }}>First — enter your suite number once you have it:</div>

                <div style={{ display: "flex", gap: 10 }}>

                  <input type="text" placeholder="e.g. 301" value={myAddress.suite} onChange={e => setMyAddress(p => ({ ...p, suite: e.target.value, address: `7522 Campbell Rd Ste ${e.target.value}`, city: "Dallas, TX 75248" }))} style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #bbf7d0", borderRadius: 8, fontSize: 15, outline: "none" }} />

                  <div style={{ padding: "10px 14px", background: "#27ae60", borderRadius: 8, color: "#fff", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center" }}>Suite #</div>

                </div>

              </div>

              {/* NAP display */}

              <div style={{ background: "#0B1F45", borderRadius: 14, padding: "24px 28px", marginBottom: 16 }}>

                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 14, textTransform: "uppercase" }}>Copy This Exactly — Use Everywhere</div>

                <div style={{ fontFamily: "monospace", fontSize: 15, lineHeight: 2, color: "#fff" }}>

                  <div><span style={{ color: "#4ade80" }}>Name: </span>Home-Link Realty Group LLC</div>

                  <div><span style={{ color: "#4ade80" }}>Address: </span>{myAddress.address || "7522 Campbell Rd Ste [YOUR SUITE #]"}</div>

                  <div><span style={{ color: "#4ade80" }}>City: </span>{myAddress.city || "Dallas, TX 75248"}</div>

                  <div><span style={{ color: "#4ade80" }}>Phone: </span>(855) 810-1786</div>

                  <div><span style={{ color: "#4ade80" }}>Email: </span>jacob.levy@homelinkrealtygroup.com</div>

                  <div><span style={{ color: "#4ade80" }}>Website: </span>https://home-link-realty-group.base44.app</div>

                </div>

              </div>

              <button onClick={copyNAP} style={{ width: "100%", padding: "13px", background: copiedNAP ? "#27ae60" : "linear-gradient(135deg, #0B1F45, #122B5E)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>

                {copiedNAP ? "✅ Copied to clipboard!" : "📋 Copy NAP to Clipboard"}

              </button>

            </div>

            {/* Where to paste it */}

            <div style={{ background: "#fff", borderRadius: 16, padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

              <h3 style={{ margin: "0 0 20px", fontWeight: 900, color: "#0B1F45", fontSize: 18 }}>📍 Every Place This NAP Must Appear</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                {[

                  { platform: "Google Business Profile", priority: "🔴 Critical", url: "https://business.google.com", note: "Unlocks Maps + local pack ranking" },

                  { platform: "Your Website Footer",     priority: "🔴 Critical", url: null,                         note: "I'll update this for you" },

                  { platform: "Facebook Business Page",  priority: "🟡 High",     url: "https://facebook.com/business", note: "About section → Business Info" },

                  { platform: "Yelp for Business",       priority: "🟡 High",     url: "https://biz.yelp.com",      note: "Create free listing" },

                  { platform: "Bing Places",             priority: "🟡 High",     url: "https://bingplaces.com",    note: "Microsoft's version of GBP" },

                  { platform: "Apple Maps Connect",      priority: "🟡 High",     url: "https://mapsconnect.apple.com", note: "iPhone users use Apple Maps" },

                  { platform: "BBB Business Profile",    priority: "🟡 High",     url: "https://www.bbb.org",       note: "Trust signal for skeptical sellers" },

                  { platform: "Yellow Pages",            priority: "🟢 Medium",   url: "https://www.yellowpages.com/add-business", note: "Old but Google still counts it" },

                  { platform: "Manta",                   priority: "🟢 Medium",   url: "https://www.manta.com/add-your-business", note: "Free citation" },

                  { platform: "Hotfrog",                 priority: "🟢 Medium",   url: "https://www.hotfrog.com",   note: "Free citation" },

                  { platform: "Texas Secretary of State", priority: "🔴 Critical", url: "https://www.sos.state.tx.us/corp/forms_option.shtml", note: "Official LLC address" },

                ].map((item, i) => (

                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#f8fafc", borderRadius: 10, gap: 12, flexWrap: "wrap" }}>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

                      <span style={{ fontSize: 13 }}>{item.priority}</span>

                      <span style={{ fontWeight: 700, color: "#0B1F45", fontSize: 14 }}>{item.platform}</span>

                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

                      <span style={{ color: "#64748b", fontSize: 12 }}>{item.note}</span>

                      {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ padding: "5px 12px", background: "#0B1F45", borderRadius: 6, color: "#fff", fontWeight: 600, textDecoration: "none", fontSize: 12, whiteSpace: "nowrap" }}>Open →</a>}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        )}

        {/* ═══════════════════ COST BREAKDOWN ═══════════════════ */}

        {activeTab === "cost" && (

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            <div style={{ background: "#fff", borderRadius: 16, padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

              <h2 style={{ margin: "0 0 24px", fontWeight: 900, color: "#0B1F45", fontSize: 20 }}>💰 Full Cost Breakdown</h2>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>

                <thead>

                  <tr style={{ background: "#f8fafc" }}>

                    {["Item", "Cost", "Annual", "Priority"].map(h => (

                      <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: "#64748b", fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" }}>{h}</th>

                    ))}

                  </tr>

                </thead>

                <tbody>

                  {COST_BREAKDOWN.map((row, i) => (

                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>

                      <td style={{ padding: "14px", color: "#0B1F45", fontSize: 14, fontWeight: 600 }}>{row.item}</td>

                      <td style={{ padding: "14px", color: "#374151", fontSize: 14 }}>{row.cost}</td>

                      <td style={{ padding: "14px", color: "#374151", fontSize: 14 }}>{row.annual}</td>

                      <td style={{ padding: "14px" }}>

                        <span style={{ background: row.priority === "Required" ? "#fef2f2" : row.priority === "Critical" ? "#fef2f2" : row.priority === "Recommended" ? "#f0fff4" : "#eff6ff", color: row.priority === "Required" || row.priority === "Critical" ? "#dc2626" : row.priority === "Recommended" ? "#15803d" : "#2563eb", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{row.priority}</span>

                      </td>

                    </tr>

                  ))}

                  <tr style={{ background: "#f0fff4" }}>

                    <td style={{ padding: "14px", fontWeight: 900, color: "#0B1F45", fontSize: 14 }}>Total (Required only)</td>

                    <td style={{ padding: "14px", fontWeight: 900, color: "#27ae60", fontSize: 15 }}>~$10/mo</td>

                    <td style={{ padding: "14px", fontWeight: 900, color: "#27ae60", fontSize: 15 }}>~$135/yr</td>

                    <td style={{ padding: "14px" }}></td>

                  </tr>

                </tbody>

              </table>

            </div>

            <div style={{ background: "linear-gradient(135deg, #f0fff4, #dcfce7)", borderRadius: 16, padding: "24px 28px", border: "1px solid #bbf7d0" }}>

              <div style={{ fontWeight: 900, color: "#0B1F45", fontSize: 18, marginBottom: 10 }}>🎯 The ROI Math</div>

              <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.8, margin: 0 }}>

                One motivated seller lead from Google Maps = potential <strong>$5,000–$15,000 assignment fee</strong>.<br/>

                Cost to unlock Google Maps = <strong>$9.99/month</strong>.<br/>

                That's a <strong>500x–1,500x return</strong> on the first deal alone.<br/>

                <br/>

                This is the single highest-leverage $10 you will spend in this business.

              </p>

            </div>

          </div>

        )}

        {/* ═══════════════════ WHY THIS MATTERS ═══════════════════ */}

        {activeTab === "why" && (

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            <div style={{ background: "#fff", borderRadius: 16, padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

              <h2 style={{ margin: "0 0 24px", fontWeight: 900, color: "#0B1F45", fontSize: 20 }}>🎯 Why a Physical Address Is Non-Negotiable</h2>

              {[

                {

                  icon: "📍",

                  title: "Google Business Profile & Maps",

                  impact: "🔴 Critical",

                  body: "Google requires a verified physical address to list your business on Google Maps and in the Local Pack (the 3 businesses that appear at the top of local search results). Without it, you literally don't exist on Google Maps. 46% of all Google searches are local. When someone searches 'we buy houses Dallas' — you need to be in those 3 boxes.",

                },

                {

                  icon: "⭐",

                  title: "Google Reviews",

                  impact: "🔴 Critical",

                  body: "A verified GBP address is required to receive Google reviews. Google reviews are the #1 trust signal for motivated sellers who are skeptical. A business with 10+ reviews converting at 2x the rate of a business with zero reviews is conservative. Every review you miss while not verified is a seller who chose someone else.",

                },

                {

                  icon: "🏛️",

                  title: "BBB Accreditation",

                  impact: "🟡 High",

                  body: "BBB requires a physical address for accreditation. The BBB badge increases seller trust dramatically, especially with older demographics (55+) who are disproportionately represented in the motivated seller market (inherited property, downsizing, estate sales). Studies show BBB accreditation increases conversion 15–20%.",

                },

                {

                  icon: "📊",

                  title: "Local SEO Citation Authority",

                  impact: "🟡 High",

                  body: "Search engines use NAP consistency across the web to validate that your business is real. Every directory listing, social profile, and website footer that shows your consistent name, address, and phone number is a trust signal. Inconsistent or missing address data is one of the top reasons businesses don't rank in local search.",

                },

                {

                  icon: "💼",

                  title: "Professional Credibility with Sellers",

                  impact: "🟡 High",

                  body: "When a motivated seller Googles your company before calling, they expect to see a real address. 'Home-Link Realty Group LLC · 7522 Campbell Rd Ste 301, Dallas TX 75248' looks like a real company. A business with no address looks like a side hustle. In a trust-sensitive transaction (selling your home), that difference converts or costs you the deal.",

                },

                {

                  icon: "⚖️",

                  title: "Legal & LLC Compliance",

                  impact: "🟡 High",

                  body: "Your LLC should have a consistent address on file with the Texas Secretary of State, IRS, and any banking relationships. Using your home address exposes your personal information publicly (it's searchable). A virtual mailbox gives you a professional, private, and permanent address for all legal correspondence.",

                },

              ].map((item, i) => (

                <div key={i} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: i < 5 ? "1px solid #f1f5f9" : "none" }}>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>

                    <span style={{ fontSize: 24 }}>{item.icon}</span>

                    <span style={{ fontWeight: 800, color: "#0B1F45", fontSize: 16 }}>{item.title}</span>

                    <span style={{ background: item.impact.includes("Critical") ? "#fef2f2" : "#fffbeb", color: item.impact.includes("Critical") ? "#dc2626" : "#92400e", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>{item.impact}</span>

                  </div>

                  <p style={{ color: "#475569", fontSize: 14, margin: 0, lineHeight: 1.75 }}>{item.body}</p>

                </div>

              ))}

            </div>

            <div style={{ background: "linear-gradient(135deg, #0B1F45, #122B5E)", borderRadius: 16, padding: "28px 32px", textAlign: "center" }}>

              <div style={{ fontWeight: 900, color: "#fff", fontSize: 20, marginBottom: 10 }}>Bottom Line</div>

              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, maxWidth: 520, margin: "0 auto 20px", lineHeight: 1.7 }}>Every day you operate without a verified address is a day your competitors are capturing the motivated sellers who are searching for you on Google. This is the cheapest, highest-leverage infrastructure upgrade in your entire business stack.</p>

              <button onClick={() => setActiveTab("guide")} style={{ padding: "13px 32px", background: "linear-gradient(135deg, #27ae60, #2ecc71)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>

                📋 Start the Setup Guide →

              </button>

            </div>

          </div>

        )}

      </div>

      </div>

    </SaaSLayout>

  );

}
