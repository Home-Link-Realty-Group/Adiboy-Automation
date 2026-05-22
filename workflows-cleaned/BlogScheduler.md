# BlogScheduler

Source: BlogScheduler.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// ─────────────────────────────────────────────────────────────────────────────

// AUTO BLOG SCHEDULER

//

// Runs weekly (Monday 8am CT) via automation.

// Picks the next topic from the editorial calendar rotation,

// AI-generates a full SEO-optimized blog post, and saves it as a

// published BlogPost entity — ready for Google to crawl.

//

// TOPIC ROTATION: Cycles through high-intent real estate seller topics.

// Each topic targets a specific search intent cluster for maximum organic reach.

// ─────────────────────────────────────────────────────────────────────────────

const TOPIC_ROTATION = [

  {

    title_template: "How to Sell a House Fast During Divorce in [YEAR]: The Complete Guide",

    category: "education",

    tags: "divorce,sell fast,cash offer",

    target_kw: "sell house fast during divorce",

    search_intent: "A homeowner going through divorce who needs to sell quickly and split equity",

  },

  {

    title_template: "What Happens to Your House When You Stop Paying the Mortgage in [YEAR]",

    category: "foreclosure",

    tags: "foreclosure,mortgage,stop paying",

    target_kw: "what happens if you stop paying mortgage",

    search_intent: "A distressed homeowner who is behind on payments and scared of losing their home",

  },

  {

    title_template: "Selling an Inherited House Without a Realtor in [YEAR]: Step-by-Step",

    category: "inherited",

    tags: "inherited,probate,sell without realtor",

    target_kw: "sell inherited house without realtor",

    search_intent: "An heir who just inherited a property and wants to sell it quickly without dealing with agents",

  },

  {

    title_template: "How Long Does Probate Take Before You Can Sell an Inherited House? ([YEAR])",

    category: "inherited",

    tags: "probate,inherited,timeline",

    target_kw: "how long does probate take to sell house",

    search_intent: "Someone who inherited a property stuck in probate wondering when they can sell",

  },

  {

    title_template: "Cash Offer vs. Listing with an Agent: Which Makes You More Money in [YEAR]?",

    category: "comparison",

    tags: "cash offer,realtor,comparison,net proceeds",

    target_kw: "cash offer vs listing with agent",

    search_intent: "A homeowner comparing options and trying to figure out if a cash buyer or agent gives them more money",

  },

  {

    title_template: "How to Sell a House With Code Violations or Unpermitted Work in [YEAR]",

    category: "education",

    tags: "code violations,as-is,unpermitted",

    target_kw: "sell house with code violations",

    search_intent: "A homeowner with a property that has city violations, failed inspections, or unpermitted additions",

  },

  {

    title_template: "How to Sell a House With Tenants Inside in [YEAR]: Landlord's Guide",

    category: "education",

    tags: "tenants,landlord,tenant occupied,sell rental",

    target_kw: "sell house with tenants inside",

    search_intent: "A tired landlord who wants to sell their rental property but has tenants still living in it",

  },

  {

    title_template: "Back Property Taxes: Can You Sell Your House Before They Take It? ([YEAR])",

    category: "foreclosure",

    tags: "tax lien,back taxes,property tax,sell fast",

    target_kw: "sell house with back property taxes",

    search_intent: "A homeowner drowning in back property taxes worried about losing their home to the county",

  },

  {

    title_template: "What Is a Cash Home Buyer and How Do They Work? ([YEAR] Guide)",

    category: "education",

    tags: "cash home buyer,how it works,education",

    target_kw: "what is a cash home buyer",

    search_intent: "A homeowner who has seen 'we buy houses' signs and wants to understand how cash buyers work",

  },

  {

    title_template: "Selling a House As-Is: What Buyers Actually Look For in [YEAR]",

    category: "education",

    tags: "as-is,what buyers look for,condition",

    target_kw: "selling house as-is what to expect",

    search_intent: "A homeowner with a distressed or aging property wondering if anyone will buy it without repairs",

  },

  {

    title_template: "How to Avoid Foreclosure in [YEAR]: 7 Options Before the Auction",

    category: "foreclosure",

    tags: "avoid foreclosure,options,pre-foreclosure",

    target_kw: "how to avoid foreclosure",

    search_intent: "A homeowner in pre-foreclosure desperately looking for ways to keep or sell their home before losing it",

  },

  {

    title_template: "Pre-Foreclosure vs. Foreclosure: What's the Difference and What Should You Do?",

    category: "foreclosure",

    tags: "pre-foreclosure,foreclosure,difference",

    target_kw: "pre-foreclosure vs foreclosure difference",

    search_intent: "A homeowner confused about whether they're in pre-foreclosure or foreclosure and what options they have",

  },

];

function slugify(title) {

  return title

    .toLowerCase()

    .replace(/[^a-z0-9\s-]/g, "")

    .replace(/\s+/g, "-")

    .replace(/-+/g, "-")

    .slice(0, 80);

}

function currentYear() {

  return new Date().getFullYear();

}

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    // Allow manual trigger by admin OR automated trigger (no user)

    let user = null;

    try {

      user = await base44.auth.me();

    } catch {}

    if (user && user.role !== "admin") {

      return Response.json({ error: "Admin access required" }, { status: 403 });

    }

    // ── Determine which topic to use next ──

    // Count existing auto-generated posts to cycle the rotation

    let existingPosts = [];

    try {

      existingPosts = await base44.asServiceRole.entities.BlogPost.list("-published_date", 100);

    } catch {}

    const autoGenerated = existingPosts.filter(p => p.tags && p.tags.includes("auto-generated"));

    const topicIndex = autoGenerated.length % TOPIC_ROTATION.length;

    const topic = TOPIC_ROTATION[topicIndex];

    const finalTitle = topic.title_template.replace("[YEAR]", currentYear());

    const slug = slugify(finalTitle);

    // Check slug doesn't already exist to avoid duplicates

    const existing = existingPosts.find(p => p.slug === slug);

    if (existing) {

      return Response.json({

        ok: false,

        message: "Post with this slug already exists, skipping.",

        slug,

        next_topic_index: (topicIndex + 1) % TOPIC_ROTATION.length,

      });

    }

    // ── AI-generate the full blog post ──

    const prompt = `You are an expert real estate content writer for Home-Link Realty Group LLC, a nationwide cash home buying company.

Write a comprehensive, SEO-optimized blog post for the following:

TITLE: ${finalTitle}

PRIMARY KEYWORD: ${topic.target_kw}

TARGET READER: ${topic.search_intent}

CATEGORY: ${topic.category}

REQUIREMENTS:

- Write 900–1200 words of high-quality, authoritative content

- Use markdown formatting (## for H2, ### for H3, **bold**, bullet lists)

- Open with a compelling hook that speaks directly to the reader's pain

- Include at least 3 H2 sections with H3 subsections

- Include specific, actionable advice (not generic)

- Naturally mention that Home-Link Realty Group buys houses for cash in any condition 2–3 times (not spammy)

- End with a strong CTA section: "Get a Free Cash Offer from Home-Link Realty Group — (855) 810-1786"

- Use natural, conversational tone — like a knowledgeable friend, not a corporate robot

- Include a short excerpt (2 sentences) at the very beginning before the body, labeled EXCERPT:

- Do NOT include the title in the body content

Return the response in this exact JSON format:

{

  "excerpt": "2-sentence summary for blog feed",

  "content": "Full markdown blog post body here",

  "read_time": 6

}`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({

      prompt,

      response_json_schema: {

        type: "object",

        properties: {

          excerpt: { type: "string" },

          content: { type: "string" },

          read_time: { type: "number" },

        },

        required: ["excerpt", "content", "read_time"],

      },

    });

    // ── Save the blog post ──

    const today = new Date().toISOString().split("T")[0];

    const newPost = await base44.asServiceRole.entities.BlogPost.create({

      title: finalTitle,

      slug,

      excerpt: result.excerpt,

      content: result.content,

      category: topic.category,

      tags: topic.tags + ",auto-generated",

      read_time: result.read_time || 6,

      published: true,

      featured: false,

      published_date: today,

    });

    return Response.json({

      ok: true,

      message: "Blog post generated and published successfully.",

      post_id: newPost.id,

      title: finalTitle,

      slug,

      category: topic.category,

      published_date: today,

      word_count_approx: result.content.split(" ").length,

      next_topic_index: (topicIndex + 1) % TOPIC_ROTATION.length,

      next_topic_preview: TOPIC_ROTATION[(topicIndex + 1) % TOPIC_ROTATION.length].title_template.replace("[YEAR]", currentYear()),

    });

  } catch (error) {

    return Response.json({ error: error.message }, { status: 500 });

  }

});
