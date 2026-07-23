import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
          Legal
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-text-muted">Last updated: {updated}</p>

        <div className="legal-content mt-12">{children}</div>
      </main>
      <Footer />
    </>
  );
}
