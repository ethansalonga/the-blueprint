import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "../../firebase/init"
import { Anime } from "../../types/types"

interface InitialStateType {
  series: Anime[]
  movies: Anime[]
  fetchAnimeStatus: string
  fetchAnimeError: string
}

const initialState: InitialStateType = {
  series: [],
  movies: [],
  fetchAnimeStatus: "",
  fetchAnimeError: "",
}

export const fetchAnime = createAsyncThunk(
  "anime/fetchAnime",
  async (uid: string) => {
    try {
      const animeRef = collection(db, "anime")
      const q = query(
        animeRef,
        orderBy("createdAt", "asc"),
        where("userRef", "==", uid)
      )
      const querySnap = await getDocs(q)

      let series: Anime[] = []
      let movies: Anime[] = []

      querySnap.forEach((doc) => {
        const { name, type, status, userRef, createdAt } = doc.data()
        if (type === "series") {
          series.push({
            id: doc.id,
            name,
            type,
            status,
            userRef,
            createdAt,
          })
        }

        if (type === "movie") {
          movies.push({
            id: doc.id,
            name,
            type,
            status,
            userRef,
            createdAt,
          })
        }
      })

      return { series, movies }
    } catch (err) {
      console.log(err)
    }
  }
)

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAnime.pending, (state) => {
        state.fetchAnimeStatus = "loading"
      })
      .addCase(fetchAnime.fulfilled, (state, action) => {
        state.fetchAnimeStatus = "succeeded"
        state.series = action.payload!.series
        state.movies = action.payload!.movies
      })
      .addCase(fetchAnime.rejected, (state, action) => {
        state.fetchAnimeStatus = "failed"
        state.fetchAnimeError = action.error.message || ""
      })
  },
})

export const {} = animeSlice.actions

export default animeSlice.reducer
