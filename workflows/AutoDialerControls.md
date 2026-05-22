# AutoDialerControls

Source: AutoDialerControls.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

import twilio from 'npm:twilio@4\.19\.0';

const dialState = \{ isPaused: false, isRunning: false, idx: 0, leads: \[\], results: \[\] \};

Deno\.serve\(async \(req\) => \{

  try \{

    const base44 = createClientFromRequest\(req\);

    const user = await base44\.auth\.me\(\);

    if \(\!user\) return Response\.json\(\{ error: 'Unauthorized' \}, \{ status: 401 \}\);

    const \{ action, sheetId, range \} = await req\.json\(\);

    const accountSid = Deno\.env\.get\('TWILIO\_ACCOUNT\_SID'\);

    const authToken = Deno\.env\.get\('TWILIO\_AUTH\_TOKEN'\);

    if \(\!accountSid || \!authToken\) return Response\.json\(\{ error: 'Twilio missing' \}, \{ status: 500 \}\);

    const client = twilio\(accountSid, authToken\);

    // START \- fetch sheet

    if \(action === 'start' && sheetId\) \{

      let token;

      try \{

        const conn = await base44\.asServiceRole\.connectors\.getCurrentAppUserConnection\('69d2109b51038503faec5cfa'\);

        token = conn\.accessToken;

      \} catch \{ return Response\.json\(\{ error: 'Sheets not connected' \}, \{ status: 401 \}\); \}

      const res = await fetch\(\`https://sheets\.googleapis\.com/v4/spreadsheets/$\{sheetId\}/values/$\{range || 'Sheet1\!A:C'\}\`, \{

        headers: \{ 'Authorization': \`Bearer $\{token\}\` \}

      \}\);

      const data = await res\.json\(\);

      const rows = data\.values || \[\];

      if \(rows\.length < 2\) return Response\.json\(\{ error: 'No leads' \}, \{ status: 400 \}\);

      const h = rows\[0\];

      const nIdx = h\.indexOf\('name'\);

      const pIdx = h\.indexOf\('phone'\);

      if \(nIdx === \-1 || pIdx === \-1\) return Response\.json\(\{ error: 'Missing name/phone' \}, \{ status: 400 \}\);

      dialState\.leads = rows\.slice\(1\)\.map\(r => \(\{ name: r\[nIdx\] || 'Lead', phone: r\[pIdx\] \}\)\)\.filter\(l => l\.phone\);

      dialState\.idx = 0;

      dialState\.results = \[\];

      dialState\.isRunning = true;

      dialState\.isPaused = false;

      return Response\.json\(\{ status: 'started', total: dialState\.leads\.length \}\);

    \}

    // PAUSE

    if \(action === 'pause'\) \{

      dialState\.isPaused = true;

      return Response\.json\(\{ status: 'paused' \}\);

    \}

    // RESUME

    if \(action === 'resume'\) \{

      dialState\.isPaused = false;

      return Response\.json\(\{ status: 'resumed' \}\);

    \}

    // STOP

    if \(action === 'stop'\) \{

      dialState\.isRunning = false;

      dialState\.isPaused = false;

      const ok = dialState\.results\.filter\(r => r\.s === 'ok'\)\.length;

      return Response\.json\(\{ status: 'stopped', success: ok, total: dialState\.idx, results: dialState\.results \}\);

    \}

    // DIAL NEXT

    if \(action === 'dialNext'\) \{

      if \(\!dialState\.isRunning || dialState\.isPaused || dialState\.idx >= dialState\.leads\.length\) \{

        return Response\.json\(\{ status: dialState\.isPaused ? 'paused' : 'idle' \}\);

      \}

      const lead = dialState\.leads\[dialState\.idx\];

      try \{

        const call = await client\.calls\.create\(\{

          from: '\+19729941658',

          to: lead\.phone,

          twiml: \`<Response><Say voice="alice">Hi $\{lead\.name\}, this is Home\-Link Realty calling about your property\. Press 1 to speak with us\.</Say><Gather numDigits="1" timeout="5"/></Response>\`,

        \}\);

        dialState\.results\.push\(\{ name: lead\.name, phone: lead\.phone, s: 'ok' \}\);

      \} catch \(e\) \{

        dialState\.results\.push\(\{ name: lead\.name, phone: lead\.phone, s: 'fail', err: e\.message \}\);

      \}

      dialState\.idx\+\+;

      await new Promise\(r => setTimeout\(r, 3000\)\);

      return Response\.json\(\{ status: 'dialed', idx: dialState\.idx, total: dialState\.leads\.length, ok: dialState\.results\.filter\(r => r\.s === 'ok'\)\.length \}\);

    \}

    // STATUS

    if \(action === 'status'\) \{

      return Response\.json\(\{ isRunning: dialState\.isRunning, isPaused: dialState\.isPaused, idx: dialState\.idx, total: dialState\.leads\.length, ok: dialState\.results\.filter\(r => r\.s === 'ok'\)\.length, results: dialState\.results \}\);

    \}

    return Response\.json\(\{ error: 'Unknown action' \}, \{ status: 400 \}\);

  \} catch \(error\) \{

    console\.error\('Error:', error\.message\);

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
