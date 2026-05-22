# Plaid Auth

Source: Plaid Auth.docx

\{

  "name": "PlaidItem",

  "type": "object",

  "properties": \{

    "user\_email": \{

      "type": "string",

      "description": "Email of the user who owns this Plaid connection"

    \},

    "plaid\_item\_id": \{

      "type": "string",

      "description": "Plaid's unique item identifier"

    \},

    "access\_token": \{

      "type": "string",

      "description": "Plaid access token \(sensitive \\u2014 server use only\)"

    \},

    "institution\_id": \{

      "type": "string",

      "description": "Plaid institution ID"

    \},

    "institution\_name": \{

      "type": "string",

      "description": "Bank or institution name \(e\.g\. Chase, Wells Fargo\)"

    \},

    "institution\_logo": \{

      "type": "string",

      "description": "Base64 logo or URL"

    \},

    "status": \{

      "type": "string",

      "enum": \[

        "active",

        "needs\_reauth",

        "disconnected",

        "error"

      \],

      "default": "active"

    \},

    "cursor": \{

      "type": "string",

      "description": "Plaid sync cursor for incremental transaction updates"

    \},

    "last\_sync\_at": \{

      "type": "string",

      "format": "date\-time",

      "description": "Last successful transaction sync"

    \},

    "last\_error": \{

      "type": "string",

      "description": "Last error message if any"

    \},

    "environment": \{

      "type": "string",

      "enum": \[

        "sandbox",

        "development",

        "production"

      \],

      "default": "sandbox"

    \}

  \},

  "required": \[

    "user\_email",

    "plaid\_item\_id",

    "access\_token"

  \]

\}
