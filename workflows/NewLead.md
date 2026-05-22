# NewLead

Source: NewLead.docx

\{

  "type": "object",

  "properties": \{

    "name": \{

      "type": "string"

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

    "condition": \{

      "type": "string"

    \},

    "situation": \{

      "type": "string"

    \},

    "timeline": \{

      "type": "string"

    \},

    "arv\_estimate": \{

      "type": "number"

    \},

    "offer\_amount": \{

      "type": "number"

    \},

    "status": \{

      "type": "string",

      "enum": \[

        "New Lead",

        "Contacted",

        "Responded",

        "Offer Sent",

        "Under Contract",

        "Dead",

        "Inactive",

        "Hot"

      \]

    \},

    "source": \{

      "type": "string"

    \},

    "notes": \{

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

    "assigned\_to": \{

      "type": "string"

    \},

    "priority": \{

      "type": "string",

      "enum": \[

        "Hot",

        "High",

        "Medium",

        "Low"

      \]

    \},

    "equity\_percent": \{

      "type": "number"

    \},

    "ownership\_years": \{

      "type": "number"

    \},

    "monthly\_rent": \{

      "type": "number"

    \},

    "seller\_motivation\_score": \{

      "type": "number"

    \},

    "call\_recording\_url": \{

      "type": "string"

    \},

    "contract\_signed": \{

      "type": "boolean"

    \},

    "assignment\_fee": \{

      "type": "number"

    \},

    "offer\_followup\_touch": \{

      "type": "number"

    \},

    "score\_equity": \{

      "type": "number"

    \},

    "score\_distress": \{

      "type": "number"

    \},

    "score\_condition": \{

      "type": "number"

    \},

    "score\_urgency": \{

      "type": "number"

    \},

    "motivation\_total\_score": \{

      "type": "number"

    \},

    "distress\_flags": \{

      "type": "string"

    \},

    "year\_built": \{

      "type": "number"

    \},

    "property\_type": \{

      "type": "string"

    \},

    "is\_vacant": \{

      "type": "boolean"

    \},

    "is\_absentee": \{

      "type": "boolean"

    \},

    "is\_free\_and\_clear": \{

      "type": "boolean"

    \},

    "has\_tax\_lien": \{

      "type": "boolean"

    \},

    "has\_code\_violation": \{

      "type": "boolean"

    \},

    "is\_pre\_foreclosure": \{

      "type": "boolean"

    \},

    "stacked\_flags\_count": \{

      "type": "number"

    \},

    "target\_zip": \{

      "type": "string"

    \},

    "arv\_range": \{

      "type": "string"

    \},

    "dom\_at\_contact": \{

      "type": "number"

    \},

    "trustedform\_cert\_url": \{

      "type": "string",

      "description": "TrustedForm Certificate URL \\u2014 TCPA proof of consent\. Generated per form submission\. Expires 90 days unless retained\. Store permanently\."

    \}

  \},

  "required": \[\],

  "name": "Lead"

\}
