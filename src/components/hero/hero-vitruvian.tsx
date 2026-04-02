"use client";

type HeroVitruvianProps = {
  figureLabel: string;
  coordsLabel: string;
};

export function HeroVitruvian({ figureLabel, coordsLabel }: HeroVitruvianProps) {
  return (
    <div className="panel-surface relative overflow-hidden p-4 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(114,229,255,0.06)_0px,rgba(114,229,255,0.0)_1px)] bg-[size:100%_14px]" />

      <div className="mb-4 flex items-center justify-between text-[10px] tracking-[0.22em] text-text-secondary">
        <span>{figureLabel}</span>
        <span>{coordsLabel}</span>
      </div>

      <div className="card-surface relative mx-auto aspect-square w-full max-w-[32rem] border border-neon-line/25">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          role="img"
          aria-label={figureLabel}
        >
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <g stroke="rgba(55,255,136,0.2)" strokeWidth="0.24">
              <line x1="10" y1="20" x2="90" y2="20" />
              <line x1="10" y1="35" x2="90" y2="35" />
              <line x1="10" y1="50" x2="90" y2="50" />
              <line x1="10" y1="65" x2="90" y2="65" />
              <line x1="10" y1="80" x2="90" y2="80" />
              <line x1="20" y1="10" x2="20" y2="90" />
              <line x1="35" y1="10" x2="35" y2="90" />
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="65" y1="10" x2="65" y2="90" />
              <line x1="80" y1="10" x2="80" y2="90" />
            </g>

            <g stroke="rgba(55,255,136,0.34)" strokeWidth="0.34">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="15" y1="50" x2="85" y2="50" />
              <line x1="15" y1="33" x2="85" y2="33" />
              <line x1="15" y1="67" x2="85" y2="67" />
            </g>

            <g className="origin-center motion-safe:animate-[spin_80s_linear_infinite] motion-reduce:animate-none">
              <circle
                cx="50"
                cy="50"
                r="39"
                stroke="rgba(55,255,136,0.46)"
                strokeWidth="0.58"
              />
              <path
                d="M50 11 A39 39 0 0 1 89 50"
                stroke="rgba(220,255,235,0.54)"
                strokeWidth="0.48"
                strokeDasharray="2 1.9"
              />
              <path
                d="M50 89 A39 39 0 0 1 11 50"
                stroke="rgba(55,255,136,0.4)"
                strokeWidth="0.4"
                strokeDasharray="1.4 2.4"
              />
            </g>

            <rect
              x="15"
              y="15"
              width="70"
              height="70"
              stroke="rgba(55,255,136,0.56)"
              strokeWidth="0.62"
            />

            <g stroke="rgba(220,255,235,0.78)" strokeWidth="0.44">
              <line x1="15" y1="15" x2="17.6" y2="15" />
              <line x1="15" y1="15" x2="15" y2="17.6" />
              <line x1="85" y1="15" x2="82.4" y2="15" />
              <line x1="85" y1="15" x2="85" y2="17.6" />
              <line x1="15" y1="85" x2="17.6" y2="85" />
              <line x1="15" y1="85" x2="15" y2="82.4" />
              <line x1="85" y1="85" x2="82.4" y2="85" />
              <line x1="85" y1="85" x2="85" y2="82.4" />
            </g>

            <g stroke="rgba(55,255,136,0.78)" strokeWidth="0.5">
              <circle cx="50" cy="26.8" r="4.9" />
              <path d="M46.9 23.4 Q50 22.1 53.1 23.4" />
              <path d="M48.2 28.7 Q50 29.8 51.8 28.7" />
              <path d="M45.2 36.7 Q50 34.6 54.8 36.7" />
              <path d="M44.6 36.7 Q43.8 41.3 45.4 56.8 Q50 61.6 54.6 56.8 Q56.2 41.3 55.4 36.7" />
              <path d="M47.6 56.6 Q47.2 65 46.8 74.2" />
              <path d="M52.4 56.6 Q52.8 65 53.2 74.2" />
              <path d="M47.3 74.2 Q48.4 77 49 80" />
              <path d="M52.7 74.2 Q51.6 77 51 80" />
              <ellipse cx="50" cy="56.4" rx="4.2" ry="1.7" />
            </g>

            <g stroke="rgba(55,255,136,0.56)" strokeWidth="0.48">
              <path d="M45.3 40.6 L34.4 40.8 L24.2 41.3" />
              <path d="M54.7 40.6 L65.6 40.8 L75.8 41.3" />
              <path d="M45.5 40.6 L39.3 34.4 L31.7 28" />
              <path d="M54.5 40.6 L60.7 34.4 L68.3 28" />
              <path d="M24.2 41.3 L20.5 41.3" />
              <path d="M75.8 41.3 L79.5 41.3" />
              <path d="M31.7 28 L28.9 25.8" />
              <path d="M68.3 28 L71.1 25.8" />
              <path d="M48.2 57 L42.3 66.8 L40.3 77.2" />
              <path d="M51.8 57 L57.7 66.8 L59.7 77.2" />
              <path d="M48.2 57 L40.3 64.5 L33.8 74.4" />
              <path d="M51.8 57 L59.7 64.5 L66.2 74.4" />
              <path d="M40.3 77.2 L38.3 79.7" />
              <path d="M59.7 77.2 L61.7 79.7" />
              <path d="M33.8 74.4 L30.5 75.3" />
              <path d="M66.2 74.4 L69.5 75.3" />
            </g>

            <g fill="rgba(220,255,235,0.8)" stroke="none">
              <circle cx="50" cy="31.8" r="0.62" />
              <circle cx="45.3" cy="40.6" r="0.58" />
              <circle cx="54.7" cy="40.6" r="0.58" />
              <circle cx="47.9" cy="56.9" r="0.6" />
              <circle cx="52.1" cy="56.9" r="0.6" />
              <circle cx="24.2" cy="41.3" r="0.54" />
              <circle cx="75.8" cy="41.3" r="0.54" />
              <circle cx="31.7" cy="28" r="0.54" />
              <circle cx="68.3" cy="28" r="0.54" />
              <circle cx="40.3" cy="77.2" r="0.54" />
              <circle cx="59.7" cy="77.2" r="0.54" />
              <circle cx="33.8" cy="74.4" r="0.54" />
              <circle cx="66.2" cy="74.4" r="0.54" />
            </g>

            <g
              className="motion-safe:animate-[pulse_7.5s_ease-in-out_infinite] motion-reduce:opacity-30"
              fill="rgba(155,255,205,0.24)"
              stroke="none"
            >
              <rect x="49.5" y="12.4" width="0.8" height="0.8" />
              <rect x="87.9" y="49.3" width="0.8" height="0.8" />
              <rect x="49.2" y="87.1" width="0.8" height="0.8" />
              <rect x="12.1" y="49.7" width="0.8" height="0.8" />
              <rect x="31.2" y="27.3" width="0.7" height="0.7" />
              <rect x="68.4" y="27.3" width="0.7" height="0.7" />
              <rect x="33.1" y="73.2" width="0.7" height="0.7" />
              <rect x="66.2" y="73.2" width="0.7" height="0.7" />
            </g>

            <g stroke="rgba(55,255,136,0.42)" strokeWidth="0.34">
              <line x1="50" y1="15" x2="50" y2="13.8" />
              <line x1="50" y1="85" x2="50" y2="86.2" />
              <line x1="15" y1="50" x2="13.8" y2="50" />
              <line x1="85" y1="50" x2="86.2" y2="50" />
            </g>
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-[1px] bg-neon-line/20 opacity-60 motion-safe:animate-[pulse_5s_ease-in-out_infinite] motion-reduce:hidden" />
      </div>
    </div>
  );
}
