# AutoUpdateCityPages

Source: AutoUpdateCityPages.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// City to page route mapping

const CITY_PAGE_MAPPING = {

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

  'St. Louis': '/SellHouseStLouis',

  'San Antonio': '/SellHouseSanAntonio',

  'Fort Worth': '/SellHouseFortWorth',

};

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();

    // Only allow service role to run this

    if (!user?.role || user.role !== 'admin') {

      return Response.json({ error: 'Admin access required' }, { status: 403 });

    }

    const { city, state } = await req.json();


    if (!city || !state) {

      return Response.json({ error: 'city and state required' }, { status: 400 });

    }

    console.log(`Auto-updating page for ${city}, ${state}...`);

    // Get market data and SEO content

    const cityData = await base44.entities.CityMarketData.filter({ city, state });


    if (!cityData || cityData.length === 0) {

      return Response.json({ error: 'No market data found - run fetchApifyMarketData first' }, { status: 404 });

    }

    const data = cityData[0];

    const pageRoute = CITY_PAGE_MAPPING[city] || `/SellHouse${city.replace(/\s/g, '')}`;

    // Create or update page metadata

    const pages = await base44.entities.Page.filter({ route: pageRoute });


    if (pages && pages.length > 0) {

      // Update existing page with SEO content

      await base44.entities.Page.update(pages[0].id, {

        seo_title: data.seo_content?.meta_title,

        seo_description: data.seo_content?.meta_description,

        display_name: `Sell House ${city}, ${state}`,

        notes: `Auto-updated: ${new Date().toISOString()}. Market data: ${JSON.stringify(data.market_insights)}`,

      });

    } else {

      // Create new page entry

      await base44.entities.Page.create({

        route: pageRoute,

        display_name: `Sell House ${city}, ${state}`,

        seo_title: data.seo_content?.meta_title,

        seo_description: data.seo_content?.meta_description,

        category: 'public',

        is_active: true,

        notes: `Auto-generated: ${new Date().toISOString()}. Market data: ${JSON.stringify(data.market_insights)}`,

      });

    }

    // Store page component with dynamic content

    const componentData = {

      page_route: pageRoute,

      component_type: 'section',

      component_name: 'DynamicMarketHeader',

      title: data.seo_content?.h1_header,

      description: data.seo_content?.market_stats_copy,

      background_color: '#f8f9fa',

      text_color: '#0B1F45',

      settings: {

        hero_tagline: data.seo_content?.hero_tagline,

        unique_value_prop: data.seo_content?.unique_value_prop,

        neighborhood_copy: data.seo_content?.neighborhood_copy,

        local_keywords: data.seo_content?.local_keywords,

        market_insights: data.market_insights,

      },

    };

    // Check for existing component

    const components = await base44.entities.PageComponent.filter({

      page_route: pageRoute,

      component_name: 'DynamicMarketHeader',

    });

    if (components && components.length > 0) {

      await base44.entities.PageComponent.update(components[0].id, componentData);

    } else {

      await base44.entities.PageComponent.create(componentData);

    }

    return Response.json({

      success: true,

      message: `Page ${pageRoute} updated with SEO content`,

      data: {

        pageRoute,

        seoTitle: data.seo_content?.meta_title,

        seoDescription: data.seo_content?.meta_description,

        updatedAt: new Date().toISOString(),

      },

    });

  } catch (error) {

    console.error('Auto-update error:', error);

    return Response.json({ error: error.message }, { status: 500 });

  }

});
