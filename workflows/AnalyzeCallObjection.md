# AnalyzeCallObjection

Source: AnalyzeCallObjection.docx

/\*\*

 \* analyzeCallObjection — Real\-time LLM analysis of call transcript

 \* Detects objections from prospect speech and returns talking points for agent

 \*/

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

Deno\.serve\(async \(req\) => \{

  if \(req\.method \!== 'POST'\) return Response\.json\(\{ error: 'POST required' \}, \{ status: 405 \}\);

  try \{

    const base44 = createClientFromRequest\(req\);

    const user = await base44\.auth\.me\(\);

    if \(\!user\) return Response\.json\(\{ error: 'Unauthorized' \}, \{ status: 401 \}\);

    const \{ transcript, callDuration, leadName, leadProperty \} = await req\.json\(\);

    if \(\!transcript || typeof transcript \!== 'string'\) \{

      return Response\.json\(\{ error: 'transcript string required' \}, \{ status: 400 \}\);

    \}

    // Use InvokeLLM to analyze prospect speech for objections

    const prompt = \`You are a real estate cold calling coach analyzing a live call transcript\.

Lead Name: $\{leadName || 'Unknown'\}

Property: $\{leadProperty || 'Not specified'\}

Call Duration: $\{callDuration || 0\}s

PROSPECT'S LAST MESSAGE:

"""

$\{transcript\}

"""

ANALYZE THIS AND RESPOND WITH JSON:

\{

  "objection\_detected": boolean,

  "objection\_type": string \(e\.g\., "price", "timing", "authority", "need", "trust", "not\_interested", "no\_objection"\),

  "prospect\_concern": string \(1\-sentence summary of their concern\),

  "urgency": "low" | "medium" | "high",

  "talking\_points": \[

    \{

      "point": "One specific talking point",

      "tone": "empathetic|aggressive|consultative"

    \}

  \],

  "suggested\_response": "What the agent should say next \(30 words max\)",

  "follow\_up\_question": "A question to dig deeper or redirect"

\}

Keep responses SHORT and ACTIONABLE\. Agent needs this in 2 seconds\.\`;

    const analysis = await base44\.integrations\.Core\.InvokeLLM\(\{

      prompt,

      response\_json\_schema: \{

        type: 'object',

        properties: \{

          objection\_detected: \{ type: 'boolean' \},

          objection\_type: \{ type: 'string' \},

          prospect\_concern: \{ type: 'string' \},

          urgency: \{ type: 'string', enum: \['low', 'medium', 'high'\] \},

          talking\_points: \{

            type: 'array',

            items: \{

              type: 'object',

              properties: \{

                point: \{ type: 'string' \},

                tone: \{ type: 'string', enum: \['empathetic', 'aggressive', 'consultative'\] \}

              \}

            \}

          \},

          suggested\_response: \{ type: 'string' \},

          follow\_up\_question: \{ type: 'string' \}

        \}

      \}

    \}\);

    return Response\.json\(\{

      ok: true,

      analysis: analysis || \{\},

      timestamp: new Date\(\)\.toISOString\(\),

    \}\);

  \} catch \(error\) \{

    console\.error\('analyzeCallObjection error:', error\);

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
