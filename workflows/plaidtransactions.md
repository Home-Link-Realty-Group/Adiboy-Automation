# plaidtransactions

Source: plaidtransactions.docx

\{

  "name": "BankTransaction",

  "type": "object",

  "properties": \{

    "user\_email": \{

      "type": "string"

    \},

    "plaid\_item\_id": \{

      "type": "string"

    \},

    "plaid\_account\_id": \{

      "type": "string"

    \},

    "plaid\_transaction\_id": \{

      "type": "string",

      "description": "Plaid's unique transaction ID \\u2014 used for dedup"

    \},

    "account\_name": \{

      "type": "string",

      "description": "Snapshot of the account name at sync time"

    \},

    "institution\_name": \{

      "type": "string"

    \},

    "date": \{

      "type": "string",

      "format": "date",

      "description": "Posted date"

    \},

    "authorized\_date": \{

      "type": "string",

      "format": "date",

      "description": "When the transaction was authorized"

    \},

    "amount": \{

      "type": "number",

      "description": "Plaid amounts: positive = money out, negative = money in"

    \},

    "iso\_currency\_code": \{

      "type": "string",

      "default": "USD"

    \},

    "name": \{

      "type": "string",

      "description": "Merchant or description from Plaid"

    \},

    "merchant\_name": \{

      "type": "string"

    \},

    "payment\_channel": \{

      "type": "string",

      "description": "online, in store, other"

    \},

    "pending": \{

      "type": "boolean",

      "default": false

    \},

    "plaid\_category\_primary": \{

      "type": "string",

      "description": "Plaid's top\-level category"

    \},

    "plaid\_category\_detailed": \{

      "type": "string",

      "description": "Plaid's detailed category"

    \},

    "direction": \{

      "type": "string",

      "enum": \[

        "inflow",

        "outflow"

      \],

      "description": "Whether money came in or out"

    \},

    "wholesale\_category": \{

      "type": "string",

      "description": "Wholesaler\-specific bucket \\u2014 AI assigned",

      "enum": \[

        "Income \\u2014 Assignment Fee",

        "Income \\u2014 JV Split",

        "Income \\u2014 Referral",

        "Income \\u2014 Other",

        "Lead Gen \\u2014 Data / Lists",

        "Lead Gen \\u2014 Direct Mail",

        "Lead Gen \\u2014 Paid Ads",

        "Lead Gen \\u2014 SEO / Content",

        "Communication \\u2014 Phone / SMS",

        "Communication \\u2014 Skip Trace",

        "Software \\u2014 CRM / Tools",

        "Deal Cost \\u2014 EMD",

        "Deal Cost \\u2014 Title / Closing",

        "Deal Cost \\u2014 Inspection",

        "Professional \\u2014 Attorney / Accountant",

        "Owner Pay / Draw",

        "Tax Reserve",

        "Office / Supplies",

        "Travel / Mileage",

        "Education / Coaching",

        "Bank Fees",

        "Transfer \(Internal\)",

        "Uncategorized"

      \]

    \},

    "ai\_categorized": \{

      "type": "boolean",

      "default": false,

      "description": "Did AI assign the wholesale\_category"

    \},

    "user\_overridden": \{

      "type": "boolean",

      "default": false,

      "description": "Has the user manually set the category"

    \},

    "linked\_deal\_id": \{

      "type": "string",

      "description": "Optional link to a Deal record \(for deal P&L attribution\)"

    \},

    "linked\_lead\_id": \{

      "type": "string",

      "description": "Optional link to a Lead record"

    \},

    "tax\_deductible": \{

      "type": "boolean",

      "default": false

    \},

    "notes": \{

      "type": "string"

    \},

    "month": \{

      "type": "string",

      "description": "YYYY\-MM for fast filtering"

    \}

  \},

  "required": \[

    "user\_email",

    "plaid\_transaction\_id",

    "date",

    "amount",

    "name"

  \]

\}
