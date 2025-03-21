import { useState } from "react"
import { Menu } from "./Menu"

type Props = {
  imageUrl: string
  movieName: string
  releaseYear: number
  genres: string[]

  onClick: () => void
}

export const MovieTile = ({
  imageUrl,
  movieName,
  releaseYear,
  genres,
  onClick,
}: Props) => {
  const [isTileHover, setIsTileHover] = useState(false)

  return (
    <div
      className="relative flex w-64 flex-col items-center"
      onClick={onClick}
      onMouseOver={() => setIsTileHover(true)}
      onMouseOut={() => setIsTileHover(false)}
    >
      <img
        src={imageUrl}
        alt={movieName}
        className="h-96 w-64"
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
        <div className="text-wrap break-words">{movieName}</div>
        <div className="ml-2 rounded border border-gray-500 px-2 py-1 text-xs">
          {releaseYear}
        </div>
      </div>
      <div className="mt-2 w-full text-xs text-white opacity-50">
        {genres.join(", ")}{" "}
      </div>
    </div>
  )
}
