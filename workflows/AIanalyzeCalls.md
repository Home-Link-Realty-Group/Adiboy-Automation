# AIanalyzeCalls

Source: AIanalyzeCalls.docx

\{

  "type": "object",

  "properties": \{

    "lead\_id": \{

      "type": "string",

      "description": "Linked lead ID"

    \},

    "lead\_name": \{

      "type": "string",

      "description": "Lead name"

    \},

    "lead\_phone": \{

      "type": "string",

      "description": "Lead phone"

    \},

    "call\_date": \{

      "type": "string",

      "description": "Date of call \(YYYY\-MM\-DD\)"

    \},

    "call\_duration\_sec": \{

      "type": "number",

      "description": "Duration in seconds"

    \},

    "recording\_url": \{

      "type": "string",

      "description": "URL to call recording audio"

    \},

    "transcript": \{

      "type": "string",

      "description": "Full call transcript"

    \},

    "overall\_grade": \{

      "type": "string",

      "enum": \[

        "A\+",

        "A",

        "B\+",

        "B",

        "C",

        "D",

        "F"

      \],

      "description": "GPT\-graded overall call score"

    \},

    "overall\_score": \{

      "type": "number",

      "description": "Numeric score 0\-100"

    \},

    "rapport\_score": \{

      "type": "number",

      "description": "Rapport & warmth 0\-10"

    \},

    "discovery\_score": \{

      "type": "number",

      "description": "Motivation discovery 0\-10"

    \},

    "objection\_score": \{

      "type": "number",

      "description": "Objection handling 0\-10"

    \},

    "closing\_score": \{

      "type": "number",

      "description": "Closing attempt / CTA 0\-10"

    \},

    "tonality\_score": \{

      "type": "number",

      "description": "Tonality & energy 0\-10"

    \},

    "outcome": \{

      "type": "string",

      "description": "Call outcome \\u2014 Hot Lead / Follow\-Up / Not Interested / Voicemail / No Answer"

    \},

    "ai\_summary": \{

      "type": "string",

      "description": "GPT 3\-sentence call summary"

    \},

    "strengths": \{

      "type": "string",

      "description": "What was done well \(GPT\)"

    \},

    "improvements": \{

      "type": "string",

      "description": "What to improve next call \(GPT\)"

    \},

    "coach\_tip": \{

      "type": "string",

      "description": "One specific coaching tip from GPT"

    \},

    "follow\_up\_recommended": \{

      "type": "string",

      "description": "GPT recommended next action"

    \},

    "motivation\_signals": \{

      "type": "string",

      "description": "Distress / motivation signals detected in transcript"

    \},

    "graded\_by": \{

      "type": "string",

      "description": "manual or ai"

    \},

    "notes": \{

      "type": "string",

      "description": "Manual notes"

    \}

  \},

  "required": \[\],

  "name": "CallGrade"

\}
