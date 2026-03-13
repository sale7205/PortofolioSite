export interface NavLink {
  href:  string
  label: string
}

export const navLinks: NavLink[] = [
  { href: "#intro",      label: "About"    },
  { href: "#projects",   label: "Projects" },
  { href: "#experience", label: "Resume"   },
  { href: "#contact",    label: "Contact"  },
]
