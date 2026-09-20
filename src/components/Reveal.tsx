"use client";

import { useRef, useEffect, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Fades + lifts content in as it enters the viewport. One-shot, tied to
 * actual scroll position.
 *
 * The hidden starting state comes from CSS (see `[data-reveal]` in
 * globals.css), so there's no flash of visible content before the
 * animation starts. Skipped entirely for visitors who prefer reduced
 * motion.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.reveal = "done";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onComplete: () => {
            el.dataset.reveal = "done";
            gsap.set(el, { clearProps: "opacity,transform" });
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal=""
      style={{ "--reveal-y": `${y}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
