# AnalyzeContentPerformance

Source: AnalyzeContentPerformance.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();

    if (!user?.role || user.role !== 'admin') {

      return Response.json({ error: 'Admin access required' }, { status: 403 });

    }

    const { city, state } = await req.json();

    if (!city || !state) {

      return Response.json({ error: 'city and state required' }, { status: 400 });

    }

    console.log(`Analyzing content performance for ${city}, ${state}...`);

    // Get all visitor journeys for this city

    const journeys = await base44.entities.VisitorJourney.filter({ city, state });

    if (!journeys || journeys.length === 0) {

      return Response.json({

        message: 'No visitor data yet for this city',

        city,

        state,

      });

    }

    // Group by content variant

    const variantGroups = {};

    journeys.forEach(journey => {

      const variantId = journey.content_variant_id;

      if (!variantGroups[variantId]) {

        variantGroups[variantId] = {

          variant_id: variantId,

          journeys: [],

          total_visitors: 0,

          conversions: 0,

          form_starts: 0,

          form_completions: 0,

          total_time_on_site: 0,

          total_scroll_depth: 0,

          total_conversion_value: 0,

        };

      }

      variantGroups[variantId].journeys.push(journey);

      variantGroups[variantId].total_visitors += 1;

      if (journey.lead_submitted) variantGroups[variantId].conversions += 1;

      if (journey.form_started) variantGroups[variantId].form_starts += 1;

      if (journey.form_completed) variantGroups[variantId].form_completions += 1;

      variantGroups[variantId].total_time_on_site += journey.time_on_site_seconds || 0;

      variantGroups[variantId].total_scroll_depth += journey.scroll_depth_percent || 0;

      variantGroups[variantId].total_conversion_value += journey.conversion_value || 0;

    });

    // Calculate metrics for each variant

    const performanceData = Object.values(variantGroups)

      .map(group => {

        const conversionRate = (group.conversions / group.total_visitors * 100).toFixed(2);

        const avgTimeOnSite = (group.total_time_on_site / group.total_visitors).toFixed(0);

        const avgScrollDepth = (group.total_scroll_depth / group.total_visitors).toFixed(1);

        const formStartRate = (group.form_starts / group.total_visitors * 100).toFixed(2);

        const formCompletionRate = group.form_starts > 0

          ? (group.form_completions / group.form_starts * 100).toFixed(2)

          : 0;

        const bounceRate = (group.journeys.filter(j => j.exit_timestamp && !j.form_started).length / group.total_visitors * 100).toFixed(2);

        return {

          variant_id: group.variant_id,

          total_visitors: group.total_visitors,

          conversions: group.conversions,

          conversion_rate: parseFloat(conversionRate),

          avg_time_on_site: parseFloat(avgTimeOnSite),

          avg_scroll_depth: parseFloat(avgScrollDepth),

          form_start_rate: parseFloat(formStartRate),

          form_completion_rate: parseFloat(formCompletionRate),

          bounce_rate: parseFloat(bounceRate),

          total_revenue: group.total_conversion_value,

          avg_conversion_value: (group.total_conversion_value / Math.max(group.conversions, 1)).toFixed(0),

        };

      })

      .sort((a, b) => b.conversion_rate - a.conversion_rate);

    // Update ContentPerformance entities

    for (let i = 0; i < performanceData.length; i++) {

      const perf = performanceData[i];

      const existing = await base44.entities.ContentPerformance.filter({

        city,

        state,

        content_variant_id: perf.variant_id,

      });

      const updateData = {

        city,

        state,

        content_variant_id: perf.variant_id,

        total_visitors: perf.total_visitors,

        total_conversions: perf.conversions,

        conversion_rate: perf.conversion_rate,

        avg_time_on_site: perf.avg_time_on_site,

        avg_scroll_depth: perf.avg_scroll_depth,

        form_start_rate: perf.form_start_rate,

        form_completion_rate: perf.form_completion_rate,

        bounce_rate: perf.bounce_rate,

        avg_conversion_value: parseFloat(perf.avg_conversion_value),

        total_revenue: perf.total_revenue,

        performance_rank: i + 1,

        last_analyzed: new Date().toISOString(),

      };

      if (existing && existing.length > 0) {

        await base44.entities.ContentPerformance.update(existing[0].id, updateData);

      } else {

        await base44.entities.ContentPerformance.create(updateData);

      }

    }

    // Get top performing content

    const topVariant = performanceData[0];

    return Response.json({

      success: true,

      city,

      state,

      analysis_date: new Date().toISOString(),

      total_journeys: journeys.length,

      variants_analyzed: performanceData.length,

      top_performer: {

        variant_id: topVariant.variant_id,

        conversion_rate: topVariant.conversion_rate,

        conversions: topVariant.conversions,

        visitors: topVariant.total_visitors,

        avg_time_on_site: topVariant.avg_time_on_site,

        revenue: topVariant.total_revenue,

      },

      all_variants: performanceData,

    });

  } catch (error) {

    console.error('Analysis error:', error);

    return Response.json({ error: error.message }, { status: 500 });

  }

});
