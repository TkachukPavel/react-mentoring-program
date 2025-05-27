import { useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Movie, MovieId } from "@/types/movie"
import { Menu } from "@/components/Menu"
import { useDeleteMovie } from "@/api/queries"

export const MovieTile = (props: {
  movie: Movie
  className?: string

  onClick: () => void
}) => {
  const [isTileHover, setIsTileHover] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = useParams<{ movieid?: string }>()

  const releaseYear = new Date(props.movie.release_date ?? 0).getFullYear()

  const mutation = useDeleteMovie()

  const handleDelete = (id: MovieId) => {
    mutation.mutate(id, {
      onSuccess: () => {
        if (parseInt(params?.movieid ?? "") === props.movie?.id) {
          navigate(`../?${searchParams.toString()}`)
        }
      },
    })
  }

  return (
    <div
      data-testid="movie-tile"
      className={`relative flex w-64 flex-col items-center font-montserrat cursor-pointer ${props.className}`}
      onClick={props.onClick}
      onMouseOver={() => setIsTileHover(true)}
      onMouseOut={() => setIsTileHover(false)}>
      <img
        src={props.movie.poster_path}
        alt={props.movie.title}
        className="bg-neutral-700 w-64 h-96 text-white"
      />
      {isTileHover && (
        <Menu
          className="top-3 right-3 absolute"
          menuItems={[
            {
              label: "Edit",
              action: () => {
                navigate(`${props.movie.id}/edit`)
              },
            },
            { label: "Delete", action: () => handleDelete(props.movie.id) },
          ]}
        />
      )}
      <div className="flex flex-row justify-between items-center opacity-70 mt-4 w-full max-w-full text-white">
        <div className="break-words text-wrap">{props.movie.title}</div>
        <div className="ml-2 px-2 py-1 border border-gray-500 rounded text-xs">
          {releaseYear}
        </div>
      </div>
      <div className="opacity-50 mt-2 w-full text-white text-xs">
        {props.movie.genres.join(", ")}{" "}
      </div>
    </div>
  )
}
