import { projects }    from "../data"
import { ProjectCard } from "./project-card"
import { SectionHeader } from "@/components/layout/section-header"

export function ProjectGrid() {
  return (
    <section id="projects" className="py-10 px-6 section-elevated">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          label="Work"
          title="Selected Projects"
          subtitle="Engineering projects and technical documentation"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
