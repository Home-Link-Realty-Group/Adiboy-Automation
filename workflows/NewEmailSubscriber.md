# NewEmailSubscriber

Source: NewEmailSubscriber.docx

\{

  "type": "object",

  "properties": \{

    "email": \{

      "type": "string"

    \},

    "name": \{

      "type": "string"

    \},

    "source": \{

      "type": "string"

    \},

    "status": \{

      "type": "string",

      "enum": \[

        "Active",

        "Unsubscribed",

        "Bounced"

      \]

    \},

    "tags": \{

      "type": "string"

    \},

    "welcome\_sent": \{

      "type": "boolean"

    \},

    "last\_email\_date": \{

      "type": "string"

    \},

    "email\_count": \{

      "type": "number"

    \},

    "lead\_id": \{

      "type": "string"

    \},

    "city": \{

      "type": "string"

    \},

    "state": \{

      "type": "string"

    \},

    "ip\_address": \{

      "type": "string"

    \},

    "notes": \{

      "type": "string"

    \}

  \},

  "required": \[\],

  "name": "EmailSubscriber"

\}
