interface VideoViewerProps {
  url:   string
  label: string
}

export function VideoViewer({ url, label }: VideoViewerProps) {
  const src = url.includes("?") ? `${url}&rel=0&modestbranding=1` : `${url}?rel=0&modestbranding=1`

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card">
      <div className="aspect-video w-full">
        <iframe
          src={src}
          title={label}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  )
}
