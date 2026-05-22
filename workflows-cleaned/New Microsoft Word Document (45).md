# New Microsoft Word Document (45)

Source: New Microsoft Word Document (45).docx

export default function AddressStep({ form, errors, up, R }) {

  const inp = {

    width: "100%", padding: "13px 14px", border: "2px solid #e0e0e0",

    borderRadius: 10, fontSize: 14, boxSizing: "border-box",

    fontFamily: "inherit", outline: "none", transition: "border-color 0.2s",

  };

  const errStyle = { color: R, fontSize: 11, marginTop: 4 };

  return (

    <div>

      <p style={{ fontSize: 14, color: "#666", marginTop: 0, marginBottom: 24, lineHeight: 1.6 }}>

        Where is the property located? We buy houses across the entire United States.

      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        <div>

          <label htmlFor="address-input" style={{ fontSize: 12, fontWeight: 700, color: "#444", marginBottom: 5, display: "block" }}>Street Address *</label>

          <input id="address-input" style={{ ...inp, borderColor: errors.address ? "#d32f2f" : "#e0e0e0" }}

            placeholder="123 Main Street" value={form.address}

            onChange={e => up("address", e.target.value)}

            aria-invalid={!!errors.address}

            aria-describedby={errors.address ? "address-error" : undefined} />

          {errors.address && <div id="address-error" style={errStyle} role="alert">{errors.address}</div>}

        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12 }}>

          <div>

            <label htmlFor="city-input" style={{ fontSize: 12, fontWeight: 700, color: "#444", marginBottom: 5, display: "block" }}>City *</label>

            <input id="city-input" style={{ ...inp, borderColor: errors.city ? "#d32f2f" : "#e0e0e0" }}

              placeholder="Nationwide" value={form.city} onChange={e => up("city", e.target.value)}

              aria-invalid={!!errors.city}

              aria-describedby={errors.city ? "city-error" : undefined} />

            {errors.city && <div id="city-error" style={errStyle} role="alert">{errors.city}</div>}

          </div>

          <div>

            <label htmlFor="state-select" style={{ fontSize: 12, fontWeight: 700, color: "#444", marginBottom: 5, display: "block" }}>State</label>

            <select id="state-select" style={inp} value={form.state} onChange={e => up("state", e.target.value)}>

              {["TX","AL","AZ","AR","CA","CO","FL","GA","IL","IN","KS","KY","LA","MD","MI","MN","MS","MO","NC","NJ","NM","NY","OH","OK","OR","PA","SC","TN","VA","WA","WI"].map(s => <option key={s} value={s}>{s}</option>)}

            </select>

          </div>

          <div>

            <label htmlFor="zip-input" style={{ fontSize: 12, fontWeight: 700, color: "#444", marginBottom: 5, display: "block" }}>Zip Code</label>

            <input id="zip-input" style={inp} placeholder="75201" value={form.zip} onChange={e => up("zip", e.target.value)} />

          </div>

        </div>

      </div>

    </div>

  );

}
