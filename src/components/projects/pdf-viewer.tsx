"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Download } from "lucide-react"
import { PdfToolbar } from "./pdf-toolbar"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf-worker/pdf.worker.min.mjs"

const MIN_SCALE  = 0.5
const MAX_SCALE  = 3.0
const SCALE_STEP = 0.25

interface PdfViewerProps {
  path:  string
  label: string
}

export function PdfViewer({ path, label }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [numPages,       setNumPages]       = useState(0)
  const [currentPage,    setCurrentPage]    = useState(1)
  const [scale,          setScale]          = useState(1)
  const [containerWidth, setContainerWidth] = useState(0)

  // Track the container width so the page re-renders crisply on resize/rotate.
  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    setContainerWidth(node.clientWidth)
    const observer = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const onLoadSuccess = useCallback((pdf: { numPages: number }) => {
    setNumPages(pdf.numPages)
    setCurrentPage(1)
  }, [])

  const goTo = useCallback(
    (page: number) => setCurrentPage(Math.min(Math.max(1, page), numPages || 1)),
    [numPages],
  )

  const zoomIn  = useCallback(() => setScale((s) => Math.min(+(s + SCALE_STEP).toFixed(2), MAX_SCALE)), [])
  const zoomOut = useCallback(() => setScale((s) => Math.max(+(s - SCALE_STEP).toFixed(2), MIN_SCALE)), [])

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-border bg-card">
      <PdfToolbar
        currentPage={currentPage}
        numPages={numPages}
        scale={scale}
        path={path}
        minScale={MIN_SCALE}
        maxScale={MAX_SCALE}
        onPrev={() => goTo(currentPage - 1)}
        onNext={() => goTo(currentPage + 1)}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
      />

      <div ref={containerRef} className="overflow-auto bg-muted/30" style={{ maxHeight: "78vh" }}>
        <Document
          file={path}
          onLoadSuccess={onLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
              Loading…
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <p className="text-muted-foreground text-sm">Could not render PDF in browser.</p>
              <a
                href={path}
                download
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <Download size={13} />
                Download {label}
              </a>
            </div>
          }
        >
          <Page
            pageNumber={currentPage}
            width={containerWidth ? containerWidth * scale : undefined}
            renderTextLayer
            renderAnnotationLayer
            className="mx-auto shadow-md"
          />
        </Document>
      </div>
    </div>
  )
}
