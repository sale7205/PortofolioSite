import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import { personal } from "@/content/personal"

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border section-elevated">
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link
            href={personal.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href={personal.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          {new Date().getFullYear()} Saleh Aldhafeeri. Built for technical portfolio review.
        </p>
      </div>
    </footer>
  )
}
