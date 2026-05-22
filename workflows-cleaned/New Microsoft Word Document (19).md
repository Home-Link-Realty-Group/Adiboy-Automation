# New Microsoft Word Document (19)

Source: New Microsoft Word Document (19).docx

/**

 * Vibrant 3D integration blueprints — glossy gradients, drop shadows,

 * crisp readable sans-serif labels.

 */

const INK = '#0f172a';

const ACCENT = '#D4A843';

const GREEN = '#16a34a';

const BLUE = '#3b82f6';

const PURPLE = '#7c3aed';

const PINK = '#f43f5e';

function Defs() {

  const colors = [

    ['ink',    '#1e293b', INK],

    ['accent', '#fbbf24', ACCENT],

    ['green',  '#4ade80', GREEN],

    ['blue',   '#60a5fa', BLUE],

    ['purple', '#a855f7', PURPLE],

    ['pink',   '#fb7185', PINK],

  ];

  return (

    <defs>

      {colors.map(([id, light, dark]) => (

        <linearGradient key={id} id={`igr-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">

          <stop offset="0%"   stopColor={light} />

          <stop offset="55%"  stopColor={dark} />

          <stop offset="100%" stopColor={dark} stopOpacity="0.85" />

        </linearGradient>

      ))}

      <linearGradient id="iglossOverlay" x1="0%" y1="0%" x2="0%" y2="100%">

        <stop offset="0%"   stopColor="#fff" stopOpacity="0.85" />

        <stop offset="100%" stopColor="#fff" stopOpacity="0" />

      </linearGradient>

      <filter id="iNodeShadow" x="-20%" y="-20%" width="140%" height="160%">

        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />

      </filter>

      <filter id="iGlow" x="-50%" y="-50%" width="200%" height="200%">

        <feGaussianBlur stdDeviation="2.5" result="b" />

        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>

      </filter>

    </defs>

  );

}

const KEY = {

  [INK]: 'ink', [ACCENT]: 'accent', [GREEN]: 'green',

  [BLUE]: 'blue', [PURPLE]: 'purple', [PINK]: 'pink',

};

function Box({ x, y, w, h, label, sub, color = INK, glow = false }) {

  const gradId = `igr-${KEY[color] || 'ink'}`;

  return (

    <g filter={glow ? 'url(#iGlow)' : 'url(#iNodeShadow)'}>

      <rect x={x} y={y} width={w} height={h} rx={7} ry={7}

        fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />

      <rect x={x + 1.5} y={y + 1.5} width={w - 3} height={h * 0.45} rx={6} ry={6}

        fill="url(#iglossOverlay)" opacity="0.45" pointerEvents="none" />

      <text x={x + w / 2} y={y + h / 2 - (sub ? 5 : -5)} textAnchor="middle"

        fontFamily="'Segoe UI', system-ui, sans-serif" fontWeight="900" fontSize="13"

        fill="#fff" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6), 0 0 1px rgba(0,0,0,0.8)' }}>

        {label}

      </text>

      {sub && (

        <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle"

          fontFamily="'Segoe UI', system-ui, sans-serif" fontWeight="700" fontSize="10.5"

          fill="rgba(255,255,255,0.95)" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>

          {sub}

        </text>

      )}

    </g>

  );

}

function Arrow({ x1, y1, x2, y2, color = INK, dashed = false, label }) {

  const id = `iarr-${x1}-${y1}-${x2}-${y2}`.replace(/\./g, '');

  return (

    <g>

      <defs>

        <marker id={id} markerWidth="11" markerHeight="11" refX="8" refY="5.5" orient="auto">

          <path d="M0,0 L9,5.5 L0,11 z" fill={color} />

        </marker>

      </defs>

      <line x1={x1} y1={y1} x2={x2} y2={y2}

        stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.22" />

      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.8" strokeLinecap="round"

        strokeDasharray={dashed ? '6,4' : 'none'} markerEnd={`url(#${id})`} />

      {label && (

        <g>

          <rect x={(x1 + x2) / 2 - 20} y={(y1 + y2) / 2 - 16} width="40" height="15" rx="4"

            fill="#fff" stroke={color} strokeWidth="1.5" />

          <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 5} textAnchor="middle"

            fontFamily="'Segoe UI', system-ui, sans-serif" fontSize="11" fill={color} fontWeight="900">

            {label}

          </text>

        </g>

      )}

    </g>

  );

}

function Hub({ cx, cy, label, color }) {

  const gradId = `igr-${KEY[color] || 'blue'}`;

  return (

    <g filter="url(#iNodeShadow)">

      <circle cx={cx} cy={cy} r={32} fill={`url(#${gradId})`}

        stroke="rgba(255,255,255,0.7)" strokeWidth="2" />

      {/* Glossy highlight */}

      <ellipse cx={cx} cy={cy - 11} rx={22} ry={9} fill="rgba(255,255,255,0.45)" />

      <text x={cx} y={cy + 6} textAnchor="middle"

        fontFamily="'Segoe UI', system-ui, sans-serif" fontWeight="900" fontSize="13.5"

        fill="#fff" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}>

        {label}

      </text>

    </g>

  );

}

function ApifyBP() {

  return (

    <svg viewBox="0 0 460 140" style={svgStyle}>

      <Defs />

      <Box x={5} y={20} w={88} h={28} label="County Records" color={INK} />

      <Box x={5} y={54} w={88} h={28} label="Foreclosures" color={INK} />

      <Box x={5} y={88} w={88} h={28} label="FSBO Listings" color={INK} />

      <Arrow x1={95} y1={34} x2={155} y2={70} color={BLUE} />

      <Arrow x1={95} y1={68} x2={155} y2={70} color={BLUE} />

      <Arrow x1={95} y1={102} x2={155} y2={70} color={BLUE} />

      <Hub cx={188} cy={70} label="APIFY" color={BLUE} />

      <Arrow x1={216} y1={70} x2={278} y2={70} color={GREEN} dashed />

      <Box x={280} y={36} w={90} h={30} label="📥 LEADS" color={GREEN} />

      <Box x={280} y={72} w={90} h={30} label="🏠 PROPS" color={GREEN} />

      <Arrow x1={372} y1={51} x2={408} y2={70} color={INK} />

      <Arrow x1={372} y1={87} x2={408} y2={70} color={INK} />

      <Box x={410} y={52} w={48} h={36} label="CRM" color={ACCENT} glow />

    </svg>

  );

}

function TwilioBP() {

  return (

    <svg viewBox="0 0 460 140" style={svgStyle}>

      <Defs />

      <Box x={5} y={52} w={72} h={36} label="📋 LIST" sub="leads" color={INK} />

      <Arrow x1={79} y1={70} x2={132} y2={70} color={INK} />

      <Hub cx={162} cy={70} label="TWILIO" color={PINK} />

      <Arrow x1={190} y1={50} x2={236} y2={20} color={GREEN} label="dial" />

      <Arrow x1={190} y1={70} x2={236} y2={70} color={GREEN} label="SMS" />

      <Arrow x1={190} y1={90} x2={236} y2={114} color={GREEN} label="VM" />

      <Box x={240} y={6} w={92} h={30} label="📞 CALL" color={GREEN} />

      <Box x={240} y={54} w={92} h={30} label="📱 TEXT" color={GREEN} />

      <Box x={240} y={102} w={92} h={30} label="🎙️ DROP" color={GREEN} />

      <Arrow x1={334} y1={20} x2={380} y2={70} color={INK} />

      <Arrow x1={334} y1={70} x2={380} y2={70} color={INK} />

      <Arrow x1={334} y1={114} x2={380} y2={70} color={INK} />

      <Box x={382} y={52} w={76} h={36} label="📊 LOG" sub="recordings" color={ACCENT} glow />

    </svg>

  );

}

function StripeBP() {

  return (

    <svg viewBox="0 0 460 140" style={svgStyle}>

      <Defs />

      <Box x={5} y={52} w={88} h={36} label="👤 USER" sub="signs up" color={INK} />

      <Arrow x1={95} y1={70} x2={142} y2={70} color={INK} />

      <Hub cx={172} cy={70} label="STRIPE" color={PURPLE} />

      <Arrow x1={200} y1={70} x2={246} y2={70} color={GREEN} />

      <Box x={248} y={20} w={92} h={30} label="💳 SUBSCRIBE" color={GREEN} />

      <Box x={248} y={54} w={92} h={30} label="🔄 RECURRING" color={GREEN} />

      <Box x={248} y={88} w={92} h={30} label="📊 USAGE" color={GREEN} />

      <Arrow x1={342} y1={35} x2={397} y2={70} color={INK} />

      <Arrow x1={342} y1={70} x2={397} y2={70} color={INK} />

      <Arrow x1={342} y1={103} x2={397} y2={70} color={INK} />

      <Box x={400} y={52} w={58} h={36} label="💰 MRR" color={ACCENT} glow />

    </svg>

  );

}

function ResendBP() {

  return (

    <svg viewBox="0 0 460 140" style={svgStyle}>

      <Defs />

      <Box x={5} y={20} w={92} h={28} label="🚨 lead alert" color={INK} />

      <Box x={5} y={52} w={92} h={28} label="📋 follow-up" color={INK} />

      <Box x={5} y={84} w={92} h={28} label="📊 KPI digest" color={INK} />

      <Arrow x1={99} y1={34} x2={152} y2={68} color={INK} />

      <Arrow x1={99} y1={66} x2={152} y2={68} color={INK} />

      <Arrow x1={99} y1={98} x2={152} y2={68} color={INK} />

      <Hub cx={184} cy={68} label="RESEND" color={GREEN} />

      <Arrow x1={212} y1={68} x2={270} y2={68} color={GREEN} dashed label="SMTP" />

      <Box x={272} y={50} w={92} h={36} label="✉️ DELIVERED" color={ACCENT} />

      <Arrow x1={366} y1={68} x2={400} y2={68} color={INK} />

      <Box x={402} y={50} w={56} h={36} label="📬 INBOX" color={GREEN} glow />

    </svg>

  );

}

function RentcastBP() {

  return (

    <svg viewBox="0 0 460 140" style={svgStyle}>

      <Defs />

      <Box x={5} y={52} w={88} h={36} label="🏠 ADDRESS" color={INK} />

      <Arrow x1={95} y1={70} x2={142} y2={70} color={INK} />

      <Hub cx={172} cy={70} label="RENTCAST" color={BLUE} />

      <Arrow x1={200} y1={70} x2={250} y2={70} color={GREEN} dashed />

      <Box x={252} y={4} w={88} h={28} label="ARV" color={GREEN} />

      <Box x={252} y={36} w={88} h={28} label="💵 RENT" color={GREEN} />

      <Box x={252} y={68} w={88} h={28} label="📊 COMPS" color={GREEN} />

      <Box x={252} y={100} w={88} h={28} label="🏘️ MARKET" color={GREEN} />

      <Arrow x1={342} y1={18} x2={397} y2={70} color={INK} />

      <Arrow x1={342} y1={50} x2={397} y2={70} color={INK} />

      <Arrow x1={342} y1={82} x2={397} y2={70} color={INK} />

      <Arrow x1={342} y1={114} x2={397} y2={70} color={INK} />

      <Box x={400} y={52} w={58} h={36} label="📐 OFFER" color={ACCENT} glow />

    </svg>

  );

}

function TrustedFormBP() {

  return (

    <svg viewBox="0 0 460 140" style={svgStyle}>

      <Defs />

      <Box x={5} y={52} w={88} h={36} label="📝 FORM" sub="submitted" color={INK} />

      <Arrow x1={95} y1={70} x2={142} y2={70} color={INK} />

      <Hub cx={172} cy={70} label="TF Cert" color={ACCENT} />

      <Arrow x1={200} y1={70} x2={246} y2={70} color={GREEN} />

      <Box x={248} y={36} w={104} h={30} label="🔒 cert URL" color={GREEN} />

      <Box x={248} y={70} w={104} h={30} label="📅 timestamp" color={GREEN} />

      <Arrow x1={354} y1={51} x2={397} y2={70} color={INK} />

      <Arrow x1={354} y1={85} x2={397} y2={70} color={INK} />

      <Box x={400} y={52} w={58} h={36} label="✅ TCPA" sub="proof" color={ACCENT} glow />

    </svg>

  );

}

const BPS = {

  apify: ApifyBP,

  twilio: TwilioBP,

  stripe: StripeBP,

  resend: ResendBP,

  rentcast: RentcastBP,

  trustedform: TrustedFormBP,

};

export default function IntegrationBlueprint({ type }) {

  const Component = BPS[type];

  if (!Component) return null;

  return (

    <div style={whiteboard}>

      <Component />

    </div>

  );

}

const svgStyle = { width: '100%', height: 'auto', maxHeight: 220, display: 'block' };

const whiteboard = {

  background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e0e7ff 100%)',

  border: '1.5px solid #94a3b8',

  borderRadius: 12,

  padding: 16,

  boxShadow: 'inset 0 2px 4px rgba(15,23,42,0.08), 0 6px 18px rgba(15,23,42,0.08)',

};
