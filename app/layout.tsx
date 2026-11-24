import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono-face' })

export const metadata: Metadata = {
  title: 'GTA 6 PC Release Date Countdown | When Is GTA VI Coming to PC?',
  description:
    'Tracking the GTA 6 PC release date: official status, a live countdown to the most likely launch window, Rockstar’s console-to-PC history, and every delay so far.',
  keywords: ['GTA 6 PC', 'GTA 6 PC release date', 'GTA VI PC', 'GTA 6 countdown', 'GTA 6 Steam'],
  generator: 'v0.app',
  openGraph: {
    title: 'When is GTA 6 coming to PC?',
    description: 'Live countdown and tracker for the GTA VI PC release date.',
    images: ['/images/vice-skyline.png'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1c1024',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${mono.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
