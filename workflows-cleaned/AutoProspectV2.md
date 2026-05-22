# AutoProspectV2

Source: AutoProspectV2.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const JACOB_EMAIL = "jacob.levy@homelinkrealtygroup.com";

const JACOB_PHONE = "+13374857368";

const COMPANY = "Home-Link Realty Group LLC";

const SITE = "https://home-link-realty-group.base44.app";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";

const TWILIO_SID = Deno.env.get("TWILIO_ACCOUNT_SID") || "";

const TWILIO_AUTH = Deno.env.get("TWILIO_AUTH_TOKEN") || "";

const MIN_DOM = 100;

const CRAIGSLIST_FEEDS = [

  { keyword: "motivated",  url: "https://dallas.craigslist.org/search/rea?format=rss&hasPic=0&search_distance=50&postal=75201&query=motivated" },

  { keyword: "as-is",      url: "https://dallas.craigslist.org/search/rea?format=rss&hasPic=0&search_distance=50&postal=75201&query=as-is" },

  { keyword: "TLC",        url: "https://dallas.craigslist.org/search/rea?format=rss&hasPic=0&search_distance=50&postal=75201&query=TLC" },

  { keyword: "Fixer",      url: "https://dallas.craigslist.org/search/rea?format=rss&hasPic=0&search_distance=50&postal=75201&query=Fixer" },

  { keyword: "updating",   url: "https://dallas.craigslist.org/search/rea?format=rss&hasPic=0&search_distance=50&postal=75201&query=updating" },

  { keyword: "cash",       url: "https://dallas.craigslist.org/search/rea?format=rss&hasPic=0&search_distance=50&postal=75201&query=cash" },

  { keyword: "cash-only",  url: "https://dallas.craigslist.org/search/rea?format=rss&hasPic=0&search_distance=50&postal=75201&query=cash-only" },

  { keyword: "bring",      url: "https://dallas.craigslist.org/search/rea?format=rss&hasPic=0&search_distance=50&postal=75201&query=bring" },

];

function scoreMotivation(title, description, keyword, pubDate) {

  const content = `${title} ${description}`.toLowerCase();

  const flags = [];

  let score = 0;

  let dom = 0;

  if (pubDate) {

    const listed = new Date(pubDate);

    dom = Math.floor((Date.now() - listed.getTime()) / (1000 * 60 * 60 * 24));

  }

  if (dom < MIN_DOM) return { score: 0, flags: [], priority: "Skip", isPrime: false, dom };

  flags.push(`📅 ${dom} DAYS LISTED`);

  score += dom >= 180 ? 12 : dom >= 150 ? 10 : dom >= 120 ? 8 : 6;

  const keywordScores = {

    "motivated":  { flag: "🔴 MOTIVATED SELLER", points: 9 },

    "as-is":      { flag: "🟠 AS-IS",             points: 7 },

    "TLC":        { flag: "🟠 NEEDS TLC",          points: 7 },

    "Fixer":      { flag: "🟡 FIXER",             points: 6 },

    "updating":   { flag: "🟡 NEEDS UPDATING",    points: 6 },

    "cash":       { flag: "🟡 CASH",              points: 5 },

    "cash-only":  { flag: "🔴 CASH ONLY",         points: 8 },

    "bring":      { flag: "🟠 BRING ALL OFFERS",  points: 8 },

  };

  const kwData = keywordScores[keyword.toLowerCase()];

  if (kwData) { flags.push(kwData.flag); score += kwData.points; }

  const hasPriceReduction = content.includes("reduced") || content.includes("price drop") || content.includes("price cut") || content.includes("lowered") || content.includes("new price") || content.includes("just reduced") || content.includes("motivated price");

  if (hasPriceReduction) { flags.push("💰 PRICE REDUCED"); score += 8; }

  const isPrime = !!(kwData && hasPriceReduction && dom >= MIN_DOM);

  if (isPrime) { flags.unshift("🎯 PRIME TARGET"); score += 10; }

  if (content.includes("must sell") || content.includes("must go")) { flags.push("🔴 MUST SELL"); score += 5; }

  if (content.includes("foreclos") || content.includes("pre-foreclos")) { flags.push("🔴 FORECLOSURE"); score += 8; }

  if (content.includes("estate") || content.includes("inherited") || content.includes("probate")) { flags.push("🟠 ESTATE/INHERITED"); score += 6; }

  if (content.includes("divorce") || content.includes("court ordered")) { flags.push("🟠 DIVORCE"); score += 6; }

  if (content.includes("relocation") || content.includes("relocating")) { flags.push("🟡 RELOCATION"); score += 4; }

  if (content.includes("by owner") || content.includes("fsbo") || content.includes("no agent")) { flags.push("🟡 FSBO"); score += 3; }

  let priority = "Normal";

  if (isPrime || score >= 25) priority = "Hot";

  else if (score >= 15) priority = "Warm";

  return { score: Math.min(score, 100), flags, priority, isPrime, dom };

}

async function parseCraigslistRSS(url) {

  try {

    const res = await fetch(url, {

      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", "Accept": "application/rss+xml, application/xml, text/xml, */*" },

    });

    if (!res.ok) return [];

    const xml = await res.text();

    if (xml.includes("blocked") || xml.includes("DOCTYPE html")) return [];

    const items = [];

    const itemRegex = /<item>([\s\S]*?)<\/item>/g;

    let match;

    while ((match = itemRegex.exec(xml)) !== null) {

      const item = match[1];

      const title = (item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || item.match(/<title>(.*?)<\/title>/))?.[1]?.trim() || "";

      const link = (item.match(/<link>(.*?)<\/link>/))?.[1]?.trim() || "";

      const description = (item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) || item.match(/<description>([\s\S]*?)<\/description>/))?.[1]?.trim() || "";

      const pubDate = (item.match(/<pubDate>(.*?)<\/pubDate>/))?.[1]?.trim() || "";

      const priceMatch = title.match(/\$[\d,]+/) || description.match(/\$[\d,]+/);

      const price = priceMatch ? priceMatch[0] : "";

      const addressMatch = title.match(/\d+\s+[A-Za-z][\w\s]+(St|Ave|Blvd|Dr|Ln|Rd|Way|Ct|Pl|Cir|Trail|Pkwy)\b/i);

      const address = addressMatch ? addressMatch[0] : "";

      if (title && link) items.push({ title, link, description, pubDate, price, address });

    }

    return items;

  } catch (e) { console.error("RSS fetch error:", e); return []; }

}

function extractPrice(priceStr) {

  const match = priceStr.replace(/,/g, "").match(/\d+/);

  return match ? parseInt(match[0], 10) : 0;

}

async function isDuplicate(base44, link) {

  try {

    const existing = await base44.asServiceRole.entities.Lead.filter({ source: "Craigslist FSBO" });

    return existing.some(l => (l.notes || "").includes(link.substring(0, 60)));

  } catch { return false; }

}

async function saveLeadToCRM(base44, lead) {

  try {

    await base44.asServiceRole.entities.Lead.create(lead);

    return true;

  } catch { return false; }

}

async function sendSummaryEmail(imported, skipped, primeCount, topLeads) {

  const rows = topLeads.slice(0, 10).map((l, i) => `

    <tr style="border-bottom:1px solid #eee;background:${l.isPrime ? "#fff8e1" : "white"};">

      <td style="padding:8px;font-weight:bold;">${l.isPrime ? "🎯" : i + 1}</td>

      <td style="padding:8px;"><strong>${(l.situation || "").substring(0, 55)}</strong></td>

      <td style="padding:8px;">${l.price || "N/A"}</td>

      <td style="padding:8px;font-weight:bold;color:${l.dom >= 150 ? "#dc3545" : "#fd7e14"};">${l.dom}d</td>

      <td style="padding:8px;"><span style="background:${l.priority === "Hot" ? "#dc3545" : l.priority === "Warm" ? "#fd7e14" : "#6c757d"};color:white;padding:2px 8px;border-radius:4px;font-size:11px;">${l.priority}</span></td>

      <td style="padding:8px;font-size:12px;">${l.distress_flags}</td>

    </tr>`).join("");

  await fetch("https://api.resend.com/emails", {

    method: "POST",

    headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },

    body: JSON.stringify({

      from: `${COMPANY} <${JACOB_EMAIL}>`,

      to: JACOB_EMAIL,

      subject: `🎯 ${primeCount} PRIME TARGETS + ${imported} New Leads — Dallas Craigslist Scan`,

      html: `

        <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;">

          <div style="background:#1a1a2e;color:white;padding:20px;border-radius:8px 8px 0 0;">

            <h2 style="margin:0;">🔍 Craigslist Overnight Scan — Dallas TX</h2>

            <p style="margin:5px 0 0;opacity:0.8;">Keywords: motivated | as-is | TLC | Fixer | updating | cash | cash-only | bring</p>

            <p style="margin:3px 0 0;opacity:0.7;font-size:13px;">Filter: DOM ${MIN_DOM}+ required | Prime = keyword + price reduction + ${MIN_DOM}+ days</p>

          </div>

          <div style="background:#f8f9fa;padding:20px;">

            <div style="display:flex;gap:12px;margin-bottom:20px;">

              <div style="background:#dc3545;color:white;padding:15px;border-radius:8px;flex:1;text-align:center;"><div style="font-size:28px;font-weight:bold;">${primeCount}</div><div style="font-size:12px;">🎯 Prime Targets</div></div>

              <div style="background:#28a745;color:white;padding:15px;border-radius:8px;flex:1;text-align:center;"><div style="font-size:28px;font-weight:bold;">${imported}</div><div style="font-size:12px;">Total New Leads</div></div>

              <div style="background:#6c757d;color:white;padding:15px;border-radius:8px;flex:1;text-align:center;"><div style="font-size:28px;font-weight:bold;">${skipped}</div><div style="font-size:12px;">Duplicates Skipped</div></div>

            </div>

            ${primeCount > 0 ? `<div style="background:#fff3cd;border:2px solid #ffc107;border-radius:8px;padding:12px;margin-bottom:16px;"><strong>🎯 PRIME TARGETS = keyword + price reduction + ${MIN_DOM}+ days listed — call these TODAY</strong></div>` : ""}

            ${topLeads.length > 0 ? `<h3 style="color:#1a1a2e;">Top Leads — Sorted by Priority</h3>

              <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;font-size:13px;">

                <thead style="background:#1a1a2e;color:white;"><tr><th style="padding:8px;">#</th><th style="padding:8px;">Listing</th><th style="padding:8px;">Price</th><th style="padding:8px;">DOM</th><th style="padding:8px;">Priority</th><th style="padding:8px;">Signals</th></tr></thead>

                <tbody>${rows}</tbody>

              </table>` : "<p>No qualifying leads tonight (DOM 100+ filter active). Scan runs again tomorrow.</p>"}

            <div style="margin-top:20px;text-align:center;"><a href="${SITE}/CRM" style="background:#1a1a2e;color:white;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold;">Open CRM → View All Leads</a></div>

          </div>

          <div style="background:#eee;padding:10px;text-align:center;font-size:12px;color:#666;border-radius:0 0 8px 8px;">${COMPANY} | Craigslist Auto-Prospector | Dallas TX | DOM ${MIN_DOM}+ Filter Active</div>

        </div>`,

    }),

  });

}

async function sendSMSAlert(imported, primeCount, topScore) {

  if (!TWILIO_SID || !TWILIO_AUTH) return;

  const body = primeCount > 0

    ? `🎯 ${primeCount} PRIME TARGETS found! Keyword + price reduced + ${MIN_DOM}+ days. ${imported} total leads added. Call NOW → ${SITE}/CRM`

    : `🏠 Craigslist Scan: ${imported} motivated seller leads (${MIN_DOM}+ DOM) added. Top score: ${topScore}/100 → ${SITE}/CRM`;

  const params = new URLSearchParams({ To: JACOB_PHONE, From: "+18558101786", Body: body });

  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {

    method: "POST",

    headers: { "Authorization": `Basic ${btoa(`${TWILIO_SID}:${TWILIO_AUTH}`)}`, "Content-Type": "application/x-www-form-urlencoded" },

    body: params.toString(),

  });

}

Deno.serve(async (req) => {

  const base44 = createClientFromRequest(req);

  try {

    await req.json().catch(() => ({}));

    let imported = 0, skipped = 0, primeCount = 0;

    const allLeads = [];

    const seenLinks = new Set();

    for (const feed of CRAIGSLIST_FEEDS) {

      const items = await parseCraigslistRSS(feed.url);

      for (const item of items) {

        if (seenLinks.has(item.link)) continue;

        seenLinks.add(item.link);

        const { score, flags, priority, isPrime, dom } = scoreMotivation(item.title, item.description, feed.keyword, item.pubDate);

        if (priority === "Skip") { skipped++; continue; }

        const dup = await isDuplicate(base44, item.link);

        if (dup) { skipped++; continue; }

        const price = extractPrice(item.price);

        const arvEstimate = price > 0 ? Math.round(price * 1.40) : 0;

        const equityPercent = arvEstimate > 0 ? Math.round(((arvEstimate - price) / arvEstimate) * 100) : 0;

        const lead = {

          name: "Craigslist Seller",

          address: item.address || "See listing",

          city: "Dallas", state: "TX",

          source: "Craigslist FSBO",

          status: "New Lead",

          priority,

          situation: item.title.substring(0, 200),

          notes: `KEYWORD: "${feed.keyword}" | DOM: ${dom} days | PRIME: ${isPrime ? "YES 🎯" : "no"}\nLISTING: ${item.link}\n\nTITLE: ${item.title}\n\nDESCRIPTION: ${(item.description || "").substring(0, 500)}`,

          motivation_total_score: score,

          distress_flags: flags.join(", "),

          arv_estimate: arvEstimate,

          offer_amount: arvEstimate > 0 ? Math.round(arvEstimate * 0.65) : 0,

          equity_percent: equityPercent,

          seller_motivation_score: score,

          score_distress: Math.min(Math.floor(score / 2), 10),

          score_urgency: isPrime ? 10 : flags.some(f => f.includes("🔴")) ? 9 : flags.some(f => f.includes("🟠")) ? 7 : 5,

          dom_at_contact: dom,

          next_followup_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],

        };

        const saved = await saveLeadToCRM(base44, lead);

        if (saved) { imported++; if (isPrime) primeCount++; allLeads.push({ ...lead, price: item.price, dom, isPrime }); }

      }

      await new Promise(r => setTimeout(r, 800));

    }

    allLeads.sort((a, b) => {

      if (a.isPrime && !b.isPrime) return -1;

      if (!a.isPrime && b.isPrime) return 1;

      return b.motivation_total_score - a.motivation_total_score;

    });

    const topScore = allLeads[0]?.motivation_total_score || 0;

    if (imported > 0) {

      await sendSummaryEmail(imported, skipped, primeCount, allLeads);

      await sendSMSAlert(imported, primeCount, topScore);

    }

    return Response.json({

      success: true,

      keywords_searched: CRAIGSLIST_FEEDS.map(f => f.keyword),

      dom_filter: `${MIN_DOM}+ days required`,

      imported, skipped, prime_targets: primeCount,

      topLeads: allLeads.slice(0, 5).map(l => ({

        title: l.situation, dom: l.dom, score: l.motivation_total_score,

        priority: l.priority, isPrime: l.isPrime, flags: l.distress_flags,

      })),

    });

  } catch (err) {

    return Response.json({ error: err.message }, { status: 500 });

  }

});
