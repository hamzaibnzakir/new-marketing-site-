import Image from "next/image";
import Reveal from "./Reveal";
import { Container, Eyebrow } from "./ui";

const contents = [
  {
    qty: "1x",
    item: "Store build & product",
    detail:
      "A Shopify store built around one researched product, with a funnel structured to convert from day one.",
  },
  {
    qty: "1x",
    item: "AI-assisted ad strategy",
    detail:
      "Meta campaigns planned and adjusted from live data, not a static playbook from three years ago.",
  },
  {
    qty: "1x",
    item: "1-on-1 mentor",
    detail:
      "Direct messaging with your mentor, working on your actual store, through the whole program.",
  },
  {
    qty: "1x",
    item: "Automation & systems",
    detail:
      "Once it's selling, fulfillment, follow-up and reporting get systemized so it runs with less of your time.",
  },
];

const alsoPacked = ["Private community", "Regular group calls", "Ongoing support after onboarding"];

export default function InTheBox() {
  return (
    <section
      id="included"
      className="relative border-t border-border bg-surface py-24 md:py-36"
      aria-labelledby="box-title"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>What&apos;s in the box</Eyebrow>
              <h2
                id="box-title"
                className="display-xl mt-5 text-[clamp(2.2rem,1rem+3.8vw,4.2rem)]"
              >
                Not a course.
                <br />
                <span className="text-accent-light">A build partner.</span>
              </h2>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-text-muted">
                Courses hand you videos and leave the hard part to you. The
                mentorship ships everything a first store needs, and someone
                who stays on it with you.
              </p>
            </Reveal>

            {/* Packing slip */}
            <Reveal delay={0.1}>
              <div className="mt-12 bg-bone p-6 text-bone-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] sm:p-8">
                <div className="flex items-center justify-between border-b-2 border-bone-ink pb-3 font-mono text-[12px] uppercase tracking-[0.12em]">
                  <span>Packing slip</span>
                  <span>BrainBox Ecom Lab</span>
                </div>
                <ul>
                  {contents.map((c) => (
                    <li
                      key={c.item}
                      className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-dashed border-bone-border py-5"
                    >
                      <span className="font-mono text-sm text-bone-muted">
                        {c.qty}
                      </span>
                      <div>
                        <p className="font-display text-lg font-bold tracking-tight">
                          {c.item}
                        </p>
                        <p className="mt-1 text-[15px] leading-relaxed text-bone-muted">
                          {c.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="pt-4 font-mono text-[12px] leading-relaxed text-bone-muted">
                  <span className="text-bone-ink">Also packed:</span>{" "}
                  {alsoPacked.join(" · ")}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Mentor */}
          <Reveal delay={0.15} className="lg:col-span-5 lg:pt-24">
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <Image
                  src="/photo_2026-01-17_19-22-43.jpg"
                  alt="BrainBox Ecom Lab mentor in a dark suit, arms folded, looking at the camera"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[50%_25%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"
                />
              </div>
              <figcaption className="relative -mt-16 ml-5 mr-5 border-l-2 border-accent-light bg-black/85 p-5 backdrop-blur-sm sm:ml-8 sm:mr-auto sm:max-w-sm">
                <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-light">
                  Founder · BrainBox Ecom Lab
                </p>
                <p className="mt-2 font-display text-lg font-bold leading-snug">
                  Founder-led and 1-on-1. Not a login and a good-luck message.
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
