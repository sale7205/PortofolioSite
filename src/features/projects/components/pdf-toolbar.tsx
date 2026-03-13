import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Maximize2 } from "lucide-react"

interface PdfToolbarProps {
  currentPage: number
  numPages:    number
  scale:       number
  path:        string
  label:       string
  onPrev:      () => void
  onNext:      () => void
  onZoomIn:    () => void
  onZoomOut:   () => void
}

export function PdfToolbar({
  currentPage,
  numPages,
  scale,
  path,
  label,
  onPrev,
  onNext,
  onZoomIn,
  onZoomOut,
}: PdfToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm">

      {/* Page navigation */}
      <div className="flex items-center gap-1">
        <button
          onClick={onPrev}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="text-sm tabular-nums px-2">
          <span className="font-medium text-foreground">{currentPage}</span>
          <span className="text-muted-foreground"> / {numPages || "—"}</span>
        </span>

        <button
          onClick={onNext}
          disabled={currentPage >= numPages}
          aria-label="Next page"
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Zoom */}
      <div className="flex items-center gap-1">
        <button
          onClick={onZoomOut}
          disabled={scale <= 0.5}
          aria-label="Zoom out"
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ZoomOut size={16} />
        </button>

        <span className="text-xs text-muted-foreground tabular-nums w-12 text-center">
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={onZoomIn}
          disabled={scale >= 3.0}
          aria-label="Zoom in"
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ZoomIn size={16} />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open in new tab"
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Maximize2 size={15} />
        </a>

        <a
          href={path}
          download
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
        >
          <Download size={13} />
          Download
        </a>
      </div>
    </div>
  )
}
