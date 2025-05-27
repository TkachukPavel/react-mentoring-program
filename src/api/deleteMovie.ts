import { MovieId } from "@/types/movie"
import axios from "axios"

export const deleteMovie = (id: MovieId) => {
  return axios.delete(`http://localhost:4000/movies/${id}`)
}
