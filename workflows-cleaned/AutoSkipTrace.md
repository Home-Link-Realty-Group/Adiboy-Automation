# AutoSkipTrace

Source: AutoSkipTrace.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const APIFY_API_KEY = Deno.env.get('APIFY_API_TOKEN');

const APIFY_ACTOR_ID = 'apify/skip-tracer-api';

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();

    if (!user?.role !== 'admin') {

      return Response.json({ error: 'Admin access required' }, { status: 403 });

    }

    // Fetch all leads without phone numbers

    const leadsToTrace = await base44.asServiceRole.entities.Lead.filter({

      phone: null

    }, '-created_date', 500);

    console.log(`Starting skip trace for ${leadsToTrace.length} leads...`);

    let successCount = 0;

    let errorCount = 0;

    const results = [];

    // Process in batches to avoid rate limits

    for (const lead of leadsToTrace) {

      try {

        if (!lead.address || !lead.city || !lead.state) {

          console.log(`Skipping ${lead.name} - missing address info`);

          continue;

        }

        // Call Apify skip trace API

        const apifyRes = await fetch(`https://api.apify.com/v2/acts/${APIFY_ACTOR_ID}/run-sync?token=${APIFY_API_KEY}`, {

          method: 'POST',

          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify({

            input: {

              addresses: [

                {

                  fullName: lead.name || '',

                  address: lead.address,

                  city: lead.city,

                  state: lead.state,

                  zip: lead.zip || ''

                }

              ]

            }

          })

        });

        const apifyData = await apifyRes.json();

        if (apifyData?.output?.length > 0) {

          const enriched = apifyData.output[0];


          // Extract phone and email from enriched data

          const phoneNumbers = enriched.phones || [];

          const emails = enriched.emails || [];

          await base44.asServiceRole.entities.Lead.update(lead.id, {

            phone: phoneNumbers[0] || lead.phone,

            email: emails[0] || lead.email,

            notes: (lead.notes || '') + `\n[Skip Traced] ${new Date().toLocaleDateString()} - Found ${phoneNumbers.length} phones, ${emails.length} emails`

          });

          successCount++;

          results.push({

            name: lead.name,

            phone: phoneNumbers[0] || 'none',

            email: emails[0] || 'none'

          });

        } else {

          errorCount++;

        }

        // Rate limit - Apify allows 1 req/sec on free tier

        await new Promise(resolve => setTimeout(resolve, 1100));

      } catch (e) {

        errorCount++;

        console.error(`Skip trace error for ${lead.name}:`, e.message);

      }

    }

    return Response.json({

      ok: true,

      message: `Skip trace complete: ${successCount} enriched, ${errorCount} failed`,

      successCount,

      errorCount,

      totalProcessed: leadsToTrace.length

    });

  } catch (error) {

    return Response.json({ error: error.message }, { status: 500 });

  }

});
