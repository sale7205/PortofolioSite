import { Navbar }     from "@/components/navbar"
import { Footer }     from "@/components/footer"
import { Intro }      from "@/sections/intro"
import { Projects }   from "@/sections/projects"
import { Experience } from "@/sections/experience"
import { Contact }    from "@/sections/contact"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Intro />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
