# Connectwebhook

Source: Connectwebhook.docx

/**

 * Stripe Connect — Webhook Endpoint

 * ─────────────────────────────────

 * Handles BOTH:

 *   • THIN events (V2 Connect events) — for connected account requirement / capability changes

 *   • SNAPSHOT events (V1 events)     — for subscription lifecycle on platform account

 *

 * To wire this up:

 *   1. In Stripe Dashboard → Developers → Webhooks, click "+ Add destination".

 *   2. For Connect events: select "Connected accounts", payload style "Thin",

 *      events: v2.core.account[requirements].updated,

 *              v2.core.account[configuration.merchant].capability_status_updated,

 *              v2.core.account[configuration.customer].capability_status_updated

 *   3. For subscription events: select "Account" (platform), payload style "Snapshot",

 *      events: customer.subscription.updated, customer.subscription.deleted,

 *              payment_method.attached, payment_method.detached, customer.updated,

 *              customer.tax_id.created, customer.tax_id.updated, customer.tax_id.deleted,

 *              billing_portal.configuration.created, billing_portal.configuration.updated,

 *              billing_portal.session.created

 *   4. Endpoint URL: https://<your-app>.base44.app/functions/connectWebhook

 *   5. Copy the webhook signing secret → save as STRIPE_CONNECT_WEBHOOK_SECRET in Base44 secrets.

 *      (Reuse STRIPE_WEBHOOK_SECRET if you only have one endpoint.)

 *

 * Local testing with Stripe CLI:

 *   stripe listen --thin-events 'v2.core.account[requirements].updated,v2.core.account[configuration.merchant].capability_status_updated' \

 *                 --forward-thin-to http://localhost:8000/functions/connectWebhook

 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

import Stripe from 'npm:stripe@18.5.0';

Deno.serve(async (req) => {

  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');

  // Try Connect-specific secret first, fall back to general webhook secret.

  const webhookSecret =

    Deno.env.get('STRIPE_CONNECT_WEBHOOK_SECRET') || Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!stripeKey || !webhookSecret) {

    console.error('Missing STRIPE_SECRET_KEY or webhook secret');

    return new Response('Missing config', { status: 500 });

  }

  const stripeClient = new Stripe(stripeKey);

  const sig = req.headers.get('stripe-signature');

  const body = await req.text();

  if (!sig) return new Response('Missing signature', { status: 400 });

  // Init Base44 client AFTER reading body (per Stripe webhook guideline).

  const base44 = createClientFromRequest(req);

  // ─── Try parsing as a THIN event first (V2 Connect events) ──────

  // Thin events have a tiny payload — we must call the API to fetch full data.

  let isThin = false;

  let thinEvent;

  try {

    thinEvent = stripeClient.parseThinEvent(body, sig, webhookSecret);

    isThin = true;

  } catch (_) {

    // Not a thin event — try parsing as a snapshot event below.

    isThin = false;

  }

  try {

    if (isThin) {

      // ─── THIN EVENT FLOW (V2 Connect events) ──────────────────

      console.log('[Connect Webhook] Thin event:', thinEvent.type, thinEvent.id);

      // Fetch full event data from V2 events endpoint

      const fullEvent = await stripeClient.v2.core.events.retrieve(thinEvent.id);

      const accountId = thinEvent.account || fullEvent.context;

      switch (thinEvent.type) {

        case 'v2.core.account[requirements].updated':

          console.log(`[Connect] Requirements changed for ${accountId}`);

          // TODO: notify the merchant in-app that their requirements changed

          // (e.g., new doc needed). They can re-onboard via /StripeConnect.

          break;

        case 'v2.core.account[configuration.merchant].capability_status_updated':

          console.log(`[Connect] Merchant capability status changed for ${accountId}`);

          // TODO: if card_payments became 'active', enable storefront for this user.

          break;

        case 'v2.core.account[configuration.customer].capability_status_updated':

          console.log(`[Connect] Customer capability status changed for ${accountId}`);

          break;

        default:

          console.log(`[Connect] Unhandled thin event: ${thinEvent.type}`);

      }

    } else {

      // ─── SNAPSHOT EVENT FLOW (V1 / subscription events) ───────

      const event = stripeClient.webhooks.constructEvent(body, sig, webhookSecret);

      console.log('[Connect Webhook] Snapshot event:', event.type, event.id);

      switch (event.type) {

        // ─── SUBSCRIPTION LIFECYCLE ─────────────────────────────

        case 'customer.subscription.updated':

        case 'customer.subscription.deleted': {

          const sub = event.data.object;

          // V2 accounts use customer_account (acct_...) instead of customer (cus_...)

          const accountId = sub.customer_account || sub.customer;

          // Update our DB with latest sub status

          const records = await base44.asServiceRole.entities.ConnectedAccount.filter({

            stripe_account_id: accountId,

          });

          if (records && records.length > 0) {

            await base44.asServiceRole.entities.ConnectedAccount.update(records[0].id, {

              subscription_status: sub.status,

              subscription_id: sub.id,

              subscription_price_id: sub.items?.data?.[0]?.price?.id || '',

              subscription_current_period_end: sub.current_period_end

                ? new Date(sub.current_period_end * 1000).toISOString()

                : null,

            });

          }

          // TODO: if event.type === 'customer.subscription.deleted', revoke product access.

          // TODO: if pause_collection set, pause access; if cleared, resume.

          break;

        }

        // ─── PAYMENT METHODS ────────────────────────────────────

        case 'payment_method.attached':

        case 'payment_method.detached':

          // TODO: optional — surface in user dashboard

          console.log(`[Connect] PM ${event.type} for customer_account ${event.data.object.customer_account}`);

          break;

        // ─── CUSTOMER + TAX IDS ─────────────────────────────────

        case 'customer.updated':

        case 'customer.tax_id.created':

        case 'customer.tax_id.updated':

        case 'customer.tax_id.deleted':

          // TODO: sync tax ID validation state for invoicing

          break;

        // ─── BILLING PORTAL ─────────────────────────────────────

        case 'billing_portal.configuration.created':

        case 'billing_portal.configuration.updated':

        case 'billing_portal.session.created':

          // TODO: optional analytics

          break;

        default:

          console.log(`[Connect] Unhandled snapshot event: ${event.type}`);

      }

    }

    return Response.json({ received: true });

  } catch (error) {

    console.error('connectWebhook error:', error);

    return new Response(`Webhook handler failed: ${error.message}`, { status: 400 });

  }

});
