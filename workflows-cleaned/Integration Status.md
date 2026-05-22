# Integration Status

Source: Integration Status.docx

{

  "name": "IntegrationStatus",

  "type": "object",

  "properties": {

    "user_email": {

      "type": "string",

      "description": "Email of the user this integration map belongs to"

    },

    "apify_connected": {

      "type": "boolean",

      "default": false

    },

    "twilio_connected": {

      "type": "boolean",

      "default": false

    },

    "stripe_connected": {

      "type": "boolean",

      "default": false

    },

    "resend_connected": {

      "type": "boolean",

      "default": false

    },

    "google_search_console_connected": {

      "type": "boolean",

      "default": false

    },

    "rentcast_connected": {

      "type": "boolean",

      "default": false

    },

    "trustedform_connected": {

      "type": "boolean",

      "default": false

    },

    "setup_progress_percent": {

      "type": "number",

      "default": 0,

      "description": "Calculated 0-100 based on number of integrations connected"

    },

    "last_concierge_session": {

      "type": "string",

      "format": "date-time",

      "description": "When user last chatted with the Setup Concierge"

    },

    "concierge_notes": {

      "type": "string",

      "description": "Notes the AI concierge has saved about this user's setup journey"

    }

  },

  "required": [

    "user_email"

  ]

}
