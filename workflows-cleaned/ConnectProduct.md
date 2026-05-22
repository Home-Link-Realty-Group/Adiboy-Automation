# ConnectProduct

Source: ConnectProduct.docx

/**

 * Stripe Connect — Create & List Products on a Connected Account

 * ──────────────────────────────────────────────────────────────

 * Products are created ON the connected account using the Stripe-Account header

 * (passed via the `stripeAccount` request option in the SDK).

 *

 * Two actions:

 *   action: 'create' — create a new product on the connected account

 *   action: 'list'   — list all active products on the connected account

 *

 * Payload (create): { action: 'create', account_id, name, description, price_cents, currency }

 * Payload (list):   { action: 'list', account_id }

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

    if (!account_id) {

      return Response.json({ ok: false, error: 'Missing account_id' }, { status: 400 });

    }

    // ─── CREATE product on connected account ──────────────────────

    if (action === 'create') {

      const { name, description, price_cents, currency = 'usd' } = body;

      if (!name || !price_cents) {

        return Response.json({ ok: false, error: 'name and price_cents required' }, { status: 400 });

      }

      const product = await stripeClient.products.create(

        {

          name,

          description: description || undefined,

          default_price_data: {

            unit_amount: price_cents,

            currency,

          },

        },

        {

          // The Stripe-Account header — creates the product ON the connected account

          stripeAccount: account_id,

        }

      );

      return Response.json({ ok: true, product });

    }

    // ─── LIST products on connected account ───────────────────────

    if (action === 'list') {

      const products = await stripeClient.products.list(

        {

          limit: 20,

          active: true,

          expand: ['data.default_price'],

        },

        {

          stripeAccount: account_id,

        }

      );

      return Response.json({ ok: true, products: products.data });

    }

    return Response.json({ ok: false, error: 'Unknown action. Use "create" or "list".' }, { status: 400 });

  } catch (error) {

    console.error('connectProducts error:', error);

    return Response.json({ ok: false, error: error.message }, { status: 500 });

  }

});
