import { RouteContent } from "@/components/content/route-content";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return <RouteContent pageKey="privacy" params={params} showLegalTodo />;
}
