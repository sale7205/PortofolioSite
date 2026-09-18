"use client"

import { useEffect, useRef, useState } from "react"
import type { Domain } from "@/content/experience"
import { domainStyles } from "./domains"

/** One row on any of the resume timelines — experience, projects or leadership. */
export interface TimelineItem {
  id:        string
  title:     string
  subtitle?: string
  meta?:     string
  badge?:    string
  period:    string
  domain:    Domain
  keys:      string[]
  bullets:   string[]
}

export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Readers who ask for less motion get the content straight away.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

export function useTyping(text: string, speed = 65, active = false) {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    if (!active) return
    let i = 0
    setDisplayed("")
    const interval = setInterval(() => {
      i += 1
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [active, text, speed])

  return displayed
}

export function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal transition-all duration-700 ${
        inView ? "opacity-100 [transform:none]" : "opacity-0 [transform:translateY(1.25rem)]"
      }`}
    >
      {children}
    </div>
  )
}

export function SectionCard({
  icon: Icon,
  title,
  id,
  children,
}: {
  icon:     React.ElementType
  title:    string
  id?:      string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border bg-primary/8 border-primary/15 transition-all duration-300 group-hover:bg-primary/15 group-hover:border-primary/30">
          <Icon size={16} className="text-primary" />
        </div>
        <h2 className="text-base font-semibold text-foreground tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  )
}

export function DatePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-mono px-2.5 py-1 rounded-lg border border-border bg-secondary/60 text-muted-foreground shrink-0">
      {children}
    </span>
  )
}

function BulletList({ bullets, domain }: { bullets: string[]; domain: Domain }) {
  return (
    <ul className="flex flex-col gap-2">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${domainStyles[domain].bullet}`} />
          {bullet}
        </li>
      ))}
    </ul>
  )
}

function TimelineRow({ item, highlighted, isLast }: { item: TimelineItem; highlighted: boolean; isLast: boolean }) {
  const { ref, inView } = useInView<HTMLLIElement>()
  const style = domainStyles[item.domain]

  return (
    <li
      ref={ref}
      className={`reveal flex gap-4 transition-all duration-500 ${
        inView ? "opacity-100 [transform:none]" : "opacity-0 [transform:translateX(-1rem)]"
      }`}
    >
      <div className="flex flex-col items-center gap-1 shrink-0">
        <span
          className={`shrink-0 w-2.5 h-2.5 rounded-full mt-2 ring-4 transition-all duration-300 ${style.dot} ${
            highlighted ? "scale-125 ring-8" : ""
          }`}
        />
        {!isLast && <span className="w-px flex-1 bg-border" />}
      </div>

      <div className={`flex-1 pb-5 rounded-xl px-3 py-2 -ml-1 transition-all duration-300 ${highlighted ? `border ${style.glow}` : ""}`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-base font-semibold text-foreground">{item.title}</p>
              {item.subtitle && <span className="text-sm text-muted-foreground/60">— {item.subtitle}</span>}
              {item.badge && (
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${style.tag}`}>{item.badge}</span>
              )}
            </div>
            {item.meta && <p className="text-sm text-muted-foreground mt-0.5">{item.meta}</p>}
          </div>
          <DatePill>{item.period}</DatePill>
        </div>
        <BulletList bullets={item.bullets} domain={item.domain} />
      </div>
    </li>
  )
}

/** Shared timeline used by Experience, Projects and Leadership. */
export function Timeline({ items, highlightedKeys }: { items: TimelineItem[]; highlightedKeys: string[] }) {
  return (
    <ul className="flex flex-col pl-1">
      {items.map((item, i) => (
        <TimelineRow
          key={item.id}
          item={item}
          highlighted={highlightedKeys.length > 0 && item.keys.some((key) => highlightedKeys.includes(key))}
          isLast={i === items.length - 1}
        />
      ))}
    </ul>
  )
}
