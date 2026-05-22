# plaid

Source: plaid.docx

\{

  "name": "BankAccount",

  "type": "object",

  "properties": \{

    "user\_email": \{

      "type": "string",

      "description": "Owner's email"

    \},

    "plaid\_item\_id": \{

      "type": "string",

      "description": "Reference to the PlaidItem this account belongs to"

    \},

    "plaid\_account\_id": \{

      "type": "string",

      "description": "Plaid's unique account ID"

    \},

    "name": \{

      "type": "string",

      "description": "Account display name \(e\.g\. 'Chase Business Checking'\)"

    \},

    "official\_name": \{

      "type": "string",

      "description": "Official account name from the bank"

    \},

    "type": \{

      "type": "string",

      "enum": \[

        "depository",

        "credit",

        "loan",

        "investment",

        "other"

      \],

      "description": "Account type from Plaid"

    \},

    "subtype": \{

      "type": "string",

      "description": "Account subtype \(checking, savings, credit card, etc\.\)"

    \},

    "mask": \{

      "type": "string",

      "description": "Last 4 digits of account number"

    \},

    "current\_balance": \{

      "type": "number",

      "default": 0,

      "description": "Latest balance from Plaid"

    \},

    "available\_balance": \{

      "type": "number",

      "description": "Available \(non\-pending\) balance"

    \},

    "iso\_currency\_code": \{

      "type": "string",

      "default": "USD"

    \},

    "institution\_name": \{

      "type": "string"

    \},

    "is\_active": \{

      "type": "boolean",

      "default": true

    \},

    "last\_balance\_sync": \{

      "type": "string",

      "format": "date\-time"

    \}

  \},

  "required": \[

    "user\_email",

    "plaid\_item\_id",

    "plaid\_account\_id"

  \]

\}
