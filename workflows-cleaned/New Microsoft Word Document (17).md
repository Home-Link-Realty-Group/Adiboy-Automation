# New Microsoft Word Document (17)

Source: New Microsoft Word Document (17).docx

/**

 * Vertical 3D hardware-style toggle switch.

 * Metal-trimmed recessed track with a chromed shaft and beveled rocker knob.

 * Spans the full height of its container — UP = ON, DOWN = OFF.

 */

const GREEN = '#22c55e';

const GREEN_DARK = '#15803d';

const RED = '#ef4444';

const RED_DARK = '#991b1b';

export default function ToggleSwitch({ checked, onChange, disabled = false, label = 'Toggle', height = 140 }) {

  const W = 38;          // outer chrome bezel width

  const H = height;      // full vertical length

  const TRACK_W = 22;    // inner track width

  const KNOB = 30;       // rocker knob diameter

  const PAD = 6;         // top/bottom padding inside track

  // Knob travel: top = ON, bottom = OFF

  const KNOB_TOP = checked ? PAD : H - KNOB - PAD;

  return (

    <button

      type="button"

      role="switch"

      aria-checked={checked}

      aria-label={label}

      disabled={disabled}

      onClick={() => !disabled && onChange(!checked)}

      style={{

        position: 'relative',

        width: W,

        height: H,

        borderRadius: W / 2,

        // Polished chrome bezel — full metallic surround

        background: `

          linear-gradient(135deg,

            #ffffff 0%,

            #e2e8f0 15%,

            #94a3b8 35%,

            #cbd5e1 50%,

            #f1f5f9 65%,

            #94a3b8 80%,

            #475569 100%)

        `,

        border: '1.5px solid #334155',

        cursor: disabled ? 'not-allowed' : 'pointer',

        padding: 0,

        boxShadow: `

          0 6px 14px rgba(0,0,0,0.35),

          0 2px 4px rgba(0,0,0,0.2),

          inset 0 2px 2px rgba(255,255,255,0.95),

          inset 0 -2px 3px rgba(0,0,0,0.3),

          inset 2px 0 3px rgba(255,255,255,0.4),

          inset -2px 0 3px rgba(0,0,0,0.25)

        `,

        outline: 'none',

        flexShrink: 0,

      }}

    >

      {/* Inner recessed track — colored to match state */}

      <span style={{

        position: 'absolute',

        top: 4,

        left: (W - TRACK_W) / 2,

        width: TRACK_W,

        height: H - 8,

        borderRadius: TRACK_W / 2,

        background: checked

          ? `linear-gradient(180deg, ${GREEN_DARK} 0%, ${GREEN} 50%, #4ade80 100%)`

          : `linear-gradient(180deg, ${RED_DARK} 0%, ${RED} 50%, #f87171 100%)`,

        boxShadow: `

          inset 0 3px 6px rgba(0,0,0,0.55),

          inset 0 -1px 1px rgba(255,255,255,0.1),

          0 0 14px ${checked ? 'rgba(34,197,94,0.6)' : 'rgba(239,68,68,0.55)'}

        `,

        transition: 'background 0.3s ease, box-shadow 0.3s ease',

        pointerEvents: 'none',

      }} />

      {/* ON / OFF etched markers on the bezel */}

      <span style={{

        position: 'absolute',

        top: 12,

        left: 0,

        right: 0,

        textAlign: 'center',

        fontSize: 8,

        fontWeight: 900,

        letterSpacing: 1,

        color: checked ? 'rgba(34,197,94,0.95)' : 'rgba(71,85,105,0.6)',

        textShadow: checked ? '0 0 4px rgba(34,197,94,0.7)' : '0 1px 0 rgba(255,255,255,0.5)',

        pointerEvents: 'none',

        fontFamily: 'monospace',

      }}>ON</span>

      <span style={{

        position: 'absolute',

        bottom: 12,

        left: 0,

        right: 0,

        textAlign: 'center',

        fontSize: 8,

        fontWeight: 900,

        letterSpacing: 1,

        color: !checked ? 'rgba(239,68,68,0.95)' : 'rgba(71,85,105,0.4)',

        textShadow: !checked ? '0 0 4px rgba(239,68,68,0.7)' : '0 1px 0 rgba(255,255,255,0.5)',

        pointerEvents: 'none',

        fontFamily: 'monospace',

      }}>OFF</span>

      {/* The chrome rocker knob */}

      <span

        style={{

          position: 'absolute',

          top: KNOB_TOP,

          left: (W - KNOB) / 2,

          width: KNOB,

          height: KNOB,

          borderRadius: '50%',

          background: `

            radial-gradient(circle at 35% 25%,

              #ffffff 0%,

              #f8fafc 18%,

              #e2e8f0 45%,

              #94a3b8 78%,

              #475569 100%)

          `,

          border: '1px solid #334155',

          boxShadow: `

            inset 0 2px 2px rgba(255,255,255,0.95),

            inset 0 -3px 5px rgba(0,0,0,0.35),

            inset 2px 0 3px rgba(255,255,255,0.3),

            inset -2px 0 3px rgba(0,0,0,0.2),

            0 4px 8px rgba(0,0,0,0.5),

            0 2px 3px rgba(0,0,0,0.3)

          `,

          transition: 'top 0.3s cubic-bezier(.34,1.56,.64,1)',

        }}

      >

        {/* Concentric chrome ring detail */}

        <span style={{

          position: 'absolute',

          top: 4,

          left: 4,

          right: 4,

          bottom: 4,

          borderRadius: '50%',

          border: '1px solid rgba(0,0,0,0.15)',

          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)',

          pointerEvents: 'none',

        }} />

        {/* Center grip dimple */}

        <span style={{

          position: 'absolute',

          top: '50%',

          left: '50%',

          transform: 'translate(-50%, -50%)',

          width: 8,

          height: 8,

          borderRadius: '50%',

          background: 'radial-gradient(circle at 30% 30%, #475569 0%, #1e293b 80%)',

          boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.3)',

        }} />

        {/* Specular highlight */}

        <span style={{

          position: 'absolute',

          top: '12%',

          left: '20%',

          width: '40%',

          height: '28%',

          borderRadius: '50%',

          background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0))',

          filter: 'blur(0.5px)',

          pointerEvents: 'none',

        }} />

      </span>

    </button>

  );

}
