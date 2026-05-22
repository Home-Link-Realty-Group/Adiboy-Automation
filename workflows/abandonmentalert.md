# abandonmentalert

Source: abandonmentalert.docx

/\*\*

 \* Abandonment Alert Monitor

 \* Detects high abandonment rates and triggers alerts

 \* Sends Slack/email notifications when threshold exceeded

 \*/

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

const ABANDONMENT\_THRESHOLD = 0\.15; // 15% abandonment rate

const MIN\_CALLS\_TO\_ALERT = 20; // Need at least 20 calls to trigger

const ALERT\_COOLDOWN\_MINUTES = 30; // Don't spam more than once per 30 min

let lastAlertTime = \{\};

/\*\*

 \* Check abandonment rate and send alert if needed

 \*/

async function checkAbandonmentRate\(base44\) \{

  try \{

    // Fetch recent calls \(last 2 hours\)

    const twoHoursAgo = new Date\(Date\.now\(\) \- 2 \* 60 \* 60 \* 1000\)\.toISOString\(\);

    const recentCalls = await base44\.entities\.CallRecording\.filter\(\{\}\);

    

    const recentCallsFiltered = recentCalls\.filter\(c => 

      new Date\(c\.called\_at\) >= new Date\(twoHoursAgo\)

    \);

    if \(recentCallsFiltered\.length < MIN\_CALLS\_TO\_ALERT\) \{

      return \{ hasAlert: false, reason: 'Insufficient call volume' \};

    \}

    // Count abandoned calls \(under 5 seconds\)

    const abandonedCalls = recentCallsFiltered\.filter\(c => \(c\.duration\_sec || 0\) < 5\)\.length;

    const abandonmentRate = abandonedCalls / recentCallsFiltered\.length;

    if \(abandonmentRate > ABANDONMENT\_THRESHOLD\) \{

      const now = Date\.now\(\);

      const lastAlert = lastAlertTime\['abandonment'\] || 0;

      

      // Check cooldown

      if \(now \- lastAlert < ALERT\_COOLDOWN\_MINUTES \* 60 \* 1000\) \{

        return \{ 

          hasAlert: true, 

          triggered: false, 

          reason: 'In cooldown period' 

        \};

      \}

      // Send alert

      lastAlertTime\['abandonment'\] = now;

      await base44\.integrations\.Core\.SendEmail\(\{

        to: 'manager@company\.com', // Replace with manager email

        subject: \`⚠️ High Call Abandonment Alert: $\{\(abandonmentRate \* 100\)\.toFixed\(1\)\}%\`,

        body: \`

          <h2>⚠️ Call Abandonment Alert</h2>

          <p><strong>Abandonment Rate:</strong> $\{\(abandonmentRate \* 100\)\.toFixed\(1\)\}%</p>

          <p><strong>Abandoned Calls:</strong> $\{abandonedCalls\} / $\{recentCallsFiltered\.length\}</p>

          <p><strong>Time Period:</strong> Last 2 hours</p>

          <p><strong>Recommended Action:</strong></p>

          <ul>

            <li>Check phone line quality</li>

            <li>Review greeting message clarity</li>

            <li>Verify Twilio connection status</li>

            <li>Check for system latency issues</li>

          </ul>

        \`,

      \}\);

      // Also send Slack notification if integrated

      // await notifySlack\(abandonmentRate, abandonedCalls\);

      return \{

        hasAlert: true,

        triggered: true,

        abandonmentRate: \(abandonmentRate \* 100\)\.toFixed\(1\),

        abandonedCalls,

        totalCalls: recentCallsFiltered\.length,

      \};

    \}

    return \{ hasAlert: false, abandonment: \(abandonmentRate \* 100\)\.toFixed\(1\) \};

  \} catch \(error\) \{

    console\.error\('Abandonment check error:', error\);

    return \{ error: error\.message \};

  \}

\}

/\*\*

 \* Get hourly abandonment trend

 \*/

async function getAbandonmentTrend\(base44, hours = 24\) \{

  try \{

    const allCalls = await base44\.entities\.CallRecording\.list\('\-called\_at', 1000\);

    const cutoffTime = new Date\(Date\.now\(\) \- hours \* 60 \* 60 \* 1000\);

    const hourlyData = \{\};

    for \(let i = 0; i < hours; i\+\+\) \{

      const hour = String\(i\)\.padStart\(2, '0'\) \+ ':00';

      hourlyData\[hour\] = \{ total: 0, abandoned: 0, rate: 0 \};

    \}

    allCalls

      \.filter\(c => new Date\(c\.called\_at\) >= cutoffTime\)

      \.forEach\(c => \{

        const hour = new Date\(c\.called\_at\)\.getHours\(\);

        const hourStr = String\(hour\)\.padStart\(2, '0'\) \+ ':00';

        if \(hourlyData\[hourStr\]\) \{

          hourlyData\[hourStr\]\.total \+= 1;

          if \(\(c\.duration\_sec || 0\) < 5\) \{

            hourlyData\[hourStr\]\.abandoned \+= 1;

          \}

        \}

      \}\);

    // Calculate rates

    const trend = Object\.entries\(hourlyData\)

      \.map\(\(\[hour, data\]\) => \(\{

        hour,

        \.\.\.data,

        rate: data\.total > 0 ? \(\(data\.abandoned / data\.total\) \* 100\)\.toFixed\(1\) : 0,

      \}\)\);

    return \{ success: true, trend \};

  \} catch \(error\) \{

    console\.error\('Trend error:', error\);

    return \{ error: error\.message \};

  \}

\}

/\*\*

 \* Main handler

 \*/

Deno\.serve\(async \(req\) => \{

  try \{

    const base44 = createClientFromRequest\(req\);

    const user = await base44\.auth\.me\(\);

    if \(\!user\) \{

      return Response\.json\(\{ error: 'Unauthorized' \}, \{ status: 401 \}\);

    \}

    const url = new URL\(req\.url\);

    const path = url\.pathname;

    // GET /checkAbandonment

    if \(path\.includes\('/checkAbandonment'\) && req\.method === 'GET'\) \{

      const result = await checkAbandonmentRate\(base44\);

      return Response\.json\(result\);

    \}

    // GET /getAbandonmentTrend?hours=24

    if \(path\.includes\('/getAbandonmentTrend'\) && req\.method === 'GET'\) \{

      const hours = parseInt\(url\.searchParams\.get\('hours'\) || '24'\);

      const result = await getAbandonmentTrend\(base44, hours\);

      return Response\.json\(result\);

    \}

    return Response\.json\(\{ error: 'Invalid endpoint' \}, \{ status: 404 \}\);

  \} catch \(error\) \{

    console\.error\('Function error:', error\);

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
