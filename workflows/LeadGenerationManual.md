# LeadGenerationManual

Source: LeadGenerationManual.docx

\# Home\-Link Realty Group — Outbound Lead Generation Manual

\#\# Complete Workflow: From Finding Leads to Closing Deals

\-\-\-

\#\# PHASE 1: SOURCING & FINDING LEADS

\#\#\# Step 1: Choose Your Lead Source

Your application supports multiple lead sourcing methods:

\#\#\#\# \*\*Option A: Free/Low\-Cost Sources \(Best for Starting\)\*\*

\- \*\*Craigslist FSBO\*\* → \`/HQ\` → Lead Sources tab

  \- Search: "sell house", "motivated seller", "cash", etc\.

  \- Filter by zip code and sort by newest

  \- Copy addresses \+ phone numbers manually into a spreadsheet

  

\- \*\*Facebook Marketplace\*\* → Property rentals section

  \- Filter "Houses for Sale" 

  \- Look for "For Sale by Owner" posts

  \- DM sellers or note their contact info

\- \*\*Zillow FSBO\*\* → Filter by "For Sale by Owner"

  \- Sort by "oldest listing first" \(more distressed\)

  \- Copy addresses for skip tracing

\- \*\*HUD Home Store\*\* → Bank\-owned foreclosures

  \- Filter by your target state/city

  \- These are already below market — easier to negotiate

\#\#\#\# \*\*Option B: Paid Data Services \(Better for Scale\)\*\*

\- \*\*PropWire\*\* → \`/ListBuilder\` → Data Sources tab

  \- Tax delinquent lists

  \- Absentee owner lists

  \- Vacant property lists

  \- Pre\-foreclosure lists

  \- Direct CSV export → upload to app

  

\- \*\*Apify Skip Tracing\*\* → Built into \`/SkipTracer\`

  \- Upload addresses → get phone \+ email automatically

  \- $0\.10–0\.50 per record

  \- Fastest way to enrich leads with contact info

\#\#\#\# \*\*Option C: List Builder Wizard \(All\-in\-One\)\*\*

Navigate to \`/ListBuilder\`:

1\. Select lead type \(FSBO, Absentee, Tax Delinquent, Pre\-Foreclosure, Probate\)

2\. Choose data source \(CSV paste, file upload, or manual\)

3\. Map columns \(Address, Owner, Phone, Email\)

4\. Run skip trace to fill missing phone numbers

5\. Auto\-import directly to CRM

\-\-\-

\#\# PHASE 2: IMPORTING LEADS INTO YOUR APP

\#\#\# Step 2A: Bulk Import via ListBuilder \(Easiest\)

1\. Go to \`/ListBuilder\`

2\. Paste or upload CSV with columns:

   \- \`name\` \(seller name\)

   \- \`address\` \(property address\)

   \- \`city\`, \`state\`, \`zip\`

   \- \`phone\` \(optional — will skip trace if missing\)

   \- \`email\` \(optional\)

   \- \`property\_type\` \(e\.g\., "Single Family"\)

   \- \`situation\` \(e\.g\., "Foreclosure", "Inherited", "Divorce"\)

3\. Click \*\*Import to CRM\*\* → Leads created instantly

4\. System auto\-calculates motivation scores

\#\#\# Step 2B: Manual Import via LeadImport Page

1\. Go to \`/LeadImport\`

2\. Manually enter each lead:

   \- Name, phone, email

   \- Property address, city, state, zip

   \- Situation \(select from dropdown\)

   \- Notes about the property

3\. Save → Lead appears in CRM immediately

\#\#\# Step 2C: Skip Trace Missing Phone Numbers

\*\*If you have addresses but no phone numbers:\*\*

1\. Go to \`/SkipTracer\`

2\. Paste addresses \(one per line\) or upload CSV

3\. Click \*\*Run Skip Trace\*\* → System enriches with phones/emails

4\. Review results → Click \*\*Push to CRM\*\* → Import all at once

\-\-\-

\#\# PHASE 3: QUALIFY & PRIORITIZE LEADS

\#\#\# Step 3: Score Leads in the CRM

Navigate to \`/CRM\`:

\*\*Automatic Scoring:\*\*

\- App calculates motivation score \(0–20\) based on:

  \- \*\*Equity\*\*: Does seller have room to negotiate?

  \- \*\*Distress\*\*: Foreclosure, tax lien, probate = higher score

  \- \*\*Condition\*\*: Poor condition = easier to buy low

  \- \*\*Urgency\*\*: ASAP / 30\-day timeline = highest priority

\*\*Manual Scoring \(Optional\):\*\*

1\. Click on a lead

2\. Set custom scores for Equity, Distress, Condition, Urgency

3\. Mark Priority: 🔥 Hot / 🌡️ Warm / ❄️ Cold

4\. Add notes about why

\*\*Filter Queue:\*\*

\- \*\*Call Queue\*\* → Shows only leads scoring 12\+/20

\- \*\*Hot Leads\*\* → Priority = 🔥

\- \*\*New Leads\*\* → Status = "New Lead"

\-\-\-

\#\# PHASE 4: OUTBOUND CALLING & FOLLOW\-UP

\#\#\# Step 4A: Use Call Lists for Daily Dialing

Navigate to \`/CallLists\`:

1\. \*\*Open Today's Queue:\*\*

   \- Sorted by motivation score \(highest = call first\)

   \- Filter by "Due Today" or "Overdue" for follow\-ups

   \- Shows lead score, property details, last contact date

2\. \*\*Start a Call:\*\*

   \- Click \*\*📞 Call\*\* button → Initiates outbound Twilio call

   \- Answer on your cell phone → Connected to lead

   \- OR use \*\*Script\*\* button to view exact talking points

3\. \*\*Follow the 5\-Step Script:\*\*

   \- \*\*Step 1: Introduction\*\* — Introduce yourself & reason for call

   \- \*\*Step 2: Fact\-Finding\*\* — Understand their situation

   \- \*\*Step 3: Discuss the House\*\* — Property condition outside→in

   \- \*\*Step 4: Make Offer\*\* — Present your number

   \- \*\*Step 5: Close\*\* — Get commitment or next contact date

4\. \*\*Log the Outcome:\*\*

   \- No Answer

   \- Left Voicemail

   \- Not Interested

   \- Callback Requested

   \- Interested — Needs Time

   \- Offer Made ⭐

   \- Under Contract 🏆

5\. \*\*Track Session KPIs:\*\*

   \- Target: 60\+ dials/day

   \- Target: 3\.5\+ hours talk time

   \- Target: 3–4 offers/day

   \- Dashboard updates in real\-time

\#\#\# Step 4B: Save Lead Intake Sheet \(During or After Call\)

While on the call, document:

1\. Click \*\*📝 Intake Sheet\*\* tab in call panel

2\. Fill in as you go:

   \- Seller situation \(foreclosure, divorce, etc\.\)

   \- Property condition \(roof age, HVAC, foundation\)

   \- Financials \(mortgage balance, asking price, ARV estimate\)

   \- Your repair estimate

   \- Offer amount

   \- Seller's response

3\. \*\*Post\-Call Motivation Re\-Score:\*\*

   \- Update Equity / Distress / Condition / Urgency scores

   \- Override priority \(Hot / Warm / Cold\)

   \- Add re\-score notes

4\. Click \*\*💾 Save to CRM\*\* → Data persists for follow\-ups

\#\#\# Step 4C: Send Written Offer \(In\-Call or Post\-Call\)

1\. Click \*\*💵 Send Offer\*\* tab

2\. Fill in:

   \- Seller's email \(required\)

   \- Offer amount \(required\)

   \- Property address

   \- ARV estimate

   \- Closing timeline \(default: 7–21 days\)

   \- Earnest money amount

3\. Click \*\*📤 Send Offer Letter\*\* → Branded email to seller instantly

4\. System logs "Offer Made" status in CRM

5\. Auto\-schedules 48\-hour follow\-up

\-\-\-

\#\# PHASE 5: MANAGE FOLLOW\-UPS

\#\#\# Step 5: Track & Schedule Callbacks

Go to \`/CRM\` → \*\*Follow\-Ups Tab:\*\*

\*\*Today's Queue:\*\*

\- Shows all callbacks scheduled for today

\- Status: Scheduled, Completed, Skipped

\- Method: Call, SMS, Email, Voicemail

\*\*Overdue Follow\-Ups:\*\*

\- Red banner shows missed follow\-ups

\- Prioritize these — best conversion rate

\*\*Auto\-Scheduling:\*\*

\- After each call outcome, system auto\-schedules next touch:

  \- No Answer → Callback in 4 hours

  \- Left Voicemail → Follow\-up SMS in 2 hours

  \- Interested → Send offer by email today

  \- Offer Made → Follow\-up in 48 hours

  \- Not Interested → Re\-engage in 90 days

\-\-\-

\#\# PHASE 6: TRACK DEALS & REVENUE

\#\#\# Step 6A: Log Closed Deals

Go to \`/Accounting\`:

When you close a deal:

1\. Click \*\*\+ New Deal\*\*

2\. Enter:

   \- Lead name & property address

   \- Purchase price \(seller's number\)

   \- Assignment fee \(your profit\)

   \- Buyer name & contact

   \- Contract & closing dates

   \- Notes

3\. Mark status: \*\*Closed\*\* → Counted toward monthly revenue

\#\#\# Step 6B: Monitor KPIs & Pipeline

Go to \`/HQ\` → \*\*War Room Tab:\*\*

\*\*Top Stats Strip:\*\*

\- Total Leads

\- Active Leads \(not Dead/Closed\)

\- New Today

\- Hot Leads

\- Under Contract

\- Monthly Revenue

\*\*Pipeline Funnel:\*\*

\- New Lead → Attempted Contact → Offer Made → Under Contract → Closed

\*\*Revenue Panel:\*\*

\- Month\-to\-date revenue

\- Last month comparison

\- 6\-month trend

\- Pipeline value \(deals in progress\)

\-\-\-

\#\# PHASE 7: OPTIMIZE & SCALE

\#\#\# Step 7A: Review Call Grades

Go to \`/CallGrade\`:

1\. Upload call recording URL \(if recorded\)

2\. Paste call transcript

3\. AI grades your call on:

   \- Rapport \(connection quality\)

   \- Discovery \(finding their pain points\)

   \- Objection handling

   \- Closing \(getting commitment\)

   \- Tonality & energy

4\. Get coaching tips for next call

5\. Track improvement over time

\#\#\# Step 7B: Analyze Lead Sources

Go to \`/HQ\` → \*\*Lead Source Breakdown:\*\*

\- Which source converts best? \(FSBO vs\. Craigslist vs\. PropWire\)

\- Which provides highest motivation scores?

\- Which has lowest cost per deal?

\- Double down on winners, cut low performers

\#\#\# Step 7C: Build Your Scripts & Objection Handlers

Go to \`/CallLists\` → \*\*Scripts Tab:\*\*

1\. Review Eric Cline's 5\-step process

2\. Customize by lead type \(FSBO, Pre\-Foreclosure, Inherited, Absentee, Tax Delinquent\)

3\. Memorize the exact wording

4\. Practice objection responses:

   \- "Your offer is too low" → Use the math handler

   \- "I need to think about it" → Send offer in writing

   \- "I can get more on the market" → Show net proceeds comparison

\-\-\-

\#\# QUICK\-START CHECKLIST

\#\#\# Week 1: Setup & Source First Leads

\- \[ \] Choose lead source \(start with free: Craigslist, Facebook Marketplace\)

\- \[ \] Manually add 20–50 addresses to \`/ListBuilder\`

\- \[ \] Run skip trace to get phone numbers

\- \[ \] Import leads into CRM

\- \[ \] Review motivation scores \(prioritize 12\+/20\)

\#\#\# Week 2: Cold Calling Campaign

\- \[ \] Study scripts in \`/CallLists\`

\- \[ \] Make 60\+ dials/day \(target: 3\.5 hours talk time\)

\- \[ \] Log outcomes after each call

\- \[ \] Save intake sheets during calls

\- \[ \] Send written offers within 4 hours

\#\#\# Week 3: Follow\-Up & Refinement

\- \[ \] Follow up on all callbacks \(due today \+ overdue\)

\- \[ \] Track motivation re\-scores

\- \[ \] Analyze which objections you're hearing most

\- \[ \] Practice those specific responses

\- \[ \] Review call grades \(if recording\)

\#\#\# Week 4: Close First Deal & Scale

\- \[ \] Log closed deal in \`/Accounting\`

\- \[ \] Review which lead source worked best

\- \[ \] Double that source next month

\- \[ \] Aim for 3–4 offers/day consistency

\- \[ \] Build your cash buyer list \(\`/DealRoom\`\)

\-\-\-

\#\# COMMON QUESTIONS

\*\*Q: I don't have a phone number for a lead\. What do I do?\*\*

A: Use \`/SkipTracer\`\. Upload the address → system enriches with phone \+ email automatically \(~$0\.10–0\.50 per record\)\.

\*\*Q: How many dials should I do per day?\*\*

A: Eric Cline's system = \*\*60\+ dials minimum\*\*, 3\.5\+ hours of actual talk time, 3–4 offers\. This is non\-negotiable\.

\*\*Q: When should I follow up?\*\*

A: System auto\-schedules, but:

\- No answer → 4 hours

\- Interested → 24 hours \(send offer today\)

\- Offer made → 48 hours

\- Not interested → 90 days

\*\*Q: How do I know if a lead is good?\*\*

A: Check motivation score \(12\+/20\)\. System auto\-calculates based on equity, distress, condition, urgency\.

\*\*Q: What if the seller doesn't answer?\*\*

A: Leave a voicemail using your script's voicemail template → follow up with SMS in 2 hours\.

\-\-\-

\#\# CONTACT & SUPPORT

\- \*\*Phone:\*\* \(855\) 810\-1786

\- \*\*Email:\*\* jacob\.levy@homelinkrealtygroup\.com

\- \*\*Website:\*\* homelinkrealtygroup\.com

Happy dialing\! 📞💰
