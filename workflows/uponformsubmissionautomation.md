# uponformsubmissionautomation

Source: uponformsubmissionautomation.docx

import \{ useState \} from "react";

const SITE = "https://homelinkrealtygroup\.com";

const PHONE = "\(855\) 810\-1786";

const ZAP\_CATEGORIES = \[

  \{

    id: "lead\-intake",

    emoji: "📥",

    title: "STAGE 1 — Lead Intake & Notification",

    color: "\#3498db",

    description: "The moment a seller fills out your form, the entire machine kicks on automatically\.",

    zaps: \[

      \{

        id: "Z\-01",

        name: "Website Form → SuperAgent CRM \+ Email Alert",

        trigger: \{

          app: "Tally / Typeform / Webflow Forms",

          event: "New Form Submission",

          notes: "Fires when seller submits the Get Cash Offer form on your website"

        \},

        actions: \[

          \{ step: 1, app: "SuperAgent CRM \(Webhook / Base44\)", action: "Create New Lead Record", fields: "name, phone, email, address, city, state, condition, situation, timeline, source=Website Form, status=New, priority=Warm, touch\_count=0" \},

          \{ step: 2, app: "Gmail / Google Workspace", action: "Send Email to Jacob", fields: "To: jlevy599@gmail\.com | Subject: 🔥 New Lead: \[Name\] \- \[Address\] | Body: All lead details \+ call within 5 minutes" \},

          \{ step: 3, app: "Google Voice / SMS \(via Twilio\)", action: "Send SMS to Jacob", fields: "Text: 'NEW LEAD: \[Name\] \[Phone\] submitted from your website\. Call NOW\.' to \(855\) 810\-1786" \}

        \],

        priority: "CRITICAL",

        notes: "Response time is everything\. 400% drop in contact rate after 30 minutes\. This zap must fire instantly\."

      \},

      \{

        id: "Z\-02",

        name: "Website Form → Instant Seller Confirmation Email",

        trigger: \{

          app: "Tally / Typeform / Webflow Forms",

          event: "New Form Submission",

          notes: "Same trigger as Z\-01 — run in parallel"

        \},

        actions: \[

          \{ step: 1, app: "Mailchimp / Gmail", action: "Send Confirmation Email to Seller", fields: "To: \[Seller Email\] | Subject: We received your info\! Expect a call within 24 hours | Body: Personalized confirmation with your name, phone, next steps" \},

          \{ step: 2, app: "Mailchimp", action: "Add Contact to Nurture Sequence", fields: "List: Active Leads | Tag: new\-website\-lead | Trigger automation: 5\-Touch Nurture Sequence" \}

        \],

        priority: "CRITICAL",

        notes: "Builds immediate trust\. Seller knows you're real and professional before you even call\."

      \},

      \{

        id: "Z\-03",

        name: "Google Voice Missed Call → SMS Auto\-Reply \+ CRM Log",

        trigger: \{

          app: "Google Voice \(via Gmail filter\) / Twilio",

          event: "Missed Call / Inbound Call",

          notes: "Fires when someone calls your number and you miss it"

        \},

        actions: \[

          \{ step: 1, app: "Twilio / Google Voice", action: "Send Auto SMS to Caller", fields: "Text: 'Hi\! This is Jacob from Home\-Link Realty Group\. Sorry I missed you\! I'll call back within 1 hour\. Or text me here anytime\. \(855\) 810\-1786'" \},

          \{ step: 2, app: "SuperAgent CRM", action: "Create/Update Lead — Missed Call", fields: "Source: Inbound Call | Status: Attempted Contact | Notes: Missed call — auto\-reply sent" \}

        \],

        priority: "HIGH",

        notes: "Never lose a hot inbound lead to a missed call again\."

      \}

    \]

  \},

  \{

    id: "followup",

    emoji: "🔄",

    title: "STAGE 2 — Automated Follow\-Up Sequences",

    color: "\#9b59b6",

    description: "Most deals close on touch 7–12\. This stage keeps every lead warm automatically\.",

    zaps: \[

      \{

        id: "Z\-04",

        name: "Daily Lead Nurture Email Drip \(5\-Touch Sequence\)",

        trigger: \{

          app: "Zapier Schedule",

          event: "Every Day at 9:00 AM",

          notes: "Runs every morning to scan active leads and fire the right email"

        \},

        actions: \[

          \{ step: 1, app: "SuperAgent CRM", action: "Find Leads Where next\_followup\_date = Today", fields: "Filter: status NOT IN \[Dead, Closed\] AND next\_followup\_date = today" \},

          \{ step: 2, app: "Mailchimp / Gmail", action: "Send Touch Email Based on touch\_count", fields: "touch\_count=0: Confirmation | 1: Day 3 Follow\-Up | 2: Day 7 Pain | 3: Day 14 Case Study | 4: Day 21 Break\-Up" \},

          \{ step: 3, app: "SuperAgent CRM", action: "Update Lead touch\_count \+ 1, Set next\_followup\_date", fields: "Increment touch\_count, calculate next date based on count" \}

        \],

        priority: "CRITICAL",

        notes: "The 5 email templates are already loaded in your CRM Scripts tab\. Connect them to Mailchimp automations\."

      \},

      \{

        id: "Z\-05",

        name: "Lead Status = Contacted → Schedule Follow\-Up Reminder",

        trigger: \{

          app: "SuperAgent CRM \(Webhook on Update\)",

          event: "Lead Status Changes to 'Contacted'",

          notes: "Fires when you manually update a lead status after a call"

        \},

        actions: \[

          \{ step: 1, app: "Google Calendar", action: "Create Follow\-Up Event", fields: "Title: 'Follow Up: \[Lead Name\] \[Phone\]' | Date: 3 days from now | Description: Touch \#\[touch\_count\] — use follow\-up script" \},

          \{ step: 2, app: "Gmail", action: "Send Jacob a Reminder Email", fields: "Subject: 📞 Follow\-Up Due: \[Name\] | Body: Call details \+ script suggestion based on touch count" \}

        \],

        priority: "HIGH",

        notes: "Never let a live lead fall through the cracks\. Every contact becomes a scheduled follow\-up\."

      \},

      \{

        id: "Z\-06",

        name: "30\-Day Dead Lead Revival Sequence",

        trigger: \{

          app: "Zapier Schedule",

          event: "Every Monday at 8:00 AM",

          notes: "Weekly revival sweep of stale leads"

        \},

        actions: \[

          \{ step: 1, app: "SuperAgent CRM", action: "Find Leads Where Last Contact > 30 Days Ago AND Status ≠ Dead/Closed", fields: "Filter: updated\_date < 30 days ago, status=Contacted or Attempted" \},

          \{ step: 2, app: "Gmail", action: "Send Revival Email to Seller", fields: "Subject: Still thinking about selling \[Address\]? | Body: Low\-pressure check\-in, market update, soft CTA" \},

          \{ step: 3, app: "SuperAgent CRM", action: "Update next\_followup\_date = Today \+ 14", fields: "Keep lead alive in pipeline" \}

        \],

        priority: "MEDIUM",

        notes: "People's situations change\. A 'no' last month can become a 'yes' this month\."

      \}

    \]

  \},

  \{

    id: "contract",

    emoji: "📝",

    title: "STAGE 3 — Offer & Contract Execution",

    color: "\#e67e22",

    description: "When a seller is ready, speed and professionalism close the deal\.",

    zaps: \[

      \{

        id: "Z\-07",

        name: "Lead Status = Offer Made → Send Offer Summary Email",

        trigger: \{

          app: "SuperAgent CRM \(Webhook\)",

          event: "Lead Status Changes to 'Offer Made'",

          notes: "Fires when you update a lead to Offer Made in the CRM"

        \},

        actions: \[

          \{ step: 1, app: "Gmail / PandaDoc", action: "Send Offer Summary Email to Seller", fields: "To: \[Seller Email\] | Subject: Your Cash Offer from Home\-Link Realty Group | Body: Offer amount, timeline, next steps, Jacob's contact info" \},

          \{ step: 2, app: "Google Calendar", action: "Create Follow\-Up: Offer Decision Call", fields: "Title: '\[Name\] — Offer Decision Call' | Date: 2 days from now | Alert: 1 hour before" \},

          \{ step: 3, app: "SuperAgent CRM", action: "Log Note: Offer sent via email", fields: "Timestamp \+ offer amount in notes field" \}

        \],

        priority: "HIGH",

        notes: "Putting the offer in writing — even via email — makes it feel real and professional\."

      \},

      \{

        id: "Z\-08",

        name: "Lead Status = Negotiating → Send Contract via PandaDoc/DocHub",

        trigger: \{

          app: "SuperAgent CRM \(Webhook\)",

          event: "Lead Status Changes to 'Negotiating'",

          notes: "Fires when deal is progressing toward agreement"

        \},

        actions: \[

          \{ step: 1, app: "PandaDoc / DocHub", action: "Generate Purchase & Sale Agreement", fields: "Pre\-fill: seller name, address, agreed price, closing date, earnest money amount" \},

          \{ step: 2, app: "PandaDoc / DocHub", action: "Send for E\-Signature to Seller", fields: "Email: \[Seller Email\] | Message: 'Here is the purchase agreement we discussed\. Please review and sign at your convenience\.'" \},

          \{ step: 3, app: "Gmail", action: "Notify Jacob: Contract Sent", fields: "Subject: 📋 Contract Sent to \[Name\] | Body: Waiting on signature\. Follow up in 24hrs if not signed\." \}

        \],

        priority: "HIGH",

        notes: "Use PandaDoc Free \(3 docs/mo\) or DocHub\. Pre\-built template should be ready to auto\-fill\."

      \},

      \{

        id: "Z\-09",

        name: "PandaDoc Signed → Move Lead to Under Contract",

        trigger: \{

          app: "PandaDoc",

          event: "Document Status = Completed \(All Signed\)",

          notes: "Fires the moment seller e\-signs the contract"

        \},

        actions: \[

          \{ step: 1, app: "SuperAgent CRM", action: "Update Lead Status → 'Under Contract'", fields: "Lead ID matched by email or address" \},

          \{ step: 2, app: "SuperAgent CRM", action: "Create Deal Record", fields: "property\_address, seller\_name, purchase\_price, closing\_date, status=Under Contract" \},

          \{ step: 3, app: "Gmail", action: "Send Jacob: 🎉 CONTRACT SIGNED Alert", fields: "Subject: 🎉 CONTRACT SIGNED — \[Address\] | Body: Seller signed\! Time to find a buyer\. Blast your buyers list NOW\." \},

          \{ step: 4, app: "Gmail", action: "Send Seller: Contract Confirmation", fields: "Subject: Contract received — you're all set\! | Body: Confirmation, closing timeline, title company next steps" \}

        \],

        priority: "CRITICAL",

        notes: "This is the moment everything accelerates\. Buyer search starts immediately after this fires\."

      \}

    \]

  \},

  \{

    id: "buyers",

    emoji: "🏦",

    title: "STAGE 4 — Buyer Outreach & Assignment",

    color: "\#27ae60",

    description: "The moment you have a contract, your buyers list gets activated automatically\.",

    zaps: \[

      \{

        id: "Z\-10",

        name: "New Deal Created → Blast All Active Buyers",

        trigger: \{

          app: "SuperAgent CRM \(Webhook\)",

          event: "New Deal Record Created OR Deal Status = Under Contract",

          notes: "Fires immediately when deal enters the pipeline"

        \},

        actions: \[

          \{ step: 1, app: "Mailchimp / Gmail", action: "Send Blast Email to All Active Buyers", fields: "Segment: Buyers List \(Active \+ Hot\) | Subject: 🏠 NEW DEAL: \[Address\] — $\[Price\] ARV $\[ARV\] | Body: Property details, photos, price, assignment fee, deadline" \},

          \{ step: 2, app: "Twilio / Google Voice", action: "Send SMS Blast to Top 10 Buyers", fields: "Text: 'NEW DEAL ALERT: \[Address\] asking $\[Price\], ARV $\[ARV\]\. Reply INTERESTED for details\. Jacob \(855\)810\-1786'" \},

          \{ step: 3, app: "Gmail", action: "Post to Facebook Investor Groups \(via Buffer/Zapier\)", fields: "Post: Deal details \+ contact info to pre\-configured FB groups \(use Buffer free plan\)" \}

        \],

        priority: "CRITICAL",

        notes: "Speed wins in wholesale\. First buyer to respond with proof of funds gets the deal\."

      \},

      \{

        id: "Z\-11",

        name: "Buyer Replies to Deal Email → Log Interest in CRM",

        trigger: \{

          app: "Gmail",

          event: "New Email Reply to Deal Blast Thread",

          notes: "Filter: Subject contains 'INTERESTED' or 'RE: NEW DEAL'"

        \},

        actions: \[

          \{ step: 1, app: "SuperAgent CRM", action: "Update Deal: Add Interested Buyer Name", fields: "Deal matched by address | buyer\_name = sender name/email" \},

          \{ step: 2, app: "Gmail", action: "Auto\-Reply to Buyer with Property Package", fields: "Subject: RE: \[Address\] — Here's the full property package | Body: Full details, photos link, POF instructions, deadline to close" \},

          \{ step: 3, app: "Gmail", action: "Alert Jacob: Buyer Interest Received", fields: "Subject: 🔥 Buyer Interested: \[Buyer Name\] on \[Address\] | Body: Respond within 1 hour" \}

        \],

        priority: "HIGH",

        notes: "Respond to buyer interest within 1 hour\. Hot buyers have multiple deals they're considering\."

      \},

      \{

        id: "Z\-12",

        name: "Assignment Contract Signed → Update Deal \+ Notify Title",

        trigger: \{

          app: "PandaDoc / DocHub",

          event: "Assignment Agreement — Document Completed",

          notes: "Fires when both Jacob and buyer sign the assignment of contract"

        \},

        actions: \[

          \{ step: 1, app: "SuperAgent CRM", action: "Update Deal Status → 'Closing Scheduled'", fields: "Deal matched by address | buyer\_name updated | assignment\_fee logged" \},

          \{ step: 2, app: "Gmail", action: "Email Title Company with Both Contracts", fields: "To: \[Title Company Email\] | Attach: Purchase Agreement \+ Assignment Agreement | Request closing date coordination" \},

          \{ step: 3, app: "Gmail", action: "Confirm to Buyer: Assignment Received", fields: "Thank buyer, provide title company contact info, remind them of earnest money deposit" \}

        \],

        priority: "HIGH",

        notes: "Title company does the heavy lifting from here\. Your job is to stay available\."

      \}

    \]

  \},

  \{

    id: "closing",

    emoji: "💰",

    title: "STAGE 5 — Closing & Payment Collection",

    color: "\#e63946",

    description: "Getting paid and locking in the win — automated confirmations and records\.",

    zaps: \[

      \{

        id: "Z\-13",

        name: "Deal Status = Closed → Log Revenue \+ Send Thank You",

        trigger: \{

          app: "SuperAgent CRM \(Webhook\)",

          event: "Deal Status Changes to 'Closed'",

          notes: "Manually update in CRM when title confirms wire sent"

        \},

        actions: \[

          \{ step: 1, app: "Google Sheets", action: "Log Closed Deal to Revenue Tracker", fields: "Columns: Date, Address, Seller, Buyer, Purchase Price, Assignment Fee, Net Profit, Days to Close" \},

          \{ step: 2, app: "Gmail", action: "Send Thank\-You Email to Seller", fields: "Subject: Thank you for working with Home\-Link Realty Group\! | Body: Warm thank\-you \+ ask for Google review \(link included\)" \},

          \{ step: 3, app: "Gmail", action: "Send Thank\-You Email to Buyer", fields: "Subject: Great working with you on \[Address\]\! | Body: Thank buyer, mention you'll send future deals their way" \},

          \{ step: 4, app: "SuperAgent CRM", action: "Update Lead Status → Closed", fields: "Mark original lead as Closed | log final sale price \+ assignment fee" \}

        \],

        priority: "HIGH",

        notes: "Every closed deal = a Google review opportunity\. This is how you build organic credibility over time\."

      \},

      \{

        id: "Z\-14",

        name: "Closed Deal → Add Seller to Referral Nurture List",

        trigger: \{

          app: "SuperAgent CRM \(Webhook\)",

          event: "Deal Status = Closed",

          notes: "Same trigger as Z\-13, fires in parallel"

        \},

        actions: \[

          \{ step: 1, app: "Mailchimp", action: "Add Seller to 'Past Sellers' Email List", fields: "Tag: past\-seller | List: Referral Nurture | Trigger: Quarterly check\-in sequence" \},

          \{ step: 2, app: "Mailchimp", action: "Enroll in Referral Sequence", fields: "Email 1 \(Day 30\): 'Know anyone who needs to sell fast?' | Email 2 \(Day 90\): Market update \+ referral ask | Email 3 \(Day 180\): Anniversary follow\-up" \}

        \],

        priority: "MEDIUM",

        notes: "Referrals from past sellers are your cheapest leads\. One happy seller can bring 3\-5 more deals\."

      \},

      \{

        id: "Z\-15",

        name: "Weekly KPI Report → Email Jacob Every Friday",

        trigger: \{

          app: "Zapier Schedule",

          event: "Every Friday at 6:00 PM",

          notes: "Weekly business performance summary"

        \},

        actions: \[

          \{ step: 1, app: "SuperAgent CRM", action: "Pull This Week's Stats", fields: "New leads, calls made, offers sent, contracts signed, deals closed, revenue" \},

          \{ step: 2, app: "Google Sheets", action: "Append Row to Weekly KPI Sheet", fields: "Week ending date \+ all pulled stats" \},

          \{ step: 3, app: "Gmail", action: "Send Weekly Summary to Jacob", fields: "Subject: 📊 Weekly Report: \[Week Ending Date\] | Body: Formatted stats, wins, gaps vs goals" \}

        \],

        priority: "MEDIUM",

        notes: "What gets measured gets managed\. Track your numbers every single week without fail\."

      \}

    \]

  \},

  \{

    id: "seo",

    emoji: "📣",

    title: "STAGE 6 — Organic Lead Generation Automation",

    color: "\#1a1a2e",

    description: "Automated posting and SEO tasks that keep leads flowing in passively\.",

    zaps: \[

      \{

        id: "Z\-16",

        name: "Every 48 Hours → Craigslist Renewal Reminder",

        trigger: \{

          app: "Zapier Schedule",

          event: "Every 48 Hours \(Mon/Wed/Fri at 8 AM\)",

          notes: "Craigslist posts expire every 48 hours — must be manually renewed"

        \},

        actions: \[

          \{ step: 1, app: "Gmail", action: "Send Jacob Craigslist Renewal Reminder", fields: "Subject: ⏰ Renew Your Craigslist Ads Now | Body: Link to craigslist\.org/manage \+ reminder to renew all 4 ads \+ link to GrowthPlaybook page with templates" \}

        \],

        priority: "MEDIUM",

        notes: "Craigslist is free, high\-intent traffic\. Renewing takes 2 minutes and keeps you visible\."

      \},

      \{

        id: "Z\-17",

        name: "New Lead from Any Source → Tag Source in CRM",

        trigger: \{

          app: "Multiple \(Tally, Gmail, Phone, etc\.\)",

          event: "Any New Lead Created",

          notes: "Use separate Zaps per source that all funnel into this same CRM action"

        \},

        actions: \[

          \{ step: 1, app: "SuperAgent CRM", action: "Create Lead with Source Tag", fields: "source = \[Website Form | Craigslist | Cold Call | Referral | Facebook | Direct Mail | Driving for Dollars\]" \},

          \{ step: 2, app: "Google Sheets", action: "Log Lead Source to Attribution Sheet", fields: "Track: Date, Source, Lead Name, Outcome — to measure ROI per channel over time" \}

        \],

        priority: "MEDIUM",

        notes: "Lead source tracking tells you which channels to double down on and which to cut\."

      \},

      \{

        id: "Z\-18",

        name: "Weekly → Post Google Business Profile Update",

        trigger: \{

          app: "Zapier Schedule",

          event: "Every Monday at 9:00 AM",

          notes: "GBP posts weekly = better local SEO ranking"

        \},

        actions: \[

          \{ step: 1, app: "Gmail", action: "Remind Jacob to Post GBP Update", fields: "Subject: 📍 Post Your Weekly Google Business Update | Body: Suggested post templates \+ link to business\.google\.com/posts" \}

        \],

        priority: "LOW",

        notes: "Weekly GBP posts signal to Google that your business is active\. Directly impacts Maps ranking\."

      \}

    \]

  \}

\];

const PRIORITY\_COLORS = \{ CRITICAL: "\#e63946", HIGH: "\#e67e22", MEDIUM: "\#3498db", LOW: "\#95a5a6" \};

export default function ZapBlueprint\(\) \{

  const \[expandedZap, setExpandedZap\] = useState\(null\);

  const \[activeFilter, setActiveFilter\] = useState\("ALL"\);

  const allZaps = ZAP\_CATEGORIES\.flatMap\(c => c\.zaps\);

  const criticalCount = allZaps\.filter\(z => z\.priority === "CRITICAL"\)\.length;

  const highCount = allZaps\.filter\(z => z\.priority === "HIGH"\)\.length;

  const handlePrint = \(\) => window\.print\(\);

  const filteredCategories = activeFilter === "ALL"

    ? ZAP\_CATEGORIES

    : ZAP\_CATEGORIES\.map\(c => \(\{ \.\.\.c, zaps: c\.zaps\.filter\(z => z\.priority === activeFilter\) \}\)\)\.filter\(c => c\.zaps\.length > 0\);

  return \(

    <div style=\{\{ fontFamily: "'Segoe UI', Arial, sans\-serif", background: "\#f0f2f5", minHeight: "100vh" \}\}>

      \{/\* PRINT STYLES \*/\}

      <style>\{\`

        @media print \{

          \.no\-print \{ display: none \!important; \}

          \.print\-break \{ page\-break\-before: always; \}

          body \{ background: white \!important; \}

          \* \{ print\-color\-adjust: exact; \-webkit\-print\-color\-adjust: exact; \}

        \}

      \`\}</style>

      \{/\* HEADER \*/\}

      <div style=\{\{ background: "linear\-gradient\(135deg, \#1a1a2e 0%, \#0f3460 100%\)", color: "\#fff", padding: "48px 40px 40px" \}\}>

        <div style=\{\{ maxWidth: "1100px", margin: "0 auto" \}\}>

          <div className="no\-print" style=\{\{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" \}\}>

            <a href="/BusinessSystem" style=\{\{ color: "\#aaa", textDecoration: "none", fontSize: "13px" \}\}>← Business System</a>

            <a href="/CRM" style=\{\{ color: "\#aaa", textDecoration: "none", fontSize: "13px", marginLeft: "12px" \}\}>CRM →</a>

          </div>

          <div style=\{\{ display: "inline\-block", background: "rgba\(245,197,24,0\.15\)", border: "1px solid \#f5c518", color: "\#f5c518", padding: "5px 14px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" \}\}>

            Complete Automation Blueprint

          </div>

          <h1 style=\{\{ fontSize: "clamp\(28px, 4vw, 46px\)", fontWeight: "900", margin: "0 0 14px", lineHeight: 1\.1 \}\}>

            Zapier Automation Blueprint<br />

            <span style=\{\{ color: "\#f5c518" \}\}>Full Wholesale Deal Pipeline</span>

          </h1>

          <p style=\{\{ fontSize: "16px", color: "rgba\(255,255,255,0\.8\)", maxWidth: "680px", lineHeight: 1\.7, margin: "0 0 28px" \}\}>

            Every Zap, trigger, action, and connection needed to fully automate your deal process from first form submission to payday\. Print it, save it, build it\.

          </p>

          \{/\* STATS ROW \*/\}

          <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fit, minmax\(140px, 1fr\)\)", gap: "14px", maxWidth: "700px" \}\}>

            \{\[

              \{ n: allZaps\.length, l: "Total Zaps", c: "\#f5c518" \},

              \{ n: criticalCount, l: "CRITICAL Zaps", c: "\#e63946" \},

              \{ n: highCount, l: "HIGH Priority", c: "\#e67e22" \},

              \{ n: ZAP\_CATEGORIES\.length, l: "Pipeline Stages", c: "\#3498db" \},

            \]\.map\(\(s, i\) => \(

              <div key=\{i\} style=\{\{ background: "rgba\(255,255,255,0\.08\)", borderRadius: "10px", padding: "16px", textAlign: "center" \}\}>

                <div style=\{\{ fontSize: "32px", fontWeight: "900", color: s\.c \}\}>\{s\.n\}</div>

                <div style=\{\{ fontSize: "12px", color: "rgba\(255,255,255,0\.7\)", marginTop: "4px" \}\}>\{s\.l\}</div>

              </div>

            \)\)\}

          </div>

          \{/\* ACTION BUTTONS \*/\}

          <div className="no\-print" style=\{\{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" \}\}>

            <button onClick=\{handlePrint\} style=\{\{ background: "\#f5c518", color: "\#1a1a2e", border: "none", borderRadius: "8px", padding: "12px 24px", fontWeight: "800", fontSize: "14px", cursor: "pointer" \}\}>

              🖨️ Print / Save as PDF

            </button>

            <a href="https://zapier\.com/app/zaps" target="\_blank" rel="noopener noreferrer" style=\{\{ background: "\#FF4F00", color: "\#fff", borderRadius: "8px", padding: "12px 24px", fontWeight: "800", fontSize: "14px", textDecoration: "none" \}\}>

              Open Zapier →

            </a>

          </div>

        </div>

      </div>

      \{/\* PRIORITY FILTER \*/\}

      <div className="no\-print" style=\{\{ background: "\#fff", borderBottom: "2px solid \#f0f0f0", padding: "16px 40px", position: "sticky", top: 0, zIndex: 50 \}\}>

        <div style=\{\{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" \}\}>

          <span style=\{\{ fontSize: "13px", fontWeight: "700", color: "\#888", marginRight: "4px" \}\}>Filter:</span>

          \{\["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"\]\.map\(f => \(

            <button key=\{f\} onClick=\{\(\) => setActiveFilter\(f\)\} style=\{\{

              padding: "6px 16px", borderRadius: "20px", border: "2px solid",

              borderColor: activeFilter === f ? \(PRIORITY\_COLORS\[f\] || "\#1a1a2e"\) : "\#e0e0e0",

              background: activeFilter === f ? \(PRIORITY\_COLORS\[f\] || "\#1a1a2e"\) : "\#fff",

              color: activeFilter === f ? "\#fff" : "\#555",

              fontWeight: "700", fontSize: "12px", cursor: "pointer"

            \}\}>\{f\}</button>

          \)\)\}

        </div>

      </div>

      \{/\* ZAP CATEGORIES \*/\}

      <div style=\{\{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" \}\}>

        \{/\* HOW TO USE SECTION \*/\}

        <div style=\{\{ background: "\#fff", borderRadius: "14px", padding: "28px", marginBottom: "32px", border: "2px solid \#f5c518" \}\}>

          <h2 style=\{\{ margin: "0 0 16px", fontWeight: "900", color: "\#1a1a2e", fontSize: "18px" \}\}>📋 How to Build These Zaps</h2>

          <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fit, minmax\(220px, 1fr\)\)", gap: "16px" \}\}>

            \{\[

              \{ step: "1", title: "Start with CRITICAL Zaps", desc: "Build Z\-01, Z\-02, Z\-09 first\. These drive the most revenue\. Everything else is a multiplier\." \},

              \{ step: "2", title: "Use Zapier Free Plan", desc: "Free plan gives 100 tasks/month\. Start there\. Upgrade to Starter \($19\.99/mo\) once you close your first deal\." \},

              \{ step: "3", title: "Test Every Zap", desc: "Use Zapier's built\-in 'Test' feature\. Trigger a sample form submission and verify every step fires correctly\." \},

              \{ step: "4", title: "CRM Webhooks", desc: "SuperAgent CRM can send webhooks on lead/deal updates\. Set the Zapier Catch Hook URL as the webhook destination in your CRM settings\." \},

            \]\.map\(\(s, i\) => \(

              <div key=\{i\} style=\{\{ background: "\#f8f9fa", borderRadius: "10px", padding: "16px" \}\}>

                <div style=\{\{ display: "flex", gap: "10px", alignItems: "flex\-start" \}\}>

                  <div style=\{\{ background: "\#1a1a2e", color: "\#f5c518", borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "14px", flexShrink: 0 \}\}>\{s\.step\}</div>

                  <div>

                    <div style=\{\{ fontWeight: "800", fontSize: "14px", color: "\#1a1a2e", marginBottom: "4px" \}\}>\{s\.title\}</div>

                    <div style=\{\{ fontSize: "13px", color: "\#666", lineHeight: 1\.6 \}\}>\{s\.desc\}</div>

                  </div>

                </div>

              </div>

            \)\)\}

          </div>

        </div>

        \{filteredCategories\.map\(\(category, ci\) => \(

          <div key=\{category\.id\} className=\{ci > 0 ? "print\-break" : ""\} style=\{\{ marginBottom: "40px" \}\}>

            \{/\* CATEGORY HEADER \*/\}

            <div style=\{\{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" \}\}>

              <div style=\{\{ fontSize: "36px" \}\}>\{category\.emoji\}</div>

              <div>

                <h2 style=\{\{ margin: 0, fontWeight: "900", color: category\.color, fontSize: "20px" \}\}>\{category\.title\}</h2>

                <p style=\{\{ margin: "4px 0 0", color: "\#777", fontSize: "14px" \}\}>\{category\.description\}</p>

              </div>

            </div>

            \{/\* ZAP CARDS \*/\}

            <div style=\{\{ display: "flex", flexDirection: "column", gap: "14px" \}\}>

              \{category\.zaps\.map\(\(zap, zi\) => \(

                <div key=\{zap\.id\} style=\{\{ background: "\#fff", borderRadius: "14px", overflow: "hidden", boxShadow: "0 2px 12px rgba\(0,0,0,0\.06\)", borderLeft: \`4px solid $\{PRIORITY\_COLORS\[zap\.priority\]\}\` \}\}>

                  \{/\* ZAP HEADER \*/\}

                  <div

                    className="no\-print"

                    onClick=\{\(\) => setExpandedZap\(expandedZap === \`$\{ci\}\-$\{zi\}\` ? null : \`$\{ci\}\-$\{zi\}\`\)\}

                    style=\{\{ padding: "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space\-between", alignItems: "center", flexWrap: "wrap", gap: "10px" \}\}

                  >

                    <div style=\{\{ display: "flex", alignItems: "center", gap: "12px", flex: 1 \}\}>

                      <div style=\{\{ background: "\#f8f9fa", borderRadius: "6px", padding: "4px 10px", fontSize: "11px", fontWeight: "800", color: "\#888" \}\}>\{zap\.id\}</div>

                      <div style=\{\{ fontWeight: "800", fontSize: "15px", color: "\#1a1a2e" \}\}>\{zap\.name\}</div>

                    </div>

                    <div style=\{\{ display: "flex", alignItems: "center", gap: "10px" \}\}>

                      <span style=\{\{ background: PRIORITY\_COLORS\[zap\.priority\], color: "\#fff", fontSize: "11px", fontWeight: "800", padding: "3px 10px", borderRadius: "12px" \}\}>\{zap\.priority\}</span>

                      <span style=\{\{ color: "\#bbb", fontSize: "18px" \}\}>\{expandedZap === \`$\{ci\}\-$\{zi\}\` ? "▲" : "▼"\}</span>

                    </div>

                  </div>

                  \{/\* PRINT VIEW — always visible \*/\}

                  <div className="print\-only" style=\{\{ padding: "16px 24px 0" \}\}>

                    <div style=\{\{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" \}\}>

                      <span style=\{\{ background: "\#f8f9fa", borderRadius: "6px", padding: "3px 8px", fontSize: "11px", fontWeight: "800", color: "\#888" \}\}>\{zap\.id\}</span>

                      <span style=\{\{ fontWeight: "800", fontSize: "15px", color: "\#1a1a2e" \}\}>\{zap\.name\}</span>

                      <span style=\{\{ background: PRIORITY\_COLORS\[zap\.priority\], color: "\#fff", fontSize: "10px", fontWeight: "800", padding: "2px 8px", borderRadius: "10px" \}\}>\{zap\.priority\}</span>

                    </div>

                  </div>

                  \{/\* ZAP DETAILS — shown when expanded or for print \*/\}

                  \{\(expandedZap === \`$\{ci\}\-$\{zi\}\`\) && \(

                    <div style=\{\{ padding: "0 24px 24px", borderTop: "1px solid \#f5f5f5" \}\}>

                      \{/\* TRIGGER \*/\}

                      <div style=\{\{ marginTop: "18px" \}\}>

                        <div style=\{\{ fontSize: "11px", fontWeight: "800", color: "\#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" \}\}>⚡ TRIGGER</div>

                        <div style=\{\{ background: "\#fff8e1", border: "2px solid \#f5c518", borderRadius: "10px", padding: "14px 18px" \}\}>

                          <div style=\{\{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "6px" \}\}>

                            <span style=\{\{ background: "\#f5c518", color: "\#1a1a2e", fontSize: "11px", fontWeight: "800", padding: "2px 8px", borderRadius: "6px" \}\}>APP</span>

                            <span style=\{\{ fontSize: "14px", fontWeight: "700", color: "\#1a1a2e" \}\}>\{zap\.trigger\.app\}</span>

                          </div>

                          <div style=\{\{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "6px" \}\}>

                            <span style=\{\{ background: "\#e67e22", color: "\#fff", fontSize: "11px", fontWeight: "800", padding: "2px 8px", borderRadius: "6px" \}\}>EVENT</span>

                            <span style=\{\{ fontSize: "14px", fontWeight: "700", color: "\#1a1a2e" \}\}>\{zap\.trigger\.event\}</span>

                          </div>

                          <div style=\{\{ fontSize: "12px", color: "\#888", fontStyle: "italic", marginTop: "6px" \}\}>📌 \{zap\.trigger\.notes\}</div>

                        </div>

                      </div>

                      \{/\* ACTIONS \*/\}

                      <div style=\{\{ marginTop: "16px" \}\}>

                        <div style=\{\{ fontSize: "11px", fontWeight: "800", color: "\#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" \}\}>🔧 ACTIONS</div>

                        <div style=\{\{ display: "flex", flexDirection: "column", gap: "8px" \}\}>

                          \{zap\.actions\.map\(\(action, ai\) => \(

                            <div key=\{ai\} style=\{\{ display: "flex", gap: "12px", background: "\#f8f9fa", borderRadius: "10px", padding: "14px 16px", alignItems: "flex\-start" \}\}>

                              <div style=\{\{ background: category\.color, color: "\#fff", borderRadius: "50%", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "13px", flexShrink: 0 \}\}>\{action\.step\}</div>

                              <div style=\{\{ flex: 1 \}\}>

                                <div style=\{\{ display: "flex", gap: "8px", marginBottom: "5px", flexWrap: "wrap" \}\}>

                                  <span style=\{\{ background: "\#1a1a2e", color: "\#fff", fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "5px" \}\}>\{action\.app\}</span>

                                  <span style=\{\{ fontSize: "13px", fontWeight: "700", color: "\#333" \}\}>\{action\.action\}</span>

                                </div>

                                <div style=\{\{ fontSize: "12px", color: "\#666", lineHeight: 1\.6, background: "\#fff", borderRadius: "6px", padding: "8px 10px", border: "1px solid \#eee", fontFamily: "monospace" \}\}>

                                  \{action\.fields\}

                                </div>

                              </div>

                            </div>

                          \)\)\}

                        </div>

                      </div>

                      \{/\* PRO TIP \*/\}

                      \{zap\.notes && \(

                        <div style=\{\{ marginTop: "14px", background: "\#e8f4fd", borderRadius: "8px", padding: "12px 16px", display: "flex", gap: "8px", alignItems: "flex\-start" \}\}>

                          <span style=\{\{ fontSize: "16px" \}\}>💡</span>

                          <div style=\{\{ fontSize: "13px", color: "\#1a5276", lineHeight: 1\.6 \}\}><strong>Pro tip:</strong> \{zap\.notes\}</div>

                        </div>

                      \)\}

                    </div>

                  \)\}

                </div>

              \)\)\}

            </div>

          </div>

        \)\)\}

        \{/\* QUICK REFERENCE TABLE \*/\}

        <div style=\{\{ background: "\#fff", borderRadius: "14px", padding: "28px", marginTop: "16px", border: "1px solid \#f0f0f0" \}\}>

          <h2 style=\{\{ margin: "0 0 20px", fontWeight: "900", color: "\#1a1a2e", fontSize: "18px" \}\}>⚡ Quick Reference — All Zaps at a Glance</h2>

          <div style=\{\{ overflowX: "auto" \}\}>

            <table style=\{\{ width: "100%", borderCollapse: "collapse", fontSize: "13px" \}\}>

              <thead>

                <tr style=\{\{ borderBottom: "2px solid \#f0f0f0" \}\}>

                  \{\["ID", "Zap Name", "Trigger", "Priority", "Key Action"\]\.map\(h => \(

                    <th key=\{h\} style=\{\{ textAlign: "left", padding: "10px 14px", color: "\#888", fontWeight: "800", textTransform: "uppercase", fontSize: "11px", letterSpacing: "0\.5px" \}\}>\{h\}</th>

                  \)\)\}

                </tr>

              </thead>

              <tbody>

                \{allZaps\.map\(\(zap, i\) => \(

                  <tr key=\{zap\.id\} style=\{\{ borderBottom: "1px solid \#f8f8f8", background: i % 2 === 0 ? "\#fff" : "\#fafafa" \}\}>

                    <td style=\{\{ padding: "10px 14px", fontWeight: "800", color: "\#888", fontFamily: "monospace" \}\}>\{zap\.id\}</td>

                    <td style=\{\{ padding: "10px 14px", fontWeight: "700", color: "\#1a1a2e" \}\}>\{zap\.name\}</td>

                    <td style=\{\{ padding: "10px 14px", color: "\#666" \}\}>\{zap\.trigger\.app\}</td>

                    <td style=\{\{ padding: "10px 14px" \}\}>

                      <span style=\{\{ background: PRIORITY\_COLORS\[zap\.priority\], color: "\#fff", fontSize: "10px", fontWeight: "800", padding: "2px 8px", borderRadius: "10px" \}\}>\{zap\.priority\}</span>

                    </td>

                    <td style=\{\{ padding: "10px 14px", color: "\#555" \}\}>\{zap\.actions\[0\]?\.action\}</td>

                  </tr>

                \)\)\}

              </tbody>

            </table>

          </div>

        </div>

        \{/\* FOOTER CTA \*/\}

        <div style=\{\{ background: "linear\-gradient\(135deg, \#1a1a2e, \#0f3460\)", borderRadius: "14px", padding: "36px", marginTop: "28px", textAlign: "center", color: "\#fff" \}\}>

          <h2 style=\{\{ margin: "0 0 12px", fontWeight: "900", fontSize: "22px" \}\}>Build the CRITICAL Zaps First</h2>

          <p style=\{\{ color: "rgba\(255,255,255,0\.8\)", fontSize: "15px", lineHeight: 1\.7, marginBottom: "24px", maxWidth: "580px", margin: "0 auto 24px" \}\}>

            Z\-01, Z\-02, Z\-09, Z\-10 are the backbone\. Build those 4 first and you'll have a machine that captures leads, follows up automatically, and blasts buyers the moment you go under contract\.

          </p>

          <div style=\{\{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" \}\}>

            <a href="https://zapier\.com/app/zaps" target="\_blank" rel="noopener noreferrer" style=\{\{ background: "\#FF4F00", color: "\#fff", padding: "12px 28px", borderRadius: "8px", textDecoration: "none", fontWeight: "800", fontSize: "14px" \}\}>

              Open Zapier →

            </a>

            <a href="/CRM" style=\{\{ background: "rgba\(255,255,255,0\.1\)", color: "\#fff", padding: "12px 28px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "14px", border: "1px solid rgba\(255,255,255,0\.2\)" \}\}>

              Open CRM →

            </a>

            <button onClick=\{handlePrint\} className="no\-print" style=\{\{ background: "\#f5c518", color: "\#1a1a2e", border: "none", borderRadius: "8px", padding: "12px 28px", fontWeight: "800", fontSize: "14px", cursor: "pointer" \}\}>

              🖨️ Save as PDF

            </button>

          </div>

          <div style=\{\{ marginTop: "20px", fontSize: "13px", color: "rgba\(255,255,255,0\.5\)" \}\}>

            Jacob Levy · Home\-Link Realty Group LLC · \{PHONE\}

          </div>

        </div>

      </div>

    </div>

  \);

\}
