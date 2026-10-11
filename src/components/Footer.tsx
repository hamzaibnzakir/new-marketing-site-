import Link from "next/link";
import { Wordmark } from "./Nav";
import { ApplyButton, TapeText } from "./ui";
import { AI_TOOLS_URL, APPLY_URL, EXPERTS_URL, TIKTOK_URL } from "@/lib/links";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/#results", label: "Results" },
      { href: "/#how", label: "Process" },
      { href: "/#stories", label: "Students" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Start",
    links: [
      { href: APPLY_URL, label: "Apply for mentorship" },
      { href: AI_TOOLS_URL, label: "Brainbox AI (free)", external: true },
      { href: EXPERTS_URL, label: "Expert services", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/contact", label: "Contact" },
      { href: TIKTOK_URL, label: "TikTok", external: true },
      { href: "/terms", label: "Terms" },
      { href: "/refund", label: "Refund policy" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

/* Criss-crossing packing tape, running slowly. Decorative only. */
const tapes = [
  { rotate: -7, top: "18%", dur: "48s", reverse: false },
  { rotate: 5, top: "42%", dur: "56s", reverse: true },
  { rotate: -3, top: "66%", dur: "44s", reverse: false },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-[28px] bg-ink text-on-dark md:rounded-t-[40px]">
      <div className="mx-auto w-full max-w-[1280px] px-5 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="serif text-[clamp(3.2rem,1.4rem+5vw,6.4rem)]">
              Let&apos;s see if this makes sense for <em className="text-tape">your store.</em>
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-on-dark-muted">
              Five quick questions. We reply on WhatsApp, usually within a day,
              to talk through your goals, your budget and whether the
              mentorship fits.
            </p>
            <div className="mt-9">
              <ApplyButton placement="footer_cta" size="lg" />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5 lg:pt-4">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-on-dark-muted">{c.title}</p>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("/#") ? (
                        <a href={l.href} className="text-[15px] transition-colors hover:text-tape">
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          {...("external" in l && l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                          data-bb-placement={l.href === APPLY_URL ? "footer" : undefined}
                          className="text-[15px] transition-colors hover:text-tape"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* tape band */}
      <div aria-hidden="true" className="relative mt-20 h-[240px] md:h-[300px]">
        {tapes.map((t, i) => (
          <div
            key={i}
            className="absolute left-[-10%] w-[120%]"
            style={{ top: t.top, transform: `rotate(${t.rotate}deg)` }}
          >
            <div className="tape overflow-hidden py-2.5 font-mono text-[14px] font-medium tracking-[0.14em] md:py-3 md:text-[16px]">
              <div
                className="tape-run flex w-max"
                style={{ "--tape-dur": t.dur, animationDirection: t.reverse ? "reverse" : "normal" } as React.CSSProperties}
              >
                <TapeText />
                <TapeText />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 border-t border-line-dark px-5 py-6 text-[13px] text-on-dark-muted sm:flex-row sm:items-center sm:justify-between md:px-10">
        <Link href="/" aria-label="BrainBox Ecom Lab, home" className="text-on-dark">
          <Wordmark dark />
        </Link>
        <span>&copy; {new Date().getFullYear()} BrainBox Ecom Lab · Results shown are individual and not guaranteed.</span>
      </div>
    </footer>
  );
}
