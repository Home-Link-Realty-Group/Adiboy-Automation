# TroubleshootFAQ

Source: TroubleshootFAQ.docx

import { useState } from 'react';

import { ChevronDown, HelpCircle } from 'lucide-react';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const FAQS = [

  {

    q: "I don't see 'Personal API tokens' in Settings",

    a: "Make sure you're logged into Apify Console (console.apify.com), not the marketing site (apify.com). Then click your profile picture → Settings → Integrations tab on the left. The token is the very first section.",

  },

  {

    q: "My token says 'Invalid' when I paste it",

    a: "Three common causes: (1) You copied extra spaces — paste it into a plain text editor first, then re-copy. (2) You copied a 'team' token instead of your 'personal' token — use the personal one. (3) You revoked it after copying — generate a new one.",

  },

  {

    q: "Do I need a credit card to sign up?",

    a: "No. Apify's Free plan requires zero payment info and includes $5/month in credits — enough for ~10,000 scraped property records every month at zero cost.",

  },

  {

    q: "What if I run out of free credits?",

    a: "Apify will pause your scrapers automatically — they will never charge you a surprise bill. You can either wait for next month's $5 to reset, or upgrade Apify's Personal plan ($49/mo) for ~100,000 leads.",

  },

  {

    q: "Is my Apify token safe with Home-Link CRM?",

    a: "Yes. Tokens are encrypted at rest in our database. They are only used server-side to run scrapes you initiate. They are never displayed back, never logged, and never shared with third parties. You can revoke at any time from Apify's settings or our 'Disconnect' button.",

  },

  {

    q: "Can I use a single Apify account for multiple Home-Link users?",

    a: "Technically yes — but each user must paste the token into their own /ApifySetup. We recommend each team member create their own free Apify account so credits and usage are tracked per person.",

  },

  {

    q: "What scrapers will use my Apify account?",

    a: "Pre-Foreclosure Scraper, Cash Buyer Finder, FSBO Lead Hunter, Skip Tracer, Craigslist Scanner, and the Autonomous Public Records Scraper (Enterprise tier). Each run consumes Apify credits proportional to the data volume.",

  },

  {

    q: "How do I disconnect my account?",

    a: "Go to /ApifySetup → click 'Disconnect' in the top-right of the connected status panel. Your token is immediately deleted from our system. To fully revoke it, also delete the token from Apify's Settings → Integrations.",

  },

];

export default function TroubleshootingFAQ() {

  const [openIdx, setOpenIdx] = useState(null);

  return (

    <div style={{

      background: '#fff', borderRadius: 14, padding: 26,

      border: '1.5px solid #e2e8f0', marginTop: 24,

    }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>

        <HelpCircle size={22} color={NAVY} />

        <h3 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: 0 }}>Troubleshooting & FAQ</h3>

      </div>

      <div>

        {FAQS.map((item, i) => {

          const open = openIdx === i;

          return (

            <div key={i} style={{

              borderBottom: i < FAQS.length - 1 ? '1px solid #f1f5f9' : 'none',

            }}>

              <button

                onClick={() => setOpenIdx(open ? null : i)}

                style={{

                  width: '100%', textAlign: 'left',

                  background: 'none', border: 'none',

                  padding: '14px 4px', cursor: 'pointer',

                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',

                  fontSize: 14, fontWeight: 700, color: NAVY,

                }}>

                <span>{item.q}</span>

                <ChevronDown size={18} style={{

                  transform: open ? 'rotate(180deg)' : 'none',

                  transition: 'transform 0.2s',

                  color: GOLD,

                  flexShrink: 0,

                }} />

              </button>

              {open && (

                <div style={{

                  padding: '0 4px 16px',

                  fontSize: 13, color: '#475569', lineHeight: 1.7,

                }}>

                  {item.a}

                </div>

              )}

            </div>

          );

        })}

      </div>

    </div>

  );

}
