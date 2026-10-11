"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ApplyButton } from "./ui";

/*
  Hero: an editorial headline next to a real 3D render, the BrainBox
  box wrapped in emerald packing tape, with real dashboard screenshots
  floating behind it at different depths.

  Depth & motion
  - 25 pre-rendered frames (public/render/box-00..24.webp, -30° to +30°
    yaw). The box turns toward the pointer on desktop and turns with
    scroll everywhere. Frame 12 (front) ships as the first paint; the rest
    load after the page is idle and are drawn to a canvas.
  - Each card has a depth value: deeper cards move less with the pointer
    and rise more slowly on scroll, which gives the layered parallax.
  - prefers-reduced-motion: static frame, static cards.

  Render source: three.js scene in the design notes (box, tape, B mark).
*/

const FRAMES = 25;
const MID = 12;
const frameSrc = (i: number) => `/render/box-${String(i).padStart(2, "0")}.webp`;

type Card = {
  src: string;
  // position/size as % of the stage, rotation in deg, depth 0..1
  x: number;
  y: number;
  w: number;
  r: number;
  depth: number;
  front?: boolean;
  mobile?: boolean;
  delay: number;
};

const cards: Card[] = [
  { src: "/proof/proof-10-7day-10k.png", x: -4, y: 66, w: 17, r: -9, depth: 0.55, delay: 500, mobile: true },
  { src: "/proof/proof-04-summary-26k.png", x: 15, y: 58, w: 14, r: 6, depth: 0.35, delay: 600 },
  { src: "/proof/proof-01-meta-ads-roas.png", x: 66, y: 50, w: 15, r: -14, depth: 0.45, delay: 700, mobile: true },
  { src: "/proof/proof-06-100-orders.png", x: 80, y: 30, w: 15, r: 12, depth: 0.7, delay: 800, mobile: true },
  { src: "/proof/proof-11-daily-sales-dark.png", x: 54, y: 68, w: 11, r: 16, depth: 1, delay: 1000, front: true },
];

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const renderRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const renderEl = renderRef.current;
    const canvas = canvasRef.current;
    if (!stage || !renderEl || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const ctx = canvas.getContext("2d");
    const frames: (HTMLImageElement | null)[] = Array(FRAMES).fill(null);
    let ready = false;
    let drawn = -1;

    // Load the remaining frames once the page is idle.
    const load = () => {
      let done = 0;
      for (let i = 0; i < FRAMES; i++) {
        const img = new window.Image();
        img.decoding = "async";
        img.src = frameSrc(i);
        img.onload = () => {
          frames[i] = img;
          if (++done === FRAMES) {
            ready = true;
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
          }
        };
      }
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (document.readyState === "complete") (idle ?? setTimeout)(load);
    else window.addEventListener("load", () => (idle ?? setTimeout)(load), { once: true });

    let px = 0, py = 0; // pointer target, -1..1
    let cx = 0, cy = 0; // smoothed
    let scroll = 0, cs = 0; // scroll progress 0..1 through the hero
    let raf = 0;

    const onPointer = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      px = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      py = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    };
    const onScroll = () => {
      const h = stage.offsetHeight || 1;
      scroll = Math.max(0, Math.min(1, window.scrollY / h));
    };

    const tick = () => {
      cx += (px - cx) * 0.08;
      cy += (py - cy) * 0.08;
      cs += (scroll - cs) * 0.12;

      // box turns toward the pointer, and keeps turning as you scroll
      const yaw = Math.max(-1, Math.min(1, cx * 0.85 + cs * 1.4));
      const idx = Math.round(MID + yaw * MID);
      if (ready && ctx && idx !== drawn && frames[idx]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(frames[idx]!, 0, 0);
        if (drawn === -1) {
          canvas.style.opacity = "1";
          if (imgRef.current) imgRef.current.style.opacity = "0";
        }
        drawn = idx;
      }
      renderEl.style.transform = `translate3d(${cx * 10}px, ${cy * 8 - cs * 60}px, 0) scale(${1 - cs * 0.06})`;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = cards[i].depth;
        el.style.transform = `translate3d(${-cx * 38 * d}px, ${-cy * 26 * d - cs * 220 * d}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };

    if (fine) stage.addEventListener("pointermove", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={stageRef}
      className="relative overflow-hidden bg-paper"
      aria-labelledby="hero-title"
    >
      <div className="relative mx-auto min-h-[calc(100svh-72px)] w-full max-w-[1280px] px-5 pb-10 pt-6 md:px-10 lg:min-h-[720px] lg:pb-14 lg:pt-10">
        {/* Card wall: real dashboards at different depths */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {cards.map((c, i) => (
            <div
              key={c.src}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`absolute will-change-transform ${c.front ? "z-30" : "z-0"} ${
                c.mobile ? "" : "hidden lg:block"
              }`}
              style={{ left: `${c.x}%`, top: `${c.y}%`, width: `clamp(96px, ${c.w}vw, ${c.w * 15}px)` }}
            >
              <div className="card-in" style={{ "--d": c.delay } as React.CSSProperties}>
                <div
                  className="aspect-[4/3] overflow-hidden rounded-[14px] bg-white p-1.5 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.35)]"
                  style={{ transform: `rotate(${c.r}deg)`, filter: c.front ? "none" : `blur(${(1 - c.depth) * 1.2}px)` }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[9px] bg-paper-3">
                    <Image src={c.src} alt="" fill sizes="220px" className="object-cover object-top" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative grid h-full grid-cols-1 lg:grid-cols-12">
          {/* Copy */}
          <div className="relative z-20 lg:col-span-5 lg:pt-10">
            <h1
              id="hero-title"
              className="serif text-[clamp(3.6rem,1.4rem+5.4vw,6.6rem)]"
            >
              <span className="hero-in block" style={{ "--d": 60 } as React.CSSProperties}>
                Build a store
              </span>
              <span className="hero-in block" style={{ "--d": 140 } as React.CSSProperties}>
                that actually
              </span>
              <span className="hero-in block italic" style={{ "--d": 220 } as React.CSSProperties}>
                sells.
              </span>
            </h1>
            <p
              className="hero-in mt-6 max-w-[25rem] text-[17px] leading-relaxed text-muted"
              style={{ "--d": 360 } as React.CSSProperties}
            >
              1-on-1 dropshipping mentorship. We build your Shopify store with
              you, run the Meta ads alongside you and stay on your store from
              first product to first sales.
            </p>
          </div>

          {/* Render */}
          <div className="relative z-10 -mx-8 mt-2 lg:col-span-7 lg:-ml-24 lg:-mr-10 lg:-mt-4">
            <div ref={renderRef} className="will-change-transform">
              <div className="render-in relative mx-auto aspect-square w-full max-w-[640px] lg:max-w-[720px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={frameSrc(MID)}
                  alt="A green shipping box wrapped in BrainBox packing tape, with a shipping label reading Ship to: your first sale"
                  width={1000}
                  height={1000}
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full"
                />
                <canvas
                  ref={canvasRef}
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full opacity-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rotating badge */}
        <div
          aria-hidden="true"
          className="hero-in absolute right-5 top-4 z-20 hidden h-28 w-28 md:right-10 md:block lg:top-10"
          style={{ "--d": 600 } as React.CSSProperties}
        >
          <svg viewBox="0 0 120 120" className="badge-spin h-full w-full">
            <defs>
              <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <text className="fill-ink font-mono" fontSize="9.5" letterSpacing="2.6">
              <textPath href="#badge-circle">BUILT WITH YOU · 1-ON-1 MENTORSHIP ·</textPath>
            </text>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl">✦</span>
        </div>

        {/* Bottom row: CTA left, note right */}
        <div className="relative z-30 mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:mt-0">
          <div className="hero-in flex flex-col gap-3" style={{ "--d": 460 } as React.CSSProperties}>
            <ApplyButton placement="hero" size="lg" className="w-full sm:w-auto sm:self-start" />
            <p className="font-mono text-[12px] text-muted">
              5 quick questions · Reply on WhatsApp, usually within a day
            </p>
          </div>
          <p
            className="hero-in max-w-[17rem] text-[14px] leading-snug text-ink/80 sm:text-right"
            style={{ "--d": 560 } as React.CSSProperties}
          >
            Shopify stores built and advertised with a 1-on-1 mentor, not a
            course login.
          </p>
        </div>
      </div>
    </section>
  );
}
