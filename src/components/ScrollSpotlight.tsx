"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export interface SpotlightArea {
  id: string;
  label: string;
  description: string;
  /** Position and size as a percentage of the image, 0-100 */
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ScrollSpotlightProps {
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
  spots: SpotlightArea[];
  className?: string;
}

/**
 * Auto-cycles through highlighted regions of a screenshot, dimming
 * everything else and pointing out what each part of the real UI means.
 */
export default function ScrollSpotlight({
  imageSrc,
  imageWidth,
  imageHeight,
  alt,
  spots,
  className = "",
}: ScrollSpotlightProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % spots.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [paused, spots.length]);

  const spot = spots[active];

  return (
    <div className={className}>
      <div
        className="relative mx-auto max-w-xs overflow-hidden rounded-lg border border-border"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          className="w-full"
        />

        {/* Dim everything outside the active spot */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-black"
          animate={{ opacity: 0.55 }}
          transition={{ duration: 0.4 }}
        />

        {/* Highlighted rectangle */}
        <motion.div
          className="pointer-events-none absolute rounded-md border-2 border-accent-light"
          animate={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            width: `${spot.width}%`,
            height: `${spot.height}%`,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        >
          <div className="absolute -inset-1 rounded-lg bg-accent-light/10 blur-sm" />
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {spots.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${s.label}`}
            aria-current={i === active}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-accent-light" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>

      {/* Label + description */}
      <div className="mt-5 min-h-[3.5rem] text-center">
        <motion.p
          key={spot.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="font-display text-sm font-bold text-accent-light"
        >
          {spot.label}
        </motion.p>
        <motion.p
          key={`${spot.id}-desc`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="mt-1 text-xs text-text-muted"
        >
          {spot.description}
        </motion.p>
      </div>
    </div>
  );
}
