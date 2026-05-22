# AICityAdAllocator

Source: AICityAdAllocator.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();

    if (!user) {

      return Response.json({ error: 'Unauthorized' }, { status: 401 });

    }

    const body = await req.json();

    const { cityData } = body;

    if (!cityData || !Array.isArray(cityData)) {

      return Response.json({ error: 'cityData array required' }, { status: 400 });

    }

    // Prepare data summary for AI analysis

    const dataSummary = cityData.map(city => ({

      name: city.name,

      path: city.path,

      traffic: city.traffic || 0,

      leads: city.leads || 0,

      conversionRate: parseFloat(city.conversionRate) || 0,

      roi: parseInt(city.roi) || 0,

      status: city.status || 'dormant',

      adSpend: city.adSpend || 0,

      bounceRate: parseFloat(city.bounceRate) || 50,

    }));

    const prompt = `You are a real estate marketing strategist analyzing city page performance to recommend paid ad allocations.

Analyze this city performance data and provide strategic recommendations for which DORMANT cities should be activated with paid ads:

${JSON.stringify(dataSummary, null, 2)}

Consider:

1. **Conversion Rate Potential**: Cities with low bounce rates but dormant status likely have good user experience

2. **Market Saturation**: Compare traffic/leads to identify underserving markets

3. **ROI Probability**: Historical ROI patterns in similar markets

4. **Geographic Clustering**: Nearby cities with high performance suggest market readiness

5. **Cost-Benefit**: Suggest initial ad spend amounts based on market size

Provide recommendations in this exact JSON format:

{

  "recommendations": [

    {

      "city": "City Name",

      "priority": "HIGH|MEDIUM|LOW",

      "reason": "Brief explanation",

      "suggestedMonthlyAdSpend": 1500,

      "expectedMonthlyLeads": 45,

      "confidence": 85,

      "marketReadiness": "High demand, low competition signal detected"

    }

  ],

  "summary": "2-3 sentence strategic overview",

  "riskFactors": ["Array of potential challenges"]

}`;

    // Call LLM for analysis

    const llmResponse = await base44.integrations.Core.InvokeLLM({

      prompt,

      response_json_schema: {

        type: 'object',

        properties: {

          recommendations: {

            type: 'array',

            items: {

              type: 'object',

              properties: {

                city: { type: 'string' },

                priority: { type: 'string' },

                reason: { type: 'string' },

                suggestedMonthlyAdSpend: { type: 'number' },

                expectedMonthlyLeads: { type: 'number' },

                confidence: { type: 'number' },

                marketReadiness: { type: 'string' },

              },

            },

          },

          summary: { type: 'string' },

          riskFactors: {

            type: 'array',

            items: { type: 'string' },

          },

        },

      },

    });

    return Response.json({

      status: 'success',

      analysis: llmResponse,

      analysisTimestamp: new Date().toISOString(),

    });

  } catch (error) {

    console.error('AI City Ad Allocator error:', error);

    return Response.json({ error: error.message }, { status: 500 });

  }

});
