import { genres } from "@/data/genres"
import { useFormattedInput } from "@/hooks/useFormatDuration"
import { useKeepInputInRange } from "@/hooks/useKeepInputInRange"
import { useOnlyAllowPattern } from "@/hooks/useOnlyAllowPattern"
import formatDuration from "@/utils/formatDuration"
import { useRef } from "react"

type Props = {
  mode: Mode
}

type Mode = "add" | "edit"

const labelClass = "uppercase  text-red-400 text-xs font-semibold opacity-80"
const inputClass =
  "mt-2.5 rounded-none border-none! bg-neutral-700 p-3.5 font-montserrat text-white opacity-80"

const formatRuntime = (v: string) => (v === "" ? "" : formatDuration(+v))

export const MovieForm = ({ mode }: Props) => {
  const runtimeInputRef = useRef<HTMLInputElement>(null)
  useOnlyAllowPattern(runtimeInputRef, /^\d*$/)
  useFormattedInput(runtimeInputRef, formatRuntime)

  const ratingInputRef = useRef<HTMLInputElement>(null)
  useOnlyAllowPattern(ratingInputRef, /^((\d*)|(\d+\.\d*))$/)
  useKeepInputInRange(ratingInputRef, { max: 10, min: 0, fractionDigits: 1 })

  return (
    <div>
      <div className="mb-8 font-montserrat text-3xl font-light tracking-widest text-white uppercase">
        {mode} movie
      </div>
      <form>
        <div className="w-full grid-cols-3 gap-6 sm:grid">
          <div className="col-span-2 mt-4 flex flex-col first:mt-0">
            <label
              htmlFor="title"
              className={labelClass}
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={inputClass}
            />
          </div>
          <div className="mt-4 flex flex-col sm:mt-0">
            <label
              htmlFor="releaseDate"
              className={labelClass}
            >
              release Date
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              placeholder="Select Date"
              className={inputClass}
            />
          </div>
          <div className="col-span-2 mt-4 flex flex-col sm:mt-0">
            <label
              htmlFor="movieUrl"
              className={`${labelClass} `}
            >
              movie Url
            </label>
            <input
              type="text"
              id="movieUrl"
              name="movieUrl"
              placeholder="https://"
              className={inputClass}
            />
          </div>
          <div className="mt-4 flex flex-col sm:mt-0">
            <label
              htmlFor="rating"
              className={labelClass}
            >
              rating
            </label>
            <input
              ref={ratingInputRef}
              type="text"
              id="rating"
              name="rating"
              placeholder="7.8"
              className={inputClass}
            />
          </div>
          <div className="col-span-2 mt-4 flex flex-col sm:mt-0">
            <label
              htmlFor="genre"
              className={labelClass}
            >
              genre
            </label>
            <select className={inputClass}>
              {genres.map((genre) => (
                <option
                  key={genre}
                  value={genre}
                >
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex flex-col sm:mt-0">
            <label
              htmlFor="runtime"
              className={labelClass}
            >
              runtime
            </label>
            <input
              type="text"
              id="runtime"
              name="runtime"
              ref={runtimeInputRef}
              placeholder="minutes"
              className={inputClass}
            />
          </div>
          <div className="col-span-3 mt-4 flex flex-col sm:mt-0">
            <label
              htmlFor="overview"
              className={labelClass}
            >
              overview
            </label>
            <textarea
              id="overview"
              name="overview"
              className={inputClass}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
