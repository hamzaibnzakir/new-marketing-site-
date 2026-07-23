import { Store, Target, Users, Workflow } from "lucide-react";
import Reveal from "./Reveal";
import BentoCard from "./BentoCard";

const features = [
  {
    icon: Store,
    title: "Store build & optimization",
    body: "A store built around one winning product and a funnel structured to convert — not a theme with your logo on it.",
    span: "md:col-span-2",
  },
  {
    icon: Target,
    title: "AI-powered ad strategy",
    body: "Ad spend directed by data, adjusted as it runs — not a static playbook from three years ago.",
    span: "",
  },
  {
    icon: Users,
    title: "Direct 1-on-1 mentorship",
    body: "You get a mentor on your actual store, not a Discord you post in and hope someone answers.",
    span: "",
  },
  {
    icon: Workflow,
    title: "Automation & systems",
    body: "Once it's working, fulfillment, reporting, and follow-up get systemized so it runs with less of your time — built for the long run, not just the first sale.",
    span: "md:col-span-2",
  },
];

export default function BentoFeatures() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
          What You Get
        </p>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight md:text-4xl">
          Not a course. A build partner.
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.1} className={f.span}>
            <BentoCard
              icon={
                <f.icon
                  className="h-7 w-7 text-accent-light"
                  strokeWidth={1.5}
                />
              }
              title={f.title}
              body={f.body}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
