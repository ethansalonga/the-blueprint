import { useEffect, useRef } from "react"
import { fetchRoles } from "./rolesSlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { PlusIcon } from "@heroicons/react/24/solid"
import "./Roles.css"

const Roles = () => {
  const effectRan = useRef(false)
  const dispatch = useAppDispatch()

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)
  const { roles, status, error } = useAppSelector((state) => state.roles)

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
    <section id="roles" className={isDarkMode ? "roles--dark" : ""}>
      <div className="row">
        <div
          className={`container ${
            isDarkMode ? "container--roles--dark" : "container--roles"
          }`}
        >
          <div data-aos="fade-down">
            <h3
              className={`sectionTitle ${
                isDarkMode ? "sectionTitle--roles--dark" : "sectionTitle--roles"
              }`}
            >
              Roles
            </h3>
          </div>
          <div data-aos="fade-down">
            <p
              className={`sectionDesc ${
                isDarkMode ? "sectionDesc--roles--dark" : "sectionDesc--roles"
              }`}
            >
              List out the various roles you play in your life in order of
              importance. Write a short description for each role as if you had
              just passed away. We all die sometime. Remember to focus on the
              things that truly matter to you. Be the best version of yourself.
            </p>
          </div>
          <div className={isDarkMode ? "plus-icon--dark" : "plus-icon"}>
            <PlusIcon
              data-aos="fade-down"
              data-aos-delay="200"
              data-aos-anchor="#roles"
            />
          </div>
          <ul className="roles__list">
            {status === "loading" && <p>Loading roles...</p>}
            {status === "succeeded" &&
              roles.map((role, index) => (
                <li
                  data-aos="fade-down"
                  data-aos-delay={`${200 * (index + 1)}`}
                  data-aos-anchor="#roles"
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
