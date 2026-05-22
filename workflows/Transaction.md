# Transaction

Source: Transaction.docx

\{

  "type": "object",

  "properties": \{

    "date": \{

      "type": "string",

      "description": "Transaction date \(YYYY\-MM\-DD\)"

    \},

    "type": \{

      "type": "string",

      "enum": \[

        "Income",

        "Expense"

      \],

      "description": "Income or Expense"

    \},

    "category": \{

      "type": "string",

      "description": "Category \(Assignment Fee, Marketing, Software, Skip Tracing, etc\.\)"

    \},

    "amount": \{

      "type": "number",

      "description": "Dollar amount"

    \},

    "description": \{

      "type": "string",

      "description": "What this was for"

    \},

    "deal\_id": \{

      "type": "string",

      "description": "Linked deal ID \(optional\)"

    \},

    "lead\_id": \{

      "type": "string",

      "description": "Linked lead ID \(optional\)"

    \},

    "vendor": \{

      "type": "string",

      "description": "Vendor or payer name"

    \},

    "payment\_method": \{

      "type": "string",

      "description": "Check, Wire, ACH, Cash, Credit Card"

    \},

    "receipt\_url": \{

      "type": "string",

      "description": "Receipt or invoice URL"

    \},

    "notes": \{

      "type": "string",

      "description": "Additional notes"

    \},

    "tax\_deductible": \{

      "type": "boolean",

      "description": "Is this tax deductible?"

    \},

    "month": \{

      "type": "string",

      "description": "YYYY\-MM for easy monthly grouping"

    \}

  \},

  "required": \[\],

  "name": "Transaction"

\}
