import { useRef, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchMilestones } from "./milestonesSlice"
import { Milestone } from "../../../types/types"
import { Timestamp } from "firebase/firestore"
import AddNewMilestoneModal from "./modals/AddNewMilestoneModal"
import UpdateMilestoneModal from "./modals/UpdateMilestoneModal"
import Spinner from "../../../assets/Spinner"
import { PlusIcon, MinusIcon, PencilIcon } from "@heroicons/react/24/solid"

const MilestoneGoals = () => {
  const effectRan = useRef(false)
  const dispatch = useAppDispatch()

  const { isDarkMode } = useAppSelector((state) => state.global)
  const { currentUser } = useAppSelector((state) => state.auth)
  const { milestones, fetchMilestonesStatus, fetchMilestonesError } =
    useAppSelector((state) => state.milestones)

  const [isAddNewMilestoneModalOpen, setIsAddNewMilestoneModalOpen] =
    useState(false)
  const [isUpdateMilestoneModalOpen, setIsUpdateMilestoneModalOpen] =
    useState(false)
  const [isDeleteMilestoneModalOpen, setIsDeleteMilestoneModalOpen] =
    useState(false)
  const [activeMilestone, setActiveMilestone] = useState<Milestone>({
    id: "",
    category: "",
    paths: [
      {
        name: "",
        goals: [
          {
            goal: "",
            isComplete: false,
            createdAt: Timestamp.fromDate(new Date()),
          },
        ],
      },
    ],
    userRef: "",
  })

  const convertTimestamp = (timestamp: Date) => {
    // Convert the timestamp to a JavaScript Date object
    var dt = new Date(timestamp)

    // Format the Date object to the desired format
    var month = dt.getMonth() + 1
    var date = dt.getDate()
    var year = dt.getFullYear()
    var formattedDateTime =
      month + "/" + date + "/" + year + " " + formatTime(dt)

    return formattedDateTime
  }

  const formatTime = (dt: Date) => {
    var hours = dt.getHours()
    var minutes = dt.getMinutes().toString()
    var ampm = hours >= 12 ? "PM" : "AM"

    hours = hours % 12
    hours = hours ? hours : 12 // Handle midnight (0 hours)

    // Add leading zeros to minutes if necessary
    minutes = ("0" + minutes).slice(-2)

    return hours + ":" + minutes + ampm
  }

  const onUpdateMilestoneClick = (milestone: Milestone) => {
    setActiveMilestone(milestone)
    setIsUpdateMilestoneModalOpen(true)
  }

  const onDeleteMilestoneClick = (milestone: Milestone) => {
    setActiveMilestone(milestone)
    setIsDeleteMilestoneModalOpen(true)
  }

  useEffect(() => {
    if (effectRan.current === false) {
      if (currentUser) {
        dispatch(fetchMilestones(currentUser.uid))
      }

      return () => {
        effectRan.current = true
      }
    }
  }, [milestones, dispatch, currentUser])

  return (
    <div id="milestone-goals" className="container text-white">
      <h3 className="sectionTitle text-f3eed9" data-aos="fade-down">
        Milestone Goals
      </h3>
      <p className="sectionDesc after:bg-f3eed9" data-aos="fade-down">
        List out all of the general goals you want to complete in your life and
        order them by category. Set realistic, measurable goals that you can
        continuously improve upon. Every time you hit a milestone goal, replace
        it with a new one. You'll be surprised how far you can go.
      </p>
      <button
        className={`${
          isDarkMode ? "plus-icon--dark" : "plus-icon text-f3eed9"
        } mb-6`}
        onClick={() => setIsAddNewMilestoneModalOpen(true)}
      >
        <PlusIcon
          data-aos="fade-down"
          data-aos-delay="200"
          data-aos-anchor="#milestone-goals"
        />
      </button>
      {fetchMilestonesStatus === "succeeded" &&
        milestones?.map((milestone, index) => (
          <div
            className="mb-8"
            data-aos="fade-down"
            data-aos-delay={`${200 * (index + 1)}`}
            data-aos-anchor="#milestone-goals"
            key={index}
          >
            <div className="milestone-item text-left font-medium tracking-wide underline text-2xl mb-4">
              {milestone.category}
              <div className="ml-2 inline-block">
                <div className="flex items-center">
                  <button onClick={() => onUpdateMilestoneClick(milestone)}>
                    <PencilIcon className="data-icons w-5 h-5 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 active:scale-90" />
                  </button>
                  <button onClick={() => onDeleteMilestoneClick(milestone)}>
                    <MinusIcon className="data-icons w-7 h-7 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 active:scale-90" />
                  </button>
                </div>
              </div>
            </div>
            <ul className="list-disc text-left flex flex-col gap-4 text-xl">
              {milestone.paths.map((path, index) => (
                <li key={index} className="list-none">
                  <p>{path.name}</p>
                  {path.goals
                    .slice()
                    .sort(
                      (a, b) =>
                        b.createdAt.toDate().getTime() -
                        a.createdAt.toDate().getTime()
                    )
                    .sort((a, b) => {
                      // Sort by completedAt if both goals are complete
                      if (a.isComplete && b.isComplete) {
                        return (
                          b.completedAt!.toDate().getTime() -
                          a.completedAt!.toDate().getTime()
                        )
                      }
                      // Move complete goals to the bottom
                      else if (a.isComplete) return 1
                      else if (b.isComplete) return -1
                      // For incomplete goals, maintain existing order
                      else return 0
                    })
                    .map((goal, index) => (
                      <div key={index}>
                        <p
                          className={`${
                            goal.isComplete ? "opacity-50" : "opacity-100"
                          } list-item list-disc ml-5`}
                        >
                          {goal.goal}
                          {goal.completedAt && (
                            <span className="text-sm pl-3">
                              Completed at{" "}
                              {convertTimestamp(goal.completedAt.toDate())}
                            </span>
                          )}
                        </p>
                      </div>
                    ))}
                </li>
              ))}
            </ul>
          </div>
        ))}
      {fetchMilestonesStatus === "failed" && <p>{fetchMilestonesError}</p>}
      <AddNewMilestoneModal
        isOpen={isAddNewMilestoneModalOpen}
        setIsOpen={setIsAddNewMilestoneModalOpen}
        userRef={currentUser?.uid}
      />
      <UpdateMilestoneModal
        isOpen={isUpdateMilestoneModalOpen}
        setIsOpen={setIsUpdateMilestoneModalOpen}
        milestone={activeMilestone}
      />
    </div>
  )
}

export default MilestoneGoals
