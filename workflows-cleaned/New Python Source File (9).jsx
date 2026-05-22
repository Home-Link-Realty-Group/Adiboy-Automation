import { useEffect, useRef, useState } from 'react';

/**
 * LazySection — Defers rendering of below-fold content until it enters viewport.
 * Eliminates LCP penalty from off-screen React component trees.
 *
 * Usage:
 *   <LazySection minHeight={200}>
 *     <HeavyComponent />
 *   </LazySection>
 */
export default function LazySection({ children, threshold = 0.05, minHeight = 300, rootMargin = "200px 0px" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    // If browser doesn't support IntersectionObserver, just show content
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref}>
      {isVisible ? children : <div style={{ minHeight }} aria-hidden="true" />}
    </div>
  );
}
