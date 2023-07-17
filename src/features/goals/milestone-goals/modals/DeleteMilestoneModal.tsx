import { FC, Fragment, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import {
  deleteMilestone,
  setDeleteMilestoneStatusIdle,
} from "../milestonesSlice"
import { Milestone } from "../../../../types/types"
import { convertTimestamp } from "../../../../helpers/convertTimestamp"
import { Dialog, Transition } from "@headlessui/react"
import Spinner from "../../../../assets/Spinner"

interface PropTypes {
  isOpen: boolean
  setIsOpen: (args: boolean) => void
  milestone: Milestone
}

const DeleteGoalModal: FC<PropTypes> = ({ isOpen, setIsOpen, milestone }) => {
  const dispatch = useAppDispatch()

  const { isDarkMode } = useAppSelector((state) => state.global)
  const { deleteMilestoneStatus, deleteMilestoneError } = useAppSelector(
    (state) => state.milestones
  )

  const onDeleteMilestone = () => {
    try {
      dispatch(deleteMilestone(milestone.id!)).then((res) => {
        res.meta.requestStatus === "fulfilled" &&
          setTimeout(() => {
            dispatch(setDeleteMilestoneStatusIdle())
            setIsOpen(false)
          }, 2000)
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setIsOpen(false)
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
                  Delete milestone
                </Dialog.Title>
                {deleteMilestoneError && (
                  <p className="text-center text-red-800 bg-red-100 border border-red-200 rounded-sm py-2 mb-4">
                    {deleteMilestoneError}
                  </p>
                )}
                {deleteMilestoneStatus === "succeeded" && (
                  <p className="text-center text-green-800 bg-green-100 border border-green-200 rounded-sm py-2 mb-4">
                    Milestone deleted!
                  </p>
                )}
                <div className="flex flex-col gap-2 mb-8">
                  <p>
                    <span className="text-gray-200 font-medium">
                      Milestone:
                    </span>{" "}
                    <span className="text-white">{milestone.category}</span>
                  </p>
                  <div className="flex flex-col gap-1">
                    {milestone.paths.map((path, index) => (
                      <li key={index} className="list-none text-gray-200">
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
                                    {convertTimestamp(
                                      goal.completedAt.toDate()
                                    )}
                                  </span>
                                )}
                              </p>
                            </div>
                          ))}
                      </li>
                    ))}
                  </div>
                </div>

                {deleteMilestoneStatus === "loading" ? (
                  <div className="mt-4 flex justify-end gap-4">
                    <div className="flex items-center bg-gray-300 text-gray-800 cursor-auto  justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium">
                      <Spinner className="h-5 w-5 fill-f3eed9" />
                      Deleting milestone...
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      className={`${
                        isDarkMode
                          ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                          : "bg-f3eed9 text-gray-900 hover:bg-f7f3e4"
                      } bg-824936-200 text-824936-800 hover:bg-824936-300 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none`}
                      onClick={onDeleteMilestone}
                    >
                      Delete milestone
                    </button>
                    <button
                      type="button"
                      className={`${
                        isDarkMode
                          ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                          : "bg-f3eed9 text-gray-900 hover:bg-f7f3e4"
                      } inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none`}
                      onClick={() => setIsOpen(false)}
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

export default DeleteGoalModal
