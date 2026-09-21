import type { Metadata } from "next"
import { ResumeView } from "@/components/resume/resume-view"
import { profile } from "@/content/site"
import { primaryEducation, graduationYear } from "@/content/experience"

const summary =
  `Aerospace engineering graduate (${primaryEducation.degree}, ${primaryEducation.school}, ${graduationYear}) ` +
  "focused on systems engineering, GNC, and data-driven problem solving. Academic and project experience spans " +
  "spacecraft mission design, EKF-based navigation algorithm development, and aerodynamic analysis. Hands-on " +
  "industry experience at Saudia Technic and Aramco in continuing airworthiness and MRO operations across " +
  "narrow-body and wide-body fleets. Currently co-founding Waypoint AI, an LLM routing platform incubated " +
  "through the KAUST TIE programme."

export const metadata: Metadata = {
  title:       "Resume",
  description: `Resume of ${profile.name} — ${summary}`,
}

export default function ResumePage() {
  return <ResumeView summary={summary} />
}
