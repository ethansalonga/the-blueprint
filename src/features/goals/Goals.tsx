import { useAppSelector } from "../../app/hooks"
import FiveYearGoals from "./five-year-goals/FiveYearGoals"
import MilestoneGoals from "./milestone-goals/MilestoneGoals"

const Goals = () => {
  const { isDarkMode } = useAppSelector((state) => state.global)

  return (
    <section id="goals" className={isDarkMode ? "bg-161616" : "bg-222c2a"}>
      <div className="row">
        <FiveYearGoals />
        <MilestoneGoals />
      </div>
    </section>
  )
}

export default Goals
