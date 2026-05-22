# New Microsoft Word Document (110)

Source: New Microsoft Word Document (110).docx

import \{ useState, useEffect \} from 'react';

import \{ BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer \} from 'recharts';

import \{ base44 \} from '@/api/base44Client';

const NAVY = "\#0B1F45";

const GOLD = "\#D4A843";

export default function CompetitorRankingAnalyzer\(\) \{

  const \[loading, setLoading\] = useState\(false\);

  const \[allCitiesData, setAllCitiesData\] = useState\(null\);

  const \[selectedCity, setSelectedCity\] = useState\(null\);

  const \[cities, setCities\] = useState\(\[\]\);

  const \[error, setError\] = useState\(null\);

  useEffect\(\(\) => \{

    fetchCities\(\);

  \}, \[\]\);

  async function fetchCities\(\) \{

    try \{

      const res = await base44\.functions\.invoke\("seoCompetitorAnalysis", \{

        action: "get\_cities",

      \}\);

      setCities\(res\.cities\);

    \} catch \(err\) \{

      setError\(err\.message\);

    \}

  \}

  async function analyzeAllCities\(\) \{

    setLoading\(true\);

    setError\(null\);

    try \{

      const res = await base44\.functions\.invoke\("seoCompetitorAnalysis", \{

        action: "analyze\_all\_cities",

      \}\);

      setAllCitiesData\(res\.data\);

    \} catch \(err\) \{

      setError\(err\.message\);

    \} finally \{

      setLoading\(false\);

    \}

  \}

  async function analyzeCity\(city\) \{

    setLoading\(true\);

    setError\(null\);

    try \{

      const res = await base44\.functions\.invoke\("seoCompetitorAnalysis", \{

        action: "analyze\_city",

        city: city\.split\(","\)\[0\]\.trim\(\),

      \}\);

      setSelectedCity\(res\.data\);

    \} catch \(err\) \{

      setError\(err\.message\);

    \} finally \{

      setLoading\(false\);

    \}

  \}

  // Prepare data for ranking chart

  const getRankingChartData = \(\) => \{

    if \(\!selectedCity || \!selectedCity\.keywords\) return \[\];

    return selectedCity\.keywords\.map\(kw => \(\{

      keyword: kw\.baseKeyword,

      yourRank: kw\.yourRank,

      avgCompetitor: Math\.round\(

        kw\.competitors\.reduce\(\(sum, c\) => sum \+ c\.rank, 0\) / kw\.competitors\.length

      \),

    \}\)\);

  \};

  // Get competitor overview

  const getCompetitorOverview = \(\) => \{

    if \(\!selectedCity || \!selectedCity\.keywords\) return \[\];

    const competitorMap = new Map\(\);

    selectedCity\.keywords\.forEach\(kw => \{

      if \(kw\.competitors\) \{

        kw\.competitors\.forEach\(comp => \{

          if \(\!competitorMap\.has\(comp\.url\)\) \{

            competitorMap\.set\(comp\.url, \{

              url: comp\.url,

              name: comp\.name,

              avgRank: \[\],

            \}\);

          \}

          competitorMap\.get\(comp\.url\)\.avgRank\.push\(comp\.rank\);

        \}\);

      \}

    \}\);

    return Array\.from\(competitorMap\.values\(\)\)

      \.map\(c => \(\{

        \.\.\.c,

        avgRank: Math\.round\(c\.avgRank\.reduce\(\(a, b\) => a \+ b, 0\) / c\.avgRank\.length\),

      \}\)\)

      \.sort\(\(a, b\) => a\.avgRank \- b\.avgRank\)

      \.slice\(0, 5\);

  \};

  return \(

    <div style=\{\{ padding: 20, background: '\#f8f9fa', borderRadius: 12 \}\}>

      <h2 style=\{\{ fontSize: 22, fontWeight: 900, color: NAVY, marginBottom: 20 \}\}>

        🔍 SEO Competitor Ranking Analyzer

      </h2>

      \{/\* Summary Stats \*/\}

      \{allCitiesData && \(

        <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto\-fit, minmax\(200px, 1fr\)\)', gap: 14, marginBottom: 24 \}\}>

          <div style=\{\{ background: '\#fff', padding: 16, borderRadius: 10, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)' \}\}>

            <div style=\{\{ fontSize: 11, color: '\#888', fontWeight: 700, marginBottom: 4 \}\}>CITIES ANALYZED</div>

            <div style=\{\{ fontSize: 24, fontWeight: 900, color: NAVY \}\}>\{allCitiesData\.length\}</div>

          </div>

          <div style=\{\{ background: '\#fff', padding: 16, borderRadius: 10, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)' \}\}>

            <div style=\{\{ fontSize: 11, color: '\#888', fontWeight: 700, marginBottom: 4 \}\}>CONTENT GAPS FOUND</div>

            <div style=\{\{ fontSize: 24, fontWeight: 900, color: GOLD \}\}>\{allCitiesData\.reduce\(\(sum, d\) => sum \+ d\.contentGaps\.length, 0\)\}</div>

          </div>

          <div style=\{\{ background: '\#fff', padding: 16, borderRadius: 10, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)' \}\}>

            <div style=\{\{ fontSize: 11, color: '\#888', fontWeight: 700, marginBottom: 4 \}\}>AVG KEYWORDS TRACKED</div>

            <div style=\{\{ fontSize: 24, fontWeight: 900, color: NAVY \}\}>35</div>

          </div>

        </div>

      \)\}

      \{/\* Controls \*/\}

      <div style=\{\{ background: '\#fff', padding: 16, borderRadius: 10, marginBottom: 20, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)' \}\}>

        <button

          onClick=\{analyzeAllCities\}

          disabled=\{loading\}

          style=\{\{

            background: GOLD,

            color: '\#fff',

            border: 'none',

            padding: '10px 18px',

            borderRadius: 8,

            fontWeight: 700,

            cursor: loading ? 'not\-allowed' : 'pointer',

            marginRight: 10,

            marginBottom: 10,

          \}\}

        >

          \{loading ? '⟳ Analyzing\.\.\.' : '📊 Analyze All Cities'\}

        </button>

        <select

          onChange=\{\(e\) => analyzeCity\(e\.target\.value\)\}

          disabled=\{loading\}

          style=\{\{

            padding: '10px 12px',

            borderRadius: 8,

            border: '1px solid \#ddd',

            fontSize: 13,

            cursor: loading ? 'not\-allowed' : 'pointer',

          \}\}

          defaultValue=""

        >

          <option value="">Select a city to analyze\.\.\.</option>

          \{cities\.map\(city => \(

            <option key=\{city\} value=\{city\}>\{city\}</option>

          \)\)\}

        </select>

      </div>

      \{error && \(

        <div style=\{\{ background: '\#ffebee', border: '1px solid \#f5a5a5', borderRadius: 8, padding: 12, marginBottom: 20, color: '\#d32f2f', fontSize: 13 \}\}>

          ⚠️ \{error\}

        </div>

      \)\}

      \{/\* City Analysis \*/\}

      \{selectedCity && \(

        <div>

          <h3 style=\{\{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 16 \}\}>

            📍 \{selectedCity\.city\} Analysis

          </h3>

          \{/\* Ranking Comparison Chart \*/\}

          <div style=\{\{ background: '\#fff', padding: 16, borderRadius: 10, marginBottom: 20, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)' \}\}>

            <h4 style=\{\{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 12 \}\}>Your Rankings vs Competitors</h4>

            <ResponsiveContainer width="100%" height=\{300\}>

              <BarChart data=\{getRankingChartData\(\)\}>

                <CartesianGrid strokeDasharray="3 3" stroke="\#eee" />

                <XAxis dataKey="keyword" tick=\{\{ fontSize: 12 \}\} />

                <YAxis label=\{\{ value: 'Position', angle: \-90, position: 'insideLeft' \}\} reversed />

                <Tooltip />

                <Legend />

                <Bar dataKey="yourRank" fill=\{GOLD\} name="Your Rank" />

                <Bar dataKey="avgCompetitor" fill="\#ccc" name="Avg Competitor" />

              </BarChart>

            </ResponsiveContainer>

          </div>

          \{/\* Top Competitors \*/\}

          <div style=\{\{ background: '\#fff', padding: 16, borderRadius: 10, marginBottom: 20, boxShadow: '0 1px 4px rgba\(0,0,0,0\.08\)' \}\}>

            <h4 style=\{\{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 12 \}\}>🏆 Top 5 Competitors</h4>

            \{getCompetitorOverview\(\)\.map\(\(comp, i\) => \(

              <div key=\{i\} style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 4 ? '1px solid \#eee' : 'none' \}\}>

                <div>

                  <div style=\{\{ fontWeight: 700, color: NAVY, fontSize: 13 \}\}>\{comp\.name\}</div>

                  <div style=\{\{ fontSize: 11, color: '\#888' \}\}>\{comp\.url\}</div>

                </div>

                <div style=\{\{ fontSize: 16, fontWeight: 900, color: GOLD \}\}>Avg Rank \#\{comp\.avgRank\}</div>

              </div>

            \)\)\}

          </div>

          \{/\* Content Gap Report \*/\}

          <div style=\{\{ background: '\#fffbeb', border: '1px solid \#fcd34d', borderRadius: 10, padding: 16 \}\}>

            <h4 style=\{\{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 12 \}\}>🔑 Content Gaps \(\{selectedCity\.contentGaps?\.length || 0\}\)</h4>

            <div style=\{\{ maxHeight: 300, overflowY: 'auto' \}\}>

              \{selectedCity\.contentGaps && selectedCity\.contentGaps\.length > 0 ? \(

                <>

                  \{selectedCity\.contentGaps\.slice\(0, 10\)\.map\(\(gap, i\) => \(

                    <div key=\{i\} style=\{\{ padding: '8px 0', borderBottom: i < 9 ? '1px solid \#f0f0f0' : 'none', fontSize: 12 \}\}>

                      <span style=\{\{ fontWeight: 700, color: NAVY \}\}>\{gap\.keyword\}</span>

                      <div style=\{\{ fontSize: 10, color: '\#888', marginTop: 2 \}\}>Missing from your content | \{gap\.competitor\}</div>

                    </div>

                  \)\)\}

                  \{selectedCity\.contentGaps\.length > 10 && \(

                    <div style=\{\{ fontSize: 11, color: '\#888', marginTop: 8, textAlign: 'center' \}\}>

                      \+\{selectedCity\.contentGaps\.length \- 10\} more gaps\.\.\.

                    </div>

                  \)\}

                </>

              \) : \(

                <div style=\{\{ fontSize: 12, color: '\#888', textAlign: 'center', padding: '20px 0' \}\}>No content gaps found</div>

              \)\}

            </div>

          </div>

        </div>

      \)\}

    </div>

  \);

\}
