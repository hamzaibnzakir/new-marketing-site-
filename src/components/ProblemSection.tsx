"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import { Container, Eyebrow } from "./ui";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/*
  The dark "stage": a black arc rises over the page, and the glowing 3D
  BrainBox B (13 pre-rendered frames, public/render/logo-00..12.webp)
  turns as you scroll through the visitor's five most common worries.

  The worries are the exact options applicants pick on the go-brainbox
  application form ("What's the biggest thing holding you back?").
*/

const LOGO_FRAMES = 13;
const logoSrc = (i: number) => `/render/logo-${String(i).padStart(2, "0")}.webp`;

const rows = [
  {
    worry: "I don't know what to sell.",
    answer: "Product research happens with you, on data, before a store is built around it.",
  },
  {
    worry: "I don't know how to run ads.",
    answer: "We set up and run AI-assisted Meta campaigns alongside you, and you learn to read the numbers.",
  },
  {
    worry: "My store isn't converting.",
    answer: "Your store is built around one product and a funnel designed to convert, not a theme with your logo on it.",
  },
  {
    worry: "I don't have time to figure it out alone.",
    answer: "A mentor works on your actual store with you, instead of a Discord you post in and hope.",
  },
  {
    worry: "I'm worried about losing money.",
    answer: "Your budget is one of the first things we talk about, so the plan fits what you can spend.",
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const arc = arcRef.current;
    const frames = framesRef.current;
    if (!section || !arc || !frames) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const imgs = Array.from(frames.querySelectorAll("img"));
    let current = 6;
    const show = (i: number) => {
      if (i === current) return;
      imgs[current].style.opacity = "0";
      imgs[i].style.opacity = "1";
      current = i;
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        arc,
        { scaleX: 0.55, scaleY: 0.6 },
        {
          scaleX: 1,
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "top 30%", scrub: true },
        }
      );
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => show(Math.round(self.progress * (LOGO_FRAMES - 1))),
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mt-24 overflow-x-clip bg-ink pb-24 text-on-dark md:pb-36"
      aria-labelledby="problem-title"
    >
      {/* rising black arc */}
      <div
        ref={arcRef}
        aria-hidden="true"
        className="absolute -top-[110px] left-[-15%] h-[220px] w-[130%] origin-bottom rounded-[50%] bg-ink md:-top-[180px] md:h-[360px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-10 pt-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow tone="dark">Sound familiar?</Eyebrow>
            <h2 id="problem-title" className="serif mt-6 text-[clamp(3rem,1.4rem+5vw,6rem)]">
              Most first stores stall for the <em>same five reasons.</em>
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-on-dark-muted">
              These are the answers people pick most when they apply. Here&apos;s
              what we do about each one.
            </p>
          </Reveal>

          {/* glowing 3D B */}
          <div className="relative mx-auto w-full max-w-[420px] lg:col-span-5">
            <div
              ref={framesRef}
              className="bob relative aspect-square [mask-image:radial-gradient(circle,black_52%,transparent_71%)]"
            >
              {Array.from({ length: LOGO_FRAMES }).map((_, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={logoSrc(i)}
                  alt={i === 6 ? "The BrainBox B logo in glowing emerald 3D" : ""}
                  aria-hidden={i === 6 ? undefined : true}
                  width={1000}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full"
                  style={{ opacity: i === 6 ? 1 : 0 }}
                />
              ))}
            </div>
          </div>
        </div>

        <ol className="mt-16 border-t border-line-dark md:mt-20">
          {rows.map((r, i) => (
            <li key={r.worry} className="border-b border-line-dark">
              <Reveal delay={Math.min(i * 0.05, 0.2)}>
                <div className="group grid gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                  <span className="font-mono text-[12px] text-on-dark-muted md:col-span-1 md:pt-4">
                    0{i + 1}
                  </span>
                  <p className="serif text-[clamp(2rem,1.2rem+2.2vw,3.4rem)] leading-[1.02] transition-colors duration-300 md:col-span-6 md:group-hover:text-tape">
                    &ldquo;{r.worry}&rdquo;
                  </p>
                  <p className="max-w-md text-[16px] leading-relaxed text-on-dark-muted md:col-span-5 md:pt-3">
                    {r.answer}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
