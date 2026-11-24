import Image from 'next/image'
import { Countdown } from '@/components/countdown'
import { getScenarios, pcRelease } from '@/lib/release-data'

export function Hero() {
  const scenarios = getScenarios()
  const confirmed = Boolean(pcRelease.confirmedDate)

  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <Image
        src="/images/vice-skyline.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/80 to-background" />

      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-16 pt-24 sm:px-6 md:pb-24 md:pt-32">
        <div className="flex flex-col gap-4">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
            <span
              className={confirmed ? 'size-2 rounded-full bg-primary' : 'size-2 animate-pulse rounded-full bg-accent'}
              aria-hidden="true"
            />
            PC status: {confirmed ? 'Officially dated' : pcRelease.status}
          </p>
          <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-balance sm:text-7xl md:text-8xl">
            When is GTA 6 <span className="text-primary">coming to PC?</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground text-pretty">
            {confirmed
              ? 'Rockstar has confirmed the date. Here is the official countdown.'
              : 'Rockstar has not announced a PC date yet. Until it does, this countdown tracks the most likely windows, each one labeled with its source.'}
          </p>
        </div>

        <Countdown scenarios={scenarios} />
      </div>
    </section>
  )
}
