import { LogoComponent } from "@/components/LogoComponent"
import { MovieDetails } from "@/components/MovieDetails"
import { MovieLoaderData } from "@/types/movie"
import { useEffect, useRef } from "react"
import { CiSearch } from "react-icons/ci"
import {
  useNavigate,
  useSearchParams,
  Outlet,
  useLoaderData,
} from "react-router-dom"

export const MovieDetailsView = () => {
  const { movie: selectedMovie } = useLoaderData() as MovieLoaderData
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (detailsRef.current && selectedMovie) {
      detailsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [selectedMovie])

  return (
    <>
      <Outlet />
      {selectedMovie && (
        <div
          className="mx-16"
          ref={detailsRef}>
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
      )}
    </>
  )
}
