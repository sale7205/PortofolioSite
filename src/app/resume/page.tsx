import type { Metadata } from "next"
import { ResumeView } from "@/components/resume/resume-view"
import { profile } from "@/content/site"
import { education, graduationYear } from "@/content/experience"

const summary =
  `Aerospace engineering graduate (${education.degree}, ${education.school}, ${graduationYear}) focused on ` +
  "systems engineering, GNC, and data-driven problem solving. Academic and project experience spans spacecraft " +
  "mission design, EKF-based navigation algorithm development, and aerodynamic analysis. Hands-on industry " +
  "experience at Saudia Technic and Aramco in continuing airworthiness and MRO operations across narrow-body " +
  "and wide-body fleets."

export const metadata: Metadata = {
  title:       "Resume",
  description: `Resume of ${profile.name} — ${summary}`,
}

export default function ResumePage() {
  return <ResumeView summary={summary} />
}
