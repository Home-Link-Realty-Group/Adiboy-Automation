# cashbuyerlog

Source: cashbuyerlog.docx

\{

  "type": "object",

  "properties": \{

    "name": \{

      "type": "string"

    \},

    "phone": \{

      "type": "string"

    \},

    "email": \{

      "type": "string"

    \},

    "buy\_areas": \{

      "type": "string"

    \},

    "property\_types": \{

      "type": "string"

    \},

    "price\_min": \{

      "type": "number"

    \},

    "price\_max": \{

      "type": "number"

    \},

    "arv\_max\_percent": \{

      "type": "number"

    \},

    "beds\_min": \{

      "type": "number"

    \},

    "condition\_preference": \{

      "type": "string"

    \},

    "closing\_timeline": \{

      "type": "string"

    \},

    "proof\_of\_funds": \{

      "type": "boolean"

    \},

    "notes": \{

      "type": "string"

    \},

    "status": \{

      "type": "string",

      "enum": \[

        "Active",

        "Inactive",

        "Hot"

      \]

    \},

    "last\_deal\_sent": \{

      "type": "string"

    \},

    "total\_deals\_bought": \{

      "type": "number"

    \}

  \},

  "required": \[\],

  "name": "Buyer"

\}
