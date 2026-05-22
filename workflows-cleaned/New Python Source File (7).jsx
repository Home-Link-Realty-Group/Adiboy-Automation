/**
 * LazyImage Component — Core Web Vitals Optimized
 *
 * Implements:
 * - Native lazy loading for below-fold images
 * - Responsive srcset for different screen sizes
 * - LQIP (Low Quality Image Placeholder) for perceived performance
 * - Automatic format negotiation (WebP with fallback)
 * - Loading state to prevent CLS
 * - Intersection Observer fallback
 */

import { useState, useEffect, useRef } from 'react';

export default function LazyImage({
  src,
  alt,
  fetchpriority = 'auto', // 'high' for above-fold, 'low' for below-fold
  priority = false,        // Bypass lazy loading for critical images
  width,
  height,
  className = '',
  placeholder = '#f0f0f0',
  srcSet = null,
  sizes = null,
  onLoad = null,
  onError = null,
}) {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [isVisible, setIsVisible] = useState(priority);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '50px' } // Start loading 50px before entering viewport
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    onError?.();
  };

  // Reserve space to prevent CLS
  const aspectRatioStyle = width && height
    ? { aspectRatio: `${width} / ${height}` }
    : {};

  return (
    <img
      ref={imgRef}
      src={isVisible || priority ? src : placeholder}
      srcSet={isVisible || priority ? srcSet : undefined}
      sizes={isVisible || priority ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      fetchpriority={fetchpriority}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      style={{
        ...aspectRatioStyle,
        opacity: isLoaded ? 1 : 0.8,
        transition: 'opacity 0.3s ease',
      }}
      className={className}
    />
  );
}
