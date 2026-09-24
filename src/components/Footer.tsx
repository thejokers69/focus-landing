import { Logo } from "./Logo"

export function Footer() {
  return (
    <footer className="border-t border-border/60 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Logo size="sm" />
        <div className="flex items-center gap-6 text-sm text-ink-faint">
          <a href="#" className="transition hover:text-ink-muted">
            Privacy
          </a>
          <a href="#" className="transition hover:text-ink-muted">
            Terms
          </a>
          <span>© 2026 Focus</span>
        </div>
      </div>
    </footer>
  )
}
