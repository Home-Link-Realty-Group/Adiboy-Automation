# Refreshonboarding

Source: Refreshonboarding.docx

/**

 * Stripe Connect — Generate a Fresh Onboarding Link

 * ─────────────────────────────────────────────────

 * Account Links expire after a few minutes for security. If a merchant

 * abandons onboarding and comes back later, generate a new link here.

 *

 * Payload: { account_id, return_url?, refresh_url? }

 * Returns: { ok, onboarding_url }

 */

import Stripe from 'npm:stripe@18.5.0';

Deno.serve(async (req) => {

  try {

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');

    if (!stripeKey) {

      return Response.json({ ok: false, error: 'STRIPE_SECRET_KEY missing' }, { status: 500 });

    }

    const stripeClient = new Stripe(stripeKey);

    const { account_id, return_url, refresh_url } = await req.json();

    if (!account_id) {

      return Response.json({ ok: false, error: 'Missing account_id' }, { status: 400 });

    }

    const origin = req.headers.get('origin') || 'https://example.com';

    const accountLink = await stripeClient.v2.core.accountLinks.create({

      account: account_id,

      use_case: {

        type: 'account_onboarding',

        account_onboarding: {

          configurations: ['merchant', 'customer'],

          refresh_url: refresh_url || `${origin}/StripeConnect?refresh=true`,

          return_url: return_url || `${origin}/StripeConnect?accountId=${account_id}`,

        },

      },

    });

    return Response.json({ ok: true, onboarding_url: accountLink.url });

  } catch (error) {

    console.error('connectRefreshOnboarding error:', error);

    return Response.json({ ok: false, error: error.message }, { status: 500 });

  }

});
