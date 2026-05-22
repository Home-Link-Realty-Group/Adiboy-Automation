# DialerfromSheets

Source: DialerfromSheets.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

import twilio from 'npm:twilio@4.19.0';

const TWILIO_PHONE = '+19729941658';

const AGENT_PHONE = Deno.env.get('AGENT_PHONE') || '+13374857368';

const CALL_DELAY = 5000; // 5 second delay between calls

Deno.serve(async (req) => {

  if (req.method !== 'POST') return Response.json({ error: 'POST required' }, { status: 405 });

  try {

    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();

    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { sheetId, range } = await req.json();

    if (!sheetId || !range) {

      return Response.json({ error: 'sheetId and range required' }, { status: 400 });

    }

    // Get Twilio client

    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');

    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');

    if (!accountSid || !authToken) {

      return Response.json({ error: 'Twilio not configured' }, { status: 500 });

    }

    const client = twilio(accountSid, authToken);

    // Read from Google Sheets via the app user connector

    let sheetsAccessToken;

    try {

      const sheetsConn = await base44.asServiceRole.connectors.getCurrentAppUserConnection('69d2109b51038503faec5cfa');

      sheetsAccessToken = sheetsConn.accessToken;

    } catch (err) {

      console.error('Google Sheets connector error:', err.message);

      return Response.json({ error: 'Google Sheets not connected. Please authorize in settings first.', status: 401 }, { status: 401 });

    }

    const sheetsRes = await fetch(

      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,

      { headers: { 'Authorization': `Bearer ${sheetsAccessToken}` } }

    );

    const sheetsData = await sheetsRes.json();

    const rows = sheetsData.values || [];

    if (rows.length < 2) {

      return Response.json({ error: 'No leads found in sheet', count: 0 });

    }

    // Parse header and leads

    const headers = rows[0];

    const nameIdx = headers.indexOf('name');

    const phoneIdx = headers.indexOf('phone');

    const addressIdx = headers.indexOf('address');

    if (nameIdx === -1 || phoneIdx === -1) {

      return Response.json({ error: 'Sheet must have "name" and "phone" columns' }, { status: 400 });

    }

    const leads = rows.slice(1).map(row => ({

      name: row[nameIdx] || 'Unknown',

      phone: row[phoneIdx],

      address: row[addressIdx] || 'Unknown',

    })).filter(l => l.phone);

    console.log(`Starting blast to ${leads.length} leads...`);

    const results = [];

    for (const lead of leads) {

      try {

        const call = await client.calls.create({

          from: TWILIO_PHONE,

          to: lead.phone,

          twiml: `<Response><Say voice="alice">Hi ${lead.name}, this is a call about your property. Press 1 if you'd like to speak with us.</Say><Gather numDigits="1" timeout="5"/><Say>Thank you, goodbye.</Say></Response>`,

        });

        results.push({ name: lead.name, phone: lead.phone, status: 'sent', callSid: call.sid });

        console.log(`✓ ${lead.name} (${lead.phone})`);

      } catch (err) {

        results.push({ name: lead.name, phone: lead.phone, status: 'failed', error: err.message });

        console.error(`✗ ${lead.name}: ${err.message}`);

      }

      await new Promise(r => setTimeout(r, CALL_DELAY));

    }

    const successCount = results.filter(r => r.status === 'sent').length;

    return Response.json({

      ok: true,

      totalLeads: leads.length,

      successCount,

      results,

      message: `Dialed ${successCount} of ${leads.length} leads`,

    });

  } catch (error) {

    console.error('dialLeadsFromSheet error:', error);

    return Response.json({ error: error.message }, { status: 500 });

  }

});
