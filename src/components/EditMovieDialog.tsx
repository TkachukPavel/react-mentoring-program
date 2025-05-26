import { useNavigate, useRouteLoaderData } from "react-router-dom"
import { Dialog } from "./Dialog"
import { MovieForm } from "./MovieForm"
import { MovieLoaderData } from "@/types/movie"

export const EditMovieDialog = () => {
  const navigate = useNavigate()
  const { movie } = useRouteLoaderData("movie") as MovieLoaderData
  const handleDialogClose = () => {
    navigate("../")
  }
  const handleFormSubmit = () => {
    handleDialogClose()
  }

  console.log("EditMovieDialog", movie)
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
