# AnalyzeAgentPerformance

Source: AnalyzeAgentPerformance.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

/\*\*

 \* analyzeAgentPerformance — Real\-time call coaching

 \* Analyzes agent speech patterns: tone, pace, script adherence, emotion

 \*/

Deno\.serve\(async \(req\) => \{

  if \(req\.method \!== 'POST'\) return Response\.json\(\{ error: 'POST required' \}, \{ status: 405 \}\);

  try \{

    const base44 = createClientFromRequest\(req\);

    const user = await base44\.auth\.me\(\);

    if \(\!user\) return Response\.json\(\{ error: 'Unauthorized' \}, \{ status: 401 \}\);

    const \{ transcript, callDuration, scriptTemplate, leadName \} = await req\.json\(\);

    if \(\!transcript || typeof transcript \!== 'string'\) \{

      return Response\.json\(\{ error: 'transcript string required' \}, \{ status: 400 \}\);

    \}

    const prompt = \`You are an elite cold calling coach analyzing an agent's live call performance\.

AGENT TRANSCRIPT \(what the agent said\):

"""

$\{transcript\}

"""

$\{scriptTemplate ? \`EXPECTED SCRIPT:\\n$\{scriptTemplate\}\\n\` : ''\}

Call Duration: $\{callDuration || 0\}s

Lead Name: $\{leadName || 'Unknown'\}

ANALYZE THE AGENT and respond with JSON:

\{

  "tone": "confident|friendly|pushy|uncertain|authentic",

  "tone\_score": 0\-100,

  "pace": "too\_fast|too\_slow|perfect",

  "pace\_score": 0\-100,

  "script\_adherence": 0\-100,

  "energy\_level": "low|medium|high",

  "engagement": "passive|moderate|excellent",

  "call\_quality\_score": 0\-100,

  "strengths": \["strength1", "strength2"\],

  "improvements": \[

    \{

      "area": "tone|pace|script|engagement|closing",

      "feedback": "specific actionable feedback",

      "example": "instead of X, try Y"

    \}

  \],

  "next\_best\_action": "what agent should focus on next \(30 words max\)"

\}

Be direct and constructive\. Agent is live on call\.\`;

    const analysis = await base44\.integrations\.Core\.InvokeLLM\(\{

      prompt,

      response\_json\_schema: \{

        type: 'object',

        properties: \{

          tone: \{ type: 'string' \},

          tone\_score: \{ type: 'number' \},

          pace: \{ type: 'string' \},

          pace\_score: \{ type: 'number' \},

          script\_adherence: \{ type: 'number' \},

          energy\_level: \{ type: 'string' \},

          engagement: \{ type: 'string' \},

          call\_quality\_score: \{ type: 'number' \},

          strengths: \{ type: 'array', items: \{ type: 'string' \} \},

          improvements: \{

            type: 'array',

            items: \{

              type: 'object',

              properties: \{

                area: \{ type: 'string' \},

                feedback: \{ type: 'string' \},

                example: \{ type: 'string' \}

              \}

            \}

          \},

          next\_best\_action: \{ type: 'string' \}

        \}

      \}

    \}\);

    return Response\.json\(\{

      ok: true,

      coaching: analysis || \{\},

      timestamp: new Date\(\)\.toISOString\(\),

    \}\);

  \} catch \(error\) \{

    console\.error\('analyzeAgentPerformance error:', error\);

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
