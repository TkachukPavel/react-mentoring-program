import { MovieResponse } from "@/types/movie"
import axios from "axios"

export const getMovie = (
  id: string,
): { controller: AbortController; response: Promise<MovieResponse> } => {
  const controller = new AbortController()

  const response = axios
    .get<MovieResponse>(`http://localhost:4000/movies/${id}`, {
      signal: controller.signal,
    })
    .then((res) => res.data)
  return { controller, response }
}
