import { RouteContent } from "@/components/content/route-content";

export default async function ApproachPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return <RouteContent pageKey="approach" params={params} />;
}
