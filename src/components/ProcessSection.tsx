"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import { ApplyButton, Container, Eyebrow } from "./ui";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/*
  Steps 01–02 describe the real application flow (go-brainbox): five
  multiple-choice questions plus contact details, then a WhatsApp reply,
  usually within a day.
*/
const steps = [
  {
    n: "01",
    when: "About 2 minutes",
    title: "Apply",
    body: "Answer five quick questions about where you're starting, your time, your budget and what's holding you back.",
  },
  {
    n: "02",
    when: "Usually within a day",
    title: "Talk it through",
    body: "We reply on WhatsApp to go over your goals and budget, whether the mentorship fits, and what it costs for your situation.",
  },
  {
    n: "03",
    when: "Build",
    title: "Build the store",
    body: "Product research, then a Shopify store and funnel built around that product, with your mentor reviewing it with you.",
  },
  {
    n: "04",
    when: "Launch",
    title: "Launch the ads",
    body: "AI-assisted Meta campaigns go live. You watch the numbers move in your own dashboard and learn what to change.",
  },
  {
    n: "05",
    when: "Scale",
    title: "Scale & automate",
    body: "Once it's selling, we push what works and systemize fulfillment, follow-up and reporting so it runs with less of your time.",
  },
];

export default function ProcessSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // The emerald line fills as you read down the steps. Scrubbed to
  // scroll position, never pinned. Reduced motion: shown full.
  useEffect(() => {
    const list = listRef.current;
    const line = lineRef.current;
    if (!list || !line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      line.style.transform = "scaleY(1)";
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.4,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how"
      className="py-24 md:py-36"
      aria-labelledby="how-title"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow>How it works</Eyebrow>
                <h2
                  id="how-title"
                  className="display-xl mt-5 text-[clamp(2.2rem,1rem+3.8vw,4.2rem)]"
                >
                  From application to first orders.
                </h2>
                <p className="mt-6 max-w-md text-[17px] leading-relaxed text-text-muted">
                  No package to pick blind. You apply, we talk, and if it&apos;s
                  a fit, we start building.
                </p>
                <div className="mt-9">
                  <ApplyButton placement="process" />
                </div>
              </Reveal>
            </div>
          </div>

          <ol ref={listRef} className="relative lg:col-span-7">
            {/* track + progress line */}
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-[19px] top-6 w-px bg-border"
            />
            <div
              ref={lineRef}
              aria-hidden="true"
              className="absolute bottom-6 left-[19px] top-6 w-px origin-top bg-accent-light"
              style={{ transform: "scaleY(0)" }}
            />
            {steps.map((s, i) => (
              <li key={s.n} className="relative pb-12 pl-16 last:pb-0">
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center border border-accent-light/60 bg-black font-mono text-[12px] text-accent-light">
                  {s.n}
                </span>
                <Reveal delay={Math.min(i * 0.04, 0.16)}>
                  <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-text-muted">
                    {s.when}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-[28px]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-text-muted">
                    {s.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
