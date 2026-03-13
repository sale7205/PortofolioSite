"use client"
import Link from "next/link"
import { ArrowLeft, Phone, Mail, Linkedin, MapPin, Briefcase, GraduationCap, Award, Star, Code2 } from "lucide-react"
import { PrintButton } from "./print-button"
export const Metadata = {
title: "Resume - Saleh Aldhafeeri",
description: "Aerospace Engineering Resume",
}

const contact = [
{ icon: Phone,    text: "+966 553 646 561" },
{ icon: Mail,     text: "salehaldhafeeri@outlook.com" },
{ icon: Linkedin, text: "linkedin.com/in/0c0" },
{ icon: MapPin,   text: "Riyadh, Saudi Arabia" },
]

const competencies = [
"Systems Engineering", "GNC", "EKF / INS", "Spacecraft Mission Design",
"Compressible CFD", "Airworthiness", "MATLAB", "ANSYS Fluent",
"SolidWorks", "Python", "STK", "CAD / FEA",
]

const experience = [
{
role:     "Aircraft Engineering Intern",
company:  "Saudia Technic",
location: "Jeddah, Saudi Arabia",
date:     "May 2025 - Sept 2025",
bullets: [
"Resolved 50+ maintenance queries via CMM/AMM/SRM manuals, achieving 95% first-pass engineering order approval rate.",
"Supported line & hangar operations on A320/321, B787-9/10, and B777-300 fleets across 10+ scheduled weekly checks.",
"Verified post-maintenance airworthiness for 7 aircraft against Boeing and Airbus requirements; maintained W&B compliance prior to release.",
],
},
{
role:     "Research Assistant",
company:  "Penn State University",
location: "University Park, PA",
date:     "2021 - Present",
bullets: [
"Focused on autonomous vehicles, GNC system design, and aerodynamic modeling.",
"Contributed to navigation algorithm development and spacecraft mission architecture research.",
],
},
]

const projects = [
{
title:   "Prometheus Mission I",
sub:     "Autonomous On-Orbit Refueling",
tag:     "Systems Eng.",
date:    "Aug - Dec 2025",
bullets: [
"Led 6-engineer team designing a 70 kg autonomous refueling payload targeting LEO satellites; carried 30 kg hydrazine for 6-10 client transfers.",
"Delivered GNC precision of +/-2 mm position and +/-1 deg attitude at docking contact via EKF-based relative navigation.",
"Directed cross-functional integration across propulsion, GNC, thermal & structures with autonomous fault response architecture.",
],
},
{
title:   "Extended Kalman Filter",
sub:     "Lunar Navigation System",
tag:     "GNC",
date:    "Jan - May 2025",
bullets: [
"Developed 9-state EKF in MATLAB at 100 Hz for lunar nav with multi-rate IMU fusion; validated within 2-sigma consistency bounds.",
],
},
{
title:   "Autonomous Drone Landing",
sub:     "GNC System Design",
tag:     "GNC",
date:    "Jan - May 2025",
bullets: [
"Built cascaded PID/PD quadrotor guidance system for autonomous landing on a moving vehicle; achieved centimeter-level touchdown via velocity feedforward and flight-phase logic.",
],
},
{
title:   "Turbine Blade CFD",
sub:     "Aerodynamic Design & Analysis",
tag:     "Aerodynamics",
date:    "Aug - Dec 2024",
bullets: [
"Modeled parametric 3D blade in SolidWorks; reduced total-pressure loss by 12% and raised section L/D by 18% through CFD optimization.",
],
},
]

const education = [
{
degree:  "B.S. Aerospace Engineering",
school:  "Pennsylvania State University",
date:    "Jan 2023 - May 2026",
detail:  "GPA 3.65 / 4.00",
},
]

const certifications = [
{ name: "Ansys STK Grand Master", year: "Level 3" },
{ name: "Ansys Fluent Certification", year: "2024" },
{ name: "SolidWorks CSWE", year: "2024" },
{ name: "MathWorks MATLAB Associate", year: "2023" },
]

const leadership = [
{
role:    "Treasurer",
org:     "Penn State MENA Caucus Club",
date:    "Dec 2023 - Dec 2024",
bullets: [
"Built and launched a secure finance website for 100+ members using JavaScript, Python & PostgreSQL; managed $10K event budget across 7 fundraisers.",
],
},
{
role:    "Member",
org:     "Nittany Lion Consulting Group",
date:    "Jan 2023 - Dec 2025",
bullets: [
"Delivered 6+ client engagements; reduced average case turnaround by 20% through standardized hypothesis-driven analysis frameworks.",
],
},
]

function SectionCard({ icon: Icon, title, children }: {
icon: React.ElementType
title: string
children: React.ReactNode
}) {
return (
<div className="rounded-2xl border border-border bg-card p-6">
<div className="flex items-center gap-3 mb-5">
<div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
<Icon size={17} className="text-primary" />
</div>
<h2 className="text-lg font-semibold text-foreground">{title}</h2>
</div>
{children}
</div>
)
}

function TimelineDot() {
return (
<div className="shrink-0 w-3 h-3 rounded-full bg-primary mt-1.5 ring-4 ring-primary/20" />
)
}

export default function ResumePage() {
return (
<div className="min-h-screen bg-background text-foreground">

```
  {/* Nav bar */}
  <div className="print:hidden sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
      <ArrowLeft size={14} />
      Back
    </Link>
    <PrintButton />
  </div>

  <div className="max-w-[1100px] mx-auto px-4 py-8 print:py-0 print:px-0 print:max-w-none">
    <div className="flex gap-5 items-start">

      {/* ── LEFT SIDEBAR ── */}
      <aside className="w-[300px] shrink-0 sticky top-20 print:top-0">
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-5">

          {/* Photo */}
          <div className="flex flex-col items-start gap-4">
            <div className="relative">
              <div className="w-28 h-28 rounded-full border-2 border-border bg-secondary overflow-hidden flex items-center justify-center">
                <svg className="w-14 h-14 fill-muted-foreground/40" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-card" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground leading-tight">Saleh Aldhafeeri</h1>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["CSWE", "STK L3"].map((b) => (
                  <span key={b} className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border bg-secondary text-muted-foreground">
                    {b}
                  </span>
                ))}
              </div>
              <p className="text-sm font-semibold text-primary mt-2">Aerospace Engineer</p>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Contact */}
          <div className="flex flex-col gap-1">
            {contact.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary/60 transition-colors">
                <Icon size={14} className="text-primary shrink-0" />
                <span className="text-xs text-muted-foreground break-all">{text}</span>
              </div>
            ))}
          </div>

          <div className="h-px bg-border" />

          {/* Education quick */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Education</p>
            <p className="text-sm font-semibold text-foreground">Pennsylvania State University</p>
            <p className="text-xs text-primary">B.S. Aerospace Engineering</p>
            <p className="text-[11px] text-muted-foreground font-mono mt-0.5">Jan 2023 - May 2026</p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-full border border-border bg-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-mono text-foreground">GPA 3.65 / 4.00</span>
            </div>
          </div>

        </div>
      </aside>

      {/* ── RIGHT CONTENT ── */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">

        {/* About */}
        <SectionCard icon={Star} title="About">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Aerospace Engineering senior at Penn State with a focus on systems engineering, GNC, and data-driven problem solving.
            Academic and project experience spans spacecraft mission design, EKF-based navigation algorithm development, and aerodynamic
            analysis. Hands-on industry experience at Saudia Technic in airworthiness compliance and MRO operations across narrow-body and wide-body fleets.
          </p>
        </SectionCard>

        {/* Key Competencies */}
        <SectionCard icon={Code2} title="Key Competencies">
          <div className="flex flex-wrap gap-2">
            {competencies.map((c) => (
              <span key={c} className="text-xs px-3 py-1.5 rounded-full border border-border bg-secondary text-foreground hover:border-primary/50 transition-colors">
                {c}
              </span>
            ))}
          </div>
        </SectionCard>

        {/* Experience */}
        <SectionCard icon={Briefcase} title="Professional Experience">
          <div className="flex flex-col gap-6">
            {experience.map((e, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center gap-1">
                  <TimelineDot />
                  {i < experience.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl border border-border bg-secondary flex items-center justify-center shrink-0">
                        <Briefcase size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{e.role}</p>
                        <p className="text-xs text-muted-foreground">{e.company}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-border bg-secondary text-muted-foreground shrink-0">
                      {e.date}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-1.5 ml-12">
                    {e.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Projects */}
        <SectionCard icon={Star} title="Projects — full docs at SalehAldhafeeri.com">
          <div className="flex flex-col gap-5">
            {projects.map((p, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center gap-1">
                  <TimelineDot />
                  {i < projects.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{p.title}</p>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-primary/10 border border-primary/25 text-primary">{p.tag}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{p.sub}</p>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-border bg-secondary text-muted-foreground shrink-0">
                      {p.date}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {p.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Bottom row: Education + Certs + Leadership */}
        <div className="grid grid-cols-2 gap-5">

          {/* Education */}
          <SectionCard icon={GraduationCap} title="Education">
            <div className="flex flex-col gap-4">
              {education.map((e, i) => (
                <div key={i}>
                  <p className="text-sm font-bold text-foreground">{e.degree}</p>
                  <p className="text-xs text-primary font-medium">{e.school}</p>
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{e.date}</p>
                  <div className="inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 rounded-full border border-border bg-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-[10px] font-mono text-foreground">{e.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Certifications */}
          <SectionCard icon={Award} title="Certifications">
            <div className="flex flex-col gap-2">
              {certifications.map((c, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl border border-border bg-secondary/50">
                  <span className="text-xs text-foreground font-medium">{c.name}</span>
                  <span className="text-[10px] font-mono text-primary">{c.year}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Leadership */}
        <SectionCard icon={Star} title="Leadership & Activities">
          <div className="flex flex-col gap-5">
            {leadership.map((l, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center gap-1">
                  <TimelineDot />
                  {i < leadership.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{l.role}</p>
                      <p className="text-xs text-primary">{l.org}</p>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-border bg-secondary text-muted-foreground shrink-0">
                      {l.date}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {l.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <p className="text-center text-xs text-muted-foreground py-4">
          {new Date().getFullYear()} Saleh Aldhafeeri. Aerospace Engineering Portfolio.
        </p>

      </div>
    </div>
  </div>
</div>
)
}