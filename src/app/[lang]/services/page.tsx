import { RouteContent } from "@/components/content/route-content";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return <RouteContent pageKey="services" params={params} />;
}
