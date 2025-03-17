import { useState } from "react"
import { Genre } from "@/types/genre"
import clsx from "clsx"

type Props = {
  genres: Genre[]
  selectedGenre: Genre
  onSelect: (genre: Genre) => void
}

export const GenreSelect = ({ selectedGenre, onSelect, genres }: Props) => {
  const [currentGenre, setCurrentGenre] = useState<Genre>(selectedGenre)

  const handleSelect = (genre: Genre) => {
    setCurrentGenre(genre)
    onSelect(genre)
  }
  return (
    <div className="flex flex-row border-b-2 border-gray-700">
      {genres.map((genre) => (
        <button
          type="button"
          className={clsx(
            "mr-8 -mb-[2px] cursor-pointer border-b-2 border-b-transparent px-1 pb-4 text-sm text-white uppercase last:mr-0 hover:border-rose-400",
            {
              "border-rose-400!": genre === currentGenre,
            },
          )}
          key={genre}
          onClick={() => handleSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}
