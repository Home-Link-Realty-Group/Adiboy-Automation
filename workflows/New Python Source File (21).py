import { base44 } from '@/api/base44Client';

// Initialize visitor journey tracking
export function initializeJourneyTracking(city, state, landingPage, contentVariantId) {
  const sessionId = generateSessionId();
  const startTime = Date.now();
  let maxScrollDepth = 0;
  let isFormStarted = false;

  // Track scroll depth
  window.addEventListener('scroll', throttle(() => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    maxScrollDepth = Math.max(maxScrollDepth, Math.min(100, scrollPercent));
  }, 1000));

  // Track clicks on elements
  document.addEventListener('click', (e) => {
    const clickElement = e.target.closest('[data-track-click]');
    if (clickElement) {
      const elementName = clickElement.getAttribute('data-track-click');
      trackEvent('click', { element: elementName }, sessionId, city, state, landingPage, contentVariantId);
    }

    // Detect form start
    const formElement = e.target.closest('form');
    if (formElement && !isFormStarted) {
      isFormStarted = true;
      trackEvent('form_start', {}, sessionId, city, state, landingPage, contentVariantId);
    }
  });

  // Track page exit
  window.addEventListener('beforeunload', () => {
    const timeOnSite = Math.round((Date.now() - startTime) / 1000);
    trackEvent('exit', {
      time_on_site_seconds: timeOnSite,
      exit_url: window.location.href,
      scroll_percent: maxScrollDepth,
    }, sessionId, city, state, landingPage, contentVariantId);
  });

  // Expose form submission hook
  window.trackFormSubmission = function(leadId, conversionValue = 20000) {
    const timeOnSite = Math.round((Date.now() - startTime) / 1000);
    trackEvent('lead_submitted', {
      lead_id: leadId,
      conversion_value: conversionValue,
      time_on_site_seconds: timeOnSite,
      scroll_percent: maxScrollDepth,
    }, sessionId, city, state, landingPage, contentVariantId);
  };

  // Track page entry
  trackEvent('entry', {
    device_type: getDeviceType(),
    browser: getBrowserName(),
    utm_source: getUTMParam('source') || 'direct',
    utm_campaign: getUTMParam('campaign') || '',
  }, sessionId, city, state, landingPage, contentVariantId);

  // Periodic scroll tracking every 5 seconds
  setInterval(() => {
    const timeOnSite = Math.round((Date.now() - startTime) / 1000);
    trackEvent('scroll', {
      scroll_percent: maxScrollDepth,
      time_on_site_seconds: timeOnSite,
    }, sessionId, city, state, landingPage, contentVariantId);
  }, 5000);
}

async function trackEvent(eventType, eventData, sessionId, city, state, landingPage, contentVariantId) {
  try {
    await base44.functions.invoke('trackVisitorJourney', {
      session_id: sessionId,
      city,
      state,
      landing_page: landingPage,
      content_variant_id: contentVariantId,
      event_type: eventType,
      event_data: eventData,
    });
  } catch (error) {
    console.warn('Journey tracking failed:', error);
  }
}

function generateSessionId() {
  // Check for existing session in sessionStorage
  let sessionId = sessionStorage.getItem('journey_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('journey_session_id', sessionId);
  }
  return sessionId;
}

function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function getBrowserName() {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'Other';
}

function getUTMParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(`utm_${param}`);
}
