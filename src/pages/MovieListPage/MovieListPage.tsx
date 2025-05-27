import { useGetMovies } from "@/api/queries"
import { GenreSelect } from "@/components/GenreSelect"
import { MovieTile } from "@/components/MovieTile"
import { SortControl, SortOptions } from "@/components/SortControl"
import { genres } from "@/data/genres"
import { Genre } from "@/types/genre"
import { Outlet, useNavigate, useSearchParams } from "react-router-dom"

export const MovieListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const naviagate = useNavigate()

  const query = (searchParams.get("query") as Genre) ?? ""
  const sortBy = (searchParams.get("sortBy") as SortOptions) ?? "title"
  const genre = (searchParams.get("genre") as Genre) ?? "All"

  const { data: movies } = useGetMovies({ query, sortBy, genre })

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

  return (
    <>
      <div className="bg-neutral-800 pb-8 min-h-screen font-montserrat">
        <Outlet />

        <div className="mx-16">
          <div className="flex justify-between mt-6 border-neutral-700 border-b-2">
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
            className="mt-6 text-white"
            data-testid="total-movies">
            <span className="font-bold">{movies?.totalAmount}</span> movie(s)
            found
          </div>

          <div
            className="gap-6 grid lg:grid-cols-3 xl:grid-cols-4 mt-7"
            data-testid="movie-list">
            {movies?.data?.map((movie) => (
              <MovieTile
                key={movie.id}
                movie={movie}
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
