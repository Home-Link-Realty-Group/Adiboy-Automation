# Social Post

Source: Social Post.docx

{

  "type": "object",

  "properties": {

    "title": {

      "type": "string",

      "description": "Internal title for this post"

    },

    "content": {

      "type": "string",

      "description": "Post caption/text content"

    },

    "platforms": {

      "type": "string",

      "description": "Comma-separated platforms: facebook,instagram,linkedin,twitter"

    },

    "campaign_id": {

      "type": "string",

      "description": "Linked campaign ID"

    },

    "campaign_name": {

      "type": "string"

    },

    "status": {

      "type": "string",

      "enum": [

        "Draft",

        "Scheduled",

        "Published",

        "Failed"

      ],

      "default": "Draft"

    },

    "scheduled_date": {

      "type": "string",

      "description": "ISO date for scheduling"

    },

    "scheduled_time": {

      "type": "string",

      "description": "HH:MM time"

    },

    "published_at": {

      "type": "string"

    },

    "image_url": {

      "type": "string",

      "description": "Attached image URL"

    },

    "post_type": {

      "type": "string",

      "enum": [

        "Property",

        "Testimonial",

        "Education",

        "Motivation",

        "Offer",

        "Community",

        "Custom"

      ],

      "default": "Custom"

    },

    "target_audience": {

      "type": "string",

      "description": "Who this is targeting (motivated sellers, buyers, etc.)"

    },

    "fb_post_id": {

      "type": "string"

    },

    "ig_post_id": {

      "type": "string"

    },

    "likes": {

      "type": "number",

      "default": 0

    },

    "comments": {

      "type": "number",

      "default": 0

    },

    "reach": {

      "type": "number",

      "default": 0

    },

    "clicks": {

      "type": "number",

      "default": 0

    },

    "leads_generated": {

      "type": "number",

      "default": 0

    },

    "notes": {

      "type": "string"

    }

  },

  "required": [],

  "name": "SocialPost"

}
