# Stored Documents

Source: Stored Documents.docx

\{

  "name": "StoredDocument",

  "type": "object",

  "properties": \{

    "title": \{

      "type": "string",

      "description": "Document title/name"

    \},

    "category": \{

      "type": "string",

      "description": "Category tag"

    \},

    "file\_url": \{

      "type": "string",

      "description": "Uploaded file URL"

    \},

    "file\_name": \{

      "type": "string",

      "description": "Original file name"

    \},

    "file\_type": \{

      "type": "string",

      "description": "File MIME type or extension"

    \},

    "content": \{

      "type": "string",

      "description": "Editable text content \(for text/doc files\)"

    \},

    "notes": \{

      "type": "string",

      "description": "Notes about this document"

    \},

    "tags": \{

      "type": "string",

      "description": "Comma\-separated tags"

    \},

    "is\_pinned": \{

      "type": "boolean",

      "default": false

    \},

    "file\_size": \{

      "type": "string",

      "description": "Human\-readable file size"

    \}

  \},

  "required": \[

    "title"

  \]

\}
