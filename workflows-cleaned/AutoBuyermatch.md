# AutoBuyermatch

Source: AutoBuyermatch.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    const { dealId } = await req.json();

    if (!dealId) return Response.json({ error: 'No dealId' }, { status: 400 });

    const deal = await base44.asServiceRole.entities.Deal.read(dealId);

    if (!deal) return Response.json({ error: 'Deal not found' }, { status: 404 });

    const buyers = await base44.asServiceRole.entities.CashBuyer.list();

    const matched = buyers.filter(b => {

      if (b.status !== 'Active' && b.status !== 'Verified') return false;

      const priceMatch = deal.purchase_price >= (b.price_min || 0) && deal.purchase_price <= (b.price_max || 999999999);

      const typeMatch = !b.property_types || b.property_types.toLowerCase().includes(deal.property_address?.toLowerCase() || 'any');

      const areaMatch = !b.buy_areas || b.buy_areas.toLowerCase().includes('nationwide') || b.buy_areas.toLowerCase().includes(deal.property_address?.split(',')[1] || '');

      return priceMatch && typeMatch && areaMatch;

    });

    return Response.json({

      ok: true,

      dealId,

      matchedCount: matched.length,

      buyerIds: matched.map(b => b.id),

      buyers: matched.map(b => ({ id: b.id, name: b.name, phone: b.phone, email: b.email })),

    });

  } catch (error) {

    console.error('Buyer match error:', error);

    return Response.json({ error: error.message }, { status: 500 });

  }

});
