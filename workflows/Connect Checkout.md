# Connect Checkout

Source: Connect Checkout.docx

/\*\*

 \* Stripe Connect — Create Checkout Sessions

 \* ─────────────────────────────────────────

 \* Two flows:

 \*

 \* 1\. DIRECT CHARGE on connected account \(storefront purchase by end customer\)

 \*    \- Uses \`stripeAccount\` header

 \*    \- Charges the connected account's payment method, with an \`application\_fee\_amount\`

 \*      that flows to YOUR platform Stripe account\.

 \*

 \* 2\. PLATFORM SUBSCRIPTION \(connected account subscribes to YOUR platform\)

 \*    \- No stripeAccount header — runs on the platform account\.

 \*    \- Uses \`customer\_account: acct\_\.\.\.\` to bill the connected account itself\.

 \*

 \* Payload \(storefront\):    \{ action: 'storefront', account\_id, price\_id, quantity, success\_url, cancel\_url, application\_fee\_cents \}

 \* Payload \(subscribe\):     \{ action: 'subscribe', account\_id, price\_id, success\_url, cancel\_url \}

 \*/

import Stripe from 'npm:stripe@18\.5\.0';

Deno\.serve\(async \(req\) => \{

  try \{

    const stripeKey = Deno\.env\.get\('STRIPE\_SECRET\_KEY'\);

    if \(\!stripeKey\) \{

      return Response\.json\(\{ ok: false, error: 'STRIPE\_SECRET\_KEY missing' \}, \{ status: 500 \}\);

    \}

    const stripeClient = new Stripe\(stripeKey\);

    const body = await req\.json\(\);

    const \{ action, account\_id \} = body;

    const origin = req\.headers\.get\('origin'\) || 'https://example\.com';

    if \(\!account\_id\) \{

      return Response\.json\(\{ ok: false, error: 'Missing account\_id' \}, \{ status: 400 \}\);

    \}

    // ─── STOREFRONT — Direct charge on connected account ──────────

    if \(action === 'storefront'\) \{

      const \{

        price\_id,

        quantity = 1,

        application\_fee\_cents = 0,  // PLACEHOLDER — your platform's take per transaction

        success\_url,

        cancel\_url,

      \} = body;

      if \(\!price\_id\) \{

        return Response\.json\(\{ ok: false, error: 'price\_id required' \}, \{ status: 400 \}\);

      \}

      const session = await stripeClient\.checkout\.sessions\.create\(

        \{

          mode: 'payment',

          line\_items: \[\{ price: price\_id, quantity \}\],

          payment\_intent\_data: \{

            application\_fee\_amount: application\_fee\_cents,

          \},

          success\_url: success\_url || \`$\{origin\}/StripeConnect/Store/$\{account\_id\}?success=true&session\_id=\{CHECKOUT\_SESSION\_ID\}\`,

          cancel\_url:  cancel\_url  || \`$\{origin\}/StripeConnect/Store/$\{account\_id\}?canceled=true\`,

          metadata: \{

            base44\_app\_id: Deno\.env\.get\('BASE44\_APP\_ID'\) || '',

            connected\_account: account\_id,

          \},

        \},

        \{

          // CRITICAL: this is what makes it a Direct Charge on the connected account

          stripeAccount: account\_id,

        \}

      \);

      return Response\.json\(\{ ok: true, url: session\.url, session\_id: session\.id \}\);

    \}

    // ─── SUBSCRIBE — Connected account subscribes to platform ─────

    if \(action === 'subscribe'\) \{

      const \{ price\_id, success\_url, cancel\_url \} = body;

      if \(\!price\_id\) \{

        return Response\.json\(\{ ok: false, error: 'price\_id required' \}, \{ status: 400 \}\);

      \}

      // No stripeAccount header — this runs on the PLATFORM account\.

      // customer\_account points to the V2 connected account being billed\.

      const session = await stripeClient\.checkout\.sessions\.create\(\{

        mode: 'subscription',

        customer\_account: account\_id,

        line\_items: \[\{ price: price\_id, quantity: 1 \}\],

        success\_url: success\_url || \`$\{origin\}/StripeConnect?subscribed=true&session\_id=\{CHECKOUT\_SESSION\_ID\}\`,

        cancel\_url:  cancel\_url  || \`$\{origin\}/StripeConnect?canceled=true\`,

        metadata: \{

          base44\_app\_id: Deno\.env\.get\('BASE44\_APP\_ID'\) || '',

          connected\_account: account\_id,

        \},

      \}\);

      return Response\.json\(\{ ok: true, url: session\.url, session\_id: session\.id \}\);

    \}

    // ─── BILLING PORTAL — Manage existing subscription ────────────

    if \(action === 'portal'\) \{

      const \{ return\_url \} = body;

      const session = await stripeClient\.billingPortal\.sessions\.create\(\{

        customer\_account: account\_id,

        return\_url: return\_url || \`$\{origin\}/StripeConnect\`,

      \}\);

      return Response\.json\(\{ ok: true, url: session\.url \}\);

    \}

    return Response\.json\(\{ ok: false, error: 'Unknown action\.' \}, \{ status: 400 \}\);

  \} catch \(error\) \{

    console\.error\('connectCheckout error:', error\);

    return Response\.json\(\{ ok: false, error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
