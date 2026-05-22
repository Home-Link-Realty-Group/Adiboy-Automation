# Refreshonboarding

Source: Refreshonboarding.docx

/\*\*

 \* Stripe Connect — Generate a Fresh Onboarding Link

 \* ─────────────────────────────────────────────────

 \* Account Links expire after a few minutes for security\. If a merchant

 \* abandons onboarding and comes back later, generate a new link here\.

 \*

 \* Payload: \{ account\_id, return\_url?, refresh\_url? \}

 \* Returns: \{ ok, onboarding\_url \}

 \*/

import Stripe from 'npm:stripe@18\.5\.0';

Deno\.serve\(async \(req\) => \{

  try \{

    const stripeKey = Deno\.env\.get\('STRIPE\_SECRET\_KEY'\);

    if \(\!stripeKey\) \{

      return Response\.json\(\{ ok: false, error: 'STRIPE\_SECRET\_KEY missing' \}, \{ status: 500 \}\);

    \}

    const stripeClient = new Stripe\(stripeKey\);

    const \{ account\_id, return\_url, refresh\_url \} = await req\.json\(\);

    if \(\!account\_id\) \{

      return Response\.json\(\{ ok: false, error: 'Missing account\_id' \}, \{ status: 400 \}\);

    \}

    const origin = req\.headers\.get\('origin'\) || 'https://example\.com';

    const accountLink = await stripeClient\.v2\.core\.accountLinks\.create\(\{

      account: account\_id,

      use\_case: \{

        type: 'account\_onboarding',

        account\_onboarding: \{

          configurations: \['merchant', 'customer'\],

          refresh\_url: refresh\_url || \`$\{origin\}/StripeConnect?refresh=true\`,

          return\_url: return\_url || \`$\{origin\}/StripeConnect?accountId=$\{account\_id\}\`,

        \},

      \},

    \}\);

    return Response\.json\(\{ ok: true, onboarding\_url: accountLink\.url \}\);

  \} catch \(error\) \{

    console\.error\('connectRefreshOnboarding error:', error\);

    return Response\.json\(\{ ok: false, error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
