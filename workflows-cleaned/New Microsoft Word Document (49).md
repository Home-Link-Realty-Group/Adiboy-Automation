# New Microsoft Word Document (49)

Source: New Microsoft Word Document (49).docx

export default function TrustBar() {

  return (

    <section style={{ background: "#f8f9fa", borderBottom: "1px solid #e8e8e8", padding: "16px 32px" }}>

      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", gap: 40, flexWrap: "wrap" }}>

        {[

          { icon: "⚡", text: "Cash Offer in 24 Hours" },

          { icon: "🏠", text: "Buy As-Is — Zero Repairs" },

          { icon: "💰", text: "Zero Fees or Commissions" },

          { icon: "📅", text: "Close in 7–21 Days" },

          { icon: "🔒", text: "No Obligation Offer" },

        ].map(item => (

          <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#444" }} role="img" aria-label={item.text}>

            <span style={{ fontSize: 18 }} aria-hidden="true">{item.icon}</span> {item.text}

          </div>

        ))}

      </div>

    </section>

  );

}
