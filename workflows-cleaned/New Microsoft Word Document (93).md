# New Microsoft Word Document (93)

Source: New Microsoft Word Document (93).docx

import { useState } from 'react';

import { Shield, Copy, Check } from 'lucide-react';

const GOLD = '#D4A843';

const NAVY = '#0B1F45';

const GREEN = '#27ae60';

export default function TwoFactorSetup({ userEmail }) {

  const [step, setStep] = useState(0);

  const [copied, setCopied] = useState(false);

  const [enabled, setEnabled] = useState(false);

  // Mock QR code (in production, generate with qrcode library)

  const qrCode = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  const secret = 'JBSWY3DPEBLW64TMMQ======';

  function copySecret() {

    navigator.clipboard.writeText(secret);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);

  }

  return (

    <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>

        <Shield size={20} color={GOLD} />

        <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: 0 }}>Two-Factor Authentication</h2>

      </div>

      {!enabled ? (

        <>

          <div style={{

            background: enabled ? '#d1fae5' : '#fef3c7',

            border: `2px solid ${enabled ? GREEN : GOLD}`,

            borderRadius: 10,

            padding: 14,

            marginBottom: 16,

          }}>

            <div style={{ fontWeight: 700, color: enabled ? GREEN : '#92400e', marginBottom: 4 }}>

              {enabled ? '✅ 2FA Enabled' : '⚠️ 2FA Not Enabled'}

            </div>

            <div style={{ fontSize: 12, color: enabled ? '#065f46' : '#b45309' }}>

              {enabled

                ? 'Your account is protected with two-factor authentication.'

                : 'Enable 2FA to protect your account from unauthorized access.'}

            </div>

          </div>

          <div style={{ marginBottom: 20 }}>

            {step === 0 && (

              <>

                <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7, marginBottom: 14 }}>

                  Enhance your account security by requiring a second verification code when signing in. You'll need an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator.

                </p>

                <button

                  onClick={() => setStep(1)}

                  style={{

                    background: GOLD,

                    color: '#fff',

                    border: 'none',

                    borderRadius: 8,

                    padding: '10px 20px',

                    fontWeight: 700,

                    fontSize: 13,

                    cursor: 'pointer',

                  }}>

                  Set Up 2FA

                </button>

              </>

            )}

            {step === 1 && (

              <>

                <h3 style={{ fontSize: 14, fontWeight: 900, color: NAVY, marginBottom: 12 }}>Step 1: Scan QR Code</h3>

                <p style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>

                  Open your authenticator app and scan this code, or manually enter the secret:

                </p>

                <div style={{

                  background: '#f8f9fa',

                  border: '2px solid #e0e0e0',

                  borderRadius: 10,

                  padding: 16,

                  textAlign: 'center',

                  marginBottom: 12,

                }}>

                  <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" style={{ width: 120, height: 120 }} />

                </div>

                <div style={{ marginBottom: 12 }}>

                  <label style={{ fontSize: 11, fontWeight: 700, color: '#666', display: 'block', marginBottom: 6 }}>

                    Secret Code (Manual Entry)

                  </label>

                  <div style={{

                    display: 'flex',

                    alignItems: 'center',

                    gap: 8,

                    background: '#f8f9fa',

                    border: '1px solid #ddd',

                    borderRadius: 8,

                    padding: '8px 12px',

                  }}>

                    <input

                      type="text"

                      value={secret}

                      readOnly

                      style={{

                        flex: 1,

                        border: 'none',

                        background: 'none',

                        fontFamily: 'monospace',

                        fontSize: 12,

                        fontWeight: 700,

                        outline: 'none',

                      }}

                    />

                    <button

                      onClick={copySecret}

                      style={{

                        background: 'none',

                        border: 'none',

                        cursor: 'pointer',

                        padding: 0,

                        color: copied ? GREEN : '#666',

                      }}>

                      {copied ? <Check size={16} /> : <Copy size={16} />}

                    </button>

                  </div>

                </div>

                <button

                  onClick={() => setStep(2)}

                  style={{

                    background: GOLD,

                    color: '#fff',

                    border: 'none',

                    borderRadius: 8,

                    padding: '10px 20px',

                    fontWeight: 700,

                    fontSize: 13,

                    cursor: 'pointer',

                  }}>

                  Next

                </button>

              </>

            )}

            {step === 2 && (

              <>

                <h3 style={{ fontSize: 14, fontWeight: 900, color: NAVY, marginBottom: 12 }}>Step 2: Enter Verification Code</h3>

                <p style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>

                  Enter the 6-digit code from your authenticator app:

                </p>

                <input

                  type="text"

                  placeholder="000000"

                  maxLength={6}

                  style={{

                    width: '100%',

                    padding: '10px 12px',

                    fontSize: 18,

                    fontWeight: 700,

                    letterSpacing: 4,

                    textAlign: 'center',

                    border: '2px solid #ddd',

                    borderRadius: 8,

                    marginBottom: 12,

                    outline: 'none',

                  }}

                />

                <div style={{ display: 'flex', gap: 10 }}>

                  <button

                    onClick={() => setStep(1)}

                    style={{

                      flex: 1,

                      background: '#f0f0f0',

                      color: '#333',

                      border: 'none',

                      borderRadius: 8,

                      padding: '10px 20px',

                      fontWeight: 700,

                      fontSize: 13,

                      cursor: 'pointer',

                    }}>

                    Back

                  </button>

                  <button

                    onClick={() => {

                      setEnabled(true);

                      setStep(0);

                    }}

                    style={{

                      flex: 1,

                      background: GREEN,

                      color: '#fff',

                      border: 'none',

                      borderRadius: 8,

                      padding: '10px 20px',

                      fontWeight: 700,

                      fontSize: 13,

                      cursor: 'pointer',

                    }}>

                    Enable 2FA

                  </button>

                </div>

              </>

            )}

          </div>

        </>

      ) : (

        <div style={{

          background: '#d1fae5',

          border: `2px solid ${GREEN}`,

          borderRadius: 10,

          padding: 16,

          textAlign: 'center',

        }}>

          <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>

          <div style={{ fontWeight: 900, color: GREEN, marginBottom: 4 }}>2FA Enabled</div>

          <div style={{ fontSize: 12, color: '#065f46' }}>

            Your account is now protected with two-factor authentication.

          </div>

        </div>

      )}

    </div>

  );

}
