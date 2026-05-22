# Subscription Tiers

Source: Subscription Tiers.docx

\{

  "name": "Subscription",

  "type": "object",

  "properties": \{

    "user\_email": \{

      "type": "string",

      "description": "Email of the subscriber"

    \},

    "user\_name": \{

      "type": "string",

      "description": "Full name of the subscriber"

    \},

    "stripe\_customer\_id": \{

      "type": "string",

      "description": "Stripe customer ID"

    \},

    "stripe\_subscription\_id": \{

      "type": "string",

      "description": "Stripe subscription ID"

    \},

    "stripe\_price\_id": \{

      "type": "string",

      "description": "Stripe price ID for the active plan"

    \},

    "plan": \{

      "type": "string",

      "enum": \[

        "trial",

        "starter",

        "pro",

        "enterprise"

      \],

      "default": "trial",

      "description": "Subscription tier"

    \},

    "status": \{

      "type": "string",

      "enum": \[

        "trialing",

        "active",

        "past\_due",

        "canceled",

        "incomplete",

        "expired"

      \],

      "default": "trialing",

      "description": "Subscription status"

    \},

    "trial\_ends\_at": \{

      "type": "string",

      "format": "date\-time",

      "description": "When the free trial expires"

    \},

    "current\_period\_end": \{

      "type": "string",

      "format": "date\-time",

      "description": "End of current billing period"

    \},

    "leads\_used\_this\_period": \{

      "type": "number",

      "default": 0,

      "description": "Number of leads consumed this billing cycle"

    \},

    "leads\_limit": \{

      "type": "number",

      "default": 25,

      "description": "Max leads allowed per period \(25 trial, 100 starter, 1000 pro, 999999 enterprise\)"

    \},

    "canceled\_at": \{

      "type": "string",

      "format": "date\-time",

      "description": "When the subscription was canceled"

    \},

    "notes": \{

      "type": "string",

      "description": "Internal notes about this subscriber"

    \}

  \},

  "required": \[

    "user\_email",

    "plan",

    "status"

  \]

\}
