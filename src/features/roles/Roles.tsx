import { useEffect, useRef, useState } from "react"
import AddNewRoleModal from "./modals/AddNewRoleModal"
import DeleteRoleModal from "./modals/DeleteRoleModal"
import { fetchRoles } from "./rolesSlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { Role } from "../../types/types"
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid"
import Spinner from "../../assets/Spinner"
import "./Roles.css"

const Roles = () => {
  const effectRan = useRef(false)
  const dispatch = useAppDispatch()

  const { isDarkMode } = useAppSelector((state) => state.global)
  const { roles, fetchRolesStatus, fetchRolesError } = useAppSelector(
    (state) => state.roles
  )

  const [isAddNewRoleModalOpen, setIsAddNewRoleModalOpen] = useState(false)
  const [isDeleteRoleModalOpen, setIsDeleteRoleModalOpen] = useState(false)
  const [activeRole, setActiveRole] = useState<Role>({
    id: 0,
    title: "",
    description: "",
  })

  const onDeleteRoleClick = (role: Role) => {
    setActiveRole(role)
    setIsDeleteRoleModalOpen(true)
  }

  useEffect(() => {
    if (effectRan.current === false) {
      if (fetchRolesStatus === "idle") {
        dispatch(fetchRoles())
      }

      return () => {
        effectRan.current = true
      }
    }
  }, [roles, dispatch])

  return (
    <section
      id="roles"
      className={`transition-colors duration-500 ease-in-out ${
        isDarkMode && "bg-161616 text-white"
      }`}
    >
      <div className="row">
        <div
          className={`container transition-colors duration:500 ease-in-out ${
            isDarkMode ? "text-white" : "text-222c2a"
          }`}
        >
          <div data-aos="fade-down">
            <h3
              className={`sectionTitle transition-colors duration:500 ease-in-out ${
                isDarkMode ? "text-f3eed9" : "text-824936"
              }`}
            >
              Roles
            </h3>
          </div>
          <div data-aos="fade-down">
            <p
              className={`sectionDesc after:transition-colors after:duration-500 after:ease-in-out after ${
                isDarkMode ? "after:bg-f3eed9" : "after:bg-824936"
              }`}
            >
              List out the various roles you play in your life in order of
              importance. Write a short description for each role as if you had
              just passed away. We all die sometime. Remember to focus on the
              things that truly matter to you. Be the best version of yourself.
            </p>
          </div>
          <button
            className={`mb-6 ${isDarkMode ? "plus-icon--dark" : "plus-icon"}`}
            onClick={() => setIsAddNewRoleModalOpen(true)}
          >
            <PlusIcon
              data-aos="fade-down"
              data-aos-delay="200"
              data-aos-anchor="#roles"
            />
          </button>
          <ul className="flex flex-col gap-12 items-center">
            {fetchRolesStatus === "loading" && (
              <Spinner className="h-24 w-24" />
            )}
            {fetchRolesStatus === "succeeded" &&
              roles.map((role, index) => (
                <li
                  className="role-item list-none text-left text-xl leading-10 900:text-2xl 900:leading-10"
                  data-aos="fade-down"
                  data-aos-delay={`${200 * (index + 1)}`}
                  data-aos-anchor="#roles"
                  key={index}
                >
                  <span className="font-medium">{role.title}</span>:{" "}
                  {role.description}{" "}
                  <button onClick={() => onDeleteRoleClick(role)}>
                    <MinusIcon className="minus-icon w-7 h-7 inline-block cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 active:scale-90" />
                  </button>
                </li>
              ))}
            {fetchRolesStatus === "failed" && <p>{fetchRolesError}</p>}
          </ul>
        </div>
      </div>
      <AddNewRoleModal
        isOpen={isAddNewRoleModalOpen}
        setIsOpen={setIsAddNewRoleModalOpen}
      />
      <DeleteRoleModal
        isOpen={isDeleteRoleModalOpen}
        setIsOpen={setIsDeleteRoleModalOpen}
        role={activeRole}
      />
    </section>
  )
}

export default Roles
