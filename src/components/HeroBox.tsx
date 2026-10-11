/**
 * The hero visual: an open BrainBox shipping box, sealed with BrainBox
 * packing tape, with real dashboard figures rising out of it.
 *
 * Metaphor: everything a first store needs (the build, the ads, the
 * mentor) arrives in one box, and what comes out of it is sales.
 *
 * Built as two isometric SVG layers with HTML cards sandwiched between
 * them, so the cards genuinely sit INSIDE the box: the back walls and back
 * flaps render behind the cards, the front faces render in front of them.
 * All three layers share one 640x600 coordinate system via the fixed
 * aspect ratio on .hero-box.
 *
 * Isometric points (viewBox -20 -80 640 600):
 *   top rim:    back (300,60)  right (525,190)  front (300,320)  left (75,190)
 *   bottom:     right (525,360) front (300,490) left (75,360)
 *
 * The figures on the cards are read off real dashboards shown in the
 * proof section (see src/lib/proof.ts). Don't put a number here that
 * isn't in one of those screenshots.
 */

import Image from "next/image";

const TAPE_TEXT =
  "BRAINBOX ✦ BUILT ✦ ADVERTISED ✦ SHIPPED ✦ BRAINBOX ✦ BUILT ✦ ADVERTISED ✦ ";

function BackLayer() {
  return (
    <svg viewBox="-20 -80 640 600" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="hb-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2ecc8f" stopOpacity="0.32" />
          <stop offset="55%" stopColor="#0f5c3f" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0f5c3f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hb-inner-glow" cx="50%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#2ecc8f" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#0f5c3f" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0f5c3f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hb-flap-br" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1e2421" />
          <stop offset="100%" stopColor="#2a322e" />
        </linearGradient>
        <linearGradient id="hb-flap-bl" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#151917" />
          <stop offset="100%" stopColor="#1f2522" />
        </linearGradient>
        <clipPath id="hb-opening">
          <polygon points="300,60 525,190 300,320 75,190" />
        </clipPath>
        <filter id="hb-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* aura behind the whole box */}
      <ellipse
        className="box-glow"
        cx="300"
        cy="150"
        rx="320"
        ry="250"
        fill="url(#hb-aura)"
      />

      {/* ground shadow */}
      <ellipse
        cx="300"
        cy="492"
        rx="270"
        ry="34"
        fill="#000"
        opacity="0.85"
        filter="url(#hb-soft)"
      />

      {/* back flaps, standing open */}
      <polygon
        points="300,60 525,190 573,67 348,-63"
        fill="url(#hb-flap-br)"
        stroke="rgba(46,204,143,0.28)"
        strokeWidth="1"
      />
      <polygon
        points="300,60 75,190 27,67 252,-63"
        fill="url(#hb-flap-bl)"
        stroke="rgba(46,204,143,0.22)"
        strokeWidth="1"
      />

      {/* inside of the box */}
      <g clipPath="url(#hb-opening)">
        <polygon points="300,60 75,190 75,360 300,230" fill="#0a0c0b" />
        <polygon points="300,60 525,190 525,360 300,230" fill="#101412" />
        <polygon points="300,230 525,360 300,490 75,360" fill="#060706" />
        <ellipse
          className="box-glow"
          cx="300"
          cy="190"
          rx="230"
          ry="140"
          fill="url(#hb-inner-glow)"
        />
      </g>
    </svg>
  );
}

function FrontLayer() {
  return (
    <svg viewBox="-20 -80 640 600" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hb-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d2220" />
          <stop offset="100%" stopColor="#0f1211" />
        </linearGradient>
        <linearGradient id="hb-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141816" />
          <stop offset="100%" stopColor="#090a0a" />
        </linearGradient>
        <linearGradient id="hb-tape" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a52539" />
          <stop offset="45%" stopColor="#8c1d2e" />
          <stop offset="100%" stopColor="#6e1523" />
        </linearGradient>
        <linearGradient id="hb-flap-fr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#262d2a" />
          <stop offset="100%" stopColor="#1a1f1d" />
        </linearGradient>
        <linearGradient id="hb-flap-fl" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#1f2522" />
          <stop offset="100%" stopColor="#151917" />
        </linearGradient>
        <clipPath id="hb-left-face">
          <polygon points="75,190 300,320 300,490 75,360" />
        </clipPath>
        <clipPath id="hb-right-face">
          <polygon points="525,190 300,320 300,490 525,360" />
        </clipPath>
      </defs>

      {/* left face (plane y = depth) */}
      <polygon points="75,190 300,320 300,490 75,360" fill="url(#hb-left)" />
      {/* embossed wordmark on the left face */}
      <g clipPath="url(#hb-left-face)">
        <text
          transform="matrix(0.866 0.5 0 1 75 338)"
          x="40"
          y="0"
          fontFamily="var(--font-syne), sans-serif"
          fontWeight="800"
          fontSize="25"
          letterSpacing="0"
          fill="#1a1f1c"
        >
          BRAINBOX
        </text>
      </g>

      {/* right face (plane x = width) */}
      <polygon points="525,190 300,320 300,490 525,360" fill="url(#hb-right)" />

      {/* shipping label on the right face */}
      <g transform="matrix(0.866 -0.5 0 1 300 418)">
        <rect x="34" y="0" width="140" height="52" fill="#e9e4d8" />
        <rect x="34" y="0" width="140" height="11" fill="#121212" />
        <text
          x="40"
          y="8.2"
          fontFamily="var(--font-plex-mono), monospace"
          fontSize="6.5"
          letterSpacing="1.2"
          fill="#e9e4d8"
        >
          SHIP TO: YOUR FIRST SALE
        </text>
        <text
          x="40"
          y="23"
          fontFamily="var(--font-plex-mono), monospace"
          fontSize="6.8"
          fill="#121212"
        >
          CONTENTS
        </text>
        <text
          x="40"
          y="33"
          fontFamily="var(--font-plex-mono), monospace"
          fontSize="6.8"
          fill="#121212"
        >
          1x STORE BUILD · 1x AD PLAN
        </text>
        <text
          x="40"
          y="43"
          fontFamily="var(--font-plex-mono), monospace"
          fontSize="6.8"
          fill="#121212"
        >
          1x MENTOR (1-ON-1)
        </text>
        {/* barcode */}
        <g fill="#121212">
          {[0, 3, 5, 9, 11, 12, 16, 19, 21, 22, 26].map((x, i) => (
            <rect
              key={x}
              x={150 + x * 0.8}
              y="16"
              width={i % 3 === 0 ? 1.4 : 0.8}
              height="30"
            />
          ))}
        </g>
      </g>

      {/* packing tape band wrapping both faces */}
      <polygon points="75,255 300,385 300,350 75,220" fill="url(#hb-tape)" />
      <polygon
        points="300,385 525,255 525,220 300,350"
        fill="url(#hb-tape)"
        opacity="0.94"
      />
      <g clipPath="url(#hb-left-face)">
        <text
          transform="matrix(0.866 0.5 0 1 75 220)"
          x="-40"
          y="22.5"
          fontFamily="var(--font-plex-mono), monospace"
          fontWeight="500"
          fontSize="11"
          letterSpacing="2.4"
          fill="#f4dfe2"
        >
          {TAPE_TEXT}
        </text>
      </g>
      <g clipPath="url(#hb-right-face)">
        <text
          transform="matrix(0.866 -0.5 0 1 300 350)"
          x="-6"
          y="22.5"
          fontFamily="var(--font-plex-mono), monospace"
          fontWeight="500"
          fontSize="11"
          letterSpacing="2.4"
          fill="#f4dfe2"
        >
          {TAPE_TEXT}
        </text>
      </g>

      {/* edges */}
      <line x1="300" y1="320" x2="300" y2="490" stroke="rgba(240,237,230,0.10)" />
      <polyline
        points="75,360 300,490 525,360"
        fill="none"
        stroke="rgba(0,0,0,0.6)"
      />

      {/* front flaps, folded open outward */}
      <polygon
        points="525,190 300,320 367,314 592,184"
        fill="url(#hb-flap-fr)"
        stroke="rgba(46,204,143,0.35)"
        strokeWidth="1"
      />
      <polygon
        points="75,190 300,320 233,314 8,184"
        fill="url(#hb-flap-fl)"
        stroke="rgba(46,204,143,0.3)"
        strokeWidth="1"
      />

      {/* lit rim along the front of the opening */}
      <polyline
        points="75,190 300,320 525,190"
        fill="none"
        stroke="#2ecc8f"
        strokeOpacity="0.75"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const cards = [
  {
    // left card
    style: { left: "14.4%", top: "31%", width: "27.8%", height: "36.5%" },
    rotate: -8,
    delay: 650,
    float: { dur: "7.5s", fd: "-1.2s" },
    label: "Purchase ROAS",
    value: "7.38x",
    valueSize: "clamp(15px, 4.6cqw, 34px)",
    sub: "Meta Ads Manager",
  },
  {
    // centre card
    style: { left: "33.6%", top: "22.5%", width: "32.8%", height: "45.5%" },
    rotate: 0,
    delay: 500,
    float: { dur: "6.5s", fd: "0s" },
    label: "Sales · last 30 days",
    value: "$126,432",
    valueSize: "clamp(14px, 3.6cqw, 27px)",
    sub: "2,160 orders",
    center: true,
  },
  {
    // right card
    style: { left: "58.1%", top: "33%", width: "27.8%", height: "35.5%" },
    rotate: 7,
    delay: 800,
    float: { dur: "8s", fd: "-2.4s" },
    label: "Net profit · 1 day",
    value: "$13,992",
    valueSize: "clamp(13px, 3.4cqw, 25px)",
    sub: "on $26,534 in sales",
  },
];

export default function HeroBox() {
  return (
    <figure className="box-in">
      <div className="hero-box">
        <BackLayer />

        <div className="hero-box-layer" aria-hidden="true">
          {cards.map((c) => (
            <div
              key={c.label}
              className="absolute"
              style={{ ...c.style, transform: `rotate(${c.rotate}deg)` }}
            >
              <div
                className="card-unbox h-full w-full"
                style={{ "--d": c.delay } as React.CSSProperties}
              >
                <div
                  className="card-float h-full w-full"
                  style={
                    {
                      "--dur": c.float.dur,
                      "--fd": c.float.fd,
                    } as React.CSSProperties
                  }
                >
                  <div className="data-card inset-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`inline-block h-[0.45em] w-[0.45em] rounded-full ${
                          c.center ? "bg-[#2ecc8f]" : "bg-[#0f5c3f]"
                        }`}
                        style={{ fontSize: "clamp(8px, 1.65cqw, 12px)" }}
                      />
                      <span className="dc-label">{c.label}</span>
                    </div>
                    <div className="dc-value" style={{ fontSize: c.valueSize }}>
                      {c.value}
                    </div>
                    <div className="dc-sub">{c.sub}</div>
                    {c.center && (
                      // The actual dashboard these figures come from.
                      <div className="relative mt-[8%] aspect-[438/167] w-full overflow-hidden rounded-[3px] border border-black/10">
                        <Image
                          src="/proof/proof-07-30day-126k.png"
                          alt=""
                          fill
                          sizes="200px"
                          className="object-cover object-top"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <FrontLayer />
      </div>
      <figcaption className="mx-auto mt-2 max-w-[34ch] text-center font-mono text-[11px] leading-relaxed tracking-wide text-text-muted lg:mt-0">
        Figures from real student and BrainBox-run store dashboards.{" "}
        <a
          href="#results"
          className="text-accent-light underline-offset-4 hover:underline"
        >
          See them below
        </a>
      </figcaption>
    </figure>
  );
}
