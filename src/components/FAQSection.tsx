import Reveal from "./Reveal";

const faqs = [
  {
    q: "What is BrainBox Ecom Lab, and how does it work?",
    a: "BrainBox Ecom Lab is a hands-on e-commerce mentorship program. We combine direct mentorship, AI-driven ad strategy, and store-build support to help you launch, scale, and automate a profitable dropshipping business.",
  },
  {
    q: "How fast can I start making money?",
    a: "Most students make their first sale within 2–4 weeks of following the program's strategies. Results depend on your effort, niche, and ad budget — we guide you through every step.",
  },
  {
    q: "Do I need experience to join?",
    a: "No. The program is built for beginners, while still providing advanced strategy for people already running a store. You get what you need at whatever stage you're starting from.",
  },
  {
    q: "What makes BrainBox different from a generic course?",
    a: "Most courses are pre-recorded videos you watch alone. BrainBox pairs you with direct mentorship on your actual store, AI-driven strategy that adapts to what's working right now, and ongoing community support — not a course you finish once and forget.",
  },
  {
    q: "How do I get support once I've joined?",
    a: "You get access to a private community, direct messaging with your mentor, and regular group calls. Support continues through the program, not just at onboarding.",
  },
  {
    q: "How much does the mentorship cost?",
    a: "Pricing depends on the level of support you need — from guided store setup to a fully done-for-you build. We discuss the right fit and pricing after you apply, so it's matched to your goals rather than a one-size-fits-all number.",
  },
];

export default function FAQSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      {/* Structured data — helps AI answer engines and search surface
          these Q&As directly. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Reveal>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
          FAQ
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
          Have questions? We&apos;ve got answers.
        </h2>
      </Reveal>

      <div className="mt-12 divide-y divide-border border-t border-border">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={Math.min(i * 0.06, 0.3)}>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base font-semibold marker:content-none">
                {f.q}
                <span className="ml-4 shrink-0 text-accent-light transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 pr-8 text-sm leading-relaxed text-text-muted">
                {f.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
