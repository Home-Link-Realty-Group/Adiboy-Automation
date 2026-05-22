# Call WebHook

Source: Call WebHook.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

/\*\*

 \* callStatusWebhook — Twilio statusCallback webhook

 \* Updates call duration and outcome, syncs to Google Sheet

 \*/

Deno\.serve\(async \(req\) => \{

  if \(req\.method \!== 'POST'\) return new Response\('OK', \{ status: 200 \}\);

  try \{

    const url = new URL\(req\.url\);

    const callDbId = url\.searchParams\.get\('callDbId'\);

    const leadPhone = url\.searchParams\.get\('leadPhone'\);

    // Parse Twilio form\-encoded body

    const formData = await req\.formData\(\);

    const callStatus = formData\.get\('CallStatus'\) || '';

    const callDuration = parseInt\(formData\.get\('CallDuration'\) || '0', 10\);

    const callSid = formData\.get\('CallSid'\) || '';

    console\.log\(\`\[$\{callSid\}\] status=$\{callStatus\} duration=$\{callDuration\}s phone=$\{leadPhone\}\`\);

    const base44 = createClientFromRequest\(req\);

    // Update call record

    if \(callDbId\) \{

      try \{

        const updateData = \{

          outcome: callStatus,

          duration\_sec: callDuration,

        \};

        if \(callStatus === 'completed'\) \{

          updateData\.notes = \`Call completed: $\{callDuration\}s\`;

        \}

        await base44\.asServiceRole\.entities\.CallRecording\.update\(callDbId, updateData\);

        console\.log\(\`Updated CallRecording $\{callDbId\}\`\);

      \} catch \(e\) \{

        console\.warn\('CallRecording update failed:', e\.message\);

      \}

    \}

    // Sync to Google Sheet \(Apps Script endpoint\)

    const sheetSyncUrl = Deno\.env\.get\('APPS\_SCRIPT\_URL'\);

    if \(sheetSyncUrl && leadPhone\) \{

      try \{

        const syncRes = await fetch\(sheetSyncUrl, \{

          method: 'POST',

          headers: \{ 'Content\-Type': 'application/json' \},

          body: JSON\.stringify\(\{

            action: 'logCall',

            leadPhone,

            status: callStatus,

            duration: callDuration,

            timestamp: new Date\(\)\.toISOString\(\),

          \}\),

        \}\);

        console\.log\(\`Sheet sync response: $\{syncRes\.status\}\`\);

      \} catch \(e\) \{

        console\.warn\('Sheet sync failed:', e\.message\);

      \}

    \}

    return new Response\('OK', \{ status: 200 \}\);

  \} catch \(error\) \{

    console\.error\('callStatusWebhook error:', error\);

    return new Response\('OK', \{ status: 200 \}\); // Always 200 to prevent Twilio retry loops

  \}

\}\);
