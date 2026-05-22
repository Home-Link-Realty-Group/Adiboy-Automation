/**
 * OptimizedImage — Fortune 500-grade image component
 *
 * Now with automatic image polish:
 *  - Strips EXIF / metadata
 *  - Lossy compression (q=75 default, q=82 for priority)
 *  - Auto-format (WebP / AVIF)
 *  - Right-sized for actual render width
 *  - Responsive srcSet automatically generated
 *
 * Plus the existing CWV best practices:
 *  - Native lazy / eager loading with fetchpriority hint
 *  - Explicit width + height to prevent CLS
 *  - decoding="async"
 *  - Descriptive, keyword-rich alt text (required)
 *
 * Usage:
 *   <OptimizedImage
 *     src="/images/logo.png"
 *     alt="Home-Link Realty Group — Cash Home Buyers"
 *     width={240}
 *     height={72}
 *     priority   // above-fold: q=82, fetchpriority="high", loading="eager"
 *   />
 */

import { polishImageUrl, polishedSrcSet } from "@/lib/imageCompression";

export default function OptimizedImage({
  src,
  webpSrc,
  alt,                      // REQUIRED — never pass empty string for content images
  width,
  height,
  priority = false,         // true = LCP / above-fold image
  lazy,                     // explicit override; defaults to !priority
  sizes,                    // responsive sizes hint e.g. "(max-width: 768px) 100vw, 50vw"
  srcSet,                   // optional explicit override
  quality,                  // override default compression quality
  noPolish = false,         // escape hatch — skip URL transformation
  style = {},
  className = "",
  onError,
  ...props
}) {
  if (alt === undefined || alt === null) {
    console.warn("[OptimizedImage] Missing alt prop on image:", src);
  }

  const isLazy   = lazy !== undefined ? lazy : !priority;
  const loading  = isLazy ? "lazy" : "eager";
  const fetchpri = priority ? "high" : (isLazy ? "low" : "auto");

  // Auto-polish the source URL (compress, strip metadata, auto-format)
  const polishedSrc = noPolish
    ? src
    : polishImageUrl(src, { width, quality, priority });

  // Auto-generate responsive srcSet if width is known and one wasn't supplied
  const finalSrcSet = srcSet ?? (
    !noPolish && width && width >= 400
      ? polishedSrcSet(src, [
          Math.round(width * 0.5),
          width,
          Math.round(width * 1.5),
          width * 2,
        ].filter(w => w >= 200), { quality, priority })
      : undefined
  );

  const finalSizes = sizes ?? (width ? `${width}px` : undefined);

  const imgProps = {
    src: polishedSrc,
    alt: alt || "",
    loading,
    decoding: "async",
    fetchpriority: fetchpri,
    width,
    height,
    style: {
      maxWidth: "100%",
      height: "auto",
      display: "block",
      ...style,
    },
    className,
    onError: onError || (e => { e.target.style.display = "none"; }),
    ...(finalSrcSet ? { srcSet: finalSrcSet } : {}),
    ...(finalSizes  ? { sizes: finalSizes  } : {}),
    ...props,
  };

  if (webpSrc) {
    return (
      <picture>
        <source
          srcSet={noPolish ? webpSrc : polishImageUrl(webpSrc, { width, quality, priority })}
          type="image/webp"
          {...(finalSizes ? { sizes: finalSizes } : {})}
        />
        <img {...imgProps} />
      </picture>
    );
  }

  return <img {...imgProps} />;
}
