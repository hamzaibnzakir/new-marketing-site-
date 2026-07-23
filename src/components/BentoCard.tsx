"use client";

import { useRef, type ReactNode } from "react";

interface BentoCardProps {
  icon: ReactNode;
  title: string;
  body: string;
}

/**
 * Spotlight-on-hover card: a radial glow follows the cursor via CSS
 * custom properties updated on pointermove, no re-render per frame.
 */
export default function BentoCard({ icon, title, body }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className="group relative h-full overflow-hidden border border-border bg-surface p-8"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx) var(--my), rgba(46,204,143,0.12), transparent 70%)",
        }}
      />
      <div className="relative">
        {icon}
        <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted">
          {body}
        </p>
      </div>
    </div>
  );
}
