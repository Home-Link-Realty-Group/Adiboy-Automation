# Social Campaign

Source: Social Campaign.docx

{

  "type": "object",

  "properties": {

    "name": {

      "type": "string"

    },

    "goal": {

      "type": "string",

      "description": "Campaign objective"

    },

    "status": {

      "type": "string",

      "enum": [

        "Active",

        "Paused",

        "Completed",

        "Draft"

      ],

      "default": "Draft"

    },

    "platforms": {

      "type": "string",

      "description": "Comma-separated targeted platforms"

    },

    "start_date": {

      "type": "string"

    },

    "end_date": {

      "type": "string"

    },

    "post_count": {

      "type": "number",

      "default": 0

    },

    "total_reach": {

      "type": "number",

      "default": 0

    },

    "total_leads": {

      "type": "number",

      "default": 0

    },

    "notes": {

      "type": "string"

    }

  },

  "required": [],

  "name": "SocialCampaign"

}
