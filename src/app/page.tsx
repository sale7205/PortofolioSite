import { Navbar }     from "@/components/layout/navbar"
import { Footer }     from "@/components/layout/footer"
import { Intro }      from "@/features/home"
import { ProjectGrid } from "@/features/projects"
import { Experience } from "@/features/home"
import { Contact }    from "@/features/home"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Intro />
        <ProjectGrid />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
