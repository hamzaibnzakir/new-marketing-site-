import Link from "next/link";
import {
  Search,
  BarChart3,
  Sparkles,
  ShieldCheck,
  FileText,
  Megaphone,
  Mail,
  Eye,
  Calculator,
} from "lucide-react";
import Reveal from "./Reveal";
import BorderBeam from "./BorderBeam";

const tools = [
  { icon: Search, label: "Product Research" },
  { icon: BarChart3, label: "Ad Metrics Analyser" },
  { icon: Sparkles, label: "Ad Creative Analyser" },
  { icon: ShieldCheck, label: "Store Auditor" },
  { icon: FileText, label: "Product Description" },
  { icon: Megaphone, label: "Ad Copy Generator" },
  { icon: Mail, label: "Email Sequences" },
  { icon: Eye, label: "Competitor Spy" },
  { icon: Calculator, label: "Profit Calculator" },
];

export default function AIToolsSection() {
  return (
    <section className="border-y border-border bg-surface px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-center font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
            Not Ready to Apply Yet?
          </p>
          <h2 className="mx-auto mt-4 max-w-lg text-balance text-center font-display text-3xl font-bold leading-tight md:text-4xl">
            Try Brainbox AI, free
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-text-muted">
            A free AI toolkit for Shopify dropshippers — product research, ad
            diagnostics, store audits, copywriting, and more. No credit card,
            no commitment.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {tools.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-2.5 border border-border bg-black px-4 py-3"
              >
                <t.icon
                  className="h-4 w-4 shrink-0 text-accent-light"
                  strokeWidth={1.5}
                />
                <span className="text-xs text-text-muted">{t.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-10 text-center">
          <BorderBeam className="inline-block">
            <Link
              href="https://app.brainboxecomlab.com/"
              target="_blank"
              rel="noreferrer"
              className="block bg-accent-2 px-8 py-4 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-2-light"
            >
              Try Brainbox AI Free
            </Link>
          </BorderBeam>
          <p className="mt-4 text-xs text-text-muted">
            Free to start · No credit card · 2 free uses per tool, daily
          </p>
        </Reveal>
      </div>
    </section>
  );
}
