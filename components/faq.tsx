import { ChevronDown } from 'lucide-react'
import { faqs } from '@/lib/release-data'

export function Faq() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section aria-labelledby="faq-heading" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 id="faq-heading" className="mb-8 font-display text-3xl uppercase tracking-tight sm:text-4xl">
          GTA 6 PC FAQ
        </h2>
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-background">
          {faqs.map((f) => (
            <details key={f.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-muted-foreground text-pretty">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  )
}
