"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (reducedMotion.matches || coarsePointer.matches) return;

    const lenis = new Lenis({
      lerp: 0.15,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
    });
    let frame = 0;

    const onScroll = () => window.dispatchEvent(new Event("studio:scroll"));
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    lenis.on("scroll", onScroll);
    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  return null;
}
