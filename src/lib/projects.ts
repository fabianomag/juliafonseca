import projectsData from "@/../content/projects/projects.json";

export type ProjectStatus = "completed" | "in_progress";

export interface Project {
  slug: string;
  title: string;
  section: "residencial" | "comercial" | "interiores";
  category: string;
  year: string;
  location: string;
  area: string;
  cover: string;
  images: string[];
  description: string;
  featured: boolean;
  status: ProjectStatus;
}

const projects: Project[] = (projectsData as any[]).map((p) => ({
  ...p,
  cover: p.cover || p.images?.[0] || "",
  status: p.status || "completed",
}));

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectsBySection(section: string): Project[] {
  return projects.filter((p) => p.section === section);
}

export function getRelatedProjects(section: string, slug: string): Project[] {
  const currentSection = projects.filter(
    (p) => p.section === section && !(p.section === section && p.slug === slug)
  );

  const otherSections = projects.filter(
    (p) => p.section !== section && !(p.section === section && p.slug === slug)
  );

  return [...currentSection, ...otherSections];
}

export function getProjectBySlug(section: string, slug: string): Project | undefined {
  return projects.find((p) => p.section === section && p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getFilteredProjects(
  section?: string | null,
  status?: ProjectStatus | null
): Project[] {
  return projects.filter((p) => {
    if (section && p.section !== section) return false;
    if (status && p.status !== status) return false;
    return true;
  });
}

export function getSections() {
  return [
    { slug: "residencial", title: "Residencial", description: "Casas e apartamentos que contam historias." },
    { slug: "comercial", title: "Comercial", description: "Espacos que transformam negocios." },
    { slug: "interiores", title: "Interiores", description: "Ambientes que refletem quem voce e." },
  ];
}
