# New Microsoft Word Document (127)

Source: New Microsoft Word Document (127).docx

const PLATFORM_CONFIGS = {

  facebook: {

    name: 'Facebook', color: '#1877F2', bg: '#18191a', cardBg: '#242526',

    avatar: '🏠', pageName: 'Home-Link Realty Group', timeAgo: 'Just now · 🌎',

    actionBar: ['👍 Like', '💬 Comment', '↗️ Share'],

  },

  instagram: {

    name: 'Instagram', color: '#E1306C', bg: '#000', cardBg: '#000',

    avatar: '🏠', pageName: 'homelinkrealtygroup',

    actionBar: ['❤️', '💬', '✈️', '🔖'],

  },

  linkedin: {

    name: 'LinkedIn', color: '#0A66C2', bg: '#1b1f23', cardBg: '#1d2226',

    avatar: '🏠', pageName: 'Home-Link Realty Group', timeAgo: '1st · Just now',

    actionBar: ['👍 Like', '💬 Comment', '🔁 Repost', '✈️ Send'],

  },

  twitter: {

    name: 'Twitter/X', color: '#1DA1F2', bg: '#000', cardBg: '#000',

    avatar: '🏠', pageName: 'HomeLink Realty', handle: '@homelinkrealty',

    actionBar: ['💬', '🔁', '❤️', '📊', '↗️'],

  },

};

const PLATFORM_LIMITS = { facebook: 63206, instagram: 2200, linkedin: 3000, twitter: 280 };

function truncateForPlatform(text, platform) {

  const limit = PLATFORM_LIMITS[platform] || 9999;

  if (!text || text.length <= limit) return { text, truncated: false };

  return { text: text.slice(0, limit - 3) + '...', truncated: true };

}

function FacebookPreview({ content, imageUrl, config }) {

  const { text, truncated } = truncateForPlatform(content, 'facebook');

  return (

    <div style={{ background: config.cardBg, borderRadius: 10, border: '1px solid #3a3b3c', fontFamily: 'Helvetica, Arial, sans-serif', overflow: 'hidden' }}>

      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>

        <div style={{ width: 40, height: 40, background: config.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{config.avatar}</div>

        <div>

          <div style={{ fontSize: 14, fontWeight: 700, color: '#e4e6eb' }}>{config.pageName}</div>

          <div style={{ fontSize: 11, color: '#65676b' }}>{config.timeAgo}</div>

        </div>

        <div style={{ marginLeft: 'auto', color: '#65676b', fontSize: 18 }}>•••</div>

      </div>

      {text && <div style={{ padding: '0 16px 12px', fontSize: 14, color: '#e4e6eb', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{text}{truncated && <span style={{ color: config.color, cursor: 'pointer' }}> See more</span>}</div>}

      {imageUrl && <img src={imageUrl} alt="" style={{ width: '100%', maxHeight: 280, objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />}

      <div style={{ padding: '8px 16px', display: 'flex', borderTop: '1px solid #3a3b3c', gap: 0 }}>

        {config.actionBar.map(a => (

          <button key={a} style={{ flex: 1, background: 'none', border: 'none', color: '#65676b', fontSize: 12, fontWeight: 700, padding: '6px 0', cursor: 'pointer' }}>{a}</button>

        ))}

      </div>

    </div>

  );

}

function InstagramPreview({ content, imageUrl, config }) {

  const { text } = truncateForPlatform(content, 'instagram');

  return (

    <div style={{ background: config.cardBg, borderRadius: 10, border: '1px solid #262626', overflow: 'hidden', fontFamily: '-apple-system, sans-serif' }}>

      <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>

        <div style={{ width: 34, height: 34, background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{config.avatar}</div>

        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{config.pageName}</div>

        <div style={{ marginLeft: 'auto', color: '#666', fontSize: 16 }}>•••</div>

      </div>

      {imageUrl ? <img src={imageUrl} alt="" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} /> : (

        <div style={{ aspectRatio: '1/1', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: 13 }}>📸 Add an image for Instagram</div>

      )}

      <div style={{ padding: '10px 14px 6px' }}>

        <div style={{ display: 'flex', gap: 14, marginBottom: 8 }}>

          {config.actionBar.map((a, i) => (

            <span key={i} style={{ fontSize: i < 3 ? 22 : 18, cursor: 'pointer', marginLeft: i === 3 ? 'auto' : 0 }}>{a}</span>

          ))}

        </div>

        {text && <div style={{ fontSize: 13, color: '#fff', lineHeight: 1.5 }}><span style={{ fontWeight: 700 }}>{config.pageName} </span>{text}</div>}

      </div>

    </div>

  );

}

function LinkedInPreview({ content, imageUrl, config }) {

  const { text, truncated } = truncateForPlatform(content, 'linkedin');

  return (

    <div style={{ background: config.cardBg, borderRadius: 10, border: '1px solid #38434f', overflow: 'hidden', fontFamily: '-apple-system, sans-serif' }}>

      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>

        <div style={{ width: 48, height: 48, background: config.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{config.avatar}</div>

        <div>

          <div style={{ fontSize: 14, fontWeight: 700, color: '#e7e9ea' }}>{config.pageName}</div>

          <div style={{ fontSize: 11, color: '#8a9099' }}>Real Estate Investors · {config.timeAgo}</div>

        </div>

        <button style={{ marginLeft: 'auto', background: 'none', border: `1px solid ${config.color}`, color: config.color, borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Follow</button>

      </div>

      {text && <div style={{ padding: '0 16px 12px', fontSize: 13, color: '#e7e9ea', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{text}{truncated && <span style={{ color: config.color }}> ...see more</span>}</div>}

      {imageUrl && <img src={imageUrl} alt="" style={{ width: '100%', maxHeight: 260, objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />}

      <div style={{ padding: '8px 16px', display: 'flex', borderTop: '1px solid #38434f' }}>

        {config.actionBar.map(a => (

          <button key={a} style={{ flex: 1, background: 'none', border: 'none', color: '#8a9099', fontSize: 12, fontWeight: 700, padding: '6px 0', cursor: 'pointer' }}>{a}</button>

        ))}

      </div>

    </div>

  );

}

function TwitterPreview({ content, imageUrl, config }) {

  const { text, truncated } = truncateForPlatform(content, 'twitter');

  const charCount = content?.length || 0;

  const overLimit = charCount > 280;

  return (

    <div style={{ background: config.cardBg, borderRadius: 10, border: '1px solid #2f3336', overflow: 'hidden', fontFamily: '-apple-system, sans-serif' }}>

      <div style={{ padding: '14px 16px' }}>

        <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>

          <div style={{ width: 40, height: 40, background: config.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{config.avatar}</div>

          <div style={{ flex: 1 }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

              <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{config.pageName}</span>

              <span style={{ fontSize: 12, color: '#71767b' }}>{config.handle} · now</span>

            </div>

            {text && <div style={{ fontSize: 14, color: overLimit ? '#e74c3c' : '#e7e9ea', lineHeight: 1.5, marginTop: 4, whiteSpace: 'pre-wrap' }}>{text}</div>}

            {imageUrl && <img src={imageUrl} alt="" style={{ width: '100%', borderRadius: 12, marginTop: 10, maxHeight: 220, objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />}

            {overLimit && <div style={{ fontSize: 11, color: '#e74c3c', marginTop: 6, fontWeight: 700 }}>⚠️ {charCount}/280 — Too long for Twitter! Shorten your text.</div>}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>

              {config.actionBar.map((a, i) => <span key={i} style={{ fontSize: 14, color: '#71767b', cursor: 'pointer' }}>{a}</span>)}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default function PlatformPreview({ content, imageUrl, selectedPlatforms }) {

  const platforms = selectedPlatforms?.length ? selectedPlatforms : ['facebook', 'instagram', 'linkedin', 'twitter'];

  return (

    <div>

      <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>📱 Platform Previews</div>

      <div style={{ display: 'grid', gridTemplateColumns: platforms.length === 1 ? '1fr' : platforms.length === 2 ? '1fr 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>

        {platforms.map(p => {

          const config = PLATFORM_CONFIGS[p.toLowerCase()];

          if (!config) return null;

          if (p === 'facebook') return <div key={p}><div style={{ fontSize: 10, fontWeight: 700, color: config.color, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>📘 Facebook</div><FacebookPreview content={content} imageUrl={imageUrl} config={config} /></div>;

          if (p === 'instagram') return <div key={p}><div style={{ fontSize: 10, fontWeight: 700, color: config.color, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>📸 Instagram</div><InstagramPreview content={content} imageUrl={imageUrl} config={config} /></div>;

          if (p === 'linkedin') return <div key={p}><div style={{ fontSize: 10, fontWeight: 700, color: config.color, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>💼 LinkedIn</div><LinkedInPreview content={content} imageUrl={imageUrl} config={config} /></div>;

          if (p === 'twitter') return <div key={p}><div style={{ fontSize: 10, fontWeight: 700, color: config.color, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>🐦 Twitter/X</div><TwitterPreview content={content} imageUrl={imageUrl} config={config} /></div>;

          return null;

        })}

      </div>

    </div>

  );

}
