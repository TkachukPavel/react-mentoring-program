import { getMovie } from "@/api/getMovie"
import { LogoComponent } from "@/components/LogoComponent"
import { MovieDetails } from "@/components/MovieDetails"
import { Movie } from "@/types/movie"
import { useState, useEffect } from "react"
import { CiSearch } from "react-icons/ci"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"

export const MovieDetailsView = () => {
  const { movieid } = useParams<{ movieid: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [selectedMovie, setSelectedMovie] = useState<Movie>()

  useEffect(() => {
    if (!movieid) return

    const { controller, response } = getMovie(movieid)

    response
      .then((movie) => setSelectedMovie(movie))
      .catch((e) => {
        if (e.isCancel()) return

        console.log("Error while fetching a movie")
      })

    return () => {
      controller.abort()
    }
  }, [movieid])

  return (
    selectedMovie && (
      <div className="mx-16">
        <div className="flex justify-between pt-9 items-center">
          <LogoComponent />

          <button
            className="text-red-400 font-montserrat cursor-pointer"
            onClick={() =>
              navigate({ pathname: "/", search: searchParams.toString() })
            }>
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
    )
  )
}
