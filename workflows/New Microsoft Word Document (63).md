# New Microsoft Word Document (63)

Source: New Microsoft Word Document (63).docx

// ── HELPERS ──────────────────────────────────────────────────────────────────

export const rgba = \(hex, a = 1\) => \{ const r = parseInt\(hex\.slice\(1,3\),16\); const g = parseInt\(hex\.slice\(3,5\),16\); const b = parseInt\(hex\.slice\(5,7\),16\); return \`rgba\($\{r\},$\{g\},$\{b\},$\{a\}\)\`; \};

export const fmtMoney = v => v > 0 ? "$" \+ \(v >= 1000 ? \(v/1000\)\.toFixed\(0\)\+"K" : v\) : "—";

export const fmtDate = d => d ? new Date\(d\)\.toLocaleDateString\("en\-US",\{month:"short",day:"numeric",year:"numeric"\}\) : "—";

export const timeSince = d => \{ if \(\!d\) return "—"; const s = Math\.floor\(\(Date\.now\(\)\-new Date\(d\)\)/1000\); if \(s < 60\) return "just now"; if \(s < 3600\) return Math\.floor\(s/60\)\+"m ago"; if \(s < 86400\) return Math\.floor\(s/3600\)\+"h ago"; return Math\.floor\(s/86400\)\+"d ago"; \};

// ── CONSTANTS ─────────────────────────────────────────────────────────────────

export const GOALS = \{ calls: 60, contacts: 15, offers: 3, talk: 3\.5 \};

export const QUOTES = \[

  "The fortune is in the follow\-up\.",

  "Every no gets you closer to yes\.",

  "Discipline is the bridge between goals and accomplishment\.",

  "Make your calls\. Send your offers\. Close the deal\.",

  "Speed to lead wins deals\.",

  "60 calls a day keeps the bills away\.",

  "Your pipeline is only as strong as your daily actions\.",

\];

export const LEAD\_SOURCES = \[

  \{ name: "PropStream", url: "https://propstream\.com", tip: "Pre\-foreclosure, absentee, vacant — best list source" \},

  \{ name: "PropWire", url: "https://propwire\.com", tip: "Free distressed leads — absentee \+ pre\-fc" \},

  \{ name: "ATTOM Data", url: "https://attomdata\.com", tip: "Tax delinquent \+ equity\-rich lists" \},

  \{ name: "ListSource", url: "https://listsource\.com", tip: "Custom absentee \+ high\-equity lists" \},

  \{ name: "Craigslist FSBO", url: "https://dallas\.craigslist\.org/search/rea", tip: "Daily FSBO scrape — motivated sellers posting today" \},

  \{ name: "Facebook Marketplace", url: "https://facebook\.com/marketplace/propertyrentals", tip: "Distressed FSBO \+ landlord leads" \},

  \{ name: "Zillow FSBO", url: "https://zillow\.com/homes/for\_sale/fsbo\_lt/", tip: "Filter: FSBO \+ price reduced" \},

  \{ name: "County Records", url: "https://dallascad\.org", tip: "Tax delinquent \+ probate — direct from source" \},

\];

export const EXTERNAL\_PLATFORMS = \[

  \{ name: "Twilio Console", url: "https://console\.twilio\.com", icon: "📞", color: "\#ef4444" \},

  \{ name: "Resend Email", url: "https://resend\.com/emails", icon: "📧", color: "\#2563eb" \},

  \{ name: "Google Analytics", url: "https://analytics\.google\.com", icon: "📊", color: "\#f59e0b" \},

  \{ name: "Google Search Console", url: "https://search\.google\.com/search\-console", icon: "🔍", color: "\#22c55e" \},

  \{ name: "Google Business Profile", url: "https://business\.google\.com", icon: "📍", color: "\#4285F4" \},

  \{ name: "Facebook Ads", url: "https://adsmanager\.facebook\.com", icon: "💰", color: "\#0668e1" \},

  \{ name: "Craigslist Post", url: "https://post\.craigslist\.org", icon: "📋", color: "\#7b0d1e" \},

  \{ name: "Lob\.com Mail", url: "https://dashboard\.lob\.com", icon: "📬", color: "\#d97706" \},

  \{ name: "PropStream", url: "https://propstream\.com", icon: "🏚️", color: "\#7c3aed" \},

  \{ name: "DocuSign", url: "https://docusign\.com", icon: "✍️", color: "\#0ea5e9" \},

  \{ name: "Calendly", url: "https://calendly\.com", icon: "📅", color: "\#06b6d4" \},

  \{ name: "Slybroadcast", url: "https://slybroadcast\.com", icon: "🎙️", color: "\#a855f7" \},

\];
