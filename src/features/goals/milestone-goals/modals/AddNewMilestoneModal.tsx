import { FC, Fragment, useState, ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import {
  addNewMilestone,
  setAddNewMilestoneStatusIdle,
} from "../milestonesSlice"
import { Dialog, Transition } from "@headlessui/react"
import Spinner from "../../../../assets/Spinner"

interface PropTypes {
  isOpen: boolean
  setIsOpen: (args: boolean) => void
  userRef: string | undefined
}

const AddNewMilestoneModal: FC<PropTypes> = ({
  isOpen,
  setIsOpen,
  userRef,
}) => {
  const dispatch = useAppDispatch()

  const { isDarkMode } = useAppSelector((state) => state.global)
  const { addNewMilestoneStatus, addNewMilestoneError } = useAppSelector(
    (state) => state.milestones
  )

  const [category, setCategory] = useState("")
  const [pathName, setPathName] = useState("")

  const onCategoryChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCategory(e.currentTarget.value)
  const onPathNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPathName(e.currentTarget.value)

  const canAdd =
    [pathName, category].every(Boolean) && addNewMilestoneStatus === "idle"

  const onAddMilestone = async () => {
    if (canAdd) {
      try {
        if (userRef) {
          await dispatch(addNewMilestone({ category, pathName, userRef }))

          setCategory("")
          setPathName("")
        }
      } catch (err) {
        console.log(err)
      } finally {
        setTimeout(() => {
          dispatch(setAddNewMilestoneStatusIdle())
        }, 3000)
      }
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
                  Add new milestone
                </Dialog.Title>
                {addNewMilestoneError && (
                  <p className="text-center text-red-800 bg-red-100 border border-red-200 rounded-sm py-2 mb-4">
                    {addNewMilestoneError}
                  </p>
                )}
                {addNewMilestoneStatus === "succeeded" && (
                  <p className="text-center text-green-800 bg-green-100 border border-green-200 rounded-sm py-2 mb-4">
                    Goal added!
                  </p>
                )}
                <form className="flex flex-col gap-4 mb-8">
                  <div>
                    <label
                      htmlFor="category"
                      className="text-gray-200 block mb-2"
                    >
                      Category:
                    </label>
                    <input
                      id="category"
                      name="category"
                      value={category}
                      onChange={onCategoryChange}
                      className="bg-gray-50 border-0 border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 shadow-sm focus:outline-none"
                      disabled={addNewMilestoneStatus === "loading"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pathName"
                      className="text-gray-200 block mb-2"
                    >
                      First path:
                    </label>
                    <input
                      id="pathName"
                      name="pathName"
                      value={pathName}
                      onChange={onPathNameChange}
                      className="bg-gray-50 border-0 border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 shadow-sm focus:outline-none"
                      disabled={addNewMilestoneStatus === "loading"}
                    />
                  </div>
                </form>

                {addNewMilestoneStatus === "loading" ? (
                  <div className="mt-4 flex justify-end gap-4">
                    <div className="flex items-center bg-gray-300 text-gray-800 cursor-auto  justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none">
                      <Spinner className="h-5 w-5 fill-f3eed9" />
                      Adding milestone...
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      className={`${
                        isDarkMode && category && pathName
                          ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                          : isDarkMode
                          ? "bg-gray-400 cursor-auto"
                          : category && pathName
                          ? "bg-f3eed9 text-gray-900 hover:bg-f7f3e4"
                          : "bg-gray-200 text-gray-900 cursor-auto"
                      } inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none`}
                      onClick={onAddMilestone}
                    >
                      Add milestone
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

export default AddNewMilestoneModal
