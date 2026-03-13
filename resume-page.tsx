"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import {
  ArrowLeft, Phone, Mail, Linkedin, MapPin,
  Briefcase, GraduationCap, Award, Star, Code2, ChevronDown, Rocket, Wrench
} from "lucide-react"

export const Metadata = {
  title: "Resume - Saleh Aldhafeeri",
  description: "Aerospace Engineering Resume",
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const contact = [
  { icon: Phone,    text: "+966 553 646 561" },
  { icon: Mail,     text: "salehaldhafeeri@outlook.com" },
  { icon: Linkedin, text: "linkedin.com/in/0c0" },
  { icon: MapPin,   text: "Riyadh, Saudi Arabia" },
]

// color variants for skill tags
const competencies = [
  { label: "Systems Engineering", keys: ["systems", "prometheus", "cross-functional"], color: "violet" },
  { label: "GNC",                 keys: ["gnc", "guidance", "control", "pid"],          color: "cyan" },
  { label: "EKF / INS",           keys: ["ekf", "kalman", "imu", "navigation"],         color: "cyan" },
  { label: "Spacecraft Design",   keys: ["spacecraft", "leo", "satellite", "orbit"],    color: "indigo" },
  { label: "Compressible CFD",    keys: ["cfd", "turbine", "fluent", "aerodynamic"],    color: "orange" },
  { label: "Airworthiness",       keys: ["airworthiness", "cmm", "amm", "srm", "boeing", "airbus"], color: "green" },
  { label: "MATLAB",              keys: ["matlab", "ekf", "simulation"],                color: "cyan" },
  { label: "ANSYS Fluent",        keys: ["cfd", "fluent", "aerodynamic"],               color: "orange" },
  { label: "SolidWorks",          keys: ["solidworks", "turbine", "blade", "parametric"], color: "rose" },
  { label: "Python",              keys: ["python", "website", "backend"],               color: "yellow" },
  { label: "STK",                 keys: ["stk", "orbit", "satellite"],                  color: "indigo" },
  { label: "CAD / FEA",           keys: ["cad", "solidworks", "structural"],            color: "rose" },
]

const colorMap: Record<string, { base: string; active: string; glow: string }> = {
  cyan:   { base: "border-cyan-500/20 bg-cyan-500/5 text-cyan-300",     active: "border-cyan-400/60 bg-cyan-400/15 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.2)]",   glow: "border-cyan-400/40 bg-cyan-400/10" },
  violet: { base: "border-violet-500/20 bg-violet-500/5 text-violet-300", active: "border-violet-400/60 bg-violet-400/15 text-violet-200 shadow-[0_0_12px_rgba(167,139,250,0.2)]", glow: "border-violet-400/40 bg-violet-400/10" },
  indigo: { base: "border-indigo-500/20 bg-indigo-500/5 text-indigo-300", active: "border-indigo-400/60 bg-indigo-400/15 text-indigo-200 shadow-[0_0_12px_rgba(99,102,241,0.2)]",  glow: "border-indigo-400/40 bg-indigo-400/10" },
  orange: { base: "border-orange-500/20 bg-orange-500/5 text-orange-300", active: "border-orange-400/60 bg-orange-400/15 text-orange-200 shadow-[0_0_12px_rgba(251,146,60,0.2)]",  glow: "border-orange-400/40 bg-orange-400/10" },
  green:  { base: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300", active: "border-emerald-400/60 bg-emerald-400/15 text-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.2)]", glow: "border-emerald-400/40 bg-emerald-400/10" },
  rose:   { base: "border-rose-500/20 bg-rose-500/5 text-rose-300",      active: "border-rose-400/60 bg-rose-400/15 text-rose-200 shadow-[0_0_12px_rgba(251,113,133,0.2)]",   glow: "border-rose-400/40 bg-rose-400/10" },
  yellow: { base: "border-yellow-500/20 bg-yellow-500/5 text-yellow-300", active: "border-yellow-400/60 bg-yellow-400/15 text-yellow-200 shadow-[0_0_12px_rgba(250,204,21,0.2)]", glow: "border-yellow-400/40 bg-yellow-400/10" },
}

const tagColors: Record<string, string> = {
  "Systems Eng.": "text-violet-300 bg-violet-500/10 border-violet-500/30",
  "GNC":          "text-cyan-300   bg-cyan-500/10   border-cyan-500/30",
  "Aerodynamics": "text-orange-300 bg-orange-500/10 border-orange-500/30",
}

const experience = [
  {
    id:       "saudia",
    role:     "Aircraft Engineering Intern",
    company:  "Saudia Technic",
    location: "Jeddah, Saudi Arabia",
    date:     "May 2025 – Sept 2025",
    color:    "green",
    keys:     ["airworthiness", "cmm", "amm", "srm", "boeing", "airbus"],
    bullets: [
      "Resolved 50+ maintenance queries via CMM/AMM/SRM manuals, achieving 95% first-pass engineering order approval rate.",
      "Supported line & hangar operations on A320/321, B787-9/10, and B777-300 fleets across 10+ scheduled weekly checks.",
      "Verified post-maintenance airworthiness for 7 aircraft against Boeing and Airbus requirements; maintained W&B compliance prior to release.",
    ],
  },
  {
    id:       "psu",
    role:     "Research Assistant",
    company:  "Penn State University",
    location: "University Park, PA",
    date:     "2021 – Present",
    color:    "indigo",
    keys:     ["gnc", "navigation", "aerodynamic", "autonomous"],
    bullets: [
      "Focused on autonomous vehicles, GNC system design, and aerodynamic modeling.",
      "Contributed to navigation algorithm development and spacecraft mission architecture research.",
    ],
  },
]

const projects = [
  {
    id:      "prometheus",
    title:   "Prometheus Mission I",
    sub:     "Autonomous On-Orbit Refueling",
    tag:     "Systems Eng.",
    date:    "Aug – Dec 2025",
    color:   "violet",
    keys:    ["systems", "gnc", "ekf", "spacecraft", "leo", "satellite", "orbit", "cross-functional"],
    bullets: [
      "Led 6-engineer team designing a 70 kg autonomous refueling payload targeting LEO satellites; carried 30 kg hydrazine for 6–10 client transfers.",
      "Delivered GNC precision of ±2 mm position and ±1° attitude at docking contact via EKF-based relative navigation.",
      "Directed cross-functional integration across propulsion, GNC, thermal & structures with autonomous fault response architecture.",
    ],
  },
  {
    id:      "ekf",
    title:   "Extended Kalman Filter",
    sub:     "Lunar Navigation System",
    tag:     "GNC",
    date:    "Jan – May 2025",
    color:   "cyan",
    keys:    ["ekf", "kalman", "imu", "navigation", "matlab", "simulation"],
    bullets: [
      "Developed 9-state EKF in MATLAB at 100 Hz for lunar nav with multi-rate IMU fusion; validated within 2σ consistency bounds.",
    ],
  },
  {
    id:      "drone",
    title:   "Autonomous Drone Landing",
    sub:     "GNC System Design",
    tag:     "GNC",
    date:    "Jan – May 2025",
    color:   "cyan",
    keys:    ["gnc", "guidance", "control", "pid"],
    bullets: [
      "Built cascaded PID/PD quadrotor guidance system for autonomous landing on a moving vehicle; achieved centimeter-level touchdown via velocity feedforward and flight-phase logic.",
    ],
  },
  {
    id:      "cfd",
    title:   "Turbine Blade CFD",
    sub:     "Aerodynamic Design & Analysis",
    tag:     "Aerodynamics",
    date:    "Aug – Dec 2024",
    color:   "orange",
    keys:    ["cfd", "fluent", "aerodynamic", "solidworks", "turbine", "blade", "parametric"],
    bullets: [
      "Modeled parametric 3D blade in SolidWorks; reduced total-pressure loss by 12% and raised section L/D by 18% through CFD optimization.",
    ],
  },
]

const certifications = [
  { name: "Ansys STK Grand Master", year: "Level 3", color: "indigo" },
  { name: "Ansys Fluent Certification", year: "2024",    color: "orange" },
  { name: "SolidWorks CSWE",           year: "2024",    color: "rose" },
  { name: "MathWorks MATLAB Associate", year: "2023",   color: "cyan" },
]

const certColorMap: Record<string, string> = {
  indigo: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
  orange: "text-orange-300 bg-orange-500/10 border-orange-500/20",
  rose:   "text-rose-300   bg-rose-500/10   border-rose-500/20",
  cyan:   "text-cyan-300   bg-cyan-500/10   border-cyan-500/20",
}

const leadership = [
  {
    id:      "mena",
    role:    "Treasurer",
    org:     "Penn State MENA Caucus Club",
    date:    "Dec 2023 – Dec 2024",
    color:   "yellow",
    keys:    ["python", "website", "backend"],
    bullets: [
      "Built and launched a secure finance website for 100+ members using JavaScript, Python & PostgreSQL; managed $10K event budget across 7 fundraisers.",
    ],
  },
  {
    id:      "consulting",
    role:    "Member",
    org:     "Nittany Lion Consulting Group",
    date:    "Jan 2023 – Dec 2025",
    color:   "violet",
    keys:    [],
    bullets: [
      "Delivered 6+ client engagements; reduced average case turnaround by 20% through standardized hypothesis-driven analysis frameworks.",
    ],
  },
]

const sections = [
  { id: "about",        label: "About",        color: "text-cyan-400" },
  { id: "competencies", label: "Competencies", color: "text-violet-400" },
  { id: "experience",   label: "Experience",   color: "text-emerald-400" },
  { id: "projects",     label: "Projects",     color: "text-orange-400" },
  { id: "certs",        label: "Certifications", color: "text-rose-400" },
  { id: "leadership",   label: "Leadership",   color: "text-yellow-400" },
]

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useTyping(text: string, speed = 60, active = false) {
  const [displayed, setDisplayed] = useState("")
  useEffect(() => {
    if (!active) return
    let i = 0
    setDisplayed("")
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [active, text, speed])
  return displayed
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function AnimatedCard({ children, delay = 0, id }: {
  children: React.ReactNode; delay?: number; id?: string
}) {
  const { ref, inView } = useInView()
  return (
    <div
      id={id}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {children}
    </div>
  )
}

function SectionCard({ icon: Icon, title, children, id, iconColor = "text-cyan-400", iconBg = "bg-cyan-400/10 border-cyan-400/20" }: {
  icon: React.ElementType; title: string; children: React.ReactNode
  id?: string; iconColor?: string; iconBg?: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      id={id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-2xl border bg-card p-6 transition-all duration-300 ${
        hovered ? "border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.04)]" : "border-border"
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${iconBg}`}>
          <Icon size={17} className={iconColor} />
        </div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function TimelineDot({ color = "bg-cyan-400", ringColor = "ring-cyan-400/20", active }: {
  color?: string; ringColor?: string; active?: boolean
}) {
  return (
    <div className={`shrink-0 w-3 h-3 rounded-full mt-1.5 transition-all duration-300 ring-4 ${color} ${ringColor} ${
      active ? "scale-125 ring-8" : ""
    }`} />
  )
}

function AnimatedTimeline({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView(0.1)
  return (
    <div ref={ref} className="relative">
      <div
        className="absolute left-1.5 top-3 w-px bg-gradient-to-b from-white/10 to-transparent transition-all duration-1000 ease-out origin-top"
        style={{ height: inView ? "100%" : "0%" }}
      />
      {children}
    </div>
  )
}

function ExpandableProject({ project, highlightedKeys }: {
  project: typeof projects[0]; highlightedKeys: string[]
}) {
  const [expanded, setExpanded] = useState(false)
  const { ref, inView } = useInView()
  const isHighlighted = highlightedKeys.length > 0 && project.keys.some(k => highlightedKeys.includes(k))
  const c = colorMap[project.color] ?? colorMap.cyan
  const dotColor = {
    violet: "bg-violet-400 ring-violet-400/20",
    cyan:   "bg-cyan-400   ring-cyan-400/20",
    orange: "bg-orange-400 ring-orange-400/20",
  }[project.color] ?? "bg-cyan-400 ring-cyan-400/20"

  return (
    <div
      ref={ref}
      className={`flex gap-4 transition-all duration-500 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
    >
      <div className="flex flex-col items-center gap-1 shrink-0">
        <div className={`shrink-0 w-3 h-3 rounded-full mt-1.5 ring-4 transition-all duration-300 ${dotColor} ${isHighlighted ? "scale-125 ring-8" : ""}`} />
        <div className="w-px flex-1 bg-border" />
      </div>
      <div className={`flex-1 pb-4 rounded-xl p-3 -ml-1 transition-all duration-300 ${
        isHighlighted ? `border ${c.glow}` : ""
      }`}>
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-foreground">{project.title}</p>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${tagColors[project.tag] ?? "text-cyan-300 bg-cyan-500/10 border-cyan-500/30"}`}>
                {project.tag}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{project.sub}</p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-border bg-secondary text-muted-foreground shrink-0">
            {project.date}
          </span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mt-1">{project.bullets[0]}</p>

        {project.bullets.length > 1 && (
          <>
            <div className={`overflow-hidden transition-all duration-500 ${expanded ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
              <ul className="flex flex-col gap-1.5">
                {project.bullets.slice(1).map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${dotColor.split(" ")[0]}`} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setExpanded(v => !v)}
              className={`flex items-center gap-1 text-[11px] transition-colors mt-2 ${
                project.color === "violet" ? "text-violet-400 hover:text-violet-300" :
                project.color === "orange" ? "text-orange-400 hover:text-orange-300" :
                "text-cyan-400 hover:text-cyan-300"
              }`}
            >
              <ChevronDown size={12} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
              {expanded ? "Show less" : `+${project.bullets.length - 1} more`}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("about")
  const [hoveredSkill, setHoveredSkill] = useState<string[]>([])
  const [typingActive, setTypingActive] = useState(false)
  const typedTitle = useTyping("Aerospace Engineer", 60, typingActive)

  useEffect(() => {
    const t = setTimeout(() => setTypingActive(true), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActiveSection(id) }, { threshold: 0.4 })
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleSkillHover = useCallback((keys: string[]) => setHoveredSkill(keys), [])
  const handleSkillLeave = useCallback(() => setHoveredSkill([]), [])
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Nav */}
      <div className="print:hidden sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft size={14} />
          Back
        </Link>
        <button
          onClick={() => window.print()}
          className="text-xs font-medium px-4 py-1.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Print / Save PDF
        </button>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 py-8">
        <div className="flex gap-5 items-start">

          {/* ── SIDEBAR ── */}
          <aside className="w-[280px] shrink-0 sticky top-20 flex flex-col gap-4">
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-5">

              {/* Photo + Identity */}
              <div className="flex flex-col items-start gap-4">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full border-2 border-border bg-secondary overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]">
                    <svg className="w-14 h-14 fill-muted-foreground/40" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                  </div>
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-card animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground leading-tight">Saleh Aldhafeeri</h1>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[
                      { label: "CSWE",     cls: "border-rose-500/30   bg-rose-500/10   text-rose-300" },
                      { label: "STK L3",   cls: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300" },
                      { label: "MATLAB",   cls: "border-cyan-500/30   bg-cyan-500/10   text-cyan-300" },
                    ].map(b => (
                      <span key={b.label} className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${b.cls}`}>
                        {b.label}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-cyan-400 mt-2 font-mono min-h-[1.25rem]">
                    {typedTitle}<span className="animate-pulse">|</span>
                  </p>
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Contact */}
              <div className="flex flex-col gap-0.5">
                {contact.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-secondary/60 transition-colors cursor-default">
                    <Icon size={13} className="text-cyan-400 shrink-0" />
                    <span className="text-[11px] text-muted-foreground break-all">{text}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border" />

              {/* Education */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Education</p>
                <p className="text-sm font-semibold text-foreground">Penn State University</p>
                <p className="text-xs text-cyan-400">B.S. Aerospace Engineering</p>
                <p className="text-[11px] text-muted-foreground font-mono mt-0.5">Jan 2023 – May 2026</p>
              </div>
            </div>

            {/* Section nav */}
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Sections</p>
              <div className="flex flex-col gap-0.5">
                {sections.map(({ id, label, color }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 group ${
                      activeSection === id ? "bg-white/5" : "hover:bg-secondary/50"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      activeSection === id ? `${color.replace("text-", "bg-")} scale-125` : "bg-border group-hover:bg-muted-foreground"
                    }`} />
                    <span className={`text-xs font-medium transition-colors duration-200 ${
                      activeSection === id ? color : "text-muted-foreground group-hover:text-foreground"
                    }`}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── MAIN ── */}
          <div className="flex-1 flex flex-col gap-5 min-w-0">

            {/* About */}
            <AnimatedCard id="about" delay={50}>
              <SectionCard icon={Star} title="About" id="about" iconColor="text-cyan-400" iconBg="bg-cyan-400/10 border-cyan-400/20">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Aerospace Engineering senior at Penn State with a focus on systems engineering, GNC, and
                  data-driven problem solving. Academic and project experience spans spacecraft mission design,
                  EKF-based navigation algorithm development, and aerodynamic analysis. Hands-on industry
                  experience at Saudia Technic in airworthiness compliance and MRO operations across
                  narrow-body and wide-body fleets.
                </p>
              </SectionCard>
            </AnimatedCard>

            {/* Competencies */}
            <AnimatedCard id="competencies" delay={100}>
              <SectionCard icon={Code2} title="Key Competencies" id="competencies" iconColor="text-violet-400" iconBg="bg-violet-400/10 border-violet-400/20">
                <div className="flex flex-wrap gap-2">
                  {competencies.map((c) => {
                    const col = colorMap[c.color]
                    const isActive = hoveredSkill.length > 0 && c.keys.some(k => hoveredSkill.includes(k))
                    const isDimmed = hoveredSkill.length > 0 && !isActive
                    return (
                      <span
                        key={c.label}
                        onMouseEnter={() => handleSkillHover(c.keys)}
                        onMouseLeave={handleSkillLeave}
                        className={`text-xs px-3 py-1.5 rounded-full border cursor-default transition-all duration-200 ${
                          isActive ? col.active + " scale-105" : isDimmed ? "opacity-30 " + col.base : col.base + " hover:scale-105"
                        }`}
                      >
                        {c.label}
                      </span>
                    )
                  })}
                </div>
                {hoveredSkill.length > 0 && (
                  <p className="text-[11px] text-violet-400/70 mt-3 font-mono">
                    ↑ Highlighted entries use this skill
                  </p>
                )}
              </SectionCard>
            </AnimatedCard>

            {/* Experience */}
            <AnimatedCard id="experience" delay={150}>
              <SectionCard icon={Briefcase} title="Professional Experience" id="experience" iconColor="text-emerald-400" iconBg="bg-emerald-400/10 border-emerald-400/20">
                <AnimatedTimeline>
                  <div className="flex flex-col gap-6 pl-1">
                    {experience.map((e, i) => {
                      const isHighlighted = hoveredSkill.length > 0 && e.keys.some(k => hoveredSkill.includes(k))
                      const col = colorMap[e.color]
                      const dotCls = e.color === "green"  ? "bg-emerald-400 ring-emerald-400/20" :
                                     e.color === "indigo" ? "bg-indigo-400  ring-indigo-400/20"  : "bg-cyan-400 ring-cyan-400/20"
                      return (
                        <div key={e.id} className="flex gap-4">
                          <div className="flex flex-col items-center gap-1 shrink-0 z-10">
                            <div className={`shrink-0 w-3 h-3 rounded-full mt-1.5 ring-4 transition-all duration-300 ${dotCls} ${isHighlighted ? "scale-125 ring-8" : ""}`} />
                            {i < experience.length - 1 && <div className="w-px flex-1 min-h-4" />}
                          </div>
                          <div className={`flex-1 pb-2 rounded-xl p-3 -ml-1 transition-all duration-300 ${isHighlighted ? `border ${col.glow}` : ""}`}>
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                                  e.color === "green" ? "bg-emerald-400/10 border-emerald-400/20" : "bg-indigo-400/10 border-indigo-400/20"
                                }`}>
                                  <Wrench size={14} className={e.color === "green" ? "text-emerald-400" : "text-indigo-400"} />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-foreground">{e.role}</p>
                                  <p className="text-xs text-muted-foreground">{e.company} · {e.location}</p>
                                </div>
                              </div>
                              <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-border bg-secondary text-muted-foreground shrink-0">
                                {e.date}
                              </span>
                            </div>
                            <ul className="flex flex-col gap-1.5 ml-12">
                              {e.bullets.map((b, j) => (
                                <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${dotCls.split(" ")[0]}`} />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </AnimatedTimeline>
              </SectionCard>
            </AnimatedCard>

            {/* Projects */}
            <AnimatedCard id="projects" delay={200}>
              <SectionCard icon={Rocket} title="Projects — full docs at SalehAldhafeeri.com" id="projects" iconColor="text-orange-400" iconBg="bg-orange-400/10 border-orange-400/20">
                <AnimatedTimeline>
                  <div className="flex flex-col gap-1 pl-1">
                    {projects.map((p) => (
                      <ExpandableProject key={p.id} project={p} highlightedKeys={hoveredSkill} />
                    ))}
                  </div>
                </AnimatedTimeline>
              </SectionCard>
            </AnimatedCard>

            {/* Certifications */}
            <AnimatedCard id="certs" delay={250}>
              <SectionCard icon={Award} title="Certifications" id="certs" iconColor="text-rose-400" iconBg="bg-rose-400/10 border-rose-400/20">
                <div className="grid grid-cols-2 gap-2">
                  {certifications.map((c, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all duration-200 hover:scale-[1.02] ${certColorMap[c.color]}`}
                    >
                      <span className="text-xs font-medium text-foreground">{c.name}</span>
                      <span className={`text-[10px] font-mono ml-2 shrink-0 ${certColorMap[c.color].split(" ")[0]}`}>{c.year}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </AnimatedCard>

            {/* Leadership */}
            <AnimatedCard id="leadership" delay={300}>
              <SectionCard icon={Star} title="Leadership & Activities" id="leadership" iconColor="text-yellow-400" iconBg="bg-yellow-400/10 border-yellow-400/20">
                <AnimatedTimeline>
                  <div className="flex flex-col gap-5 pl-1">
                    {leadership.map((l, i) => {
                      const isHighlighted = hoveredSkill.length > 0 && l.keys.some(k => hoveredSkill.includes(k))
                      const col = colorMap[l.color]
                      const dotCls = l.color === "yellow" ? "bg-yellow-400 ring-yellow-400/20" : "bg-violet-400 ring-violet-400/20"
                      return (
                        <div key={l.id} className="flex gap-4">
                          <div className="flex flex-col items-center gap-1 shrink-0 z-10">
                            <div className={`shrink-0 w-3 h-3 rounded-full mt-1.5 ring-4 transition-all duration-300 ${dotCls} ${isHighlighted ? "scale-125 ring-8" : ""}`} />
                            {i < leadership.length - 1 && <div className="w-px flex-1 min-h-4" />}
                          </div>
                          <div className={`flex-1 pb-1 rounded-xl p-3 -ml-1 transition-all duration-300 ${isHighlighted ? `border ${col.glow}` : ""}`}>
                            <div className="flex items-start justify-between gap-3 mb-1">
                              <div>
                                <p className="text-sm font-semibold text-foreground">{l.role}</p>
                                <p className={`text-xs ${l.color === "yellow" ? "text-yellow-400" : "text-violet-400"}`}>{l.org}</p>
                              </div>
                              <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-border bg-secondary text-muted-foreground shrink-0">
                                {l.date}
                              </span>
                            </div>
                            <ul className="flex flex-col gap-1.5">
                              {l.bullets.map((b, j) => (
                                <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${dotCls.split(" ")[0]}`} />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </AnimatedTimeline>
              </SectionCard>
            </AnimatedCard>

            <p className="text-center text-xs text-muted-foreground py-4">
              {new Date().getFullYear()} Saleh Aldhafeeri · Aerospace Engineering Portfolio
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
