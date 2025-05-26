import { AddMovieDialog } from "@/components/AddMovieDialog"
import { EditMovieDialog } from "@/components/EditMovieDialog"
import { MovieListPage } from "@/pages/MovieListPage/MovieListPage"
import { MovieDetailsView } from "@/pages/MovieListPage/views/MovieDetailsView"
import { SearchFormView } from "@/pages/MovieListPage/views/SearchForm.View"
import { createBrowserRouter, Params } from "react-router-dom"
import { getMovie } from "@/api/getMovie" // Import the getMovie function
import { MovieResponse } from "@/types/movie" // Import MovieResponse type

// Loader function to fetch movie details
export const movieLoader = async ({
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
  try {
    const movie = await getMovie(movieId)
    return { movie }
  } catch (error) {
    // Log the error for debugging
    console.error("Failed to load movie:", error)
    // You can customize the error response based on the error type
    throw new Response("Error loading movie", { status: 500 })
  }
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
        loader: movieLoader, // Use the movieLoader here
        children: [{ path: "edit", element: <EditMovieDialog /> }],
      },
    ],
  },
])
