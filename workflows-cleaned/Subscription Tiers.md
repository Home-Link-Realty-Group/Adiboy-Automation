# Subscription Tiers

Source: Subscription Tiers.docx

{

  "name": "Subscription",

  "type": "object",

  "properties": {

    "user_email": {

      "type": "string",

      "description": "Email of the subscriber"

    },

    "user_name": {

      "type": "string",

      "description": "Full name of the subscriber"

    },

    "stripe_customer_id": {

      "type": "string",

      "description": "Stripe customer ID"

    },

    "stripe_subscription_id": {

      "type": "string",

      "description": "Stripe subscription ID"

    },

    "stripe_price_id": {

      "type": "string",

      "description": "Stripe price ID for the active plan"

    },

    "plan": {

      "type": "string",

      "enum": [

        "trial",

        "starter",

        "pro",

        "enterprise"

      ],

      "default": "trial",

      "description": "Subscription tier"

    },

    "status": {

      "type": "string",

      "enum": [

        "trialing",

        "active",

        "past_due",

        "canceled",

        "incomplete",

        "expired"

      ],

      "default": "trialing",

      "description": "Subscription status"

    },

    "trial_ends_at": {

      "type": "string",

      "format": "date-time",

      "description": "When the free trial expires"

    },

    "current_period_end": {

      "type": "string",

      "format": "date-time",

      "description": "End of current billing period"

    },

    "leads_used_this_period": {

      "type": "number",

      "default": 0,

      "description": "Number of leads consumed this billing cycle"

    },

    "leads_limit": {

      "type": "number",

      "default": 25,

      "description": "Max leads allowed per period (25 trial, 100 starter, 1000 pro, 999999 enterprise)"

    },

    "canceled_at": {

      "type": "string",

      "format": "date-time",

      "description": "When the subscription was canceled"

    },

    "notes": {

      "type": "string",

      "description": "Internal notes about this subscriber"

    }

  },

  "required": [

    "user_email",

    "plan",

    "status"

  ]

}
