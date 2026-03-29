import { RouteContent } from "@/components/content/route-content";

export default async function OfferPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return <RouteContent pageKey="offer" params={params} showLegalTodo />;
}
