import { useState, useCallback } from "react"

interface UsePdfViewerReturn {
  numPages:        number
  currentPage:     number
  scale:           number
  containerWidth:  number
  containerRef:    (node: HTMLDivElement | null) => void
  onLoadSuccess:   (pdf: { numPages: number }) => void
  goTo:            (page: number) => void
  zoomIn:          () => void
  zoomOut:         () => void
}

export function usePdfViewer(): UsePdfViewerReturn {
  const [numPages,       setNumPages]      = useState(0)
  const [currentPage,    setCurrentPage]   = useState(1)
  const [scale,          setScale]         = useState(1.0)
  const [containerWidth, setContainerWidth] = useState(0)

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setContainerWidth(node.clientWidth)
  }, [])

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setCurrentPage(1)
  }, [])

  const goTo = useCallback(
    (page: number) => setCurrentPage(Math.min(Math.max(1, page), numPages)),
    [numPages]
  )

  const zoomIn  = useCallback(() => setScale(s => Math.min(+(s + 0.25).toFixed(2), 3.0)), [])
  const zoomOut = useCallback(() => setScale(s => Math.max(+(s - 0.25).toFixed(2), 0.5)), [])

  return {
    numPages,
    currentPage,
    scale,
    containerWidth,
    containerRef,
    onLoadSuccess,
    goTo,
    zoomIn,
    zoomOut,
  }
}
