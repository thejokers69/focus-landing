import { WaitlistForm } from "@/components/WaitlistForm"

export function FinalCta() {
  return (
    <section id="cta" className="px-6 pb-20 md:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-surface-raised px-8 py-14 text-center md:px-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(245, 158, 11, 0.1), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Ready to reclaim your day?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ink-muted">
            Open Focus and start with today's three most important things. The rest can wait.
          </p>
          <WaitlistForm
            source="final-cta"
            submitLabel="Start focusing"
            className="mx-auto mt-8 max-w-md"
            buttonClassName="px-6 py-3"
          />
        </div>
      </div>
    </section>
  )
}
