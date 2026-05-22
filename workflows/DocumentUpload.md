# DocumentUpload

Source: DocumentUpload.docx

\{

  "name": "DocumentUpload",

  "type": "object",

  "properties": \{

    "task\_id": \{

      "type": "string",

      "description": "Related task ID"

    \},

    "file\_name": \{

      "type": "string",

      "description": "Original file name"

    \},

    "file\_url": \{

      "type": "string",

      "description": "Uploaded file URL"

    \},

    "file\_type": \{

      "type": "string",

      "description": "File MIME type \(pdf, doc, image, etc\.\)"

    \},

    "file\_size": \{

      "type": "number",

      "description": "File size in bytes"

    \},

    "uploaded\_at": \{

      "type": "string",

      "format": "date\-time",

      "description": "Upload timestamp"

    \},

    "description": \{

      "type": "string",

      "maxLength": 1000,

      "description": "Optional description"

    \}

  \},

  "required": \[

    "task\_id",

    "file\_name",

    "file\_url",

    "file\_type"

  \]

\}
