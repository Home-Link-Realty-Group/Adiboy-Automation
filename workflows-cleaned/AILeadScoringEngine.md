# AILeadScoringEngine

Source: AILeadScoringEngine.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();

    if (!user) {

      return Response.json({ error: 'Unauthorized' }, { status: 401 });

    }

    const body = await req.json();

    const { leads, action } = body;

    if (action === 'score_leads' && Array.isArray(leads)) {

      // Prepare lead summaries for AI analysis

      const leadProfiles = leads.map(lead => ({

        id: lead.id,

        name: lead.name,

        phone: lead.phone,

        address: lead.address,

        city: lead.city,

        situation: lead.situation || 'Not specified',

        timeline: lead.timeline || 'Unknown',

        touchCount: lead.touch_count || 0,

        lastContact: lead.last_contact_date || 'Never',

        daysInPipeline: lead.created_date ? Math.floor((Date.now() - new Date(lead.created_date).getTime()) / (1000 * 60 * 60 * 24)) : 0,

        isPreForeclosure: lead.is_pre_foreclosure || false,

        hasTaxLien: lead.has_tax_lien || false,

        isAbsentee: lead.is_absentee || false,

        isVacant: lead.is_vacant || false,

        equityPercent: lead.equity_percent || 0,

        arvEstimate: lead.arv_estimate || 0,

        offerAmount: lead.offer_amount || 0,

        status: lead.status || 'New Lead',

        priority: lead.priority || 'Medium',

        motivationScore: lead.seller_motivation_score || 0,

        source: lead.source || 'Unknown',

      }));

      const prompt = `You are an expert real estate acquisition strategist scoring seller leads for immediate outreach priority.

Analyze these leads and assign a "hotness score" (0-100) based on:

- URGENCY: Foreclosure risk, tax liens, time-sensitive situations (weight: 30%)

- MOTIVATION: Distress signals, interaction frequency, stated timeline (weight: 30%)

- EQUITY & PROFIT: Property equity, ARV potential, deal margin (weight: 25%)

- ENGAGEMENT: Recent touches, response history, seller readiness (weight: 15%)

Lead Data:

${JSON.stringify(leadProfiles, null, 2)}

Return a JSON object with:

{

  "scoredLeads": [

    {

      "leadId": "id",

      "hotnessScore": 87,

      "hotnessLevel": "FIRE|HOT|WARM|COOL",

      "primaryFactor": "Foreclosure + 30 days timeline",

      "secondaryFactors": ["45% equity", "No recent contact"],

      "callPriority": "CALL_NOW|TODAY|THIS_WEEK|MONITOR",

      "reasoning": "2-3 sentence explanation of why this lead is hot"

    }

  ],

  "summary": "Overall pipeline health assessment"

}`;

      const result = await base44.integrations.Core.InvokeLLM({

        prompt,

        response_json_schema: {

          type: 'object',

          properties: {

            scoredLeads: {

              type: 'array',

              items: {

                type: 'object',

                properties: {

                  leadId: { type: 'string' },

                  hotnessScore: { type: 'number' },

                  hotnessLevel: { type: 'string' },

                  primaryFactor: { type: 'string' },

                  secondaryFactors: { type: 'array', items: { type: 'string' } },

                  callPriority: { type: 'string' },

                  reasoning: { type: 'string' },

                },

              },

            },

            summary: { type: 'string' },

          },

        },

      });

      return Response.json({

        status: 'success',

        scoredLeads: result.scoredLeads || [],

        summary: result.summary || '',

        timestamp: new Date().toISOString(),

      });

    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {

    console.error('Lead scoring error:', error);

    return Response.json({ error: error.message }, { status: 500 });

  }

});
