# AnalyzeContentPerformance

Source: AnalyzeContentPerformance.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

Deno\.serve\(async \(req\) => \{

  try \{

    const base44 = createClientFromRequest\(req\);

    const user = await base44\.auth\.me\(\);

    if \(\!user?\.role || user\.role \!== 'admin'\) \{

      return Response\.json\(\{ error: 'Admin access required' \}, \{ status: 403 \}\);

    \}

    const \{ city, state \} = await req\.json\(\);

    if \(\!city || \!state\) \{

      return Response\.json\(\{ error: 'city and state required' \}, \{ status: 400 \}\);

    \}

    console\.log\(\`Analyzing content performance for $\{city\}, $\{state\}\.\.\.\`\);

    // Get all visitor journeys for this city

    const journeys = await base44\.entities\.VisitorJourney\.filter\(\{ city, state \}\);

    if \(\!journeys || journeys\.length === 0\) \{

      return Response\.json\(\{ 

        message: 'No visitor data yet for this city',

        city,

        state,

      \}\);

    \}

    // Group by content variant

    const variantGroups = \{\};

    journeys\.forEach\(journey => \{

      const variantId = journey\.content\_variant\_id;

      if \(\!variantGroups\[variantId\]\) \{

        variantGroups\[variantId\] = \{

          variant\_id: variantId,

          journeys: \[\],

          total\_visitors: 0,

          conversions: 0,

          form\_starts: 0,

          form\_completions: 0,

          total\_time\_on\_site: 0,

          total\_scroll\_depth: 0,

          total\_conversion\_value: 0,

        \};

      \}

      variantGroups\[variantId\]\.journeys\.push\(journey\);

      variantGroups\[variantId\]\.total\_visitors \+= 1;

      if \(journey\.lead\_submitted\) variantGroups\[variantId\]\.conversions \+= 1;

      if \(journey\.form\_started\) variantGroups\[variantId\]\.form\_starts \+= 1;

      if \(journey\.form\_completed\) variantGroups\[variantId\]\.form\_completions \+= 1;

      variantGroups\[variantId\]\.total\_time\_on\_site \+= journey\.time\_on\_site\_seconds || 0;

      variantGroups\[variantId\]\.total\_scroll\_depth \+= journey\.scroll\_depth\_percent || 0;

      variantGroups\[variantId\]\.total\_conversion\_value \+= journey\.conversion\_value || 0;

    \}\);

    // Calculate metrics for each variant

    const performanceData = Object\.values\(variantGroups\)

      \.map\(group => \{

        const conversionRate = \(group\.conversions / group\.total\_visitors \* 100\)\.toFixed\(2\);

        const avgTimeOnSite = \(group\.total\_time\_on\_site / group\.total\_visitors\)\.toFixed\(0\);

        const avgScrollDepth = \(group\.total\_scroll\_depth / group\.total\_visitors\)\.toFixed\(1\);

        const formStartRate = \(group\.form\_starts / group\.total\_visitors \* 100\)\.toFixed\(2\);

        const formCompletionRate = group\.form\_starts > 0 

          ? \(group\.form\_completions / group\.form\_starts \* 100\)\.toFixed\(2\)

          : 0;

        const bounceRate = \(group\.journeys\.filter\(j => j\.exit\_timestamp && \!j\.form\_started\)\.length / group\.total\_visitors \* 100\)\.toFixed\(2\);

        return \{

          variant\_id: group\.variant\_id,

          total\_visitors: group\.total\_visitors,

          conversions: group\.conversions,

          conversion\_rate: parseFloat\(conversionRate\),

          avg\_time\_on\_site: parseFloat\(avgTimeOnSite\),

          avg\_scroll\_depth: parseFloat\(avgScrollDepth\),

          form\_start\_rate: parseFloat\(formStartRate\),

          form\_completion\_rate: parseFloat\(formCompletionRate\),

          bounce\_rate: parseFloat\(bounceRate\),

          total\_revenue: group\.total\_conversion\_value,

          avg\_conversion\_value: \(group\.total\_conversion\_value / Math\.max\(group\.conversions, 1\)\)\.toFixed\(0\),

        \};

      \}\)

      \.sort\(\(a, b\) => b\.conversion\_rate \- a\.conversion\_rate\);

    // Update ContentPerformance entities

    for \(let i = 0; i < performanceData\.length; i\+\+\) \{

      const perf = performanceData\[i\];

      const existing = await base44\.entities\.ContentPerformance\.filter\(\{

        city,

        state,

        content\_variant\_id: perf\.variant\_id,

      \}\);

      const updateData = \{

        city,

        state,

        content\_variant\_id: perf\.variant\_id,

        total\_visitors: perf\.total\_visitors,

        total\_conversions: perf\.conversions,

        conversion\_rate: perf\.conversion\_rate,

        avg\_time\_on\_site: perf\.avg\_time\_on\_site,

        avg\_scroll\_depth: perf\.avg\_scroll\_depth,

        form\_start\_rate: perf\.form\_start\_rate,

        form\_completion\_rate: perf\.form\_completion\_rate,

        bounce\_rate: perf\.bounce\_rate,

        avg\_conversion\_value: parseFloat\(perf\.avg\_conversion\_value\),

        total\_revenue: perf\.total\_revenue,

        performance\_rank: i \+ 1,

        last\_analyzed: new Date\(\)\.toISOString\(\),

      \};

      if \(existing && existing\.length > 0\) \{

        await base44\.entities\.ContentPerformance\.update\(existing\[0\]\.id, updateData\);

      \} else \{

        await base44\.entities\.ContentPerformance\.create\(updateData\);

      \}

    \}

    // Get top performing content

    const topVariant = performanceData\[0\];

    return Response\.json\(\{

      success: true,

      city,

      state,

      analysis\_date: new Date\(\)\.toISOString\(\),

      total\_journeys: journeys\.length,

      variants\_analyzed: performanceData\.length,

      top\_performer: \{

        variant\_id: topVariant\.variant\_id,

        conversion\_rate: topVariant\.conversion\_rate,

        conversions: topVariant\.conversions,

        visitors: topVariant\.total\_visitors,

        avg\_time\_on\_site: topVariant\.avg\_time\_on\_site,

        revenue: topVariant\.total\_revenue,

      \},

      all\_variants: performanceData,

    \}\);

  \} catch \(error\) \{

    console\.error\('Analysis error:', error\);

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
