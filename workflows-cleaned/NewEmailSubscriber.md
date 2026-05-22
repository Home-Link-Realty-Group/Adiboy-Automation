# NewEmailSubscriber

Source: NewEmailSubscriber.docx

{

  "type": "object",

  "properties": {

    "email": {

      "type": "string"

    },

    "name": {

      "type": "string"

    },

    "source": {

      "type": "string"

    },

    "status": {

      "type": "string",

      "enum": [

        "Active",

        "Unsubscribed",

        "Bounced"

      ]

    },

    "tags": {

      "type": "string"

    },

    "welcome_sent": {

      "type": "boolean"

    },

    "last_email_date": {

      "type": "string"

    },

    "email_count": {

      "type": "number"

    },

    "lead_id": {

      "type": "string"

    },

    "city": {

      "type": "string"

    },

    "state": {

      "type": "string"

    },

    "ip_address": {

      "type": "string"

    },

    "notes": {

      "type": "string"

    }

  },

  "required": [],

  "name": "EmailSubscriber"

}
