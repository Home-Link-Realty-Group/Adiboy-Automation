# customerportal

Source: customerportal.docx

import Stripe from 'npm:stripe@14\.10\.0';

const stripe = new Stripe\(Deno\.env\.get\('STRIPE\_SECRET\_KEY'\)\);

Deno\.serve\(async \(req\) => \{

  if \(req\.method \!== 'POST'\) return Response\.json\(\{ error: 'POST required' \}, \{ status: 405 \}\);

  try \{

    const \{ customerId \} = await req\.json\(\);

    if \(\!customerId\) return Response\.json\(\{ error: 'customerId required' \}, \{ status: 400 \}\);

    const origin = req\.headers\.get\('origin'\) || 'https://homelinkrealtygroup\.com';

    const session = await stripe\.billingPortal\.sessions\.create\(\{

      customer: customerId,

      return\_url: \`$\{origin\}/MyAccount\`,

    \}\);

    return Response\.json\(\{ url: session\.url \}\);

  \} catch \(error\) \{

    console\.error\('Customer portal error:', error\);

    return Response\.json\(\{ error: error\.message \}, \{ status: 500 \}\);

  \}

\}\);
