import { MovieResponse } from "@/types/movie"
import axios from "axios"

export const getMovie = (id: string): Promise<MovieResponse> => {
  return axios
    .get<MovieResponse>(`http://localhost:4000/movies/${id}`)
    .then((res) => res.data)
}
