# CashBuyerCRM

Source: CashBuyerCRM.docx

\{

  "type": "object",

  "properties": \{

    "name": \{

      "type": "string"

    \},

    "company": \{

      "type": "string"

    \},

    "phone": \{

      "type": "string"

    \},

    "email": \{

      "type": "string"

    \},

    "city": \{

      "type": "string"

    \},

    "state": \{

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

      "type": "string",

      "enum": \[

        "Any",

        "Light Rehab",

        "Heavy Rehab",

        "Turnkey Only"

      \]

    \},

    "closing\_timeline": \{

      "type": "string"

    \},

    "proof\_of\_funds": \{

      "type": "boolean"

    \},

    "buyer\_type": \{

      "type": "string",

      "enum": \[

        "Fix & Flip",

        "Buy & Hold",

        "Wholesaler",

        "Developer",

        "Hedge Fund",

        "Owner Occupant",

        "Other"

      \]

    \},

    "status": \{

      "type": "string",

      "enum": \[

        "New",

        "Contacted",

        "Verified",

        "Active",

        "Deal Sent",

        "Closed",

        "Inactive"

      \]

    \},

    "source": \{

      "type": "string"

    \},

    "touch\_count": \{

      "type": "number"

    \},

    "last\_contact\_date": \{

      "type": "string"

    \},

    "next\_followup\_date": \{

      "type": "string"

    \},

    "deals\_sent": \{

      "type": "number"

    \},

    "deals\_closed": \{

      "type": "number"

    \},

    "total\_volume": \{

      "type": "number"

    \},

    "notes": \{

      "type": "string"

    \},

    "linkedin\_url": \{

      "type": "string"

    \},

    "priority": \{

      "type": "string",

      "enum": \[

        "A\-Buyer",

        "B\-Buyer",

        "C\-Buyer"

      \]

    \},

    "tags": \{

      "type": "string"

    \}

  \},

  "required": \[\],

  "name": "CashBuyer"

\}
