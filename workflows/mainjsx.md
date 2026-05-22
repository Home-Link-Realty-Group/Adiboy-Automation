# mainjsx

Source: mainjsx.docx

import React from 'react'

import ReactDOM from 'react\-dom/client'

import App from '@/App\.jsx'

import '@/index\.css'

import \{ initWebVitalsTracking \} from '@/lib/webVitalsTracker'

// Initialize Core Web Vitals tracking

initWebVitalsTracking\(\)

// Service worker intentionally omitted — not supported in this hosting environment

ReactDOM\.createRoot\(document\.getElementById\('root'\)\)\.render\(

  <App />

\)
