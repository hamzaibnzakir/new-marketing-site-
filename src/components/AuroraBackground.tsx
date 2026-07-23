"use client";

import { useEffect, useRef } from "react";

/**
 * Soft animated glow blobs behind the hero, rendered on canvas for
 * performance (no DOM repaints). Two blobs drift slowly and pulse —
 * emerald + crimson only, matching the locked design tokens. Respects
 * prefers-reduced-motion.
 */
export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.32, y: 0.35, r: 0.38, color: "15, 92, 63", speed: 0.00025 },
      { x: 0.7, y: 0.55, r: 0.3, color: "140, 29, 46", speed: 0.0002 },
    ];

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const b of blobs) {
        const drift = reduceMotion ? 0 : Math.sin(t * b.speed) * 0.04;
        const cx = (b.x + drift) * w;
        const cy = (b.y + Math.cos(t * b.speed) * 0.03) * h;
        const r = b.r * Math.max(w, h);
        const pulse = reduceMotion
          ? 0.22
          : 0.18 + Math.sin(t * b.speed * 2) * 0.05;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `rgba(${b.color}, ${pulse})`);
        grad.addColorStop(1, `rgba(${b.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
      t += reduceMotion ? 0 : 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
