"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollTrigger measures positions once, so anything that changes the
 * page's height afterwards (web fonts finishing, images/video posters
 * loading, an FAQ item opening) leaves triggers — especially the pinned
 * System section — pointing at stale positions. This re-measures when
 * that happens. Renders nothing.
 */
export default function ScrollRefresh() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    // Fonts + full page load
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    // Any later height change (lazy images, FAQ open/close, etc.)
    let lastHeight = document.body.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastHeight) > 2) {
        lastHeight = h;
        refresh();
      }
    });
    ro.observe(document.body);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", refresh);
      ro.disconnect();
    };
  }, []);

  return null;
}
