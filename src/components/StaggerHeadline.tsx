"use client";

import { motion } from "motion/react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const word = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Splits text into words and reveals them sequentially from a masked,
 * blurred state on mount. Real Motion staggerChildren — free/open-source,
 * no Motion+ needed.
 */
export default function StaggerHeadline({
  lines,
  className,
}: {
  lines: { text: string; className?: string }[];
  className?: string;
}) {
  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {lines.map((line, li) => (
        <span key={li} className={`block ${line.className ?? ""}`}>
          {line.text.split(" ").map((w, wi) => (
            <motion.span
              key={wi}
              variants={word}
              className="inline-block"
              style={{ marginRight: "0.28em" }}
            >
              {w}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
