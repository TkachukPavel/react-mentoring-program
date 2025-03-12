import { useState } from "react"
import { Genre } from "../types/genre"

type Props = {
  genres: Genre[]
  selectedGenre: Genre
  onSelect: (genre: Genre) => void
}

export default function GenreSelect({
  selectedGenre,
  onSelect,
  genres,
}: Props) {
  const [currentGenre, setCurrentGenre] = useState<Genre>(selectedGenre)
  return <></>
}
