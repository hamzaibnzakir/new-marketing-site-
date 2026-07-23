import { Hammer, TrendingUp, Bot } from "lucide-react";
import Reveal from "./Reveal";

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
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
          The System
        </p>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight md:text-4xl">
          How Brainbox actually gets you there
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
        {phases.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.12}>
            <div>
              <div className="flex items-center gap-3">
                <p.icon className="h-6 w-6 text-accent-light" strokeWidth={1.5} />
                <span className="font-display text-sm text-text-muted">
                  {p.n}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
