import axios from "axios"
import { MoviesResponse } from "@/types/movie"

export const getMovies = (params: {
  query: string
  sortBy: string
  genre: string
}): { controller: AbortController; response: Promise<MoviesResponse> } => {
  const controller = new AbortController()
  const genreParam = params.genre === "All" ? "" : `&filter=${params.genre}`
  const sortOrder = params.sortBy === "title" ? "asc" : "desc"
  const response = axios
    .get<MoviesResponse>(
      `http://localhost:4000/movies?search=${params.query}&sortBy=${params.sortBy}&sortOrder=${sortOrder}&searchBy=title${genreParam}`,
      { signal: controller.signal },
    )
    .then((res) => res.data)
  return { controller, response }
}
