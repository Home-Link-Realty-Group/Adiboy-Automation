# List

Source: List.docx

{

  "name": "List",

  "type": "object",

  "properties": {

    "name": {

      "type": "string",

      "description": "Name of the list"

    },

    "description": {

      "type": "string",

      "description": "Description or purpose of the list"

    },

    "color": {

      "type": "string",

      "description": "Color tag for visual organization"

    },

    "icon": {

      "type": "string",

      "description": "Emoji icon for the list"

    },

    "task_ids": {

      "type": "array",

      "items": {

        "type": "string"

      },

      "description": "Array of task IDs in this list"

    },

    "is_archived": {

      "type": "boolean",

      "default": false,

      "description": "Whether the list is archived"

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
