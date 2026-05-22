# Site Page Video

Source: Site Page Video.docx

\{

  "name": "PageVideo",

  "type": "object",

  "properties": \{

    "page\_route": \{

      "type": "string",

      "description": "Route of the page this video belongs to"

    \},

    "video\_url": \{

      "type": "string",

      "description": "URL of the video \(MP4, YouTube, Vimeo, etc\.\)"

    \},

    "video\_name": \{

      "type": "string",

      "description": "Friendly name for the video"

    \},

    "video\_type": \{

      "type": "string",

      "enum": \[

        "mp4",

        "youtube",

        "vimeo",

        "other"

      \],

      "description": "Type of video source"

    \},

    "thumbnail\_url": \{

      "type": "string",

      "description": "Video thumbnail image URL"

    \},

    "alt\_text": \{

      "type": "string",

      "description": "Alt text for the video"

    \},

    "description": \{

      "type": "string",

      "description": "Video description"

    \},

    "position": \{

      "type": "number",

      "description": "Display order on page"

    \},

    "notes": \{

      "type": "string",

      "description": "Internal notes"

    \}

  \},

  "required": \[

    "page\_route",

    "video\_url",

    "video\_type"

  \]

\}
