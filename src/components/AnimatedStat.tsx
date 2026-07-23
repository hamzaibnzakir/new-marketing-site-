"use client";

import { useEffect, useRef, useState } from "react";
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

export default function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
}: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => setDisplay(counter.val.toFixed(decimals)),
      });
    });

    return () => ctx.revert();
  }, [value, decimals]);

  return (
    <div className="flex flex-col items-center px-4">
      <span
        ref={ref}
        className="font-display text-2xl font-bold text-accent-light"
      >
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="text-xs text-text-muted">{label}</span>
    </div>
  );
}
