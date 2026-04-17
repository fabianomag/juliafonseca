"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

export function ParallaxGallery({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yValues = [
    useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "15%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]),
  ];

  const rows: Array<{
    layout: "full" | "split-left" | "split-right" | "pair";
    images: Array<{ src: string; index: number }>;
  }> = [];

  if (images.length > 0) {
    rows.push({
      layout: "full",
      images: [{ src: images[0], index: 0 }],
    });
  }

  let cursor = images.length > 0 ? 1 : 0;
  let alternator = 0;

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

    const layoutCycle = ["split-left", "pair", "split-right"] as const;
    const layout = layoutCycle[alternator % layoutCycle.length];

    rows.push({
      layout,
      images: [
        { src: images[cursor], index: cursor },
        { src: images[cursor + 1], index: cursor + 1 },
      ],
    });

    cursor += 2;
    alternator += 1;
  }

  return (
    <div ref={containerRef} className="space-y-3 md:space-y-4">
      {rows.map((row, rowIndex) => {
        if (row.layout === "full") {
          const item = row.images[0];
          const motionY = yValues[item.index % yValues.length];

          return (
            <div key={`${row.layout}-${rowIndex}`} className="relative aspect-[16/9] overflow-hidden bg-ambient-canyon/10">
              <motion.div style={{ y: motionY, height: "118%", width: "100%", top: "-9%", position: "absolute" }}>
                <Image
                  src={item.src}
                  alt={`Fotografia do Projeto ${item.index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
            </div>
          );
        }

        const splitClass =
          row.layout === "split-left"
            ? "grid-cols-1 md:grid-cols-[1.35fr_0.92fr]"
            : row.layout === "split-right"
              ? "grid-cols-1 md:grid-cols-[0.92fr_1.35fr]"
              : "grid-cols-1 md:grid-cols-2";

        return (
          <div key={`${row.layout}-${rowIndex}`} className={`grid gap-3 md:gap-4 ${splitClass}`}>
            {row.images.map((item, itemIndex) => {
              const motionY = yValues[item.index % yValues.length];
              const aspectClass =
                row.layout === "pair"
                  ? "aspect-[1.16/1]"
                  : row.layout === "split-left"
                    ? itemIndex === 0
                      ? "aspect-[1.35/1]"
                      : "aspect-[0.92/1]"
                    : itemIndex === 0
                      ? "aspect-[0.92/1]"
                      : "aspect-[1.35/1]";

              return (
                <div key={item.src} className={`relative overflow-hidden bg-ambient-canyon/10 ${aspectClass}`}>
                  <motion.div style={{ y: motionY, height: "118%", width: "100%", top: "-9%", position: "absolute" }}>
                    <Image
                      src={item.src}
                      alt={`Fotografia do Projeto ${item.index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
