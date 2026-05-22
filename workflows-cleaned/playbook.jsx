import { useEffect, useState} from "react";

const COVER_AERIAL = "https://media.base44.com/images/public/69d48a8432b834f7bfa0beaa/9d64257fa_generated_image.png";
const COVER_DESK = "https://media.base44.com/images/public/69d48a8432b834f7bfa0beaa/ee6c5dbc2_generated_image.png";
const COVER_CONTRACT = "https://media.base44.com/images/public/69d48a8432b834f7bfa0beaa/a1ab9996e_generated_image.png";
const COVER_RENO = "https://media.base44.com/images/public/69d48a8432b834f7bfa0beaa/971d82fae_generated_image.png";
const LOGO = "https://media.base44.com/images/public/69d48a8432b834f7bfa0beaa/4450143b1_Home-LinkLogo.png";

const DARK = "#0d0d1a";
const RED = "#e63946";
const GOLD = "#f4a300";
const BLUE = "#0f3460";
const TEAL = "#0d7377";
const GREEN = "#2dc653";
const PURPLE = "#7b2d8b";
const GRAY = "#f4f6fb";
const TEXT = "#2c2c3e";

/* ─── PRINT STYLES injected once ─── */
const PRINT_CSS = `
@media print {
  body { margin: 0; padding: 0; }
  .no-print { display: none !important; }
  .page-break { page-break-before: always; }
  .cover-page { page-break-after: always; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
@page { margin: 0; size: letter; }
`;

/* ─── SUB-COMPONENTS ─── */

const CoverPage = ({ img, tag, title, subtitle, dark = true }) => (
  <div className="cover-page" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", breakAfter: "page" }}>
    <img src={img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    <div style={{ position: "absolute", inset: 0, background: dark ? "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)" : "linear-gradient(to bottom, rgba(13,13,26,0.6) 0%, rgba(13,13,26,0.85) 100%)" }} />
    <div style={{ position: "absolute", bottom: "10%", left: "8%", right: "8%", color: "#fff" }}>
      {tag && <div style={{ fontFamily: "Arial", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "3px", color: GOLD, marginBottom: "16px", borderLeft: `3px solid ${GOLD}`, paddingLeft: "12px" }}>{tag}</div>}
      <h1 style={{ fontFamily: "Arial", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "900", margin: "0 0 16px", lineHeight: 1.1, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>{title}</h1>
      {subtitle && <p style={{ fontFamily: "Arial", fontSize: "18px", color: "rgba(255,255,255,0.85)", margin: 0, maxWidth: "600px", lineHeight: 1.6 }}>{subtitle}</p>}
      <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
        <img src={LOGO} alt="Home-Link" style={{ height: "48px", filter: "brightness(0) invert(1)" }} />
        <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.4)" }} />
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>Home-Link Realty Group LLC<br />Jacob Levy · (855) 810-1786 · jacob.levy@homelinkrealtygroup.com</div>
      </div>
    </div>
  </div>
);

const ChapterCover = ({ img, number, title, desc }) => (
  <div className="cover-page page-break" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", breakAfter: "page" }}>
    <img src={img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,13,26,0.9) 0%, rgba(14,52,96,0.8) 100%)" }} />
    <div style={{ position: "absolute", top: "50%", left: "8%", right: "8%", transform: "translateY(-50%)", color: "#fff", textAlign: "center" }}>
      <div style={{ fontFamily: "Arial", fontSize: "80px", fontWeight: "900", color: "rgba(244,163,0,0.2)", lineHeight: 1, marginBottom: "8px" }}>{String(number).padStart(2, "0")}</div>
      <div style={{ fontFamily: "Arial", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "4px", color: GOLD, marginBottom: "20px" }}>Chapter {number}</div>
      <h2 style={{ fontFamily: "Arial", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "900", margin: "0 0 20px", lineHeight: 1.15 }}>{title}</h2>
      <p style={{ fontFamily: "Arial", fontSize: "17px", color: "rgba(255,255,255,0.75)", maxWidth: "550px", margin: "0 auto", lineHeight: 1.7 }}>{desc}</p>
    </div>
    <div style={{ position: "absolute", bottom: "6%", left: "8%", right: "8%", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "20px" }}>
      <img src={LOGO} alt="Home-Link" style={{ height: "32px", filter: "brightness(0) invert(1)", opacity: 0.7 }} />
      <div style={{ fontFamily: "Arial", fontSize: "12px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Confidential · Home-Link Realty Group LLC</div>
    </div>
  </div>
);

const DocPage = ({ children, pageNum }) => (
  <div className="page-break" style={{ background: "#fff", minHeight: "100vh", padding: "64px 72px", boxSizing: "border-box", position: "relative", fontFamily: "Arial, sans-serif" }}>
    {children}
    <div style={{ position: "absolute", bottom: "32px", left: "72px", right: "72px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid #eee`, paddingTop: "12px" }}>
      <div style={{ fontSize: "10px", color: "#aaa", textTransform: "uppercase", letterSpacing: "1px" }}>Home-Link Realty Group LLC · Confidential</div>
      <div style={{ fontSize: "10px", color: "#aaa" }}>Page {pageNum}</div>
      <div style={{ fontSize: "10px", color: "#aaa" }}>April 2026</div>
    </div>
  </div>
);

const SectionHeader = ({ number, title, color = RED }) => (
  <div style={{ marginBottom: "32px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
      <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: color, color: "#fff", fontWeight: "900", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{number}</div>
      <h2 style={{ fontSize: "26px", fontWeight: "900", color: DARK, margin: 0 }}>{title}</h2>
    </div>
    <div style={{ height: "3px", background: `linear-gradient(to right, ${color}, transparent)`, borderRadius: "2px" }} />
  </div>
);

const InfoBox = ({ label, value, color = BLUE }) => (
  <div style={{ display: "flex", borderBottom: "1px solid #f0f0f0", padding: "10px 0", gap: "16px" }}>
    <div style={{ minWidth: "200px", fontWeight: "800", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.3px", color, paddingTop: "2px" }}>{label}</div>
    <div style={{ fontSize: "13px", color: TEXT, lineHeight: 1.7, flex: 1 }}>{value}</div>
  </div>
);

const StepBox = ({ num, title, detail, color = RED, tag }) => (
  <div style={{ display: "flex", gap: "14px", marginBottom: "18px", alignItems: "flex-start" }}>
    <div style={{ minWidth: "36px", height: "36px", borderRadius: "50%", background: color, color: "#fff", fontWeight: "900", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>{num}</div>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "4px" }}>
        <div style={{ fontWeight: "800", fontSize: "14px", color: DARK }}>{title}</div>
        {tag && <div style={{ background: color, color: "#fff", fontSize: "9px", fontWeight: "700", padding: "2px 7px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{tag}</div>}
      </div>
      <div style={{ fontSize: "13px", color: TEXT, lineHeight: 1.7 }}>{detail}</div>
    </div>
  </div>
);

const ScriptBlock = ({ label, text, color = BLUE }) => (
  <div style={{ marginBottom: "14px" }}>
    <div style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.8px", color, marginBottom: "5px" }}>{label}</div>
    <div style={{ background: GRAY, borderLeft: `4px solid ${color}`, padding: "10px 14px", borderRadius: "0 6px 6px 0", fontSize: "12px", color: TEXT, lineHeight: 1.7, fontStyle: "italic" }}>"{text}"</div>
  </div>
);

const TableHeader = ({ cols }) => (
  <div style={{ display: "grid", gridTemplateColumns: cols, background: DARK, borderRadius: "6px 6px 0 0" }}>
    {/* cols rendered by parent */}
  </div>
);

const Callout = ({ icon, text, color = GOLD }) => (
  <div style={{ background: color + "15", border: `1.5px solid ${color}`, borderRadius: "8px", padding: "12px 16px", display: "flex", gap: "10px", marginBottom: "18px" }}>
    <span style={{ fontSize: "18px", flexShrink: 0 }}>{icon}</span>
    <div style={{ fontSize: "13px", color: TEXT, lineHeight: 1.6 }}>{text}</div>
  </div>
);

/* ─── BLUEPRINT SVG COMPONENTS ─── */

const BlueprintArrow = ({ x1, y1, x2, y2, color = "#e63946" }) => (
  <defs>
    <marker id={`arrow-${x1}-${y1}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill={color} />
    </marker>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" markerEnd={`url(#arrow-${x1}-${y1})`} />
  </defs>
);

// Full workflow blueprint as inline SVG
const LeadWorkflowBlueprint = () => (
  <svg viewBox="0 0 900 620" style={{ width: "100%", background: DARK, borderRadius: "12px", padding: "8px", boxSizing: "border-box" }}>
    <defs>
      <marker id="arr" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#f4a300" />
      </marker>
      <marker id="arr-green" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#2dc653" />
      </marker>
      <marker id="arr-red" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#e63946" />
      </marker>
    </defs>

    {/* Title */}
    <text x="450" y="30" textAnchor="middle" fill="#f4a300" fontSize="14" fontWeight="bold" fontFamily="Arial">LEAD-TO-PAYDAY WORKFLOW BLUEPRINT — HOME-LINK REALTY GROUP LLC</text>
    <line x1="60" y1="38" x2="840" y2="38" stroke="#f4a300" strokeWidth="0.5" strokeDasharray="4,4" />

    {/* ROW 1: LEAD SOURCES */}
    {/* Box: Cold Call */}
    <rect x="40" y="60" width="120" height="54" rx="6" fill="#0f3460" stroke="#4a90d9" strokeWidth="1.5" />
    <text x="100" y="82" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">COLD CALL</text>
    <text x="100" y="97" textAnchor="middle" fill="#9aa3b5" fontSize="9" fontFamily="Arial">Outbound Dialing</text>
    <text x="100" y="109" textAnchor="middle" fill="#9aa3b5" fontSize="9" fontFamily="Arial">60+ calls/day</text>

    {/* Box: Website Form */}
    <rect x="200" y="60" width="120" height="54" rx="6" fill="#0f3460" stroke="#4a90d9" strokeWidth="1.5" />
    <text x="260" y="82" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">WEBSITE FORM</text>
    <text x="260" y="97" textAnchor="middle" fill="#9aa3b5" fontSize="9" fontFamily="Arial">Inbound /GetOffer</text>
    <text x="260" y="109" textAnchor="middle" fill="#9aa3b5" fontSize="9" fontFamily="Arial">24/7 automated</text>

    {/* Box: Craigslist */}
    <rect x="360" y="60" width="120" height="54" rx="6" fill="#0f3460" stroke="#4a90d9" strokeWidth="1.5" />
    <text x="420" y="82" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">CRAIGSLIST</text>
    <text x="420" y="97" textAnchor="middle" fill="#9aa3b5" fontSize="9" fontFamily="Arial">Weekly posts</text>
    <text x="420" y="109" textAnchor="middle" fill="#9aa3b5" fontSize="9" fontFamily="Arial">Mon &amp; Thu auto-remind</text>

    {/* Box: Facebook */}
    <rect x="520" y="60" width="120" height="54" rx="6" fill="#0f3460" stroke="#4a90d9" strokeWidth="1.5" />
    <text x="580" y="82" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">FACEBOOK / MLS</text>
    <text x="580" y="97" textAnchor="middle" fill="#9aa3b5" fontSize="9" fontFamily="Arial">Groups + Marketplace</text>
    <text x="580" y="109" textAnchor="middle" fill="#9aa3b5" fontSize="9" fontFamily="Arial">Expired listings</text>

    {/* Box: Referral */}
    <rect x="680" y="60" width="120" height="54" rx="6" fill="#0f3460" stroke="#4a90d9" strokeWidth="1.5" />
    <text x="740" y="82" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">REFERRAL NETWORK</text>
    <text x="740" y="97" textAnchor="middle" fill="#9aa3b5" fontSize="9" fontFamily="Arial">Attorneys, Agents</text>
    <text x="740" y="109" textAnchor="middle" fill="#9aa3b5" fontSize="9" fontFamily="Arial">Fri auto-outreach</text>

    {/* Arrows down to CRM */}
    {[100, 260, 420, 580, 740].map(x => (
      <line key={x} x1={x} y1="114" x2={x} y2="148" stroke="#f4a300" strokeWidth="1.5" markerEnd="url(#arr)" />
    ))}

    {/* Converge lines */}
    <line x1="100" y1="155" x2="450" y2="155" stroke="#f4a300" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="740" y1="155" x2="450" y2="155" stroke="#f4a300" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="450" y1="155" x2="450" y2="175" stroke="#f4a300" strokeWidth="2" markerEnd="url(#arr)" />

    {/* CRM INTAKE */}
    <rect x="310" y="175" width="280" height="60" rx="8" fill="#e63946" stroke="#ff6b6b" strokeWidth="2" />
    <text x="450" y="199" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Arial" fontWeight="bold">CRM LEAD INTAKE</text>
    <text x="450" y="214" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Arial">Lead record created · Status: New Lead</text>
    <text x="450" y="228" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Arial">3 auto-triggers fire simultaneously</text>

    {/* Three triggers */}
    {/* Trigger 1 */}
    <line x1="360" y1="235" x2="200" y2="275" stroke="#2dc653" strokeWidth="1.5" markerEnd="url(#arr-green)" />
    <rect x="110" y="275" width="180" height="50" rx="6" fill="#1a3a2a" stroke="#2dc653" strokeWidth="1.5" />
    <text x="200" y="293" textAnchor="middle" fill="#2dc653" fontSize="9" fontFamily="Arial" fontWeight="bold">AUTO-TRIGGER 1</text>
    <text x="200" y="307" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial">Jacob SMS Alert</text>
    <text x="200" y="319" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial">(within 60 seconds)</text>

    {/* Trigger 2 */}
    <line x1="450" y1="235" x2="450" y2="275" stroke="#2dc653" strokeWidth="1.5" markerEnd="url(#arr-green)" />
    <rect x="340" y="275" width="220" height="50" rx="6" fill="#1a3a2a" stroke="#2dc653" strokeWidth="1.5" />
    <text x="450" y="293" textAnchor="middle" fill="#2dc653" fontSize="9" fontFamily="Arial" fontWeight="bold">AUTO-TRIGGER 2</text>
    <text x="450" y="307" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial">Seller Auto-Response Email</text>
    <text x="450" y="319" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial">(if email provided)</text>

    {/* Trigger 3 */}
    <line x1="540" y1="235" x2="680" y2="275" stroke="#2dc653" strokeWidth="1.5" markerEnd="url(#arr-green)" />
    <rect x="600" y="275" width="200" height="50" rx="6" fill="#1a3a2a" stroke="#2dc653" strokeWidth="1.5" />
    <text x="700" y="293" textAnchor="middle" fill="#2dc653" fontSize="9" fontFamily="Arial" fontWeight="bold">AUTO-TRIGGER 3</text>
    <text x="700" y="307" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial">Google Calendar Event</text>
    <text x="700" y="319" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial">Next biz day 10am Central</text>

    {/* All merge down */}
    <line x1="200" y1="325" x2="200" y2="358" stroke="#f4a300" strokeWidth="1.5" />
    <line x1="450" y1="325" x2="450" y2="358" stroke="#f4a300" strokeWidth="1.5" />
    <line x1="700" y1="325" x2="700" y2="358" stroke="#f4a300" strokeWidth="1.5" />
    <line x1="200" y1="358" x2="700" y2="358" stroke="#f4a300" strokeWidth="1.5" />
    <line x1="450" y1="358" x2="450" y2="375" stroke="#f4a300" strokeWidth="2" markerEnd="url(#arr)" />

    {/* SELLER CALL */}
    <rect x="300" y="375" width="300" height="55" rx="8" fill="#7b2d8b" stroke="#b44ec8" strokeWidth="2" />
    <text x="450" y="397" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Arial" fontWeight="bold">SELLER CALL (5-STEP PROCESS)</text>
    <text x="450" y="411" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Arial">Intro → Fact-Find → Pitch → Offer → Close</text>
    <text x="450" y="424" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Arial">30% you talk · 70% seller talks</text>

    {/* Decision diamond */}
    <line x1="450" y1="430" x2="450" y2="450" stroke="#f4a300" strokeWidth="2" markerEnd="url(#arr)" />
    <polygon points="450,450 500,475 450,500 400,475" fill="#0f3460" stroke="#f4a300" strokeWidth="2" />
    <text x="450" y="472" textAnchor="middle" fill="#f4a300" fontSize="10" fontFamily="Arial" fontWeight="bold">QUALIFY?</text>
    <text x="450" y="485" textAnchor="middle" fill="#f4a300" fontSize="9" fontFamily="Arial">Meets criteria?</text>

    {/* NO path */}
    <line x1="400" y1="475" x2="300" y2="475" stroke="#e63946" strokeWidth="1.5" markerEnd="url(#arr-red)" />
    <rect x="180" y="455" width="120" height="40" rx="6" fill="#3a1a1a" stroke="#e63946" strokeWidth="1.5" />
    <text x="240" y="471" textAnchor="middle" fill="#e63946" fontSize="10" fontFamily="Arial" fontWeight="bold">NURTURE</text>
    <text x="240" y="485" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial">15-touch sequence</text>
    <text x="322" y="469" fill="#e63946" fontSize="9" fontFamily="Arial">NO</text>

    {/* YES path */}
    <line x1="450" y1="500" x2="450" y2="518" stroke="#2dc653" strokeWidth="2" markerEnd="url(#arr-green)" />
    <text x="460" y="512" fill="#2dc653" fontSize="9" fontFamily="Arial">YES</text>

    {/* RUN NUMBERS */}
    <rect x="310" y="518" width="280" height="52" rx="8" fill="#0d5c0d" stroke="#2dc653" strokeWidth="2" />
    <text x="450" y="538" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Arial" fontWeight="bold">RUN NUMBERS — MAO FORMULA</text>
    <text x="450" y="552" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Arial">MAO = (ARV × 0.70) − Repairs</text>
    <text x="450" y="565" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Arial">WMAO = MAO − Assignment Fee</text>

    <line x1="450" y1="570" x2="450" y2="590" stroke="#f4a300" strokeWidth="2" markerEnd="url(#arr)" />
    <text x="450" y="603" textAnchor="middle" fill="#f4a300" fontSize="10" fontFamily="Arial" fontWeight="bold">→ CONTINUE TO OFFER &amp; CONTRACT BLUEPRINT</text>
  </svg>
);

const OfferContractBlueprint = () => (
  <svg viewBox="0 0 900 580" style={{ width: "100%", background: DARK, borderRadius: "12px", padding: "8px", boxSizing: "border-box" }}>
    <defs>
      <marker id="arr2" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#f4a300" />
      </marker>
      <marker id="arr2g" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#2dc653" />
      </marker>
      <marker id="arr2r" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#e63946" />
      </marker>
    </defs>
    <text x="450" y="28" textAnchor="middle" fill="#f4a300" fontSize="13" fontWeight="bold" fontFamily="Arial">OFFER PRESENTATION · CONTRACT · ASSIGNMENT BLUEPRINT — HOME-LINK REALTY GROUP LLC</text>
    <line x1="60" y1="36" x2="840" y2="36" stroke="#f4a300" strokeWidth="0.5" strokeDasharray="4,4" />

    {/* PRESENT OFFER */}
    <rect x="310" y="55" width="280" height="60" rx="8" fill="#7b2d8b" stroke="#b44ec8" strokeWidth="2" />
    <text x="450" y="78" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Arial" fontWeight="bold">PRESENT OFFER (WMAO)</text>
    <text x="450" y="93" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10" fontFamily="Arial">4-step method: Rapport → Questions</text>
    <text x="450" y="107" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10" fontFamily="Arial">→ Value Build → State Number · Then SILENCE</text>

    <line x1="450" y1="115" x2="450" y2="138" stroke="#f4a300" strokeWidth="2" markerEnd="url(#arr2)" />

    {/* OBJECTION DIAMOND */}
    <polygon points="450,138 520,168 450,198 380,168" fill="#0f3460" stroke="#f4a300" strokeWidth="2" />
    <text x="450" y="164" textAnchor="middle" fill="#f4a300" fontSize="10" fontFamily="Arial" fontWeight="bold">OBJECTION?</text>
    <text x="450" y="178" textAnchor="middle" fill="#f4a300" fontSize="9" fontFamily="Arial">Seller pushback</text>

    {/* YES objection */}
    <line x1="380" y1="168" x2="270" y2="168" stroke="#e63946" strokeWidth="1.5" markerEnd="url(#arr2r)" />
    <rect x="120" y="148" width="150" height="60" rx="6" fill="#3a1a1a" stroke="#e63946" strokeWidth="1.5" />
    <text x="195" y="168" textAnchor="middle" fill="#e63946" fontSize="10" fontFamily="Arial" fontWeight="bold">OBJECTION SCRIPTS</text>
    <text x="195" y="182" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial">Walk through MAO math</text>
    <text x="195" y="195" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial">7 objection handlers</text>
    <text x="280" y="163" fill="#e63946" fontSize="9" fontFamily="Arial">YES</text>
    {/* Loop back */}
    <line x1="120" y1="168" x2="80" y2="168" stroke="#e63946" strokeWidth="1" />
    <line x1="80" y1="168" x2="80" y2="90" stroke="#e63946" strokeWidth="1" />
    <line x1="80" y1="90" x2="310" y2="90" stroke="#e63946" strokeWidth="1" markerEnd="url(#arr2r)" />
    <text x="56" y="135" fill="#e63946" fontSize="8" fontFamily="Arial">RETRY</text>

    {/* NO objection - accepted */}
    <line x1="450" y1="198" x2="450" y2="222" stroke="#2dc653" strokeWidth="2" markerEnd="url(#arr2g)" />
    <text x="460" y="213" fill="#2dc653" fontSize="9" fontFamily="Arial">ACCEPTED</text>

    {/* CONTRACT */}
    <rect x="300" y="222" width="300" height="65" rx="8" fill="#0d5c0d" stroke="#2dc653" strokeWidth="2" />
    <text x="450" y="244" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Arial" fontWeight="bold">PURCHASE CONTRACT</text>
    <text x="450" y="259" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Arial">DocuSign/PandaDoc · "And/or Assigns"</text>
    <text x="450" y="273" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Arial">$100 EMD to title · AS-IS clause</text>
    <text x="450" y="287" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Arial">10–14 day inspection period begins</text>

    <line x1="450" y1="287" x2="450" y2="308" stroke="#f4a300" strokeWidth="2" markerEnd="url(#arr2)" />

    {/* PARALLEL: Title company + Buyer blast */}
    <line x1="450" y1="308" x2="200" y2="308" stroke="#f4a300" strokeWidth="1.5" />
    <line x1="450" y1="308" x2="700" y2="308" stroke="#f4a300" strokeWidth="1.5" />
    <line x1="200" y1="308" x2="200" y2="328" stroke="#f4a300" strokeWidth="1.5" markerEnd="url(#arr2)" />
    <line x1="700" y1="308" x2="700" y2="328" stroke="#f4a300" strokeWidth="1.5" markerEnd="url(#arr2)" />

    {/* Title company box */}
    <rect x="100" y="328" width="200" height="55" rx="6" fill="#0d4a5c" stroke="#4a90d9" strokeWidth="1.5" />
    <text x="200" y="349" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">SEND TO TITLE COMPANY</text>
    <text x="200" y="363" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial">Title search · Lien check</text>
    <text x="200" y="376" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial">Remote closing setup</text>

    {/* Buyer blast box */}
    <rect x="600" y="328" width="200" height="55" rx="6" fill="#5c3d0d" stroke="#f4a300" strokeWidth="1.5" />
    <text x="700" y="349" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">AUTO BUYER BLAST</text>
    <text x="700" y="363" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial">SMS + Email all active buyers</text>
    <text x="700" y="376" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial">Facebook + Craigslist post</text>

    {/* Merge down */}
    <line x1="200" y1="383" x2="200" y2="408" stroke="#f4a300" strokeWidth="1.5" />
    <line x1="700" y1="383" x2="700" y2="408" stroke="#f4a300" strokeWidth="1.5" />
    <line x1="200" y1="408" x2="700" y2="408" stroke="#f4a300" strokeWidth="1.5" />
    <line x1="450" y1="408" x2="450" y2="425" stroke="#f4a300" strokeWidth="2" markerEnd="url(#arr2)" />

    {/* BUYER FOUND */}
    <rect x="300" y="425" width="300" height="55" rx="8" fill="#0f3460" stroke="#4a90d9" strokeWidth="2" />
    <text x="450" y="447" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Arial" fontWeight="bold">BUYER FOUND</text>
    <text x="450" y="462" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Arial">Execute Assignment Contract</text>
    <text x="450" y="476" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Arial">Collect assignment fee at closing via title co.</text>

    <line x1="450" y1="480" x2="450" y2="500" stroke="#f4a300" strokeWidth="2" markerEnd="url(#arr2)" />

    {/* PAYDAY */}
    <rect x="320" y="500" width="260" height="55" rx="8" fill="#0d5c0d" stroke="#2dc653" strokeWidth="2.5" />
    <text x="450" y="522" textAnchor="middle" fill="#2dc653" fontSize="14" fontFamily="Arial" fontWeight="bold">💰 PAYDAY</text>
    <text x="450" y="538" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Arial">Title wires assignment fee to your account</text>
    <text x="450" y="552" textAnchor="middle" fill="#2dc653" fontSize="10" fontFamily="Arial" fontWeight="bold">$5,000 – $25,000 per deal</text>
  </svg>
);

const AutomationBlueprint = () => (
  <svg viewBox="0 0 900 700" style={{ width: "100%", background: DARK, borderRadius: "12px", padding: "8px", boxSizing: "border-box" }}>
    <defs>
      <marker id="arr3" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#f4a300" />
      </marker>
    </defs>
    <text x="450" y="28" textAnchor="middle" fill="#f4a300" fontSize="13" fontWeight="bold" fontFamily="Arial">FULL AUTOMATION SYSTEM BLUEPRINT — 19 ACTIVE AUTOMATIONS — HOME-LINK REALTY GROUP LLC</text>
    <line x1="60" y1="36" x2="840" y2="36" stroke="#f4a300" strokeWidth="0.5" strokeDasharray="4,4" />

    {/* TRIGGER TYPES LEGEND */}
    <rect x="60" y="50" width="120" height="22" rx="4" fill="#0f3460" stroke="#4a90d9" strokeWidth="1" />
    <text x="120" y="65" textAnchor="middle" fill="#4a90d9" fontSize="9" fontFamily="Arial" fontWeight="bold">ENTITY TRIGGER</text>
    <rect x="200" y="50" width="120" height="22" rx="4" fill="#5c3d0d" stroke="#f4a300" strokeWidth="1" />
    <text x="260" y="65" textAnchor="middle" fill="#f4a300" fontSize="9" fontFamily="Arial" fontWeight="bold">SCHEDULED</text>
    <rect x="340" y="50" width="120" height="22" rx="4" fill="#0d5c0d" stroke="#2dc653" strokeWidth="1" />
    <text x="400" y="65" textAnchor="middle" fill="#2dc653" fontSize="9" fontFamily="Arial" fontWeight="bold">INSTANT RESPONSE</text>

    {/* COLUMN LABELS */}
    <text x="150" y="102" textAnchor="middle" fill="#9aa3b5" fontSize="10" fontFamily="Arial" fontWeight="bold">LEAD GENERATION</text>
    <text x="450" y="102" textAnchor="middle" fill="#9aa3b5" fontSize="10" fontFamily="Arial" fontWeight="bold">LEAD NURTURE &amp; FOLLOW-UP</text>
    <text x="740" y="102" textAnchor="middle" fill="#9aa3b5" fontSize="10" fontFamily="Arial" fontWeight="bold">REPORTING &amp; OPERATIONS</text>
    <line x1="60" y1="107" x2="280" y2="107" stroke="#9aa3b5" strokeWidth="0.5" />
    <line x1="310" y1="107" x2="600" y2="107" stroke="#9aa3b5" strokeWidth="0.5" />
    <line x1="620" y1="107" x2="840" y2="107" stroke="#9aa3b5" strokeWidth="0.5" />

    {/* --- LEAD GEN COLUMN --- */}
    {[
      { y: 120, label: "SPEED TO LEAD", sub: "Every 10 min · Web leads", color: "#e63946", stroke: "#ff6b6b" },
      { y: 185, label: "WEEKLY LINKEDIN POST", sub: "Every Monday 9am", color: "#0f3460", stroke: "#4a90d9" },
      { y: 250, label: "CRAIGSLIST REMINDER", sub: "Mon &amp; Thu 8am", color: "#5c3d0d", stroke: "#f4a300" },
      { y: 315, label: "BUYER LIST GROWTH", sub: "Every Wednesday 9am", color: "#0d4a5c", stroke: "#4a90d9" },
      { y: 380, label: "REFERRAL OUTREACH", sub: "Every Friday 9am", color: "#3a1a2a", stroke: "#b44ec8" },
      { y: 445, label: "MLS DEAL HUNT", sub: "Every Tuesday 8am", color: "#0d5c0d", stroke: "#2dc653" },
    ].map((a, i) => (
      <g key={i}>
        <rect x="60" y={a.y} width="180" height="48" rx="6" fill={a.color} stroke={a.stroke} strokeWidth="1.5" />
        <text x="150" y={a.y + 20} textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">{a.label}</text>
        <text x="150" y={a.y + 34} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9" fontFamily="Arial">{a.sub}</text>
        {i < 5 && <line x1="150" y1={a.y + 48} x2="150" y2={a.y + 65} stroke={a.stroke} strokeWidth="1" strokeDasharray="3,3" />}
      </g>
    ))}

    {/* --- NURTURE COLUMN --- */}
    {[
      { y: 120, label: "NEW LEAD → CAL EVENT", sub: "Entity trigger · Instant", color: "#0f3460", stroke: "#4a90d9" },
      { y: 185, label: "INSTANT SELLER EMAIL", sub: "Entity trigger · Has email", color: "#0d5c0d", stroke: "#2dc653" },
      { y: 250, label: "DAILY NURTURE SEQUENCE", sub: "9am daily · 5-touch auto-email", color: "#5c3d0d", stroke: "#f4a300" },
      { y: 315, label: "OFFER FOLLOW-UP EMAILS", sub: "3pm daily · Offer Made leads", color: "#3a1a1a", stroke: "#e63946" },
      { y: 380, label: "STALE LEAD ALERT", sub: "Tue & Thu 10am", color: "#3a1a2a", stroke: "#b44ec8" },
      { y: 445, label: "LEAD STATUS → NEXT ACTION", sub: "Entity trigger · Status change", color: "#0d4a5c", stroke: "#4a90d9" },
    ].map((a, i) => (
      <g key={i}>
        <rect x="310" y={a.y} width="280" height="48" rx="6" fill={a.color} stroke={a.stroke} strokeWidth="1.5" />
        <text x="450" y={a.y + 20} textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">{a.label}</text>
        <text x="450" y={a.y + 34} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9" fontFamily="Arial">{a.sub}</text>
        {i < 5 && <line x1="450" y1={a.y + 48} x2="450" y2={a.y + 65} stroke={a.stroke} strokeWidth="1" strokeDasharray="3,3" />}
      </g>
    ))}

    {/* --- OPERATIONS COLUMN --- */}
    {[
      { y: 120, label: "DAILY MORNING BRIEFING", sub: "8am daily · Calls due today", color: "#0f3460", stroke: "#4a90d9" },
      { y: 185, label: "DAILY KPI RECAP", sub: "7pm daily · End of day report", color: "#5c3d0d", stroke: "#f4a300" },
      { y: 250, label: "WEEKLY PIPELINE REVIEW", sub: "Every Monday 9am", color: "#3a1a2a", stroke: "#b44ec8" },
      { y: 315, label: "NEW DEAL → BUYER BLAST", sub: "Entity trigger · Deal created", color: "#0d5c0d", stroke: "#2dc653" },
      { y: 380, label: "DEAL CLOSED → CELEBRATE", sub: "Entity trigger · Status=Closed", color: "#0d5c0d", stroke: "#2dc653" },
      { y: 445, label: "MONTHLY REVENUE REPORT", sub: "1st of month 8am", color: "#3a1a1a", stroke: "#e63946" },
    ].map((a, i) => (
      <g key={i}>
        <rect x="640" y={a.y} width="200" height="48" rx="6" fill={a.color} stroke={a.stroke} strokeWidth="1.5" />
        <text x="740" y={a.y + 20} textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" fontWeight="bold">{a.label}</text>
        <text x="740" y={a.y + 34} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9" fontFamily="Arial">{a.sub}</text>
        {i < 5 && <line x1="740" y1={a.y + 48} x2="740" y2={a.y + 65} stroke={a.stroke} strokeWidth="1" strokeDasharray="3,3" />}
      </g>
    ))}

    {/* Monthly lead source */}
    <rect x="60" y="510" width="820" height="50" rx="8" fill="#1a1a2e" stroke="#f4a300" strokeWidth="1.5" />
    <text x="450" y="530" textAnchor="middle" fill="#f4a300" fontSize="10" fontFamily="Arial" fontWeight="bold">MONTHLY LEAD SOURCE PERFORMANCE REPORT — 1st of month 8am — CPL · CPD · ROI by channel · Top source ranked · Action items</text>
    <text x="450" y="548" textAnchor="middle" fill="#9aa3b5" fontSize="9" fontFamily="Arial">Tracks: Cost Per Lead · Cost Per Deal · Lead-to-Appt · Appt-to-Offer · Offer-to-Contract · Contract-to-Close ratios per 7-Figure REI Playbook</text>

    <text x="450" y="610" textAnchor="middle" fill="#6b7a99" fontSize="9" fontFamily="Arial">All 19 automations run on the Base44 platform · Credits consumed per run · Automations are fault-tolerant and self-monitoring</text>
    <text x="450" y="625" textAnchor="middle" fill="#6b7a99" fontSize="9" fontFamily="Arial">Home-Link Realty Group LLC · Jacob Levy · (855) 810-1786 · CONFIDENTIAL</text>
  </svg>
);

const NurtureBlueprint = () => (
  <svg viewBox="0 0 900 420" style={{ width: "100%", background: DARK, borderRadius: "12px", padding: "8px", boxSizing: "border-box" }}>
    <defs>
      <marker id="arr4" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#f4a300" />
      </marker>
    </defs>
    <text x="450" y="26" textAnchor="middle" fill="#f4a300" fontSize="13" fontWeight="bold" fontFamily="Arial">15-TOUCH LEAD NURTURE BLUEPRINT — HOME-LINK REALTY GROUP LLC</text>
    <line x1="60" y1="34" x2="840" y2="34" stroke="#f4a300" strokeWidth="0.5" strokeDasharray="4,4" />

    {/* Timeline line */}
    <line x1="80" y1="200" x2="840" y2="200" stroke="#f4a300" strokeWidth="2" />

    {/* Touch points */}
    {[
      { x: 95, day: "Day 1", method: "Call+Text", color: "#e63946", top: true, label: "Intro + Voicemail" },
      { x: 175, day: "Day 2", method: "Email", color: "#0f3460", top: false, label: "Confirmation email" },
      { x: 255, day: "Day 3", method: "Call", color: "#e63946", top: true, label: "Follow-up call" },
      { x: 335, day: "Day 7", method: "Text", color: "#7b2d8b", top: false, label: "Property still avail?" },
      { x: 415, day: "Day 10", method: "Email", color: "#0f3460", top: true, label: "Personal reference" },
      { x: 495, day: "Day 14", method: "Call", color: "#e63946", top: false, label: "Case study email" },
      { x: 575, day: "Day 21", method: "Text", color: "#7b2d8b", top: true, label: "Break-up email" },
      { x: 655, day: "Day 30", method: "Call", color: "#e63946", top: false, label: "Monthly forever" },
      { x: 735, day: "Day 60+", method: "Auto", color: "#0d7377", top: true, label: "Ongoing monthly" },
      { x: 815, day: "∞", method: "CRM", color: "#2dc653", top: false, label: "Until Yes/No" },
    ].map((t, i) => (
      <g key={i}>
        <circle cx={t.x} cy="200" r="8" fill={t.color} stroke="#fff" strokeWidth="1.5" />
        {t.top ? (
          <>
            <line x1={t.x} y1="192" x2={t.x} y2="130" stroke={t.color} strokeWidth="1" strokeDasharray="3,2" />
            <rect x={t.x - 46} y="90" width="92" height="42" rx="4" fill={t.color + "30"} stroke={t.color} strokeWidth="1" />
            <text x={t.x} y="108" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="Arial" fontWeight="bold">{t.day}</text>
            <text x={t.x} y="120" textAnchor="middle" fill={t.color} fontSize="8" fontFamily="Arial">{t.method}</text>
            <text x={t.x} y="130" textAnchor="middle" fill="#ccc" fontSize="8" fontFamily="Arial">{t.label}</text>
          </>
        ) : (
          <>
            <line x1={t.x} y1="208" x2={t.x} y2="270" stroke={t.color} strokeWidth="1" strokeDasharray="3,2" />
            <rect x={t.x - 46} y="268" width="92" height="42" rx="4" fill={t.color + "30"} stroke={t.color} strokeWidth="1" />
            <text x={t.x} y="285" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="Arial" fontWeight="bold">{t.day}</text>
            <text x={t.x} y="297" textAnchor="middle" fill={t.color} fontSize="8" fontFamily="Arial">{t.method}</text>
            <text x={t.x} y="308" textAnchor="middle" fill="#ccc" fontSize="8" fontFamily="Arial">{t.label}</text>
          </>
        )}
      </g>
    ))}

    <text x="450" y="370" textAnchor="middle" fill="#9aa3b5" fontSize="10" fontFamily="Arial">80% of deals close between touch 3–7. A deal closed after 400 touches. Every touch is automated in the CRM. Never lose a lead.</text>
    <text x="450" y="388" textAnchor="middle" fill="#6b7a99" fontSize="9" fontFamily="Arial">Home-Link Realty Group LLC · Confidential · April 2026</text>
  </svg>
);

const WeeklyScheduleBlueprint = () => (
  <svg viewBox="0 0 900 460" style={{ width: "100%", background: DARK, borderRadius: "12px", padding: "8px", boxSizing: "border-box" }}>
    <text x="450" y="26" textAnchor="middle" fill="#f4a300" fontSize="13" fontWeight="bold" fontFamily="Arial">WEEKLY AUTOMATION &amp; ACTIVITY SCHEDULE BLUEPRINT — HOME-LINK REALTY GROUP LLC</text>
    <line x1="60" y1="34" x2="840" y2="34" stroke="#f4a300" strokeWidth="0.5" strokeDasharray="4,4" />

    {/* Day columns */}
    {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"].map((day, i) => {
      const x = 80 + i * 156;

      return (
        <g key={day}>
          <rect x={x} y="50" width="140" height="30" rx="4" fill={i % 2 === 0 ? "#0f3460" : "#16213e"} stroke="#4a90d9" strokeWidth="1" />
          <text x={x + 70} y="70" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Arial" fontWeight="bold">{day}</text>
        </g>
      );
    })}

    {/* Time rows */}
    {[
      { time: "8:00 AM", items: ["Craigslist Post\nReminder 🟡", "MLS Deal Hunt\nPlan 🟢", "—", "Craigslist Post\nReminder 🟡", "Referral Partner\nOutreach Plan 🟣"] },
      { time: "9:00 AM", items: ["LinkedIn Post\nAUTO-FIRES 🔵", "Stale Lead\nAlert 🟣", "Buyer List\nGrowth Check 🔵", "—", "—"] },
      { time: "9:00 AM", items: ["Morning Brief\nAUTO 🟡", "Morning Brief\nAUTO 🟡", "Morning Brief\nAUTO 🟡", "Morning Brief\nAUTO 🟡", "Morning Brief\nAUTO 🟡"] },
      { time: "ALL DAY", items: ["60+ Calls\n3-6hr Talk Time", "60+ Calls\n3-6hr Talk Time", "60+ Calls\n3-6hr Talk Time", "60+ Calls\n3-6hr Talk Time", "60+ Calls\n3-6hr Talk Time"] },
      { time: "3:00 PM", items: ["Offer Emails\nAUTO 🔴", "Offer Emails\nAUTO 🔴", "Offer Emails\nAUTO 🔴", "Offer Emails\nAUTO 🔴 +\nStale Alert 🟣", "Offer Emails\nAUTO 🔴"] },
      { time: "7:00 PM", items: ["KPI Recap\nAUTO 🟡", "KPI Recap\nAUTO 🟡", "KPI Recap\nAUTO 🟡", "KPI Recap\nAUTO 🟡", "KPI Recap\nAUTO 🟡 +\nWeekly Review 🔵"] },
    ].map((row, ri) => {
      const baseY = 100 + ri * 56;
      return (
        <g key={ri}>
          <text x="65" y={baseY + 20} textAnchor="end" fill="#f4a300" fontSize="9" fontFamily="Arial" fontWeight="bold">{row.time}</text>
          <line x1="68" y1={baseY + 8} x2="840" y2={baseY + 8} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          {row.items.map((item, ii) => {
            const x = 80 + ii * 156;
            const isEmpty = item === "—";
            return (
              <g key={ii}>
                <rect x={x + 2} y={baseY + 10} width="136" height="40" rx="4"
                  fill={isEmpty ? "transparent" : "rgba(255,255,255,0.04)"}
                  stroke={isEmpty ? "transparent" : "rgba(255,255,255,0.1)"} strokeWidth="1" />
                {!isEmpty && item.split("\n").map((line, li) => (
                  <text key={li} x={x + 70} y={baseY + 25 + li * 14} textAnchor="middle" fill={li === 0 ? "#fff" : "#9aa3b5"} fontSize="8" fontFamily="Arial">{line}</text>
                ))}
              </g>
            );
          })}
        </g>
      );
    })}

    {/* Every 10min row */}
    <rect x="80" y="440" width="760" height="18" rx="4" fill="#3a1a1a" stroke="#e63946" strokeWidth="1" />
    <text x="450" y="453" textAnchor="middle" fill="#e63946" fontSize="9" fontFamily="Arial" fontWeight="bold">⚡ EVERY 10 MINUTES ALL DAY — Speed-to-Lead SMS Alert monitors for new web leads · Instant notification to Jacob · 400% higher conversion rate</text>
  </svg>
);

/* ─── MAIN EXPORT ─── */
export default function Playbook() {
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
  }, []);

  const [printing, setPrinting] = useState(false);


  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#e8e8e8", minHeight: "100vh" }}>
      <style>{PRINT_CSS}</style>

      {/* TOOLBAR */}
      <div className="no-print" style={{ background: DARK, padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 9999, gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={LOGO} alt="Home-Link" style={{ height: "36px" }} />
          <div>
            <div style={{ color: "#fff", fontWeight: "900", fontSize: "15px" }}>Business Operations Manual</div>
            <div style={{ color: "#9aa3b5", fontSize: "12px" }}>Volumed Edition · April 2026 · Confidential</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a href="/BusinessSystem" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "10px 20px", borderRadius: "6px", fontWeight: "700", textDecoration: "none", fontSize: "13px" }}>← Back to System</a>
          <button onClick={handlePrint} style={{ background: RED, color: "#fff", border: "none", padding: "10px 28px", borderRadius: "6px", fontWeight: "900", fontSize: "14px", cursor: "pointer", letterSpacing: "0.5px" }}>
            🖨️ Print / Save as PDF
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          COVER PAGE — MAIN
      ════════════════════════════════════════════ */}
      <CoverPage
        img={COVER_AERIAL}
        tag="Confidential · Virtual Wholesaling · Complete Edition"
        title={"Home-Link Realty Group LLC\nBusiness Operations Manual"}
        subtitle="Lead Generation System · Automation Blueprints · Deal Workflow · Employee Training SOPs · Scaling Roadmap — April 2026"
      />

      {/* ════════════════════════════════════════════
          PAGE: TABLE OF CONTENTS
      ════════════════════════════════════════════ */}
      <DocPage pageNum={1}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: RED, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "8px" }}>Home-Link Realty Group LLC</div>
          <h1 style={{ fontSize: "36px", fontWeight: "900", color: DARK, margin: "0 0 8px" }}>Table of Contents</h1>
          <div style={{ width: "80px", height: "4px", background: RED, borderRadius: "2px", margin: "0 auto" }} />
        </div>

        {[
          { ch: "1", title: "Company Overview & Business Model", pages: "3–5", desc: "Who we are, what we do, revenue model, legal structure, core formulas" },
          { ch: "2", title: "Lead Generation System — All Channels", pages: "6–10", desc: "67 motivating seller sources, buy box criteria, inbound vs outbound strategy, SEO, Craigslist, Facebook, MLS" },
          { ch: "3", title: "Inbound Lead Capture & Automation Blueprints", pages: "11–15", desc: "Website funnel, form flow, trigger system, speed-to-lead protocol, full automation blueprint diagram" },
          { ch: "4", title: "Seller Call Scripts & Objection Handling", pages: "16–20", desc: "Cold call opening, inbound response, 5-step sales call, 15-question fact-find sheet, 7-objection playbook" },
          { ch: "5", title: "12-Step Deal Workflow — Lead to Payday", pages: "21–25", desc: "Full virtual deal process blueprint, MAO formula, offer presentation, contract execution, buyer assignment, closing" },
          { ch: "6", title: "15-Touch Follow-Up System", pages: "26–28", desc: "Full nurture sequence blueprint, touch schedule, email scripts, automated vs manual touches" },
          { ch: "7", title: "19 Automation System — Full Blueprints", pages: "29–34", desc: "Every automation mapped with diagrams — triggers, actions, schedules, what fires, what it does, why it matters" },
          { ch: "8", title: "Daily KPIs & Performance Tracking", pages: "35–37", desc: "Daily non-negotiables, weekly review framework, CPL/CPD/ROI metrics, monthly funnel analysis" },
          { ch: "9", title: "Buyer Database & Deal Disposition", pages: "38–40", desc: "Building buyers list, qualifying buyers, deal packaging, buyer blast system, assignment process" },
          { ch: "10", title: "Employee Training SOPs", pages: "41–46", desc: "Cold Caller SOP, Acquisition Manager SOP, Transaction Coordinator SOP, onboarding checklist" },
          { ch: "11", title: "Scaling Roadmap", pages: "47–50", desc: "4-phase growth plan, hiring sequence, virtual team structure, revenue targets by phase" },
          { ch: "12", title: "Tools Stack & Technology Reference", pages: "51–52", desc: "Every tool, what it does, cost, login credentials placeholder, setup instructions" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 0", borderBottom: "1px solid #f0f0f0" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: RED, color: "#fff", fontWeight: "900", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.ch}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "800", fontSize: "14px", color: DARK }}>{item.title}</div>
              <div style={{ fontSize: "12px", color: TEXT, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
            <div style={{ fontWeight: "800", fontSize: "13px", color: RED, minWidth: "50px", textAlign: "right" }}>{item.pages}</div>
          </div>
        ))}
      </DocPage>

      {/* ════════════════════════════════════════════
          CHAPTER 1 COVER
      ════════════════════════════════════════════ */}
      <ChapterCover img={COVER_AERIAL} number={1} title="Company Overview & Business Model" desc="Who we are, how we make money, our legal structure, and the core formulas that drive every deal." />

      <DocPage pageNum={3}>
        <SectionHeader number="1.1" title="Company Identity" color={RED} />
        <InfoBox label="Company Name" value="Home-Link Realty Group LLC" />
        <InfoBox label="Business Model" value="Virtual Real Estate Wholesaling — assignment of contracts for assignment fees" />
        <InfoBox label="Owner" value="Jacob Levy" />
        <InfoBox label="Phone" value="(855) 810-1786 (Twilio toll-free — calls & automated SMS)" />
        <InfoBox label="Email" value="jacob.levy@homelinkrealtygroup.com" />
        <InfoBox label="Website" value="https://home-link-realty-group.base44.app/Home" />
        <InfoBox label="CRM / Operations" value="https://home-link-realty-group.base44.app/CRM" />
        <InfoBox label="Revenue Target" value="2–3 deals/month · $5,000–$25,000 assignment fee per deal · $20,000–$75,000/month" />
        <InfoBox label="Operating Model" value="100% Virtual — all calls, contracts, closings, and buyer communication done remotely" />

        <div style={{ height: "32px" }} />
        <SectionHeader number="1.2" title="What We Do — The Business Model" color={BLUE} />
        <Callout icon="💡" text="We are NOT real estate agents. We are professional real estate investors. We find motivated sellers, put properties under contract at a discount, then assign that contract to a cash buyer for a fee — without ever taking title to the property." color={BLUE} />

        <div style={{ background: GRAY, borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
          <div style={{ fontWeight: "900", color: DARK, marginBottom: "16px", fontSize: "14px" }}>THE 4-PARTY TRANSACTION</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr", gap: "8px", alignItems: "center" }}>
            {[
              { icon: "🏠", label: "MOTIVATED SELLER", sub: "Needs to sell fast", color: RED },
              { arrow: true },
              { icon: "📋", label: "HOME-LINK (YOU)", sub: "Put under contract", color: BLUE },
              { arrow: true },
              { icon: "💼", label: "CASH BUYER", sub: "Fix-and-flip investor", color: TEAL },
              { arrow: true },
              { icon: "💰", label: "TITLE COMPANY", sub: "Handles closing", color: GREEN },
            ].map((item, i) =>
              item.arrow ? (
                <div key={i} style={{ textAlign: "center", fontSize: "20px", color: GOLD }}>→</div>
              ) : (
                <div key={i} style={{ textAlign: "center", background: "#fff", borderRadius: "8px", padding: "16px 8px", border: `2px solid ${item.color}` }}>
                  <div style={{ fontSize: "24px", marginBottom: "6px" }}>{item.icon}</div>
                  <div style={{ fontWeight: "800", fontSize: "11px", color: DARK }}>{item.label}</div>
                  <div style={{ fontSize: "10px", color: TEXT }}>{item.sub}</div>
                </div>
              )
            )}
          </div>
        </div>

        <SectionHeader number="1.3" title="Core Formulas" color={GREEN} />
        <div style={{ background: DARK, borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ color: GOLD, fontWeight: "800", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>MAO — MAXIMUM ALLOWABLE OFFER</div>
          <div style={{ color: "#fff", fontSize: "20px", fontWeight: "900", fontFamily: "monospace", marginBottom: "8px" }}>MAO = (ARV × 0.70) − Estimated Repairs</div>
          <div style={{ color: "#9aa3b5", fontSize: "13px", marginBottom: "16px" }}>ARV = After Repair Value (what the house is worth fully fixed at retail)</div>
          <div style={{ color: GOLD, fontWeight: "800", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px", marginTop: "20px" }}>WMAO — YOUR WHOLESALE OFFER TO SELLER</div>
          <div style={{ color: "#fff", fontSize: "20px", fontWeight: "900", fontFamily: "monospace", marginBottom: "8px" }}>WMAO = MAO − Assignment Fee</div>
          <div style={{ color: "#9aa3b5", fontSize: "13px" }}>Assignment Fee = Your profit · Target: $5K min, $10K–$25K average</div>
        </div>

        <div style={{ background: GRAY, borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontWeight: "900", color: DARK, marginBottom: "14px", fontSize: "13px" }}>LIVE EXAMPLE</div>
          {[
            ["ARV (After Repair Value)", "$200,000", DARK],
            ["× 0.70 multiplier", "$140,000", DARK],
            ["− Estimated Repairs", "−$50,000", RED],
            ["= MAO (Max for fix-and-flip buyer)", "$90,000", BLUE],
            ["− Your Assignment Fee", "−$15,000", RED],
            ["= WMAO — What you offer the seller", "$75,000 ✅", GREEN],
          ].map(([l, v, c]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee", fontSize: "13px" }}>
              <span style={{ color: TEXT }}>{l}</span>
              <span style={{ fontWeight: "800", color: c }}>{v}</span>
            </div>
          ))}
        </div>
      </DocPage>

      {/* ════════════════════════════════════════════
          CHAPTER 2 COVER
      ════════════════════════════════════════════ */}
      <ChapterCover img={COVER_RENO} number={2} title="Lead Generation System" desc="Every channel, filter, and strategy for finding motivated sellers — inbound and outbound." />

      <DocPage pageNum={6}>
        <SectionHeader number="2.1" title="Buy Box — Lead Qualification Criteria" color={RED} />
        <Callout icon="🎯" text="Only work with leads that fit your buy box. Time is your most valuable asset. Every off-criteria lead you chase costs you a deal you could have closed." color={RED} />
        {[
          ["ARV (After Repair Value)", "$350,000 or less", "Keeps inventory affordable with room for profit. Above this threshold, buyers thin out."],
          ["Equity", "30% or more", "Owner has real room to negotiate. Less equity = less flexibility = harder deal."],
          ["Ownership Duration", "10+ years", "Long-term owners more likely to have deferred maintenance AND desire to cash out."],
          ["Property Age", "15+ years", "Older properties more likely to need repairs — creates the discount we need."],
          ["Ownership Type", "Exclude LLCs & Trusts", "Target direct homeowners only. Entity-owned properties have extra legal complexity."],
          ["Occupancy", "Absentee AND owner-occupied", "Cast a wide net. Both types produce motivated sellers."],
        ].map(([l, v, n]) => (
          <div key={l} style={{ display: "grid", gridTemplateColumns: "170px 140px 1fr", gap: "12px", padding: "12px 0", borderBottom: "1px solid #f0f0f0", alignItems: "start" }}>
            <div style={{ fontWeight: "800", fontSize: "12px", color: RED, textTransform: "uppercase" }}>{l}</div>
            <div style={{ fontWeight: "700", fontSize: "13px", color: BLUE }}>{v}</div>
            <div style={{ fontSize: "12px", color: TEXT, lineHeight: 1.6 }}>{n}</div>
          </div>
        ))}

        <div style={{ height: "28px" }} />
        <SectionHeader number="2.2" title="Top Motivated Seller Categories (Priority Order)" color={BLUE} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {[
            ["🔴", "Pre-Foreclosure / NOD", "Notice of default filed — on a deadline, extremely motivated"],
            ["🔴", "Probate / Inherited Property", "Heirs don't want to manage an estate — want fast cash"],
            ["🔴", "Vacant / Abandoned", "Paying taxes on nothing — zero sentimental attachment"],
            ["🔴", "Tax Delinquent (1yr+)", "Behind on taxes, facing liens — motivated to sell fast"],
            ["🟡", "Out-of-State Landlord", "Managing remotely is painful — low attachment to property"],
            ["🟡", "Eviction Notices Filed", "Tired of problem tenants — done being a landlord"],
            ["🟡", "High Equity (50%+)", "Large equity cushion = more room to accept lower offer"],
            ["🟡", "Free & Clear Owner", "No mortgage = pure profit from any sale price"],
            ["🟡", "Divorce / Separation", "Needs fast, clean liquidation — neither party wants delay"],
            ["🟢", "Expired MLS Listings", "Tried conventional, failed — now open to alternative offers"],
            ["🟢", "FSBO", "Already skipping agents — pre-sold on the direct sale concept"],
            ["🟢", "Empty Nesters (30yr owners)", "Kids gone, house too big, deferred maintenance piling up"],
            ["🟢", "Building/Code Violations", "City pressure to repair or sell — motivated by deadline"],
            ["🟢", "Behind on Payments", "Facing financial hardship — urgent timeline"],
            ["🟢", "Bankruptcy (Chapter 7)", "Court-ordered liquidation — must sell"],
            ["🟢", "Section 8 Landlords", "Tired of gov. compliance — want out of rental business"],
          ].map(([dot, title, desc]) => (
            <div key={title} style={{ display: "flex", gap: "8px", background: GRAY, borderRadius: "6px", padding: "10px 12px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "14px", flexShrink: 0, marginTop: "1px" }}>{dot}</span>
              <div>
                <div style={{ fontWeight: "800", fontSize: "12px", color: DARK }}>{title}</div>
                <div style={{ fontSize: "11px", color: TEXT, lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </DocPage>

      {/* ════════════════════════════════════════════
          CHAPTER 3 COVER + BLUEPRINTS
      ════════════════════════════════════════════ */}
      <ChapterCover img={COVER_DESK} number={3} title="Automation System & Blueprints" desc="Every automation mapped from trigger to action — 19 systems running 24/7 on your behalf." />

      <DocPage pageNum={11}>
        <SectionHeader number="3.1" title="Lead-to-Payday Workflow Blueprint" color={RED} />
        <Callout icon="📐" text="This blueprint maps the complete path from any lead source to your assignment fee. Every box is a step. Every arrow is an automated or manual action. Blue = system actions. Gold = decision points. Green = money milestones." color={GOLD} />
        <LeadWorkflowBlueprint />
        <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", fontSize: "12px" }}>
          {[
            ["📥 LEAD SOURCES (Top)", "Five inbound channels feed into one CRM intake point: Cold Call, Website Form, Craigslist, Facebook/MLS, and Referral Network. All converge at CRM.", BLUE],
            ["⚡ 3 SIMULTANEOUS TRIGGERS", "The moment a lead hits the CRM, three automations fire at once: SMS to Jacob, auto-email to seller, and a Google Calendar event for next-day callback.", GREEN],
            ["💰 PAYDAY PATH", "Qualified leads flow through 5-step call → MAO calculation → offer → contract → buyer blast → assignment → title close → wire transfer to your account.", TEAL],
          ].map(([title, text, color]) => (
            <div key={title} style={{ background: GRAY, borderRadius: "8px", padding: "14px", borderTop: `3px solid ${color}` }}>
              <div style={{ fontWeight: "800", color: DARK, marginBottom: "6px", fontSize: "12px" }}>{title}</div>
              <div style={{ color: TEXT, lineHeight: 1.6, fontSize: "11px" }}>{text}</div>
            </div>
          ))}
        </div>
      </DocPage>

      <DocPage pageNum={12}>
        <SectionHeader number="3.2" title="Offer · Contract · Assignment Blueprint" color={BLUE} />
        <Callout icon="📐" text="This blueprint picks up where the workflow ends — from offer presentation through objection handling, contract signing, title coordination, buyer blast, assignment, and final payday. Purple = negotiation phase. Green = deal secured. Gold = closing path." color={BLUE} />
        <OfferContractBlueprint />
        <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "12px" }}>
          {[
            ["🟣 OBJECTION LOOP", "If the seller objects, you enter the objection script loop — walk through the MAO math, handle their specific concern, and re-present. The loop repeats until accepted or dead. 7 scripts cover every scenario.", RED],
            ["🟢 PARALLEL ACTIONS AT CONTRACT", "The moment a contract is signed, two things happen simultaneously: (1) Contract goes to title company for title search, and (2) Buyer blast fires automatically — every active buyer gets SMS + email within minutes.", GREEN],
            ["🔵 INSPECTION PERIOD BUFFER", "The 10–14 day inspection period is your buyer-finding window. You are NOT committed until it expires. This is your safety net for virtual wholesaling.", BLUE],
            ["💰 ASSIGNMENT FEE COLLECTION", "Your fee is collected by the title company from the buyer's proceeds and wired directly to your business account at closing. You never touch the transaction funds.", TEAL],
          ].map(([title, text, color]) => (
            <div key={title} style={{ background: GRAY, borderRadius: "8px", padding: "14px", borderTop: `3px solid ${color}` }}>
              <div style={{ fontWeight: "800", color: DARK, marginBottom: "6px", fontSize: "12px" }}>{title}</div>
              <div style={{ color: TEXT, lineHeight: 1.6, fontSize: "11px" }}>{text}</div>
            </div>
          ))}
        </div>
      </DocPage>

      <DocPage pageNum={13}>
        <SectionHeader number="3.3" title="19 Automation System — Full Blueprint" color={TEAL} />
        <Callout icon="🤖" text="This blueprint shows all 19 active automations organized by function: Lead Generation (left), Lead Nurture & Follow-Up (center), and Reporting & Operations (right). Automations run 24/7 without any manual action required." color={TEAL} />
        <AutomationBlueprint />
        <div style={{ marginTop: "20px" }}>
          <div style={{ fontWeight: "900", color: DARK, marginBottom: "16px", fontSize: "14px" }}>AUTOMATION REFERENCE GUIDE</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { name: "Speed to Lead SMS", trigger: "Every 10 minutes", action: "Scans for new web leads. Sends Jacob instant SMS with lead info. 60-sec response = 400% higher conversion.", type: "SCHEDULED" },
              { name: "New Lead → Calendar Event", trigger: "New Lead created", action: "Creates Google Calendar event for next business day 10am Central. Red event. Full call checklist inside.", type: "ENTITY" },
              { name: "Instant Seller Email", trigger: "New Lead with email", action: "Sends auto-response to seller within seconds — confirms receipt, sets expectations, builds trust.", type: "ENTITY" },
              { name: "Daily Nurture Sequence", trigger: "9am every day", action: "Scans all active leads. Fires correct email (Touch 1–5) based on touch count and due date.", type: "SCHEDULED" },
              { name: "Offer Follow-Up Emails", trigger: "3pm every day", action: "Scans 'Offer Made' leads. Sends Day 3/6/10/16 follow-up email to keep offer alive.", type: "SCHEDULED" },
              { name: "Stale Lead Alert", trigger: "Tue & Thu 10am", action: "Finds leads with no contact in 7+ days. Tells Jacob exactly which script to use per situation.", type: "SCHEDULED" },
              { name: "Weekly LinkedIn Post", trigger: "Every Monday 9am", action: "Publishes rotating seller education content to LinkedIn. Builds authority + inbound referrals.", type: "SCHEDULED" },
              { name: "Craigslist Reminder", trigger: "Mon &amp; Thu 8am", action: "Delivers ready-to-copy ad text with fresh headline variations to avoid duplication flags.", type: "SCHEDULED" },
              { name: "Buyer List Growth", trigger: "Every Wednesday 9am", action: "Checks buyer count. If <50, delivers Facebook post copy and group list to grow buyers list.", type: "SCHEDULED" },
              { name: "MLS Deal Hunt", trigger: "Every Tuesday 8am", action: "Delivers Zillow/Redfin search filters for expired, underpriced, and 'as-is' listings.", type: "SCHEDULED" },
              { name: "Referral Outreach Plan", trigger: "Every Friday 9am", action: "Rotates through attorneys, agents, credit counselors. Delivers phone/email/LinkedIn scripts.", type: "SCHEDULED" },
              { name: "Lead Status → Next Action", trigger: "Lead status change", action: "Detects status change and coaches Jacob on exact next action, script, and timing.", type: "ENTITY" },
              { name: "Morning Briefing", trigger: "8am every day", action: "Delivers all leads due for follow-up today, today's KPI targets, and motivational push.", type: "SCHEDULED" },
              { name: "Evening KPI Recap", trigger: "7pm every day", action: "Summarizes the day: calls made, offers made, leads contacted, vs. daily targets.", type: "SCHEDULED" },
              { name: "Weekly Pipeline Review", trigger: "Every Monday 9am", action: "Full pipeline health report — stage counts, stale deals, conversion rates, action items.", type: "SCHEDULED" },
              { name: "New Deal → Buyer Blast", trigger: "New Deal created", action: "Blasts all active/hot buyers via SMS + email with deal details immediately.", type: "ENTITY" },
              { name: "Deal Closed → Celebrate", trigger: "Deal status = Closed", action: "Calculates fee, updates revenue total, sends celebration message with lessons learned.", type: "ENTITY" },
              { name: "Monthly Revenue Report", trigger: "1st of month 8am", action: "Full monthly P&L, deals closed, revenue vs goal, top lead sources, next month action items.", type: "SCHEDULED" },
              { name: "Lead Source Report", trigger: "1st of month 8am", action: "CPL, CPD, ROI by channel. Lead-to-Appt, Appt-to-Offer, Offer-to-Contract, Contract-to-Close rates.", type: "SCHEDULED" },
            ].map((a, i) => (
              <div key={i} style={{ background: GRAY, borderRadius: "8px", padding: "12px", borderLeft: `4px solid ${a.type === "ENTITY" ? GREEN : a.type === "CONNECTOR" ? TEAL : BLUE}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px", gap: "8px" }}>
                  <div style={{ fontWeight: "800", fontSize: "12px", color: DARK }}>{a.name}</div>
                  <div style={{ background: a.type === "ENTITY" ? GREEN : BLUE, color: "#fff", fontSize: "8px", fontWeight: "700", padding: "2px 6px", borderRadius: "3px", textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0 }}>{a.type}</div>
                </div>
                <div style={{ fontSize: "10px", color: RED, fontWeight: "700", marginBottom: "3px" }}>⏰ {a.trigger}</div>
                <div style={{ fontSize: "11px", color: TEXT, lineHeight: 1.5 }}>{a.action}</div>
              </div>
            ))}
          </div>
        </div>
      </DocPage>

      <DocPage pageNum={14}>
        <SectionHeader number="3.4" title="15-Touch Lead Nurture Blueprint" color={PURPLE} />
        <Callout icon="🔁" text="80% of deals close between touch 3 and touch 7. Most competitors quit at touch 1 or 2. This automated sequence is your competitive moat — it runs forever until the seller says yes, no, or stops responding." color={PURPLE} />
        <NurtureBlueprint />
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
            {[
              { touch: "Touch 1", day: "Day 1", method: "Call + Text", script: "Intro call. Leave voicemail. Immediately text: 'Hi [Name], this is Jacob with Home-Link. Just left you a voicemail about [address]. Happy to chat! (855) 810-1786'" },
              { touch: "Touch 2", day: "Day 2", method: "Email", script: "Confirmation email: Thank you for your interest. Here's what happens next. We review → offer within 24 hours → you decide. Zero obligation." },
              { touch: "Touch 3", day: "Day 3", method: "Call", script: "'Hi [Name], just following up. We're still very interested in [address]. Do you have a few minutes to talk?'" },
              { touch: "Touch 4", day: "Day 7", method: "Text", script: "'Hi [Name] — still interested in [address] if you're open to it. Our offer is still available. — Jacob, Home-Link'" },
              { touch: "Touch 5", day: "Day 10", method: "Email", script: "Reference something specific from last call. Show you remember their situation. Make it personal." },
              { touch: "Touch 6", day: "Day 14", method: "Call", script: "'I want to make sure you have all the info to make the best decision. Any questions I can answer?'" },
              { touch: "Touch 7", day: "Day 21", method: "Email", script: "Break-up email: 'This is my last message. If anything changes, I'm always here.' — Highest response rate of all 5 touches." },
              { touch: "Touch 8+", day: "Monthly", method: "Rotate", script: "Monthly touch forever — rotate call/text/email. Market changes. Motivation changes. Be there when it does." },
            ].map((t, i) => (
              <div key={i} style={{ background: GRAY, borderRadius: "8px", padding: "12px", borderTop: `3px solid ${[RED, BLUE, RED, PURPLE, BLUE, RED, PURPLE, TEAL][i]}` }}>
                <div style={{ fontWeight: "800", fontSize: "12px", color: DARK, marginBottom: "2px" }}>{t.touch} — {t.day}</div>
                <div style={{ background: [RED, BLUE, RED, PURPLE, BLUE, RED, PURPLE, TEAL][i], color: "#fff", fontSize: "9px", fontWeight: "700", padding: "2px 6px", borderRadius: "3px", display: "inline-block", marginBottom: "6px" }}>{t.method}</div>
                <div style={{ fontSize: "11px", color: TEXT, lineHeight: 1.5, fontStyle: "italic" }}>{t.script}</div>
              </div>
            ))}
          </div>
        </div>
      </DocPage>

      <DocPage pageNum={15}>
        <SectionHeader number="3.5" title="Weekly Automation Schedule Blueprint" color={GOLD} />
        <Callout icon="📅" text="This blueprint shows what fires automatically vs. what requires manual action every day of the week. Items in the schedule marked AUTO fire without you doing anything. Items without AUTO require your action." color={GOLD} />
        <WeeklyScheduleBlueprint />
        <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          {[
            { emoji: "🤖", label: "Fully Automated", count: "12 automations", desc: "Run with zero human action. LinkedIn posts, nurture emails, alerts, reports, buyer blasts." },
            { emoji: "⚡", label: "Action-Required", count: "7 manual tasks", desc: "Craigslist posts, calls, Facebook outreach, MLS hunting, referral calls — require your time." },
            { emoji: "📊", label: "Monitoring Only", count: "Reports & alerts", desc: "Morning briefing, KPI recap, pipeline review — just read and act on the intelligence provided." },
          ].map(item => (
            <div key={item.label} style={{ background: GRAY, borderRadius: "10px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{item.emoji}</div>
              <div style={{ fontWeight: "900", color: DARK, marginBottom: "4px" }}>{item.label}</div>
              <div style={{ fontWeight: "700", color: RED, fontSize: "13px", marginBottom: "6px" }}>{item.count}</div>
              <div style={{ fontSize: "11px", color: TEXT, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </DocPage>

      {/* ════════════════════════════════════════════
          CHAPTER 4 — SCRIPTS
      ════════════════════════════════════════════ */}
      <ChapterCover img={COVER_CONTRACT} number={4} title="Seller Call Scripts & Objection Handling" desc="Word-for-word scripts for every call stage — cold call, inbound, fact-find, offer, close, and every objection." />

      <DocPage pageNum={16}>
        <SectionHeader number="4.1" title="5-Step Sales Call Process" color={BLUE} />
        <Callout icon="🎙️" text="30/70 Rule: You talk 30% of the time. The seller talks 70%. Your job is to ask questions, shut up, and let their own words justify accepting your offer." color={BLUE} />
        {[
          { step: "1", title: "INTRODUCTION — First 60 Seconds", color: BLUE, script: "Hi, is this [Name]? This is Jacob calling with Home-Link Realty Group. Your property over at [address] was referred to me and I wanted to reach out to see whether or not it qualifies for our cash home buying program. Do you have just a couple of minutes?", notes: "Sound warm, not robotic. Smile when you speak — it comes through the phone. Your goal in step 1 is ONLY to get permission to ask questions. Nothing else." },
          { step: "2", title: "FACT-FINDING — Listen More Than You Talk", color: PURPLE, script: "Let me ask you a few quick questions to see whether we might be a good fit for each other. How long have you owned the property? Is it currently occupied? What condition would you describe it as? Any major issues — roof, HVAC, plumbing? And what's the main reason you're considering selling at this time?", notes: "Take notes in CRM immediately. Everything they tell you becomes the raw material for your pitch and offer. Never interrupt. The silence after a question is GOLDEN — they fill it." },
          { step: "3", title: "THE PITCH — Tailored, Not Canned", color: TEAL, script: "Based on what you've shared... [adapt to their specific situation]. If they're in foreclosure: 'We specialize in exactly this situation. We can close before the auction date and protect your credit.' If inherited: 'We handle all the paperwork, pay all closing costs, and you don't lift a finger.'", notes: "Never use a canned pitch. Lead with the solution to the SPECIFIC problem they just told you about. That's the only pitch that converts." },
          { step: "4", title: "THE OFFER — Start Above Your Floor", color: GREEN, script: "Based on everything we've discussed — the condition, location, and your timeline — I'd like to present you with a cash offer of $[WMAO]. We can close in [X] days, I cover all closing costs, and you don't need to repair a single thing. Does that work for you?", notes: "Start 10–15% above your true floor. Leave room to negotiate up slightly if needed. THEN GO SILENT. Do not fill the pause." },
          { step: "5", title: "THE CLOSE — Let the Math Do the Work", color: GOLD, script: "When's the last time you had $[offer amount] in your bank account all at once? That's a wire transfer directly to you in [X] days — no repairs, no agent fees, no waiting. What do you say?", notes: "The best close is a question they can't say no to. Make the number real and tangible. Then stop talking." },
        ].map(s => (
          <div key={s.step} style={{ marginBottom: "20px", background: GRAY, borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ background: s.color, padding: "10px 16px", display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", color: "#fff", fontWeight: "900", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.step}</div>
              <div style={{ fontWeight: "900", color: "#fff", fontSize: "13px" }}>{s.title}</div>
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ background: "#fff", borderLeft: `4px solid ${s.color}`, padding: "10px 14px", borderRadius: "0 6px 6px 0", fontSize: "12px", color: TEXT, lineHeight: 1.7, fontStyle: "italic", marginBottom: "10px" }}>"{s.script}"</div>
              <div style={{ fontSize: "11px", color: TEXT, lineHeight: 1.6 }}>📌 {s.notes}</div>
            </div>
          </div>
        ))}
      </DocPage>

      <DocPage pageNum={17}>
        <SectionHeader number="4.2" title="Objection Handling Playbook — 7 Scenarios" color={RED} />
        <Callout icon="🛡️" text="An objection is NOT a rejection. It means they're engaged. Welcome every objection — it means the conversation is alive. Your job is to acknowledge, empathize, then pivot with math or logic." color={RED} />
        {[
          { obj: '"Your price is too low"', resp: 'I completely understand. Let me show you something real quick — can you grab a pen? [pause] If you listed with an agent, you\'d pay 6% commission ($X), 2-3% closing costs ($X), repairs the buyer demands ($X), and wait 60-90 days. That\'s $[total] out of pocket and months of uncertainty. Our offer of $[X] nets you $[comparison] more in 7 days. Does that change how you look at the number?', tag: "MOST COMMON" },
          { obj: '"I need to think about it"', resp: 'Absolutely, I respect that. Before we hang up, I want to make sure I\'ve answered everything for you. Is it the price that needs more thought? The timeline? Something about the process? Let\'s talk through whatever it is right now so you have everything you need to decide.', tag: "VERY COMMON" },
          { obj: '"I\'ll just list with an agent"', resp: 'That\'s always an option — agents do great work. How long are you willing to wait? The market average right now is 60-90 days just to get an offer, then another 30-45 to close. What happens to your situation if it takes 4 months? We close in 7 days. Guaranteed cash. Zero fees.', tag: "VERY COMMON" },
          { obj: '"My neighbor/friend sold for more"', resp: 'I believe it — I\'m sure they did. Was their property in the same condition as yours? Did they wait 4 months? Did they pay the agent, the closing costs, and make repairs the buyer demanded? Context changes everything. The only number that matters is what you walk away with after everything.', tag: "COMMON" },
          { obj: '"I have another offer"', resp: 'Great — you have options! What is the other offer? Is it cash or financed? What\'s their close date? Often our all-cash offer, zero contingency, close-in-7-days structure wins when you compare apples to apples. I\'d love to make sure you\'re comparing fairly.', tag: "COMMON" },
          { obj: '"I\'m not ready yet"', resp: 'That\'s completely fine. No pressure at all. Can I ask — what would need to change for you to be ready? And can I stay in touch? I work with sellers every day at all different stages, and I want to be your first call when the time is right. Can I check back in with you in 2 weeks?', tag: "COMMON" },
          { obj: '"Why is your offer so low?"', resp: 'That\'s a fair question and I want to be completely transparent with you. [Walk through the MAO math step by step.] I\'m a cash buyer taking on all the risk — the repairs, the carrying costs, the resale uncertainty. The trade-off is certainty and speed for you. The number reflects that reality — not a lack of respect for your property.', tag: "IMPORTANT" },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: "14px", border: `1px solid #eee`, borderRadius: "8px", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", background: RED + "15", padding: "10px 14px", alignItems: "center" }}>
              <div style={{ fontWeight: "800", color: RED, fontSize: "13px" }}>Objection: {item.obj}</div>
              <div style={{ background: RED, color: "#fff", fontSize: "9px", fontWeight: "700", padding: "2px 7px", borderRadius: "3px" }}>{item.tag}</div>
            </div>
            <div style={{ padding: "12px 14px", fontSize: "12px", color: TEXT, lineHeight: 1.7, fontStyle: "italic", background: "#fff" }}>Response: "{item.resp}"</div>
          </div>
        ))}
      </DocPage>

      {/* CHAPTER 5 — EMPLOYEE SOPS */}
      <ChapterCover img={COVER_DESK} number={5} title="Employee Training SOPs" desc="Standard Operating Procedures for Cold Callers, Acquisition Managers, and Transaction Coordinators." />

      <DocPage pageNum={41}>
        <SectionHeader number="5.1" title="Cold Caller SOP — Standard Operating Procedure" color={BLUE} />
        <Callout icon="👤" text="This SOP is given to every Cold Caller on Day 1. They should be able to do their entire job using only this document. Print and sign." color={BLUE} />
        {[
          ["Role Title", "Cold Caller — Virtual (Remote)"],
          ["Reports To", "Jacob Levy, Owner — Home-Link Realty Group LLC"],
          ["Work Hours", "9:00 AM – 5:00 PM Central Time · Monday – Friday"],
          ["Work Location", "100% Remote — phone + CRM only"],
          ["Tool Access", "CRM (read/write leads only) · Call tracking sheet · Script document · NO access to financial data or contracts"],
          ["Daily Call Target", "60+ outbound calls · Must ring at least 3 times before hangup"],
          ["Talk Time Target", "3–6 hours of actual seller conversation per day"],
          ["New Leads Target", "5+ qualified leads logged in CRM per day"],
          ["Qualification Criteria", "Lead must have: motivation to sell + estimated 30%+ equity + flexible or urgent timeline. If 2 of 3 — flag as Hot Lead for Jacob immediately."],
          ["Data Entry Standard", "After every call — log: outcome (No Answer / Not Interested / Callback / Hot Lead), notes from conversation, next follow-up date. No exceptions."],
          ["Hot Lead Protocol", "Any seller who discusses a specific price OR has urgent situation (foreclosure, probate, divorce) — TEXT Jacob immediately: 'HOT LEAD: [Name] [Phone] [Situation]'"],
          ["Professional Standard", "Never argue. Never rush. Always be polite even on rejection. You represent Home-Link Realty Group on every call. Your professionalism = company reputation."],
          ["Compensation", "Base hourly rate + bonus per contract signed ($X per deal — see agreement)"],
        ].map(([l, v]) => <InfoBox key={l} label={l} value={v} />)}

        <div style={{ marginTop: "28px" }}>
          <SectionHeader number="5.2" title="Acquisition Manager SOP" color={PURPLE} />
          {[
            ["Role Title", "Acquisition Manager — Virtual (Remote)"],
            ["Reports To", "Jacob Levy, Owner"],
            ["Tool Access", "Full CRM access · Script library · MAO calculator · Lead sheet template · NO contract signing authority"],
            ["Daily Process", "1) Check CRM for Hot Leads and Follow-Up due today. 2) Call all Hot Leads within 60 minutes of assignment. 3) Complete full seller lead sheet on every call. 4) Run MAO formula. 5) Present verbal offer. 6) Log all outcomes. 7) Escalate any signed-ready contracts to Jacob."],
            ["Offer Authority", "May present verbal offers. CANNOT sign contracts. All contracts go to Jacob for review before execution."],
            ["MAO Rule", "NEVER offer above WMAO without Jacob's explicit approval. Always document your math in the Deal notes field. Show ARV source, repair estimate method, and final WMAO."],
            ["Follow-Up Ownership", "Own every lead assigned to you through the full 15-touch sequence. CRM follow-up dates are mandatory — not suggestions."],
            ["Compensation", "Base salary + per-deal bonus (see agreement)"],
          ].map(([l, v]) => <InfoBox key={l} label={l} value={v} color={PURPLE} />)}
        </div>
      </DocPage>

      <DocPage pageNum={42}>
        <SectionHeader number="5.3" title="Transaction Coordinator SOP" color={TEAL} />
        {[
          ["Role Title", "Transaction Coordinator — Virtual (Remote)"],
          ["Trigger", "Activated when a Lead status changes to 'Under Contract' in CRM"],
          ["Primary Tool", "CRM Deal record · DocuSign/PandaDoc · Title company email/phone · Google Calendar"],
          ["Step 1", "Send Purchase Contract to seller via DocuSign within 2 hours of verbal agreement. Walk seller through signing on the phone."],
          ["Step 2", "Collect $100 earnest money. Wire instructions to seller for title company escrow account."],
          ["Step 3", "Email executed contract to title company with cover sheet: buyer name, seller name, property address, purchase price, close date requested."],
          ["Step 4", "Open Deal record in CRM. Enter all dates: contract date, inspection period end, estimated close date. Set Google Calendar alerts for each."],
          ["Step 5", "Coordinate buyer blast with Jacob — ensure deal goes to all buyers via CRM blast within 24 hours of contract."],
          ["Step 6", "Once buyer found — execute Assignment of Contract via DocuSign. Deliver to title company with original purchase contract."],
          ["Step 7", "Track title company progress daily. Follow up on title search, lien clearance, deed prep. Log all communications in Deal notes."],
          ["Step 8", "Confirm closing date. Ensure all parties have remote notary or mail-away signing instructions. Confirm wire transfer details with title company."],
          ["Step 9", "After closing — confirm assignment fee wire received. Update CRM: Deal status = Closed. Record final profit. Notify Jacob."],
          ["Closing Checklist", "Purchase contract signed ✓ · EMD submitted ✓ · Title search ordered ✓ · Deal blasted to buyers ✓ · Buyer found ✓ · Assignment contract signed ✓ · Closing date confirmed ✓ · Wire details verified ✓ · Fee received ✓"],
        ].map(([l, v]) => <InfoBox key={l} label={l} value={v} color={TEAL} />)}

        <div style={{ marginTop: "32px" }}>
          <SectionHeader number="5.4" title="KPI Targets — All Roles" color={RED} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {[
              ["OWNER (JACOB)", [["Deals/Month", "2–3 minimum"], ["Revenue/Month", "$20K–$75K"], ["Offer Reviews", "All contracts"], ["Weekly Review", "Every Friday"]]],
              ["COLD CALLER", [["Calls/Day", "60+ minimum"], ["Talk Time/Day", "3–6 hours"], ["Leads/Day", "5+ qualified"], ["Hot Leads/Week", "10+ flagged"]]],
              ["ACQ. MANAGER", [["Follow-Ups/Day", "All due in CRM"], ["Offers/Day", "3–4 minimum"], ["Lead Sheets", "100% completed"], ["Response Time", "<60 min on hot leads"]]],
            ].map(([role, metrics]) => (
              <div key={role} style={{ background: GRAY, borderRadius: "10px", overflow: "hidden" }}>
                <div style={{ background: DARK, padding: "10px 14px" }}>
                  <div style={{ color: GOLD, fontWeight: "800", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{role}</div>
                </div>
                <div style={{ padding: "12px 14px" }}>
                  {metrics.map(([label, val]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #eee", fontSize: "12px" }}>
                      <span style={{ color: TEXT }}>{label}</span>
                      <span style={{ fontWeight: "800", color: RED }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DocPage>

      {/* FINAL PAGE */}
      <DocPage pageNum={52}>
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <img src={LOGO} alt="Home-Link" style={{ height: "60px", marginBottom: "24px" }} />
          <h2 style={{ fontSize: "28px", fontWeight: "900", color: DARK, marginBottom: "12px" }}>End of Business Operations Manual</h2>
          <p style={{ color: TEXT, fontSize: "16px", marginBottom: "32px", lineHeight: 1.7 }}>
            Home-Link Realty Group LLC · Virtual Wholesaling Business System<br />
            Compiled April 2026 · Owner: Jacob Levy
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", maxWidth: "600px", margin: "0 auto 40px" }}>
            {[["📞", "(855) 810-1786"], ["✉️", "jacob.levy@homelinkrealtygroup.com"], ["🌐", "home-link-realty-group.base44.app"]].map(([icon, val]) => (
              <div key={val} style={{ background: GRAY, borderRadius: "8px", padding: "14px", fontSize: "13px", color: TEXT }}>
                <div style={{ fontSize: "24px", marginBottom: "6px" }}>{icon}</div>
                {val}
              </div>
            ))}
          </div>
          <div style={{ background: DARK, color: "#9aa3b5", padding: "20px 32px", borderRadius: "12px", fontSize: "12px", lineHeight: 1.8, maxWidth: "700px", margin: "0 auto" }}>
            This document is CONFIDENTIAL and the exclusive property of Home-Link Realty Group LLC. It contains proprietary business systems, scripts, processes, and operational procedures. Distribution outside of authorized employees is strictly prohibited. This document does not constitute legal or financial advice. Consult a licensed attorney or financial advisor for jurisdiction-specific guidance.
          </div>
        </div>
      </DocPage>

    </div>
  );
}
