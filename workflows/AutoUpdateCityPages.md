# AutoUpdateCityPages

Source: AutoUpdateCityPages.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

// City to page route mapping

const CITY\_PAGE\_MAPPING = \{

  'Atlanta': '/SellHouseAtlanta',

  'Chicago': '/SellHouseChicago',

  'Dallas': '/Dallas',

  'Denver': '/SellHouseDenver',

  'Detroit': '/SellHouseDetroit',

  'Houston': '/SellHouseHouston',

  'Indianapolis': '/SellHouseIndianapolis',

  'Jacksonville': '/SellHouseJacksonville',

  'Kansas City': '/SellHouseKansasCity',

  'Louisville': '/SellHouseLouisville',

  'Memphis': '/SellHouseMemphis',

  'Miami': '/SellHouseMiami',

  'Milwaukee': '/SellHouseMilwaukee',

  'Nashville': '/SellHouseNashville',

  'Philadelphia': '/SellHousePhiladelphia',

  'Pittsburgh': '/SellHousePittsburgh',

  'Orlando': '/SellHouseOrlando',

  'Charlotte': '/SellHouseCharlotte',

  'St\. Louis': '/SellHouseStLouis',

  'San Antonio': '/SellHouseSanAntonio',

  'Fort Worth': '/SellHouseFortWorth',

\};

Deno\.serve\(async \(req\) => \{

  try \{

    const base44 = createClientFromRequest\(req\);

    const user = await base44\.auth\.me\(\);

    // Only allow service role to run this

    if \(\!user?\.role || user\.role \!== 'admin'\) \{

      return Response\.json\(\{ error: 'Admin access required' \}, \{ status: 403 \}\);

    \}

    const \{ city, state \} = await req\.json\(\);

    

    if \(\!city || \!state\) \{

      return Response\.json\(\{ error: 'city and state required' \}, \{ status: 400 \}\);

    \}

    console\.log\(\`Auto\-updating page for $\{city\}, $\{state\}\.\.\.\`\);

    // Get market data and SEO content

    const cityData = await base44\.entities\.CityMarketData\.filter\(\{ city, state \}\);

    

    if \(\!cityData || cityData\.length === 0\) \{

      return Response\.json\(\{ error: 'No market data found \- run fetchApifyMarketData first' \}, \{ status: 404 \}\);

    \}

    const data = cityData\[0\];

    const pageRoute = CITY\_PAGE\_MAPPING\[city\] || \`/SellHouse$\{city\.replace\(/\\s/g, ''\)\}\`;

    // Create or update page metadata

    const pages = await base44\.entities\.Page\.filter\(\{ route: pageRoute \}\);

    

    if \(pages && pages\.length > 0\) \{

      // Update existing page with SEO content

      await base44\.entities\.Page\.update\(pages\[0\]\.id, \{

        seo\_title: data\.seo\_content?\.meta\_title,

        seo\_description: data\.seo\_content?\.meta\_description,

        display\_name: \`Sell House $\{city\}, $\{state\}\`,

        notes: \`Auto\-updated: $\{new Date\(\)\.toISOString\(\)\}\. Market data: $\{JSON\.stringify\(data\.market\_insights\)\}\`,

      \}\);

    \} else \{

      // Create new page entry

      await base44\.entities\.Page\.create\(\{

        route: pageRoute,

        display\_name: \`Sell House $\{city\}, $\{state\}\`,

        seo\_title: data\.seo\_content?\.meta\_title,

        seo\_description: data\.seo\_content?\.meta\_description,

        category: 'public',

        is\_active: true,

        notes: \`Auto\-generated: $\{new Date\(\)\.toISOString\(\)\}\. Market data: $\{JSON\.stringify\(data\.market\_insights\)\}\`,

      \}\);

    \}

    // Store page component with dynamic content

    const componentData = \{

      page\_route: pageRoute,

      component\_type: 'section',

      component\_name: 'DynamicMarketHeader',

      title: data\.seo\_content?\.h1\_header,

      description: data\.seo\_content?\.market\_stats\_copy,

      background\_color: '\#f8f9fa',

      text\_color: '\#0B1F45',

      settings: \{

        hero\_tagline: data\.seo\_content?\.hero\_tagline,

        unique\_value\_prop: data\.seo\_content?\.unique\_value\_prop,

        neighborhood\_copy: data\.seo\_content?\.neighborhood\_copy,

        local\_keywords: data\.seo\_content?\.local\_keywords,

        market\_insights: data\.market\_insights,

      \},

    \};

    // Check for existing component

    const components = await base44\.entities\.PageComponent\.filter\(\{ 

      page\_route: pageRoute,

      component\_name: 'DynamicMarketHeader',

    \}\);

    if \(components && components\.length > 0\) \{

      await base44\.entities\.PageComponent\.update\(components\[0\]\.id, componentData\);

    \} else \{

      await base44\.entities\.PageComponent\.create\(componentData\);

    \}

    return Response\.json\(\{

      success: true,

      message: \`Page $\{pageRoute\} updated with SEO content\`,

      data: \{

        pageRoute,

        seoTitle: data\.seo\_content?\.meta\_title,

        seoDescription: data\.seo\_content?\.meta\_description,

        updatedAt: new Date\(\)\.toISOString\(\),

      \},

    \}\);

  \} catch \(error\) \{

    console\.error\('Auto\-update error:', error\);

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
