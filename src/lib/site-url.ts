/** Public site origin for metadata / OG / sitemap (no trailing slash). */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    return "https://zmaresulting.ru";
  }
  return "http://localhost:3000";
}
