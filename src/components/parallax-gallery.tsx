import Image from "next/image";
import { getImageBlurDataURL } from "@/lib/image-placeholder";

/**
 * Static gallery grid inspired by guilhermetorres.com/jatobahouse.
 *
 * Layout cycle:
 *   1. feature-left  — wide image + narrow image
 *   2. feature-right — narrow image + wide image
 *   3. triptych      — three slimmer images
 *   ...repeat
 *
 * The gallery gap matches the page side gutter so the white spacing reads as a
 * deliberate frame instead of a thin separator.
 */

type RowLayout = "feature-left" | "feature-right" | "triptych" | "full";

interface GalleryRow {
  layout: RowLayout;
  images: Array<{ src: string; index: number }>;
}

function buildRows(images: string[]): GalleryRow[] {
  const rows: GalleryRow[] = [];
  let cursor = 0;
  let cycle = 0;

  while (cursor < images.length) {
    const remaining = images.length - cursor;

    if (remaining === 1) {
      rows.push({
        layout: "full",
        images: [{ src: images[cursor], index: cursor }],
      });
      cursor += 1;
      continue;
    }

    const pattern: RowLayout[] = ["feature-left", "feature-right", "triptych"];
    const layout = pattern[cycle % pattern.length];

    if (layout === "triptych" && remaining >= 3) {
      rows.push({
        layout: "triptych",
        images: [
          { src: images[cursor], index: cursor },
          { src: images[cursor + 1], index: cursor + 1 },
          { src: images[cursor + 2], index: cursor + 2 },
        ],
      });
      cursor += 3;
    } else {
      rows.push({
        layout,
        images: [
          { src: images[cursor], index: cursor },
          { src: images[cursor + 1], index: cursor + 1 },
        ],
      });
      cursor += 2;
    }

    cycle += 1;
  }

  return rows;
}

export function ParallaxGallery({ images }: { images: string[] }) {
  const rows = buildRows(images);
  const frame = "px-8 py-8 md:px-9 md:py-9 lg:px-12 lg:py-12 xl:px-14 xl:py-14 2xl:px-16 2xl:py-16";
  const gap = "gap-8 md:gap-9 lg:gap-12 xl:gap-14 2xl:gap-16";

  return (
    <div className={frame}>
      <div className={`grid ${gap}`}>
        {rows.map((row, rowIndex) => {
          if (row.layout === "full") {
            const item = row.images[0];
            return (
              <div
                key={`full-${rowIndex}`}
                className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200"
              >
                <Image
                  src={item.src}
                  alt={`Fotografia do Projeto ${item.index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={getImageBlurDataURL()}
                />
              </div>
            );
          }

          if (row.layout === "triptych") {
            return (
              <div key={`triptych-${rowIndex}`} className={`grid grid-cols-1 md:grid-cols-3 ${gap}`}>
                {row.images.map((item) => (
                  <div
                    key={item.src}
                    className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-[clamp(16rem,24vw,25rem)]"
                  >
                    <Image
                      src={item.src}
                      alt={`Fotografia do Projeto ${item.index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL={getImageBlurDataURL()}
                    />
                  </div>
                ))}
              </div>
            );
          }

          const gridClass =
            row.layout === "feature-left"
              ? "md:grid-cols-[minmax(0,1.72fr)_minmax(0,0.88fr)]"
              : "md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.72fr)]";

          return (
            <div
              key={`feature-${rowIndex}`}
              className={`grid grid-cols-1 ${gridClass} ${gap}`}
            >
              {row.images.map((item) => (
                <div
                  key={item.src}
                  className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-[clamp(18rem,30vw,32rem)]"
                >
                  <Image
                    src={item.src}
                    alt={`Fotografia do Projeto ${item.index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
                    placeholder="blur"
                    blurDataURL={getImageBlurDataURL()}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
