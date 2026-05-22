# helpers

Source: helpers.docx

/**

 * SEO helpers for consistent canonical URLs, meta tags, and schema markup

 */

const SITE = "https://homelinkrealtygroup.com";

/**

 * Set noindex meta tag (for private/internal pages)

 */

export function setNoIndex() {

  let robots = document.querySelector("meta[name='robots']");

  if (!robots) {

    robots = document.createElement("meta");

    robots.setAttribute("name", "robots");

    document.head.appendChild(robots);

  }

  robots.setAttribute("content", "noindex, nofollow");

}

/**

 * Set canonical URL for a page

 */

export function setCanonicalUrl(pathname) {

  let canonical = document.querySelector("link[rel='canonical']");

  if (!canonical) {

    canonical = document.createElement("link");

    canonical.rel = "canonical";

    document.head.appendChild(canonical);

  }

  // Normalize legacy /Home → / to prevent duplicate canonicals

  const normalized = pathname === "/Home" ? "/" : pathname;

  canonical.href = `${SITE}${normalized}`;

}

/**

 * Set meta tag (create if doesn't exist)

 */

export function setMeta(name, content, isProp = false) {

  const attr = isProp ? "property" : "name";

  let el = document.querySelector(`meta[${attr}="${name}"]`);

  if (!el) {

    el = document.createElement("meta");

    el.setAttribute(attr, name);

    document.head.appendChild(el);

  }

  el.setAttribute("content", content);

}

/**

 * Inject JSON-LD schema

 */

export function setSchema(id, schema) {

  let script = document.getElementById(id);

  if (!script) {

    script = document.createElement("script");

    script.id = id;

    script.type = "application/ld+json";

    document.head.appendChild(script);

  }

  script.text = JSON.stringify(schema);

}

export const SITE_URL = SITE;
