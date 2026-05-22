# ConnectProduct

Source: ConnectProduct.docx

/\*\*

 \* Stripe Connect — Create & List Products on a Connected Account

 \* ──────────────────────────────────────────────────────────────

 \* Products are created ON the connected account using the Stripe\-Account header

 \* \(passed via the \`stripeAccount\` request option in the SDK\)\.

 \*

 \* Two actions:

 \*   action: 'create' — create a new product on the connected account

 \*   action: 'list'   — list all active products on the connected account

 \*

 \* Payload \(create\): \{ action: 'create', account\_id, name, description, price\_cents, currency \}

 \* Payload \(list\):   \{ action: 'list', account\_id \}

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

    if \(\!account\_id\) \{

      return Response\.json\(\{ ok: false, error: 'Missing account\_id' \}, \{ status: 400 \}\);

    \}

    // ─── CREATE product on connected account ──────────────────────

    if \(action === 'create'\) \{

      const \{ name, description, price\_cents, currency = 'usd' \} = body;

      if \(\!name || \!price\_cents\) \{

        return Response\.json\(\{ ok: false, error: 'name and price\_cents required' \}, \{ status: 400 \}\);

      \}

      const product = await stripeClient\.products\.create\(

        \{

          name,

          description: description || undefined,

          default\_price\_data: \{

            unit\_amount: price\_cents,

            currency,

          \},

        \},

        \{

          // The Stripe\-Account header — creates the product ON the connected account

          stripeAccount: account\_id,

        \}

      \);

      return Response\.json\(\{ ok: true, product \}\);

    \}

    // ─── LIST products on connected account ───────────────────────

    if \(action === 'list'\) \{

      const products = await stripeClient\.products\.list\(

        \{

          limit: 20,

          active: true,

          expand: \['data\.default\_price'\],

        \},

        \{

          stripeAccount: account\_id,

        \}

      \);

      return Response\.json\(\{ ok: true, products: products\.data \}\);

    \}

    return Response\.json\(\{ ok: false, error: 'Unknown action\. Use "create" or "list"\.' \}, \{ status: 400 \}\);

  \} catch \(error\) \{

    console\.error\('connectProducts error:', error\);

    return Response\.json\(\{ ok: false, error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
