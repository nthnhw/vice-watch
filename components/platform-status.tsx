import { Check, Clock } from 'lucide-react'
import { DaysSince } from '@/components/countdown'
import { consoleRelease, pcRelease } from '@/lib/release-data'

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'America/New_York',
})

export function PlatformStatus() {
  const rows = [
    ...consoleRelease.platforms.map((name) => ({
      name,
      released: true,
      detail: `Out now · ${dateFormat.format(new Date(consoleRelease.date))}`,
    })),
    {
      name: 'PC (Windows)',
      released: Boolean(pcRelease.confirmedDate),
      detail: pcRelease.confirmedDate
        ? `Dated · ${dateFormat.format(new Date(pcRelease.confirmedDate))}`
        : 'No date announced',
    },
  ]

  return (
    <section aria-labelledby="status-heading" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div className="flex flex-col gap-3">
          <h2 id="status-heading" className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
            Platform status
          </h2>
          <p className="text-muted-foreground text-pretty">
            Console players have been in Leonida for{' '}
            <strong className="text-foreground">
              <DaysSince date={consoleRelease.date} /> days
            </strong>
            . PC players are still waiting.
          </p>
        </div>

        <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
          {rows.map((row) => (
            <li key={row.name} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-center gap-3">
                {row.released ? (
                  <Check className="size-5 text-primary" aria-hidden="true" />
                ) : (
                  <Clock className="size-5 text-accent" aria-hidden="true" />
                )}
                <span className="font-medium">{row.name}</span>
              </div>
              <span className="text-right font-mono text-sm text-muted-foreground">{row.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
