import Header from "../features/header/Header"
import Roles from "../features/roles/Roles"
import Goals from "../features/goals/Goals"
import PersonalStatement from "../features/personal-statement/PersonalStatement"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <main>
        <Roles />
        <Goals />
        <PersonalStatement />
      </main>
    </>
  )
}

export default Home
