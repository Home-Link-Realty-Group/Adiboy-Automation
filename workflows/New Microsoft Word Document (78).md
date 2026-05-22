# New Microsoft Word Document (78)

Source: New Microsoft Word Document (78).docx

import \{ useState \} from 'react';

import TaskManager from '\./TaskManager';

import SocialPostGenerator from '\./SocialPostGenerator';

const CONTENT\_TEMPLATES = \[

  \{

    category: "Motivated Seller",

    posts: \[

      \{ platform: "Facebook/Instagram", caption: "🏠 Do you own a house nationwide that needs work, has liens, or is just too much to deal with?\\n\\nWe buy houses AS\-IS for cash\. No agents\. No repairs\. No waiting\.\\n\\nClose in as little as 7 days\.\\n\\nDM us or call \(855\) 810\-1786 for a no\-obligation cash offer\.\\n\\n\#CashHomebuyer \#NationwideRealEstate \#SellMyHouse \#WePayCash \#MotivatedSeller", hashtags: "\#CashBuyers \#WePayCash \#CashOffer \#SellFast" \},

      \{ platform: "LinkedIn", caption: "We just helped a homeowner avoid foreclosure and walk away with cash in 11 days\.\\n\\nShe had a pre\-foreclosure notice, 3 liens, and no equity — but we still made it work\.\\n\\nThat's what we do at Home\-Link Realty Group\. We find creative solutions for sellers who need a real exit\.\\n\\nIf you know someone in a tough real estate situation — send them our way\.\\n\\n\(855\) 810\-1786 | homelinkrealtygroup\.com", hashtags: "\#RealEstate \#CashBuyers \#Wholesaling" \},

    \]

  \},

  \{

    category: "Education / Authority",

    posts: \[

      \{ platform: "Facebook/Instagram", caption: "❓ What actually happens when you sell to a cash buyer?\\n\\n1️⃣ You call us or fill out our form\\n2️⃣ We walk the property \(virtually or in person\)\\n3️⃣ We make a written cash offer — no pressure\\n4️⃣ You accept → we open title\\n5️⃣ You pick the closing date\\n6️⃣ You get your check 💰\\n\\nNo repairs\. No showings\. No months of waiting\.\\n\\nHome\-Link Realty Group · \(855\) 810\-1786", hashtags: "\#HowItWorks \#CashSale" \},

    \]

  \},

\];

const CONTENT\_CALENDAR = \[

  \{ day: "Monday", theme: "Motivation / Seller Problem", type: "Educational", icon: "📚" \},

  \{ day: "Tuesday", theme: "How Cash Sales Work", type: "Process", icon: "🔄" \},

  \{ day: "Wednesday", theme: "We Buy Houses Ad", type: "Direct Offer", icon: "🏠" \},

  \{ day: "Thursday", theme: "Referral Partner Outreach", type: "Networking", icon: "🤝" \},

  \{ day: "Friday", theme: "Testimonial / Social Proof", type: "Trust", icon: "⭐" \},

  \{ day: "Saturday", theme: "Market Update", type: "Authority", icon: "📊" \},

  \{ day: "Sunday", theme: "Personal Brand / Behind Scenes", type: "Engagement", icon: "👋" \},

\];

const PUBLISH\_DESTINATIONS = \[

  \{ name: "Facebook Page", icon: "📘", color: "\#1877F2", url: "https://www\.facebook\.com/", instructions: "Click 'Photo/Video' → upload → paste caption → Post" \},

  \{ name: "Instagram", icon: "📸", color: "\#E1306C", url: "https://www\.instagram\.com/", instructions: "Tap \+ → select image → add caption → Share" \},

  \{ name: "LinkedIn", icon: "💼", color: "\#0A66C2", url: "https://www\.linkedin\.com/feed/", instructions: "Start a post → photo → upload → add text → Post" \},

  \{ name: "X / Twitter", icon: "🐦", color: "\#000000", url: "https://twitter\.com/compose/tweet", instructions: "Compose → attach image → write tweet → Post" \},

  \{ name: "Google My Business", icon: "📍", color: "\#4285F4", url: "https://business\.google\.com/", instructions: "Your listing → Photos → Upload" \},

  \{ name: "Meta Ads Manager", icon: "💰", color: "\#0668E1", url: "https://adsmanager\.facebook\.com/", instructions: "Create Ad → Ad Creative → Upload Image" \},

  \{ name: "Craigslist Ad", icon: "📰", color: "\#7B0D1E", url: "https://post\.craigslist\.org/", instructions: "Post → Real Estate → For Sale By Owner → add image" \},

\];

const rgba = \(hex, a = 1\) => \{

  const r = parseInt\(hex\.slice\(1, 3\), 16\);

  const g = parseInt\(hex\.slice\(3, 5\), 16\);

  const b = parseInt\(hex\.slice\(5, 7\), 16\);

  return \`rgba\($\{r\},$\{g\},$\{b\},$\{a\}\)\`;

\};

export default function SocialStudio\(\) \{

  const \[studioTab, setStudioTab\] = useState\('adgenerator'\);

  const \[contentCat, setContentCat\] = useState\(0\);

  const \[copiedPost, setCopiedPost\] = useState\(null\);

  const copyPost = \(text, id\) => \{

    navigator\.clipboard\.writeText\(text\)\.then\(\(\) => \{ setCopiedPost\(id\); setTimeout\(\(\) => setCopiedPost\(null\), 2000\); \}\);

  \};

  const Card = \(\{ children, style = \{\}, glow \}\) => \(

    <div style=\{\{ background: 'linear\-gradient\(145deg, \#0f1826, \#0d1520\)', border: \`1px solid $\{glow ? rgba\(glow, 0\.35\) : '\#0B1F45'\}\`, borderRadius: 16, overflow: 'hidden', \.\.\.style \}\}>

      \{children\}

    </div>

  \);

  const CardHeader = \(\{ icon, title, subtitle \}\) => \(

    <div style=\{\{ padding: '16px 20px', borderBottom: '1px solid \#0f1e2e' \}\}>

      <div style=\{\{ fontWeight: 800, color: '\#f1f5f9', fontSize: 15 \}\}><span>\{icon\}</span> \{title\}</div>

      \{subtitle && <div style=\{\{ fontSize: 11, color: '\#334155', marginTop: 2 \}\}>\{subtitle\}</div>\}

    </div>

  \);

  const TABS = \[

    \{ id: 'adgenerator', label: '🎯 Ad Generator' \},

    \{ id: 'tasks', label: '✅ Task Manager' \},

    \{ id: 'calendar', label: '📅 Content Calendar' \},

    \{ id: 'templates', label: '📝 Post Templates' \},

    \{ id: 'editor', label: '🖼️ Photo Editor' \},

    \{ id: 'publish', label: '📤 Publish' \},

  \];

  return \(

    <div>

      <div style=\{\{ display: 'flex', gap: 6, marginBottom: 20, borderBottom: '1px solid \#0B1F45', paddingBottom: 12, overflowX: 'auto' \}\}>

        \{TABS\.map\(t => \(

          <button key=\{t\.id\} onClick=\{\(\) => setStudioTab\(t\.id\)\} style=\{\{

            background: studioTab === t\.id ? rgba\('\#22c55e', 0\.12\) : '\#0d1520',

            border: \`1px solid $\{studioTab === t\.id ? '\#22c55e' : '\#0B1F45'\}\`,

            color: studioTab === t\.id ? '\#4ade80' : '\#475569',

            borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',

          \}\}>\{t\.label\}</button>

        \)\)\}

      </div>

      \{studioTab === 'adgenerator' && <SocialPostGenerator />\}

      \{studioTab === 'tasks' && <TaskManager />\}

      \{studioTab === 'calendar' && \(

        <div>

          <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(7, 1fr\)', gap: 12, marginBottom: 28 \}\}>

            \{CONTENT\_CALENDAR\.map\(day => \(

              <Card key=\{day\.day\} style=\{\{ textAlign: 'center' \}\}>

                <div style=\{\{ padding: '16px 10px' \}\}>

                  <div style=\{\{ fontSize: 24, marginBottom: 8 \}\}>\{day\.icon\}</div>

                  <div style=\{\{ fontWeight: 800, color: '\#f1f5f9', fontSize: 13, marginBottom: 4 \}\}>\{day\.day\}</div>

                  <div style=\{\{ fontSize: 11, color: '\#22c55e', fontWeight: 700, marginBottom: 6 \}\}>\{day\.type\}</div>

                  <div style=\{\{ fontSize: 10, color: '\#334155', lineHeight: 1\.4 \}\}>\{day\.theme\}</div>

                </div>

              </Card>

            \)\)\}

          </div>

          <Card>

            <CardHeader icon="📋" title="Content Rules" subtitle="Follow these every week for maximum reach" />

            <div style=\{\{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 \}\}>

              \{\[

                \{ icon: '✅', title: 'Post 3\-5x per week minimum', desc: 'Consistency matters more than quality\. Volume builds the algorithm\.' \},

                \{ icon: '✅', title: 'Always include your phone number', desc: '\(855\) 810\-1786 in every single post\. Make it dead easy to call\.' \},

                \{ icon: '✅', title: 'Use real language, not corporate speak', desc: "'We buy houses' works\. Jargon doesn't\." \},

                \{ icon: '✅', title: 'Mix content types', desc: 'Alternate direct offers, educational posts, and testimonials\.' \},

              \]\.map\(r => \(

                <div key=\{r\.title\} style=\{\{ display: 'flex', gap: 10 \}\}>

                  <span style=\{\{ fontSize: 16, flexShrink: 0 \}\}>\{r\.icon\}</span>

                  <div>

                    <div style=\{\{ fontWeight: 700, color: '\#f1f5f9', fontSize: 13, marginBottom: 3 \}\}>\{r\.title\}</div>

                    <div style=\{\{ fontSize: 12, color: '\#334155', lineHeight: 1\.5 \}\}>\{r\.desc\}</div>

                  </div>

                </div>

              \)\)\}

            </div>

          </Card>

        </div>

      \)\}

      \{studioTab === 'templates' && \(

        <div>

          <div style=\{\{ display: 'flex', gap: 8, marginBottom: 20 \}\}>

            \{CONTENT\_TEMPLATES\.map\(\(cat, i\) => \(

              <button key=\{cat\.category\} onClick=\{\(\) => setContentCat\(i\)\} style=\{\{

                background: contentCat === i ? rgba\('\#22c55e', 0\.12\) : '\#0d1520',

                border: \`1px solid $\{contentCat === i ? '\#22c55e' : '\#0B1F45'\}\`,

                color: contentCat === i ? '\#4ade80' : '\#475569',

                borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',

              \}\}>\{cat\.category\}</button>

            \)\)\}

          </div>

          <div style=\{\{ display: 'flex', flexDirection: 'column', gap: 16 \}\}>

            \{CONTENT\_TEMPLATES\[contentCat\]\.posts\.map\(\(post, pi\) => \(

              <Card key=\{pi\}>

                <div style=\{\{ padding: '16px 20px', borderBottom: '1px solid \#0a111e', display: 'flex', justifyContent: 'space\-between', alignItems: 'center' \}\}>

                  <span style=\{\{ background: rgba\('\#22c55e', 0\.15\), color: '\#22c55e', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 \}\}>\{post\.platform\}</span>

                  <button onClick=\{\(\) => copyPost\(post\.caption \+ \(post\.hashtags ? '\\n\\n' \+ post\.hashtags : ''\), \`$\{contentCat\}\-$\{pi\}\`\)\} style=\{\{

                    background: copiedPost === \`$\{contentCat\}\-$\{pi\}\` ? rgba\('\#22c55e', 0\.2\) : rgba\('\#3b82f6', 0\.15\),

                    border: \`1px solid $\{copiedPost === \`$\{contentCat\}\-$\{pi\}\` ? '\#22c55e' : rgba\('\#3b82f6', 0\.3\)\}\`,

                    color: copiedPost === \`$\{contentCat\}\-$\{pi\}\` ? '\#4ade80' : '\#60a5fa',

                    borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',

                  \}\}>\{copiedPost === \`$\{contentCat\}\-$\{pi\}\` ? '✅ Copied\!' : '📋 Copy'\}</button>

                </div>

                <div style=\{\{ padding: '16px 20px' \}\}>

                  <pre style=\{\{ margin: 0, fontFamily: 'inherit', fontSize: 13, color: '\#94a3b8', lineHeight: 1\.7, whiteSpace: 'pre\-wrap' \}\}>\{post\.caption\}</pre>

                  \{post\.hashtags && <div style=\{\{ marginTop: 10, fontSize: 12, color: '\#3b82f6', fontWeight: 600 \}\}>\{post\.hashtags\}</div>\}

                </div>

              </Card>

            \)\)\}

          </div>

        </div>

      \)\}

      \{studioTab === 'editor' && <div style=\{\{ color: '\#555', padding: 20 \}\}>Use the Social HQ Image Editor tab for photo editing\.</div>\}

      \{studioTab === 'publish' && \(

        <div>

          <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto\-fill, minmax\(170px, 1fr\)\)', gap: 10 \}\}>

            \{PUBLISH\_DESTINATIONS\.map\(d => \(

              <a key=\{d\.name\} href=\{d\.url\} target="\_blank" rel="noopener noreferrer" style=\{\{ textDecoration: 'none' \}\}>

                <div style=\{\{ background: '\#0d1520', border: \`1px solid $\{rgba\(d\.color, 0\.25\)\}\`, borderRadius: 12, padding: '16px 14px', transition: 'all 0\.2s' \}\}

                  onMouseEnter=\{e => \{ e\.currentTarget\.style\.background = rgba\(d\.color, 0\.07\); e\.currentTarget\.style\.borderColor = d\.color; \}\}

                  onMouseLeave=\{e => \{ e\.currentTarget\.style\.background = '\#0d1520'; e\.currentTarget\.style\.borderColor = rgba\(d\.color, 0\.25\); \}\}>

                  <div style=\{\{ fontSize: 22, marginBottom: 8 \}\}>\{d\.icon\}</div>

                  <div style=\{\{ fontWeight: 700, color: '\#f1f5f9', fontSize: 12, marginBottom: 6 \}\}>\{d\.name\}</div>

                  <div style=\{\{ fontSize: 10, color: '\#334155', lineHeight: 1\.4 \}\}>\{d\.instructions\}</div>

                </div>

              </a>

            \)\)\}

          </div>

        </div>

      \)\}

    </div>

  \);

\}
