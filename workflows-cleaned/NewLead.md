# NewLead

Source: NewLead.docx

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

    "condition": {

      "type": "string"

    },

    "situation": {

      "type": "string"

    },

    "timeline": {

      "type": "string"

    },

    "arv_estimate": {

      "type": "number"

    },

    "offer_amount": {

      "type": "number"

    },

    "status": {

      "type": "string",

      "enum": [

        "New Lead",

        "Contacted",

        "Responded",

        "Offer Sent",

        "Under Contract",

        "Dead",

        "Inactive",

        "Hot"

      ]

    },

    "source": {

      "type": "string"

    },

    "notes": {

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

    "assigned_to": {

      "type": "string"

    },

    "priority": {

      "type": "string",

      "enum": [

        "Hot",

        "High",

        "Medium",

        "Low"

      ]

    },

    "equity_percent": {

      "type": "number"

    },

    "ownership_years": {

      "type": "number"

    },

    "monthly_rent": {

      "type": "number"

    },

    "seller_motivation_score": {

      "type": "number"

    },

    "call_recording_url": {

      "type": "string"

    },

    "contract_signed": {

      "type": "boolean"

    },

    "assignment_fee": {

      "type": "number"

    },

    "offer_followup_touch": {

      "type": "number"

    },

    "score_equity": {

      "type": "number"

    },

    "score_distress": {

      "type": "number"

    },

    "score_condition": {

      "type": "number"

    },

    "score_urgency": {

      "type": "number"

    },

    "motivation_total_score": {

      "type": "number"

    },

    "distress_flags": {

      "type": "string"

    },

    "year_built": {

      "type": "number"

    },

    "property_type": {

      "type": "string"

    },

    "is_vacant": {

      "type": "boolean"

    },

    "is_absentee": {

      "type": "boolean"

    },

    "is_free_and_clear": {

      "type": "boolean"

    },

    "has_tax_lien": {

      "type": "boolean"

    },

    "has_code_violation": {

      "type": "boolean"

    },

    "is_pre_foreclosure": {

      "type": "boolean"

    },

    "stacked_flags_count": {

      "type": "number"

    },

    "target_zip": {

      "type": "string"

    },

    "arv_range": {

      "type": "string"

    },

    "dom_at_contact": {

      "type": "number"

    },

    "trustedform_cert_url": {

      "type": "string",

      "description": "TrustedForm Certificate URL \u2014 TCPA proof of consent. Generated per form submission. Expires 90 days unless retained. Store permanently."

    }

  },

  "required": [],

  "name": "Lead"

}
