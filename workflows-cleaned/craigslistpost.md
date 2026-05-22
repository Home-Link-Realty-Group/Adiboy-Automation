# craigslistpost

Source: craigslistpost.docx

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {

  try {

    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();

    if (!user?.role !== 'admin') {

      return Response.json({ error: 'Admin only' }, { status: 403 });

    }

    const { title, body, account_id, city } = await req.json();

    if (!title || !body || !account_id || !city) {

      return Response.json({ error: 'Missing required fields' }, { status: 400 });

    }

    // Get account

    const account = await base44.entities.CraigslistAccount.get(account_id);

    if (!account) {

      return Response.json({ error: 'Account not found' }, { status: 404 });

    }

    // Check compliance

    if ((account.posts_this_week || 0) >= 4) {

      return Response.json({ error: 'Weekly post limit reached' }, { status: 429 });

    }

    // Check last post time

    if (account.last_post_date) {

      const lastPost = new Date(`${account.last_post_date}T${account.last_post_time}`);

      const hoursSince = (Date.now() - lastPost) / (1000 * 60 * 60);

      if (hoursSince < 12) {

        return Response.json({ error: `Wait ${Math.ceil(12 - hoursSince)}h between posts` }, { status: 429 });

      }

    }

    // STUB: Post to Craigslist via their form

    // In production, you'd use Puppeteer or Playwright to automate form submission

    const craigslistUrl = `https://${city}.craigslist.org/`; // Placeholder

    // Record post

    const post = await base44.entities.CraigslistPost.create({

      title,

      body,

      account_id,

      city,

      status: 'posted',

      posted_date: new Date().toISOString().split('T')[0],

      posted_time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),

      craigslist_url: craigslistUrl,

      expires_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],

      repost_eligible_date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0],

    });

    // Update account

    await base44.entities.CraigslistAccount.update(account_id, {

      last_post_date: new Date().toISOString().split('T')[0],

      last_post_time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),

      posts_this_week: (account.posts_this_week || 0) + 1,

    });

    return Response.json({

      success: true,

      post_id: post.id,

      message: 'Post recorded. Manual submission required or automation setup.',

    });

  } catch (error) {

    return Response.json({ error: error.message }, { status: 500 });

  }

});
