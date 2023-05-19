import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/init"
import { darkModeToggled } from "../global/globalSlice"
import { MoonIcon } from "@heroicons/react/24/solid"
import "./Header.css"

const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isDarkMode } = useAppSelector((state) => state.global)

  const [error, setError] = useState("")

  const toggleDarkMode = () => {
    dispatch(darkModeToggled())
  }

  const handleSignout = async () => {
    navigate("/sign-up")
    // setError("")

    // try {
    //   await signOut(auth)
    // } catch {
    //   setError("Failed to sign out")
    // }
  }

  return (
    <header
      className={`transition-colors duration-500 ease-in-out ${
        isDarkMode ? "bg-161616" : "bg-f3eed9"
      }`}
    >
      <button className="absolute top-0 left-2 z-10" onClick={handleSignout}>
        Sign out
      </button>
      <div className="row">
        <div className="container min-h-screen justify-center relative">
          <div data-aos="fade-up" data-aos-delay="700">
            <h2
              className={`text-xl 900:text-4xl font-light tracking-widest transition-colors duration-500 ease-in-out ${
                isDarkMode ? "text-white" : "text-222c2a"
              }`}
            >
              Your standard for living life
            </h2>
          </div>
          <div data-aos="fade-up">
            <h1
              className={`font-playfair text-4xl 900:text-6xl font-black tracking-wider transition-colors duration-500 ease-in-out ${
                isDarkMode ? "text-f3eed9" : "text-824936"
              }`}
            >
              The Blueprint
            </h1>
          </div>
          <div>
            <a
              href="#roles"
              className="absolute bottom-20 left-20% 600:left-40% cursor-pointer transition-all"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div
                className={`scroll-icon w-7 h-12 border-2 border-222c2a rounded-3xl flex justify-center items-center cursor-pointer transition-all hover:scale-110 active:scale-90 ${
                  isDarkMode ? "border-white after:bg-white" : "after:bg-222c2a"
                }`}
              ></div>
            </a>
            <button
              type="button"
              onClick={toggleDarkMode}
              className={`absolute bottom-20 w-12 h-12 right-20% 600:right-40% cursor-pointer transition-all hover:scale-110 active:scale-90 ${
                isDarkMode ? "text-white" : "text-222c2a"
              }`}
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
