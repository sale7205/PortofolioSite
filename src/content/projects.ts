import type { Project } from "@/features/projects/types"

export const projects: Project[] = [
  {
    slug:        "prometheus-mission",
    title:       "Prometheus Mission I",
    subtitle:    "Autonomous Satellite Refueling Mission",
    category:    "Systems Engineering",
    description: "Led a six-engineer capstone team designing an autonomous satellite servicing and refueling mission across rendezvous, docking, propellant transfer, and departure phases.",
    longDescription:
      "Prometheus Mission I is a full-scale systems engineering capstone covering the complete CONOPS for an autonomous on-orbit servicing vehicle. The mission architecture spans four phases — far-field rendezvous, proximity operations and docking, propellant transfer, and controlled departure — with subsystem trade studies across GNC, propulsion, power, and communications.",
    highlights: [
      "6-person team lead; full mission CONOPS from launch to departure",
      "EKF-based relative navigation for autonomous proximity operations",
      "Propellant transfer system sizing and leak-risk trade study",
      "Docking mechanism design with misalignment tolerance analysis",
    ],
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
    description: "Built a cascaded PID/PD quadrotor guidance and control system for autonomous landing on a moving vehicle, achieving centimeter-level touchdown accuracy.",
    longDescription:
      "This project focused on guidance and control for autonomous quadrotor landing on a moving ground vehicle. The system used a cascaded PID/PD control architecture with flight-phase logic and velocity feedforward to manage approach, tracking, and touchdown. Performance centered on precise relative motion control and stable terminal landing under dynamic target motion.",
    highlights: [
      "Cascaded PID/PD guidance and control architecture for quadrotor landing",
      "Autonomous tracking and landing on a moving ground vehicle",
      "Velocity feedforward to improve target-following performance",
      "Centimeter-level touchdown accuracy with flight-phase landing logic",
    ],
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
    description: "Designed and implemented a 9-state EKF for lunar navigation using IMU, heading, and position measurements in MATLAB.",
    longDescription:
      "This project developed a 9-state Extended Kalman Filter for a lunar surface navigation system, fusing IMU data with periodic heading and position fixes. The filter state vector covers position, velocity, and attitude errors, with process and measurement noise tuned against a simulated ground truth trajectory. Performance was evaluated across σ-bound consistency checks and compared against a baseline dead-reckoning solution.",
    highlights: [
      "9-state EKF: position, velocity, and attitude error states",
      "Sensor fusion: IMU + periodic heading + GNSS-equivalent position fixes",
      "Tuned process/measurement noise covariances against simulated ground truth",
      "3σ consistency validation and dead-reckoning error comparison",
    ],
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
    description: "Built and optimized a parametric turbine blade model with CFD analysis and thermal-structural evaluation using SolidWorks.",
    longDescription:
      "A parametric turbine blade was modeled in SolidWorks and subjected to full CFD analysis to characterize pressure distribution, boundary layer behavior, and L/D performance across operating conditions. Thermal-structural coupling assessed leading-edge heat flux and tip deflection under turbine operating temperatures, informing material and geometry trade-offs.",
    highlights: [
      "Parametric SolidWorks blade geometry with sweep and camber variables",
      "CFD pressure and velocity field analysis across multiple AoA settings",
      "L/D ratio optimization through iterative geometry refinement",
      "Thermal-structural evaluation of tip deflection and leading-edge heat flux",
    ],
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
    description: "Engineering work involving airworthiness frameworks, maintenance support, and aircraft weight and balance analysis.",
    longDescription:
      "During the internship at Saudia Technic, work spanned airworthiness compliance review, line maintenance documentation support, and weight-and-balance analysis for fleet aircraft. Exposure to MRO operations provided practical grounding in how regulatory frameworks translate to day-to-day engineering decisions at scale.",
    highlights: [
      "Airworthiness compliance review under GACA and EASA frameworks",
      "Weight and balance analysis for narrow-body fleet aircraft",
      "Line maintenance documentation review and technical record keeping",
      "MRO operations exposure across multiple aircraft types",
    ],
    assets: [
      {
        type:        "pdf",
        label:       "Report",
        description: "Summary report of engineering tasks, scope of work, and key technical contributions during the internship.",
        path:        "/pdfs/saudia-technic.pdf",
      },
    ],
  },
]
