# Buyer Drip

Source: Buyer Drip.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

const JACOB\_EMAIL = "jacob\.levy@homelinkrealtygroup\.com";

const COMPANY = "Home\-Link Realty Group LLC";

const PHONE = "\(855\) 810\-1786";

const SITE = "https://home\-link\-realty\-group\.base44\.app";

const BUYER\_TEMPLATES = \{

  "Fix & Flip": \{

    1: \(b\) => \(\{

      subject: \`Flippers wanted — off\-market deals in $\{b\.city || "Dallas"\}, all cash\`,

      body: \`Hi $\{b\.name?\.split\(" "\)\[0\] || "there"\},

My name is Jacob Levy — I wholesale real estate in the $\{b\.city || "Dallas"\} area with Home\-Link Realty Group LLC\.

I get off\-market properties under contract regularly and assign them to cash buyers like yourself\. I'm looking to add serious flippers to my buyer list\.

What I bring to the table:

✅ Off\-market deals — no competition, no bidding wars

✅ Deep discounts — typically 60\-70% ARV

✅ I handle all the seller negotiations

✅ You just evaluate, decide, close

✅ I assign the contract — you pay assignment fee at closing

To get on my buyer list, just reply with:

• Your target areas \(zip codes or neighborhoods\)

• Price range

• Typical ARV % you buy at

• Closing timeline

First deal goes to whoever responds fastest\.

Jacob Levy

$\{COMPANY\}

$\{PHONE\}

\-\-\-

Reply UNSUBSCRIBE to opt out\. $\{COMPANY\}\`

    \}\),

    2: \(b\) => \(\{

      subject: \`New deal alert coming — are you still buying in $\{b\.city || "Dallas"\}?\`,

      body: \`Hi $\{b\.name?\.split\(" "\)\[0\] || "there"\},

Following up — I have a deal coming under contract soon in $\{b\.city || "Dallas"\} and wanted to make sure you're still active before I blast the buyer list\.

If you want first look, reply with your current buy box and I'll reach out before anyone else\.

Jacob Levy

$\{COMPANY\}

$\{PHONE\}

\-\-\-

Reply UNSUBSCRIBE to opt out\. $\{COMPANY\}\`

    \}\),

    3: \(b\) => \(\{

      subject: \`Are you still buying? Off\-market inventory in $\{b\.city || "Dallas"\}\`,

      body: \`Hi $\{b\.name?\.split\(" "\)\[0\] || "there"\},

Quick check\-in — still buying in $\{b\.city || "Dallas"\}?

I have consistent deal flow coming and I want my buyer list to be current\. If you're active, just reply "yes" and I'll keep you posted on everything I get under contract\.

Jacob Levy

$\{COMPANY\}

$\{PHONE\}

\-\-\-

Reply UNSUBSCRIBE to opt out\. $\{COMPANY\}\`

    \}\),

  \},

  "Buy & Hold": \{

    1: \(b\) => \(\{

      subject: \`Off\-market rental properties in $\{b\.city || "Dallas"\} — cash buyers only\`,

      body: \`Hi $\{b\.name?\.split\(" "\)\[0\] || "there"\},

My name is Jacob Levy — I wholesale buy\-and\-hold properties in $\{b\.city || "Dallas"\} for cash investors\.

I regularly get single\-family rentals under contract at 65\-75% ARV — properties with strong rental potential, good neighborhoods, and motivated sellers\. I assign the contract to investors like yourself\.

If you're building a rental portfolio, I'd love to add you to my buyer list\. Just reply with:

• Target neighborhoods or zip codes

• Price range

• Desired cap rate or monthly cash flow target

• How fast you can close

I send deals to my list first — before listing anywhere else\.

Jacob Levy

$\{COMPANY\}

$\{PHONE\}

\-\-\-

Reply UNSUBSCRIBE to opt out\. $\{COMPANY\}\`

    \}\),

    2: \(b\) => \(\{

      subject: \`Re: Rental properties in $\{b\.city || "Dallas"\} — still buying?\`,

      body: \`Hi $\{b\.name?\.split\(" "\)\[0\] || "there"\},

Following up — just want to make sure you're on my active buyer list before I send out the next deal\.

Buy\-and\-hold properties in $\{b\.city || "Dallas"\} at 65\-75% ARV\. Cash only\. Fast close\.

Reply with your current buy box if you're still active\.

Jacob Levy

$\{COMPANY\}

$\{PHONE\}

\-\-\-

Reply UNSUBSCRIBE to opt out\. $\{COMPANY\}\`

    \}\),

  \},

  "default": \{

    1: \(b\) => \(\{

      subject: \`Off\-market deals in $\{b\.city || "Dallas"\} — want to be on my buyer list?\`,

      body: \`Hi $\{b\.name?\.split\(" "\)\[0\] || "there"\},

Jacob Levy here — I wholesale real estate in $\{b\.city || "Dallas"\} with Home\-Link Realty Group LLC\.

I get properties under contract at deep discounts and assign them to cash buyers\. Looking to grow my active buyer list\.

✅ Off\-market — no MLS competition

✅ 60\-75% ARV typically

✅ All deal types — flips, rentals, teardowns

Reply with your buy box and I'll send you the next deal\.

Jacob Levy

$\{COMPANY\}

$\{PHONE\}

\-\-\-

Reply UNSUBSCRIBE to opt out\. $\{COMPANY\}\`

    \}\),

    2: \(b\) => \(\{

      subject: \`Still buying in $\{b\.city || "Dallas"\}? New deals coming\`,

      body: \`Hi $\{b\.name?\.split\(" "\)\[0\] || "there"\},

Just checking if you're still actively buying\. I have new deals coming under contract and want to make sure my list is current\.

Reply "yes" and I'll send you first look\.

Jacob Levy

$\{COMPANY\} | $\{PHONE\}

\-\-\-

Reply UNSUBSCRIBE to opt out\.\`

    \}\),

  \},

\};

async function sendEmail\(base44, to, subject, body\) \{

  try \{

    const \{ accessToken \} = await base44\.asServiceRole\.connectors\.getConnection\("gmail"\);

    const rawEmail = \[\`To: $\{to\}\`, \`From: $\{JACOB\_EMAIL\}\`, \`Subject: $\{subject\}\`, \`MIME\-Version: 1\.0\`, \`Content\-Type: text/plain; charset=utf\-8\`, \`\`, body\]\.join\("\\r\\n"\);

    const encoded = btoa\(unescape\(encodeURIComponent\(rawEmail\)\)\)\.replace\(/\\\+/g, "\-"\)\.replace\(/\\//g, "\_"\)\.replace\(/=\+$/, ""\);

    const res = await fetch\("https://gmail\.googleapis\.com/gmail/v1/users/me/messages/send", \{

      method: "POST",

      headers: \{ Authorization: \`Bearer $\{accessToken\}\`, "Content\-Type": "application/json" \},

      body: JSON\.stringify\(\{ raw: encoded \}\),

    \}\);

    return res\.ok;

  \} catch \{ return false; \}

\}

async function runBuyerDrip\(base44\) \{

  const today = new Date\(\)\.toISOString\(\)\.split\("T"\)\[0\];

  const results = \{ contacted: 0, skipped: 0 \};

  const allBuyers = await base44\.asServiceRole\.entities\.CashBuyer\.list\(\);

  const due = allBuyers\.filter\(b => b\.next\_followup\_date <= today && \!\["Inactive"\]\.includes\(b\.status\) && b\.email\);

  for \(const buyer of due\) \{

    try \{

      const touchNum = \(buyer\.touch\_count || 0\) \+ 1;

      if \(touchNum > 5\) \{ results\.skipped\+\+; continue; \}

      const typeTemplates = BUYER\_TEMPLATES\[buyer\.buyer\_type\] || BUYER\_TEMPLATES\["default"\];

      const maxKey = Math\.max\(\.\.\.Object\.keys\(typeTemplates\)\.map\(Number\)\.filter\(n => n <= touchNum\)\);

      const templateFn = typeTemplates\[touchNum\] || typeTemplates\[maxKey\];

      if \(\!templateFn\) \{ results\.skipped\+\+; continue; \}

      const \{ subject, body \} = templateFn\(buyer\);

      const sent = await sendEmail\(base44, buyer\.email, subject, body\);

      if \(sent\) \{

        const daysUntilNext = touchNum <= 2 ? 7 : 14;

        const nextDate = new Date\(\);

        nextDate\.setDate\(nextDate\.getDate\(\) \+ daysUntilNext\);

        await base44\.asServiceRole\.entities\.CashBuyer\.update\(buyer\.id, \{

          touch\_count: touchNum,

          last\_contact\_date: today,

          next\_followup\_date: nextDate\.toISOString\(\)\.split\("T"\)\[0\],

          status: buyer\.status === "New" ? "Contacted" : buyer\.status,

        \}\);

        results\.contacted\+\+;

      \}

    \} catch \{ results\.skipped\+\+; \}

  \}

  await sendEmail\(base44, JACOB\_EMAIL, \`💰 Buyer Drip: $\{results\.contacted\} buyers contacted today\`,

    \`💰 Buyer Outreach Sequence Run\\n\\nTotal due: $\{due\.length\}\\n✅ Contacted: $\{results\.contacted\}\\n⏭️ Skipped: $\{results\.skipped\}\\n\\nView buyer list: $\{SITE\}/ReferralEngine\`\);

  return Response\.json\(\{ success: true, \.\.\.results, total\_due: due\.length \}\);

\}

Deno\.serve\(async \(req\) => \{

  const base44 = createClientFromRequest\(req\);

  try \{

    const \{ mode = "drip" \} = await req\.json\(\)\.catch\(\(\) => \(\{\}\)\);

    if \(mode === "drip"\) return await runBuyerDrip\(base44\);

    return Response\.json\(\{ error: "mode must be: drip" \}, \{ status: 400 \}\);

  \} catch \(err\) \{

    return Response\.json\(\{ error: err\.message \}, \{ status: 500 \}\);

  \}

\}\);
