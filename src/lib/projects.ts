import projectsData from "@/../content/projects/projects.json";

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
}

const projects: Project[] = projectsData as Project[];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectsBySection(section: string): Project[] {
  return projects.filter((p) => p.section === section);
}

export function getProjectBySlug(section: string, slug: string): Project | undefined {
  return projects.find((p) => p.section === section && p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getSections() {
  return [
    { slug: "residencial", title: "Residencial", description: "Casas e apartamentos que contam hist\u00f3rias." },
    { slug: "comercial", title: "Comercial", description: "Espa\u00e7os que transformam neg\u00f3cios." },
    { slug: "interiores", title: "Interiores", description: "Ambientes que refletem quem voc\u00ea \u00e9." },
  ];
}
