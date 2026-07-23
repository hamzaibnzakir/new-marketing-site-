"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const moveX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const moveY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const scale = gsap.quickTo(dot, "scale", { duration: 0.2, ease: "power3.out" });

    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (e: PointerEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
    };

    const handleOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, summary, [role='button']");
      scale(interactive ? 2.2 : 1);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-light mix-blend-difference will-change-transform"
    />
  );
}
