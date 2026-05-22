# useschemamarkup

Source: useschemamarkup.docx

import { useEffect } from 'react';

const SITE = 'https://homelinkrealtygroup.com';

const PHONE_RAW = '+18558101786';

const EMAIL = 'jacob.levy@homelinkrealtygroup.com';

const COMPANY = 'Home-Link Realty Group LLC';

const LOGO = 'https://media.base44.com/images/public/69d48de0b96337e8cdc27f54/341fa67b3_generated_image.png';

const FAQ_ITEMS = [

  { q: 'How fast can you close?', a: 'We can close in as little as 7 days once you accept our offer. Most of our closings happen in 7–21 days. If you need more time, we can close on YOUR schedule.' },

  { q: 'Is your cash offer really fair?', a: "Our offers are based on the property's after-repair value (ARV), current market comps in your area, and the estimated cost of repairs. We're not trying to lowball you." },

  { q: 'Do I really not have to make any repairs?', a: 'Zero repairs. We buy houses in any condition — fire damage, foundation issues, full gut jobs, hoarder homes, whatever. You take what you want and leave the rest.' },

  { q: 'Are there really no fees or commissions?', a: 'None. No real estate agent commissions (typically 5–6%), no closing costs, no hidden fees. What we offer is what you get. We even cover standard closing costs on our end.' },

  { q: 'How is this different from listing with an agent?', a: 'Listing with an agent takes 30–90+ days, costs you 5–6% in commissions, requires repairs and showings, and can fall through at any time. We close in days, buy as-is, and charge you nothing.' },

  { q: 'What if I owe more than my house is worth?', a: "We can still help. We work with sellers in all situations — upside-down mortgages, liens, back taxes, code violations. Call us and we'll explore every option with you." },

  { q: 'Am I obligated to accept your offer?', a: "Absolutely not. Our offer is 100% free and there's zero pressure. Take as long as you need to decide. We're not going anywhere." },

];

function injectSchema(id, data) {

  if (document.getElementById(id)) return; // Already injected — skip

  const script = document.createElement('script');

  script.type = 'application/ld+json';

  script.id = id;

  script.text = JSON.stringify(data);

  document.head.appendChild(script);

}

function setMeta(nameOrProp, content, isProp = false) {

  const attr = isProp ? 'property' : 'name';

  let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`);

  if (!el) {

    el = document.createElement('meta');

    el.setAttribute(attr, nameOrProp);

    document.head.appendChild(el);

  }

  el.setAttribute('content', content);

}

function setCanonical(href) {

  let el = document.querySelector("link[rel='canonical']");

  if (!el) {

    el = document.createElement('link');

    el.rel = 'canonical';

    document.head.appendChild(el);

  }

  el.href = href;

}

function setVerification() {

  let el = document.querySelector('meta[name="google-site-verification"]');

  if (!el) {

    el = document.createElement('meta');

    el.setAttribute('name', 'google-site-verification');

    document.head.insertBefore(el, document.head.firstChild);

  }

  el.setAttribute('content', 'sOjZDcEDrTRL1I4_sB3ssF9rNXmK2dt0-xIC-bg6CF8');

}

/**

 * Shared Organization + LocalBusiness + RealEstateAgent schema.

 * Enterprise-grade — rich results eligible, Google Knowledge Panel optimized.

 */

export function useOrganizationSchema() {

  useEffect(() => {

    setVerification();

    injectSchema('schema-organization', {

      '@context': 'https://schema.org',

      '@graph': [

        {

          '@type': ['Organization', 'RealEstateAgent'],

          '@id': `${SITE}/#organization`,

          name: COMPANY,

          legalName: COMPANY,

          description: 'Home-Link Realty Group LLC is a professional cash home buying company serving the entire United States. We buy houses in any condition — no repairs, no commissions, no fees. Fair cash offer in 24 hours. Close in 7 days.',

          url: `${SITE}/`,

          logo: { '@type': 'ImageObject', '@id': `${SITE}/#logo`, url: LOGO, contentUrl: LOGO, width: 1200, height: 630, caption: COMPANY },

          image: { '@type': 'ImageObject', url: LOGO, width: 1200, height: 630 },

          telephone: PHONE_RAW,

          email: EMAIL,

          foundingDate: '2016',

          numberOfEmployees: { '@type': 'QuantitativeValue', value: 2 },

          address: { '@type': 'PostalAddress', addressCountry: 'US', addressRegion: 'TX' },

          areaServed: { '@type': 'Country', name: 'United States' },

          aggregateRating: {

            '@type': 'AggregateRating',

            ratingValue: '5.0',

            reviewCount: '47',

            bestRating: '5',

            worstRating: '1',

          },

          contactPoint: [

            { '@type': 'ContactPoint', contactType: 'customer service', telephone: PHONE_RAW, email: EMAIL, availableLanguage: 'English', contactOption: 'TollFree', areaServed: 'US' },

            { '@type': 'ContactPoint', contactType: 'sales', telephone: PHONE_RAW, availableLanguage: 'English' },

          ],

          sameAs: ['https://www.facebook.com/homelinkrealtygroup'],

          knowsAbout: ['real estate', 'cash home buying', 'foreclosure', 'probate', 'inherited property', 'distressed property'],

          hasOfferCatalog: {

            '@type': 'OfferCatalog',

            name: 'Cash Home Buying Services',

            itemListElement: [

              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cash Home Purchase', description: 'We buy your house for cash in any condition. No repairs, no fees, close in 7 days.' } },

              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Foreclosure Prevention Sale', description: 'Sell before the auction date and protect your credit.' } },

              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Inherited Property Purchase', description: 'We buy inherited and probate properties as-is.' } },

            ],

          },

        },

        {

          '@type': 'WebSite',

          '@id': `${SITE}/#website`,

          url: SITE,

          name: 'Home-Link Realty Group',

          description: 'Sell your house fast for cash nationwide. We buy houses in any condition.',

          publisher: { '@id': `${SITE}/#organization` },

          potentialAction: {

            '@type': 'SearchAction',

            target: { '@type': 'EntryPoint', urlTemplate: `${SITE}/GetOffer?address={search_term_string}` },

            'query-input': 'required name=search_term_string',

          },

        },

      ],

    });

  }, []);

}

/**

 * FAQ schema — for Home page FAQ rich results.

 * Eligible for Google FAQ rich results in SERPs.

 * Pass enabled=false to skip injection (still safe to call as a hook).

 */

export function useFAQSchema(enabled = true) {

  useEffect(() => {

    if (!enabled) return;

    injectSchema('schema-faq', {

      '@context': 'https://schema.org',

      '@type': 'FAQPage',

      '@id': `${SITE}/#faq`,

      mainEntity: FAQ_ITEMS.map(({ q, a }) => ({

        '@type': 'Question',

        name: q,

        acceptedAnswer: { '@type': 'Answer', text: a },

      })),

    });

  }, [enabled]);

}

/**

 * Page-level meta tags: title, description, OG, Twitter, canonical.

 * Enterprise-grade — full coverage for Google, Bing, Social, Mobile.

 */

export function usePageMeta({ title, description, canonicalPath, ogTitle, ogDescription, keywords, ogType = 'website', noindex = false }) {

  useEffect(() => {

    document.title = title;

    setMeta('description', description);

    if (keywords) setMeta('keywords', keywords);

    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    setMeta('author', COMPANY);

    setMeta('rating', 'general');

    setMeta('language', 'English');

    setMeta('revisit-after', '7 days');

    setMeta('geo.region', 'US');

    setMeta('geo.placename', 'United States');

    // Open Graph

    setMeta('og:title', ogTitle || title, true);

    setMeta('og:description', ogDescription || description, true);

    setMeta('og:type', ogType, true);

    setMeta('og:url', canonicalPath.startsWith('http') ? canonicalPath : `${SITE}${canonicalPath}`, true);

    setMeta('og:image', LOGO, true);

    setMeta('og:image:width', '1200', true);

    setMeta('og:image:height', '630', true);

    setMeta('og:image:alt', `${COMPANY} — Sell My House Fast for Cash`, true);

    setMeta('og:locale', 'en_US', true);

    setMeta('og:site_name', COMPANY, true);

    // Twitter Card

    setMeta('twitter:card', 'summary_large_image');

    setMeta('twitter:title', ogTitle || title);

    setMeta('twitter:description', ogDescription || description);

    setMeta('twitter:image', LOGO);

    setMeta('twitter:image:alt', `${COMPANY} — Cash Home Buyers Nationwide`);

    setMeta('twitter:site', '@homelinkrealty');

    // Canonical

    const canonicalHref = canonicalPath.startsWith('http') ? canonicalPath : `${SITE}${canonicalPath}`;

    setCanonical(canonicalHref);

    window.gtag?.('event', 'page_view');

  }, [title, canonicalPath]);

}

/**

 * Breadcrumb schema — inject per-page breadcrumbs.

 */

export function useBreadcrumbSchema(items) {

  useEffect(() => {

    if (!items?.length) return;

    injectSchema(`schema-breadcrumb-${items.length}`, {

      '@context': 'https://schema.org',

      '@type': 'BreadcrumbList',

      itemListElement: items.map((item, i) => ({

        '@type': 'ListItem',

        position: i + 1,

        name: item.name,

        item: `${SITE}${item.path}`,

      })),

    });

  }, []);

}

/**

 * Service schema — for GetOffer and city pages.

 * Eligible for Google rich results on service pages.

 */

export function useServiceSchema({ serviceName, serviceArea }) {

  useEffect(() => {

    injectSchema(`schema-service-${serviceArea}`, {

      '@context': 'https://schema.org',

      '@type': 'Service',

      '@id': `${SITE}/GetOffer#service`,

      name: serviceName,

      description: `Home-Link Realty Group buys houses as-is for cash in ${serviceArea}. Fair cash offer in 24 hours. Close in 7 days. No repairs, no fees, no commissions.`,

      provider: {

        '@type': 'RealEstateAgent',

        '@id': `${SITE}/#organization`,

        name: COMPANY,

        telephone: PHONE_RAW,

        email: EMAIL,

        url: `${SITE}/`,

      },

      areaServed: { '@type': 'Country', name: 'United States' },

      serviceType: 'Cash Home Buying',

      category: 'Real Estate',

      hasOfferCatalog: {

        '@type': 'OfferCatalog',

        name: 'Cash Home Offer',

        itemListElement: [{

          '@type': 'Offer',

          name: 'Free Cash Offer',

          description: 'Free, no-obligation cash offer on your home. Close in as little as 7 days.',

          priceCurrency: 'USD',

          availability: 'https://schema.org/InStock',

          seller: { '@type': 'Organization', name: COMPANY, telephone: PHONE_RAW },

        }],

      },

    });

  }, [serviceName, serviceArea]);

}

/**

 * HowTo schema — for process/timeline pages.

 */

export function useHowToSchema({ name, steps }) {

  useEffect(() => {

    if (!steps?.length) return;

    injectSchema('schema-howto', {

      '@context': 'https://schema.org',

      '@type': 'HowTo',

      name,

      description: `Step-by-step process to sell your house fast for cash with ${COMPANY}.`,

      step: steps.map((s, i) => ({

        '@type': 'HowToStep',

        position: i + 1,

        name: s.name,

        text: s.text,

      })),

    });

  }, [name]);

}

/**

 * Video schema — for hero/testimonial videos. Eligible for Google video rich results.

 * Required: name, description, thumbnailUrl, uploadDate, contentUrl

 */

export function useVideoSchema({ name, description, thumbnailUrl, uploadDate, contentUrl, embedUrl, duration }) {

  useEffect(() => {

    if (!contentUrl && !embedUrl) return;

    injectSchema(`schema-video-${(name || 'v').slice(0, 20)}`, {

      '@context': 'https://schema.org',

      '@type': 'VideoObject',

      name,

      description,

      thumbnailUrl: thumbnailUrl || LOGO,

      uploadDate,

      ...(contentUrl && { contentUrl }),

      ...(embedUrl && { embedUrl }),

      ...(duration && { duration }), // ISO 8601, e.g. "PT2M30S"

      publisher: { '@type': 'Organization', name: COMPANY, logo: { '@type': 'ImageObject', url: LOGO } },

    });

  }, [name, contentUrl]);

}

/**

 * Speakable schema — flags content for Google Assistant voice search.

 * Pass an array of CSS selectors that contain the most "speakable" content.

 */

export function useSpeakableSchema(selectors = ['h1', 'h2', '.speakable']) {

  useEffect(() => {

    injectSchema('schema-speakable', {

      '@context': 'https://schema.org',

      '@type': 'WebPage',

      speakable: { '@type': 'SpeakableSpecification', cssSelector: selectors },

      url: window.location.href,

    });

  }, []);

}
