# BundleSplittingstrategy

Source: BundleSplittingstrategy.docx

const strategies = [

  {

    title: "1. Route-Level Splitting (DONE ✅)",

    status: "done",

    desc: "Every page uses React.lazy() + Suspense — users only download JS for the route they visit.",

    metric: "68 routes isolated · Avg chunk size ~15-40 KB",

  },

  {

    title: "2. Manual Chunk Grouping (TODO)",

    status: "todo",

    desc: "Group related admin routes into named chunks via webpackChunkName comments so they share the same bundle when navigating within admin.",

    code: `const HQ = lazy(() => import(

  /* webpackChunkName: "admin" */ './pages/HQ'

));

const CRM = lazy(() => import(

  /* webpackChunkName: "admin" */ './pages/CRM'

));`,

    metric: "Reduces admin nav re-downloads by ~70%",

  },

  {

    title: "3. Vendor Chunk Splitting (TODO)",

    status: "todo",

    desc: "Split large vendor libs into separate chunks via vite.config.js manualChunks. Keeps them cached across deploys.",

    code: `// vite.config.js

build: {

  rollupOptions: {

    output: {

      manualChunks: {

        'react-vendor': ['react', 'react-dom', 'react-router-dom'],

        'ui-vendor': ['@radix-ui/*', 'lucide-react'],

        'query-vendor': ['@tanstack/react-query'],

        'charts': ['recharts'],

        'pdf': ['jspdf', 'html2canvas'],

      }

    }

  }

}`,

    metric: "Vendor code cached across page navs — -200 KB repeat loads",

  },

  {

    title: "4. Component-Level Lazy Loading (PARTIAL)",

    status: "partial",

    desc: "LazySection already defers below-fold sections on Home. Extend to: InteractiveNeighborhoodMap, recharts dashboards, jsPDF exports, Quill editor.",

    code: `// Component-level lazy

const NeighborhoodMap = lazy(() =>

  import('@/components/CityMap/InteractiveNeighborhoodMap')

);

// Usage with Suspense boundary

<Suspense fallback={<MapSkeleton />}>

  <NeighborhoodMap />

</Suspense>`,

    metric: "Map: -150 KB from city pages · PDF: -380 KB from export pages",

  },

  {

    title: "5. Dynamic Import on User Interaction (TODO)",

    status: "todo",

    desc: "Heavy libs needed only when user clicks an action (PDF export, print, chart export). Load them inside the handler, not on page load.",

    code: `const handleExport = async () => {

  const { jsPDF } = await import('jspdf');

  const html2canvas = (await import('html2canvas')).default;

  // ... use them

};`,

    metric: "-380 KB from initial bundle · Trade-off: 200ms delay on click",

  },

  {

    title: "6. Tree-Shaking Audit (TODO)",

    status: "todo",

    desc: "Replace full imports with specific ones. Remove moment entirely in favor of date-fns.",

    code: `// ❌ Before

import _ from 'lodash';

import moment from 'moment';

// ✅ After

import debounce from 'lodash/debounce';

import { format, parseISO } from 'date-fns';`,

    metric: "-270 KB (moment) -60 KB (lodash) = -330 KB total",

  },

  {

    title: "7. Preload Critical Chunks (TODO)",

    status: "todo",

    desc: "Add <link rel='modulepreload'> for GetOffer chunk — 70% of Home visitors click through to it.",

    code: `// In index.html or via useEffect

<link rel="modulepreload" href="/assets/get-offer-[hash].js" />`,

    metric: "GetOffer navigation: -400ms perceived wait",

  },

];

const statusConfig = {

  done: { bg: "#2dc65322", color: "#2dc653", label: "DONE" },

  partial: { bg: "#f39c1222", color: "#f39c12", label: "PARTIAL" },

  todo: { bg: "#3498db22", color: "#3498db", label: "TODO" },

};

export default function BundleSplittingStrategy() {

  return (

    <section style={{ marginBottom: 36 }}>

      <div style={{ fontSize: 11, fontWeight: 700, color: "#7a5e1a", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Splitting Strategy</div>

      <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0B1F45", margin: "0 0 20px" }}>7-Layer Code-Splitting Playbook</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        {strategies.map(s => {

          const sc = statusConfig[s.status];

          return (

            <div key={s.title} style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 10, flexWrap: "wrap" }}>

                <div style={{ fontWeight: 900, fontSize: 16, color: "#0B1F45" }}>{s.title}</div>

                <span style={{ background: sc.bg, color: sc.color, fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 20 }}>{sc.label}</span>

              </div>

              <p style={{ fontSize: 13, color: "#333", lineHeight: 1.6, margin: "0 0 10px" }}>{s.desc}</p>

              {s.code && (

                <pre style={{ background: "#0B1F45", color: "#D4A843", padding: 14, borderRadius: 8, fontSize: 12, lineHeight: 1.6, overflowX: "auto", margin: "10px 0", fontFamily: "Consolas, Monaco, monospace" }}>

                  <code>{s.code}</code>

                </pre>

              )}

              <div style={{ fontSize: 12, color: "#2dc653", fontWeight: 700 }}>📊 {s.metric}</div>

            </div>

          );

        })}

      </div>

    </section>

  );

}
