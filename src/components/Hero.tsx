import { Check, Circle, Play } from "lucide-react"

import { WaitlistForm } from "@/components/WaitlistForm"

export function ProductMock() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -inset-8 rounded-3xl bg-brand/5 blur-2xl" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-2xl shadow-black/10 dark:shadow-black/40">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </div>
          <div className="ml-3 flex-1 rounded-md border border-border-subtle bg-surface px-3 py-1 text-[11px] text-ink-faint">
            focus.app / today
          </div>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-[1fr_140px]">
          {/* Tasks column */}
          <div className="rounded-xl border border-border bg-surface-overlay p-3">
            <div className="mb-2.5 flex items-center justify-between">
              <p className="text-xs font-medium text-ink">Today</p>
              <span className="text-[10px] text-ink-faint">3 of 5</span>
            </div>
            <ul className="space-y-1.5">
              {[
                { done: true, title: "Ship landing page", tag: "Work" },
                { done: true, title: "Review PR #42", tag: "Code" },
                { done: false, title: "Deep work block", tag: "Focus" },
                { done: false, title: "Evening walk", tag: "Health" },
              ].map((t) => (
                <li
                  key={t.title}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs"
                >
                  {t.done ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-success" strokeWidth={2.5} />
                  ) : (
                    <Circle className="h-3.5 w-3.5 shrink-0 text-ink-faint" strokeWidth={2} />
                  )}
                  <span className={t.done ? "text-ink-faint line-through" : "text-ink"}>
                    {t.title}
                  </span>
                  <span className="ml-auto rounded border border-border px-1.5 py-0.5 text-[9px] text-ink-faint">
                    {t.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timer column */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface-overlay p-3">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-ink-faint">
              Focus
            </p>
            <div className="relative mb-2 flex h-20 w-20 items-center justify-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-border"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray={`${34 * 2 * Math.PI * 0.62} ${34 * 2 * Math.PI}`}
                  strokeLinecap="round"
                  className="text-brand"
                />
              </svg>
              <span className="text-sm font-semibold tabular-nums text-ink">18:24</span>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md bg-brand-dim px-2.5 py-1 text-[10px] font-medium text-brand"
            >
              <Play className="h-2.5 w-2.5 fill-current" />
              Pause
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(245, 158, 11, 0.08), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-3 py-1 text-xs text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Personal productivity, quietly done
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Your day, at a glance.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
            Tasks, focus sessions, and habits in one calm place. Built for people who want
            clarity—not another noisy dashboard.
          </p>
          <div className="mt-8 max-w-md">
            <WaitlistForm source="hero" submitLabel="Start focusing" />
            <a
              href="#features"
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-surface-hover"
            >
              See the dashboard
            </a>
          </div>
        </div>
        <ProductMock />
      </div>
    </section>
  )
}
