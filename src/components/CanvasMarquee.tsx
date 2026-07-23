"use client";

import { useEffect, useRef, useState } from "react";
import type { ProofItem } from "@/lib/proof";

interface LoadedTile {
  img: HTMLImageElement;
  item: ProofItem;
}

const TILE_W = 220;
const TILE_H = 300;
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

      const CHROME_H = 20;
      const CAPTION_H = 52;
      const IMG_ZONE_H = TILE_H - CHROME_H - CAPTION_H;

      const drawTile = (tile: LoadedTile, x: number) => {
        if (x + TILE_W < -50 || x > w + 50) return; // cull off-screen

        const top = 16;

        ctx.save();
        // rounded-rect clip for the whole card
        const r = 8;
        ctx.beginPath();
        ctx.moveTo(x + r, top);
        ctx.arcTo(x + TILE_W, top, x + TILE_W, top + r, r);
        ctx.arcTo(x + TILE_W, top + TILE_H, x + TILE_W - r, top + TILE_H, r);
        ctx.arcTo(x, top + TILE_H, x, top + TILE_H - r, r);
        ctx.arcTo(x, top, x + r, top, r);
        ctx.closePath();
        ctx.clip();

        // browser chrome strip
        ctx.fillStyle = "#dedbd3";
        ctx.fillRect(x, top, TILE_W, CHROME_H);
        ctx.fillStyle = "rgba(0,0,0,0.22)";
        for (let d = 0; d < 3; d++) {
          ctx.beginPath();
          ctx.arc(x + 10 + d * 12, top + CHROME_H / 2, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // image zone — light background, contain-fit (never crop numbers)
        ctx.fillStyle = "#e8e6e0";
        ctx.fillRect(x, top + CHROME_H, TILE_W, IMG_ZONE_H);
        if (tile.img.complete && tile.img.naturalWidth > 0) {
          const iw = tile.img.naturalWidth;
          const ih = tile.img.naturalHeight;
          const scale = Math.min(TILE_W / iw, IMG_ZONE_H / ih);
          const dw = iw * scale;
          const dh = ih * scale;
          const dx = x + (TILE_W - dw) / 2;
          const dy = top + CHROME_H + (IMG_ZONE_H - dh) / 2;
          ctx.drawImage(tile.img, dx, dy, dw, dh);
        }

        // caption zone — solid black, separate from image (no overlay
        // muddying light dashboard screenshots)
        const capY = top + CHROME_H + IMG_ZONE_H;
        ctx.fillStyle = "#000000";
        ctx.fillRect(x, capY, TILE_W, CAPTION_H);

        // card border
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        // stat text
        ctx.fillStyle = "#2ecc8f";
        ctx.font = `700 16px ${displayFont}`;
        ctx.textBaseline = "alphabetic";
        ctx.fillText(tile.item.stat, x + 12, capY + 22);

        // label text
        ctx.fillStyle = "#8a8780";
        ctx.font = `400 10px ${bodyFont}`;
        ctx.fillText(tile.item.label, x + 12, capY + 38, TILE_W - 24);
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
