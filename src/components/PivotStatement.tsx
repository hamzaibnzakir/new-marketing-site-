import Reveal from "./Reveal";

export default function PivotStatement() {
  return (
    <section className="border-y border-border bg-black px-6 py-28 md:py-36">
      <Reveal>
        <p className="mx-auto max-w-4xl text-balance text-center font-display text-2xl font-bold leading-snug md:text-4xl">
          Most courses teach you theory and leave you to figure out the rest.
          We build the store, run the ads, and stay in it with you until{" "}
          <span className="text-accent-light">it actually sells.</span>
        </p>
      </Reveal>
    </section>
  );
}
