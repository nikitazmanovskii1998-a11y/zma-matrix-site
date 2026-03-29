import { RouteContent } from "@/components/content/route-content";

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return <RouteContent pageKey="home" params={params} />;
}
