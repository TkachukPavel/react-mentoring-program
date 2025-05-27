import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMovie } from "./getMovie"
import { getMovies, GetMoviesQueryParams } from "./getMovies"
import { Movie, MovieId } from "@/types/movie"
import { createMovie } from "./createMovie"
import { deleteMovie } from "./deleteMovie"
import { useSearchParams } from "react-router-dom"
import { updateMovie } from "./updateMovie"

export const useGetMovie = (movieId: string) =>
  useQuery({
    queryKey: ["movie", movieId],
    queryFn: async () => await getMovie(movieId),
    enabled: !!movieId, // Only run the query if movieId is truthy
  })

export const useGetMovies = (params: GetMoviesQueryParams) =>
  useQuery({
    queryKey: ["movies", params],
    queryFn: async ({ signal }) =>
      await getMovies({ ...params, signal }).response,
  })

export const useCreateMovie = () => {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (movie: Partial<Movie>) => createMovie(movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies", searchParams] })
    },
  })
}

export const useDeleteMovie = () => {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (movieId: MovieId) => deleteMovie(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies", searchParams] })
    },
  })
}

export const useUpdateMovie = () => {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (movie: Partial<Movie>) => updateMovie(movie),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["movies", searchParams] })
      queryClient.invalidateQueries({ queryKey: ["movie", id] })
    },
  })
}
