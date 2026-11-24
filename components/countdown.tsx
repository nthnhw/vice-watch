'use client'

import { useEffect, useState } from 'react'
import type { Scenario } from '@/lib/release-data'
import { cn } from '@/lib/utils'

function useNow() {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

function split(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'America/New_York',
})

export function Countdown({ scenarios }: { scenarios: Scenario[] }) {
  const [activeId, setActiveId] = useState(scenarios[0].id)
  const active = scenarios.find((s) => s.id === activeId) ?? scenarios[0]
  const now = useNow()
  const parts = now === null ? null : split(new Date(active.date).getTime() - now)

  const units = [
    { label: 'Days', value: parts?.days },
    { label: 'Hours', value: parts?.hours },
    { label: 'Minutes', value: parts?.minutes },
    { label: 'Seconds', value: parts?.seconds },
  ]

  return (
    <div className="flex flex-col gap-6">
      {scenarios.length > 1 && (
        <div role="group" aria-label="Release scenario" className="flex flex-wrap gap-2">
          {scenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === activeId}
              onClick={() => setActiveId(s.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                s.id === activeId
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background/40 text-foreground hover:border-primary/60',
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <div
        className="grid grid-cols-4 gap-2 sm:gap-4"
        role="timer"
        aria-live="off"
        aria-label={
          parts
            ? `${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes until ${active.label} date`
            : 'Loading countdown'
        }
      >
        {units.map((u) => (
          <div
            key={u.label}
            className="flex flex-col items-center rounded-lg border border-border bg-background/60 px-2 py-4 backdrop-blur-sm sm:py-6"
          >
            <span className="font-display text-4xl tabular-nums leading-none text-foreground sm:text-6xl md:text-7xl">
              {u.value === undefined ? '--' : String(u.value).padStart(2, '0')}
            </span>
            <span className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{u.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm text-foreground">
          <span
            className={cn(
              'mr-2 inline-block rounded px-2 py-0.5 font-mono text-xs uppercase',
              active.confidence === 'Official' && 'bg-primary text-primary-foreground',
              active.confidence === 'Rumor' && 'bg-accent text-accent-foreground',
              active.confidence === 'Estimate' && 'bg-secondary text-secondary-foreground',
            )}
          >
            {active.confidence}
          </span>
          Target: <strong>{dateFormat.format(new Date(active.date))}</strong>
        </p>
        <p className="text-sm text-muted-foreground text-pretty">{active.basis}</p>
      </div>
    </div>
  )
}

export function DaysSince({ date }: { date: string }) {
  const now = useNow()
  const days = now === null ? null : Math.max(0, Math.floor((now - new Date(date).getTime()) / 86_400_000))
  return <>{days === null ? '--' : days}</>
}
