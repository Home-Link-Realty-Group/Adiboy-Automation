# AutoKPIAggregator

Source: AutoKPIAggregator.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

Deno\.serve\(async \(req\) => \{

  try \{

    const base44 = createClientFromRequest\(req\);

    const today = new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\];

    const leads = await base44\.asServiceRole\.entities\.Lead\.list\(\);

    const followUps = await base44\.asServiceRole\.entities\.FollowUp\.list\(\);

    const deals = await base44\.asServiceRole\.entities\.Deal\.list\(\);

    const todayFU = followUps\.filter\(f => f\.scheduled\_date === today && f\.status === 'Completed'\)\.length;

    const todayNewLeads = leads\.filter\(l => l\.created\_date?\.startsWith\(today\)\)\.length;

    const todayOffers = deals\.filter\(d => d\.contract\_date?\.startsWith\(today\)\)\.length;

    const existing = await base44\.asServiceRole\.entities\.DailyKPI\.filter\(\{ date: today \}\);

    const kpiData = \{

      date: today,

      calls\_made: 0,

      talk\_time\_hours: 0,

      contacts\_reached: 0,

      offers\_made: todayOffers,

      followups\_completed: todayFU,

      new\_leads: todayNewLeads,

      contracts\_signed: 0,

      revenue\_closed: 0,

    \};

    if \(existing\.length > 0\) \{

      await base44\.asServiceRole\.entities\.DailyKPI\.update\(existing\[0\]\.id, kpiData\);

    \} else \{

      await base44\.asServiceRole\.entities\.DailyKPI\.create\(kpiData\);

    \}

    return Response\.json\(\{ ok: true, date: today, kpi: kpiData \}\);

  \} catch \(error\) \{

    console\.error\('KPI aggregation error:', error\);

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
