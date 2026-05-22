# Integration Status

Source: Integration Status.docx

\{

  "name": "IntegrationStatus",

  "type": "object",

  "properties": \{

    "user\_email": \{

      "type": "string",

      "description": "Email of the user this integration map belongs to"

    \},

    "apify\_connected": \{

      "type": "boolean",

      "default": false

    \},

    "twilio\_connected": \{

      "type": "boolean",

      "default": false

    \},

    "stripe\_connected": \{

      "type": "boolean",

      "default": false

    \},

    "resend\_connected": \{

      "type": "boolean",

      "default": false

    \},

    "google\_search\_console\_connected": \{

      "type": "boolean",

      "default": false

    \},

    "rentcast\_connected": \{

      "type": "boolean",

      "default": false

    \},

    "trustedform\_connected": \{

      "type": "boolean",

      "default": false

    \},

    "setup\_progress\_percent": \{

      "type": "number",

      "default": 0,

      "description": "Calculated 0\-100 based on number of integrations connected"

    \},

    "last\_concierge\_session": \{

      "type": "string",

      "format": "date\-time",

      "description": "When user last chatted with the Setup Concierge"

    \},

    "concierge\_notes": \{

      "type": "string",

      "description": "Notes the AI concierge has saved about this user's setup journey"

    \}

  \},

  "required": \[

    "user\_email"

  \]

\}
