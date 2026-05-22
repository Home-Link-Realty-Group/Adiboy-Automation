# Transaction

Source: Transaction.docx

{

  "type": "object",

  "properties": {

    "date": {

      "type": "string",

      "description": "Transaction date (YYYY-MM-DD)"

    },

    "type": {

      "type": "string",

      "enum": [

        "Income",

        "Expense"

      ],

      "description": "Income or Expense"

    },

    "category": {

      "type": "string",

      "description": "Category (Assignment Fee, Marketing, Software, Skip Tracing, etc.)"

    },

    "amount": {

      "type": "number",

      "description": "Dollar amount"

    },

    "description": {

      "type": "string",

      "description": "What this was for"

    },

    "deal_id": {

      "type": "string",

      "description": "Linked deal ID (optional)"

    },

    "lead_id": {

      "type": "string",

      "description": "Linked lead ID (optional)"

    },

    "vendor": {

      "type": "string",

      "description": "Vendor or payer name"

    },

    "payment_method": {

      "type": "string",

      "description": "Check, Wire, ACH, Cash, Credit Card"

    },

    "receipt_url": {

      "type": "string",

      "description": "Receipt or invoice URL"

    },

    "notes": {

      "type": "string",

      "description": "Additional notes"

    },

    "tax_deductible": {

      "type": "boolean",

      "description": "Is this tax deductible?"

    },

    "month": {

      "type": "string",

      "description": "YYYY-MM for easy monthly grouping"

    }

  },

  "required": [],

  "name": "Transaction"

}
