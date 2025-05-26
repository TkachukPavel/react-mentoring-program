import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Movie } from "@/types/movie"
import { Menu } from "@/components/Menu"

export const MovieTile = (props: {
  movie: Movie
  className?: string

  onClick: () => void
}) => {
  const [isTileHover, setIsTileHover] = useState(false)
  const navigate = useNavigate()

  const releaseYear = new Date(props.movie.release_date ?? 0).getFullYear()

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
        className="h-96 w-64 text-white bg-neutral-700 "
      />
      {isTileHover && (
        <Menu
          className="absolute top-3 right-3"
          menuItems={[
            {
              label: "Edit",
              action: () => {
                navigate(`${props.movie.id}/edit`)
              },
            },
            { label: "Delete", action: () => {} },
          ]}
        />
      )}
      <div className="mt-4 flex w-full max-w-full flex-row items-center justify-between text-white opacity-70">
        <div className="text-wrap break-words">{props.movie.title}</div>
        <div className="ml-2 rounded border border-gray-500 px-2 py-1 text-xs">
          {releaseYear}
        </div>
      </div>
      <div className="mt-2 w-full text-xs text-white opacity-50">
        {props.movie.genres.join(", ")}{" "}
      </div>
    </div>
  )
}
