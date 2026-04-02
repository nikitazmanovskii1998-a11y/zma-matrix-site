import Link from "next/link";
import type { ServiceNavLinkResolved } from "@/lib/service-nav-links";

export type ServicesNavPanelBodyProps = {
  servicesPanelLabel: string;
  links: ServiceNavLinkResolved[];
  servicesHubHref: string;
  allServicesLabel: string;
  onLinkClick?: () => void;
  pathname?: string | null;
  /** e.g. `services-panel__inner--hero` — stacked with `services-panel__inner` */
  innerExtraClassName?: string;
};

/**
 * Inner UI of “Навигация по услугам”: label, card links, hub — shared by header flyout and hero rail.
 */
export function ServicesNavPanelBody({
  servicesPanelLabel,
  links,
  servicesHubHref,
  allServicesLabel,
  onLinkClick,
  pathname,
  innerExtraClassName = "",
}: ServicesNavPanelBodyProps) {
  return (
    <div className={["services-panel__inner", innerExtraClassName].filter(Boolean).join(" ")}>
      <div className="mb-3 text-[0.7rem] uppercase tracking-[0.16em] text-text-muted-soft">
        {servicesPanelLabel}
      </div>
      <div className="grid gap-2">
        {links.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            onClick={onLinkClick}
            className={["services-panel__item", pathname === item.href ? "is-active" : ""].filter(Boolean).join(" ")}
          >
            <span className="block text-sm font-semibold text-text-primary-soft">{item.title}</span>
            <span className="mt-1 block text-xs leading-5 text-text-muted-soft">{item.summary}</span>
          </Link>
        ))}
      </div>
      <Link href={servicesHubHref} onClick={onLinkClick} className="services-panel__hub-link mt-3 inline-flex">
        {allServicesLabel}
      </Link>
    </div>
  );
}
