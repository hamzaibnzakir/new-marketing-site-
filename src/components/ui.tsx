import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { APPLY_URL } from "@/lib/links";

/**
 * The primary action: an emerald "tape" pill. `placement` feeds
 * brainbox.js click tracking (data-bb-placement) so each Apply button's
 * performance can be compared.
 */
export function ApplyButton({
  placement,
  size = "md",
  children = "Apply for mentorship",
  className = "",
  tone = "tape",
}: {
  placement: string;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  className?: string;
  tone?: "tape" | "ink";
}) {
  const sizes = {
    sm: "h-10 pl-4 pr-1.5 text-[13px] gap-2",
    md: "h-12 pl-5 pr-1.5 text-[15px] gap-3",
    lg: "h-14 pl-6 pr-2 text-base gap-3",
  };
  const icon = { sm: "h-7 w-7", md: "h-9 w-9", lg: "h-10 w-10" };
  const tones = {
    tape: "bg-tape text-ink hover:bg-tape-2",
    ink: "bg-ink text-on-dark hover:bg-ink-2",
  };
  return (
    <Link
      href={APPLY_URL}
      data-bb-placement={placement}
      className={`group inline-flex items-center justify-between rounded-full font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_-10px_rgba(10,107,69,0.55)] transition-[background-color,transform] duration-200 active:scale-[0.98] ${sizes[size]} ${tones[tone]} ${className}`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`flex items-center justify-center rounded-full ${
          tone === "tape" ? "bg-ink text-tape" : "bg-tape text-ink"
        } ${icon[size]}`}
      >
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45 motion-reduce:transition-none"
          strokeWidth={2.25}
        />
      </span>
    </Link>
  );
}

/** Small mono label with an emerald dot. */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] ${
        tone === "light" ? "text-muted" : "text-on-dark-muted"
      } ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-tape" />
      {children}
    </p>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

/** Repeating packing-tape text, used for tape strips. */
export function TapeText({ text = "BRAINBOX" }: { text?: string }) {
  const unit = (
    <span className="flex shrink-0 items-center gap-4 pr-4">
      <span>{text}</span>
      <span aria-hidden="true" className="flex gap-[3px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="block h-[0.9em] w-[3px] skew-x-[-25deg] bg-ink" />
        ))}
      </span>
    </span>
  );
  return (
    <span className="flex">
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i}>{unit}</span>
      ))}
    </span>
  );
}
