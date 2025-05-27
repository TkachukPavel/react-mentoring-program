import { AddMovieDialog } from "@/components/AddMovieDialog"
import { EditMovieDialog } from "@/components/EditMovieDialog"
import { MovieListPage } from "@/pages/MovieListPage/MovieListPage"
import { MovieDetailsView } from "@/pages/MovieListPage/views/MovieDetailsView"
import { SearchFormView } from "@/pages/MovieListPage/views/SearchForm.View"
import { createBrowserRouter, Params } from "react-router-dom"
import { getMovie } from "@/api/getMovie"
import { MovieResponse } from "@/types/movie"

export const movieLoader = ({
  params,
}: {
  params: Params<"movieid">
}): Promise<{ movie: MovieResponse }> => {
  const movieId = params.movieid
  if (!movieId) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Movie ID is missing",
    })
  }

  return getMovie(movieId)
    .then((movie) => ({ movie }))
    .catch((error) => {
      console.error("Failed to load movie:", error)
      throw new Response("Error loading movie", { status: 500 })
    })
}

export const appRoutes = createBrowserRouter([
  {
    element: <MovieListPage />,
    children: [
      {
        path: "",
        element: <SearchFormView />,
        children: [{ path: "new", element: <AddMovieDialog /> }],
      },
      {
        path: ":movieid",
        id: "movie",
        element: <MovieDetailsView />,
        loader: movieLoader,
        children: [{ path: "edit", element: <EditMovieDialog /> }],
      },
    ],
  },
])
