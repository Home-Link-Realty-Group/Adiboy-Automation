# AIanalyzeCalls

Source: AIanalyzeCalls.docx

{

  "type": "object",

  "properties": {

    "lead_id": {

      "type": "string",

      "description": "Linked lead ID"

    },

    "lead_name": {

      "type": "string",

      "description": "Lead name"

    },

    "lead_phone": {

      "type": "string",

      "description": "Lead phone"

    },

    "call_date": {

      "type": "string",

      "description": "Date of call (YYYY-MM-DD)"

    },

    "call_duration_sec": {

      "type": "number",

      "description": "Duration in seconds"

    },

    "recording_url": {

      "type": "string",

      "description": "URL to call recording audio"

    },

    "transcript": {

      "type": "string",

      "description": "Full call transcript"

    },

    "overall_grade": {

      "type": "string",

      "enum": [

        "A+",

        "A",

        "B+",

        "B",

        "C",

        "D",

        "F"

      ],

      "description": "GPT-graded overall call score"

    },

    "overall_score": {

      "type": "number",

      "description": "Numeric score 0-100"

    },

    "rapport_score": {

      "type": "number",

      "description": "Rapport & warmth 0-10"

    },

    "discovery_score": {

      "type": "number",

      "description": "Motivation discovery 0-10"

    },

    "objection_score": {

      "type": "number",

      "description": "Objection handling 0-10"

    },

    "closing_score": {

      "type": "number",

      "description": "Closing attempt / CTA 0-10"

    },

    "tonality_score": {

      "type": "number",

      "description": "Tonality & energy 0-10"

    },

    "outcome": {

      "type": "string",

      "description": "Call outcome \u2014 Hot Lead / Follow-Up / Not Interested / Voicemail / No Answer"

    },

    "ai_summary": {

      "type": "string",

      "description": "GPT 3-sentence call summary"

    },

    "strengths": {

      "type": "string",

      "description": "What was done well (GPT)"

    },

    "improvements": {

      "type": "string",

      "description": "What to improve next call (GPT)"

    },

    "coach_tip": {

      "type": "string",

      "description": "One specific coaching tip from GPT"

    },

    "follow_up_recommended": {

      "type": "string",

      "description": "GPT recommended next action"

    },

    "motivation_signals": {

      "type": "string",

      "description": "Distress / motivation signals detected in transcript"

    },

    "graded_by": {

      "type": "string",

      "description": "manual or ai"

    },

    "notes": {

      "type": "string",

      "description": "Manual notes"

    }

  },

  "required": [],

  "name": "CallGrade"

}
