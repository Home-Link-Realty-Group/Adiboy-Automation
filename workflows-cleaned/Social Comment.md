# Social Comment

Source: Social Comment.docx

{

  "type": "object",

  "properties": {

    "post_id": {

      "type": "string",

      "description": "Linked SocialPost ID"

    },

    "platform": {

      "type": "string",

      "enum": [

        "Facebook",

        "Instagram",

        "LinkedIn",

        "Twitter"

      ]

    },

    "commenter_name": {

      "type": "string"

    },

    "commenter_profile": {

      "type": "string"

    },

    "comment_text": {

      "type": "string"

    },

    "comment_date": {

      "type": "string"

    },

    "sentiment": {

      "type": "string",

      "enum": [

        "Positive",

        "Neutral",

        "Negative",

        "Lead"

      ]

    },

    "is_lead": {

      "type": "boolean",

      "default": false

    },

    "response_text": {

      "type": "string"

    },

    "response_date": {

      "type": "string"

    },

    "status": {

      "type": "string",

      "enum": [

        "New",

        "Responded",

        "Ignored"

      ],

      "default": "New"

    },

    "platform_comment_id": {

      "type": "string"

    }

  },

  "required": [],

  "name": "SocialComment"

}
