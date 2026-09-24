import { CheckSquare, Timer, Flame, CalendarDays } from "lucide-react"

const features = [
  {
    icon: CheckSquare,
    title: "Today's tasks",
    body: "A clear list of what matters today—priorities, tags, and done states without the clutter.",
  },
  {
    icon: Timer,
    title: "Focus timer",
    body: "Pomodoro sessions that sit beside your tasks. Start a block, stay in flow, take the break.",
  },
  {
    icon: Flame,
    title: "Habits & streaks",
    body: "Track the small rituals that compound. See streaks at a glance and keep the chain alive.",
  },
  {
    icon: CalendarDays,
    title: "Weekly overview",
    body: "A calm retrospective of focus time, tasks closed, and habits kept—so you know you're progressing.",
  },
]

export function Features() {
  return (
    <section id="features" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-brand">Features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Everything you need. Nothing you don't.
          </h2>
          <p className="mt-4 text-ink-muted">
            Four panels. One personal OS. Designed to feel like Linear and Notion—not another AI toy.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-surface-raised p-5 transition hover:border-border hover:bg-surface-overlay"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-overlay">
                  <Icon className="h-4 w-4 text-brand" strokeWidth={2} />
                </div>
                <h3 className="text-sm font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
