"use client";

import { useEffect, useMemo, useState } from "react";

type PreloaderProps = {
  lines: {
    entering: string;
    stabilizing: string;
  };
};

export function Preloader({ lines }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0);

  const symbols = useMemo(() => ["0", "1", "A", "F", "7", "Σ", "X"], []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = mediaQuery.matches;
    const holdMs = reduced ? 240 : 1350;

    const phaseTick = window.setInterval(() => {
      setPhase((prev) => (prev + 1) % symbols.length);
    }, reduced ? 180 : 90);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, holdMs);

    return () => {
      window.clearInterval(phaseTick);
      window.clearTimeout(hideTimer);
    };
  }, [symbols.length]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="surface-block w-[min(34rem,92vw)] p-6 md:p-8">
        <div className="mb-4 flex gap-2 text-lg text-neon-line">
          {symbols.map((symbol, index) => (
            <span
              key={`${symbol}-${index}`}
              className={index === phase ? "opacity-100" : "opacity-35"}
            >
              {symbol}
            </span>
          ))}
        </div>
        <p className="text-sm uppercase tracking-[0.22em] text-neon-line">
          {lines.entering}
        </p>
        <p className="mt-2 text-sm text-text-secondary">{lines.stabilizing}</p>
      </div>
    </div>
  );
}
