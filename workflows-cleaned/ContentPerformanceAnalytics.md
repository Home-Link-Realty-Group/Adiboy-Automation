# ContentPerformanceAnalytics

Source: ContentPerformanceAnalytics.docx

{

  "name": "ContentPerformance",

  "type": "object",

  "properties": {

    "city": {

      "type": "string",

      "description": "City where content is deployed"

    },

    "state": {

      "type": "string",

      "description": "State abbreviation"

    },

    "content_variant_id": {

      "type": "string",

      "description": "Unique ID for this content variant"

    },

    "meta_title": {

      "type": "string",

      "description": "Meta title used in this variant"

    },

    "meta_description": {

      "type": "string",

      "description": "Meta description used"

    },

    "h1_header": {

      "type": "string",

      "description": "H1 used in variant"

    },

    "hero_tagline": {

      "type": "string",

      "description": "Hero tagline variant"

    },

    "unique_keywords": {

      "type": "array",

      "items": {

        "type": "string"

      },

      "description": "Keywords targeted in this variant"

    },

    "total_visitors": {

      "type": "number",

      "default": 0,

      "description": "Total visitors who saw this content"

    },

    "total_conversions": {

      "type": "number",

      "default": 0,

      "description": "Total lead conversions from this variant"

    },

    "conversion_rate": {

      "type": "number",

      "description": "Conversion rate percentage"

    },

    "avg_time_on_site": {

      "type": "number",

      "description": "Average time visitors spent (seconds)"

    },

    "avg_scroll_depth": {

      "type": "number",

      "description": "Average scroll depth percentage"

    },

    "form_start_rate": {

      "type": "number",

      "description": "% of visitors who started form"

    },

    "form_completion_rate": {

      "type": "number",

      "description": "% of form starts that completed"

    },

    "bounce_rate": {

      "type": "number",

      "description": "Bounce rate percentage"

    },

    "avg_conversion_value": {

      "type": "number",

      "description": "Average value per conversion"

    },

    "total_revenue": {

      "type": "number",

      "description": "Total estimated revenue from conversions"

    },

    "deployed_date": {

      "type": "string",

      "format": "date-time",

      "description": "When this variant was deployed"

    },

    "last_analyzed": {

      "type": "string",

      "format": "date-time",

      "description": "Last time metrics were updated"

    },

    "performance_rank": {

      "type": "number",

      "description": "Rank among all variants for this city (1=best)"

    },

    "performance_notes": {

      "type": "string",

      "description": "Analysis notes on what's working"

    },

    "description": {

      "type": "string",

      "maxLength": 1000,

      "description": "Optional description"

    }

  },

  "required": [

    "city",

    "state",

    "content_variant_id"

  ]

}
