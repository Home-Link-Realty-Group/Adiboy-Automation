# DocumentUpload

Source: DocumentUpload.docx

{

  "name": "DocumentUpload",

  "type": "object",

  "properties": {

    "task_id": {

      "type": "string",

      "description": "Related task ID"

    },

    "file_name": {

      "type": "string",

      "description": "Original file name"

    },

    "file_url": {

      "type": "string",

      "description": "Uploaded file URL"

    },

    "file_type": {

      "type": "string",

      "description": "File MIME type (pdf, doc, image, etc.)"

    },

    "file_size": {

      "type": "number",

      "description": "File size in bytes"

    },

    "uploaded_at": {

      "type": "string",

      "format": "date-time",

      "description": "Upload timestamp"

    },

    "description": {

      "type": "string",

      "maxLength": 1000,

      "description": "Optional description"

    }

  },

  "required": [

    "task_id",

    "file_name",

    "file_url",

    "file_type"

  ]

}
