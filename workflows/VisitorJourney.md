# VisitorJourney

Source: VisitorJourney.docx

\{

  "name": "VisitorJourney",

  "type": "object",

  "properties": \{

    "session\_id": \{

      "type": "string",

      "description": "Unique visitor session ID"

    \},

    "city": \{

      "type": "string",

      "description": "City of landing page"

    \},

    "state": \{

      "type": "string",

      "description": "State abbreviation"

    \},

    "landing\_page": \{

      "type": "string",

      "description": "Landing page route"

    \},

    "content\_variant\_id": \{

      "type": "string",

      "description": "Unique ID for specific Apify\-generated content set"

    \},

    "entry\_timestamp": \{

      "type": "string",

      "format": "date\-time",

      "description": "When visitor landed on page"

    \},

    "time\_on\_site\_seconds": \{

      "type": "number",

      "description": "Total time spent on landing page"

    \},

    "scroll\_depth\_percent": \{

      "type": "number",

      "description": "How far down the page visitor scrolled \(0\-100\)"

    \},

    "elements\_clicked": \{

      "type": "array",

      "items": \{

        "type": "string"

      \},

      "description": "Elements/buttons user interacted with"

    \},

    "form\_started": \{

      "type": "boolean",

      "description": "Did visitor start filling the form?"

    \},

    "form\_completed": \{

      "type": "boolean",

      "description": "Did visitor complete and submit the form?"

    \},

    "lead\_submitted": \{

      "type": "boolean",

      "description": "Did visitor become a lead?"

    \},

    "lead\_id": \{

      "type": "string",

      "description": "Associated Lead entity ID if converted"

    \},

    "exit\_page": \{

      "type": "string",

      "description": "Where visitor exited from"

    \},

    "exit\_timestamp": \{

      "type": "string",

      "format": "date\-time",

      "description": "When visitor left the page"

    \},

    "conversion\_value": \{

      "type": "number",

      "description": "Estimated lead value for analytics"

    \},

    "utm\_source": \{

      "type": "string",

      "description": "Traffic source \(organic, paid, direct, etc\)"

    \},

    "utm\_campaign": \{

      "type": "string",

      "description": "Campaign identifier"

    \},

    "device\_type": \{

      "type": "string",

      "enum": \[

        "mobile",

        "tablet",

        "desktop"

      \],

      "description": "Device type"

    \},

    "browser": \{

      "type": "string",

      "description": "Browser name"

    \},

    "session\_notes": \{

      "type": "string",

      "description": "Any additional notes"

    \},

    "description": \{

      "type": "string",

      "maxLength": 1000,

      "description": "Optional description"

    \}

  \},

  "required": \[

    "session\_id",

    "city",

    "landing\_page",

    "content\_variant\_id",

    "entry\_timestamp"

  \]

\}
