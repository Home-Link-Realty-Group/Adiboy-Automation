# UserApifyConfig

Source: UserApifyConfig.docx

{

  "name": "UserApifyConfig",

  "type": "object",

  "properties": {

    "user_email": {

      "type": "string",

      "description": "Email of the user this Apify config belongs to"

    },

    "apify_token": {

      "type": "string",

      "description": "User's personal Apify API token (stored encrypted)"

    },

    "apify_username": {

      "type": "string",

      "description": "Apify username returned from /users/me endpoint"

    },

    "apify_user_id": {

      "type": "string",

      "description": "Apify user ID"

    },

    "plan": {

      "type": "string",

      "description": "Apify plan tier (FREE, PERSONAL, TEAM, etc.)"

    },

    "verified": {

      "type": "boolean",

      "default": false,

      "description": "Has the token been validated against Apify API"

    },

    "verified_at": {

      "type": "string",

      "format": "date-time",

      "description": "When token was last successfully verified"

    },

    "verification_error": {

      "type": "string",

      "description": "Last verification error message, if any"

    },

    "monthly_runs": {

      "type": "number",

      "default": 0,

      "description": "Number of scrape runs this billing period"

    },

    "total_leads_scraped": {

      "type": "number",

      "default": 0,

      "description": "Lifetime total of leads scraped via this account"

    },

    "last_used": {

      "type": "string",

      "format": "date-time",

      "description": "Last time this account was used to run a scrape"

    },

    "actors_enabled": {

      "type": "array",

      "items": {

        "type": "string"

      },

      "default": [],

      "description": "Apify actor IDs the user has enabled (e.g. epctex/zillow-scraper)"

    },

    "notes": {

      "type": "string"

    }

  },

  "required": [

    "user_email"

  ]

}
