# New Microsoft Word Document (96)

Source: New Microsoft Word Document (96).docx

import React, \{ useState \} from 'react';

import \{ Mic, AlertCircle, CheckCircle \} from 'lucide\-react';

const NAVY = '\#0B1F45';

const GOLD = '\#D4A843';

const GREEN = '\#27ae60';

const RED = '\#e74c3c';

export default function CallRecordingConsent\(\{ leadName, leadPhone \}\) \{

  const \[consentGiven, setConsentGiven\] = useState\(false\);

  const \[recordingEnabled, setRecordingEnabled\] = useState\(false\);

  const \[state, setState\] = useState\('pending'\); // pending, disclosed, recorded

  function handleDisclose\(\) \{

    setState\('disclosed'\);

  \}

  function handleConfirmConsent\(\) \{

    setConsentGiven\(true\);

    setState\('recorded'\);

    setRecordingEnabled\(true\);

  \}

  return \(

    <div style=\{\{

      background: state === 'recorded' ? '\#d1fae5' : state === 'disclosed' ? '\#fef3c7' : '\#fee2e2',

      border: \`2px solid $\{state === 'recorded' ? GREEN : state === 'disclosed' ? GOLD : RED\}\`,

      borderRadius: 12,

      padding: 16,

      marginBottom: 16,

    \}\}>

      <div style=\{\{ display: 'flex', alignItems: 'flex\-start', gap: 12 \}\}>

        \{state === 'recorded' ? \(

          <CheckCircle size=\{20\} color=\{GREEN\} style=\{\{ flexShrink: 0, marginTop: 2 \}\} />

        \) : state === 'disclosed' ? \(

          <Mic size=\{20\} color="\#f39c12" style=\{\{ flexShrink: 0, marginTop: 2 \}\} />

        \) : \(

          <AlertCircle size=\{20\} color=\{RED\} style=\{\{ flexShrink: 0, marginTop: 2 \}\} />

        \)\}

        <div style=\{\{ flex: 1 \}\}>

          <div style=\{\{

            fontWeight: 900,

            fontSize: 13,

            color: state === 'recorded' ? '\#065f46' : state === 'disclosed' ? '\#92400e' : '\#991b1b',

            marginBottom: 6,

          \}\}>

            \{state === 'recorded' ? '✅ Recording Consent Obtained' : state === 'disclosed' ? '⏳ Awaiting Consent' : '❌ Consent Required'\}

          </div>

          \{state === 'pending' && \(

            <>

              <p style=\{\{ fontSize: 12, color: '\#666', margin: '0 0 12px', lineHeight: 1\.6 \}\}>

                <strong>Legal Requirement:</strong> You must disclose to \{leadName\} that this call will be recorded before initiating the call\. 

                Failure to do so may violate wiretapping laws in this jurisdiction\.

              </p>

              <button

                onClick=\{handleDisclose\}

                style=\{\{

                  background: GOLD,

                  color: '\#fff',

                  border: 'none',

                  borderRadius: 8,

                  padding: '8px 16px',

                  fontWeight: 700,

                  fontSize: 12,

                  cursor: 'pointer',

                \}\}>

                I will disclose this to the caller

              </button>

            </>

          \)\}

          \{state === 'disclosed' && \(

            <>

              <p style=\{\{ fontSize: 12, color: '\#666', margin: '0 0 12px', lineHeight: 1\.6 \}\}>

                Good\. Now complete the call and log the outcome\. Once consent is recorded in the system, you can proceed\.

              </p>

              <div style=\{\{ display: 'flex', gap: 8 \}\}>

                <button

                  onClick=\{\(\) => setState\('pending'\)\}

                  style=\{\{

                    background: '\#f0f0f0',

                    color: '\#333',

                    border: 'none',

                    borderRadius: 8,

                    padding: '8px 16px',

                    fontWeight: 700,

                    fontSize: 12,

                    cursor: 'pointer',

                  \}\}>

                  Back

                </button>

                <button

                  onClick=\{handleConfirmConsent\}

                  style=\{\{

                    background: GREEN,

                    color: '\#fff',

                    border: 'none',

                    borderRadius: 8,

                    padding: '8px 16px',

                    fontWeight: 700,

                    fontSize: 12,

                    cursor: 'pointer',

                  \}\}>

                  Consent Confirmed

                </button>

              </div>

            </>

          \)\}

          \{state === 'recorded' && \(

            <div style=\{\{ fontSize: 12, color: '\#065f46' \}\}>

              ✅ Recording is enabled and consent is documented\. Your call is compliant with recording laws\.

            </div>

          \)\}

        </div>

      </div>

    </div>

  \);

\}
