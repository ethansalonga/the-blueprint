import {
  FC,
  Fragment,
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
} from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchRoles } from "../rolesSlice"
import { updateRole, setUpdateRoleStatusIdle } from "../rolesSlice"
import { Role } from "../../../types/types"
import { Dialog, Transition } from "@headlessui/react"
import Spinner from "../../../assets/Spinner"

interface PropTypes {
  isOpen: boolean
  setIsOpen: (args: boolean) => void
  role: Role
}

const UpdateRoleModal: FC<PropTypes> = ({ isOpen, setIsOpen, role }) => {
  const dispatch = useAppDispatch()

  const { isDarkMode } = useAppSelector((state) => state.global)
  const { currentUser } = useAppSelector((state) => state.auth)
  const { updateRoleStatus, updateRoleError } = useAppSelector(
    (state) => state.roles
  )

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [rank, setRank] = useState(0)

  const onTitleChange = (e: FormEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value)
  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.currentTarget.value)
  const onRankChange = (e: FormEvent<HTMLInputElement>) =>
    setRank(+e.currentTarget.value)

  const canUpdate =
    [title, description, rank].every(Boolean) && updateRoleStatus === "idle"

  const onAddRole = async () => {
    if (canUpdate) {
      try {
        await dispatch(
          updateRole({
            id: role.id,
            title,
            description,
            rank,
            userRef: role.userRef,
          })
        )

        currentUser && fetchRoles(currentUser.uid)
      } catch (err) {
        console.log(err)
      } finally {
        setTimeout(() => {
          dispatch(setUpdateRoleStatusIdle())
          setIsOpen(false)
        }, 3000)
      }
    }
  }

  useEffect(() => {
    setTitle(role.title)
    setDescription(role.description)
    setRank(role.rank)
  }, [role])

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
                  isDarkMode ? "bg-303030" : "bg-white"
                } w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}
              >
                <Dialog.Title
                  as="h3"
                  className={`${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } text-xl font-medium leading-6 mb-4 text-center`}
                >
                  Update role
                </Dialog.Title>
                {updateRoleError && (
                  <p className="text-center text-red-800 bg-red-100 border border-red-200 rounded-sm py-2 mb-4">
                    {updateRoleError}
                  </p>
                )}
                {updateRoleStatus === "succeeded" && (
                  <p className="text-center text-green-800 bg-green-100 border border-green-200 rounded-sm py-2 mb-4">
                    Role updated!
                  </p>
                )}
                <form className="flex flex-col gap-4 mb-8">
                  <div>
                    <label
                      htmlFor="roleTitle"
                      className={`${isDarkMode && "text-white"} block mb-2`}
                    >
                      Role:
                    </label>
                    <input
                      type="text"
                      id="roleTitle"
                      name="roleTitle"
                      value={title}
                      onChange={onTitleChange}
                      className="bg-gray-50 border-0 border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 ring-gray-300 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-gray-300"
                      disabled={updateRoleStatus === "loading"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="roleDescription"
                      className={`${isDarkMode && "text-white"} block mb-2`}
                    >
                      Description:
                    </label>
                    <textarea
                      id="roleDescription"
                      name="roleDescription"
                      value={description}
                      onChange={onDescriptionChange}
                      className="bg-gray-50 border-0 border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 ring-gray-300 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-gray-300 resize-none h-[6em]"
                      disabled={updateRoleStatus === "loading"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="roleRank"
                      className={`${isDarkMode && "text-white"} block mb-2`}
                    >
                      Rank:
                    </label>
                    <input
                      type="number"
                      id="roleRank"
                      name="roleRank"
                      value={rank}
                      onChange={onRankChange}
                      className="bg-gray-50 border-0 border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 ring-gray-300 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-gray-300"
                      disabled={updateRoleStatus === "loading"}
                    />
                  </div>
                </form>

                {updateRoleStatus === "loading" ? (
                  <div className="mt-4 flex justify-end gap-4">
                    <div className="flex items-center bg-gray-300 text-gray-800 cursor-auto  justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none">
                      <Spinner className="h-5 w-5 fill-824936" />
                      Updating role...
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      className={`${
                        isDarkMode && title && description
                          ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                          : isDarkMode
                          ? "bg-gray-400 cursor-auto"
                          : title && description
                          ? "bg-824936 text-white hover:bg-8f5b4a"
                          : "bg-gray-200 text-gray-900 cursor-auto"
                      } inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium !outline-none`}
                      onClick={onAddRole}
                    >
                      Update role
                    </button>
                    <button
                      type="button"
                      className={`${
                        isDarkMode
                          ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                          : "bg-824936 text-white hover:bg-8f5b4a"
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

export default UpdateRoleModal
