# callscript

Source: callscript.docx

{

  "name": "ColdCallScript",

  "type": "object",

  "properties": {

    "name": {

      "type": "string"

    },

    "stage": {

      "type": "string",

      "enum": [

        "Opening",

        "Fact-Finding",

        "Pitch",

        "Offer",

        "Close",

        "Objection Handler",

        "Voicemail",

        "Text Template",

        "Email Template",

        "Follow-Up"

      ]

    },

    "city": {

      "type": "string",

      "description": "Target city/market (e.g. Dallas, Houston, National)"

    },

    "style": {

      "type": "string",

      "enum": [

        "Direct",

        "Empathetic",

        "Professional",

        "Urgent",

        "Friendly"

      ],

      "description": "Calling style/tone"

    },

    "script_text": {

      "type": "string"

    },

    "use_when": {

      "type": "string"

    },

    "notes": {

      "type": "string"

    },

    "is_active": {

      "type": "boolean",

      "default": true

    }

  },

  "required": [

    "name",

    "stage"

  ]

}
