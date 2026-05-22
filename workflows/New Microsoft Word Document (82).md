# New Microsoft Word Document (82)

Source: New Microsoft Word Document (82).docx

import \{ useState, useEffect, useCallback \} from 'react';

import \{ loadStripe \} from '@stripe/stripe\-js';

import \{ Elements, CardElement, useStripe, useElements \} from '@stripe/react\-stripe\-js';

import \{ CheckCircle2, AlertCircle, ShieldCheck, Loader, CreditCard \} from 'lucide\-react';

import \{ base44 \} from '@/api/base44Client';

const NAVY = '\#0B1F45';

const GOLD = '\#D4A843';

const GREEN = '\#16a34a';

const RED = '\#dc2626';

// Lazy\-load the Stripe publishable key from the backend on first use\.

// This avoids hardcoding it and keeps the component self\-contained\.

let stripePromise = null;

function getStripe\(\) \{

  if \(\!stripePromise\) \{

    stripePromise = base44\.functions\.invoke\('getStripePublishableKey', \{\}\)

      \.then\(res => \{

        const data = res\.data || res;

        if \(\!data\.publishable\_key\) throw new Error\('Stripe key not configured'\);

        return loadStripe\(data\.publishable\_key\);

      \}\);

  \}

  return stripePromise;

\}

/\*\*

 \* Resolves a subscription's pending\_setup\_intent on\-session\.

 \*

 \* Per Stripe docs \(Set up payment methods for subscriptions with no initial payment\):

 \*   \- status === 'requires\_action' → call confirmCardSetup with existing card

 \*   \- status === 'requires\_payment\_method' → collect a NEW card, then update sub

 \*

 \* Calls onComplete\(\) when no action is needed OR after a successful resolution\.

 \*/

export default function PaymentSetupResolver\(\{ userEmail, onComplete \}\) \{

  const \[state, setState\] = useState\(\{ phase: 'checking' \}\);

  const check = useCallback\(async \(\) => \{

    setState\(\{ phase: 'checking' \}\);

    try \{

      const res = await base44\.functions\.invoke\('getSubscriptionSetupIntent', \{ user\_email: userEmail \}\);

      const data = res\.data || res;

      if \(\!data\.ok\) \{

        setState\(\{ phase: 'error', error: data\.error || 'Failed to check payment setup' \}\);

        return;

      \}

      if \(\!data\.needs\_action\) \{

        setState\(\{ phase: 'ok' \}\);

        onComplete\(\);

        return;

      \}

      setState\(\{

        phase: 'needs\_action',

        status: data\.status,

        clientSecret: data\.client\_secret,

        setupIntentId: data\.setup\_intent\_id,

      \}\);

    \} catch \(e\) \{

      setState\(\{ phase: 'error', error: e\.message \}\);

    \}

  \}, \[userEmail, onComplete\]\);

  useEffect\(\(\) => \{ check\(\); \}, \[check\]\);

  if \(state\.phase === 'checking'\) \{

    return \(

      <div style=\{card\}>

        <Loader size=\{20\} style=\{\{ animation: 'spin 1s linear infinite', color: NAVY \}\} />

        <span style=\{\{ fontSize: 13, color: '\#64748b' \}\}>Verifying your payment method with Stripe…</span>

      </div>

    \);

  \}

  if \(state\.phase === 'ok'\) \{

    return \(

      <div style=\{\{ \.\.\.card, background: '\#f0fdf4', border: \`1\.5px solid $\{GREEN\}\` \}\}>

        <CheckCircle2 size=\{20\} color=\{GREEN\} />

        <div>

          <div style=\{\{ fontWeight: 800, color: '\#166534', fontSize: 13 \}\}>Payment method verified</div>

          <div style=\{\{ fontSize: 11, color: '\#15803d' \}\}>Your card is authorized for billing after the trial\.</div>

        </div>

      </div>

    \);

  \}

  if \(state\.phase === 'error'\) \{

    return \(

      <div style=\{\{ \.\.\.card, background: '\#fef2f2', border: \`1\.5px solid $\{RED\}\`, flexDirection: 'column', alignItems: 'flex\-start' \}\}>

        <div style=\{\{ display: 'flex', gap: 10, alignItems: 'flex\-start' \}\}>

          <AlertCircle size=\{18\} color=\{RED\} style=\{\{ marginTop: 2, flexShrink: 0 \}\} />

          <div>

            <div style=\{\{ fontWeight: 800, color: '\#991b1b', fontSize: 13, marginBottom: 4 \}\}>Couldn't verify payment method</div>

            <div style=\{\{ fontSize: 12, color: '\#7f1d1d' \}\}>\{state\.error\}</div>

          </div>

        </div>

        <button onClick=\{check\} style=\{btnSecondary\}>Try Again</button>

      </div>

    \);

  \}

  // needs\_action — render Stripe Elements provider

  return \(

    <Elements stripe=\{getStripe\(\)\} options=\{\{ clientSecret: state\.clientSecret \}\}>

      <ResolveForm

        status=\{state\.status\}

        userEmail=\{userEmail\}

        clientSecret=\{state\.clientSecret\}

        onSuccess=\{\(\) => \{ setState\(\{ phase: 'ok' \}\); onComplete\(\); \}\}

      />

    </Elements>

  \);

\}

function ResolveForm\(\{ status, userEmail, clientSecret, onSuccess \}\) \{

  const stripe = useStripe\(\);

  const elements = useElements\(\);

  const \[submitting, setSubmitting\] = useState\(false\);

  const \[error, setError\] = useState\(''\);

  const isAuthFailure = status === 'requires\_action';

  const isPMFailure = status === 'requires\_payment\_method';

  async function handleSubmit\(e\) \{

    e\.preventDefault\(\);

    if \(\!stripe || \!elements\) return;

    setSubmitting\(true\);

    setError\(''\);

    try \{

      if \(isAuthFailure\) \{

        // Customer just needs to complete 3DS / authentication on the existing card

        const \{ error: confirmErr \} = await stripe\.confirmCardSetup\(clientSecret\);

        if \(confirmErr\) \{

          setError\(confirmErr\.message || 'Authentication failed\.'\);

          setSubmitting\(false\);

          return;

        \}

        onSuccess\(\);

        return;

      \}

      if \(isPMFailure\) \{

        // Card was rejected — collect a new one, then update the subscription

        const card = elements\.getElement\(CardElement\);

        const \{ setupIntent, error: confirmErr \} = await stripe\.confirmCardSetup\(clientSecret, \{

          payment\_method: \{ card \},

        \}\);

        if \(confirmErr\) \{

          setError\(confirmErr\.message || 'Card could not be authorized\.'\);

          setSubmitting\(false\);

          return;

        \}

        // Attach the new PM to customer \+ subscription as default

        const res = await base44\.functions\.invoke\('updateSubscriptionPaymentMethod', \{

          user\_email: userEmail,

          payment\_method\_id: setupIntent\.payment\_method,

        \}\);

        const data = res\.data || res;

        if \(\!data\.ok\) \{

          setError\(data\.error || 'Failed to update subscription with new card\.'\);

          setSubmitting\(false\);

          return;

        \}

        onSuccess\(\);

      \}

    \} catch \(err\) \{

      setError\(err\.message || 'Unexpected error\.'\);

      setSubmitting\(false\);

    \}

  \}

  return \(

    <form onSubmit=\{handleSubmit\} style=\{\{ background: '\#fff', border: \`2px solid $\{GOLD\}\`, borderRadius: 14, padding: 24 \}\}>

      <div style=\{\{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 \}\}>

        <ShieldCheck size=\{22\} color=\{GOLD\} />

        <div>

          <div style=\{\{ fontWeight: 900, fontSize: 15, color: NAVY \}\}>

            \{isAuthFailure ? 'Verify Your Card With Your Bank' : 'Update Your Payment Method'\}

          </div>

          <div style=\{\{ fontSize: 11, color: '\#64748b' \}\}>

            Required by Stripe before your trial begins

          </div>

        </div>

      </div>

      <div style=\{\{ background: '\#fffbeb', border: '1px solid \#fde68a', borderRadius: 8, padding: 12, marginBottom: 18 \}\}>

        <div style=\{\{ fontSize: 12, color: '\#92400e', lineHeight: 1\.6 \}\}>

          \{isAuthFailure ? \(

            <>Your bank requires one extra verification step \(3D Secure\) before authorizing the card on file\. You won't be charged today — this just confirms the card is yours and ready for billing after your free trial ends\.</>

          \) : \(

            <>The card you used at checkout couldn't be authorized for future payments\. Please enter a different card below\. You won't be charged today — this card will be used when your free trial ends\.</>

          \)\}

        </div>

      </div>

      \{isPMFailure && \(

        <div style=\{\{ marginBottom: 16 \}\}>

          <label style=\{\{ display: 'block', fontSize: 11, fontWeight: 800, color: '\#475569', marginBottom: 6, letterSpacing: 0\.5 \}\}>

            <CreditCard size=\{12\} style=\{\{ display: 'inline', verticalAlign: 'middle', marginRight: 6 \}\} />

            CARD DETAILS

          </label>

          <div style=\{\{ padding: '14px 16px', border: '1\.5px solid \#e2e8f0', borderRadius: 8, background: '\#fff' \}\}>

            <CardElement options=\{\{

              style: \{

                base: \{

                  fontSize: '15px',

                  color: NAVY,

                  fontFamily: "'Segoe UI', Arial, sans\-serif",

                  '::placeholder': \{ color: '\#94a3b8' \},

                \},

                invalid: \{ color: RED \},

              \},

            \}\} />

          </div>

        </div>

      \)\}

      \{error && \(

        <div style=\{\{ background: '\#fef2f2', border: '1\.5px solid \#fecaca', borderRadius: 8, padding: 12, marginBottom: 16, display: 'flex', alignItems: 'flex\-start', gap: 8 \}\}>

          <AlertCircle size=\{16\} color=\{RED\} style=\{\{ marginTop: 1, flexShrink: 0 \}\} />

          <div style=\{\{ fontSize: 12, color: '\#991b1b' \}\}>\{error\}</div>

        </div>

      \)\}

      <button type="submit" disabled=\{\!stripe || submitting\} style=\{\{

        width: '100%',

        background: submitting ? '\#94a3b8' : GREEN,

        color: '\#fff',

        border: 'none',

        borderRadius: 10,

        padding: '14px',

        fontWeight: 900,

        fontSize: 14,

        cursor: submitting ? 'not\-allowed' : 'pointer',

        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,

      \}\}>

        \{submitting

          ? <><Loader size=\{16\} style=\{\{ animation: 'spin 1s linear infinite' \}\} /> Verifying…</>

          : <><ShieldCheck size=\{16\} /> \{isAuthFailure ? 'Authenticate Card' : 'Authorize New Card'\}</>

        \}

      </button>

      <div style=\{\{ fontSize: 11, color: '\#94a3b8', textAlign: 'center', marginTop: 10 \}\}>

        🔒 Card data goes directly to Stripe — never touches our servers\.

      </div>

    </form>

  \);

\}

const card = \{

  display: 'flex', alignItems: 'center', gap: 12,

  background: '\#f8fafc', border: '1\.5px solid \#e2e8f0',

  borderRadius: 12, padding: 16,

\};

const btnSecondary = \{

  marginTop: 12, background: '\#fff', border: \`1\.5px solid $\{RED\}\`, color: RED,

  padding: '8px 16px', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer',

\};
