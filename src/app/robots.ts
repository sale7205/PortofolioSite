import type { MetadataRoute } from "next"

// The site is intentionally unlisted: reachable by direct link, hidden from search.
// Crawling stays allowed on purpose — search engines must be able to fetch a page
// to see its `noindex` directive (X-Robots-Tag header in next.config.mjs + the
// robots meta tag in layout.tsx). A `Disallow: /` here would hide that directive
// and could leave bare URLs in search results.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow:     "/",
    },
  }
}
