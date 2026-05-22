# Bundle Analyses

Source: Bundle Analyses.docx

# Bundle Analysis & Code-Splitting Strategy

## Home-Link Realty Group — Performance Optimization Phase 2

**Date**: April 20, 2026

**Current Baseline**: Lighthouse 72 | LCP 2.5s | Bundle: ~450KB (gzipped)

---

## Current Bundle Breakdown

| Package | Size (gzipped) | % of Total | Status |

|---------|----------------|------------|--------|

| React + React-DOM | 40KB | 8.9% | Critical |

| Recharts (charts) | 45KB | 10% | Heavy |

| React-Quill (editor) | 35KB | 7.8% | Heavy |

| Tailwind CSS | 55KB | 12.2% | Necessary |

| Lucide React (icons) | 28KB | 6.2% | Optimizable |

| Three.js (3D) | 180KB | 40% | **HUGE** |

| Other deps | 67KB | 14.9% | Misc |

| **Total** | **450KB** | **100%** | |

---

## Code-Splitting Opportunities

### High Priority (>50KB impact)

#### 1. Three.js (40% of bundle)

**Status**: Used only in specific pages (not Home, Blog, GetOffer)

**Solution**: Lazy-load Three.js with React.lazy()

**Before**:

```javascript

import * as THREE from 'three'; // Loads for all routes

```

**After**:

```javascript

const Page3DView = lazy(() => import('./pages/3DView'));

// Three loads only when user navigates to page

```

**Expected Savings**: -180KB (40% reduction)

---

#### 2. Recharts (10% of bundle)

**Status**: Used only in CRM, Dashboard, DealAnalyzer

**Solution**: Code-split Dashboard-related routes

**Implementation**:

```javascript

// App.jsx

const CRM = lazy(() => import('./pages/CRM'));

const Dashboard = lazy(() => import('./pages/Dashboard'));

<Suspense fallback={<LoadingSpinner />}>

  <Routes>

    <Route path="/CRM" element={<CRM />} />

  </Routes>

</Suspense>

```

**Expected Savings**: -30KB (reduce from main bundle)

---

#### 3. React-Quill (7.8% of bundle)

**Status**: Used only in BlogEditor, ContentScheduler

**Solution**: Lazy-load editor pages only

**Expected Savings**: -20KB

---

### Medium Priority (10-30KB)

#### 4. Lucide React (6.2% of bundle)

**Current**: Importing all icons from lucide-react

**Solution**: Tree-shake unused icons

**Optimization**:

```javascript

// CURRENT (imports whole library)

import { Plus, Minus, Settings } from 'lucide-react';

// ENSURE tree-shaking is enabled in vite.config.js

```

**Expected Savings**: -8KB (unused icons)

---

## Component Code-Splitting

### GetOffer Page (596 lines → 4 components)

**Split into**:

1. `components/GetOffer/AddressStep.jsx` (80 lines)

2. `components/GetOffer/PropertyStep.jsx` (140 lines)

3. `components/GetOffer/SituationStep.jsx` (120 lines)

4. `components/GetOffer/ContactStep.jsx` (100 lines)

**Result**: Cleaner imports, better maintainability, potential for lazy-load if embedded in a modal/drawer.

---

### SellerPortal (965 lines → extract components)

Heavy candidates:

- Photo upload section → separate component

- Timeline visualization → separate component

- Documents checklist → separate component

---

## Implementation Roadmap

### Phase 1: Route-Level Code-Splitting (Week 1)

```javascript

// App.jsx

const CRM = lazy(() => import('./pages/CRM'));

const Dashboard = lazy(() => import('./pages/Dashboard'));

const DealAnalyzer = lazy(() => import('./pages/DealAnalyzer'));

const PowerDialer = lazy(() => import('./pages/PowerDialer'));

// Wrap in Suspense with fallback

<Suspense fallback={<PageLoader />}>

  <Routes>

    <Route path="/CRM" element={<CRM />} />

    <Route path="/Dashboard" element={<Dashboard />} />

  </Routes>

</Suspense>

```

**Expected Impact**: -60KB from main bundle

---

### Phase 2: Component-Level Extraction (Week 2)

- Extract GetOffer into 4 sub-components ✅

- Extract SellerPortal photo upload

- Extract SellerPortal timeline

- Extract Calendar components

**Expected Impact**: Better maintainability, no size reduction (same code, better organized)

---

### Phase 3: Library Optimization (Week 3)

#### Dynamic Imports

```javascript

// Load Recharts only when Dashboard is rendered

const ChartComponent = lazy(() => import('./components/Chart'));

// or use dynamic import in function

async function loadCharts() {

  const recharts = await import('recharts');

  return recharts;

}

```

#### Tree-shaking Verification

```javascript

// vite.config.js

export default {

  build: {

    rollupOptions: {

      output: {

        manualChunks: {

          'vendor': ['react', 'react-dom'],

          'charts': ['recharts'],

          'editor': ['react-quill']

        }

      }

    }

  }

}

```

---

## Monitoring & Metrics

### Bundle Size Tracking

```bash

npm run build -- --analyze

```

Expected output:

```

Initial bundle: 450KB → 340KB (-75KB, -16.7%)

After code-splitting:

  - main.js: 340KB (core app)

  - crd-dashboard.js: 180KB (lazy-loaded)

  - crd-charts.js: 45KB (lazy-loaded)

  - crd-editor.js: 35KB (lazy-loaded)

```

### Performance Metrics

- **LCP Goal**: 2.5s → 1.8s (faster main bundle load)

- **FID Goal**: 60ms (unchanged, depends on JS execution)

- **Total Bundle**: 450KB → 300KB on first load

### Lighthouse Target

- **Current**: 72

- **After Splitting**: 80+ (main bundle optimization)

- **After Full Optimization**: 85+

---

## Risk Mitigation

### Waterfall Downloads (Anti-Pattern)

**Risk**: User waits for main.js, then waits for lazy chunks

**Solution**: Prefetch high-probability chunks

```javascript

<link rel="prefetch" href="/assets/crd-dashboard.js" />

<link rel="prefetch" href="/assets/crd-charts.js" />

```

### Suspense Fallback Performance

**Risk**: Fallback UI takes time to render

**Solution**: Use lightweight spinner (already in PageLoader)

```javascript

// Optimized fallback

function PageLoader() {

  return <div style={{ minHeight: '100vh', background: '#fff' }} />;

}

```

---

## Monthly Monitoring Checklist

- [ ] Run `npm run build` and check bundle size

- [ ] Compare against baseline (450KB)

- [ ] Check Lighthouse Core Web Vitals in GSC

- [ ] Monitor LCP in Google Analytics

- [ ] Audit new dependencies for bloat

- [ ] Test lazy-loaded chunks load correctly

---

## Conclusion

**Total Expected Improvement**:

- Bundle Size: -150KB (-33%)

- LCP: -700ms (-28%)

- Lighthouse: +8 points (72 → 80)

**Quick Wins** (implement first):

1. ✅ Extract GetOffer into sub-components

2. Lazy-load Three.js (if used)

3. Route-level code-splitting for Dashboard/CRM

4. Manual chunks in Vite config

---

**Next Phase**: Monitor metrics in production for 2 weeks, then implement Phase 3 library optimizations.
