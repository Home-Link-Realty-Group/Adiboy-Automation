# New Microsoft Word Document (38)

Source: New Microsoft Word Document (38).docx

import { useState } from 'react';

import { Lock, TrendingUp, Sparkles, Crown, Zap } from 'lucide-react';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const GREEN = '#16a34a';

const PURPLE = '#7b2d8b';

const TIER_CONFIG = {

  starter:    { label: 'STARTER',    color: '#64748b', icon: Zap,      bg: '#f1f5f9' },

  pro:        { label: 'PRO',        color: NAVY,     icon: Sparkles, bg: '#dbeafe' },

  enterprise: { label: 'ENTERPRISE', color: GOLD,     icon: Crown,    bg: '#fef3c7' },

};

/**

 * Premium feature toggle card with tier-gating and upgrade-driving metrics.

 * Visual-only toggle — no backend wiring (this is a marketing/upsell page).

 */

export default function FeatureToggleCard({

  title,

  description,

  tier = 'starter',

  userTier = 'starter',

  metric,                 // e.g. { value: '4.7×', label: 'more deals closed' }

  defaultEnabled = true,

  icon: Icon,

}) {

  const tierCfg = TIER_CONFIG[tier];

  const TierIcon = tierCfg.icon;

  // Locked if this feature requires a higher tier than user has

  const tierRank = { starter: 0, pro: 1, enterprise: 2 };

  const isLocked = tierRank[tier] > tierRank[userTier];

  const [enabled, setEnabled] = useState(defaultEnabled && !isLocked);

  return (

    <div

      style={{

        position: 'relative',

        background: '#fff',

        borderRadius: 16,

        padding: 22,

        border: isLocked ? `2px solid ${GOLD}` : '1.5px solid #e2e8f0',

        boxShadow: isLocked

          ? '0 8px 24px rgba(212,168,67,0.18)'

          : '0 2px 8px rgba(15,31,69,0.06)',

        overflow: 'hidden',

        transition: 'all 0.25s ease',

      }}

    >

      {/* Locked overlay strip */}

      {isLocked && (

        <div style={{

          position: 'absolute', top: 0, right: 0,

          background: `linear-gradient(135deg, ${GOLD}, #b8902f)`,

          color: '#fff', padding: '4px 14px', fontSize: 10, fontWeight: 800,

          letterSpacing: 1, borderBottomLeftRadius: 10,

          display: 'flex', alignItems: 'center', gap: 5,

        }}>

          <Lock size={11} /> ENTERPRISE

        </div>

      )}

      {/* Header — icon + tier badge */}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>

        <div style={{

          width: 44, height: 44, borderRadius: 12,

          background: isLocked ? `${GOLD}15` : `${NAVY}10`,

          display: 'flex', alignItems: 'center', justifyContent: 'center',

        }}>

          {Icon && <Icon size={22} color={isLocked ? GOLD : NAVY} />}

        </div>

        {!isLocked && (

          <div style={{

            display: 'inline-flex', alignItems: 'center', gap: 4,

            background: tierCfg.bg, color: tierCfg.color,

            padding: '4px 10px', borderRadius: 14, fontSize: 10, fontWeight: 800,

            letterSpacing: 0.5,

          }}>

            <TierIcon size={11} /> {tierCfg.label}

          </div>

        )}

      </div>

      {/* Title + description */}

      <div style={{

        fontWeight: 800, fontSize: 15, color: NAVY, marginBottom: 6,

        filter: isLocked ? 'blur(0)' : 'none',

      }}>

        {title}

      </div>

      <div style={{

        fontSize: 13, color: '#64748b', lineHeight: 1.55, marginBottom: 16,

        filter: isLocked ? 'blur(2px)' : 'none',

        userSelect: isLocked ? 'none' : 'auto',

      }}>

        {description}

      </div>

      {/* Metric — the upgrade driver */}

      {metric && (

        <div style={{

          background: isLocked

            ? `linear-gradient(135deg, ${GOLD}10, ${GOLD}05)`

            : '#f0fdf4',

          border: `1px solid ${isLocked ? GOLD + '40' : GREEN + '30'}`,

          borderRadius: 10, padding: '10px 14px', marginBottom: 16,

          display: 'flex', alignItems: 'center', gap: 10,

        }}>

          <TrendingUp size={16} color={isLocked ? GOLD : GREEN} />

          <div>

            <span style={{ fontWeight: 900, color: isLocked ? GOLD : GREEN, fontSize: 16 }}>

              {metric.value}

            </span>

            <span style={{ fontSize: 12, color: '#475569', marginLeft: 6 }}>

              {metric.label}

            </span>

          </div>

        </div>

      )}

      {/* Toggle row OR upgrade CTA */}

      {isLocked ? (

        <a

          href="/Pricing"

          style={{

            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,

            background: `linear-gradient(135deg, ${GOLD}, #b8902f)`,

            color: '#fff', textDecoration: 'none',

            padding: '10px 16px', borderRadius: 10,

            fontWeight: 800, fontSize: 13, letterSpacing: 0.3,

          }}

        >

          <Crown size={14} /> Upgrade to Unlock

        </a>

      ) : (

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <span style={{ fontSize: 12, fontWeight: 700, color: enabled ? GREEN : '#94a3b8' }}>

            {enabled ? '● ACTIVE' : '○ DISABLED'}

          </span>

          <button

            onClick={() => setEnabled(!enabled)}

            aria-label={`Toggle ${title}`}

            style={{

              position: 'relative',

              width: 50, height: 28, borderRadius: 14,

              background: enabled ? GREEN : '#cbd5e1',

              border: 'none', cursor: 'pointer',

              transition: 'background 0.25s',

            }}

          >

            <span style={{

              position: 'absolute', top: 3, left: enabled ? 25 : 3,

              width: 22, height: 22, borderRadius: '50%',

              background: '#fff',

              boxShadow: '0 2px 6px rgba(0,0,0,0.25)',

              transition: 'left 0.25s',

            }} />

          </button>

        </div>

      )}

    </div>

  );

}
