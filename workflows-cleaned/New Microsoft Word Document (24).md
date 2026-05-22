# New Microsoft Word Document (24)

Source: New Microsoft Word Document (24).docx

import React, { useState } from "react";

const GOLD = "#D4A843";

const CALL_STEPS = [

  {

    step: 1,

    title: "INTRODUCTION",

    color: "#3498db",

    goal: "Shift seller from resistance → curiosity. You're qualifying THEM, not pitching.",

    script: `"Hi, this is Jacob with Home-Link Realty Group. I was reaching out about your property at [ADDRESS]. It was referred to me by a referral company and I wanted to see whether or not the property qualifies."`,

    tips: [

      "Say 'referred by a referral company' — sounds professional, not like spam",

      "Say 'whether or not the property qualifies' — you're evaluating THEM",

      "Calm, confident tone — not salesy",

      "'Grab a pen and paper real quick' — establishes transparency early",

    ]

  },

  {

    step: 2,

    title: "FACT-FINDING",

    color: "#9b59b6",

    goal: "Collect: age, family context, rental income, how long they've considered selling. Listen MORE than you talk.",

    script: `"How long have you owned the property? Is it your primary home or is it a rental? How long have you potentially been thinking about selling? Any major repairs or issues you're aware of?"`,

    tips: [

      "Use 'potentially interested in selling' — removes pressure",

      "Get: ownership years, rental status, age, motivation",

      "Do NOT make an offer yet — gather first",

      "If they say 'not interested' — ask 'what would have to change for that to make sense?'",

    ],

  },

  {

    step: 3,

    title: "DISCUSS THE HOUSE",

    color: "#e67e22",

    goal: "Evaluate the property. Start OUTSIDE — neighborhood first, then work inward through every room and major system.",

    script: `"What's the neighborhood like? When we walk through the front door, tell me what I'm going to see. Is it still in its original condition or have there been updates?"`,

    tips: [

      "Start OUTSIDE — neighborhood, curb appeal",

      "Work inward: living areas → kitchen/baths → roof/HVAC/foundation",

      "Ask specifically: roof age, HVAC age, foundation, plumbing, electrical",

    ],

  },

  {

    step: 4,

    title: "NEGOTIATION",

    color: GOLD,

    goal: "Give a number with room. Start 10–15% above your floor. Negotiate in small increments.",

    script: `"Based on everything you've shared, I can offer around $[OFFER AMOUNT]. Cash, as-is, close whenever you're ready."`,

    tips: [

      "Start 10–15% ABOVE your true floor — room to move up shows flexibility",

      "NEVER say 'this is my best offer' on the first call",

      "After you give the number — STOP TALKING.",

      "If they counter: move in small increments ($2K–$5K), not big jumps",

    ],

  },

  {

    step: 5,

    title: "THE CLOSE",

    color: "#27ae60",

    goal: "Recap everything. Get email. Book follow-up call before you hang up.",

    script: `"Let me recap — [RESTATE THEIR SITUATION AND OFFER]. Next step: I'll send a formal written offer to your email. What's the best email?"`,

    tips: [

      "Always recap their situation back to them — confirms you listened",

      "Get their email AND a specific follow-up day BEFORE you hang up",

      "80% of deals close after Touch #5 or later — the money is in the follow-up",

    ],

  }

];

export default function CallGuideSection({ activeLead, callStep, setCallStep, setShowCallGuide, overlayOnly = false }) {

  const [mathCalc, setMathCalc] = useState({ rent: "", age: "", offer: "" });

  const mathResult = (() => {

    const rent = parseFloat(mathCalc.rent) || 0;

    const offer = parseFloat(mathCalc.offer) || 0;

    if (!rent || !offer) return null;

    const grossAnnual = rent * 12;

    const netAnnual = grossAnnual * 0.85;

    const yearsToEqual = Math.round(offer / netAnnual * 10) / 10;

    return { grossAnnual, netAnnual: Math.round(netAnnual), yearsToEqual };

  })();

  if (overlayOnly) {

    // Only render the floating call overlay — used from CRM main when not on callguide tab

    if (!activeLead) return null;

    return (

      <div style={{ position: "fixed", bottom: 24, right: 24, width: 380, background: "#0B1F45", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.4)", color: "#fff", zIndex: 9999 }}>

        <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          <div>

            <div style={{ fontWeight: 800, fontSize: 13, color: GOLD }}>📞 LIVE CALL — {activeLead.name}</div>

            <div style={{ fontSize: 11, color: "#888" }}>{activeLead.phone}</div>

          </div>

          <button onClick={() => setShowCallGuide(false)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 18 }}>✕</button>

        </div>

        <div style={{ padding: "14px 18px" }}>

          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>

            {CALL_STEPS.map((st, i) => (

              <button key={i} onClick={() => setCallStep(i)}

                style={{ flex: 1, padding: "6px 4px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700,

                  background: callStep === i ? st.color : "rgba(255,255,255,0.1)", color: callStep === i ? "#fff" : "#888" }}>

                {st.step}

              </button>

            ))}

          </div>

          <div style={{ borderLeft: `3px solid ${CALL_STEPS[callStep].color}`, paddingLeft: 12 }}>

            <div style={{ fontWeight: 800, fontSize: 13, color: "#fff", marginBottom: 6 }}>STEP {CALL_STEPS[callStep].step}: {CALL_STEPS[callStep].title}</div>

            <div style={{ fontSize: 11, color: "#aaa", marginBottom: 10, fontStyle: "italic" }}>{CALL_STEPS[callStep].goal}</div>

            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: 10, fontSize: 11, color: "#ddd", lineHeight: 1.6, marginBottom: 10, fontStyle: "italic" }}>

              {CALL_STEPS[callStep].script.replace("[ADDRESS]", activeLead.address || "[address]")}

            </div>

            {CALL_STEPS[callStep].tips.slice(0, 2).map((tip, i) => (

              <div key={i} style={{ fontSize: 10, color: "#888", marginBottom: 3 }}>→ {tip}</div>

            ))}

          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>

            {callStep > 0 && <button onClick={() => setCallStep(s => s - 1)} style={{ flex: 1, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: 8, color: "#fff", cursor: "pointer", fontSize: 12 }}>← Back</button>}

            {callStep < 4 && <button onClick={() => setCallStep(s => s + 1)} style={{ flex: 1, background: GOLD, border: "none", borderRadius: 8, padding: 8, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>Next Step →</button>}

            {callStep === 4 && <button onClick={() => setShowCallGuide(false)} style={{ flex: 1, background: "#27ae60", border: "none", borderRadius: 8, padding: 8, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>✅ Call Complete</button>}

          </div>

        </div>

      </div>

    );

  }

  return (

    <div>

      <div style={{ marginBottom: 20 }}>

        <h1 style={{ fontSize: 22, fontWeight: 900, color: "#0B1F45", margin: "0 0 4px" }}>📞 Live Call Guide</h1>

        <div style={{ fontSize: 13, color: "#888" }}>Eric Cline's exact 5-step process. Open this on your second screen during every call.</div>

      </div>

      <div style={{ background: "#fff3f3", border: "2px solid " + GOLD, borderRadius: 14, padding: 20, marginBottom: 20 }}>

        <div style={{ fontWeight: 800, fontSize: 14, color: GOLD, marginBottom: 12 }}>📊 MATH OBJECTION HANDLER</div>

        <div style={{ fontSize: 12, color: "#666", marginBottom: 14 }}>When they say "I want more" — use their own math against their hesitation.</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>

          {[

            { key: "age", label: "Seller's Age", placeholder: "68" },

            { key: "rent", label: "Monthly Rent ($)", placeholder: "650" },

            { key: "offer", label: "Your Offer ($)", placeholder: "110000" },

          ].map(f => (

            <div key={f.key}>

              <div style={{ fontSize: 11, color: "#555", fontWeight: 600, marginBottom: 4 }}>{f.label}</div>

              <input type="number" placeholder={f.placeholder} value={mathCalc[f.key]}

                onChange={e => setMathCalc(p => ({ ...p, [f.key]: e.target.value }))}

                style={{ width: "100%", padding: "10px 12px", border: "2px solid #e0e0e0", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />

            </div>

          ))}

        </div>

        {mathResult && (

          <div style={{ background: "#0B1F45", borderRadius: 10, padding: 16, color: "#fff" }}>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 14 }}>

              <div><div style={{ fontSize: 10, color: "#888" }}>Gross Annual Rent</div><div style={{ fontSize: 18, fontWeight: 900 }}>${mathResult.grossAnnual.toLocaleString()}</div></div>

              <div><div style={{ fontSize: 10, color: "#888" }}>Net After Expenses</div><div style={{ fontSize: 18, fontWeight: 900 }}>${mathResult.netAnnual.toLocaleString()}</div></div>

              <div><div style={{ fontSize: 10, color: "#888" }}>Years to Equal Offer</div><div style={{ fontSize: 18, fontWeight: 900, color: GOLD }}>{mathResult.yearsToEqual} years</div></div>

            </div>

            <div style={{ background: "rgba(230, 57, 70, 0.2)", borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 700, color: "#fff", fontStyle: "italic" }}>

              Say: "At {mathCalc.age || "[age]"} years old, do you really want to manage this property for another {mathResult.yearsToEqual} years?"

            </div>

          </div>

        )}

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>

        {CALL_STEPS.map((step) => (

          <div key={step.step} style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", borderLeft: `5px solid ${step.color}` }}>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>

              <div style={{ background: step.color, color: "#fff", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, flexShrink: 0 }}>

                {step.step}

              </div>

              <div style={{ fontWeight: 800, fontSize: 14, color: "#0B1F45" }}>STEP {step.step}: {step.title}</div>

            </div>

            <div style={{ fontSize: 11, color: "#888", marginBottom: 10, fontStyle: "italic" }}>{step.goal}</div>

            <div style={{ background: "#f9f9f9", borderRadius: 8, padding: 12, fontSize: 12, color: "#333", lineHeight: 1.6, marginBottom: 12, fontStyle: "italic" }}>

              {step.script}

            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>

              {step.tips.map((tip, i) => (

                <div key={i} style={{ fontSize: 11, color: "#555", display: "flex", gap: 6 }}>

                  <span style={{ color: step.color, fontWeight: 700, flexShrink: 0 }}>→</span> {tip}

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

      {activeLead && (

        <div style={{ position: "fixed", bottom: 24, right: 24, width: 380, background: "#0B1F45", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.4)", color: "#fff", zIndex: 9999 }}>

          <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

            <div>

              <div style={{ fontWeight: 800, fontSize: 13, color: GOLD }}>📞 LIVE CALL — {activeLead.name}</div>

              <div style={{ fontSize: 11, color: "#888" }}>{activeLead.phone}</div>

            </div>

            <button onClick={() => setShowCallGuide(false)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 18 }}>✕</button>

          </div>

          <div style={{ padding: "14px 18px" }}>

            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>

              {CALL_STEPS.map((st, i) => (

                <button key={i} onClick={() => setCallStep(i)}

                  style={{ flex: 1, padding: "6px 4px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700,

                    background: callStep === i ? st.color : "rgba(255,255,255,0.1)", color: callStep === i ? "#fff" : "#888" }}>

                  {st.step}

                </button>

              ))}

            </div>

            <div style={{ borderLeft: `3px solid ${CALL_STEPS[callStep].color}`, paddingLeft: 12 }}>

              <div style={{ fontWeight: 800, fontSize: 13, color: "#fff", marginBottom: 6 }}>STEP {CALL_STEPS[callStep].step}: {CALL_STEPS[callStep].title}</div>

              <div style={{ fontSize: 11, color: "#aaa", marginBottom: 10, fontStyle: "italic" }}>{CALL_STEPS[callStep].goal}</div>

              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: 10, fontSize: 11, color: "#ddd", lineHeight: 1.6, marginBottom: 10, fontStyle: "italic" }}>

                {CALL_STEPS[callStep].script.replace("[ADDRESS]", activeLead.address || "[address]")}

              </div>

              {CALL_STEPS[callStep].tips.slice(0, 2).map((tip, i) => (

                <div key={i} style={{ fontSize: 10, color: "#888", marginBottom: 3 }}>→ {tip}</div>

              ))}

            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>

              {callStep > 0 && <button onClick={() => setCallStep(s => s - 1)} style={{ flex: 1, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: 8, color: "#fff", cursor: "pointer", fontSize: 12 }}>← Back</button>}

              {callStep < 4 && <button onClick={() => setCallStep(s => s + 1)} style={{ flex: 1, background: GOLD, border: "none", borderRadius: 8, padding: 8, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>Next Step →</button>}

              {callStep === 4 && <button onClick={() => setShowCallGuide(false)} style={{ flex: 1, background: "#27ae60", border: "none", borderRadius: 8, padding: 8, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>✅ Call Complete</button>}

            </div>

          </div>

        </div>

      )}

    </div>

  );

}
