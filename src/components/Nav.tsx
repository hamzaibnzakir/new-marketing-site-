import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-black/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight"
        >
          Brain<span className="text-accent-light">Box</span> Ecom Lab
        </Link>

        <Link
          href="/apply"
          className="border border-accent-2-light bg-accent-2 px-5 py-2.5 font-display text-sm font-semibold tracking-wide text-white transition-colors hover:bg-accent-2-light"
        >
          Apply Now
        </Link>
      </nav>
    </header>
  );
}
