/**
 * SiteNav — Shared navigation component used across all public pages.
 * Fortune 500-grade: ARIA landmark, keyboard nav, skip link, mobile-responsive.
 */

const LOGO = "https://media.base44.com/images/public/69d48de0b96337e8cdc27f54/341fa67b3_generated_image.png";
const PHONE_RAW = "+18558101786";
const PHONE = "(855) 810-1786";
const NAVY = "#0B1F45";
const GOLD = "#D4A843";

export default function SiteNav({ activePage = "" }) {
  const links = [
    { href: "/Home", label: "Home" },
    { href: "/Blog", label: "Resources" },
    { href: "/Cities", label: "Cities" },
    { href: "/GetOffer", label: "Get an Offer" },
    { href: "/SellerPortal", label: "Seller Portal" },
  ];

  return (
    <header>
      <a
        href="#main-content"
        style={{
          position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px",
          overflow: "hidden", zIndex: 9999, background: NAVY, color: "#fff",
          padding: "8px 16px", borderRadius: "0 0 4px 4px", fontWeight: 700, textDecoration: "none",
        }}
        onFocus={e => { e.currentTarget.style.left = "0"; e.currentTarget.style.width = "auto"; e.currentTarget.style.height = "auto"; }}
        onBlur={e => { e.currentTarget.style.left = "-9999px"; e.currentTarget.style.width = "1px"; e.currentTarget.style.height = "1px"; }}
      >
        Skip to main content
      </a>

      <nav
        aria-label="Main navigation"
        style={{
          background: NAVY, padding: "0 32px", display: "flex", justifyContent: "space-between",
          alignItems: "center", position: "sticky", top: 0, zIndex: 300, height: 64,
          borderBottom: "2px solid rgba(212,168,67,0.3)",
        }}
      >
        <a
          href="/Home"
          aria-label="Home-Link Realty Group — return to homepage"
          aria-current={activePage === "home" ? "page" : undefined}
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}
        >
          <img
            src={LOGO}
            alt="Home-Link Realty Group — Cash Home Buyers Nationwide — Sell Your House Fast for Cash"
            width="120"
            height="36"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            style={{ height: 36, width: "auto", display: "block" }}
            onError={e => { e.target.style.display = "none"; }}
          />
          <div aria-hidden="true">
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 15, lineHeight: 1.1 }}>Home-Link</div>
            <div style={{ color: "#aaa", fontSize: 10, letterSpacing: 0.5 }}>Realty Group LLC</div>
          </div>
        </a>

        <div role="list" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          {links.map(({ href, label }) => (
            <a
              key={href}
              role="listitem"
              href={href}
              aria-current={activePage && href.toLowerCase().includes(activePage.toLowerCase()) ? "page" : undefined}
              style={{
                color: activePage && href.toLowerCase().includes(activePage.toLowerCase()) ? "#fff" : "#ccc",
                fontSize: 13,
                textDecoration: "none",
                fontWeight: activePage && href.toLowerCase().includes(activePage.toLowerCase()) ? 700 : 500,
              }}
            >
              {label}
            </a>
          ))}
          <a
            role="listitem"
            href={`tel:${PHONE_RAW}`}
            aria-label={`Call Home-Link Realty Group at ${PHONE}`}
            style={{
              background: GOLD, color: "#fff", padding: "10px 18px", borderRadius: 8,
              textDecoration: "none", fontWeight: 800, fontSize: 14,
              display: "flex", alignItems: "center", gap: 6, flexShrink: 0, minHeight: 44,
            }}
          >
            📞 {PHONE}
          </a>
        </div>
      </nav>
    </header>
  );
}
