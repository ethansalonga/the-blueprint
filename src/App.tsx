import { useEffect } from "react"
import Header from "./features/header/Header"
import Roles from "./features/roles/Roles"
import Goals from "./components/goals/Goals"
import PersonalStatement from "./components/personal-statement/PersonalStatement"
import AOS from "aos"
import "aos/dist/aos.css"

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <>
      <Header />
      <main>
        <Roles />
        <Goals />
        <PersonalStatement />
      </main>
    </>
  )
}

export default App
