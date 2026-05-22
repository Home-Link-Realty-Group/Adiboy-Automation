# CityMarketDataLandingPages

Source: CityMarketDataLandingPages.docx

\{

  "name": "CityMarketData",

  "type": "object",

  "properties": \{

    "city": \{

      "type": "string",

      "description": "City name"

    \},

    "state": \{

      "type": "string",

      "description": "State abbreviation"

    \},

    "market\_insights": \{

      "type": "object",

      "description": "Market analysis from Apify",

      "properties": \{

        "population": \{

          "type": "number"

        \},

        "median\_home\_price": \{

          "type": "number"

        \},

        "avg\_days\_on\_market": \{

          "type": "number"

        \},

        "market\_trend": \{

          "type": "string"

        \},

        "inventory\_level": \{

          "type": "string"

        \},

        "top\_neighborhoods": \{

          "type": "array",

          "items": \{

            "type": "string"

          \}

        \},

        "local\_competition": \{

          "type": "string"

        \}

      \}

    \},

    "seo\_content": \{

      "type": "object",

      "description": "Generated SEO\-optimized content",

      "properties": \{

        "meta\_title": \{

          "type": "string"

        \},

        "meta\_description": \{

          "type": "string"

        \},

        "h1\_header": \{

          "type": "string"

        \},

        "hero\_tagline": \{

          "type": "string"

        \},

        "unique\_value\_prop": \{

          "type": "string"

        \},

        "local\_keywords": \{

          "type": "array",

          "items": \{

            "type": "string"

          \}

        \},

        "neighborhood\_copy": \{

          "type": "string"

        \},

        "market\_stats\_copy": \{

          "type": "string"

        \}

      \}

    \},

    "generated\_at": \{

      "type": "string",

      "format": "date\-time",

      "description": "When content was generated"

    \},

    "last\_updated": \{

      "type": "string",

      "format": "date\-time",

      "description": "Last time Apify data was refreshed"

    \},

    "page\_route": \{

      "type": "string",

      "description": "Associated landing page route \(e\.g\., /SellHouseAtlanta\)"

    \},

    "description": \{

      "type": "string",

      "maxLength": 1000,

      "description": "Optional description"

    \}

  \},

  "required": \[

    "city",

    "state"

  \]

\}
