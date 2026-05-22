# New Microsoft Word Document (183)

Source: New Microsoft Word Document (183).docx

import \{ useState \} from "react";

const GOLD = "\#D4A843";

export default function ESigningFlow\(\{ lead, offer, onComplete \}\) \{

  const \[step, setStep\] = useState\(0\); // 0=preview, 1=signing, 2=done

  const \[signed, setSigned\] = useState\(false\);

  const \[signatureInitial, setSignatureInitial\] = useState\(""\);

  const handleSign = \(\) => \{

    if \(\!signatureInitial\.trim\(\)\) return;

    setSigned\(true\);

    setStep\(2\);

    setTimeout\(\(\) => onComplete?\.\(\), 1500\);

  \};

  if \(step === 0\) \{

    return \(

      <div style=\{\{ display: "flex", flexDirection: "column", gap: 16 \}\}>

        <div style=\{\{ background: "\#fffbeb", borderRadius: 14, padding: "16px 20px", border: "1px solid \#fde68a", fontSize: 14, color: "\#92400e" \}\}>

          ⚠️ <strong>Important:</strong> By signing electronically, you confirm that you have reviewed this agreement and authorize Home\-Link Realty Group LLC to proceed with the purchase of \{lead\.address\}\.

        </div>

        \{/\* 2\-page mini contract preview \*/\}

        <div style=\{\{ background: "\#fff", border: "1px solid \#e2e8f0", borderRadius: 14, padding: "24px", maxHeight: 300, overflowY: "auto" \}\}>

          <div style=\{\{ fontSize: 12, color: "\#374151", lineHeight: 1\.8 \}\}>

            <div style=\{\{ fontWeight: 700, marginBottom: 12, fontSize: 13, color: "\#0B1F45" \}\}>PURCHASE AGREEMENT</div>

            <div style=\{\{ marginBottom: 12 \}\}>

              <strong>Buyer:</strong> Home\-Link Realty Group LLC<br />

              <strong>Seller:</strong> \{lead\.name\}<br />

              <strong>Property:</strong> \{lead\.address\}, \{lead\.city\}, \{lead\.state\} \{lead\.zip\}<br />

              <strong>Purchase Price:</strong> $\{\(offer || 0\)\.toLocaleString\(\)\}

            </div>

            <div>

              <strong>Key Terms:</strong>

              <ul style=\{\{ marginTop: 8, paddingLeft: 16 \}\}>

                <li>Property sold AS\-IS</li>

                <li>Closing: 7–14 business days</li>

                <li>Earnest money: $100 \(deposited to title company\)</li>

                <li>All closing costs paid by Buyer</li>

                <li>Inspection period: 3 business days</li>

              </ul>

            </div>

          </div>

        </div>

        <button onClick=\{\(\) => setStep\(1\)\} style=\{\{ padding: "16px", background: "linear\-gradient\(135deg, \#27ae60, \#2ecc71\)", border: "none", borderRadius: 12, color: "\#fff", fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 4px 20px rgba\(39,174,96,0\.3\)" \}\}>

          ✅ I Accept — Sign Now

        </button>

      </div>

    \);

  \}

  if \(step === 1\) \{

    return \(

      <div style=\{\{ display: "flex", flexDirection: "column", gap: 18 \}\}>

        <div style=\{\{ background: "\#f0f9ff", borderRadius: 14, padding: "16px 20px", border: "1px solid \#bfdbfe", fontSize: 14, color: "\#1e40af" \}\}>

          📝 <strong>Sign Below</strong> — Type your name to electronically sign this agreement\.

        </div>

        \{/\* Signature box \*/\}

        <div style=\{\{ background: "\#fff", border: "2px dashed \#cbd5e1", borderRadius: 14, padding: "28px", textAlign: "center" \}\}>

          <div style=\{\{ fontSize: 12, fontWeight: 600, color: "\#64748b", marginBottom: 16 \}\}>Signature \(Type Your Full Name\)</div>

          <input

            type="text"

            placeholder="John Smith"

            value=\{signatureInitial\}

            onChange=\{e => setSignatureInitial\(e\.target\.value\)\}

            style=\{\{ width: "100%", padding: "14px", border: "1\.5px solid \#e2e8f0", borderRadius: 10, fontSize: 16, fontStyle: "italic", textAlign: "center", outline: "none", color: "\#0B1F45" \}\}

            onFocus=\{e => e\.target\.style\.borderColor = "\#27ae60"\}

            onBlur=\{e => e\.target\.style\.borderColor = "\#e2e8f0"\}

          />

          <div style=\{\{ fontSize: 11, color: "\#94a3b8", marginTop: 10 \}\}>By typing your name, you electronically sign this agreement\.</div>

        </div>

        \{/\* Legal acknowledgment \*/\}

        <div style=\{\{ background: "\#f8fafc", borderRadius: 12, padding: "14px 18px", fontSize: 12, color: "\#475569", lineHeight: 1\.6 \}\}>

          ✓ This is a legally binding electronic signature\.<br />

          ✓ You have 3 business days to review and cancel if desired\.<br />

          ✓ A copy will be sent to your email immediately\.

        </div>

        <div style=\{\{ display: "flex", gap: 10 \}\}>

          <button onClick=\{\(\) => setStep\(0\)\} style=\{\{ flex: 1, padding: "14px", background: "\#f8fafc", border: "1px solid \#e2e8f0", borderRadius: 12, color: "\#64748b", fontWeight: 600, cursor: "pointer" \}\}>

            Back

          </button>

          <button onClick=\{handleSign\} disabled=\{\!signatureInitial\.trim\(\)\} style=\{\{ flex: 1, padding: "14px", background: signatureInitial\.trim\(\) ? "linear\-gradient\(135deg, \#27ae60, \#2ecc71\)" : "\#f1f5f9", border: "none", borderRadius: 12, color: signatureInitial\.trim\(\) ? "\#fff" : "\#94a3b8", fontWeight: 800, cursor: signatureInitial\.trim\(\) ? "pointer" : "default" \}\}>

            🖊️ Electronically Sign

          </button>

        </div>

      </div>

    \);

  \}

  if \(step === 2\) \{

    // Auto\-complete immediately after signing

    if \(\!signed\) return null;

    setTimeout\(\(\) => onComplete?\.\(\), 800\);

    

    return \(

      <div style=\{\{ textAlign: "center", padding: "32px 0" \}\}>

        <div style=\{\{ width: 88, height: 88, background: "linear\-gradient\(135deg, \#27ae60, \#2ecc71\)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, margin: "0 auto 20px", boxShadow: "0 8px 32px rgba\(39,174,96,0\.3\)", animation: "pulse 0\.6s" \}\}>✓</div>

        <h3 style=\{\{ color: "\#27ae60", fontWeight: 900, fontSize: 24, marginBottom: 10 \}\}>✅ You're Under Contract\!</h3>

        <p style=\{\{ color: "\#64748b", fontSize: 15, maxWidth: 420, margin: "0 auto", lineHeight: 1\.7 \}\}>Contract executed\. A fully signed copy is in your email\. Escrow opens tomorrow\. You're all set\.</p>

      </div>

    \);

  \}

\}
