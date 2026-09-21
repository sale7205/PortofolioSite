import { byMostRecent, type YearMonth } from "@/lib/date"

/**
 * Career timeline. Dates live here as "YYYY-MM" and are formatted at render
 * time, so the home page and the resume page can never disagree on timing.
 *
 * `domain` drives the accent colour on the resume; `keys` link an entry to the
 * competency chips that highlight it on hover.
 */

export type Domain = "cyan" | "violet" | "amber"

export interface TimelineEntry {
  id:         string
  role:       string
  org:        string
  location?:  string
  type?:      string
  start:      YearMonth
  end:        YearMonth | null
  domain:     Domain
  keys:       string[]
  /** One-line version used on the home page. */
  summary:    string
  /** Detailed version used on the resume page. */
  bullets:    string[]
}

export const work: TimelineEntry[] = ([
  {
    id:       "waypoint-ai",
    role:     "Founder",
    org:      "Waypoint AI",
    location: "Riyadh, Saudi Arabia",
    type:     "Startup",
    start:    "2026-03",
    end:      "2026-08",
    domain:   "violet",
    keys:     ["ai", "llm", "router", "inference", "python", "backend", "systems", "cross-functional"],
    summary:  "Founded and ran an early-stage venture building an AI model router that sent every prompt to the cheapest model capable of answering it.",
    bullets: [
      "Founded an early-stage venture around an LLM routing layer; incubated through the KAUST TIE programme and pitched to its demo-day panel.",
      "Designed and shipped the router: a lightweight classifier scored each prompt for reasoning depth, latency budget and tool use, then dispatched it to the cheapest model in the pool that cleared the bar, escalating automatically on low-confidence responses.",
      "Cut blended inference spend by ~60% against an all-frontier-model baseline while holding answer quality within 2% on a 1,200-prompt internal eval set.",
      "Built the platform in Python and TypeScript — streaming proxy, semantic response cache, per-tenant usage metering and provider failover across four model vendors.",
      "Ran discovery with three design partners and turned their traffic patterns into the routing policies that shipped.",
    ],
  },
  {
    id:       "saudia-technic",
    role:     "Aircraft Engineer",
    org:      "Saudia Technic",
    location: "Jeddah, Saudi Arabia",
    type:     "Internship",
    start:    "2025-05",
    end:      "2025-09",
    domain:   "amber",
    keys:     ["airworthiness", "cmm", "amm", "srm", "amos"],
    summary:  "Continuing airworthiness and maintenance engineering under GACAR, FAA and EASA frameworks across Airbus and Boeing fleets.",
    bullets: [
      "Resolved 50+ maintenance queries in AMOS against CMM/AMM/SRM technical manuals, achieving a 95% first-pass engineering order approval rate.",
      "Supported line and hangar operations on A320/321, B787-9/10 and B777-300 fleets across 10+ scheduled weekly checks.",
      "Verified post-maintenance airworthiness for 7 aircraft against GACAR, FAA and EASA requirements, maintaining weight and balance compliance prior to release.",
    ],
  },
  {
    id:       "aramco",
    role:     "Aircraft Engineer",
    org:      "Aramco",
    location: "Dhahran, Eastern Province, Saudi Arabia",
    type:     "Internship",
    start:    "2024-05",
    end:      "2024-09",
    domain:   "amber",
    keys:     ["airworthiness", "mro"],
    summary:  "Aircraft maintenance engineering internship based at Aloula MRO.",
    // TODO: expand with the specific fleets, systems and tasks covered at Aloula MRO.
    bullets: [
      "Aircraft engineering internship with Aloula MRO, covering maintenance, repair and overhaul operations.",
    ],
  },
  {
    id:       "psu-research",
    role:     "Research Assistant",
    org:      "Penn State University",
    location: "University Park, PA",
    start:    "2024-01",
    end:      "2025-05",
    domain:   "cyan",
    keys:     ["gnc", "navigation", "aerodynamic", "autonomous"],
    summary:  "Autonomous vehicles, GNC system design and aerodynamic modeling.",
    // TODO: replace with the actual scope of the research — lab, advisor, and what was built.
    bullets: [
      "Research across autonomous vehicles, GNC system design and aerodynamic modeling.",
    ],
  },
  {
    id:       "psu-ta",
    role:     "Teaching Assistant",
    org:      "Penn State University",
    location: "State College, PA",
    type:     "Part-time",
    start:    "2023-08",
    end:      "2024-04",
    domain:   "cyan",
    keys:     ["matlab", "simulation"],
    summary:  "Teaching assistant for MATH 141 (Calculus II).",
    bullets: [
      "Teaching assistant for MATH 141 (Calculus II).",
    ],
  },
] satisfies TimelineEntry[]).sort(byMostRecent)

export const leadership: TimelineEntry[] = ([
  {
    id:       "nittany-lion-consulting",
    role:     "Board Member",
    org:      "Nittany Lion Consulting Group",
    location: "University Park, PA",
    start:    "2024-01",
    end:      "2025-05",
    domain:   "violet",
    keys:     ["cross-functional"],
    summary:  "Board member of Penn State's student-run consulting group.",
    bullets: [
      "Delivered 6+ client engagements; reduced average case turnaround by 20% through standardized hypothesis-driven analysis frameworks.",
    ],
  },
  {
    id:       "mena-caucus",
    role:     "Treasurer",
    org:      "Penn State MENA Caucus Club",
    start:    "2023-12",
    end:      "2024-12",
    domain:   "violet",
    keys:     ["python", "website", "backend"],
    summary:  "Managed club finances and built its internal finance platform.",
    bullets: [
      "Built and launched a secure finance website for 100+ members using JavaScript, Python and PostgreSQL; managed a $10K event budget across 7 fundraisers.",
    ],
  },
] satisfies TimelineEntry[]).sort(byMostRecent)

export interface EducationEntry {
  id:        string
  school:    string
  degree:    string
  location?: string
  start:     YearMonth
  end:       YearMonth | null
  /** Optional line shown under the dates on the resume sidebar. */
  note?:     string
}

export const education: EducationEntry[] = ([
  {
    id:       "kaust-tie",
    school:   "KAUST",
    degree:   "TIE — Technology, Innovation & Entrepreneurship",
    location: "Thuwal, Saudi Arabia",
    start:    "2026-06",
    end:      "2026-08",
    note:     "Venture track — incubated and pitched Waypoint AI",
  },
  {
    id:       "penn-state",
    school:   "Penn State University",
    degree:   "B.S. Aerospace Engineering",
    location: "University Park, PA",
    start:    "2023-01",
    end:      "2026-05",
  },
] satisfies EducationEntry[]).sort(byMostRecent)

/** The degree-granting programme — what the intro line and page metadata cite. */
export const primaryEducation =
  education.find((entry) => entry.id === "penn-state") ?? education[0]

/** Graduation year, derived so it never drifts from the education dates. */
export const graduationYear = (primaryEducation.end ?? primaryEducation.start).split("-")[0]

export interface Certification {
  name: string
  note: string
}

export const certifications: Certification[] = [
  { name: "Ansys STK Grand Master",     note: "Level 3" },
  { name: "Ansys Fluent Certification", note: "2024"    },
  { name: "SolidWorks CSWE",            note: "2024"    },
  { name: "MathWorks MATLAB Associate", note: "2023"    },
]

export interface Competency {
  label:  string
  domain: Domain
  /** Matched against `keys` on timeline entries and projects. */
  keys:   string[]
}

export const competencies: Competency[] = [
  { label: "Systems Engineering", domain: "violet", keys: ["systems", "prometheus", "cross-functional"] },
  { label: "GNC",                 domain: "cyan",   keys: ["gnc", "guidance", "control", "pid"]         },
  { label: "EKF / INS",           domain: "cyan",   keys: ["ekf", "kalman", "imu", "navigation"]        },
  { label: "Spacecraft Design",   domain: "violet", keys: ["spacecraft", "leo", "satellite", "orbit"]   },
  { label: "Compressible CFD",    domain: "amber",  keys: ["cfd", "turbine", "fluent", "aerodynamic"]   },
  { label: "Airworthiness",       domain: "amber",  keys: ["airworthiness", "cmm", "amm", "srm", "amos", "mro"] },
  { label: "MATLAB",              domain: "cyan",   keys: ["matlab", "ekf", "simulation"]               },
  { label: "ANSYS Fluent",        domain: "amber",  keys: ["cfd", "fluent", "aerodynamic"]              },
  { label: "SolidWorks",          domain: "amber",  keys: ["solidworks", "turbine", "blade"]            },
  { label: "LLM Infrastructure",  domain: "violet", keys: ["ai", "llm", "router", "inference"]        },
  { label: "Python",              domain: "violet", keys: ["python", "website", "backend"]              },
  { label: "STK",                 domain: "violet", keys: ["stk", "orbit", "satellite"]                 },
  { label: "CAD / FEA",           domain: "amber",  keys: ["cad", "solidworks", "structural"]           },
]
