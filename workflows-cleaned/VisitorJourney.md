# VisitorJourney

Source: VisitorJourney.docx

{

  "name": "VisitorJourney",

  "type": "object",

  "properties": {

    "session_id": {

      "type": "string",

      "description": "Unique visitor session ID"

    },

    "city": {

      "type": "string",

      "description": "City of landing page"

    },

    "state": {

      "type": "string",

      "description": "State abbreviation"

    },

    "landing_page": {

      "type": "string",

      "description": "Landing page route"

    },

    "content_variant_id": {

      "type": "string",

      "description": "Unique ID for specific Apify-generated content set"

    },

    "entry_timestamp": {

      "type": "string",

      "format": "date-time",

      "description": "When visitor landed on page"

    },

    "time_on_site_seconds": {

      "type": "number",

      "description": "Total time spent on landing page"

    },

    "scroll_depth_percent": {

      "type": "number",

      "description": "How far down the page visitor scrolled (0-100)"

    },

    "elements_clicked": {

      "type": "array",

      "items": {

        "type": "string"

      },

      "description": "Elements/buttons user interacted with"

    },

    "form_started": {

      "type": "boolean",

      "description": "Did visitor start filling the form?"

    },

    "form_completed": {

      "type": "boolean",

      "description": "Did visitor complete and submit the form?"

    },

    "lead_submitted": {

      "type": "boolean",

      "description": "Did visitor become a lead?"

    },

    "lead_id": {

      "type": "string",

      "description": "Associated Lead entity ID if converted"

    },

    "exit_page": {

      "type": "string",

      "description": "Where visitor exited from"

    },

    "exit_timestamp": {

      "type": "string",

      "format": "date-time",

      "description": "When visitor left the page"

    },

    "conversion_value": {

      "type": "number",

      "description": "Estimated lead value for analytics"

    },

    "utm_source": {

      "type": "string",

      "description": "Traffic source (organic, paid, direct, etc)"

    },

    "utm_campaign": {

      "type": "string",

      "description": "Campaign identifier"

    },

    "device_type": {

      "type": "string",

      "enum": [

        "mobile",

        "tablet",

        "desktop"

      ],

      "description": "Device type"

    },

    "browser": {

      "type": "string",

      "description": "Browser name"

    },

    "session_notes": {

      "type": "string",

      "description": "Any additional notes"

    },

    "description": {

      "type": "string",

      "maxLength": 1000,

      "description": "Optional description"

    }

  },

  "required": [

    "session_id",

    "city",

    "landing_page",

    "content_variant_id",

    "entry_timestamp"

  ]

}
