# New Microsoft Word Document (20)

Source: New Microsoft Word Document (20).docx

/\*\*

 \* Vibrant 3D workflow blueprints for each automation\.

 \* Glossy gradient nodes, glowing connector arrows, drop shadows,

 \* and crisp readable sans\-serif labels\.

 \*/

const INK = '\#0f172a';

const ACCENT = '\#D4A843';

const GREEN = '\#16a34a';

const BLUE = '\#3b82f6';

const RED = '\#dc2626';

const PURPLE = '\#7c3aed';

const ORANGE = '\#f97316';

const TEAL = '\#0d9488';

// Shared SVG gradient/filter defs

function Defs\(\) \{

  const colors = \[

    \['ink',    INK,    '\#1e293b'\],

    \['accent', '\#fbbf24', ACCENT\],

    \['green',  '\#4ade80', GREEN\],

    \['blue',   '\#60a5fa', BLUE\],

    \['red',    '\#f87171', RED\],

    \['purple', '\#a855f7', PURPLE\],

    \['orange', '\#fb923c', ORANGE\],

    \['teal',   '\#2dd4bf', TEAL\],

  \];

  return \(

    <defs>

      \{colors\.map\(\(\[id, light, dark\]\) => \(

        <linearGradient key=\{id\} id=\{\`gr\-$\{id\}\`\} x1="0%" y1="0%" x2="0%" y2="100%">

          <stop offset="0%"   stopColor=\{light\} />

          <stop offset="55%"  stopColor=\{dark\} />

          <stop offset="100%" stopColor=\{dark\} stopOpacity="0\.85" />

        </linearGradient>

      \)\)\}

      \{/\* Soft drop shadow for nodes \*/\}

      <filter id="nodeShadow" x="\-20%" y="\-20%" width="140%" height="160%">

        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="\#000" floodOpacity="0\.25" />

      </filter>

      \{/\* Stronger glow for highlight nodes \*/\}

      <filter id="glowAccent" x="\-50%" y="\-50%" width="200%" height="200%">

        <feGaussianBlur stdDeviation="2\.5" result="b" />

        <feMerge>

          <feMergeNode in="b" />

          <feMergeNode in="SourceGraphic" />

        </feMerge>

      </filter>

    </defs>

  \);

\}

const COLOR\_KEY = \{

  \[INK\]: 'ink', \[ACCENT\]: 'accent', \[GREEN\]: 'green',

  \[BLUE\]: 'blue', \[RED\]: 'red', \[PURPLE\]: 'purple',

  \[ORANGE\]: 'orange', \[TEAL\]: 'teal',

\};

// Vibrant 3D box with gradient fill, drop shadow, glossy highlight

function Box\(\{ x, y, w, h, label, sub, color = INK, glow = false \}\) \{

  const gradId = \`gr\-$\{COLOR\_KEY\[color\] || 'ink'\}\`;

  return \(

    <g filter=\{glow ? 'url\(\#glowAccent\)' : 'url\(\#nodeShadow\)'\}>

      <rect x=\{x\} y=\{y\} width=\{w\} height=\{h\} rx=\{7\} ry=\{7\}

        fill=\{\`url\(\#$\{gradId\}\)\`\} stroke="rgba\(255,255,255,0\.7\)" strokeWidth="1\.5" />

      \{/\* Top glossy highlight \*/\}

      <rect x=\{x \+ 1\.5\} y=\{y \+ 1\.5\} width=\{w \- 3\} height=\{h \* 0\.45\} rx=\{6\} ry=\{6\}

        fill="url\(\#glossOverlay\)" opacity="0\.45" pointerEvents="none" />

      <text x=\{x \+ w / 2\} y=\{y \+ h / 2 \- \(sub ? 5 : \-5\)\} textAnchor="middle"

        fontFamily="'Segoe UI', system\-ui, sans\-serif" fontWeight="900" fontSize="13\.5"

        fill="\#fff" style=\{\{ textShadow: '0 1px 3px rgba\(0,0,0,0\.6\), 0 0 1px rgba\(0,0,0,0\.8\)' \}\}>

        \{label\}

      </text>

      \{sub && \(

        <text x=\{x \+ w / 2\} y=\{y \+ h / 2 \+ 14\} textAnchor="middle"

          fontFamily="'Segoe UI', system\-ui, sans\-serif" fontWeight="700" fontSize="10\.5"

          fill="rgba\(255,255,255,0\.95\)" style=\{\{ textShadow: '0 1px 2px rgba\(0,0,0,0\.5\)' \}\}>

          \{sub\}

        </text>

      \)\}

    </g>

  \);

\}

// Glow\-style arrow connector

function Arrow\(\{ x1, y1, x2, y2, color = INK, label, dashed = false \}\) \{

  const id = \`arr\-$\{x1\}\-$\{y1\}\-$\{x2\}\-$\{y2\}\`\.replace\(/\\\./g, ''\);

  return \(

    <g>

      <defs>

        <marker id=\{id\} markerWidth="11" markerHeight="11" refX="8" refY="5\.5" orient="auto">

          <path d="M0,0 L9,5\.5 L0,11 z" fill=\{color\} />

        </marker>

      </defs>

      \{/\* Soft glow underline \*/\}

      <line x1=\{x1\} y1=\{y1\} x2=\{x2\} y2=\{y2\}

        stroke=\{color\} strokeWidth="6" strokeLinecap="round" opacity="0\.22" />

      \{/\* Main line \*/\}

      <line x1=\{x1\} y1=\{y1\} x2=\{x2\} y2=\{y2\}

        stroke=\{color\} strokeWidth="2\.8" strokeLinecap="round"

        strokeDasharray=\{dashed ? '6,4' : 'none'\}

        markerEnd=\{\`url\(\#$\{id\}\)\`\} />

      \{label && \(

        <g>

          <rect x=\{\(x1 \+ x2\) / 2 \- 18\} y=\{\(y1 \+ y2\) / 2 \- 16\} width="36" height="15" rx="4"

            fill="\#fff" stroke=\{color\} strokeWidth="1\.5" />

          <text x=\{\(x1 \+ x2\) / 2\} y=\{\(y1 \+ y2\) / 2 \- 5\} textAnchor="middle"

            fontFamily="'Segoe UI', system\-ui, sans\-serif" fontSize="11" fill=\{color\} fontWeight="900">

            \{label\}

          </text>

        </g>

      \)\}

    </g>

  \);

\}

function Diamond\(\{ cx, cy, w, h, label, color = ACCENT \}\) \{

  const points = \`$\{cx\},$\{cy \- h / 2\} $\{cx \+ w / 2\},$\{cy\} $\{cx\},$\{cy \+ h / 2\} $\{cx \- w / 2\},$\{cy\}\`;

  const gradId = \`gr\-$\{COLOR\_KEY\[color\] || 'accent'\}\`;

  return \(

    <g filter="url\(\#nodeShadow\)">

      <polygon points=\{points\} fill=\{\`url\(\#$\{gradId\}\)\`\} stroke="rgba\(255,255,255,0\.7\)" strokeWidth="1\.5" />

      <text x=\{cx\} y=\{cy \+ 4\} textAnchor="middle"

        fontFamily="'Segoe UI', system\-ui, sans\-serif" fontWeight="900" fontSize="12"

        fill="\#fff" style=\{\{ textShadow: '0 1px 3px rgba\(0,0,0,0\.6\)' \}\}>

        \{label\}

      </text>

    </g>

  \);

\}

function Cloud\(\{ cx, cy, label \}\) \{

  return \(

    <g filter="url\(\#nodeShadow\)">

      <ellipse cx=\{cx\} cy=\{cy\} rx="44" ry="22" fill="url\(\#gr\-blue\)" stroke="rgba\(255,255,255,0\.6\)" strokeWidth="1\.5" />

      <ellipse cx=\{cx \- 22\} cy=\{cy \- 6\} rx="17" ry="12" fill="url\(\#gr\-blue\)" />

      <ellipse cx=\{cx \+ 22\} cy=\{cy \- 6\} rx="17" ry="12" fill="url\(\#gr\-blue\)" />

      <text x=\{cx\} y=\{cy \+ 5\} textAnchor="middle"

        fontFamily="'Segoe UI', system\-ui, sans\-serif" fontWeight="900" fontSize="13"

        fill="\#fff" style=\{\{ textShadow: '0 1px 3px rgba\(0,0,0,0\.6\)' \}\}>

        \{label\}

      </text>

    </g>

  \);

\}

// Shared gloss overlay gradient \(for box highlights\)

function GlossDef\(\) \{

  return \(

    <defs>

      <linearGradient id="glossOverlay" x1="0%" y1="0%" x2="0%" y2="100%">

        <stop offset="0%"   stopColor="\#fff" stopOpacity="0\.85" />

        <stop offset="100%" stopColor="\#fff" stopOpacity="0" />

      </linearGradient>

    </defs>

  \);

\}

// ─── BLUEPRINTS ─────────────────────────────────────────────────────────

function SpeedToLeadBlueprint\(\) \{

  return \(

    <svg viewBox="0 0 480 150" style=\{blueprintSVG\}>

      <Defs /><GlossDef />

      <Box x=\{10\} y=\{55\} w=\{74\} h=\{40\} label="LEAD" sub="form fill" color=\{BLUE\} />

      <Arrow x1=\{86\} y1=\{75\} x2=\{120\} y2=\{75\} color=\{INK\} />

      <Diamond cx=\{152\} cy=\{75\} w=\{62\} h=\{54\} label="< 60s?" color=\{ACCENT\} />

      <Arrow x1=\{185\} y1=\{75\} x2=\{222\} y2=\{75\} color=\{GREEN\} label="YES" />

      <Box x=\{224\} y=\{32\} w=\{92\} h=\{34\} label="📱 SMS" sub="to agent" color=\{GREEN\} />

      <Box x=\{224\} y=\{82\} w=\{92\} h=\{34\} label="✉️ EMAIL" sub="to lead" color=\{GREEN\} />

      <Arrow x1=\{318\} y1=\{49\} x2=\{358\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{318\} y1=\{99\} x2=\{358\} y2=\{75\} color=\{INK\} />

      <Box x=\{360\} y=\{55\} w=\{114\} h=\{40\} label="⚡ CONTACTED" sub="< 1 min" color=\{ACCENT\} glow />

    </svg>

  \);

\}

function SkipTraceBlueprint\(\) \{

  return \(

    <svg viewBox="0 0 480 150" style=\{blueprintSVG\}>

      <Defs /><GlossDef />

      <Box x=\{10\} y=\{55\} w=\{84\} h=\{40\} label="NEW LEAD" sub="addr only" color=\{INK\} />

      <Arrow x1=\{96\} y1=\{75\} x2=\{130\} y2=\{75\} color=\{INK\} />

      <Cloud cx=\{172\} cy=\{75\} label="Apify" />

      <Arrow x1=\{214\} y1=\{75\} x2=\{258\} y2=\{75\} color=\{BLUE\} dashed />

      <Box x=\{260\} y=\{20\} w=\{94\} h=\{30\} label="📞 PHONE" color=\{GREEN\} />

      <Box x=\{260\} y=\{60\} w=\{94\} h=\{30\} label="✉️ EMAIL" color=\{GREEN\} />

      <Box x=\{260\} y=\{100\} w=\{94\} h=\{30\} label="👤 OWNER" color=\{GREEN\} />

      <Arrow x1=\{356\} y1=\{35\} x2=\{398\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{356\} y1=\{75\} x2=\{398\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{356\} y1=\{115\} x2=\{398\} y2=\{75\} color=\{INK\} />

      <Box x=\{400\} y=\{55\} w=\{74\} h=\{40\} label="ENRICHED" sub="94% hit" color=\{ACCENT\} glow />

    </svg>

  \);

\}

function MotivationScoreBlueprint\(\) \{

  return \(

    <svg viewBox="0 0 480 150" style=\{blueprintSVG\}>

      <Defs /><GlossDef />

      <Box x=\{10\} y=\{55\} w=\{72\} h=\{40\} label="LEAD" color=\{INK\} />

      <Arrow x1=\{84\} y1=\{75\} x2=\{116\} y2=\{75\} color=\{INK\} />

      <Box x=\{118\} y=\{12\} w=\{90\} h=\{26\} label="distress" color=\{RED\} />

      <Box x=\{118\} y=\{44\} w=\{90\} h=\{26\} label="equity %" color=\{BLUE\} />

      <Box x=\{118\} y=\{76\} w=\{90\} h=\{26\} label="urgency" color=\{ORANGE\} />

      <Box x=\{118\} y=\{108\} w=\{90\} h=\{26\} label="life event" color=\{PURPLE\} />

      <Arrow x1=\{210\} y1=\{25\} x2=\{252\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{210\} y1=\{57\} x2=\{252\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{210\} y1=\{89\} x2=\{252\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{210\} y1=\{121\} x2=\{252\} y2=\{75\} color=\{INK\} />

      <Box x=\{254\} y=\{55\} w=\{82\} h=\{42\} label="🤖 AI" sub="weights" color=\{ACCENT\} />

      <Arrow x1=\{338\} y1=\{75\} x2=\{376\} y2=\{75\} color=\{GREEN\} />

      <g filter="url\(\#nodeShadow\)">

        <circle cx=\{420\} cy=\{75\} r=\{34\} fill="url\(\#gr\-green\)" stroke="rgba\(255,255,255,0\.5\)" strokeWidth="1" />

        <text x=\{420\} y=\{73\} textAnchor="middle" fontFamily="'Segoe UI', system\-ui, sans\-serif"

          fontWeight="900" fontSize="22" fill="\#fff" style=\{\{ textShadow: '0 1px 2px rgba\(0,0,0,0\.4\)' \}\}>87</text>

        <text x=\{420\} y=\{89\} textAnchor="middle" fontFamily="'Segoe UI', system\-ui, sans\-serif"

          fontSize="9" fontWeight="700" fill="rgba\(255,255,255,0\.85\)">/ 100</text>

      </g>

    </svg>

  \);

\}

function FollowUp15Blueprint\(\) \{

  return \(

    <svg viewBox="0 0 480 150" style=\{blueprintSVG\}>

      <Defs /><GlossDef />

      <Box x=\{5\} y=\{55\} w=\{62\} h=\{40\} label="LEAD" color=\{INK\} />

      <Arrow x1=\{69\} y1=\{75\} x2=\{92\} y2=\{75\} color=\{INK\} />

      \{\[

        \{ d: 1, x: 95 \}, \{ d: 2, x: 130 \}, \{ d: 4, x: 165 \}, \{ d: 7, x: 200 \}, \{ d: 14, x: 235 \},

        \{ d: 21, x: 270 \}, \{ d: 30, x: 305 \}, \{ d: 45, x: 340 \}, \{ d: 60, x: 375 \}, \{ d: 90, x: 410 \},

      \]\.map\(\(p, i\) => \{

        const tone = i < 3 ? 'green' : i < 7 ? 'accent' : 'red';

        return \(

          <g key=\{i\} filter="url\(\#nodeShadow\)">

            <circle cx=\{p\.x \+ 12\} cy=\{75\} r=\{13\} fill=\{\`url\(\#gr\-$\{tone\}\)\`\}

              stroke="rgba\(255,255,255,0\.5\)" strokeWidth="1" />

            <text x=\{p\.x \+ 12\} y=\{79\} textAnchor="middle"

              fontFamily="'Segoe UI', system\-ui, sans\-serif" fontSize="10" fontWeight="800" fill="\#fff"

              style=\{\{ textShadow: '0 1px 1px rgba\(0,0,0,0\.4\)' \}\}>D\{p\.d\}</text>

          </g>

        \);

      \}\)\}

      <text x=\{120\} y=\{36\} fontFamily="'Segoe UI', system\-ui, sans\-serif" fontSize="11" fill=\{GREEN\} fontWeight="800">📞 SMS</text>

      <text x=\{205\} y=\{36\} fontFamily="'Segoe UI', system\-ui, sans\-serif" fontSize="11" fill=\{ACCENT\} fontWeight="800">✉️ Email</text>

      <text x=\{310\} y=\{36\} fontFamily="'Segoe UI', system\-ui, sans\-serif" fontSize="11" fill=\{RED\} fontWeight="800">🎙️ VM Drop</text>

      <text x=\{170\} y=\{120\} fontFamily="'Segoe UI', system\-ui, sans\-serif" fontSize="11" fill="\#475569" fontWeight="600">15 touches over 90 days</text>

      <Box x=\{425\} y=\{55\} w=\{50\} h=\{40\} label="DEAL\!" color=\{GREEN\} glow />

    </svg>

  \);

\}

function BuyerDripBlueprint\(\) \{

  return \(

    <svg viewBox="0 0 480 150" style=\{blueprintSVG\}>

      <Defs /><GlossDef />

      <Box x=\{10\} y=\{55\} w=\{92\} h=\{40\} label="🏠 NEW DEAL" sub="under contract" color=\{INK\} />

      <Arrow x1=\{104\} y1=\{75\} x2=\{138\} y2=\{75\} color=\{INK\} />

      <Box x=\{140\} y=\{55\} w=\{72\} h=\{40\} label="🤖 MATCH" sub="AI filter" color=\{ACCENT\} />

      <Arrow x1=\{214\} y1=\{75\} x2=\{246\} y2=\{75\} color=\{GREEN\} />

      <Box x=\{248\} y=\{20\} w=\{94\} h=\{30\} label="📱 SMS BLAST" color=\{GREEN\} />

      <Box x=\{248\} y=\{60\} w=\{94\} h=\{30\} label="✉️ EMAIL" color=\{GREEN\} />

      <Box x=\{248\} y=\{100\} w=\{94\} h=\{30\} label="📲 PUSH" color=\{GREEN\} />

      <Arrow x1=\{344\} y1=\{35\} x2=\{386\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{344\} y1=\{75\} x2=\{386\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{344\} y1=\{115\} x2=\{386\} y2=\{75\} color=\{INK\} />

      <Box x=\{388\} y=\{55\} w=\{86\} h=\{40\} label="💰 OFFERS" sub="in inbox" color=\{ACCENT\} glow />

    </svg>

  \);

\}

function AutoOfferBlueprint\(\) \{

  return \(

    <svg viewBox="0 0 480 150" style=\{blueprintSVG\}>

      <Defs /><GlossDef />

      <Box x=\{10\} y=\{55\} w=\{74\} h=\{40\} label="LEAD \+ ARV" color=\{INK\} />

      <Arrow x1=\{86\} y1=\{75\} x2=\{120\} y2=\{75\} color=\{INK\} />

      <Box x=\{122\} y=\{20\} w=\{92\} h=\{30\} label="ARV × 70%" color=\{BLUE\} />

      <Box x=\{122\} y=\{60\} w=\{92\} h=\{30\} label="– repairs" color=\{RED\} />

      <Box x=\{122\} y=\{100\} w=\{92\} h=\{30\} label="– fee" color=\{ACCENT\} />

      <Arrow x1=\{216\} y1=\{35\} x2=\{254\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{216\} y1=\{75\} x2=\{254\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{216\} y1=\{115\} x2=\{254\} y2=\{75\} color=\{INK\} />

      <Box x=\{256\} y=\{55\} w=\{70\} h=\{42\} label="= MAO" sub="formula" color=\{ACCENT\} />

      <Arrow x1=\{328\} y1=\{75\} x2=\{362\} y2=\{75\} color=\{GREEN\} />

      <Box x=\{364\} y=\{55\} w=\{112\} h=\{40\} label="📄 OFFER" sub="auto\-sent" color=\{GREEN\} glow />

    </svg>

  \);

\}

function SocialAutoPostBlueprint\(\) \{

  return \(

    <svg viewBox="0 0 480 150" style=\{blueprintSVG\}>

      <Defs /><GlossDef />

      <Box x=\{10\} y=\{55\} w=\{72\} h=\{40\} label="🤖 AI" sub="content" color=\{ACCENT\} />

      <Arrow x1=\{84\} y1=\{75\} x2=\{118\} y2=\{75\} color=\{INK\} />

      <Box x=\{120\} y=\{55\} w=\{72\} h=\{40\} label="POST" sub="scheduled" color=\{INK\} />

      <Arrow x1=\{194\} y1=\{75\} x2=\{226\} y2=\{75\} color=\{GREEN\} />

      <Box x=\{228\} y=\{4\} w=\{72\} h=\{28\} label="📘 FB" color=\{BLUE\} />

      <Box x=\{228\} y=\{36\} w=\{72\} h=\{28\} label="📸 IG" color=\{PURPLE\} />

      <Box x=\{228\} y=\{68\} w=\{72\} h=\{28\} label="💼 LinkedIn" color=\{BLUE\} />

      <Box x=\{228\} y=\{100\} w=\{72\} h=\{28\} label="🎵 TikTok" color=\{INK\} />

      <Arrow x1=\{302\} y1=\{18\} x2=\{342\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{302\} y1=\{50\} x2=\{342\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{302\} y1=\{82\} x2=\{342\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{302\} y1=\{114\} x2=\{342\} y2=\{75\} color=\{INK\} />

      <Box x=\{344\} y=\{55\} w=\{132\} h=\{40\} label="📈 ENGAGEMENT" sub="daily reach" color=\{GREEN\} glow />

    </svg>

  \);

\}

function KPIDigestBlueprint\(\) \{

  return \(

    <svg viewBox="0 0 480 150" style=\{blueprintSVG\}>

      <Defs /><GlossDef />

      <g filter="url\(\#nodeShadow\)">

        <circle cx=\{42\} cy=\{75\} r=\{22\} fill="url\(\#gr\-accent\)" stroke="rgba\(255,255,255,0\.5\)" strokeWidth="1" />

        <text x=\{42\} y=\{79\} textAnchor="middle" fontFamily="'Segoe UI', system\-ui, sans\-serif"

          fontWeight="900" fontSize="14" fill="\#fff" style=\{\{ textShadow: '0 1px 1px rgba\(0,0,0,0\.4\)' \}\}>6AM</text>

      </g>

      <Arrow x1=\{66\} y1=\{75\} x2=\{98\} y2=\{75\} color=\{INK\} />

      <Box x=\{100\} y=\{20\} w=\{88\} h=\{28\} label="📞 calls" color=\{BLUE\} />

      <Box x=\{100\} y=\{50\} w=\{88\} h=\{28\} label="📋 leads" color=\{GREEN\} />

      <Box x=\{100\} y=\{80\} w=\{88\} h=\{28\} label="💰 deals" color=\{ACCENT\} />

      <Box x=\{100\} y=\{110\} w=\{88\} h=\{26\} label="$ revenue" color=\{PURPLE\} />

      <Arrow x1=\{190\} y1=\{34\} x2=\{232\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{190\} y1=\{64\} x2=\{232\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{190\} y1=\{94\} x2=\{232\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{190\} y1=\{123\} x2=\{232\} y2=\{75\} color=\{INK\} />

      <Box x=\{234\} y=\{55\} w=\{86\} h=\{40\} label="📊 DIGEST" sub="rolled up" color=\{INK\} />

      <Arrow x1=\{322\} y1=\{75\} x2=\{358\} y2=\{75\} color=\{GREEN\} />

      <Box x=\{360\} y=\{55\} w=\{116\} h=\{40\} label="✉️ INBOX" sub="every morning" color=\{GREEN\} glow />

    </svg>

  \);

\}

function AbandonmentAlertBlueprint\(\) \{

  return \(

    <svg viewBox="0 0 480 150" style=\{blueprintSVG\}>

      <Defs /><GlossDef />

      <Box x=\{10\} y=\{55\} w=\{88\} h=\{40\} label="📝 FORM" sub="started" color=\{INK\} />

      <Arrow x1=\{100\} y1=\{75\} x2=\{134\} y2=\{75\} color=\{INK\} />

      <Diamond cx=\{162\} cy=\{75\} w=\{58\} h=\{52\} label="left?" color=\{ORANGE\} />

      <Arrow x1=\{192\} y1=\{75\} x2=\{224\} y2=\{75\} color=\{RED\} label="YES" />

      <Box x=\{226\} y=\{55\} w=\{68\} h=\{40\} label="⏱️ wait" sub="5 min" color=\{ACCENT\} />

      <Arrow x1=\{296\} y1=\{75\} x2=\{328\} y2=\{75\} color=\{INK\} />

      <Box x=\{330\} y=\{20\} w=\{74\} h=\{30\} label="📱 SMS" color=\{GREEN\} />

      <Box x=\{330\} y=\{100\} w=\{74\} h=\{30\} label="✉️ EMAIL" color=\{GREEN\} />

      <Arrow x1=\{406\} y1=\{35\} x2=\{444\} y2=\{75\} color=\{INK\} />

      <Arrow x1=\{406\} y1=\{115\} x2=\{444\} y2=\{75\} color=\{INK\} />

      <Box x=\{420\} y=\{55\} w=\{56\} h=\{40\} label="🎯 SAVE" color=\{GREEN\} glow />

    </svg>

  \);

\}

const BLUEPRINTS = \{

  speed\_to\_lead: SpeedToLeadBlueprint,

  auto\_skip\_trace: SkipTraceBlueprint,

  auto\_lead\_score: MotivationScoreBlueprint,

  follow\_up\_15touch: FollowUp15Blueprint,

  buyer\_drip: BuyerDripBlueprint,

  auto\_offer: AutoOfferBlueprint,

  social\_auto\_post: SocialAutoPostBlueprint,

  kpi\_daily\_digest: KPIDigestBlueprint,

  abandonment\_alert: AbandonmentAlertBlueprint,

\};

export default function WorkflowBlueprint\(\{ type \}\) \{

  const Component = BLUEPRINTS\[type\];

  if \(\!Component\) return null;

  return \(

    <div style=\{whiteboardStyle\}>

      <Component />

    </div>

  \);

\}

const blueprintSVG = \{

  width: '100%',

  height: 'auto',

  maxHeight: 240,

  display: 'block',

\};

const whiteboardStyle = \{

  background: 'linear\-gradient\(135deg, \#ffffff 0%, \#f1f5f9 50%, \#e0e7ff 100%\)',

  border: '1\.5px solid \#94a3b8',

  borderRadius: 12,

  padding: 16,

  boxShadow: 'inset 0 2px 4px rgba\(15,23,42,0\.08\), 0 6px 18px rgba\(15,23,42,0\.08\)',

\};
