import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SectionHeader } from "@/components/layout/section-header"
import { contactLinks } from "@/content/contact"

export function Contact() {
  return (
    <section id="contact" className="py-10 px-6 section-elevated">
      <div className="mx-auto max-w-4xl">
        <SectionHeader label="Contact" title="Get in Touch" />

        <p className="mt-8 text-lg text-muted-foreground max-w-xl">
          Open to discussing projects, opportunities, or just connecting.
        </p>

        <div className="mt-12 space-y-6">
          {contactLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between py-4 border-b border-border hover:border-primary/50 transition-colors"
            >
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                {link.label}
              </span>
              <span className="flex items-center gap-2 text-foreground group-hover:text-primary transition-colors">
                {link.value}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
