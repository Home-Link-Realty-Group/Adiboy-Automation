# ConnectCreateAccount

Source: ConnectCreateAccount.docx

/\*\*

 \* Stripe Connect — Create V2 Connected Account

 \* ─────────────────────────────────────────────

 \* Creates a brand\-new V2 connected account for a platform user, then

 \* generates an Account Link for them to complete onboarding \(KYC, bank, etc\.\)\.

 \*

 \* IMPORTANT: We use the V2 API \(stripeClient\.v2\.core\.accounts\.create\) and

 \* NEVER pass \`type: 'express'\` or \`type: 'standard'\` — those are V1 patterns\.

 \*

 \* Payload: \{ user\_email, display\_name, contact\_email, return\_url?, refresh\_url? \}

 \* Returns: \{ ok, account\_id, onboarding\_url \}

 \*/

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

import Stripe from 'npm:stripe@18\.5\.0';

Deno\.serve\(async \(req\) => \{

  try \{

    // ─── 1\. Read secrets ──────────────────────────────────────────

    // STRIPE\_SECRET\_KEY must be set in Base44 secrets — without it,

    // every Stripe call will fail\. Surface a clear error to the user\.

    const stripeKey = Deno\.env\.get\('STRIPE\_SECRET\_KEY'\);

    if \(\!stripeKey\) \{

      return Response\.json\(\{

        ok: false,

        error: 'STRIPE\_SECRET\_KEY is not configured\. Set it in Base44 → Settings → Secrets\.',

      \}, \{ status: 500 \}\);

    \}

    // ─── 2\. Init Stripe client \(no API version override — SDK uses default\) ──

    const stripeClient = new Stripe\(stripeKey\);

    // ─── 3\. Authenticate the calling user ─────────────────────────

    const base44 = createClientFromRequest\(req\);

    const \{ user\_email, display\_name, contact\_email, return\_url, refresh\_url \} = await req\.json\(\);

    if \(\!user\_email || \!display\_name || \!contact\_email\) \{

      return Response\.json\(\{

        ok: false,

        error: 'Missing required fields: user\_email, display\_name, contact\_email',

      \}, \{ status: 400 \}\);

    \}

    // ─── 4\. Create the V2 connected account ───────────────────────

    // V2 properties only — never pass top\-level \`type\`\.

    const account = await stripeClient\.v2\.core\.accounts\.create\(\{

      display\_name,

      contact\_email,

      identity: \{

        country: 'us',  // PLACEHOLDER: change to merchant's actual country if non\-US support needed

      \},

      dashboard: 'full',

      defaults: \{

        responsibilities: \{

          fees\_collector: 'stripe',

          losses\_collector: 'stripe',

        \},

      \},

      configuration: \{

        customer: \{\},          // enables this account to be a customer \(subscribe to platform\)

        merchant: \{            // enables this account to accept payments

          capabilities: \{

            card\_payments: \{ requested: true \},

          \},

        \},

      \},

    \}\);

    // ─── 5\. Persist user → account mapping in Base44 DB ───────────

    // This lets us look up which Stripe account belongs to which user later\.

    const existing = await base44\.asServiceRole\.entities\.ConnectedAccount\.filter\(\{

      user\_email: user\_email\.toLowerCase\(\),

    \}\);

    if \(existing && existing\.length > 0\) \{

      await base44\.asServiceRole\.entities\.ConnectedAccount\.update\(existing\[0\]\.id, \{

        stripe\_account\_id: account\.id,

        display\_name,

        contact\_email,

        country: 'us',

      \}\);

    \} else \{

      await base44\.asServiceRole\.entities\.ConnectedAccount\.create\(\{

        user\_email: user\_email\.toLowerCase\(\),

        stripe\_account\_id: account\.id,

        display\_name,

        contact\_email,

        country: 'us',

      \}\);

    \}

    // ─── 6\. Generate onboarding Account Link \(V2\) ─────────────────

    // The merchant clicks this URL to complete KYC, add bank info, etc\.

    const origin = req\.headers\.get\('origin'\) || 'https://example\.com';

    const accountLink = await stripeClient\.v2\.core\.accountLinks\.create\(\{

      account: account\.id,

      use\_case: \{

        type: 'account\_onboarding',

        account\_onboarding: \{

          configurations: \['merchant', 'customer'\],

          refresh\_url: refresh\_url || \`$\{origin\}/StripeConnect?refresh=true\`,

          return\_url: return\_url || \`$\{origin\}/StripeConnect?accountId=$\{account\.id\}\`,

        \},

      \},

    \}\);

    return Response\.json\(\{

      ok: true,

      account\_id: account\.id,

      onboarding\_url: accountLink\.url,

    \}\);

  \} catch \(error\) \{

    console\.error\('connectCreateAccount error:', error\);

    return Response\.json\(\{ ok: false, error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
