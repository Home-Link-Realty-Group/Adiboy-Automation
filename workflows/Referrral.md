# Referrral

Source: Referrral.docx

\{

  "type": "object",

  "properties": \{

    "name": \{

      "type": "string"

    \},

    "company": \{

      "type": "string"

    \},

    "title": \{

      "type": "string"

    \},

    "type": \{

      "type": "string",

      "enum": \[

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

      \]

    \},

    "phone": \{

      "type": "string"

    \},

    "email": \{

      "type": "string"

    \},

    "address": \{

      "type": "string"

    \},

    "city": \{

      "type": "string"

    \},

    "state": \{

      "type": "string"

    \},

    "zip": \{

      "type": "string"

    \},

    "linkedin\_url": \{

      "type": "string"

    \},

    "website": \{

      "type": "string"

    \},

    "status": \{

      "type": "string",

      "enum": \[

        "New",

        "Contacted",

        "Responded",

        "Meeting Set",

        "Active Partner",

        "Deal Sent",

        "Closed Deal",

        "Inactive"

      \]

    \},

    "source": \{

      "type": "string"

    \},

    "touch\_count": \{

      "type": "number"

    \},

    "last\_contact\_date": \{

      "type": "string"

    \},

    "next\_followup\_date": \{

      "type": "string"

    \},

    "deals\_referred": \{

      "type": "number"

    \},

    "revenue\_from\_referrals": \{

      "type": "number"

    \},

    "notes": \{

      "type": "string"

    \},

    "referral\_fee\_agreed": \{

      "type": "boolean"

    \},

    "referral\_fee\_percent": \{

      "type": "number"

    \},

    "preferred\_contact\_method": \{

      "type": "string",

      "enum": \[

        "Email",

        "Phone",

        "LinkedIn",

        "Text"

      \]

    \},

    "priority": \{

      "type": "string",

      "enum": \[

        "Hot",

        "Warm",

        "Cold"

      \]

    \},

    "tags": \{

      "type": "string"

    \}

  \},

  "required": \[\],

  "name": "Referral"

\}
