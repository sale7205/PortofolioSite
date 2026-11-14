import type { MetadataRoute } from "next"
import { BLOCKED_BOTS } from "@/lib/blocked-bots"

// The site is intentionally unlisted: reachable by direct link, hidden from search.
//
// Search engines stay allowed on purpose — they must be able to fetch a page to see
// its `noindex` directive (X-Robots-Tag header in next.config.mjs + the robots meta
// tag in layout.tsx). A blanket `Disallow: /` would hide that directive and could
// leave bare URLs in search results.
//
// Archive, AI and scraper crawlers are disallowed outright (and refused in proxy.ts).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: BLOCKED_BOTS, disallow: "/" },
      { userAgent: "*", allow: "/" },
    ],
  }
}
