import Link from "next/link"
import { Github, Linkedin, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { personal } from "@/content/personal"
import { skills }   from "@/content/skills"

export function Intro() {
  return (
    <section
      id="intro"
      className="relative py-40  flex items-center justify-center px-6 overflow-hidden section-dark"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-5xl">
        <div className="grid md:grid-cols-5 gap-16 items-center">

          {/* Identity — left */}
          <div className="md:col-span-3 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-widest text-primary">
                {personal.location}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                {personal.name}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-primary">
                {personal.title}
              </p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed max-w-xl">
              {personal.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href={personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={personal.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Skills — right */}
          <div className="md:col-span-2">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-5">
              Tools & Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm font-medium text-foreground bg-secondary rounded-full border border-border"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Scroll cue */}
        <div className="absolute -bottom-10 left-0">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-2"
          >

            <Link href="#projects">
              <ArrowDown className="h-4 w-4 animate-bounce" />
              <span className="text-xs uppercase tracking-widest">Scroll</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
