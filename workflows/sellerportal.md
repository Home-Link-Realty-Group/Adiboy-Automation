# sellerportal

Source: sellerportal.docx

import \{ useState, useEffect \} from "react";

import \{ Lead, Deal, FollowUp \} from "@/api/entities";

import PortalLogin from "@/components/SellerPortal/PortalLogin";

import StatusTab from "@/components/SellerPortal/StatusTab";

import OfferTab from "@/components/SellerPortal/OfferTab";

import TimelineTab from "@/components/SellerPortal/TimelineTab";

import PhotosTab from "@/components/SellerPortal/PhotosTab";

import ContractTab from "@/components/SellerPortal/ContractTab";

import DocumentsTab from "@/components/SellerPortal/DocumentsTab";

import MessagesTab from "@/components/SellerPortal/MessagesTab";

import FAQTab from "@/components/SellerPortal/FAQTab";

import \{ PHONE, PHONE\_RAW, EMAIL, COMPANY, LOGO, JOURNEY \} from "@/components/SellerPortal/portalConstants";

export default function SellerPortal\(\) \{

  const \[phone, setPhone\]       = useState\(""\);

  const \[loggedIn, setLoggedIn\] = useState\(false\);

  const \[loading, setLoading\]   = useState\(false\);

  const \[loginError, setLoginError\] = useState\(""\);

  const \[lead, setLead\]   = useState\(null\);

  const \[deal, setDeal\]   = useState\(null\);

  const \[tab, setTab\]     = useState\("status"\);

  const \[contractAccepted, setContractAccepted\] = useState\(false\);

  const \[contractStep, setContractStep\]         = useState\(0\);

  const \[messages, setMessages\] = useState\(\[\]\);

  useEffect\(\(\) => \{

    let el = document\.querySelector\('meta\[name="robots"\]'\);

    if \(\!el\) \{ el = document\.createElement\("meta"\); el\.setAttribute\("name", "robots"\); document\.head\.appendChild\(el\); \}

    el\.setAttribute\("content", "noindex, nofollow"\);

  \}, \[\]\);

  async function handleLogin\(\) \{

    if \(\!phone\.trim\(\)\) return;

    setLoading\(true\);

    setLoginError\(""\);

    try \{

      const digits = phone\.replace\(/\\D/g, ""\);

      const variants = \[digits, \`\+1$\{digits\}\`, \`1$\{digits\}\`\];

      let found = null;

      for \(const v of variants\) \{

        const r = await Lead\.filter\(\{ phone: v \}\);

        if \(r?\.length > 0\) \{ found = r\[0\]; break; \}

      \}

      if \(\!found\) \{

        setLoginError\(\`We couldn't find a record with that number\. Call us at $\{PHONE\} and we'll look you up\.\`\);

        setLoading\(false\);

        return;

      \}

      setLead\(found\);

      const \[dealRes, fuRes\] = await Promise\.all\(\[

        Deal\.filter\(\{ lead\_id: found\.id \}\),

        FollowUp\.filter\(\{ lead\_id: found\.id \}\),

      \]\);

      if \(dealRes?\.length > 0\) setDeal\(dealRes\[0\]\);

      if \(found\.contract\_signed\) setContractAccepted\(true\);

      const noteMsgs = \(found\.notes || ""\)

        \.split\("\\n"\)

        \.filter\(l => l\.includes\("\[SELLER MESSAGE"\)\)

        \.map\(\(l, i\) => \{

          const match = l\.match\(/\\\[SELLER MESSAGE \(\[^\\\]\]\+\)\\\]: \(\.\*\)/\);

          return match ? \{ id: i, from: "seller", date: match\[1\], text: match\[2\] \} : null;

        \}\)

        \.filter\(Boolean\);

      setMessages\(noteMsgs\);

      setLoggedIn\(true\);

    \} catch \{

      setLoginError\("Something went wrong\. Please try again or call us\."\);

    \}

    setLoading\(false\);

  \}

  async function acceptContract\(\) \{

    if \(\!lead?\.id\) return;

    await Lead\.update\(lead\.id, \{

      status: "Under Contract",

      contract\_signed: true,

      notes: \`$\{lead\.notes || ""\}\\n\[CONTRACT ACCEPTED $\{new Date\(\)\.toLocaleDateString\(\)\}\]: Seller indicated acceptance via Seller Portal\.\`,

    \}\);

    setLead\(prev => \(\{ \.\.\.prev, status: "Under Contract", contract\_signed: true \}\)\);

    setContractAccepted\(true\);

    setContractStep\(2\);

  \}

  if \(\!loggedIn\) \{

    return <PortalLogin phone=\{phone\} setPhone=\{setPhone\} loading=\{loading\} loginError=\{loginError\} handleLogin=\{handleLogin\} />;

  \}

  const statusIdx   = Math\.max\(0, JOURNEY\.findIndex\(j => j\.status === lead?\.status\)\);

  const currentStep = JOURNEY\[statusIdx\];

  const firstName   = \(lead?\.name || ""\)\.split\(" "\)\[0\] || "there";

  const offerAmt    = deal?\.purchase\_price || lead?\.offer\_amount || 0;

  const TABS = \[

    \{ id: "status",    label: "📊 Status" \},

    \{ id: "offer",     label: "💰 My Offer" \},

    \{ id: "timeline",  label: "📅 Timeline" \},

    \{ id: "photos",    label: "📸 Photos" \},

    \{ id: "contract",  label: "✍️ Contract" \},

    \{ id: "documents", label: "📁 Documents" \},

    \{ id: "messages",  label: "💬 Messages" \+ \(messages\.length > 0 ? \` \($\{messages\.length\}\)\` : ""\) \},

    \{ id: "faq",       label: "❓ FAQ" \},

  \];

  return \(

    <div style=\{\{ minHeight: "100vh", background: "\#eef2f7", fontFamily: "'Inter', \-apple\-system, sans\-serif" \}\}>

      \{/\* Sticky Top Nav \*/\}

      <div style=\{\{ background: "linear\-gradient\(90deg, \#0B1F45, \#122B5E\)", padding: "0 28px", height: 62, display: "flex", alignItems: "center", justifyContent: "space\-between", position: "sticky", top: 0, zIndex: 200, boxShadow: "0 2px 24px rgba\(0,0,0,0\.4\)" \}\}>

        <div style=\{\{ display: "flex", alignItems: "center", gap: 14 \}\}>

          <img src=\{LOGO\} alt="Home\-Link Realty Group — Seller Portal" style=\{\{ height: 40 \}\} />

          <div>

            <div style=\{\{ color: "rgba\(255,255,255,0\.35\)", fontSize: 9, fontWeight: 800, letterSpacing: 1\.5, textTransform: "uppercase" \}\}>Seller Portal</div>

            <div style=\{\{ color: "\#fff", fontSize: 14, fontWeight: 800 \}\}>Welcome back, \{firstName\}</div>

          </div>

        </div>

        <div style=\{\{ display: "flex", alignItems: "center", gap: 10 \}\}>

          <div style=\{\{ background: \`$\{currentStep\.color\}22\`, border: \`1px solid $\{currentStep\.color\}55\`, borderRadius: 20, padding: "5px 12px", color: currentStep\.color, fontSize: 12, fontWeight: 700 \}\}>

            \{currentStep\.icon\} \{currentStep\.label\}

          </div>

          <a href=\{\`tel:$\{PHONE\_RAW\}\`\} style=\{\{ background: "rgba\(39,174,96,0\.18\)", border: "1px solid rgba\(39,174,96,0\.35\)", borderRadius: 8, padding: "8px 14px", color: "\#4ade80", fontSize: 13, fontWeight: 700, textDecoration: "none" \}\}>📞 \{PHONE\}</a>

        </div>

      </div>

      \{/\* Hero Banner \*/\}

      <div style=\{\{ background: "linear\-gradient\(135deg, \#122B5E 0%, \#27ae60 100%\)", padding: "28px 32px" \}\}>

        <div style=\{\{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space\-between", alignItems: "center", flexWrap: "wrap", gap: 16 \}\}>

          <div>

            <div style=\{\{ color: "rgba\(255,255,255,0\.5\)", fontSize: 11, fontWeight: 700, letterSpacing: 1\.2, textTransform: "uppercase", marginBottom: 6 \}\}>Your Property</div>

            <div style=\{\{ color: "\#fff", fontSize: 24, fontWeight: 900, letterSpacing: \-0\.5 \}\}>\{lead\.address || "Property on File"\}</div>

            <div style=\{\{ color: "rgba\(255,255,255,0\.6\)", fontSize: 14, marginTop: 3 \}\}>\{\[lead\.city, lead\.state, lead\.zip\]\.filter\(Boolean\)\.join\(", "\)\}</div>

          </div>

          <div style=\{\{ display: "flex", gap: 12 \}\}>

            \{offerAmt > 0 && \(

              <div style=\{\{ background: "rgba\(255,255,255,0\.12\)", borderRadius: 14, padding: "14px 20px", textAlign: "center", backdropFilter: "blur\(8px\)" \}\}>

                <div style=\{\{ color: "rgba\(255,255,255,0\.5\)", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" \}\}>Cash Offer</div>

                <div style=\{\{ color: "\#fff", fontSize: 22, fontWeight: 900, marginTop: 3 \}\}>$\{Number\(offerAmt\)\.toLocaleString\(\)\}</div>

              </div>

            \)\}

            <div style=\{\{ background: "rgba\(255,255,255,0\.12\)", borderRadius: 14, padding: "14px 20px", textAlign: "center", backdropFilter: "blur\(8px\)" \}\}>

              <div style=\{\{ color: "rgba\(255,255,255,0\.5\)", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" \}\}>Status</div>

              <div style=\{\{ color: "\#fff", fontSize: 16, fontWeight: 900, marginTop: 3 \}\}>\{currentStep\.icon\} \{currentStep\.label\}</div>

            </div>

          </div>

        </div>

      </div>

      \{/\* Tab Bar \*/\}

      <div style=\{\{ background: "\#fff", borderBottom: "1px solid \#dde3ec", overflowX: "auto" \}\}>

        <div style=\{\{ maxWidth: 960, margin: "0 auto", display: "flex", padding: "0 20px", whiteSpace: "nowrap" \}\}>

          \{TABS\.map\(t => \(

            <button key=\{t\.id\} onClick=\{\(\) => setTab\(t\.id\)\} style=\{\{ padding: "15px 16px", border: "none", borderBottom: tab === t\.id ? "3px solid \#27ae60" : "3px solid transparent", background: "none", color: tab === t\.id ? "\#27ae60" : "\#64748b", fontWeight: tab === t\.id ? 800 : 500, fontSize: 13, cursor: "pointer", transition: "color 0\.15s", flexShrink: 0 \}\}>

              \{t\.label\}

            </button>

          \)\)\}

        </div>

      </div>

      \{/\* Tab Content \*/\}

      <div style=\{\{ maxWidth: 960, margin: "0 auto", padding: "28px 20px 72px" \}\}>

        \{tab === "status"    && <StatusTab lead=\{lead\} statusIdx=\{statusIdx\} currentStep=\{currentStep\} setTab=\{setTab\} />\}

        \{tab === "offer"     && <OfferTab lead=\{lead\} deal=\{deal\} offerAmt=\{offerAmt\} setTab=\{setTab\} />\}

        \{tab === "timeline"  && <TimelineTab statusIdx=\{statusIdx\} />\}

        \{tab === "photos"    && <PhotosTab lead=\{lead\} setLead=\{setLead\} />\}

        \{tab === "contract"  && <ContractTab lead=\{lead\} deal=\{deal\} offerAmt=\{offerAmt\} contractAccepted=\{contractAccepted\} contractStep=\{contractStep\} setContractStep=\{setContractStep\} acceptContract=\{acceptContract\} setTab=\{setTab\} />\}

        \{tab === "documents" && <DocumentsTab />\}

        \{tab === "messages"  && <MessagesTab lead=\{lead\} setLead=\{setLead\} messages=\{messages\} setMessages=\{setMessages\} />\}

        \{tab === "faq"       && <FAQTab setTab=\{setTab\} />\}

      </div>

      \{/\* Footer \*/\}

      <div style=\{\{ background: "\#0B1F45", padding: "28px 24px", textAlign: "center" \}\}>

        <img src=\{LOGO\} alt=\{COMPANY\} style=\{\{ height: 38, marginBottom: 12 \}\} />

        <p style=\{\{ color: "rgba\(255,255,255,0\.2\)", fontSize: 13, margin: "0 0 6px" \}\}>\{COMPANY\}</p>

        <p style=\{\{ color: "rgba\(255,255,255,0\.15\)", fontSize: 12, margin: "0 0 6px" \}\}>\{PHONE\} · \{EMAIL\}</p>

        <p style=\{\{ color: "rgba\(255,255,255,0\.1\)", fontSize: 11, margin: 0 \}\}>Your information is 100% private and secure\. We never share or sell your data\.</p>

      </div>

    </div>

  \);

\}
