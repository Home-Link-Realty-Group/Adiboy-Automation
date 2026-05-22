# privacypolicy

Source: privacypolicy.docx

import { useEffect } from "react";

import SiteNav from "@/components/SiteNav";

import TrustBadges from "@/components/TrustBadges";

import { setCanonicalUrl } from "@/lib/seoHelpers";

const PHONE = "(855) 810-1786";

const EMAIL = "jacob.levy@homelinkrealtygroup.com";

const COMPANY = "Home-Link Realty Group LLC";

const SITE = "https://homelinkrealtygroup.com";

export default function PrivacyPolicy() {

  useEffect(() => {

    setCanonicalUrl("/PrivacyPolicy");

    document.title = "Privacy Policy | Home-Link Realty Group LLC";

    const setMeta = (name, content, prop = false) => {

      const attr = prop ? "property" : "name";

      let el = document.querySelector(`meta[${attr}="${name}"]`);

      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }

      el.setAttribute("content", content);

    };

    setMeta("description", "Privacy Policy for Home-Link Realty Group LLC. Learn how we collect, use, and protect your personal information, plus your CCPA rights as a California resident.");

    setMeta("robots", "index, follow");

    setMeta("og:title", "Privacy Policy | Home-Link Realty Group LLC", true);

    setMeta("og:description", "How we collect, use, and protect your personal information. Includes CCPA rights for California residents.", true);

    setMeta("og:type", "website", true);

    setMeta("og:url", `${SITE}/PrivacyPolicy`, true);

    const schemaId = "schema-privacy";

    if (!document.getElementById(schemaId)) {

      const sc = document.createElement("script");

      sc.type = "application/ld+json"; sc.id = schemaId;

      sc.text = JSON.stringify({

        "@context": "https://schema.org",

        "@type": "WebPage",

        "name": "Privacy Policy — Home-Link Realty Group LLC",

        "url": `${SITE}/PrivacyPolicy`,

        "breadcrumb": {

          "@type": "BreadcrumbList",

          "itemListElement": [

            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE}/` },

            { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": `${SITE}/PrivacyPolicy` }

          ]

        }

      });

      document.head.appendChild(sc);

    }

  }, []);

  const h2 = { fontSize: 20, color: "#0B1F45", marginBottom: 12, marginTop: 32 };

  const p = { lineHeight: 1.8, fontSize: 15, color: "#333" };

  const ul = { lineHeight: 1.8, fontSize: 15, paddingLeft: 24, color: "#333" };

  return (

    <div style={{ fontFamily: "Georgia, serif", color: "#222", background: "#fff" }}>

      <a href="#main-content" style={{position:"absolute",left:"-9999px",top:"auto",width:"1px",height:"1px",overflow:"hidden",zIndex:9999,background:"#D4A843",color:"#fff",padding:"8px 16px",borderRadius:"0 0 4px 4px",fontWeight:700,textDecoration:"none"}} onFocus={e=>{e.target.style.left="0";e.target.style.width="auto";e.target.style.height="auto"}} onBlur={e=>{e.target.style.left="-9999px";e.target.style.width="1px";e.target.style.height="1px"}}>Skip to main content</a>

      <SiteNav activePage="privacy" />

      <main id="main-content" style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>

        <div style={{ textAlign: "center", marginBottom: 40 }}>

          <h1 style={{ fontSize: 28, fontWeight: "bold", color: "#0B1F45" }}>Privacy Policy</h1>

          <p style={{ color: "#666", fontSize: 14 }}>{COMPANY}</p>

          <p style={{ color: "#666", fontSize: 14 }}>Last Updated: April 25, 2026</p>

        </div>

        <section>

          <h2 style={h2}>1. Introduction</h2>

          <p style={p}>

            {COMPANY} ("Company," "we," "us," or "our") respects your privacy and is committed to protecting it through this Privacy Policy. This Policy describes how we collect, use, disclose, and safeguard the information you provide when you visit our website at {SITE} or interact with our services.

          </p>

        </section>

        <section>

          <h2 style={h2}>2. Information We Collect</h2>

          <p style={p}><strong>Information you provide to us:</strong></p>

          <ul style={ul}>

            <li>Name, phone number, email address</li>

            <li>Property address and details (condition, situation, timeline)</li>

            <li>Communications you send us (messages, voicemails, emails)</li>

          </ul>

          <p style={{ ...p, marginTop: 12 }}><strong>Information collected automatically:</strong></p>

          <ul style={ul}>

            <li>IP address, browser type, device information</li>

            <li>Pages visited, time on site, click behavior (via Google Analytics, Meta Pixel)</li>

            <li>Cookies and similar tracking technologies</li>

            <li>TrustedForm certificate (for TCPA consent verification)</li>

          </ul>

        </section>

        <section>

          <h2 style={h2}>3. How We Use Your Information</h2>

          <ul style={ul}>

            <li>Evaluate your property and prepare cash offers</li>

            <li>Communicate with you about your inquiry (calls, texts, emails)</li>

            <li>Process transactions and complete property purchases</li>

            <li>Improve our website, services, and marketing</li>

            <li>Comply with legal obligations and TCPA recordkeeping</li>

            <li>Prevent fraud and protect our rights</li>

          </ul>

        </section>

        <section>

          <h2 style={h2}>4. How We Share Your Information</h2>

          <p style={p}>We <strong>do not sell</strong> your personal information. We may share information with:</p>

          <ul style={ul}>

            <li><strong>Service providers:</strong> Title companies, attorneys, escrow agents, contractors needed to complete transactions</li>

            <li><strong>Analytics partners:</strong> Google Analytics, Meta Pixel (in aggregated, non-identifying form)</li>

            <li><strong>Legal compliance:</strong> When required by law, subpoena, or to protect rights</li>

            <li><strong>Business transfers:</strong> In the event of a merger or acquisition</li>

          </ul>

        </section>

        <section>

          <h2 style={h2}>5. Cookies and Tracking</h2>

          <p style={p}>

            We use cookies, pixels, and tracking scripts (including Google Analytics, Google Ads, and Meta Pixel) to understand visitor behavior and improve our services. You can disable cookies in your browser settings, though some features may not function properly.

          </p>

        </section>

        <section>

          <h2 style={h2}>6. California Residents — CCPA Rights</h2>

          <p style={p}>

            If you are a California resident, the California Consumer Privacy Act (CCPA) grants you the following rights:

          </p>

          <ul style={ul}>

            <li><strong>Right to Know:</strong> Request what personal information we collect, use, and disclose about you</li>

            <li><strong>Right to Delete:</strong> Request deletion of your personal information (subject to legal exceptions)</li>

            <li><strong>Right to Opt-Out of Sale:</strong> We do not sell your personal information, but you may confirm this preference at any time</li>

            <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any CCPA right</li>

            <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information</li>

          </ul>

          <p style={{ ...p, marginTop: 12 }}>

            To exercise any of these rights, email <a href={`mailto:${EMAIL}`} style={{ color: "#D4A843", fontWeight: 700 }}>{EMAIL}</a> or call <a href="tel:+18558101786" style={{ color: "#D4A843", fontWeight: 700 }}>{PHONE}</a> with the subject line "CCPA Request." We will verify your identity and respond within 45 days.

          </p>

          <p style={{ ...p, marginTop: 12 }}>

            <strong>"Do Not Sell or Share My Personal Information":</strong> Email us at <a href={`mailto:${EMAIL}`} style={{ color: "#D4A843", fontWeight: 700 }}>{EMAIL}</a> with the subject line "Do Not Sell" and we will honor your request.

          </p>

        </section>

        <section>

          <h2 style={h2}>7. Data Security</h2>

          <p style={p}>

            We implement reasonable security measures including encryption, access controls, and secure servers to protect your information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.

          </p>

        </section>

        <section>

          <h2 style={h2}>8. Data Retention</h2>

          <p style={p}>

            We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations (including TCPA recordkeeping requirements of 4+ years), resolve disputes, and enforce our agreements.

          </p>

        </section>

        <section>

          <h2 style={h2}>9. Children's Privacy</h2>

          <p style={p}>

            Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If we learn we have collected information from a minor, we will delete it.

          </p>

        </section>

        <section>

          <h2 style={h2}>10. Third-Party Links</h2>

          <p style={p}>

            Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites. Please review their privacy policies separately.

          </p>

        </section>

        <section>

          <h2 style={h2}>11. Changes to This Policy</h2>

          <p style={p}>

            We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated "Last Updated" date. Continued use of our services after changes constitutes acceptance.

          </p>

        </section>

        <section>

          <h2 style={h2}>12. Contact Us</h2>

          <p style={p}>

            For privacy questions or to exercise your rights:<br /><br />

            <strong>{COMPANY}</strong><br />

            Phone: <a href="tel:+18558101786" style={{ color: "#D4A843" }}>{PHONE}</a><br />

            Email: <a href={`mailto:${EMAIL}`} style={{ color: "#D4A843" }}>{EMAIL}</a>

          </p>

        </section>

        <div style={{ borderTop: "1px solid #ddd", paddingTop: 24, marginTop: 40, textAlign: "center", color: "#999", fontSize: 13 }}>

          © 2026 {COMPANY}. All rights reserved.

        </div>

      </main>

      <TrustBadges />

    </div>

  );

}
