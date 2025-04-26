import { useState } from "react"
import { Menu } from "./Menu"

export const MovieTile = (props: {
  imageUrl: string
  movieName: string
  releaseYear: number
  genres: string[]
  className?: string

  onClick: () => void
}) => {
  const [isTileHover, setIsTileHover] = useState(false)

  return (
    <div
      className={`relative flex w-64 flex-col items-center font-montserrat cursor-pointer ${props.className}`}
      onClick={props.onClick}
      onMouseOver={() => setIsTileHover(true)}
      onMouseOut={() => setIsTileHover(false)}>
      <img
        src={props.imageUrl}
        alt={props.movieName}
        className="h-96 w-64 text-white "
      />
      {isTileHover && (
        <Menu
          className="absolute top-3 right-3"
          menuItems={[
            { label: "Edit", action: () => {} },
            { label: "Delete", action: () => {} },
          ]}
        />
      )}
      <div className="mt-4 flex w-full max-w-full flex-row items-center justify-between text-white opacity-70">
        <div className="text-wrap break-words">{props.movieName}</div>
        <div className="ml-2 rounded border border-gray-500 px-2 py-1 text-xs">
          {props.releaseYear}
        </div>
      </div>
      <div className="mt-2 w-full text-xs text-white opacity-50">
        {props.genres.join(", ")}{" "}
      </div>
    </div>
  )
}
