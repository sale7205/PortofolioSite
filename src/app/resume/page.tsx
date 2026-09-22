import type { Metadata } from "next"
import { ResumeView } from "@/components/resume/resume-view"
import { profile } from "@/content/site"

const summary =
  "Aerospace engineer who builds ventures as well as systems, working across GNC, systems engineering, and " +
  "data-driven problem solving. Project experience spans spacecraft mission design, EKF-based navigation, and " +
  "aerodynamic analysis; industry experience at Saudia Technic and Aramco covers continuing airworthiness and " +
  "MRO operations on narrow-body and wide-body fleets. Founded and ran Waypoint AI, a self-funded LLM routing " +
  "venture sold to independent clients, and is now studying technology innovation and entrepreneurship at " +
  "KAUST TIE."

export const metadata: Metadata = {
  title:       "Resume",
  description: `Resume of ${profile.name} — ${summary}`,
}

export default function ResumePage() {
  return <ResumeView summary={summary} />
}
