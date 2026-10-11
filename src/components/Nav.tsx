"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ApplyButton } from "./ui";

const links = [
  { href: "/#results", label: "Results" },
  { href: "/#how", label: "How it works" },
  { href: "/#stories", label: "Students" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape and when resizing up to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => {
      if (mq.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  // Closing the menu collapses the header mid-click, which cancels the
  // browser's own jump to the anchor on some engines. Close first, then
  // scroll once the layout has settled.
  const goToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.split("#")[1];
    const target = id ? document.getElementById(id) : null;
    setOpen(false);
    if (!target) return; // not on the home page: let the link navigate
    e.preventDefault();
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
      history.replaceState(null, "", `#${id}`);
    });
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-border bg-black/90 backdrop-blur-md"
          : "border-transparent bg-black"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between px-5 md:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 py-2"
          onClick={() => setOpen(false)}
        >
          <Image src="/B.png" alt="" width={32} height={32} className="h-8 w-8" />
          <span className="whitespace-nowrap font-display text-[15px] font-bold tracking-tight sm:text-[17px]">
            BrainBox<span className="text-accent-light max-[400px]:hidden"> Ecom Lab</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex h-11 items-center text-sm text-text-muted transition-colors hover:text-text"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ApplyButton placement="nav" size="sm">
            Apply
          </ApplyButton>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center border border-border text-text md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-black md:hidden"
      >
        <ul className="px-5 py-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => goToSection(e, l.href)}
                className="flex h-14 items-center justify-between border-b border-border font-display text-xl font-bold"
              >
                {l.label}
                <span aria-hidden="true" className="text-accent-light">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="px-5 pb-6 pt-2">
          <ApplyButton placement="nav_mobile" size="lg" className="w-full" />
        </div>
      </div>
    </header>
  );
}
