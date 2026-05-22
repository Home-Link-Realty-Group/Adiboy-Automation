# Goal Tracking

Source: Goal Tracking.docx

\{

  "name": "Habit",

  "type": "object",

  "properties": \{

    "name": \{

      "type": "string",

      "description": "Habit name"

    \},

    "description": \{

      "type": "string",

      "description": "Habit description"

    \},

    "frequency": \{

      "type": "string",

      "enum": \[

        "daily",

        "weekly",

        "biweekly",

        "monthly"

      \],

      "default": "daily",

      "description": "How often to track"

    \},

    "goal\_per\_week": \{

      "type": "number",

      "description": "Number of times per week"

    \},

    "current\_streak": \{

      "type": "number",

      "default": 0,

      "description": "Current consecutive days/weeks completed"

    \},

    "longest\_streak": \{

      "type": "number",

      "default": 0,

      "description": "Longest streak achieved"

    \},

    "completion\_dates": \{

      "type": "array",

      "items": \{

        "type": "string",

        "format": "date"

      \},

      "default": \[\],

      "description": "Dates when habit was completed"

    \},

    "icon": \{

      "type": "string",

      "description": "Emoji icon"

    \},

    "color": \{

      "type": "string",

      "description": "Color hex code"

    \},

    "status": \{

      "type": "string",

      "enum": \[

        "active",

        "paused",

        "archived"

      \],

      "default": "active",

      "description": "Habit status"

    \},

    "start\_date": \{

      "type": "string",

      "format": "date",

      "description": "When habit started"

    \}

  \},

  "required": \[

    "name",

    "frequency"

  \]

\}
