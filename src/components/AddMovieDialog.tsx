import { useNavigate } from "react-router-dom"
import { Dialog } from "./Dialog"
import { MovieForm } from "./MovieForm"

export const AddMovieDialog = () => {
  const navigate = useNavigate()
  const handleDialogClose = () => {
    navigate("../")
  }
  const handleFormSubmit = () => {
    handleDialogClose()
  }
  return (
    <Dialog
      title="Add Movie"
      onClose={handleDialogClose}>
      <MovieForm onSubmit={handleFormSubmit}></MovieForm>
    </Dialog>
  )
}
