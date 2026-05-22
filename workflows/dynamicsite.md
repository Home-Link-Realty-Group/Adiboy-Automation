# dynamicsite

Source: dynamicsite.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

const BASE = "https://homelinkrealtygroup\.com";

const TODAY = new Date\(\)\.toISOString\(\)\.split\("T"\)\[0\];

const LOGO = "https://media\.base44\.com/images/public/69d48de0b96337e8cdc27f54/341fa67b3\_generated\_image\.png";

// Hero/brand images shown on homepage — included in image sitemap for Google Images

const HOME\_IMAGES = \[

  \{ loc: LOGO, title: "Home\-Link Realty Group LLC Logo", caption: "Cash home buyers nationwide — fair offer in 24 hours" \},

\];

// ─── STATIC CITY PAGES ───────────────────────────────────────────────────────

// Add new city slugs here and they auto\-appear in the sitemap immediately\.

const CITY\_PAGES = \[

  // Core — root "/" is the canonical homepage

  \{ path: "/",                  priority: "1\.0", changefreq: "weekly"  \},

  \{ path: "/GetOffer",          priority: "1\.0", changefreq: "weekly"  \},

  \{ path: "/Cities",            priority: "0\.9", changefreq: "monthly" \},

  \{ path: "/Blog",              priority: "0\.9", changefreq: "weekly"  \},

  \{ path: "/Sitemap",           priority: "0\.4", changefreq: "monthly" \},

  \{ path: "/Terms",             priority: "0\.4", changefreq: "yearly"  \},

  // Dallas

  \{ path: "/Dallas",             priority: "0\.9", changefreq: "monthly" \},

  \{ path: "/DallasForeclosure",  priority: "0\.9", changefreq: "monthly" \},

  \{ path: "/DallasInherited",    priority: "0\.9", changefreq: "monthly" \},

  // Texas

  \{ path: "/SellHouseDallas",      priority: "0\.9", changefreq: "monthly" \},

  \{ path: "/SellHouseFortWorth",   priority: "0\.88", changefreq: "monthly" \},

  \{ path: "/SellHouseHouston",     priority: "0\.88", changefreq: "monthly" \},

  \{ path: "/SellHouseSanAntonio",  priority: "0\.88", changefreq: "monthly" \},

  // Atlanta

  \{ path: "/SellHouseAtlanta",   priority: "0\.88", changefreq: "monthly" \},

  \{ path: "/ForeclosureAtlanta", priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/InheritedAtlanta",   priority: "0\.85", changefreq: "monthly" \},

  // Midwest

  \{ path: "/SellHouseDetroit",        priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/ForeclosureDetroit",      priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/InheritedDetroit",        priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseCleveland",      priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/ForeclosureCleveland",    priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/InheritedCleveland",      priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseIndianapolis",   priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/ForeclosureIndianapolis", priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/InheritedIndianapolis",   priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseStLouis",        priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/ForeclosureStLouis",      priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/InheritedStLouis",        priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseColumbus",       priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseMilwaukee",      priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseKansasCity",     priority: "0\.85", changefreq: "monthly" \},

  // South / Southeast

  \{ path: "/SellHouseMemphis",      priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/ForeclosureMemphis",    priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/InheritedMemphis",      priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseBaltimore",    priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseJacksonville", priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseBatonRouge",   priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseShreveport",   priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseLittleRock",   priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseBirmingham",   priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseTulsa",        priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseChicago",      priority: "0\.88", changefreq: "monthly" \},

  \{ path: "/SellHousePhiladelphia", priority: "0\.88", changefreq: "monthly" \},

  \{ path: "/SellHousePittsburgh",   priority: "0\.85", changefreq: "monthly" \},

  \{ path: "/SellHouseNashville",    priority: "0\.88", changefreq: "monthly" \},

  \{ path: "/SellHouseCharlotte",    priority: "0\.88", changefreq: "monthly" \},

  \{ path: "/SellHouseOrlando",      priority: "0\.88", changefreq: "monthly" \},

  \{ path: "/SellHouseLouisville",   priority: "0\.85", changefreq: "monthly" \},

\];

function escapeXml\(str\) \{

  return String\(str\)\.replace\(/&/g, "&amp;"\)\.replace\(/</g, "&lt;"\)\.replace\(/>/g, "&gt;"\)\.replace\(/"/g, "&quot;"\)\.replace\(/'/g, "&apos;"\);

\}

function imageBlock\(images = \[\]\) \{

  if \(\!images\.length\) return "";

  return images\.map\(img => \`    <image:image>

      <image:loc>$\{escapeXml\(img\.loc\)\}</image:loc>$\{img\.title ? \`\\n      <image:title>$\{escapeXml\(img\.title\)\}</image:title>\` : ""\}$\{img\.caption ? \`\\n      <image:caption>$\{escapeXml\(img\.caption\)\}</image:caption>\` : ""\}

    </image:image>\`\)\.join\("\\n"\);

\}

function urlTag\(path, priority, changefreq, lastmod = TODAY, images = \[\]\) \{

  const imgs = imageBlock\(images\);

  return \`  <url>

    <loc>$\{BASE\}$\{path\}</loc>

    <lastmod>$\{lastmod\}</lastmod>

    <changefreq>$\{changefreq\}</changefreq>

    <priority>$\{priority\}</priority>$\{imgs ? "\\n" \+ imgs : ""\}

  </url>\`;

\}

Deno\.serve\(async \(req\) => \{

  try \{

    const base44 = createClientFromRequest\(req\);

    // Fetch all published blog posts from the database

    let blogUrls = \[\];

    try \{

      const posts = await base44\.asServiceRole\.entities\.BlogPost\.filter\(\{ published: true \}\);

      blogUrls = posts

        \.filter\(p => p\.slug\)

        \.map\(p => urlTag\(

          \`/blog/$\{p\.slug\}\`,

          "0\.80",

          "monthly",

          p\.published\_date ? p\.published\_date\.split\("T"\)\[0\] : TODAY

        \)\);

    \} catch \(e\) \{

      console\.warn\("Could not fetch blog posts:", e\.message\);

    \}

    // Build static page URL tags — homepage gets image sitemap entries

    const staticUrls = CITY\_PAGES\.map\(p => urlTag\(

      p\.path,

      p\.priority,

      p\.changefreq,

      TODAY,

      p\.path === "/" ? HOME\_IMAGES : \[\]

    \)\);

    const xml = \`<?xml version="1\.0" encoding="UTF\-8"?>

<urlset

  xmlns="http://www\.sitemaps\.org/schemas/sitemap/0\.9"

  xmlns:image="http://www\.google\.com/schemas/sitemap\-image/1\.1"

  xmlns:xsi="http://www\.w3\.org/2001/XMLSchema\-instance"

  xsi:schemaLocation="http://www\.sitemaps\.org/schemas/sitemap/0\.9

    http://www\.sitemaps\.org/schemas/sitemap/0\.9/sitemap\.xsd">

  <\!\-\- ═══ STATIC PAGES \($\{staticUrls\.length\}\) ═══ \-\->

$\{staticUrls\.join\("\\n"\)\}

  <\!\-\- ═══ DYNAMIC BLOG POSTS \($\{blogUrls\.length\}\) ═══ \-\->

$\{blogUrls\.length > 0 ? blogUrls\.join\("\\n"\) : "  <\!\-\- No published blog posts yet \-\->"\}

</urlset>\`;

    return new Response\(xml, \{

      status: 200,

      headers: \{

        "Content\-Type": "application/xml; charset=utf\-8",

        "Cache\-Control": "public, max\-age=3600, stale\-while\-revalidate=86400",

        "X\-Sitemap\-Pages": String\(staticUrls\.length \+ blogUrls\.length\),

        "X\-Generated\-At": new Date\(\)\.toISOString\(\),

      \},

    \}\);

  \} catch \(error\) \{

    return new Response\(\`<?xml version="1\.0"?><error>$\{error\.message\}</error>\`, \{

      status: 500,

      headers: \{ "Content\-Type": "application/xml" \},

    \}\);

  \}

\}\);
