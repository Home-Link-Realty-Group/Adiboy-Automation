# Plaid Auth

Source: Plaid Auth.docx

{

  "name": "PlaidItem",

  "type": "object",

  "properties": {

    "user_email": {

      "type": "string",

      "description": "Email of the user who owns this Plaid connection"

    },

    "plaid_item_id": {

      "type": "string",

      "description": "Plaid's unique item identifier"

    },

    "access_token": {

      "type": "string",

      "description": "Plaid access token (sensitive \u2014 server use only)"

    },

    "institution_id": {

      "type": "string",

      "description": "Plaid institution ID"

    },

    "institution_name": {

      "type": "string",

      "description": "Bank or institution name (e.g. Chase, Wells Fargo)"

    },

    "institution_logo": {

      "type": "string",

      "description": "Base64 logo or URL"

    },

    "status": {

      "type": "string",

      "enum": [

        "active",

        "needs_reauth",

        "disconnected",

        "error"

      ],

      "default": "active"

    },

    "cursor": {

      "type": "string",

      "description": "Plaid sync cursor for incremental transaction updates"

    },

    "last_sync_at": {

      "type": "string",

      "format": "date-time",

      "description": "Last successful transaction sync"

    },

    "last_error": {

      "type": "string",

      "description": "Last error message if any"

    },

    "environment": {

      "type": "string",

      "enum": [

        "sandbox",

        "development",

        "production"

      ],

      "default": "sandbox"

    }

  },

  "required": [

    "user_email",

    "plaid_item_id",

    "access_token"

  ]

}
