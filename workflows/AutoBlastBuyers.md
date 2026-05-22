# AutoBlastBuyers

Source: AutoBlastBuyers.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

Deno\.serve\(async \(req\) => \{

  try \{

    const base44 = createClientFromRequest\(req\);

    const payload = await req\.json\(\);

    const dealId = payload\.event?\.entity\_id;

    if \(\!dealId\) return Response\.json\(\{ ok: false, error: 'No deal ID' \}\);

    const deal = await base44\.asServiceRole\.entities\.Deal\.read\(dealId\);

    if \(\!deal || deal\.status \!== 'Buyer Found'\) return Response\.json\(\{ ok: false, error: 'Deal not in Buyer Found status' \}\);

    const matchRes = await base44\.asServiceRole\.functions\.invoke\('autoBuyerMatch', \{ dealId \}\);

    if \(\!matchRes\.ok\) return Response\.json\(\{ ok: false, error: 'Buyer matching failed' \}\);

    const buyerIds = matchRes\.buyerIds;

    if \(buyerIds\.length === 0\) return Response\.json\(\{ ok: true, message: 'No matched buyers for this deal', sentCount: 0 \}\);

    const buyers = await Promise\.all\(buyerIds\.map\(id => base44\.asServiceRole\.entities\.CashBuyer\.read\(id\)\)\);

    const emailBody = \`

Hi $\{buyers\[0\]?\.name\},

We have a deal in $\{deal\.property\_address\} available for quick assignment\.

\*\*Deal Details:\*\*

\- Property: $\{deal\.property\_address\}

\- Purchase Price: $$\{\(deal\.purchase\_price || 0\)\.toLocaleString\(\)\}

\- Assignment Fee: $$\{\(deal\.assignment\_fee || 0\)\.toLocaleString\(\)\}

\- Status: $\{deal\.status\}

Interested? Reply or call us immediately\.

Best,

Home\-Link Realty Group

\(855\) 810\-1786

    \`\.trim\(\);

    for \(const buyer of buyers\) \{

      if \(buyer?\.email\) \{

        try \{

          await base44\.integrations\.Core\.SendEmail\(\{

            to: buyer\.email,

            subject: \`Deal Available: $\{deal\.property\_address\} \- $$\{\(deal\.assignment\_fee || 0\)\.toLocaleString\(\)\} Fee\`,

            body: emailBody,

            from\_name: 'Home\-Link Realty Group',

          \}\);

        \} catch \(e\) \{

          console\.error\(\`Email to $\{buyer\.email\} failed:\`, e\);

        \}

      \}

    \}

    return Response\.json\(\{ ok: true, dealId, emailsSent: buyers\.length \}\);

  \} catch \(error\) \{

    console\.error\('Blast buyers error:', error\);

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
