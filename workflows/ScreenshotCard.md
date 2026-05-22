# ScreenshotCard

Source: ScreenshotCard.docx

/\*\*

 \* Visual placeholder card with a numbered annotation arrow\.

 \* Used to guide the eye on where to click in the Apify dashboard\.

 \*/

export default function ScreenshotCard\(\{ caption, annotation, mockType = 'console' \}\) \{

  return \(

    <div style=\{\{

      background: '\#1e293b',

      borderRadius: 12,

      padding: 14,

      margin: '14px 0',

      boxShadow: '0 8px 24px rgba\(0,0,0,0\.15\)',

    \}\}>

      \{/\* Browser chrome \*/\}

      <div style=\{\{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 \}\}>

        <div style=\{\{ width: 10, height: 10, borderRadius: '50%', background: '\#ef4444' \}\} />

        <div style=\{\{ width: 10, height: 10, borderRadius: '50%', background: '\#f59e0b' \}\} />

        <div style=\{\{ width: 10, height: 10, borderRadius: '50%', background: '\#22c55e' \}\} />

        <div style=\{\{

          flex: 1, marginLeft: 10,

          background: '\#334155', color: '\#94a3b8',

          padding: '4px 10px', borderRadius: 6,

          fontSize: 11, fontFamily: 'monospace',

        \}\}>

          🔒 console\.apify\.com\{mockType === 'token' ? '/settings/integrations' : mockType === 'signup' ? '/sign\-up' : ''\}

        </div>

      </div>

      \{/\* Mock UI \*/\}

      <div style=\{\{

        background: '\#fff',

        borderRadius: 8,

        padding: 18,

        minHeight: 140,

        position: 'relative',

        overflow: 'hidden',

      \}\}>

        \{mockType === 'signup' && \(

          <>

            <div style=\{\{ fontWeight: 900, color: '\#0d0d1a', fontSize: 16, marginBottom: 14 \}\}>Apify · Sign up free</div>

            <div style=\{\{ background: '\#f1f5f9', height: 32, borderRadius: 6, marginBottom: 8, padding: '8px 12px', fontSize: 11, color: '\#94a3b8' \}\}>your@email\.com</div>

            <div style=\{\{ background: '\#f1f5f9', height: 32, borderRadius: 6, marginBottom: 8, padding: '8px 12px', fontSize: 11, color: '\#94a3b8' \}\}>••••••••</div>

            <div style=\{\{

              background: '\#97e88a', height: 36, borderRadius: 6,

              display: 'flex', alignItems: 'center', justifyContent: 'center',

              color: '\#1a3a1a', fontWeight: 800, fontSize: 12,

              position: 'relative',

            \}\}>

              Create my Apify account

              \{annotation && \(

                <div style=\{\{

                  position: 'absolute', right: \-100, top: '50%', transform: 'translateY\(\-50%\)',

                  background: '\#D4A843', color: '\#fff',

                  padding: '4px 10px', borderRadius: 16,

                  fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap',

                  boxShadow: '0 4px 12px rgba\(212,168,67,0\.4\)',

                \}\}>

                  ← \{annotation\}

                </div>

              \)\}

            </div>

          </>

        \)\}

        \{mockType === 'menu' && \(

          <>

            <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'center', marginBottom: 16 \}\}>

              <div style=\{\{ fontWeight: 900, color: '\#0d0d1a', fontSize: 14 \}\}>Apify Console</div>

              <div style=\{\{

                width: 32, height: 32, borderRadius: '50%',

                background: '\#0B1F45', color: '\#fff',

                display: 'flex', alignItems: 'center', justifyContent: 'center',

                fontSize: 12, fontWeight: 800,

                position: 'relative',

                boxShadow: annotation ? '0 0 0 4px \#D4A843' : 'none',

              \}\}>

                JL

                \{annotation && \(

                  <div style=\{\{

                    position: 'absolute', right: \-130, top: '50%', transform: 'translateY\(\-50%\)',

                    background: '\#D4A843', color: '\#fff',

                    padding: '4px 10px', borderRadius: 16,

                    fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap',

                  \}\}>

                    ← \{annotation\}

                  </div>

                \)\}

              </div>

            </div>

            <div style=\{\{ background: '\#f8fafc', height: 8, width: '60%', borderRadius: 4, marginBottom: 6 \}\} />

            <div style=\{\{ background: '\#f8fafc', height: 8, width: '80%', borderRadius: 4, marginBottom: 6 \}\} />

            <div style=\{\{ background: '\#f8fafc', height: 8, width: '45%', borderRadius: 4 \}\} />

          </>

        \)\}

        \{mockType === 'token' && \(

          <>

            <div style=\{\{ fontWeight: 900, color: '\#0d0d1a', fontSize: 14, marginBottom: 12 \}\}>Settings → Integrations</div>

            <div style=\{\{ fontSize: 11, color: '\#64748b', marginBottom: 6 \}\}>Personal API tokens</div>

            <div style=\{\{

              background: '\#f8fafc', borderRadius: 6, padding: '10px 12px',

              display: 'flex', alignItems: 'center', justifyContent: 'space\-between',

              border: '1px solid \#e2e8f0',

            \}\}>

              <code style=\{\{ fontSize: 11, color: '\#475569', fontFamily: 'monospace' \}\}>

                apify\_api\_••••••••••••••••••••

              </code>

              <button style=\{\{

                background: '\#0B1F45', color: '\#fff', border: 'none',

                padding: '6px 14px', borderRadius: 5, fontSize: 11, fontWeight: 800,

                cursor: 'pointer',

                position: 'relative',

                boxShadow: annotation ? '0 0 0 3px \#D4A843' : 'none',

              \}\}>

                Copy

                \{annotation && \(

                  <div style=\{\{

                    position: 'absolute', right: \-110, top: '50%', transform: 'translateY\(\-50%\)',

                    background: '\#D4A843', color: '\#fff',

                    padding: '4px 10px', borderRadius: 16,

                    fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap',

                  \}\}>

                    ← \{annotation\}

                  </div>

                \)\}

              </button>

            </div>

          </>

        \)\}

      </div>

      \{caption && \(

        <div style=\{\{

          color: '\#94a3b8', fontSize: 11,

          marginTop: 8, textAlign: 'center',

          fontStyle: 'italic',

        \}\}>

          \{caption\}

        </div>

      \)\}

    </div>

  \);

\}
