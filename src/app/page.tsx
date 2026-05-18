import { getAllProjects, getFeaturedProjects } from "@/lib/projects";
import { resolveLang } from "@/lib/i18n";
import { HomePanel } from "@/components/home-panel";

export default function Home({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const featured = getFeaturedProjects();
  const projects = [
    ...featured,
    ...getAllProjects().filter((project) => !project.featured),
  ].slice(0, 16);
  const lang = resolveLang(searchParams?.lang);

  return <HomePanel projects={projects} lang={lang} />;
}
