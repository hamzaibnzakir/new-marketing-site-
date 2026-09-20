"use client";

import { useEffect, useRef } from "react";

/**
 * Soft animated glow blobs behind the hero, rendered on canvas so it
 * doesn't cause DOM repaints. Two blobs drift slowly and pulse —
 * emerald + crimson only, matching the locked design tokens.
 *
 * Performance notes:
 *  - Renders at half resolution: the blobs are pure soft gradients, so
 *    the browser upscaling them is invisible but ~4x cheaper.
 *  - Motion is time-based (same speed on 60Hz and 120Hz screens).
 *  - Stops entirely while the hero is off-screen.
 *  - With prefers-reduced-motion it paints one still frame and stops.
 */
const SCALE = 0.5;
const FRAME_MS = 16.667; // original tuning was per-frame at 60fps

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
    let running = false;
    let w = 0;
    let h = 0;
    let t = 0; // in "60fps frames", so the speeds below keep their feel
    let last = 0;

    const blobs = [
      { x: 0.32, y: 0.35, r: 0.38, color: "15, 92, 63", speed: 0.00025 },
      { x: 0.7, y: 0.55, r: 0.3, color: "140, 29, 46", speed: 0.0002 },
    ];

    const render = () => {
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
    };

    const frame = (now: number) => {
      if (!running) return;
      if (last) t += (now - last) / FRAME_MS;
      last = now;
      render();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width * SCALE));
      h = Math.max(1, Math.round(rect.height * SCALE));
      canvas.width = w;
      canvas.height = h;
      render(); // repaint immediately so a resize never flashes blank
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
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
