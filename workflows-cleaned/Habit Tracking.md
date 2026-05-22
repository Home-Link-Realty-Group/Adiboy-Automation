# Habit Tracking

Source: Habit Tracking.docx

{

  "name": "Habit",

  "type": "object",

  "properties": {

    "name": {

      "type": "string",

      "description": "Habit name"

    },

    "description": {

      "type": "string",

      "description": "Habit description"

    },

    "frequency": {

      "type": "string",

      "enum": [

        "daily",

        "weekly",

        "biweekly",

        "monthly"

      ],

      "default": "daily",

      "description": "How often to track"

    },

    "goal_per_week": {

      "type": "number",

      "description": "Number of times per week"

    },

    "current_streak": {

      "type": "number",

      "default": 0,

      "description": "Current consecutive days/weeks completed"

    },

    "longest_streak": {

      "type": "number",

      "default": 0,

      "description": "Longest streak achieved"

    },

    "completion_dates": {

      "type": "array",

      "items": {

        "type": "string",

        "format": "date"

      },

      "default": [],

      "description": "Dates when habit was completed"

    },

    "icon": {

      "type": "string",

      "description": "Emoji icon"

    },

    "color": {

      "type": "string",

      "description": "Color hex code"

    },

    "status": {

      "type": "string",

      "enum": [

        "active",

        "paused",

        "archived"

      ],

      "default": "active",

      "description": "Habit status"

    },

    "start_date": {

      "type": "string",

      "format": "date",

      "description": "When habit started"

    }

  },

  "required": [

    "name",

    "frequency"

  ]

}
