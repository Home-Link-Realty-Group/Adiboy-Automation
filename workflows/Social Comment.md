# Social Comment

Source: Social Comment.docx

\{

  "type": "object",

  "properties": \{

    "post\_id": \{

      "type": "string",

      "description": "Linked SocialPost ID"

    \},

    "platform": \{

      "type": "string",

      "enum": \[

        "Facebook",

        "Instagram",

        "LinkedIn",

        "Twitter"

      \]

    \},

    "commenter\_name": \{

      "type": "string"

    \},

    "commenter\_profile": \{

      "type": "string"

    \},

    "comment\_text": \{

      "type": "string"

    \},

    "comment\_date": \{

      "type": "string"

    \},

    "sentiment": \{

      "type": "string",

      "enum": \[

        "Positive",

        "Neutral",

        "Negative",

        "Lead"

      \]

    \},

    "is\_lead": \{

      "type": "boolean",

      "default": false

    \},

    "response\_text": \{

      "type": "string"

    \},

    "response\_date": \{

      "type": "string"

    \},

    "status": \{

      "type": "string",

      "enum": \[

        "New",

        "Responded",

        "Ignored"

      \],

      "default": "New"

    \},

    "platform\_comment\_id": \{

      "type": "string"

    \}

  \},

  "required": \[\],

  "name": "SocialComment"

\}
