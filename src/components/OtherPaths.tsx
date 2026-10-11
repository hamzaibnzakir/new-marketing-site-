import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { Container, Eyebrow } from "./ui";
import { AI_TOOLS_URL, EXPERTS_URL } from "@/lib/links";

/*
  The free toolkit and à-la-carte services used to be two full-width
  sections with their own crimson CTAs, competing with Apply in the
  middle of the page. They're grouped here as clearly secondary options
  for visitors who aren't ready for the full mentorship.
*/
const paths = [
  {
    kicker: "Free",
    title: "Brainbox AI toolkit",
    body: "AI tools for Shopify dropshippers. Free to start, no credit card, 2 free uses per tool every day.",
    items: [
      "Product research",
      "Ad metrics analyser",
      "Ad creative analyser",
      "Store auditor",
      "Product descriptions",
      "Ad copy generator",
      "Email sequences",
      "Competitor spy",
      "Profit calculator",
    ],
    cta: "Try Brainbox AI free",
    href: AI_TOOLS_URL,
    placement: "ai_tools",
  },
  {
    kicker: "Quoted to your scope",
    title: "Expert services",
    body: "One specific thing done right by the same experts behind the mentorship. Quote within 24 hours.",
    items: [
      "Premium store themes",
      "Ad creatives",
      "Sales funnel builds",
      "LLC & business setup",
      "Product research",
      "Email marketing",
    ],
    cta: "Explore expert services",
    href: EXPERTS_URL,
    placement: "experts",
  },
];

export default function OtherPaths() {
  return (
    <section
      className="bg-paper-2 py-24 md:py-32"
      aria-labelledby="paths-title"
    >
      <Container>
        <Reveal>
          <Eyebrow>Not ready for full mentorship?</Eyebrow>
          <h2
            id="paths-title"
            className="serif mt-6 max-w-2xl text-[clamp(2.8rem,1.4rem+3.6vw,4.8rem)]"
          >
            Two smaller <em>ways to start.</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {paths.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-[22px] bg-paper-3 p-7 md:p-9">
                <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-forest">
                  {p.kicker}
                </p>
                <h3 className="serif mt-3 text-[2.6rem] leading-none">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                  {p.body}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full border border-line px-3 py-1.5 text-[13px] text-muted"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="flex-1" />
                <Link
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  data-bb-placement={p.placement}
                  className="group mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-full border border-ink px-5 text-[15px] font-medium transition-colors hover:bg-ink hover:text-on-dark"
                >
                  {p.cta}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
