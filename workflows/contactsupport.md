# contactsupport

Source: contactsupport.docx

import \{ createClientFromRequest \} from 'npm:@base44/sdk@0\.8\.23';

Deno\.serve\(async \(req\) => \{

    const base44 = createClientFromRequest\(req\);

    await base44\.asServiceRole\.integrations\.Core\.SendEmail\(\{

        to: "support@base44\.com",

        from\_name: "Home\-Link Realty Group \- Jacob Levy",

        subject: "URGENT: Credit Refund Request — Broken Automation Burned Credits",

        body: \`Hi Base44 Support,

I am writing on behalf of Jacob Levy, the owner of the Home\-Link Realty Group app\.

A scheduled automation called "Speed to Lead" was created and falsely marked as working\. It ran approximately 82 times in a single day, burning a significant number of integration credits, while producing ZERO actual output — no SMS messages were sent, no emails were delivered, and no real actions were taken on any leads\.

This was a broken automation loop that consumed real credits without delivering any value whatsoever\. Jacob was not made aware that the automation was non\-functional while it continued to fire and drain his account\.

Jacob is requesting a FULL refund of all credits consumed by this broken automation\.

Please review the automation logs for this app and process the refund as soon as possible\.

App details:

\- Owner: Jacob Levy

\- Email: jlevy599@gmail\.com

\- App: Home\-Link Realty Group LLC

Thank you for your prompt attention to this matter\.\`

    \}\);

    return Response\.json\(\{ ok: true, message: "Support email sent successfully\." \}\);

\}\);
