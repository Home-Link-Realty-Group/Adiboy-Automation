# PlaidConnect

Source: PlaidConnect.docx

// Plaid Connect card — opens Plaid Link, exchanges public\_token, lists connected banks\.

import \{ useState, useEffect, useCallback \} from 'react';

import \{ base44 \} from '@/api/base44Client';

import \{ Building2, RefreshCw, Trash2, CheckCircle, AlertCircle, Plus, Loader \} from 'lucide\-react';

const PLAID\_LINK\_SRC = 'https://cdn\.plaid\.com/link/v2/stable/link\-initialize\.js';

function loadPlaidScript\(\) \{

  return new Promise\(\(resolve, reject\) => \{

    if \(window\.Plaid\) return resolve\(\);

    const existing = document\.querySelector\(\`script\[src="$\{PLAID\_LINK\_SRC\}"\]\`\);

    if \(existing\) \{

      existing\.addEventListener\('load', \(\) => resolve\(\)\);

      existing\.addEventListener\('error', reject\);

      return;

    \}

    const s = document\.createElement\('script'\);

    s\.src = PLAID\_LINK\_SRC;

    s\.async = true;

    s\.onload = \(\) => resolve\(\);

    s\.onerror = reject;

    document\.head\.appendChild\(s\);

  \}\);

\}

export default function PlaidConnectCard\(\{ userEmail, onChange \}\) \{

  const \[items, setItems\] = useState\(\[\]\);

  const \[accounts, setAccounts\] = useState\(\[\]\);

  const \[loading, setLoading\] = useState\(true\);

  const \[connecting, setConnecting\] = useState\(false\);

  const \[syncing, setSyncing\] = useState\(null\); // plaid\_item\_id being synced

  const \[error, setError\] = useState\(''\);

  const \[lastSyncResult, setLastSyncResult\] = useState\(null\);

  const load = useCallback\(async \(\) => \{

    if \(\!userEmail\) \{ setLoading\(false\); return; \}

    setLoading\(true\);

    try \{

      const \[its, accs\] = await Promise\.all\(\[

        base44\.entities\.PlaidItem\.filter\(\{ user\_email: userEmail \}\),

        base44\.entities\.BankAccount\.filter\(\{ user\_email: userEmail \}\),

      \]\);

      setItems\(its\);

      setAccounts\(accs\);

    \} catch \(e\) \{ console\.error\(e\); \}

    setLoading\(false\);

  \}, \[userEmail\]\);

  useEffect\(\(\) => \{ load\(\); \}, \[load\]\);

  async function handleConnect\(\) \{

    setError\(''\);

    setConnecting\(true\);

    try \{

      await loadPlaidScript\(\);

      const res = await base44\.functions\.invoke\('plaidCreateLinkToken', \{ user\_email: userEmail \}\);

      const data = res\.data || res;

      if \(\!data\.link\_token\) throw new Error\(data\.error || 'Failed to create link token'\);

      const handler = window\.Plaid\.create\(\{

        token: data\.link\_token,

        onSuccess: async \(public\_token, metadata\) => \{

          try \{

            const exchange = await base44\.functions\.invoke\('plaidExchangePublicToken', \{

              user\_email: userEmail,

              public\_token,

              institution: metadata\.institution,

              accounts: metadata\.accounts,

            \}\);

            const eData = exchange\.data || exchange;

            if \(eData\.error\) throw new Error\(eData\.error\);

            // Auto\-sync transactions immediately after linking

            await base44\.functions\.invoke\('plaidSyncTransactions', \{

              user\_email: userEmail,

              plaid\_item\_id: eData\.plaid\_item\_id,

            \}\);

            await load\(\);

            if \(onChange\) onChange\(\);

          \} catch \(e\) \{

            setError\('Connection saved but sync failed: ' \+ e\.message\);

            await load\(\);

          \} finally \{

            setConnecting\(false\);

          \}

        \},

        onExit: \(err\) => \{

          setConnecting\(false\);

          if \(err\) setError\(err\.error\_message || err\.display\_message || ''\);

        \},

      \}\);

      handler\.open\(\);

    \} catch \(e\) \{

      setError\(e\.message\);

      setConnecting\(false\);

    \}

  \}

  async function handleSync\(item\) \{

    setSyncing\(item\.plaid\_item\_id\);

    setLastSyncResult\(null\);

    try \{

      const res = await base44\.functions\.invoke\('plaidSyncTransactions', \{

        user\_email: userEmail,

        plaid\_item\_id: item\.plaid\_item\_id,

      \}\);

      const data = res\.data || res;

      setLastSyncResult\(\{ institution: item\.institution\_name, \.\.\.data \}\);

      await load\(\);

      if \(onChange\) onChange\(\);

    \} catch \(e\) \{

      setError\('Sync failed: ' \+ e\.message\);

    \}

    setSyncing\(null\);

  \}

  async function handleUnlink\(item\) \{

    if \(\!window\.confirm\(\`Disconnect $\{item\.institution\_name\}? This deletes synced transactions for this bank\.\`\)\) return;

    try \{

      await base44\.functions\.invoke\('plaidUnlinkAccount', \{

        user\_email: userEmail,

        plaid\_item\_id: item\.plaid\_item\_id,

      \}\);

      await load\(\);

      if \(onChange\) onChange\(\);

    \} catch \(e\) \{

      setError\('Unlink failed: ' \+ e\.message\);

    \}

  \}

  const totalBalance = accounts

    \.filter\(a => a\.is\_active && a\.type === 'depository'\)

    \.reduce\(\(s, a\) => s \+ \(a\.current\_balance || 0\), 0\);

  const totalCredit = accounts

    \.filter\(a => a\.is\_active && a\.type === 'credit'\)

    \.reduce\(\(s, a\) => s \+ \(a\.current\_balance || 0\), 0\);

  return \(

    <div style=\{\{ background: '\#fff', border: '1px solid \#e2e8f0', borderRadius: 14, padding: 24 \}\}>

      <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 10 \}\}>

        <div>

          <div style=\{\{ display: 'flex', alignItems: 'center', gap: 10 \}\}>

            <Building2 size=\{20\} color="\#0B1F45" />

            <div style=\{\{ fontWeight: 800, fontSize: 16, color: '\#0B1F45' \}\}>Connected Banks &amp; Cards</div>

            <span style=\{\{ background: '\#fef3c7', color: '\#92400e', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 10, letterSpacing: 0\.5 \}\}>

              SANDBOX

            </span>

          </div>

          <div style=\{\{ fontSize: 12, color: '\#64748b', marginTop: 4 \}\}>

            Powered by Plaid · 12,000\+ banks supported · Bank\-level encryption

          </div>

        </div>

        <button onClick=\{handleConnect\} disabled=\{connecting\}

          style=\{\{

            background: '\#D4A843', color: '\#fff', border: 'none', borderRadius: 8,

            padding: '10px 18px', fontWeight: 800, fontSize: 13, cursor: connecting ? 'wait' : 'pointer',

            display: 'flex', alignItems: 'center', gap: 8,

          \}\}>

          \{connecting ? <><Loader size=\{14\} className="plaid\-spin" /> Opening Plaid…</> : <><Plus size=\{14\} /> Connect Bank</>\}

        </button>

      </div>

      \{error && \(

        <div style=\{\{ background: '\#fef2f2', border: '1px solid \#fecaca', color: '\#991b1b', padding: '10px 14px', borderRadius: 8, fontSize: 12, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 \}\}>

          <AlertCircle size=\{14\} /> \{error\}

        </div>

      \)\}

      \{lastSyncResult && \(

        <div style=\{\{ background: '\#f0fdf4', border: '1px solid \#bbf7d0', color: '\#166534', padding: '10px 14px', borderRadius: 8, fontSize: 12, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 \}\}>

          <CheckCircle size=\{14\} />

          Synced \{lastSyncResult\.institution\}: <strong>\{lastSyncResult\.added || 0\}</strong> new, \{lastSyncResult\.modified || 0\} updated\.

        </div>

      \)\}

      \{/\* Balance summary \*/\}

      \{accounts\.length > 0 && \(

        <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto\-fit, minmax\(160px, 1fr\)\)', gap: 12, marginBottom: 18 \}\}>

          <div style=\{\{ background: '\#f0fdf4', borderRadius: 10, padding: 14 \}\}>

            <div style=\{\{ fontSize: 10, fontWeight: 800, color: '\#15803d', letterSpacing: 1 \}\}>CASH ON HAND</div>

            <div style=\{\{ fontSize: 22, fontWeight: 900, color: '\#16a34a', marginTop: 4 \}\}>

              $\{totalBalance\.toLocaleString\(undefined, \{ minimumFractionDigits: 2, maximumFractionDigits: 2 \}\)\}

            </div>

          </div>

          <div style=\{\{ background: '\#fef2f2', borderRadius: 10, padding: 14 \}\}>

            <div style=\{\{ fontSize: 10, fontWeight: 800, color: '\#991b1b', letterSpacing: 1 \}\}>CREDIT BALANCES</div>

            <div style=\{\{ fontSize: 22, fontWeight: 900, color: '\#dc2626', marginTop: 4 \}\}>

              $\{totalCredit\.toLocaleString\(undefined, \{ minimumFractionDigits: 2, maximumFractionDigits: 2 \}\)\}

            </div>

          </div>

          <div style=\{\{ background: '\#eff6ff', borderRadius: 10, padding: 14 \}\}>

            <div style=\{\{ fontSize: 10, fontWeight: 800, color: '\#1e40af', letterSpacing: 1 \}\}>NET LIQUID</div>

            <div style=\{\{ fontSize: 22, fontWeight: 900, color: '\#2563eb', marginTop: 4 \}\}>

              $\{\(totalBalance \- totalCredit\)\.toLocaleString\(undefined, \{ minimumFractionDigits: 2, maximumFractionDigits: 2 \}\)\}

            </div>

          </div>

        </div>

      \)\}

      \{/\* Connected items \*/\}

      \{loading ? \(

        <div style=\{\{ padding: 24, textAlign: 'center', color: '\#64748b' \}\}>Loading connections…</div>

      \) : items\.length === 0 ? \(

        <div style=\{\{ background: '\#f8fafc', border: '2px dashed \#cbd5e1', borderRadius: 10, padding: 32, textAlign: 'center' \}\}>

          <Building2 size=\{32\} color="\#94a3b8" style=\{\{ margin: '0 auto 10px' \}\} />

          <div style=\{\{ fontWeight: 700, color: '\#334155', marginBottom: 4 \}\}>No banks connected yet</div>

          <div style=\{\{ fontSize: 12, color: '\#64748b', marginBottom: 14 \}\}>

            Click <strong>Connect Bank</strong> to securely link your accounts\. In sandbox mode, search for "First Platypus Bank" and use credentials <code>user\_good</code> / <code>pass\_good</code>\.

          </div>

        </div>

      \) : \(

        <div style=\{\{ display: 'flex', flexDirection: 'column', gap: 10 \}\}>

          \{items\.map\(item => \{

            const itemAccounts = accounts\.filter\(a => a\.plaid\_item\_id === item\.plaid\_item\_id\);

            const isSyncing = syncing === item\.plaid\_item\_id;

            return \(

              <div key=\{item\.id\} style=\{\{ border: '1px solid \#e2e8f0', borderRadius: 10, padding: 14 \}\}>

                <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 \}\}>

                  <div>

                    <div style=\{\{ display: 'flex', alignItems: 'center', gap: 8 \}\}>

                      <Building2 size=\{16\} color="\#0B1F45" />

                      <span style=\{\{ fontWeight: 800, color: '\#0B1F45' \}\}>\{item\.institution\_name\}</span>

                      <span style=\{\{

                        background: item\.status === 'active' ? '\#dcfce7' : '\#fee2e2',

                        color: item\.status === 'active' ? '\#166534' : '\#991b1b',

                        fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10, textTransform: 'uppercase',

                      \}\}>

                        \{item\.status\}

                      </span>

                    </div>

                    <div style=\{\{ fontSize: 11, color: '\#64748b', marginTop: 3 \}\}>

                      \{itemAccounts\.length\} account\{itemAccounts\.length \!== 1 ? 's' : ''\} · Last synced \{item\.last\_sync\_at ? new Date\(item\.last\_sync\_at\)\.toLocaleString\(\) : 'never'\}

                    </div>

                  </div>

                  <div style=\{\{ display: 'flex', gap: 6 \}\}>

                    <button onClick=\{\(\) => handleSync\(item\)\} disabled=\{isSyncing\}

                      style=\{\{ background: '\#f1f5f9', border: 'none', borderRadius: 6, padding: '7px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 \}\}>

                      <RefreshCw size=\{12\} className=\{isSyncing ? 'plaid\-spin' : ''\} />

                      \{isSyncing ? 'Syncing…' : 'Sync'\}

                    </button>

                    <button onClick=\{\(\) => handleUnlink\(item\)\}

                      style=\{\{ background: '\#fee2e2', color: '\#991b1b', border: 'none', borderRadius: 6, padding: '7px 10px', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 \}\}>

                      <Trash2 size=\{12\} />

                    </button>

                  </div>

                </div>

                \{itemAccounts\.length > 0 && \(

                  <div style=\{\{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 \}\}>

                    \{itemAccounts\.map\(a => \(

                      <div key=\{a\.id\} style=\{\{ display: 'flex', justifyContent: 'space\-between', padding: '6px 10px', background: '\#f8fafc', borderRadius: 6, fontSize: 12 \}\}>

                        <span style=\{\{ color: '\#475569' \}\}>\{a\.name\} \{a\.mask ? \`••$\{a\.mask\}\` : ''\} <span style=\{\{ color: '\#94a3b8', marginLeft: 6, fontSize: 10, textTransform: 'uppercase' \}\}>\{a\.subtype || a\.type\}</span></span>

                        <span style=\{\{ fontWeight: 800, color: a\.type === 'credit' ? '\#dc2626' : '\#16a34a' \}\}>

                          $\{\(a\.current\_balance || 0\)\.toLocaleString\(undefined, \{ minimumFractionDigits: 2, maximumFractionDigits: 2 \}\)\}

                        </span>

                      </div>

                    \)\)\}

                  </div>

                \)\}

              </div>

            \);

          \}\)\}

        </div>

      \)\}

      <style>\{\`

        @keyframes plaid\-spin \{ from \{ transform: rotate\(0deg\); \} to \{ transform: rotate\(360deg\); \} \}

        \.plaid\-spin \{ animation: plaid\-spin 1s linear infinite; \}

      \`\}</style>

    </div>

  \);

\}
