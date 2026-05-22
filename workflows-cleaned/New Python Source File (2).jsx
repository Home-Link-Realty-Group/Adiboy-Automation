import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import TrustBadges from "@/components/TrustBadges";
import { BLOG_ARTICLES, SITE, PHONE, PHONE_RAW, LOGO, R, D } from "@/lib/blogConfig";
import { setCanonicalUrl } from "@/lib/seoHelpers";

// Maps legacy page routes → blog slugs
const LEGACY_ROUTE_MAP = {
  "/BlogForeclosure": "foreclosure",
  "/BlogInherited": "inherited",
};

export default function DynamicBlogPost() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const resolvedSlug = slug || LEGACY_ROUTE_MAP[pathname];
  const article = BLOG_ARTICLES[resolvedSlug];

  useEffect(() => {
    if (!article) return;

    setCanonicalUrl(`/blog/${resolvedSlug}`);

    // ── GA4 + GSC + Meta Tags ──
    window.gtag && window.gtag("event", "page_view");

    let gv = document.querySelector('meta[name="google-site-verification"]');
    if (!gv) { gv = document.createElement("meta"); gv.setAttribute("name", "google-site-verification"); document.head.insertBefore(gv, document.head.firstChild); }
    gv.setAttribute("content", "sOjZDcEDrTRL1I4_sB3ssF9rNXmK2dt0-xIC-bg6CF8");

    document.title = `${article.title} | Home-Link Realty Group`;

    const setMeta = (n, c, p = false) => {
      const attr = p ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${n}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, n); document.head.appendChild(el); }
      el.setAttribute("content", c);
    };

    setMeta("description", article.description);
    setMeta("keywords", article.keywords);
    setMeta("robots", "index, follow");
    setMeta("og:title", `${article.title} | Home-Link Realty Group`, true);
    setMeta("og:description", article.excerpt, true);
    setMeta("og:type", "article", true);
    setMeta("og:url", `${SITE}/blog/${resolvedSlug}`, true);
    setMeta("og:image", LOGO, true);
    setMeta("og:locale", "en_US", true);
    setMeta("og:site_name", "Home-Link Realty Group LLC", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", article.title);
    setMeta("twitter:description", article.excerpt);
    setMeta("twitter:image", LOGO);

    let can = document.querySelector("link[rel='canonical']");
    if (!can) { can = document.createElement("link"); can.rel = "canonical"; document.head.appendChild(can); }
    can.href = `${SITE}/blog/${resolvedSlug}`;

    // ── Unique BlogPosting Schema ──
    const schemaId = `schema-blog-${resolvedSlug}`;
    if (!document.getElementById(schemaId)) {
      const s = document.createElement("script"); s.type = "application/ld+json"; s.id = schemaId;
      s.text = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.excerpt,
            "datePublished": article.datePublished,
            "dateModified": article.dateModified,
            "author": { "@type": "Person", "name": article.author, "url": `${SITE}/Home` },
            "publisher": {
              "@type": "Organization",
              "name": "Home-Link Realty Group LLC",
              "telephone": PHONE_RAW,
              "logo": { "@type": "ImageObject", "url": LOGO }
            },
            "image": { "@type": "ImageObject", "url": LOGO },
            "url": `${SITE}/blog/${resolvedSlug}`,
            "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE}/blog/${resolvedSlug}` },
            "articleSection": article.category,
            "wordCount": article.wordCount,
            "keywords": article.keywords
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE}/Home` },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE}/Blog` },
              { "@type": "ListItem", "position": 3, "name": article.title, "item": `${SITE}/blog/${resolvedSlug}` }
            ]
          }
        ]
      });
      document.head.appendChild(s);
    }

    window.fbq?.("track", "PageView");
  }, [slug, article]);

  if (!article) return <div className="p-8 text-center">Article not found</div>;

  const P = ({ children }) => <p style={{ fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>{children}</p>;
  const Li = ({ children }) => <li style={{ fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: 8 }}>{children}</li>;

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: "#fff", minHeight: "100vh" }}>
      {/* Urgency bar — dynamic by article */}
      <div style={{ background: article.urgencyBar.bg, color: "#fff", textAlign: "center", padding: "10px 20px", fontSize: 13, fontWeight: 700 }}>
        {article.urgencyBar.icon} {article.urgencyBar.text} —{" "}
        <a href={`tel:${PHONE_RAW}`} aria-label="Call Home-Link Realty Group" style={{ color: "#fff", textDecoration: "underline", fontWeight: 900 }}>
          Call Jacob: {PHONE}
        </a>
      </div>

      {/* Nav */}
      <nav aria-label="Main navigation" style={{ background: "#0B1F45", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 300, height: 64, borderBottom: "2px solid rgba(212,168,67,0.3)" }}>
        <a href="/Home" aria-label="Home-Link Realty Group — return to homepage" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <img src={LOGO} alt="Home-Link Realty Group" width="120" height="36" loading="eager" fetchpriority="high" decoding="async" style={{ height: 36, width: "auto", display: "block" }} onError={e => e.target.style.display = "none"} />
          <div>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 15, lineHeight: 1.1 }}>Home-Link</div>
            <div style={{ color: "#bbb", fontSize: 10, letterSpacing: 0.5 }}>Realty Group LLC</div>
          </div>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="/Blog" style={{ color: "#e0e0e0", fontSize: 13, textDecoration: "none", fontWeight: 500, minHeight: 44, display: "flex", alignItems: "center" }}>Resources</a>
          <a href="/GetOffer" style={{ color: "#e0e0e0", fontSize: 13, textDecoration: "none", fontWeight: 500, minHeight: 44, display: "flex", alignItems: "center" }}>Get an Offer</a>
          <a href={`tel:${PHONE_RAW}`} aria-label="Call Home-Link Realty Group" style={{ background: R, color: "#fff", padding: "10px 18px", borderRadius: 8, textDecoration: "none", fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", gap: 6, flexShrink: 0, minHeight: 44 }}>
            📞 {PHONE}
          </a>
        </div>
      </nav>

      {/* Main content */}
      <main id="main-content">
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "52px 24px" }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "#555", marginBottom: 20 }}>
            <a href="/Home" style={{ color: "#555", textDecoration: "none" }}>Home</a>
            {" ›"} <a href="/Blog" style={{ color: "#555", textDecoration: "none" }}>Blog</a>
            {" › "}<span aria-current="page">{article.category}</span>
          </nav>

          {/* Tag + Meta */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
            <span style={{ background: `${article.urgencyBar.bg}15`, color: article.urgencyBar.bg, fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 20, textTransform: "uppercase" }}>{article.category}</span>
            <time dateTime={article.datePublished} style={{ fontSize: 12, color: "#666" }}>By {article.author} · {article.datePublished.split('-').slice(0, 2).join(' ')} · {article.readTime} min read</time>
          </div>

          <h1 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: D, lineHeight: 1.2, margin: "0 0 20px" }}>
            {article.title}
          </h1>

          {/* Inline CTA */}
          <div style={{ background: "#f8f9fa", borderRadius: 14, padding: "22px 28px", marginBottom: 36, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 900, color: D, fontSize: 15, marginBottom: 4 }}>Ready to get started?</div>
              <div style={{ fontSize: 14, color: "#666" }}>Fair cash offer in 24 hours. No repairs. No commissions. Jacob answers personally.</div>
            </div>
            <a href="/GetOffer" style={{ background: R, color: "#fff", padding: "14px 24px", borderRadius: 8, fontWeight: 900, textDecoration: "none", fontSize: 15, flexShrink: 0, minHeight: 44, display: "flex", alignItems: "center" }}>
              Get My Cash Offer →
            </a>
          </div>

          {/* Sections */}
          {article.sections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: D, margin: "0 0 14px" }}>{section.title}</h2>

              {section.type === "timeline" && (
                <div>
                  {section.content.map(([time, desc]) => (
                    <div key={time} style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                      <div style={{ background: article.urgencyBar.bg, color: "#fff", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 900, flexShrink: 0, height: "fit-content", marginTop: 2 }}>{time}</div>
                      <div style={{ fontSize: 15, color: "#444", lineHeight: 1.6, paddingTop: 4 }}>{desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {section.type === "list" && (
                <>
                  {section.content && <P>{section.content}</P>}
                  <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                    {section.items.map((item, i) => (
                      <Li key={i}>
                        <strong>{item.strong}</strong> {item.text}
                      </Li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}

          {/* FAQs */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: D, margin: "0 0 14px" }}>Frequently Asked Questions</h2>
            {article.faqs.map(([q, a]) => (
              <div key={q} style={{ marginBottom: 16, background: "#f8f9fa", borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ fontWeight: 800, color: D, fontSize: 15, marginBottom: 8 }}>{q}</div>
                <div style={{ fontSize: 15, color: "#555", lineHeight: 1.7 }}>{a}</div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ background: D, borderRadius: 16, padding: "36px 32px", textAlign: "center" }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 0 10px" }}>Ready to get your cash offer?</h2>
            <p style={{ color: "#c8d0dc", fontSize: 15, marginBottom: 24 }}>No obligation. No repairs. No commissions. Jacob calls you within 1 hour.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`tel:${PHONE_RAW}`} aria-label="Call Jacob at Home-Link Realty Group" style={{ background: R, color: "#fff", padding: "16px 32px", borderRadius: 8, fontWeight: 900, textDecoration: "none", fontSize: 16, minHeight: 44, display: "flex", alignItems: "center" }}>
                Call Jacob: {PHONE}
              </a>
              <a href="/GetOffer" style={{ background: "rgba(255,255,255,.1)", color: "#fff", padding: "16px 28px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 16, minHeight: 44, display: "flex", alignItems: "center" }}>
                Submit My Property →
              </a>
            </div>
          </div>
        </div>
      </main>

      <TrustBadges />

      <footer style={{ background: "#111", color: "#bbb", padding: "20px 32px", textAlign: "center", fontSize: 11, lineHeight: 1.8 }}>
        © 2026 Home-Link Realty Group LLC · <a href={`tel:${PHONE_RAW}`} aria-label="Call Home-Link Realty Group" style={{ color: "#ccc", textDecoration: "none" }}>{PHONE}</a> · <a href="/Home" style={{ color: "#ccc", textDecoration: "none" }}>Home</a> · <a href="/Blog" style={{ color: "#ccc", textDecoration: "none" }}>Blog</a> · <a href="/Terms" style={{ color: "#ccc", textDecoration: "none" }}>Terms</a>
      </footer>
    </div>
  );
}
