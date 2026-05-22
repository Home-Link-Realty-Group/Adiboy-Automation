# AutoLeadScore

Source: AutoLeadScore.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    const payload = await req.json();

    const leadId = payload.event?.entity_id;

    if (!leadId) return Response.json({ ok: false, error: 'No lead ID' });

    const lead = await base44.asServiceRole.entities.Lead.get(leadId);

    if (!lead) return Response.json({ ok: false, error: 'Lead not found' });

    let score = 0;

    const situationScores = {

      'Behind on mortgage / Foreclosure': 40,

      'Inherited property': 25,

      'Divorce': 20,

      'Tired landlord / Problem tenants': 15,

      'Behind on taxes / Tax lien': 35,

      'Major repairs needed': 20,

      'Relocating / Job transfer': 10,

      'Downsizing': 8,

      'Just want to sell': 5,

    };

    score += situationScores[lead.situation] || 0;

    const timelineScores = {

      'ASAP — within 30 days': 25,

      '1–3 months': 15,

      '3–6 months': 8,

      'Just exploring options': 0,

    };

    score += timelineScores[lead.timeline] || 0;

    if (lead.equity_percent >= 50) score += 25;

    else if (lead.equity_percent >= 30) score += 15;

    else if (lead.equity_percent >= 20) score += 10;

    if (lead.ownership_years >= 20) score += 10;

    else if (lead.ownership_years >= 10) score += 8;

    if (lead.is_pre_foreclosure) score += 15;

    if (lead.is_vacant) score += 12;

    if (lead.has_tax_lien) score += 15;

    if (lead.has_code_violation) score += 8;

    const priority = score >= 60 ? 'Hot' : score >= 40 ? 'Warm' : 'Low';

    await base44.asServiceRole.entities.Lead.update(leadId, {

      motivation_total_score: score,

      priority,

    });

    return Response.json({ ok: true, leadId, score, priority });

  } catch (error) {

    console.error('Auto-score error:', error);

    return Response.json({ error: error.message }, { status: 500 });

  }

});
