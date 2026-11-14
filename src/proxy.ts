import { NextResponse, type NextRequest } from "next/server"
import { BLOCKED_BOTS } from "@/lib/blocked-bots"

const BLOCKED = new RegExp(
  BLOCKED_BOTS.map((bot) => bot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
  "i",
)

// Refuse archive, AI and scraper crawlers so the site is not copied or cached.
// They can still read robots.txt, which tells them they are disallowed.
export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? ""

  if (BLOCKED.test(userAgent)) {
    return new NextResponse("Forbidden", {
      status:  403,
      headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!robots.txt|_next/static|_next/image).*)"],
}
