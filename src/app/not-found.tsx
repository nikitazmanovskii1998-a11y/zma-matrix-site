import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-text-secondary">404</p>
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        Page not found
      </h1>
      <p className="text-sm leading-relaxed text-text-secondary">
        The link may be outdated or the page was moved. Choose a language version to continue.
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Link
          href="/ru"
          className="rounded border border-neon-line/35 bg-[var(--surface-2)] px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-neon-line/55"
        >
          RU — Home
        </Link>
        <Link
          href="/en"
          className="rounded border border-neon-line/35 bg-[var(--surface-2)] px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-neon-line/55"
        >
          EN — Home
        </Link>
      </div>
    </div>
  );
}
