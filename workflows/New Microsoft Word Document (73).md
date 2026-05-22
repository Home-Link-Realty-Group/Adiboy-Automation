# New Microsoft Word Document (73)

Source: New Microsoft Word Document (73).docx

import \{ Link \} from "react\-router\-dom";

const rgba = \(hex, a = 1\) => \{

  const r = parseInt\(hex\.slice\(1, 3\), 16\);

  const g = parseInt\(hex\.slice\(3, 5\), 16\);

  const b = parseInt\(hex\.slice\(5, 7\), 16\);

  return \`rgba\($\{r\},$\{g\},$\{b\},$\{a\}\)\`;

\};

const SectionTitle = \(\{ icon, title, sub \}\) => \(

  <div style=\{\{ marginBottom: 16 \}\}>

    <h2 style=\{\{ color: "\#f1f5f9", fontSize: 17, fontWeight: 800, margin: 0, display: "flex", alignItems: "center", gap: 8 \}\}><span>\{icon\}</span>\{title\}</h2>

    \{sub && <p style=\{\{ color: "\#334155", fontSize: 12, margin: "3px 0 0 26px" \}\}>\{sub\}</p>\}

  </div>

\);

export default function IntelligenceTab\(\{ leads, hotLeads, dueToday, overdue, pipelineValue, activeDeals, totalRevenue, closedDeals, subscribers, totalCalls7, totalContacts7, totalOffers7, totalTalk7, newLeads, contacted, offerOut, underContract, recentFollowUps, completedFU, fuCompletionRate, avgMotivationScore, scoredLeads, topSources, last7kpi, setTab, GOALS \}\) \{

  const thisMonthLeads = leads\.filter\(l => l\.created\_date?\.startsWith\(new Date\(\)\.toISOString\(\)\.slice\(0, 7\)\)\);

  return \(

    <div style=\{\{ animation: "slide 0\.3s ease" \}\}>

      <SectionTitle icon="🧠" title="Command Intelligence" sub="Live system monitoring — every channel, every automation, all in one view" />

      \{/\* Quick\-launch row \*/\}

      <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(6, 1fr\)", gap: 10, marginBottom: 24 \}\}>

        \{\[

          \{ icon: "🎓", label: "Call Grade AI", path: "/CallGrade", color: "\#D4A843" \},

          \{ icon: "🎙️", label: "RVM Center",    path: "/RVM",       color: "\#7c3aed" \},

          \{ icon: "📬", label: "Direct Mail",   path: "/DirectMail",color: "\#d97706" \},

          \{ icon: "🏆", label: "Performance",   path: "/Performance",color: "\#16a34a" \},

          \{ icon: "💼", label: "Accounting",    path: "/Accounting", color: "\#2563eb" \},

          \{ icon: "⚡", label: "Automations",   path: "/AutomationCenter", color: "\#06b6d4" \},

        \]\.map\(t => \(

          <a key=\{t\.label\} href=\{t\.path\}

            style=\{\{ textDecoration: "none", background: "\#0d1520", border: \`1px solid $\{rgba\(t\.color, 0\.25\)\}\`, borderRadius: 10, padding: "14px 10px", textAlign: "center", display: "block" \}\}

            onMouseEnter=\{e => \{ e\.currentTarget\.style\.background = rgba\(t\.color, 0\.08\); e\.currentTarget\.style\.borderColor = t\.color; \}\}

            onMouseLeave=\{e => \{ e\.currentTarget\.style\.background = "\#0d1520"; e\.currentTarget\.style\.borderColor = rgba\(t\.color, 0\.25\); \}\}>

            <div style=\{\{ fontSize: 22, marginBottom: 5 \}\}>\{t\.icon\}</div>

            <div style=\{\{ fontSize: 11, fontWeight: 700, color: "\#f1f5f9" \}\}>\{t\.label\}</div>

          </a>

        \)\)\}

      </div>

      \{/\* Live CRM Metrics Strip \*/\}

      <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(6, 1fr\)", gap: 12, marginBottom: 20 \}\}>

        \{\[

          \{ icon: "👥", label: "Total Leads",      value: leads\.length,                           sub: \`\+$\{thisMonthLeads\.length\} this month\`, color: "\#3b82f6" \},

          \{ icon: "🔥", label: "Hot Leads",         value: hotLeads\.length,                        sub: "Priority HIGH",                        color: "\#f59e0b" \},

          \{ icon: "📞", label: "Follow\-Ups Today",  value: dueToday\.length,                        sub: overdue\.length ? \`$\{overdue\.length\} overdue\` : "On track", color: overdue\.length ? "\#ef4444" : "\#06b6d4" \},

          \{ icon: "💰", label: "Pipeline Value",    value: \`$$\{\(pipelineValue/1000\)\.toFixed\(0\)\}k\`, sub: \`$\{activeDeals\.length\} active deals\`,  color: "\#a855f7" \},

          \{ icon: "✅", label: "Revenue Closed",    value: \`$$\{\(totalRevenue/1000\)\.toFixed\(0\)\}k\`,  sub: \`$\{closedDeals\.length\} deals\`,         color: "\#22c55e" \},

          \{ icon: "📬", label: "Subscribers",       value: subscribers\.length,                     sub: "Email list",                          color: "\#f97316" \},

        \]\.map\(\(m, i\) => \(

          <div key=\{i\} style=\{\{ background: "\#0d1520", border: \`1px solid $\{rgba\(m\.color, 0\.25\)\}\`, borderRadius: 12, padding: "14px 12px", textAlign: "center" \}\}>

            <div style=\{\{ fontSize: 20, marginBottom: 4 \}\}>\{m\.icon\}</div>

            <div style=\{\{ fontSize: 22, fontWeight: 900, color: m\.color \}\}>\{m\.value\}</div>

            <div style=\{\{ fontSize: 10, color: "\#f1f5f9", fontWeight: 700, marginTop: 3 \}\}>\{m\.label\}</div>

            <div style=\{\{ fontSize: 9, color: "\#475569", marginTop: 2 \}\}>\{m\.sub\}</div>

          </div>

        \)\)\}

      </div>

      \{/\* 7\-Day KPI Summary \*/\}

      <div style=\{\{ background: "\#0d1520", border: "1px solid \#0B1F45", borderRadius: 14, padding: "18px 20px", marginBottom: 20 \}\}>

        <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 14 \}\}>

          <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 13 \}\}>📈 Last 7 Days — KPI Summary</div>

          <button onClick=\{\(\) => setTab\("kpi"\)\} style=\{\{ background: "none", border: "1px solid \#0B1F45", color: "\#475569", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer" \}\}>Full KPI →</button>

        </div>

        <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(4, 1fr\)", gap: 12 \}\}>

          \{\[

            \{ icon: "📞", label: "Calls Made",      value: totalCalls7,            goal: GOALS\.calls \* 7,    color: "\#3b82f6" \},

            \{ icon: "🤝", label: "Contacts",        value: totalContacts7,          goal: GOALS\.contacts \* 7, color: "\#22c55e" \},

            \{ icon: "💰", label: "Offers Made",     value: totalOffers7,            goal: GOALS\.offers \* 7,   color: "\#a855f7" \},

            \{ icon: "⏱️", label: "Talk Time \(hrs\)", value: totalTalk7\.toFixed\(1\),   goal: GOALS\.talk \* 7,     color: "\#f59e0b" \},

          \]\.map\(\(m, i\) => \{

            const pct = Math\.min\(100, Math\.round\(\(parseFloat\(m\.value\) / m\.goal\) \* 100\)\);

            const barColor = pct >= 100 ? "\#22c55e" : pct >= 60 ? "\#f59e0b" : "\#ef4444";

            return \(

              <div key=\{i\} style=\{\{ background: "\#0a111e", borderRadius: 10, padding: "12px 14px" \}\}>

                <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 6 \}\}>

                  <span style=\{\{ fontSize: 11, color: "\#475569", fontWeight: 700 \}\}>\{m\.icon\} \{m\.label\}</span>

                  <span style=\{\{ fontSize: 9, color: "\#475569" \}\}>Goal: \{m\.goal\}</span>

                </div>

                <div style=\{\{ fontSize: 24, fontWeight: 900, color: m\.color, marginBottom: 6 \}\}>\{m\.value\}</div>

                <div style=\{\{ height: 4, background: "\#0B1F45", borderRadius: 4, overflow: "hidden" \}\}>

                  <div style=\{\{ height: "100%", width: \`$\{pct\}%\`, background: barColor, borderRadius: 4, transition: "width 0\.5s ease" \}\} />

                </div>

                <div style=\{\{ fontSize: 9, color: barColor, marginTop: 3, fontWeight: 700 \}\}>\{pct\}% of weekly goal</div>

              </div>

            \);

          \}\)\}

        </div>

      </div>

      \{/\* Pipeline Health \*/\}

      <div style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 \}\}>

        <div style=\{\{ background: "\#0d1520", border: "1px solid \#0B1F45", borderRadius: 12, padding: "16px 18px" \}\}>

          <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 12, marginBottom: 12 \}\}>🔄 Pipeline Stages</div>

          \{\[

            \{ label: "New",            count: newLeads\.length,      color: "\#3b82f6" \},

            \{ label: "Contacted",      count: contacted\.length,     color: "\#06b6d4" \},

            \{ label: "Offer Made",     count: offerOut\.length,      color: "\#a855f7" \},

            \{ label: "Under Contract", count: underContract\.length, color: "\#f59e0b" \},

            \{ label: "Closed",         count: closedDeals\.length,   color: "\#22c55e" \},

          \]\.map\(\(s, i\) => \{

            const max = Math\.max\(newLeads\.length, contacted\.length, offerOut\.length, underContract\.length, closedDeals\.length, 1\);

            return \(

              <div key=\{i\} style=\{\{ marginBottom: 8 \}\}>

                <div style=\{\{ display: "flex", justifyContent: "space\-between", marginBottom: 3 \}\}>

                  <span style=\{\{ fontSize: 11, color: "\#475569" \}\}>\{s\.label\}</span>

                  <span style=\{\{ fontSize: 11, fontWeight: 700, color: s\.color \}\}>\{s\.count\}</span>

                </div>

                <div style=\{\{ height: 4, background: "\#0a111e", borderRadius: 4, overflow: "hidden" \}\}>

                  <div style=\{\{ height: "100%", width: \`$\{Math\.round\(\(s\.count / max\) \* 100\)\}%\`, background: s\.color, borderRadius: 4 \}\} />

                </div>

              </div>

            \);

          \}\)\}

        </div>

        <div style=\{\{ background: "\#0d1520", border: "1px solid \#0B1F45", borderRadius: 12, padding: "16px 18px" \}\}>

          <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 12, marginBottom: 12 \}\}>📋 Follow\-Up Health \(30d\)</div>

          <div style=\{\{ textAlign: "center", marginBottom: 12 \}\}>

            <div style=\{\{ fontSize: 36, fontWeight: 900, color: fuCompletionRate >= 70 ? "\#22c55e" : fuCompletionRate >= 40 ? "\#f59e0b" : "\#ef4444" \}\}>\{fuCompletionRate\}%</div>

            <div style=\{\{ fontSize: 11, color: "\#475569" \}\}>Completion Rate</div>

          </div>

          \{\[

            \{ label: "Total Scheduled", value: recentFollowUps\.length, color: "\#94a3b8" \},

            \{ label: "Completed",        value: completedFU\.length,    color: "\#22c55e" \},

            \{ label: "Pending Today",    value: dueToday\.length,       color: "\#3b82f6" \},

            \{ label: "Overdue",          value: overdue\.length,        color: overdue\.length > 0 ? "\#ef4444" : "\#475569" \},

          \]\.map\(\(r, i\) => \(

            <div key=\{i\} style=\{\{ display: "flex", justifyContent: "space\-between", fontSize: 12, marginBottom: 4 \}\}>

              <span style=\{\{ color: "\#475569" \}\}>\{r\.label\}</span>

              <span style=\{\{ fontWeight: 700, color: r\.color \}\}>\{r\.value\}</span>

            </div>

          \)\)\}

        </div>

        <div style=\{\{ background: "\#0d1520", border: "1px solid \#0B1F45", borderRadius: 12, padding: "16px 18px" \}\}>

          <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 12, marginBottom: 12 \}\}>🏆 Lead Quality</div>

          <div style=\{\{ textAlign: "center", marginBottom: 12 \}\}>

            <div style=\{\{ fontSize: 36, fontWeight: 900, color: "\#f59e0b" \}\}>\{avgMotivationScore\}<span style=\{\{ fontSize: 14, color: "\#475569" \}\}>/20</span></div>

            <div style=\{\{ fontSize: 11, color: "\#475569" \}\}>Avg Motivation Score</div>

          </div>

          \{\[

            \{ label: "Must Sell \(16\-20\)", value: leads\.filter\(l => \(l\.motivation\_total\_score||0\) >= 16\)\.length, color: "\#ef4444" \},

            \{ label: "High \(11\-15\)",       value: leads\.filter\(l => \(l\.motivation\_total\_score||0\) >= 11 && \(l\.motivation\_total\_score||0\) < 16\)\.length, color: "\#f59e0b" \},

            \{ label: "Medium \(6\-10\)",      value: leads\.filter\(l => \(l\.motivation\_total\_score||0\) >= 6  && \(l\.motivation\_total\_score||0\) < 11\)\.length, color: "\#3b82f6" \},

            \{ label: "Scored Leads",       value: scoredLeads\.length, color: "\#94a3b8" \},

          \]\.map\(\(r, i\) => \(

            <div key=\{i\} style=\{\{ display: "flex", justifyContent: "space\-between", fontSize: 12, marginBottom: 4 \}\}>

              <span style=\{\{ color: "\#475569" \}\}>\{r\.label\}</span>

              <span style=\{\{ fontWeight: 700, color: r\.color \}\}>\{r\.value\}</span>

            </div>

          \)\)\}

        </div>

      </div>

      \{/\* Lead Source Breakdown \*/\}

      <div style=\{\{ background: "\#0d1520", border: "1px solid \#0B1F45", borderRadius: 14, padding: "18px 20px", marginBottom: 20 \}\}>

        <div style=\{\{ fontWeight: 800, color: "\#f1f5f9", fontSize: 13, marginBottom: 14 \}\}>📡 Lead Source Breakdown</div>

        \{topSources\.length === 0 ? \(

          <div style=\{\{ color: "\#475569", fontSize: 13 \}\}>No leads yet — sources will populate as leads come in\.</div>

        \) : \(

          <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fill, minmax\(180px, 1fr\)\)", gap: 10 \}\}>

            \{topSources\.map\(\(\[src, count\], i\) => \{

              const colors = \["\#22c55e","\#3b82f6","\#f59e0b","\#a855f7","\#ef4444"\];

              const pct = Math\.round\(\(count / leads\.length\) \* 100\);

              return \(

                <div key=\{i\} style=\{\{ background: "\#0a111e", borderRadius: 10, padding: "12px 14px" \}\}>

                  <div style=\{\{ fontSize: 12, fontWeight: 700, color: "\#f1f5f9", marginBottom: 6 \}\}>\{src\}</div>

                  <div style=\{\{ height: 4, background: "\#0B1F45", borderRadius: 4, marginBottom: 6, overflow: "hidden" \}\}>

                    <div style=\{\{ height: "100%", width: \`$\{pct\}%\`, background: colors\[i % colors\.length\], borderRadius: 4 \}\} />

                  </div>

                  <div style=\{\{ display: "flex", justifyContent: "space\-between" \}\}>

                    <span style=\{\{ fontSize: 16, fontWeight: 900, color: colors\[i % colors\.length\] \}\}>\{count\}</span>

                    <span style=\{\{ fontSize: 10, color: "\#475569" \}\}>\{pct\}%</span>

                  </div>

                </div>

              \);

            \}\)\}

          </div>

        \)\}

      </div>

      \{/\* Automation Status \*/\}

      <SectionTitle icon="⚡" title="Automation Status" sub="All active automations — click to manage" />

      <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(3, 1fr\)", gap: 12, marginBottom: 24 \}\}>

        \{\[

          \{ name: "Auto 15\-Touch — New Lead", status: "active", icon: "🔄", color: "\#16a34a", desc: "Fires on every Lead\.create event" \},

          \{ name: "RVM Auto\-Drop — 10 AM CT", status: "active", icon: "🎙️", color: "\#7c3aed", desc: "Executes all RVM touches daily" \},

          \{ name: "Daily Master Report — 8 AM", status: "paused", icon: "📊", color: "\#d97706", desc: "Morning briefing email \+ SMS" \},

          \{ name: "Facebook Lead Sync — 15min", status: "paused", icon: "📘", color: "\#1877f2", desc: "Polls Meta Lead Ads for new leads" \},

          \{ name: "Meta CAPI — Lead Event",    status: "paused", icon: "💰", color: "\#d97706", desc: "Server\-side pixel on new lead" \},

          \{ name: "Google Review — Deal Close", status: "paused", icon: "⭐", color: "\#f59e0b", desc: "Review request on deal closed" \},

        \]\.map\(a => \(

          <a key=\{a\.name\} href="/AutomationCenter" style=\{\{ textDecoration: "none" \}\}>

            <div style=\{\{ background: "\#0d1520", border: \`1px solid $\{rgba\(a\.color, 0\.2\)\}\`, borderRadius: 10, padding: 14 \}\}>

              <div style=\{\{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 \}\}>

                <span style=\{\{ fontSize: 16 \}\}>\{a\.icon\}</span>

                <span style=\{\{ fontSize: 12, fontWeight: 700, color: "\#f1f5f9", flex: 1 \}\}>\{a\.name\}</span>

                <span style=\{\{ background: a\.status === "active" ? "\#16a34a20" : "\#1e3a5f", color: a\.status === "active" ? "\#4ade80" : "\#3d5570", borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 700 \}\}>

                  \{a\.status === "active" ? "● ON" : "○ OFF"\}

                </span>

              </div>

              <div style=\{\{ fontSize: 11, color: "\#3d5570" \}\}>\{a\.desc\}</div>

            </div>

          </a>

        \)\)\}

      </div>

      \{/\* Channel Health \*/\}

      <SectionTitle icon="📡" title="Channel Health" sub="All outbound & inbound channels" />

      <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(4, 1fr\)", gap: 12 \}\}>

        \{\[

          \{ icon: "📞", label: "Twilio Voice",          status: "Connected",   sub: "\(855\) 810\-1786",                    color: "\#16a34a" \},

          \{ icon: "💬", label: "SMS AI \(Twilio\)",        status: "Live",        sub: "handleIncomingSms deployed",        color: "\#16a34a" \},

          \{ icon: "🎙️", label: "RVM \(Slybroadcast\)",    status: "Setup Needed",sub: "Add SB credentials in RVM Center",  color: "\#d97706" \},

          \{ icon: "📧", label: "Email \(Resend\)",         status: "Active",      sub: "jlevy599@gmail\.com",                color: "\#16a34a" \},

          \{ icon: "📬", label: "Direct Mail \(Lob\)",      status: "Setup Needed",sub: "Add Lob API key to activate",       color: "\#d97706" \},

          \{ icon: "📘", label: "Facebook Lead Ads",      status: "Paused",      sub: "facebookLeadSync paused",           color: "\#d97706" \},

          \{ icon: "🔍", label: "Google Search Console",  status: "Connected",   sub: "SEO monitoring active",             color: "\#16a34a" \},

          \{ icon: "📊", label: "Meta CAPI Pixel",        status: "Paused",      sub: "Activate in Automation Center",     color: "\#d97706" \},

        \]\.map\(c => \(

          <div key=\{c\.label\} style=\{\{ background: "\#0d1520", border: \`1px solid $\{rgba\(c\.color, 0\.2\)\}\`, borderRadius: 10, padding: 14 \}\}>

            <div style=\{\{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 \}\}>

              <span style=\{\{ fontSize: 18 \}\}>\{c\.icon\}</span>

              <span style=\{\{ fontSize: 12, fontWeight: 700, color: "\#f1f5f9" \}\}>\{c\.label\}</span>

            </div>

            <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center" \}\}>

              <span style=\{\{ fontSize: 11, color: "\#3d5570" \}\}>\{c\.sub\}</span>

              <span style=\{\{ fontSize: 10, fontWeight: 700, color: c\.color \}\}>

                \{c\.status === "Connected" || c\.status === "Live" || c\.status === "Active" ? "✅" : c\.status === "Paused" ? "⏸" : "⚠️"\} \{c\.status\}

              </span>

            </div>

          </div>

        \)\)\}

      </div>

    </div>

  \);

\}
