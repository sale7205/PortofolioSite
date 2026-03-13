import Link from "next/link"
import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/layout/section-header"
import { experience } from "@/content/experience"
import { personal }   from "@/content/personal"

export function Experience() {
  return (
    <section id="experience" className="py-18 px-6 section-dark">
      <div className="mx-auto max-w-4xl">
        <SectionHeader label="Experience" title="Resume" />

        <div className="mt-12 space-y-8">
          {experience.map((item) => (
            <div key={`${item.company}-${item.period}`} className="grid md:grid-cols-4 gap-4 md:gap-8">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                {item.period}
              </p>
              <div className="md:col-span-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.role}{" "}
                  <span className="text-primary">@ {item.company}</span>
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href={personal.links.resume2} download>
              <Download className="h-4 w-4" />
              Download CV
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href={personal.links.resume2} target="_blank" rel="noopener noreferrer">
              <FileText className="h-4 w-4" />
              View Online
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
