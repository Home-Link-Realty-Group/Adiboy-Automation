# Wizard

Source: Wizard.docx

import { CheckCircle2, ChevronRight } from 'lucide-react';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const GREEN = '#16a34a';

/**

 * One numbered step in the Apify setup wizard.

 * Renders a status pill, ordered sub-steps, and any custom children (links, screenshots, helpers).

 */

export default function WizardStep({

  number,

  title,

  duration,

  status = 'pending',  // 'pending' | 'active' | 'complete'

  intro,

  substeps = [],

  children,

}) {

  const isActive = status === 'active';

  const isComplete = status === 'complete';

  return (

    <section style={{

      background: '#fff',

      borderRadius: 16,

      marginBottom: 18,

      border: isActive ? `2px solid ${GOLD}` : isComplete ? `2px solid ${GREEN}` : '1.5px solid #e2e8f0',

      boxShadow: isActive ? '0 8px 28px rgba(212,168,67,0.18)' : '0 2px 8px rgba(0,0,0,0.04)',

      overflow: 'hidden',

      transition: 'all 0.25s ease',

    }}>

      {/* Header */}

      <header style={{

        display: 'flex', alignItems: 'center', gap: 16,

        padding: '20px 26px',

        borderBottom: '1px solid #f1f5f9',

        background: isComplete ? '#f0fdf4' : isActive ? '#fffaf0' : '#f8fafc',

      }}>

        <div style={{

          width: 44, height: 44, borderRadius: '50%',

          background: isComplete ? GREEN : isActive ? GOLD : '#cbd5e1',

          color: '#fff', fontWeight: 900, fontSize: 18,

          display: 'flex', alignItems: 'center', justifyContent: 'center',

          flexShrink: 0,

          boxShadow: isActive ? `0 4px 12px ${GOLD}40` : 'none',

        }}>

          {isComplete ? <CheckCircle2 size={22} /> : number}

        </div>

        <div style={{ flex: 1 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>

            <h3 style={{

              fontSize: 18, fontWeight: 900, color: NAVY,

              margin: 0, lineHeight: 1.3,

            }}>{title}</h3>

            {duration && (

              <span style={{

                background: '#fff', color: '#64748b',

                padding: '3px 10px', borderRadius: 12,

                fontSize: 11, fontWeight: 700, letterSpacing: 0.3,

                border: '1px solid #e2e8f0',

              }}>

                ⏱ {duration}

              </span>

            )}

            {isComplete && (

              <span style={{

                background: GREEN, color: '#fff',

                padding: '3px 10px', borderRadius: 12,

                fontSize: 10, fontWeight: 800, letterSpacing: 0.5,

              }}>

                ✓ COMPLETE

              </span>

            )}

            {isActive && (

              <span style={{

                background: GOLD, color: '#fff',

                padding: '3px 10px', borderRadius: 12,

                fontSize: 10, fontWeight: 800, letterSpacing: 0.5,

              }}>

                YOU ARE HERE

              </span>

            )}

          </div>

          {intro && (

            <p style={{

              fontSize: 13, color: '#475569', margin: '6px 0 0',

              lineHeight: 1.55,

            }}>{intro}</p>

          )}

        </div>

      </header>

      {/* Body */}

      <div style={{ padding: '22px 26px' }}>

        {substeps.length > 0 && (

          <ol style={{

            margin: '0 0 18px',

            padding: 0,

            listStyle: 'none',

            counterReset: 'sub-step',

          }}>

            {substeps.map((s, i) => (

              <li key={i} style={{

                position: 'relative',

                padding: '10px 14px 10px 44px',

                marginBottom: 6,

                background: '#f8fafc',

                borderRadius: 8,

                fontSize: 14, color: '#334155', lineHeight: 1.6,

                borderLeft: `3px solid ${GOLD}`,

                counterIncrement: 'sub-step',

              }}>

                <span style={{

                  position: 'absolute', left: 12, top: 10,

                  width: 22, height: 22, borderRadius: '50%',

                  background: NAVY, color: '#fff',

                  fontSize: 11, fontWeight: 800,

                  display: 'flex', alignItems: 'center', justifyContent: 'center',

                }}>

                  {String.fromCharCode(65 + i)}

                </span>

                {s}

              </li>

            ))}

          </ol>

        )}

        {children}

      </div>

    </section>

  );

}
