# Task List

Source: Task List.docx

{

  "name": "TaskList",

  "type": "object",

  "properties": {

    "name": {

      "type": "string",

      "description": "List name"

    },

    "description": {

      "type": "string",

      "description": "List description"

    },

    "color": {

      "type": "string",

      "description": "Color hex code for visual organization"

    },

    "image_url": {

      "type": "string",

      "description": "Cover image URL for the list"

    },

    "icon": {

      "type": "string",

      "description": "Emoji icon for quick identification"

    },

    "task_ids": {

      "type": "array",

      "items": {

        "type": "string"

      },

      "description": "Task IDs in this list",

      "default": []

    },

    "is_archived": {

      "type": "boolean",

      "default": false,

      "description": "Whether list is archived"

    },

    "sort_order": {

      "type": "number",

      "default": 0,

      "description": "Display order"

    }

  },

  "required": [

    "name"

  ]

}
