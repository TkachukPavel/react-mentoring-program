import { useNavigate } from "react-router-dom"
import { Dialog } from "./Dialog"
import { MovieForm } from "./MovieForm"
import { Movie } from "@/types/movie"
import { useCreateMovie } from "@/api/queries"

export const AddMovieDialog = () => {
  const navigate = useNavigate()
  const mutation = useCreateMovie()

  const handleDialogClose = () => {
    navigate("../")
  }

  const handleFormSubmit = (movie: Partial<Movie>) => {
    mutation.mutate(movie, {
      onSuccess: ({ data }) => navigate(`../${data.id}`),
    })
  }
  return (
    <Dialog
      title="Add Movie"
      onClose={handleDialogClose}>
      <MovieForm onSubmit={handleFormSubmit}></MovieForm>
    </Dialog>
  )
}
