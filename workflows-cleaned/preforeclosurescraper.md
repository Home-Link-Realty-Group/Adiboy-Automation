# preforeclosurescraper

Source: preforeclosurescraper.docx

import { useState, useMemo } from "react";

import { Lead } from "@/api/entities";

import PageShell from "@/components/scraper/PageShell";

import StatGrid from "@/components/scraper/StatGrid";

import SourceCard from "@/components/scraper/SourceCard";

import CSVDropzone from "@/components/scraper/CSVDropzone";

import LeadPreviewTable from "@/components/scraper/LeadPreviewTable";

import ImportResult from "@/components/scraper/ImportResult";

import { parseCSV } from "@/components/scraper/csvUtils";

// ─────────────────────────────────────────────────────────────────────────────

// PRE-FORECLOSURE LIST SCRAPER — Highest-conversion lead type for wholesalers

// Pre-foreclosure leads = sellers on a court-imposed deadline (NOD filed).

// They convert at 5–10× the rate of cold lists.

// ─────────────────────────────────────────────────────────────────────────────

const PRE_FORECLOSURE_SOURCES = [

  {

    id: "pacer",

    icon: "⚖️",

    label: "PACER — Federal Bankruptcy Court",

    color: "#ef4444",

    cost: "$0.10/page",

    speed: "Same day",

    accuracy: "100%",

    desc: "Federal court filings — Chapter 7/13 bankruptcy includes the property address. Owner is on a court-imposed timeline. HIGHEST motivation.",

    steps: [

      "Sign up at pacer.uscourts.gov (free account, $0.10/page when over $30/quarter)",

      "Search by district → Bankruptcy → Chapter 7 or Chapter 13",

      "Filter by date filed (last 30 days)",

      "Download docket → Schedule A/B has property address",

      "Skip trace owner via TruePeopleSearch or Tracerfy",

      "Upload CSV here → auto-imported as HOT priority",

    ],

    link: "https://pacer.uscourts.gov/",

    linkLabel: "Open PACER →",

  },

  {

    id: "county_records",

    icon: "🏛️",

    label: "County Recorder — NOD Filings",

    color: "#dc2626",

    cost: "FREE",

    speed: "Daily",

    accuracy: "100%",

    desc: "Notice of Default (NOD) is a public filing recorded the moment a homeowner is 90 days behind on mortgage. Most counties publish online for free.",

    steps: [

      "Find your county recorder's website (e.g. dallascounty.org/recorder)",

      "Look for 'Real Property Records' or 'Document Search'",

      "Filter by document type: 'Notice of Default' or 'Lis Pendens'",

      "Date range: last 30–90 days",

      "Export results — owner name + property address",

      "Skip trace owners → upload phones-included CSV here",

    ],

    link: "https://www.realtytrac.com/foreclosures/",

    linkLabel: "Browse County Sites →",

  },

  {

    id: "foreclosure_com",

    icon: "🚨",

    label: "Foreclosure.com — Pre-NOD Trigger",

    color: "#f97316",

    cost: "$39/mo",

    speed: "Real-time",

    accuracy: "92%",

    desc: "Aggregates pre-foreclosures from 2,200+ counties. 7-day free trial. Sort by 'Auction Date' to find sellers within 30 days of losing the home.",

    steps: [

      "Sign up at foreclosure.com (7-day free trial)",

      "Filter: Pre-Foreclosure + your target ZIP codes",

      "Sort by Auction Date (soonest first = most desperate)",

      "Export to CSV — most plans allow up to 500/mo",

      "Pre-skip-traced phone numbers included on most listings",

      "Upload here → auto-tagged HOT + Pre-Foreclosure",

    ],

    link: "https://www.foreclosure.com/listing/search.html",

    linkLabel: "Open Foreclosure.com →",

  },

  {

    id: "auction_com",

    icon: "🔨",

    label: "Auction.com — Scheduled Auctions",

    color: "#b91c1c",

    cost: "FREE",

    speed: "Live",

    accuracy: "100%",

    desc: "Properties scheduled for trustee/sheriff auction. Owners have weeks (sometimes days) before the gavel drops. They will accept significant discount to save credit.",

    steps: [

      "Open auction.com → filter by State + 'Foreclosure Auction'",

      "Sort by Auction Date (next 60 days)",

      "Note property address, owner name (in property details)",

      "Skip trace via FastPeopleSearch.com (free)",

      "Call IMMEDIATELY — these have 1–4 weeks max",

      "Upload here as HOT priority + Pre-Foreclosure situation",

    ],

    link: "https://www.auction.com/residential/foreclosures/",

    linkLabel: "Open Auction.com →",

  },

  {

    id: "propstream",

    icon: "📊",

    label: "PropStream — Pre-Foreclosure Filter",

    color: "#7c3aed",

    cost: "$99/mo",

    speed: "Instant",

    accuracy: "94%",

    desc: "Best paid tool. Filter by 'Pre-Foreclosure' status with owner phones already skip-traced. 7-day free trial = pull a year's worth of leads.",

    steps: [

      "Sign up at propstream.com (7-day free trial)",

      "Apply filters: Pre-Foreclosure + Equity 30%+ + your target ZIPs",

      "Stack with: Tax Delinquent + Absentee for max motivation",

      "Export CSV (skip-traced phones included)",

      "During free trial: pull 5,000+ leads",

      "Upload here → instant CRM import as HOT",

    ],

    link: "https://www.propstream.com/",

    linkLabel: "Try PropStream →",

  },

  {

    id: "redfin_foreclosure",

    icon: "🏠",

    label: "Redfin — Foreclosure Filter",

    color: "#ec4899",

    cost: "FREE",

    speed: "Instant",

    accuracy: "85%",

    desc: "Free, no-login. Filter MLS listings by 'Foreclosure' status. Skip-trace owner via county records or TruePeopleSearch.",

    steps: [

      "Open redfin.com → search your target city",

      "Click 'Filters' → check 'Foreclosure' under Listing Type",

      "Note all listed addresses + listing agents (some have direct contacts)",

      "Cross-reference with county recorder for owner name",

      "Skip trace → manual entry below or batch upload CSV",

      "These leads are 'lost equity' — owner usually wants to escape ASAP",

    ],

    link: "https://www.redfin.com/",

    linkLabel: "Open Redfin →",

  },

];

const HOT_FORECLOSURE_MARKETS = [

  { city: "Cleveland", state: "OH", reason: "Lowest median price, high default rate", arv: "$80K–$150K" },

  { city: "Detroit", state: "MI", reason: "Massive distress, low competition", arv: "$60K–$140K" },

  { city: "Memphis", state: "TN", reason: "High investor activity + foreclosure volume", arv: "$90K–$180K" },

  { city: "Birmingham", state: "AL", reason: "Affordable + steady pre-foreclosure flow", arv: "$80K–$160K" },

  { city: "St. Louis", state: "MO", reason: "Stable market with high distress signal", arv: "$80K–$170K" },

  { city: "Indianapolis", state: "IN", reason: "Investor-friendly + high rental demand", arv: "$110K–$220K" },

  { city: "Baltimore", state: "MD", reason: "Inherited + foreclosure overlap", arv: "$80K–$200K" },

  { city: "Jacksonville", state: "FL", reason: "Growing market + foreclosure inventory", arv: "$140K–$280K" },

  { city: "Kansas City", state: "MO", reason: "Affordable wholesale market", arv: "$100K–$200K" },

  { city: "Milwaukee", state: "WI", reason: "Low entry + high distress concentration", arv: "$90K–$180K" },

];

const CSV_TEMPLATE =

  "name,phone,email,address,city,state,zip,auction_date,mortgage_balance,situation,source,notes\n" +

  "John Smith,(214) 555-1234,john@email.com,1234 Oak St,Dallas,TX,75216,2026-06-15,142000,Pre-Foreclosure,County Recorder,90 days late\n";

export default function PreForeclosureScraper() {

  const [activeSource, setActiveSource] = useState(null);

  const [tab, setTab] = useState("sources");

  const [csvText, setCsvText] = useState("");

  const [parsedLeads, setParsedLeads] = useState([]);

  const [importing, setImporting] = useState(false);

  const [imported, setImported] = useState([]);

  const [skipped, setSkipped] = useState([]);

  const [done, setDone] = useState(false);

  const handleCSVUpload = (file) => {

    const reader = new FileReader();

    reader.onload = (e) => {

      const text = e.target.result;

      setCsvText(text);

      const leads = parseCSV(text);

      setParsedLeads(leads.map(l => ({ ...l, situation: l.situation || "Pre-Foreclosure" })));

      setTab("import");

    };

    reader.readAsText(file);

  };

  const handlePaste = (text) => {

    setCsvText(text);

    const leads = parseCSV(text);

    setParsedLeads(leads.map(l => ({ ...l, situation: l.situation || "Pre-Foreclosure" })));

  };

  const importLeads = async () => {

    setImporting(true);

    setDone(false);

    const good = [], bad = [];

    const existing = await Lead.list();

    const existingPhones = new Set(existing.map(l => (l.phone || "").replace(/\D/g, "")));

    const existingAddresses = new Set(existing.map(l => (l.address || "").toLowerCase().trim()));

    for (const lead of parsedLeads) {

      const phone = (lead.phone || "").replace(/\D/g, "");

      const address = (lead.address || "").toLowerCase().trim();

      if ((phone && existingPhones.has(phone)) || (address && existingAddresses.has(address))) {

        bad.push({ ...lead, skip_reason: "Duplicate" });

        continue;

      }

      try {

        await Lead.create({

          name: lead.name || "Unknown",

          phone: lead.phone || "",

          email: lead.email || "",

          address: lead.address || "",

          city: lead.city || "",

          state: lead.state || "",

          zip: lead.zip || "",

          situation: lead.situation || "Pre-Foreclosure",

          source: lead.source || "Pre-Foreclosure Import",

          notes: [

            lead.notes,

            lead.auction_date && `Auction: ${lead.auction_date}`,

            lead.mortgage_balance && `Mortgage: $${lead.mortgage_balance}`,

          ].filter(Boolean).join(" · "),

          status: "New Lead",

          priority: "Hot",

          is_pre_foreclosure: true,

          seller_motivation_score: 9,

          score_distress: 5,

          score_urgency: 5,

        });

        good.push(lead);

        existingPhones.add(phone);

        existingAddresses.add(address);

      } catch (e) {

        bad.push({ ...lead, skip_reason: "Error" });

      }

    }

    setImported(good);

    setSkipped(bad);

    setImporting(false);

    setDone(true);

  };

  const stats = useMemo(() => ([

    { label: "Sources Available", value: PRE_FORECLOSURE_SOURCES.length, icon: "📡", color: "#ef4444" },

    { label: "Hot Markets", value: HOT_FORECLOSURE_MARKETS.length, icon: "🔥", color: "#f97316" },

    { label: "Avg Conversion", value: "8–12%", icon: "🎯", color: "#10b981" },

    { label: "Avg Deal Size", value: "$12K–$25K", icon: "💰", color: "#D4A843" },

  ]), []);

  const tabs = [

    { id: "sources",   label: "📡 Lead Sources" },

    { id: "markets",   label: "🔥 Hot Markets" },

    { id: "import",    label: "📤 CSV Import" },

    { id: "playbook",  label: "📋 Playbook" },

  ];

  return (

    <PageShell

      icon="⚖️"

      title="Pre-Foreclosure List Scraper"

      subtitle="Highest-converting lead type — court-deadline sellers"

      accent="#ef4444"

      tab={tab}

      setTab={setTab}

      tabs={tabs}

    >

      <StatGrid stats={stats} />

      {tab === "sources" && (

        <div style={{ animation: "fadein 0.3s ease" }}>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>

            Pre-foreclosure leads convert at <strong style={{ color: "#fcd34d" }}>5–10× cold lists</strong>. The seller is on a deadline — they will sell.

          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>

            {PRE_FORECLOSURE_SOURCES.map(src => (

              <SourceCard

                key={src.id}

                source={src}

                active={activeSource?.id === src.id}

                onToggle={() => setActiveSource(activeSource?.id === src.id ? null : src)}

                onUpload={() => setTab("import")}

              />

            ))}

          </div>

        </div>

      )}

      {tab === "markets" && (

        <div style={{ animation: "fadein 0.3s ease" }}>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>

            Top 10 wholesale markets ranked by foreclosure volume + low competition.

          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>

            {HOT_FORECLOSURE_MARKETS.map((m, i) => (

              <div key={m.city} style={{

                background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(0,0,0,0.4))",

                border: "1px solid rgba(239,68,68,0.25)",

                borderRadius: 14, padding: 18, position: "relative", overflow: "hidden",

              }}>

                <div style={{ position: "absolute", top: 12, right: 12, background: i < 3 ? "#ef4444" : "rgba(255,255,255,0.1)", color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 100, letterSpacing: 1 }}>

                  {i < 3 ? `TOP ${i + 1}` : `#${i + 1}`}

                </div>

                <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>

                  {m.city}, {m.state}

                </div>

                <div style={{ fontSize: 11, color: "#fcd34d", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>

                  ARV: {m.arv}

                </div>

                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>

                  {m.reason}

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

      {tab === "import" && (

        <div style={{ maxWidth: 920, animation: "fadein 0.3s ease" }}>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>

            Upload from PACER, County Records, Foreclosure.com, PropStream, or any source. Auto-tagged <strong style={{ color: "#fcd34d" }}>HOT priority + Pre-Foreclosure</strong>.

          </p>

          <CSVDropzone onFile={handleCSVUpload} csvText={csvText} onPaste={handlePaste} template={CSV_TEMPLATE} accent="#ef4444" />

          {parsedLeads.length > 0 && (

            <LeadPreviewTable

              leads={parsedLeads}

              onImport={importLeads}

              importing={importing}

              accent="#ef4444"

              ctaLabel={`🚀 Import ${parsedLeads.length} HOT Pre-Foreclosure Leads`}

            />

          )}

          {done && <ImportResult imported={imported} skipped={skipped} accent="#ef4444" />}

        </div>

      )}

      {tab === "playbook" && (

        <div style={{ maxWidth: 760, animation: "fadein 0.3s ease" }}>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>

            The exact daily ritual to find and close pre-foreclosure deals. Follow this sequence.

          </p>

          {[

            { step: 1, title: "Pull yesterday's NOD filings", time: "15 min", icon: "📂", color: "#ef4444",

              actions: ["Open county recorder website", "Filter: Notice of Default + last 24 hours", "Note 10–30 new filings", "Cross-check Foreclosure.com for auction dates"] },

            { step: 2, title: "Skip trace owner contacts", time: "10 min", icon: "🔍", color: "#f97316",

              actions: ["Use TruePeopleSearch (free) or Tracerfy ($0.02/record)", "Get 2–3 phone numbers per owner", "Verify mailing address ≠ property address (likely vacant)"] },

            { step: 3, title: "Import to CRM as HOT", time: "2 min", icon: "📥", color: "#fbbf24",

              actions: ["Upload CSV here", "Auto-tagged: Hot + Pre-Foreclosure + motivation score 9", "Appears at top of Call Queue"] },

            { step: 4, title: "Call within 24 hours", time: "1 hr", icon: "📞", color: "#10b981",

              actions: ["Open /CallLists → filter Pre-Foreclosure", "Use Pre-Foreclosure script (preset)", "Lead with empathy: 'I work with homeowners going through tough times...'"] },

            { step: 5, title: "Close fast — they're on a clock", time: "Same week", icon: "🤝", color: "#7c3aed",

              actions: ["Offer = MAO – $10K assignment fee", "They almost always accept 60–70 cents on the dollar", "Need cash to halt foreclosure → close in 7 days"] },

          ].map(s => (

            <div key={s.step} style={{ display: "flex", gap: 16, marginBottom: 16 }}>

              <div style={{ flexShrink: 0 }}>

                <div style={{ background: s.color, borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, boxShadow: `0 6px 20px ${s.color}55` }}>

                  {s.icon}

                </div>

                {s.step < 5 && <div style={{ width: 2, height: 38, background: "rgba(255,255,255,0.1)", margin: "4px auto 0" }} />}

              </div>

              <div style={{ flex: 1, background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(0,0,0,0.2))", border: `1px solid ${s.color}33`, borderRadius: 14, padding: "16px 20px" }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>

                  <div style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>Step {s.step}: {s.title}</div>

                  <span style={{ fontSize: 11, color: s.color, fontWeight: 800, background: `${s.color}22`, padding: "4px 12px", borderRadius: 100, letterSpacing: 0.5 }}>⏱ {s.time}</span>

                </div>

                {s.actions.map((a, i) => (

                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>

                    <span style={{ color: s.color, flexShrink: 0 }}>›</span>

                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>{a}</span>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

    </PageShell>

  );

}
