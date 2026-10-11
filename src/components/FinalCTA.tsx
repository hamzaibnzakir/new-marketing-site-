import Reveal from "./Reveal";
import { ApplyButton, Container, Eyebrow } from "./ui";

/** The hero box again, closed and taped: the page's visual bookend. */
function ClosedBox() {
  return (
    <svg
      viewBox="40 20 520 500"
      aria-hidden="true"
      focusable="false"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="cb-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d2220" />
          <stop offset="100%" stopColor="#0f1211" />
        </linearGradient>
        <linearGradient id="cb-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141816" />
          <stop offset="100%" stopColor="#090a0a" />
        </linearGradient>
        <linearGradient id="cb-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2c3330" />
          <stop offset="100%" stopColor="#1f2522" />
        </linearGradient>
      </defs>
      <ellipse cx="300" cy="500" rx="250" ry="22" fill="#000" opacity="0.18" />
      <polygon points="75,190 300,320 300,490 75,360" fill="url(#cb-left)" />
      <polygon points="525,190 300,320 300,490 525,360" fill="url(#cb-right)" />
      <polygon points="300,60 525,190 300,320 75,190" fill="url(#cb-top)" />
      {/* seam between the top flaps */}
      <line x1="412" y1="125" x2="187" y2="255" stroke="#0b0d0c" strokeWidth="2" />
      {/* tape over the seam and down the front */}
      <polygon points="397,116 428,134 203,264 172,246" fill="#8c1d2e" />
      <polygon points="172,246 203,264 203,330 172,312" fill="#7a1828" />
      <polyline
        points="75,190 300,320 525,190"
        fill="none"
        stroke="#2ecc8f"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      {/* label */}
      <g transform="matrix(0.866 -0.5 0 1 300 418)">
        <rect x="34" y="0" width="140" height="44" fill="#e9e4d8" />
        <text
          x="42"
          y="18"
          fontFamily="var(--font-plex-mono), monospace"
          fontSize="8"
          fill="#121212"
        >
          READY TO SHIP
        </text>
        <text
          x="42"
          y="32"
          fontFamily="var(--font-plex-mono), monospace"
          fontSize="8"
          fill="#0f5c3f"
        >
          → YOUR STORE
        </text>
      </g>
    </svg>
  );
}

export default function FinalCTA() {
  return (
    <section
      className="overflow-hidden bg-bone py-24 text-bone-ink md:py-32"
      aria-labelledby="cta-title"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow tone="light">Ready when you are</Eyebrow>
            <h2
              id="cta-title"
              className="display-xl mt-5 text-[clamp(2.6rem,1rem+5vw,5.4rem)]"
            >
              Let&apos;s build a store that actually sells.
            </h2>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-bone-muted">
              Answer five quick questions. We&apos;ll reply on WhatsApp,
              usually within a day, to talk through your goals, your budget
              and whether the mentorship fits.
            </p>
            <div className="mt-9">
              <ApplyButton placement="final" size="lg" />
            </div>
          </Reveal>
          <Reveal
            delay={0.12}
            className="mx-auto w-full max-w-[360px] lg:col-span-5 lg:max-w-[440px]"
          >
            <ClosedBox />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
