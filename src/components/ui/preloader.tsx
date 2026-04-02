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
  const [exiting, setExiting] = useState(false);
  const [phase, setPhase] = useState(0);

  const symbols = useMemo(() => ["0", "1", "A", "F", "7", "Σ", "X"], []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = mediaQuery.matches;
    const holdMs = reduced ? 240 : 1180;
    const outMs = reduced ? 140 : 360;

    const phaseTick = window.setInterval(() => {
      setPhase((prev) => (prev + 1) % symbols.length);
    }, reduced ? 180 : 90);

    const hideTimer = window.setTimeout(() => {
      setExiting(true);

      window.setTimeout(() => {
        window.dispatchEvent(new Event("zma:boot-complete"));
        setVisible(false);
      }, outMs);
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
    <div
      className={[
        "fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.26)] backdrop-blur-[1px] transition-opacity duration-[380ms]",
        exiting ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div className="w-[min(34rem,92vw)] rounded-[18px] border border-[rgba(95,255,164,0.34)] bg-[linear-gradient(180deg,rgba(12,24,16,0.88),rgba(9,18,13,0.9))] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(195,255,216,0.07)] md:p-8">
        <div className="mb-4 flex gap-2 text-lg text-[#69ff9e]">
          {symbols.map((symbol, index) => (
            <span
              key={`${symbol}-${index}`}
              className={index === phase ? "opacity-100" : "opacity-35"}
            >
              {symbol}
            </span>
          ))}
        </div>
        <p className="text-sm uppercase tracking-[0.22em] text-[#69ff9e]">
          {lines.entering}
        </p>
        <p className="mt-2 text-sm text-[rgba(214,235,223,0.88)]">{lines.stabilizing}</p>
      </div>
    </div>
  );
}
