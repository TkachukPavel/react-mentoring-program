import formatDuration from "@/utils/formatDuration"

export const MovieDetails = (props: {
  imageUrl: string
  movieName: string
  releaseYear: number
  rating: number
  duration: number
  description: string
  genres: string[]
  className?: string
}) => {
  return (
    <div className={`flex flex-row font-light text-white ${props.className}`}>
      <img
        src={props.imageUrl}
        alt={props.movieName}
        className="h-96 w-64"
      />
      <div className="ml-12 flex flex-col">
        <div className="flex flex-row items-center">
          <div className="text-3xl tracking-widest uppercase">
            {props.movieName}
          </div>
          <div className="ml-5 rounded-full border border-white p-3">
            {props.rating}
          </div>
        </div>
        <div className="mt-2 text-xs font-normal opacity-50">
          {props.genres.join(", ")}
        </div>
        <div className="mt-6 flex flex-row text-lg text-red-400">
          <div>{props.releaseYear}</div>
          <div className="ml-10">{formatDuration(props.duration)}</div>
        </div>
        <div className="mt-6 opacity-50">{props.description}</div>
      </div>
    </div>
  )
}
