"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

/**
 * Wraps a button/link so it "pulls" toward the cursor within a
 * proximity radius, then springs back on leave. Hand-built with GSAP
 * quickTo — the free equivalent of Motion+'s paid Cursor magnetic
 * snap feature, scoped to just the CTA rather than the whole cursor.
 */
export default function MagneticButton({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveX = gsap.quickTo(wrap, "x", { duration: 0.5, ease: "power3.out" });
    const moveY = gsap.quickTo(wrap, "y", { duration: 0.5, ease: "power3.out" });

    const strength = 0.35;
    const radius = 90;

    const handleMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius + rect.width / 2) {
        moveX(dx * strength);
        moveY(dy * strength);
      } else {
        moveX(0);
        moveY(0);
      }
    };

    const reset = () => {
      moveX(0);
      moveY(0);
    };

    window.addEventListener("pointermove", handleMove);
    wrap.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      wrap.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div ref={wrapRef} className="inline-block will-change-transform">
      {children}
    </div>
  );
}
