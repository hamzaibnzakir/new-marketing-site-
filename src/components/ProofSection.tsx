import Image from "next/image";
import Reveal from "./Reveal";
import CanvasMarquee from "./CanvasMarquee";
import { proofItems } from "@/lib/proof";

const videos = [
  { src: "/kelvin.mp4", label: "Kelvin — started with zero experience" },
  { src: "/video.mp4", label: "Student store walkthrough" },
  { src: "/lv_0_20250220054830.mp4", label: "Live scaling session" },
  { src: "/VID-20250222-WA0003.mp4", label: "Behind the scenes" },
];

export default function ProofSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
            Social Proof
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">
            Real stores. Real numbers. No stock screenshots.
          </h2>
          <p className="mt-4 max-w-xl text-text-muted">
            Every card below is from an actual student or Brainbox-run store
            dashboard — unedited, including the slow weeks.
          </p>
        </Reveal>
      </div>

      {/* Canvas-rendered infinite marquee — full bleed, GPU-accelerated */}
      <Reveal className="mt-14">
        <CanvasMarquee items={proofItems} />
      </Reveal>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h3 className="mt-24 font-display text-2xl font-bold">
            Straight from students
          </h3>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v, i) => (
            <Reveal key={v.src} delay={i * 0.08}>
              <div className="group border border-border transition-colors hover:border-accent-dim">
                <video
                  src={v.src}
                  controls
                  preload="none"
                  playsInline
                  className="aspect-[9/16] w-full bg-surface object-cover"
                />
                <p className="p-3 text-xs text-text-muted">{v.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="mt-24 font-display text-2xl font-bold">
            Full detail
          </h3>
          <p className="mt-2 text-sm text-text-muted">
            Every card from the marquee above, at full resolution.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {proofItems.map((item, i) => (
            <Reveal
              key={item.src}
              delay={(i % 4) * 0.08}
              className={item.wide ? "col-span-2" : undefined}
            >
              <figure className="group relative overflow-hidden border border-border bg-surface transition-colors hover:border-accent-dim">
                <div
                  className={`relative w-full ${
                    item.wide ? "aspect-[21/8]" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3">
                  <span className="block font-display text-lg font-bold text-accent-light">
                    {item.stat}
                  </span>
                  <span className="block text-[11px] text-text-muted">
                    {item.label}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
