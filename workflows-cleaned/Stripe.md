# Stripe

Source: Stripe.docx

{

  "name": "ConnectedAccount",

  "type": "object",

  "properties": {

    "user_email": {

      "type": "string",

      "description": "Email of the user (platform user) who owns this connected account"

    },

    "stripe_account_id": {

      "type": "string",

      "description": "Stripe V2 connected account ID (acct_...)"

    },

    "display_name": {

      "type": "string",

      "description": "Business / display name shown on the connected account"

    },

    "contact_email": {

      "type": "string",

      "description": "Contact email registered with Stripe for this account"

    },

    "country": {

      "type": "string",

      "default": "us"

    },

    "subscription_status": {

      "type": "string",

      "description": "Latest Stripe subscription status from webhook (active, past_due, canceled, etc.)"

    },

    "subscription_id": {

      "type": "string",

      "description": "Stripe subscription ID for the platform subscription this account holds"

    },

    "subscription_price_id": {

      "type": "string",

      "description": "Price ID the account is subscribed to"

    },

    "subscription_current_period_end": {

      "type": "string",

      "format": "date-time"

    },

    "notes": {

      "type": "string"

    }

  },

  "required": [

    "user_email",

    "stripe_account_id"

  ]

}
