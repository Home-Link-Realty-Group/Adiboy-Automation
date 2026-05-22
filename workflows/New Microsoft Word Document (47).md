# New Microsoft Word Document (47)

Source: New Microsoft Word Document (47).docx

const SITUATIONS = \[

  \{ icon: "⚠️", value: "Behind on mortgage / Foreclosure", label: "Facing Foreclosure", desc: "Behind on payments, approaching auction" \},

  \{ icon: "💍", value: "Divorce", label: "Going Through Divorce", desc: "Need to split equity quickly" \},

  \{ icon: "📋", value: "Inherited property", label: "Inherited a Property", desc: "Probate, no desire to keep it" \},

  \{ icon: "🔑", value: "Tired of being a landlord", label: "Tired Landlord", desc: "Done with tenants and repairs" \},

  \{ icon: "🏗️", value: "Major repairs needed", label: "House Needs Repairs", desc: "Foundation, roof, electrical issues" \},

  \{ icon: "📊", value: "Behind on taxes / Tax lien", label: "Tax Lien Issues", desc: "Back taxes piling up" \},

\];

const TIMELINES = \[

  \{ icon: "⚡", value: "ASAP — within 30 days", label: "ASAP \(30 days\)", desc: "Urgent, need cash fast" \},

  \{ icon: "📅", value: "1–3 months", label: "1–3 Months", desc: "Moderate timeline" \},

  \{ icon: "🐌", value: "3\+ months \(flexible\)", label: "3\+ Months \(Flexible\)", desc: "Can take our time" \},

\];

export default function SituationStep\(\{ form, errors, up, R, D \}\) \{

  const errStyle = \{ color: R, fontSize: 11, marginTop: 4 \};

  const radioCard = \(selected\) => \(\{

    border: \`2px solid $\{selected ? R : "\#e0e0e0"\}\`,

    borderRadius: 10, padding: "14px 16px", cursor: "pointer",

    background: selected ? "\#fff3f3" : "\#fff",

    transition: "border\-color 0\.15s, background 0\.15s",

    display: "flex", alignItems: "flex\-start", gap: 10,

  \}\);

  const inp = \{

    width: "100%", padding: "13px 14px", border: "2px solid \#e0e0e0",

    borderRadius: 10, fontSize: 14, boxSizing: "border\-box",

    fontFamily: "inherit", outline: "none", transition: "border\-color 0\.2s",

  \};

  return \(

    <div>

      <fieldset style=\{\{ border: "none", padding: 0, margin: "0 0 24px" \}\}>

        <legend style=\{\{ fontSize: 13, fontWeight: 700, color: "\#333", display: "block", marginBottom: 4 \}\}>Why are you considering selling? \*</legend>

        <p style=\{\{ fontSize: 12, color: "\#888", margin: "0 0 14px" \}\}>This helps us prepare the right offer and match you with our best solutions\.</p>

        <div role="group" style=\{\{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 \}\}>

          \{SITUATIONS\.map\(sit => \(

            <div key=\{sit\.value\}

              role="radio"

              aria\-checked=\{form\.situation === sit\.value\}

              tabIndex=\{0\}

              onClick=\{\(\) => up\("situation", sit\.value\)\}

              onKeyDown=\{e => \(e\.key === "Enter" || e\.key === " "\) && up\("situation", sit\.value\)\}

              style=\{radioCard\(form\.situation === sit\.value\)\}>

              <span aria\-hidden="true" style=\{\{ fontSize: 20, flexShrink: 0 \}\}>\{sit\.icon\}</span>

              <div>

                <div style=\{\{ fontSize: 12, fontWeight: 700, color: form\.situation === sit\.value ? R : "\#333" \}\}>\{sit\.label\}</div>

                <div style=\{\{ fontSize: 11, color: "\#888", marginTop: 1 \}\}>\{sit\.desc\}</div>

              </div>

            </div>

          \)\)\}

        </div>

        \{errors\.situation && <div role="alert" style=\{errStyle\}>\{errors\.situation\}</div>\}

      </fieldset>

      <fieldset style=\{\{ border: "none", padding: 0, margin: "0 0 20px" \}\}>

        <legend style=\{\{ fontSize: 13, fontWeight: 700, color: "\#333", display: "block", marginBottom: 12 \}\}>What's your selling timeline? \*</legend>

        <div role="group" style=\{\{ display: "flex", flexDirection: "column", gap: 10 \}\}>

          \{TIMELINES\.map\(tl => \(

            <div key=\{tl\.value\}

              role="radio"

              aria\-checked=\{form\.timeline === tl\.value\}

              tabIndex=\{0\}

              onClick=\{\(\) => up\("timeline", tl\.value\)\}

              onKeyDown=\{e => \(e\.key === "Enter" || e\.key === " "\) && up\("timeline", tl\.value\)\}

              style=\{radioCard\(form\.timeline === tl\.value\)\}>

              <span aria\-hidden="true" style=\{\{ fontSize: 20, flexShrink: 0 \}\}>\{tl\.icon\}</span>

              <div>

                <div style=\{\{ fontSize: 13, fontWeight: 700, color: form\.timeline === tl\.value ? R : "\#333" \}\}>\{tl\.label\}</div>

                <div style=\{\{ fontSize: 11, color: "\#888", marginTop: 1 \}\}>\{tl\.desc\}</div>

              </div>

            </div>

          \)\)\}

        </div>

        \{errors\.timeline && <div role="alert" style=\{errStyle\}>\{errors\.timeline\}</div>\}

      </fieldset>

      <div>

        <label htmlFor="notes" style=\{\{ fontSize: 12, fontWeight: 700, color: "\#444", marginBottom: 5, display: "block" \}\}>Anything else we should know? \(optional\)</label>

        <textarea id="notes" style=\{\{ \.\.\.inp, minHeight: 80, resize: "vertical" \}\}

          placeholder="Any details about the property, your situation, liens, tenants, etc\."

          value=\{form\.notes\} onChange=\{e => up\("notes", e\.target\.value\)\} />

      </div>

    </div>

  \);

\}
