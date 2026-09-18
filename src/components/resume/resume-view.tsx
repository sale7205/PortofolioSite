"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Award, Briefcase, Code2, Download, Mail, MapPin, Phone, Linkedin, Rocket, Star } from "lucide-react"
import { profile } from "@/content/site"
import {
  certifications,
  competencies,
  education,
  leadership,
  work,
  type TimelineEntry,
} from "@/content/experience"
import { resumeProjects } from "@/content/projects"
import { formatPeriod } from "@/lib/date"
import { domainStyles, DIMMED } from "./domains"
import { AnimatedCard, SectionCard, Timeline, useTyping, type TimelineItem } from "./resume-ui"

const sections = [
  { id: "about",        label: "About"          },
  { id: "competencies", label: "Competencies"   },
  { id: "experience",   label: "Experience"     },
  { id: "projects",     label: "Projects"       },
  { id: "certs",        label: "Certifications" },
  { id: "leadership",   label: "Leadership"     },
]

function toTimelineItem(entry: TimelineEntry): TimelineItem {
  return {
    id:      entry.id,
    title:   entry.role,
    meta:    [entry.org, entry.location].filter(Boolean).join(" · "),
    badge:   entry.type,
    period:  formatPeriod(entry.start, entry.end),
    domain:  entry.domain,
    keys:    entry.keys,
    bullets: entry.bullets,
  }
}

export function ResumeView({ summary }: { summary: string }) {
  const [activeSection, setActiveSection] = useState("about")
  const [highlightedKeys, setHighlightedKeys] = useState<string[]>([])
  const [typingActive, setTypingActive] = useState(false)
  const typedTitle = useTyping("Aerospace Engineer", 65, typingActive)

  const experienceItems = useMemo(() => work.map(toTimelineItem), [])
  const leadershipItems = useMemo(() => leadership.map(toTimelineItem), [])
  const projectItems    = useMemo<TimelineItem[]>(
    () =>
      resumeProjects.map((project) => ({
        id:       project.slug,
        title:    project.title,
        subtitle: project.subtitle,
        badge:    project.category,
        period:   formatPeriod(project.start, project.end),
        domain:   project.domain,
        keys:     project.keys,
        bullets:  project.resumeSummary ? [project.resumeSummary] : [],
      })),
    [],
  )

  useEffect(() => {
    const timer = setTimeout(() => setTypingActive(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observers = sections.flatMap(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return []
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.35 },
      )
      observer.observe(el)
      return [observer]
    })
    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  const scrollTo = useCallback(
    (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }),
    [],
  )

  const contactRows = [
    { icon: Phone,    text: profile.links.phone,    href: `tel:${profile.links.phone.replace(/\s/g, "")}` },
    { icon: Mail,     text: profile.links.email,    href: `mailto:${profile.links.email}` },
    { icon: Linkedin, text: profile.links.linkedin.replace("https://", ""), href: profile.links.linkedin },
    { icon: MapPin,   text: profile.location,       href: null },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[1100px] mx-auto px-4 py-6 md:px-5 md:py-7">
        <div className="flex flex-col md:flex-row gap-5 items-start">

          {/* Sidebar */}
          <aside className="w-full md:w-[272px] md:shrink-0 md:sticky md:top-4 flex flex-col gap-4">
            <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-5">
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-border bg-secondary overflow-hidden flex items-center justify-center">
                    <svg className="w-10 h-10 md:w-14 md:h-14 fill-muted-foreground/30" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-card" />
                </div>
                <div className="flex-1 md:flex-none">
                  <h1 className="text-xl md:text-[22px] font-bold text-foreground leading-tight tracking-tight">
                    {profile.name}
                  </h1>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["CSWE", "STK L3", "MATLAB"].map((badge) => (
                      <span key={badge} className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border bg-secondary text-muted-foreground">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-primary mt-2 font-mono min-h-[1.25rem] tracking-wide">
                    {typedTitle}
                    <span className="animate-pulse opacity-60">|</span>
                  </p>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex flex-col gap-0.5">
                {contactRows.map(({ icon: Icon, text, href }) => {
                  const content = (
                    <>
                      <Icon size={13} className="text-primary/70 shrink-0" />
                      <span className="text-xs text-muted-foreground break-all">{text}</span>
                    </>
                  )
                  return href ? (
                    <a key={text} href={href} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-secondary/50 transition-colors">
                      {content}
                    </a>
                  ) : (
                    <div key={text} className="flex items-center gap-3 px-3 py-2 rounded-xl">
                      {content}
                    </div>
                  )
                })}
              </div>

              <div className="h-px bg-border" />

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-2">Education</p>
                <p className="text-sm font-semibold text-foreground">{education.school}</p>
                <p className="text-xs text-primary/80">{education.degree}</p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  {formatPeriod(education.start, education.end)}
                </p>
              </div>

              <Link
                href={profile.links.resumePdf}
                download
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <Download size={13} />
                Download PDF
              </Link>
            </div>

            <nav className="hidden md:block rounded-2xl border border-border bg-card p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">Sections</p>
              <div className="flex flex-col gap-0.5">
                {sections.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    aria-current={activeSection === id}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 group ${
                      activeSection === id ? "bg-primary/8" : "hover:bg-secondary/40"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      activeSection === id ? "bg-primary scale-125" : "bg-border group-hover:bg-muted-foreground/50"
                    }`} />
                    <span className={`text-xs font-medium transition-colors duration-200 ${
                      activeSection === id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </nav>
          </aside>

          {/* Main column */}
          <div className="flex-1 flex flex-col gap-4 min-w-0 w-full">

            <AnimatedCard delay={50}>
              <SectionCard icon={Star} title="About" id="about">
                <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
              </SectionCard>
            </AnimatedCard>

            <AnimatedCard delay={80}>
              <SectionCard icon={Code2} title="Key Competencies" id="competencies">
                <div className="flex flex-wrap gap-1.5">
                  {competencies.map((competency) => {
                    const style    = domainStyles[competency.domain]
                    const isActive = highlightedKeys.length > 0 && competency.keys.some((key) => highlightedKeys.includes(key))
                    const isDimmed = highlightedKeys.length > 0 && !isActive
                    return (
                      <button
                        key={competency.label}
                        type="button"
                        onMouseEnter={() => setHighlightedKeys(competency.keys)}
                        onMouseLeave={() => setHighlightedKeys([])}
                        onFocus={() => setHighlightedKeys(competency.keys)}
                        onBlur={() => setHighlightedKeys([])}
                        className={`text-sm px-3 py-1.5 rounded-full border transition-all duration-200 select-none ${
                          isActive ? style.active : isDimmed ? `${style.tag} ${DIMMED}` : `${style.tag} hover:opacity-80`
                        }`}
                      >
                        {competency.label}
                      </button>
                    )
                  })}
                </div>
                {highlightedKeys.length > 0 && (
                  <p className="text-xs text-muted-foreground/40 mt-3 font-mono">↑ related entries highlighted below</p>
                )}
              </SectionCard>
            </AnimatedCard>

            <AnimatedCard delay={110}>
              <SectionCard icon={Briefcase} title="Professional Experience" id="experience">
                <Timeline items={experienceItems} highlightedKeys={highlightedKeys} />
              </SectionCard>
            </AnimatedCard>

            <AnimatedCard delay={140}>
              <SectionCard icon={Rocket} title="Projects" id="projects">
                <Timeline items={projectItems} highlightedKeys={highlightedKeys} />
                <p className="text-xs text-muted-foreground/50 mt-2">
                  Full technical documentation at{" "}
                  <Link href="/#projects" className="text-primary/70 hover:text-primary transition-colors">
                    salehaldhafeeri.com
                  </Link>
                </p>
              </SectionCard>
            </AnimatedCard>

            <AnimatedCard delay={170}>
              <SectionCard icon={Award} title="Certifications" id="certs">
                <div className="grid sm:grid-cols-2 gap-2">
                  {certifications.map((certification) => (
                    <div
                      key={certification.name}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-border bg-secondary/40 hover:border-primary/20 hover:bg-secondary/70 transition-all duration-200"
                    >
                      <span className="text-sm font-medium text-foreground">{certification.name}</span>
                      <span className="text-xs font-mono ml-3 shrink-0 text-primary/70">{certification.note}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </AnimatedCard>

            <AnimatedCard delay={200}>
              <SectionCard icon={Star} title="Leadership & Activities" id="leadership">
                <Timeline items={leadershipItems} highlightedKeys={highlightedKeys} />
              </SectionCard>
            </AnimatedCard>

            <p className="text-center text-[11px] text-muted-foreground/40 py-4 font-mono">
              {new Date().getFullYear()} · {profile.name} · Aerospace Engineering
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
