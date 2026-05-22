# Site Page Video

Source: Site Page Video.docx

{

  "name": "PageVideo",

  "type": "object",

  "properties": {

    "page_route": {

      "type": "string",

      "description": "Route of the page this video belongs to"

    },

    "video_url": {

      "type": "string",

      "description": "URL of the video (MP4, YouTube, Vimeo, etc.)"

    },

    "video_name": {

      "type": "string",

      "description": "Friendly name for the video"

    },

    "video_type": {

      "type": "string",

      "enum": [

        "mp4",

        "youtube",

        "vimeo",

        "other"

      ],

      "description": "Type of video source"

    },

    "thumbnail_url": {

      "type": "string",

      "description": "Video thumbnail image URL"

    },

    "alt_text": {

      "type": "string",

      "description": "Alt text for the video"

    },

    "description": {

      "type": "string",

      "description": "Video description"

    },

    "position": {

      "type": "number",

      "description": "Display order on page"

    },

    "notes": {

      "type": "string",

      "description": "Internal notes"

    }

  },

  "required": [

    "page_route",

    "video_url",

    "video_type"

  ]

}
