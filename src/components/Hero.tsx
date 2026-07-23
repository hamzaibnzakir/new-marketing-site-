import Link from "next/link";
import Reveal from "./Reveal";
import AuroraBackground from "./AuroraBackground";
import HeroParallaxGrid from "./HeroParallaxGrid";
import BorderBeam from "./BorderBeam";

const stats = [
  { value: "300+", label: "Students mentored" },
  { value: "12+", label: "Countries reached" },
  { value: "4.9★", label: "From 200+ reviews" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
      <AuroraBackground />
      <HeroParallaxGrid />

      <div className="relative z-10 flex flex-col items-center">
        <Reveal>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
            E-commerce Mentorship
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
            Master the art of
            <br />
            <span className="text-accent-light">profitable dropshipping</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-balance text-base text-text-muted md:text-lg">
            Real stores. Real revenue. We build, run the ads, and mentor you
            directly — no theory-only courses, no guesswork.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <BorderBeam className="mt-10 inline-block">
            <Link
              href="/apply"
              className="block bg-accent-2 px-8 py-4 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-2-light"
            >
              Apply for Mentorship
            </Link>
          </BorderBeam>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center px-4 ${
                  i > 0 ? "border-l border-border" : ""
                }`}
              >
                <span className="font-display text-2xl font-bold text-accent-light">
                  {s.value}
                </span>
                <span className="text-xs text-text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
