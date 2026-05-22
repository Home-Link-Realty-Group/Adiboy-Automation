# dialqueue

Source: dialqueue.docx

import twilio from 'npm:twilio@4\.19\.0';

const queues = new Map\(\);

Deno\.serve\(async \(req\) => \{

  const \{ action, queueId, leads, twimlUrl, disposition \} = await req\.json\(\);

  const accountSid = Deno\.env\.get\('TWILIO\_ACCOUNT\_SID'\);

  const authToken = Deno\.env\.get\('TWILIO\_AUTH\_TOKEN'\);

  if \(\!accountSid || \!authToken\) return Response\.json\(\{ error: 'Twilio not configured' \}, \{ status: 500 \}\);

  const client = twilio\(accountSid, authToken\);

  // START dialing

  if \(action === 'start'\) \{

    if \(\!leads || \!twimlUrl\) return Response\.json\(\{ error: 'leads and twimlUrl required' \}, \{ status: 400 \}\);

    const id = Math\.random\(\)\.toString\(36\)\.slice\(2\);

    queues\.set\(id, \{ leads, twimlUrl, idx: 0, paused: false, results: \[\], dialing: false \}\);

    return Response\.json\(\{ queueId: id, totalLeads: leads\.length \}\);

  \}

  const queue = queues\.get\(queueId\);

  if \(\!queue\) return Response\.json\(\{ error: 'Queue not found' \}, \{ status: 404 \}\);

  // GET STATUS

  if \(action === 'status'\) \{

    const dialed = queue\.results\.filter\(r => r\.status === 'dialed'\)\.length;

    return Response\.json\(\{

      paused: queue\.paused,

      currentIdx: queue\.idx,

      totalLeads: queue\.leads\.length,

      dialed,

      results: queue\.results,

    \}\);

  \}

  // PAUSE

  if \(action === 'pause'\) \{

    queue\.paused = true;

    return Response\.json\(\{ status: 'paused' \}\);

  \}

  // RESUME

  if \(action === 'resume'\) \{

    queue\.paused = false;

    if \(\!queue\.dialing && queue\.idx < queue\.leads\.length\) \{

      dialNext\(queue, client, queueId\);

    \}

    return Response\.json\(\{ status: 'resumed' \}\);

  \}

  // DIAL NEXT

  if \(action === 'dialNext'\) \{

    if \(\!queue\.paused && queue\.idx < queue\.leads\.length && \!queue\.dialing\) \{

      dialNext\(queue, client, queueId\);

    \}

    const dialed = queue\.results\.filter\(r => r\.status === 'dialed'\)\.length;

    return Response\.json\(\{

      dialed,

      currentIdx: queue\.idx,

      totalLeads: queue\.leads\.length,

      paused: queue\.paused,

      done: queue\.idx >= queue\.leads\.length,

    \}\);

  \}

  // SET DISPOSITION

  if \(action === 'setDisposition'\) \{

    const result = queue\.results\.find\(r => r\.sid === disposition\.sid\);

    if \(result\) \{

      result\.disposition = disposition\.value;

      result\.notes = disposition\.notes || '';

    \}

    return Response\.json\(\{ updated: true \}\);

  \}

  // STOP / CLEANUP

  if \(action === 'stop'\) \{

    queues\.delete\(queueId\);

    return Response\.json\(\{ stopped: true \}\);

  \}

  return Response\.json\(\{ error: 'Unknown action' \}, \{ status: 400 \}\);

\}\);

async function dialNext\(queue, client, queueId\) \{

  if \(queue\.paused || queue\.idx >= queue\.leads\.length\) return;

  queue\.dialing = true;

  const lead = queue\.leads\[queue\.idx\];

  try \{

    const call = await client\.calls\.create\(\{

      from: '\+19729941658',

      to: lead\.phone,

      url: queue\.twimlUrl,

    \}\);

    queue\.results\.push\(\{

      name: lead\.name,

      phone: lead\.phone,

      status: 'dialed',

      sid: call\.sid,

      disposition: null,

      notes: '',

    \}\);

  \} catch \(err\) \{

    queue\.results\.push\(\{

      name: lead\.name,

      phone: lead\.phone,

      status: 'failed',

      error: err\.message,

      disposition: 'error',

    \}\);

  \}

  queue\.idx\+\+;

  queue\.dialing = false;

  await new Promise\(r => setTimeout\(r, 2500\)\);

\}
