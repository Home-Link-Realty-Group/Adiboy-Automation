# cashbuyerlog

Source: cashbuyerlog.docx

{

  "type": "object",

  "properties": {

    "name": {

      "type": "string"

    },

    "phone": {

      "type": "string"

    },

    "email": {

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

      "type": "string"

    },

    "closing_timeline": {

      "type": "string"

    },

    "proof_of_funds": {

      "type": "boolean"

    },

    "notes": {

      "type": "string"

    },

    "status": {

      "type": "string",

      "enum": [

        "Active",

        "Inactive",

        "Hot"

      ]

    },

    "last_deal_sent": {

      "type": "string"

    },

    "total_deals_bought": {

      "type": "number"

    }

  },

  "required": [],

  "name": "Buyer"

}
