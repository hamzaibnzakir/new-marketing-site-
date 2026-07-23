import Link from "next/link";
import Reveal from "./Reveal";
import AuroraBackground from "./AuroraBackground";
import HeroParallaxGrid from "./HeroParallaxGrid";
import BorderBeam from "./BorderBeam";
import MagneticButton from "./MagneticButton";
import StaggerHeadline from "./StaggerHeadline";
import AnimatedStat from "./AnimatedStat";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center md:min-h-[92vh]">
      <AuroraBackground />
      <HeroParallaxGrid />

      <div className="relative z-10 flex flex-col items-center">
        <Reveal>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
            E-commerce Mentorship
          </p>
        </Reveal>

        <StaggerHeadline
          className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl"
          lines={[
            { text: "Master the art of" },
            { text: "profitable dropshipping", className: "text-accent-light" },
          ]}
        />

        <Reveal delay={0.5}>
          <p className="mt-6 max-w-xl text-balance text-base text-text-muted md:text-lg">
            Real stores. Real revenue. We build, run the ads, and mentor you
            directly — no theory-only courses, no guesswork.
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <MagneticButton>
            <BorderBeam className="mt-10 inline-block">
              <Link
                href="/apply"
                className="block bg-accent-2 px-8 py-4 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-2-light"
              >
                Apply for Mentorship
              </Link>
            </BorderBeam>
          </MagneticButton>
        </Reveal>

        <Reveal delay={0.7}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
            <AnimatedStat value={300} suffix="+" label="Students mentored" />
            <span className="hidden h-8 w-px bg-border sm:block" />
            <AnimatedStat value={12} suffix="+" label="Countries reached" />
            <span className="hidden h-8 w-px bg-border sm:block" />
            <AnimatedStat
              value={4.9}
              decimals={1}
              suffix="★"
              label="From 200+ reviews"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
