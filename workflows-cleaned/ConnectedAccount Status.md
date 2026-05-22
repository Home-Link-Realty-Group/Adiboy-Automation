# ConnectedAccount Status

Source: ConnectedAccount Status.docx

/**

 * Stripe Connect — Get Live Account Status

 * ─────────────────────────────────────────

 * Pulls the *live* status of a V2 connected account directly from Stripe API.

 * We intentionally do NOT cache this in our DB — Stripe is the source of truth

 * for onboarding status, capability status, and outstanding requirements.

 *

 * Payload: { account_id }

 * Returns: { ok, ready_to_process_payments, onboarding_complete, requirements_status, account }

 */

import Stripe from 'npm:stripe@18.5.0';

Deno.serve(async (req) => {

  try {

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');

    if (!stripeKey) {

      return Response.json({ ok: false, error: 'STRIPE_SECRET_KEY missing' }, { status: 500 });

    }

    const stripeClient = new Stripe(stripeKey);

    const { account_id } = await req.json();

    if (!account_id) {

      return Response.json({ ok: false, error: 'Missing account_id' }, { status: 400 });

    }

    // ─── Retrieve the V2 account, expanding merchant config + requirements ──

    const account = await stripeClient.v2.core.accounts.retrieve(account_id, {

      include: ['configuration.merchant', 'requirements'],

    });

    // ─── Derive practical status flags ─────────────────────────────

    const cardPaymentsStatus = account?.configuration?.merchant?.capabilities?.card_payments?.status;

    const readyToProcessPayments = cardPaymentsStatus === 'active';

    const requirementsStatus = account?.requirements?.summary?.minimum_deadline?.status;

    const onboardingComplete =

      requirementsStatus !== 'currently_due' && requirementsStatus !== 'past_due';

    return Response.json({

      ok: true,

      ready_to_process_payments: readyToProcessPayments,

      onboarding_complete: onboardingComplete,

      requirements_status: requirementsStatus || 'unknown',

      card_payments_status: cardPaymentsStatus || 'inactive',

      account: {

        id: account.id,

        display_name: account.display_name,

        contact_email: account.contact_email,

        country: account.identity?.country,

      },

    });

  } catch (error) {

    console.error('connectAccountStatus error:', error);

    return Response.json({ ok: false, error: error.message }, { status: 500 });

  }

});
