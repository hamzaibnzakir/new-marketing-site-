"use client";

import { useState, useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";

export default function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduce = useReducedMotion();

  return (
    <div>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left font-serif text-[1.75rem] leading-[1.1] transition-colors hover:text-forest md:text-[2rem]"
        >
          {q}
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tape text-ink"
          >
            <Plus className="h-4 w-4" />
          </motion.span>
        </button>
      </h3>
      {/* Content stays mounted so screen readers and crawlers always get
          the full text; JS only controls the visual reveal. */}
      <motion.div
        id={id}
        role="region"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="max-w-2xl pb-7 pr-12 text-[16px] leading-relaxed text-muted">
          {a}
        </p>
      </motion.div>
    </div>
  );
}
