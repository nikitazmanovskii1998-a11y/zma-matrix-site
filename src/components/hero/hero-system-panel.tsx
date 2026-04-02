type HeroSystemPanelProps = {
  panelModules: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
};

export function HeroSystemPanel({ panelModules }: HeroSystemPanelProps) {
  return (
    <aside className="panel-surface relative overflow-hidden p-6 md:p-9">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(114,229,255,0.03)_0px,rgba(114,229,255,0)_1px)] bg-[size:100%_18px]" />

      <div className="relative z-10 grid h-full content-start gap-4 md:gap-5">
        {panelModules.map((row, index) => (
          <div
            key={`${row.label}-${index}`}
            className="card-surface rounded px-5 py-5 md:px-6 md:py-6"
          >
            <div>
              <div className="text-[11px] tracking-[0.14em] text-text-secondary">
                {row.label}
              </div>
              <div className="mt-3 text-[1.05rem] leading-7 text-text-primary md:text-[1.18rem]">
                {row.value}
              </div>
            </div>
            <div className="mt-3 border-t border-[rgba(114,229,255,0.18)] pt-3 text-[0.98rem] leading-7 text-text-secondary">
              {row.detail}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
