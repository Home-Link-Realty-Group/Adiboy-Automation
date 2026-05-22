# InternalLinking

Source: InternalLinking.docx

import { base44 } from "@/api/base44Client";

/**

 * Maps internal linking opportunities between blog posts and city pages

 */

export const mapInternalLinks = async (blogTitle, content, category) => {

  // City pages that have related content

  const CITY_PAGES = {

    foreclosure: {

      pages: [

        { name: "Dallas Foreclosure", path: "/DallasForeclosure", city: "Dallas" },

        { name: "Detroit Foreclosure", path: "/ForeclosureDetroit", city: "Detroit" },

        { name: "Cleveland Foreclosure", path: "/ForeclosureCleveland", city: "Cleveland" },

        { name: "Indianapolis Foreclosure", path: "/ForeclosureIndianapolis", city: "Indianapolis" },

        { name: "Memphis Foreclosure", path: "/ForeclosureMemphis", city: "Memphis" },

        { name: "St. Louis Foreclosure", path: "/ForeclosureStLouis", city: "St. Louis" },

      ],

      keywords: ["foreclosure", "pre-foreclosure", "facing foreclosure", "auction"],

    },

    inherited: {

      pages: [

        { name: "Dallas Inherited Property", path: "/DallasInherited", city: "Dallas" },

        { name: "Detroit Inherited", path: "/InheritedDetroit", city: "Detroit" },

        { name: "Cleveland Inherited", path: "/InheritedCleveland", city: "Cleveland" },

        { name: "Indianapolis Inherited", path: "/InheritedIndianapolis", city: "Indianapolis" },

        { name: "Memphis Inherited", path: "/InheritedMemphis", city: "Memphis" },

        { name: "St. Louis Inherited", path: "/InheritedStLouis", city: "St. Louis" },

      ],

      keywords: ["inherited", "probate", "estate", "inherited property"],

    },

    general: {

      pages: [

        { name: "Sell House Atlanta", path: "/SellHouseAtlanta", city: "Atlanta" },

        { name: "Home Page", path: "/Home", city: "National" },

        { name: "Get Cash Offer", path: "/GetOffer", city: "National" },

        { name: "Blog", path: "/Blog", city: "National" },

      ],

      keywords: ["sell house", "cash offer", "fast sale"],

    },

  };

  const contentLower = content.toLowerCase();

  const suggestions = [];

  // Analyze category and content for relevant links

  if (category.includes("foreclosure") || contentLower.includes("foreclosure")) {

    CITY_PAGES.foreclosure.pages.forEach((page) => {

      if (contentLower.includes(page.city.toLowerCase())) {

        suggestions.push({

          anchor_text: page.name,

          target_url: page.path,

          reason: `City-specific foreclosure help for ${page.city}`,

          priority: "high",

        });

      }

    });

  }

  if (category.includes("inherited") || contentLower.includes("inherited")) {

    CITY_PAGES.inherited.pages.forEach((page) => {

      if (contentLower.includes(page.city.toLowerCase())) {

        suggestions.push({

          anchor_text: page.name,

          target_url: page.path,

          reason: `City-specific inherited property help for ${page.city}`,

          priority: "high",

        });

      }

    });

  }

  // Add general links

  CITY_PAGES.general.pages.forEach((page) => {

    if (suggestions.length < 5) {

      suggestions.push({

        anchor_text: page.name,

        target_url: page.path,

        reason: "General related resource",

        priority: "medium",

      });

    }

  });

  return suggestions.slice(0, 5); // Max 5 suggestions

};

/**

 * Generates markdown internal links from suggestions

 */

export const generateInternalLinks = (

  suggestions,

  placementPosition = "end"

) => {

  if (!suggestions || suggestions.length === 0) return "";

  const linkText = suggestions

    .map((s) => `- [${s.anchor_text}](${s.target_url})`)

    .join("\n");

  return `\n\n## Related Resources\n\n${linkText}\n`;

};

/**

 * Extracts existing internal links from content

 */

export const extractExistingLinks = (content) => {

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  const links = [];

  let match;

  while ((match = linkRegex.exec(content)) !== null) {

    links.push({

      anchor_text: match[1],

      url: match[2],

    });

  }

  return links;

};

/**

 * Analyzes internal linking score (0-100)

 */

export const analyzeInternalLinkingScore = (

  content,

  category

) => {

  const links = extractExistingLinks(content);

  let score = 0;

  const issues = [];

  // Check for any internal links

  const internalLinks = links.filter((l) => l.url.startsWith("/"));

  if (internalLinks.length >= 2) {

    score += 30;

  } else if (internalLinks.length === 1) {

    score += 15;

    issues.push("Add 1+ more internal links for better SEO flow");

  } else {

    issues.push("Add 2+ internal links to related content");

  }

  // Check for external links

  const externalLinks = links.filter((l) => l.url.startsWith("http"));

  if (externalLinks.length >= 2) {

    score += 20;

  } else {

    issues.push("Add 2+ external links to authority sources");

  }

  // Check for city pages if foreclosure/inherited

  if (category.includes("foreclosure") || category.includes("inherited")) {

    const cityLinkCount = internalLinks.filter((l) =>

      l.url.includes("Foreclosure") || l.url.includes("Inherited")

    ).length;

    if (cityLinkCount >= 1) {

      score += 25;

    } else {

      issues.push("Link to city-specific foreclosure/inherited pages");

    }

  }

  // Anchor text quality (avoid generic "click here")

  const genericAnchors = links.filter((l) =>

    ["click here", "read more", "link"].includes(l.anchor_text.toLowerCase())

  ).length;

  if (genericAnchors === 0) {

    score += 25;

  } else {

    issues.push(`Replace ${genericAnchors} generic anchor texts with descriptive ones`);

  }

  return {

    score: Math.min(score, 100),

    internal_links: internalLinks.length,

    external_links: externalLinks.length,

    issues,

  };

};
