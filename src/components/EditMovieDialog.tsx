import { useNavigate, useRouteLoaderData } from "react-router-dom"
import { Dialog } from "./Dialog"
import { MovieForm } from "./MovieForm"
import { Movie, MovieLoaderData } from "@/types/movie"
import { useUpdateMovie } from "@/api/queries"

export const EditMovieDialog = () => {
  const navigate = useNavigate()
  const { movie } = useRouteLoaderData("movie") as MovieLoaderData
  const mutation = useUpdateMovie()

  const handleDialogClose = () => {
    navigate("../")
  }
  const handleFormSubmit = (nextMovie: Partial<Movie>) => {
    mutation.mutate(
      { ...movie, ...nextMovie },
      {
        onSuccess: () => {
          handleDialogClose()
        },
      },
    )
  }

  return (
    <Dialog
      title="Edit Movie"
      onClose={handleDialogClose}>
      <MovieForm
        movie={movie}
        onSubmit={handleFormSubmit}></MovieForm>
    </Dialog>
  )
}
