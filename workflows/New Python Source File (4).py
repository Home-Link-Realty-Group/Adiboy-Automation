const NAVY = "#0B1F45";
const GOLD = "#D4A843";
const PHONE = "(855) 810-1786";
const PHONE_RAW = "+18558101786";
const EMAIL = "jacob.levy@homelinkrealtygroup.com";
const COMPANY = "Home-Link Realty Group LLC";
const SITE = "https://homelinkrealtygroup.com";

export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "#0A0F1E", color: "#888", padding: "48px 32px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Main Footer Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 40 }}>
          
          {/* Company Info */}
          <div>
            <div style={{ fontWeight: 900, fontSize: 14, color: "#fff", marginBottom: 14 }}>
              🏢 About Home-Link
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.8, color: "#999" }}>
              Professional cash home buyers serving{" "}
              <span style={{ color: GOLD, fontWeight: 700 }}>30+ cities nationwide</span>. We close in 7 days,
              any condition, zero fees.
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
              Not real estate agents • Cash only • As-is purchases
            </div>
          </div>

          {/* Top Cities */}
          <div>
            <div style={{ fontWeight: 900, fontSize: 14, color: "#fff", marginBottom: 14 }}>
              🏙️ Major Markets
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["Dallas, TX", "/Dallas"],
                ["Houston, TX", "/SellHouseHouston"],
                ["Atlanta, GA", "/SellHouseAtlanta"],
                ["Detroit, MI", "/SellHouseDetroit"],
                ["Cleveland, OH", "/SellHouseCleveland"],
              ].map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  style={{ color: "#aaa", fontSize: 12, textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                >
                  → {name}
                </a>
              ))}
              <a
                href="/Cities"
                style={{ color: GOLD, fontSize: 12, textDecoration: "none", fontWeight: 700, marginTop: 6 }}
              >
                View All 30 Cities →
              </a>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <div style={{ fontWeight: 900, fontSize: 14, color: "#fff", marginBottom: 14 }}>
              📚 Resources
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["How It Works", "/BusinessSystem"],
                ["Seller Blog", "/Blog"],
                ["Foreclosure Help", "/DallasForeclosure"],
                ["Inherited Property", "/DallasInherited"],
                ["Get Free Cash Offer", "/GetOffer"],
              ].map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  style={{ color: "#aaa", fontSize: 12, textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                >
                  → {name}
                </a>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <div style={{ fontWeight: 900, fontSize: 14, color: "#fff", marginBottom: 14 }}>
              🔗 Company
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["Home", "/Home"],
                ["Seller Portal", "/SellerPortal"],
                ["Sitemap", "/Sitemap"],
                ["Privacy Policy", "/PrivacyPolicy"],
              ].map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  style={{ color: "#aaa", fontSize: 12, textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                >
                  → {name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontWeight: 900, fontSize: 14, color: "#fff", marginBottom: 14 }}>
              ☎️ Contact
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href={`tel:${PHONE_RAW}`}
                style={{
                  display: "inline-block",
                  background: GOLD,
                  color: "#fff",
                  padding: "10px 14px",
                  borderRadius: 6,
                  fontWeight: 800,
                  fontSize: 13,
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                📞 {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                style={{ color: "#aaa", fontSize: 12, textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
              >
                ✉️ {EMAIL}
              </a>
              <div style={{ fontSize: 11, color: "#666", marginTop: 6 }}>
                Mon–Fri 8AM–7PM CT<br />
                Sat 9AM–2PM CT
              </div>
            </div>
          </div>

        </div>

        {/* Trust Badges */}
        <div style={{
          background: "rgba(212,168,67,0.08)",
          border: "1px solid rgba(212,168,67,0.2)",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 24,
          width: "100%",
          boxSizing: "border-box",
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
            Trusted & Verified
          </div>
          <div style={{ display: "flex", gap: "10px 24px", flexWrap: "wrap", fontSize: 12 }}>
            {[
              "✅ BBB Accredited A+",
              "⭐ 5-star Google (47 reviews)",
              "🔒 Licensed Cash Buyer",
              "⚡ Close in 7 Days",
            ].map((badge) => (
              <div key={badge} style={{ color: "#bbb" }}>
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          fontSize: 11,
          color: "#666",
        }}>
          <div>
            © {currentYear} {COMPANY}. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="/PrivacyPolicy" style={{ color: "#666", textDecoration: "none" }}>
              Privacy Policy
            </a>
            <a href="/Terms" style={{ color: "#666", textDecoration: "none" }}>
              Terms of Use
            </a>
            <a href="/TCPACompliance" style={{ color: "#666", textDecoration: "none" }}>
              TCPA & FDCPA
            </a>
          </div>
          <div style={{ color: "#555" }}>
            We are professional home buyers, not real estate agents.
          </div>
        </div>

      </div>
    </footer>
  );
}
