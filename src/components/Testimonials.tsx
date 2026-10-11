import Reveal from "./Reveal";
import { Container, Eyebrow } from "./ui";

/*
  Quotes and videos are the real ones from the previous site, unchanged.
  Kelvin's video and quote are paired because they're the same student.
*/
const kelvin = {
  name: "Kelvin",
  tag: "Started as a complete beginner",
  quote:
    "I started this without knowing anything about how dropshipping works. Brainbox took me from zero to a scaled store.",
  video: { src: "/kelvin.mp4", poster: "/posters/kelvin.jpg" },
};

const quotes = [
  {
    name: "Rayyan",
    tag: "Scaled with his first tested product",
    quote:
      "I got referred here by a friend. They took me from struggling to make a few low-margin sales to a high-margin profit — from the very first product.",
  },
  {
    name: "Smith",
    tag: "About a month into the program",
    quote:
      "I started my journey about a month ago. Just finished the website build and so far so good — they're doing a solid job.",
  },
];

const videos = [
  {
    src: "/video.mp4",
    poster: "/posters/video.jpg",
    label: "Student store walkthrough",
  },
  {
    src: "/lv_0_20250220054830.mp4",
    poster: "/posters/lv_0_20250220054830.jpg",
    label: "Live scaling session",
  },
  {
    src: "/VID-20250222-WA0003.mp4",
    poster: "/posters/VID-20250222-WA0003.jpg",
    label: "Behind the scenes",
  },
];

function Video({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  return (
    <figure>
      <video
        src={src}
        poster={poster}
        controls
        preload="none"
        playsInline
        aria-label={label}
        className="aspect-[9/16] w-full bg-surface object-cover"
      />
      <figcaption className="mt-3 font-mono text-[12px] text-text-muted">
        {label}
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section
      id="stories"
      className="border-t border-border py-24 md:py-36"
      aria-labelledby="stories-title"
    >
      <Container>
        <Reveal>
          <Eyebrow>Students</Eyebrow>
          <h2
            id="stories-title"
            className="display-xl mt-5 text-[clamp(2.2rem,1rem+3.8vw,4.2rem)]"
          >
            In their own words.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-12">
          <Reveal className="mx-auto w-full max-w-[340px] lg:col-span-4 lg:max-w-none">
            <Video
              src={kelvin.video.src}
              poster={kelvin.video.poster}
              label={`${kelvin.name}: ${kelvin.tag.toLowerCase()}`}
            />
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <blockquote className="border-l-2 border-accent-light pl-6 md:pl-8">
                <p className="font-display text-[clamp(1.6rem,1rem+1.9vw,2.75rem)] font-bold leading-[1.15] tracking-tight">
                  &ldquo;{kelvin.quote}&rdquo;
                </p>
                <footer className="mt-6">
                  <cite className="not-italic">
                    <span className="font-display text-lg font-bold text-accent-light">
                      {kelvin.name}
                    </span>
                    <span className="ml-3 font-mono text-[12px] text-text-muted">
                      {kelvin.tag}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {quotes.map((q, i) => (
                <Reveal key={q.name} delay={0.12 + i * 0.08} className="h-full">
                  <blockquote className="flex h-full flex-col border border-border bg-surface p-6">
                    <p className="text-[16px] leading-relaxed text-text">
                      &ldquo;{q.quote}&rdquo;
                    </p>
                    <footer className="mt-auto pt-5">
                      <cite className="not-italic">
                        <span className="block font-display font-bold text-accent-light">
                          {q.name}
                        </span>
                        <span className="block font-mono text-[12px] text-text-muted">
                          {q.tag}
                        </span>
                      </cite>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mt-20">
          <h3 className="font-display text-xl font-bold">More from students</h3>
        </Reveal>
        <ul className="snap-strip -mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {videos.map((v) => (
            <li key={v.src} className="w-[62vw] max-w-[260px] shrink-0 snap-start md:w-auto md:max-w-none">
              <Video {...v} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
