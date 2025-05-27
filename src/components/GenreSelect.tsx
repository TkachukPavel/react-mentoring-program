import { useState } from "react"
import { Genre } from "@/types/genre"
import clsx from "clsx"

export const GenreSelect = (props: {
  genres: Genre[]
  selectedGenre: Genre
  onSelect: (genre: Genre) => void
  className?: string
}) => {
  const [currentGenre, setCurrentGenre] = useState<Genre>(props.selectedGenre)

  const handleSelect = (genre: Genre) => {
    setCurrentGenre(genre)
    props.onSelect(genre)
  }
  return (
    <div
      data-testid="genre-select"
      className={`flex flex-row border-b-2 border-neutral-700 font-montserrat ${props.className}`}>
      {props.genres.map((genre) => (
        <button
          type="button"
          className={clsx(
            "mr-8 last:mr-0 -mb-[2px] px-1 pb-4 hover:border-rose-400 border-b-2 border-b-transparent text-white text-sm uppercase cursor-pointer",
            {
              "border-rose-400!": genre === currentGenre,
            },
          )}
          key={genre}
          onClick={() => handleSelect(genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}
