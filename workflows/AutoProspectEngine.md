# AutoProspectEngine

Source: AutoProspectEngine.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

const JACOB\_EMAIL = "jacob\.levy@homelinkrealtygroup\.com";

const SITE = "https://home\-link\-realty\-group\.base44\.app";

const SEARCH\_TARGETS = \[

  \{ query: "probate attorney Dallas TX", type: "Probate Attorney", entity: "Referral" \},

  \{ query: "estate attorney Dallas Texas", type: "Estate Attorney", entity: "Referral" \},

  \{ query: "divorce attorney Dallas TX family law", type: "Divorce Attorney", entity: "Referral" \},

  \{ query: "bankruptcy attorney Dallas TX", type: "Bankruptcy Attorney", entity: "Referral" \},

  \{ query: "property management company Dallas TX", type: "Property Manager", entity: "Referral" \},

  \{ query: "real estate investor Dallas TX cash buyer", type: "Fix & Flip", entity: "CashBuyer" \},

  \{ query: "house flippers Dallas TX real estate", type: "Fix & Flip", entity: "CashBuyer" \},

  \{ query: "real estate investment company Dallas TX", type: "Buy & Hold", entity: "CashBuyer" \},

  \{ query: "we buy houses Dallas TX cash", type: "Wholesaler", entity: "CashBuyer" \},

  \{ query: "CPA accountant real estate Dallas TX investors", type: "CPA/Accountant", entity: "Referral" \},

  \{ query: "real estate agent Dallas TX expired listings", type: "Real Estate Agent", entity: "Referral" \},

\];

function sleep\(ms\) \{ return new Promise\(r => setTimeout\(r, ms\)\); \}

function decodeHtmlEntities\(text\) \{

  return \(text || ""\)

    \.replace\(/&amp;/g, "&"\)\.replace\(/&lt;/g, "<"\)\.replace\(/&gt;/g, ">"\)

    \.replace\(/&quot;/g, '"'\)\.replace\(/&\#39;/g, "'"\)\.replace\(/&nbsp;/g, " "\)

    \.trim\(\);

\}

async function searchDuckDuckGo\(query, type\) \{

  const contacts = \[\];

  try \{

    const encoded = encodeURIComponent\(query \+ " Dallas TX phone email"\);

    const res = await fetch\(\`https://html\.duckduckgo\.com/html/?q=$\{encoded\}\`, \{

      headers: \{ "User\-Agent": "Mozilla/5\.0 \(Macintosh; Intel Mac OS X 10\_15\_7\) AppleWebKit/537\.36" \}

    \}\);

    if \(\!res\.ok\) return contacts;

    const html = await res\.text\(\);

    const titleMatches = \[\.\.\.html\.matchAll\(/<a\[^>\]\+class="result\_\_a"\[^>\]\*href="\(\[^"\]\+\)"\[^>\]\*>\(\[^<\]\+\)<\\/a>/g\)\];

    const snippetMatches = \[\.\.\.html\.matchAll\(/<a\[^>\]\+class="result\_\_snippet"\[^>\]\*>\(\[^<\]\+\)<\\/a>/g\)\];

    titleMatches\.slice\(0, 8\)\.forEach\(\(m, i\) => \{

      const name = decodeHtmlEntities\(m\[2\]?\.trim\(\) || ""\);

      const url = m\[1\] || "";

      const snippet = snippetMatches\[i\] ? decodeHtmlEntities\(snippetMatches\[i\]\[1\]?\.trim\(\) || ""\) : "";

      if \(\!name || name\.length < 3\) return;

      const phoneMatch = snippet\.match\(/\(\\\(?\\d\{3\}\\\)?\[\\s\.\\\-\]?\\d\{3\}\[\\s\.\\\-\]?\\d\{4\}\)/\);

      const emailMatch = snippet\.match\(/\(\[a\-zA\-Z0\-9\.\_%\+\\\-\]\+@\[a\-zA\-Z0\-9\.\\\-\]\+\\\.\[a\-zA\-Z\]\{2,\}\)/\);

      contacts\.push\(\{

        name: name\.slice\(0, 80\),

        company: name\.slice\(0, 80\),

        phone: phoneMatch ? phoneMatch\[1\] : "",

        email: emailMatch ? emailMatch\[1\] : "",

        website: url\.includes\("http"\) ? url : "",

        city: "Dallas", state: "TX",

        source: \`Auto\-Prospect — DuckDuckGo \($\{query\.slice\(0, 40\)\}\)\`,

        notes: snippet\.slice\(0, 200\) || \`Found via: $\{query\}\`,

      \}\);

    \}\);

  \} catch \(e\) \{ console\.error\("Search error:", e\); \}

  return contacts;

\}

async function scrapeAvvo\(\) \{

  const attorneys = \[\];

  const pages = \[

    \{ url: "https://www\.avvo\.com/attorneys/75201\-tx\-probate\-lawyer\.html", type: "Probate Attorney" \},

    \{ url: "https://www\.avvo\.com/attorneys/75201\-tx\-family\-lawyer\.html", type: "Divorce Attorney" \},

    \{ url: "https://www\.avvo\.com/attorneys/75201\-tx\-bankruptcy\-lawyer\.html", type: "Bankruptcy Attorney" \},

  \];

  for \(const page of pages\) \{

    try \{

      const res = await fetch\(page\.url, \{ headers: \{ "User\-Agent": "Mozilla/5\.0 \(Macintosh; Intel Mac OS X 10\_15\_7\) AppleWebKit/537\.36" \} \}\);

      if \(\!res\.ok\) continue;

      const html = await res\.text\(\);

      const nameMatches = \[\.\.\.html\.matchAll\(/class="\[^"\]\*attorney\-name\[^"\]\*"\[^>\]\*>\(\[^<\]\+\)</g\)\];

      const firmMatches = \[\.\.\.html\.matchAll\(/class="\[^"\]\*attorney\-firm\[^"\]\*"\[^>\]\*>\(\[^<\]\+\)</g\)\];

      nameMatches\.slice\(0, 10\)\.forEach\(\(m, i\) => \{

        const name = decodeHtmlEntities\(m\[1\]?\.trim\(\) || ""\);

        if \(\!name\) return;

        attorneys\.push\(\{ name, company: firmMatches\[i\] ? decodeHtmlEntities\(firmMatches\[i\]\[1\]?\.trim\(\) || ""\) : "", type: page\.type, city: "Dallas", state: "TX", source: "Auto\-Prospect — Avvo", notes: \`Found on Avvo: $\{page\.url\}\` \}\);

      \}\);

      await sleep\(2000\);

    \} catch \(e\) \{ console\.error\("Avvo error:", e\); \}

  \}

  return attorneys;

\}

async function scrapeBiggerPockets\(\) \{

  const investors = \[\];

  try \{

    const res = await fetch\("https://www\.biggerpockets\.com/real\-estate\-investing/locations/tx/dallas", \{

      headers: \{ "User\-Agent": "Mozilla/5\.0 \(Macintosh; Intel Mac OS X 10\_15\_7\) AppleWebKit/537\.36" \}

    \}\);

    if \(\!res\.ok\) return investors;

    const html = await res\.text\(\);

    const nameMatches = \[\.\.\.html\.matchAll\(/class="\[^"\]\*member\-name\[^"\]\*"\[^>\]\*>\(\[^<\]\+\)</g\)\];

    nameMatches\.slice\(0, 8\)\.forEach\(m => \{

      const name = decodeHtmlEntities\(m\[1\]?\.trim\(\) || ""\);

      if \(\!name\) return;

      investors\.push\(\{ name, city: "Dallas", state: "TX", source: "Auto\-Prospect — BiggerPockets", notes: "Found via BiggerPockets Dallas TX investor directory", buyer\_type: "Fix & Flip" \}\);

    \}\);

  \} catch \(e\) \{ console\.error\("BiggerPockets error:", e\); \}

  return investors;

\}

async function addReferral\(base44, contact, type\) \{

  try \{

    if \(contact\.name\) \{

      const existing = await base44\.asServiceRole\.entities\.Referral\.filter\(\{ name: contact\.name \}\);

      if \(existing && existing\.length > 0\) return false;

    \}

    if \(contact\.email\) \{

      const existing = await base44\.asServiceRole\.entities\.Referral\.filter\(\{ email: contact\.email \}\);

      if \(existing && existing\.length > 0\) return false;

    \}

    const today = new Date\(\)\.toISOString\(\)\.split\("T"\)\[0\];

    await base44\.asServiceRole\.entities\.Referral\.create\(\{

      name: contact\.name || \`$\{type\} — Dallas\`,

      company: contact\.company || "",

      phone: contact\.phone || "",

      email: contact\.email || "",

      website: contact\.website || "",

      city: contact\.city || "Dallas",

      state: contact\.state || "TX",

      type, status: "New", priority: "Warm",

      source: contact\.source || "Auto\-Prospect",

      notes: contact\.notes || "",

      touch\_count: 0,

      next\_followup\_date: today,

      last\_contact\_date: today,

      deals\_referred: 0,

      revenue\_from\_referrals: 0,

      preferred\_contact\_method: contact\.email ? "Email" : "Phone",

    \}\);

    return true;

  \} catch \{ return false; \}

\}

async function addBuyer\(base44, contact, buyerType\) \{

  try \{

    if \(contact\.name\) \{

      const existing = await base44\.asServiceRole\.entities\.CashBuyer\.filter\(\{ name: contact\.name \}\);

      if \(existing && existing\.length > 0\) return false;

    \}

    if \(contact\.email\) \{

      const existing = await base44\.asServiceRole\.entities\.CashBuyer\.filter\(\{ email: contact\.email \}\);

      if \(existing && existing\.length > 0\) return false;

    \}

    const today = new Date\(\)\.toISOString\(\)\.split\("T"\)\[0\];

    await base44\.asServiceRole\.entities\.CashBuyer\.create\(\{

      name: contact\.name || \`Cash Buyer — Dallas\`,

      company: contact\.company || "",

      phone: contact\.phone || "",

      email: contact\.email || "",

      city: contact\.city || "Dallas",

      state: contact\.state || "TX",

      buyer\_type: buyerType || "Fix & Flip",

      buy\_areas: "Dallas, TX — DFW Metroplex",

      price\_min: 50000, price\_max: 300000,

      arv\_max\_percent: 70,

      condition\_preference: "Any",

      closing\_timeline: "14\-21 days",

      status: "New", priority: "B\-Buyer",

      source: contact\.source || "Auto\-Prospect",

      notes: contact\.notes || "",

      touch\_count: 0,

      next\_followup\_date: today,

      last\_contact\_date: today,

      deals\_sent: 0, deals\_closed: 0, total\_volume: 0,

    \}\);

    return true;

  \} catch \{ return false; \}

\}

async function notifyJacob\(base44, results\) \{

  try \{

    const \{ accessToken \} = await base44\.asServiceRole\.connectors\.getConnection\("gmail"\);

    const body = \[

      \`🔍 Auto\-Prospect Run Complete — Dallas TX\`,

      \`\`,

      \`📋 Referral Partners Found: $\{results\.referrals\_found\}\`,

      \`✅ New Referrals Added: $\{results\.referrals\_added\}\`,

      \`\`,

      \`💰 Cash Buyers Found: $\{results\.buyers\_found\}\`,

      \`✅ New Buyers Added: $\{results\.buyers\_added\}\`,

      \`\`,

      \`Sources searched:\`,

      \.\.\.\(results\.sources\_checked || \[\]\)\.map\(s => \`• $\{s\}\`\),

      \`\`,

      \`View: $\{SITE\}/ReferralEngine\`,

    \]\.join\("\\n"\);

    const rawEmail = \[\`To: $\{JACOB\_EMAIL\}\`, \`From: $\{JACOB\_EMAIL\}\`, \`Subject: 🔍 Auto\-Prospect: $\{results\.referrals\_added \+ results\.buyers\_added\} new contacts added\`, \`MIME\-Version: 1\.0\`, \`Content\-Type: text/plain; charset=utf\-8\`, \`\`, body\]\.join\("\\r\\n"\);

    const encoded = btoa\(unescape\(encodeURIComponent\(rawEmail\)\)\)\.replace\(/\\\+/g, "\-"\)\.replace\(/\\//g, "\_"\)\.replace\(/=\+$/, ""\);

    await fetch\("https://gmail\.googleapis\.com/gmail/v1/users/me/messages/send", \{

      method: "POST",

      headers: \{ Authorization: \`Bearer $\{accessToken\}\`, "Content\-Type": "application/json" \},

      body: JSON\.stringify\(\{ raw: encoded \}\),

    \}\);

  \} catch \(e\) \{ console\.error\("Notify error:", e\); \}

\}

Deno\.serve\(async \(req\) => \{

  const base44 = createClientFromRequest\(req\);

  try \{

    await req\.json\(\)\.catch\(\(\) => \(\{\}\)\);

    const results = \{ referrals\_found: 0, buyers\_found: 0, referrals\_added: 0, buyers\_added: 0, sources\_checked: \[\] \};

    for \(const target of SEARCH\_TARGETS\) \{

      try \{

        const found = await searchDuckDuckGo\(target\.query, target\.type\);

        for \(const contact of found\) \{

          if \(target\.entity === "Referral"\) \{

            const added = await addReferral\(base44, contact, target\.type\);

            if \(added\) results\.referrals\_added\+\+;

            results\.referrals\_found\+\+;

          \} else \{

            const added = await addBuyer\(base44, contact, target\.type\);

            if \(added\) results\.buyers\_added\+\+;

            results\.buyers\_found\+\+;

          \}

        \}

        results\.sources\_checked\.push\(target\.query\);

        await sleep\(1500\);

      \} catch \(e\) \{ console\.error\(\`Search error for $\{target\.query\}:\`, e\); \}

    \}

    const avvoResults = await scrapeAvvo\(\);

    for \(const attorney of avvoResults\) \{

      const added = await addReferral\(base44, attorney, attorney\.type || "Probate Attorney"\);

      if \(added\) results\.referrals\_added\+\+;

    \}

    const bpResults = await scrapeBiggerPockets\(\);

    for \(const investor of bpResults\) \{

      const added = await addBuyer\(base44, investor, "Fix & Flip"\);

      if \(added\) results\.buyers\_added\+\+;

    \}

    await notifyJacob\(base44, results\);

    return Response\.json\(\{ success: true, \.\.\.results \}\);

  \} catch \(err\) \{

    return Response\.json\(\{ error: err\.message \}, \{ status: 500 \}\);

  \}

\}\);
