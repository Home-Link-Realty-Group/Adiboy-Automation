# CityMarketDataLandingPages

Source: CityMarketDataLandingPages.docx

{

  "name": "CityMarketData",

  "type": "object",

  "properties": {

    "city": {

      "type": "string",

      "description": "City name"

    },

    "state": {

      "type": "string",

      "description": "State abbreviation"

    },

    "market_insights": {

      "type": "object",

      "description": "Market analysis from Apify",

      "properties": {

        "population": {

          "type": "number"

        },

        "median_home_price": {

          "type": "number"

        },

        "avg_days_on_market": {

          "type": "number"

        },

        "market_trend": {

          "type": "string"

        },

        "inventory_level": {

          "type": "string"

        },

        "top_neighborhoods": {

          "type": "array",

          "items": {

            "type": "string"

          }

        },

        "local_competition": {

          "type": "string"

        }

      }

    },

    "seo_content": {

      "type": "object",

      "description": "Generated SEO-optimized content",

      "properties": {

        "meta_title": {

          "type": "string"

        },

        "meta_description": {

          "type": "string"

        },

        "h1_header": {

          "type": "string"

        },

        "hero_tagline": {

          "type": "string"

        },

        "unique_value_prop": {

          "type": "string"

        },

        "local_keywords": {

          "type": "array",

          "items": {

            "type": "string"

          }

        },

        "neighborhood_copy": {

          "type": "string"

        },

        "market_stats_copy": {

          "type": "string"

        }

      }

    },

    "generated_at": {

      "type": "string",

      "format": "date-time",

      "description": "When content was generated"

    },

    "last_updated": {

      "type": "string",

      "format": "date-time",

      "description": "Last time Apify data was refreshed"

    },

    "page_route": {

      "type": "string",

      "description": "Associated landing page route (e.g., /SellHouseAtlanta)"

    },

    "description": {

      "type": "string",

      "maxLength": 1000,

      "description": "Optional description"

    }

  },

  "required": [

    "city",

    "state"

  ]

}
