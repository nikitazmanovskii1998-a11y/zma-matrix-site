export const serviceSlugs = [
  "websites",
  "telegram-bots",
  "telegram-assistants",
  "automation",
  "seo",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const serviceSlugByIndex: ServiceSlug[] = [...serviceSlugs];

export function isServiceSlug(value: string): value is ServiceSlug {
  return serviceSlugs.includes(value as ServiceSlug);
}
