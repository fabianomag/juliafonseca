"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("mousemove", updateMousePosition);
      window.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-ambient-electric pointer-events-none z-[9999] mix-blend-exclusion flex items-center justify-center bg-ambient-electric/20"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering
          ? "#a86d5acc" // ambient-electric
          : "#a86d5a1a",
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.5,
      }}
    />
  );
}
