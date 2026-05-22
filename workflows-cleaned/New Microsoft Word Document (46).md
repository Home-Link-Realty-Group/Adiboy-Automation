# New Microsoft Word Document (46)

Source: New Microsoft Word Document (46).docx

const CONDITIONS = [

  { icon: "🏠", value: "Move-In Ready", label: "Move-In Ready", desc: "Clean, modern, ready to occupy" },

  { icon: "🔨", value: "Needs Cosmetic Updates", label: "Needs Cosmetic Updates", desc: "Paint, flooring, fixtures" },

  { icon: "🏗️", value: "Needs Major Repairs", label: "Needs Major Repairs", desc: "Roof, HVAC, electrical, plumbing" },

  { icon: "⚠️", value: "Heavily Distressed", label: "Heavily Distressed", desc: "Foundation issues, severe damage" },

];

const PROPERTY_TYPES = [

  { icon: "🏡", value: "Single-Family Home", label: "Single-Family" },

  { icon: "🏢", value: "Multi-Family", label: "Multi-Family" },

  { icon: "🏬", value: "Commercial", label: "Commercial" },

  { icon: "🏘️", value: "Land", label: "Land" },

];

export default function PropertyStep({ form, errors, up, R, D }) {

  const inp = {

    width: "100%", padding: "13px 14px", border: "2px solid #e0e0e0",

    borderRadius: 10, fontSize: 14, boxSizing: "border-box",

    fontFamily: "inherit", outline: "none", transition: "border-color 0.2s",

  };

  const errStyle = { color: R, fontSize: 11, marginTop: 4 };

  const radioCard = (selected) => ({

    border: `2px solid ${selected ? R : "#e0e0e0"}`,

    borderRadius: 10, padding: "14px 16px", cursor: "pointer",

    background: selected ? "#fff3f3" : "#fff",

    transition: "border-color 0.15s, background 0.15s",

    display: "flex", alignItems: "flex-start", gap: 10,

  });

  return (

    <div>

      <fieldset style={{ border: "none", padding: 0, margin: "0 0 24px" }}>

        <legend style={{ fontSize: 13, fontWeight: 700, color: "#333", display: "block", marginBottom: 12 }}>What type of property is it? *</legend>

        <div role="group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>

          {PROPERTY_TYPES.map(pt => (

            <div key={pt.value}

              role="radio"

              aria-checked={form.property_type === pt.value}

              tabIndex={0}

              onClick={() => up("property_type", pt.value)}

              onKeyDown={e => (e.key === "Enter" || e.key === " ") && up("property_type", pt.value)}

              style={radioCard(form.property_type === pt.value)}>

              <span aria-hidden="true" style={{ fontSize: 20 }}>{pt.icon}</span>

              <span style={{ fontSize: 13, fontWeight: form.property_type === pt.value ? 700 : 500, color: form.property_type === pt.value ? R : "#333" }}>{pt.label}</span>

            </div>

          ))}

        </div>

        {errors.property_type && <div role="alert" style={errStyle}>{errors.property_type}</div>}

      </fieldset>

      <fieldset style={{ border: "none", padding: 0, margin: "0 0 24px" }}>

        <legend style={{ fontSize: 13, fontWeight: 700, color: "#333", display: "block", marginBottom: 12 }}>What's the property condition? *</legend>

        <div role="group" style={{ display: "flex", flexDirection: "column", gap: 10 }}>

          {CONDITIONS.map(c => (

            <div key={c.value}

              role="radio"

              aria-checked={form.condition === c.value}

              tabIndex={0}

              onClick={() => up("condition", c.value)}

              onKeyDown={e => (e.key === "Enter" || e.key === " ") && up("condition", c.value)}

              style={radioCard(form.condition === c.value)}>

              <span aria-hidden="true" style={{ fontSize: 22, flexShrink: 0 }}>{c.icon}</span>

              <div>

                <div style={{ fontSize: 13, fontWeight: 700, color: form.condition === c.value ? R : "#333" }}>{c.label}</div>

                <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{c.desc}</div>

              </div>

            </div>

          ))}

        </div>

        {errors.condition && <div role="alert" style={errStyle}>{errors.condition}</div>}

      </fieldset>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        <div>

          <label htmlFor="bedrooms" style={{ fontSize: 12, fontWeight: 700, color: "#444", marginBottom: 5, display: "block" }}>Bedrooms</label>

          <select id="bedrooms" style={inp} value={form.bedrooms} onChange={e => up("bedrooms", e.target.value)}>

            <option value="">Select</option>

            {["1","2","3","4","5","6+"].map(n => <option key={n}>{n}</option>)}

          </select>

        </div>

        <div>

          <label htmlFor="bathrooms" style={{ fontSize: 12, fontWeight: 700, color: "#444", marginBottom: 5, display: "block" }}>Bathrooms</label>

          <select id="bathrooms" style={inp} value={form.bathrooms} onChange={e => up("bathrooms", e.target.value)}>

            <option value="">Select</option>

            {["1","1.5","2","2.5","3","3.5","4+"].map(n => <option key={n}>{n}</option>)}

          </select>

        </div>

      </div>

    </div>

  );

}
