# checkoutsesion

Source: checkoutsesion.docx

import Stripe from 'npm:stripe@14.10.0';

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

// Plan → Stripe Price ID mapping

const PRICE_MAP = {

  starter: 'price_1TQxSP86O5BxKcZoOjwzOIha',  // $97/mo

  pro: 'price_1TQxSP86O5BxKcZorn56EI0W',       // $197/mo

  enterprise: 'price_1TQxSP86O5BxKcZodE6BhNUj' // $497/mo

};

const PLAN_LIMITS = {

  starter: 100,

  pro: 1000,

  enterprise: 999999,

};

Deno.serve(async (req) => {

  if (req.method !== 'POST') {

    return Response.json({ error: 'POST required' }, { status: 405 });

  }

  try {

    const { plan, email, name, successUrl, cancelUrl } = await req.json();

    if (!plan || !PRICE_MAP[plan]) {

      return Response.json({ error: 'Invalid plan' }, { status: 400 });

    }

    if (!email) {

      return Response.json({ error: 'Email required' }, { status: 400 });

    }

    const origin = req.headers.get('origin') || 'https://homelinkrealtygroup.com';

    const session = await stripe.checkout.sessions.create({

      mode: 'subscription',

      payment_method_types: ['card'],

      line_items: [{ price: PRICE_MAP[plan], quantity: 1 }],

      customer_email: email,

      subscription_data: {

        trial_period_days: 7,

        metadata: {

          plan,

          user_email: email,

          user_name: name || '',

          leads_limit: String(PLAN_LIMITS[plan]),

        },

      },

      success_url: successUrl || `${origin}/Onboarding?email=${encodeURIComponent(email)}&plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: cancelUrl || `${origin}/Pricing?canceled=true`,

      metadata: {

        base44_app_id: Deno.env.get('BASE44_APP_ID'),

        plan,

        user_email: email,

      },

      allow_promotion_codes: true,

    });

    // Pre-create Subscription record so we track from day 1

    try {

      const base44 = createClientFromRequest(req);

      await base44.asServiceRole.entities.Subscription.create({

        user_email: email,

        user_name: name || '',

        plan: 'trial',

        status: 'incomplete',

        leads_limit: PLAN_LIMITS[plan],

        notes: `Checkout initiated for ${plan} plan. Session: ${session.id}`,

      });

    } catch (e) {

      console.warn('Failed to pre-create Subscription:', e.message);

    }

    return Response.json({ url: session.url, sessionId: session.id });

  } catch (error) {

    console.error('Checkout error:', error);

    return Response.json({ error: error.message }, { status: 500 });

  }

});
