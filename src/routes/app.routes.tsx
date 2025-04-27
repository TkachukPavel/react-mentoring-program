import { MovieListPage } from "@/pages/MovieListPage/MovieListPage"
import { MovieDetailsView } from "@/pages/MovieListPage/views/MovieDetailsView"
import { SearchFormView } from "@/pages/MovieListPage/views/SearchForm.View"
import { createBrowserRouter } from "react-router-dom"

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MovieListPage />,
    children: [
      { index: true, element: <SearchFormView /> },
      { path: ":movieid", element: <MovieDetailsView /> },
    ],
  },
])
