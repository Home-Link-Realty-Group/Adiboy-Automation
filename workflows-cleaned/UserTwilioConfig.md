# UserTwilioConfig

Source: UserTwilioConfig.docx

{

  "name": "UserTwilioConfig",

  "type": "object",

  "properties": {

    "user_email": {

      "type": "string",

      "description": "Email of the customer this config belongs to"

    },

    "mode": {

      "type": "string",

      "enum": [

        "byo",

        "managed"

      ],

      "default": "byo",

      "description": "byo = customer's own Twilio account; managed = we provision sub-account (future)"

    },

    "twilio_account_sid": {

      "type": "string",

      "description": "Customer's Twilio Account SID (BYO mode) or sub-account SID (managed mode)"

    },

    "twilio_auth_token": {

      "type": "string",

      "description": "Customer's Twilio Auth Token (stored encrypted at rest by Base44)"

    },

    "twilio_phone_number": {

      "type": "string",

      "description": "Caller ID phone number to use for outbound calls (E.164 format, e.g. +12145551234)"

    },

    "agent_phone_number": {

      "type": "string",

      "description": "Agent's personal phone number to ring when blast connects (E.164)"

    },

    "verified": {

      "type": "boolean",

      "default": false,

      "description": "Has the Twilio config been validated against Twilio API"

    },

    "verified_at": {

      "type": "string",

      "format": "date-time",

      "description": "When credentials were last successfully verified"

    },

    "verification_error": {

      "type": "string",

      "description": "Last verification error message, if any"

    },

    "voicemail_text": {

      "type": "string",

      "description": "Default voicemail script (TTS) for unanswered calls"

    },

    "voicemail_url": {

      "type": "string",

      "description": "URL to pre-recorded voicemail audio file"

    },

    "voicemail_enabled": {

      "type": "boolean",

      "default": false,

      "description": "Auto-deliver voicemail on no-answer"

    },

    "minutes_used_this_period": {

      "type": "number",

      "default": 0,

      "description": "Total call minutes consumed this billing cycle (for managed/markup mode)"

    },

    "calls_this_period": {

      "type": "number",

      "default": 0,

      "description": "Total calls placed this billing cycle"

    },

    "period_start": {

      "type": "string",

      "format": "date-time",

      "description": "Start of current usage period"

    },

    "notes": {

      "type": "string"

    }

  },

  "required": [

    "user_email",

    "mode"

  ]

}
