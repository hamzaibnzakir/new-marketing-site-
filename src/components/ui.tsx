import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { APPLY_URL } from "@/lib/links";

/**
 * The one primary action on the site. Crimson is reserved for this
 * button, so it reads as "the next step" wherever it appears.
 * `placement` is picked up by brainbox.js click tracking
 * (data-bb-placement), so we can see which Apply button converts.
 */
export function ApplyButton({
  placement,
  size = "md",
  children = "Apply for mentorship",
  className = "",
}: {
  placement: string;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  className?: string;
}) {
  const sizes = {
    sm: "h-10 px-4 text-[13px]",
    md: "h-13 px-6 text-sm",
    lg: "h-14 px-7 text-[15px]",
  };
  return (
    <Link
      href={APPLY_URL}
      data-bb-placement={placement}
      className={`group inline-flex items-center justify-center gap-2 bg-accent-2 font-display font-bold tracking-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-[background-color,transform] duration-200 hover:bg-[#a3233a] active:translate-y-px ${sizes[size]} ${className}`}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
        strokeWidth={2.25}
      />
    </Link>
  );
}

/** Small mono section label with an emerald tick. */
export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] ${
        tone === "dark" ? "text-text-muted" : "text-bone-muted"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 ${tone === "dark" ? "bg-accent-light" : "bg-accent"}`}
      />
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
    <div className={`mx-auto w-full max-w-[1240px] px-5 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
