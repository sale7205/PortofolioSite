import Link from "next/link"
import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { work } from "@/content/experience"
import { profile } from "@/content/site"
import { formatPeriod } from "@/lib/date"

export function Experience() {
  return (
    <section id="experience" className="py-20 px-6 section-dark">
      <div className="mx-auto max-w-4xl">
        <SectionHeader label="Experience" title="Where I've Worked" />

        <div className="mt-12 space-y-8">
          {work.map((item) => (
            <div key={item.id} className="grid md:grid-cols-4 gap-4 md:gap-8">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                {formatPeriod(item.start, item.end)}
              </p>
              <div className="md:col-span-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.role}{" "}
                  <span className="text-primary">@ {item.org}</span>
                  {item.type && (
                    <span className="ml-2 text-xs font-normal uppercase tracking-wider text-muted-foreground">
                      {item.type}
                    </span>
                  )}
                </h3>
                {item.location && (
                  <p className="mt-1 text-sm text-muted-foreground/70">{item.location}</p>
                )}
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href={profile.links.resumePdf} download>
              <Download className="h-4 w-4" />
              Download CV
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href={profile.links.resumePage}>
              <FileText className="h-4 w-4" />
              View Full Resume
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
