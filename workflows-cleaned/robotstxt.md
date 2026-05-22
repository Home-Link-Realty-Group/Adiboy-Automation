# robotstxt

Source: robotstxt.docx

# Home-Link Realty Group LLC — robots.txt

# https://homelinkrealtygroup.com/robots.txt

# Last updated: 2026-04-23

# ═══ PRIMARY DIRECTIVES — All crawlers ═══

User-agent: *

Allow: /

# ── Block internal / admin / private pages ──

Disallow: /HQ

Disallow: /CRM

Disallow: /Dashboard

Disallow: /Accounting

Disallow: /AutomationAudit

Disallow: /AutomationCenter

Disallow: /AutomationBlueprint

Disallow: /BusinessSystem

Disallow: /CallGrade

Disallow: /CallLists

Disallow: /CallAnalyticsDashboard

Disallow: /ContentScheduler

Disallow: /Craigslist

Disallow: /CraigslistManager

Disallow: /CustomerIOStrategy

Disallow: /DealAnalyzer

Disallow: /DealRoom

Disallow: /DealWorkflowAudit

Disallow: /DirectMail

Disallow: /DocumentVault

Disallow: /DownloadCredibilityPacket

Disallow: /ESign

Disallow: /EmailSignature

Disallow: /EnterprisePowerDialer

Disallow: /GBP

Disallow: /GBPManager

Disallow: /Google0f9ff5725a93e1cb

Disallow: /GrowthPlaybook

Disallow: /InvestorPortal

Disallow: /LeadImport

Disallow: /LeadScorer

Disallow: /ListBuilder

Disallow: /ListBuilderManual

Disallow: /ListStacker

Disallow: /MasterApp

Disallow: /MetaCampaign

Disallow: /OptimizationGuide

Disallow: /OptimizationReport

Disallow: /Performance

Disallow: /Playbook

Disallow: /PowerDialer

Disallow: /ProspectScraper

Disallow: /PunchList

Disallow: /RVM

Disallow: /ReferralEngine

Disallow: /SEOAudit

Disallow: /SOP

Disallow: /SkipTraceUpload

Disallow: /SkipTracer

Disallow: /SocialHQ

Disallow: /TestRecord

Disallow: /Tracker

Disallow: /VacantLeads

Disallow: /VirtualMailbox

Disallow: /ZapBlueprint

Disallow: /AdTemplates

Disallow: /BlogDashboard

Disallow: /BlogEditor

Disallow: /BlogCMS

Disallow: /CityIndex

Disallow: /ComplianceDashboard

Disallow: /SellerPortal

Disallow: /CityLanding

Disallow: /ConversionDiagnostic

Disallow: /Google0f9ff5725a93e1cb

Disallow: /app-logs/

Disallow: /admin/

Disallow: /api/

# ── Block internal entity URLs (Base44 auto-generated entity routes — never public) ──

# These are causing invalid Event schema in GSC ({name}/{start_date} placeholders)

Disallow: /SocialCampaign/

Disallow: /SocialCampaign

Disallow: /Habit/

Disallow: /Habit

Disallow: /Lead/

Disallow: /Lead

Disallow: /Deal/

Disallow: /Deal

Disallow: /Buyer/

Disallow: /Buyer

Disallow: /CashBuyer/

Disallow: /CashBuyer

Disallow: /Task/

Disallow: /Task

Disallow: /TaskList/

Disallow: /TaskList

Disallow: /EnterpriseTask/

Disallow: /EnterpriseTask

Disallow: /Goal/

Disallow: /Goal

Disallow: /FollowUp/

Disallow: /FollowUp

Disallow: /CallRecording/

Disallow: /CallRecording

Disallow: /CallGrade/

Disallow: /CallGrade

Disallow: /BlastSession/

Disallow: /BlastSession

Disallow: /DialerLead/

Disallow: /DialerLead

Disallow: /CraigslistAccount/

Disallow: /CraigslistAccount

Disallow: /CraigslistPost/

Disallow: /CraigslistPost

Disallow: /Transaction/

Disallow: /Transaction

Disallow: /DailyKPI/

Disallow: /DailyKPI

Disallow: /Referral/

Disallow: /Referral

Disallow: /SocialPost/

Disallow: /SocialPost

Disallow: /SocialComment/

Disallow: /SocialComment

Disallow: /VisitorJourney/

Disallow: /VisitorJourney

Disallow: /ContentPerformance/

Disallow: /ContentPerformance

Disallow: /CityMarketData/

Disallow: /CityMarketData

Disallow: /PageComponent/

Disallow: /PageComponent

Disallow: /PageImage/

Disallow: /PageImage

Disallow: /PageVideo/

Disallow: /PageVideo

Disallow: /Page/

Disallow: /StoredDocument/

Disallow: /StoredDocument

Disallow: /DocumentUpload/

Disallow: /DocumentUpload

Disallow: /EmailSubscriber/

Disallow: /EmailSubscriber

Disallow: /ColdCallScript/

Disallow: /ColdCallScript

Disallow: /List/

Disallow: /GBPToken/

Disallow: /GBPToken

# ── Block URL parameters that create duplicate content ──

Disallow: /*?utm_

Disallow: /*?fbclid

Disallow: /*?gclid

# ── Legacy blog URLs — 301 redirected to canonical /article/:slug ──

# Listed so Google drops them (also 301-redirected in-app)

Disallow: /BlogForeclosure

Disallow: /BlogInherited

# ── Consolidated pages — 301 redirected to /ProductivityHub ──

Disallow: /PunchList

Disallow: /Calendar

# ── Legacy /Home → 301 redirected to / (root is canonical) ──

Disallow: /Home

# ═══ Crawl budget optimization — Googlebot ═══

User-agent: Googlebot

Allow: /

Crawl-delay: 0

# ═══ Bingbot ═══

User-agent: Bingbot

Allow: /

Crawl-delay: 1

# ═══ SITEMAP ═══

Sitemap: https://homelinkrealtygroup.com/functions/dynamicSitemap

{

"rules": [

{

"user_agent": "Googlebot",

"allow": "/",

"disallow": ["/Home"],

"crawl_delay": 0

},

{

"user_agent": "Bingbot",

"allow": "/",

"disallow": [],

"crawl_delay": 1

}

],

"sitemap": null

}
