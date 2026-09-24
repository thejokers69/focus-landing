import { useState, type FormEvent } from "react"
import { ArrowRight, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { submitWaitlist } from "@/lib/waitlist-api"

type WaitlistFormProps = {
  source: string
  submitLabel: string
  className?: string
  inputClassName?: string
  buttonClassName?: string
  layout?: "inline" | "stacked"
  showIcon?: boolean
}

export function WaitlistForm({
  source,
  submitLabel,
  className,
  inputClassName,
  buttonClassName,
  layout = "inline",
  showIcon = true,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")
    setMessage(null)

    const result = await submitWaitlist(email, source)
    if (result.ok) {
      setStatus("success")
      setMessage("You're on the list. We'll reach out when Focus is ready.")
      setEmail("")
      return
    }

    setStatus("error")
    setMessage(result.message)
  }

  const isStacked = layout === "stacked"

  return (
    <div className={cn("w-full", className)}>
      <form
        onSubmit={onSubmit}
        className={cn(
          "flex gap-2",
          isStacked ? "flex-col sm:flex-row sm:items-center" : "flex-col sm:flex-row sm:items-center",
        )}
      >
        <label className="sr-only" htmlFor={`waitlist-email-${source}`}>
          Email address
        </label>
        <input
          id={`waitlist-email-${source}`}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          disabled={status === "loading" || status === "success"}
          className={cn(
            "min-w-0 flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/20 disabled:opacity-60",
            inputClassName,
          )}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={cn(
            "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-surface transition hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-70",
            buttonClassName,
          )}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Joining…
            </>
          ) : (
            <>
              {submitLabel}
              {showIcon ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
            </>
          )}
        </button>
      </form>
      {message ? (
        <p
          role="status"
          className={cn(
            "mt-3 text-sm",
            status === "success" ? "text-success" : status === "error" ? "text-destructive" : "text-ink-muted",
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
