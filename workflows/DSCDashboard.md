# DSCDashboard

Source: DSCDashboard.docx

import \{ useState, useEffect \} from "react";

import \{ base44 \} from "@/api/base44Client";

import \{ useEnterpriseSEO \} from "@/hooks/useEnterpriseSEO";

const NAVY = "\#0B1F45", GOLD = "\#D4A843";

// Categorize pages based on URL pattern

function categorize\(path\) \{

  if \(path === "/" || path === "/Home"\) return "Home";

  if \(path\.startsWith\("/SellHouse"\) || path === "/Dallas"\) return "City Landing";

  if \(path\.startsWith\("/Foreclosure"\) || path === "/DallasForeclosure"\) return "Foreclosure";

  if \(path\.startsWith\("/Inherited"\) || path === "/DallasInherited"\) return "Inherited";

  if \(path\.startsWith\("/article/"\) || path\.startsWith\("/blog/"\) || path === "/Blog"\) return "Blog";

  if \(path === "/GetOffer" || path === "/ThankYou"\) return "Conversion";

  if \(path === "/Cities" || path === "/Sitemap" || path === "/Terms" || path === "/PrivacyPolicy"\) return "Other Public";

  return "Other";

\}

const CATEGORY\_COLORS = \{

  "Home": "\#3498db",

  "City Landing": "\#27ae60",

  "Foreclosure": "\#e74c3c",

  "Inherited": "\#9b59b6",

  "Blog": "\#f39c12",

  "Conversion": GOLD,

  "Other Public": "\#95a5a6",

  "Other": "\#7f8c8d",

\};

export default function SearchConsoleDashboard\(\) \{

  const \[data, setData\] = useState\(null\);

  const \[loading, setLoading\] = useState\(true\);

  const \[error, setError\] = useState\(null\);

  const \[days, setDays\] = useState\(28\);

  const \[filter, setFilter\] = useState\("all"\);

  const \[sortBy, setSortBy\] = useState\("impressions"\);

  useEnterpriseSEO\(\{

    title: "Google Search Console Dashboard | Home\-Link Internal",

    description: "Internal — GSC performance dashboard\.",

    canonicalPath: "/SearchConsoleDashboard",

    noindex: true,

  \}\);

  useEffect\(\(\) => \{

    setLoading\(true\);

    setError\(null\);

    base44\.functions\.invoke\("getSearchConsoleData", \{ days \}\)

      \.then\(res => \{

        if \(res\.data?\.error\) setError\(res\.data\.error\);

        else setData\(res\.data\);

      \}\)

      \.catch\(e => setError\(e\.message\)\)

      \.finally\(\(\) => setLoading\(false\)\);

  \}, \[days\]\);

  const pages = \(data?\.pages || \[\]\)\.map\(p => \(\{ \.\.\.p, category: categorize\(p\.path\) \}\)\);

  const filteredPages = filter === "all" ? pages : pages\.filter\(p => p\.category === filter\);

  const sortedPages = \[\.\.\.filteredPages\]\.sort\(\(a, b\) => \{

    if \(sortBy === "impressions"\) return b\.impressions \- a\.impressions;

    if \(sortBy === "clicks"\) return b\.clicks \- a\.clicks;

    if \(sortBy === "ctr"\) return b\.ctr \- a\.ctr;

    if \(sortBy === "position"\) return a\.position \- b\.position;

    return 0;

  \}\);

  // Category breakdown

  const byCategory = pages\.reduce\(\(acc, p\) => \{

    if \(\!acc\[p\.category\]\) acc\[p\.category\] = \{ impressions: 0, clicks: 0, count: 0 \};

    acc\[p\.category\]\.impressions \+= p\.impressions;

    acc\[p\.category\]\.clicks \+= p\.clicks;

    acc\[p\.category\]\.count \+= 1;

    return acc;

  \}, \{\}\);

  const categories = Object\.keys\(byCategory\)\.sort\(\(a, b\) => byCategory\[b\]\.impressions \- byCategory\[a\]\.impressions\);

  const maxCatImpressions = Math\.max\(\.\.\.categories\.map\(c => byCategory\[c\]\.impressions\), 1\);

  return \(

    <div style=\{\{ fontFamily: "'Inter', \-apple\-system, sans\-serif", minHeight: "100vh", background: "\#f8f9fa", padding: "28px" \}\}>

      <div style=\{\{ maxWidth: 1400, margin: "0 auto" \}\}>

        \{/\* Header \*/\}

        <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 \}\}>

          <div>

            <h1 style=\{\{ fontSize: 26, fontWeight: 900, color: NAVY, margin: 0 \}\}>🔍 Google Search Console Dashboard</h1>

            <p style=\{\{ fontSize: 13, color: "\#666", marginTop: 4 \}\}>Live impression & click data for all public\-facing pages</p>

          </div>

          <div style=\{\{ display: "flex", gap: 8 \}\}>

            \{\[7, 28, 90\]\.map\(d => \(

              <button key=\{d\} onClick=\{\(\) => setDays\(d\)\}

                style=\{\{ background: days === d ? NAVY : "\#fff", color: days === d ? "\#fff" : NAVY, border: \`2px solid $\{NAVY\}\`, borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" \}\}>

                Last \{d\} days

              </button>

            \)\)\}

          </div>

        </div>

        \{loading && <div style=\{\{ background: "\#fff", borderRadius: 12, padding: 60, textAlign: "center", color: "\#888" \}\}>Loading Search Console data\.\.\.</div>\}

        \{error && \(

          <div style=\{\{ background: "\#fff3f3", border: "2px solid \#e74c3c", borderRadius: 12, padding: 24, color: "\#c0392b" \}\}>

            <div style=\{\{ fontWeight: 800, marginBottom: 8 \}\}>⚠️ Error</div>

            <div style=\{\{ fontSize: 13 \}\}>\{error\}</div>

            \{data?\.verifiedSites && \(

              <div style=\{\{ marginTop: 12, fontSize: 12 \}\}>

                <strong>Verified properties in your account:</strong>

                <ul>\{data\.verifiedSites\.map\(s => <li key=\{s\}>\{s\}</li>\)\}</ul>

              </div>

            \)\}

          </div>

        \)\}

        \{\!loading && \!error && data && \(

          <>

            \{/\* Site info \*/\}

            <div style=\{\{ background: "\#fff", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 12, color: "\#555" \}\}>

              📊 Property: <strong>\{data\.site\}</strong> · \{data\.startDate\} → \{data\.endDate\}

            </div>

            \{/\* Totals \*/\}

            <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fit, minmax\(200px, 1fr\)\)", gap: 14, marginBottom: 24 \}\}>

              \{\[

                \{ label: "Total Impressions", value: data\.totals\.impressions\.toLocaleString\(\), color: "\#3498db", icon: "👁️" \},

                \{ label: "Total Clicks", value: data\.totals\.clicks\.toLocaleString\(\), color: "\#27ae60", icon: "🖱️" \},

                \{ label: "Avg CTR", value: \(data\.totals\.ctr \* 100\)\.toFixed\(2\) \+ "%", color: GOLD, icon: "📊" \},

                \{ label: "Avg Position", value: data\.totals\.avgPosition\.toFixed\(1\), color: "\#9b59b6", icon: "📈" \},

                \{ label: "Pages Indexed", value: data\.pages\.length, color: NAVY, icon: "📄" \},

              \]\.map\(stat => \(

                <div key=\{stat\.label\} style=\{\{ background: "\#fff", borderRadius: 12, padding: 18, borderTop: \`4px solid $\{stat\.color\}\`, boxShadow: "0 1px 6px rgba\(0,0,0,0\.06\)" \}\}>

                  <div style=\{\{ fontSize: 11, color: "\#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 \}\}>\{stat\.icon\} \{stat\.label\}</div>

                  <div style=\{\{ fontSize: 26, fontWeight: 900, color: NAVY \}\}>\{stat\.value\}</div>

                </div>

              \)\)\}

            </div>

            \{/\* Category breakdown \*/\}

            <div style=\{\{ background: "\#fff", borderRadius: 12, padding: 22, marginBottom: 24, boxShadow: "0 1px 6px rgba\(0,0,0,0\.06\)" \}\}>

              <div style=\{\{ fontWeight: 800, fontSize: 15, color: NAVY, marginBottom: 16 \}\}>📁 Performance by Category</div>

              \{categories\.map\(cat => \{

                const c = byCategory\[cat\];

                const pct = \(c\.impressions / maxCatImpressions\) \* 100;

                return \(

                  <div key=\{cat\} style=\{\{ marginBottom: 12 \}\}>

                    <div style=\{\{ display: "flex", justifyContent: "space\-between", marginBottom: 4, fontSize: 12 \}\}>

                      <span style=\{\{ fontWeight: 700, color: NAVY \}\}>

                        <span style=\{\{ display: "inline\-block", width: 10, height: 10, borderRadius: 2, background: CATEGORY\_COLORS\[cat\], marginRight: 8 \}\} />

                        \{cat\} <span style=\{\{ color: "\#888", fontWeight: 400 \}\}>\(\{c\.count\} pages\)</span>

                      </span>

                      <span style=\{\{ color: "\#555" \}\}>

                        <strong>\{c\.impressions\.toLocaleString\(\)\}</strong> impressions · \{c\.clicks\.toLocaleString\(\)\} clicks

                      </span>

                    </div>

                    <div style=\{\{ height: 8, background: "\#f0f0f0", borderRadius: 4, overflow: "hidden" \}\}>

                      <div style=\{\{ width: \`$\{pct\}%\`, height: "100%", background: CATEGORY\_COLORS\[cat\], transition: "width 0\.4s" \}\} />

                    </div>

                  </div>

                \);

              \}\)\}

            </div>

            \{/\* Filters \*/\}

            <div style=\{\{ background: "\#fff", borderRadius: 12, padding: 16, marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" \}\}>

              <div style=\{\{ fontSize: 12, fontWeight: 700, color: "\#555" \}\}>FILTER:</div>

              <select value=\{filter\} onChange=\{e => setFilter\(e\.target\.value\)\}

                style=\{\{ padding: "8px 12px", border: "1\.5px solid \#ddd", borderRadius: 8, fontSize: 13 \}\}>

                <option value="all">All Categories \(\{pages\.length\} pages\)</option>

                \{categories\.map\(c => <option key=\{c\} value=\{c\}>\{c\} \(\{byCategory\[c\]\.count\}\)</option>\)\}

              </select>

              <div style=\{\{ fontSize: 12, fontWeight: 700, color: "\#555", marginLeft: 12 \}\}>SORT:</div>

              <select value=\{sortBy\} onChange=\{e => setSortBy\(e\.target\.value\)\}

                style=\{\{ padding: "8px 12px", border: "1\.5px solid \#ddd", borderRadius: 8, fontSize: 13 \}\}>

                <option value="impressions">Impressions ↓</option>

                <option value="clicks">Clicks ↓</option>

                <option value="ctr">CTR ↓</option>

                <option value="position">Position ↑ \(best first\)</option>

              </select>

            </div>

            \{/\* Page table \*/\}

            <div style=\{\{ background: "\#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 6px rgba\(0,0,0,0\.06\)" \}\}>

              <div style=\{\{ overflowX: "auto" \}\}>

                <table style=\{\{ width: "100%", borderCollapse: "collapse", fontSize: 13 \}\}>

                  <thead>

                    <tr style=\{\{ background: NAVY, color: "\#fff" \}\}>

                      <th style=\{\{ padding: "12px 16px", textAlign: "left", fontWeight: 700 \}\}>Page</th>

                      <th style=\{\{ padding: "12px 16px", textAlign: "left", fontWeight: 700, width: 120 \}\}>Category</th>

                      <th style=\{\{ padding: "12px 16px", textAlign: "right", fontWeight: 700 \}\}>Impressions</th>

                      <th style=\{\{ padding: "12px 16px", textAlign: "right", fontWeight: 700 \}\}>Clicks</th>

                      <th style=\{\{ padding: "12px 16px", textAlign: "right", fontWeight: 700 \}\}>CTR</th>

                      <th style=\{\{ padding: "12px 16px", textAlign: "right", fontWeight: 700 \}\}>Avg Position</th>

                    </tr>

                  </thead>

                  <tbody>

                    \{sortedPages\.length === 0 ? \(

                      <tr><td colSpan="6" style=\{\{ padding: 40, textAlign: "center", color: "\#888" \}\}>No data for this filter\.</td></tr>

                    \) : sortedPages\.map\(\(p, i\) => \(

                      <tr key=\{p\.url\} style=\{\{ borderBottom: "1px solid \#f0f0f0", background: i % 2 === 0 ? "\#fff" : "\#fafbfc" \}\}>

                        <td style=\{\{ padding: "10px 16px", color: NAVY, fontWeight: 600, fontSize: 12, maxWidth: 380, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" \}\}>

                          <a href=\{p\.path\} target="\_blank" rel="noopener noreferrer" style=\{\{ color: NAVY, textDecoration: "none" \}\}>\{p\.path\}</a>

                        </td>

                        <td style=\{\{ padding: "10px 16px" \}\}>

                          <span style=\{\{ background: CATEGORY\_COLORS\[p\.category\] \+ "20", color: CATEGORY\_COLORS\[p\.category\], fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10 \}\}>

                            \{p\.category\}

                          </span>

                        </td>

                        <td style=\{\{ padding: "10px 16px", textAlign: "right", fontWeight: 700, color: NAVY \}\}>\{p\.impressions\.toLocaleString\(\)\}</td>

                        <td style=\{\{ padding: "10px 16px", textAlign: "right", color: "\#27ae60", fontWeight: 600 \}\}>\{p\.clicks\.toLocaleString\(\)\}</td>

                        <td style=\{\{ padding: "10px 16px", textAlign: "right", color: p\.ctr > 0\.05 ? "\#27ae60" : "\#888" \}\}>\{\(p\.ctr \* 100\)\.toFixed\(2\)\}%</td>

                        <td style=\{\{ padding: "10px 16px", textAlign: "right", color: p\.position <= 10 ? "\#27ae60" : p\.position <= 30 ? GOLD : "\#888", fontWeight: 600 \}\}>\{p\.position\.toFixed\(1\)\}</td>

                      </tr>

                    \)\)\}

                  </tbody>

                </table>

              </div>

            </div>

            <div style=\{\{ fontSize: 11, color: "\#888", marginTop: 16, textAlign: "center" \}\}>

              Data from Google Search Console · Refreshes on page load · CTR colored green if &gt;5% · Position green if top 10

            </div>

          </>

        \)\}

      </div>

    </div>

  \);

\}
