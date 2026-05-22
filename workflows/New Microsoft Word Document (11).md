# New Microsoft Word Document (11)

Source: New Microsoft Word Document (11).docx

import React from "react";

/\*\*

 \* CityInsightsPanel — Auto\-generates strategic insights from city

 \* traffic comparison data\. Identifies winners, underperformers, and gaps\.

 \*/

export default function CityInsightsPanel\(\{ cities, summary \}\) \{

  // Cities with traffic but zero leads — leaking conversions

  const leaking = cities\.filter\(c => c\.sessions >= 20 && c\.leads === 0\)\.slice\(0, 3\);

  // Cities with high bounce rate \(>70%\) and meaningful traffic

  const highBounce = cities\.filter\(c => c\.sessions >= 20 && c\.bounceRate >= 70\)\.slice\(0, 3\);

  // Cities with zero traffic — opportunity to push SEO/ads

  const noTraffic = cities\.filter\(c => c\.sessions === 0\)\.slice\(0, 5\);

  // Best performers — high CVR

  const topConverters = cities\.filter\(c => c\.sessions >= 10 && c\.conversionRate >= 2\)\.slice\(0, 3\);

  const insights = \[\];

  if \(summary\.top\_performer\) \{

    insights\.push\(\{

      icon: "🏆", color: "\#10b981",

      title: \`$\{summary\.top\_performer\.city\} leads in traffic\`,

      body: \`$\{summary\.top\_performer\.sessions\.toLocaleString\(\)\} sessions — your strongest city\. Double down on this market with more content \+ ad spend\.\`,

    \}\);

  \}

  if \(summary\.best\_converter\) \{

    insights\.push\(\{

      icon: "💎", color: "\#7c3aed",

      title: \`$\{summary\.best\_converter\.city\} converts at $\{summary\.best\_converter\.rate\}%\`,

      body: \`Your highest\-converting city\. Study what's working here and replicate the playbook in other markets\.\`,

    \}\);

  \}

  if \(leaking\.length > 0\) \{

    insights\.push\(\{

      icon: "🚨", color: "\#ef4444",

      title: \`$\{leaking\.length\} $\{leaking\.length === 1 ? "city is" : "cities are"\} leaking conversions\`,

      body: \`$\{leaking\.map\(c => c\.city\)\.join\(", "\)\} — getting traffic but zero leads\. Likely a form or trust issue\. Audit these pages immediately\.\`,

    \}\);

  \}

  if \(highBounce\.length > 0\) \{

    insights\.push\(\{

      icon: "⚠️", color: "\#f59e0b",

      title: \`High bounce rate on $\{highBounce\.length\} $\{highBounce\.length === 1 ? "city" : "cities"\}\`,

      body: \`$\{highBounce\.map\(c => \`$\{c\.city\} \($\{c\.bounceRate\}%\)\`\)\.join\(", "\)\} — visitors leaving fast\. Improve hero, page speed, or relevance\.\`,

    \}\);

  \}

  if \(noTraffic\.length > 0\) \{

    insights\.push\(\{

      icon: "🌱", color: "\#6b7280",

      title: \`$\{summary\.no\_traffic\_cities\} cities have zero traffic\`,

      body: \`$\{noTraffic\.map\(c => c\.city\)\.join\(", "\)\}$\{summary\.no\_traffic\_cities > 5 ? "\.\.\." : ""\} — pages exist but invisible\. Need indexing, internal links, or backlinks\.\`,

    \}\);

  \}

  if \(topConverters\.length >= 2\) \{

    insights\.push\(\{

      icon: "📈", color: "\#0B1F45",

      title: \`Top converters share a pattern\`,

      body: \`$\{topConverters\.map\(c => \`$\{c\.city\} \($\{c\.conversionRate\}%\)\`\)\.join\(", "\)\} all convert above 2%\. Compare their copy \+ form structure for the winning formula\.\`,

    \}\);

  \}

  if \(insights\.length === 0\) \{

    return \(

      <div style=\{\{ background: "\#f9fafb", border: "1px solid \#e5e7eb", borderRadius: 12, padding: 24, textAlign: "center", color: "\#6b7280", fontSize: 13 \}\}>

        Not enough traffic data yet to generate insights\. Check back after city pages have been live for at least 7 days\.

      </div>

    \);

  \}

  return \(

    <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fit, minmax\(280px, 1fr\)\)", gap: 12, marginBottom: 20 \}\}>

      \{insights\.map\(\(ins, i\) => \(

        <div key=\{i\} style=\{\{

          background: "\#fff", border: "1px solid \#e5e7eb", borderLeft: \`4px solid $\{ins\.color\}\`,

          borderRadius: 8, padding: "14px 16px",

        \}\}>

          <div style=\{\{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 \}\}>

            <span style=\{\{ fontSize: 18 \}\}>\{ins\.icon\}</span>

            <div style=\{\{ fontWeight: 800, color: "\#111827", fontSize: 14 \}\}>\{ins\.title\}</div>

          </div>

          <div style=\{\{ fontSize: 12, color: "\#6b7280", lineHeight: 1\.6 \}\}>\{ins\.body\}</div>

        </div>

      \)\)\}

    </div>

  \);

\}
