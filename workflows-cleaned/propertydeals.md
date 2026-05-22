# propertydeals

Source: propertydeals.docx

import { useState, useEffect } from "react";

import { Deal } from "@/api/entities";

const PHONE = "(855) 810-1786";

const PHONE_RAW = "+18558101786";

const COMPANY = "Home-Link Realty Group LLC";

const SITE = "https://home-link-realty-group.base44.app";

const LOGO = "https://media.base44.com/images/public/69d48a8432b834f7bfa0beaa/4450143b1_Home-LinkLogo.png";

// Sample/demo deals shown when no live deals exist yet

const DEMO_DEALS = [

  {

    id: "demo-1",

    property_address: "4812 Mockingbird Lane",

    city: "Dallas", state: "TX",

    arv: 285000, purchase_price: 145000, assignment_fee: 22000,

    status: "Buyer Found",

    notes: "3/2 brick ranch. New roof 2022. Needs kitchen and bath update. Tenant occupied — lease expires in 60 days.",

    beds: 3, baths: 2, sqft: 1480, year_built: 1974,

    images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600"],

  },

  {

    id: "demo-2",

    property_address: "2201 Cedar Springs Rd",

    city: "Fort Worth", state: "TX",

    arv: 320000, purchase_price: 179000, assignment_fee: 28000,

    status: "Under Contract",

    notes: "4/2.5 two-story in growing suburb. Needs cosmetic work — paint, flooring, kitchen appliances. Motivated estate sale seller.",

    beds: 4, baths: 2, sqft: 2100, year_built: 1988,

    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600"],

  },

  {

    id: "demo-3",

    property_address: "9140 Westheimer Rd",

    city: "Houston", state: "TX",

    arv: 198000, purchase_price: 98000, assignment_fee: 15000,

    status: "Buyer Found",

    notes: "3/1 shotgun-style. Fire damage to rear bedroom — fully remediated. Cleared title. Vacant. Keys available for immediate access.",

    beds: 3, baths: 1, sqft: 1100, year_built: 1962,

    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600"],

  },

];

function DealCard({ deal, onSelect }) {

  const R = "#e63946";

  const profit = deal.assignment_fee || 0;

  const roi = deal.purchase_price ? Math.round((profit / deal.purchase_price) * 100) : 0;

  const statusColor = deal.status === "Under Contract" ? "#3498db" : deal.status === "Buyer Found" ? "#f39c12" : "#27ae60";

  return (

    <div onClick={() => onSelect(deal)} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", cursor: "pointer", border: "1px solid #e8e8e8" }}

      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}

      onMouseLeave={e => e.currentTarget.style.transform = "none"}

      style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", cursor: "pointer", border: "1px solid #e8e8e8", transition: "transform 0.2s, box-shadow 0.2s" }}>

      <div style={{ position: "relative" }}>

        <img src={deal.images?.[0] || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600"} alt={deal.property_address}

          style={{ width: "100%", height: 200, objectFit: "cover" }} onError={e => e.target.style.display = "none"} />

        <div style={{ position: "absolute", top: 12, right: 12, background: statusColor, color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{deal.status}</div>

        <div style={{ position: "absolute", top: 12, left: 12, background: R, color: "#fff", fontSize: 12, fontWeight: 900, padding: "4px 10px", borderRadius: 20 }}>

          ${profit.toLocaleString()} Fee

        </div>

      </div>

      <div style={{ padding: "16px 18px" }}>

        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{deal.property_address}</div>

        <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>{deal.city}, {deal.state} · {deal.beds}bd / {deal.baths}ba · {deal.sqft?.toLocaleString()} sqft</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>

          {[

            { label: "ARV", val: `$${(deal.arv || 0).toLocaleString()}` },

            { label: "Price", val: `$${(deal.purchase_price || 0).toLocaleString()}` },

            { label: "ROI", val: `${roi}%` },

          ].map(item => (

            <div key={item.label} style={{ background: "#f8f9fa", borderRadius: 8, padding: "8px", textAlign: "center" }}>

              <div style={{ fontSize: 10, color: "#888", fontWeight: 700 }}>{item.label}</div>

              <div style={{ fontSize: 14, fontWeight: 900, color: "#1a1a2e" }}>{item.val}</div>

            </div>

          ))}

        </div>

        <p style={{ fontSize: 12, color: "#666", lineHeight: 1.6, margin: "0 0 12px" }}>{deal.notes?.slice(0, 100)}...</p>

        <button style={{ width: "100%", background: R, color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>

          View Deal Details →

        </button>

      </div>

    </div>

  );

}

function DealModal({ deal, onClose }) {

  if (!deal) return null;

  const R = "#e63946", D = "#1a1a2e";

  const profit = deal.assignment_fee || 0;

  const roi = deal.purchase_price ? Math.round((profit / deal.purchase_price) * 100) : 0;

  return (

    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>

      <div style={{ background: "#fff", borderRadius: 16, maxWidth: 720, width: "100%", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>

        <img src={deal.images?.[0]} alt={deal.property_address} style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: "16px 16px 0 0" }} onError={e => e.target.style.display = "none"} />

        <div style={{ padding: "24px 28px" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>

            <div>

              <h2 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 4px" }}>{deal.property_address}</h2>

              <div style={{ color: "#888", fontSize: 14 }}>{deal.city}, {deal.state} · Built {deal.year_built} · {deal.sqft?.toLocaleString()} sqft</div>

            </div>

            <button onClick={onClose} style={{ background: "#f0f0f0", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontWeight: 700 }}>✕ Close</button>

          </div>

          {/* Numbers */}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>

            {[

              { label: "ARV", val: `$${(deal.arv || 0).toLocaleString()}`, color: "#27ae60" },

              { label: "Purchase Price", val: `$${(deal.purchase_price || 0).toLocaleString()}`, color: D },

              { label: "Assignment Fee", val: `$${profit.toLocaleString()}`, color: R },

              { label: "ROI", val: `${roi}%`, color: "#3498db" },

            ].map(item => (

              <div key={item.label} style={{ background: "#f8f9fa", borderRadius: 10, padding: "14px", textAlign: "center" }}>

                <div style={{ fontSize: 10, color: "#888", fontWeight: 700, marginBottom: 4 }}>{item.label}</div>

                <div style={{ fontSize: 18, fontWeight: 900, color: item.color }}>{item.val}</div>

              </div>

            ))}

          </div>

          <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Property Notes</h3>

          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8, marginBottom: 20 }}>{deal.notes}</p>

          <div style={{ background: "#fff3f3", border: "2px solid #ffd0d0", borderRadius: 10, padding: "16px 20px", marginBottom: 20 }}>

            <div style={{ fontWeight: 800, fontSize: 14, color: R, marginBottom: 4 }}>⚡ Interested in This Deal?</div>

            <div style={{ fontSize: 13, color: "#666" }}>Call us now to get access, request photos, and lock in your assignment contract.</div>

          </div>

          <div style={{ display: "flex", gap: 12 }}>

            <a href={`tel:${PHONE_RAW}`} style={{ flex: 1, background: R, color: "#fff", padding: "14px", borderRadius: 10, fontWeight: 900, fontSize: 15, textDecoration: "none", textAlign: "center" }}>

              📞 Call to Claim This Deal

            </a>

            <a href="/GetOffer" style={{ flex: 1, background: "#1a1a2e", color: "#fff", padding: "14px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center" }}>

              Join Our Buyer List

            </a>

          </div>

        </div>

      </div>

    </div>

  );

}

export default function PropertyDeals() {

  const [deals, setDeals] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);

  const [filter, setFilter] = useState("all");

  useEffect(() => {

    Deal.list().then(d => {

      setDeals(d?.length ? d : DEMO_DEALS);

      setLoading(false);

    }).catch(() => { setDeals(DEMO_DEALS); setLoading(false); });

    document.title = "Investment Property Deals | Cash Buyer Wholesale Houses | Home-Link Realty Group";

    const setMeta = (n, c) => {

      let el = document.querySelector(`meta[name="${n}"]`);

      if (!el) { el = document.createElement("meta"); el.setAttribute("name", n); document.head.appendChild(el); }

      el.setAttribute("content", c);

    };

    setMeta("description", "Browse wholesale investment property deals. Deeply discounted houses for cash buyers and investors. Assignment contracts available. Home-Link Realty Group — trusted wholesaler.");

    setMeta("robots", "index, follow");

    let can = document.querySelector("link[rel='canonical']");

    if (!can) { can = document.createElement("link"); can.rel = "canonical"; document.head.appendChild(can); }

    can.href = `${SITE}/PropertyDeals`;

    // Schema: BreadcrumbList + Organization

    const schemaId = "schema-deals";

    let sc = document.getElementById(schemaId);

    if (sc) sc.remove();

    sc = document.createElement("script");

    sc.type = "application/ld+json"; sc.id = schemaId;

    sc.text = JSON.stringify({

      "@context": "https://schema.org",

      "@graph": [

        {

          "@type": "Organization",

          "@id": `${SITE}/#organization`,

          "name": COMPANY,

          "url": SITE,

          "telephone": PHONE_RAW,

          "logo": LOGO,

          "description": "Real estate wholesale company buying and selling investment properties across Texas.",

          "areaServed": { "@type": "State", "name": "Texas" },

        },

        {

          "@type": "BreadcrumbList",

          "itemListElement": [

            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE}/` },

            { "@type": "ListItem", "position": 2, "name": "Investment Property Deals", "item": `${SITE}/PropertyDeals` }

          ]

        }

      ]

    });

    document.head.appendChild(sc);

    return () => { const s = document.getElementById(schemaId); if (s) s.remove(); };

  }, []);

  // Add per-deal schema when selected

  useEffect(() => {

    if (!selected) return;

    const schemaId = `schema-deal-${selected.id}`;

    let sc = document.getElementById(schemaId);

    if (sc) sc.remove();

    sc = document.createElement("script");

    sc.type = "application/ld+json"; sc.id = schemaId;

    sc.text = JSON.stringify({

      "@context": "https://schema.org",

      "@type": "RealEstateListing",

      "name": selected.property_address,

      "description": selected.notes,

      "address": {

        "@type": "PostalAddress",

        "streetAddress": selected.property_address,

        "addressLocality": selected.city,

        "addressRegion": selected.state,

        "addressCountry": "US"

      },

      "offers": {

        "@type": "Offer",

        "price": selected.purchase_price,

        "priceCurrency": "USD",

        "availability": "https://schema.org/InStock",

        "seller": { "@type": "Organization", "name": COMPANY }

      },

      "floorSize": { "@type": "QuantitativeValue", "value": selected.sqft, "unitCode": "FTK" },

      "numberOfRooms": selected.beds,

      "yearBuilt": selected.year_built,

    });

    document.head.appendChild(sc);

    return () => { const s = document.getElementById(schemaId); if (s) s.remove(); };

  }, [selected]);

  const R = "#e63946", D = "#1a1a2e";

  const filtered = filter === "all" ? deals : deals.filter(d => d.status === filter);

  return (

    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", color: D, background: "#f8f9fa", minHeight: "100vh" }}>

      {/* Nav */}

      <nav style={{ background: D, padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 60, borderBottom: "2px solid rgba(230,57,70,0.3)" }}>

        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>

          <img src={LOGO} alt={COMPANY} style={{ height: 32 }} onError={e => e.target.style.display = "none"} />

          <span style={{ color: "#fff", fontWeight: 900, fontSize: 14 }}>Home-Link Realty Group</span>

        </a>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>

          <a href="/InvestorPortal" style={{ color: "#ccc", fontSize: 13, textDecoration: "none" }}>Investor Portal</a>

          <a href={`tel:${PHONE_RAW}`} style={{ background: R, color: "#fff", padding: "10px 18px", borderRadius: 8, textDecoration: "none", fontWeight: 800, fontSize: 14 }}>📞 {PHONE}</a>

        </div>

      </nav>

      {/* Breadcrumb */}

      <div style={{ background: "#fff", padding: "8px 32px", fontSize: 12, color: "#888", borderBottom: "1px solid #eee" }}>

        <a href="/" style={{ color: "#666", textDecoration: "none" }}>Home</a> &rsaquo; <span style={{ color: D }}>Investment Property Deals</span>

      </div>

      {/* Header */}

      <section style={{ background: `linear-gradient(135deg, ${D}, #2a2a4a)`, padding: "48px 32px", textAlign: "center" }}>

        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>

          🏠 Wholesale Investment Property Deals

        </h1>

        <p style={{ fontSize: 16, color: "#b0b8c8", margin: "0 0 24px" }}>

          Deeply discounted properties for cash buyers and investors. Assignment contracts available.

        </p>

        <a href="/InvestorPortal" style={{ background: R, color: "#fff", padding: "12px 28px", borderRadius: 8, fontWeight: 800, textDecoration: "none", fontSize: 14 }}>

          Join Our Buyer List →

        </a>

      </section>

      {/* Filters */}

      <div style={{ background: "#fff", padding: "14px 32px", borderBottom: "1px solid #eee", display: "flex", gap: 8, flexWrap: "wrap" }}>

        {[["all", "All Deals"], ["Under Contract", "Under Contract"], ["Buyer Found", "Buyer Found"], ["Closed", "Closed"]].map(([val, label]) => (

          <button key={val} onClick={() => setFilter(val)}

            style={{ padding: "7px 16px", borderRadius: 20, border: `2px solid ${filter === val ? R : "#e0e0e0"}`, background: filter === val ? "#fff3f3" : "#fff", color: filter === val ? R : "#666", fontWeight: filter === val ? 700 : 400, cursor: "pointer", fontSize: 13 }}>

            {label}

          </button>

        ))}

        <span style={{ marginLeft: "auto", fontSize: 13, color: "#888", display: "flex", alignItems: "center" }}>{filtered.length} deals shown</span>

      </div>

      {/* Deal Grid */}

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px" }}>

        {loading ? (

          <div style={{ textAlign: "center", padding: 60, color: "#888" }}>Loading deals...</div>

        ) : filtered.length === 0 ? (

          <div style={{ textAlign: "center", padding: 60, color: "#888" }}>No deals matching this filter. <a href="/InvestorPortal" style={{ color: R }}>Join our buyer list</a> to get notified.</div>

        ) : (

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>

            {filtered.map(deal => <DealCard key={deal.id} deal={deal} onSelect={setSelected} />)}

          </div>

        )}

        {/* CTA */}

        <div style={{ background: "#fff", borderRadius: 16, padding: "32px", marginTop: 40, textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Never Miss a Deal</h3>

          <p style={{ fontSize: 14, color: "#666", marginBottom: 20 }}>Join our VIP buyer list and get notified the moment new wholesale deals hit our pipeline.</p>

          <a href="/InvestorPortal" style={{ background: R, color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 900, fontSize: 15, textDecoration: "none" }}>

            Join VIP Buyer List →

          </a>

        </div>

      </div>

      {selected && <DealModal deal={selected} onClose={() => setSelected(null)} />}

      <footer style={{ background: "#111", color: "#555", padding: "24px 32px", textAlign: "center", fontSize: 12, marginTop: 40 }}>

        © 2026 {COMPANY} · <a href="/" style={{ color: "#555", textDecoration: "none" }}>Home</a> · <a href="/Terms" style={{ color: "#555", textDecoration: "none" }}>Terms</a>

      </footer>

    </div>

  );

}
