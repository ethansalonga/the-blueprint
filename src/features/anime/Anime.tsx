import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useEffect, useRef } from "react"
import { fetchAnime } from "./animeSlice"

const Anime = () => {
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
      <div className="text-left px-5 mt-4">
        <p
          className={`font-medium ${isDarkMode ? "text-white" : "text-black"}`}
        >
          Completed
        </p>
        <p className="font-medium text-green-700">Currently watching</p>
        <p className="font-medium text-indigo-700">Caught up</p>
        <p className="font-medium text-red-700">Not caught up</p>
      </div>
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
    </>
  )
}
export default Anime
