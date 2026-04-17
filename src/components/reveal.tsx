"use client";

import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  width?: "fit-content" | "100%";
}

export function Reveal({ children, delay = 0, width = "100%" }: RevealProps) {
  return (
    <div style={{ width, position: "relative", overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.9, delay, ease: [0.17, 0.55, 0.55, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
