import type { Domain } from "@/content/experience"

/**
 * Accent styling per domain. Data files carry the semantic `domain`; the
 * Tailwind classes live here so content stays free of presentation.
 */
export const domainStyles: Record<Domain, {
  tag:    string
  dot:    string
  bullet: string
  glow:   string
  active: string
}> = {
  cyan: {
    tag:    "text-cyan-300 bg-cyan-500/10 border-cyan-500/25",
    dot:    "bg-cyan-400 ring-cyan-400/20",
    bullet: "bg-cyan-400/70",
    glow:   "border-cyan-400/20 bg-cyan-400/5",
    active: "bg-cyan-400/12 border-cyan-400/45 text-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.12)] scale-105",
  },
  violet: {
    tag:    "text-violet-300 bg-violet-500/10 border-violet-500/25",
    dot:    "bg-violet-400 ring-violet-400/20",
    bullet: "bg-violet-400/70",
    glow:   "border-violet-400/20 bg-violet-400/5",
    active: "bg-violet-400/12 border-violet-400/45 text-violet-200 shadow-[0_0_14px_rgba(167,139,250,0.12)] scale-105",
  },
  amber: {
    tag:    "text-amber-300 bg-amber-500/10 border-amber-500/25",
    dot:    "bg-amber-400 ring-amber-400/20",
    bullet: "bg-amber-400/70",
    glow:   "border-amber-400/20 bg-amber-400/5",
    active: "bg-amber-400/12 border-amber-400/45 text-amber-200 shadow-[0_0_14px_rgba(251,191,36,0.12)] scale-105",
  },
}

export const DIMMED = "opacity-30"
