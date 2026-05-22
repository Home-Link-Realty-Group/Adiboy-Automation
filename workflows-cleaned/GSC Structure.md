# GSC Structure

Source: GSC Structure.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    const { page_route, page_url } = await req.json();

    if (!page_route || !page_url) {

      return Response.json({ error: 'page_route and page_url required' }, { status: 400 });

    }

    const gscData = await fetchGSCData(page_url);

    const lighthouseData = await runLighthouseAudit(page_url);

    const scores = calculateScores(gscData, lighthouseData);

    const recommendations = generateRecommendations(gscData, lighthouseData);

    return Response.json({

      page_url,

      gsc: gscData,

      lighthouse: lighthouseData,

      scores,

      recommendations,

      timestamp: new Date().toISOString()

    });

  } catch (error) {

    return Response.json({ error: error.message }, { status: 500 });

  }

});

async function fetchGSCData(pageUrl) {

  try {

    const gscApiUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent('https://homelinkrealtygroup.com/')}/searchAnalytics/query`;


    // Mock GSC data structure - in production, use actual GSC API

    return {

      clicks: Math.floor(Math.random() * 500),

      impressions: Math.floor(Math.random() * 5000),

      ctr: (Math.random() * 0.1).toFixed(3),

      avgPosition: Math.floor(Math.random() * 20) + 1,

      indexedPages: Math.floor(Math.random() * 1000),

      mobileUsability: 'PASS',

      coreWebVitals: {

        lcp: 'GOOD',

        fid: 'GOOD',

        cls: 'GOOD'

      },

      coverage: {

        indexed: 850,

        excluded: 12,

        errors: 2,

        warnings: 5

      }

    };

  } catch (e) {

    console.error('GSC fetch error:', e);

    return null;

  }

}

async function runLighthouseAudit(pageUrl) {

  try {

    const lighthouseApiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(pageUrl)}&key=${Deno.env.get('LIGHTHOUSE_API_KEY')}`;


    // Mock Lighthouse data - in production, use actual Lighthouse API

    return {

      performance: Math.floor(Math.random() * 40) + 60,

      accessibility: Math.floor(Math.random() * 30) + 70,

      bestPractices: Math.floor(Math.random() * 30) + 70,

      seo: Math.floor(Math.random() * 20) + 80,

      pwa: Math.floor(Math.random() * 40) + 60,

      metrics: {

        firstContentfulPaint: Math.floor(Math.random() * 2000) + 800,

        largestContentfulPaint: Math.floor(Math.random() * 3000) + 1200,

        cumulativeLayoutShift: (Math.random() * 0.3).toFixed(3),

        firstInputDelay: Math.floor(Math.random() * 100) + 20,

        totalBlockingTime: Math.floor(Math.random() * 400) + 100

      }

    };

  } catch (e) {

    console.error('Lighthouse fetch error:', e);

    return null;

  }

}

function calculateScores(gscData, lighthouseData) {

  const gscScore = gscData ?

    ((gscData.coreWebVitals.lcp === 'GOOD' ? 25 : 15) +

     (gscData.coreWebVitals.fid === 'GOOD' ? 25 : 15) +

     (gscData.coreWebVitals.cls === 'GOOD' ? 25 : 15) +

     (gscData.mobileUsability === 'PASS' ? 25 : 15)) : 0;

  const lighthouseScore = lighthouseData ?

    Math.round((lighthouseData.performance +

                lighthouseData.accessibility +

                lighthouseData.bestPractices +

                lighthouseData.seo +

                lighthouseData.pwa) / 5) : 0;

  const overall = Math.round((gscScore + lighthouseScore) / 2);

  return {

    gsc: gscScore,

    lighthouse: lighthouseScore,

    overall,

    grade: overall >= 90 ? 'A' : overall >= 80 ? 'B' : overall >= 70 ? 'C' : overall >= 60 ? 'D' : 'F'

  };

}

function generateRecommendations(gscData, lighthouseData) {

  const recommendations = [];

  if (lighthouseData) {

    if (lighthouseData.performance < 80) {

      recommendations.push({

        type: 'performance',

        severity: 'high',

        title: 'Improve Performance Score',

        description: `Current score: ${lighthouseData.performance}/100. Optimize images, reduce JavaScript, enable caching.`,

        metric: lighthouseData.metrics.largestContentfulPaint

      });

    }

    if (lighthouseData.accessibility < 80) {

      recommendations.push({

        type: 'accessibility',

        severity: 'high',

        title: 'Fix Accessibility Issues',

        description: `Current score: ${lighthouseData.accessibility}/100. Add alt text, improve color contrast, fix ARIA labels.`,

        metric: lighthouseData.accessibility

      });

    }

    if (lighthouseData.seo < 90) {

      recommendations.push({

        type: 'seo',

        severity: 'medium',

        title: 'Improve SEO',

        description: `Current score: ${lighthouseData.seo}/100. Add meta descriptions, improve heading hierarchy, fix mobile usability.`,

        metric: lighthouseData.seo

      });

    }

  }

  if (gscData) {

    if (gscData.ctr < 0.03) {

      recommendations.push({

        type: 'ctr',

        severity: 'medium',

        title: 'Low Click-Through Rate',

        description: `CTR: ${gscData.ctr}%. Improve title tags and meta descriptions to increase visibility.`,

        metric: gscData.ctr

      });

    }

    if (gscData.avgPosition > 10) {

      recommendations.push({

        type: 'ranking',

        severity: 'medium',

        title: 'Poor Search Ranking',

        description: `Average position: ${gscData.avgPosition}. Optimize content for keywords, improve backlinks.`,

        metric: gscData.avgPosition

      });

    }

    if (gscData.coverage.errors > 0) {

      recommendations.push({

        type: 'coverage',

        severity: 'high',

        title: 'Crawl Errors Detected',

        description: `${gscData.coverage.errors} errors found. Fix broken links, server errors, and crawl issues.`,

        metric: gscData.coverage.errors

      });

    }

  }

  return recommendations;

}
