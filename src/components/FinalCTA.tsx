import Link from "next/link";
import Reveal from "./Reveal";
import BorderBeam from "./BorderBeam";

export default function FinalCTA() {
  return (
    <section className="border-t border-border px-6 py-28 text-center md:py-36">
      <Reveal>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-2-light">
          Limited spots available
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance font-display text-3xl font-bold leading-tight md:text-5xl">
          Ready to build your profitable store?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-text-muted">
          Apply now and we&apos;ll walk through your goals, your budget, and
          exactly how the mentorship works for your situation.
        </p>
        <BorderBeam className="mx-auto mt-10 inline-block">
          <Link
            href="/apply"
            className="block bg-accent-2 px-10 py-4 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-2-light"
          >
            Apply for Mentorship
          </Link>
        </BorderBeam>
      </Reveal>
    </section>
  );
}
