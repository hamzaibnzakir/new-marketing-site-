"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hammer, TrendingUp, Bot } from "lucide-react";
import Reveal from "./Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const phases = [
  {
    icon: Hammer,
    n: "01",
    title: "Build & optimize",
    body: "We build your store with a winning product and a funnel structured to convert from day one — not a generic theme with your logo slapped on.",
  },
  {
    icon: TrendingUp,
    n: "02",
    title: "Drive sales with AI ads",
    body: "AI-assisted ad strategy turns spend into consistent, profitable traffic. You watch the numbers move in real time, not a case study from someone else's store.",
  },
  {
    icon: Bot,
    n: "03",
    title: "Automate & scale",
    body: "Once it's working, we systemize it — fulfillment, follow-up, and reporting running with less of your hands-on time, built for 6 and 7-figure growth.",
  },
];

export default function SystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Pinned horizontal scroll only on wider viewports — on mobile the
    // cards just stack normally (pinning a horizontal scroll on a phone
    // is exactly the kind of "pretty but dysfunctional" UX the vibe-coded
    // checklist warns against).
    mm.add("(min-width: 768px)", () => {
      const scrollDistance = track.scrollWidth - section.clientWidth;

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollDistance + window.innerHeight * 0.3}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-0"
    >
      <div className="mx-auto max-w-6xl px-6 md:pt-32">
        <Reveal>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
            The System
          </p>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight md:text-4xl">
            How Brainbox actually gets you there
          </h2>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        className="mt-16 flex flex-col gap-12 px-6 md:mt-20 md:h-[50vh] md:flex-row md:items-center md:gap-24 md:px-[10vw]"
      >
        {phases.map((p) => (
          <div key={p.n} className="md:w-[440px] md:shrink-0">
            <div className="flex items-center gap-3">
              <p.icon
                className="h-6 w-6 text-accent-light"
                strokeWidth={1.5}
              />
              <span className="font-display text-sm text-text-muted">
                {p.n}
              </span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold md:text-3xl">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
