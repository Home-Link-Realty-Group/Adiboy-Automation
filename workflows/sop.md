# sop

Source: sop.docx

import \{ useState \} from "react";

const NAVY = "\#0B1F45";

const NAVY2 = "\#122B5E";

const GOLD = "\#D4A843";

const RED = "\#c0392b";

const GREEN = "\#27AE60";

const WHITE = "\#FFFFFF";

// ─────────────────────────────────────────────────────────────────────────────

// HOME\-LINK REALTY GROUP — MASTER SOP WHITEBOARD

// Every operational process\. Every step\. In order\. No skipping\.

// ─────────────────────────────────────────────────────────────────────────────

const SOPS = \[

  \{

    id: "lead\_import",

    title: "Lead Import from PropWire",

    page: "LeadImport",

    icon: "📥",

    danger: "Importing without filtering = 7,000 leads scoring 15/100\. Waste of time\.",

    prereqs: \["PropWire account logged in", "Know your target market \(city/zip\)", "Understand what distressed means"\],

    steps: \[

      \{

        num: 1,

        title: "Set PropWire Filters BEFORE Exporting",

        color: RED,

        critical: true,

        detail: "Go to PropWire → List Builder → Apply ALL of these filters:",

        checklist: \[

          "✅ Property Type = Single Family Residence",

          "✅ Owner Occupied = No \(Absentee Owner\)",

          "✅ Ownership Length = 10\+ years",

          "✅ Estimated Equity % = 30% minimum",

          "✅ Stack at least ONE distress flag: Vacant=Yes OR Tax Delinquent=Yes OR Pre\-Foreclosure=Yes OR Default Amount > 0",

          "✅ Target your specific zip codes or city",

          "⛔ DO NOT export without distress flags — you will get generic homeowners who score 15/100",

        \]

      \},

      \{

        num: 2,

        title: "Export the CSV from PropWire",

        color: GOLD,

        detail: "Download the filtered list as CSV\. Check that these columns are included:",

        checklist: \[

          "Owner 1 First Name / Last Name",

          "Address, City, State, Zip",

          "Estimated Equity Percent",

          "Estimated Value",

          "Open Mortgage Balance",

          "Vacant? \(Yes/No\)",

          "Owner Occupied \(0=Absentee, 1=Occupied\)",

          "Status \(check for FORECLOSURE / PRE\-FORECLOSURE\)",

          "Default Amount \(> 0 = in default\)",

          "Ownership Length \(Months\)",

          "Days on Market \(if listed\)",

        \]

      \},

      \{

        num: 3,

        title: "Go to LeadImport Page — Upload CSV",

        color: GOLD,

        detail: "Navigate to LeadImport in the app\. Upload your CSV file\. The system will map PropWire columns automatically\.",

        checklist: \[

          "Upload the CSV file",

          "Verify column mapping looks correct",

          "Check that Equity % populated",

          "Check that Vacant flag populated",

          "Check that Pre\-Foreclosure/Default populated",

        \]

      \},

      \{

        num: 4,

        title: "Run Skip Trace on Imported Leads",

        color: GOLD,

        detail: "PropWire gives you property data\. You still need phone numbers\. Go to SkipTracer page AFTER import\.",

        checklist: \[

          "Open SkipTracer page",

          "Select the batch you just imported",

          "Run skip trace \(costs Apify credits — ~$0\.10/lead\)",

          "Phone numbers populate into CRM",

          "⛔ Do NOT call until skip trace completes",

        \]

      \},

      \{

        num: 5,

        title: "Review Scores \+ Start Calling",

        color: GREEN,

        detail: "Go to CRM → Sort by Motivation Score\. Call leads scoring 50\+ first\.",

        checklist: \[

          "Open CRM → Sort: Motivation Score \(high to low\)",

          "Leads scoring 50\-69 = call today",

          "Leads scoring 70\+ = call IMMEDIATELY",

          "As you talk to them → fill in Timeline, Condition, Situation",

          "Score updates automatically as you add info",

          "Leads scoring 30\-49 → enter 15\-touch sequence",

          "Leads scoring under 30 → long\-term nurture only",

        \]

      \}

    \]

  \},

  \{

    id: "automation\_center",

    title: "Turning On Automations",

    page: "AutomationCenter",

    icon: "⚙️",

    danger: "Activating automations without prereqs = runaway credit burn\. Facebook sync ran 109x with no lead form\.",

    prereqs: \["Read ALL steps before touching any toggle", "Verify each prerequisite is 100% complete", "Only activate ONE automation at a time"\],

    steps: \[

      \{

        num: 1,

        title: "Speed\-to\-Lead Alert — Prerequisites",

        color: GOLD,

        critical: false,

        detail: "Safe to turn ON\. Fires when a new lead is created\. Sends you SMS \+ email\.",

        checklist: \[

          "✅ Twilio active \(TWILIO\_ACCOUNT\_SID \+ AUTH\_TOKEN set\)",

          "✅ Your personal cell \(337\) 485\-7368 is correct in the function",

          "✅ Resend API key active \(re\_jPnZkjQk\.\.\.\)",

          "STATUS: ✅ READY TO USE",

        \]

      \},

      \{

        num: 2,

        title: "Daily Master Report — Prerequisites",

        color: GOLD,

        detail: "Safe to turn ON\. Sends you a morning summary every day at 8am\.",

        checklist: \[

          "✅ Twilio active",

          "✅ Resend active",

          "✅ Has leads in CRM to report on",

          "STATUS: ✅ READY TO USE",

        \]

      \},

      \{

        num: 3,

        title: "Nurture Engine \(Auto SMS/Email\) — Prerequisites",

        color: GOLD,

        critical: true,

        detail: "Only ONE nurture engine should be active\. 'Auto Nurture Engine' is the active one\. The other is OFF\.",

        checklist: \[

          "✅ Twilio active for SMS",

          "✅ Resend active for email",

          "✅ Leads have FollowUp records created \(via 15\-touch sequence\)",

          "⛔ 'Nurture Engine — Daily 8:30 AM CT' is PAUSED — do not re\-enable",

          "✅ 'Auto Nurture Engine — Daily 8:30 AM CT' is the ACTIVE ONE",

          "STATUS: ✅ ACTIVE — runs every morning 8:30am CT",

        \]

      \},

      \{

        num: 4,

        title: "Facebook Lead Sync — Prerequisites",

        color: RED,

        critical: true,

        detail: "DO NOT TURN ON until ALL of these are complete\. This ran 109 times with no lead form and burned credits\.",

        checklist: \[

          "⛔ CURRENTLY OFF — do not enable yet",

          "\[ \] Step 1: Create a Lead Ad Form in Meta Ads Manager \(facebook\.com/adsmanager\)",

          "\[ \] Step 2: Attach the form to an active Ad Campaign",

          "\[ \] Step 3: Get the Form ID from Meta and add to \.env as META\_LEAD\_FORM\_ID",

          "\[ \] Step 4: Create a test lead submission to verify it works",

          "\[ \] Step 5: THEN turn this automation back on",

          "⚠️ When you turn it on — it will run every 15 min\. That is 96x/day\.",

          "⚠️ Recommendation: Change to hourly after verifying it works",

        \]

      \},

      \{

        num: 5,

        title: "RVM Auto\-Drop — Prerequisites",

        color: GOLD,

        detail: "Fires ringless voicemails at 10am daily\. Requires Slybroadcast or Drop Cowboy account\.",

        checklist: \[

          "\[ \] Create account at slybroadcast\.com OR dropcowboy\.com",

          "\[ \] Record your voicemail audio file \(30 sec max\)",

          "\[ \] Add API credentials to \.env",

          "\[ \] Add SLYBROADCAST\_API\_KEY or DROPCOWBOY\_API\_KEY",

          "\[ \] Test with 1 lead before activating",

          "\[ \] Then activate — runs daily 10am CT",

        \]

      \},

      \{

        num: 6,

        title: "Win\-Back Sequence — Prerequisites",

        color: GOLD,

        detail: "Re\-engages dead leads every Tuesday\. Safe but only useful once you have dead leads\.",

        checklist: \[

          "\[ \] Have at least 20\+ leads marked 'Dead' in CRM",

          "\[ \] Twilio \+ Resend active",

          "\[ \] Then activate — runs Tuesdays 9am CT",

        \]

      \}

    \]

  \},

  \{

    id: "meta\_campaign",

    title: "Meta / Facebook Ads Setup",

    page: "MetaCampaign",

    icon: "📣",

    danger: "Running ads without a lead form = spending money with nowhere to capture leads\.",

    prereqs: \["Facebook Business Manager access", "Meta Pixel installed on your site \(✅ already done\)", "Budget ready \($10\-30/day minimum\)"\],

    steps: \[

      \{

        num: 1,

        title: "Create Your Lead Ad Form in Meta",

        color: RED,

        critical: true,

        detail: "Go to facebook\.com/adsmanager → Instant Forms → Create Form",

        checklist: \[

          "Form type: More Volume \(for quantity\) OR Higher Intent \(for quality\)",

          "Questions: Name, Phone Number, Address, What is your situation?",

          "Add privacy policy URL: homelinkrealtygroup\.base44\.app/Terms",

          "Add TrustedForm script to capture TCPA consent",

          "Test the form — submit a fake lead yourself first",

          "Copy the Form ID — you will need it",

        \]

      \},

      \{

        num: 2,

        title: "Set Up Your Ad Campaign",

        color: GOLD,

        detail: "Campaign objective = Leads\. Target motivated seller demographics\.",

        checklist: \[

          "Objective: Leads",

          "Audience: 35\-65 age range, homeowners, your target zip codes",

          "Budget: $10\-30/day to start",

          "Ad creative: Use the templates in your GrowthPlaybook page",

          "Attach the Lead Form you created in Step 1",

        \]

      \},

      \{

        num: 3,

        title: "Add Form ID to App Environment",

        color: GOLD,

        detail: "The Facebook sync needs to know which form to pull leads from\.",

        checklist: \[

          "Copy your Form ID from Meta Ads Manager",

          "Contact support or add META\_LEAD\_FORM\_ID to your app secrets",

          "This tells the sync exactly where to pull leads from",

        \]

      \},

      \{

        num: 4,

        title: "Turn On Facebook Lead Sync",

        color: GREEN,

        detail: "ONLY after Steps 1\-3 are complete\.",

        checklist: \[

          "Go to AutomationCenter page",

          "Find 'Facebook Lead Sync — Every 15 Min'",

          "Toggle it ON",

          "Submit a test lead through the form",

          "Verify it appears in your CRM within 15 minutes",

        \]

      \},

      \{

        num: 5,

        title: "Monitor \+ Optimize",

        color: GREEN,

        detail: "Check results daily for the first 2 weeks\.",

        checklist: \[

          "Check CRM daily for new Facebook leads",

          "Track Cost Per Lead \(target: under $30\)",

          "Pause ads with CTR under 1%",

          "Scale budget on ads with CTR above 2%",

          "Check lead quality — are they scoring 40\+?",

        \]

      \}

    \]

  \},

  \{

    id: "cold\_calling",

    title: "Cold Calling from CRM / CallLists",

    page: "CallLists",

    icon: "📞",

    danger: "Calling without a script or sorted list = low contact rate, no offers made\.",

    prereqs: \["Leads imported AND skip traced \(have phone numbers\)", "CRM open in another tab", "Cold call scripts reviewed \(CRM → Scripts tab\)"\],

    steps: \[

      \{

        num: 1,

        title: "Build Your Call List for the Day",

        color: GOLD,

        detail: "Go to CallLists page\. Filter by score and status\.",

        checklist: \[

          "Sort by Motivation Score — highest first",

          "Filter Status = New OR Attempted Contact",

          "Target 50\-100 calls per session",

          "Focus on leads scoring 40\+ first",

          "Have CRM open to update lead as you talk",

        \]

      \},

      \{

        num: 2,

        title: "Review Scripts BEFORE Dialing",

        color: GOLD,

        detail: "Go to CRM → Cold Call Scripts tab\. Read through opener and objection handlers\.",

        checklist: \[

          "Read Opening Script \(Stage: Opener\)",

          "Read Fact\-Finding Script \(Stage: Fact\-Finding\)",

          "Read Offer Presentation Script \(Stage: Offer\)",

          "Have Objection Handler ready",

          "Know your exit: 'I can close in 7\-21 days, cash, as\-is'",

        \]

      \},

      \{

        num: 3,

        title: "Dial — Use Local Presence",

        color: GOLD,

        detail: "The system auto\-matches your outbound caller ID to the lead's area code\.",

        checklist: \[

          "Dallas leads \(214/972/469\) → shows \(972\) 994\-1658",

          "Indianapolis leads \(317/463\) → shows \(317\) 214\-8802",

          "All others → shows \(855\) 810\-1786",

          "Click the phone icon in CRM to initiate call",

          "Do NOT call from your personal number",

        \]

      \},

      \{

        num: 4,

        title: "During the Call — Fill In CRM Fields",

        color: GOLD,

        detail: "Every field you fill in during the call raises the motivation score\.",

        checklist: \[

          "Ask \+ fill: Timeline \(ASAP / 30 days / 60 days / 90 days\)",

          "Ask \+ fill: Condition \(poor / fair / good / excellent\)",

          "Ask \+ fill: Situation \(what's going on?\)",

          "Ask \+ fill: Ownership years",

          "Note any flags: foreclosure, divorce, medical, job loss",

          "Score auto\-updates as you type",

        \]

      \},

      \{

        num: 5,

        title: "After the Call — Update Status \+ Schedule Follow\-Up",

        color: GREEN,

        detail: "Never leave a call without a next action\.",

        checklist: \[

          "Update Status: New → Contacted → Offer Made → Under Contract",

          "Set Next Follow\-Up Date",

          "Add notes about what they said",

          "If score 70\+ → make offer today",

          "If score 40\-69 → schedule callback within 48 hours",

          "If score under 40 → add to 15\-touch nurture sequence",

        \]

      \}

    \]

  \},

  \{

    id: "skip\_tracer",

    title: "Skip Tracing Leads",

    page: "SkipTracer",

    icon: "🔍",

    danger: "Running skip trace on leads already in CRM with phone numbers = wasting Apify credits\.",

    prereqs: \["Apify account active \(APIFY\_API\_TOKEN set\)", "Leads already imported to CRM WITHOUT phone numbers"\],

    steps: \[

      \{

        num: 1,

        title: "Confirm Leads Need Skip Tracing",

        color: GOLD,

        detail: "Only skip trace leads that have NO phone number\. Check CRM first\.",

        checklist: \[

          "Go to CRM — filter leads with empty phone field",

          "Count how many need tracing",

          "Each trace costs ~$0\.10 Apify credits",

          "Budget: 100 leads = ~$10, 1,000 leads = ~$100",

          "⛔ Do NOT skip trace leads that already have phones",

        \]

      \},

      \{

        num: 2,

        title: "Go to SkipTracer Page — Enter Lead Info",

        color: GOLD,

        detail: "The SkipTracer uses property address \+ owner name to find phone numbers\.",

        checklist: \[

          "Enter: Owner First Name, Last Name",

          "Enter: Property Address, City, State, Zip",

          "Click Skip Trace",

          "Wait 10\-30 seconds for results",

        \]

      \},

      \{

        num: 3,

        title: "Review Results \+ Save to CRM",

        color: GOLD,

        detail: "Apify returns multiple phone numbers ranked by confidence\.",

        checklist: \[

          "Review phone numbers returned",

          "Select the best match \(highest confidence score\)",

          "Click 'Save to Lead' to update CRM record",

          "Verify phone populated in CRM before calling",

        \]

      \},

      \{

        num: 4,

        title: "Batch Skip Trace via ListBuilder",

        color: GREEN,

        detail: "For large lists \(100\+ leads\) use ListBuilder page batch trace feature\.",

        checklist: \[

          "Go to ListBuilder page",

          "Upload CSV or select imported list",

          "Click 'Batch Skip Trace'",

          "Wait for completion \(may take 10\-30 minutes for large lists\)",

          "Download results \+ re\-import to CRM",

        \]

      \}

    \]

  \},

  \{

    id: "rvm",

    title: "RVM \(Ringless Voicemail\) Drops",

    page: "RVM",

    icon: "📱",

    danger: "RVM without Slybroadcast/Drop Cowboy account = automation fires but nothing sends\.",

    prereqs: \["Slybroadcast\.com OR DropCowboy\.com account created", "Voicemail recorded \(30 sec max\)", "API key added to app secrets", "Leads in 15\-touch sequence with RVM touches scheduled"\],

    steps: \[

      \{

        num: 1,

        title: "Create RVM Account",

        color: RED,

        critical: true,

        detail: "You need a Slybroadcast or Drop Cowboy account BEFORE this works\.",

        checklist: \[

          "Go to slybroadcast\.com OR dropcowboy\.com",

          "Create account \+ add credits \(~$50 to start = ~500 drops\)",

          "Record your voicemail message \(30 sec max\)",

          "Script: 'Hey this is Jacob with Home\-Link Realty Group — I'm looking to buy houses in your area for cash\. If you've been thinking about selling, give me a call back at \(855\) 810\-1786\. No obligation, totally free\. Talk soon\.'",

          "Get your API key from account settings",

        \]

      \},

      \{

        num: 2,

        title: "Add API Key to App",

        color: GOLD,

        detail: "The RVM function needs your API credentials to fire drops\.",

        checklist: \[

          "Go to app settings → Secrets",

          "Add: SLYBROADCAST\_API\_KEY = \[your key\]",

          "OR add: DROPCOWBOY\_API\_KEY = \[your key\]",

          "Test with 1 lead first",

        \]

      \},

      \{

        num: 3,

        title: "Verify 15\-Touch Sequence Has RVM Touches",

        color: GOLD,

        detail: "RVM drops fire on Touch 3, Touch 7, and Touch 12 of your sequence\.",

        checklist: \[

          "Go to CRM → find a lead with an active sequence",

          "Check FollowUp records: method = 'RVM' on touches 3, 7, 12",

          "Confirm those FollowUp records exist before expecting drops to fire",

        \]

      \},

      \{

        num: 4,

        title: "RVM Auto\-Drop Automation",

        color: GREEN,

        detail: "Fires daily at 10am CT automatically once account is set up\.",

        checklist: \[

          "Automation: 'RVM Auto\-Drop — Daily 10 AM CT' is ACTIVE",

          "It scans all FollowUp records with method=RVM scheduled for today",

          "Fires each drop, marks Completed, logs to CRM notes",

          "You receive a summary email with every drop that fired",

        \]

      \}

    \]

  \},

  \{

    id: "deal\_room",

    title: "Working a Deal \(DealRoom\)",

    page: "DealRoom",

    icon: "🤝",

    danger: "Opening a deal without a signed contract = premature — you have nothing locked up yet\.",

    prereqs: \["Verbal agreement from seller on price", "Purchase & Sale Agreement ready \(in Dropbox\)", "Title company selected", "Buyer list ready to blast"\],

    steps: \[

      \{

        num: 1,

        title: "Get Verbal Agreement on Price",

        color: GOLD,

        detail: "Before anything else — seller must verbally agree to your offer number\.",

        checklist: \[

          "ARV confirmed \(use DealAnalyzer page\)",

          "MAO calculated: ARV × 70% − Repairs",

          "Seller says YES to your offer number",

          "Set a deadline: 'I can get you the paperwork by \[tomorrow\]'",

        \]

      \},

      \{

        num: 2,

        title: "Send Contract via ESign",

        color: GOLD,

        detail: "Go to ESign page\. Use Purchase & Sale Agreement template\.",

        checklist: \[

          "Go to ESign page",

          "Fill in: Property address, purchase price, closing date \(21 days default\)",

          "Earnest money: $100\-500 \(keep it low\)",

          "Inspection period: 14 days",

          "Send to seller email for signature",

          "⛔ Do NOT move to Step 3 until contract is signed",

        \]

      \},

      \{

        num: 3,

        title: "Open Deal in DealRoom",

        color: GOLD,

        detail: "ONLY after signed contract received\.",

        checklist: \[

          "Go to DealRoom page",

          "Create new deal: link to Lead record",

          "Fill in: ARV, purchase price, target assignment fee",

          "Set contract date \+ closing date",

          "Upload signed contract",

        \]

      \},

      \{

        num: 4,

        title: "Blast Cash Buyers",

        color: GOLD,

        detail: "Send deal details to your buyer list immediately\.",

        checklist: \[

          "Go to CashBuyer records in CRM",

          "Filter buyers matching: property type, price range, area",

          "Send blast: address, ARV, purchase price, photos, closing date",

          "Use BuyerOutreach function or email manually",

          "First buyer to reply with proof of funds gets it",

        \]

      \},

      \{

        num: 5,

        title: "Assign Contract \+ Close",

        color: GREEN,

        detail: "Buyer found — now assign and collect your fee\.",

        checklist: \[

          "Sign Assignment Agreement \(template in Dropbox\)",

          "Collect assignment fee from buyer at closing",

          "Send to title company: both contracts \+ assignment",

          "Show up to closing OR get wire confirmation",

          "Log revenue in Accounting page",

          "Mark Deal status: Closed ✅",

        \]

      \}

    \]

  \},

  \{

    id: "list\_builder",

    title: "Building Lead Lists \(ListBuilder\)",

    page: "ListBuilder",

    icon: "📋",

    danger: "Pulling random lists without stacking distress filters = 7,000 leads scoring 15/100\. Already happened\.",

    prereqs: \["PropWire account active", "Know your target zip codes", "Know what list type you want \(vacant, absentee, foreclosure, tax delinquent\)"\],

    steps: \[

      \{

        num: 1,

        title: "Choose Your List Type",

        color: GOLD,

        detail: "Each list type targets a different motivated seller situation\. Pick ONE to start\.",

        checklist: \[

          "🏚️ VACANT LIST — Owner not living there, property sitting empty",

          "👻 ABSENTEE OWNER — Mailing address ≠ property address \(landlord or out\-of\-state owner\)",

          "⚖️ PRE\-FORECLOSURE — Foreclosure notice filed, racing against clock",

          "💸 TAX DELINQUENT — Owes back taxes, government can force sale",

          "📅 FSBO 90\+ DAYS — Listed for sale 90\+ days, price reduction, desperate",

          "🏠 FREE & CLEAR — No mortgage, pure equity, flexible seller",

          "STACK 2\-3 of the above for highest motivation scores",

        \]

      \},

      \{

        num: 2,

        title: "Set PropWire Filters",

        color: RED,

        critical: true,

        detail: "This is the most important step\. Wrong filters = garbage leads\.",

        checklist: \[

          "Log into PropWire\.com",

          "Go to: List Builder",

          "Geography: Enter your target zip codes or city",

          "Apply distress filters \(see Step 1 above\)",

          "Ownership Length: 10\+ years minimum",

          "Equity: 30% minimum",

          "Property Type: Single Family only",

          "Preview count — target 500\-2,000 for first batch",

          "⛔ DO NOT export until filters show distressed properties",

        \]

      \},

      \{

        num: 3,

        title: "Export \+ Import to App",

        color: GOLD,

        detail: "Export CSV from PropWire, then import via LeadImport page\.",

        checklist: \[

          "Export CSV from PropWire \(max 5,000/export on free plan\)",

          "Go to LeadImport page in app",

          "Upload the CSV",

          "Verify equity, vacant, and distress fields mapped",

          "Check that scores are appearing \(should see 20\-40\+ on distressed\)",

        \]

      \},

      \{

        num: 4,

        title: "Skip Trace the List",

        color: GOLD,

        detail: "You have addresses but no phone numbers yet\.",

        checklist: \[

          "Go to SkipTracer or use ListBuilder batch trace",

          "Budget $0\.10/lead for Apify skip trace",

          "Wait for phone numbers to populate",

          "Verify 60\-70% phone match rate \(normal\)",

        \]

      \},

      \{

        num: 5,

        title: "Load List into CallLists \+ Start Dialing",

        color: GREEN,

        detail: "Now you have scored, skip\-traced leads ready to call\.",

        checklist: \[

          "Go to CallLists page",

          "Sort by Motivation Score — call 40\+ first",

          "Set daily goal: 50\-100 dials",

          "Track in DailyKPI page",

        \]

      \}

    \]

  \},

\];

const CheckItem = \(\{ text, done, onToggle \}\) => \(

  <div

    onClick=\{onToggle\}

    style=\{\{

      display: "flex", alignItems: "flex\-start", gap: 10, padding: "8px 10px",

      borderRadius: 6, cursor: "pointer", marginBottom: 4,

      background: done ? "\#0d2b0d" : "\#0B1F45",

      border: \`1px solid $\{done ? "\#27AE60" : "\#1e3a5f"\}\`,

      transition: "all 0\.15s"

    \}\}

  >

    <span style=\{\{ fontSize: 16, minWidth: 20, marginTop: 1 \}\}>\{done ? "✅" : "⬜"\}</span>

    <span style=\{\{ fontSize: 13, color: done ? "\#7dcea0" : "\#cdd9e5", textDecoration: done ? "line\-through" : "none", lineHeight: 1\.5 \}\}>\{text\}</span>

  </div>

\);

export default function SOP\(\) \{

  const \[activeSOPId, setActiveSOPId\] = useState\(null\);

  const \[checked, setChecked\] = useState\(\{\}\);

  const activeSOP = SOPS\.find\(s => s\.id === activeSOPId\);

  const toggleCheck = \(sopId, stepNum, itemIdx\) => \{

    const key = \`$\{sopId\}\-$\{stepNum\}\-$\{itemIdx\}\`;

    setChecked\(prev => \(\{ \.\.\.prev, \[key\]: \!prev\[key\] \}\)\);

  \};

  const getStepProgress = \(sopId, stepNum, items\) => \{

    const done = items\.filter\(\(\_, i\) => checked\[\`$\{sopId\}\-$\{stepNum\}\-$\{i\}\`\]\)\.length;

    return \{ done, total: items\.length, pct: Math\.round\(\(done / items\.length\) \* 100\) \};

  \};

  const getSOPProgress = \(sop\) => \{

    let total = 0, done = 0;

    sop\.steps\.forEach\(step => \{

      step\.checklist\.forEach\(\(\_, i\) => \{

        total\+\+;

        if \(checked\[\`$\{sop\.id\}\-$\{step\.num\}\-$\{i\}\`\]\) done\+\+;

      \}\);

    \}\);

    return \{ done, total, pct: total > 0 ? Math\.round\(\(done / total\) \* 100\) : 0 \};

  \};

  return \(

    <div style=\{\{ background: "\#060e1f", minHeight: "100vh", color: WHITE, fontFamily: "'Inter', sans\-serif", padding: "0 0 60px 0" \}\}>

      \{/\* Header \*/\}

      <div style=\{\{ background: NAVY, borderBottom: \`3px solid $\{GOLD\}\`, padding: "20px 24px" \}\}>

        <div style=\{\{ maxWidth: 900, margin: "0 auto" \}\}>

          <div style=\{\{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 \}\}>

            <span style=\{\{ fontSize: 28 \}\}>📋</span>

            <div>

              <div style=\{\{ fontSize: 22, fontWeight: 900, color: GOLD \}\}>HOME\-LINK SOP WHITEBOARD</div>

              <div style=\{\{ fontSize: 13, color: "\#94a3b8" \}\}>Standard Operating Procedures — Read Before You Touch Anything</div>

            </div>

          </div>

          <div style=\{\{ background: "\#0d1b2e", border: \`1px solid $\{RED\}\`, borderRadius: 8, padding: "10px 16px", marginTop: 12 \}\}>

            <span style=\{\{ color: RED, fontWeight: 800, fontSize: 13 \}\}>⚠️ RULE: </span>

            <span style=\{\{ color: "\#f8d7da", fontSize: 13 \}\}>Every process has a required order\. Skipping steps wastes money and produces garbage results\. Read the whiteboard FIRST\. Every time\.</span>

          </div>

        </div>

      </div>

      <div style=\{\{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" \}\}>

        \{/\* SOP Grid \*/\}

        \{\!activeSOP && \(

          <>

            <div style=\{\{ fontSize: 14, color: "\#94a3b8", marginBottom: 20 \}\}>

              Click any process below to open its step\-by\-step whiteboard\. Check off each step as you complete it\.

            </div>

            <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(auto\-fill, minmax\(260px, 1fr\)\)", gap: 16 \}\}>

              \{SOPS\.map\(sop => \{

                const prog = getSOPProgress\(sop\);

                return \(

                  <div

                    key=\{sop\.id\}

                    onClick=\{\(\) => setActiveSOPId\(sop\.id\)\}

                    style=\{\{

                      background: NAVY, border: \`2px solid $\{prog\.pct === 100 ? GREEN : GOLD\}\`,

                      borderRadius: 14, padding: "20px", cursor: "pointer",

                      transition: "all 0\.15s", position: "relative"

                    \}\}

                  >

                    <div style=\{\{ fontSize: 32, marginBottom: 8 \}\}>\{sop\.icon\}</div>

                    <div style=\{\{ fontWeight: 800, fontSize: 15, color: WHITE, marginBottom: 4 \}\}>\{sop\.title\}</div>

                    <div style=\{\{ fontSize: 12, color: GOLD, marginBottom: 10 \}\}>Page: \{sop\.page\}</div>

                    <div style=\{\{ fontSize: 11, color: "\#94a3b8", marginBottom: 12, lineHeight: 1\.5 \}\}>\{sop\.steps\.length\} steps</div>

                    \{/\* Progress bar \*/\}

                    <div style=\{\{ background: "\#0d1b2e", borderRadius: 6, height: 6, overflow: "hidden" \}\}>

                      <div style=\{\{ background: prog\.pct === 100 ? GREEN : GOLD, width: \`$\{prog\.pct\}%\`, height: "100%", transition: "width 0\.3s" \}\} />

                    </div>

                    <div style=\{\{ fontSize: 11, color: "\#94a3b8", marginTop: 4 \}\}>\{prog\.done\}/\{prog\.total\} steps checked</div>

                    \{prog\.pct === 100 && \(

                      <div style=\{\{ position: "absolute", top: 12, right: 12, background: GREEN, color: WHITE, fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 10 \}\}>✅ DONE</div>

                    \)\}

                  </div>

                \);

              \}\)\}

            </div>

          </>

        \)\}

        \{/\* Active SOP Whiteboard \*/\}

        \{activeSOP && \(

          <div>

            <button

              onClick=\{\(\) => setActiveSOPId\(null\)\}

              style=\{\{ background: "none", border: \`1px solid $\{GOLD\}\`, color: GOLD, borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, marginBottom: 20, fontWeight: 700 \}\}

            >

              ← Back to All SOPs

            </button>

            \{/\* Title \*/\}

            <div style=\{\{ background: NAVY, border: \`2px solid $\{GOLD\}\`, borderRadius: 14, padding: "22px 26px", marginBottom: 20 \}\}>

              <div style=\{\{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 \}\}>

                <span style=\{\{ fontSize: 36 \}\}>\{activeSOP\.icon\}</span>

                <div>

                  <div style=\{\{ fontSize: 22, fontWeight: 900, color: GOLD \}\}>\{activeSOP\.title\}</div>

                  <div style=\{\{ fontSize: 13, color: "\#94a3b8" \}\}>Page: \{activeSOP\.page\} — \{activeSOP\.steps\.length\} steps</div>

                </div>

              </div>

              \{/\* Danger warning \*/\}

              <div style=\{\{ background: "\#2a0000", border: \`1px solid $\{RED\}\`, borderRadius: 8, padding: "12px 16px", marginBottom: 14 \}\}>

                <div style=\{\{ color: RED, fontWeight: 800, fontSize: 12, marginBottom: 4 \}\}>⚠️ WHY ORDER MATTERS</div>

                <div style=\{\{ color: "\#f8d7da", fontSize: 13 \}\}>\{activeSOP\.danger\}</div>

              </div>

              \{/\* Prereqs \*/\}

              <div style=\{\{ background: "\#0d1b2e", borderRadius: 8, padding: "12px 16px" \}\}>

                <div style=\{\{ color: GOLD, fontWeight: 800, fontSize: 12, marginBottom: 8 \}\}>📌 BEFORE YOU START — CONFIRM ALL OF THESE:</div>

                \{activeSOP\.prereqs\.map\(\(p, i\) => \(

                  <div key=\{i\} style=\{\{ fontSize: 13, color: "\#94a3b8", marginBottom: 4 \}\}>• \{p\}</div>

                \)\)\}

              </div>

            </div>

            \{/\* Steps \*/\}

            \{activeSOP\.steps\.map\(\(step\) => \{

              const prog = getStepProgress\(activeSOP\.id, step\.num, step\.checklist\);

              const allDone = prog\.done === prog\.total;

              return \(

                <div

                  key=\{step\.num\}

                  style=\{\{

                    background: allDone ? "\#0d2b0d" : NAVY2,

                    border: \`2px solid $\{allDone ? GREEN : step\.color\}\`,

                    borderRadius: 14, padding: "20px 24px", marginBottom: 16,

                    transition: "all 0\.2s"

                  \}\}

                >

                  \{/\* Step header \*/\}

                  <div style=\{\{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 \}\}>

                    <div style=\{\{

                      width: 36, height: 36, borderRadius: "50%",

                      background: allDone ? GREEN : step\.color,

                      color: WHITE, fontWeight: 900, fontSize: 16,

                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0

                    \}\}>

                      \{allDone ? "✓" : step\.num\}

                    </div>

                    <div style=\{\{ flex: 1 \}\}>

                      <div style=\{\{ fontWeight: 800, fontSize: 16, color: WHITE \}\}>\{step\.title\}</div>

                      \{step\.critical && <span style=\{\{ background: RED, color: WHITE, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, marginTop: 4, display: "inline\-block" \}\}>🚨 CRITICAL — DO NOT SKIP</span>\}

                    </div>

                    <div style=\{\{ textAlign: "right" \}\}>

                      <div style=\{\{ fontSize: 18, fontWeight: 900, color: allDone ? GREEN : step\.color \}\}>\{prog\.pct\}%</div>

                      <div style=\{\{ fontSize: 11, color: "\#94a3b8" \}\}>\{prog\.done\}/\{prog\.total\}</div>

                    </div>

                  </div>

                  \{/\* Detail \*/\}

                  <div style=\{\{ fontSize: 13, color: "\#94a3b8", marginBottom: 14, fontStyle: "italic" \}\}>\{step\.detail\}</div>

                  \{/\* Progress bar \*/\}

                  <div style=\{\{ background: "\#060e1f", borderRadius: 6, height: 4, marginBottom: 14, overflow: "hidden" \}\}>

                    <div style=\{\{ background: allDone ? GREEN : step\.color, width: \`$\{prog\.pct\}%\`, height: "100%", transition: "width 0\.3s" \}\} />

                  </div>

                  \{/\* Checklist \*/\}

                  <div>

                    \{step\.checklist\.map\(\(item, idx\) => \(

                      <CheckItem

                        key=\{idx\}

                        text=\{item\}

                        done=\{\!\!checked\[\`$\{activeSOP\.id\}\-$\{step\.num\}\-$\{idx\}\`\]\}

                        onToggle=\{\(\) => toggleCheck\(activeSOP\.id, step\.num, idx\)\}

                      />

                    \)\)\}

                  </div>

                </div>

              \);

            \}\)\}

            \{/\* Overall progress \*/\}

            \{\(\(\) => \{

              const prog = getSOPProgress\(activeSOP\);

              return \(

                <div style=\{\{ background: prog\.pct === 100 ? "\#0d2b0d" : NAVY, border: \`2px solid $\{prog\.pct === 100 ? GREEN : GOLD\}\`, borderRadius: 14, padding: "20px 24px", marginTop: 8, textAlign: "center" \}\}>

                  <div style=\{\{ fontSize: 32, marginBottom: 8 \}\}>\{prog\.pct === 100 ? "🎉" : "⏳"\}</div>

                  <div style=\{\{ fontWeight: 900, fontSize: 20, color: prog\.pct === 100 ? GREEN : GOLD \}\}>

                    \{prog\.pct === 100 ? "ALL STEPS COMPLETE — YOU\\'RE GOOD TO GO" : \`$\{prog\.pct\}% Complete — $\{prog\.total \- prog\.done\} steps remaining\`\}

                  </div>

                  <div style=\{\{ background: "\#060e1f", borderRadius: 8, height: 10, margin: "16px 0 0 0", overflow: "hidden" \}\}>

                    <div style=\{\{ background: prog\.pct === 100 ? GREEN : GOLD, width: \`$\{prog\.pct\}%\`, height: "100%", transition: "width 0\.3s" \}\} />

                  </div>

                </div>

              \);

            \}\)\(\)\}

          </div>

        \)\}

      </div>

    </div>

  \);

\}
