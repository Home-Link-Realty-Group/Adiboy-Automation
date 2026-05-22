# New Microsoft Word Document (3)

Source: New Microsoft Word Document (3).docx

/**

 * Performance Configuration — Enterprise Grade

 *

 * Thresholds for Core Web Vitals compliance:

 * - LCP (Largest Contentful Paint): < 2.5s

 * - FID (First Input Delay): < 100ms

 * - CLS (Cumulative Layout Shift): < 0.1

 *

 * Status:

 * ✅ All critical pages pre-loading above-fold images

 * ✅ Code splitting on all lazy routes

 * ✅ Native lazy loading on below-fold images

 * ✅ Aspect ratio locks prevent CLS

 */

export const WEB_VITALS_THRESHOLDS = {

  LCP: 2500,    // ms — target < 2.5s

  FID: 100,     // ms — target < 100ms (deprecated, use INP)

  INP: 200,     // ms — Interaction to Next Paint

  CLS: 0.1,     // score — target < 0.1

};

export const PERFORMANCE_HINTS = {

  // Image optimization strategy

  images: {

    above_fold: ['eager', 'high'], // fetchpriority, loading

    below_fold: ['lazy', 'low'],

    placeholder: '#f0f0f0',

    responsiveness: {

      mobile: '100vw',

      tablet: '50vw',

      desktop: '33vw',

    },

  },

  // Code splitting — all routes lazy loaded

  code_split: {

    chunks: 'Implemented in App.jsx via React.lazy()',

    fallback: 'PageLoader — invisible, no layout shift',

    suspension: 'Suspense boundary wraps all lazy routes',

  },

  // Resource hints

  preload: [

    // Critical logo — eliminated from LCP candidates

    { href: 'https://media.base44.com/images/public/69d48de0b96337e8cdc27f54/341fa67b3_generated_image.png', as: 'image' },

  ],

  preconnect: [

    'https://media.base44.com',

    'https://www.googletagmanager.com',

  ],

  dns_prefetch: [

    'https://api.trustedform.com',

    'https://connect.facebook.net',

  ],

  // Critical inline CSS — zero FOUC

  critical_css: true,

};

export const PAGES_OPTIMIZED = {

  '/Home': {

    above_fold_images: ['hero-background'],

    image_preload: true,

    expected_lcp: 1800,

  },

  '/GetOffer': {

    above_fold_images: ['hero-background', 'logo'],

    image_preload: true,

    expected_lcp: 1500,

  },

  '/Cities': {

    above_fold_images: ['logo'],

    image_preload: true,

    expected_lcp: 1200,

  },

  '/SellHouseAtlanta': {

    above_fold_images: ['hero-background'],

    image_preload: true,

    expected_lcp: 1800,

  },

};

export const checkWebVitalsCompliance = (vitals) => {

  const results = {

    LCP: vitals.LCP < WEB_VITALS_THRESHOLDS.LCP ? '✅ PASS' : '❌ FAIL',

    INP: vitals.INP < WEB_VITALS_THRESHOLDS.INP ? '✅ PASS' : '❌ FAIL',

    CLS: vitals.CLS < WEB_VITALS_THRESHOLDS.CLS ? '✅ PASS' : '❌ FAIL',

  };

  return results;

};
