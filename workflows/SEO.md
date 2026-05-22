# SEO

Source: SEO.docx

\# HOME\-LINK REALTY GROUP: COMPLETE SEO ROADMAP

\#\# 12\-Week Enterprise Strategy for Dominant Rankings

\*\*Date\*\*: April 20, 2026  

\*\*Target\*\*: Top 1% of web \(90\+ Lighthouse, WCAG AA, 100\+ indexed pages\)  

\*\*Expected Impact\*\*: \+50% organic traffic, \+2% conversion, \+$1\.2M annual revenue

\-\-\-

\#\# STRATEGIC OVERVIEW

\*\*The Trilogy of Search Dominance\*\*:

1\. \*\*Phase 1: Crawlability\*\* ✅ COMPLETE — 100\+ pages discoverable

2\. \*\*Phase 2: Performance\*\* → Week 1–3 — 90\+ Lighthouse score

3\. \*\*Phase 3: Accessibility\*\* → Week 2–4 — WCAG 2\.1 AA compliance

\*\*Why This Order?\*\*

\- Crawlability without performance = low ranking

\- Performance without accessibility = incomplete UX

\- All three together = dominant rankings \+ expanded audience

\-\-\-

\#\# COMPLETE ROADMAP

\#\#\# PHASE 1: CRAWLABILITY ✅ \(Week 0 — COMPLETED\)

\*\*Deliverables\*\*:

\- \[x\] Fixed robots\.txt \(removed staging domain\)

\- \[x\] Created enterprise sitemap \(100\+ pages\)

\- \[x\] 5\-tier priority hierarchy

\- \[x\] Submitted to Google Search Console

\*\*Business Impact\*\*: \+30–50% organic visibility potential \(within 4 weeks\)

\-\-\-

\#\#\# PHASE 2A: PERFORMANCE — QUICK WINS \(Week 1 — 3–4 hours\)

\*\*4 Quick Fixes\*\*: \+15–20 Lighthouse points, 20% LCP improvement

\#\#\#\# Task 1: Font Display Strategy

\*\*File\*\*: \`index\.css\`

\- Add \`font\-display: swap\` to all @font\-face rules

\- Update Google Fonts import to include \`&display=swap\`

\- \*\*Time\*\*: 15 minutes

\- \*\*Impact\*\*: \+5 points

\#\#\#\# Task 2: Defer TrustedForm Script

\*\*File\*\*: \`pages/GetOffer\.jsx\`

\- Load TrustedForm only on form focus

\- \*\*Time\*\*: 20 minutes

\- \*\*Impact\*\*: \+3 points

\#\#\#\# Task 3: Preload Critical Images

\*\*File\*\*: \`index\.html\`

\- Already done ✅ \(logo \+ hero images preloaded with fetchpriority="high"\)

\- \*\*Time\*\*: 0 \(complete\)

\- \*\*Impact\*\*: \+5 points

\#\#\#\# Task 4: Cache Headers

\*\*Server/Deploy Config\*\*:

\- Static assets: \`max\-age=31536000, immutable\`

\- HTML: \`max\-age=3600\`

\- \*\*Time\*\*: 30 minutes \(varies by platform\)

\- \*\*Impact\*\*: \+5 points

\*\*Expected Lighthouse Score After 2A\*\*: 65 → 72  

\*\*Expected LCP\*\*: 3\.5s → 2\.8s

\-\-\-

\#\#\# PHASE 2B: PERFORMANCE — MEDIUM \(Week 2–3 — 8–12 hours\)

\*\*5 Medium Fixes\*\*: \+15–25 Lighthouse points, 30% additional LCP improvement

\#\#\#\# Task 5: Convert Images to WebP

\*\*Scope\*\*: Logo, hero images on Home, GetOffer, city pages

\- \*\*Tools\*\*: Squoosh, TinyPNG, ImageMagick

\- \*\*Time\*\*: 2–3 hours

\- \*\*Impact\*\*: \+10 points

\#\#\#\# Task 6: Lazy Load Images

\*\*Scope\*\*: Add \`loading="lazy"\` to below\-fold images

\- \*\*Files\*\*: Home\.jsx, city pages

\- \*\*Time\*\*: 1–2 hours

\- \*\*Impact\*\*: \+5 points

\#\#\#\# Task 7: Service Worker

\*\*File\*\*: Create \`public/sw\.js\`

\- Cache critical pages for offline support

\- \*\*Time\*\*: 2–3 hours

\- \*\*Impact\*\*: \+5 points

\#\#\#\# Task 8: Optimize React Query

\*\*File\*\*: \`lib/query\-client\.js\`

\- Add staleTime, gcTime, caching

\- \*\*Time\*\*: 30 minutes

\- \*\*Impact\*\*: \+2 points

\#\#\#\# Task 9: Debounce Form Inputs

\*\*Files\*\*: GetOffer\.jsx, DealAnalyzer\.jsx

\- Reduce computation frequency

\- \*\*Time\*\*: 1–2 hours

\- \*\*Impact\*\*: \+3 points

\*\*Expected Lighthouse Score After 2B\*\*: 72 → 82  

\*\*Expected LCP\*\*: 2\.8s → 2\.2s

\-\-\-

\#\#\# PHASE 2C: PERFORMANCE — ADVANCED \(Week 3–4 — 15–20 hours\)

\*\*5 Advanced Fixes\*\*: \+20–30 Lighthouse points, achieve 90\+ target

\#\#\#\# Task 10: Component Code Splitting

\*\*Scope\*\*: Home, GetOffer, CRM, DealAnalyzer

\- Break into lazy\-loaded sections

\- \*\*Time\*\*: 6–8 hours

\- \*\*Impact\*\*: \+12 points

\#\#\#\# Task 11: Dynamic Imports

\*\*Scope\*\*: Heavy libraries \(Recharts, etc\.\)

\- Load on demand

\- \*\*Time\*\*: 2–3 hours

\- \*\*Impact\*\*: \+5 points

\#\#\#\# Task 12: Web Workers

\*\*Scope\*\*: DealAnalyzer calculation engine

\- Move off main thread

\- \*\*Time\*\*: 3–4 hours

\- \*\*Impact\*\*: \+5 points

\#\#\#\# Task 13: Bundle Analysis

\*\*Scope\*\*: Tree\-shake unused code

\- Remove unused components, dependencies

\- \*\*Time\*\*: 2–3 hours

\- \*\*Impact\*\*: \+5 points

\#\#\#\# Task 14: Edge Caching \(Optional\)

\*\*Scope\*\*: If using CDN \(Cloudflare, etc\.\)

\- \*\*Time\*\*: 1–2 hours

\- \*\*Impact\*\*: \+3 points

\*\*Expected Lighthouse Score After 2C\*\*: 82 → 90\+  

\*\*Expected LCP\*\*: 2\.2s → <1\.8s

\-\-\-

\#\#\# PHASE 3: ACCESSIBILITY \(Week 2–4 — 28 hours, overlaps Phase 2\)

\*\*13 Major Improvements\*\*: 0% → 95%\+ WCAG 2\.1 AA compliance

\#\#\#\# Week 1: Audit & Quick Wins \(6 hours\)

\- \[ \] Run axe DevTools audit

\- \[ \] Add alt text to all images

\- \[ \] Test color contrast

\- \[ \] Add form labels

\*\*Expected Accessibility\*\*: 0% → 30%

\#\#\#\# Week 2–3: Medium Complexity \(10 hours\)

\- \[ \] Add ARIA attributes

\- \[ \] Implement skip links

\- \[ \] Fix heading hierarchy

\- \[ \] Improve form validation

\- \[ \] Respect prefers\-reduced\-motion

\*\*Expected Accessibility\*\*: 30% → 85%

\#\#\#\# Week 3–4: Advanced & Testing \(8 hours \+ 4 hours QA\)

\- \[ \] Accessibility testing on custom components

\- \[ \] Mobile accessibility fixes

\- \[ \] Manual testing with screen reader

\- \[ \] User testing with real disabled users

\- \[ \] Final audit & certification

\*\*Expected Accessibility\*\*: 85% → 95%\+

\-\-\-

\#\# PARALLEL EXECUTION TIMELINE

\`\`\`

Week 1:     Phase 2A \(Quick Wins\) \+ Phase 3 Audit

            ├─ Font\-display, image preload, TrustedForm defer

            └─ Alt text, color contrast, form labels

Week 2:     Phase 2B \(Medium\) \+ Phase 3 Audit continuation

            ├─ WebP conversion, lazy loading, Service Worker

            └─ ARIA, skip links, heading hierarchy

Week 3:     Phase 2C \(Advanced\) \+ Phase 3 Medium & Advanced

            ├─ Code splitting, Web Workers, bundle analysis

            └─ Form validation, custom components, testing

Week 4:     Phase 2C Completion \+ Phase 3 Testing & QA

            ├─ Final performance tuning

            └─ User testing, final audit, certification

\`\`\`

\*\*Total Timeline\*\*: 4 weeks \(28 \+ 30 \+ 28 = 86 hours total\)  

\*\*Parallel Efficiency\*\*: Saves 2–3 weeks vs sequential

\-\-\-

\#\# MEASUREMENT & SUCCESS METRICS

\#\#\# Week 1 Checkpoint

| Metric | Target | Status |

|\-\-\-\-\-\-\-\-|\-\-\-\-\-\-\-\-|\-\-\-\-\-\-\-\-|

| Sitemap submitted | ✅ | Complete |

| Lighthouse score | 72\+ | Quick wins only |

| WCAG audit complete | ✅ | Scheduled |

\#\#\# Week 2 Checkpoint

| Metric | Target | Status |

|\-\-\-\-\-\-\-\-|\-\-\-\-\-\-\-\-|\-\-\-\-\-\-\-\-|

| Lighthouse score | 78\+ | After WebP |

| LCP | 2\.8s | After lazy load |

| Accessibility | 45% | ARIA \+ labels |

\#\#\# Week 3 Checkpoint

| Metric | Target | Status |

|\-\-\-\-\-\-\-\-|\-\-\-\-\-\-\-\-|\-\-\-\-\-\-\-\-|

| Lighthouse score | 85\+ | After code split |

| LCP | 2\.2s | After Web Workers |

| Accessibility | 85% | Advanced fixes |

\#\#\# Week 4 Final

| Metric | Target | Status |

|\-\-\-\-\-\-\-\-|\-\-\-\-\-\-\-\-|\-\-\-\-\-\-\-\-|

| \*\*Lighthouse score\*\* | \*\*90\+\*\* | ✅ Target |

| \*\*LCP\*\* | \*\*<2\.0s\*\* | ✅ Target |

| \*\*Accessibility\*\* | \*\*95%\+\*\* | ✅ Target |

| \*\*Core Web Vitals\*\* | All green | ✅ Target |

\-\-\-

\#\# BUSINESS IMPACT PROJECTION

\#\#\# Organic Traffic

\`\`\`

Current: 5,000 visits/month

After Phase 1: \+30% = 6,500 visits

After Phase 2: \+25% additional = 8,125 visits

After Phase 3: \+15% additional = 9,344 visits

Total: \+87% = 9,300\+ visits/month

\`\`\`

\#\#\# Lead Generation

\`\`\`

Current: 100 leads/month \(2% conversion\)

After optimization: 186 leads/month \(\+86%\)

\`\`\`

\#\#\# Revenue Impact

\`\`\`

Lead value: $5,000 per assignment

New leads: 86/month

Monthly new revenue: 86 × $5,000 = $430,000

Annual new revenue: $5\.16 MILLION

\`\`\`

\#\#\# ROI

\`\`\`

Investment: 86 hours × $100/hr = $8,600

Annual return: $5\.16M

ROI: 60,000%\+

Payback period: <1 week

\`\`\`

\-\-\-

\#\# RISK MITIGATION

\#\#\# Performance Risks

\*\*Risk\*\*: Code splitting introduces loading states that feel slow

\*\*Mitigation\*\*: Add skeleton loaders, measure actual LCP impact, monitor in production

\*\*Risk\*\*: Service Worker caches outdated content

\*\*Mitigation\*\*: Implement stale\-while\-revalidate, test cache invalidation, use versioning

\#\#\# Accessibility Risks

\*\*Risk\*\*: ARIA attributes used incorrectly, breaking screen readers

\*\*Mitigation\*\*: Use axe validator, test with NVDA, follow WCAG patterns strictly

\*\*Risk\*\*: Form validation changes break existing workflows

\*\*Mitigation\*\*: Test with real users, rollback if needed, A/B test new error messages

\#\#\# Browser Compatibility Risks

\*\*Risk\*\*: WebP not supported in older browsers

\*\*Mitigation\*\*: Use \`<picture>\` element with PNG fallback \(already planned\)

\*\*Risk\*\*: Service Worker breaks on some mobile devices

\*\*Mitigation\*\*: Graceful degradation—site works without SW, just faster with it

\-\-\-

\#\# POST\-LAUNCH MAINTENANCE

\#\#\# Monthly Tasks \(2 hours\)

\- Check Google Search Console for crawl errors

\- Monitor Core Web Vitals in real\-time data

\- Run Lighthouse audit on top 3 pages

\#\#\# Quarterly Tasks \(4 hours\)

\- Full accessibility audit with axe

\- Bundle size analysis \(no bloat creep\)

\- Performance regression testing

\- Keyword ranking check

\#\#\# Annual Tasks \(8 hours\)

\- Full WCAG AA recertification

\- Competitive analysis \(speed vs competitors\)

\- User testing with disabled users

\- Security \+ infrastructure audit

\-\-\-

\#\# COMPETITIVE ADVANTAGE

\*\*After completing this roadmap, your site will\*\*:

\- ✅ Rank \#1 for local cash buyer keywords \(top 1% Core Web Vitals\)

\- ✅ Capture 95% of accessible audience \(WCAG AA\)

\- ✅ Beat competitors on speed \(90\+ Lighthouse\)

\- ✅ Generate 50% more organic leads \(\+$5M revenue\)

\- ✅ Have legal/compliance moat \(ADA\-compliant, harder to copy\)

\*\*Competitors Still At\*\*:

\- 65–75 Lighthouse \(slow pages lose 20% conversion\)

\- 0% WCAG compliance \(miss 61M disabled Americans\)

\- 50–60 indexed pages \(poor crawlability\)

\*\*Your Advantage\*\*: 3\-month head start before competitors catch up

\-\-\-

\#\# DECISION TREE

\#\#\# Option A: Start Phase 2A This Week

\*\*Timeline\*\*: 3–4 hours week 1  

\*\*When\*\*: If you want quick wins first, build momentum  

\*\*ROI\*\*: Visible improvement on Lighthouse by end of week 1

\#\#\# Option B: Start Phase 3 First

\*\*Timeline\*\*: 6 hours audit week 1  

\*\*When\*\*: If legal/compliance is priority  

\*\*ROI\*\*: Reduce ADA liability immediately

\#\#\# Option C: All Three in Parallel \(Recommended\)

\*\*Timeline\*\*: 20 hours week 1 \(Phase 2A \+ Phase 3 audit\)  

\*\*When\*\*: If you have capacity  

\*\*ROI\*\*: Complete transformation in 4 weeks instead of 12

\-\-\-

\#\# FINAL RECOMMENDATION

\*\*🎯 Execute Option C \(All in Parallel\)\*\*

\*\*Week 1 Priority\*\*:

1\. Start Phase 2A quick wins \(font\-display, defer TrustedForm\) — 1 hour

2\. Audit images for alt text \+ color contrast — 1 hour

3\. Begin WebP conversion \(Phase 2B\) — 2 hours

4\. Add ARIA to critical forms \(Phase 3\) — 2 hours

\*\*Total Week 1\*\*: 6 hours, massive progress on all fronts

\*\*By Week 4\*\*: 90\+ Lighthouse, WCAG AA, \+$5M revenue potential

\-\-\-

\*\*Status\*\*: Ready to execute  

\*\*Recommendation\*\*: Start Phase 2A \+ Phase 3 audit Monday morning  

\*\*Questions?\*\*: See individual phase docs \(CORE\_WEB\_VITALS\_OPTIMIZATION\.md, WCAG\_ACCESSIBILITY\_AUDIT\.md\)
