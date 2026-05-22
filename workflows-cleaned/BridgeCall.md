# BridgeCall

Source: BridgeCall.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const FUNC_BASE    = 'https://the-replicator-bfa0beaa.base44.app/functions';

const DEFAULT_FROM = '+18558101786';

Deno.serve(async (req) => {

  try {

    // ── Auth check ──

    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();

    if (!user) {

      return new Response(JSON.stringify({ error: 'Unauthorized' }), {

        status: 401,

        headers: { 'Content-Type': 'application/json' }

      });

    }

    const url      = new URL(req.url);

    const to       = url.searchParams.get('to') || '';

    const name     = url.searchParams.get('name') || 'your lead';

    const callerId = url.searchParams.get('callerId') || DEFAULT_FROM;

    // ── Validate input ──

    if (!to || to.replace(/\D/g, '').length < 10) {

      return new Response(JSON.stringify({ error: 'Invalid phone number' }), {

        status: 400,

        headers: { 'Content-Type': 'application/json' }

      });

    }

    const cidDisplay = callerId === '+19729941658' ? 'your Dallas 972 number'

                     : callerId === '+13172148802' ? 'your Indianapolis 317 number'

                     : 'your toll-free number';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>

<Response>

  <Say voice="Polly.Joanna" rate="medium">Dialing ${name} now. ${cidDisplay}.</Say>

  <Dial callerId="${callerId}" timeout="30" record="record-from-answer" recordingStatusCallback="${FUNC_BASE}/callStatus" recordingStatusCallbackMethod="POST" action="${FUNC_BASE}/callStatus">

    <Number answerOnBridge="true" statusCallback="${FUNC_BASE}/callStatus" statusCallbackEvent="answered completed">${to}</Number>

  </Dial>

  <Say voice="Polly.Joanna">Call ended. Log your outcome in the CRM now.</Say>

</Response>`;

    return new Response(xml, {

      headers: { 'Content-Type': 'text/xml' }

    });

  } catch (error) {

    console.error('bridgeCall error:', error);

    return new Response(JSON.stringify({

      error: 'Failed to initiate call',

      message: error.message

    }), {

      status: 500,

      headers: { 'Content-Type': 'application/json' }

    });

  }

});
