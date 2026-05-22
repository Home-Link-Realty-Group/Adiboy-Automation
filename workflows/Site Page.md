# Site Page

Source: Site Page.docx

\{

  "name": "Page",

  "type": "object",

  "properties": \{

    "route": \{

      "type": "string",

      "description": "Route path \(e\.g\., /Home, /Blog, /GetOffer\)"

    \},

    "display\_name": \{

      "type": "string",

      "description": "Display name for the page"

    \},

    "seo\_title": \{

      "type": "string",

      "description": "SEO title tag \(50\-60 chars recommended\)"

    \},

    "seo\_description": \{

      "type": "string",

      "description": "SEO meta description \(150\-160 chars recommended\)"

    \},

    "category": \{

      "type": "string",

      "enum": \[

        "public",

        "internal",

        "admin",

        "blog"

      \],

      "description": "Page category/visibility"

    \},

    "is\_active": \{

      "type": "boolean",

      "default": true,

      "description": "Whether page is active/publicly accessible"

    \},

    "canonical\_url": \{

      "type": "string",

      "description": "Canonical URL for this page"

    \},

    "primary\_color": \{

      "type": "string",

      "description": "Primary brand color \(hex code\)"

    \},

    "secondary\_color": \{

      "type": "string",

      "description": "Secondary brand color \(hex code\)"

    \},

    "accent\_color": \{

      "type": "string",

      "description": "Accent color \(hex code\)"

    \},

    "background\_color": \{

      "type": "string",

      "description": "Page background color \(hex code\)"

    \},

    "text\_color": \{

      "type": "string",

      "description": "Primary text color \(hex code\)"

    \},

    "hero\_image\_url": \{

      "type": "string",

      "description": "Hero/banner image URL"

    \},

    "hero\_video\_url": \{

      "type": "string",

      "description": "Hero/banner video URL"

    \},

    "notes": \{

      "type": "string",

      "description": "Internal notes about the page"

    \}

  \},

  "required": \[

    "route",

    "display\_name"

  \]

\}
