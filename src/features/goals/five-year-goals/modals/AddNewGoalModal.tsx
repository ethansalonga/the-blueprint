import {
  FC,
  Fragment,
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
} from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { addNewGoal, setAddNewGoalStatusIdle } from "../goalsSlice"
import { Dialog, Transition } from "@headlessui/react"
import Spinner from "../../../../assets/Spinner"

interface PropTypes {
  isOpen: boolean
  setIsOpen: (args: boolean) => void
  userRef: string | undefined
}

const AddNewGoalModal: FC<PropTypes> = ({ isOpen, setIsOpen, userRef }) => {
  const dispatch = useAppDispatch()

  const { isDarkMode } = useAppSelector((state) => state.global)
  const { addNewGoalStatus, addNewGoalError, goals } = useAppSelector(
    (state) => state.goals
  )

  const [goal, setGoal] = useState("")
  const [rank, setRank] = useState(0)

  const onGoalChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setGoal(e.currentTarget.value)
  const onRankChange = (e: FormEvent<HTMLInputElement>) =>
    setRank(+e.currentTarget.value)

  const canAdd = [goal, rank].every(Boolean) && addNewGoalStatus === "idle"

  const onAddGoal = async () => {
    if (canAdd) {
      try {
        if (userRef) {
          await dispatch(addNewGoal({ goal, rank, userRef }))

          setGoal("")
        }
      } catch (err) {
        console.log(err)
      } finally {
        setTimeout(() => {
          dispatch(setAddNewGoalStatusIdle())
        }, 3000)
      }
    }
  }

  useEffect(() => {
    setRank(goals.length + 1)
  }, [goals])

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
                  Add new five year goal
                </Dialog.Title>
                {addNewGoalError && (
                  <p className="text-center text-red-800 bg-red-100 border border-red-200 rounded-sm py-2 mb-4">
                    {addNewGoalError}
                  </p>
                )}
                {addNewGoalStatus === "succeeded" && (
                  <p className="text-center text-green-800 bg-green-100 border border-green-200 rounded-sm py-2 mb-4">
                    Goal added!
                  </p>
                )}
                <form className="flex flex-col gap-4 mb-8">
                  <div>
                    <label htmlFor="goal" className="text-gray-200 block mb-2">
                      Goal:
                    </label>
                    <textarea
                      id="goal"
                      name="goal"
                      value={goal}
                      onChange={onGoalChange}
                      className="focus:ring-0 focus:border-gray-300 bg-gray-50 border-1 border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 shadow-sm resize-none h-[6em]"
                      disabled={addNewGoalStatus === "loading"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="goalRank"
                      className="text-gray-200 block mb-2"
                    >
                      Rank:
                    </label>
                    <input
                      type="number"
                      id="goalRank"
                      name="goalRank"
                      value={rank}
                      onChange={onRankChange}
                      className="focus:ring-0 focus:border-gray-300 bg-gray-50 border-1 border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 shadow-sm"
                      disabled={addNewGoalStatus === "loading"}
                    />
                  </div>
                </form>

                {addNewGoalStatus === "loading" ? (
                  <div className="mt-4 flex justify-end gap-4">
                    <div className="flex items-center bg-gray-300 text-gray-800 cursor-auto  justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none">
                      <Spinner className="h-5 w-5 fill-f3eed9" />
                      Adding goal...
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      className={`${
                        isDarkMode && goal
                          ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                          : isDarkMode
                          ? "bg-gray-400 cursor-auto"
                          : goal
                          ? "bg-f3eed9 text-gray-900 hover:bg-f7f3e4"
                          : "bg-gray-200 text-gray-900 cursor-auto"
                      } inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none`}
                      onClick={onAddGoal}
                    >
                      Add goal
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

export default AddNewGoalModal
