# New Microsoft Word Document (107)

Source: New Microsoft Word Document (107).docx

import { PHONE, PHONE_RAW, LOGO } from "./portalConstants";

export default function PortalLogin({ phone, setPhone, loading, loginError, handleLogin }) {

  return (

    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0B1F45 0%, #122B5E 55%, #071a0e 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "'Inter', -apple-system, sans-serif" }}>

      <div style={{ position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, background: "radial-gradient(circle, rgba(39,174,96,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <img src={LOGO} alt="Home-Link Realty Group — Secure seller portal login" style={{ height: 68, marginBottom: 32, filter: "drop-shadow(0 4px 20px rgba(39,174,96,0.25))" }} />

      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "48px 44px", maxWidth: 480, width: "100%", backdropFilter: "blur(24px)", position: "relative" }}>

        <div style={{ textAlign: "center", marginBottom: 36 }}>

          <div style={{ width: 68, height: 68, background: "linear-gradient(135deg, #27ae60, #2ecc71)", borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 18px", boxShadow: "0 8px 32px rgba(39,174,96,0.35)" }}>🏠</div>

          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 900, margin: "0 0 10px", letterSpacing: -0.5 }}>Seller Portal</h1>

          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, margin: 0, lineHeight: 1.6 }}>Your personal dashboard to track your offer,<br/>upload photos, and monitor your closing.</p>

        </div>

        <div style={{ marginBottom: 22 }}>

          <label style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 700, letterSpacing: 1, display: "block", marginBottom: 8, textTransform: "uppercase" }}>Phone Number You Submitted</label>

          <input

            type="tel"

            placeholder="(555) 000-0000"

            value={phone}

            onChange={e => setPhone(e.target.value)}

            onKeyDown={e => e.key === "Enter" && handleLogin()}

            style={{ width: "100%", padding: "16px 18px", background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.13)", borderRadius: 12, color: "#fff", fontSize: 17, outline: "none", boxSizing: "border-box", letterSpacing: 0.5 }}

            onFocus={e => e.target.style.borderColor = "rgba(39,174,96,0.55)"}

            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.13)"}

          />

        </div>

        {loginError && (

          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: "13px 16px", color: "#fca5a5", fontSize: 14, marginBottom: 18, lineHeight: 1.5 }}>

            ⚠️ {loginError}

          </div>

        )}

        <button

          onClick={handleLogin}

          disabled={loading || !phone.trim()}

          style={{ width: "100%", padding: "16px", background: phone.trim() ? "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)" : "rgba(255,255,255,0.08)", border: "none", borderRadius: 12, color: "#fff", fontSize: 16, fontWeight: 800, cursor: phone.trim() ? "pointer" : "default", transition: "all 0.2s", letterSpacing: 0.3 }}

        >

          {loading ? "⏳ Looking up your property..." : "Access My Seller Portal →"}

        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 24 }}>

          {[["🔒", "100% Private"], ["⚡", "Instant Access"], ["📞", "Live Support"]].map(([icon, label]) => (

            <div key={label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>

              <div style={{ fontSize: 18, marginBottom: 3 }}>{icon}</div>

              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 600 }}>{label}</div>

            </div>

          ))}

        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: 24, paddingTop: 22, textAlign: "center" }}>

          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: "0 0 10px" }}>Haven't requested an offer yet?</p>

          <a href="/GetOffer" style={{ color: "#4ade80", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>Get Your Free Cash Offer →</a>

        </div>

      </div>

      <p style={{ marginTop: 22, color: "rgba(255,255,255,0.2)", fontSize: 13 }}>

        Need help? <a href={`tel:${PHONE_RAW}`} style={{ color: "#4ade80", textDecoration: "none", fontWeight: 600 }}>{PHONE}</a>

      </p>

    </div>

  );

}
