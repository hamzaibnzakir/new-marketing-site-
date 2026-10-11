"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/*
  One long editorial sentence that slides sideways as you scroll, with
  cards set into it. Each card shows the real dashboard screenshot, then
  flips in 3D to the number it proves as it passes the centre of the
  screen. Desktop + motion only; on phones and with reduced motion the
  sentence simply wraps, with the cards already showing their numbers.

  Figures are read off the screenshots in public/proof (see lib/proof.ts).
*/

type Flip = { img: string; stat: string; label: string; context: string };

const parts: (string | Flip)[] = [
  "We build it",
  "with you,",
  { img: "/proof/proof-07-30day-126k.png", stat: "$126.4K", label: "Sales in 30 days", context: "2,160 orders" },
  "run the ads",
  { img: "/proof/proof-01-meta-ads-roas.png", stat: "7.38x", label: "Return on ad spend", context: "Meta Ads" },
  "and stay on it",
  "while the numbers",
  { img: "/proof/proof-04-summary-26k.png", stat: "$13,992", label: "Net profit in a day", context: "on $26,534 in sales" },
  "move.",
];

const italic = new Set(["with you,", "move."]);

function FlipCard({ f, setRef }: { f: Flip; setRef: (el: HTMLDivElement | null) => void }) {
  return (
    <span
      className="mx-[0.12em] hidden align-middle [perspective:1200px] lg:inline-block"
      style={{ width: "1.55em", height: "1.95em" }}
    >
      <span
        ref={setRef}
        className="flip-inner relative block h-full w-full [transform-style:preserve-3d]"
        style={{ transform: "rotateY(180deg)" }}
      >
        {/* front: the screenshot */}
        <span className="absolute inset-0 overflow-hidden rounded-[0.12em] bg-white p-[0.04em] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.45)] [backface-visibility:hidden]">
          <span className="relative block h-full w-full overflow-hidden rounded-[0.08em]">
            <Image src={f.img} alt="" fill sizes="200px" className={f.img.includes("30day") ? "object-contain" : "object-cover object-top"} />
          </span>
        </span>
        {/* back: the number */}
        <span className="absolute inset-0 flex flex-col justify-between rounded-[0.12em] bg-tape p-[0.11em] text-ink shadow-[0_20px_40px_-16px_rgba(10,107,69,0.6)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="font-mono text-[0.075em] uppercase leading-tight tracking-wider">
            {f.label}
          </span>
          <span className="serif text-[0.42em] leading-none">{f.stat}</span>
          <span className="text-[0.08em] leading-tight">{f.context}</span>
        </span>
      </span>
    </span>
  );
}

export default function FlipStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLParagraphElement>(null);
  const flipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      flipRefs.current.forEach((el) => el && (el.style.transform = "rotateY(0deg)"));
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth * 0.55);
      const update = () => {
        const mid = window.innerWidth / 2;
        flipRefs.current.forEach((el) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const c = r.left + r.width / 2;
          // 0° (screenshot) on the right, 180° (number) once past centre
          const p = gsap.utils.clamp(0, 1, (mid + window.innerWidth * 0.38 - c) / (window.innerWidth * 0.3));
          el.style.transform = `rotateY(${p * 180}deg)`;
        });
      };
      const tween = gsap.fromTo(
        track,
        { x: () => window.innerWidth * 0.45 },
        {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.6}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: update,
            onRefresh: update,
          },
        }
      );
      update();
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        flipRefs.current.forEach((el) => el && (el.style.transform = "rotateY(180deg)"));
      };
    });
    return () => mm.revert();
  }, []);

  const flips = parts.filter((p): p is Flip => typeof p !== "string");
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-paper py-20 lg:flex lg:h-screen lg:items-center lg:py-0"
      aria-label="What we do, with results"
    >
      <p
        ref={trackRef}
        className="serif px-5 text-[clamp(3rem,1.2rem+7vw,6rem)] leading-[1.12] md:px-10 lg:whitespace-nowrap lg:px-0 lg:text-[clamp(6rem,10vw,10rem)] lg:leading-none"
      >
        {parts.map((part, i) =>
          typeof part === "string" ? (
            <span key={i} className={italic.has(part) ? "italic" : ""}>
              {part}{" "}
            </span>
          ) : (
            <FlipCard
              key={i}
              f={part}
              setRef={(el) => {
                flipRefs.current[flips.indexOf(part)] = el;
              }}
            />
          )
        )}
      </p>
      {/* Phones / reduced motion: the numbers as plain cards */}
      <ul className="mt-10 grid grid-cols-1 gap-3 px-5 sm:grid-cols-3 md:px-10 lg:hidden">
        {flips.map((f) => (
          <li key={f.stat} className="flex items-center gap-4 rounded-[18px] bg-tape p-4 text-ink">
            <span className="relative h-20 w-16 shrink-0 overflow-hidden rounded-[10px] bg-white">
              <Image src={f.img} alt="" fill sizes="64px" className="object-cover object-top" />
            </span>
            <span>
              <span className="serif block text-[2.6rem] leading-none">{f.stat}</span>
              <span className="mt-1 block text-[14px] font-medium">{f.label}</span>
              <span className="block font-mono text-[11px] text-ink/70">{f.context}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="absolute bottom-6 left-5 right-5 hidden font-mono text-[12px] text-muted md:left-10 lg:block">
        Each card is a real dashboard screenshot. Results are individual and not guaranteed.
      </p>
    </section>
  );
}
