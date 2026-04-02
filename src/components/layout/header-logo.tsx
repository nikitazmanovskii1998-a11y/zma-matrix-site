"use client";

import { useCallback, useState } from "react";
import { BRAND_LOGO } from "@/lib/brand-logo";

const SRC_SVG = BRAND_LOGO.srcSvg;
const SRC_PNG = BRAND_LOGO.srcPngFallback;
const NATURAL_W = BRAND_LOGO.width;
const NATURAL_H = BRAND_LOGO.height;

type HeaderLogoProps = {
  className?: string;
};

/**
 * Header wordmark: SVG first; if the browser fails to render it, fall back to PNG once.
 */
export function HeaderLogo({ className }: HeaderLogoProps) {
  const [src, setSrc] = useState<string>(SRC_SVG);
  const onError = useCallback(() => {
    setSrc((prev) => (prev === SRC_SVG ? SRC_PNG : prev));
  }, []);

  return (
    <img
      src={src}
      alt="ZMA Resulting"
      width={NATURAL_W}
      height={NATURAL_H}
      className={className}
      onError={onError}
      decoding="async"
      loading="eager"
    />
  );
}
