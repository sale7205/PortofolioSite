import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileText, Play, CheckCircle2 } from "lucide-react"
import { Navbar }        from "@/components/navbar"
import { Footer }        from "@/components/footer"
import { ProjectViewer } from "@/components/projects/project-viewer"
import { projects }      from "@/content/projects"
import { formatPeriod }  from "@/lib/date"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project  = projects.find((p) => p.slug === slug)

  if (!project) return { title: "Project not found" }

  return {
    title:       `${project.title} — ${project.subtitle}`,
    description: project.description,
    openGraph: {
      title:       `${project.title} — ${project.subtitle}`,
      description: project.description,
      type:        "article",
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project  = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <div className="max-w-5xl mx-auto px-6 py-20">

          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors mb-14"
          >
            <ArrowLeft size={14} />
            Back to Projects
          </Link>

          {/* Header */}
          <div className="border-b border-border pb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                {project.category}
              </span>
              <span className="text-xs font-mono text-muted-foreground/60">
                {formatPeriod(project.start, project.end)}
              </span>
            </div>

            <h1 className="text-4xl font-semibold mt-3 text-foreground">
              {project.title}
            </h1>

            <p className="text-muted-foreground text-xl mt-2">
              {project.subtitle}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {project.assets.map((asset) => (
                <span
                  key={asset.label}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-border text-muted-foreground text-[11px] uppercase tracking-wider"
                >
                  {asset.type === "video" ? <Play size={9} /> : <FileText size={9} />}
                  {asset.label}
                </span>
              ))}
            </div>
          </div>

          {/* Overview + Highlights */}
          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_auto] md:gap-16">
            <div>
              <h2 className="text-xs font-medium uppercase tracking-wider text-primary mb-4">
                Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {project.longDescription}
              </p>
            </div>

            <div className="md:w-72 shrink-0">
              <h2 className="text-xs font-medium uppercase tracking-wider text-primary mb-4">
                Key Contributions
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary/60" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Assets */}
          <div className="mt-14 border-t border-border pt-12">
            <h2 className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
              Documents & Media
            </h2>
            <ProjectViewer assets={project.assets} />
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
