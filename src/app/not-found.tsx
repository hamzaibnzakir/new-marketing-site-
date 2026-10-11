import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="serif text-[7rem] text-forest">404</h1>
      <p className="text-muted mt-4">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full border border-ink px-6 py-3 text-sm transition-colors hover:bg-ink hover:text-on-dark"
      >
        Back home
      </Link>
    </main>
  );
}
