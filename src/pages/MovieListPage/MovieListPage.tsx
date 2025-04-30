import { getMovies } from "@/api/getMovies"
import { GenreSelect } from "@/components/GenreSelect"
import { MovieTile } from "@/components/MovieTile"
import { SortControl, SortOptions } from "@/components/SortControl"
import { genres } from "@/data/genres"
import { Genre } from "@/types/genre"
import { Movie } from "@/types/movie"
import axios from "axios"
import { useEffect, useState } from "react"
import { Outlet, useNavigate, useSearchParams } from "react-router-dom"

export const MovieListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [totalMovies, setTotalMovies] = useState<number>(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const naviagate = useNavigate()

  const query = (searchParams.get("query") as Genre) ?? ""
  const sortBy = (searchParams.get("sortBy") as SortOptions) ?? "title"
  const genre = (searchParams.get("genre") as Genre) ?? "All"

  const handleSearchParams = (params: {
    sortBy?: SortOptions
    genre?: Genre
  }) => {
    const newParams = new URLSearchParams(searchParams)

    if (params.sortBy !== undefined) {
      newParams.set("sortBy", params.sortBy)
    }

    if (params.genre !== undefined) {
      newParams.set("genre", params.genre)
    }

    setSearchParams(newParams)
  }

  useEffect(() => {
    // Create a new controller for each effect execution (parameter change)
    const { controller, response } = getMovies({ query, sortBy, genre })

    response
      .then((data) => {
        setMovies(data.data)
        setTotalMovies(data.totalAmount)
      })
      .catch((error) => {
        // Only log errors that aren't from cancellation
        if (axios.isCancel(error)) return

        console.error("Error fetching movies:", error)
      })

    // Cleanup function that runs when dependencies change or component unmounts
    return () => {
      controller.abort() // Cancel the request
    }
  }, [query, sortBy, genre])

  return (
    <>
      <div className="bg-neutral-800 font-montserrat min-h-screen pb-8">
        <Outlet />

        <div className="mx-16">
          <div className="mt-6 flex justify-between border-b-2 border-neutral-700 ">
            <GenreSelect
              genres={genres}
              className="-mb-0.5"
              selectedGenre={genre}
              onSelect={(genre) => handleSearchParams({ genre })}
            />
            <SortControl
              selection={sortBy}
              onSelectionChange={(sortBy) => handleSearchParams({ sortBy })}
            />
          </div>

          <div
            className="text-white mt-6"
            data-testid="total-movies">
            <span className="font-bold">{totalMovies}</span> movie(s) found
          </div>

          <div
            className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-7"
            data-testid="movie-list">
            {movies.map((movie) => (
              <MovieTile
                key={movie.id}
                imageUrl={movie.poster_path}
                movieName={movie.title}
                genres={movie.genres}
                releaseYear={new Date(movie.release_date!).getFullYear()}
                className="hover:scale-105 transition-transform duration-200"
                onClick={() =>
                  naviagate({
                    pathname: `${movie.id}`,
                    search: searchParams.toString(),
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
