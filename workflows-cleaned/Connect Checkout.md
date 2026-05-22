# Connect Checkout

Source: Connect Checkout.docx

/**

 * Stripe Connect — Create Checkout Sessions

 * ─────────────────────────────────────────

 * Two flows:

 *

 * 1. DIRECT CHARGE on connected account (storefront purchase by end customer)

 *    - Uses `stripeAccount` header

 *    - Charges the connected account's payment method, with an `application_fee_amount`

 *      that flows to YOUR platform Stripe account.

 *

 * 2. PLATFORM SUBSCRIPTION (connected account subscribes to YOUR platform)

 *    - No stripeAccount header — runs on the platform account.

 *    - Uses `customer_account: acct_...` to bill the connected account itself.

 *

 * Payload (storefront):    { action: 'storefront', account_id, price_id, quantity, success_url, cancel_url, application_fee_cents }

 * Payload (subscribe):     { action: 'subscribe', account_id, price_id, success_url, cancel_url }

 */

import Stripe from 'npm:stripe@18.5.0';

Deno.serve(async (req) => {

  try {

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');

    if (!stripeKey) {

      return Response.json({ ok: false, error: 'STRIPE_SECRET_KEY missing' }, { status: 500 });

    }

    const stripeClient = new Stripe(stripeKey);

    const body = await req.json();

    const { action, account_id } = body;

    const origin = req.headers.get('origin') || 'https://example.com';

    if (!account_id) {

      return Response.json({ ok: false, error: 'Missing account_id' }, { status: 400 });

    }

    // ─── STOREFRONT — Direct charge on connected account ──────────

    if (action === 'storefront') {

      const {

        price_id,

        quantity = 1,

        application_fee_cents = 0,  // PLACEHOLDER — your platform's take per transaction

        success_url,

        cancel_url,

      } = body;

      if (!price_id) {

        return Response.json({ ok: false, error: 'price_id required' }, { status: 400 });

      }

      const session = await stripeClient.checkout.sessions.create(

        {

          mode: 'payment',

          line_items: [{ price: price_id, quantity }],

          payment_intent_data: {

            application_fee_amount: application_fee_cents,

          },

          success_url: success_url || `${origin}/StripeConnect/Store/${account_id}?success=true&session_id={CHECKOUT_SESSION_ID}`,

          cancel_url:  cancel_url  || `${origin}/StripeConnect/Store/${account_id}?canceled=true`,

          metadata: {

            base44_app_id: Deno.env.get('BASE44_APP_ID') || '',

            connected_account: account_id,

          },

        },

        {

          // CRITICAL: this is what makes it a Direct Charge on the connected account

          stripeAccount: account_id,

        }

      );

      return Response.json({ ok: true, url: session.url, session_id: session.id });

    }

    // ─── SUBSCRIBE — Connected account subscribes to platform ─────

    if (action === 'subscribe') {

      const { price_id, success_url, cancel_url } = body;

      if (!price_id) {

        return Response.json({ ok: false, error: 'price_id required' }, { status: 400 });

      }

      // No stripeAccount header — this runs on the PLATFORM account.

      // customer_account points to the V2 connected account being billed.

      const session = await stripeClient.checkout.sessions.create({

        mode: 'subscription',

        customer_account: account_id,

        line_items: [{ price: price_id, quantity: 1 }],

        success_url: success_url || `${origin}/StripeConnect?subscribed=true&session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:  cancel_url  || `${origin}/StripeConnect?canceled=true`,

        metadata: {

          base44_app_id: Deno.env.get('BASE44_APP_ID') || '',

          connected_account: account_id,

        },

      });

      return Response.json({ ok: true, url: session.url, session_id: session.id });

    }

    // ─── BILLING PORTAL — Manage existing subscription ────────────

    if (action === 'portal') {

      const { return_url } = body;

      const session = await stripeClient.billingPortal.sessions.create({

        customer_account: account_id,

        return_url: return_url || `${origin}/StripeConnect`,

      });

      return Response.json({ ok: true, url: session.url });

    }

    return Response.json({ ok: false, error: 'Unknown action.' }, { status: 400 });

  } catch (error) {

    console.error('connectCheckout error:', error);

    return Response.json({ ok: false, error: error.message }, { status: 500 });

  }

});
