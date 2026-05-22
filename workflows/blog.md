# blog

Source: blog.docx

\{

  "name": "BlogPost",

  "type": "object",

  "properties": \{

    "title": \{

      "type": "string",

      "description": "Blog post title"

    \},

    "slug": \{

      "type": "string",

      "description": "URL\-friendly slug \(auto\-generated from title\)"

    \},

    "excerpt": \{

      "type": "string",

      "description": "Short description shown in feed"

    \},

    "content": \{

      "type": "string",

      "description": "Full blog post content \(markdown supported\)"

    \},

    "category": \{

      "type": "string",

      "enum": \[

        "foreclosure",

        "inherited",

        "comparison",

        "timeline",

        "education",

        "process"

      \],

      "description": "Post category"

    \},

    "read\_time": \{

      "type": "number",

      "description": "Estimated read time in minutes"

    \},

    "published": \{

      "type": "boolean",

      "default": false,

      "description": "Whether the post is published"

    \},

    "featured": \{

      "type": "boolean",

      "default": false,

      "description": "Whether to feature this post at the top"

    \},

    "published\_date": \{

      "type": "string",

      "format": "date",

      "description": "Publication date"

    \},

    "tags": \{

      "type": "string",

      "description": "Comma\-separated tags"

    \},

    "image\_url": \{

      "type": "string",

      "description": "Featured image URL"

    \},

    "meta\_description": \{

      "type": "string",

      "description": "SEO meta description \(shown in search results\)"

    \},

    "meta\_keywords": \{

      "type": "string",

      "description": "SEO keywords \(comma\-separated\)"

    \}

  \},

  "required": \[

    "title",

    "slug",

    "content",

    "category"

  \]

\}
