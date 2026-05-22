# Auto15TouchFollowUp

Source: Auto15TouchFollowUp.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

/\*\*

 \* Automated 15\-touch follow\-up sequence

 \* Triggered by entity automation on Lead create/update

 \* Creates FollowUp records based on touch count and timing rules

 \*/

Deno\.serve\(async \(req\) => \{

  try \{

    const base44 = createClientFromRequest\(req\);

    let body;

    try \{

      body = await req\.json\(\);

    \} catch \{

      return Response\.json\(\{ error: 'Invalid JSON body' \}, \{ status: 400 \}\);

    \}

    const \{ event, data: lead \} = body;

    if \(\!event || \!lead\) \{

      return Response\.json\(\{ error: 'event and data are required' \}, \{ status: 400 \}\);

    \}

    // Only process active leads

    if \(\['Dead', 'Closed', 'Inactive'\]\.includes\(lead\.status\)\) \{

      return Response\.json\(\{ skipped: true, reason: 'Lead is inactive/dead/closed' \}\);

    \}

    const touchCount = \(lead\.touch\_count || 0\) \+ 1;

    const today = new Date\(\);

    // 15\-touch sequence timing

    const touchDays = \[0, 2, 3, 7, 10, 14, 21, 30, 45, 60, 75, 90, 120, 150, 180\];

    const delayDays = touchDays\[Math\.min\(touchCount \- 1, touchDays\.length \- 1\)\];

    const scheduledDate = new Date\(today\);

    scheduledDate\.setDate\(scheduledDate\.getDate\(\) \+ delayDays\);

    // Alternate touch methods

    const methods = \['Call', 'SMS', 'Email', 'Call', 'SMS', 'Voicemail', 'Call', 'SMS', 'Email', 'Call', 'SMS', 'Email', 'Call', 'SMS', 'Email'\];

    const method = methods\[Math\.min\(touchCount \- 1, methods\.length \- 1\)\];

    // Script templates by stage

    const scriptMap = \{

      'Call': 'Hi \{name\}, this is Jacob with Home\-Link\. Following up on your property at \{address\}\. Still interested in a cash offer?',

      'SMS': 'Hi \{name\} — Jacob from Home\-Link\. Just checking in on \{address\}\. Still open to a cash offer? \(855\) 810\-1786',

      'Email': 'Subject: \{address\} — Cash Offer Still Available\\n\\nHi \{name\}, just a quick follow\-up\.\.\.',

      'Voicemail': 'Hi \{name\}, Jacob Levy with Home\-Link — just leaving a quick message about your property\. Call me at \(855\) 810\-1786\.',

    \};

    const script = \(scriptMap\[method\] || scriptMap\['Call'\]\)

      \.replace\('\{name\}', lead\.name || 'there'\)

      \.replace\(/\{address\}/g, lead\.address || 'your property'\);

    // Check for existing future follow\-up before creating

    const existing = await base44\.asServiceRole\.entities\.FollowUp\.filter\(\{

      lead\_id: lead\.id,

      status: 'Scheduled',

    \}\);

    const hasFutureFU = \(existing || \[\]\)\.some\(

      \(f\) => f\.scheduled\_date >= today\.toISOString\(\)\.split\('T'\)\[0\]

    \);

    if \(hasFutureFU\) \{

      return Response\.json\(\{ skipped: true, reason: 'Future follow\-up already exists' \}\);

    \}

    await base44\.asServiceRole\.entities\.FollowUp\.create\(\{

      lead\_id: lead\.id,

      lead\_name: lead\.name || '',

      lead\_phone: lead\.phone || '',

      touch\_number: touchCount,

      scheduled\_date: scheduledDate\.toISOString\(\)\.split\('T'\)\[0\],

      method,

      script\_template: script,

      status: 'Scheduled',

    \}\);

    return Response\.json\(\{

      success: true,

      touchNumber: touchCount,

      method,

      scheduledDate: scheduledDate\.toISOString\(\)\.split\('T'\)\[0\],

    \}\);

  \} catch \(error\) \{

    console\.error\('auto15TouchFollowUp error:', error\);

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
