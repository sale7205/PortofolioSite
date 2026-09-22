/**
 * Site-wide identity, links and navigation.
 * Single source of truth — every page reads from here.
 */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://salehaldhafeeri.com"

export const profile = {
  name:     "Saleh Aldhafeeri",
  title:    "Aerospace Engineering",
  location: "Riyadh, Saudi Arabia",
  bio: [
    "Aerospace engineer focused on automation, GNC, autonomous vehicles, systems engineering, technical modeling, and data-driven problem solving. Academic and project experience spans spacecraft mission design, navigation algorithm development, and aerodynamic analysis.",
    "Hands-on industry experience at Saudia Technic and Aramco, contributing to continuing airworthiness frameworks and maintenance support operations across narrow-body and wide-body fleets.",
    "Builds and ships software ventures independently alongside the engineering work — founded Waypoint AI, a self-funded LLM routing platform sold to freelance clients, and currently studying technology innovation and entrepreneurship on the KAUST TIE programme.",
  ],
  links: {
    github:     "https://github.com/sale7205",
    linkedin:   "https://linkedin.com/in/0c0",
    email:      "salehaldhafeeri@outlook.com",
    phone:      "+966 553 646 561",
    resumePage: "/resume",
    resumePdf:  "/resume/SalehAldhafeeriAerospaceCVV.pdf",
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
