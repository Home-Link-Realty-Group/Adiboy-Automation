# checkoutsesion

Source: checkoutsesion.docx

import Stripe from 'npm:stripe@14\.10\.0';

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

const stripe = new Stripe\(Deno\.env\.get\('STRIPE\_SECRET\_KEY'\)\);

// Plan → Stripe Price ID mapping

const PRICE\_MAP = \{

  starter: 'price\_1TQxSP86O5BxKcZoOjwzOIha',  // $97/mo

  pro: 'price\_1TQxSP86O5BxKcZorn56EI0W',       // $197/mo

  enterprise: 'price\_1TQxSP86O5BxKcZodE6BhNUj' // $497/mo

\};

const PLAN\_LIMITS = \{

  starter: 100,

  pro: 1000,

  enterprise: 999999,

\};

Deno\.serve\(async \(req\) => \{

  if \(req\.method \!== 'POST'\) \{

    return Response\.json\(\{ error: 'POST required' \}, \{ status: 405 \}\);

  \}

  try \{

    const \{ plan, email, name, successUrl, cancelUrl \} = await req\.json\(\);

    if \(\!plan || \!PRICE\_MAP\[plan\]\) \{

      return Response\.json\(\{ error: 'Invalid plan' \}, \{ status: 400 \}\);

    \}

    if \(\!email\) \{

      return Response\.json\(\{ error: 'Email required' \}, \{ status: 400 \}\);

    \}

    const origin = req\.headers\.get\('origin'\) || 'https://homelinkrealtygroup\.com';

    const session = await stripe\.checkout\.sessions\.create\(\{

      mode: 'subscription',

      payment\_method\_types: \['card'\],

      line\_items: \[\{ price: PRICE\_MAP\[plan\], quantity: 1 \}\],

      customer\_email: email,

      subscription\_data: \{

        trial\_period\_days: 7,

        metadata: \{

          plan,

          user\_email: email,

          user\_name: name || '',

          leads\_limit: String\(PLAN\_LIMITS\[plan\]\),

        \},

      \},

      success\_url: successUrl || \`$\{origin\}/Onboarding?email=$\{encodeURIComponent\(email\)\}&plan=$\{plan\}&session\_id=\{CHECKOUT\_SESSION\_ID\}\`,

      cancel\_url: cancelUrl || \`$\{origin\}/Pricing?canceled=true\`,

      metadata: \{

        base44\_app\_id: Deno\.env\.get\('BASE44\_APP\_ID'\),

        plan,

        user\_email: email,

      \},

      allow\_promotion\_codes: true,

    \}\);

    // Pre\-create Subscription record so we track from day 1

    try \{

      const base44 = createClientFromRequest\(req\);

      await base44\.asServiceRole\.entities\.Subscription\.create\(\{

        user\_email: email,

        user\_name: name || '',

        plan: 'trial',

        status: 'incomplete',

        leads\_limit: PLAN\_LIMITS\[plan\],

        notes: \`Checkout initiated for $\{plan\} plan\. Session: $\{session\.id\}\`,

      \}\);

    \} catch \(e\) \{

      console\.warn\('Failed to pre\-create Subscription:', e\.message\);

    \}

    return Response\.json\(\{ url: session\.url, sessionId: session\.id \}\);

  \} catch \(error\) \{

    console\.error\('Checkout error:', error\);

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
