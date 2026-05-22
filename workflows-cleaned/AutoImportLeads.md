# AutoImportLeads

Source: AutoImportLeads.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const MARKETS = [

  { city: "Dallas",  state: "TX", slug: "dallas" },

  { city: "Houston", state: "TX", slug: "houston" },

  { city: "Atlanta", state: "GA", slug: "atlanta" },

  { city: "Chicago", state: "IL", slug: "chicago" },

  { city: "Detroit", state: "MI", slug: "detroit" },

];

function extractPhone(text) {

  const patterns = [

    /\(?\d{3}\)?[\s\-\.]\d{3}[\s\-\.]\d{4}/g,

    /\d{3}[\s\-\.]\d{3}[\s\-\.]\d{4}/g,

    /\+1\d{10}/g,

    /\d{10}/g,

  ];

  for (const pattern of patterns) {

    const matches = text.match(pattern);

    if (matches && matches.length > 0) {

      const phone = matches[0].replace(/\D/g, '');

      if (phone.length === 10 || (phone.length === 11 && phone.startsWith('1'))) {

        return phone.length === 11 ? phone.slice(1) : phone;

      }

    }

  }

  return null;

}

function extractEmail(text) {

  const match = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);

  return match ? match[0] : null;

}

function extractName(text, title) {

  const namePatterns = [

    /(?:contact|call|ask for|text)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/,

    /(?:my name is|i'm|i am)\s+([A-Z][a-z]+)/i,

  ];

  for (const p of namePatterns) {

    const m = text.match(p);

    if (m) return m[1];

  }

  return `FSBO Owner — ${title.slice(0, 40)}`;

}

function autoScoreLead(text, domDays) {

  const t = text.toLowerCase();

  let distress = 2;

  let urgency = 2;

  let condition = 2;

  if (t.includes('foreclosure') || t.includes('bank owned') || t.includes('tax lien')) distress = 5;

  else if (t.includes('probate') || t.includes('inherited') || t.includes('estate')) distress = 4;

  else if (t.includes('divorce') || t.includes('bankruptcy') || t.includes('eviction')) distress = 4;

  else if (t.includes('motivated') || t.includes('must sell') || t.includes('price reduced')) distress = 3;

  if (t.includes('asap') || t.includes('immediately') || t.includes('urgent') || t.includes('must sell')) urgency = 5;

  else if (t.includes('30 day') || t.includes('quick sale') || t.includes('fast close')) urgency = 4;

  else if (t.includes('flexible') || t.includes('no rush')) urgency = 1;

  if (domDays >= 180) urgency = Math.max(urgency, 4);

  else if (domDays >= 100) urgency = Math.max(urgency, 3);

  if (t.includes('as-is') || t.includes('as is') || t.includes('needs work') || t.includes('fixer')) condition = 4;

  else if (t.includes('major repair') || t.includes('rehab') || t.includes('tlc')) condition = 5;

  else if (t.includes('vacant') || t.includes('empty')) condition = 5;

  else if (t.includes('cosmetic') || t.includes('minor')) condition = 3;

  return { distress, urgency, condition, equity: 0 };

}

function parseListingUrls(html, slug) {

  const urls = [];

  const matches = html.matchAll(/href="(https:\/\/[a-z]+\.craigslist\.org\/[a-z]{3}\/d\/[^"]+\.html)"/g);

  for (const m of matches) {

    if (!urls.includes(m[1])) urls.push(m[1]);

    if (urls.length >= 8) break;

  }

  if (urls.length === 0) {

    const relMatches = html.matchAll(/href="(\/[a-z]{3}\/d\/[^"]+\.html)"/g);

    for (const m of relMatches) {

      const full = `https://${slug}.craigslist.org${m[1]}`;

      if (!urls.includes(full)) urls.push(full);

      if (urls.length >= 8) break;

    }

  }

  return urls;

}

function parseSingleListing(html) {

  const titleMatch = html.match(/<span\s+id="titletextonly"[^>]*>([^<]+)<\/span>/) ||

                     html.match(/<h1[^>]*class="[^"]*postingtitle[^"]*"[^>]*>([^<]+)<\/h1>/) ||

                     html.match(/<title>([^<]+)<\/title>/);

  const title = titleMatch ? titleMatch[1].trim() : 'FSBO Listing';

  const priceMatch = html.match(/\$[\d,]+/) || html.match(/"price":"(\d+)"/);

  const price = priceMatch ? priceMatch[0] : null;

  const addrMatch = html.match(/class="[^"]*mapaddress[^"]*"[^>]*>([^<]+)</) ||

                    html.match(/"address":"([^"]+)"/) ||

                    html.match(/data-latitude[^>]+>([^<]+)</);

  const address = addrMatch ? addrMatch[1].trim() : null;

  const bodyMatch = html.match(/<section\s+id="postingbody"[^>]*>([\s\S]*?)<\/section>/);

  const body = bodyMatch ? bodyMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

  const dateMatch = html.match(/<time[^>]+datetime="([^"]+)"/);

  const postDate = dateMatch ? dateMatch[1].split('T')[0] : null;

  const allText = body + ' ' + html;

  const phone = extractPhone(body) || extractPhone(allText);

  const email = extractEmail(body) || extractEmail(allText);

  return { title, price, address, phone, email, body, postDate };

}

Deno.serve(async (req) => {

  const base44 = createClientFromRequest(req);

  try {

    const results = [];

    const errors = [];

    for (const market of MARKETS) {

      try {

        const searchUrl = `https://${market.slug}.craigslist.org/search/rea?query=motivated+seller+as-is+fixer+must+sell&sort=date&housing_type=6`;

        const searchRes = await fetch(searchUrl, {

          headers: {

            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",

            "Accept": "text/html,application/xhtml+xml",

            "Accept-Language": "en-US,en;q=0.9",

          }

        });

        if (!searchRes.ok) {

          errors.push({ market: market.city, error: `Search failed: ${searchRes.status}` });

          continue;

        }

        const searchHtml = await searchRes.text();

        const listingUrls = parseListingUrls(searchHtml, market.slug);

        for (const url of listingUrls.slice(0, 4)) {

          try {

            await new Promise(r => setTimeout(r, 1500));

            const listRes = await fetch(url, {

              headers: {

                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",

                "Accept": "text/html",

              }

            });

            if (!listRes.ok) continue;

            const listHtml = await listRes.text();

            const listing = parseSingleListing(listHtml);

            const address = listing.address || listing.title.slice(0, 80);

            const existing = await base44.asServiceRole.entities.Lead.filter({ address });

            if (existing && existing.length > 0) continue;

            const domDays = listing.postDate

              ? Math.floor((Date.now() - new Date(listing.postDate).getTime()) / 86400000)

              : 0;

            const scores = autoScoreLead(listing.body, domDays);

            const totalScore = scores.distress + scores.urgency + scores.condition + scores.equity;

            if (totalScore < 4) continue;

            const name = extractName(listing.body, listing.title);

            const phone = listing.phone ? listing.phone.replace(/\D/g, '') : null;

            const formattedPhone = phone

              ? `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}`

              : null;

            await base44.asServiceRole.entities.Lead.create({

              name,

              phone: formattedPhone,

              email: listing.email,

              address,

              city: market.city,

              state: market.state,

              source: `Craigslist FSBO — ${market.city}`,

              status: "New Lead",

              priority: totalScore >= 12 ? "High" : "Medium",

              touch_count: 0,

              score_distress: scores.distress,

              score_urgency: scores.urgency,

              score_condition: scores.condition,

              score_equity: scores.equity,

              motivation_total_score: totalScore,

              dom_at_contact: domDays,

              notes: `Auto-imported from Craigslist.\nPrice: ${listing.price || "Unknown"}\nListed: ${listing.postDate || "Unknown"}\nURL: ${url}\n\n${listing.body.slice(0, 500)}`,

              next_followup_date: new Date().toISOString().split("T")[0],

            });

            results.push({

              market: market.city,

              name,

              address,

              phone: formattedPhone || "Not found",

              email: listing.email || "Not found",

              score: totalScore,

              url,

            });

          } catch (e) {

            errors.push({ url, error: e.message });

          }

        }

      } catch (e) {

        errors.push({ market: market.city, error: e.message });

      }

    }

    return Response.json({

      success: true,

      imported: results.length,

      leads: results,

      errors,

      message: `Imported ${results.length} leads across ${MARKETS.length} markets`,

    });

  } catch (err) {

    return Response.json({ error: err.message }, { status: 500 });

  }

});
