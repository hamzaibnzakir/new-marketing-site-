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
        <p className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-forest">
          Legal
        </p>
        <h1 className="serif mt-4 text-[clamp(3rem,2rem+3vw,4.8rem)]">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>

        <div className="legal-content mt-12">{children}</div>
      </main>
      <Footer />
    </>
  );
}
