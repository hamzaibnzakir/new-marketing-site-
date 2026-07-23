"use client";

import { useState, useId } from "react";
import { motion } from "motion/react";

export default function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="py-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between text-left font-display text-base font-semibold"
      >
        {q}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="ml-4 shrink-0 text-accent-light"
        >
          +
        </motion.span>
      </button>
      {/* Content stays mounted at all times — screen readers and search
          crawlers always get the full text, JS only controls the
          visual reveal. */}
      <motion.div
        id={id}
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="mt-3 pr-8 text-sm leading-relaxed text-text-muted">
          {a}
        </p>
      </motion.div>
    </div>
  );
}
