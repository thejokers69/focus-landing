export function SocialProof() {
  const pills = [
    "Built for Cursor",
    "GitHub",
    "Vercel engineers",
    "Indie makers",
    "Remote teams",
  ]
  return (
    <section className="border-y border-border/60 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-xs uppercase tracking-wider text-ink-faint">Trusted in quiet corners</p>
        <div className="flex flex-wrap justify-center gap-2">
          {pills.map((p) => (
            <span
              key={p}
              className="rounded-full border border-border bg-surface-raised px-3 py-1 text-xs text-ink-muted"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
