"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Reveal from "./Reveal";
import { Container, Eyebrow } from "./ui";
import { proofItems } from "@/lib/proof";

const featured = proofItems.filter((p) => p.featured);
const more = proofItems.filter((p) => !p.featured);

/*
  Case cards: each featured result gets a big colour card with its real
  screenshot fanned out with two supporting ones, like stacked posters.
  Hovering spreads the fan; clicking opens the full screenshot.
*/
const themes = [
  { card: "bg-tape text-ink", sub: "text-ink/70", line: "border-ink/15" },
  { card: "bg-ink text-on-dark", sub: "text-on-dark-muted", line: "border-white/10" },
  { card: "bg-forest text-on-dark", sub: "text-on-dark/70", line: "border-white/15" },
  { card: "bg-paper-3 text-ink", sub: "text-muted", line: "border-line" },
];

export default function ProofSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  }, []);

  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => (i === null ? i : (i + dir + proofItems.length) % proofItems.length)),
    []
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    d.addEventListener("keydown", onKey);
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("keydown", onKey);
      d.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index === null ? null : proofItems[index];

  return (
    <section id="results" className="bg-paper py-24 md:py-36" aria-labelledby="results-title">
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Results</Eyebrow>
              <h2 id="results-title" className="serif mt-6 text-[clamp(3.2rem,1.4rem+5.4vw,7rem)]">
                Receipts, <em>not promises.</em>
              </h2>
            </div>
            <p className="max-w-md text-[17px] leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
              Unedited dashboards from student and BrainBox-run stores, including
              the ordinary days. Tap a card to see the full screenshot.
            </p>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-20">
          {featured.map((item, i) => {
            const t = themes[i % themes.length];
            const side = [more[i * 2 % more.length], more[(i * 2 + 1) % more.length]];
            return (
              <li key={item.src}>
                <Reveal delay={(i % 2) * 0.08}>
                  <button
                    type="button"
                    onClick={() => open(proofItems.indexOf(item))}
                    aria-label={`${item.stat} ${item.label}, ${item.context}. View screenshot`}
                    className={`group relative flex h-[460px] w-full flex-col overflow-hidden rounded-[22px] p-7 text-left md:h-[520px] md:p-9 ${t.card}`}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className={`font-mono text-[12px] uppercase tracking-[0.12em] ${t.sub}`}>
                          {item.context}
                        </p>
                        <p className="serif mt-3 text-[clamp(3.4rem,2.4rem+3vw,5.6rem)]">{item.stat}</p>
                        <p className="mt-2 text-[17px] font-medium">{item.label}</p>
                      </div>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${t.line} transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Maximize2 aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </div>

                    {/* fanned posters */}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] [perspective:1400px]">
                      {[side[0], item, side[1]].map((p, k) => (
                        <div
                          key={p.src + k}
                          className={`absolute bottom-[-12%] w-[38%] overflow-hidden rounded-[12px] bg-white p-1 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                            [
                              "z-0 group-hover:-translate-x-[22%] group-hover:-translate-y-[6%]",
                              "z-10 group-hover:-translate-y-[12%]",
                              "z-0 group-hover:translate-x-[22%] group-hover:-translate-y-[6%]",
                            ][k]
                          }`}
                          style={
                            {
                              left: `${[12, 31, 50][k]}%`,
                              transform: `rotate(${[-10, 0, 10][k]}deg) translateY(${k === 1 ? 0 : 6}%)`,
                            } as React.CSSProperties
                          }
                        >
                          <div className="relative aspect-[3/4] overflow-hidden rounded-[9px] bg-paper-3">
                            <Image
                              src={p.src}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 40vw, 20vw"
                              className="object-cover object-top"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>

      {/* More: native horizontal scroll */}
      <Reveal className="mt-16">
        <Container>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="serif text-[2.4rem]">More dashboards</h3>
            <p className="hidden font-mono text-[12px] text-muted sm:block">Scroll sideways →</p>
          </div>
        </Container>
        <ul
          className="snap-strip mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pl-5 pr-5 md:pl-10 xl:pl-[max(2.5rem,calc((100vw_-_1280px)/2_+_2.5rem))]"
          aria-label="More dashboard screenshots"
        >
          {more.map((item) => (
            <li key={item.src} className="flex w-[230px] shrink-0 snap-start">
              <button
                type="button"
                onClick={() => open(proofItems.indexOf(item))}
                className="group flex w-full flex-col overflow-hidden rounded-[18px] bg-paper-3 text-left shadow-[0_1px_0_var(--line)] transition-transform duration-300 hover:-translate-y-1"
                aria-label={`${item.stat} ${item.label}, ${item.context}. View screenshot`}
              >
                <div className="relative h-[250px] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="230px"
                    className={`transition-transform duration-500 group-hover:scale-[1.04] ${
                      item.width / item.height > 1.5 ? "object-contain p-3" : "object-cover object-top"
                    }`}
                  />
                </div>
                <div className="p-4">
                  <p className="serif text-[2.2rem] leading-none">{item.stat}</p>
                  <p className="mt-2 text-sm font-medium">{item.label}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted">{item.context}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </Reveal>

      <Container>
        <p className="mt-8 max-w-2xl text-[13px] leading-relaxed text-muted">
          These are individual results, not averages. What a store makes depends
          on the product, the ad budget and the work put in, and no result is
          guaranteed.
        </p>
      </Container>

      <dialog
        ref={dialogRef}
        className="lightbox m-auto max-h-[94vh] w-[min(94vw,760px)] bg-transparent p-0 text-on-dark"
        aria-label={current ? `${current.stat} ${current.label}` : "Screenshot"}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        {current && (
          <div className="flex flex-col items-center">
            <div className="flex w-full items-center justify-between gap-4 pb-3">
              <div>
                <p className="serif text-[2.2rem] leading-none">
                  {current.stat}{" "}
                  <span className="font-sans text-base text-on-dark-muted">{current.label}</span>
                </p>
                <p className="mt-1 font-mono text-[12px] text-on-dark-muted">{current.context}</p>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
                aria-label="Close"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="(max-width: 760px) 94vw, 760px"
              className="h-auto max-h-[76vh] w-auto max-w-full rounded-[10px]"
            />
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
