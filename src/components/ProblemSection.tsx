import Reveal from "./Reveal";
import { Container, Eyebrow } from "./ui";

/*
  These are the exact obstacles applicants pick on the application form
  (go-brainbox, "What's the biggest thing holding you back?"), so this
  section speaks in the visitor's own words, then says plainly what
  BrainBox does about each one.
*/
const rows = [
  {
    worry: "I don't know what to sell.",
    answer:
      "Product research happens with you, on data, before a store is built around it, not after you've already paid for a theme.",
  },
  {
    worry: "I don't know how to run ads.",
    answer:
      "We set up and run AI-assisted Meta campaigns alongside you, and you learn to read the numbers as they move.",
  },
  {
    worry: "My store isn't converting.",
    answer:
      "Your store is built around one product and a funnel designed to convert, not a generic theme with your logo on it.",
  },
  {
    worry: "I don't have time to figure it out alone.",
    answer:
      "A mentor works on your actual store with you, instead of a Discord you post in and hope someone answers.",
  },
  {
    worry: "I'm worried about losing money.",
    answer:
      "Your budget is the first thing we talk about, so the plan fits what you can actually spend on ads and tools.",
  },
];

export default function ProblemSection() {
  return (
    <section
      className="py-24 md:py-36"
      aria-labelledby="problem-title"
    >
      <Container>
        <Reveal>
          <Eyebrow>Sound familiar?</Eyebrow>
          <h2
            id="problem-title"
            className="display-xl mt-5 max-w-4xl text-[clamp(2.2rem,1rem+3.8vw,4.2rem)]"
          >
            Most first stores stall for the same five reasons.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-text-muted">
            These are the answers people pick most when they apply. Here&apos;s
            what we do about each one.
          </p>
        </Reveal>

        <ol className="mt-14 border-t border-border md:mt-20">
          {rows.map((r, i) => (
            <li key={r.worry} className="border-b border-border">
              <Reveal delay={Math.min(i * 0.05, 0.2)}>
                <div className="group grid gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                  <span className="font-mono text-[12px] text-text-muted md:col-span-1 md:pt-3">
                    0{i + 1}
                  </span>
                  <p className="font-display text-[clamp(1.5rem,1rem+1.6vw,2.4rem)] font-bold leading-[1.1] tracking-tight transition-colors duration-300 md:col-span-6 md:group-hover:text-accent-light">
                    &ldquo;{r.worry}&rdquo;
                  </p>
                  <p className="max-w-md text-[16px] leading-relaxed text-text-muted md:col-span-5 md:pt-2">
                    {r.answer}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
