import { RouteContent } from "@/components/content/route-content";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return <RouteContent pageKey="projects" params={params} />;
}
