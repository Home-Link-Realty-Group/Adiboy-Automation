# AutoDialer

Source: AutoDialer.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

import twilio from 'npm:twilio@4.19.0';

const TWILIO_PHONE = '+19729941658';

const state = { running: false, paused: false, idx: 0, leads: [], results: [] };

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();

    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { action, sheetId, twimlUrl } = await req.json();

    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');

    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');

    if (!accountSid || !authToken) return Response.json({ error: 'Twilio missing' }, { status: 500 });

    const client = twilio(accountSid, authToken);

    // START - fetch sheet

    if (action === 'start' && sheetId) {

      let token;

      try {

        const conn = await base44.asServiceRole.connectors.getCurrentAppUserConnection('69d2109b51038503faec5cfa');

        token = conn.accessToken;

      } catch (err) {

        console.error('Sheets auth failed:', err.message);

        return Response.json({ error: 'Google Sheets not authorized. Please connect in Settings.' }, { status: 401 });

      }

      const res = await fetch(

        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:D`,

        { headers: { 'Authorization': `Bearer ${token}` } }

      );

      const data = await res.json();

      if (!data.values) return Response.json({ error: 'Failed to fetch sheet' }, { status: 400 });

      const rows = data.values;

      if (rows.length < 2) return Response.json({ error: 'No leads in sheet' }, { status: 400 });

      const headers = rows[0].map(h => h?.toLowerCase() || '');

      const nameIdx = headers.indexOf('name');

      const phoneIdx = headers.indexOf('phone');

      if (nameIdx === -1 || phoneIdx === -1) return Response.json({ error: 'Sheet needs "name" and "phone" columns' }, { status: 400 });

      state.leads = rows.slice(1)

        .map(r => ({ name: r[nameIdx] || 'Lead', phone: r[phoneIdx] }))

        .filter(l => l.phone && l.phone.trim());

      state.idx = 0;

      state.results = [];

      state.running = true;

      state.paused = false;

      return Response.json({ status: 'started', totalLeads: state.leads.length });

    }

    if (action === 'dialNext' && state.running && !state.paused && state.idx < state.leads.length) {

      const lead = state.leads[state.idx];

      try {

        const call = await client.calls.create({

          from: TWILIO_PHONE,

          to: lead.phone,

          url: twimlUrl,

        });

        state.results.push({ name: lead.name, phone: lead.phone, status: 'dialed', sid: call.sid });

        console.log(`✓ Dialed ${lead.name} (${lead.phone})`);

      } catch (err) {

        state.results.push({ name: lead.name, phone: lead.phone, status: 'failed', error: err.message });

        console.error(`✗ Failed ${lead.name}: ${err.message}`);

      }

      state.idx++;

      await new Promise(r => setTimeout(r, 3000));

      return Response.json({

        status: 'dialed',

        currentIdx: state.idx,

        totalLeads: state.leads.length,

        successCount: state.results.filter(r => r.status === 'dialed').length,

      });

    }

    if (action === 'pause') {

      state.paused = true;

      return Response.json({ status: 'paused', currentIdx: state.idx });

    }

    if (action === 'resume') {

      state.paused = false;

      return Response.json({ status: 'resumed', currentIdx: state.idx });

    }

    if (action === 'stop') {

      state.running = false;

      state.paused = false;

      const ok = state.results.filter(r => r.status === 'dialed').length;

      return Response.json({ status: 'stopped', successCount: ok, totalDialed: state.idx, results: state.results });

    }

    if (action === 'status') {

      return Response.json({

        running: state.running,

        paused: state.paused,

        currentIdx: state.idx,

        totalLeads: state.leads.length,

        successCount: state.results.filter(r => r.status === 'dialed').length,

        results: state.results,

      });

    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });

  } catch (error) {

    console.error('Error:', error.message);

    return Response.json({ error: error.message }, { status: 500 });

  }

});
