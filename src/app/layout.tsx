import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { profile, siteUrl } from "@/content/site"
import "./globals.css"

const inter     = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

const description =
  "Aerospace engineer specializing in systems engineering, GNC, EKF-based navigation, CFD analysis, and satellite mission design."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:  `${profile.name} | Portfolio`,
    template: `%s | ${profile.name}`,
  },
  description,
  // Unlisted site: accessible by link, but not indexed by search engines.
  robots: {
    index:        false,
    follow:       false,
    nocache:      true,
    noarchive:    true,
    nosnippet:    true,
    noimageindex: true,
    googleBot: {
      index:        false,
      follow:       false,
      noarchive:    true,
      nosnippet:    true,
      noimageindex: true,
    },
  },
  openGraph: {
    title:       `${profile.name} | Portfolio`,
    description,
    url:         siteUrl,
    siteName:    profile.name,
    type:        "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
