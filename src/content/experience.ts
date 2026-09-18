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

export const education = {
  school: "Penn State University",
  degree: "B.S. Aerospace Engineering",
  start:  "2023-01" as YearMonth,
  end:    "2026-05" as YearMonth,
}

/** Graduation year, derived so it never drifts from the education dates. */
export const graduationYear = education.end.split("-")[0]

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
  { label: "Python",              domain: "violet", keys: ["python", "website", "backend"]              },
  { label: "STK",                 domain: "violet", keys: ["stk", "orbit", "satellite"]                 },
  { label: "CAD / FEA",           domain: "amber",  keys: ["cad", "solidworks", "structural"]           },
]
