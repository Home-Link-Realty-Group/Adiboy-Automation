# CashBuyerCRM

Source: CashBuyerCRM.docx

{

  "type": "object",

  "properties": {

    "name": {

      "type": "string"

    },

    "company": {

      "type": "string"

    },

    "phone": {

      "type": "string"

    },

    "email": {

      "type": "string"

    },

    "city": {

      "type": "string"

    },

    "state": {

      "type": "string"

    },

    "buy_areas": {

      "type": "string"

    },

    "property_types": {

      "type": "string"

    },

    "price_min": {

      "type": "number"

    },

    "price_max": {

      "type": "number"

    },

    "arv_max_percent": {

      "type": "number"

    },

    "beds_min": {

      "type": "number"

    },

    "condition_preference": {

      "type": "string",

      "enum": [

        "Any",

        "Light Rehab",

        "Heavy Rehab",

        "Turnkey Only"

      ]

    },

    "closing_timeline": {

      "type": "string"

    },

    "proof_of_funds": {

      "type": "boolean"

    },

    "buyer_type": {

      "type": "string",

      "enum": [

        "Fix & Flip",

        "Buy & Hold",

        "Wholesaler",

        "Developer",

        "Hedge Fund",

        "Owner Occupant",

        "Other"

      ]

    },

    "status": {

      "type": "string",

      "enum": [

        "New",

        "Contacted",

        "Verified",

        "Active",

        "Deal Sent",

        "Closed",

        "Inactive"

      ]

    },

    "source": {

      "type": "string"

    },

    "touch_count": {

      "type": "number"

    },

    "last_contact_date": {

      "type": "string"

    },

    "next_followup_date": {

      "type": "string"

    },

    "deals_sent": {

      "type": "number"

    },

    "deals_closed": {

      "type": "number"

    },

    "total_volume": {

      "type": "number"

    },

    "notes": {

      "type": "string"

    },

    "linkedin_url": {

      "type": "string"

    },

    "priority": {

      "type": "string",

      "enum": [

        "A-Buyer",

        "B-Buyer",

        "C-Buyer"

      ]

    },

    "tags": {

      "type": "string"

    }

  },

  "required": [],

  "name": "CashBuyer"

}
