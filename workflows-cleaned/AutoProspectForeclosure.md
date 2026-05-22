# AutoProspectForeclosure

Source: AutoProspectForeclosure.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";

const FROM_NAME      = "Jacob Levy | Home-Link Realty Group";

const FROM_EMAIL     = "jacob.levy@homelinkrealtygroup.com";

const FROM           = `${FROM_NAME} <${FROM_EMAIL}>`;

const PHONE          = "(855) 810-1786";

const COMPANY        = "Home-Link Realty Group LLC";

async function sendEmail(to, subject, html) {

  try {

    const res = await fetch("https://api.resend.com/emails", {

      method: "POST",

      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },

      body: JSON.stringify({ from: FROM, to, subject, html }),

    });

    const data = await res.json();

    if (!res.ok) { console.error("[autoProspectForeclosure] Resend error:", data); return false; }

    console.log("[autoProspectForeclosure] Email sent to:", to, "ID:", data.id);

    return true;

  } catch (e) { console.error("[autoProspectForeclosure] Exception:", e); return false; }

}

Deno.serve(async (req) => {

  try {

    createClientFromRequest(req);

    const body = await req.json().catch(() => ({}));

    const { leadName, leadEmail, address, city, state, arv, offer, timeline, source } = body;

    if (!leadEmail) return Response.json({ error: "No email provided" }, { status: 400 });

    const subject = `Fast Cash Offer for ${address} — Home-Link Realty`;

    const html = `

      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:20px;">

        <div style="background:linear-gradient(135deg,#1a1a2e,#e63946);padding:32px;border-radius:12px 12px 0 0;text-align:center;">

          <h1 style="color:#fff;margin:0;font-size:24px;">⚠️ We Can Help</h1>

          <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:15px;">Fast Cash Solution for Your Foreclosure</p>

        </div>

        <div style="background:#fff;padding:32px;border:1px solid #e8e8e8;border-radius:0 0 12px 12px;">

          <p style="font-size:16px;color:#1a1a2e;margin:0 0 20px;font-weight:600;">Hi ${leadName || "there"},</p>

          <p style="font-size:14px;color:#444;line-height:1.8;margin:0 0 20px;">

            I'm reaching out because I noticed your property at <strong>${address}${city ? ", " + city : ""} ${state || ""}</strong> is facing foreclosure proceedings. I understand this is stressful — but there IS a solution.

          </p>

          <div style="background:#fff3f3;border-left:4px solid #e63946;padding:18px;margin:24px 0;border-radius:4px;">

            <p style="color:#c1121f;font-weight:700;margin:0 0 12px;font-size:15px;">🏠 Here's what we can offer:</p>

            <ul style="color:#555;font-size:13px;line-height:2;margin:0;padding:0 0 0 20px;">

              <li><strong>Cash offer:</strong> ${offer ? "$" + offer.toLocaleString() : "Fair market offer"}</li>

              <li><strong>Close timeline:</strong> 7-14 days (stop the auction immediately)</li>

              <li><strong>No repairs needed:</strong> We buy as-is</li>

              <li><strong>No contingencies:</strong> No inspections, no appraisals</li>

              <li><strong>No fees:</strong> No realtor commissions, no closing costs</li>

            </ul>

          </div>

          <p style="font-size:14px;color:#444;line-height:1.8;margin:0 0 20px;">

            <strong>Why this matters:</strong> With ${timeline || "limited time"} until the auction, a quick cash sale helps you:

          </p>

          <ul style="font-size:13px;color:#555;line-height:2;margin:0 0 20px;padding:0 0 0 20px;">

            <li>Avoid foreclosure on your credit report</li>

            <li>Keep more money vs. auction losses</li>

            <li>Walk away with a solution, not a lawsuit</li>

          </ul>

          <div style="text-align:center;margin:28px 0;">

            <a href="tel:+18558101786" style="background:#e63946;color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block;margin-bottom:12px;">📞 Call Now: ${PHONE}</a>

            <p style="font-size:13px;color:#888;margin:8px 0 0;">Available 9 AM–7 PM Central, 7 days a week</p>

          </div>

          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;height:0;">

          <div style="font-size:12px;color:#999;text-align:center;">

            <p style="margin:0 0 8px;"><strong>Jacob Levy</strong><br>${COMPANY}</p>

            <p style="margin:0;"><a href="tel:+18558101786" style="color:#e63946;text-decoration:none;">${PHONE}</a> | <a href="mailto:${FROM_EMAIL}" style="color:#e63946;text-decoration:none;">${FROM_EMAIL}</a></p>

            <p style="margin:12px 0 0;line-height:1.4;"><small>This message complies with CAN-SPAM regulations and TCPA guidelines. Reply "STOP" to opt out.</small></p>

          </div>

        </div>

      </div>`;

    const sent = await sendEmail(leadEmail, subject, html);

    if (sent) {

      return Response.json({ ok: true, message: `Foreclosure outreach sent to ${leadName}`, leadEmail, source: source || "Foreclosure.com" });

    } else {

      return Response.json({ error: "Failed to send email via Resend", leadEmail }, { status: 500 });

    }

  } catch (error) {

    return Response.json({ error: error.message }, { status: 500 });

  }

});
