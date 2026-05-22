# AutoPosttoSocial

Source: AutoPosttoSocial.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

Deno\.serve\(async \(req\) => \{

  try \{

    const base44 = createClientFromRequest\(req\);

    const user = await base44\.auth\.me\(\);

    

    if \(\!user\) \{

      return Response\.json\(\{ error: 'Unauthorized' \}, \{ status: 401 \}\);

    \}

    const \{ headline, body, cta, hashtags, platforms, scheduledDate \} = await req\.json\(\);

    if \(\!headline || \!body || \!platforms || platforms\.length === 0\) \{

      return Response\.json\(\{ error: 'Missing required fields' \}, \{ status: 400 \}\);

    \}

    const fullText = \`$\{headline\}\\n\\n$\{body\}\\n\\n$\{cta\}\\n\\n$\{hashtags\.join\(' '\)\}\`;

    const results = \{\};

    // FACEBOOK

    if \(platforms\.includes\('Facebook'\)\) \{

      try \{

        const facebookResult = await postToFacebook\(fullText, headline\);

        results\.facebook = facebookResult;

      \} catch \(e\) \{

        results\.facebook = \{ error: e\.message \};

      \}

    \}

    // X \(TWITTER\)

    if \(platforms\.includes\('X \(Twitter\)'\)\) \{

      try \{

        const xResult = await postToX\(fullText\);

        results\.x = xResult;

      \} catch \(e\) \{

        results\.x = \{ error: e\.message \};

      \}

    \}

    // CRAIGSLIST

    if \(platforms\.includes\('Craigslist'\)\) \{

      try \{

        const craigslistResult = await postToCraigslist\(headline, body, cta\);

        results\.craigslist = craigslistResult;

      \} catch \(e\) \{

        results\.craigslist = \{ error: e\.message \};

      \}

    \}

    return Response\.json\(\{ success: true, posted: results \}\);

  \} catch \(error\) \{

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);

async function postToFacebook\(content, title\) \{

  // Uses Meta Facebook Instagram connector \(id: 69df3bb81c5fadb4a0d33a7a\)

  // Requires: Facebook Page token & API access

  // STUB: Returns what would be posted

  return \{

    platform: 'Facebook',

    status: 'queued',

    content: content\.substring\(0, 500\),

    message: 'Post queued for Facebook\. Requires connected Meta account to auto\-post\.',

  \};

\}

async function postToX\(content\) \{

  // Posts to X/Twitter

  // Requires: X API credentials in secrets

  // STUB: Returns what would be posted

  return \{

    platform: 'X \(Twitter\)',

    status: 'queued',

    content: content\.substring\(0, 280\), // X character limit

    message: 'Post queued for X\. Requires X API credentials\.',

  \};

\}

async function postToCraigslist\(headline, body, cta\) \{

  // Craigslist requires manual posting via their platform

  // STUB: Generates HTML form for manual posting

  return \{

    platform: 'Craigslist',

    status: 'manual',

    html\_form: \`

      <form action="https://craigslist\.org/post" method="POST">

        <input name="title" value="$\{headline\}" />

        <textarea name="body">$\{body\}\\n\\n$\{cta\}</textarea>

        <input type="submit" value="Post to Craigslist" />

      </form>

    \`,

    message: 'Craigslist requires manual posting\. Use the form above to submit\.',

  \};

\}
