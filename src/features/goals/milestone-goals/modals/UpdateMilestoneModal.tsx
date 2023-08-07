import { FC, Fragment, useState, ChangeEvent, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import {
  updateMilestone,
  setUpdateMilestoneStatusIdle,
} from "../milestonesSlice"
import { Milestone, Path } from "../../../../types/types"
import { Dialog, Transition } from "@headlessui/react"
import Spinner from "../../../../assets/Spinner"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import { generateRandomFirebaseId } from "../../../../helpers/generateRandomFirebaseId"
import { Timestamp } from "firebase/firestore"

interface PropTypes {
  isOpen: boolean
  setIsOpen: (args: boolean) => void
  milestone: Milestone
}

const UpdateMilestoneModal: FC<PropTypes> = ({
  isOpen,
  setIsOpen,
  milestone,
}) => {
  const dispatch = useAppDispatch()

  const { isDarkMode } = useAppSelector((state) => state.global)
  const { updateMilestoneStatus, updateMilestoneError } = useAppSelector(
    (state) => state.milestones
  )

  const [category, setCategory] = useState("")
  const [pathsData, setPathsData] = useState<Path[]>([])

  const onCategoryChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCategory(e.currentTarget.value)
  const handlePathsNameChange = (id: string, newValue: string) => {
    setPathsData((prevData) =>
      prevData.map((path) =>
        path.id === id ? { ...path, name: newValue } : path
      )
    )
  }
  const handleGoalsNameChange = (id: string, newValue: string) => {
    setPathsData((prevData) => {
      const updatedPathsData = prevData.map((path) => {
        return {
          ...path,
          goals: path.goals.map((goal) =>
            goal.id === id ? { ...goal, goal: newValue } : goal
          ),
        }
      })

      return updatedPathsData
    })
  }

  const onAddNewPath = () => {
    const newPath = {
      id: generateRandomFirebaseId(),
      name: "",
      goals: [
        {
          goal: "",
          isComplete: false,
          createdAt: Timestamp.fromDate(new Date()),
        },
      ],
    }

    const updatedPathsData = [newPath, ...pathsData]

    setPathsData(updatedPathsData)
  }
  const onDeletePath = (id: string) => {
    setPathsData((prevData) => prevData.filter((path) => path.id !== id))
  }

  const onDeleteGoal = (id: string) => {
    setPathsData((prevData) => {
      const updatedPathsData = prevData.map((path) => {
        return {
          ...path,
          goals: path.goals.filter((goal) => goal.id !== id),
        }
      })

      return updatedPathsData
    })
  }

  const canUpdate =
    [
      category,
      pathsData.every(
        (path) => path.name && path.goals.every((goal) => goal.goal)
      ),
    ].every(Boolean) && updateMilestoneStatus === "idle"

  const onUpdateMilestone = async () => {
    if (canUpdate) {
      try {
        await dispatch(
          updateMilestone({
            id: milestone.id,
            category: category,
            paths: pathsData,
            userRef: milestone.userRef,
          })
        )
      } catch (err) {
        console.log(err)
      } finally {
        setTimeout(() => {
          dispatch(setUpdateMilestoneStatusIdle())
          setIsOpen(false)
        }, 3000)
      }
    }
  }

  useEffect(() => {
    setCategory(milestone.category)
    setPathsData(milestone.paths)
  }, [milestone, isOpen])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setIsOpen(false)
          setPathsData(milestone.paths)
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`${
                  isDarkMode ? "bg-303030" : "bg-222c2a"
                } w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}
              >
                <Dialog.Title
                  as="h3"
                  className="text-white text-xl font-medium leading-6 mb-4 text-center"
                >
                  Update milestone
                </Dialog.Title>
                {updateMilestoneError && (
                  <p className="text-center text-red-800 bg-red-100 border border-red-200 rounded-sm py-2 mb-4">
                    {updateMilestoneError}
                  </p>
                )}
                {updateMilestoneStatus === "succeeded" && (
                  <p className="text-center text-green-800 bg-green-100 border border-green-200 rounded-sm py-2 mb-4">
                    Milestone updated!
                  </p>
                )}
                <form className="flex flex-col gap-2 mb-8">
                  <label htmlFor="category" className="text-gray-200 block">
                    Category:
                  </label>
                  <input
                    id="category"
                    name="category"
                    value={category}
                    onChange={onCategoryChange}
                    className="focus:outline-none bg-gray-50 border-1 border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 shadow-sm"
                    disabled={updateMilestoneStatus === "loading"}
                  />
                  <div className="flex justify-center items-center">
                    <PlusIcon
                      className="text-gray-200 w-7 h-7 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 active:scale-90 my-2"
                      onClick={() => onAddNewPath()}
                    />
                  </div>
                  <div className="flex flex-col gap-6">
                    {pathsData.map((path, index) => (
                      <li
                        id={path.id}
                        key={index}
                        className="list-none text-gray-200 flex flex-col justify-center gap-2"
                      >
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => onDeletePath(path.id!)}
                          >
                            <TrashIcon className="w-6 h-6 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 active:scale-90" />
                          </button>
                          <input
                            id="pathName"
                            name="pathName"
                            value={path.name}
                            onChange={(e) =>
                              handlePathsNameChange(path.id!, e.target.value)
                            }
                            className="focus:outline-none bg-gray-50 border-1 border-gray-300 text-gray-800 rounded-lg py-1 px-2.5 shadow-sm w-1/3"
                            disabled={updateMilestoneStatus === "loading"}
                          />
                        </div>
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
                            <div key={index} className="flex items-center ml-3">
                              <button
                                type="button"
                                onClick={() => onDeleteGoal(goal.id!)}
                              >
                                <TrashIcon className="w-5 h-5 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 active:scale-90 mr-1" />
                              </button>
                              <input
                                id="goalName"
                                name="goalName"
                                value={goal.goal}
                                className={`${
                                  goal.isComplete ? "opacity-50" : "opacity-100"
                                } focus:outline-none bg-gray-50 border-1 border-gray-300 text-gray-800 rounded-lg px-2.5 shadow-sm w-full`}
                                onChange={(e) =>
                                  handleGoalsNameChange(
                                    goal.id!,
                                    e.target.value
                                  )
                                }
                                disabled={updateMilestoneStatus === "loading"}
                              ></input>
                            </div>
                          ))}
                      </li>
                    ))}
                  </div>
                </form>

                {updateMilestoneStatus === "loading" ? (
                  <div className="mt-4 flex justify-end gap-4">
                    <div className="flex items-center bg-gray-300 text-gray-800 cursor-auto  justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none">
                      <Spinner className="h-5 w-5 fill-f3eed9" />
                      Updating milestone...
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      className={`${
                        isDarkMode && canUpdate
                          ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                          : isDarkMode
                          ? "bg-gray-400 cursor-auto"
                          : canUpdate
                          ? "bg-f3eed9 text-gray-900 hover:bg-f7f3e4"
                          : "bg-gray-200 text-gray-900 cursor-auto"
                      } inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none`}
                      onClick={onUpdateMilestone}
                    >
                      Update milestone
                    </button>
                    <button
                      type="button"
                      className={`${
                        isDarkMode
                          ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                          : "bg-f3eed9 text-gray-900 hover:bg-f7f3e4"
                      } inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none`}
                      onClick={() => {
                        setIsOpen(false)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default UpdateMilestoneModal
