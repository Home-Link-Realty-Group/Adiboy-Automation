# New Microsoft Word Document (120)

Source: New Microsoft Word Document (120).docx

import \{ useState \} from 'react';

import \{ base44 \} from '@/api/base44Client';

import \{ socialMediaManager \} from '@/functions/socialMediaManager';

import \{ publishSocialPost \} from '@/functions/publishSocialPost';

import PlatformPreview from '\./PlatformPreview';

const PLATFORMS = \['facebook', 'instagram', 'linkedin', 'twitter'\];

const POST\_TYPES = \['Property', 'Testimonial', 'Education', 'Motivation', 'Offer', 'Community', 'Custom'\];

const PLATFORM\_ICONS = \{ facebook: '📘', instagram: '📸', linkedin: '💼', twitter: '🐦' \};

const PLATFORM\_COLORS = \{ facebook: '\#1877F2', instagram: '\#E1306C', linkedin: '\#0A66C2', twitter: '\#1DA1F2' \};

const PLATFORM\_LIMITS = \{ facebook: 63206, instagram: 2200, linkedin: 3000, twitter: 280 \};

const HASHTAG\_SETS = \{

  Property: '\#RealEstate \#CashOffer \#SellYourHome \#WeAreCashBuyers \#HomeSale',

  Testimonial: '\#HappyClient \#RealEstate \#WeAreCashBuyers \#CashBuyer \#SoldMyHouse',

  Education: '\#RealEstateTips \#HomeSelling \#CashSale \#RealEstateInvesting \#HouseHack',

  Motivation: '\#Motivation \#RealEstate \#Entrepreneur \#HustleHard \#WholesaleRealEstate',

  Offer: '\#CashOffer \#SellFast \#NoFees \#NoRepairs \#HomeSellers',

  Community: '\#Dallas \#FortWorth \#CommunityFirst \#RealEstate \#TexasRealEstate',

  Custom: '\#RealEstate \#CashBuyer \#SellMyHouse \#WeAreCashBuyers \#HomeSale',

\};

const BEST\_TIMES = \[

  \{ platform: 'facebook', times: 'Wed & Thu · 1–3pm CST', icon: '📘' \},

  \{ platform: 'instagram', times: 'Tue & Fri · 10am–noon CST', icon: '📸' \},

  \{ platform: 'linkedin', times: 'Tue–Thu · 8–10am CST', icon: '💼' \},

  \{ platform: 'twitter', times: 'Mon–Wed · 9am & 6pm CST', icon: '🐦' \},

\];

const inp = \(extra = \{\}\) => \(\{ width: '100%', background: 'rgba\(0,0,0,0\.3\)', border: '1px solid rgba\(255,255,255,0\.1\)', color: '\#fff', borderRadius: 8, padding: '9px 12px', fontSize: 12, boxSizing: 'border\-box', fontFamily: 'inherit', \.\.\.extra \}\);

export default function AIComposer\(\{ campaigns, onPostSaved, initialImageUrl = '' \}\) \{

  const \[topic, setTopic\] = useState\(''\);

  const \[platform, setPlatform\] = useState\('facebook'\);

  const \[postType, setPostType\] = useState\('Offer'\);

  const \[audience, setAudience\] = useState\('motivated home sellers nationwide'\);

  const \[generatedContent, setGeneratedContent\] = useState\(''\);

  const \[generating, setGenerating\] = useState\(false\);

  const \[selectedPlatforms, setSelectedPlatforms\] = useState\(\['facebook', 'instagram'\]\);

  const \[scheduledDate, setScheduledDate\] = useState\(''\);

  const \[scheduledTime, setScheduledTime\] = useState\('09:00'\);

  const \[campaignId, setCampaignId\] = useState\(''\);

  const \[imageUrl, setImageUrl\] = useState\(initialImageUrl\);

  const \[saving, setSaving\] = useState\(false\);

  const \[saved, setSaved\] = useState\(false\);

  const \[title, setTitle\] = useState\(''\);

  const \[publishing, setPublishing\] = useState\(false\);

  const \[publishResult, setPublishResult\] = useState\(null\);

  const \[showPreview, setShowPreview\] = useState\(false\);

  const \[hashtagsAdded, setHashtagsAdded\] = useState\(false\);

  const \[tab, setTab\] = useState\('write'\); // write | preview

  const togglePlatform = \(p\) => \{

    setSelectedPlatforms\(prev => prev\.includes\(p\) ? prev\.filter\(x => x \!== p\) : \[\.\.\.prev, p\]\);

  \};

  const generate = async \(\) => \{

    if \(\!topic\.trim\(\)\) return;

    setGenerating\(true\);

    setGeneratedContent\(''\);

    setSaved\(false\);

    setPublishResult\(null\);

    setHashtagsAdded\(false\);

    try \{

      const res = await socialMediaManager\(\{ action: 'generate\_post', topic, platform, post\_type: postType, audience \}\);

      setGeneratedContent\(res\.data?\.content || ''\);

      if \(\!title\) setTitle\(\`$\{postType\} — $\{topic\.slice\(0, 40\)\}\`\);

    \} catch \(e\) \{

      setGeneratedContent\('Error generating: ' \+ e\.message\);

    \}

    setGenerating\(false\);

  \};

  const addHashtags = \(\) => \{

    const tags = HASHTAG\_SETS\[postType\] || HASHTAG\_SETS\.Custom;

    setGeneratedContent\(prev => prev \+ '\\n\\n' \+ tags\);

    setHashtagsAdded\(true\);

  \};

  const savePost = async \(status\) => \{

    if \(\!generatedContent\) return;

    setSaving\(true\);

    try \{

      const rec = await base44\.entities\.SocialPost\.create\(\{

        title: title || \`$\{postType\} — $\{topic\.slice\(0, 40\)\}\`,

        content: generatedContent,

        platforms: selectedPlatforms\.join\(','\),

        post\_type: postType,

        status,

        scheduled\_date: scheduledDate || null,

        scheduled\_time: scheduledTime,

        campaign\_id: campaignId || null,

        campaign\_name: campaigns\.find\(c => c\.id === campaignId\)?\.name || '',

        image\_url: imageUrl || null,

        target\_audience: audience,

      \}\);

      setSaved\(true\);

      if \(onPostSaved\) onPostSaved\(\);

      if \(status === 'Draft'\) setTimeout\(\(\) => setSaved\(false\), 2500\);

      return rec;

    \} catch \(e\) \{

      alert\('Save failed: ' \+ e\.message\);

    \}

    setSaving\(false\);

  \};

  const publishNow = async \(\) => \{

    if \(\!generatedContent\) return;

    setPublishing\(true\);

    setPublishResult\(null\);

    const rec = await base44\.entities\.SocialPost\.create\(\{

      title: title || \`$\{postType\} — $\{topic\.slice\(0, 40\)\}\`,

      content: generatedContent,

      platforms: selectedPlatforms\.join\(','\),

      post\_type: postType,

      status: 'Scheduled',

      image\_url: imageUrl || null,

      target\_audience: audience,

      campaign\_id: campaignId || null,

    \}\);

    try \{

      const res = await publishSocialPost\(\{

        action: 'publish\_all',

        post\_id: rec\.id,

        content: generatedContent,

        image\_url: imageUrl || null,

        platforms: selectedPlatforms\.join\(','\),

      \}\);

      setPublishResult\(res\.data\);

      if \(res\.data?\.ok\) \{ setSaved\(true\); if \(onPostSaved\) onPostSaved\(\); \}

    \} catch \(e\) \{

      setPublishResult\(\{ ok: false, error: e\.message \}\);

    \}

    setPublishing\(false\);

  \};

  const charCount = generatedContent\.length;

  return \(

    <div style=\{\{ padding: '28px', maxWidth: 1400, margin: '0 auto' \}\}>

      <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'flex\-start', marginBottom: 24 \}\}>

        <div>

          <h1 style=\{\{ fontSize: 22, fontWeight: 900, color: '\#fff', margin: 0 \}\}>✍️ AI Content Composer</h1>

          <div style=\{\{ fontSize: 12, color: '\#444', marginTop: 5 \}\}>Generate · Edit · Preview · Schedule · Publish — all in one place</div>

        </div>

        <div style=\{\{ display: 'flex', gap: 8 \}\}>

          \{\['write', 'preview'\]\.map\(t => \(

            <button key=\{t\} onClick=\{\(\) => setTab\(t\)\} style=\{\{

              padding: '8px 18px', borderRadius: 20, border: \`1\.5px solid $\{tab === t ? '\#e74c3c' : 'rgba\(255,255,255,0\.1\)'\}\`,

              background: tab === t ? 'rgba\(231,76,60,0\.15\)' : 'transparent',

              color: tab === t ? '\#e74c3c' : '\#666', fontSize: 12, fontWeight: 700, cursor: 'pointer'

            \}\}>\{t === 'write' ? '✍️ Write' : '📱 Platform Preview'\}</button>

          \)\)\}

        </div>

      </div>

      \{tab === 'write' && \(

        <div style=\{\{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 20 \}\}>

          \{/\* LEFT — Controls \*/\}

          <div style=\{\{ display: 'flex', flexDirection: 'column', gap: 14 \}\}>

            \{/\* AI Generator \*/\}

            <div style=\{\{ background: 'rgba\(255,255,255,0\.04\)', border: '1px solid rgba\(231,76,60,0\.2\)', borderRadius: 14, padding: 20 \}\}>

              <div style=\{\{ fontSize: 11, fontWeight: 700, color: '\#e74c3c', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 \}\}>🤖 AI Generator</div>

              <div style=\{\{ marginBottom: 12 \}\}>

                <label style=\{\{ fontSize: 10, color: '\#666', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 6 \}\}>Topic / Story</label>

                <textarea value=\{topic\} onChange=\{e => setTopic\(e\.target\.value\)\}

                  placeholder="e\.g\. 'We closed a house in 8 days from a seller facing foreclosure — here's how'"

                  rows=\{3\} style=\{inp\(\{ resize: 'vertical', lineHeight: 1\.6 \}\)\} />

              </div>

              <div style=\{\{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 \}\}>

                <div>

                  <label style=\{\{ fontSize: 10, color: '\#666', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 6 \}\}>Optimize For</label>

                  <select value=\{platform\} onChange=\{e => setPlatform\(e\.target\.value\)\} style=\{\{ \.\.\.inp\(\), cursor: 'pointer' \}\}>

                    \{PLATFORMS\.map\(p => <option key=\{p\} value=\{p\}>\{PLATFORM\_ICONS\[p\]\} \{p\.charAt\(0\)\.toUpperCase\(\) \+ p\.slice\(1\)\}</option>\)\}

                  </select>

                </div>

                <div>

                  <label style=\{\{ fontSize: 10, color: '\#666', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 6 \}\}>Post Type</label>

                  <select value=\{postType\} onChange=\{e => \{ setPostType\(e\.target\.value\); setHashtagsAdded\(false\); \}\} style=\{\{ \.\.\.inp\(\), cursor: 'pointer' \}\}>

                    \{POST\_TYPES\.map\(t => <option key=\{t\} value=\{t\}>\{t\}</option>\)\}

                  </select>

                </div>

              </div>

              <div style=\{\{ marginBottom: 14 \}\}>

                <label style=\{\{ fontSize: 10, color: '\#666', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 6 \}\}>Target Audience</label>

                <input value=\{audience\} onChange=\{e => setAudience\(e\.target\.value\)\} style=\{inp\(\)\} />

              </div>

              <button onClick=\{generate\} disabled=\{generating || \!topic\.trim\(\)\} style=\{\{

                width: '100%', background: generating ? 'rgba\(255,255,255,0\.05\)' : '\#e74c3c', border: 'none',

                color: generating ? '\#555' : '\#fff', borderRadius: 9, padding: '13px', fontWeight: 900, fontSize: 13, cursor: generating ? 'not\-allowed' : 'pointer'

              \}\}>

                \{generating ? '🤖 Writing your post\.\.\.' : '⚡ Generate with AI'\}

              </button>

            </div>

            \{/\* Best Times \*/\}

            <div style=\{\{ background: 'rgba\(255,255,255,0\.04\)', border: '1px solid rgba\(241,196,15,0\.2\)', borderRadius: 14, padding: 16 \}\}>

              <div style=\{\{ fontSize: 11, fontWeight: 700, color: '\#f1c40f', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 \}\}>⏰ Best Posting Times</div>

              \{BEST\_TIMES\.map\(b => \(

                <div key=\{b\.platform\} style=\{\{ display: 'flex', justifyContent: 'space\-between', padding: '6px 0', borderBottom: '1px solid rgba\(255,255,255,0\.05\)', fontSize: 11 \}\}>

                  <span style=\{\{ color: PLATFORM\_COLORS\[b\.platform\] \}\}>\{b\.icon\} \{b\.platform\.charAt\(0\)\.toUpperCase\(\) \+ b\.platform\.slice\(1\)\}</span>

                  <span style=\{\{ color: '\#888' \}\}>\{b\.times\}</span>

                </div>

              \)\)\}

            </div>

            \{/\* Post Settings \*/\}

            <div style=\{\{ background: 'rgba\(255,255,255,0\.04\)', border: '1px solid rgba\(52,152,219,0\.2\)', borderRadius: 14, padding: 20 \}\}>

              <div style=\{\{ fontSize: 11, fontWeight: 700, color: '\#3498db', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 \}\}>⚙️ Post Settings</div>

              <div style=\{\{ marginBottom: 12 \}\}>

                <label style=\{\{ fontSize: 10, color: '\#666', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 6 \}\}>Internal Title</label>

                <input value=\{title\} onChange=\{e => setTitle\(e\.target\.value\)\} placeholder="Internal label for this post" style=\{inp\(\)\} />

              </div>

              <div style=\{\{ marginBottom: 12 \}\}>

                <label style=\{\{ fontSize: 10, color: '\#666', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 8 \}\}>Post To Platforms</label>

                <div style=\{\{ display: 'flex', gap: 7, flexWrap: 'wrap' \}\}>

                  \{PLATFORMS\.map\(p => \(

                    <button key=\{p\} onClick=\{\(\) => togglePlatform\(p\)\} style=\{\{

                      padding: '6px 12px', borderRadius: 20,

                      border: \`1\.5px solid $\{selectedPlatforms\.includes\(p\) ? PLATFORM\_COLORS\[p\] : 'rgba\(255,255,255,0\.1\)'\}\`,

                      background: selectedPlatforms\.includes\(p\) ? PLATFORM\_COLORS\[p\] \+ '20' : 'transparent',

                      color: selectedPlatforms\.includes\(p\) ? PLATFORM\_COLORS\[p\] : '\#555', fontSize: 11, fontWeight: 700, cursor: 'pointer'

                    \}\}>

                      \{PLATFORM\_ICONS\[p\]\} \{p\.charAt\(0\)\.toUpperCase\(\) \+ p\.slice\(1\)\}

                    </button>

                  \)\)\}

                </div>

              </div>

              <div style=\{\{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 \}\}>

                <div>

                  <label style=\{\{ fontSize: 10, color: '\#666', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 6 \}\}>Schedule Date</label>

                  <input type="date" value=\{scheduledDate\} onChange=\{e => setScheduledDate\(e\.target\.value\)\} style=\{inp\(\)\} />

                </div>

                <div>

                  <label style=\{\{ fontSize: 10, color: '\#666', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 6 \}\}>Time \(CST\)</label>

                  <input type="time" value=\{scheduledTime\} onChange=\{e => setScheduledTime\(e\.target\.value\)\} style=\{inp\(\)\} />

                </div>

              </div>

              <div style=\{\{ marginBottom: 12 \}\}>

                <label style=\{\{ fontSize: 10, color: '\#666', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 6 \}\}>Campaign \(optional\)</label>

                <select value=\{campaignId\} onChange=\{e => setCampaignId\(e\.target\.value\)\} style=\{\{ \.\.\.inp\(\), cursor: 'pointer' \}\}>

                  <option value="">No Campaign</option>

                  \{campaigns\.map\(c => <option key=\{c\.id\} value=\{c\.id\}>\{c\.name\}</option>\)\}

                </select>

              </div>

              <div>

                <label style=\{\{ fontSize: 10, color: '\#666', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 6 \}\}>Image URL</label>

                <input value=\{imageUrl\} onChange=\{e => setImageUrl\(e\.target\.value\)\} placeholder="https://\.\.\. \(use Image Editor tab to generate\)"

                  style=\{inp\(\)\} />

                \{imageUrl && <img src=\{imageUrl\} alt="" style=\{\{ width: '100%', borderRadius: 8, marginTop: 8, maxHeight: 120, objectFit: 'cover' \}\} onError=\{e => e\.target\.style\.display = 'none'\} />\}

              </div>

            </div>

          </div>

          \{/\* RIGHT — Content \+ Actions \*/\}

          <div style=\{\{ display: 'flex', flexDirection: 'column', gap: 14 \}\}>

            \{/\* Content Editor \*/\}

            <div style=\{\{ background: 'rgba\(255,255,255,0\.04\)', border: '1px solid rgba\(39,174,96,0\.2\)', borderRadius: 14, padding: 20, flex: 1 \}\}>

              <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'center', marginBottom: 14 \}\}>

                <div style=\{\{ fontSize: 11, fontWeight: 700, color: '\#27ae60', textTransform: 'uppercase', letterSpacing: 1 \}\}>📝 Content Editor</div>

                <div style=\{\{ display: 'flex', gap: 8, alignItems: 'center' \}\}>

                  \{generatedContent && \!hashtagsAdded && \(

                    <button onClick=\{addHashtags\} style=\{\{ background: 'rgba\(243,156,18,0\.15\)', border: '1px solid rgba\(243,156,18,0\.3\)', color: '\#f39c12', borderRadius: 8, padding: '5px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer' \}\}>

                      \# Add Hashtags

                    </button>

                  \)\}

                  \{generatedContent && \(

                    <span style=\{\{ fontSize: 10, color: charCount > \(PLATFORM\_LIMITS\[platform\] || 9999\) ? '\#e74c3c' : '\#27ae60', fontWeight: 700 \}\}>

                      \{charCount\.toLocaleString\(\)\} chars

                    </span>

                  \)\}

                </div>

              </div>

              \{\!generatedContent && \!generating ? \(

                <div style=\{\{ textAlign: 'center', padding: '80px 20px', color: '\#333' \}\}>

                  <div style=\{\{ fontSize: 48, marginBottom: 14 \}\}>🤖</div>

                  <div style=\{\{ fontSize: 14, fontWeight: 700, color: '\#555', marginBottom: 6 \}\}>Ready to create</div>

                  <div style=\{\{ fontSize: 12, color: '\#333' \}\}>Enter a topic on the left and click Generate</div>

                </div>

              \) : generating ? \(

                <div style=\{\{ textAlign: 'center', padding: '80px 20px' \}\}>

                  <div style=\{\{ fontSize: 48, marginBottom: 14 \}\}>⚡</div>

                  <div style=\{\{ fontSize: 13, color: '\#e74c3c', fontWeight: 700 \}\}>AI is crafting your post\.\.\.</div>

                </div>

              \) : \(

                <>

                  <textarea value=\{generatedContent\} onChange=\{e => setGeneratedContent\(e\.target\.value\)\}

                    style=\{\{ width: '100%', background: 'rgba\(0,0,0,0\.4\)', border: '1\.5px solid rgba\(255,255,255,0\.1\)', color: '\#f1f5f9', borderRadius: 10, padding: '16px', fontSize: 13, lineHeight: 1\.8, boxSizing: 'border\-box', resize: 'vertical', minHeight: 320, fontFamily: 'inherit' \}\} />

                  \{/\* Platform fit indicators \*/\}

                  <div style=\{\{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' \}\}>

                    \{selectedPlatforms\.map\(p => \{

                      const fits = generatedContent\.length <= \(PLATFORM\_LIMITS\[p\] || 9999\);

                      return \(

                        <div key=\{p\} style=\{\{ fontSize: 10, padding: '3px 9px', borderRadius: 8, background: \(PLATFORM\_COLORS\[p\] || '\#555'\) \+ '15', color: PLATFORM\_COLORS\[p\] || '\#aaa', fontWeight: 700, border: \`1px solid $\{\(PLATFORM\_COLORS\[p\] || '\#555'\)\}30\` \}\}>

                          \{PLATFORM\_ICONS\[p\]\} \{p\} \{fits ? '✅' : '⚠️ Too long'\}

                        </div>

                      \);

                    \}\)\}

                  </div>

                </>

              \)\}

            </div>

            \{/\* Publish Result \*/\}

            \{publishResult && \(

              <div style=\{\{ background: publishResult\.ok ? 'rgba\(39,174,96,0\.1\)' : 'rgba\(231,76,60,0\.1\)', border: \`1px solid $\{publishResult\.ok ? '\#27ae6040' : '\#e74c3c40'\}\`, borderRadius: 12, padding: 16 \}\}>

                \{publishResult\.ok ? \(

                  <div>

                    <div style=\{\{ fontSize: 14, fontWeight: 900, color: '\#27ae60', marginBottom: 8 \}\}>🎉 Published Successfully\!</div>

                    \{publishResult\.results?\.facebook?\.ok && <div style=\{\{ fontSize: 12, color: '\#aaa', marginBottom: 4 \}\}>📘 Facebook: Posted to \{publishResult\.results\.facebook\.page\_name\}</div>\}

                    \{publishResult\.results?\.instagram?\.ok && <div style=\{\{ fontSize: 12, color: '\#aaa' \}\}>📸 Instagram: Posted</div>\}

                    \{\!publishResult\.results?\.facebook?\.ok && publishResult\.results?\.facebook && <div style=\{\{ fontSize: 11, color: '\#e74c3c' \}\}>📘 Facebook failed: \{publishResult\.results\.facebook\.error\}</div>\}

                    \{\!publishResult\.results?\.instagram?\.ok && publishResult\.results?\.instagram && <div style=\{\{ fontSize: 11, color: '\#e74c3c' \}\}>📸 Instagram failed: \{publishResult\.results\.instagram\.error\}</div>\}

                  </div>

                \) : \(

                  <div>

                    <div style=\{\{ fontSize: 13, fontWeight: 800, color: '\#e74c3c', marginBottom: 4 \}\}>❌ Publish Failed</div>

                    <div style=\{\{ fontSize: 11, color: '\#888' \}\}>\{publishResult\.error\}</div>

                    \{publishResult\.not\_connected && <div style=\{\{ marginTop: 8, fontSize: 11, color: '\#f39c12' \}\}>👉 Go to <strong>Connect Accounts</strong> tab to link your Meta account first\.</div>\}

                  </div>

                \)\}

              </div>

            \)\}

            \{/\* Action Buttons \*/\}

            \{generatedContent && \(

              <div style=\{\{ display: 'flex', flexDirection: 'column', gap: 10 \}\}>

                <button onClick=\{publishNow\} disabled=\{publishing || saving\} style=\{\{

                  background: publishing ? 'rgba\(255,255,255,0\.05\)' : 'linear\-gradient\(135deg, \#1877F2 0%, \#E1306C 100%\)',

                  border: 'none', color: publishing ? '\#555' : '\#fff', borderRadius: 11, padding: '16px',

                  fontWeight: 900, fontSize: 15, cursor: publishing ? 'not\-allowed' : 'pointer',

                  boxShadow: publishing ? 'none' : '0 4px 20px rgba\(24,119,242,0\.3\)'

                \}\}>

                  \{publishing ? '⏳ Publishing to Social\.\.\.' : '🚀 Publish Now to Facebook & Instagram'\}

                </button>

                <div style=\{\{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 \}\}>

                  <button onClick=\{\(\) => savePost\('Draft'\)\} disabled=\{saving\} style=\{\{ background: 'rgba\(155,89,182,0\.15\)', border: '1px solid rgba\(155,89,182,0\.3\)', color: '\#9b59b6', borderRadius: 9, padding: '12px', fontWeight: 700, fontSize: 12, cursor: 'pointer' \}\}>

                    💾 Save as Draft

                  </button>

                  <button onClick=\{\(\) => savePost\('Scheduled'\)\} disabled=\{saving || \!scheduledDate\} style=\{\{

                    background: scheduledDate ? 'rgba\(52,152,219,0\.15\)' : 'rgba\(255,255,255,0\.04\)',

                    border: \`1px solid $\{scheduledDate ? 'rgba\(52,152,219,0\.4\)' : 'rgba\(255,255,255,0\.08\)'\}\`,

                    color: scheduledDate ? '\#3498db' : '\#333', borderRadius: 9, padding: '12px', fontWeight: 700, fontSize: 12, cursor: scheduledDate ? 'pointer' : 'not\-allowed'

                  \}\}>

                    📅 \{scheduledDate ? \`Schedule $\{scheduledDate\}\` : 'Set date to schedule'\}

                  </button>

                </div>

                <button onClick=\{\(\) => setTab\('preview'\)\} style=\{\{ background: 'rgba\(255,255,255,0\.04\)', border: '1px solid rgba\(255,255,255,0\.1\)', color: '\#aaa', borderRadius: 9, padding: '10px', fontWeight: 700, fontSize: 12, cursor: 'pointer' \}\}>

                  📱 Preview on Platforms

                </button>

              </div>

            \)\}

            \{saved && \(

              <div style=\{\{ background: '\#27ae6015', border: '1px solid \#27ae6040', borderRadius: 9, padding: '12px 16px', fontSize: 12, color: '\#27ae60', fontWeight: 700, textAlign: 'center' \}\}>

                ✅ Post saved to your library\!

              </div>

            \)\}

          </div>

        </div>

      \)\}

      \{tab === 'preview' && \(

        <div>

          \{\!generatedContent ? \(

            <div style=\{\{ textAlign: 'center', padding: '80px 20px', color: '\#444' \}\}>

              <div style=\{\{ fontSize: 48, marginBottom: 14 \}\}>📱</div>

              <div style=\{\{ fontWeight: 700, color: '\#666', marginBottom: 8 \}\}>No content yet</div>

              <button onClick=\{\(\) => setTab\('write'\)\} style=\{\{ background: '\#e74c3c', border: 'none', color: '\#fff', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' \}\}>← Write Content First</button>

            </div>

          \) : \(

            <PlatformPreview content=\{generatedContent\} imageUrl=\{imageUrl\} selectedPlatforms=\{selectedPlatforms\} />

          \)\}

        </div>

      \)\}

    </div>

  \);

\}
