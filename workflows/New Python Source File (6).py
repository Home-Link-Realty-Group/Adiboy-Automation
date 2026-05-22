import { useEffect } from 'react';
import { initializeJourneyTracking } from '@/lib/journeyTracker';

// Wrapper component to enable journey tracking on any page
export function JourneyTrackerProvider({ city, state, pageRoute, contentVariantId }) {
  useEffect(() => {
    if (city && state && pageRoute && contentVariantId) {
      initializeJourneyTracking(city, state, pageRoute, contentVariantId);
    }
  }, [city, state, pageRoute, contentVariantId]);

  return null;
}

export default JourneyTrackerProvider;
