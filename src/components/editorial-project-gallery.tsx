import Image from "next/image";
import type { ProjectImage } from "@/content/site";

type RowLayout = "feature-left" | "feature-right" | "triptych" | "full";

type GalleryRow = {
  layout: RowLayout;
  images: readonly ProjectImage[];
};

function buildRows(images: readonly ProjectImage[]): GalleryRow[] {
  const rows: GalleryRow[] = [];
  const pattern: RowLayout[] = ["feature-left", "feature-right", "triptych"];
  let cursor = 0;
  let cycle = 0;

  while (cursor < images.length) {
    const remaining = images.length - cursor;

    if (remaining === 1) {
      rows.push({ layout: "full", images: images.slice(cursor, cursor + 1) });
      cursor += 1;
      continue;
    }

    const layout = pattern[cycle % pattern.length];
    const count = layout === "triptych" && remaining >= 3 ? 3 : 2;
    rows.push({ layout, images: images.slice(cursor, cursor + count) });
    cursor += count;
    cycle += 1;
  }

  return rows;
}

export function EditorialProjectGallery({
  images,
  label,
}: {
  images: readonly ProjectImage[];
  label: string;
}) {
  const rows = buildRows(images);

  return (
    <section className="editorial-gallery" aria-label={label}>
      <div className="editorial-gallery__rows">
        {rows.map((row, rowIndex) => (
          <div
            key={`${row.layout}-${rowIndex}`}
            className={`editorial-gallery__row editorial-gallery__row--${row.layout}`}
          >
            {row.images.map((image) => (
              <figure key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    row.layout === "full"
                      ? "100vw"
                      : row.layout === "triptych"
                        ? "(max-width: 720px) 100vw, 33vw"
                        : "(max-width: 720px) 100vw, 66vw"
                  }
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
