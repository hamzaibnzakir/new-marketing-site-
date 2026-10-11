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
    // ScrollTrigger.refresh() restores the scroll position it measured,
    // which cancels a smooth scroll that's in progress (e.g. tapping a
    // menu link to a section). So a pending refresh waits until scrolling
    // has been idle for a moment.
    let timer: ReturnType<typeof setTimeout>;
    let pending = false;
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        pending = false;
        ScrollTrigger.refresh();
      }, 200);
    };
    const refresh = () => {
      pending = true;
      schedule();
    };
    const onScroll = () => {
      if (pending) schedule();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

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
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return null;
}
