"use client";

import { useEffect, useRef } from "react";

const SYMBOLS = "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const MATRIX_TUNING = {
  desktop: {
    density: 1,
    speedMs: 52,
    fontSize: 16,
    glowBlur: 8,
    trailOpacity: 0.08,
  },
  mobile: {
    density: 0.72,
    speedMs: 70,
    fontSize: 13,
    glowBlur: 6,
    trailOpacity: 0.11,
  },
};

type Drop = { y: number };

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = mediaQuery.matches;
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastFrame = 0;
    let drops: Drop[] = [];

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      initialize();
    };

    const tuneForViewport = () => {
      const isMobile = window.innerWidth < 768;
      return isMobile ? MATRIX_TUNING.mobile : MATRIX_TUNING.desktop;
    };

    const initialize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const settings = tuneForViewport();
      const effectiveFont = Math.max(10, Math.floor(settings.fontSize / settings.density));
      const columns = Math.max(12, Math.floor(width / effectiveFont));
      drops = Array.from({ length: columns }, () => ({
        y: Math.random() * height,
      }));

      ctx.clearRect(0, 0, width, height);
      if (reducedMotion) {
        drawReduced(settings, effectiveFont);
      }
    };

    const drawReduced = (
      settings: (typeof MATRIX_TUNING)["desktop"],
      fontSize: number,
    ) => {
      ctx.fillStyle = "rgba(3,6,4,0.95)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.fillStyle = "rgba(55,255,136,0.25)";
      const stepX = fontSize * 1.8;
      const stepY = fontSize * 2;
      for (let x = 0; x < width; x += stepX) {
        for (let y = 0; y < height; y += stepY) {
          if (Math.random() > 0.9) {
            const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
            ctx.fillText(symbol, x, y);
          }
        }
      }
      ctx.shadowBlur = settings.glowBlur;
      ctx.shadowColor = "rgba(55,255,136,0.15)";
    };

    const drawAnimated = (now: number) => {
      const settings = tuneForViewport();
      if (now - lastFrame < settings.speedMs) {
        frameId = requestAnimationFrame(drawAnimated);
        return;
      }
      lastFrame = now;

      const fontSize = settings.fontSize;
      ctx.fillStyle = `rgba(3, 6, 4, ${settings.trailOpacity})`;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.shadowBlur = settings.glowBlur;
      ctx.shadowColor = "rgba(55,255,136,0.45)";

      drops.forEach((drop, column) => {
        const x = column * fontSize;
        const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        const alpha = Math.random() * 0.35 + 0.45;
        ctx.fillStyle = `rgba(55,255,136,${alpha})`;
        ctx.fillText(symbol, x, drop.y);

        drop.y += fontSize;
        if (drop.y > height + Math.random() * 200) {
          drop.y = -Math.random() * 300;
        }
      });

      frameId = requestAnimationFrame(drawAnimated);
    };

    const onResize = () => initialize();
    initialize();

    if (!reducedMotion) {
      frameId = requestAnimationFrame(drawAnimated);
    }

    window.addEventListener("resize", onResize);
    mediaQuery.addEventListener("change", onMotionChange);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("resize", onResize);
      mediaQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
