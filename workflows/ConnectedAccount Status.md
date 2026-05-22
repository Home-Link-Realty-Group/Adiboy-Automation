# ConnectedAccount Status

Source: ConnectedAccount Status.docx

/\*\*

 \* Stripe Connect — Get Live Account Status

 \* ─────────────────────────────────────────

 \* Pulls the \*live\* status of a V2 connected account directly from Stripe API\.

 \* We intentionally do NOT cache this in our DB — Stripe is the source of truth

 \* for onboarding status, capability status, and outstanding requirements\.

 \*

 \* Payload: \{ account\_id \}

 \* Returns: \{ ok, ready\_to\_process\_payments, onboarding\_complete, requirements\_status, account \}

 \*/

import Stripe from 'npm:stripe@18\.5\.0';

Deno\.serve\(async \(req\) => \{

  try \{

    const stripeKey = Deno\.env\.get\('STRIPE\_SECRET\_KEY'\);

    if \(\!stripeKey\) \{

      return Response\.json\(\{ ok: false, error: 'STRIPE\_SECRET\_KEY missing' \}, \{ status: 500 \}\);

    \}

    const stripeClient = new Stripe\(stripeKey\);

    const \{ account\_id \} = await req\.json\(\);

    if \(\!account\_id\) \{

      return Response\.json\(\{ ok: false, error: 'Missing account\_id' \}, \{ status: 400 \}\);

    \}

    // ─── Retrieve the V2 account, expanding merchant config \+ requirements ──

    const account = await stripeClient\.v2\.core\.accounts\.retrieve\(account\_id, \{

      include: \['configuration\.merchant', 'requirements'\],

    \}\);

    // ─── Derive practical status flags ─────────────────────────────

    const cardPaymentsStatus = account?\.configuration?\.merchant?\.capabilities?\.card\_payments?\.status;

    const readyToProcessPayments = cardPaymentsStatus === 'active';

    const requirementsStatus = account?\.requirements?\.summary?\.minimum\_deadline?\.status;

    const onboardingComplete =

      requirementsStatus \!== 'currently\_due' && requirementsStatus \!== 'past\_due';

    return Response\.json\(\{

      ok: true,

      ready\_to\_process\_payments: readyToProcessPayments,

      onboarding\_complete: onboardingComplete,

      requirements\_status: requirementsStatus || 'unknown',

      card\_payments\_status: cardPaymentsStatus || 'inactive',

      account: \{

        id: account\.id,

        display\_name: account\.display\_name,

        contact\_email: account\.contact\_email,

        country: account\.identity?\.country,

      \},

    \}\);

  \} catch \(error\) \{

    console\.error\('connectAccountStatus error:', error\);

    return Response\.json\(\{ ok: false, error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
