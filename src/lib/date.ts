/**
 * Timeline dates are stored as "YYYY-MM" (or null for ongoing) and formatted
 * here, so a period can never drift out of sync between two pages.
 */

export type YearMonth = `${number}-${number}` | string

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function parse(value: YearMonth): { year: number; month: number } {
  const [year, month] = value.split("-").map(Number)
  return { year, month: month ?? 1 }
}

function label(value: YearMonth): string {
  const { year, month } = parse(value)
  return `${MONTHS[month - 1]} ${year}`
}

/** "May 2025 – Sep 2025" · "Jan 2024 – Present" */
export function formatPeriod(start: YearMonth, end: YearMonth | null): string {
  return `${label(start)} – ${end ? label(end) : "Present"}`
}

/** "2025" · "2024 – 2025" · "2024 – Present" */
export function formatYears(start: YearMonth, end: YearMonth | null): string {
  const from = parse(start).year
  if (!end) return `${from} – Present`
  const to = parse(end).year
  return from === to ? `${from}` : `${from} – ${to}`
}

/** Sortable key: ongoing entries rank above finished ones. */
export function sortKey(start: YearMonth, end: YearMonth | null): number {
  if (!end) return Number.MAX_SAFE_INTEGER
  const { year, month } = parse(end)
  return year * 12 + month
}

/** Reverse-chronological: latest end date first, latest start breaks ties. */
export function byMostRecent<T extends { start: YearMonth; end: YearMonth | null }>(a: T, b: T): number {
  const byEnd = sortKey(b.start, b.end) - sortKey(a.start, a.end)
  if (byEnd !== 0) return byEnd
  return sortKey(b.start, b.start) - sortKey(a.start, a.start)
}
