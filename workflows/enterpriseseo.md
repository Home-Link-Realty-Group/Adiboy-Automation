# enterpriseseo

Source: enterpriseseo.docx

import \{ useEffect \} from "react";

import \{

  usePageMeta,

  useOrganizationSchema,

  useBreadcrumbSchema,

  useServiceSchema,

  useFAQSchema,

\} from "@/hooks/useSchemaMarkup";

import \{ setMeta, setSchema, SITE\_URL \} from "@/lib/seoHelpers";

/\*\*

 \* useEnterpriseSEO — One\-call Fortune 500 SEO bundle for any public page\.

 \*

 \* Consolidates:

 \*  • Page meta \(title, description, OG, Twitter, canonical, robots, geo\)

 \*  • Organization \+ WebSite \+ Logo schema \(sitewide\)

 \*  • Breadcrumb schema

 \*  • Optional: Service schema \(city/service pages\)

 \*  • Optional: FAQ schema \(FAQ\-bearing pages\)

 \*  • Optional: LocalBusiness schema \(city pages — geo\-targeted\)

 \*  • Optional: Article/BlogPosting schema \(blog/article pages\)

 \*  • hreflang en\-US \(Google requirement for international ranking\)

 \*  • Theme color, app icons \(PWA\-grade\)

 \*

 \* Usage \(city page\):

 \*   useEnterpriseSEO\(\{

 \*     title: "Sell House Fast Atlanta GA | Cash Buyer | Home\-Link",

 \*     description: "\.\.\.",

 \*     keywords: "sell my house atlanta, cash buyer atlanta",

 \*     canonicalPath: "/SellHouseAtlanta",

 \*     breadcrumbs: \[\{ name: "Home", path: "/" \}, \{ name: "Atlanta", path: "/SellHouseAtlanta" \}\],

 \*     city: "Atlanta", state: "GA",

 \*     serviceArea: "Atlanta, GA",

 \*     hasFAQ: true,

 \*   \}\);

 \*/

export function useEnterpriseSEO\(\{

  title,

  description,

  keywords,

  canonicalPath,

  ogTitle,

  ogDescription,

  ogType = "website",

  breadcrumbs = \[\],

  city,

  state,

  serviceArea,

  hasFAQ = false,

  article,            // \{ headline, datePublished, dateModified, author, image, articleBody \}

  noindex = false,    // for landing page wrappers and gated routes

\}\) \{

  // 1\. Page meta \(title, OG, Twitter, canonical, robots, geo\)

  usePageMeta\(\{ title, description, keywords, canonicalPath, ogTitle, ogDescription, ogType, noindex \}\);

  // 2\. Sitewide Organization \+ WebSite schema

  useOrganizationSchema\(\);

  // 3\. Breadcrumb schema

  useBreadcrumbSchema\(breadcrumbs\);

  // 4\. Service schema if a service area is provided

  useServiceSchema\(\{

    serviceName: serviceArea ? \`Cash Home Buyer — $\{serviceArea\}\` : "Cash Home Buyer Nationwide",

    serviceArea: serviceArea || "United States",

  \}\);

  // 5\. FAQ schema — hook always called \(rules\-of\-hooks\); flag controls injection

  useFAQSchema\(hasFAQ\);

  // 6\. City\-targeted LocalBusiness schema \+ Article schema \+ extras

  useEffect\(\(\) => \{

    // hreflang en\-US — required for international canonical

    let hrefLang = document\.querySelector\("link\[rel='alternate'\]\[hreflang='en\-US'\]"\);

    if \(\!hrefLang\) \{

      hrefLang = document\.createElement\("link"\);

      hrefLang\.rel = "alternate";

      hrefLang\.hreflang = "en\-US";

      document\.head\.appendChild\(hrefLang\);

    \}

    hrefLang\.href = \`$\{SITE\_URL\}$\{canonicalPath\}\`;

    // x\-default hreflang — fallback for unknown locales

    let hrefDefault = document\.querySelector\("link\[rel='alternate'\]\[hreflang='x\-default'\]"\);

    if \(\!hrefDefault\) \{

      hrefDefault = document\.createElement\("link"\);

      hrefDefault\.rel = "alternate";

      hrefDefault\.hreflang = "x\-default";

      document\.head\.appendChild\(hrefDefault\);

    \}

    hrefDefault\.href = \`$\{SITE\_URL\}$\{canonicalPath\}\`;

    // Theme color \(PWA \+ mobile address bar\)

    setMeta\("theme\-color", "\#0B1F45"\);

    setMeta\("apple\-mobile\-web\-app\-capable", "yes"\);

    setMeta\("apple\-mobile\-web\-app\-status\-bar\-style", "black\-translucent"\);

    setMeta\("format\-detection", "telephone=yes"\);

    // City\-targeted LocalBusiness schema

    if \(city && state\) \{

      setSchema\(\`schema\-localbusiness\-$\{city\.toLowerCase\(\)\.replace\(/\\s\+/g, "\-"\)\}\`, \{

        "@context": "https://schema\.org",

        "@type": \["LocalBusiness", "RealEstateAgent"\],

        "@id": \`$\{SITE\_URL\}$\{canonicalPath\}\#localbusiness\`,

        name: \`Home\-Link Realty Group — $\{city\}, $\{state\}\`,

        description: \`Cash home buyer serving $\{city\}, $\{state\}\. We buy houses fast — any condition, no fees, close in 7 days\.\`,

        url: \`$\{SITE\_URL\}$\{canonicalPath\}\`,

        telephone: "\+18558101786",

        priceRange: "$$",

        image: "https://media\.base44\.com/images/public/69d48de0b96337e8cdc27f54/341fa67b3\_generated\_image\.png",

        address: \{ "@type": "PostalAddress", addressLocality: city, addressRegion: state, addressCountry: "US" \},

        areaServed: \[

          \{ "@type": "City", name: city, containedInPlace: \{ "@type": "State", name: state \} \},

        \],

        openingHoursSpecification: \[

          \{ "@type": "OpeningHoursSpecification", dayOfWeek: \["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"\], opens: "08:00", closes: "19:00" \},

          \{ "@type": "OpeningHoursSpecification", dayOfWeek: \["Saturday"\], opens: "09:00", closes: "14:00" \},

        \],

        aggregateRating: \{ "@type": "AggregateRating", ratingValue: "5\.0", reviewCount: "47", bestRating: "5" \},

      \}\);

    \}

    // Article / BlogPosting schema

    if \(article\) \{

      setSchema\("schema\-article", \{

        "@context": "https://schema\.org",

        "@type": article\.type || "Article",

        headline: article\.headline || title,

        description: article\.description || description,

        image: article\.image || "https://media\.base44\.com/images/public/69d48de0b96337e8cdc27f54/341fa67b3\_generated\_image\.png",

        datePublished: article\.datePublished,

        dateModified: article\.dateModified || article\.datePublished,

        author: \{

          "@type": "Organization",

          name: article\.author || "Home\-Link Realty Group",

          url: SITE\_URL,

        \},

        publisher: \{

          "@type": "Organization",

          name: "Home\-Link Realty Group LLC",

          logo: \{ "@type": "ImageObject", url: "https://media\.base44\.com/images/public/69d48de0b96337e8cdc27f54/341fa67b3\_generated\_image\.png" \},

        \},

        mainEntityOfPage: \{ "@type": "WebPage", "@id": \`$\{SITE\_URL\}$\{canonicalPath\}\` \},

        \.\.\.\(article\.articleBody && \{ articleBody: article\.articleBody \}\),

      \}\);

    \}

  \}, \[canonicalPath, city, state, JSON\.stringify\(article\)\]\);

\}
