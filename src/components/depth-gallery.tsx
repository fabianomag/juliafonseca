"use client";

import { useEffect, useRef } from "react";
import { TrefleDepthGalleryEngine } from "@/lib/trefle-depth-gallery/engine";

export function DepthGallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;

    if (!container || !canvas || !overlay) return;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    let cancelled = false;
    document.body.dataset.trefleMounted = "true";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const engine = new TrefleDepthGalleryEngine(canvas, container, overlay);
    if (process.env.NODE_ENV !== "production") {
      (window as Window & { __trefleDepthEngine?: TrefleDepthGalleryEngine }).__trefleDepthEngine =
        engine;
    }
    void engine
      .init()
      .then(() => {
        if (cancelled) engine.dispose();
      })
      .catch((error) => {
        console.error("TrefleDepthGalleryEngine init failed", error);
      });

    return () => {
      cancelled = true;
      engine.dispose();
      if (process.env.NODE_ENV !== "production") {
        delete (
          window as Window & { __trefleDepthEngine?: TrefleDepthGalleryEngine }
        ).__trefleDepthEngine;
      }
      delete document.body.dataset.trefleMounted;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  return (
    <section ref={containerRef} className="trefle-depth-root" aria-label="Galeria Tréfle atmosférica">
      <canvas ref={canvasRef} className="trefle-depth-canvas" />
      <div ref={overlayRef} className="trefle-depth-overlay-root" />
    </section>
  );
}
