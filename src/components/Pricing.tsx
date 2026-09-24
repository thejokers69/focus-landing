import { Check } from "lucide-react"

import { WaitlistForm } from "@/components/WaitlistForm"

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-brand">Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Simple plans. No drama.
          </h2>
          <p className="mt-4 text-ink-muted">
            Start free. Upgrade when you're ready for more history and polish.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-3xl gap-4 md:grid-cols-2">
          {/* Free */}
          <div className="rounded-2xl border border-border bg-surface-raised p-6">
            <p className="text-sm font-medium text-ink-muted">Free</p>
            <p className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight text-ink">$0</span>
              <span className="text-sm text-ink-faint">/ forever</span>
            </p>
            <p className="mt-3 text-sm text-ink-muted">
              Core dashboard for personal use. Enough to stay focused every day.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-ink-muted">
              {["Today's tasks", "Focus timer", "Habits & streaks", "Weekly overview"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-brand" strokeWidth={2.5} />
                    {item}
                  </li>
                ),
              )}
            </ul>
            <WaitlistForm
              source="pricing-free"
              submitLabel="Get started free"
              showIcon={false}
              className="mt-8"
              layout="stacked"
              buttonClassName="w-full border border-border bg-surface text-ink hover:bg-surface-hover"
            />
          </div>

          {/* Pro */}
          <div className="relative rounded-2xl border border-brand/40 bg-surface-raised p-6 shadow-[0_0_40px_-12px_rgba(245,158,11,0.25)]">
            <span className="absolute right-4 top-4 rounded-full bg-brand-dim px-2 py-0.5 text-[10px] font-medium text-brand">
              Coming soon
            </span>
            <p className="text-sm font-medium text-ink-muted">Pro</p>
            <p className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight text-ink">$8</span>
              <span className="text-sm text-ink-faint">/ month</span>
            </p>
            <p className="mt-3 text-sm text-ink-muted">
              Longer history, sync across devices, and a few quiet power features.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-ink-muted">
              {[
                "Everything in Free",
                "Cloud sync",
                "90-day history",
                "Custom focus lengths",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-brand" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
            <WaitlistForm
              source="pricing-pro"
              submitLabel="Join waitlist"
              showIcon={false}
              className="mt-8"
              layout="stacked"
              buttonClassName="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
