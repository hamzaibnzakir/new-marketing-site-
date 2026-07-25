import Link from "next/link";
import {
  Layout,
  Sparkles,
  Workflow,
  Building2,
  Search,
  Mail,
} from "lucide-react";
import Reveal from "./Reveal";
import BorderBeam from "./BorderBeam";

const services = [
  { icon: Layout, label: "Premium Store Themes" },
  { icon: Sparkles, label: "Ad Creatives" },
  { icon: Workflow, label: "Sales Funnel Builds" },
  { icon: Building2, label: "LLC & Business Setup" },
  { icon: Search, label: "Product Research" },
  { icon: Mail, label: "Email Marketing" },
];

export default function ExpertServicesSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <p className="text-center font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
          Need One Thing Done Right?
        </p>
        <h2 className="mx-auto mt-4 max-w-lg text-balance text-center font-display text-3xl font-bold leading-tight md:text-4xl">
          À-la-carte expert services
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-text-muted">
          Not ready for full mentorship? Get one specific thing handled by
          the same experts — no fixed pricing, quoted to your scope.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2.5 border border-border bg-surface px-4 py-3"
            >
              <s.icon
                className="h-4 w-4 shrink-0 text-accent-light"
                strokeWidth={1.5}
              />
              <span className="text-xs text-text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.25} className="mt-10 text-center">
        <BorderBeam className="inline-block">
          <Link
            href="https://experts.brainboxecomlab.com/"
            target="_blank"
            rel="noreferrer"
            className="block bg-accent-2 px-8 py-4 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-2-light"
          >
            Explore Expert Services
          </Link>
        </BorderBeam>
        <p className="mt-4 text-xs text-text-muted">
          Same experts behind our mentorship · Quote within 24 hours
        </p>
      </Reveal>
    </section>
  );
}
