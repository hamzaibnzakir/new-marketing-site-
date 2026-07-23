"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

export default function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // touch devices skip tilt

    const rotX = gsap.quickTo(el, "rotateX", { duration: 0.4, ease: "power3.out" });
    const rotY = gsap.quickTo(el, "rotateY", { duration: 0.4, ease: "power3.out" });

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotY(px * 10);
      rotX(-py * 10);
    };

    const handleLeave = () => {
      rotX(0);
      rotY(0);
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div style={{ perspective: 800 }}>
      <div ref={ref} className="transition-transform" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
}
