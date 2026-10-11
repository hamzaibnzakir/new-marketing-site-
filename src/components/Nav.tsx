"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ApplyButton } from "./ui";

const links = [
  { href: "/#results", label: "Results" },
  { href: "/#how", label: "Process" },
  { href: "/#stories", label: "Students" },
  { href: "/#faq", label: "FAQ" },
];

export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/B.png"
        alt=""
        width={30}
        height={30}
        className={`h-[30px] w-[30px] rounded-[7px]`}
      />
      <span className={`whitespace-nowrap font-serif text-[23px] leading-none tracking-tight ${dark ? "text-on-dark" : "text-ink"}`}>
        BrainBox<sup className="ml-0.5 align-super text-[11px]">®</sup>
      </span>
    </span>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // Closing the menu changes the header height mid-click, which can cancel
  // the browser's jump. Close first, then scroll once layout settles.
  const goToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.split("#")[1];
    const target = id ? document.getElementById(id) : null;
    setOpen(false);
    if (!target) return;
    e.preventDefault();
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
      history.replaceState(null, "", `#${id}`);
    });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open
          ? "bg-paper/85 shadow-[0_1px_0_var(--line)] backdrop-blur-md"
          : "bg-paper"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-5 md:px-10"
      >
        <Link href="/" aria-label="BrainBox Ecom Lab, home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative inline-flex h-11 items-center text-[14px] text-ink/80 transition-colors hover:text-ink"
              >
                {i === 0 && (
                  <span aria-hidden="true" className="absolute -left-3 h-1.5 w-1.5 rounded-full bg-tape" />
                )}
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-paper md:hidden">
        <ul className="px-5 py-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => goToSection(e, l.href)}
                className="flex h-16 items-center justify-between border-b border-line font-serif text-[32px] leading-none"
              >
                {l.label}
                <span aria-hidden="true" className="font-sans text-base text-forest">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="px-5 pb-6 pt-3">
          <ApplyButton placement="nav_mobile" size="lg" className="w-full" />
        </div>
      </div>
    </header>
  );
}
