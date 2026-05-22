/**
 * TrustBadges — Shared trust signal bar: BBB, Google 5-star, Verified Cash Buyer.
 * Fortune 500-grade: ARIA landmark, aria-labels, semantic markup, accessible SVG.
 */

export default function TrustBadges() {
  return (
    <section
      aria-label="Trust and accreditation badges"
      style={{
        background: "#fff",
        borderTop: "3px solid #D4A843",
        borderBottom: "3px solid #D4A843",
        padding: "20px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          flexWrap: "wrap",
        }}
      >
        {/* BBB */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 12 }}
          aria-label="BBB Accredited Business, Rating A+"
        >
          <div
            aria-hidden="true"
            style={{
              width: 54, height: 54, background: "#003087", borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 20, fontFamily: "Georgia, serif" }}>BBB</span>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#003087", lineHeight: 1.2 }}>BBB Accredited</div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#003087" }}>Business</div>
            <div aria-label="5 stars" style={{ display: "flex", gap: 2, marginTop: 2 }}>
              {[1,2,3,4,5].map(s => <span key={s} aria-hidden="true" style={{ color: "#003087", fontSize: 12 }}>★</span>)}
            </div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>Rating: A+</div>
          </div>
        </div>

        <div aria-hidden="true" style={{ width: 1, height: 50, background: "#ddd" }} />

        {/* Google */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 12 }}
          aria-label="Google Rating: 5.0 stars based on 47 reviews"
        >
          <div
            aria-hidden="true"
            style={{
              width: 54, height: 54, background: "#fff", border: "2px solid #dadce0",
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
              <path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
              <path fill="#FBBC05" d="M24 46c5.8 0 10.8-1.9 14.7-5.2l-6.8-5.6C29.9 36.8 27.1 38 24 38c-6.1 0-11.2-4.1-13-9.7l-7 5.4C7.5 41.8 15.2 46 24 46z"/>
              <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.8-2.9 5.1-5.5 6.6l6.8 5.6C41.1 37.5 44.5 31.3 44.5 20z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#202124", lineHeight: 1.2 }}>Google Rating</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
              <span style={{ fontWeight: 900, fontSize: 18, color: "#202124" }}>5.0</span>
              <div aria-label="5 stars" style={{ display: "flex", gap: 1 }}>
                {[1,2,3,4,5].map(s => <span key={s} aria-hidden="true" style={{ color: "#FBBC05", fontSize: 16 }}>★</span>)}
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>47 verified reviews</div>
          </div>
        </div>

        <div aria-hidden="true" style={{ width: 1, height: 50, background: "#ddd" }} />

        {/* Verified */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 12 }}
          aria-label="Verified Cash Buyer — Closes in 14 Days"
        >
          <div
            aria-hidden="true"
            style={{
              width: 54, height: 54, background: "#2dc653", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <span style={{ color: "#fff", fontSize: 26 }}>✓</span>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#0B1F45", lineHeight: 1.2 }}>Verified</div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#0B1F45" }}>Cash Buyer</div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>Closes in 14 Days</div>
          </div>
        </div>
      </div>
    </section>
  );
}
