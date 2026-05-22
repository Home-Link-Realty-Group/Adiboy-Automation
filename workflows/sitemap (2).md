# sitemap (2)

Source: sitemap (2).docx

import \{ useEffect, useState \} from "react";

import \{ base44 \} from "@/api/base44Client";

// ─── HOME\-LINK BRAND PALETTE ────────────────────────────────────────────────

const NAVY  = "\#0B1F45";

const GOLD  = "\#D4A843";

const WHITE = "\#FFFFFF";

// ─────────────────────────────────────────────────────────────────────────────

const BASE = "https://homelinkrealtygroup\.com";

// Public SEO pages — kept in sync with functions/dynamicSitemap\.js

const PUBLIC\_PAGES = \[

  // Core Money Pages — root "/" is canonical homepage

  \{ path: "/",                        label: "Home — Sell My House Fast",                    priority: "1\.0",  changefreq: "weekly",  category: "Core" \},

  \{ path: "/GetOffer",                label: "Get A Cash Offer Form",                        priority: "1\.0",  changefreq: "weekly",  category: "Core" \},

  \{ path: "/Cities",                  label: "Cities We Serve — All Locations",              priority: "0\.9",  changefreq: "monthly", category: "Core" \},

  \{ path: "/Blog",                    label: "Blog — Real Estate Tips & Guides",             priority: "0\.9",  changefreq: "weekly",  category: "Core" \},

  \{ path: "/SellerPortal",            label: "Seller Portal — Track Your Offer",             priority: "0\.7",  changefreq: "monthly", category: "Core" \},

  \{ path: "/ThankYou",                label: "Thank You / Confirmation Page",                priority: "0\.7",  changefreq: "monthly", category: "Core" \},

  \{ path: "/Sitemap",                 label: "HTML Sitemap",                                 priority: "0\.4",  changefreq: "monthly", category: "Core" \},

  \{ path: "/Terms",                   label: "Terms of Use",                                 priority: "0\.4",  changefreq: "yearly",  category: "Core" \},

  \{ path: "/PrivacyPolicy",           label: "Privacy Policy",                               priority: "0\.4",  changefreq: "yearly",  category: "Core" \},

  // Texas

  \{ path: "/Dallas",                  label: "Sell My House Fast Dallas TX",                 priority: "0\.9",  changefreq: "monthly", category: "Texas" \},

  \{ path: "/DallasForeclosure",       label: "Stop Foreclosure Dallas TX",                   priority: "0\.9",  changefreq: "monthly", category: "Texas" \},

  \{ path: "/DallasInherited",         label: "Sell Inherited House Dallas TX",               priority: "0\.9",  changefreq: "monthly", category: "Texas" \},

  \{ path: "/SellHouseDallas",         label: "Sell My House Fast Dallas TX",                 priority: "0\.9",  changefreq: "monthly", category: "Texas" \},

  \{ path: "/SellHouseHouston",        label: "Sell My House Fast Houston TX",                priority: "0\.88", changefreq: "monthly", category: "Texas" \},

  \{ path: "/SellHouseFortWorth",      label: "Sell My House Fast Fort Worth TX",             priority: "0\.88", changefreq: "monthly", category: "Texas" \},

  \{ path: "/SellHouseSanAntonio",     label: "Sell My House Fast San Antonio TX",            priority: "0\.88", changefreq: "monthly", category: "Texas" \},

  // Atlanta

  \{ path: "/SellHouseAtlanta",        label: "Sell My House Fast Atlanta GA",                priority: "0\.88", changefreq: "monthly", category: "Atlanta" \},

  \{ path: "/ForeclosureAtlanta",      label: "Stop Foreclosure Atlanta GA",                  priority: "0\.85", changefreq: "monthly", category: "Atlanta" \},

  \{ path: "/InheritedAtlanta",        label: "Sell Inherited House Atlanta GA",              priority: "0\.85", changefreq: "monthly", category: "Atlanta" \},

  // Midwest

  \{ path: "/SellHouseDetroit",        label: "Sell My House Fast Detroit MI",                priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/ForeclosureDetroit",      label: "Stop Foreclosure Detroit MI",                  priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/InheritedDetroit",        label: "Sell Inherited House Detroit MI",              priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/SellHouseCleveland",      label: "Sell My House Fast Cleveland OH",              priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/ForeclosureCleveland",    label: "Stop Foreclosure Cleveland OH",                priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/InheritedCleveland",      label: "Sell Inherited House Cleveland OH",            priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/SellHouseIndianapolis",   label: "Sell My House Fast Indianapolis IN",           priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/ForeclosureIndianapolis", label: "Stop Foreclosure Indianapolis IN",             priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/InheritedIndianapolis",   label: "Sell Inherited House Indianapolis IN",         priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/SellHouseStLouis",        label: "Sell My House Fast St\. Louis MO",              priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/ForeclosureStLouis",      label: "Stop Foreclosure St\. Louis MO",                priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/InheritedStLouis",        label: "Sell Inherited House St\. Louis MO",            priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/SellHouseColumbus",       label: "Sell My House Fast Columbus OH",               priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/SellHouseMilwaukee",      label: "Sell My House Fast Milwaukee WI",              priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/SellHouseKansasCity",     label: "Sell My House Fast Kansas City MO",            priority: "0\.85", changefreq: "monthly", category: "Midwest" \},

  \{ path: "/SellHouseChicago",        label: "Sell My House Fast Chicago IL",                priority: "0\.88", changefreq: "monthly", category: "Midwest" \},

  // Northeast

  \{ path: "/SellHousePhiladelphia",   label: "Sell My House Fast Philadelphia PA",           priority: "0\.88", changefreq: "monthly", category: "Northeast" \},

  \{ path: "/SellHousePittsburgh",     label: "Sell My House Fast Pittsburgh PA",             priority: "0\.85", changefreq: "monthly", category: "Northeast" \},

  // South

  \{ path: "/SellHouseMemphis",        label: "Sell My House Fast Memphis TN",                priority: "0\.85", changefreq: "monthly", category: "South" \},

  \{ path: "/ForeclosureMemphis",      label: "Stop Foreclosure Memphis TN",                  priority: "0\.85", changefreq: "monthly", category: "South" \},

  \{ path: "/InheritedMemphis",        label: "Sell Inherited House Memphis TN",              priority: "0\.85", changefreq: "monthly", category: "South" \},

  \{ path: "/SellHouseBaltimore",      label: "Sell My House Fast Baltimore MD",              priority: "0\.85", changefreq: "monthly", category: "South" \},

  \{ path: "/SellHouseJacksonville",   label: "Sell My House Fast Jacksonville FL",           priority: "0\.85", changefreq: "monthly", category: "South" \},

  \{ path: "/SellHouseOrlando",        label: "Sell My House Fast Orlando FL",                priority: "0\.88", changefreq: "monthly", category: "South" \},

  \{ path: "/SellHouseNashville",      label: "Sell My House Fast Nashville TN",              priority: "0\.88", changefreq: "monthly", category: "South" \},

  \{ path: "/SellHouseCharlotte",      label: "Sell My House Fast Charlotte NC",              priority: "0\.88", changefreq: "monthly", category: "South" \},

  \{ path: "/SellHouseLouisville",     label: "Sell My House Fast Louisville KY",             priority: "0\.85", changefreq: "monthly", category: "South" \},

  \{ path: "/SellHouseBatonRouge",     label: "Sell My House Fast Baton Rouge LA",            priority: "0\.85", changefreq: "monthly", category: "South" \},

  \{ path: "/SellHouseShreveport",     label: "Sell My House Fast Shreveport LA",             priority: "0\.85", changefreq: "monthly", category: "South" \},

  \{ path: "/SellHouseLittleRock",     label: "Sell My House Fast Little Rock AR",            priority: "0\.85", changefreq: "monthly", category: "South" \},

  \{ path: "/SellHouseBirmingham",     label: "Sell My House Fast Birmingham AL",             priority: "0\.85", changefreq: "monthly", category: "South" \},

  \{ path: "/SellHouseTulsa",          label: "Sell My House Fast Tulsa OK",                  priority: "0\.85", changefreq: "monthly", category: "South" \},

\];

// Internal/Admin pages — blocked in robots\.txt, NOT in sitemap

const BLOCKED\_PAGES = \[

  "/HQ", "/CRM", "/Dashboard", "/Accounting", "/AutomationAudit",

  "/AutomationCenter", "/CallGrade", "/CallLists", "/CallAnalyticsDashboard",

  "/Craigslist", "/CraigslistManager", "/ContentScheduler",

  "/DealAnalyzer", "/DealRoom", "/DirectMail", "/DocumentVault",

  "/ESign", "/EmailSignature", "/EnterprisePowerDialer",

  "/GBP", "/GBPManager", "/GrowthPlaybook",

  "/LeadImport", "/LeadScorer", "/ListBuilder", "/ListBuilderManual",

  "/ListStacker", "/MasterApp", "/MetaCampaign", "/OptimizationReport",

  "/OptimizationGuide", "/Performance", "/Playbook", "/PowerDialer",

  "/ProspectScraper", "/PunchList", "/RVM", "/ReferralEngine",

  "/SOP", "/SkipTraceUpload", "/SkipTracer", "/TestRecord", "/Tracker",

  "/VacantLeads", "/VirtualMailbox", "/BlogDashboard", "/BlogEditor",

  "/Calendar", "/ComplianceDashboard", "/CityIndex", "/SiteManager",

  "/DownloadCredibilityPacket", "/SEODashboard", "/SEODashboardPro",

  "/AuditReportExport", "/CodeBundleReport", "/BehaviorAnalytics",

  "/LeadPrioritizer", "/ProductivityHub", "/SEOCompetitorAnalysis",

\];

const categoryColor = \{

  Core:      \{ bg: "\#0B1F45", text: "\#D4A843" \},

  Texas:     \{ bg: "\#8B0000", text: "\#F0C86A" \},

  Atlanta:   \{ bg: "\#5D3A8B", text: "\#FFFFFF" \},

  Midwest:   \{ bg: "\#1a4a6c", text: "\#F0C86A" \},

  Northeast: \{ bg: "\#2c4a52", text: "\#F0C86A" \},

  South:     \{ bg: "\#2d5a27", text: "\#FFFFFF" \},

  Blog:      \{ bg: "\#163056", text: "\#FFFFFF" \},

\};

const today = new Date\(\)\.toISOString\(\)\.split\("T"\)\[0\];

export default function Sitemap\(\) \{

  const \[blogPosts, setBlogPosts\] = useState\(\[\]\);

  const \[loadingBlogs, setLoadingBlogs\] = useState\(true\);

  useEffect\(\(\) => \{

    document\.title = "Site Map | Home\-Link Realty Group LLC";

    const setMeta = \(n, c\) => \{

      let el = document\.querySelector\(\`meta\[name="$\{n\}"\]\`\);

      if \(\!el\) \{ el = document\.createElement\("meta"\); el\.setAttribute\("name", n\); document\.head\.appendChild\(el\); \}

      el\.setAttribute\("content", c\);

    \};

    setMeta\("robots", "index, follow"\);

    // Pull live blog posts from DB so HTML sitemap matches XML sitemap

    base44\.entities\.BlogPost\.filter\(\{ published: true \}\)

      \.then\(posts => \{

        setBlogPosts\(\(posts || \[\]\)\.filter\(p => p\.slug\)\);

      \}\)

      \.catch\(\(\) => setBlogPosts\(\[\]\)\)

      \.finally\(\(\) => setLoadingBlogs\(false\)\);

  \}, \[\]\);

  const grouped = PUBLIC\_PAGES\.reduce\(\(acc, p\) => \{

    if \(\!acc\[p\.category\]\) acc\[p\.category\] = \[\];

    acc\[p\.category\]\.push\(p\);

    return acc;

  \}, \{\}\);

  const totalIndexed = PUBLIC\_PAGES\.length \+ blogPosts\.length;

  return \(

    <div style=\{\{ fontFamily: "'Inter', sans\-serif", background: "\#f4f6fa", minHeight: "100vh", padding: "0 0 60px" \}\}>

      \{/\* Header \*/\}

      <div style=\{\{ background: NAVY, padding: "32px 24px 28px", textAlign: "center" \}\}>

        <div style=\{\{ fontSize: 13, color: GOLD, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 \}\}>

          Home\-Link Realty Group LLC

        </div>

        <h1 style=\{\{ color: WHITE, fontSize: 28, fontWeight: 900, margin: "0 0 8px" \}\}>Website Sitemap</h1>

        <p style=\{\{ color: "\#8fa8c8", fontSize: 14, margin: 0 \}\}>

          \{totalIndexed\} public pages indexed · \{PUBLIC\_PAGES\.length\} static \+ \{blogPosts\.length\} blog post\{blogPosts\.length === 1 ? "" : "s"\} · Last updated \{today\}

        </p>

      </div>

      <div style=\{\{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" \}\}>

        \{/\* Sitemap XML Download Info \*/\}

        <div style=\{\{ background: "\#fff3cd", border: "1px solid \#D4A843", borderRadius: 10, padding: "16px 20px", marginBottom: 28 \}\}>

          <div style=\{\{ fontWeight: 800, color: NAVY, marginBottom: 6 \}\}>📡 XML Sitemap Location</div>

          <code style=\{\{ fontSize: 13, color: "\#333", display: "block", marginBottom: 8 \}\}>

            \{BASE\}/sitemap\.xml

          </code>

          <div style=\{\{ fontSize: 13, color: "\#555" \}\}>

            Submit this URL in Google Search Console → Sitemaps → Add a new sitemap\. Pulls \{PUBLIC\_PAGES\.length\} static pages \+ all published blog posts dynamically from the database\.

          </div>

        </div>

        \{/\* robots\.txt Info \*/\}

        <div style=\{\{ background: "\#e8f4fd", border: "1px solid \#1a6fa8", borderRadius: 10, padding: "16px 20px", marginBottom: 32 \}\}>

          <div style=\{\{ fontWeight: 800, color: "\#0B1F45", marginBottom: 6 \}\}>🤖 robots\.txt Location</div>

          <code style=\{\{ fontSize: 13, color: "\#333", display: "block", marginBottom: 8 \}\}>

            \{BASE\}/robots\.txt

          </code>

          <div style=\{\{ fontSize: 13, color: "\#555" \}\}>

            Blocks \{BLOCKED\_PAGES\.length\}\+ internal/admin pages from Google\. Only public seller\-facing pages are crawlable\.

          </div>

        </div>

        \{/\* Public Pages by Category \*/\}

        \{Object\.entries\(grouped\)\.map\(\(\[cat, pages\]\) => \(

          <div key=\{cat\} style=\{\{ marginBottom: 32 \}\}>

            <div style=\{\{

              background: categoryColor\[cat\]?\.bg || NAVY,

              color: categoryColor\[cat\]?\.text || WHITE,

              padding: "10px 20px",

              borderRadius: "10px 10px 0 0",

              fontWeight: 800,

              fontSize: 14,

              letterSpacing: 1,

              textTransform: "uppercase",

              display: "flex",

              justifyContent: "space\-between",

              alignItems: "center",

            \}\}>

              <span>\{cat\} Pages</span>

              <span style=\{\{ fontSize: 12, opacity: 0\.8 \}\}>\{pages\.length\} page\{pages\.length > 1 ? "s" : ""\}</span>

            </div>

            <div style=\{\{ background: WHITE, borderRadius: "0 0 10px 10px", overflow: "hidden", boxShadow: "0 2px 12px rgba\(0,0,0,0\.07\)" \}\}>

              \{pages\.map\(\(p, i\) => \(

                <div key=\{p\.path\} style=\{\{

                  display: "grid",

                  gridTemplateColumns: "1fr auto auto",

                  gap: 16,

                  padding: "14px 20px",

                  borderBottom: i < pages\.length \- 1 ? "1px solid \#f0f2f6" : "none",

                  alignItems: "center",

                \}\}>

                  <div>

                    <a href=\{\`$\{BASE\}$\{p\.path\}\`\} target="\_blank" rel="noreferrer"

                      style=\{\{ color: NAVY, fontWeight: 700, fontSize: 14, textDecoration: "none" \}\}>

                      \{p\.label\}

                    </a>

                    <div style=\{\{ fontSize: 12, color: "\#888", marginTop: 2 \}\}>

                      \{BASE\}\{p\.path\}

                    </div>

                  </div>

                  <div style=\{\{ textAlign: "center" \}\}>

                    <div style=\{\{ fontSize: 11, color: "\#aaa", marginBottom: 2 \}\}>Priority</div>

                    <div style=\{\{

                      background: p\.priority === "1\.0" ? "\#d4edda" : parseFloat\(p\.priority\) >= 0\.8 ? "\#fff3cd" : "\#f8f9fa",

                      color:      p\.priority === "1\.0" ? "\#155724" : parseFloat\(p\.priority\) >= 0\.8 ? "\#856404" : "\#555",

                      padding: "3px 10px",

                      borderRadius: 20,

                      fontWeight: 700,

                      fontSize: 13,

                    \}\}>\{p\.priority\}</div>

                  </div>

                  <div style=\{\{ textAlign: "center" \}\}>

                    <div style=\{\{ fontSize: 11, color: "\#aaa", marginBottom: 2 \}\}>Update Freq</div>

                    <div style=\{\{ fontSize: 12, color: "\#555", fontWeight: 600 \}\}>\{p\.changefreq\}</div>

                  </div>

                </div>

              \)\)\}

            </div>

          </div>

        \)\)\}

        \{/\* Blog Posts \(live from DB\) \*/\}

        <div style=\{\{ marginBottom: 32 \}\}>

          <div style=\{\{

            background: categoryColor\.Blog\.bg,

            color: categoryColor\.Blog\.text,

            padding: "10px 20px",

            borderRadius: "10px 10px 0 0",

            fontWeight: 800,

            fontSize: 14,

            letterSpacing: 1,

            textTransform: "uppercase",

            display: "flex",

            justifyContent: "space\-between",

            alignItems: "center",

          \}\}>

            <span>Blog Articles \(Live from Database\)</span>

            <span style=\{\{ fontSize: 12, opacity: 0\.8 \}\}>

              \{loadingBlogs ? "Loading\.\.\." : \`$\{blogPosts\.length\} post$\{blogPosts\.length === 1 ? "" : "s"\}\`\}

            </span>

          </div>

          <div style=\{\{ background: WHITE, borderRadius: "0 0 10px 10px", overflow: "hidden", boxShadow: "0 2px 12px rgba\(0,0,0,0\.07\)" \}\}>

            \{loadingBlogs ? \(

              <div style=\{\{ padding: "20px", color: "\#888", textAlign: "center", fontSize: 13 \}\}>Loading blog posts\.\.\.</div>

            \) : blogPosts\.length === 0 ? \(

              <div style=\{\{ padding: "20px", color: "\#888", textAlign: "center", fontSize: 13 \}\}>No published blog posts\.</div>

            \) : \(

              blogPosts\.map\(\(post, i\) => \{

                const path = \`/article/$\{post\.slug\}\`;

                return \(

                  <div key=\{post\.id || post\.slug\} style=\{\{

                    display: "grid",

                    gridTemplateColumns: "1fr auto auto",

                    gap: 16,

                    padding: "14px 20px",

                    borderBottom: i < blogPosts\.length \- 1 ? "1px solid \#f0f2f6" : "none",

                    alignItems: "center",

                  \}\}>

                    <div>

                      <a href=\{\`$\{BASE\}$\{path\}\`\} target="\_blank" rel="noreferrer"

                        style=\{\{ color: NAVY, fontWeight: 700, fontSize: 14, textDecoration: "none" \}\}>

                        \{post\.title || post\.slug\}

                      </a>

                      <div style=\{\{ fontSize: 12, color: "\#888", marginTop: 2 \}\}>

                        \{BASE\}\{path\}

                      </div>

                    </div>

                    <div style=\{\{ textAlign: "center" \}\}>

                      <div style=\{\{ fontSize: 11, color: "\#aaa", marginBottom: 2 \}\}>Priority</div>

                      <div style=\{\{

                        background: "\#fff3cd",

                        color: "\#856404",

                        padding: "3px 10px",

                        borderRadius: 20,

                        fontWeight: 700,

                        fontSize: 13,

                      \}\}>0\.80</div>

                    </div>

                    <div style=\{\{ textAlign: "center" \}\}>

                      <div style=\{\{ fontSize: 11, color: "\#aaa", marginBottom: 2 \}\}>Update Freq</div>

                      <div style=\{\{ fontSize: 12, color: "\#555", fontWeight: 600 \}\}>monthly</div>

                    </div>

                  </div>

                \);

              \}\)

            \)\}

          </div>

        </div>

        \{/\* Blocked Pages List \*/\}

        <div style=\{\{ background: WHITE, borderRadius: 10, padding: "20px 24px", boxShadow: "0 2px 12px rgba\(0,0,0,0\.07\)", marginBottom: 28 \}\}>

          <div style=\{\{ fontWeight: 800, color: "\#c0392b", fontSize: 15, marginBottom: 12 \}\}>

            🚫 Blocked From Google \(\{BLOCKED\_PAGES\.length\} pages\)

          </div>

          <div style=\{\{ fontSize: 12, color: "\#666", marginBottom: 14 \}\}>

            These internal/admin pages are disallowed in robots\.txt\. Google will NOT index them\.

          </div>

          <div style=\{\{ display: "flex", flexWrap: "wrap", gap: 8 \}\}>

            \{BLOCKED\_PAGES\.map\(p => \(

              <span key=\{p\} style=\{\{

                background: "\#fdf2f2",

                color: "\#c0392b",

                border: "1px solid \#f5c6cb",

                borderRadius: 6,

                padding: "4px 10px",

                fontSize: 12,

                fontFamily: "monospace",

              \}\}>\{p\}</span>

            \)\)\}

          </div>

        </div>

        \{/\* GSC Instructions \*/\}

        <div style=\{\{ background: NAVY, borderRadius: 10, padding: "24px 28px", color: WHITE \}\}>

          <div style=\{\{ fontSize: 16, fontWeight: 800, color: GOLD, marginBottom: 14 \}\}>

            📋 Google Search Console — Submission Steps

          </div>

          \{\[

            \["1\.", \`Go to GSC → Sitemaps → paste: $\{BASE\}/sitemap\.xml → Submit\`\],

            \["2\.", "Go to GSC → Settings → Crawl Stats — confirm robots\.txt is being read"\],

            \["3\.", \`Request indexing for top money pages using URL Inspection \(start with /, /GetOffer, /Cities, top city pages\)\`\],

            \["4\.", \`Priority order: / → /GetOffer → /Cities → /Dallas → /DallasForeclosure → /DallasInherited → /Blog → all city pages\`\],

            \["5\.", "Check back in 24–48h for crawl confirmation"\],

            \["6\.", "GSC → Core Web Vitals → verify LCP < 2\.5s, CLS < 0\.1, INP < 200ms on both Mobile and Desktop"\],

            \["7\.", "GSC → Enhancements → confirm FAQ rich results, Breadcrumbs, and Sitelinks are detected"\],

          \]\.map\(\(\[n, t\]\) => \(

            <div key=\{n\} style=\{\{ display: "flex", gap: 12, marginBottom: 10 \}\}>

              <span style=\{\{ color: GOLD, fontWeight: 900, minWidth: 24 \}\}>\{n\}</span>

              <span style=\{\{ color: "\#c8d8f0", fontSize: 14 \}\}>\{t\}</span>

            </div>

          \)\)\}

        </div>

      </div>

    </div>

  \);

\}
