# Connectwebhook

Source: Connectwebhook.docx

/\*\*

 \* Stripe Connect — Webhook Endpoint

 \* ─────────────────────────────────

 \* Handles BOTH:

 \*   • THIN events \(V2 Connect events\) — for connected account requirement / capability changes

 \*   • SNAPSHOT events \(V1 events\)     — for subscription lifecycle on platform account

 \*

 \* To wire this up:

 \*   1\. In Stripe Dashboard → Developers → Webhooks, click "\+ Add destination"\.

 \*   2\. For Connect events: select "Connected accounts", payload style "Thin",

 \*      events: v2\.core\.account\[requirements\]\.updated,

 \*              v2\.core\.account\[configuration\.merchant\]\.capability\_status\_updated,

 \*              v2\.core\.account\[configuration\.customer\]\.capability\_status\_updated

 \*   3\. For subscription events: select "Account" \(platform\), payload style "Snapshot",

 \*      events: customer\.subscription\.updated, customer\.subscription\.deleted,

 \*              payment\_method\.attached, payment\_method\.detached, customer\.updated,

 \*              customer\.tax\_id\.created, customer\.tax\_id\.updated, customer\.tax\_id\.deleted,

 \*              billing\_portal\.configuration\.created, billing\_portal\.configuration\.updated,

 \*              billing\_portal\.session\.created

 \*   4\. Endpoint URL: https://<your\-app>\.base44\.app/functions/connectWebhook

 \*   5\. Copy the webhook signing secret → save as STRIPE\_CONNECT\_WEBHOOK\_SECRET in Base44 secrets\.

 \*      \(Reuse STRIPE\_WEBHOOK\_SECRET if you only have one endpoint\.\)

 \*

 \* Local testing with Stripe CLI:

 \*   stripe listen \-\-thin\-events 'v2\.core\.account\[requirements\]\.updated,v2\.core\.account\[configuration\.merchant\]\.capability\_status\_updated' \\

 \*                 \-\-forward\-thin\-to http://localhost:8000/functions/connectWebhook

 \*/

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

import Stripe from 'npm:stripe@18\.5\.0';

Deno\.serve\(async \(req\) => \{

  const stripeKey = Deno\.env\.get\('STRIPE\_SECRET\_KEY'\);

  // Try Connect\-specific secret first, fall back to general webhook secret\.

  const webhookSecret =

    Deno\.env\.get\('STRIPE\_CONNECT\_WEBHOOK\_SECRET'\) || Deno\.env\.get\('STRIPE\_WEBHOOK\_SECRET'\);

  if \(\!stripeKey || \!webhookSecret\) \{

    console\.error\('Missing STRIPE\_SECRET\_KEY or webhook secret'\);

    return new Response\('Missing config', \{ status: 500 \}\);

  \}

  const stripeClient = new Stripe\(stripeKey\);

  const sig = req\.headers\.get\('stripe\-signature'\);

  const body = await req\.text\(\);

  if \(\!sig\) return new Response\('Missing signature', \{ status: 400 \}\);

  // Init Base44 client AFTER reading body \(per Stripe webhook guideline\)\.

  const base44 = createClientFromRequest\(req\);

  // ─── Try parsing as a THIN event first \(V2 Connect events\) ──────

  // Thin events have a tiny payload — we must call the API to fetch full data\.

  let isThin = false;

  let thinEvent;

  try \{

    thinEvent = stripeClient\.parseThinEvent\(body, sig, webhookSecret\);

    isThin = true;

  \} catch \(\_\) \{

    // Not a thin event — try parsing as a snapshot event below\.

    isThin = false;

  \}

  try \{

    if \(isThin\) \{

      // ─── THIN EVENT FLOW \(V2 Connect events\) ──────────────────

      console\.log\('\[Connect Webhook\] Thin event:', thinEvent\.type, thinEvent\.id\);

      // Fetch full event data from V2 events endpoint

      const fullEvent = await stripeClient\.v2\.core\.events\.retrieve\(thinEvent\.id\);

      const accountId = thinEvent\.account || fullEvent\.context;

      switch \(thinEvent\.type\) \{

        case 'v2\.core\.account\[requirements\]\.updated':

          console\.log\(\`\[Connect\] Requirements changed for $\{accountId\}\`\);

          // TODO: notify the merchant in\-app that their requirements changed

          // \(e\.g\., new doc needed\)\. They can re\-onboard via /StripeConnect\.

          break;

        case 'v2\.core\.account\[configuration\.merchant\]\.capability\_status\_updated':

          console\.log\(\`\[Connect\] Merchant capability status changed for $\{accountId\}\`\);

          // TODO: if card\_payments became 'active', enable storefront for this user\.

          break;

        case 'v2\.core\.account\[configuration\.customer\]\.capability\_status\_updated':

          console\.log\(\`\[Connect\] Customer capability status changed for $\{accountId\}\`\);

          break;

        default:

          console\.log\(\`\[Connect\] Unhandled thin event: $\{thinEvent\.type\}\`\);

      \}

    \} else \{

      // ─── SNAPSHOT EVENT FLOW \(V1 / subscription events\) ───────

      const event = stripeClient\.webhooks\.constructEvent\(body, sig, webhookSecret\);

      console\.log\('\[Connect Webhook\] Snapshot event:', event\.type, event\.id\);

      switch \(event\.type\) \{

        // ─── SUBSCRIPTION LIFECYCLE ─────────────────────────────

        case 'customer\.subscription\.updated':

        case 'customer\.subscription\.deleted': \{

          const sub = event\.data\.object;

          // V2 accounts use customer\_account \(acct\_\.\.\.\) instead of customer \(cus\_\.\.\.\)

          const accountId = sub\.customer\_account || sub\.customer;

          // Update our DB with latest sub status

          const records = await base44\.asServiceRole\.entities\.ConnectedAccount\.filter\(\{

            stripe\_account\_id: accountId,

          \}\);

          if \(records && records\.length > 0\) \{

            await base44\.asServiceRole\.entities\.ConnectedAccount\.update\(records\[0\]\.id, \{

              subscription\_status: sub\.status,

              subscription\_id: sub\.id,

              subscription\_price\_id: sub\.items?\.data?\.\[0\]?\.price?\.id || '',

              subscription\_current\_period\_end: sub\.current\_period\_end

                ? new Date\(sub\.current\_period\_end \* 1000\)\.toISOString\(\)

                : null,

            \}\);

          \}

          // TODO: if event\.type === 'customer\.subscription\.deleted', revoke product access\.

          // TODO: if pause\_collection set, pause access; if cleared, resume\.

          break;

        \}

        // ─── PAYMENT METHODS ────────────────────────────────────

        case 'payment\_method\.attached':

        case 'payment\_method\.detached':

          // TODO: optional — surface in user dashboard

          console\.log\(\`\[Connect\] PM $\{event\.type\} for customer\_account $\{event\.data\.object\.customer\_account\}\`\);

          break;

        // ─── CUSTOMER \+ TAX IDS ─────────────────────────────────

        case 'customer\.updated':

        case 'customer\.tax\_id\.created':

        case 'customer\.tax\_id\.updated':

        case 'customer\.tax\_id\.deleted':

          // TODO: sync tax ID validation state for invoicing

          break;

        // ─── BILLING PORTAL ─────────────────────────────────────

        case 'billing\_portal\.configuration\.created':

        case 'billing\_portal\.configuration\.updated':

        case 'billing\_portal\.session\.created':

          // TODO: optional analytics

          break;

        default:

          console\.log\(\`\[Connect\] Unhandled snapshot event: $\{event\.type\}\`\);

      \}

    \}

    return Response\.json\(\{ received: true \}\);

  \} catch \(error\) \{

    console\.error\('connectWebhook error:', error\);

    return new Response\(\`Webhook handler failed: $\{error\.message\}\`, \{ status: 400 \}\);

  \}

\}\);
