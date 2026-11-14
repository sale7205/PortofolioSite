/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff"                         },
          { key: "X-Frame-Options",          value: "DENY"                             },
          { key: "X-XSS-Protection",         value: "1; mode=block"                   },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
          // Unlisted site: keep every page and file (incl. PDFs) out of search engines.
          { key: "X-Robots-Tag",             value: "noindex, nofollow, noarchive, nosnippet, noimageindex" },
        ],
      },
    ]
  },
}

export default nextConfig
