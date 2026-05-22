# LightHouse

Source: LightHouse.docx

\# LIGHTHOUSE OPTIMIZATION CHECKLIST

\#\# Step\-by\-Step Implementation Guide

\*\*Target\*\*: 90\+ Lighthouse Score across all public pages  

\*\*Timeline\*\*: 3–4 weeks \(phased approach\)

\-\-\-

\#\# PHASE 2A: QUICK WINS \(Week 1 — 3–4 hours\)

\#\#\# 1\. Image Preloading in index\.html

\*\*File\*\*: \`index\.html\`

\*\*Current\*\*:

\`\`\`html

<link rel="preload" href="https://media\.base44\.com/images/\.\.\." as="image" fetchpriority="high" />

\`\`\`

\*\*Status\*\*: ✅ Already implemented \(line 30 in snapshot\)

\*\*Verify\*\*:

\- \[ \] Logo preloaded with \`fetchpriority="high"\`

\- \[ \] Hero image on Home page preloaded

\- \[ \] GetOffer hero image preloaded

\-\-\-

\#\#\# 2\. Font Display Strategy

\*\*File\*\*: \`index\.css\`

\*\*Current\*\*:

\`\`\`css

@import url\('https://fonts\.googleapis\.com/css2?family=\.\.\.'\);

/\* No font\-display parameter \*/

\`\`\`

\*\*Fix\*\*:

\`\`\`css

@import url\('https://fonts\.googleapis\.com/css2?family=Segoe\+UI:wght@400;600;700;900&display=swap'\);

/\* display=swap = show fallback, swap when ready \*/

\`\`\`

\*\*Action\*\*:

\`\`\`bash

\# Add font\-display=swap to Google Fonts URL

\# Also set for any custom @font\-face rules

\`\`\`

\*\*Impact\*\*: \+5–10 Lighthouse points \(fixes "Fonts with font\-display: swap"\)

\-\-\-

\#\#\# 3\. Defer Non\-Critical Scripts

\*\*File\*\*: \`index\.html\`

\*\*Current\*\* \(Meta Pixel\):

\`\`\`html

<\!\-\- Meta Pixel already deferred in useMetaPixel hook ✅ \-\->

\`\`\`

\*\*TrustedForm\*\* \(GetOffer page\):

\`\`\`html

<\!\-\- Remove from <head>, load on\-demand \-\->

\`\`\`

\*\*Action\*\*: Add to GetOffer\.jsx:

\`\`\`javascript

// pages/GetOffer\.jsx \- Add to useEffect

useEffect\(\(\) => \{

  // Load TrustedForm only when form comes into view

  const handleFormFocus = \(\) => \{

    if \(\!window\.\_tf\) \{

      const script = document\.createElement\('script'\);

      script\.src = 'https://api\.trustedform\.com/tf\.js';

      document\.body\.appendChild\(script\);

    \}

  \};

  document\.getElementById\('form\-container'\)?\.addEventListener\('focusin', handleFormFocus, \{ once: true \}\);

  

  return \(\) => \{

    document\.getElementById\('form\-container'\)?\.removeEventListener\('focusin', handleFormFocus\);

  \};

\}, \[\]\);

\`\`\`

\*\*Impact\*\*: \+3–5 Lighthouse points \(reduces blocking JavaScript\)

\-\-\-

\#\#\# 4\. Add Cache\-Control Headers

\*\*Action\*\*: Contact Base44 support or add via Vite config

\*\*Goal\*\*: 

\`\`\`

Static assets \(\.js, \.css, images\): Cache\-Control: public, max\-age=31536000, immutable

HTML: Cache\-Control: public, max\-age=3600

\`\`\`

\*\*Impact\*\*: \+5–8 Lighthouse points \("Serve static assets with an efficient cache policy"\)

\-\-\-

\#\#\# 5\. Minification & Compression

\*\*Current\*\*: ✅ Vite already minifies on \`npm run build\`

\*\*Verify\*\*:

\- \[ \] Run \`npm run build\` to generate production bundle

\- \[ \] Check dist/ has minified \.js/\.css files

\- \[ \] Gzip enabled on server \(enable in Vite config if needed\)

\*\*Vite Config\*\* \(vite\.config\.js\):

\`\`\`javascript

export default \{

  build: \{

    minify: 'terser', // Already default

    sourcemap: false,  // Remove for production

  \},

  // \.\.\. rest

\}

\`\`\`

\*\*Impact\*\*: \+2–3 Lighthouse points

\-\-\-

\#\# PHASE 2B: MEDIUM COMPLEXITY \(Weeks 2–3 — 8–12 hours\)

\#\#\# 6\. Image Format Conversion \(WebP\)

\*\*Action\*\*: Convert critical images to WebP

\*\*Tools\*\*:

\- Online: Squoosh \(squoosh\.app\)

\- CLI: ImageMagick, cwebp

\- Tools: TinyPNG with WebP export

\*\*Images to Convert\*\*:

\- \[ \] Logo: PNG \(40KB\) → WebP \(12KB\)

\- \[ \] Home hero: JPEG/PNG → WebP

\- \[ \] GetOffer hero: JPEG/PNG → WebP

\- \[ \] Trust badge icons: PNG → WebP

\*\*Update in Code\*\*:

\`\`\`html

<\!\-\- Before \-\->

<img src="logo\.png" alt="Home\-Link Logo" />

<\!\-\- After \-\->

<picture>

  <source srcset="logo\.webp" type="image/webp" />

  <img src="logo\.png" alt="Home\-Link Logo" width="120" height="36" />

</picture>

\`\`\`

\*\*Impact\*\*: \+8–12 Lighthouse points \("Serve images in next\-gen formats"\)

\-\-\-

\#\#\# 7\. Lazy Load Below\-Fold Images

\*\*Action\*\*: Add \`loading="lazy"\` to images below the fold

\*\*Home\.jsx\*\*:

\`\`\`javascript

// Above fold: remove loading="lazy"

<img src=\{LOGO\} alt="\.\.\." fetchpriority="high" />

// Below fold: add loading="lazy"

<img src=\{testimonyImage\} alt="\.\.\." loading="lazy" />

<img src=\{cityImage\} alt="\.\.\." loading="lazy" />

\`\`\`

\*\*Advanced\*\*: Use IntersectionObserver for animations:

\`\`\`javascript

// components/LazyImage\.jsx

import \{ useRef, useEffect, useState \} from 'react';

export default function LazyImage\(\{ src, alt \}\) \{

  const \[loaded, setLoaded\] = useState\(false\);

  const ref = useRef\(\);

  useEffect\(\(\) => \{

    const observer = new IntersectionObserver\(\(\[entry\]\) => \{

      if \(entry\.isIntersecting\) \{

        setLoaded\(true\);

        observer\.unobserve\(entry\.target\);

      \}

    \}\);

    observer\.observe\(ref\.current\);

    return \(\) => observer\.disconnect\(\);

  \}, \[\]\);

  return \(

    <img

      ref=\{ref\}

      src=\{loaded ? src : 'data:image/svg\+xml,%3Csvg xmlns=%22http://www\.w3\.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E'\}

      alt=\{alt\}

      loading="lazy"

    />

  \);

\}

\`\`\`

\*\*Impact\*\*: \+5–8 Lighthouse points \("Defer offscreen images"\)

\-\-\-

\#\#\# 8\. Service Worker for Caching

\*\*Create\*\*: \`public/sw\.js\`

\`\`\`javascript

const CACHE\_NAME = 'home\-link\-v1';

const urlsToCache = \[

  '/',

  '/index\.html',

  '/Home',

  '/GetOffer',

  '/Blog',

\];

self\.addEventListener\('install', \(event\) => \{

  event\.waitUntil\(

    caches\.open\(CACHE\_NAME\)\.then\(\(cache\) => \{

      return cache\.addAll\(urlsToCache\);

    \}\)

  \);

\}\);

self\.addEventListener\('fetch', \(event\) => \{

  event\.respondWith\(

    caches\.match\(event\.request\)\.then\(\(response\) => \{

      return response || fetch\(event\.request\);

    \}\)

  \);

\}\);

\`\`\`

\*\*Register in main\.jsx\*\*:

\`\`\`javascript

if \('serviceWorker' in navigator\) \{

  navigator\.serviceWorker\.register\('/sw\.js'\)\.catch\(\(\) => \{

    // Silent fail in dev

  \}\);

\}

\`\`\`

\*\*Impact\*\*: \+5–10 Lighthouse points \("Offline support"\)

\-\-\-

\#\#\# 9\. React Query Configuration

\*\*File\*\*: \`lib/query\-client\.js\`

\*\*Update\*\*:

\`\`\`javascript

import \{ QueryClient \} from '@tanstack/react\-query';

export const queryClientInstance = new QueryClient\(\{

  defaultOptions: \{

    queries: \{

      refetchOnWindowFocus: false,

      retry: 1,

      staleTime: 1000 \* 60 \* 5,        // NEW: Cache for 5 minutes

      gcTime: 1000 \* 60 \* 10,          // NEW: Garbage collect after 10 min

      queryKeyHashFn: \(\) => \{\},        // NEW: Hash only once

    \},

    mutations: \{

      retry: 1,

    \},

  \},

\}\);

\`\`\`

\*\*Impact\*\*: \+2–3 Lighthouse points \("Reduce unnecessary network requests"\)

\-\-\-

\#\#\# 10\. Debounce Form Inputs

\*\*File\*\*: \`pages/GetOffer\.jsx\` \(or any form\-heavy page\)

\*\*Add debounce utility\*\* \(lib/debounce\.js\):

\`\`\`javascript

export const debounce = \(fn, delay\) => \{

  let timeoutId;

  return \(\.\.\.args\) => \{

    clearTimeout\(timeoutId\);

    timeoutId = setTimeout\(\(\) => fn\(\.\.\.args\), delay\);

  \};

\};

\`\`\`

\*\*Use in GetOffer\*\*:

\`\`\`javascript

import \{ debounce \} from '@/lib/debounce';

export default function GetOffer\(\) \{

  // \.\.\. state

  const debouncedValidate = debounce\(\(value\) => \{

    // Expensive validation \(regex, calculations\)

    validateField\(value\);

  \}, 300\);

  const handleChange = \(e\) => \{

    setField\(e\.target\.value\);

    debouncedValidate\(e\.target\.value\);

  \};

  // \.\.\. rest

\}

\`\`\`

\*\*Impact\*\*: \+3–5 Lighthouse points \("Reduce JavaScript execution time"\)

\-\-\-

\#\# PHASE 2C: ADVANCED \(Weeks 3–4 — 15–20 hours\)

\#\#\# 11\. Component\-Level Code Splitting

\*\*Action\*\*: Break large pages into smaller lazy\-loaded chunks

\*\*Before\*\*:

\`\`\`javascript

// App\.jsx

const Home = lazy\(\(\) => import\('\./pages/Home'\)\); // ~15KB

\`\`\`

\*\*After\*\*:

\`\`\`javascript

// pages/Home/index\.jsx

const HeroSection = lazy\(\(\) => import\('\./HeroSection'\)\);      // ~2KB

const TestimonialSection = lazy\(\(\) => import\('\./Testimonials'\)\);

const FAQSection = lazy\(\(\) => import\('\./FAQ'\)\);

const CTASection = lazy\(\(\) => import\('\./CTA'\)\);

export default function Home\(\) \{

  return \(

    <>

      <HeroSection />

      <Suspense fallback=\{<Skeleton />\}>

        <TestimonialSection />

      </Suspense>

      <Suspense fallback=\{<Skeleton />\}>

        <FAQSection />

      </Suspense>

      <Suspense fallback=\{<Skeleton />\}>

        <CTASection />

      </Suspense>

    </>

  \);

\}

\`\`\`

\*\*Benefits\*\*:

\- Only load sections user sees

\- Faster initial load

\- Better caching \(each component cached separately\)

\*\*Impact\*\*: \+10–15 Lighthouse points \("Reduce JavaScript bootup time"\)

\-\-\-

\#\#\# 12\. Dynamic Imports for Heavy Libraries

\*\*Action\*\*: Load heavy libraries only when needed

\*\*Example\*\* \(DealAnalyzer page uses Recharts\):

\`\`\`javascript

// Before: Always loaded

import \{ LineChart, Line \} from 'recharts';

// After: Load on\-demand

const Recharts = lazy\(\(\) => import\('recharts'\)\.then\(m => \(\{

  default: m\.LineChart

\}\)\)\);

\`\`\`

\*\*Impact\*\*: \+5–10 Lighthouse points

\-\-\-

\#\#\# 13\. Web Workers for Heavy Compute

\*\*Action\*\*: Move expensive calculations off main thread

\*\*dealAnalyzer\.worker\.js\*\*:

\`\`\`javascript

self\.addEventListener\('message', \(e\) => \{

  const \{ arv, repairs, holdingCosts \} = e\.data;

  

  // Heavy calculation \(ARV, MAO, profit margins\)

  const maoDays = calculateMAO\(arv, repairs, holdingCosts\);

  const profit = calculateProfit\(arv, maoDays\);

  

  self\.postMessage\(\{ profit, maoDays \}\);

\}\);

\`\`\`

\*\*Use in DealAnalyzer\.jsx\*\*:

\`\`\`javascript

const worker = new Worker\(new URL\('\./dealAnalyzer\.worker\.js', import\.meta\.url\), \{

  type: 'module',

\}\);

const calculateDeal = \(formData\) => \{

  worker\.postMessage\(formData\);

  worker\.onmessage = \(e\) => setResults\(e\.data\);

\};

\`\`\`

\*\*Impact\*\*: \+5–10 Lighthouse points \("Main thread work time"\)

\-\-\-

\#\#\# 14\. Bundle Size Analysis

\*\*Action\*\*: Identify and remove unused code

\*\*Tools\*\*:

\`\`\`bash

\# Analyze bundle

npm run build \-\- \-\-ssrBuild

\# Check what's inside

npx source\-map\-explorer 'dist/\*\*/\*\.js'

\`\`\`

\*\*Common Culprits\*\*:

\- Unused UI components \(shadcn/ui\)

\- Unused color utilities \(Tailwind safelist\)

\- Old dependencies \(audit with \`npm audit\`\)

\*\*Actions\*\*:

\- \[ \] Remove unused shadcn components

\- \[ \] Tree\-shake Lodash imports

\- \[ \] Remove unused Tailwind classes from safelist

\*\*Impact\*\*: \+5–8 Lighthouse points \("Reduce JavaScript coverage"\)

\-\-\-

\#\#\# 15\. Edge Caching \(Optional, Advanced\)

\*\*If using Cloudflare/Edge network\*\*:

\`\`\`javascript

// vite\.config\.js or deploy config

export default \{

  build: \{

    minify: 'terser',

  \},

  // Set headers for edge caching

  headers: \{

    'Cache\-Control': 'public, max\-age=3600, s\-maxage=86400',

  \},

\};

\`\`\`

\*\*Impact\*\*: \+3–5 Lighthouse points \(TTFB improvement\)

\-\-\-

\#\# VERIFICATION CHECKLIST

\#\#\# After Each Phase, Run:

\`\`\`bash

\# 1\. Build production bundle

npm run build

\# 2\. Check bundle size

npx source\-map\-explorer 'dist/\*\*/\*\.js'

\# 3\. Run Lighthouse locally

npm run lighthouse

\# 4\. Submit to PageSpeed Insights

\# https://pagespeed\.web\.dev/?url=homelinkrealtygroup\.com/Home

\# 5\. Check Google Search Console

\# Console\.google\.com → Experience → Core Web Vitals

\`\`\`

\-\-\-

\#\# EXPECTED IMPROVEMENTS

| Phase | Week | LCP | FID/INP | CLS | Score |

|\-\-\-\-\-\-\-|\-\-\-\-\-\-|\-\-\-\-\-|\-\-\-\-\-\-\-\-\-|\-\-\-\-\-|\-\-\-\-\-\-\-|

| Baseline | 0 | 3\.5s | 100ms | 0\.05 | 65 |

| 2A | 1 | 3\.2s | 100ms | 0\.05 | 72 |

| 2B | 3 | 2\.2s | 85ms | 0\.05 | 82 |

| 2C | 4 | 1\.8s | 75ms | 0\.05 | \*\*90\+\*\* |

\-\-\-

\#\# TROUBLESHOOTING

\*\*LCP Still >2\.5s?\*\*

\- \[ \] Check image sizes \(oversized hero image?\)

\- \[ \] Measure React hydration time \(does page go blank?\)

\- \[ \] Check font loading \(FOUT/FOIT blocking render?\)

\*\*INP Still >100ms?\*\*

\- \[ \] Profile form validation \(reduce frequency\)

\- \[ \] Check for synchronous analytics \(move to requestIdleCallback\)

\- \[ \] Use Profiler tab in React DevTools

\*\*CLS Creeping Up?\*\*

\- \[ \] Check for late\-loaded fonts \(add explicit dimensions\)

\- \[ \] Look for unsized images/embeds

\- \[ \] Check for ads/notifications pushing content

\-\-\-

\#\# SUMMARY

\*\*Phase 2 Total Effort\*\*: 30–40 hours  

\*\*Phase 2 Total Impact\*\*: 65 → 90\+ Lighthouse score  

\*\*Phase 2 Business Impact\*\*: \+20% organic traffic, \+1% conversion

\*\*Next\*\*: Phase 3 \(Accessibility\) — WCAG 2\.1 AA compliance
