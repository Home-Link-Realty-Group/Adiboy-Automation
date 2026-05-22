# AnalyzeAgentPerformance

Source: AnalyzeAgentPerformance.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

/**

 * analyzeAgentPerformance — Real-time call coaching

 * Analyzes agent speech patterns: tone, pace, script adherence, emotion

 */

Deno.serve(async (req) => {

  if (req.method !== 'POST') return Response.json({ error: 'POST required' }, { status: 405 });

  try {

    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();

    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { transcript, callDuration, scriptTemplate, leadName } = await req.json();

    if (!transcript || typeof transcript !== 'string') {

      return Response.json({ error: 'transcript string required' }, { status: 400 });

    }

    const prompt = `You are an elite cold calling coach analyzing an agent's live call performance.

AGENT TRANSCRIPT (what the agent said):

"""

${transcript}

"""

${scriptTemplate ? `EXPECTED SCRIPT:\n${scriptTemplate}\n` : ''}

Call Duration: ${callDuration || 0}s

Lead Name: ${leadName || 'Unknown'}

ANALYZE THE AGENT and respond with JSON:

{

  "tone": "confident|friendly|pushy|uncertain|authentic",

  "tone_score": 0-100,

  "pace": "too_fast|too_slow|perfect",

  "pace_score": 0-100,

  "script_adherence": 0-100,

  "energy_level": "low|medium|high",

  "engagement": "passive|moderate|excellent",

  "call_quality_score": 0-100,

  "strengths": ["strength1", "strength2"],

  "improvements": [

    {

      "area": "tone|pace|script|engagement|closing",

      "feedback": "specific actionable feedback",

      "example": "instead of X, try Y"

    }

  ],

  "next_best_action": "what agent should focus on next (30 words max)"

}

Be direct and constructive. Agent is live on call.`;

    const analysis = await base44.integrations.Core.InvokeLLM({

      prompt,

      response_json_schema: {

        type: 'object',

        properties: {

          tone: { type: 'string' },

          tone_score: { type: 'number' },

          pace: { type: 'string' },

          pace_score: { type: 'number' },

          script_adherence: { type: 'number' },

          energy_level: { type: 'string' },

          engagement: { type: 'string' },

          call_quality_score: { type: 'number' },

          strengths: { type: 'array', items: { type: 'string' } },

          improvements: {

            type: 'array',

            items: {

              type: 'object',

              properties: {

                area: { type: 'string' },

                feedback: { type: 'string' },

                example: { type: 'string' }

              }

            }

          },

          next_best_action: { type: 'string' }

        }

      }

    });

    return Response.json({

      ok: true,

      coaching: analysis || {},

      timestamp: new Date().toISOString(),

    });

  } catch (error) {

    console.error('analyzeAgentPerformance error:', error);

    return Response.json({ error: error.message }, { status: 500 });

  }

});
