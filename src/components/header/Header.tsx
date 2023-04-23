import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { darkModeToggled } from "../../features/global/globalSlice"
import { MoonIcon } from "@heroicons/react/24/solid"
import "./Header.css"

const Header = () => {
  const dispatch = useAppDispatch()

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  const toggleDarkMode = () => {
    dispatch(darkModeToggled())
  }

  return (
    <header id="header" className={isDarkMode ? "header--dark" : "header"}>
      <div className="row">
        <div className="container container--header">
          <div data-aos="fade-up" data-aos-delay="700">
            <h2
              className={
                isDarkMode ? "header__subtitle--dark" : "header__subtitle"
              }
            >
              Your standard for living life
            </h2>
          </div>
          <div data-aos="fade-up">
            <h1
              className={isDarkMode ? "header__title--dark" : "header__title"}
            >
              The Blueprint
            </h1>
          </div>
          <div>
            <a
              href="#roles"
              className="scroll"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div
                className={isDarkMode ? "scroll__icon--dark" : "scroll__icon"}
              ></div>
            </a>
            <button
              type="button"
              onClick={toggleDarkMode}
              className={
                isDarkMode ? "dark-mode__icon--dark" : "dark-mode__icon"
              }
            >
              <MoonIcon data-aos="fade-up" data-aos-delay="700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
