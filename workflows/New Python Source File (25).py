import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { queryClientInstance } from '@/lib/query-client'
import ProtectedRoute from '@/components/ProtectedRoute'
import ErrorBoundary from '@/components/ErrorBoundary'
import { EditModeProvider } from '@/lib/EditModeContext'
// Settings is loaded eagerly — bypasses any stale service-worker chunk caching
import Settings from './pages/Settings'

// Lazy-load every page so each route gets its own code-split chunk.
// Users only download JS for the page they actually visit.
const Sitemap = lazy(() => import(/* webpackChunkName: "sitemap" */ './pages/Sitemap'));
const Terms = lazy(() => import(/* webpackChunkName: "terms" */ './pages/Terms'));
const RVM = lazy(() => import(/* webpackChunkName: "rvm" */ './pages/RVM'));
const DealAnalyzer = lazy(() => import(/* webpackChunkName: "deal-analyzer" */ './pages/DealAnalyzer'));
// BlogInherited — legacy route 301-redirected to /article/selling-inherited-house
const Playbook = lazy(() => import(/* webpackChunkName: "playbook" */ './pages/Playbook'));
const VacantLeads = lazy(() => import(/* webpackChunkName: "vacant-leads" */ './pages/VacantLeads'));
const Performance = lazy(() => import(/* webpackChunkName: "performance" */ './pages/Performance'));
const ListBuilderManual = lazy(() => import(/* webpackChunkName: "list-builder-manual" */ './pages/ListBuilderManual'));

const DallasForeclosure = lazy(() => import(/* webpackChunkName: "dallas-foreclosure" */ './pages/DallasForeclosure'));
const BlogDashboard = lazy(() => import(/* webpackChunkName: "blog-dashboard" */ './pages/BlogDashboard'));
const MasterApp = lazy(() => import(/* webpackChunkName: "master-app" */ './pages/MasterApp'));
const HQ = lazy(() => import(/* webpackChunkName: "hq-system" */ './pages/HQ'));
const Google0f9ff5725a93e1cb = lazy(() => import(/* webpackChunkName: "google-verification" */ './pages/Google0f9ff5725a93e1cb'));
const LeadScorer = lazy(() => import(/* webpackChunkName: "lead-scorer" */ './pages/LeadScorer'));
const ProspectScraper = lazy(() => import(/* webpackChunkName: "prospect-scraper" */ './pages/ProspectScraper'));
const BlogTimeline = lazy(() => import(/* webpackChunkName: "blog-timeline" */ './pages/BlogTimeline'));
const SkipTracer = lazy(() => import(/* webpackChunkName: "skip-tracer" */ './pages/SkipTracer'));
const CRM = lazy(() => import(/* webpackChunkName: "crm-dashboard" */ './pages/CRM'));
const Craigslist = lazy(() => import(/* webpackChunkName: "craigslist" */ './pages/Craigslist'));
const BlogComparison = lazy(() => import(/* webpackChunkName: "blog-comparison" */ './pages/BlogComparison'));
const Tracker = lazy(() => import(/* webpackChunkName: "tracker" */ './pages/Tracker'));
const BlogAsIs = lazy(() => import(/* webpackChunkName: "blog-as-is" */ './pages/BlogAsIs'));
const CallGrade = lazy(() => import(/* webpackChunkName: "call-grade" */ './pages/CallGrade'));
const CallAnalyticsDashboard = lazy(() => import(/* webpackChunkName: "call-analytics" */ './pages/CallAnalyticsDashboard'));
const PowerDialer = lazy(() => import(/* webpackChunkName: "power-dialer" */ './pages/PowerDialer'));
const EnterprisePowerDialer = lazy(() => import(/* webpackChunkName: "enterprise-dialer" */ './pages/EnterprisePowerDialer'));
const ThankYou = lazy(() => import(/* webpackChunkName: "thank-you" */ './pages/ThankYou'));
const SellerPortal = lazy(() => import(/* webpackChunkName: "seller-portal" */ './pages/SellerPortal'));
const EmailSignature = lazy(() => import(/* webpackChunkName: "email-signature" */ './pages/EmailSignature'));
const Blog = lazy(() => import(/* webpackChunkName: "blog" */ './pages/Blog'));
const DirectMail = lazy(() => import(/* webpackChunkName: "direct-mail" */ './pages/DirectMail'));
const GrowthPlaybook = lazy(() => import(/* webpackChunkName: "growth-playbook" */ './pages/GrowthPlaybook'));
const TestRecord = lazy(() => import(/* webpackChunkName: "test-record" */ './pages/TestRecord'));
const LeadImport = lazy(() => import(/* webpackChunkName: "lead-import" */ './pages/LeadImport'));
const ListBuilder = lazy(() => import(/* webpackChunkName: "list-builder" */ './pages/ListBuilder'));
const MetaCampaign = lazy(() => import(/* webpackChunkName: "meta-campaign" */ './pages/MetaCampaign'));
const Accounting = lazy(() => import(/* webpackChunkName: "accounting" */ './pages/Accounting'));
const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */ './pages/Dashboard'));
const DealRoom = lazy(() => import(/* webpackChunkName: "deal-room" */ './pages/DealRoom'));
// PunchList — consolidated into /ProductivityHub
const SOP = lazy(() => import(/* webpackChunkName: "sop" */ './pages/SOP'));
const VirtualMailbox = lazy(() => import(/* webpackChunkName: "virtual-mailbox" */ './pages/VirtualMailbox'));
// BlogForeclosure — legacy route 301-redirected to /article/how-to-stop-foreclosure
const GetOffer = lazy(() => import(/* webpackChunkName: "get-offer" */ './pages/GetOffer'));
const ReferralEngine = lazy(() => import(/* webpackChunkName: "referral-engine" */ './pages/ReferralEngine'));
const ESign = lazy(() => import(/* webpackChunkName: "esign" */ './pages/ESign'));
const AutomationCenter = lazy(() => import(/* webpackChunkName: "automation-center" */ './pages/AutomationCenter'));
const CallLists = lazy(() => import(/* webpackChunkName: "call-lists" */ './pages/CallLists'));
const SkipTraceUpload = lazy(() => import(/* webpackChunkName: "skip-trace-upload" */ './pages/SkipTraceUpload'));
const AutomationAudit = lazy(() => import(/* webpackChunkName: "automation-audit" */ './pages/AutomationAudit'));
const Home = lazy(() => import(/* webpackChunkName: "home" */ './pages/Home'));
const ListStacker = lazy(() => import(/* webpackChunkName: "list-stacker" */ './pages/ListStacker'));
const OptimizationReport = lazy(() => import(/* webpackChunkName: "optimization-report" */ './pages/OptimizationReport'));
// Calendar — consolidated into /ProductivityHub
const DocumentVault = lazy(() => import(/* webpackChunkName: "document-vault" */ './pages/DocumentVault.jsx'));
const CityIndex = lazy(() => import(/* webpackChunkName: "city-index" */ './pages/CityIndex'));
const Cities = lazy(() => import(/* webpackChunkName: "cities" */ './pages/Cities'));
const BlogEditor = lazy(() => import(/* webpackChunkName: "blog-editor" */ './pages/BlogEditor'));
const BlogCMS = lazy(() => import(/* webpackChunkName: "blog-cms" */ './pages/BlogCMS'));
const SiteManager = lazy(() => import(/* webpackChunkName: "site-manager" */ './pages/SiteManager'));
const BlogPostPage = lazy(() => import(/* webpackChunkName: "blog-post" */ './pages/BlogPost'));
const DynamicBlogPost = lazy(() => import(/* webpackChunkName: "dynamic-blog" */ './components/DynamicBlogPost'));
const ContentScheduler = lazy(() => import(/* webpackChunkName: "content-scheduler" */ './pages/ContentScheduler'));
const CraigslistManager = lazy(() => import(/* webpackChunkName: "craigslist-manager" */ './pages/CraigslistManager'));
const OptimizationGuide = lazy(() => import(/* webpackChunkName: "optimization-guide" */ './pages/OptimizationGuide'));
const ComplianceDashboard = lazy(() => import(/* webpackChunkName: "compliance-dashboard" */ './pages/ComplianceDashboard'));

const SellHouseAtlanta = lazy(() => import(/* webpackChunkName: "city-pages-atlanta" */ './pages/SellHouseAtlanta'));
const ForeclosureAtlanta = lazy(() => import(/* webpackChunkName: "city-pages-atlanta" */ './pages/ForeclosureAtlanta'));
const InheritedAtlanta = lazy(() => import(/* webpackChunkName: "city-pages-atlanta" */ './pages/InheritedAtlanta'));
const SellHouseChicago = lazy(() => import(/* webpackChunkName: "city-pages-chicago" */ './pages/SellHouseChicago'));
const SellHousePhiladelphia = lazy(() => import(/* webpackChunkName: "city-pages-philadelphia" */ './pages/SellHousePhiladelphia'));
const SellHousePittsburgh = lazy(() => import(/* webpackChunkName: "city-pages-pittsburgh" */ './pages/SellHousePittsburgh'));
const SellHouseNashville = lazy(() => import(/* webpackChunkName: "city-pages-nashville" */ './pages/SellHouseNashville'));
const SellHouseCharlotte = lazy(() => import(/* webpackChunkName: "city-pages-charlotte" */ './pages/SellHouseCharlotte'));
const SellHouseOrlando = lazy(() => import(/* webpackChunkName: "city-pages-orlando" */ './pages/SellHouseOrlando'));
const SellHouseLouisville = lazy(() => import(/* webpackChunkName: "city-pages-louisville" */ './pages/SellHouseLouisville'));
const SEOCompetitorAnalysis = lazy(() => import(/* webpackChunkName: "seo-competitor-analysis" */ './pages/SEOCompetitorAnalysis'));
const SEODashboard = lazy(() => import(/* webpackChunkName: "seo-dashboard" */ './pages/SEODashboard'));
const SEODashboardPro = lazy(() => import(/* webpackChunkName: "seo-dashboard-pro" */ './pages/SEODashboardPro'));
const AuditReportExport = lazy(() => import(/* webpackChunkName: "audit-export" */ './pages/AuditReportExport'));
const CodeBundleReport = lazy(() => import(/* webpackChunkName: "audit-export" */ './pages/CodeBundleReport'));
const LeadPrioritizer = lazy(() => import(/* webpackChunkName: "lead-prioritizer" */ './pages/LeadPrioritizer'));
const ProductivityHub = lazy(() => import(/* webpackChunkName: "productivity-hub" */ './pages/ProductivityHub'));
const PrivacyPolicy = lazy(() => import(/* webpackChunkName: "privacy-policy" */ './pages/PrivacyPolicy'));
const BehaviorAnalytics = lazy(() => import(/* webpackChunkName: "behavior-analytics" */ './pages/BehaviorAnalytics'));
const PreForeclosureScraper = lazy(() => import(/* webpackChunkName: "pre-foreclosure-scraper" */ './pages/PreForeclosureScraper'));
const CashBuyerFinder = lazy(() => import(/* webpackChunkName: "cash-buyer-finder" */ './pages/CashBuyerFinder'));
const DialerWarmup = lazy(() => import(/* webpackChunkName: "dialer-warmup" */ './pages/DialerWarmup'));
const FormFunnelAnalyzer = lazy(() => import(/* webpackChunkName: "form-funnel" */ './pages/FormFunnelAnalyzer'));
const SearchConsoleDashboard = lazy(() => import(/* webpackChunkName: "gsc-dashboard" */ './pages/SearchConsoleDashboard'));
const FirstDealSprint = lazy(() => import(/* webpackChunkName: "first-deal-sprint" */ './pages/FirstDealSprint'));
const PropWireImport = lazy(() => import(/* webpackChunkName: "propwire-import" */ './pages/PropWireImport'));
const ConversionDiagnostic = lazy(() => import(/* webpackChunkName: "conversion-diagnostic" */ './pages/ConversionDiagnostic'));
const Pricing = lazy(() => import(/* webpackChunkName: "pricing" */ './pages/Pricing'));
const MyAccount = lazy(() => import(/* webpackChunkName: "my-account" */ './pages/MyAccount'));
const DialerSetup = lazy(() => import(/* webpackChunkName: "dialer-setup" */ './pages/DialerSetup'));
const CustomerDialer = lazy(() => import(/* webpackChunkName: "customer-dialer" */ './pages/CustomerDialer'));
const DealProcess = lazy(() => import(/* webpackChunkName: "deal-process" */ './pages/DealProcess'));
const DPBuyerList = lazy(() => import(/* webpackChunkName: "dp-buyer-list" */ './pages/deal-process/A-BuyerList'));
const DPLeadCapture = lazy(() => import(/* webpackChunkName: "dp-lead-capture" */ './pages/deal-process/B-LeadCapture'));
const DPDealAnalysis = lazy(() => import(/* webpackChunkName: "dp-deal-analysis" */ './pages/deal-process/D-DealAnalysis'));
const ApifySetup = lazy(() => import(/* webpackChunkName: "apify-setup" */ './pages/ApifySetup'));
const SetupConcierge = lazy(() => import(/* webpackChunkName: "setup-concierge" */ './pages/SetupConcierge'));
const ControlCenter = lazy(() => import(/* webpackChunkName: "control-center" */ './pages/ControlCenter'));
const Onboarding = lazy(() => import(/* webpackChunkName: "onboarding" */ './pages/Onboarding'));
const StripeConnect = lazy(() => import(/* webpackChunkName: "stripe-connect" */ './pages/StripeConnect'));
const StripeConnectStorefront = lazy(() => import(/* webpackChunkName: "stripe-storefront" */ './pages/StripeConnectStorefront'));
// Settings: eager-loaded above

// Minimal fallback — invisible, no layout shift
function PageLoader() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff' }} />
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClientInstance}>
        <EditModeProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
          <Routes>
          {/* Root path renders Home directly — canonical is "/" */}
          <Route path="/" element={<Home />} />
          {/* Legacy /Home → 301 redirect to root canonical */}
          <Route path="/Home" element={<Navigate to="/" replace />} />
          <Route path="/Sitemap" element={<Sitemap />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/RVM" element={<RVM />} />
          <Route path="/DealAnalyzer" element={<DealAnalyzer />} />
          <Route path="/Playbook" element={<Playbook />} />
          <Route path="/VacantLeads" element={<VacantLeads />} />
          <Route path="/Performance" element={<Performance />} />
          <Route path="/ListBuilderManual" element={<ListBuilderManual />} />

          <Route path="/DallasForeclosure" element={<DallasForeclosure />} />
          <Route path="/BlogDashboard" element={<BlogDashboard />} />
          <Route path="/MasterApp" element={<MasterApp />} />
          <Route path="/HQ" element={<HQ />} />
          <Route path="/Google0f9ff5725a93e1cb" element={<Google0f9ff5725a93e1cb />} />
          <Route path="/LeadScorer" element={<LeadScorer />} />
          <Route path="/ProspectScraper" element={<ProspectScraper />} />
          <Route path="/BlogTimeline" element={<BlogTimeline />} />
          <Route path="/SkipTracer" element={<SkipTracer />} />
          <Route path="/CRM" element={<CRM />} />
          <Route path="/Craigslist" element={<Craigslist />} />
          <Route path="/BlogComparison" element={<BlogComparison />} />
          <Route path="/Tracker" element={<Tracker />} />
          <Route path="/BlogAsIs" element={<BlogAsIs />} />
          <Route path="/CallGrade" element={<CallGrade />} />
          <Route path="/CallAnalyticsDashboard" element={<CallAnalyticsDashboard />} />
          <Route path="/PowerDialer" element={<PowerDialer />} />
          <Route path="/EnterprisePowerDialer" element={<EnterprisePowerDialer />} />
          <Route path="/ThankYou" element={<ThankYou />} />
          <Route path="/SellerPortal" element={<SellerPortal />} />
          <Route path="/EmailSignature" element={<EmailSignature />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/DirectMail" element={<DirectMail />} />
          <Route path="/GrowthPlaybook" element={<GrowthPlaybook />} />
          <Route path="/TestRecord" element={<TestRecord />} />
          <Route path="/LeadImport" element={<LeadImport />} />
          <Route path="/ListBuilder" element={<ListBuilder />} />
          <Route path="/MetaCampaign" element={<MetaCampaign />} />
          <Route path="/Accounting" element={<Accounting />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/DealRoom" element={<DealRoom />} />
          <Route path="/SOP" element={<SOP />} />
          <Route path="/VirtualMailbox" element={<VirtualMailbox />} />
          <Route path="/PunchList" element={<Navigate to="/ProductivityHub" replace />} />
          <Route path="/Calendar" element={<Navigate to="/ProductivityHub" replace />} />
          <Route path="/GetOffer" element={<GetOffer />} />
          <Route path="/ReferralEngine" element={<ReferralEngine />} />
          <Route path="/ESign" element={<ESign />} />
          <Route path="/AutomationCenter" element={<AutomationCenter />} />
          <Route path="/CallLists" element={<CallLists />} />
          <Route path="/SkipTraceUpload" element={<SkipTraceUpload />} />
          <Route path="/AutomationAudit" element={<AutomationAudit />} />
          <Route path="/ListStacker" element={<ListStacker />} />
          <Route path="/OptimizationReport" element={<OptimizationReport />} />
          <Route path="/DocumentVault" element={<DocumentVault />} />
          <Route path="/CityIndex" element={<CityIndex />} />
          <Route path="/Cities" element={<Cities />} />
          <Route path="/BlogEditor" element={<BlogEditor />} />
          <Route path="/BlogCMS" element={<BlogCMS />} />
          <Route path="/SiteManager" element={<SiteManager />} />
          <Route path="/ContentScheduler" element={<ContentScheduler />} />
          <Route path="/CraigslistManager" element={<CraigslistManager />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {/* Dynamic blog engine — all articles served from one component via slug */}
          <Route path="/article/:slug" element={<DynamicBlogPost />} />
          {/* Legacy blog URLs → 301 redirect to canonical /article/:slug to eliminate duplicate content */}
          <Route path="/BlogForeclosure" element={<Navigate to="/article/how-to-stop-foreclosure" replace />} />
          <Route path="/BlogInherited" element={<Navigate to="/article/selling-inherited-house" replace />} />
          <Route path="/OptimizationGuide" element={<OptimizationGuide />} />
          <Route path="/ComplianceDashboard" element={<ComplianceDashboard />} />

          <Route path="/SellHouseAtlanta" element={<SellHouseAtlanta />} />
          <Route path="/ForeclosureAtlanta" element={<ForeclosureAtlanta />} />
          <Route path="/InheritedAtlanta" element={<InheritedAtlanta />} />
          <Route path="/SellHouseChicago" element={<SellHouseChicago />} />
          <Route path="/SellHousePhiladelphia" element={<SellHousePhiladelphia />} />
          <Route path="/SellHousePittsburgh" element={<SellHousePittsburgh />} />
          <Route path="/SellHouseNashville" element={<SellHouseNashville />} />
          <Route path="/SellHouseCharlotte" element={<SellHouseCharlotte />} />
          <Route path="/SellHouseOrlando" element={<SellHouseOrlando />} />
          <Route path="/SellHouseLouisville" element={<SellHouseLouisville />} />
          <Route path="/SEOCompetitorAnalysis" element={<SEOCompetitorAnalysis />} />
          <Route path="/LeadPrioritizer" element={<LeadPrioritizer />} />
          <Route path="/ProductivityHub" element={<ProductivityHub />} />
          <Route path="/SEODashboard" element={<SEODashboard />} />
          <Route path="/SEODashboardPro" element={<SEODashboardPro />} />
          <Route path="/AuditReportExport" element={<AuditReportExport />} />
          <Route path="/CodeBundleReport" element={<CodeBundleReport />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/BehaviorAnalytics" element={<BehaviorAnalytics />} />
          <Route path="/PreForeclosureScraper" element={<PreForeclosureScraper />} />
          <Route path="/CashBuyerFinder" element={<CashBuyerFinder />} />
          <Route path="/DialerWarmup" element={<DialerWarmup />} />
          <Route path="/FormFunnelAnalyzer" element={<FormFunnelAnalyzer />} />
          <Route path="/SearchConsoleDashboard" element={<SearchConsoleDashboard />} />
          <Route path="/FirstDealSprint" element={<FirstDealSprint />} />
          <Route path="/PropWireImport" element={<PropWireImport />} />
          <Route path="/ConversionDiagnostic" element={<ConversionDiagnostic />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/MyAccount" element={<MyAccount />} />
          <Route path="/DialerSetup" element={<DialerSetup />} />
          <Route path="/CustomerDialer" element={<CustomerDialer />} />
          <Route path="/DealProcess" element={<DealProcess />} />
          <Route path="/DealProcess/BuyerList" element={<DPBuyerList />} />
          <Route path="/DealProcess/LeadCapture" element={<DPLeadCapture />} />
          <Route path="/DealProcess/DealAnalysis" element={<DPDealAnalysis />} />
          <Route path="/ApifySetup" element={<ApifySetup />} />
          <Route path="/SetupConcierge" element={<SetupConcierge />} />
          <Route path="/ControlCenter" element={<ControlCenter />} />
          <Route path="/Onboarding" element={<Onboarding />} />
          <Route path="/StripeConnect" element={<StripeConnect />} />
          <Route path="/StripeConnect/Store/:accountId" element={<StripeConnectStorefront />} />
          <Route path="/Settings" element={<Settings />} />

          </Routes>
          </Suspense>
        </BrowserRouter>
        </EditModeProvider>
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
