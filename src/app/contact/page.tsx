import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ApplyButton } from "@/components/ui";

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
        <p className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-accent-light">
          Contact
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">
          Let&apos;s talk about your store
        </h1>
        <p className="mt-4 max-w-lg text-text-muted">
          The fastest way to reach us is the application: five quick
          questions, and we reply on WhatsApp, usually within a day, to
          discuss your goals, your budget and next steps directly.
        </p>
        <div className="mt-8">
          <ApplyButton placement="contact" size="lg" />
        </div>
      </main>
      <Footer />
    </>
  );
}
