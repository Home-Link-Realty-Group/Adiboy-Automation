# plaidtransactions

Source: plaidtransactions.docx

{

  "name": "BankTransaction",

  "type": "object",

  "properties": {

    "user_email": {

      "type": "string"

    },

    "plaid_item_id": {

      "type": "string"

    },

    "plaid_account_id": {

      "type": "string"

    },

    "plaid_transaction_id": {

      "type": "string",

      "description": "Plaid's unique transaction ID \u2014 used for dedup"

    },

    "account_name": {

      "type": "string",

      "description": "Snapshot of the account name at sync time"

    },

    "institution_name": {

      "type": "string"

    },

    "date": {

      "type": "string",

      "format": "date",

      "description": "Posted date"

    },

    "authorized_date": {

      "type": "string",

      "format": "date",

      "description": "When the transaction was authorized"

    },

    "amount": {

      "type": "number",

      "description": "Plaid amounts: positive = money out, negative = money in"

    },

    "iso_currency_code": {

      "type": "string",

      "default": "USD"

    },

    "name": {

      "type": "string",

      "description": "Merchant or description from Plaid"

    },

    "merchant_name": {

      "type": "string"

    },

    "payment_channel": {

      "type": "string",

      "description": "online, in store, other"

    },

    "pending": {

      "type": "boolean",

      "default": false

    },

    "plaid_category_primary": {

      "type": "string",

      "description": "Plaid's top-level category"

    },

    "plaid_category_detailed": {

      "type": "string",

      "description": "Plaid's detailed category"

    },

    "direction": {

      "type": "string",

      "enum": [

        "inflow",

        "outflow"

      ],

      "description": "Whether money came in or out"

    },

    "wholesale_category": {

      "type": "string",

      "description": "Wholesaler-specific bucket \u2014 AI assigned",

      "enum": [

        "Income \u2014 Assignment Fee",

        "Income \u2014 JV Split",

        "Income \u2014 Referral",

        "Income \u2014 Other",

        "Lead Gen \u2014 Data / Lists",

        "Lead Gen \u2014 Direct Mail",

        "Lead Gen \u2014 Paid Ads",

        "Lead Gen \u2014 SEO / Content",

        "Communication \u2014 Phone / SMS",

        "Communication \u2014 Skip Trace",

        "Software \u2014 CRM / Tools",

        "Deal Cost \u2014 EMD",

        "Deal Cost \u2014 Title / Closing",

        "Deal Cost \u2014 Inspection",

        "Professional \u2014 Attorney / Accountant",

        "Owner Pay / Draw",

        "Tax Reserve",

        "Office / Supplies",

        "Travel / Mileage",

        "Education / Coaching",

        "Bank Fees",

        "Transfer (Internal)",

        "Uncategorized"

      ]

    },

    "ai_categorized": {

      "type": "boolean",

      "default": false,

      "description": "Did AI assign the wholesale_category"

    },

    "user_overridden": {

      "type": "boolean",

      "default": false,

      "description": "Has the user manually set the category"

    },

    "linked_deal_id": {

      "type": "string",

      "description": "Optional link to a Deal record (for deal P&L attribution)"

    },

    "linked_lead_id": {

      "type": "string",

      "description": "Optional link to a Lead record"

    },

    "tax_deductible": {

      "type": "boolean",

      "default": false

    },

    "notes": {

      "type": "string"

    },

    "month": {

      "type": "string",

      "description": "YYYY-MM for fast filtering"

    }

  },

  "required": [

    "user_email",

    "plaid_transaction_id",

    "date",

    "amount",

    "name"

  ]

}
