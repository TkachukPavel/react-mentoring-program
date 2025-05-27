import axios, { GenericAbortSignal } from "axios"
import { MoviesResponse } from "@/types/movie"

export type GetMoviesQueryParams = {
  query: string
  sortBy: string
  genre: string
}

export const getMovies = (
  params: GetMoviesQueryParams & { signal: GenericAbortSignal },
) => {
  const genreParam = params.genre === "All" ? "" : `&filter=${params.genre}`
  const sortOrder = params.sortBy === "title" ? "asc" : "desc"
  const response = axios
    .get<MoviesResponse>(
      `http://localhost:4000/movies?search=${params.query}&sortBy=${params.sortBy}&sortOrder=${sortOrder}&searchBy=title${genreParam}`,
      { signal: params.signal },
    )
    .then((res) => res.data)
  return { response }
}
