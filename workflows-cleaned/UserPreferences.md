# UserPreferences

Source: UserPreferences.docx

{

  "name": "UserPreferences",

  "type": "object",

  "properties": {

    "user_email": {

      "type": "string",

      "description": "Email of the user these preferences belong to"

    },

    "full_name": {

      "type": "string"

    },

    "phone": {

      "type": "string"

    },

    "company": {

      "type": "string"

    },

    "timezone": {

      "type": "string",

      "default": "America/Chicago"

    },

    "avatar_url": {

      "type": "string",

      "description": "URL to uploaded or selected profile image"

    },

    "avatar_kind": {

      "type": "string",

      "enum": [

        "upload",

        "stock",

        "initials"

      ],

      "default": "initials"

    },

    "default_mao_formula": {

      "type": "string",

      "enum": [

        "70_rule",

        "75_rule",

        "65_rule",

        "fixed_profit",

        "all_in_cost",

        "cap_rate"

      ],

      "default": "70_rule"

    },

    "show_all_mao_formulas": {

      "type": "boolean",

      "default": true

    },

    "default_arv_radius_miles": {

      "type": "number",

      "default": 0.5

    },

    "default_repair_tier": {

      "type": "string",

      "enum": [

        "light",

        "average",

        "heavy",

        "always_ask"

      ],

      "default": "average"

    },

    "default_wholesale_fee": {

      "type": "number",

      "default": 10000

    },

    "default_holding_months": {

      "type": "number",

      "default": 4

    },

    "default_closing_cost_pct": {

      "type": "number",

      "default": 3

    },

    "ui_density": {

      "type": "string",

      "enum": [

        "compact",

        "comfortable",

        "spacious"

      ],

      "default": "comfortable"

    },

    "theme": {

      "type": "string",

      "enum": [

        "light",

        "dark",

        "system"

      ],

      "default": "light"

    },

    "accent_color": {

      "type": "string",

      "default": "#D4A843"

    },

    "currency": {

      "type": "string",

      "default": "USD"

    },

    "date_format": {

      "type": "string",

      "enum": [

        "MM/DD/YYYY",

        "DD/MM/YYYY",

        "YYYY-MM-DD"

      ],

      "default": "MM/DD/YYYY"

    },

    "first_day_of_week": {

      "type": "string",

      "enum": [

        "sunday",

        "monday"

      ],

      "default": "sunday"

    },

    "notify_new_lead_email": {

      "type": "boolean",

      "default": true

    },

    "notify_new_lead_sms": {

      "type": "boolean",

      "default": true

    },

    "notify_hot_lead_only": {

      "type": "boolean",

      "default": false

    },

    "notify_daily_digest": {

      "type": "boolean",

      "default": true

    },

    "digest_time": {

      "type": "string",

      "default": "06:00"

    },

    "quiet_hours_enabled": {

      "type": "boolean",

      "default": false

    },

    "quiet_hours_start": {

      "type": "string",

      "default": "21:00"

    },

    "quiet_hours_end": {

      "type": "string",

      "default": "07:00"

    },

    "dialer_lines": {

      "type": "number",

      "default": 5

    },

    "dialer_caller_id": {

      "type": "string"

    },

    "dialer_record_calls": {

      "type": "boolean",

      "default": true

    },

    "dialer_recording_disclosure": {

      "type": "boolean",

      "default": true

    },

    "dialer_amd_enabled": {

      "type": "boolean",

      "default": true

    },

    "dialer_voicemail_drop": {

      "type": "boolean",

      "default": false

    },

    "email_signature": {

      "type": "string"

    },

    "sms_speed_to_lead_text": {

      "type": "string"

    },

    "auto_skip_trace": {

      "type": "boolean",

      "default": true

    },

    "auto_lead_score": {

      "type": "boolean",

      "default": true

    },

    "auto_followup_sequence": {

      "type": "boolean",

      "default": true

    },

    "auto_buyer_drip": {

      "type": "boolean",

      "default": true

    },

    "auto_offer_engine": {

      "type": "boolean",

      "default": false

    },

    "auto_social_post": {

      "type": "boolean",

      "default": false

    },

    "tcpa_strict_mode": {

      "type": "boolean",

      "default": true

    },

    "dnc_check_before_dial": {

      "type": "boolean",

      "default": true

    },

    "extra_prefs": {

      "type": "object",

      "description": "Extensible JSON bucket"

    }

  },

  "required": [

    "user_email"

  ]

}
