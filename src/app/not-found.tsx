import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">404</p>
        <h1 className="text-4xl font-bold text-foreground">Page not found</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
