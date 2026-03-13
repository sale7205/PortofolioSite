"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import {
  Phone, Mail, Linkedin, MapPin,
  Briefcase, Award, Star, Code2, Rocket, Wrench, GraduationCap
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

const competencies = [
  { label: "Systems Engineering", keys: ["systems", "prometheus", "cross-functional"] },
  { label: "GNC",                 keys: ["gnc", "guidance", "control", "pid"] },
  { label: "EKF / INS",           keys: ["ekf", "kalman", "imu", "navigation"] },
  { label: "Spacecraft Design",   keys: ["spacecraft", "leo", "satellite", "orbit"] },
  { label: "Compressible CFD",    keys: ["cfd", "turbine", "fluent", "aerodynamic"] },
  { label: "Airworthiness",       keys: ["airworthiness", "cmm", "amm", "srm", "boeing", "airbus"] },
  { label: "MATLAB",              keys: ["matlab", "ekf", "simulation"] },
  { label: "ANSYS Fluent",        keys: ["cfd", "fluent", "aerodynamic"] },
  { label: "SolidWorks",          keys: ["solidworks", "turbine", "blade", "parametric"] },
  { label: "Python",              keys: ["python", "website", "backend"] },
  { label: "STK",                 keys: ["stk", "orbit", "satellite"] },
  { label: "CAD / FEA",           keys: ["cad", "solidworks", "structural"] },
]

const experience = [
  {
    id:       "saudia",
    role:     "Aircraft Engineering Intern",
    company:  "Saudia Technic",
    location: "Jeddah, Saudi Arabia",
    date:     "May 2025 – Sept 2025",
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
    keys:     ["gnc", "navigation", "aerodynamic", "autonomous"],
    bullets: [
      "Focused on autonomous vehicles, GNC system design, and aerodynamic modeling.",
      "Contributed to navigation algorithm development and spacecraft mission architecture research.",
    ],
  },
]

const projects = [
  {
    id:    "prometheus",
    title: "Prometheus Mission I",
    sub:   "Autonomous On-Orbit Refueling",
    tag:   "Systems Eng.",
    date:  "Aug – Dec 2025",
    keys:  ["systems", "gnc", "ekf", "spacecraft", "leo", "satellite", "orbit", "cross-functional"],
    bullets: [
      "Led 6-engineer team designing a 70 kg autonomous refueling payload targeting LEO satellites; carried 30 kg hydrazine for 6–10 client transfers.",
      "Delivered GNC precision of ±2 mm position and ±1° attitude at docking contact via EKF-based relative navigation.",
      "Directed cross-functional integration across propulsion, GNC, thermal & structures with autonomous fault response architecture.",
    ],
  },
  {
    id:    "ekf",
    title: "Extended Kalman Filter",
    sub:   "Lunar Navigation System",
    tag:   "GNC",
    date:  "Jan – May 2025",
    keys:  ["ekf", "kalman", "imu", "navigation", "matlab", "simulation"],
    bullets: [
      "Developed 9-state EKF in MATLAB at 100 Hz for lunar nav with multi-rate IMU fusion; validated within 2σ consistency bounds.",
    ],
  },
  {
    id:    "drone",
    title: "Autonomous Drone Landing",
    sub:   "GNC System Design",
    tag:   "GNC",
    date:  "Jan – May 2025",
    keys:  ["gnc", "guidance", "control", "pid"],
    bullets: [
      "Built cascaded PID/PD quadrotor guidance system for autonomous landing on a moving vehicle; achieved centimeter-level touchdown via velocity feedforward and flight-phase logic.",
    ],
  },
  {
    id:    "cfd",
    title: "Turbine Blade CFD",
    sub:   "Aerodynamic Design & Analysis",
    tag:   "Aerodynamics",
    date:  "Aug – Dec 2024",
    keys:  ["cfd", "fluent", "aerodynamic", "solidworks", "turbine", "blade", "parametric"],
    bullets: [
      "Modeled parametric 3D blade in SolidWorks; reduced total-pressure loss by 12% and raised section L/D by 18% through CFD optimization.",
    ],
  },
]

const certifications = [
  { name: "Ansys STK Grand Master",       year: "Level 3" },
  { name: "Ansys Fluent Certification",   year: "2024" },
  { name: "SolidWorks CSWE",              year: "2024" },
  { name: "MathWorks MATLAB Associate",   year: "2023" },
]

const leadership = [
  {
    id:      "mena",
    role:    "Treasurer",
    org:     "Penn State MENA Caucus Club",
    date:    "Dec 2023 – Dec 2024",
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
    keys:    [],
    bullets: [
      "Delivered 6+ client engagements; reduced average case turnaround by 20% through standardized hypothesis-driven analysis frameworks.",
    ],
  },
]

const sections = [
  { id: "about",        label: "About" },
  { id: "competencies", label: "Competencies" },
  { id: "experience",   label: "Experience" },
  { id: "projects",     label: "Projects" },
  { id: "certs",        label: "Certifications" },
  { id: "leadership",   label: "Leadership" },
]

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
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
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      {children}
    </div>
  )
}

// All section cards share ONE icon style — cyan, consistent
function SectionCard({ icon: Icon, title, children, id }: {
  icon: React.ElementType; title: string; children: React.ReactNode; id?: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      id={id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-2xl border bg-card p-6 transition-all duration-300 ${
        hovered
          ? "border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          : "border-border"
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
          hovered
            ? "bg-primary/15 border-primary/30"
            : "bg-primary/8 border-primary/15"
        }`}>
          <Icon size={16} className="text-primary" />
        </div>
        <h2 className="text-base font-semibold text-foreground tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Dot({ active = false }: { active?: boolean }) {
  return (
    <div className={`shrink-0 w-2.5 h-2.5 rounded-full mt-1.5 ring-4 ring-primary/15 transition-all duration-300 ${
      active ? "bg-primary scale-125 ring-primary/30 ring-8" : "bg-primary/50"
    }`} />
  )
}

function AnimatedTimeline({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView(0.1)
  return (
    <div ref={ref} className="relative">
      <div
        className="absolute left-[4px] top-3 w-px bg-gradient-to-b from-primary/20 to-transparent transition-all duration-1000 ease-out origin-top"
        style={{ height: inView ? "100%" : "0%" }}
      />
      {children}
    </div>
  )
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5" />
          {b}
        </li>
      ))}
    </ul>
  )
}

function DatePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-border bg-secondary/60 text-muted-foreground shrink-0">
      {children}
    </span>
  )
}

// Small muted tag for project category
const tagStyle = "text-[10px] font-mono px-2 py-0.5 rounded border border-border bg-secondary/50 text-muted-foreground"

function ProjectEntry({ project, highlightedKeys, isLast }: {
  project: typeof projects[0]; highlightedKeys: string[]; isLast: boolean
}) {
  const { ref, inView } = useInView()
  const isHighlighted = highlightedKeys.length > 0 && project.keys.some(k => highlightedKeys.includes(k))

  return (
    <div
      ref={ref}
      className={`flex gap-4 transition-all duration-500 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
    >
      <div className="flex flex-col items-center gap-1 shrink-0">
        <Dot active={isHighlighted} />
        {!isLast && <div className="w-px flex-1 bg-border" />}
      </div>
      <div className={`flex-1 pb-4 rounded-xl px-3 py-2 -ml-1 transition-all duration-300 ${
        isHighlighted ? "bg-primary/4 border border-primary/15" : ""
      }`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-foreground">{project.title}</p>
            <span className="text-xs text-muted-foreground/60">— {project.sub}</span>
            <span className={tagStyle}>{project.tag}</span>
          </div>
          <DatePill>{project.date}</DatePill>
        </div>
        <BulletList bullets={project.bullets} />
      </div>
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("about")
  const [hoveredSkill, setHoveredSkill] = useState<string[]>([])
  const [typingActive, setTypingActive] = useState(false)
  const typedTitle = useTyping("Aerospace Engineer", 65, typingActive)

  useEffect(() => {
    const t = setTimeout(() => setTypingActive(true), 500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleSkillHover = useCallback((keys: string[]) => setHoveredSkill(keys), [])
  const handleSkillLeave = useCallback(() => setHoveredSkill([]), [])
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[1200px] mx-auto px-3 py-4">
        <div className="flex gap-5 items-start">

          {/* ── SIDEBAR ── */}
          <aside className="w-[272px] shrink-0 sticky top-4 flex flex-col gap-4">
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-5">

              {/* Photo + Identity */}
              <div className="flex flex-col items-start gap-4">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full border-2 border-border bg-secondary overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                    <svg className="w-14 h-14 fill-muted-foreground/30" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                  </div>
                  <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-card" />
                </div>
                <div>
                  <h1 className="text-[22px] font-bold text-foreground leading-tight tracking-tight">
                    Saleh Aldhafeeri
                  </h1>
                  {/* Cert badges — all same neutral style */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["CSWE", "STK L3", "MATLAB"].map(b => (
                      <span key={b} className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border bg-secondary text-muted-foreground">
                        {b}
                      </span>
                    ))}
                  </div>
                  {/* Typing title — cyan, the ONE place it's used prominently */}
                  <p className="text-sm font-semibold text-primary mt-2 font-mono min-h-[1.25rem] tracking-wide">
                    {typedTitle}<span className="animate-pulse opacity-60">|</span>
                  </p>
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Contact — icons in primary, text muted */}
              <div className="flex flex-col gap-0.5">
                {contact.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-secondary/50 transition-colors cursor-default">
                    <Icon size={13} className="text-primary/70 shrink-0" />
                    <span className="text-[11px] text-muted-foreground break-all">{text}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border" />

              {/* Education — clean, no color */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">
                  Education
                </p>
                <p className="text-sm font-semibold text-foreground">Penn State University</p>
                <p className="text-xs text-primary/80">B.S. Aerospace Engineering</p>
                <p className="text-[11px] text-muted-foreground font-mono mt-0.5">Jan 2023 – May 2026</p>
              </div>
            </div>

            {/* Section nav — active state uses primary only */}
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">
                Sections
              </p>
              <div className="flex flex-col gap-0.5">
                {sections.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 group ${
                      activeSection === id ? "bg-primary/8" : "hover:bg-secondary/40"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      activeSection === id
                        ? "bg-primary scale-125"
                        : "bg-border group-hover:bg-muted-foreground/50"
                    }`} />
                    <span className={`text-xs font-medium transition-colors duration-200 ${
                      activeSection === id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">

            {/* About */}
            <AnimatedCard id="about" delay={50}>
              <SectionCard icon={Star} title="About" id="about">
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
            <AnimatedCard id="competencies" delay={80}>
              <SectionCard icon={Code2} title="Key Competencies" id="competencies">
                <div className="flex flex-wrap gap-1.5">
                  {competencies.map((c) => {
                    const isActive = hoveredSkill.length > 0 && c.keys.some(k => hoveredSkill.includes(k))
                    const isDimmed = hoveredSkill.length > 0 && !isActive
                    return (
                      <span
                        key={c.label}
                        onMouseEnter={() => handleSkillHover(c.keys)}
                        onMouseLeave={handleSkillLeave}
                        className={`text-xs px-3 py-1.5 rounded-full border cursor-default transition-all duration-200 select-none ${
                          isActive
                            ? "bg-primary/12 border-primary/40 text-primary scale-105 shadow-[0_0_16px_rgba(56,189,248,0.15)]"
                            : isDimmed
                            ? "bg-secondary/30 border-border/40 text-muted-foreground/30"
                            : "bg-secondary/50 border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                        }`}
                      >
                        {c.label}
                      </span>
                    )
                  })}
                </div>
                {hoveredSkill.length > 0 && (
                  <p className="text-[11px] text-primary/50 mt-3 font-mono">
                    ↑ related entries highlighted below
                  </p>
                )}
              </SectionCard>
            </AnimatedCard>

            {/* Experience */}
            <AnimatedCard id="experience" delay={110}>
              <SectionCard icon={Briefcase} title="Professional Experience" id="experience">
                <AnimatedTimeline>
                  <div className="flex flex-col gap-6 pl-1">
                    {experience.map((e, i) => {
                      const isHighlighted = hoveredSkill.length > 0 && e.keys.some(k => hoveredSkill.includes(k))
                      return (
                        <div key={e.id} className="flex gap-4">
                          <div className="flex flex-col items-center gap-1 shrink-0 z-10">
                            <Dot active={isHighlighted} />
                            {i < experience.length - 1 && <div className="w-px flex-1 min-h-4" />}
                          </div>
                          <div className={`flex-1 pb-2 rounded-xl px-3 py-2 -ml-1 transition-all duration-300 ${
                            isHighlighted ? "bg-primary/4 border border-primary/15" : ""
                          }`}>
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg border border-border bg-secondary/60 flex items-center justify-center shrink-0">
                                  <Wrench size={13} className="text-muted-foreground" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-foreground">{e.role}</p>
                                  <p className="text-xs text-muted-foreground">{e.company} · {e.location}</p>
                                </div>
                              </div>
                              <DatePill>{e.date}</DatePill>
                            </div>
                            <div className="ml-11">
                              <BulletList bullets={e.bullets} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </AnimatedTimeline>
              </SectionCard>
            </AnimatedCard>

            {/* Projects */}
            <AnimatedCard id="projects" delay={140}>
              <SectionCard icon={Rocket} title="Projects — full docs at SalehAldhafeeri.com" id="projects">
                <AnimatedTimeline>
                  <div className="flex flex-col gap-1 pl-1">
                    {projects.map((p, i) => (
                      <ProjectEntry
                        key={p.id}
                        project={p}
                        highlightedKeys={hoveredSkill}
                        isLast={i === projects.length - 1}
                      />
                    ))}
                  </div>
                </AnimatedTimeline>
              </SectionCard>
            </AnimatedCard>

            {/* Certifications */}
            <AnimatedCard id="certs" delay={170}>
              <SectionCard icon={Award} title="Certifications" id="certs">
                <div className="grid grid-cols-2 gap-2">
                  {certifications.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-border bg-secondary/40 hover:border-primary/20 hover:bg-secondary/70 transition-all duration-200"
                    >
                      <span className="text-xs font-medium text-foreground">{c.name}</span>
                      <span className="text-[10px] font-mono ml-3 shrink-0 text-primary/70">{c.year}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </AnimatedCard>

            {/* Leadership */}
            <AnimatedCard id="leadership" delay={200}>
              <SectionCard icon={Star} title="Leadership & Activities" id="leadership">
                <AnimatedTimeline>
                  <div className="flex flex-col gap-5 pl-1">
                    {leadership.map((l, i) => {
                      const isHighlighted = hoveredSkill.length > 0 && l.keys.some(k => hoveredSkill.includes(k))
                      return (
                        <div key={l.id} className="flex gap-4">
                          <div className="flex flex-col items-center gap-1 shrink-0 z-10">
                            <Dot active={isHighlighted} />
                            {i < leadership.length - 1 && <div className="w-px flex-1 min-h-4" />}
                          </div>
                          <div className={`flex-1 pb-1 rounded-xl px-3 py-2 -ml-1 transition-all duration-300 ${
                            isHighlighted ? "bg-primary/4 border border-primary/15" : ""
                          }`}>
                            <div className="flex items-start justify-between gap-3 mb-1">
                              <div>
                                <p className="text-sm font-semibold text-foreground">{l.role}</p>
                                <p className="text-xs text-muted-foreground/70">{l.org}</p>
                              </div>
                              <DatePill>{l.date}</DatePill>
                            </div>
                            <BulletList bullets={l.bullets} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </AnimatedTimeline>
              </SectionCard>
            </AnimatedCard>

            <p className="text-center text-[11px] text-muted-foreground/40 py-4 font-mono">
              {new Date().getFullYear()} · Saleh Aldhafeeri · Aerospace Engineering
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}