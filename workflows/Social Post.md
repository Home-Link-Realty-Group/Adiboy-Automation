# Social Post

Source: Social Post.docx

\{

  "type": "object",

  "properties": \{

    "title": \{

      "type": "string",

      "description": "Internal title for this post"

    \},

    "content": \{

      "type": "string",

      "description": "Post caption/text content"

    \},

    "platforms": \{

      "type": "string",

      "description": "Comma\-separated platforms: facebook,instagram,linkedin,twitter"

    \},

    "campaign\_id": \{

      "type": "string",

      "description": "Linked campaign ID"

    \},

    "campaign\_name": \{

      "type": "string"

    \},

    "status": \{

      "type": "string",

      "enum": \[

        "Draft",

        "Scheduled",

        "Published",

        "Failed"

      \],

      "default": "Draft"

    \},

    "scheduled\_date": \{

      "type": "string",

      "description": "ISO date for scheduling"

    \},

    "scheduled\_time": \{

      "type": "string",

      "description": "HH:MM time"

    \},

    "published\_at": \{

      "type": "string"

    \},

    "image\_url": \{

      "type": "string",

      "description": "Attached image URL"

    \},

    "post\_type": \{

      "type": "string",

      "enum": \[

        "Property",

        "Testimonial",

        "Education",

        "Motivation",

        "Offer",

        "Community",

        "Custom"

      \],

      "default": "Custom"

    \},

    "target\_audience": \{

      "type": "string",

      "description": "Who this is targeting \(motivated sellers, buyers, etc\.\)"

    \},

    "fb\_post\_id": \{

      "type": "string"

    \},

    "ig\_post\_id": \{

      "type": "string"

    \},

    "likes": \{

      "type": "number",

      "default": 0

    \},

    "comments": \{

      "type": "number",

      "default": 0

    \},

    "reach": \{

      "type": "number",

      "default": 0

    \},

    "clicks": \{

      "type": "number",

      "default": 0

    \},

    "leads\_generated": \{

      "type": "number",

      "default": 0

    \},

    "notes": \{

      "type": "string"

    \}

  \},

  "required": \[\],

  "name": "SocialPost"

\}
