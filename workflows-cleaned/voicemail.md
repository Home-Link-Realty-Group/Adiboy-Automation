# voicemail

Source: voicemail.docx

/**

 * deliverVoicemail — Send pre-recorded voicemail to numbers that didn't answer

 * Called automatically from powerDialerCallback when call status is no-answer/voicemail

 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

import twilio from 'npm:twilio@4.19.0';

const TWILIO_PHONE = '+19729941658';

Deno.serve(async (req) => {

  if (req.method !== 'POST') return Response.json({ error: 'POST required' }, { status: 405 });

  try {

    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();

    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { phoneNumber, voicemailUrl, voicemailText } = await req.json();

    if (!phoneNumber) {

      return Response.json({ error: 'phoneNumber required' }, { status: 400 });

    }

    if (!voicemailUrl && !voicemailText) {

      return Response.json({ error: 'voicemailUrl or voicemailText required' }, { status: 400 });

    }

    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');

    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');

    if (!accountSid || !authToken) {

      return Response.json({ error: 'Twilio credentials not configured' }, { status: 500 });

    }

    const client = twilio(accountSid, authToken);

    // Build TwiML for voicemail delivery

    let twiml = '<Response>';


    if (voicemailUrl) {

      // Play pre-recorded audio

      twiml += `<Play>${voicemailUrl}</Play>`;

    } else if (voicemailText) {

      // Text-to-speech voicemail (Polly voice)

      twiml += `<Say voice="Polly.Joanna">${voicemailText}</Say>`;

    }

    twiml += '</Response>';

    // Call the number and play voicemail

    const call = await client.calls.create({

      from: TWILIO_PHONE,

      to: `+1${phoneNumber.replace(/\D/g, '').slice(-10)}`,

      twiml,

      machineDetection: 'DetectMessageEnd',

      machineDetectionTimeout: 5000,

    });

    // Log voicemail delivery

    try {

      await base44.asServiceRole.entities.CallRecording.create({

        lead_phone: phoneNumber,

        twilio_call_sid: call.sid,

        outcome: 'voicemail_dropped',

        called_at: new Date().toISOString(),

        notes: 'Automated voicemail delivery',

      });

    } catch (e) {

      console.warn('Failed to log voicemail delivery:', e.message);

    }

    return Response.json({

      ok: true,

      callSid: call.sid,

      phone: phoneNumber,

      status: call.status,

    });

  } catch (error) {

    console.error('deliverVoicemail error:', error);

    return Response.json({ error: error.message }, { status: 500 });

  }

});
