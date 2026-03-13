import Link from "next/link"
import { ArrowUpRight, FileText, Play } from "lucide-react"
import type { Project } from "../types"

export function ProjectCard({ slug, title, subtitle, description, category, assets }: Project) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <article className="h-full p-6 rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]">

        <div className="flex items-start justify-between gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            {category}
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="mt-2 text-sm font-medium text-muted-foreground">
          {subtitle}
        </p>

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {assets.map((asset, i) => (
            <span
              key={i}
              className="flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-border text-muted-foreground"
            >
              {asset.type === "video" ? <Play size={8} /> : <FileText size={8} />}
              {asset.label}
            </span>
          ))}
        </div>

      </article>
    </Link>
  )
}
