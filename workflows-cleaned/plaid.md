# plaid

Source: plaid.docx

{

  "name": "BankAccount",

  "type": "object",

  "properties": {

    "user_email": {

      "type": "string",

      "description": "Owner's email"

    },

    "plaid_item_id": {

      "type": "string",

      "description": "Reference to the PlaidItem this account belongs to"

    },

    "plaid_account_id": {

      "type": "string",

      "description": "Plaid's unique account ID"

    },

    "name": {

      "type": "string",

      "description": "Account display name (e.g. 'Chase Business Checking')"

    },

    "official_name": {

      "type": "string",

      "description": "Official account name from the bank"

    },

    "type": {

      "type": "string",

      "enum": [

        "depository",

        "credit",

        "loan",

        "investment",

        "other"

      ],

      "description": "Account type from Plaid"

    },

    "subtype": {

      "type": "string",

      "description": "Account subtype (checking, savings, credit card, etc.)"

    },

    "mask": {

      "type": "string",

      "description": "Last 4 digits of account number"

    },

    "current_balance": {

      "type": "number",

      "default": 0,

      "description": "Latest balance from Plaid"

    },

    "available_balance": {

      "type": "number",

      "description": "Available (non-pending) balance"

    },

    "iso_currency_code": {

      "type": "string",

      "default": "USD"

    },

    "institution_name": {

      "type": "string"

    },

    "is_active": {

      "type": "boolean",

      "default": true

    },

    "last_balance_sync": {

      "type": "string",

      "format": "date-time"

    }

  },

  "required": [

    "user_email",

    "plaid_item_id",

    "plaid_account_id"

  ]

}
