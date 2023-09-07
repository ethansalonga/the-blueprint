import Navbar from "../components/Navbar"
import { useAppSelector } from "../app/hooks"
import { useState } from "react"
import Anime from "../features/anime/Anime"

const Lists = () => {
  const { isDarkMode } = useAppSelector((state) => state.global)
  const [currentTab, setCurrentTab] = useState("ANIME")

  return (
    <>
      <Navbar />
      <main className={`${isDarkMode ? "bg-161616" : "bg-f3eed9"}`}>
        <div className="row">
          <div
            className={`${
              isDarkMode ? "text-white" : "text-black"
            } container min-h-screen relative`}
          >
            <div className="flex">
              <h1
                className={`${
                  currentTab === "ANIME" && "underline underline-offset-8"
                } mt-8 text-left px-5 text-2xl font-medium tracking-wider cursor-pointer`}
                onClick={() => setCurrentTab("ANIME")}
              >
                Anime
              </h1>
              <h1
                className={`${
                  currentTab === "VIDEO GAMES" && "underline underline-offset-8"
                } mt-8 text-left px-5 text-2xl font-medium tracking-wider cursor-pointer`}
                onClick={() => setCurrentTab("VIDEO GAMES")}
              >
                Video Games
              </h1>
            </div>
            {currentTab === "ANIME" && <Anime />}
          </div>
        </div>
      </main>
    </>
  )
}

export default Lists
