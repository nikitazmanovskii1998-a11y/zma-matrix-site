"use client";

import { useEffect, useRef } from "react";

const PRIMARY_SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SECONDARY_SYMBOLS =
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ";
const TECH_SYMBOLS = "+-*/=<>{}[]()|:;.";

type MatrixConfig = {
  fontSize: number;
  columnWidth: number;
  trailFade: number;
  minTailLength: number;
  maxTailLength: number;
  minSpeed: number;
  maxSpeed: number;
  mutationRate: number;
};

type Column = {
  x: number;
  headRow: number;
  speed: number;
  tailLength: number;
  chars: string[];
};

const MATRIX_TUNING: { desktop: MatrixConfig; mobile: MatrixConfig } = {
  desktop: {
    fontSize: 18,
    columnWidth: 18,
    trailFade: 0.18,
    minTailLength: 8,
    maxTailLength: 18,
    minSpeed: 7,
    maxSpeed: 14,
    mutationRate: 0.05,
  },
  mobile: {
    fontSize: 15,
    columnWidth: 14,
    trailFade: 0.22,
    minTailLength: 6,
    maxTailLength: 12,
    minSpeed: 6,
    maxSpeed: 11,
    mutationRate: 0.04,
  },
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function getWeightedSymbol() {
  const roll = Math.random();
  if (roll < 0.55) {
    return PRIMARY_SYMBOLS[Math.floor(Math.random() * PRIMARY_SYMBOLS.length)];
  }
  if (roll < 0.85) {
    return SECONDARY_SYMBOLS[Math.floor(Math.random() * SECONDARY_SYMBOLS.length)];
  }
  return TECH_SYMBOLS[Math.floor(Math.random() * TECH_SYMBOLS.length)];
}

const createChars = (rows: number) =>
  Array.from({ length: rows }, () => getWeightedSymbol());

const randomTailLength = (config: MatrixConfig) =>
  Math.floor(rand(config.minTailLength, config.maxTailLength + 1));

const randomSpeed = (config: MatrixConfig) => rand(config.minSpeed, config.maxSpeed);

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let frameId = 0;
    let reducedMotion = mediaQuery.matches;
    let columns: Column[] = [];
    let rowCount = 0;
    let config: MatrixConfig = MATRIX_TUNING.desktop;
    let lastTime = 0;

    const getConfig = (): MatrixConfig =>
      window.innerWidth < 768 ? MATRIX_TUNING.mobile : MATRIX_TUNING.desktop;

    const drawStaticReduced = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${config.fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";

      for (const column of columns) {
        for (let row = 0; row < rowCount; row += 1) {
          if (Math.random() < 0.1) {
            ctx.fillStyle = "rgba(55, 255, 136, 0.18)";
            ctx.fillText(column.chars[row], column.x, row * config.fontSize);
          }
        }
      }
    };

    const initialize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      config = getConfig();
      rowCount = Math.max(1, Math.ceil(height / config.fontSize));
      const columnCount = Math.max(1, Math.ceil(width / config.columnWidth));

      columns = Array.from({ length: columnCount }, (_, index) => ({
        x: index * config.columnWidth,
        headRow: rand(-rowCount, rowCount),
        speed: randomSpeed(config),
        tailLength: randomTailLength(config),
        chars: createChars(rowCount),
      }));

      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, width, height);

      if (reducedMotion) {
        drawStaticReduced();
      }
    };

    const drawColumn = (column: Column) => {
      const head = Math.floor(column.headRow);
      for (let distance = 0; distance < column.tailLength; distance += 1) {
        const row = head - distance;
        if (row < 0 || row >= rowCount) continue;

        const y = row * config.fontSize;
        if (distance === 0) {
          ctx.fillStyle = "rgba(170, 255, 210, 0.92)";
        } else {
          const t = 1 - distance / column.tailLength;
          const alpha = 0.06 + t * t * 0.5;
          ctx.fillStyle = `rgba(55, 255, 136, ${alpha})`;
        }

        ctx.fillText(column.chars[row], column.x, y);
      }
    };

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000 || 0.016);
      lastTime = now;

      ctx.fillStyle = `rgba(0, 0, 0, ${config.trailFade})`;
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${config.fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";

      for (const column of columns) {
        if (Math.random() < config.mutationRate) {
          const mutateIndex = Math.floor(Math.random() * rowCount);
          column.chars[mutateIndex] = getWeightedSymbol();
        }

        column.headRow += column.speed * dt;
        if (column.headRow - column.tailLength > rowCount) {
          column.headRow = -rand(4, rowCount * 0.9);
          column.speed = randomSpeed(config);
          column.tailLength = randomTailLength(config);

          if (Math.random() < 0.7) {
            column.chars = createChars(rowCount);
          }
        }

        drawColumn(column);
      }

      frameId = window.requestAnimationFrame(step);
    };

    const onResize = () => {
      initialize();
      if (!reducedMotion && frameId === 0) {
        lastTime = performance.now();
        frameId = window.requestAnimationFrame(step);
      }
    };

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }

      initialize();
      if (!reducedMotion) {
        lastTime = performance.now();
        frameId = window.requestAnimationFrame(step);
      }
    };

    initialize();
    if (!reducedMotion) {
      lastTime = performance.now();
      frameId = window.requestAnimationFrame(step);
    }

    window.addEventListener("resize", onResize);
    mediaQuery.addEventListener("change", onMotionChange);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
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
