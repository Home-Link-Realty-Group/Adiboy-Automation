# Social Campaign

Source: Social Campaign.docx

\{

  "type": "object",

  "properties": \{

    "name": \{

      "type": "string"

    \},

    "goal": \{

      "type": "string",

      "description": "Campaign objective"

    \},

    "status": \{

      "type": "string",

      "enum": \[

        "Active",

        "Paused",

        "Completed",

        "Draft"

      \],

      "default": "Draft"

    \},

    "platforms": \{

      "type": "string",

      "description": "Comma\-separated targeted platforms"

    \},

    "start\_date": \{

      "type": "string"

    \},

    "end\_date": \{

      "type": "string"

    \},

    "post\_count": \{

      "type": "number",

      "default": 0

    \},

    "total\_reach": \{

      "type": "number",

      "default": 0

    \},

    "total\_leads": \{

      "type": "number",

      "default": 0

    \},

    "notes": \{

      "type": "string"

    \}

  \},

  "required": \[\],

  "name": "SocialCampaign"

\}
