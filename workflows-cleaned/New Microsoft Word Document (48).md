# New Microsoft Word Document (48)

Source: New Microsoft Word Document (48).docx

import { useState } from "react";

const NAVY = "#0B1F45";

const GOLD = "#D4A843";

export default function HeroSection() {

  const [addr, setAddr] = useState("");

  function handleAddrSubmit(e) {

    e.preventDefault();

    if (!addr.trim()) return;

    setTimeout(() => window.fbq && window.fbq('trackCustom', 'AddressEntered'), 0);

    window.location.href = `/GetOffer?address=${encodeURIComponent(addr)}`;

  }

  return (

    <section

      id="main-content"

      aria-label="Sell your house fast for cash — Hero"

      style={{ padding: "100px 32px 120px", textAlign: "center", position: "relative", overflow: "hidden", minHeight: "100vh", contain: "layout" }}

    >

      {/* Responsive LCP hero — WebP, properly sized per viewport, payload reduced ~70% */}

      <picture style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">

        <source

          type="image/webp"

          sizes="100vw"

          srcSet="https://media.base44.com/images/public/69d48de0b96337e8cdc27f54/81a24b627_generated_image.png?w=640&q=72&fm=webp 640w, https://media.base44.com/images/public/69d48de0b96337e8cdc27f54/81a24b627_generated_image.png?w=1024&q=78&fm=webp 1024w, https://media.base44.com/images/public/69d48de0b96337e8cdc27f54/81a24b627_generated_image.png?w=1600&q=80&fm=webp 1600w"

        />

        <img

          src="https://media.base44.com/images/public/69d48de0b96337e8cdc27f54/81a24b627_generated_image.png?w=1024&q=78&fm=webp"

          alt="Classic American suburban home — sell your house fast for cash"

          width="1600" height="900"

          loading="eager" fetchpriority="high" decoding="async"

          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}

        />

      </picture>


      {/* Enhanced gradient for text contrast */}

      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>

        {/* Trust badge — explicit size to prevent CLS */}

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 30, padding: "6px 16px", marginBottom: 24, fontSize: 12, color: "#ccc", height: 32 }}>

          <span style={{ color: "#ffd700" }} aria-label="5 stars">★★★★★</span>

          <span>Trusted by 200+ homeowners across the United States</span>

        </div>

        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, margin: "0 0 18px" }}>

          Sell Your House Fast<br />

          <span style={{ color: GOLD }}>for Cash — Any Condition.</span>

        </h1>

        <p style={{ fontSize: "clamp(15px, 2vw, 20px)", color: "#e0e8f0", maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.6, fontWeight: 500 }}>

          Get a fair cash offer in <strong style={{ color: "#fff", fontWeight: 700 }}>24 hours</strong>. No repairs. No fees. No commissions. Close in as little as <strong style={{ color: "#fff", fontWeight: 700 }}>7 days</strong> — or on your timeline.

        </p>

        <form onSubmit={handleAddrSubmit} style={{ maxWidth: 580, margin: "0 auto 24px" }} role="search" aria-label="Get a cash offer on your property">

          <div style={{ display: "flex", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.3)", height: 58 }}>

            <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>

              <span style={{ fontSize: 20, flexShrink: 0 }} aria-hidden="true">📍</span>

              <label htmlFor="address-input" className="sr-only">Enter your property address</label>

              <input

                id="address-input"

                type="text"

                name="address"

                autoComplete="street-address"

                value={addr}

                onChange={e => setAddr(e.target.value)}

                placeholder="Enter your property address..."

                aria-label="Enter your property address to get a free cash offer"

                style={{ flex: 1, border: "none", outline: "none", fontSize: 15, padding: "0", fontFamily: "inherit", color: NAVY, background: "transparent", minWidth: 0 }}

              />

            </div>

            <button

              type="submit"

              aria-label="Get my free cash offer"

              style={{ background: GOLD, color: "#fff", border: "none", padding: "0 28px", fontWeight: 900, fontSize: 15, cursor: "pointer", whiteSpace: "nowrap", letterSpacing: 0.3, flexShrink: 0, minHeight: 44 }}

            >

              Get My Cash Offer →

            </button>

          </div>

        </form>

        {/* Trust signals — explicit heights to prevent CLS */}

        <div role="list" style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", fontSize: 12, color: "#aaa", marginBottom: 16 }}>

          {["✅ No repairs needed", "✅ No agent commissions", "✅ Close in 7 days", "✅ 100% free offer"].map(t => (

            <span key={t} role="listitem" style={{ color: "#86efac" }}>{t}</span>

          ))}

        </div>

        <p style={{ fontSize: 13, color: "#d0d8e0", margin: 0, fontWeight: 500 }}>

          Prefer to talk?{" "}

          <a href="tel:+18558101786" style={{ color: GOLD, fontWeight: 800, textDecoration: "none" }} aria-label="Call Home-Link Realty Group at 855-810-1786">

            📞 Call (855) 810-1786

          </a>{" "}

          — real person answers

        </p>

      </div>

    </section>

  );

}
