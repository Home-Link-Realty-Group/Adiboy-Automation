# Stripe

Source: Stripe.docx

\{

  "name": "ConnectedAccount",

  "type": "object",

  "properties": \{

    "user\_email": \{

      "type": "string",

      "description": "Email of the user \(platform user\) who owns this connected account"

    \},

    "stripe\_account\_id": \{

      "type": "string",

      "description": "Stripe V2 connected account ID \(acct\_\.\.\.\)"

    \},

    "display\_name": \{

      "type": "string",

      "description": "Business / display name shown on the connected account"

    \},

    "contact\_email": \{

      "type": "string",

      "description": "Contact email registered with Stripe for this account"

    \},

    "country": \{

      "type": "string",

      "default": "us"

    \},

    "subscription\_status": \{

      "type": "string",

      "description": "Latest Stripe subscription status from webhook \(active, past\_due, canceled, etc\.\)"

    \},

    "subscription\_id": \{

      "type": "string",

      "description": "Stripe subscription ID for the platform subscription this account holds"

    \},

    "subscription\_price\_id": \{

      "type": "string",

      "description": "Price ID the account is subscribed to"

    \},

    "subscription\_current\_period\_end": \{

      "type": "string",

      "format": "date\-time"

    \},

    "notes": \{

      "type": "string"

    \}

  \},

  "required": \[

    "user\_email",

    "stripe\_account\_id"

  \]

\}
