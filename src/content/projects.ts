import { byMostRecent, type YearMonth } from "@/lib/date"
import type { Domain } from "./experience"

export type AssetType = "pdf" | "video"

export interface ProjectAsset {
  type:        AssetType
  label:       string
  description: string
  /** PDF path under /public. */
  path?:       string
  /** YouTube embed URL. */
  url?:        string
}

export interface Project {
  slug:            string
  title:           string
  subtitle:        string
  category:        string
  start:           YearMonth
  end:             YearMonth | null
  domain:          Domain
  /** Matched against competency chips on the resume. */
  keys:            string[]
  description:     string
  longDescription: string
  highlights:      string[]
  /** When set, the project also appears on the resume timeline with this line. */
  resumeSummary?:  string
  assets:          ProjectAsset[]
}

export const projects: Project[] = ([
  {
    slug:        "waypoint-ai",
    title:       "Waypoint AI",
    subtitle:    "LLM Model Router",
    category:    "AI Infrastructure",
    start:       "2026-03",
    end:         null,
    domain:      "violet",
    keys:        ["ai", "llm", "router", "inference", "python", "backend", "systems", "cross-functional"],
    description: "Co-founded venture building a routing layer that sends every prompt to the cheapest model that can still answer it correctly — roughly 60% off a frontier-only baseline.",
    longDescription:
      "Waypoint AI started from a simple observation: most teams building on large language models send every request to the largest model they can afford, and most of those requests never needed it. Summarising a changelog, extracting a date, rewriting a paragraph — a small model answers those as well as a frontier one for a fraction of the cost and a fraction of the latency. The hard part is telling, before you answer, which request is which.\n\n" +
      "The router does that classification up front. Each incoming prompt is scored along three axes — reasoning depth, latency budget and whether tool or function calls are involved — and dispatched to the cheapest model in the pool that clears the bar for all three. Responses carry a confidence signal; anything below threshold is transparently escalated to a stronger model and the original answer is discarded, so the caller sees a single clean response and never sees the retry. Routing decisions are logged with their downstream outcome, which turns the eval set into a feedback loop: policies are re-fit against real traffic rather than guessed at.\n\n" +
      "Around the router sits the rest of a platform: a streaming proxy that keeps time-to-first-token close to a direct provider call, a semantic response cache, per-tenant usage metering and billing, and failover across four model vendors so a single provider outage degrades cost rather than availability. Built in Python and TypeScript, deployed as a stateless service behind a managed queue.\n\n" +
      "The venture was incubated through the KAUST TIE programme, where the routing thesis was pressure-tested against mentors and pitched at demo day. Three design partners ran production traffic through the router during that cohort, and their traffic patterns shaped the routing policies that shipped.",
    highlights: [
      "Prompt classifier scoring reasoning depth, latency budget and tool use before dispatch",
      "~60% lower blended inference cost vs. an all-frontier baseline, within 2% on quality across 1,200 eval prompts",
      "Automatic escalation on low-confidence responses — the caller sees one clean answer",
      "Streaming proxy, semantic cache, usage metering and failover across four model vendors",
      "Incubated and pitched through the KAUST TIE venture programme with three design partners",
    ],
    // No resumeSummary: this already appears under Professional Experience.
    assets: [],
  },
  {
    slug:        "prometheus-mission",
    title:       "Prometheus Mission I",
    subtitle:    "Autonomous Satellite Refueling Mission",
    category:    "Systems Engineering",
    start:       "2025-08",
    end:         "2025-12",
    domain:      "violet",
    keys:        ["systems", "gnc", "ekf", "spacecraft", "leo", "satellite", "orbit", "cross-functional"],
    description: "Led a six-engineer capstone team designing an autonomous satellite servicing and refueling mission across rendezvous, docking, propellant transfer, and departure phases.",
    longDescription:
      "Prometheus Mission I is a full-scale systems engineering capstone covering the complete CONOPS for an autonomous on-orbit servicing vehicle. The mission architecture spans four phases — far-field rendezvous, proximity operations and docking, propellant transfer, and controlled departure — with subsystem trade studies across GNC, propulsion, power, and communications.",
    highlights: [
      "6-person team lead; full mission CONOPS from launch to departure",
      "EKF-based relative navigation for autonomous proximity operations",
      "Propellant transfer system sizing and leak-risk trade study",
      "Docking mechanism design with misalignment tolerance analysis",
    ],
    resumeSummary:
      "Led a 6-engineer team designing a 70 kg autonomous refueling payload for LEO satellites, delivering ±2 mm position and ±1° attitude accuracy at docking contact through EKF-based relative navigation.",
    assets: [
      {
        type:        "pdf",
        label:       "White Paper",
        description: "Full technical white paper covering all mission phases — rendezvous, docking, propellant transfer, and departure.",
        path:        "/pdfs/prometheus-whitepaper.pdf",
      },
      {
        type:        "pdf",
        label:       "Addendum",
        description: "Supplemental analysis, updated trade studies, and revised mission parameters.",
        path:        "/pdfs/prometheus-addendum.pdf",
      },
      {
        type:        "video",
        label:       "Presentation",
        description: "Full capstone presentation delivered to the faculty review board covering mission architecture and technical findings.",
        url:         "https://www.youtube.com/embed/gDJwwbm6Zhs",
      },
      {
        type:        "video",
        label:       "Business Pitch",
        description: "Investor-facing pitch summarizing mission value proposition, market context, and feasibility.",
        url:         "https://www.youtube.com/embed/gDJwwbm6Zhs?si=HQTKYTGdFNBdz25y",
      },
    ],
  },
  {
    slug:        "autonomous-drone",
    title:       "Autonomous Drone",
    subtitle:    "Landing on Moving Object",
    category:    "GNC",
    start:       "2025-01",
    end:         "2025-05",
    domain:      "cyan",
    keys:        ["gnc", "guidance", "control", "pid"],
    description: "Built a cascaded PID/PD quadrotor guidance and control system for autonomous landing on a moving vehicle, achieving centimeter-level touchdown accuracy.",
    longDescription:
      "This project focused on guidance and control for autonomous quadrotor landing on a moving ground vehicle. The system used a cascaded PID/PD control architecture with flight-phase logic and velocity feedforward to manage approach, tracking, and touchdown. Performance centered on precise relative motion control and stable terminal landing under dynamic target motion.",
    highlights: [
      "Cascaded PID/PD guidance and control architecture for quadrotor landing",
      "Autonomous tracking and landing on a moving ground vehicle",
      "Velocity feedforward to improve target-following performance",
      "Centimeter-level touchdown accuracy with flight-phase landing logic",
    ],
    resumeSummary:
      "Built a cascaded PID/PD quadrotor guidance system for autonomous landing on a moving vehicle; achieved centimeter-level touchdown via velocity feedforward and flight-phase logic.",
    assets: [
      {
        type:        "pdf",
        label:       "Report",
        description: "Technical report covering the control architecture, landing logic, simulation setup, and performance results.",
        path:        "/pdfs/autonomous-drone-landing.pdf",
      },
    ],
  },
  {
    slug:        "ekf-lunar-navigation",
    title:       "Extended Kalman Filter",
    subtitle:    "Lunar Navigation System",
    category:    "GNC",
    start:       "2025-01",
    end:         "2025-05",
    domain:      "cyan",
    keys:        ["ekf", "kalman", "imu", "navigation", "matlab", "simulation"],
    description: "Designed and implemented a 9-state EKF for lunar navigation using IMU, heading, and position measurements in MATLAB.",
    longDescription:
      "This project developed a 9-state Extended Kalman Filter for a lunar surface navigation system, fusing IMU data with periodic heading and position fixes. The filter state vector covers position, velocity, and attitude errors, with process and measurement noise tuned against a simulated ground truth trajectory. Performance was evaluated across σ-bound consistency checks and compared against a baseline dead-reckoning solution.",
    highlights: [
      "9-state EKF: position, velocity, and attitude error states",
      "Sensor fusion: IMU + periodic heading + GNSS-equivalent position fixes",
      "Tuned process/measurement noise covariances against simulated ground truth",
      "3σ consistency validation and dead-reckoning error comparison",
    ],
    resumeSummary:
      "Developed a 9-state EKF in MATLAB running at 100 Hz for lunar navigation with multi-rate IMU fusion; validated within 2σ consistency bounds.",
    assets: [
      {
        type:        "pdf",
        label:       "Report",
        description: "Full technical report covering filter design, state propagation, measurement update equations, and performance results.",
        path:        "/pdfs/ekf-lunar-navigation.pdf",
      },
    ],
  },
  {
    slug:        "turbine-blade-cfd",
    title:       "Turbine Blade CFD",
    subtitle:    "Aerodynamic Design & Analysis",
    category:    "Aerodynamics",
    start:       "2024-08",
    end:         "2024-12",
    domain:      "amber",
    keys:        ["cfd", "fluent", "aerodynamic", "solidworks", "turbine", "blade"],
    description: "Built and optimized a parametric turbine blade model with CFD analysis and thermal-structural evaluation using SolidWorks.",
    longDescription:
      "A parametric turbine blade was modeled in SolidWorks and subjected to full CFD analysis to characterize pressure distribution, boundary layer behavior, and L/D performance across operating conditions. Thermal-structural coupling assessed leading-edge heat flux and tip deflection under turbine operating temperatures, informing material and geometry trade-offs.",
    highlights: [
      "Parametric SolidWorks blade geometry with sweep and camber variables",
      "CFD pressure and velocity field analysis across multiple AoA settings",
      "L/D ratio optimization through iterative geometry refinement",
      "Thermal-structural evaluation of tip deflection and leading-edge heat flux",
    ],
    resumeSummary:
      "Modeled a parametric 3D blade in SolidWorks; reduced total-pressure loss by 12% and raised section L/D by 18% through CFD optimization.",
    assets: [
      {
        type:        "pdf",
        label:       "Report",
        description: "Technical report covering blade geometry, CFD setup, boundary conditions, results, and design conclusions.",
        path:        "/pdfs/turbine-blade-cfd.pdf",
      },
    ],
  },
  {
    slug:        "saudia-technic",
    title:       "Saudia Technic",
    subtitle:    "Aircraft Engineering Internship",
    category:    "Industry",
    start:       "2025-05",
    end:         "2025-09",
    domain:      "amber",
    keys:        ["airworthiness", "cmm", "amm", "srm", "amos"],
    description: "Engineering work involving continuing airworthiness, maintenance support, and aircraft weight and balance analysis.",
    longDescription:
      "During the internship at Saudia Technic, work spanned continuing airworthiness review under GACAR, FAA and EASA frameworks, line maintenance documentation support in AMOS, and weight-and-balance analysis for fleet aircraft. Exposure to MRO operations provided practical grounding in how regulatory frameworks translate to day-to-day engineering decisions at scale.",
    highlights: [
      "Continuing airworthiness review under GACAR, FAA and EASA frameworks",
      "Weight and balance assessments for narrow-body and wide-body fleet aircraft",
      "AMOS maintenance queries resolved against CMM/AMM/SRM technical manuals",
      "MRO operations exposure across Airbus and Boeing aircraft types",
    ],
    // No resumeSummary: this already appears under Professional Experience.
    assets: [
      {
        type:        "pdf",
        label:       "Report",
        description: "Summary report of engineering tasks, scope of work, and key technical contributions during the internship.",
        path:        "/pdfs/saudia-technic.pdf",
      },
    ],
  },
] satisfies Project[]).sort(byMostRecent)

export const resumeProjects = projects.filter((project) => project.resumeSummary)
