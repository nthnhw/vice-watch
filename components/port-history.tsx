import { averageRecentGap, daysBetween, longestGap, portHistory } from '@/lib/release-data'

const yearFormat = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })

export function PortHistory() {
  const rows = portHistory.map((p) => ({ ...p, gap: daysBetween(p.consoleDate, p.pcDate) }))

  return (
    <section aria-labelledby="history-heading" className="border-y border-border bg-card/40">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-3">
          <h2 id="history-heading" className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
            Rockstar always makes PC wait
          </h2>
          <p className="max-w-2xl text-muted-foreground text-pretty">
            Every mainline GTA since GTA III launched on console first. The wait has grown from about
            six months to as long as {Math.round(longestGap / 30.4)} months. Recent open-world releases
            have averaged <strong className="text-foreground">{averageRecentGap} days</strong>.
          </p>
        </div>

        <ol className="flex flex-col gap-4">
          {rows.map((row) => (
            <li key={row.game} className="grid gap-2 sm:grid-cols-[12rem_1fr] sm:items-center sm:gap-6">
              <div className="flex items-baseline justify-between gap-2 sm:flex-col sm:items-start sm:gap-0">
                <span className="font-medium">{row.game}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {yearFormat.format(new Date(row.consoleDate))} → {yearFormat.format(new Date(row.pcDate))}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${(row.gap / longestGap) * 100}%` }}
                  />
                </div>
                <span className="w-20 text-right font-mono text-sm tabular-nums">{row.gap} days</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
