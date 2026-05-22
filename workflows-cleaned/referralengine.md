# referralengine

Source: referralengine.docx

import { useState, useEffect } from "react";

import { Referral, CashBuyer } from "@/api/entities";

import { MessageSquare } from "lucide-react";

import SaaSLayout from "@/components/saas/SaaSLayout";

const SkeletonPulse = ({ w = "100%", h = 18, r = 8, mb = 0 }) => (

  <div style={{ width: w, height: h, borderRadius: r, background: "linear-gradient(90deg,#0B1F45 25%,#122B5E 50%,#0B1F45 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: mb }} />

);

const D = "#0B1F45", R = "#D4A843", G = "#f8f9fa";

const REFERRAL_TYPES = ["Probate Attorney","Divorce Attorney","Estate Attorney","Real Estate Agent","Property Manager","Financial Advisor","CPA/Accountant","Bankruptcy Attorney","HOA Manager","Mortgage Broker","Insurance Agent","Contractor","Other"];

const BUYER_TYPES = ["Fix & Flip","Buy & Hold","Wholesaler","Developer","Hedge Fund","Owner Occupant","Other"];

const REFERRAL_STATUSES = ["New","Contacted","Responded","Meeting Set","Active Partner","Deal Sent","Closed Deal","Inactive"];

const BUYER_STATUSES = ["New","Contacted","Verified","Active","Deal Sent","Closed","Inactive"];

const STATUS_COLORS = {

  "New":"#3498db","Contacted":"#e67e22","Responded":"#9b59b6","Meeting Set":"#f39c12",

  "Active Partner":"#27ae60","Active":"#27ae60","Deal Sent":"#D4A843","Closed Deal":"#1abc9c",

  "Closed":"#1abc9c","Inactive":"#95a5a6","Verified":"#2ecc71",

};

// Cold outreach email scripts for manual use

const SCRIPTS = {

  cold_call: {

    "Probate Attorney": `COLD CALL SCRIPT — PROBATE ATTORNEY

Ring ring...

"Hi, is this [Name]? ...Great. My name is Jacob Levy — I'm a cash real estate buyer here  nationwide with Home-Link Realty Group. I specialize in buying properties from estate sales quickly and cleanly — all cash, as-is, 7-14 day close.

The reason I'm calling is I wanted to introduce myself as a resource for your clients. When you're working through an estate and there's a property that needs to go fast — I can step in and make it happen without any headache.

I also pay a referral fee at closing for any introduction that turns into a deal.

Is that something that might be useful to you? ...

[IF YES] → Perfect. I'll shoot you a quick email with my info and a one-page referral agreement. What's the best email?

[IF BUSY] → Totally understand. Is it okay if I send you a quick email so you have my info on file?

[IF NOT INTERESTED] → No worries at all. I appreciate your time — have a great day."`,

    "Divorce Attorney": `COLD CALL SCRIPT — DIVORCE ATTORNEY

"Hi [Name], my name is Jacob Levy — I'm a cash real estate buyer  nationwide with Home-Link Realty Group.

I know your time is valuable so I'll be quick — I work with divorce attorneys to help clients sell jointly-owned properties fast when they need a clean, quick exit. All cash, as-is, 7-14 days, and I pay a referral fee at closing.

Do you ever run into situations where your clients need to sell a home as part of a settlement and just want it done quickly?

[IF YES] → That's exactly what I do. Would it be okay if I sent you my contact info and a brief overview of how it works?

[IF SOMETIMES] → Those situations are exactly where I can help. Let me send you my info — no obligation, just a resource for when the time comes.

[IF NO] → Totally fine. I appreciate the time — have a great day."`,

    "Real Estate Agent": `COLD CALL SCRIPT — REAL ESTATE AGENT

"Hi [Name], this is Jacob Levy with Home-Link Realty Group — I'm a cash buyer in the nationwide.

Quick question — do you ever work with sellers who are in a situation where they need to sell fast and the traditional listing route isn't working? Expired listings, price reductions, as-is situations?

[IF YES] → Perfect. I buy direct — all cash, no contingencies, close in 7-14 days. And I always honor the agent's commission — you still get paid. Would you be open to chatting for 5 minutes about how we could work together?

[IF SOMETIMES] → I specialize in exactly those situations. Let me shoot you my info — you'll have a go-to cash buyer when one of those comes up.

[IF NO] → Got it — appreciate your time. If that ever changes, I'd love to be a resource. Have a great day."`,

  },

  linkedin: {

    "Probate Attorney": `LINKEDIN MESSAGE — PROBATE ATTORNEY (Connection Request)

"Hi [Name] — I work with estate attorneys  nationwide as a cash buyer for properties that need to sell quickly. Would love to connect as a resource for your clients."

---

AFTER CONNECTING (Day 2):

"Thanks for connecting! My name is Jacob Levy — I buy properties from estate sellers all cash, as-is, in 7-14 days. If you're ever working through an estate with a property that needs a fast exit, I'd love to be your go-to buyer. I also structure a referral arrangement at closing. Happy to send over details if you're open to it."`,

    "Real Estate Agent": `LINKEDIN MESSAGE — REAL ESTATE AGENT (Connection Request)

"Hi [Name] — fellow real estate nationwide professional here. I'm a cash buyer and love working with agents on hard-to-sell listings. Would love to connect."

---

AFTER CONNECTING (Day 2):

"Thanks for connecting! I specialize in buying properties that are tough to sell through traditional listings — expired, as-is, price-reduced 60+ days. All cash, fast close, and I always protect the agent's commission. Do you have anything right now that might be a fit?"`,

  },

  email_sequence: {

    "Probate Attorney": [

      { day: 1, subject: "Quick question — estates that need to sell property fast?", preview: "Intro + resource offer + referral fee mention" },

      { day: 6, subject: "Re: Cash buyer resource for your estate clients", preview: "Follow-up + referral agreement offer" },

      { day: 13, subject: "Last note — referral fee for estate properties", preview: "Short close + direct CTA" },

      { day: 27, subject: "Checking in — any estate properties I can help with?", preview: "Seasonal check-in, keep warm" },

      { day: 55, subject: "Still here if you need a fast buyer for estate property", preview: "Long-term keep-alive" },

    ],

    "Divorce Attorney": [

      { day: 1, subject: "Cash buyer resource for divorcing clients", preview: "Intro + divorce-specific pain points" },

      { day: 6, subject: "Re: Fast property sales for divorcing clients", preview: "Process walkthrough + referral fee" },

      { day: 13, subject: "Last note — cash sales for divorce clients", preview: "Short close" },

    ],

    "Real Estate Agent": [

      { day: 1, subject: "Do you have listings that aren't selling?", preview: "Intro + expired/as-is focus + commission protection" },

      { day: 6, subject: "Re: Cash buyer for hard-to-sell listings", preview: "Specific property types I buy" },

      { day: 20, subject: "Still looking for expired listings  nationwide", preview: "Keep-warm" },

    ],

  },

  where_to_find: {

    "Probate Attorney": [

      "Google: 'probate attorney nationwide' → call every result",

      "Nationwide County Bar Association member directory (free)",

      "Avvo.com → filter by Probate + Nationwide",

      "Martindale.com → Probate attorneys Nationwide",

      "Justia.com → attorney directory by practice area",

      "Seamless.ai → search: Title='Probate Attorney' + Location='nationwide'",

    ],

    "Divorce Attorney": [

      "Google: 'divorce attorney nationwide' → first 3 pages",

      "Avvo.com → Family Law + Nationwide",

      "Find attorneys: your state bar website or martindale.com",

      "Seamless.ai → Title='Divorce Attorney' OR 'Family Law Attorney' + Nationwide",

      "Local bar association referral list",

    ],

    "Real Estate Agent": [

      "Zillow agent directory — filter by Nationwide + recently active",

      "Realtor.com agent search — expired listing specialists",

      "HAR.com (Houston Assoc of Realtors) agent directory",

      "Seamless.ai → Title='Real Estate Agent' OR 'Realtor' + Nationwide",

      "Expired listing data from REDX or Vulcan7",

    ],

    "Property Manager": [

      "Google: 'property management company nationwide'",

      "NARPM.org — National Assoc of Residential Property Managers",

      "Yelp property management Nationwide",

      "Seamless.ai → Title='Property Manager' OR 'Property Management' + Nationwide",

    ],

    "Cash Buyer": [

      "Zillow Recent Sales — filter Cash purchases only → contact those buyers",

      "BiggerPockets.com — real estate nationwide investors forum",

      "Local REIA (Real Estate Investors Association) — meetup.com",

      "Facebook Groups: 'real estate nationwide Investors', 'US House Flippers'",

      "Courthouse records — cash purchases show no mortgage lender",

      "Connected Investors platform (free)",

      "Seamless.ai → Title='Real Estate Investor' + Nationwide",

    ],

  },

};

function Tag({ label, color }) {

  return <span style={{ background: color + "22", color, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{label}</span>;

}

function Modal({ title, onClose, children }) {

  return (

    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>

      <div style={{ background: "#fff", borderRadius: 14, width: "100%", maxWidth: 680, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #f0f0f0" }}>

          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900 }}>{title}</h3>

          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#999" }}>×</button>

        </div>

        <div style={{ padding: "20px 24px" }}>{children}</div>

      </div>

    </div>

  );

}

export default function ReferralEngine() {

  const [tab, setTab] = useState("referrals");

  const [referrals, setReferrals] = useState([]);

  const [buyers, setBuyers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(null);

  const [scriptModal, setScriptModal] = useState(null);

  const [whereModal, setWhereModal] = useState(null);

  const [showAddReferral, setShowAddReferral] = useState(false);

  const [showAddBuyer, setShowAddBuyer] = useState(false);

  const [filterType, setFilterType] = useState("All");

  const [filterStatus, setFilterStatus] = useState("All");

  const [newReferral, setNewReferral] = useState({ name: "", company: "", title: "", type: "Probate Attorney", phone: "", email: "", city: "Nationwide", state: "TX", status: "New", source: "", notes: "", priority: "Warm", preferred_contact_method: "Email" });

  const [newBuyer, setNewBuyer] = useState({ name: "", company: "", phone: "", email: "", city: "Nationwide", state: "TX", buyer_type: "Fix & Flip", price_min: 50000, price_max: 250000, arv_max_percent: 70, condition_preference: "Any", closing_timeline: "14 days", status: "New", source: "", notes: "", priority: "B-Buyer" });

  useEffect(() => {

    // ── Google Analytics 4 (GA4) ──

    const GA_ID = "G-YZEQCX26X2";

    if (!document.getElementById("ga4-script")) {

      const s = document.createElement("script");

      s.id = "ga4-script";

      s.async = true;

      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

      document.head.appendChild(s);

      window.dataLayer = window.dataLayer || [];

      function gtag(){ window.dataLayer.push(arguments); }

      window.gtag = gtag;

      gtag("js", new Date());

      gtag("config", GA_ID, { send_page_view: true });

    } else {

      window.gtag && window.gtag("event", "page_view");

    }

 loadData();

  }, []);

  async function loadData() {

    setLoading(true);

    try {

      const [r, b] = await Promise.all([Referral.list(), CashBuyer.list()]);

      setReferrals(r.sort((a, b) => new Date(a.next_followup_date || "2099") - new Date(b.next_followup_date || "2099")));

      setBuyers(b.sort((a, b) => (b.priority || "").localeCompare(a.priority || "")));

    } catch (e) { console.error(e); }

    setLoading(false);

  }

  async function saveReferral() {

    const today = new Date().toISOString().split("T")[0];

    await Referral.create({ ...newReferral, touch_count: 0, next_followup_date: today, last_contact_date: today, deals_referred: 0, revenue_from_referrals: 0 });

    setShowAddReferral(false);

    setNewReferral({ name: "", company: "", title: "", type: "Probate Attorney", phone: "", email: "", city: "Nationwide", state: "TX", status: "New", source: "", notes: "", priority: "Warm", preferred_contact_method: "Email" });

    loadData();

  }

  async function saveBuyer() {

    const today = new Date().toISOString().split("T")[0];

    await CashBuyer.create({ ...newBuyer, touch_count: 0, next_followup_date: today, last_contact_date: today, deals_sent: 0, deals_closed: 0, total_volume: 0 });

    setShowAddBuyer(false);

    setNewBuyer({ name: "", company: "", phone: "", email: "", city: "Nationwide", state: "TX", buyer_type: "Fix & Flip", price_min: 50000, price_max: 250000, arv_max_percent: 70, condition_preference: "Any", closing_timeline: "14 days", status: "New", source: "", notes: "", priority: "B-Buyer" });

    loadData();

  }

  async function updateReferralStatus(id, status) {

    await Referral.update(id, { status });

    loadData();

  }

  async function updateBuyerStatus(id, status) {

    await CashBuyer.update(id, { status });

    loadData();

  }

  const filteredReferrals = referrals.filter(r =>

    (filterType === "All" || r.type === filterType) &&

    (filterStatus === "All" || r.status === filterStatus)

  );

  const stats = {

    totalReferrals: referrals.length,

    activePartners: referrals.filter(r => r.status === "Active Partner").length,

    totalBuyers: buyers.length,

    activeBuyers: buyers.filter(b => b.status === "Active").length,

    referralRevenue: referrals.reduce((s, r) => s + (r.revenue_from_referrals || 0), 0),

    dueToday: referrals.filter(r => r.next_followup_date <= new Date().toISOString().split("T")[0] && !["Active Partner","Inactive"].includes(r.status)).length,

  };

  const s = {

    page: { fontFamily: "'Segoe UI',Arial,sans-serif", background: G, minHeight: "100vh" },

    card: { background: "#fff", borderRadius: 12, padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },

    btn: (bg, light) => ({ background: bg, color: light ? "#333" : "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }),

    input: { width: "100%", padding: "9px 12px", border: "1.5px solid #e0e0e0", borderRadius: 8, fontSize: 13, boxSizing: "border-box" },

    label: { fontSize: 12, color: "#888", fontWeight: 700, marginBottom: 4, display: "block" },

  };

  return (

    <SaaSLayout

      title="Referral & Cash Buyer Engine"

      subtitle="Fully automated drips · 8AM & 9AM weekdays · referral partners + buyer list"

      icon={MessageSquare}

      accent="#D4A843"

    >

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* KPI STATS */}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>

          {[

            ["🤝 Referral Partners", stats.totalReferrals, `${stats.activePartners} active`, "#9b59b6"],

            ["💰 Cash Buyers", stats.totalBuyers, `${stats.activeBuyers} active`, "#27ae60"],

            ["📧 Due Today", stats.dueToday, "auto-sends at 8AM", "#D4A843"],

          ].map(([label, val, sub, color]) => (

            <div key={label} style={{ ...s.card, borderTop: `4px solid ${color}`, textAlign: "center" }}>

              <div style={{ fontSize: 28, fontWeight: 900, color }}>{val}</div>

              <div style={{ fontSize: 14, fontWeight: 700, color: D, marginTop: 2 }}>{label}</div>

              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{sub}</div>

            </div>

          ))}

        </div>

        {/* AUTOMATION STATUS */}

        <div style={{ ...s.card, marginBottom: 24, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>

          <div style={{ fontWeight: 900, color: "#166534", marginBottom: 10, fontSize: 15 }}>✅ Active Automations Running 24/7</div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>

            {[

              ["🤝 Referral Drip", "Mon–Fri 8:00 AM", "Sends personalized email to every referral partner due today. Type-specific templates (probate, divorce, agent, PM)."],

              ["💰 Buyer Drip", "Mon–Fri 9:00 AM", "Sends personalized email to every cash buyer due today. Buyer-type templates (flip, hold, wholesale)."],

              ["⚡ New Referral → Instant Email", "Triggered on create", "When you add a new referral partner, Touch 1 email fires same day."],

              ["💼 New Buyer → Instant Email", "Triggered on create", "When you add a new cash buyer, Touch 1 email fires same day."],

            ].map(([name, schedule, desc]) => (

              <div key={name} style={{ background: "#fff", borderRadius: 8, padding: "12px 14px", border: "1px solid #dcfce7" }}>

                <div style={{ fontWeight: 800, fontSize: 13, color: D }}>{name}</div>

                <div style={{ fontSize: 11, color: "#27ae60", fontWeight: 700, margin: "3px 0" }}>{schedule}</div>

                <div style={{ fontSize: 12, color: "#555" }}>{desc}</div>

              </div>

            ))}

          </div>

        </div>

        {/* TABS */}

        <div style={{ display: "flex", gap: 0, marginBottom: 20 }}>

          {[["referrals","🤝 Referral Partners"],["buyers","💰 Cash Buyers"],["scripts","📋 Scripts & Playbooks"],["where","🗺️ Where to Find Them"]].map(([id, label]) => (

            <button key={id} onClick={() => setTab(id)} style={{ ...s.btn(tab === id ? R : "#fff", tab !== id), border: "1px solid #e0e0e0", borderRadius: id === "referrals" ? "8px 0 0 8px" : id === "where" ? "0 8px 8px 0" : 0, padding: "10px 18px" }}>{label}</button>

          ))}

        </div>

        {/* REFERRAL PARTNERS TAB */}

        {tab === "referrals" && (

          <div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>

                <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ ...s.input, width: "auto" }}>

                  <option value="All">All Types</option>

                  {REFERRAL_TYPES.map(t => <option key={t}>{t}</option>)}

                </select>

                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ ...s.input, width: "auto" }}>

                  <option value="All">All Statuses</option>

                  {REFERRAL_STATUSES.map(s => <option key={s}>{s}</option>)}

                </select>

              </div>

              <button onClick={() => setShowAddReferral(true)} style={s.btn(R, false)}>+ Add Referral Partner</button>

            </div>

            {loading ? <div style={{ textAlign: "center", padding: 40, color: "#888" }}>Loading...</div> : (

              <div style={{ display: "grid", gap: 10 }}>

                {filteredReferrals.length === 0 ? (

                  <div style={{ ...s.card, textAlign: "center", padding: 40 }}>

                    <div style={{ fontSize: 40, marginBottom: 12 }}>🤝</div>

                    <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>No referral partners yet</div>

                    <div style={{ color: "#888", marginBottom: 16 }}>Add your first probate attorney, divorce attorney, or real estate agent to kick off the automated drip.</div>

                    <button onClick={() => setShowAddReferral(true)} style={s.btn(R, false)}>+ Add First Partner</button>

                  </div>

                ) : filteredReferrals.map(r => (

                  <div key={r.id} style={{ ...s.card, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>

                    <div style={{ flex: 1, minWidth: 200 }}>

                      <div style={{ fontWeight: 800, fontSize: 15 }}>{r.name || "—"}</div>

                      <div style={{ fontSize: 13, color: "#888" }}>{r.company || r.type}</div>

                      <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>

                        <Tag label={r.type || "Unknown"} color="#9b59b6" />

                        <Tag label={r.status || "New"} color={STATUS_COLORS[r.status] || "#888"} />

                        {r.priority && <Tag label={r.priority} color={r.priority === "Hot" ? R : r.priority === "Warm" ? "#e67e22" : "#3498db"} />}

                      </div>

                    </div>

                    <div style={{ fontSize: 12, color: "#666", minWidth: 120 }}>

                      <div>📞 {r.phone || "—"}</div>

                      <div>✉️ {r.email || "—"}</div>

                      <div>🏙️ {r.city || "—"}</div>

                    </div>

                    <div style={{ fontSize: 12, color: "#666", minWidth: 110 }}>

                      <div>Touch #{r.touch_count || 0}</div>

                      <div style={{ color: r.next_followup_date <= new Date().toISOString().split("T")[0] ? R : "#888" }}>

                        Next: {r.next_followup_date || "Today"}

                      </div>

                      <div>Deals: {r.deals_referred || 0}</div>

                    </div>

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>

                      <select value={r.status} onChange={e => updateReferralStatus(r.id, e.target.value)} style={{ ...s.input, width: "auto", fontSize: 12, padding: "6px 10px" }}>

                        {REFERRAL_STATUSES.map(s => <option key={s}>{s}</option>)}

                      </select>

                      <button onClick={() => setScriptModal({ type: r.type, name: r.name })} style={s.btn("#f8f9fa", true)}>Scripts</button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        )}

        {/* CASH BUYERS TAB */}

        {tab === "buyers" && (

          <div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>

              <div style={{ fontSize: 14, color: "#888" }}>{buyers.length} buyers total • {buyers.filter(b => b.status === "Active").length} active</div>

              <button onClick={() => setShowAddBuyer(true)} style={s.btn("#27ae60", false)}>+ Add Cash Buyer</button>

            </div>

            {loading ? <div style={{ textAlign: "center", padding: 40, color: "#888" }}>Loading...</div> : (

              <div style={{ display: "grid", gap: 10 }}>

                {buyers.length === 0 ? (

                  <div style={{ ...s.card, textAlign: "center", padding: 40 }}>

                    <div style={{ fontSize: 40, marginBottom: 12 }}>💰</div>

                    <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>No cash buyers yet</div>

                    <div style={{ color: "#888", marginBottom: 16 }}>Add your first cash buyer. They'll get an automated welcome email and be queued for your drip sequence.</div>

                    <button onClick={() => setShowAddBuyer(true)} style={s.btn("#27ae60", false)}>+ Add First Buyer</button>

                  </div>

                ) : buyers.map(b => (

                  <div key={b.id} style={{ ...s.card, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>

                    <div style={{ flex: 1, minWidth: 200 }}>

                      <div style={{ fontWeight: 800, fontSize: 15 }}>{b.name || "—"}</div>

                      <div style={{ fontSize: 13, color: "#888" }}>{b.company || b.buyer_type}</div>

                      <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>

                        <Tag label={b.buyer_type || "Buyer"} color="#27ae60" />

                        <Tag label={b.status || "New"} color={STATUS_COLORS[b.status] || "#888"} />

                        <Tag label={b.priority || "B-Buyer"} color={b.priority === "A-Buyer" ? "#D4A843" : b.priority === "B-Buyer" ? "#e67e22" : "#888"} />

                      </div>

                    </div>

                    <div style={{ fontSize: 12, color: "#666", minWidth: 140 }}>

                      <div>💵 ${(b.price_min || 0).toLocaleString()}–${(b.price_max || 0).toLocaleString()}</div>

                      <div>📊 Max ARV: {b.arv_max_percent || 70}%</div>

                      <div>⏱️ Close: {b.closing_timeline || "—"}</div>

                      <div>📍 {b.city || "—"}, {b.state || "—"}</div>

                    </div>

                    <div style={{ fontSize: 12, color: "#666", minWidth: 110 }}>

                      <div>Touch #{b.touch_count || 0}</div>

                      <div>Deals Sent: {b.deals_sent || 0}</div>

                      <div>Closed: {b.deals_closed || 0}</div>

                    </div>

                    <div style={{ display: "flex", gap: 6 }}>

                      <select value={b.status} onChange={e => updateBuyerStatus(b.id, e.target.value)} style={{ ...s.input, width: "auto", fontSize: 12, padding: "6px 10px" }}>

                        {BUYER_STATUSES.map(s => <option key={s}>{s}</option>)}

                      </select>

                      <button onClick={() => setWhereModal("Cash Buyer")} style={s.btn("#f8f9fa", true)}>Find More</button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        )}

        {/* SCRIPTS TAB */}

        {tab === "scripts" && (

          <div style={{ display: "grid", gap: 16 }}>

            <div style={{ ...s.card }}>

              <h3 style={{ margin: "0 0 16px", fontSize: 17, fontWeight: 900 }}>📞 Cold Call Scripts by Partner Type</h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>

                {Object.keys(SCRIPTS.cold_call).map(type => (

                  <div key={type} onClick={() => setScriptModal({ type, mode: "cold_call" })} style={{ border: "2px solid #e0e0e0", borderRadius: 10, padding: "16px", cursor: "pointer", transition: "all 0.15s" }} onMouseEnter={e => e.currentTarget.style.borderColor = R} onMouseLeave={e => e.currentTarget.style.borderColor = "#e0e0e0"}>

                    <div style={{ fontWeight: 800, fontSize: 14 }}>📞 {type}</div>

                    <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Full cold call script with objection handling</div>

                    <div style={{ color: R, fontSize: 12, fontWeight: 700, marginTop: 8 }}>View Script →</div>

                  </div>

                ))}

              </div>

            </div>

            <div style={{ ...s.card }}>

              <h3 style={{ margin: "0 0 16px", fontSize: 17, fontWeight: 900 }}>💼 LinkedIn Message Scripts</h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>

                {Object.keys(SCRIPTS.linkedin).map(type => (

                  <div key={type} onClick={() => setScriptModal({ type, mode: "linkedin" })} style={{ border: "2px solid #e0e0e0", borderRadius: 10, padding: "16px", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#0077b5"} onMouseLeave={e => e.currentTarget.style.borderColor = "#e0e0e0"}>

                    <div style={{ fontWeight: 800, fontSize: 14 }}>💼 {type}</div>

                    <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Connection request + follow-up message</div>

                    <div style={{ color: "#0077b5", fontSize: 12, fontWeight: 700, marginTop: 8 }}>View Script →</div>

                  </div>

                ))}

              </div>

            </div>

            <div style={{ ...s.card }}>

              <h3 style={{ margin: "0 0 16px", fontSize: 17, fontWeight: 900 }}>📧 Automated Email Sequence Timelines</h3>

              {Object.entries(SCRIPTS.email_sequence).map(([type, touches]) => (

                <div key={type} style={{ marginBottom: 20 }}>

                  <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10, color: D }}>{type}</div>

                  <div style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: 8 }}>

                    {touches.map((touch, i) => (

                      <div key={i} style={{ minWidth: 160, padding: "12px 14px", background: i === 0 ? R + "15" : "#f8f9fa", border: `1px solid ${i === 0 ? R + "40" : "#e0e0e0"}`, borderRadius: i === 0 ? "8px 0 0 8px" : i === touches.length - 1 ? "0 8px 8px 0" : 0 }}>

                        <div style={{ fontSize: 11, fontWeight: 800, color: i === 0 ? R : "#888" }}>Day {touch.day}</div>

                        <div style={{ fontSize: 12, fontWeight: 700, margin: "4px 0", color: D }}>{touch.subject.slice(0, 45)}...</div>

                        <div style={{ fontSize: 11, color: "#888" }}>{touch.preview}</div>

                      </div>

                    ))}

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* WHERE TO FIND THEM TAB */}

        {tab === "where" && (

          <div style={{ display: "grid", gap: 16 }}>

            {Object.entries(SCRIPTS.where_to_find).map(([type, sources]) => (

              <div key={type} style={s.card}>

                <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 900 }}>🗺️ {type === "Cash Buyer" ? "💰 Cash Buyer" : "🤝 " + type}</h3>

                <div style={{ display: "grid", gap: 8 }}>

                  {sources.map((src, i) => (

                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 14px", background: "#f8f9fa", borderRadius: 8 }}>

                      <span style={{ background: R, color: "#fff", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, flexShrink: 0 }}>{i + 1}</span>

                      <span style={{ fontSize: 13, color: "#333" }}>{src}</span>

                    </div>

                  ))}

                </div>

              </div>

            ))}

            <div style={{ ...s.card, background: "#fffbeb", border: "1px solid #fde68a" }}>

              <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 900, color: "#92400e" }}>⚡ The 30-Minute Weekly Routine</h3>

              <div style={{ display: "grid", gap: 8 }}>

                {[

                  ["Mon 15 min", "Search Seamless.ai or Google → Find 10 new probate/divorce attorneys  nationwide → Add to Referral Engine → automation handles the rest"],

                  ["Wed 10 min", "Search Zillow recent cash sales → Find 5 new cash buyers → Add to Buyer Engine → automation sends intro email same day"],

                  ["Fri 5 min", "Check email responses → Mark responders as 'Responded' → Schedule call for any who want to talk"],

                ].map(([time, action]) => (

                  <div key={time} style={{ display: "flex", gap: 12, padding: "10px 14px", background: "#fff", borderRadius: 8 }}>

                    <span style={{ background: "#f59e0b", color: "#fff", padding: "3px 10px", borderRadius: 8, fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{time}</span>

                    <span style={{ fontSize: 13, color: "#333" }}>{action}</span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        )}

      </div>

      {/* ADD REFERRAL MODAL */}

      {showAddReferral && (

        <Modal title="Add Referral Partner" onClose={() => setShowAddReferral(false)}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

            {[["name","Full Name"],["company","Company / Firm"],["phone","Phone Number"],["email","Email Address"],["city","City"],["state","State"]].map(([field, label]) => (

              <div key={field}>

                <label style={s.label}>{label}</label>

                <input value={newReferral[field]} onChange={e => setNewReferral({...newReferral,[field]:e.target.value})} style={s.input} />

              </div>

            ))}

            <div>

              <label style={s.label}>Partner Type</label>

              <select value={newReferral.type} onChange={e => setNewReferral({...newReferral,type:e.target.value})} style={s.input}>

                {REFERRAL_TYPES.map(t => <option key={t}>{t}</option>)}

              </select>

            </div>

            <div>

              <label style={s.label}>Priority</label>

              <select value={newReferral.priority} onChange={e => setNewReferral({...newReferral,priority:e.target.value})} style={s.input}>

                {["Hot","Warm","Cold"].map(p => <option key={p}>{p}</option>)}

              </select>

            </div>

            <div>

              <label style={s.label}>Preferred Contact</label>

              <select value={newReferral.preferred_contact_method} onChange={e => setNewReferral({...newReferral,preferred_contact_method:e.target.value})} style={s.input}>

                {["Email","Phone","LinkedIn","Text"].map(m => <option key={m}>{m}</option>)}

              </select>

            </div>

            <div>

              <label style={s.label}>Source</label>

              <input value={newReferral.source} onChange={e => setNewReferral({...newReferral,source:e.target.value})} placeholder="Google, Seamless.ai, Referral..." style={s.input} />

            </div>

            <div style={{ gridColumn: "1/-1" }}>

              <label style={s.label}>Notes</label>

              <textarea value={newReferral.notes} onChange={e => setNewReferral({...newReferral,notes:e.target.value})} style={{ ...s.input, height: 70 }} />

            </div>

          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>

            <button onClick={saveReferral} style={s.btn(R, false)}>Save &amp; Start Drip Sequence</button>

            <button onClick={() => setShowAddReferral(false)} style={s.btn("#e0e0e0", true)}>Cancel</button>

          </div>

        </Modal>

      )}

      {/* ADD BUYER MODAL */}

      {showAddBuyer && (

        <Modal title="Add Cash Buyer" onClose={() => setShowAddBuyer(false)}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

            {[["name","Full Name"],["company","Company / LLC"],["phone","Phone"],["email","Email"],["city","City"],["state","State"]].map(([field, label]) => (

              <div key={field}>

                <label style={s.label}>{label}</label>

                <input value={newBuyer[field]} onChange={e => setNewBuyer({...newBuyer,[field]:e.target.value})} style={s.input} />

              </div>

            ))}

            <div>

              <label style={s.label}>Buyer Type</label>

              <select value={newBuyer.buyer_type} onChange={e => setNewBuyer({...newBuyer,buyer_type:e.target.value})} style={s.input}>

                {BUYER_TYPES.map(t => <option key={t}>{t}</option>)}

              </select>

            </div>

            <div>

              <label style={s.label}>Priority</label>

              <select value={newBuyer.priority} onChange={e => setNewBuyer({...newBuyer,priority:e.target.value})} style={s.input}>

                {["A-Buyer","B-Buyer","C-Buyer"].map(p => <option key={p}>{p}</option>)}

              </select>

            </div>

            <div>

              <label style={s.label}>Min Price ($)</label>

              <input type="number" value={newBuyer.price_min} onChange={e => setNewBuyer({...newBuyer,price_min:+e.target.value})} style={s.input} />

            </div>

            <div>

              <label style={s.label}>Max Price ($)</label>

              <input type="number" value={newBuyer.price_max} onChange={e => setNewBuyer({...newBuyer,price_max:+e.target.value})} style={s.input} />

            </div>

            <div>

              <label style={s.label}>Max ARV %</label>

              <input type="number" value={newBuyer.arv_max_percent} onChange={e => setNewBuyer({...newBuyer,arv_max_percent:+e.target.value})} style={s.input} />

            </div>

            <div>

              <label style={s.label}>Closing Timeline</label>

              <input value={newBuyer.closing_timeline} onChange={e => setNewBuyer({...newBuyer,closing_timeline:e.target.value})} placeholder="14 days, 7 days..." style={s.input} />

            </div>

            <div>

              <label style={s.label}>Condition Preference</label>

              <select value={newBuyer.condition_preference} onChange={e => setNewBuyer({...newBuyer,condition_preference:e.target.value})} style={s.input}>

                {["Any","Light Rehab","Heavy Rehab","Turnkey Only"].map(c => <option key={c}>{c}</option>)}

              </select>

            </div>

            <div>

              <label style={s.label}>Source</label>

              <input value={newBuyer.source} onChange={e => setNewBuyer({...newBuyer,source:e.target.value})} placeholder="Zillow, BiggerPockets, REIA..." style={s.input} />

            </div>

            <div style={{ gridColumn: "1/-1" }}>

              <label style={s.label}>Buy Areas (neighborhoods, zip codes)</label>

              <input value={newBuyer.buy_areas} onChange={e => setNewBuyer({...newBuyer,buy_areas:e.target.value})} placeholder="Oak Cliff, 75224, South Nationwide..." style={s.input} />

            </div>

            <div style={{ gridColumn: "1/-1" }}>

              <label style={s.label}>Notes</label>

              <textarea value={newBuyer.notes} onChange={e => setNewBuyer({...newBuyer,notes:e.target.value})} style={{ ...s.input, height: 60 }} />

            </div>

          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>

            <button onClick={saveBuyer} style={s.btn("#27ae60", false)}>Save &amp; Start Buyer Drip</button>

            <button onClick={() => setShowAddBuyer(false)} style={s.btn("#e0e0e0", true)}>Cancel</button>

          </div>

        </Modal>

      )}

      {/* SCRIPT MODAL */}

      {scriptModal && (

        <Modal title={`${scriptModal.mode === "linkedin" ? "💼 LinkedIn" : "📞 Cold Call"} Script — ${scriptModal.type}`} onClose={() => setScriptModal(null)}>

          <pre style={{ background: "#f8f9fa", padding: 16, borderRadius: 8, fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: 420, overflowY: "auto" }}>

            {scriptModal.mode === "linkedin"

              ? SCRIPTS.linkedin[scriptModal.type] || "Script coming soon."

              : SCRIPTS.cold_call[scriptModal.type] || "Script coming soon."}

          </pre>

          <button onClick={() => { navigator.clipboard?.writeText(scriptModal.mode === "linkedin" ? SCRIPTS.linkedin[scriptModal.type] : SCRIPTS.cold_call[scriptModal.type]); }} style={{ ...s.btn(R, false), marginTop: 12 }}>📋 Copy to Clipboard</button>

        </Modal>

      )}

    </SaaSLayout>

  );

}
