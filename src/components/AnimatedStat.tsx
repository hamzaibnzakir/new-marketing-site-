"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedStatProps {
  /** The target value to count up to, e.g. 300, 12, 4.9 */
  value: number;
  /** Text before the number, e.g. "" */
  prefix?: string;
  /** Text after the number, e.g. "+", "★" */
  suffix?: string;
  /** Decimal places to keep (0 for whole numbers, 1 for "4.9") */
  decimals?: number;
  label: string;
}

/**
 * Counts up to `value` when scrolled into view. The FINAL number is what
 * the server renders, so crawlers, no-JS visitors, and reduced-motion
 * users always see the real stat — never "0+". The count-up is layered
 * on top after hydration and writes straight to the DOM (no React
 * re-render on every frame).
 */
export default function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
}: AnimatedStatProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const final = value.toFixed(decimals);

  useEffect(() => {
    const wrap = wrapRef.current;
    const num = numRef.current;
    if (!wrap || !num) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    num.textContent = (0).toFixed(decimals);
    const counter = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrap,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          num.textContent = counter.val.toFixed(decimals);
        },
        onComplete: () => {
          num.textContent = value.toFixed(decimals);
        },
      });
    }, wrap);

    return () => {
      ctx.revert();
      num.textContent = value.toFixed(decimals);
    };
  }, [value, decimals]);

  return (
    <div ref={wrapRef} className="flex flex-col items-center px-4">
      <span className="font-display text-2xl font-bold text-accent-light">
        {prefix}
        <span ref={numRef}>{final}</span>
        {suffix}
      </span>
      <span className="text-xs text-text-muted">{label}</span>
    </div>
  );
}
