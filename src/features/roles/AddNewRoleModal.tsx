import { FC, Fragment, useState, FormEvent, ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addNewRole } from "./rolesSlice"
import { Dialog, Transition } from "@headlessui/react"
import Spinner from "../../assets/Spinner"

interface PropTypes {
  isOpen: boolean
  setIsOpen: (args: boolean) => void
}

const AddNewRoleModal: FC<PropTypes> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch()
  const { status, error } = useAppSelector((state) => state.roles)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [addRoleStatus, setAddRoleStatus] = useState("idle")

  const onTitleChange = (e: FormEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value)
  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.currentTarget.value)

  const canAdd = [title, description].every(Boolean) && addRoleStatus === "idle"

  const onAddRole = () => {
    if (canAdd) {
      try {
        setAddRoleStatus("pending")
        dispatch(addNewRole({ title, description }))

        setTitle("")
        setDescription("")
      } catch (err) {
        console.log(err)
      } finally {
        setAddRoleStatus("idle")
      }
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900 mb-4 text-center"
                >
                  Add new role
                </Dialog.Title>
                {error && (
                  <p className="text-center text-red-800 bg-red-100 border border-red-200 rounded-sm py-2 mb-4">
                    {error}
                  </p>
                )}
                {status === "succeeded" && (
                  <p className="text-center text-green-800 bg-green-100 border border-green-200 rounded-sm py-2 mb-4">
                    Role added!
                  </p>
                )}
                <form className="flex flex-col gap-4 mb-8">
                  <div>
                    <label htmlFor="roleTitle" className="block mb-2">
                      Role:
                    </label>
                    <input
                      type="text"
                      id="roleTitle"
                      name="roleTitle"
                      value={title}
                      onChange={onTitleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 !outline-none"
                      disabled={status === "loading"}
                    />
                  </div>
                  <div>
                    <label htmlFor="roleDescription" className="block mb-2">
                      Description:
                    </label>
                    <textarea
                      id="roleDescription"
                      name="roleDescription"
                      value={description}
                      onChange={onDescriptionChange}
                      className="block p-2.5 w-full text-gray-800 bg-gray-50 rounded-lg border border-gray-300 !outline-none resize-none h-[6em]"
                      disabled={status === "loading"}
                    />
                  </div>
                </form>

                {status === "loading" ? (
                  <div className="mt-4 flex justify-end gap-4">
                    <div className="flex items-center bg-gray-300 text-gray-800 cursor-auto  justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none">
                      <Spinner className="h-5 w-5" />
                      Adding role...
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      className={`${
                        title && description
                          ? "bg-blue-200 text-blue-800 hover:bg-blue-300"
                          : "bg-gray-200 text-gray-900 cursor-auto"
                      } inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none`}
                      onClick={onAddRole}
                    >
                      Add role
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-300 !outline-none"
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

export default AddNewRoleModal
