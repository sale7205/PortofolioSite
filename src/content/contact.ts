export interface ContactLink {
  label:    string
  value:    string
  href:     string
  external: boolean
}

export const contactLinks: ContactLink[] = [
  {
    label:    "Email",
    value:    "salehaldhafeeri@outlook.com",
    href:     "mailto:salehaldhafeeri@outlook.com",
    external: false,
  },
  {
    label:    "LinkedIn",
    value:    "linkedin.com/in/0c0",
    href:     "https://linkedin.com/in/0c0",
    external: true,
  },
  {
    label:    "GitHub",
    value:    "github.com/sale7205",
    href:     "https://github.com/sale7205",
    external: true,
  },
]
