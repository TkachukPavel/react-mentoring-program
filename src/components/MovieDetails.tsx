import formatDuration from "../utils/formatDuration"

type Props = {
  imageUrl: string
  movieName: string
  releaseYear: number
  rating: number
  duration: number
  description: string
  genres: string[]
}

export default function MovieDetails({
  imageUrl,
  movieName,
  releaseYear,
  rating,
  duration,
  description,
  genres,
}: Props) {
  return (
    <div className="flex flex-row font-light text-white">
      <img
        src={imageUrl}
        alt={movieName}
        className="h-96 w-64"
      />
      <div className="ml-12 flex flex-col">
        <div className="flex flex-row items-center">
          <div className="text-3xl tracking-widest uppercase">{movieName}</div>
          <div className="ml-5 rounded-full border border-white p-3">
            {rating}
          </div>
        </div>
        <div className="mt-2 text-xs font-normal opacity-50">
          {genres.join(", ")}
        </div>
        <div className="mt-6 flex flex-row text-lg text-red-400">
          <div>{releaseYear}</div>
          <div className="ml-10">{formatDuration(duration)}</div>
        </div>
        <div className="mt-6 opacity-50">{description}</div>
      </div>
    </div>
  )
}
