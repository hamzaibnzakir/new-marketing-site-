import Reveal from "./Reveal";

const testimonials = [
  {
    name: "Rayyan",
    tag: "Scaled with his first tested product",
    quote:
      "I got referred here by a friend. They took me from struggling to make a few low-margin sales to a high-margin profit — from the very first product.",
  },
  {
    name: "Smith",
    tag: "First week in the program",
    quote:
      "I started my journey about a month ago. Just finished the website build and so far so good — they're doing a solid job.",
  },
  {
    name: "Kelvin",
    tag: "Started as a complete beginner",
    quote:
      "I started this without knowing anything about how dropshipping works. Brainbox took me from zero to a scaled store.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
          Student Results
        </p>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight md:text-4xl">
          What students say once they&apos;re in it
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.12}>
            <blockquote className="border-l-2 border-accent-dim pl-6">
              <p className="text-sm leading-relaxed text-text">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <span className="font-display text-sm font-semibold text-accent-light">
                  {t.name}
                </span>
                <span className="block text-xs text-text-muted">{t.tag}</span>
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
