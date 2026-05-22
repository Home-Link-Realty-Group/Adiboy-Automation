# AnalyzeSiteChange

Source: AnalyzeSiteChange.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    const { change_type, change_data, page_data, current_score } = await req.json();

    if (!change_type || !change_data) {

      return Response.json({ error: 'change_type and change_data required' }, { status: 400 });

    }

    // Analyze the proposed change

    const analysis = await analyzeChange(change_type, change_data, page_data, current_score);

    return Response.json({

      change_type,

      analysis,

      timestamp: new Date().toISOString()

    });

  } catch (error) {

    return Response.json({ error: error.message }, { status: 500 });

  }

});

async function analyzeChange(changeType, changeData, pageData, currentScore) {

  const prompt = buildAnalysisPrompt(changeType, changeData, pageData, currentScore);

  try {

    const response = await base44.integrations.Core.InvokeLLM({

      prompt,

      model: 'gpt_5_mini',

      response_json_schema: {

        type: 'object',

        properties: {

          isOptimal: {

            type: 'boolean',

            description: 'Whether this change will improve traffic/optimization'

          },

          impactScore: {

            type: 'number',

            description: 'Expected impact on SEO/traffic (-100 to +100)'

          },

          reasoning: {

            type: 'string',

            description: 'Why this change is or isnt optimal'

          },

          recommendation: {

            type: 'string',

            description: 'Suggested alternative or improvement if not optimal'

          },

          affectedMetrics: {

            type: 'array',

            items: { type: 'string' },

            description: 'Which metrics this change affects (SEO, CWV, CTR, etc.)'

          },

          priority: {

            type: 'string',

            enum: ['high', 'medium', 'low'],

            description: 'Priority level of this optimization'

          }

        }

      }

    });

    return response;

  } catch (e) {

    console.error('LLM analysis error:', e);

    return {

      isOptimal: null,

      impactScore: 0,

      reasoning: 'Could not analyze. Please review manually.',

      recommendation: 'Consult SEO best practices',

      affectedMetrics: [],

      priority: 'medium'

    };

  }

}

function buildAnalysisPrompt(changeType, changeData, pageData, currentScore) {

  let context = `You are an SEO optimization expert analyzing a proposed website change.

CHANGE TYPE: ${changeType}

CURRENT PAGE SCORE: ${currentScore || 'N/A'}

PAGE ROUTE: ${pageData?.route || 'N/A'}

PROPOSED CHANGE:

${JSON.stringify(changeData, null, 2)}

CURRENT PAGE DATA:

Route: ${pageData?.route}

SEO Title: ${pageData?.seo_title}

SEO Description: ${pageData?.seo_description}

Category: ${pageData?.category}

Analyze whether this change will improve:

1. Search engine traffic (CTR, impressions, ranking)

2. Core Web Vitals & performance

3. Mobile usability

4. User experience

5. Accessibility

If the change is not optimal, suggest a BETTER alternative that would increase GSC score and organic traffic instead.

Provide analysis in JSON format with: isOptimal, impactScore (-100 to +100), reasoning, recommendation, affectedMetrics, and priority.`;

  return context;

}
