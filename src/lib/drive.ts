/**
 * Google Drive Integration Module
 *
 * Connects to Julia's Google Drive to automatically pull project images.
 * Convention: Drive root folder has subfolders per section (residencial/, comercial/, interiores/)
 * Each section folder has project folders matching the slug naming convention.
 *
 * Folder structure expected:
 *   <DRIVE_ROOT>/
 *     residencial/
 *       casa-serra/
 *         fachada_01.jpg
 *         sala_02.jpg
 *         meta.md (optional — frontmatter with year, location, area, description)
 *     comercial/
 *       clinica-viva/
 *         ...
 *     interiores/
 *       apartamento-sabrina/
 *         ...
 */

import { google } from "googleapis";

// --- Types ---

export interface DriveImage {
  id: string;
  name: string;
  mimeType: string;
  webContentLink?: string;
  thumbnailLink?: string;
  size?: string;
  order: number;
}

export interface DriveProject {
  slug: string;
  section: "residencial" | "comercial" | "interiores";
  folderId: string;
  images: DriveImage[];
  meta?: ProjectMeta;
}

export interface ProjectMeta {
  title?: string;
  year?: string;
  location?: string;
  area?: string;
  description?: string;
  featured?: boolean;
  photographer?: string;
}

export interface DriveManifest {
  generatedAt: string;
  rootFolderId: string;
  projects: DriveProject[];
}

// --- Auth ---

function getAuthClient() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentials) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_JSON env var not set. See DRIVE-SETUP.md."
    );
  }

  const parsed = JSON.parse(credentials);
  const auth = new google.auth.GoogleAuth({
    credentials: parsed,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return auth;
}

function getDriveClient() {
  const auth = getAuthClient();
  return google.drive({ version: "v3", auth });
}

// --- Core functions ---

/**
 * List immediate subfolders of a given folder.
 */
async function listSubfolders(
  drive: ReturnType<typeof google.drive>,
  parentId: string
): Promise<{ id: string; name: string }[]> {
  const folders: { id: string; name: string }[] = [];
  let pageToken: string | undefined;

  do {
    const res = await drive.files.list({
      q: `'${parentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: "nextPageToken, files(id, name)",
      pageSize: 100,
      pageToken,
      orderBy: "name",
    });

    for (const file of res.data.files || []) {
      if (file.id && file.name) {
        folders.push({ id: file.id, name: file.name });
      }
    }

    pageToken = res.data.nextPageToken || undefined;
  } while (pageToken);

  return folders;
}

/**
 * List image files in a folder, sorted by name (which determines order).
 */
async function listImages(
  drive: ReturnType<typeof google.drive>,
  folderId: string
): Promise<DriveImage[]> {
  const images: DriveImage[] = [];
  let pageToken: string | undefined;

  const imageMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/heic",
  ];
  const mimeQuery = imageMimeTypes.map((m) => `mimeType = '${m}'`).join(" or ");

  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and (${mimeQuery}) and trashed = false`,
      fields:
        "nextPageToken, files(id, name, mimeType, webContentLink, thumbnailLink, size)",
      pageSize: 200,
      pageToken,
      orderBy: "name",
    });

    for (const file of res.data.files || []) {
      if (file.id && file.name) {
        images.push({
          id: file.id,
          name: file.name,
          mimeType: file.mimeType || "image/jpeg",
          webContentLink: file.webContentLink || undefined,
          thumbnailLink: file.thumbnailLink || undefined,
          size: file.size || undefined,
          order: images.length,
        });
      }
    }

    pageToken = res.data.nextPageToken || undefined;
  } while (pageToken);

  return images;
}

/**
 * Try to read a meta.md file from a project folder.
 * Returns parsed frontmatter or undefined if not found.
 */
async function readProjectMeta(
  drive: ReturnType<typeof google.drive>,
  folderId: string
): Promise<ProjectMeta | undefined> {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and name = 'meta.md' and trashed = false`,
    fields: "files(id)",
    pageSize: 1,
  });

  const metaFile = res.data.files?.[0];
  if (!metaFile?.id) return undefined;

  const content = await drive.files.get(
    { fileId: metaFile.id, alt: "media" },
    { responseType: "text" }
  );

  const text = content.data as string;
  return parseFrontmatter(text);
}

/**
 * Simple frontmatter parser for meta.md files.
 * Expects YAML-style key: value pairs between --- delimiters.
 */
function parseFrontmatter(text: string): ProjectMeta {
  const meta: ProjectMeta = {};
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return meta;

  const lines = match[1].split("\n");
  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim().toLowerCase();
    const value = line.slice(colonIdx + 1).trim();

    switch (key) {
      case "title":
        meta.title = value;
        break;
      case "year":
      case "ano":
        meta.year = value;
        break;
      case "location":
      case "localizacao":
        meta.location = value;
        break;
      case "area":
        meta.area = value;
        break;
      case "description":
      case "descricao":
        meta.description = value;
        break;
      case "featured":
      case "destaque":
        meta.featured = value === "true" || value === "sim";
        break;
      case "photographer":
      case "fotografo":
        meta.photographer = value;
        break;
    }
  }

  return meta;
}

// --- Public API ---

const VALID_SECTIONS = ["residencial", "comercial", "interiores"] as const;

/**
 * Scan the entire Drive folder structure and build a manifest.
 */
export async function buildDriveManifest(): Promise<DriveManifest> {
  const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!rootFolderId) {
    throw new Error(
      "GOOGLE_DRIVE_FOLDER_ID env var not set. See DRIVE-SETUP.md."
    );
  }

  const drive = getDriveClient();
  const projects: DriveProject[] = [];

  // List section folders (residencial, comercial, interiores)
  const sectionFolders = await listSubfolders(drive, rootFolderId);

  for (const sectionFolder of sectionFolders) {
    const sectionName = sectionFolder.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (!VALID_SECTIONS.includes(sectionName as typeof VALID_SECTIONS[number])) {
      console.warn(`[drive] Skipping unknown section folder: ${sectionFolder.name}`);
      continue;
    }

    const section = sectionName as typeof VALID_SECTIONS[number];

    // List project folders within this section
    const projectFolders = await listSubfolders(drive, sectionFolder.id);

    for (const projectFolder of projectFolders) {
      const slug = projectFolder.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const [images, meta] = await Promise.all([
        listImages(drive, projectFolder.id),
        readProjectMeta(drive, projectFolder.id),
      ]);

      if (images.length === 0) {
        console.warn(`[drive] Skipping empty project: ${section}/${projectFolder.name}`);
        continue;
      }

      projects.push({
        slug,
        section,
        folderId: projectFolder.id,
        images,
        meta,
      });
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    rootFolderId,
    projects,
  };
}

/**
 * Generate a public URL for a Drive image via the proxy endpoint.
 * This avoids exposing raw Drive URLs and allows next/image optimization.
 */
export function getDriveImageUrl(fileId: string, width: number = 1600): string {
  // Use our own proxy endpoint for optimized serving
  return `/api/drive-image/${fileId}?w=${width}`;
}

/**
 * Generate a direct Google Drive thumbnail URL (no auth needed if file is shared).
 * Useful as a fallback or for build-time static generation.
 */
export function getDriveThumbnailUrl(fileId: string, width: number = 1600): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`;
}
