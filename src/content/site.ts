/**
 * Site-wide identity, links and navigation.
 * Single source of truth — every page reads from here.
 */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://salehaldhafeeri.com"

export const profile = {
  name:     "Saleh Aldhafeeri",
  bio: [
    "Aerospace engineer working across GNC, systems engineering and data-driven problem solving, with project work in spacecraft mission design, navigation and aerodynamics.",
    "Industry experience in airworthiness at Saudia Technic and Aramco and in strategy at Accenture. Founded Waypoint AI, an LLM routing venture, and now pursuing an MS in Technology Innovation and Entrepreneurship at KAUST.",
  ],
  links: {
    github:     "https://github.com/sale7205",
    linkedin:   "https://linkedin.com/in/0c0",
    email:      "salehaldhafeeri@outlook.com",
    resumePage: "/resume",
    resumePdf:  "/cv/Saleh-Aldhafeeri-CV.pdf",
  },
} as const

export interface ContactLink {
  label:    string
  value:    string
  href:     string
  external: boolean
}

export const contactLinks: ContactLink[] = [
  {
    label:    "Email",
    value:    profile.links.email,
    href:     `mailto:${profile.links.email}`,
    external: false,
  },
  {
    label:    "LinkedIn",
    value:    profile.links.linkedin.replace("https://", ""),
    href:     profile.links.linkedin,
    external: true,
  },
  {
    label:    "GitHub",
    value:    profile.links.github.replace("https://", ""),
    href:     profile.links.github,
    external: true,
  },
]

export interface NavLink {
  href:  string
  label: string
}

/** Absolute hashes so the nav also works from /projects/* and /resume. */
export const navLinks: NavLink[] = [
  { href: "/#intro",      label: "About"    },
  { href: "/#projects",   label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact",    label: "Contact"  },
]

export const skills = [
  "MATLAB",
  "Python",
  "SolidWorks",
  "ANSYS Fluent",
  "Systems Engineering",
  "CFD Analysis",
] as const

export type Skill = typeof skills[number]
