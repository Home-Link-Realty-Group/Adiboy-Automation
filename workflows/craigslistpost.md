# craigslistpost

Source: craigslistpost.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

Deno\.serve\(async \(req\) => \{

  try \{

    const base44 = createClientFromRequest\(req\);

    const user = await base44\.auth\.me\(\);

    if \(\!user?\.role \!== 'admin'\) \{

      return Response\.json\(\{ error: 'Admin only' \}, \{ status: 403 \}\);

    \}

    const \{ title, body, account\_id, city \} = await req\.json\(\);

    if \(\!title || \!body || \!account\_id || \!city\) \{

      return Response\.json\(\{ error: 'Missing required fields' \}, \{ status: 400 \}\);

    \}

    // Get account

    const account = await base44\.entities\.CraigslistAccount\.get\(account\_id\);

    if \(\!account\) \{

      return Response\.json\(\{ error: 'Account not found' \}, \{ status: 404 \}\);

    \}

    // Check compliance

    if \(\(account\.posts\_this\_week || 0\) >= 4\) \{

      return Response\.json\(\{ error: 'Weekly post limit reached' \}, \{ status: 429 \}\);

    \}

    // Check last post time

    if \(account\.last\_post\_date\) \{

      const lastPost = new Date\(\`$\{account\.last\_post\_date\}T$\{account\.last\_post\_time\}\`\);

      const hoursSince = \(Date\.now\(\) \- lastPost\) / \(1000 \* 60 \* 60\);

      if \(hoursSince < 12\) \{

        return Response\.json\(\{ error: \`Wait $\{Math\.ceil\(12 \- hoursSince\)\}h between posts\` \}, \{ status: 429 \}\);

      \}

    \}

    // STUB: Post to Craigslist via their form

    // In production, you'd use Puppeteer or Playwright to automate form submission

    const craigslistUrl = \`https://$\{city\}\.craigslist\.org/\`; // Placeholder

    // Record post

    const post = await base44\.entities\.CraigslistPost\.create\(\{

      title,

      body,

      account\_id,

      city,

      status: 'posted',

      posted\_date: new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\],

      posted\_time: new Date\(\)\.toLocaleTimeString\('en\-US', \{ hour12: false, hour: '2\-digit', minute: '2\-digit' \}\),

      craigslist\_url: craigslistUrl,

      expires\_date: new Date\(Date\.now\(\) \+ 30 \* 24 \* 60 \* 60 \* 1000\)\.toISOString\(\)\.split\('T'\)\[0\],

      repost\_eligible\_date: new Date\(Date\.now\(\) \+ 48 \* 60 \* 60 \* 1000\)\.toISOString\(\)\.split\('T'\)\[0\],

    \}\);

    // Update account

    await base44\.entities\.CraigslistAccount\.update\(account\_id, \{

      last\_post\_date: new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\],

      last\_post\_time: new Date\(\)\.toLocaleTimeString\('en\-US', \{ hour12: false, hour: '2\-digit', minute: '2\-digit' \}\),

      posts\_this\_week: \(account\.posts\_this\_week || 0\) \+ 1,

    \}\);

    return Response\.json\(\{

      success: true,

      post\_id: post\.id,

      message: 'Post recorded\. Manual submission required or automation setup\.',

    \}\);

  \} catch \(error\) \{

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
