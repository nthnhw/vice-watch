import { delayTimeline } from '@/lib/release-data'
import { cn } from '@/lib/utils'

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

export function DelayTimeline() {
  return (
    <section aria-labelledby="timeline-heading" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h2 id="timeline-heading" className="mb-8 font-display text-3xl uppercase tracking-tight sm:text-4xl">
        The road so far
      </h2>
      <ol className="relative flex flex-col gap-8 border-l border-border pl-6">
        {delayTimeline.map((event) => (
          <li key={event.title} className="relative">
            <span
              aria-hidden="true"
              className={cn(
                'absolute -left-[1.85rem] top-1.5 size-3 rounded-full border-2',
                event.date ? 'border-primary bg-primary' : 'border-accent bg-background',
              )}
            />
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {event.date ? dateFormat.format(new Date(event.date)) : 'TBA'}
            </p>
            <h3 className="mt-1 text-lg font-semibold">{event.title}</h3>
            <p className="text-muted-foreground text-pretty">{event.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
