# Call Status

Source: Call Status.docx

/**

 * callStatus — Twilio Call Status Callback

 * Fires after every call ends (inbound or outbound)

 * Logs outcome to the matching Lead record in CRM

 *

 * Add this URL to Twilio as "Call Status Changes" webhook:

 * POST https://69d48a8432b834f7bfa0beaa.base44.app/api/functions/callStatus

 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    const body = await req.text();

    const params = new URLSearchParams(body);

    const callStatus   = params.get('CallStatus') || '';

    const callerPhone  = params.get('From') || '';

    const calledPhone  = params.get('To') || '';

    const callDuration = params.get('CallDuration') || '0';

    const callSid      = params.get('CallSid') || '';

    const direction    = params.get('Direction') || '';

    const recordingUrl = params.get('RecordingUrl') || '';

    const url = new URL(req.url);

    const leadId = url.searchParams.get('leadId') || '';

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });

    const durationMin = Math.floor(parseInt(callDuration) / 60);

    const durationSec = parseInt(callDuration) % 60;

    const durationStr = parseInt(callDuration) > 0 ? `${durationMin}m ${durationSec}s` : '0s';

    const statusMap = {

      'completed': 'ANSWERED',

      'busy':      'BUSY — line was busy',

      'no-answer': 'NO ANSWER — rang, no pickup',

      'failed':    'FAILED — call could not connect',

      'canceled':  'CANCELED',

    };

    const humanStatus = statusMap[callStatus] || callStatus.toUpperCase();

    const isAnswered = callStatus === 'completed';

    const noteEntry = `\n[CALL ${humanStatus}] ${timestamp} | Duration: ${durationStr} | Direction: ${direction} | SID: ${callSid}${recordingUrl ? ` | Recording: ${recordingUrl}` : ''}`;

    let lead = null;

    if (leadId) {

      try {

        const results = await base44.asServiceRole.entities.Lead.filter({ id: leadId });

        lead = results?.[0] || null;

      } catch (_e) {}

    }

    if (!lead) {

      try {

        const phoneToMatch = direction === 'inbound' ? callerPhone : calledPhone;

        const normalized = phoneToMatch.replace(/\D/g, '').slice(-10);

        const all = await base44.asServiceRole.entities.Lead.list();

        lead = all.find(l => l.phone && l.phone.replace(/\D/g, '').slice(-10) === normalized) || null;

      } catch (_e) {}

    }

    if (lead) {

      const updates = {

        notes: (lead.notes || '') + noteEntry,

        last_contact_date: new Date().toISOString().split('T')[0],

      };

      if (isAnswered && lead.status === 'New Lead') {

        updates.status = 'Contacted';

      }

      if (isAnswered && parseInt(callDuration) > 60) {

        updates.seller_motivation_score = Math.min((lead.seller_motivation_score || 5) + 1, 10);

      }

      if (recordingUrl) {

        updates.call_recording_url = recordingUrl;

      }

      await base44.asServiceRole.entities.Lead.update(lead.id, updates);

    }

    if (callStatus === 'no-answer' || callStatus === 'busy') {

      try {

        const hour = parseInt(new Intl.DateTimeFormat('en-US', {

          timeZone: 'America/Chicago', hour: 'numeric', hour12: false,

        }).format(new Date()));

        if (hour >= 8 && hour < 19) {

          const TWILIO_SID  = Deno.env.get('TWILIO_ACCOUNT_SID') || '';

          const TWILIO_AUTH = Deno.env.get('TWILIO_AUTH_TOKEN') || '';

          const phone = direction === 'inbound' ? callerPhone : calledPhone;

          await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {

            method: 'POST',

            headers: {

              Authorization: `Basic ${btoa(`${TWILIO_SID}:${TWILIO_AUTH}`)}`,

              'Content-Type': 'application/x-www-form-urlencoded',

            },

            body: new URLSearchParams({

              To:   '+13374857368',

              From: '+18558101786',

              Body: `⚠️ MISSED CALL — ${phone} called (855) 810-1786 and got no answer. Call them back NOW — speed to lead is critical. Check CRM: https://the-replicator-app-cdc27f54.base44.app/CRM`,

            }),

          });

        }

      } catch (_e) {}

    }

    return Response.json({ ok: true, status: humanStatus, leadUpdated: !!lead });

  } catch (error) {

    return Response.json({ error: error.message }, { status: 500 });

  }

});
