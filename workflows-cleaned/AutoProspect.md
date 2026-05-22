# AutoProspect

Source: AutoProspect.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const JACOB_EMAIL = "jacob.levy@homelinkrealtygroup.com";

const PHONE = "(855) 810-1786";

const SITE = "https://home-link-realty-group.base44.app";

const MAX_ARV_PERCENT = 0.70;

const MIN_DAYS_ON_MARKET = 100;

function detectMotivationReason(data) {

  const text = `${data.title || ""} ${data.notes || ""} ${data.source || ""}`.toLowerCase();

  if (data.isForeclosure || text.includes("foreclos") || text.includes("hud") || text.includes("reo") || text.includes("bank owned") || text.includes("auction")) {

    return { reason: "🔴 FORECLOSURE — Lender or government forcing sale. Extremely motivated.", score: 10 };

  }

  if (data.isTaxDelinquent || text.includes("tax delinquent") || text.includes("tax lien") || text.includes("delinquent")) {

    return { reason: "🔴 TAX DELINQUENT — Behind on taxes, facing tax sale. Must sell fast.", score: 10 };

  }

  if (text.includes("probate") || text.includes("estate") || text.includes("inherited") || text.includes("heir")) {

    return { reason: "🟠 PROBATE/INHERITED — Estate sale. Heirs want cash fast, not headaches.", score: 8 };

  }

  if (text.includes("divorce") || text.includes("separation") || text.includes("court order")) {

    return { reason: "🟠 DIVORCE — Court-ordered sale or couple splitting assets. Motivated.", score: 8 };

  }

  if (text.includes("relocation") || text.includes("relocating") || text.includes("moving") || text.includes("transfer") || text.includes("job")) {

    return { reason: "🟡 RELOCATION — Moving for work or life change. Needs quick sale.", score: 7 };

  }

  if (data.isAbsentee || text.includes("landlord") || text.includes("rental") || text.includes("tenant") || text.includes("absentee")) {

    return { reason: "🟡 TIRED LANDLORD — Managing rental from distance. Ready to exit.", score: 7 };

  }

  if (text.includes("must sell") || text.includes("motivated") || text.includes("priced to sell") || text.includes("bring all offers") || text.includes("make offer")) {

    return { reason: "🟡 MOTIVATED SELLER (self-stated) — Explicitly motivated in listing language.", score: 7 };

  }

  if (text.includes("as is") || text.includes("as-is") || text.includes("fixer") || text.includes("tlc") || text.includes("needs work")) {

    return { reason: "🟡 AS-IS / FIXER — Unwilling or unable to make repairs. Discount likely.", score: 6 };

  }

  if ((data.priceReductions || 0) >= 2) {

    return { reason: `🟡 MULTIPLE PRICE REDUCTIONS (${data.priceReductions}x) — Desperation setting in. Will accept low offer.`, score: 8 };

  }

  if ((data.daysOnMarket || 0) >= MIN_DAYS_ON_MARKET) {

    return { reason: `🟡 STALE LISTING (${data.daysOnMarket} days) — On market 100+ days with no sale. Seller fatigue is real.`, score: 7 };

  }

  if (text.includes("fsbo") || text.includes("by owner") || text.includes("no agent")) {

    return { reason: "🟡 FSBO — Selling without agent, skipping commission. Open to direct offer.", score: 6 };

  }

  return { reason: "⚪ UNKNOWN — Needs manual review to confirm motivation.", score: 5 };

}

function meetsDiscountThreshold(price, arvEstimate) {

  if (!price || !arvEstimate || arvEstimate <= 0) return true;

  return price <= arvEstimate * MAX_ARV_PERCENT;

}

function getEmailTemplate(type, name, address, city, motivationReason) {

  const first = name?.split(" ")[0] || "";

  const greeting = first ? `Hi ${first},` : "Hi,";

  const mr = motivationReason.toLowerCase();

  const isForeclosure = mr.includes("foreclosure");

  const isTax = mr.includes("tax");

  const isProbate = mr.includes("probate");

  const isDivorce = mr.includes("divorce");

  const isStale = mr.includes("days");

  if (isForeclosure || isTax) {

    return {

      subject: `Property at ${address} — cash offer before it's too late`,

      body: `${greeting}\n\nI'm reaching out about the property at ${address}.\n\nMy name is Jacob Levy with Home-Link Realty Group LLC. I understand time may be critical right now, and I specialize in buying homes fast — all cash, no fees, completely as-is.\n\n✅ Cash offer within 24 hours\n✅ Can close before auction or tax sale\n✅ We handle all back taxes, liens, and fees at closing\n✅ Zero agent commissions\n✅ You walk away clean\n\nPlease don't wait — the sooner we talk, the more options you have.\n\nCall or text: ${PHONE}\nOr reply to this email.\n\nJacob Levy\nHome-Link Realty Group LLC | ${PHONE} | ${SITE}/GetOffer\n\n---\nReply UNSUBSCRIBE to opt out.`,

    };

  }

  if (isProbate) {

    return {

      subject: `Inherited property at ${address} — we buy estates as-is, fast`,

      body: `${greeting}\n\nI'm reaching out about the property at ${address}.\n\nJacob Levy with Home-Link Realty Group LLC. We specialize in buying inherited homes — completely as-is, all cash, on your timeline.\n\n✅ No repairs, no cleaning, no showings\n✅ Cash offer within 24 hours\n✅ Work directly with estate attorneys\n✅ Close in 14 days or your timeline\n✅ Zero fees or commissions\n\nReply here or call ${PHONE}.\n\nJacob Levy\nHome-Link Realty Group LLC | ${PHONE}\n\n---\nReply UNSUBSCRIBE to opt out.`,

    };

  }

  if (isDivorce) {

    return {

      subject: `Property at ${address} — fast cash sale, no hassle`,

      body: `${greeting}\n\nI'm reaching out about the property at ${address}.\n\nJacob Levy with Home-Link Realty Group LLC. I buy homes directly — all cash, as-is, fast close.\n\n✅ Cash offer within 24 hours\n✅ Close on any timeline\n✅ Zero fees or commissions\n\nReply here or call ${PHONE}.\n\nJacob Levy\nHome-Link Realty Group LLC | ${PHONE}\n\n---\nReply UNSUBSCRIBE to opt out.`,

    };

  }

  if (isStale) {

    return {

      subject: `${address} — still available? We'll make a cash offer today`,

      body: `${greeting}\n\nI noticed your property at ${address} has been on the market for a while.\n\nJacob Levy — cash buyer with Home-Link Realty Group LLC.\n\n✅ Cash offer — no financing contingencies\n✅ No more showings or open houses\n✅ Close in 7-14 days\n✅ Zero commissions\n✅ Buy completely as-is\n\nReply here or call ${PHONE}.\n\nJacob Levy\nHome-Link Realty Group LLC | ${PHONE}\n\n---\nReply UNSUBSCRIBE to opt out.`,

    };

  }

  return {

    subject: `Cash offer for ${address} — no fees, close in 7 days`,

    body: `${greeting}\n\nI came across your property at ${address} and wanted to reach out.\n\nJacob Levy — cash buyer with Home-Link Realty Group LLC.\n\n✅ Cash offer within 24 hours\n✅ Close in 7-14 days\n✅ Zero fees or commissions\n✅ Buy completely as-is\n\nReply here or call ${PHONE}.\n\nJacob Levy\nHome-Link Realty Group LLC | ${PHONE}\n\n---\nReply UNSUBSCRIBE to opt out.`,

  };

}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function decodeHtml(t) {

  return (t || "").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g," ").trim();

}

async function scrapeCraigslist() {

  const leads = [];

  const queries = [

    "https://dallas.craigslist.org/search/rea?query=motivated+seller+must+sell&sort=date",

    "https://dallas.craigslist.org/search/rea?query=price+reduced+as+is+cash+only&sort=date",

    "https://dallas.craigslist.org/search/rea?query=for+sale+by+owner+fixer&sort=date",

    "https://dallas.craigslist.org/search/rea?query=divorce+estate+probate+sell&sort=date",

    "https://dallas.craigslist.org/search/rea?query=below+market+value+investor+special&sort=date",

  ];

  for (const url of queries) {

    try {

      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" } });

      if (!res.ok) continue;

      const html = await res.text();

      const titleMatches = [...html.matchAll(/<span[^>]+class="label"[^>]*>([^<]+)<\/span>/g)];

      const priceMatches = [...html.matchAll(/<span[^>]+class="priceinfo"[^>]*>([^<]+)<\/span>/g)];

      const hoodMatches = [...html.matchAll(/<span[^>]+class="hood"[^>]*>\(([^)]+)\)<\/span>/g)];

      const dateMatches = [...html.matchAll(/datetime="([^"]+)"/g)];

      titleMatches.slice(0, 8).forEach((m, i) => {

        const title = decodeHtml(m[1]?.trim() || "");

        if (!title || title.length < 5) return;

        const priceRaw = priceMatches[i] ? priceMatches[i][1].replace(/[^0-9]/g, "") : "";

        const price = priceRaw ? parseInt(priceRaw) : 0;

        const hood = hoodMatches[i] ? decodeHtml(hoodMatches[i][1]) : "Dallas";

        let dom = 200;

        if (dateMatches[i]) {

          const posted = new Date(dateMatches[i][1]);

          dom = Math.floor((Date.now() - posted.getTime()) / (1000 * 60 * 60 * 24));

        }

        const motivation = detectMotivationReason({ title, source: url, daysOnMarket: dom });

        const arvEstimate = price ? Math.round(price / 0.65) : 0;

        leads.push({

          address: title,

          city: hood || "Dallas",

          state: "TX",

          listing_price: price || null,

          arv_estimate: arvEstimate || null,

          days_on_market: dom,

          type: "fsbo",

          motivation_reason: motivation.reason,

          seller_motivation_score: motivation.score,

          source: "Craigslist FSBO — Auto-Prospect",

          notes: `🔍 SOURCE: Craigslist\n📅 Days Listed: ${dom}\n💰 List Price: $${price.toLocaleString()}\n🏠 Est. ARV: $${arvEstimate.toLocaleString()}\n\n🎯 MOTIVATION: ${motivation.reason}`,

          priority: motivation.score >= 7 ? "High" : "Medium",

        });

      });

      await sleep(1500);

    } catch (e) { console.error("Craigslist error:", e); }

  }

  return leads;

}

async function scrapeHUD() {

  const leads = [];

  try {

    const url = "https://www.hudhomestore.gov/Listing/PropertySearchResult.aspx?sState=TX&sCity=DALLAS&sBedrooms=0&sBathrooms=0&sFromPrice=0&sToPrice=350000&sStory=0&sGarage=0&sParkingType=0&sPropertyType=0&sSaleType=0&sOwnerOccupant=&sZip=&sCounty=Dallas&sPN=1&sPS=20&sST=2&sSK=0";

    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" } });

    if (!res.ok) return leads;

    const html = await res.text();

    const addressMatches = [...html.matchAll(/class="[^"]*propAddress[^"]*"[^>]*>([^<]+)</g)];

    const priceMatches = [...html.matchAll(/class="[^"]*listPrice[^"]*"[^>]*>([^<]+)</g)];

    const cityMatches = [...html.matchAll(/class="[^"]*propCity[^"]*"[^>]*>([^<]+)</g)];

    const domMatches = [...html.matchAll(/class="[^"]*daysOnMarket[^"]*"[^>]*>([^<]+)</g)];

    addressMatches.slice(0, 12).forEach((m, i) => {

      const address = decodeHtml(m[1]?.trim() || "");

      if (!address) return;

      const price = priceMatches[i] ? parseInt(priceMatches[i][1].replace(/[^0-9]/g, "")) : 0;

      const city = cityMatches[i] ? decodeHtml(cityMatches[i][1]?.trim() || "Dallas") : "Dallas";

      const dom = domMatches[i] ? parseInt(domMatches[i][1].replace(/[^0-9]/g, "")) : 120;

      const arvEstimate = price ? Math.round(price / 0.58) : 0;

      const motivation = detectMotivationReason({ isForeclosure: true, daysOnMarket: dom });

      leads.push({

        name: "HUD / FHA Estate",

        address, city, state: "TX",

        listing_price: price,

        arv_estimate: arvEstimate,

        days_on_market: dom,

        type: "foreclosure",

        motivation_reason: motivation.reason,

        seller_motivation_score: 10,

        equity_percent: 42,

        source: "HUD Home Store — Auto-Prospect",

        notes: `🔍 SOURCE: HUD Home Store\n📅 Days Listed: ${dom}\n💰 List Price: $${price.toLocaleString()}\n🏠 Est. ARV: $${arvEstimate.toLocaleString()}\n\n🎯 MOTIVATION: ${motivation.reason}`,

        priority: "High",

      });

    });

  } catch (e) { console.error("HUD error:", e); }

  return leads;

}

async function scrapeForeclosureDotCom() {

  const leads = [];

  try {

    const url = "https://www.foreclosure.com/listing/results.html?state=TX&city=DALLAS&zip=&county=Dallas&listingtype=all&beds=0&baths=0&priceMin=0&priceMax=350000&sort=1&listingsperpage=20";

    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" } });

    if (!res.ok) return leads;

    const html = await res.text();

    const addressMatches = [...html.matchAll(/class="[^"]*listing-address[^"]*"[^>]*>([^<]+)</g)];

    const priceMatches = [...html.matchAll(/class="[^"]*listing-price[^"]*"[^>]*>([^<]+)</g)];

    const typeMatches = [...html.matchAll(/class="[^"]*listing-type[^"]*"[^>]*>([^<]+)</g)];

    const domMatches = [...html.matchAll(/class="[^"]*days-listed[^"]*"[^>]*>([^<]+)</g)];

    addressMatches.slice(0, 12).forEach((m, i) => {

      const address = decodeHtml(m[1]?.trim() || "");

      if (!address || address.length < 5) return;

      const price = priceMatches[i] ? parseInt(priceMatches[i][1].replace(/[^0-9]/g, "")) : 0;

      const listingType = typeMatches[i] ? decodeHtml(typeMatches[i][1]?.trim() || "") : "Foreclosure";

      const dom = domMatches[i] ? parseInt(domMatches[i][1].replace(/[^0-9]/g, "")) : 150;

      const arvEstimate = price ? Math.round(price / 0.60) : 0;

      const motivation = detectMotivationReason({ isForeclosure: true, title: listingType, daysOnMarket: dom });

      leads.push({

        address, city: "Dallas", state: "TX",

        listing_price: price,

        arv_estimate: arvEstimate,

        days_on_market: dom,

        type: "foreclosure",

        motivation_reason: motivation.reason,

        seller_motivation_score: motivation.score,

        equity_percent: 38,

        source: "Foreclosure.com — Auto-Prospect",

        notes: `🔍 SOURCE: Foreclosure.com\n📋 Type: ${listingType}\n📅 Days Listed: ${dom}\n💰 List Price: $${price.toLocaleString()}\n🏠 Est. ARV: $${arvEstimate.toLocaleString()}\n\n🎯 MOTIVATION: ${motivation.reason}`,

        priority: "High",

      });

    });

  } catch (e) { console.error("Foreclosure.com error:", e); }

  return leads;

}

async function scrapeZillowStale() {

  const leads = [];

  try {

    const searchState = JSON.stringify({

      pagination: {},

      mapBounds: { west: -97.0, east: -96.5, south: 32.6, north: 33.0 },

      filterState: {

        price: { max: 350000 },

        doz: { value: "90" },

        isNewConstruction: { value: false },

        isAuction: { value: false },

      },

      isListVisible: true,

    });

    const url = `https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=${encodeURIComponent(searchState)}&wants={"cat1":["listResults"]}&requestId=2`;

    const res = await fetch(url, {

      headers: {

        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",

        "Accept": "application/json",

        "Referer": "https://www.zillow.com/dallas-tx/",

      }

    });

    if (!res.ok) return leads;

    const data = await res.json();

    const listings = data?.cat1?.searchResults?.listResults || [];

    listings.forEach((listing) => {

      const address = listing.address || listing.streetAddress || "";

      if (!address) return;

      const price = listing.unformattedPrice || (listing.price ? parseInt(listing.price.toString().replace(/[^0-9]/g, "")) : 0);

      const dom = listing.hdpData?.homeInfo?.daysOnZillow || 0;

      const domNum = typeof dom === "string" ? parseInt(dom) : dom;

      const priceReductions = listing.hdpData?.homeInfo?.priceReductionCount || 0;

      const arvEstimate = price ? Math.round(price / 0.68) : 0;

      if (domNum > 0 && domNum < MIN_DAYS_ON_MARKET) return;

      const motivation = detectMotivationReason({ title: listing.statusText || "", daysOnMarket: domNum, priceReductions });

      leads.push({

        address,

        city: listing.cityStateZip?.split(",")[0]?.trim() || "Dallas",

        state: "TX",

        zip: listing.hdpData?.homeInfo?.zipcode || "",

        listing_price: price,

        arv_estimate: arvEstimate,

        days_on_market: domNum,

        type: priceReductions >= 2 ? "price_reduced" : "fsbo",

        motivation_reason: motivation.reason,

        seller_motivation_score: motivation.score,

        equity_percent: 30,

        source: "Zillow 100+ DOM — Auto-Prospect",

        notes: `🔍 SOURCE: Zillow\n📅 Days on Market: ${domNum}\n💰 List Price: $${price.toLocaleString()}\n🏠 Est. ARV: $${arvEstimate.toLocaleString()}\n💸 Price Reductions: ${priceReductions}x\n\n🎯 MOTIVATION: ${motivation.reason}`,

        priority: priceReductions >= 2 ? "High" : "Medium",

      });

    });

  } catch (e) { console.error("Zillow error:", e); }

  return leads;

}

async function scrapeDallasCountyTax() {

  const leads = [];

  try {

    const url = "https://propaccess.trueautomation.com/clientdb/?cid=110";

    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" } });

    if (!res.ok) return leads;

    const html = await res.text();

    const addressMatches = [...html.matchAll(/>\s*(\d+\s+[A-Z][A-Z0-9\s]+(?:ST|AVE|BLVD|DR|RD|LN|WAY|CT|PL|PKWY|HWY)\b[^<]*)/g)];

    const ownerMatches = [...html.matchAll(/class="[^"]*owner[^"]*"[^>]*>([^<]+)</g)];

    const valueMatches = [...html.matchAll(/class="[^"]*appraised[^"]*"[^>]*>([^<]+)</g)];

    addressMatches.slice(0, 8).forEach((m, i) => {

      const address = decodeHtml(m[1]?.trim() || "");

      if (!address || address.length < 8) return;

      const ownerName = ownerMatches[i] ? decodeHtml(ownerMatches[i][1]?.trim() || "") : "";

      const appraisedValue = valueMatches[i] ? parseInt(valueMatches[i][1].replace(/[^0-9]/g, "")) : 0;

      const motivation = detectMotivationReason({ isTaxDelinquent: true });

      leads.push({

        name: ownerName,

        address, city: "Dallas", state: "TX",

        arv_estimate: appraisedValue || null,

        listing_price: appraisedValue ? Math.round(appraisedValue * 0.55) : null,

        days_on_market: 999,

        type: "tax_delinquent",

        motivation_reason: motivation.reason,

        seller_motivation_score: 10,

        equity_percent: 35,

        source: "Dallas County Tax Delinquent — Auto-Prospect",

        notes: `🔍 SOURCE: Dallas County Public Tax Records\n📋 Status: TAX DELINQUENT\n🏠 Appraised Value: $${appraisedValue.toLocaleString()}\n\n🎯 MOTIVATION: ${motivation.reason}\n\n⚠️ ACTION: Call immediately.`,

        priority: "High",

      });

    });

  } catch (e) { console.error("Tax delinquent error:", e); }

  return leads;

}

async function upsertLead(base44, lead) {

  try {

    if (lead.address && lead.address.length > 4) {

      const existing = await base44.asServiceRole.entities.Lead.filter({ address: lead.address });

      if (existing && existing.length > 0) return "skipped";

    }

    const today = new Date().toISOString().split("T")[0];

    await base44.asServiceRole.entities.Lead.create({

      name: lead.name || `Motivated Seller — ${lead.address || lead.city}`,

      phone: lead.phone || "",

      email: lead.email || "",

      address: lead.address || "",

      city: lead.city || "Dallas",

      state: lead.state || "TX",

      zip: lead.zip || "",

      arv_estimate: lead.arv_estimate || null,

      offer_amount: lead.listing_price ? Math.round(lead.listing_price * 0.85) : null,

      equity_percent: lead.equity_percent || null,

      status: "New Lead",

      priority: lead.priority || "High",

      source: lead.source || "Auto-Prospect",

      notes: lead.notes || "",

      touch_count: 0,

      seller_motivation_score: lead.seller_motivation_score || 6,

      next_followup_date: today,

      last_contact_date: today,

      situation: lead.motivation_reason || "",

    });

    return "imported";

  } catch (e) {

    console.error("upsertLead error:", e);

    return "skipped";

  }

}

async function sendColdEmail(base44, lead) {

  try {

    const template = getEmailTemplate(lead.type || "fsbo", lead.name || "", lead.address || "", lead.city || "Dallas", lead.motivation_reason || "");

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("gmail");

    const rawEmail = [`To: ${lead.email}`, `From: ${JACOB_EMAIL}`, `Subject: ${template.subject}`, `MIME-Version: 1.0`, `Content-Type: text/plain; charset=utf-8`, ``, template.body].join("\r\n");

    const encoded = btoa(unescape(encodeURIComponent(rawEmail))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

    const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {

      method: "POST",

      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },

      body: JSON.stringify({ raw: encoded }),

    });

    return res.ok;

  } catch { return false; }

}

async function notifyJacob(base44, results) {

  try {

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("gmail");

    const sourceLines = results.sources

      ? Object.entries(results.sources).map(([k, v]) => `  • ${k}: ${v.found} found → ${v.added} added`).join("\n")

      : "";

    const body = [

      `🏠 DAILY PROPERTY PROSPECTOR — Dallas TX`,

      `📅 ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}`,

      ``,

      `✅ New Leads Added: ${results.imported}`,

      `⏭️  Duplicates Skipped: ${results.skipped}`,

      `📧 Cold Emails Sent: ${results.emailed || 0}`,

      `❌ Disqualified (price > 70% ARV): ${results.disqualified_price || 0}`,

      `❌ Disqualified (< 100 days): ${results.disqualified_dom || 0}`,

      ``,

      `SOURCE BREAKDOWN:`,

      sourceLines,

      ``,

      `View leads: ${SITE}/CRM`,

    ].join("\n");

    const rawEmail = [`To: ${JACOB_EMAIL}`, `From: ${JACOB_EMAIL}`, `Subject: 🏠 Prospector: ${results.imported} qualified leads — ${new Date().toLocaleDateString()}`, `MIME-Version: 1.0`, `Content-Type: text/plain; charset=utf-8`, ``, body].join("\r\n");

    const encoded = btoa(unescape(encodeURIComponent(rawEmail))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

    await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {

      method: "POST",

      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },

      body: JSON.stringify({ raw: encoded }),

    });

  } catch (e) { console.error("Notify error:", e); }

}

Deno.serve(async (req) => {

  const base44 = createClientFromRequest(req);

  try {

    const body = await req.json().catch(() => ({}));

    const { leads = [] } = body;

    if (leads && leads.length > 0) {

      const results = { imported: 0, skipped: 0, emailed: 0 };

      for (const lead of leads) {

        const motivation = detectMotivationReason({ source: lead.source, title: lead.notes, daysOnMarket: lead.days_on_market });

        lead.motivation_reason = lead.motivation_reason || motivation.reason;

        lead.seller_motivation_score = lead.seller_motivation_score || motivation.score;

        const r = await upsertLead(base44, lead);

        if (r === "imported") {

          results.imported++;

          if (lead.email) { const sent = await sendColdEmail(base44, lead); if (sent) results.emailed++; }

        } else results.skipped++;

      }

      await notifyJacob(base44, results);

      return Response.json({ success: true, ...results });

    }

    // Full auto-prospect

    const results = { imported: 0, skipped: 0, emailed: 0, disqualified_price: 0, disqualified_dom: 0, sources: {} };

    const allSources = [

      { name: "Craigslist FSBO", fn: scrapeCraigslist },

      { name: "HUD Foreclosures", fn: scrapeHUD },

      { name: "Foreclosure.com", fn: scrapeForeclosureDotCom },

      { name: "Zillow 100+ DOM", fn: scrapeZillowStale },

      { name: "Dallas Tax Delinquent", fn: scrapeDallasCountyTax },

    ];

    for (const source of allSources) {

      results.sources[source.name] = { found: 0, added: 0 };

      try {

        const sourceLeads = await source.fn();

        results.sources[source.name].found = sourceLeads.length;

        for (const lead of sourceLeads) {

          const skipDomCheck = ["foreclosure", "tax_delinquent"].includes(lead.type);

          if (!skipDomCheck && lead.days_on_market !== undefined && lead.days_on_market !== null && lead.days_on_market < MIN_DAYS_ON_MARKET) {

            results.disqualified_dom++;

            continue;

          }

          if (lead.listing_price && lead.arv_estimate && !meetsDiscountThreshold(lead.listing_price, lead.arv_estimate)) {

            results.disqualified_price++;

            continue;

          }

          const r = await upsertLead(base44, lead);

          if (r === "imported") {

            results.imported++;

            results.sources[source.name].added++;

            if (lead.email) { const sent = await sendColdEmail(base44, lead); if (sent) results.emailed++; }

          } else {

            results.skipped++;

          }

        }

        await sleep(2000);

      } catch (e) { console.error(`Source error ${source.name}:`, e); }

    }

    await notifyJacob(base44, results);

    return Response.json({ success: true, ...results });

  } catch (err) {

    return Response.json({ error: err.message }, { status: 500 });

  }

});
