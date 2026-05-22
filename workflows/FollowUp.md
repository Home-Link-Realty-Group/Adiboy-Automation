# FollowUp

Source: FollowUp.docx

\{

  "type": "object",

  "properties": \{

    "lead\_id": \{

      "type": "string"

    \},

    "lead\_name": \{

      "type": "string"

    \},

    "lead\_phone": \{

      "type": "string"

    \},

    "touch\_number": \{

      "type": "integer"

    \},

    "scheduled\_date": \{

      "type": "string"

    \},

    "method": \{

      "type": "string",

      "enum": \[

        "Call",

        "SMS",

        "Email",

        "Voicemail"

      \]

    \},

    "script\_template": \{

      "type": "string"

    \},

    "status": \{

      "type": "string",

      "enum": \[

        "Scheduled",

        "Pending",

        "Completed",

        "Skipped",

        "Blocked"

      \]

    \},

    "outcome": \{

      "type": "string"

    \},

    "notes": \{

      "type": "string"

    \},

    "next\_action": \{

      "type": "string"

    \}

  \},

  "required": \[\],

  "name": "FollowUp"

\}
