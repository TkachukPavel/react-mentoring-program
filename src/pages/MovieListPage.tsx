import { getMovies } from "@/api/getMovies"
import { GenreSelect } from "@/components/GenreSelect"
import { MovieDetails } from "@/components/MovieDetails"
import { MovieTile } from "@/components/MovieTile"
import { SearchForm } from "@/components/SearchForm"
import { SortControl, SortOptions } from "@/components/SortControl"
import { genres } from "@/data/genres"
import { Genre } from "@/types/genre"
import { Movie } from "@/types/movie"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { CiSearch } from "react-icons/ci"
export const MovieListPage = () => {
  const [query, setQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<SortOptions>("title")
  const [genre, setGenre] = useState<Genre>("All")
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [totalMovies, setTotalMovies] = useState<number>(0)
  const movieDescriptionRef = useRef<HTMLDivElement>(null)

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie)
    movieDescriptionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
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

  const logoComponent = (
    <button className="text-red-400 font-montserrat cursor-pointer">
      <span className="font-extrabold">netflix</span>
      <span className="font-medium">roulette</span>
    </button>
  )

  return (
    <>
      <div className="bg-neutral-800 font-montserrat min-h-screen pb-8">
        {selectedMovie ? (
          <div
            className="mx-16"
            ref={movieDescriptionRef}>
            <div className="flex justify-between pt-9 items-center">
              {logoComponent}

              <button
                className="text-red-400 font-montserrat cursor-pointer"
                onClick={() => setSelectedMovie(null)}>
                <CiSearch size={28} />
              </button>
            </div>
            <MovieDetails
              imageUrl={selectedMovie.poster_path}
              movieName={selectedMovie.title}
              releaseYear={new Date(selectedMovie.release_date!).getFullYear()}
              rating={selectedMovie.vote_average ?? 0}
              duration={selectedMovie.runtime}
              description={selectedMovie.overview}
              genres={selectedMovie.genres}
              className="mt-8"
            />
          </div>
        ) : (
          <div className="h-64 bg-cover bg-center bg-[url('@/assets/header-background.png')] relative flex flex-col">
            <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>

            <div className="z-10 flex justify-between mt-5 px-16">
              {logoComponent}

              <button
                type="button"
                className="uppercase rounded text-xl px-5 py-2.5 bg-neutral-500/65 font-montserrat cursor-pointer text-red-400 font-bold ">
                + Add movie
              </button>
            </div>
            <div
              className="
       relative z-10 p-4  self-center ">
              <label
                htmlFor="search-input"
                className="uppercase font-montserrat   text-white font-light text-5xl">
                FIND YOUR MOVIE
              </label>
              <SearchForm
                className="mt-8"
                initialQuery={query}
                onSearch={(q) => setQuery(q)}
                id="search-input"
              />
            </div>
          </div>
        )}

        <div className="mx-16">
          <div className="mt-6 flex justify-between border-b-2 border-neutral-700 ">
            <GenreSelect
              genres={genres}
              className="-mb-0.5"
              selectedGenre={genre}
              onSelect={(g) => setGenre(g)}
            />
            <SortControl
              selection={sortBy}
              onSelectionChange={(s) => setSortBy(s)}
            />
          </div>

          <div className="text-white mt-6">
            <span className="font-bold">{totalMovies}</span> movie(s) found
          </div>

          <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-7">
            {movies.map((movie) => (
              <MovieTile
                key={movie.id}
                imageUrl={movie.poster_path}
                movieName={movie.title}
                genres={movie.genres}
                releaseYear={new Date(movie.release_date!).getFullYear()}
                className="hover:scale-105 transition-transform duration-200"
                onClick={() => handleMovieSelect(movie)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
