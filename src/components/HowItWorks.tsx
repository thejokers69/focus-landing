const steps = [
  {
    n: "01",
    title: "Capture what's on your plate",
    body: "Drop tasks into Today. Tag them lightly. Leave the rest for tomorrow.",
  },
  {
    n: "02",
    title: "Start a focus session",
    body: "Hit the timer. Work one thing at a time. Let the ring keep you honest.",
  },
  {
    n: "03",
    title: "Close the loop",
    body: "Check off habits, glance at the week, and shut the lid with a clear head.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border/60 bg-surface-raised/40 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-brand">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Three steps. Then you're in flow.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-surface p-6">
              <span className="font-mono text-xs text-brand">{s.n}</span>
              <h3 className="mt-3 text-base font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
