"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch devices and reduced-motion visitors keep the normal cursor.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const root = document.documentElement;
    const moveX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const moveY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const scale = gsap.quickTo(dot, "scale", { duration: 0.2, ease: "power3.out" });

    let active = false;

    const handleMove = (e: PointerEvent) => {
      if (!active) {
        // First move: snap to the real position (no glide in from the
        // top-left corner), then swap the native cursor for the dot.
        active = true;
        gsap.set(dot, { x: e.clientX, y: e.clientY });
        root.classList.add("has-custom-cursor");
        dot.style.opacity = "1";
      }
      moveX(e.clientX);
      moveY(e.clientY);
    };

    const handleOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, summary, [role='button']");
      scale(interactive ? 2.2 : 1);
    };

    // Hide the dot (and give the native cursor back) when the pointer
    // leaves the window.
    const handleLeaveWindow = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      active = false;
      dot.style.opacity = "0";
      root.classList.remove("has-custom-cursor");
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);
    document.addEventListener("mouseout", handleLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      document.removeEventListener("mouseout", handleLeaveWindow);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{ opacity: 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-light mix-blend-difference will-change-transform"
    />
  );
}
