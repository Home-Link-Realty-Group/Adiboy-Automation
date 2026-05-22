# New Microsoft Word Document (3)

Source: New Microsoft Word Document (3).docx

/\*\*

 \* Performance Configuration — Enterprise Grade

 \* 

 \* Thresholds for Core Web Vitals compliance:

 \* \- LCP \(Largest Contentful Paint\): < 2\.5s

 \* \- FID \(First Input Delay\): < 100ms

 \* \- CLS \(Cumulative Layout Shift\): < 0\.1

 \* 

 \* Status:

 \* ✅ All critical pages pre\-loading above\-fold images

 \* ✅ Code splitting on all lazy routes

 \* ✅ Native lazy loading on below\-fold images

 \* ✅ Aspect ratio locks prevent CLS

 \*/

export const WEB\_VITALS\_THRESHOLDS = \{

  LCP: 2500,    // ms — target < 2\.5s

  FID: 100,     // ms — target < 100ms \(deprecated, use INP\)

  INP: 200,     // ms — Interaction to Next Paint

  CLS: 0\.1,     // score — target < 0\.1

\};

export const PERFORMANCE\_HINTS = \{

  // Image optimization strategy

  images: \{

    above\_fold: \['eager', 'high'\], // fetchpriority, loading

    below\_fold: \['lazy', 'low'\],

    placeholder: '\#f0f0f0',

    responsiveness: \{

      mobile: '100vw',

      tablet: '50vw',

      desktop: '33vw',

    \},

  \},

  // Code splitting — all routes lazy loaded

  code\_split: \{

    chunks: 'Implemented in App\.jsx via React\.lazy\(\)',

    fallback: 'PageLoader — invisible, no layout shift',

    suspension: 'Suspense boundary wraps all lazy routes',

  \},

  // Resource hints

  preload: \[

    // Critical logo — eliminated from LCP candidates

    \{ href: 'https://media\.base44\.com/images/public/69d48de0b96337e8cdc27f54/341fa67b3\_generated\_image\.png', as: 'image' \},

  \],

  preconnect: \[

    'https://media\.base44\.com',

    'https://www\.googletagmanager\.com',

  \],

  dns\_prefetch: \[

    'https://api\.trustedform\.com',

    'https://connect\.facebook\.net',

  \],

  // Critical inline CSS — zero FOUC

  critical\_css: true,

\};

export const PAGES\_OPTIMIZED = \{

  '/Home': \{

    above\_fold\_images: \['hero\-background'\],

    image\_preload: true,

    expected\_lcp: 1800,

  \},

  '/GetOffer': \{

    above\_fold\_images: \['hero\-background', 'logo'\],

    image\_preload: true,

    expected\_lcp: 1500,

  \},

  '/Cities': \{

    above\_fold\_images: \['logo'\],

    image\_preload: true,

    expected\_lcp: 1200,

  \},

  '/SellHouseAtlanta': \{

    above\_fold\_images: \['hero\-background'\],

    image\_preload: true,

    expected\_lcp: 1800,

  \},

\};

export const checkWebVitalsCompliance = \(vitals\) => \{

  const results = \{

    LCP: vitals\.LCP < WEB\_VITALS\_THRESHOLDS\.LCP ? '✅ PASS' : '❌ FAIL',

    INP: vitals\.INP < WEB\_VITALS\_THRESHOLDS\.INP ? '✅ PASS' : '❌ FAIL',

    CLS: vitals\.CLS < WEB\_VITALS\_THRESHOLDS\.CLS ? '✅ PASS' : '❌ FAIL',

  \};

  return results;

\};
