# WebMessage

Source: WebMessage.docx

{

  "name": "WebsiteMessage",

  "type": "object",

  "properties": {

    "user_email": {

      "type": "string",

      "description": "Account owner email for this website message"

    },

    "lead_id": {

      "type": "string",

      "description": "Optional related Lead record"

    },

    "visitor_session_id": {

      "type": "string",

      "description": "Optional related website visitor session"

    },

    "from_number": {

      "type": "string",

      "description": "Sender phone number"

    },

    "to_number": {

      "type": "string",

      "description": "Business phone number that received the message"

    },

    "from_email": {

      "type": "string",

      "description": "Sender email address when available"

    },

    "channel": {

      "type": "string",

      "enum": [

        "sms",

        "website_form",

        "chat",

        "email",

        "other"

      ],

      "default": "website_form"

    },

    "direction": {

      "type": "string",

      "enum": [

        "inbound",

        "outbound"

      ],

      "default": "inbound"

    },

    "body": {

      "type": "string",

      "description": "Message body or form note"

    },

    "status": {

      "type": "string",

      "enum": [

        "new",

        "read",

        "responded",

        "archived"

      ],

      "default": "new"

    },

    "received_at": {

      "type": "string",

      "format": "date-time",

      "description": "When the message was received"

    },

    "source_page": {

      "type": "string",

      "description": "Website page or route where the message originated"

    },

    "metadata": {

      "type": "object",

      "description": "Optional provider metadata"

    }

  },

  "required": [

    "channel",

    "direction",

    "body"

  ]

}
