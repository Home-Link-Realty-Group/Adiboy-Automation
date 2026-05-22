# dialerleadlogging

Source: dialerleadlogging.docx

{

  "name": "DialerLead",

  "type": "object",

  "properties": {

    "name": {

      "type": "string",

      "description": "Contact name"

    },

    "phone": {

      "type": "string",

      "description": "E.164 phone number"

    },

    "status": {

      "type": "string",

      "enum": [

        "Pending",

        "Dialing",

        "Completed",

        "No Answer",

        "Busy",

        "Left Voicemail",

        "Callback Scheduled",

        "Not Interested",

        "Wrong Number",

        "Do Not Call",

        "Failed"

      ],

      "default": "Pending"

    },

    "outcome": {

      "type": "string",

      "description": "Disposition outcome logged by agent"

    },

    "notes": {

      "type": "string",

      "description": "Agent notes from the call"

    },

    "called_at": {

      "type": "string",

      "description": "ISO timestamp when dialed"

    },

    "attempt_count": {

      "type": "number",

      "description": "Number of dial attempts",

      "default": 0

    }

  },

  "required": [

    "phone"

  ]

}
