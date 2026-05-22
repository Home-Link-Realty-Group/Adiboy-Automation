# New Microsoft Word Document (15)

Source: New Microsoft Word Document (15).docx

/**

 * Realistic glowing status indicator — like a hardware LED.

 * Green = ON (steady glow), Red = OFF (dim ember).

 * Multi-layered halo gives off a true colored aura.

 */

export default function StatusLight({ on, size = 12 }) {

  const color = on ? '#22c55e' : '#ef4444';

  const bright = on ? '#86efac' : '#fca5a5';

  const halo = on ? 'rgba(34,197,94,0.55)' : 'rgba(239,68,68,0.4)';

  const haloFar = on ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.15)';

  return (

    <span

      aria-hidden="true"

      style={{

        position: 'relative',

        display: 'inline-flex',

        alignItems: 'center',

        justifyContent: 'center',

        width: size + 8,

        height: size + 8,

        flexShrink: 0,

      }}

    >

      {/* Outer aura — far glow */}

      <span style={{

        position: 'absolute',

        inset: 0,

        borderRadius: '50%',

        background: `radial-gradient(circle, ${haloFar} 0%, transparent 65%)`,

        animation: on ? 'pulseLight 2s ease-in-out infinite' : 'none',

        pointerEvents: 'none',

      }} />

      {/* Inner halo */}

      <span style={{

        position: 'absolute',

        width: size + 4,

        height: size + 4,

        borderRadius: '50%',

        background: `radial-gradient(circle, ${halo} 0%, transparent 70%)`,

        filter: `blur(${size * 0.15}px)`,

        pointerEvents: 'none',

      }} />

      {/* The LED bulb itself */}

      <span style={{

        position: 'relative',

        width: size,

        height: size,

        borderRadius: '50%',

        background: `radial-gradient(circle at 35% 30%, ${bright} 0%, ${color} 55%, ${on ? '#15803d' : '#991b1b'} 100%)`,

        boxShadow: `

          inset 0 -1px 2px rgba(0,0,0,0.35),

          inset 0 1px 1px rgba(255,255,255,0.4),

          0 0 ${size * 0.6}px ${color},

          0 0 ${size * 1.4}px ${halo}

        `,

      }}>

        {/* Specular highlight */}

        <span style={{

          position: 'absolute',

          top: '15%',

          left: '22%',

          width: '35%',

          height: '30%',

          borderRadius: '50%',

          background: 'rgba(255,255,255,0.7)',

          filter: 'blur(0.5px)',

        }} />

      </span>

    </span>

  );

}
