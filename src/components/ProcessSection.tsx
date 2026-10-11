"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import { ApplyButton, Container, Eyebrow, TapeText } from "./ui";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/*
  A looping emerald path draws itself as you scroll, passing through the
  five steps. Steps 01–02 describe the real application flow (go-brainbox):
  five multiple-choice questions, then a WhatsApp reply, usually within a
  day. Reduced motion: the path is drawn in full.
*/
const steps = [
  { n: "01", when: "About 2 minutes", title: "Apply", body: "Answer five quick questions about where you're starting, your time, your budget and what's holding you back." },
  { n: "02", when: "Usually within a day", title: "Talk it through", body: "We reply on WhatsApp to go over your goals and budget, whether the mentorship fits, and what it costs for you." },
  { n: "03", when: "Build", title: "Build the store", body: "Product research, then a Shopify store and funnel built around that product, reviewed with your mentor." },
  { n: "04", when: "Launch", title: "Launch the ads", body: "AI-assisted Meta campaigns go live. You watch the numbers move in your own dashboard and learn what to change." },
  { n: "05", when: "Scale", title: "Scale & automate", body: "Once it's selling, we push what works and systemize fulfillment, follow-up and reporting." },
];

// Desktop path through 5 nodes in a 1000 x 1500 box (nodes alternate sides).
const nodes = [
  { x: 260, y: 120 },
  { x: 740, y: 420 },
  { x: 260, y: 720 },
  { x: 740, y: 1020 },
  { x: 260, y: 1320 },
];
const PATH =
  "M 40 20 C 200 20, 120 120, 260 120 S 560 140, 600 260 S 520 470, 740 420 S 980 300, 900 520 " +
  "S 420 600, 300 660 S 120 760, 260 720 S 560 700, 640 860 S 600 1060, 740 1020 S 960 1000, 880 1180 " +
  "S 420 1240, 340 1280 S 180 1340, 260 1320 S 620 1360, 980 1480";

export default function ProcessSection() {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      return;
    }
    path.style.strokeDashoffset = `${len}`;
    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { trigger: wrap, start: "top 75%", end: "bottom 70%", scrub: 0.5 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="how" className="relative overflow-hidden bg-paper py-24 md:py-36" aria-labelledby="how-title">
      {/* stray tape across the corner */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-24 hidden w-[520px] rotate-[24deg] lg:block">
        <div className="tape overflow-hidden py-2 font-mono text-[13px] font-medium tracking-[0.12em]">
          <div className="tape-run flex w-max" style={{ "--tape-dur": "30s" } as React.CSSProperties}>
            <TapeText />
            <TapeText />
          </div>
        </div>
      </div>

      <Container>
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 id="how-title" className="serif mt-6 max-w-3xl text-[clamp(3.2rem,1.4rem+5vw,6.4rem)]">
            Five steps, then <em>steady growth.</em>
          </h2>
        </Reveal>

        {/* Desktop: looping path */}
        <div ref={wrapRef} className="relative mx-auto mt-16 hidden aspect-[1000/1500] max-w-[1000px] md:block">
          <svg viewBox="0 0 1000 1500" className="absolute inset-0 h-full w-full" aria-hidden="true" fill="none">
            <path d={PATH} stroke="var(--paper-2)" strokeWidth="26" strokeLinecap="round" />
            <path ref={pathRef} d={PATH} stroke="var(--tape)" strokeWidth="26" strokeLinecap="round" />
          </svg>
          {steps.map((s, i) => {
            const n = nodes[i];
            const right = n.x < 500;
            return (
              <div
                key={s.n}
                className="absolute"
                style={{ left: `${(n.x / 1000) * 100}%`, top: `${(n.y / 1500) * 100}%` }}
              >
                <span className="absolute -left-6 -top-6 flex h-12 w-12 items-center justify-center rounded-full bg-ink font-mono text-[13px] text-tape shadow-[0_0_0_6px_var(--paper)]">
                  {s.n}
                </span>
                <Reveal
                  className={`absolute top-[-1.6rem] w-[min(34vw,340px)] rounded-[16px] bg-paper/90 p-3 backdrop-blur-[2px] ${right ? "left-12" : "right-12 text-right"}`}
                >
                  <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">{s.when}</p>
                  <h3 className="serif mt-1 text-[2.6rem] leading-none">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* Phones: simple vertical track */}
        <ol className="relative mt-12 md:hidden">
          <span aria-hidden="true" className="absolute bottom-4 left-[23px] top-4 w-[6px] rounded-full bg-tape" />
          {steps.map((s) => (
            <li key={s.n} className="relative pb-10 pl-16 last:pb-0">
              <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-ink font-mono text-[13px] text-tape">
                {s.n}
              </span>
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">{s.when}</p>
              <h3 className="serif mt-1 text-[2.4rem] leading-none">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex justify-center">
          <ApplyButton placement="process" size="lg" />
        </div>
      </Container>
    </section>
  );
}
