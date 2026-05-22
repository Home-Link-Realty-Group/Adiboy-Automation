# AutoDialerRun

Source: AutoDialerRun.docx

import twilio from 'npm:twilio@4.19.0';

const dialSessions = new Map();

Deno.serve(async (req) => {

  try {

    const { action, sessionId, sheetId, twimlUrl, disposition } = await req.json();

    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');

    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');

    if (!accountSid || !authToken) return Response.json({ error: 'Twilio not configured' }, { status: 500 });

    const client = twilio(accountSid, authToken);

    // START - fetch sheet and init session

    if (action === 'start') {

      if (!sheetId || !twimlUrl) return Response.json({ error: 'sheetId and twimlUrl required' }, { status: 400 });

      // Fetch sheet data

      const sheetRes = await fetch(

        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:D`

      );

      if (!sheetRes.ok) return Response.json({ error: 'Failed to fetch sheet' }, { status: 400 });

      const sheetData = await sheetRes.json();

      if (!sheetData.values?.length) return Response.json({ error: 'Sheet is empty' }, { status: 400 });

      const rows = sheetData.values;

      const headers = rows[0].map((h) => (h || '').toLowerCase());

      const nameIdx = headers.indexOf('name');

      const phoneIdx = headers.indexOf('phone');

      if (nameIdx === -1 || phoneIdx === -1) {

        return Response.json({ error: 'Sheet must have "name" and "phone" columns' }, { status: 400 });

      }

      const leads = rows

        .slice(1)

        .map((r) => ({ name: r[nameIdx] || 'Lead', phone: r[phoneIdx] }))

        .filter((l) => l.phone?.trim());

      if (!leads.length) return Response.json({ error: 'No valid leads' }, { status: 400 });

      const sid = Math.random().toString(36).slice(2);

      dialSessions.set(sid, {

        leads,

        twimlUrl,

        idx: 0,

        paused: false,

        results: [],

        currentCall: null,

      });

      return Response.json({ sessionId: sid, totalLeads: leads.length });

    }

    const session = dialSessions.get(sessionId);

    if (!session) return Response.json({ error: 'Session not found' }, { status: 404 });

    // STATUS

    if (action === 'status') {

      const dialed = session.results.filter((r) => r.status === 'dialed').length;

      return Response.json({

        paused: session.paused,

        idx: session.idx,

        totalLeads: session.leads.length,

        dialed,

        results: session.results,

      });

    }

    // PAUSE

    if (action === 'pause') {

      session.paused = true;

      return Response.json({ status: 'paused' });

    }

    // RESUME

    if (action === 'resume') {

      session.paused = false;

      return Response.json({ status: 'resumed' });

    }

    // DIAL NEXT

    if (action === 'dialNext') {

      if (!session.paused && session.idx < session.leads.length && !session.currentCall) {

        const lead = session.leads[session.idx];

        try {

          const call = await client.calls.create({

            from: '+19729941658',

            to: lead.phone,

            url: session.twimlUrl,

          });

          session.currentCall = call.sid;

          session.results.push({

            name: lead.name,

            phone: lead.phone,

            status: 'dialed',

            sid: call.sid,

            disposition: null,

          });

          session.idx++;

          await new Promise((r) => setTimeout(r, 2500));

          session.currentCall = null;

        } catch (err) {

          session.results.push({

            name: lead.name,

            phone: lead.phone,

            status: 'failed',

            error: err.message,

          });

          session.idx++;

          session.currentCall = null;

        }

      }

      const dialed = session.results.filter((r) => r.status === 'dialed').length;

      return Response.json({

        idx: session.idx,

        totalLeads: session.leads.length,

        dialed,

        paused: session.paused,

        done: session.idx >= session.leads.length,

        results: session.results,

      });

    }

    // SET DISPOSITION

    if (action === 'setDispo') {

      const result = session.results.find((r) => r.sid === disposition.sid);

      if (result) result.disposition = disposition.value;

      return Response.json({ ok: true });

    }

    // CLEANUP

    if (action === 'cleanup') {

      dialSessions.delete(sessionId);

      return Response.json({ ok: true });

    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });

  } catch (error) {

    console.error('Error:', error);

    return Response.json({ error: error.message }, { status: 500 });

  }

});
