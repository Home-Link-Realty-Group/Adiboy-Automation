# Generator

Source: Generator.docx

/**

 * Generates JSON-LD schema markup for blog articles

 * Complies with schema.org standards for SEO

 */

export const generateArticleSchema = (blogPost, siteUrl = "https://homelinkrealtygroup.com") => {

  const publishedDate = blogPost.published_date || new Date().toISOString();

  const updatedDate = blogPost.updated_date || publishedDate;

  return {

    "@context": "https://schema.org",

    "@type": "BlogPosting",

    headline: blogPost.meta_title || blogPost.title,

    description: blogPost.meta_description || blogPost.excerpt,

    image: blogPost.image_url || null,

    datePublished: publishedDate,

    dateModified: updatedDate,

    author: {

      "@type": "Organization",

      name: "Home-Link Realty Group LLC",

      url: siteUrl,

      logo: {

        "@type": "ImageObject",

        url: "https://media.base44.com/images/public/69d48de0b96337e8cdc27f54/341fa67b3_generated_image.png",

      },

    },

    publisher: {

      "@type": "Organization",

      name: "Home-Link Realty Group LLC",

      logo: {

        "@type": "ImageObject",

        url: "https://media.base44.com/images/public/69d48de0b96337e8cdc27f54/341fa67b3_generated_image.png",

      },

    },

    mainEntityOfPage: {

      "@type": "WebPage",

      "@id": `${siteUrl}/blog/${blogPost.slug}`,

    },

    articleBody: blogPost.content,

    keywords: blogPost.meta_keywords || blogPost.tags,

    articleSection: blogPost.category,

    url: `${siteUrl}/blog/${blogPost.slug}`,

  };

};

/**

 * Generates FAQ schema markup from blog content

 */

export const generateFAQSchema = (blogPost) => {

  // Extract FAQ-style sections from content

  // Format: "Q: Question?\nA: Answer."

  const faqRegex = /Q:\s*(.+?)\s*\nA:\s*(.+?)(?=\nQ:|$)/gs;

  const faqs = [];

  let match;

  while ((match = faqRegex.exec(blogPost.content)) !== null) {

    faqs.push({

      "@type": "Question",

      name: match[1],

      acceptedAnswer: {

        "@type": "Answer",

        text: match[2],

      },

    });

  }

  if (faqs.length === 0) return null;

  return {

    "@context": "https://schema.org",

    "@type": "FAQPage",

    mainEntity: faqs,

  };

};

/**

 * Generates breadcrumb schema for blog posts

 */

export const generateBreadcrumbSchema = (slug, category) => {

  const categoryMap = {

    foreclosure: "Foreclosure Help",

    inherited: "Inherited Property",

    timeline: "Real Estate Timeline",

    comparison: "Comparisons",

    education: "Education",

    process: "Process Guides",

  };

  return {

    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [

      {

        "@type": "ListItem",

        position: 1,

        name: "Home",

        item: "https://homelinkrealtygroup.com/Home",

      },

      {

        "@type": "ListItem",

        position: 2,

        name: "Blog",

        item: "https://homelinkrealtygroup.com/Blog",

      },

      {

        "@type": "ListItem",

        position: 3,

        name: categoryMap[category] || category,

        item: `https://homelinkrealtygroup.com/Blog?category=${category}`,

      },

      {

        "@type": "ListItem",

        position: 4,

        name: slug.replace(/-/g, " "),

        item: `https://homelinkrealtygroup.com/blog/${slug}`,

      },

    ],

  };

};

/**

 * Generates Article News schema for timely content

 */

export const generateNewsSchema = (blogPost, siteUrl = "https://homelinkrealtygroup.com") => {

  return {

    "@context": "https://schema.org",

    "@type": "NewsArticle",

    headline: blogPost.title,

    image: blogPost.image_url || null,

    datePublished: blogPost.published_date,

    dateModified: blogPost.updated_date,

    author: {

      "@type": "Organization",

      name: "Home-Link Realty Group LLC",

    },

    publisher: {

      "@type": "Organization",

      name: "Home-Link Realty Group LLC",

      logo: {

        "@type": "ImageObject",

        url: "https://media.base44.com/images/public/69d48de0b96337e8cdc27f54/341fa67b3_generated_image.png",

      },

    },

  };

};

/**

 * Injects schema markup into HTML head

 */

export const injectSchemaMarkup = (schemaObject, schemaId) => {

  if (!schemaObject) return;

  const existing = document.getElementById(schemaId);

  if (existing) existing.remove();

  const script = document.createElement("script");

  script.type = "application/ld+json";

  script.id = schemaId;

  script.textContent = JSON.stringify(schemaObject);

  document.head.appendChild(script);

};

/**

 * Generates complete SEO head tags for blog post

 */

export const generateSEOHeadTags = (blogPost) => {

  const tags = {

    title: blogPost.meta_title || blogPost.title,

    description: blogPost.meta_description || blogPost.excerpt,

    keywords: blogPost.meta_keywords || blogPost.tags,

    og_title: blogPost.title,

    og_description: blogPost.excerpt,

    og_image: blogPost.image_url,

    og_url: `https://homelinkrealtygroup.com/blog/${blogPost.slug}`,

    twitter_card: "summary_large_image",

    twitter_title: blogPost.title,

    twitter_description: blogPost.excerpt,

    twitter_image: blogPost.image_url,

    canonical_url: `https://homelinkrealtygroup.com/blog/${blogPost.slug}`,

  };

  return tags;

};
