// Single source of truth. When Rockstar announces the PC date, set
// `pcRelease.confirmedDate` and the whole site switches to the official countdown.

export const LAST_UPDATED = '2026-11-24'

export const consoleRelease = {
  date: '2026-11-19T00:00:00-05:00',
  platforms: ['PlayStation 5', 'Xbox Series X|S'],
}

export const pcRelease: {
  confirmedDate: string | null
  status: string
} = {
  confirmedDate: null,
  status: 'Not announced',
}

export type PortHistory = {
  game: string
  consoleDate: string
  pcDate: string
}

export const portHistory: PortHistory[] = [
  { game: 'GTA III', consoleDate: '2001-10-22', pcDate: '2002-05-20' },
  { game: 'GTA: Vice City', consoleDate: '2002-10-29', pcDate: '2003-05-12' },
  { game: 'GTA: San Andreas', consoleDate: '2004-10-26', pcDate: '2005-06-07' },
  { game: 'GTA IV', consoleDate: '2008-04-29', pcDate: '2008-12-02' },
  { game: 'GTA V', consoleDate: '2013-09-17', pcDate: '2015-04-14' },
  { game: 'Red Dead Redemption 2', consoleDate: '2018-10-26', pcDate: '2019-11-05' },
]

const DAY_MS = 86_400_000

export function daysBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / DAY_MS)
}

export function addDays(iso: string, days: number) {
  return new Date(new Date(iso).getTime() + days * DAY_MS).toISOString()
}

const gaps = portHistory.map((p) => daysBetween(p.consoleDate, p.pcDate))
const recentGaps = portHistory.slice(-3).map((p) => daysBetween(p.consoleDate, p.pcDate))
export const averageRecentGap = Math.round(recentGaps.reduce((s, g) => s + g, 0) / recentGaps.length)
export const longestGap = Math.max(...gaps)

export type Scenario = {
  id: string
  label: string
  date: string
  basis: string
  confidence: 'Official' | 'Rumor' | 'Estimate'
}

export function getScenarios(): Scenario[] {
  if (pcRelease.confirmedDate) {
    return [
      {
        id: 'official',
        label: 'Official',
        date: pcRelease.confirmedDate,
        basis: 'Confirmed by Rockstar Games.',
        confidence: 'Official',
      },
    ]
  }
  return [
    {
      id: 'historical',
      label: 'Historical average',
      date: addDays(consoleRelease.date, averageRecentGap),
      basis: `Average console-to-PC gap of Rockstar's last three open-world launches (${averageRecentGap} days).`,
      confidence: 'Estimate',
    },
    {
      id: 'rumor',
      label: 'Early 2027 rumor',
      date: '2027-03-31T00:00:00-04:00',
      basis: 'End of Q1 2027, the window cited in industry reports from unnamed sources. Not confirmed.',
      confidence: 'Rumor',
    },
    {
      id: 'worst',
      label: 'GTA V-style wait',
      date: addDays(consoleRelease.date, longestGap),
      basis: `If PC waits as long as GTA V did (${longestGap} days), the longest gap in series history.`,
      confidence: 'Estimate',
    },
  ]
}

export const delayTimeline = [
  {
    date: '2023-12-05',
    title: 'Trailer 1 drops',
    detail: 'Rockstar reveals GTA VI with a 2025 window. Consoles only, no PC mention.',
  },
  {
    date: '2025-05-02',
    title: 'First delay',
    detail: 'Launch moves from Fall 2025 to May 26, 2026.',
  },
  {
    date: '2025-11-06',
    title: 'Second delay',
    detail: 'Launch moves again, to November 19, 2026.',
  },
  {
    date: '2026-11-19',
    title: 'Console launch',
    detail: 'GTA VI releases on PlayStation 5 and Xbox Series X|S.',
  },
  {
    date: null,
    title: 'PC release',
    detail: 'Not announced yet. This page updates the moment it is.',
  },
]

export const faqs = [
  {
    q: 'Is GTA 6 coming to PC?',
    a: 'Rockstar has not officially announced a PC version. Every mainline GTA since GTA III has come to PC, though, and Rockstar has historically released on console first.',
  },
  {
    q: 'Why does Rockstar release on console first?',
    a: 'Rockstar has not said directly. The usual explanations are focusing optimization on fixed hardware first, reducing piracy at launch, and selling the game twice to players who buy it on both.',
  },
  {
    q: 'Is the countdown on this page official?',
    a: 'No. Until Rockstar announces a date, the countdown shows estimates based on past port gaps and reported rumors. Each scenario is labeled with its source.',
  },
  {
    q: 'Will GTA 6 be on Steam or the Rockstar Launcher?',
    a: 'Unknown. GTA V and Red Dead Redemption 2 launched on the Rockstar Games Launcher alongside Steam and the Epic Games Store, so a similar setup is likely but not confirmed.',
  },
  {
    q: 'What PC specs will GTA 6 need?',
    a: 'Official system requirements have not been published. Rockstar usually publishes them a few weeks before a PC launch.',
  },
]
