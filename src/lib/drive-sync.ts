/**
 * Drive Sync — Build-time script that pulls from Google Drive
 * and updates content/projects/projects.json with real project data.
 *
 * Usage: npx tsx scripts/sync-drive.ts
 *
 * What it does:
 * 1. Scans Google Drive folder structure
 * 2. Merges Drive data with existing projects.json (preserves manual edits)
 * 3. Writes updated projects.json + drive-manifest.json
 *
 * Merge strategy:
 * - If a project exists in Drive AND projects.json → merge (Drive images win, manual text preserved)
 * - If a project exists only in Drive → create new entry from Drive data
 * - If a project exists only in projects.json → preserve it (placeholder data)
 */

import * as fs from "fs";
import * as path from "path";
import {
  buildDriveManifest,
  getDriveThumbnailUrl,
  type DriveManifest,
  type DriveProject,
} from "./drive";

interface ProjectJson {
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

const CONTENT_DIR = path.resolve(process.cwd(), "content/projects");
const PROJECTS_FILE = path.join(CONTENT_DIR, "projects.json");
const MANIFEST_FILE = path.join(CONTENT_DIR, "drive-manifest.json");

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function sectionToCategory(section: string): string {
  return section.charAt(0).toUpperCase() + section.slice(1);
}

function mergeProject(
  existing: ProjectJson | undefined,
  driveProject: DriveProject
): ProjectJson {
  const driveImages = driveProject.images.map((img) =>
    getDriveThumbnailUrl(img.id, 1600)
  );

  const meta = driveProject.meta || {};

  if (existing) {
    // Merge: Drive images replace placeholder, text preserved unless meta.md overrides
    return {
      ...existing,
      // Drive data wins for images
      cover: driveImages[0] || existing.cover,
      images: driveImages.length > 0 ? driveImages : existing.images,
      // meta.md overrides if present, otherwise keep manual text
      title: meta.title || existing.title,
      year: meta.year || existing.year,
      location: meta.location || existing.location,
      area: meta.area || existing.area,
      description: meta.description || existing.description,
      featured: meta.featured !== undefined ? meta.featured : existing.featured,
    };
  }

  // New project from Drive only
  return {
    slug: driveProject.slug,
    title: meta.title || slugToTitle(driveProject.slug),
    section: driveProject.section,
    category: sectionToCategory(driveProject.section),
    year: meta.year || new Date().getFullYear().toString(),
    location: meta.location || "Montes Claros, MG",
    area: meta.area || "",
    cover: driveImages[0] || "",
    images: driveImages,
    description:
      meta.description ||
      `Projeto ${slugToTitle(driveProject.slug)} por Julia Fonseca Arquitetura.`,
    featured: meta.featured || false,
  };
}

export async function syncDrive(): Promise<{
  added: string[];
  updated: string[];
  preserved: string[];
}> {
  console.log("[sync] Building Drive manifest...");
  const manifest = await buildDriveManifest();

  console.log(
    `[sync] Found ${manifest.projects.length} projects in Drive.`
  );

  // Read existing projects.json
  let existingProjects: ProjectJson[] = [];
  if (fs.existsSync(PROJECTS_FILE)) {
    const raw = fs.readFileSync(PROJECTS_FILE, "utf-8");
    existingProjects = JSON.parse(raw);
  }

  const existingMap = new Map(
    existingProjects.map((p) => [`${p.section}/${p.slug}`, p])
  );
  const driveMap = new Map(
    manifest.projects.map((p) => [`${p.section}/${p.slug}`, p])
  );

  const result = {
    added: [] as string[],
    updated: [] as string[],
    preserved: [] as string[],
  };

  const mergedProjects: ProjectJson[] = [];

  // Process Drive projects (add or update)
  Array.from(driveMap.entries()).forEach(([key, driveProject]) => {
    const existing = existingMap.get(key);
    const merged = mergeProject(existing, driveProject);
    mergedProjects.push(merged);

    if (existing) {
      result.updated.push(key);
    } else {
      result.added.push(key);
    }
  });

  // Preserve projects only in projects.json (placeholder data)
  Array.from(existingMap.entries()).forEach(([key, existing]) => {
    if (!driveMap.has(key)) {
      mergedProjects.push(existing);
      result.preserved.push(key);
    }
  });

  // Sort: featured first, then by section, then by year desc
  mergedProjects.sort((a, b) => {
    if (a.featured !== b.featured) return b.featured ? 1 : -1;
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    return b.year.localeCompare(a.year);
  });

  // Write output
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(mergedProjects, null, 2));
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));

  console.log("[sync] Results:");
  console.log(`  Added: ${result.added.length} (${result.added.join(", ") || "none"})`);
  console.log(`  Updated: ${result.updated.length} (${result.updated.join(", ") || "none"})`);
  console.log(`  Preserved: ${result.preserved.length} (${result.preserved.join(", ") || "none"})`);
  console.log(`[sync] Written to ${PROJECTS_FILE}`);
  console.log(`[sync] Manifest saved to ${MANIFEST_FILE}`);

  return result;
}
