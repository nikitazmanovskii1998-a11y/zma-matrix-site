import { RouteContent } from "@/components/content/route-content";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return <RouteContent pageKey="about" params={params} />;
}
