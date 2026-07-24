import Reveal from "./Reveal";
import ScrollSpotlight from "./ScrollSpotlight";

const spots = [
  {
    id: "sales",
    label: "Total Sales",
    description: "Real-time revenue, updated as orders come in.",
    x: 5,
    y: 21,
    width: 90,
    height: 13,
  },
  {
    id: "ads",
    label: "Ad Spend",
    description: "What you're putting in — tracked next to what comes back.",
    x: 5,
    y: 36,
    width: 90,
    height: 13,
  },
  {
    id: "roas",
    label: "ROAS",
    description: "Return on ad spend — the number that tells you if it's working.",
    x: 5,
    y: 51,
    width: 90,
    height: 16,
  },
  {
    id: "profit",
    label: "Net Profit",
    description: "After ad spend and costs — what you actually keep.",
    x: 5,
    y: 70,
    width: 90,
    height: 13,
  },
  {
    id: "meta",
    label: "Meta ROAS",
    description: "Platform-reported return, cross-checked against your own numbers.",
    x: 5,
    y: 86,
    width: 90,
    height: 12,
  },
];

export default function DashboardWalkthrough() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <p className="text-center font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
          What You&apos;ll See
        </p>
        <h2 className="mx-auto mt-4 max-w-xl text-balance text-center font-display text-3xl font-bold leading-tight md:text-4xl">
          Real dashboard. Real student.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-text-muted">
          This is an actual store summary — not a mockup. Here&apos;s what
          each number means once you&apos;re tracking your own.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-14">
        <ScrollSpotlight
          imageSrc="/proof/proof-04-summary-26k.png"
          imageWidth={385}
          imageHeight={846}
          alt="Shopify summary dashboard showing total sales, ad spend, ROAS, net profit, and Meta ROAS"
          spots={spots}
        />
      </Reveal>
    </section>
  );
}
