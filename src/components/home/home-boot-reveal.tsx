"use client";

import { useEffect, useState } from "react";

type HomeBootRevealProps = {
  children: React.ReactNode;
};

export function HomeBootReveal({ children }: HomeBootRevealProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onBootComplete = () => setReady(true);
    window.addEventListener("zma:boot-complete", onBootComplete);

    const fallback = window.setTimeout(() => setReady(true), 1700);

    return () => {
      window.removeEventListener("zma:boot-complete", onBootComplete);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div className={["hero-boot-reveal w-full min-w-0", ready ? "is-ready" : ""].join(" ")}>
      {children}
    </div>
  );
}
