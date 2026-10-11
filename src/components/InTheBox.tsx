import Reveal from "./Reveal";
import { Container, Eyebrow } from "./ui";

const contents = [
  {
    item: "Store build & product",
    detail: "A Shopify store built around one researched product, with a funnel structured to convert from day one.",
  },
  {
    item: "AI-assisted ad strategy",
    detail: "Meta campaigns planned and adjusted from live data, not a static playbook from three years ago.",
  },
  {
    item: "1-on-1 mentor",
    detail: "Direct messaging with your mentor, working on your actual store, through the whole program.",
  },
  {
    item: "Automation & systems",
    detail: "Once it's selling, fulfillment, follow-up and reporting get systemized so it runs with less of your time.",
  },
];

const alsoPacked = ["Private community", "Regular group calls", "Support after onboarding"];

export default function InTheBox() {
  return (
    <section id="included" className="relative overflow-hidden bg-paper-2 py-24 md:py-36" aria-labelledby="box-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>What&apos;s in the box</Eyebrow>
              <h2 id="box-title" className="serif mt-6 text-[clamp(3.2rem,1.4rem+5vw,6.4rem)]">
                Not a course. <em>A build partner.</em>
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">
                Courses hand you videos and leave the hard part to you. The
                mentorship ships everything a first store needs, plus someone who
                stays on it with you.
              </p>
            </Reveal>

            {/* 3D render, tilted like it's been set down on the slip */}
            <Reveal delay={0.1} className="mt-6 hidden lg:block">
              <div className="bob mx-auto w-[78%] max-w-[460px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/render/box-19.webp"
                  alt=""
                  width={1000}
                  height={1000}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          </div>

          {/* Packing slip */}
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="rotate-[1.2deg] rounded-[6px] bg-paper-3 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)] sm:p-9">
              <div className="flex items-center justify-between border-b-2 border-ink pb-3 font-mono text-[12px] uppercase tracking-[0.12em]">
                <span>Packing slip</span>
                <span>No. 001 · BrainBox</span>
              </div>
              <ul>
                {contents.map((c) => (
                  <li
                    key={c.item}
                    className="grid grid-cols-[2.25rem_1fr] gap-x-3 border-b border-dashed border-line py-5"
                  >
                    <span className="font-mono text-sm text-muted">1x</span>
                    <div>
                      <p className="serif text-[2rem] leading-none">{c.item}</p>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="pt-4 font-mono text-[12px] leading-relaxed text-muted">
                <span className="text-ink">Also packed:</span> {alsoPacked.join(" · ")}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="tape -rotate-2 rounded-[2px] px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em]">
                  Founder-led · 1-on-1
                </span>
                <span aria-hidden="true" className="flex h-8 items-end gap-[2px]">
                  {[3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1].map((w, i) => (
                    <span key={i} className="block h-full bg-ink" style={{ width: w }} />
                  ))}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
