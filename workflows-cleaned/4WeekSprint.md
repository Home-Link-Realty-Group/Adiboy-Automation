# 4WeekSprint

Source: 4WeekSprint.docx

# WEEK-BY-WEEK EXECUTION PLAN

## Detailed Daily Tasks for 4-Week Sprint

**Start Date**: Monday, April 21, 2026

**End Date**: Friday, May 19, 2026

**Total Hours**: 86 (Phase 2: 60 hrs, Phase 3: 26 hrs)

---

## WEEK 1: FOUNDATION (April 21–25)

### Phase 2A: Performance Quick Wins (8 hours)

### Phase 3: Accessibility Audit (6 hours)

#### Monday (4 hours)

- [ ] **9:00–9:30** — Team sync: Review roadmap, set expectations

- [ ] **9:30–10:00** — Font-display fix (index.css): Add `&display=swap` to Google Fonts

- [ ] **10:00–10:30** — Run axe DevTools audit on Home page, log issues

- [ ] **10:30–11:00** — Screenshot baseline Lighthouse score (take today as Week 0)

- [ ] **11:00–12:00** — Run axe on 5 critical pages (GetOffer, Blog, PowerDialer, CRM, Dashboard)

- [ ] **1:00–2:00** — Manual keyboard testing (navigate Home without mouse)

- [ ] **2:00–3:00** — Create list of missing alt text (all images on Home + GetOffer)

**Deliverable**: Baseline metrics (Lighthouse 65, Accessibility 0%, Keyboard issues logged)

---

#### Tuesday (4 hours)

- [ ] **9:00–10:00** — Defer TrustedForm script (GetOffer.jsx) — load only on focus

- [ ] **10:00–11:00** — Review robots.txt, verify sitemap submitted to GSC

- [ ] **11:00–12:00** — Add alt text to Home page images (≥5 images: logo, hero, trust badges)

- [ ] **1:00–2:00** — Check color contrast on all text (use WebAIM Contrast Checker)

- [ ] **2:00–3:00** — Test form labels (GetOffer form — verify screen reader sees labels)

**Deliverable**: TrustedForm deferred, 5+ images have alt text, contrast audit complete

---

#### Wednesday (4 hours)

- [ ] **9:00–10:00** — Update index.css with proper font-display strategy

- [ ] **10:00–11:00** — Add focus indicators to index.css (`:focus-visible` rule)

- [ ] **11:00–12:00** — Cache headers configuration (deploy config update)

- [ ] **1:00–2:00** — Add ARIA labels to GetOffer form (aria-label, aria-invalid)

- [ ] **2:00–3:00** — Document Phase 2A completion, run updated Lighthouse

**Deliverable**: 3 CSS/config updates done, GetOffer form ARIA added, Lighthouse measured (expect 70–72)

---

#### Thursday (4 hours)

- [ ] **9:00–10:00** — Add alt text to remaining images (GetOffer, Blog, city pages — ≥10 more)

- [ ] **10:00–11:00** — Verify all form fields have associated <label> elements

- [ ] **11:00–12:00** — Add skip-to-main-content link to App.jsx

- [ ] **1:00–2:00** — Create web-vitals monitoring hook (lib/useWebVitals.js)

- [ ] **2:00–3:00** — Phase 3 audit summary — accessibility baseline metrics

**Deliverable**: 15+ images have alt text, all forms labeled, skip links ready, monitoring set up

---

#### Friday (2 hours)

- [ ] **9:00–10:00** — Full test run: Lighthouse on Home + GetOffer + Blog

- [ ] **10:00–11:00** — Weekly standup: metrics review, Week 2 planning

**Deliverable**: Week 1 complete — Lighthouse 70–72, Accessibility 25–35%

---

## WEEK 2: MEDIUM COMPLEXITY (April 28 – May 2)

### Phase 2B: Performance Medium Fixes (12 hours)

### Phase 3: Quick Wins Completion (6 hours)

#### Monday (4 hours)

- [ ] **9:00–10:00** — Begin WebP conversion (logo + 3 hero images)

  - Use Squoosh (squoosh.app) or TinyPNG

  - Target: 40KB PNG → 12KB WebP

- [ ] **10:00–11:00** — Update Home.jsx with `<picture>` tags (WebP + PNG fallback)

- [ ] **11:00–12:00** — Add `loading="lazy"` to below-fold images (Home, city pages)

- [ ] **1:00–2:00** — Heading hierarchy audit (verify H1 → H2 → H3 structure)

- [ ] **2:00–3:00** — Fix heading structure in Home.jsx (if needed)

**Deliverable**: Logo + hero images in WebP, <picture> tags implemented, 5+ images lazy-loaded

---

#### Tuesday (4 hours)

- [ ] **9:00–10:00** — Create public/sw.js (Service Worker skeleton)

- [ ] **10:00–11:00** — Register Service Worker in main.jsx

- [ ] **11:00–12:00** — Cache critical URLs in Service Worker (Home, GetOffer, Blog)

- [ ] **1:00–2:00** — Test offline functionality (Chrome DevTools → Application → Service Worker)

- [ ] **2:00–3:00** — Update React Query config (lib/query-client.js) — add staleTime, gcTime

**Deliverable**: Service Worker live and caching, React Query optimized, offline support tested

---

#### Wednesday (4 hours)

- [ ] **9:00–10:00** — Create lib/debounce.js utility

- [ ] **10:00–11:00** — Implement debounce in GetOffer.jsx form (address validation)

- [ ] **11:00–12:00** — Implement debounce in DealAnalyzer.jsx (ARV calculations)

- [ ] **1:00–2:00** — Form validation improvement: Add ARIA labels + error messages

- [ ] **2:00–3:00** — Test form flows (ensure debounce doesn't break UX)

**Deliverable**: Debounce utility created, 2 forms optimized, error messages ARIA-labeled

---

#### Thursday (4 hours)

- [ ] **9:00–10:00** — Review WebP conversion progress (any remaining images?)

- [ ] **10:00–11:00** — Convert 5+ additional images to WebP (trust badges, testimonial avatars, etc.)

- [ ] **11:00–12:00** — Add `alt` text to all newly converted images

- [ ] **1:00–2:00** — Test accessibility on GetOffer form with screen reader (NVDA/VoiceOver)

- [ ] **2:00–3:00** — Fix any screen reader issues found

**Deliverable**: 10+ images in WebP, full accessibility audit on forms

---

#### Friday (2 hours)

- [ ] **9:00–10:00** — Full Lighthouse + accessibility audit (Home, GetOffer, Blog)

- [ ] **10:00–11:00** — Weekly sync: expect Lighthouse 78–82, Accessibility 50–60%

**Deliverable**: Week 2 complete — Lighthouse 78–82, Accessibility 50–60%, LCP 2.5–2.8s

---

## WEEK 3: ADVANCED + MEDIUM FINISHING (May 5–9)

### Phase 2C: Performance Advanced (15 hours)

### Phase 3: Medium/Advanced Fixes (8 hours)

#### Monday (4 hours)

- [ ] **9:00–10:00** — Plan component code-splitting (Home page sections)

  - HeroSection, TestimonialSection, FAQSection, CTASection

- [ ] **10:00–11:00** — Create pages/Home/HeroSection.jsx

- [ ] **11:00–12:00** — Create pages/Home/TestimonialSection.jsx

- [ ] **1:00–2:00** — Create pages/Home/FAQSection.jsx

- [ ] **2:00–3:00** — Create pages/Home/CTASection.jsx

**Deliverable**: 4 Home components split, bundled separately

---

#### Tuesday (4 hours)

- [ ] **9:00–10:00** — Update pages/Home/index.jsx to use lazy components

- [ ] **10:00–11:00** — Test Home page loads correctly (all sections render)

- [ ] **11:00–12:00** — Add Suspense fallbacks (skeleton loaders)

- [ ] **1:00–2:00** — Code-split GetOffer form (split validation logic)

- [ ] **2:00–3:00** — Test GetOffer loads and functions correctly

**Deliverable**: Home + GetOffer code-split, Suspense boundaries added, no regressions

---

#### Wednesday (4 hours)

- [ ] **9:00–10:00** — Implement Web Workers for DealAnalyzer calculations

  - Create dealAnalyzer.worker.js

- [ ] **10:00–11:00** — Update DealAnalyzer.jsx to use Web Worker

- [ ] **11:00–12:00** — Test heavy calculations run off main thread

- [ ] **1:00–2:00** — Implement ARIA live regions for dynamic form updates

- [ ] **2:00–3:00** — Test form error messages announce to screen readers

**Deliverable**: Web Worker live, calculations move off main thread, ARIA live regions working

---

#### Thursday (4 hours)

- [ ] **9:00–10:00** — Bundle size analysis: `npm run build && npx source-map-explorer`

- [ ] **10:00–11:00** — Identify unused code (unused components, heavy dependencies)

- [ ] **11:00–12:00** — Remove/tree-shake unused code (target -5–10% bundle size)

- [ ] **1:00–2:00** — Advanced a11y: Test custom select/date components

- [ ] **2:00–3:00** — Implement motion preference media query (@prefers-reduced-motion)

**Deliverable**: Bundle reduced, motion preferences respected, custom components accessible

---

#### Friday (4 hours)

- [ ] **9:00–10:00** — Full performance audit: Lighthouse on all critical pages

- [ ] **10:00–11:00** — Full accessibility audit: axe + manual screen reader test

- [ ] **11:00–12:00** — Week 3 metrics: Expect Lighthouse 88–92, Accessibility 80–90%

- [ ] **1:00–2:00** — Final testing + bug fixes

**Deliverable**: Week 3 complete — Lighthouse 88–92, Accessibility 80–90%, LCP <2.0s

---

## WEEK 4: FINAL PUSH + TESTING (May 12–16)

### Phase 2C: Final Optimization (5 hours)

### Phase 3: Advanced Testing + Certification (8 hours)

#### Monday (4 hours)

- [ ] **9:00–10:00** — Edge caching setup (if using Cloudflare)

- [ ] **10:00–11:00** — Final bundle optimization (any remaining low-hanging fruit)

- [ ] **11:00–12:00** — Performance testing in production (measure real-world metrics)

- [ ] **1:00–2:00** — WCAG AA checklist: verify all 4 pillars complete

- [ ] **2:00–3:00** — Run final accessibility audit (axe + WAVE)

**Deliverable**: Production optimization complete, all WCAG AA items verified

---

#### Tuesday (4 hours)

- [ ] **9:00–10:00** — Manual keyboard testing on all pages (no mouse)

- [ ] **10:00–11:00** — Screen reader testing (NVDA/VoiceOver) on 3 pages

- [ ] **11:00–12:00** — Color contrast final check (full audit)

- [ ] **1:00–2:00** — Mobile accessibility (touch targets, hover alternatives)

- [ ] **2:00–3:00** — Document all accessibility fixes for certification

**Deliverable**: Full manual accessibility testing complete

---

#### Wednesday (4 hours)

- [ ] **9:00–10:00** — User testing setup (recruit 2–3 real users if possible)

- [ ] **10:00–11:00** — Prepare testing script (keyboard user, screen reader user)

- [ ] **11:00–12:00** — Conduct user testing sessions

- [ ] **1:00–2:00** — Document feedback, prioritize fixes

- [ ] **2:00–3:00** — Implement critical user-reported issues

**Deliverable**: User testing complete, critical issues fixed

---

#### Thursday (4 hours)

- [ ] **9:00–10:00** — Final regression testing (all features still work)

- [ ] **10:00–11:00** — Performance final check: Lighthouse on all public pages

- [ ] **11:00–12:00** — Accessibility final check: Full axe audit

- [ ] **1:00–2:00** — Document all completed items

- [ ] **2:00–3:00** — Prepare launch announcement + metrics

**Deliverable**: All regression tests pass, no new issues

---

#### Friday (2 hours)

- [ ] **9:00–10:00** — Final metrics report (before/after comparison)

- [ ] **10:00–11:00** — Team celebration 🎉 + next phase planning

**Deliverable**: Week 4 complete — Lighthouse 90+, Accessibility 95%+, Ready for launch

---

## EXPECTED WEEKLY PROGRESS

| Week | Phase | Lighthouse | LCP | Accessibility | Status |

|------|-------|------------|-----|---|---|

| 1 | 2A + 3 Audit | 65→72 | 3.5s→2.8s | 0%→35% | Quick wins |

| 2 | 2B + 3 Medium | 72→82 | 2.8s→2.2s | 35%→60% | Images optimized |

| 3 | 2C + 3 Adv | 82→90 | 2.2s→1.8s | 60%→85% | Code split |

| 4 | Final polish | 90→92+ | <1.8s | 85%→95%+ | ✅ Ship it |

---

## DAILY STANDUP TEMPLATE (10 min, 9:00 AM)

**What we did yesterday**:

- Phase 2 tasks completed

- Accessibility audit progress

**What we're doing today**:

- Next Phase 2 tasks

- Next Phase 3 tasks

**Blockers**:

- Any dependencies needed?

- Questions for product?

---

## ROLLBACK PLAN

If any change breaks functionality:

1. **Revert last commit** (git revert)

2. **Run regression tests** (manual on affected page)

3. **Re-test in production** (if deployed)

4. **Document** what went wrong

5. **Plan fix** for next iteration

Example: If Web Worker breaks calculations, revert to sync version immediately.

---

## SUCCESS CRITERIA

### Must Have

- [ ] Lighthouse 90+ on all public pages

- [ ] Core Web Vitals all green (LCP <2.5s, FID <100ms, CLS <0.1)

- [ ] WCAG 2.1 AA compliance verified by axe audit

- [ ] No functionality regressions

- [ ] Keyboard navigation works on all pages

- [ ] Forms accessible (labels, errors, validation)

### Should Have

- [ ] Real user testing completed

- [ ] Performance monitoring set up

- [ ] Accessibility documentation complete

- [ ] User happy with speed improvement

### Nice to Have

- [ ] WCAG AAA compliance (10% of items)

- [ ] Image optimization beyond WebP (AVIF, next-gen)

- [ ] Edge caching fully configured

---

**Next**: Submit to daily standup. Measure progress daily. Celebrate wins. 🚀
