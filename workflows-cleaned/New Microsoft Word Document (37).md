# New Microsoft Word Document (37)

Source: New Microsoft Word Document (37).docx

/**

 * Blueprint primitives — engineering-schematic style for deal process phase pages.

 * Dark navy background, gold accents, phase-specific colors.

 */

export const BP_BG = '#0d0d1a';

export const BP_GOLD = '#f4a300';

export const BP_GRID = 'rgba(244,163,0,0.06)';

export function BlueprintFrame({ title, subtitle, children, height = 600 }) {

  return (

    <div style={{

      background: BP_BG,

      borderRadius: 16,

      padding: 8,

      border: '1px solid rgba(244,163,0,0.2)',

      boxShadow: '0 12px 40px rgba(0,0,0,0.3)',

    }}>

      <svg viewBox={`0 0 1000 ${height}`} style={{ width: '100%', display: 'block' }}>

        <defs>

          <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">

            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={BP_GRID} strokeWidth="0.5" />

          </pattern>

          <marker id="bp-arrow" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">

            <polygon points="0 0, 10 4, 0 8" fill={BP_GOLD} />

          </marker>

          <marker id="bp-arrow-green" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">

            <polygon points="0 0, 10 4, 0 8" fill="#2dc653" />

          </marker>

          <marker id="bp-arrow-red" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">

            <polygon points="0 0, 10 4, 0 8" fill="#e63946" />

          </marker>

        </defs>

        <rect width="1000" height={height} fill="url(#bp-grid)" />

        <text x="500" y="32" textAnchor="middle" fill={BP_GOLD} fontSize="16" fontWeight="900" fontFamily="Arial" letterSpacing="2">{title}</text>

        {subtitle && <text x="500" y="52" textAnchor="middle" fill="rgba(244,163,0,0.6)" fontSize="11" fontFamily="Arial" letterSpacing="1">{subtitle}</text>}

        <line x1="60" y1="62" x2="940" y2="62" stroke={BP_GOLD} strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4" />

        {children}

        <line x1="60" y1={height - 25} x2="940" y2={height - 25} stroke={BP_GOLD} strokeWidth="0.3" opacity="0.3" />

        <text x="60" y={height - 10} fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Arial">CONFIDENTIAL · Home-Link CRM Blueprint System</text>

        <text x="940" y={height - 10} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Arial">Rev 4.2026</text>

      </svg>

    </div>

  );

}

export function BPBox({ x, y, w, h, label, sub, color = '#0f3460', stroke = '#4a90d9' }) {

  return (

    <g>

      <rect x={x} y={y} width={w} height={h} rx="8" fill={color} stroke={stroke} strokeWidth="1.5" />

      <text x={x + w/2} y={y + h/2 - (sub ? 6 : -4)} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="Arial">{label}</text>

      {sub && <text x={x + w/2} y={y + h/2 + 12} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="Arial">{sub}</text>}

    </g>

  );

}

export function BPStep({ x, y, w = 180, h = 60, num, label, sub, color = '#0f3460', stroke = '#4a90d9' }) {

  return (

    <g>

      <rect x={x} y={y} width={w} height={h} rx="8" fill={color} stroke={stroke} strokeWidth="1.5" />

      <circle cx={x + 18} cy={y + h/2} r="13" fill={BP_GOLD} />

      <text x={x + 18} y={y + h/2 + 4} textAnchor="middle" fill={BP_BG} fontSize="13" fontWeight="900" fontFamily="Arial">{num}</text>

      <text x={x + 38} y={y + h/2 - (sub ? 3 : -4)} fill="#fff" fontSize="11" fontWeight="bold" fontFamily="Arial">{label}</text>

      {sub && <text x={x + 38} y={y + h/2 + 12} fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="Arial">{sub}</text>}

    </g>

  );

}

export function BPDiamond({ cx, cy, w = 100, h = 60, label, sub, color = '#0f3460', stroke = BP_GOLD }) {

  const points = `${cx},${cy - h/2} ${cx + w/2},${cy} ${cx},${cy + h/2} ${cx - w/2},${cy}`;

  return (

    <g>

      <polygon points={points} fill={color} stroke={stroke} strokeWidth="2" />

      <text x={cx} y={cy - 2} textAnchor="middle" fill={stroke} fontSize="10" fontWeight="900" fontFamily="Arial">{label}</text>

      {sub && <text x={cx} y={cy + 12} textAnchor="middle" fill={stroke} fontSize="9" fontFamily="Arial">{sub}</text>}

    </g>

  );

}

export function BPArrow({ x1, y1, x2, y2, color = BP_GOLD, label, dashed = false, kind = 'gold' }) {

  const marker = kind === 'green' ? 'url(#bp-arrow-green)' : kind === 'red' ? 'url(#bp-arrow-red)' : 'url(#bp-arrow)';

  const strokeColor = kind === 'green' ? '#2dc653' : kind === 'red' ? '#e63946' : color;

  return (

    <g>

      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={strokeColor} strokeWidth="1.8" strokeDasharray={dashed ? '4,3' : '0'} markerEnd={marker} />

      {label && <text x={(x1+x2)/2 + 6} y={(y1+y2)/2 - 4} fill={strokeColor} fontSize="9" fontWeight="bold" fontFamily="Arial">{label}</text>}

    </g>

  );

}

export function BPLabel({ x, y, text, color = BP_GOLD, fontSize = 10, anchor = 'start', bold = true }) {

  return (

    <text x={x} y={y} textAnchor={anchor} fill={color} fontSize={fontSize} fontWeight={bold ? 'bold' : 'normal'} fontFamily="Arial" letterSpacing="0.5">

      {text}

    </text>

  );

}
