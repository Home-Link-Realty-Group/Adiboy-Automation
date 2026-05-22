# ContentPerformanceAnalytics

Source: ContentPerformanceAnalytics.docx

\{

  "name": "ContentPerformance",

  "type": "object",

  "properties": \{

    "city": \{

      "type": "string",

      "description": "City where content is deployed"

    \},

    "state": \{

      "type": "string",

      "description": "State abbreviation"

    \},

    "content\_variant\_id": \{

      "type": "string",

      "description": "Unique ID for this content variant"

    \},

    "meta\_title": \{

      "type": "string",

      "description": "Meta title used in this variant"

    \},

    "meta\_description": \{

      "type": "string",

      "description": "Meta description used"

    \},

    "h1\_header": \{

      "type": "string",

      "description": "H1 used in variant"

    \},

    "hero\_tagline": \{

      "type": "string",

      "description": "Hero tagline variant"

    \},

    "unique\_keywords": \{

      "type": "array",

      "items": \{

        "type": "string"

      \},

      "description": "Keywords targeted in this variant"

    \},

    "total\_visitors": \{

      "type": "number",

      "default": 0,

      "description": "Total visitors who saw this content"

    \},

    "total\_conversions": \{

      "type": "number",

      "default": 0,

      "description": "Total lead conversions from this variant"

    \},

    "conversion\_rate": \{

      "type": "number",

      "description": "Conversion rate percentage"

    \},

    "avg\_time\_on\_site": \{

      "type": "number",

      "description": "Average time visitors spent \(seconds\)"

    \},

    "avg\_scroll\_depth": \{

      "type": "number",

      "description": "Average scroll depth percentage"

    \},

    "form\_start\_rate": \{

      "type": "number",

      "description": "% of visitors who started form"

    \},

    "form\_completion\_rate": \{

      "type": "number",

      "description": "% of form starts that completed"

    \},

    "bounce\_rate": \{

      "type": "number",

      "description": "Bounce rate percentage"

    \},

    "avg\_conversion\_value": \{

      "type": "number",

      "description": "Average value per conversion"

    \},

    "total\_revenue": \{

      "type": "number",

      "description": "Total estimated revenue from conversions"

    \},

    "deployed\_date": \{

      "type": "string",

      "format": "date\-time",

      "description": "When this variant was deployed"

    \},

    "last\_analyzed": \{

      "type": "string",

      "format": "date\-time",

      "description": "Last time metrics were updated"

    \},

    "performance\_rank": \{

      "type": "number",

      "description": "Rank among all variants for this city \(1=best\)"

    \},

    "performance\_notes": \{

      "type": "string",

      "description": "Analysis notes on what's working"

    \},

    "description": \{

      "type": "string",

      "maxLength": 1000,

      "description": "Optional description"

    \}

  \},

  "required": \[

    "city",

    "state",

    "content\_variant\_id"

  \]

\}
