# Site Page Components

Source: Site Page Components.docx

\{

  "name": "PageComponent",

  "type": "object",

  "properties": \{

    "page\_route": \{

      "type": "string",

      "description": "Route of the page this component belongs to"

    \},

    "component\_type": \{

      "type": "string",

      "enum": \[

        "section",

        "form",

        "carousel",

        "reviews",

        "popup",

        "newsletter",

        "testimonial",

        "pricing\_table",

        "feature\_grid",

        "cta\_button",

        "countdown",

        "accordion",

        "faq"

      \],

      "description": "Type of component"

    \},

    "component\_name": \{

      "type": "string",

      "description": "Friendly name for this component instance"

    \},

    "title": \{

      "type": "string",

      "description": "Component title/heading"

    \},

    "description": \{

      "type": "string",

      "description": "Component description or content"

    \},

    "background\_color": \{

      "type": "string",

      "description": "Component background color \(hex\)"

    \},

    "text\_color": \{

      "type": "string",

      "description": "Component text color \(hex\)"

    \},

    "button\_text": \{

      "type": "string",

      "description": "Button label \(for CTA, form submit, etc\.\)"

    \},

    "button\_color": \{

      "type": "string",

      "description": "Button color \(hex\)"

    \},

    "link\_url": \{

      "type": "string",

      "description": "Button/link destination URL"

    \},

    "form\_fields": \{

      "type": "array",

      "items": \{

        "type": "object",

        "properties": \{

          "name": \{

            "type": "string"

          \},

          "type": \{

            "type": "string",

            "enum": \[

              "text",

              "email",

              "phone",

              "textarea",

              "select",

              "checkbox"

            \]

          \},

          "label": \{

            "type": "string"

          \},

          "required": \{

            "type": "boolean"

          \},

          "placeholder": \{

            "type": "string"

          \}

        \}

      \},

      "description": "Form field configuration"

    \},

    "carousel\_items": \{

      "type": "array",

      "items": \{

        "type": "object",

        "properties": \{

          "image\_url": \{

            "type": "string"

          \},

          "title": \{

            "type": "string"

          \},

          "description": \{

            "type": "string"

          \}

        \}

      \},

      "description": "Carousel slide items"

    \},

    "reviews": \{

      "type": "array",

      "items": \{

        "type": "object",

        "properties": \{

          "author": \{

            "type": "string"

          \},

          "rating": \{

            "type": "number"

          \},

          "text": \{

            "type": "string"

          \},

          "avatar\_url": \{

            "type": "string"

          \}

        \}

      \},

      "description": "Customer reviews/testimonials"

    \},

    "is\_visible": \{

      "type": "boolean",

      "default": true,

      "description": "Whether component is visible on page"

    \},

    "position": \{

      "type": "number",

      "description": "Display order on page"

    \},

    "settings": \{

      "type": "object",

      "description": "Additional component\-specific settings \(JSON\)"

    \},

    "notes": \{

      "type": "string",

      "description": "Internal notes"

    \}

  \},

  "required": \[

    "page\_route",

    "component\_type",

    "component\_name"

  \]

\}
