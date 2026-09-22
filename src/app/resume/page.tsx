import type { Metadata } from "next"
import { ResumeView } from "@/components/resume/resume-view"
import { profile } from "@/content/site"
import { primaryEducation, graduationYear } from "@/content/experience"

const summary =
  `Aerospace engineering graduate (${primaryEducation.degree}, ${primaryEducation.school}, ${graduationYear}) ` +
  "focused on systems engineering, GNC, and data-driven problem solving. Academic and project experience spans " +
  "spacecraft mission design, EKF-based navigation algorithm development, and aerodynamic analysis. Hands-on " +
  "industry experience at Saudia Technic and Aramco in continuing airworthiness and MRO operations across " +
  "narrow-body and wide-body fleets. Founded and ran Waypoint AI, a self-funded LLM routing venture built " +
  "and sold independently, and is currently on the KAUST TIE programme in technology innovation and " +
  "entrepreneurship."

export const metadata: Metadata = {
  title:       "Resume",
  description: `Resume of ${profile.name} — ${summary}`,
}

export default function ResumePage() {
  return <ResumeView summary={summary} />
}
