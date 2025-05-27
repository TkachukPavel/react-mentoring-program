import { Movie } from "@/types/movie"
import axios from "axios"

export const updateMovie = (movie: Partial<Movie>) => {
  return axios.put<Movie>("http://localhost:4000/movies", movie)
}
