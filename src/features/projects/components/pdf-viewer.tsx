"use client"

import { Document, Page, pdfjs } from "react-pdf"
import { Download } from "lucide-react"
import { usePdfViewer } from "../hooks/use-pdf-viewer"
import { PdfToolbar } from "./pdf-toolbar"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf-worker/pdf.worker.min.mjs`

interface PdfViewerProps {
  path:  string
  label: string
}

export function PdfViewer({ path, label }: PdfViewerProps) {
  const {
    numPages, currentPage, scale, containerWidth,
    containerRef, onLoadSuccess, goTo, zoomIn, zoomOut,
  } = usePdfViewer()

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-border bg-card">
      <PdfToolbar
        currentPage={currentPage}
        numPages={numPages}
        scale={scale}
        path={path}
        label={label}
        onPrev={() => goTo(currentPage - 1)}
        onNext={() => goTo(currentPage + 1)}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
      />

      <div
        ref={containerRef}
        className="overflow-auto bg-muted/30"
        style={{ maxHeight: "78vh" }}
      >
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
