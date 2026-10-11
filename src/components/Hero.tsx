import HeroBox from "./HeroBox";
import { ApplyButton, Container, Eyebrow } from "./ui";

/*
  Stats are carried over from the previous site as stated by the
  business. Keep them only while they're backed by records.
*/
const stats = [
  { value: "300+", label: "students mentored" },
  { value: "12+", label: "countries" },
  { value: "4.9★", label: "from 200+ reviews" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-8 md:pb-20 lg:pt-10">

      <Container>
        <div className="grid items-center gap-y-6 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7 lg:py-16">
            <div className="hero-in" style={{ "--d": 0 } as React.CSSProperties}>
              <Eyebrow>1-on-1 dropshipping mentorship</Eyebrow>
            </div>

            <h1 className="display-xl mt-6 text-[clamp(2.75rem,1.2rem+5.2vw,5.6rem)]">
              <span
                className="hero-in block"
                style={{ "--d": 80 } as React.CSSProperties}
              >
                Build a store
              </span>{" "}
              <span
                className="hero-in block"
                style={{ "--d": 160 } as React.CSSProperties}
              >
                that actually
              </span>{" "}
              <span
                className="hero-in block text-accent-light"
                style={{ "--d": 240 } as React.CSSProperties}
              >
                sells.
              </span>
            </h1>

            <p
              className="hero-in mt-7 max-w-[34rem] text-[17px] leading-relaxed text-text-muted md:text-lg"
              style={{ "--d": 360 } as React.CSSProperties}
            >
              We build your Shopify store with you, run AI-assisted Meta ads
              alongside you, and mentor you 1-on-1 on your actual store, from
              first product to first sales to scaling.
            </p>

            <div
              className="hero-in mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
              style={{ "--d": 460 } as React.CSSProperties}
            >
              <ApplyButton placement="hero" size="lg" />
              <a
                href="#results"
                className="inline-flex h-14 items-center justify-center gap-2 border border-border px-6 font-display text-[15px] font-bold text-text transition-colors hover:border-white/30 sm:border-0 sm:px-0"
              >
                See real results
                <span aria-hidden="true" className="text-accent-light">
                  ↓
                </span>
              </a>
            </div>

            <p
              className="hero-in mt-5 font-mono text-[12px] tracking-wide text-text-muted"
              style={{ "--d": 540 } as React.CSSProperties}
            >
              5 quick questions · We reply on WhatsApp, usually within a day
            </p>
          </div>

          <div className="-mx-[6%] lg:col-span-5 lg:-ml-[18%] lg:mr-[-4%]">
            <div className="mx-auto max-w-[580px] lg:max-w-none">
              <HeroBox />
            </div>
          </div>
        </div>

        <ul
          className="hero-in mt-10 grid grid-cols-3 border-y border-border lg:mt-6"
          style={{ "--d": 700 } as React.CSSProperties}
        >
          {stats.map((s, i) => (
            <li
              key={s.label}
              className={`flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-3 sm:py-6 ${
                i > 0 ? "border-l border-border pl-4 sm:pl-8" : ""
              }`}
            >
              <span className="font-display text-2xl font-bold text-text md:text-3xl">
                {s.value}
              </span>
              <span className="text-[13px] leading-tight text-text-muted">
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
