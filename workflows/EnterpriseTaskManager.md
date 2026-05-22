# EnterpriseTaskManager

Source: EnterpriseTaskManager.docx

\{

  "name": "EnterpriseTask",

  "type": "object",

  "properties": \{

    "title": \{

      "type": "string",

      "description": "Task title"

    \},

    "description": \{

      "type": "string",

      "description": "Detailed task description"

    \},

    "priority": \{

      "type": "string",

      "enum": \[

        "critical",

        "high",

        "medium",

        "low"

      \],

      "default": "medium",

      "description": "Task priority level"

    \},

    "status": \{

      "type": "string",

      "enum": \[

        "planned",

        "in\_progress",

        "completed",

        "blocked"

      \],

      "default": "planned",

      "description": "Task status"

    \},

    "category": \{

      "type": "string",

      "enum": \[

        "sales",

        "operations",

        "marketing",

        "finance",

        "admin",

        "crm",

        "follow\_up",

        "closing",

        "partnership",

        "development"

      \],

      "description": "Task category"

    \},

    "scheduled\_date": \{

      "type": "string",

      "format": "date",

      "description": "Date task is scheduled for"

    \},

    "scheduled\_time": \{

      "type": "string",

      "description": "Time task is scheduled \(HH:MM format\)"

    \},

    "duration\_minutes": \{

      "type": "number",

      "default": 30,

      "description": "Estimated duration in minutes"

    \},

    "due\_date": \{

      "type": "string",

      "format": "date",

      "description": "Task due date"

    \},

    "assigned\_to": \{

      "type": "string",

      "description": "Person assigned \(team member\)"

    \},

    "linked\_entity": \{

      "type": "string",

      "description": "Reference to related entity \(lead\_id, deal\_id, etc\.\)"

    \},

    "linked\_entity\_type": \{

      "type": "string",

      "enum": \[

        "lead",

        "deal",

        "buyer",

        "referral",

        "campaign"

      \],

      "description": "Type of linked entity"

    \},

    "dependencies": \{

      "type": "string",

      "description": "Task IDs this task depends on \(comma\-separated\)"

    \},

    "recurring": \{

      "type": "string",

      "enum": \[

        "none",

        "daily",

        "weekly",

        "biweekly",

        "monthly"

      \],

      "default": "none",

      "description": "Recurrence pattern"

    \},

    "tags": \{

      "type": "string",

      "description": "Comma\-separated tags for filtering"

    \},

    "notes": \{

      "type": "string",

      "description": "Additional notes or context"

    \},

    "completion\_percentage": \{

      "type": "number",

      "default": 0,

      "description": "Progress percentage \(0\-100\)"

    \},

    "completed\_at": \{

      "type": "string",

      "description": "ISO timestamp when task was completed"

    \},

    "urgency\_score": \{

      "type": "number",

      "description": "Auto\-calculated urgency \(0\-100\)"

    \},

    "subtasks": \{

      "type": "array",

      "description": "Array of subtasks",

      "items": \{

        "type": "object",

        "properties": \{

          "id": \{

            "type": "string"

          \},

          "name": \{

            "type": "string"

          \},

          "completed": \{

            "type": "boolean",

            "default": false

          \}

        \}

      \},

      "default": \[\]

    \},

    "list\_id": \{

      "type": "string",

      "description": "Reference to parent List entity \(optional\)"

    \}

  \},

  "required": \[

    "title",

    "scheduled\_date"

  \]

\}
