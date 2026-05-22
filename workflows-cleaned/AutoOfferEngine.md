# AutoOfferEngine

Source: AutoOfferEngine.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    const { leadId, useEstimate } = await req.json();

    if (!leadId) return Response.json({ error: 'No leadId' }, { status: 400 });

    const lead = await base44.asServiceRole.entities.Lead.read(leadId);

    if (!lead) return Response.json({ error: 'Lead not found' }, { status: 404 });

    let arv = lead.arv_estimate || 0;

    if (!arv && useEstimate) {

      const rentcastRes = await fetch(

        `https://api.rentcast.io/v1/properties?address=${encodeURIComponent(lead.address)}&city=${lead.city}&state=${lead.state}&zipCode=${lead.zip}`,

        { headers: { 'X-API-Key': Deno.env.get('RENTCAST_API_KEY') } }

      );

      const rentcastData = await rentcastRes.json();

      arv = rentcastData[0]?.propertyValue || 0;

    }

    if (!arv) return Response.json({ error: 'No ARV available', leadId }, { status: 400 });

    const repairEstimate = 15000;

    const closingCosts = Math.round(arv * 0.07);

    const holdingCosts = 2000;

    const profitTarget = Math.round(arv * 0.2);

    const mao = arv - repairEstimate - closingCosts - holdingCosts - profitTarget;

    const offerAmount = Math.max(Math.round(mao * 0.95), Math.round(arv * 0.5));

    return Response.json({

      ok: true,

      leadId,

      arv,

      repairEstimate,

      closingCosts,

      holdingCosts,

      profitTarget,

      mao,

      offerAmount,

    });

  } catch (error) {

    console.error('Offer engine error:', error);

    return Response.json({ error: error.message }, { status: 500 });

  }

});
