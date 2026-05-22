# Referrral

Source: Referrral.docx

{

  "type": "object",

  "properties": {

    "name": {

      "type": "string"

    },

    "company": {

      "type": "string"

    },

    "title": {

      "type": "string"

    },

    "type": {

      "type": "string",

      "enum": [

        "Probate Attorney",

        "Divorce Attorney",

        "Estate Attorney",

        "Real Estate Agent",

        "Property Manager",

        "Financial Advisor",

        "CPA/Accountant",

        "Bankruptcy Attorney",

        "HOA Manager",

        "Mortgage Broker",

        "Insurance Agent",

        "Contractor",

        "Other"

      ]

    },

    "phone": {

      "type": "string"

    },

    "email": {

      "type": "string"

    },

    "address": {

      "type": "string"

    },

    "city": {

      "type": "string"

    },

    "state": {

      "type": "string"

    },

    "zip": {

      "type": "string"

    },

    "linkedin_url": {

      "type": "string"

    },

    "website": {

      "type": "string"

    },

    "status": {

      "type": "string",

      "enum": [

        "New",

        "Contacted",

        "Responded",

        "Meeting Set",

        "Active Partner",

        "Deal Sent",

        "Closed Deal",

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

    "deals_referred": {

      "type": "number"

    },

    "revenue_from_referrals": {

      "type": "number"

    },

    "notes": {

      "type": "string"

    },

    "referral_fee_agreed": {

      "type": "boolean"

    },

    "referral_fee_percent": {

      "type": "number"

    },

    "preferred_contact_method": {

      "type": "string",

      "enum": [

        "Email",

        "Phone",

        "LinkedIn",

        "Text"

      ]

    },

    "priority": {

      "type": "string",

      "enum": [

        "Hot",

        "Warm",

        "Cold"

      ]

    },

    "tags": {

      "type": "string"

    }

  },

  "required": [],

  "name": "Referral"

}
