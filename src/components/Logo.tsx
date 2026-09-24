import { Timer } from "lucide-react"

export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-7 w-7" : "h-8 w-8"
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"
  return (
    <a href="#" className="flex items-center gap-2.5">
      <div
        className={`flex ${box} items-center justify-center rounded-lg border border-border bg-surface-overlay`}
      >
        <Timer className={`${icon} text-brand`} strokeWidth={2} />
      </div>
      <div>
        <p className="text-sm font-semibold tracking-tight text-ink leading-none">Focus</p>
        <p className="mt-0.5 text-[10px] text-ink-faint leading-none">Personal OS</p>
      </div>
    </a>
  )
}
