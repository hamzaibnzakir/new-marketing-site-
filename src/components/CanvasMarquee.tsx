"use client";

import { useEffect, useRef, useState } from "react";
import type { ProofItem } from "@/lib/proof";

interface LoadedTile {
  img: HTMLImageElement;
  item: ProofItem;
}

const TILE_W = 200;
const TILE_H = 260;
const GAP = 16;
const SPEED = 32; // px per second

export default function CanvasMarquee({ items }: { items: ProofItem[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    let raf = 0;
    let offset = 0;
    let paused = false;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    const h = TILE_H + 32;

    const resize = () => {
      w = wrap.getBoundingClientRect().width;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const displayFont =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-display")
        .trim() || "sans-serif";
    const bodyFont =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-body")
        .trim() || "sans-serif";

    Promise.all(
      items.map(
        (item) =>
          new Promise<LoadedTile>((resolve) => {
            const img = new window.Image();
            img.src = item.src;
            img.onload = () => resolve({ img, item });
            img.onerror = () => resolve({ img, item });
          })
      )
    ).then((loaded) => {
      if (cancelled) return;
      setReady(true);
      resize();
      window.addEventListener("resize", resize);

      const setW = loaded.length * (TILE_W + GAP);

      const drawTile = (tile: LoadedTile, x: number) => {
        if (x + TILE_W < -50 || x > w + 50) return; // cull off-screen

        ctx.save();
        // rounded-rect clip
        const r = 8;
        ctx.beginPath();
        ctx.moveTo(x + r, 16);
        ctx.arcTo(x + TILE_W, 16, x + TILE_W, 16 + r, r);
        ctx.arcTo(x + TILE_W, 16 + TILE_H, x + TILE_W - r, 16 + TILE_H, r);
        ctx.arcTo(x, 16 + TILE_H, x, 16 + TILE_H - r, r);
        ctx.arcTo(x, 16, x + r, 16, r);
        ctx.closePath();
        ctx.clip();

        // background
        ctx.fillStyle = "#0d0d0d";
        ctx.fillRect(x, 16, TILE_W, TILE_H);

        // image, contain-fit (never crop real numbers)
        if (tile.img.complete && tile.img.naturalWidth > 0) {
          const iw = tile.img.naturalWidth;
          const ih = tile.img.naturalHeight;
          const scale = Math.min(TILE_W / iw, (TILE_H - 50) / ih);
          const dw = iw * scale;
          const dh = ih * scale;
          const dx = x + (TILE_W - dw) / 2;
          const dy = 16 + (TILE_H - 50 - dh) / 2 + 10;
          ctx.drawImage(tile.img, dx, dy, dw, dh);
        }

        // bottom gradient
        const grad = ctx.createLinearGradient(
          0,
          16 + TILE_H - 60,
          0,
          16 + TILE_H
        );
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, "rgba(0,0,0,0.92)");
        ctx.fillStyle = grad;
        ctx.fillRect(x, 16 + TILE_H - 60, TILE_W, 60);

        // border
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        // stat text
        ctx.fillStyle = "#2ecc8f";
        ctx.font = `700 18px ${displayFont}`;
        ctx.textBaseline = "alphabetic";
        ctx.fillText(tile.item.stat, x + 12, 16 + TILE_H - 30);

        // label text
        ctx.fillStyle = "#8a8780";
        ctx.font = `400 10px ${bodyFont}`;
        ctx.fillText(tile.item.label, x + 12, 16 + TILE_H - 14, TILE_W - 24);
      };

      let last = performance.now();
      const draw = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!paused && !reduceMotion) offset += SPEED * dt;
        offset %= setW;

        ctx.clearRect(0, 0, w, h);
        // draw enough repeats to cover the width seamlessly
        const start = -offset;
        for (let x = start - setW; x < w + TILE_W; x += TILE_W + GAP) {
          const idx =
            (((x - start) / (TILE_W + GAP)) % loaded.length + loaded.length) %
            loaded.length;
          const tile = loaded[Math.round(idx)];
          if (tile) drawTile(tile, x);
        }
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);

      wrap.addEventListener("pointerenter", () => (paused = true));
      wrap.addEventListener("pointerleave", () => (paused = false));
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [items]);

  return (
    <div ref={wrapRef} className="relative">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`block w-full transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Accessible equivalent — screen readers get the real data,
          canvas is presentation-only. */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.src}>
            {item.stat} — {item.label}: {item.alt}
          </li>
        ))}
      </ul>
    </div>
  );
}
