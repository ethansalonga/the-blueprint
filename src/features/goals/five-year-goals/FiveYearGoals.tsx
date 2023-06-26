import { useRef, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchGoals } from "./goalsSlice"
import { Goal } from "../../../types/types"
import AddNewGoalModal from "./modals/AddNewGoalModal"
import UpdateGoalModal from "./modals/UpdateGoalModal"
import DeleteGoalModal from "./modals/DeleteGoalModal"
import Spinner from "../../../assets/Spinner"
import { PlusIcon, MinusIcon, PencilIcon } from "@heroicons/react/24/solid"

const FiveYearGoals = () => {
  const effectRan = useRef(false)
  const dispatch = useAppDispatch()

  const { isDarkMode } = useAppSelector((state) => state.global)
  const { currentUser } = useAppSelector((state) => state.auth)
  const { goals, fetchGoalsStatus, fetchGoalsError } = useAppSelector(
    (state) => state.goals
  )

  const [isAddNewGoalModalOpen, setIsAddNewGoalModalOpen] = useState(false)
  const [isUpdateGoalModalOpen, setIsUpdateGoalModalOpen] = useState(false)
  const [isDeleteGoalModalOpen, setIsDeleteGoalModalOpen] = useState(false)
  const [activeGoal, setActiveGoal] = useState<Goal>({
    id: "",
    goal: "",
    rank: 0,
    userRef: "",
  })

  const onUpdateGoalClick = (goal: Goal) => {
    setActiveGoal(goal)
    setIsUpdateGoalModalOpen(true)
  }

  const onDeleteGoalClick = (goal: Goal) => {
    setActiveGoal(goal)
    setIsDeleteGoalModalOpen(true)
  }

  useEffect(() => {
    if (effectRan.current === false) {
      if (currentUser) {
        dispatch(fetchGoals(currentUser.uid))
      }

      return () => {
        effectRan.current = true
      }
    }
  }, [goals, dispatch, currentUser])

  return (
    <div id="five-year-goals" className="container text-white pb-8 1200:pb-16">
      <h3 className="sectionTitle text-f3eed9" data-aos="fade-down">
        Five Year Goals
      </h3>
      <p className="sectionDesc after:bg-f3eed9" data-aos="fade-down">
        List the 5 most important goals that you want to achieve within the next
        five years. What are your most ambitious dreams and desires? Don't sell
        yourself short here.
      </p>
      {goals?.length < 5 && (
        <button
          className={`${
            isDarkMode ? "plus-icon--dark" : "plus-icon text-f3eed9"
          } mb-6`}
          onClick={() => setIsAddNewGoalModalOpen(true)}
        >
          <PlusIcon
            data-aos="fade-down"
            data-aos-delay="200"
            data-aos-anchor="#five-year-goals"
          />
        </button>
      )}
      {fetchGoalsStatus === "loading" && (
        <Spinner className="h-24 w-24 fill-f3eed9 self-center" />
      )}
      <ol className="flex flex-col gap-12 list-decimal text-left text-xl leading-10 900:text-2xl 900:leading-10">
        {fetchGoalsStatus === "succeeded" &&
          goals?.map((goal, index) => (
            <li
              className="goal-item"
              data-aos="fade-down"
              data-aos-delay={`${200 * (index + 1)}`}
              data-aos-anchor="#five-year-goals"
              key={index}
            >
              {goal.goal}{" "}
              <div className="inline-block">
                <div className="flex items-center">
                  <button onClick={() => onUpdateGoalClick(goal)}>
                    <PencilIcon className="data-icons w-5 h-5 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 active:scale-90" />
                  </button>
                  <button onClick={() => onDeleteGoalClick(goal)}>
                    <MinusIcon className="data-icons w-7 h-7 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 active:scale-90" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        {fetchGoalsStatus === "failed" && <p>{fetchGoalsError}</p>}
      </ol>
      <AddNewGoalModal
        isOpen={isAddNewGoalModalOpen}
        setIsOpen={setIsAddNewGoalModalOpen}
      />
      <UpdateGoalModal
        isOpen={isUpdateGoalModalOpen}
        setIsOpen={setIsUpdateGoalModalOpen}
        goal={activeGoal}
      />
      <DeleteGoalModal
        isOpen={isDeleteGoalModalOpen}
        setIsOpen={setIsDeleteGoalModalOpen}
        goal={activeGoal}
      />
    </div>
  )
}

export default FiveYearGoals
