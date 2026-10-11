import Image from "next/image";
import Link from "next/link";
import { AI_TOOLS_URL, APPLY_URL, EXPERTS_URL, TIKTOK_URL } from "@/lib/links";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/#results", label: "Results" },
      { href: "/#how", label: "How it works" },
      { href: "/#stories", label: "Students" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Start",
    links: [
      { href: APPLY_URL, label: "Apply for mentorship", external: true },
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

export default function Footer() {
  return (
    <footer className="border-t border-border pb-10 pt-16">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/B.png" alt="" width={32} height={32} className="h-8 w-8" />
              <span className="font-display text-[17px] font-bold tracking-tight">
                BrainBox<span className="text-accent-light"> Ecom Lab</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-text-muted">
              1-on-1 dropshipping mentorship. We build the store with you, run
              the ads alongside you and mentor you on your actual store.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7"
          >
            {columns.map((c) => (
              <div key={c.title}>
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-muted">
                  {c.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("/#") ? (
                        // In-page section: native anchor so it scrolls reliably.
                        <a
                          href={l.href}
                          className="text-[15px] text-text transition-colors hover:text-accent-light"
                        >
                          {l.label}
                        </a>
                      ) : (
                      <Link
                        href={l.href}
                        {...("external" in l && l.external && !l.href.startsWith(APPLY_URL)
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        data-bb-placement={l.href === APPLY_URL ? "footer" : undefined}
                        className="text-[15px] text-text transition-colors hover:text-accent-light"
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
        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-6 text-[13px] text-text-muted sm:flex-row sm:justify-between">
          <span>&copy; {new Date().getFullYear()} BrainBox Ecom Lab.</span>
          <span>Results shown are individual and not guaranteed.</span>
        </div>
      </div>
    </footer>
  );
}
