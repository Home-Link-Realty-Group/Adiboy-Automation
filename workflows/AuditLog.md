# AuditLog

Source: AuditLog.docx

/\*\*

 \* Audit Logger Function

 \* Log all sensitive actions for compliance tracking

 \*/

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.25';

Deno\.serve\(async \(req\) => \{

  try \{

    if \(req\.method \!== 'POST'\) \{

      return Response\.json\(\{ error: 'POST only' \}, \{ status: 400 \}\);

    \}

    const base44 = createClientFromRequest\(req\);

    const user = await base44\.auth\.me\(\);

    if \(\!user\) \{

      return Response\.json\(\{ error: 'Unauthorized' \}, \{ status: 401 \}\);

    \}

    const body = await req\.json\(\);

    const \{ action, entity, details = \{\}, status = 'success' \} = body;

    // Get client IP from headers

    const ipAddress = req\.headers\.get\('x\-forwarded\-for'\) || req\.headers\.get\('cf\-connecting\-ip'\) || 'unknown';

    // Create audit log entry

    const auditEntry = \{

      timestamp: new Date\(\)\.toISOString\(\),

      userId: user\.id,

      userEmail: user\.email,

      action,

      entity,

      ipAddress: ipAddress\.split\(','\)\[0\]\.trim\(\),

      details,

      status,

      userAgent: req\.headers\.get\('user\-agent'\),

    \};

    // In production, save to AuditLog entity

    console\.log\('AUDIT:', JSON\.stringify\(auditEntry\)\);

    return Response\.json\(\{

      success: true,

      message: 'Action logged',

      logId: crypto\.randomUUID\(\),

    \}\);

  \} catch \(error\) \{

    console\.error\('Audit log error:', error\);

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
