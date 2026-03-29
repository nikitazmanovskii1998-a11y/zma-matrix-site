import { RouteContent } from "@/components/content/route-content";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return <RouteContent pageKey="contact" params={params} />;
}
