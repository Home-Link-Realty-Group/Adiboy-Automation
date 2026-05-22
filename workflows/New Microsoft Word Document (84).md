# New Microsoft Word Document (84)

Source: New Microsoft Word Document (84).docx

import \{ useState \} from 'react';

import \{ ExternalLink, CheckCircle2, AlertCircle, Phone, ShieldCheck, Key, FileText, Loader \} from 'lucide\-react';

import \{ base44 \} from '@/api/base44Client';

const NAVY = '\#0B1F45';

const GOLD = '\#D4A843';

const GREEN = '\#16a34a';

/\*\*

 \* Twilio onboarding step\. Walks the user through every action they must take

 \* on twilio\.com, then collects \+ verifies their credentials in this app\.

 \*/

export default function TwilioSetupGuide\(\{ userEmail, onComplete \}\) \{

  const \[accountSid, setAccountSid\] = useState\(''\);

  const \[authToken, setAuthToken\] = useState\(''\);

  const \[phoneNumber, setPhoneNumber\] = useState\(''\);

  const \[agentPhone, setAgentPhone\] = useState\(''\);

  const \[saving, setSaving\] = useState\(false\);

  const \[error, setError\] = useState\(''\);

  async function handleSave\(e\) \{

    e\.preventDefault\(\);

    setError\(''\);

    if \(\!accountSid\.startsWith\('AC'\) || accountSid\.length < 30\) \{

      setError\('Account SID must start with "AC" and be 34 characters long\.'\);

      return;

    \}

    if \(authToken\.length < 30\) \{

      setError\('Auth Token looks too short\. Copy the full value from Twilio Console\.'\);

      return;

    \}

    if \(\!phoneNumber\.startsWith\('\+'\)\) \{

      setError\('Phone number must be in E\.164 format starting with \+ \(e\.g\. \+12145551234\)\.'\);

      return;

    \}

    setSaving\(true\);

    try \{

      const res = await base44\.functions\.invoke\('saveTwilioConfig', \{

        user\_email: userEmail,

        twilio\_account\_sid: accountSid,

        twilio\_auth\_token: authToken,

        twilio\_phone\_number: phoneNumber,

        agent\_phone\_number: agentPhone || phoneNumber,

        mode: 'byo',

      \}\);

      const data = res\.data || res;

      if \(data\.ok\) \{

        onComplete\(\);

      \} else \{

        setError\(data\.error || 'Verification failed — double\-check your credentials\.'\);

      \}

    \} catch \(err\) \{

      setError\(err\.message || 'Save failed\.'\);

    \}

    setSaving\(false\);

  \}

  return \(

    <div>

      \{/\* Why Twilio \*/\}

      <div style=\{\{ background: '\#fffbeb', border: \`1\.5px solid $\{GOLD\}\`, borderRadius: 12, padding: 18, marginBottom: 24 \}\}>

        <div style=\{\{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 \}\}>

          <Phone size=\{18\} color=\{GOLD\} />

          <div style=\{\{ fontWeight: 900, fontSize: 14, color: NAVY \}\}>Why You Need Twilio</div>

        </div>

        <p style=\{\{ fontSize: 13, color: '\#475569', lineHeight: 1\.6, margin: 0 \}\}>

          Twilio powers <strong>every voice and SMS feature</strong> in ProFlow CRM — Power Dialer, sub\-60\-second auto\-response, voicemail drop, two\-way SMS conversations, and inbound call tracking\. You bring your own Twilio account so <strong>you control the calls, the data, and the costs</strong> at wholesale rates \(no markups from us\)\.

        </p>

      </div>

      \{/\* Step\-by\-step \*/\}

      <h3 style=\{\{ fontSize: 16, fontWeight: 900, color: NAVY, margin: '0 0 14px' \}\}>📋 What To Do On Twilio's Website</h3>

      <div style=\{\{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 \}\}>

        <Step

          number="1"

          icon=\{Key\}

          title="Create Your Twilio Account"

          description="Go to twilio\.com/try\-twilio and sign up with your business email\. You'll need to verify your email address and your personal phone number \(Twilio sends a 6\-digit code via SMS\)\. Choose 'Other' for use case if asked\. Twilio gives you ~$15 in free trial credits\."

          link=\{\{ label: 'Sign Up at Twilio', url: 'https://www\.twilio\.com/try\-twilio' \}\}

        />

        <Step

          number="2"

          icon=\{Phone\}

          title="Buy Your First Phone Number"

          description="Once logged in, click 'Phone Numbers' in the left sidebar → 'Buy a Number'\. Pick a number with a local area code matching your target market \(e\.g\. Dallas 214 / Atlanta 404\)\. Make sure both 'Voice' and 'SMS' capabilities are checked\."

          tip="Pro tip: buy a separate number for each lead source/campaign so you can track ROI per channel\."

        />

        <Step

          number="3"

          icon=\{ShieldCheck\}

          title="Register for A2P 10DLC \(Required for SMS\)"

          description="If you plan to send any SMS to U\.S\. numbers, you MUST register an A2P 10DLC campaign or your messages will be filtered/blocked\. Go to 'Messaging' → 'Regulatory Compliance' → 'A2P 10DLC' and complete the Brand \+ Campaign registration\. This takes 1–7 business days for approval\. Use 'Mixed' as the campaign use case for wholesaling\."

          warning="Skip this and 70%\+ of your texts will silently fail to deliver\."

        />

        <Step

          number="4"

          icon=\{FileText\}

          title="Find Your Account SID & Auth Token"

          description="Click 'Account' \(top right\) → 'API keys & tokens'\. You'll see two values on this page: Account SID \(starts with AC\.\.\.\) and Auth Token \(click 'Show' to reveal it\)\. These are like a username \+ password for the API\. Copy both — you'll paste them into the form below\. Treat them like passwords — never share them\."

          warning="If you ever leak your Auth Token, click 'Request a new auth token' immediately to rotate it\."

        />

        <Step

          number="5"

          icon=\{CheckCircle2\}

          title="Verify Your Personal Cell Phone \(For Trial Accounts\)"

          description="If you're still on the free trial, you can only call/text numbers you've verified\. Go to 'Phone Numbers' → 'Verified Caller IDs' and add your personal cell\. Once you upgrade your Twilio account, this restriction is removed and you can call any number\."

        />

      </div>

      \{/\* Credentials form \*/\}

      <div style=\{\{ background: '\#fff', border: \`2px solid $\{NAVY\}\`, borderRadius: 14, padding: 24 \}\}>

        <h3 style=\{\{ fontSize: 16, fontWeight: 900, color: NAVY, margin: '0 0 6px' \}\}>🔑 Now Paste Your Twilio Credentials Here</h3>

        <p style=\{\{ fontSize: 13, color: '\#64748b', margin: '0 0 20px' \}\}>We'll verify them against Twilio's API — if anything's wrong, we'll tell you immediately\.</p>

        <form onSubmit=\{handleSave\}>

          <FormField label="Account SID" placeholder="AC1234567890abcdef\.\.\." value=\{accountSid\} onChange=\{setAccountSid\} required hint="Starts with 'AC' — found on the Twilio Console homepage\." />

          <FormField label="Auth Token" placeholder="••••••••••••••••••••••••••••••••" value=\{authToken\} onChange=\{setAuthToken\} type="password" required hint="Click 'Show' on Twilio's API keys page to reveal it\." />

          <FormField label="Twilio Phone Number" placeholder="\+12145551234" value=\{phoneNumber\} onChange=\{setPhoneNumber\} required hint="The number you bought in Step 2\. Must include country code \(\+1 for US\)\." />

          <FormField label="Your Personal Cell \(Agent Phone\)" placeholder="\+12145559999" value=\{agentPhone\} onChange=\{setAgentPhone\} hint="The phone that rings when a lead picks up\. Defaults to your Twilio number if blank\." />

          \{error && \(

            <div style=\{\{ background: '\#fef2f2', border: '1\.5px solid \#fecaca', borderRadius: 8, padding: 12, marginBottom: 16, display: 'flex', alignItems: 'flex\-start', gap: 8 \}\}>

              <AlertCircle size=\{16\} color="\#dc2626" style=\{\{ marginTop: 1, flexShrink: 0 \}\} />

              <div style=\{\{ fontSize: 13, color: '\#991b1b' \}\}>\{error\}</div>

            </div>

          \)\}

          <button type="submit" disabled=\{saving\} style=\{\{

            width: '100%',

            background: saving ? '\#94a3b8' : GREEN,

            color: '\#fff',

            border: 'none',

            borderRadius: 10,

            padding: '14px',

            fontWeight: 900,

            fontSize: 14,

            cursor: saving ? 'not\-allowed' : 'pointer',

            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,

          \}\}>

            \{saving ? <><Loader size=\{16\} style=\{\{ animation: 'spin 1s linear infinite' \}\} /> Verifying with Twilio…</> : <><CheckCircle2 size=\{16\} /> Verify & Connect Twilio</>\}

          </button>

        </form>

      </div>

    </div>

  \);

\}

function Step\(\{ number, icon: Icon, title, description, link, tip, warning \}\) \{

  return \(

    <div style=\{\{ display: 'flex', gap: 14 \}\}>

      <div style=\{\{

        width: 36, height: 36, borderRadius: '50%',

        background: NAVY, color: '\#fff',

        display: 'flex', alignItems: 'center', justifyContent: 'center',

        fontWeight: 900, fontSize: 14, flexShrink: 0,

      \}\}>

        \{number\}

      </div>

      <div style=\{\{ flex: 1, paddingTop: 4 \}\}>

        <div style=\{\{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 \}\}>

          <Icon size=\{15\} color=\{NAVY\} />

          <div style=\{\{ fontWeight: 800, fontSize: 14, color: NAVY \}\}>\{title\}</div>

        </div>

        <p style=\{\{ fontSize: 13, color: '\#475569', lineHeight: 1\.65, margin: '0 0 8px' \}\}>\{description\}</p>

        \{link && \(

          <a href=\{link\.url\} target="\_blank" rel="noopener noreferrer" style=\{\{

            display: 'inline\-flex', alignItems: 'center', gap: 6,

            background: GOLD, color: '\#fff',

            padding: '7px 14px', borderRadius: 8,

            textDecoration: 'none', fontWeight: 800, fontSize: 12,

            marginBottom: 4,

          \}\}>

            \{link\.label\} <ExternalLink size=\{12\} />

          </a>

        \)\}

        \{tip && \(

          <div style=\{\{ background: '\#eff6ff', border: '1px solid \#bfdbfe', borderRadius: 6, padding: '8px 10px', fontSize: 12, color: '\#1e40af', marginTop: 6 \}\}>

            💡 \{tip\}

          </div>

        \)\}

        \{warning && \(

          <div style=\{\{ background: '\#fef2f2', border: '1px solid \#fecaca', borderRadius: 6, padding: '8px 10px', fontSize: 12, color: '\#991b1b', marginTop: 6 \}\}>

            ⚠️ \{warning\}

          </div>

        \)\}

      </div>

    </div>

  \);

\}

function FormField\(\{ label, value, onChange, placeholder, type = 'text', required, hint \}\) \{

  return \(

    <div style=\{\{ marginBottom: 14 \}\}>

      <label style=\{\{ display: 'block', fontSize: 11, fontWeight: 800, color: '\#475569', marginBottom: 5, letterSpacing: 0\.5 \}\}>

        \{label\.toUpperCase\(\)\} \{required && <span style=\{\{ color: '\#dc2626' \}\}>\*</span>\}

      </label>

      <input

        type=\{type\}

        required=\{required\}

        placeholder=\{placeholder\}

        value=\{value\}

        onChange=\{e => onChange\(e\.target\.value\)\}

        style=\{\{

          width: '100%', padding: '11px 14px',

          border: '1\.5px solid \#e2e8f0', borderRadius: 8,

          fontSize: 14, fontFamily: 'monospace',

          boxSizing: 'border\-box',

        \}\}

      />

      \{hint && <div style=\{\{ fontSize: 11, color: '\#64748b', marginTop: 4 \}\}>\{hint\}</div>\}

    </div>

  \);

\}
