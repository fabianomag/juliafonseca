/**
 * Converts a folder of source images into sequential, web-ready WebP files.
 *
 * Usage:
 *   npm run optimize -- <input-directory> <project-slug>
 *
 * Output:
 *   public/images/projects/<project-slug>/01.webp, 02.webp, ...
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".tiff", ".avif"]);
const maxWidth = 2400;
const webpQuality = 82;

function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

function isSafeSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

async function optimize(inputDirectory: string, slug: string) {
  if (!isSafeSlug(slug)) {
    throw new Error("The project slug must contain only lowercase letters, numbers and hyphens.");
  }

  const input = path.resolve(inputDirectory);
  const outputRoot = path.resolve("public", "images", "projects");
  const output = path.resolve(outputRoot, slug);

  if (!output.startsWith(`${outputRoot}${path.sep}`)) {
    throw new Error("The output path escaped the projects directory.");
  }

  if (!fs.existsSync(input) || !fs.statSync(input).isDirectory()) {
    throw new Error(`Input directory not found: ${input}`);
  }

  const files = fs
    .readdirSync(input)
    .filter((file) => supportedExtensions.has(path.extname(file).toLowerCase()))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

  if (files.length === 0) throw new Error(`No supported images found in ${input}`);

  fs.mkdirSync(output, { recursive: true });
  let totalBefore = 0;
  let totalAfter = 0;

  for (const [index, file] of files.entries()) {
    const source = path.join(input, file);
    const destination = path.join(output, `${String(index + 1).padStart(2, "0")}.webp`);
    const before = fs.statSync(source).size;

    await sharp(source)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: webpQuality, effort: 5 })
      .toFile(destination);

    const after = fs.statSync(destination).size;
    totalBefore += before;
    totalAfter += after;
    console.info(`${path.basename(destination)}  ${formatBytes(before)} -> ${formatBytes(after)}`);
  }

  const reduction = Math.round((1 - totalAfter / totalBefore) * 100);
  console.info(`Total: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)} (${reduction}% smaller)`);
}

const [, , inputDirectory, slug] = process.argv;

if (!inputDirectory || !slug) {
  console.error("Usage: npm run optimize -- <input-directory> <project-slug>");
  process.exit(1);
}

optimize(inputDirectory, slug).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
