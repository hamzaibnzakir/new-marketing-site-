import Reveal from "./Reveal";
import FAQItem from "./FAQItem";
import { ApplyButton, Container, Eyebrow } from "./ui";

const faqs = [
  {
    q: "What is BrainBox Ecom Lab, and how does it work?",
    a: "BrainBox Ecom Lab is a hands-on e-commerce mentorship program. We combine direct 1-on-1 mentorship, AI-assisted ad strategy and store-build support to help you launch, scale and automate a dropshipping business.",
  },
  {
    q: "Do I need experience to join?",
    a: "No. The program is built for complete beginners, while still covering advanced strategy for people already running a store. You get what you need from wherever you're starting.",
  },
  {
    q: "What happens after I apply?",
    a: "You answer five quick multiple-choice questions and leave your contact details. We reply on WhatsApp, usually within a day, to talk through your goals, your budget and whether the mentorship is the right fit.",
  },
  {
    q: "How much does the mentorship cost?",
    a: "Pricing depends on the level of support you need, from guided store setup to a fully done-for-you build. We go through the right fit and pricing after you apply, so it's matched to your goals rather than a one-size-fits-all number.",
  },
  {
    q: "Do I need a separate budget for ads?",
    a: "Yes. Apart from the mentorship itself, a store needs an operating budget for ads and tools. The application asks what you're working with so the plan we suggest is realistic for it.",
  },
  {
    q: "How fast can I start making money?",
    a: "Most students make their first sale within 2–4 weeks of following the program's strategies. Results depend on your effort, niche and ad budget, and no result is guaranteed. We guide you through every step.",
  },
  {
    q: "How do I get support once I've joined?",
    a: "You get direct messaging with your mentor, regular group calls and a private community. Support continues through the program, not just at onboarding.",
  },
];

export default function FAQSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      id="faq"
      className="border-t border-border py-24 md:py-36"
      aria-labelledby="faq-title"
    >
      {/* Structured data so search and AI answer engines can surface these Q&As. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow>FAQ</Eyebrow>
                <h2
                  id="faq-title"
                  className="display-xl mt-5 text-[clamp(2.2rem,1rem+3.2vw,3.6rem)]"
                >
                  Before you apply.
                </h2>
                <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-text-muted">
                  Anything else, ask us in the application. Every one gets a
                  real reply.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="divide-y divide-border border-y border-border lg:col-span-8">
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
        <div className="mt-12 lg:hidden">
          <ApplyButton placement="faq" />
        </div>
      </Container>
    </section>
  );
}
