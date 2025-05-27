import { Movie } from "@/types/movie"
import axios from "axios"

export const createMovie = (movie: Partial<Movie>) => {
  return axios.post<Movie>("http://localhost:4000/movies", movie)
}
