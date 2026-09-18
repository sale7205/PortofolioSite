"use client"

import { useState } from "react"
import { FileText, Play } from "lucide-react"
import type { ProjectAsset } from "@/content/projects"
import { PdfViewer }   from "./pdf-viewer"
import { VideoViewer } from "./video-viewer"

export function ProjectViewer({ assets }: { assets: ProjectAsset[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = assets[activeIndex]

  if (!active) return null

  return (
    <div className="mt-10">

      {/* Asset tabs — only rendered when there is something to switch between */}
      {assets.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {assets.map((asset, i) => (
            <button
              key={asset.label}
              onClick={() => setActiveIndex(i)}
              aria-pressed={i === activeIndex}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm border transition-all duration-200 ${
                i === activeIndex
                  ? "bg-primary text-primary-foreground border-primary font-medium"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {asset.type === "video" ? <Play size={12} /> : <FileText size={12} />}
              {asset.label}
            </button>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {active.description}
      </p>

      {active.type === "pdf" && active.path && (
        <PdfViewer path={active.path} label={active.label} />
      )}
      {active.type === "video" && active.url && (
        <VideoViewer url={active.url} label={active.label} />
      )}

    </div>
  )
}
