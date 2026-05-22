# Site Page Components

Source: Site Page Components.docx

{

  "name": "PageComponent",

  "type": "object",

  "properties": {

    "page_route": {

      "type": "string",

      "description": "Route of the page this component belongs to"

    },

    "component_type": {

      "type": "string",

      "enum": [

        "section",

        "form",

        "carousel",

        "reviews",

        "popup",

        "newsletter",

        "testimonial",

        "pricing_table",

        "feature_grid",

        "cta_button",

        "countdown",

        "accordion",

        "faq"

      ],

      "description": "Type of component"

    },

    "component_name": {

      "type": "string",

      "description": "Friendly name for this component instance"

    },

    "title": {

      "type": "string",

      "description": "Component title/heading"

    },

    "description": {

      "type": "string",

      "description": "Component description or content"

    },

    "background_color": {

      "type": "string",

      "description": "Component background color (hex)"

    },

    "text_color": {

      "type": "string",

      "description": "Component text color (hex)"

    },

    "button_text": {

      "type": "string",

      "description": "Button label (for CTA, form submit, etc.)"

    },

    "button_color": {

      "type": "string",

      "description": "Button color (hex)"

    },

    "link_url": {

      "type": "string",

      "description": "Button/link destination URL"

    },

    "form_fields": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "name": {

            "type": "string"

          },

          "type": {

            "type": "string",

            "enum": [

              "text",

              "email",

              "phone",

              "textarea",

              "select",

              "checkbox"

            ]

          },

          "label": {

            "type": "string"

          },

          "required": {

            "type": "boolean"

          },

          "placeholder": {

            "type": "string"

          }

        }

      },

      "description": "Form field configuration"

    },

    "carousel_items": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "image_url": {

            "type": "string"

          },

          "title": {

            "type": "string"

          },

          "description": {

            "type": "string"

          }

        }

      },

      "description": "Carousel slide items"

    },

    "reviews": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "author": {

            "type": "string"

          },

          "rating": {

            "type": "number"

          },

          "text": {

            "type": "string"

          },

          "avatar_url": {

            "type": "string"

          }

        }

      },

      "description": "Customer reviews/testimonials"

    },

    "is_visible": {

      "type": "boolean",

      "default": true,

      "description": "Whether component is visible on page"

    },

    "position": {

      "type": "number",

      "description": "Display order on page"

    },

    "settings": {

      "type": "object",

      "description": "Additional component-specific settings (JSON)"

    },

    "notes": {

      "type": "string",

      "description": "Internal notes"

    }

  },

  "required": [

    "page_route",

    "component_type",

    "component_name"

  ]

}
