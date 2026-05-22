# noncriticalscripts

Source: noncriticalscripts.docx

import { useEffect } from 'react';

import { base44 } from '@/api/base44Client';

const META_PIXEL_ID = '1451356016727762';

/**

 * useMicrosoftClarity — Defers Microsoft Clarity (free heatmaps + session replay)

 * until 3s after page mount. Project ID fetched from server-side secret.

 * Sign up free at https://clarity.microsoft.com

 */

export function useMicrosoftClarity() {

  useEffect(() => {

    if (window.clarity || document.getElementById('ms-clarity-script')) return;

    const timer = setTimeout(async () => {

      try {

        const { data } = await base44.functions.invoke('getClarityConfig', {});

        const projectId = data?.projectId;

        if (!projectId) return;

        (function (c, l, a, r, i, t, y) {

          c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };

          t = l.createElement(r); t.async = 1; t.id = 'ms-clarity-script';

          t.src = 'https://www.clarity.ms/tag/' + i;

          y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);

        })(window, document, 'clarity', 'script', projectId);

      } catch (err) {

        console.warn('Clarity load failed:', err.message);

      }

    }, 3000);

    return () => clearTimeout(timer);

  }, []);

}

/**

 * useMetaPixel — Meta Pixel already loads in index.html.

 * This hook fires custom events and page tracking after pageview.

 */

export function useMetaPixel(trackPageView = true) {

  useEffect(() => {

    // Meta Pixel is already initialized in index.html

    // Additional tracking can happen here

    if (trackPageView && window.fbq) {

      // PageView is already fired in index.html, but can fire again if needed

      window.fbq('track', 'ViewContent');

    }

  }, [trackPageView]);

}

/**

 * useGoogleAnalytics — Deferred GA4 page view tracking.

 * Fires after first meaningful paint.

 */

export function useGoogleAnalytics(pagePath, pageTitle) {

  useEffect(() => {

    const timer = setTimeout(() => {

      if (window.gtag) {

        window.gtag('event', 'page_view', {

          page_path: pagePath || window.location.pathname,

          page_title: pageTitle || document.title,

          send_to: 'G-YZEQCX26X2'

        });

      }

    }, 2500);

    return () => clearTimeout(timer);

  }, [pagePath, pageTitle]);

}

/**

 * useTrustedForm — Defers TrustedForm script until 1.5s after mount.

 * Only needed on GetOffer page. Polls for cert URL and returns it via callback.

 */

export function useTrustedForm(onCertReady) {

  useEffect(() => {

    if (document.getElementById('trustedform-script')) {

      // Already loaded — poll for existing cert

      const existing = document.querySelector('input[name="xxTrustedFormCertUrl"]');

      if (existing?.value && onCertReady) onCertReady(existing.value);

      return;

    }

    const timer = setTimeout(() => {

      const tf = document.createElement('script');

      tf.id = 'trustedform-script';

      tf.type = 'text/javascript';

      tf.async = true;

      tf.src = (document.location.protocol === 'https:' ? 'https' : 'http') +

        '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +

        new Date().getTime() + Math.random();

      const firstScript = document.getElementsByTagName('script')[0];

      if (firstScript?.parentNode) {

        firstScript.parentNode.insertBefore(tf, firstScript);

      } else {

        document.head.appendChild(tf);

      }

      // Poll for cert URL

      if (onCertReady) {

        const poll = setInterval(() => {

          const el = document.querySelector('input[name="xxTrustedFormCertUrl"]');

          if (el?.value) {

            onCertReady(el.value);

            clearInterval(poll);

          }

        }, 500);

        setTimeout(() => clearInterval(poll), 30000);

      }

    }, 1500);

    return () => clearTimeout(timer);

  }, []);

}
