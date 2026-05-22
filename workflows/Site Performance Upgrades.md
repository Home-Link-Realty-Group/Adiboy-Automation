# Site Performance Upgrades

Source: Site Performance Upgrades.docx

\# QUICK REFERENCE GUIDE

\#\# Copy/Paste Code Snippets & Common Tasks

\-\-\-

\#\# PERFORMANCE QUICK WINS

\#\#\# 1\. Font Display Strategy \(index\.css\)

\`\`\`css

/\* Add to @font\-face rules \*/

@font\-face \{

  font\-family: 'Inter';

  src: url\('\.\.\.'\) format\('woff2'\);

  font\-display: swap; /\* ← ADD THIS \*/

\}

/\* Or for Google Fonts \*/

@import url\('https://fonts\.googleapis\.com/css2?family=Segoe\+UI:wght@400;600;700;900&display=swap'\);

                                                                    /\* ↑ ADD &display=swap \*/

\`\`\`

\#\#\# 2\. Focus Indicator \(index\.css\)

\`\`\`css

:focus\-visible \{

  outline: 2px solid \#D4A843;

  outline\-offset: 2px;

\}

button:focus,

input:focus,

textarea:focus,

select:focus \{

  outline: 2px solid \#D4A843;

  outline\-offset: 2px;

\}

\`\`\`

\#\#\# 3\. Debounce Utility \(lib/debounce\.js\)

\`\`\`javascript

export const debounce = \(fn, delay\) => \{

  let timeoutId;

  return \(\.\.\.args\) => \{

    clearTimeout\(timeoutId\);

    timeoutId = setTimeout\(\(\) => fn\(\.\.\.args\), delay\);

  \};

\};

\`\`\`

\#\#\# 4\. Service Worker Registration \(main\.jsx\)

\`\`\`javascript

if \('serviceWorker' in navigator\) \{

  navigator\.serviceWorker\.register\('/sw\.js'\)\.catch\(\(\) => \{

    // Silent fail — site works without SW

  \}\);

\}

\`\`\`

\#\#\# 5\. React Query Optimization \(lib/query\-client\.js\)

\`\`\`javascript

const queryClientInstance = new QueryClient\(\{

  defaultOptions: \{

    queries: \{

      refetchOnWindowFocus: false,

      retry: 1,

      staleTime: 1000 \* 60 \* 5,    // Cache 5 min

      gcTime: 1000 \* 60 \* 10,      // Collect after 10 min

    \},

  \},

\}\);

\`\`\`

\-\-\-

\#\# ACCESSIBILITY QUICK FIXES

\#\#\# 1\. Alt Text Pattern

\`\`\`html

<\!\-\- Bad \-\->

<img src="logo\.png" />

<\!\-\- Good \-\->

<img src="logo\.png" alt="Home\-Link Realty Group — Cash Home Buyers Nationwide" width="120" height="36" />

<\!\-\- Decorative image \-\->

<img src="decoration\.png" alt="" aria\-hidden="true" />

\`\`\`

\#\#\# 2\. Form Label Pattern

\`\`\`html

<\!\-\- Bad \-\->

<input placeholder="Email" />

<\!\-\- Good \-\->

<label htmlFor="email">Email Address \*</label>

<input id="email" type="email" placeholder="your@email\.com" />

\`\`\`

\#\#\# 3\. Color Contrast Check

\`\`\`

Target Ratio: 4\.5:1 \(text\), 3:1 \(graphics\)

Use: https://webaim\.org/resources/contrastchecker/

Example: \#0B1F45 \(dark navy\) on \#FFFFFF \(white\) = 9\.8:1 ✅

\`\`\`

\#\#\# 4\. Skip Link \(App\.jsx\)

\`\`\`jsx

<a href="\#main\-content" className="sr\-only">

  Skip to main content

</a>

\{/\* Navigation \*/\}

<nav>\.\.\.</nav>

\{/\* Main content \*/\}

<main id="main\-content">

  \{/\* Page content \*/\}

</main>

\`\`\`

\#\#\# 5\. SR\-Only CSS \(index\.css\)

\`\`\`css

\.sr\-only \{

  position: absolute;

  width: 1px;

  height: 1px;

  padding: 0;

  margin: \-1px;

  overflow: hidden;

  clip: rect\(0, 0, 0, 0\);

  white\-space: nowrap;

  border\-width: 0;

\}

\.sr\-only:focus \{

  position: static;

  width: auto;

  height: auto;

  overflow: visible;

  clip: auto;

\}

\`\`\`

\#\#\# 6\. ARIA Live Region \(Form Errors\)

\`\`\`jsx

<form>

  <label htmlFor="email">Email</label>

  <input id="email" type="email" aria\-invalid=\{\!\!errors\.email\} />

  \{errors\.email && \(

    <div id="email\-error" role="alert" aria\-live="polite">

      \{errors\.email\}

    </div>

  \)\}

</form>

\`\`\`

\#\#\# 7\. Heading Hierarchy

\`\`\`html

<\!\-\- Good \-\->

<h1>Home\-Link Realty Group</h1>

<h2>Get Your Cash Offer</h2>

<h3>Fast Close in 7 Days</h3>

<\!\-\- Bad \(skips levels\) \-\->

<h1>Home\-Link Realty Group</h1>

<h3>Get Your Cash Offer</h3>  \{/\* Should be H2 \*/\}

\`\`\`

\#\#\# 8\. Semantic HTML

\`\`\`html

<\!\-\- Navigation \-\->

<nav>

  <a href="/">Home</a>

  <a href="/GetOffer">Get Offer</a>

</nav>

<\!\-\- Main content \-\->

<main>

  <article>

    <h1>Blog Post Title</h1>

    <p>Content\.\.\.</p>

  </article>

</main>

<\!\-\- Footer \-\->

<footer>

  <p>&copy; 2026 Home\-Link</p>

</footer>

\`\`\`

\-\-\-

\#\# IMAGE OPTIMIZATION

\#\#\# 1\. WebP with Fallback

\`\`\`html

<picture>

  <source srcset="logo\.webp" type="image/webp" />

  <img src="logo\.png" alt="Home\-Link Logo" width="120" height="36" />

</picture>

\`\`\`

\#\#\# 2\. Lazy Loading

\`\`\`html

<img src="below\-fold\.jpg" alt="City skyline" loading="lazy" />

\`\`\`

\#\#\# 3\. Responsive Images

\`\`\`html

<img src="logo\.png" alt="Logo"

  srcset="logo\-small\.png 400w, logo\-medium\.png 800w, logo\.png 1200w"

  sizes="\(max\-width: 600px\) 100vw, 50vw" />

\`\`\`

\-\-\-

\#\# CODE SPLITTING

\#\#\# 1\. Lazy Component

\`\`\`javascript

const MyComponent = lazy\(\(\) => import\('\./MyComponent'\)\);

export default function Page\(\) \{

  return \(

    <Suspense fallback=\{<Skeleton />\}>

      <MyComponent />

    </Suspense>

  \);

\}

\`\`\`

\#\#\# 2\. Web Worker

\`\`\`javascript

// Create: dealAnalyzer\.worker\.js

self\.addEventListener\('message', \(e\) => \{

  const result = heavyCalculation\(e\.data\);

  self\.postMessage\(result\);

\}\);

// Use in component:

const worker = new Worker\(

  new URL\('\./dealAnalyzer\.worker\.js', import\.meta\.url\),

  \{ type: 'module' \}

\);

worker\.postMessage\(data\);

worker\.onmessage = \(e\) => setResult\(e\.data\);

\`\`\`

\-\-\-

\#\# TESTING COMMANDS

\#\#\# 1\. Run Lighthouse Locally

\`\`\`bash

\# Chrome DevTools → Lighthouse tab

\# Or use CLI:

npm install \-g lighthouse

lighthouse https://homelinkrealtygroup\.com/Home \-\-view

\`\`\`

\#\#\# 2\. Accessibility Audit

\`\`\`bash

\# Install axe DevTools Chrome extension

\# Open DevTools → axe DevTools → Scan

\# Or use online WAVE:

\# https://wave\.webaim\.org/

\`\`\`

\#\#\# 3\. Bundle Analysis

\`\`\`bash

npm run build

npx source\-map\-explorer 'dist/\*\*/\*\.js'

\`\`\`

\#\#\# 4\. Color Contrast Check

\`\`\`

WebAIM Contrast Checker:

https://webaim\.org/resources/contrastchecker/

Test all text colors against backgrounds

Target: 4\.5:1 minimum

\`\`\`

\#\#\# 5\. Keyboard Testing

\`\`\`

Navigate without mouse:

\- Tab: Next element

\- Shift\+Tab: Previous element

\- Enter: Click button

\- Space: Toggle checkbox

\- Arrow keys: Navigate menu

\`\`\`

\-\-\-

\#\# FILE LOCATIONS

\#\#\# Performance

\- \`index\.html\` — Preload, GA4, Meta Pixel setup

\- \`index\.css\` — Font\-display, focus indicators, motion preference

\- \`lib/query\-client\.js\` — React Query caching

\- \`main\.jsx\` — Service Worker registration

\- \`public/sw\.js\` — Service Worker \(create new\)

\- \`lib/debounce\.js\` — Debounce utility \(create new\)

\#\#\# Accessibility

\- \`pages/GetOffer\.jsx\` — Form labels, ARIA, error handling

\- \`pages/Home\.jsx\` — Heading hierarchy, alt text

\- \`App\.jsx\` — Skip links, semantic structure

\- \`index\.css\` — SR\-only class, focus indicators

\- All \`<img>\` tags — Add alt text

\#\#\# Code Splitting

\- \`pages/Home/index\.jsx\` — Lazy components with Suspense

\- \`pages/Home/HeroSection\.jsx\` — New component \(create\)

\- \`pages/Home/TestimonialSection\.jsx\` — New component \(create\)

\- \`pages/GetOffer\.jsx\` — Code\-split form logic

\- \`dealAnalyzer\.worker\.js\` — Web Worker \(create new\)

\-\-\-

\#\# DEPLOYMENT CHECKLIST

\#\#\# Before Pushing to Production

\- \[ \] Run \`npm run build\` \(no errors\)

\- \[ \] Test locally: \`npm run preview\`

\- \[ \] Lighthouse: All pages 90\+

\- \[ \] Accessibility: axe scan <5 errors

\- \[ \] Keyboard test: Tab through all pages

\- \[ \] Screen reader: Test with NVDA/VoiceOver

\- \[ \] Mobile: Test on iPhone \+ Android

\- \[ \] Forms: Submit test

\- \[ \] Links: All working

\#\#\# After Deployment

\- \[ \] PageSpeed Insights: Check updated score

\- \[ \] Google Search Console: No crawl errors

\- \[ \] Monitor organic traffic \(next 24–48 hrs\)

\- \[ \] Monitor error rate \(Sentry, if configured\)

\- \[ \] Check Core Web Vitals in real\-time

\-\-\-

\#\# COMMON FIXES

\#\#\# Lighthouse "Unused JavaScript"

\*\*Problem\*\*: Code split components, tree\-shake unused utilities

\*\*Fix\*\*: \`npm run build && npx source\-map\-explorer\`

\#\#\# Lighthouse "Render\-Blocking Resources"

\*\*Problem\*\*: Heavy CSS/JS blocks rendering

\*\*Fix\*\*: Defer non\-critical CSS, inline critical CSS

\#\#\# Lighthouse "Excessive DOM Size"

\*\*Problem\*\*: Too many elements on page

\*\*Fix\*\*: Virtual scroll, pagination, or lazy rendering

\#\#\# Accessibility "Missing Form Labels"

\*\*Problem\*\*: Screen readers can't identify form fields

\*\*Fix\*\*: Add \`<label htmlFor="id">\` \+ \`<input id="id">\`

\#\#\# Accessibility "Low Contrast Text"

\*\*Problem\*\*: Text not readable for low\-vision users

\*\*Fix\*\*: Use WebAIM tool, increase contrast to 4\.5:1\+

\#\#\# Core Web Vitals Red \(LCP >2\.5s\)

\*\*Problem\*\*: Largest content element takes too long

\*\*Fix\*\*: Preload images, defer scripts, code split components

\-\-\-

\#\# MONITORING

\#\#\# Weekly Tasks \(Every Friday\)

\`\`\`bash

\# 1\. Lighthouse audit

https://pagespeed\.web\.dev/?url=homelinkrealtygroup\.com/Home

\# 2\. Accessibility audit

\# Chrome → Extensions → axe DevTools → Scan

\# 3\. Update KPI sheet

\# docs/KPI\_TRACKING\_SHEET\.md

\# 4\. Check rankings

\# Google Search Console → Performance → Top queries

\`\`\`

\#\#\# Monthly Tasks

\`\`\`bash

\# 1\. Full bundle analysis

npm run build && npx source\-map\-explorer 'dist/\*\*/\*\.js'

\# 2\. Organic traffic vs last month

\# GA4 → Insights

\# 3\. WCAG AA audit

\# https://www\.accessibility\-developer\-guide\.com/

\`\`\`

\-\-\-

\#\# EMERGENCY ROLLBACK

If something breaks:

\`\`\`bash

\# 1\. Identify last good commit

git log \-\-oneline

\# 2\. Revert

git revert \[commit\-hash\]

\# 3\. Push to production

git push origin main

\# 4\. Test locally

npm run preview

\# 5\. Document what went wrong

\# → Slack channel / team notes

\`\`\`

\-\-\-

\#\# RESOURCES

\- \*\*WCAG 2\.1 Guidelines\*\*: https://www\.w3\.org/WAI/WCAG21/quickref/

\- \*\*WebAIM Articles\*\*: https://webaim\.org/articles/

\- \*\*MDN Accessibility\*\*: https://developer\.mozilla\.org/en\-US/docs/Web/Accessibility

\- \*\*Google PageSpeed Insights\*\*: https://pagespeed\.web\.dev/

\- \*\*Lighthouse Docs\*\*: https://developers\.google\.com/web/tools/lighthouse

\- \*\*Squoosh \(Image Converter\)\*\*: https://squoosh\.app/

\-\-\-

\*\*Print This Page\*\* for quick reference during sprint\.  

\*\*Update as needed\*\* during implementation\.  

\*\*Bookmark tools\*\* for weekly testing\.
