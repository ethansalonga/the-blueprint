import { FC, Fragment, useState, ChangeEvent, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { updateGoal, setUpdateGoalStatusIdle } from "../goalsSlice"
import { Goal } from "../../../../types/types"
import { Dialog, Transition } from "@headlessui/react"
import Spinner from "../../../../assets/Spinner"

interface PropTypes {
  isOpen: boolean
  setIsOpen: (args: boolean) => void
  goal: Goal
}

const UpdateGoalModal: FC<PropTypes> = ({ isOpen, setIsOpen, goal }) => {
  const dispatch = useAppDispatch()

  const { isDarkMode } = useAppSelector((state) => state.global)
  const { updateGoalStatus, updateGoalError } = useAppSelector(
    (state) => state.goals
  )

  const [goalDesc, setGoalDesc] = useState("")

  const onGoalChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setGoalDesc(e.currentTarget.value)

  const canUpdate = goalDesc && updateGoalStatus === "idle"

  const onAddRole = async () => {
    if (canUpdate) {
      try {
        await dispatch(updateGoal({ id: goal.id, goal: goalDesc }))
      } catch (err) {
        console.log(err)
      } finally {
        setTimeout(() => {
          dispatch(setUpdateGoalStatusIdle())
          setIsOpen(false)
        }, 3000)
      }
    }
  }

  useEffect(() => {
    setGoalDesc(goal.goal)
  }, [goal, isOpen])

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
                  Update goal
                </Dialog.Title>
                {updateGoalError && (
                  <p className="text-center text-red-800 bg-red-100 border border-red-200 rounded-sm py-2 mb-4">
                    {updateGoalError}
                  </p>
                )}
                {updateGoalStatus === "succeeded" && (
                  <p className="text-center text-green-800 bg-green-100 border border-green-200 rounded-sm py-2 mb-4">
                    Goal updated!
                  </p>
                )}
                <form className="flex flex-col mb-8">
                  <label htmlFor="goal" className="text-gray-200 block mb-2">
                    Goal:
                  </label>
                  <textarea
                    id="goal"
                    name="goal"
                    value={goalDesc}
                    onChange={onGoalChange}
                    className="block p-2.5 w-full text-gray-800 bg-gray-50 rounded-lg border border-gray-300 !outline-none resize-none h-[6em]"
                    disabled={updateGoalStatus === "loading"}
                  />
                </form>

                {updateGoalStatus === "loading" ? (
                  <div className="mt-4 flex justify-end gap-4">
                    <div className="flex items-center bg-gray-300 text-gray-800 cursor-auto  justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none">
                      <Spinner className="h-5 w-5 fill-f3eed9" />
                      Updating goal...
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      className={`${
                        isDarkMode && goalDesc
                          ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                          : isDarkMode
                          ? "bg-gray-400 cursor-auto"
                          : goalDesc
                          ? "bg-f3eed9 text-gray-900 hover:bg-f7f3e4"
                          : "bg-gray-200 text-gray-900 cursor-auto"
                      } inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none`}
                      onClick={onAddRole}
                    >
                      Update goal
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

export default UpdateGoalModal
