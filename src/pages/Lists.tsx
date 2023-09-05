import Navbar from "../components/Navbar"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useEffect, useRef } from "react"
import { fetchAnime } from "../features/anime/animeSlice"

const Lists = () => {
  const dispatch = useAppDispatch()
  const effectRan = useRef(false)

  const { isDarkMode } = useAppSelector((state) => state.global)
  const { currentUser } = useAppSelector((state) => state.auth)
  const { series, movies, fetchAnimeStatus, fetchAnimeError } = useAppSelector(
    (state) => state.anime
  )

  useEffect(() => {
    if (effectRan.current === false) {
      if (currentUser) {
        dispatch(fetchAnime(currentUser.uid))
      }

      return () => {
        effectRan.current = true
      }
    }
  }, [series, movies, dispatch, currentUser])

  const setStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return ""
      case "watching":
        return "text-green-700"
      case "caught up":
        return "text-indigo-700"
      case "not caught up":
        return "text-red-700"
    }
  }

  return (
    <>
      <Navbar />
      <main className={`${isDarkMode ? "bg-161616" : "bg-f3eed9"} h-screen`}>
        <div className="row">
          <div
            className={`${
              isDarkMode ? "text-white" : "text-black"
            } container min-h-screen relative`}
          >
            <h1 className="mt-8 text-left px-5 text-2xl underline underline-offset-4 font-medium tracking-wider">
              Anime
            </h1>
            <h2 className="mt-4 text-left px-5 text-lg underline underline-offset-4 font-medium tracking-wider">
              Series
            </h2>
            <ol className="text-left px-9 list-decimal">
              {series.map((show) => (
                <li className={`${setStatusColor(show.status)}`} key={show.id}>
                  {show.name}
                </li>
              ))}
            </ol>
            <h2 className="mt-4 text-left px-5 text-lg underline underline-offset-4 font-medium tracking-wider">
              Movies
            </h2>
            <ol className="text-left px-9 list-decimal">
              {movies.map((movie) => (
                <li key={movie.id}>{movie.name}</li>
              ))}
            </ol>
          </div>
        </div>
      </main>
    </>
  )
}

export default Lists
