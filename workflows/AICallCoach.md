# AICallCoach

Source: AICallCoach.docx

/\*\*

 \* AI Call Coach

 \* Real\-time transcription analysis, sentiment detection, tone feedback,

 \* objection handling suggestions, and follow\-up scheduling

 \*/

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

/\*\*

 \* Analyze call transcript for coaching insights

 \*/

async function analyzeCallTranscript\(base44, transcript, leadInfo\) \{

  try \{

    const response = await base44\.integrations\.Core\.InvokeLLM\(\{

      model: 'gpt\_5\_mini',

      prompt: \`

You are an expert sales call coach analyzing a real estate agent's call\. Analyze this transcript and provide actionable coaching feedback\.

CALL TRANSCRIPT:

$\{transcript\}

LEAD INFO:

Name: $\{leadInfo\.name\}

Phone: $\{leadInfo\.phone\}

Situation: $\{leadInfo\.situation\}

Provide analysis in this exact JSON format:

\{

  "sentiment": "positive|neutral|negative",

  "sentimentScore": 0\.0\-1\.0,

  "toneAssessment": \{

    "professionalism": "excellent|good|fair|poor",

    "empathy": "strong|moderate|weak",

    "confidence": "high|medium|low",

    "urgency": "appropriate|too\_high|too\_low"

  \},

  "scriptAdherence": \{

    "score": 0\-100,

    "strengths": \["specific observation 1", "specific observation 2"\],

    "gaps": \["missed opportunity 1", "missed opportunity 2"\]

  \},

  "objectionHandling": \{

    "identified": \["objection 1", "objection 2"\],

    "responseQuality": "excellent|good|fair|needs\_improvement",

    "suggestions": \[

      \{"objection": "objection text", "betterResponse": "recommended response"\},

    \]

  \},

  "keyMoments": \[

    \{"timestamp": "0:15", "event": "What happened and why it matters"\}

  \],

  "coachingPoints": \[

    "Point 1 to improve next call",

    "Point 2 to improve next call"

  \],

  "overallFeedback": "Summary of the call quality and main areas to focus on",

  "conversationFlow": "smooth|awkward|interrupted",

  "followUpQuality": "strong|weak|none"

\}

      \`,

      response\_json\_schema: \{

        type: 'object',

        properties: \{

          sentiment: \{ type: 'string' \},

          sentimentScore: \{ type: 'number' \},

          toneAssessment: \{

            type: 'object',

            properties: \{

              professionalism: \{ type: 'string' \},

              empathy: \{ type: 'string' \},

              confidence: \{ type: 'string' \},

              urgency: \{ type: 'string' \},

            \},

          \},

          scriptAdherence: \{

            type: 'object',

            properties: \{

              score: \{ type: 'number' \},

              strengths: \{ type: 'array', items: \{ type: 'string' \} \},

              gaps: \{ type: 'array', items: \{ type: 'string' \} \},

            \},

          \},

          objectionHandling: \{

            type: 'object',

            properties: \{

              identified: \{ type: 'array', items: \{ type: 'string' \} \},

              responseQuality: \{ type: 'string' \},

              suggestions: \{

                type: 'array',

                items: \{

                  type: 'object',

                  properties: \{

                    objection: \{ type: 'string' \},

                    betterResponse: \{ type: 'string' \},

                  \},

                \},

              \},

            \},

          \},

          coachingPoints: \{ type: 'array', items: \{ type: 'string' \} \},

          overallFeedback: \{ type: 'string' \},

          conversationFlow: \{ type: 'string' \},

          followUpQuality: \{ type: 'string' \},

        \},

      \},

    \}\);

    return response;

  \} catch \(error\) \{

    console\.error\('Transcript analysis error:', error\);

    throw error;

  \}

\}

/\*\*

 \* Generate live coaching feedback during call

 \*/

async function getLiveCoachingFeedback\(base44, partialTranscript, callDuration\) \{

  try \{

    // Provide quick feedback for agents mid\-call

    const response = await base44\.integrations\.Core\.InvokeLLM\(\{

      model: 'gpt\_5\_mini',

      prompt: \`

You are a real\-time sales call coach\. Based on this partial call transcript, provide immediate coaching feedback to help the agent improve RIGHT NOW\.

PARTIAL TRANSCRIPT \($\{callDuration\} seconds in\):

$\{partialTranscript\}

Provide quick, actionable feedback in JSON format:

\{

  "immediateAction": "What should the agent do RIGHT NOW in the next 10 seconds?",

  "toneNote": "Comment on current tone \- is it working?",

  "paceNote": "Is the agent talking too fast/slow?",

  "listenerEngagement": "Is the agent listening and adapting?",

  "scriptTrackStatus": "on\_track|drifting|off\_track",

  "nextSteps": "What should agent ask or say next to progress the call?"

\}

      \`,

      response\_json\_schema: \{

        type: 'object',

        properties: \{

          immediateAction: \{ type: 'string' \},

          toneNote: \{ type: 'string' \},

          paceNote: \{ type: 'string' \},

          listenerEngagement: \{ type: 'string' \},

          scriptTrackStatus: \{ type: 'string' \},

          nextSteps: \{ type: 'string' \},

        \},

      \},

    \}\);

    return response;

  \} catch \(error\) \{

    console\.error\('Live feedback error:', error\);

    return null;

  \}

\}

/\*\*

 \* Generate follow\-up recommendations based on call outcome

 \*/

async function generateFollowUpPlan\(base44, callNotes, outcome, leadInfo\) \{

  try \{

    const response = await base44\.integrations\.Core\.InvokeLLM\(\{

      model: 'gpt\_5\_mini',

      prompt: \`

You are a real estate follow\-up strategist\. Based on this call, create a personalized follow\-up plan\.

CALL OUTCOME: $\{outcome\}

LEAD: $\{leadInfo\.name\} \- $\{leadInfo\.situation\}

CALL NOTES: $\{callNotes\}

Generate a follow\-up plan in JSON format:

\{

  "nextTouchMethod": "call|sms|email|voicemail",

  "scheduleDaysFromNow": 1\-30,

  "suggestedTimeOfDay": "morning|afternoon|evening",

  "touchMessage": "What to say/write in the next touch",

  "secondaryTouchMethod": "call|sms|email|none",

  "secondaryScheduleDays": 3\-7,

  "hotLeadIndicators": \["indicator 1", "indicator 2"\],

  "timelineToClose": "immediate|1\-7 days|1\-2 weeks|1\+ month",

  "priorityScore": 1\-10,

  "assignmentRecommendation": "Keep with current agent|Escalate to manager|Transfer to specialist"

\}

      \`,

      response\_json\_schema: \{

        type: 'object',

        properties: \{

          nextTouchMethod: \{ type: 'string' \},

          scheduleDaysFromNow: \{ type: 'number' \},

          suggestedTimeOfDay: \{ type: 'string' \},

          touchMessage: \{ type: 'string' \},

          secondaryTouchMethod: \{ type: 'string' \},

          secondaryScheduleDays: \{ type: 'number' \},

          hotLeadIndicators: \{ type: 'array', items: \{ type: 'string' \} \},

          timelineToClose: \{ type: 'string' \},

          priorityScore: \{ type: 'number' \},

          assignmentRecommendation: \{ type: 'string' \},

        \},

      \},

    \}\);

    return response;

  \} catch \(error\) \{

    console\.error\('Follow\-up generation error:', error\);

    throw error;

  \}

\}

/\*\*

 \* Create automated follow\-up task in database

 \*/

async function createFollowUpTask\(base44, leadId, followUpPlan\) \{

  try \{

    const scheduleDate = new Date\(\);

    scheduleDate\.setDate\(scheduleDate\.getDate\(\) \+ followUpPlan\.scheduleDaysFromNow\);

    const followUp = await base44\.entities\.FollowUp\.create\(\{

      lead\_id: leadId,

      touch\_number: 1,

      scheduled\_date: scheduleDate\.toISOString\(\)\.split\('T'\)\[0\],

      method: followUpPlan\.nextTouchMethod,

      script\_template: followUpPlan\.touchMessage,

      status: 'Scheduled',

      next\_action: followUpPlan\.touchMessage,

    \}\);

    return \{ success: true, followUpId: followUp\.id, scheduledFor: scheduleDate \};

  \} catch \(error\) \{

    console\.error\('Follow\-up creation error:', error\);

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

    // POST /analyzeTranscript

    if \(path\.includes\('/analyzeTranscript'\) && req\.method === 'POST'\) \{

      const \{ transcript, leadInfo \} = await req\.json\(\);

      const analysis = await analyzeCallTranscript\(base44, transcript, leadInfo\);

      return Response\.json\(\{ success: true, analysis \}\);

    \}

    // POST /liveCoachingFeedback

    if \(path\.includes\('/liveCoachingFeedback'\) && req\.method === 'POST'\) \{

      const \{ partialTranscript, callDuration \} = await req\.json\(\);

      const feedback = await getLiveCoachingFeedback\(base44, partialTranscript, callDuration\);

      return Response\.json\(\{ success: true, feedback \}\);

    \}

    // POST /generateFollowUp

    if \(path\.includes\('/generateFollowUp'\) && req\.method === 'POST'\) \{

      const \{ callNotes, outcome, leadInfo, leadId \} = await req\.json\(\);

      const followUpPlan = await generateFollowUpPlan\(base44, callNotes, outcome, leadInfo\);

      

      if \(leadId\) \{

        const taskResult = await createFollowUpTask\(base44, leadId, followUpPlan\);

        return Response\.json\(\{ success: true, followUpPlan, task: taskResult \}\);

      \}

      return Response\.json\(\{ success: true, followUpPlan \}\);

    \}

    return Response\.json\(\{ error: 'Invalid endpoint' \}, \{ status: 404 \}\);

  \} catch \(error\) \{

    console\.error\('Function error:', error\);

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
