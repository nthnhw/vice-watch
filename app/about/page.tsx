import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About | Grand Theft Auto 6 PC Watch',
  description:
    'Grand Theft Auto 6 PC Watch tracks when the GTA 6 PC release date is announced. Made by Nathan.',
}

const details = [
  {
    label: 'What it is',
    body: 'Exactly what it says. Grand Theft Auto 6 PC Watch keeps an eye out for the day the PC release date for Grand Theft Auto 6 is announced, and puts it in one place.',
  },
  {
    label: 'Why it matters',
    body: 'Rockstar has a history of releasing on consoles first and PC later. PC players are a different crowd, and many of them put their time into PC and do not own a console.',
  },
  {
    label: 'Who made it',
    body: 'Nathan.',
  },
]

export default function AboutPage() {
  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="font-display text-xl uppercase tracking-wide">
            VI<span className="text-primary">PC</span>Watch
          </Link>
          <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Back to countdown
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-14 px-4 py-16 sm:px-6 md:py-24">
        <section className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">About the project</p>
          <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-balance sm:text-7xl">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Grand Theft Auto 6
            </span>{' '}
            PC Watch
          </h1>
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" aria-hidden="true" />
        </section>

        <dl className="flex flex-col divide-y divide-border border-y border-border">
          {details.map((item) => (
            <div key={item.label} className="flex flex-col gap-2 py-8 md:flex-row md:gap-10">
              <dt className="font-mono text-xs uppercase tracking-widest text-primary md:w-40 md:shrink-0 md:pt-1">
                {item.label}
              </dt>
              <dd className="text-lg leading-relaxed text-pretty">{item.body}</dd>
            </div>
          ))}
        </dl>

        <section className="flex flex-col items-start gap-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">See it</h2>
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Open the PC countdown
          </Link>
        </section>
      </main>

      <footer className="border-t border-border">
        <p className="mx-auto max-w-3xl px-4 py-8 text-sm text-muted-foreground sm:px-6">
          Fan-made tracker. Not affiliated with Rockstar Games or Take-Two Interactive.
        </p>
      </footer>
    </>
  )
}
