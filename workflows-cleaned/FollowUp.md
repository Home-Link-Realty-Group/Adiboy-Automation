# FollowUp

Source: FollowUp.docx

{

  "type": "object",

  "properties": {

    "lead_id": {

      "type": "string"

    },

    "lead_name": {

      "type": "string"

    },

    "lead_phone": {

      "type": "string"

    },

    "touch_number": {

      "type": "integer"

    },

    "scheduled_date": {

      "type": "string"

    },

    "method": {

      "type": "string",

      "enum": [

        "Call",

        "SMS",

        "Email",

        "Voicemail"

      ]

    },

    "script_template": {

      "type": "string"

    },

    "status": {

      "type": "string",

      "enum": [

        "Scheduled",

        "Pending",

        "Completed",

        "Skipped",

        "Blocked"

      ]

    },

    "outcome": {

      "type": "string"

    },

    "notes": {

      "type": "string"

    },

    "next_action": {

      "type": "string"

    }

  },

  "required": [],

  "name": "FollowUp"

}
