# GoalSetting

Source: GoalSetting.docx

{

  "name": "Goal",

  "type": "object",

  "properties": {

    "title": {

      "type": "string",

      "description": "Goal title"

    },

    "description": {

      "type": "string",

      "description": "Goal description"

    },

    "category": {

      "type": "string",

      "enum": [

        "health",

        "career",

        "finance",

        "personal",

        "learning",

        "relationships"

      ],

      "description": "Goal category"

    },

    "target_date": {

      "type": "string",

      "format": "date",

      "description": "Target completion date"

    },

    "progress_percent": {

      "type": "number",

      "default": 0,

      "description": "Progress percentage (0-100)"

    },

    "status": {

      "type": "string",

      "enum": [

        "active",

        "paused",

        "completed",

        "abandoned"

      ],

      "default": "active",

      "description": "Goal status"

    },

    "icon": {

      "type": "string",

      "description": "Emoji icon"

    },

    "color": {

      "type": "string",

      "description": "Color hex code"

    },

    "related_task_ids": {

      "type": "array",

      "items": {

        "type": "string"

      },

      "default": [],

      "description": "Tasks related to this goal"

    },

    "motivation_notes": {

      "type": "string",

      "description": "Motivational notes"

    }

  },

  "required": [

    "title",

    "category"

  ]

}
