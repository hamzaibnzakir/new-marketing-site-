import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BorderBeam from "@/components/BorderBeam";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with BrainBox Ecom Lab.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">
          Contact
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">
          Let&apos;s talk about your store
        </h1>
        <p className="mt-4 max-w-lg text-text-muted">
          The fastest way to reach us is through the application — every
          application gets a real reply, and it&apos;s where we&apos;ll
          discuss your goals, your budget, and next steps directly.
        </p>
        <BorderBeam className="mt-8 inline-block">
          <Link
            href="/apply"
            className="block bg-accent-2 px-8 py-4 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-2-light"
          >
            Apply for Mentorship
          </Link>
        </BorderBeam>
      </main>
      <Footer />
    </>
  );
}
