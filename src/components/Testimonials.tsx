import Reveal from "./Reveal";
import { Container, Eyebrow } from "./ui";

/*
  Real quotes and videos from the previous site, unchanged. Presented as
  folder-tab cards. No star ratings: there's no rating data behind these.
*/
const quotes = [
  {
    name: "Kelvin",
    tag: "Started as a complete beginner",
    quote:
      "I started this without knowing anything about how dropshipping works. Brainbox took me from zero to a scaled store.",
    tone: "tape",
  },
  {
    name: "Rayyan",
    tag: "Scaled with his first tested product",
    quote:
      "I got referred here by a friend. They took me from struggling to make a few low-margin sales to a high-margin profit — from the very first product.",
    tone: "paper",
  },
  {
    name: "Smith",
    tag: "About a month into the program",
    quote:
      "I started my journey about a month ago. Just finished the website build and so far so good — they're doing a solid job.",
    tone: "tape",
  },
];

const videos = [
  { src: "/kelvin.mp4", poster: "/posters/kelvin.jpg", label: "Kelvin: started as a complete beginner" },
  { src: "/video.mp4", poster: "/posters/video.jpg", label: "Student store walkthrough" },
  { src: "/lv_0_20250220054830.mp4", poster: "/posters/lv_0_20250220054830.jpg", label: "Live scaling session" },
  { src: "/VID-20250222-WA0003.mp4", poster: "/posters/VID-20250222-WA0003.jpg", label: "Behind the scenes" },
];

export default function Testimonials() {
  return (
    <section id="stories" className="bg-paper py-24 md:py-36" aria-labelledby="stories-title">
      <Container>
        <Reveal>
          <Eyebrow>Students</Eyebrow>
          <h2 id="stories-title" className="serif mt-6 text-[clamp(3.2rem,1.4rem+5vw,6.4rem)]">
            In their <em>own words.</em>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-x-4 gap-y-10 md:grid-cols-3">
          {quotes.map((q, i) => (
            <li key={q.name}>
              <Reveal delay={i * 0.08} className="h-full">
                <figure className="flex h-full flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 motion-reduce:transition-none">
                  {/* folder tab */}
                  <div className="flex">
                    <span className="rounded-t-[14px] bg-ink px-5 pb-2 pt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-tape">
                      {q.name}
                    </span>
                  </div>
                  <div
                    className={`flex flex-1 flex-col rounded-[0_18px_18px_18px] border-t-[6px] border-ink p-7 ${
                      q.tone === "tape" ? "bg-tape" : "bg-paper-3"
                    }`}
                  >
                    <blockquote className="serif text-[1.9rem] leading-[1.08]">
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-auto flex items-center gap-3 pt-8">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-serif text-lg text-tape">
                        {q.name[0]}
                      </span>
                      <span>
                        <span className="block text-[15px] font-medium">{q.name}</span>
                        <span className="block font-mono text-[11px] text-ink/70">{q.tag}</span>
                      </span>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-20">
          <h3 className="serif text-[2.4rem]">Straight from students</h3>
        </Reveal>
        <ul className="snap-strip -mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {videos.map((v) => (
            <li key={v.src} className="w-[62vw] max-w-[260px] shrink-0 snap-start md:w-auto md:max-w-none">
              <figure>
                <video
                  src={v.src}
                  poster={v.poster}
                  controls
                  preload="none"
                  playsInline
                  aria-label={v.label}
                  className="aspect-[9/16] w-full rounded-[18px] bg-ink object-cover"
                />
                <figcaption className="mt-3 font-mono text-[12px] text-muted">{v.label}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
