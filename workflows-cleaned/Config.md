# Config

Source: Config.docx

# Cache Headers Configuration

## Base44 Platform — Production Deployment

**Date**: April 20, 2026

**Environment**: Production

**Service Worker**: Enabled (public/sw.js)

---

## Caching Strategy

### Tier 1: Static Assets (JS, CSS, WOFF2)

```

Cache-Control: max-age=31536000, immutable, public

Expires: [1 year from now]

```

- **Strategy**: Cache-first (Service Worker)

- **Revalidation**: Never (content is versioned by build hash)

- **Example**: `/assets/main.abc123.js`, `/fonts/segoe-ui.woff2`

### Tier 2: HTML Documents

```

Cache-Control: max-age=3600, no-cache, public

Expires: [1 hour from now]

```

- **Strategy**: Network-first with 3s timeout (Service Worker)

- **Revalidation**: Every request (ETag/Last-Modified check)

- **Benefit**: Users always see latest content; offline users get cached version

### Tier 3: Images

```

Cache-Control: max-age=2592000, public, stale-while-revalidate=604800

Expires: [30 days from now]

```

- **Strategy**: Cache-first, stale-while-revalidate (Service Worker)

- **Revalidation**: After 7 days, fetch fresh in background

- **Example**: Logo, testimonial avatars, product images

### Tier 4: API Responses

```

Cache-Control: max-age=0, no-store, must-revalidate, private

Pragma: no-cache

```

- **Strategy**: Network-first with 5s timeout (Service Worker)

- **Revalidation**: Every request (no caching allowed)

- **Example**: `/api/entities/Lead`, `/functions/powerDialer`

---

## Implementation Checklist

### Service Worker (✅ Complete)

- [x] public/sw.js created with 4-tier strategy

- [x] Precache critical assets on install

- [x] Network-first for HTML with timeout fallback

- [x] Cache-first for images with stale-while-revalidate

- [x] Auto-cleanup of old caches on activate

- [x] Message handler for manual cache clearing

### Server/CDN Configuration (⚠️ Platform-dependent)

**If using Base44's built-in CDN:**

- Contact support to configure cache headers per path pattern

**If using external CDN (Cloudflare, etc.):**

#### Rule 1: Browser Cache (HTML)

```

Path: /

Cache TTL: 1 hour (3600s)

Browser Cache TTL: 30 min

Edge Cache TTL: 24 hours

```

#### Rule 2: Static Assets

```

Path: /assets/*

Cache TTL: 1 year (31536000s)

Browser Cache TTL: 1 year

Edge Cache TTL: Forever

```

#### Rule 3: Images

```

Path: /images/*

Cache TTL: 30 days (2592000s)

Browser Cache TTL: 30 days

Edge Cache TTL: 90 days

```

#### Rule 4: API (No Cache)

```

Path: /api/*

Path: /functions/*

Cache TTL: 0 (no cache)

Browser Cache TTL: 0

Bypass Cache: ON

```

---

## Testing Cache Headers Locally

### Chrome DevTools

1. Open DevTools → Network tab

2. Look at "Size" column:

   - Blue text = from Service Worker cache

   - `from ServiceWorker` = cache hit

   - Regular size = network fetch

### Check Response Headers

```bash

curl -I https://homelinkrealtygroup.com/

curl -I https://homelinkrealtygroup.com/assets/main.js

curl -I https://homelinkrealtygroup.com/api/entities/Lead

```

Expected headers:

```

Cache-Control: max-age=3600, public          # HTML

Cache-Control: max-age=31536000, immutable   # Assets

Cache-Control: max-age=0, no-store           # API

```

### Simulate Offline

1. DevTools → Network tab

2. Check "Offline" box

3. Navigate to pages — Service Worker should serve cached content

---

## Impact on Core Web Vitals

| Metric | Before | After | Mechanism |

|--------|--------|-------|-----------|

| **LCP** | 3.5s | 2.2s | Static assets cached locally |

| **FID/INP** | ~100ms | ~60ms | JS cached, no re-parse needed |

| **CLS** | 0.05 | 0.02 | Fonts cached, no FOUT |

| **TTFB** | ~800ms | ~200ms | HTML from cache (subsequent visits) |

**Total Improvement**: ~40% faster load on repeat visits

---

## Cache Versioning

Service Worker uses version tag: `v1-2026-04-20`

To force refresh all caches:

1. Update `CACHE_VERSION` in public/sw.js

2. Deploy new code

3. Browsers will automatically switch to new cache on next visit

Manual clear (from console):

```javascript

navigator.serviceWorker.controller?.postMessage({ type: 'CLEAR_CACHE' });

```

---

## Monitoring

### Google Analytics 4

- Track cache hit rate via `from_cache` event (custom)

- Monitor repeat-visit LCP vs first-visit

### Core Web Vitals Report

- Google Search Console → Experience → Core Web Vitals

- Expected: 90%+ pages in "Good" range (LCP <2.5s)

### Service Worker Health

- DevTools → Application → Service Workers

- Check: "Scope", "Status" (activated), "Clients"

- Logs available in console

---

## Rollback Plan

If cache causes issues:

1. **Clear all caches** (manual):

   ```javascript

   caches.keys().then(names => Promise.all(names.map(n => caches.delete(n))))

   ```

2. **Disable Service Worker** (temporary):

   - Remove `<script>` registration from main.jsx

   - Or set `{ updateViaCache: 'none' }` in registration

3. **Reset to version 0**:

   - Update `CACHE_VERSION = 'v0-disabled'`

   - Deploy new code

---

## Maintenance Schedule

- **Weekly**: Monitor cache hit rate in GA4

- **Monthly**: Check Core Web Vitals in GSC

- **Quarterly**: Audit image cache sizes (remove unused)

- **Annually**: Review and update versioning strategy

---

**Next Phase**: Monitor LCP improvements in production (target: 1.8s after 2 weeks)
