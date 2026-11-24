import Link from 'next/link'
import { DelayTimeline } from '@/components/delay-timeline'
import { Faq } from '@/components/faq'
import { Hero } from '@/components/hero'
import { PlatformStatus } from '@/components/platform-status'
import { PortHistory } from '@/components/port-history'
import { LAST_UPDATED } from '@/lib/release-data'

export default function Page() {
  const updated = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(LAST_UPDATED),
  )

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <span className="font-display text-xl uppercase tracking-wide">
            VI<span className="text-primary">PC</span>Watch
          </span>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">Updated {updated}</span>
            <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Hero />
        <PlatformStatus />
        <PortHistory />
        <DelayTimeline />
        <Faq />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:px-6">
          <p>
            Fan-made tracker. Not affiliated with Rockstar Games or Take-Two Interactive. Estimates are not
            official release dates.
          </p>
        </div>
      </footer>
    </>
  )
}
