import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl font-bold text-accent">404</h1>
      <p className="text-text-muted mt-4">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-8 inline-block border border-border px-6 py-3 text-sm tracking-wide hover:border-accent transition-colors"
      >
        Back home
      </Link>
    </main>
  );
}
