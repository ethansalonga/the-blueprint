import { useEffect, useRef, useState } from "react"
import AddNewRoleModal from "./AddNewRoleModal"
import { fetchRoles } from "./rolesSlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { PlusIcon } from "@heroicons/react/24/solid"

const Roles = () => {
  const effectRan = useRef(false)
  const dispatch = useAppDispatch()

  const { isDarkMode } = useAppSelector((state) => state.global)
  const { roles, status, error } = useAppSelector((state) => state.roles)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (effectRan.current === false) {
      if (status === "idle") {
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
          <div
            className={`1200:mb-6 ${
              isDarkMode ? "plus-icon--dark" : "plus-icon"
            }`}
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon
              data-aos="fade-down"
              data-aos-delay="200"
              data-aos-anchor="#roles"
            />
            <AddNewRoleModal isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <ul className="flex flex-col gap-12">
            {status === "loading" && <p>Loading roles...</p>}
            {status === "succeeded" &&
              roles.map((role, index) => (
                <li
                  className="list-none text-left text-xl leading-10 900:text-2xl 900:leading-10"
                  data-aos="fade-down"
                  data-aos-delay={`${200 * (index + 1)}`}
                  data-aos-anchor="#roles"
                  key={index}
                >
                  <span className="font-medium">{role.title}</span>:{" "}
                  {role.description}
                </li>
              ))}
            {status === "failed" && <p>{error}</p>}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Roles
