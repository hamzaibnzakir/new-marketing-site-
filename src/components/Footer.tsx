import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-sm text-text-muted md:flex-row">
        <span className="font-display font-semibold text-text">
          Brain<span className="text-accent-light">Box</span> Ecom Lab
        </span>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/apply" className="hover:text-accent-light">
            Apply
          </Link>
          <Link href="/contact" className="hover:text-accent-light">
            Contact
          </Link>
          <Link href="/terms" className="hover:text-accent-light">
            Terms
          </Link>
          <Link href="/refund" className="hover:text-accent-light">
            Refund Policy
          </Link>
        </nav>

        <span>&copy; {new Date().getFullYear()} BrainBox Ecom Lab.</span>
      </div>
    </footer>
  );
}
