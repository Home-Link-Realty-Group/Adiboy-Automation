# UserPreferences

Source: UserPreferences.docx

\{

  "name": "UserPreferences",

  "type": "object",

  "properties": \{

    "user\_email": \{

      "type": "string",

      "description": "Email of the user these preferences belong to"

    \},

    "full\_name": \{

      "type": "string"

    \},

    "phone": \{

      "type": "string"

    \},

    "company": \{

      "type": "string"

    \},

    "timezone": \{

      "type": "string",

      "default": "America/Chicago"

    \},

    "avatar\_url": \{

      "type": "string",

      "description": "URL to uploaded or selected profile image"

    \},

    "avatar\_kind": \{

      "type": "string",

      "enum": \[

        "upload",

        "stock",

        "initials"

      \],

      "default": "initials"

    \},

    "default\_mao\_formula": \{

      "type": "string",

      "enum": \[

        "70\_rule",

        "75\_rule",

        "65\_rule",

        "fixed\_profit",

        "all\_in\_cost",

        "cap\_rate"

      \],

      "default": "70\_rule"

    \},

    "show\_all\_mao\_formulas": \{

      "type": "boolean",

      "default": true

    \},

    "default\_arv\_radius\_miles": \{

      "type": "number",

      "default": 0\.5

    \},

    "default\_repair\_tier": \{

      "type": "string",

      "enum": \[

        "light",

        "average",

        "heavy",

        "always\_ask"

      \],

      "default": "average"

    \},

    "default\_wholesale\_fee": \{

      "type": "number",

      "default": 10000

    \},

    "default\_holding\_months": \{

      "type": "number",

      "default": 4

    \},

    "default\_closing\_cost\_pct": \{

      "type": "number",

      "default": 3

    \},

    "ui\_density": \{

      "type": "string",

      "enum": \[

        "compact",

        "comfortable",

        "spacious"

      \],

      "default": "comfortable"

    \},

    "theme": \{

      "type": "string",

      "enum": \[

        "light",

        "dark",

        "system"

      \],

      "default": "light"

    \},

    "accent\_color": \{

      "type": "string",

      "default": "\#D4A843"

    \},

    "currency": \{

      "type": "string",

      "default": "USD"

    \},

    "date\_format": \{

      "type": "string",

      "enum": \[

        "MM/DD/YYYY",

        "DD/MM/YYYY",

        "YYYY\-MM\-DD"

      \],

      "default": "MM/DD/YYYY"

    \},

    "first\_day\_of\_week": \{

      "type": "string",

      "enum": \[

        "sunday",

        "monday"

      \],

      "default": "sunday"

    \},

    "notify\_new\_lead\_email": \{

      "type": "boolean",

      "default": true

    \},

    "notify\_new\_lead\_sms": \{

      "type": "boolean",

      "default": true

    \},

    "notify\_hot\_lead\_only": \{

      "type": "boolean",

      "default": false

    \},

    "notify\_daily\_digest": \{

      "type": "boolean",

      "default": true

    \},

    "digest\_time": \{

      "type": "string",

      "default": "06:00"

    \},

    "quiet\_hours\_enabled": \{

      "type": "boolean",

      "default": false

    \},

    "quiet\_hours\_start": \{

      "type": "string",

      "default": "21:00"

    \},

    "quiet\_hours\_end": \{

      "type": "string",

      "default": "07:00"

    \},

    "dialer\_lines": \{

      "type": "number",

      "default": 5

    \},

    "dialer\_caller\_id": \{

      "type": "string"

    \},

    "dialer\_record\_calls": \{

      "type": "boolean",

      "default": true

    \},

    "dialer\_recording\_disclosure": \{

      "type": "boolean",

      "default": true

    \},

    "dialer\_amd\_enabled": \{

      "type": "boolean",

      "default": true

    \},

    "dialer\_voicemail\_drop": \{

      "type": "boolean",

      "default": false

    \},

    "email\_signature": \{

      "type": "string"

    \},

    "sms\_speed\_to\_lead\_text": \{

      "type": "string"

    \},

    "auto\_skip\_trace": \{

      "type": "boolean",

      "default": true

    \},

    "auto\_lead\_score": \{

      "type": "boolean",

      "default": true

    \},

    "auto\_followup\_sequence": \{

      "type": "boolean",

      "default": true

    \},

    "auto\_buyer\_drip": \{

      "type": "boolean",

      "default": true

    \},

    "auto\_offer\_engine": \{

      "type": "boolean",

      "default": false

    \},

    "auto\_social\_post": \{

      "type": "boolean",

      "default": false

    \},

    "tcpa\_strict\_mode": \{

      "type": "boolean",

      "default": true

    \},

    "dnc\_check\_before\_dial": \{

      "type": "boolean",

      "default": true

    \},

    "extra\_prefs": \{

      "type": "object",

      "description": "Extensible JSON bucket"

    \}

  \},

  "required": \[

    "user\_email"

  \]

\}
