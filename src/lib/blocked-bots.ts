// Crawlers that copy or archive pages rather than index them for search.
// Search engines (Googlebot, Bingbot, ...) are deliberately NOT listed: they must be
// able to fetch a page to see its `noindex` directive and drop it from results.
export const BLOCKED_BOTS = [
  // Web archives
  "ia_archiver",
  "archive.org_bot",
  "Wayback Machine",
  "heritrix",
  "archive.today",
  "archive.is",
  "Arquivo-web-crawler",
  // Dataset / AI crawlers
  "CCBot",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "Amazonbot",
  "meta-externalagent",
  "FacebookBot",
  "cohere-ai",
  "Diffbot",
  "omgili",
  "Timpibot",
  "ImagesiftBot",
  // SEO / scraper crawlers
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "DataForSeoBot",
  "BLEXBot",
  "PetalBot",
]
