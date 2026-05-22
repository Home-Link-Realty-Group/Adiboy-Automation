# New Microsoft Word Document (2)

Source: New Microsoft Word Document (2).docx

/**

 * Web Vitals Monitoring Hook

 * Tracks Core Web Vitals (LCP, FID, CLS) for real-time performance monitoring

 *

 * Thresholds (Enterprise Grade):

 * - LCP: < 2.5s

 * - INP: < 200ms (replaces FID)

 * - CLS: < 0.1

 */

import { useEffect } from 'react';

import { WEB_VITALS_THRESHOLDS, checkWebVitalsCompliance } from './performanceConfig';

export const useWebVitals = () => {

  useEffect(() => {

    // LCP (Largest Contentful Paint)

    const lcpObserver = new PerformanceObserver((list) => {

      const entries = list.getEntries();

      const lastEntry = entries[entries.length - 1];

      console.log('📊 LCP:', lastEntry.renderTime || lastEntry.loadTime, 'ms');


      // Send to analytics

      if (window.gtag) {

        window.gtag('event', 'page_view', {

          metric: 'LCP',

          value: Math.round(lastEntry.renderTime || lastEntry.loadTime),

        });

      }

    });

    try {

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    } catch (e) {

      console.warn('LCP observer not supported');

    }

    // INP (Interaction to Next Paint) — replaces FID

    const inpObserver = new PerformanceObserver((list) => {

      const entries = list.getEntries();

      const maxINP = Math.max(...entries.map(e => e.duration));

      console.log('📊 INP:', maxINP.toFixed(0), 'ms');

      if (window.gtag) {

        window.gtag('event', 'inp', { value: Math.round(maxINP) });

      }

    });

    try {

      inpObserver.observe({ entryTypes: ['interaction'] });

    } catch (e) {

      console.warn('INP observer not supported');

    }

    // CLS (Cumulative Layout Shift)

    let clsValue = 0;

    const clsObserver = new PerformanceObserver((list) => {

      for (const entry of list.getEntries()) {

        if (!entry.hadRecentInput) {

          clsValue += entry.value;

          console.log('📊 CLS:', clsValue.toFixed(3));

        }

      }

    });

    try {

      clsObserver.observe({ entryTypes: ['layout-shift'] });

    } catch (e) {

      console.warn('CLS observer not supported');

    }

    return () => {

      lcpObserver.disconnect();

      clsObserver.disconnect();

      inpObserver.disconnect();

    };

  }, []);

};
