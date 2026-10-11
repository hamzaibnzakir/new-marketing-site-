"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Reveal from "./Reveal";
import { Container, Eyebrow } from "./ui";
import { proofItems, type ProofItem } from "@/lib/proof";

const featured = proofItems.filter((p) => p.featured);
const more = proofItems.filter((p) => !p.featured);

function Thumb({ item, className }: { item: ProofItem; className: string }) {
  const wide = item.width / item.height > 1.5;
  return (
    <div className={`relative overflow-hidden bg-bone-2 ${className}`}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 80vw, 25vw"
        className={`transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none ${
          wide ? "object-contain p-3" : "object-cover object-top"
        }`}
      />
      <span className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center bg-bone-ink/80 text-bone opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <Maximize2 aria-hidden="true" className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

export default function ProofSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  }, []);

  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) =>
        i === null ? i : (i + dir + proofItems.length) % proofItems.length
      ),
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
    <section
      id="results"
      className="bg-bone py-24 text-bone-ink md:py-36"
      aria-labelledby="results-title"
    >
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow tone="light">Results</Eyebrow>
              <h2
                id="results-title"
                className="display-xl mt-5 text-[clamp(2.4rem,1rem+4.4vw,4.6rem)]"
              >
                Receipts,
                <br />
                not promises.
              </h2>
            </div>
            <p className="max-w-md text-[17px] leading-relaxed text-bone-muted lg:col-span-5 lg:justify-self-end">
              Unedited dashboards from student and BrainBox-run stores,
              including the ordinary days. Tap any card to see the full
              screenshot.
            </p>
          </div>
        </Reveal>

        {/* Featured: the four numbers that matter most */}
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-4">
          {featured.map((item, i) => (
            <li key={item.src} className="h-full">
              <Reveal delay={i * 0.08} className="h-full">
                <button
                  type="button"
                  onClick={() => open(proofItems.indexOf(item))}
                  className="group flex h-full w-full flex-col border border-bone-border bg-[#f4f0e7] text-left transition-colors hover:border-bone-ink/40"
                  aria-label={`${item.stat} ${item.label}, ${item.context}. View screenshot`}
                >
                  <div className="p-4 sm:p-6">
                    <p className="display-lg text-[clamp(1.6rem,1rem+2.4vw,3.25rem)]">
                      {item.stat}
                    </p>
                    <p className="mt-3 font-display text-[15px] font-bold leading-tight sm:text-base">
                      {item.label}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] leading-snug text-bone-muted sm:text-[12px]">
                      {item.context}
                    </p>
                  </div>
                  <Thumb
                    item={item}
                    className="mt-auto h-36 border-t border-bone-border sm:h-56"
                  />
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      {/* More: native horizontal scroll, swipeable, no scroll-jacking */}
      <Reveal className="mt-16">
        <Container>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl font-bold">More dashboards</h3>
            <p className="hidden font-mono text-[12px] text-bone-muted sm:block">
              Scroll sideways →
            </p>
          </div>
        </Container>
        <ul
          className="snap-strip mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pl-5 pr-5 md:pl-8 xl:pl-[max(2rem,calc((100vw_-_1240px)/2_+_2rem))]"
          aria-label="More dashboard screenshots"
        >
          {more.map((item) => (
            <li key={item.src} className="flex w-[220px] shrink-0 snap-start">
              <button
                type="button"
                onClick={() => open(proofItems.indexOf(item))}
                className="group flex w-full flex-col border border-bone-border bg-[#f4f0e7] text-left transition-colors hover:border-bone-ink/40"
                aria-label={`${item.stat} ${item.label}, ${item.context}. View screenshot`}
              >
                <Thumb item={item} className="h-[260px]" />
                <div className="border-t border-bone-border p-4">
                  <p className="font-display text-2xl font-bold tracking-tight">
                    {item.stat}
                  </p>
                  <p className="mt-1 text-sm font-medium">{item.label}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-bone-muted">
                    {item.context}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </Reveal>

      <Container>
        <p className="mt-8 max-w-2xl text-[13px] leading-relaxed text-bone-muted">
          These are individual results, not averages. What a store makes
          depends on the product, the ad budget and the work put in, and no
          result is guaranteed.
        </p>
      </Container>

      <dialog
        ref={dialogRef}
        className="lightbox m-auto max-h-[94vh] w-[min(94vw,760px)] bg-transparent p-0 text-bone"
        aria-label={current ? `${current.stat} ${current.label}` : "Screenshot"}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        {current && (
          <div className="flex flex-col items-center">
            <div className="flex w-full items-center justify-between gap-4 pb-3">
              <div>
                <p className="font-display text-2xl font-bold">
                  {current.stat}{" "}
                  <span className="text-base font-medium text-text-muted">
                    {current.label}
                  </span>
                </p>
                <p className="font-mono text-[12px] text-text-muted">
                  {current.context}
                </p>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/20 text-text hover:bg-white/10"
                aria-label="Close"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex w-full items-center justify-center">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="(max-width: 760px) 94vw, 760px"
                className="h-auto max-h-[76vh] w-auto max-w-full"
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                className="flex h-11 w-11 items-center justify-center border border-white/20 text-text hover:bg-white/10"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="flex h-11 w-11 items-center justify-center border border-white/20 text-text hover:bg-white/10"
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
