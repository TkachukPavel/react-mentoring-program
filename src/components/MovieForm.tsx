import { genres } from "@/data/genres"
import { useFormattedInput } from "@/hooks/useFormatDuration"
import { useKeepInputInRange } from "@/hooks/useKeepInputInRange"
import { useOnlyAllowPattern } from "@/hooks/useOnlyAllowPattern"
import { Movie } from "@/types/movie"
import formatDuration from "@/utils/formatDuration"
import { ChangeEvent, HTMLProps } from "react"
import { useController, UseControllerProps, useForm } from "react-hook-form"

export const MovieForm = (props: {
  movie?: Movie
  onSubmit: (movie: Movie) => void
  className?: string
}) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<MovieFormValues>({ values: props.movie, mode: "onBlur" })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.onSubmit(
      Object.fromEntries(new FormData(e.currentTarget)) as unknown as Movie,
    )
  }

  return (
    <form
      className={`font-montserrat min-w-[820px] ${props.className}`}
      onSubmit={handleSubmit}>
      <div className="w-full grid-cols-3 gap-6 sm:grid">
        <Field className="col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            {...register("title", {
              required: { value: true, message: "Title is required" },
            })}
          />
          <ErrorMessage message={errors.title?.message} />
        </Field>

        <Field>
          <Label htmlFor="release_date">release Date</Label>
          <Input
            type="date"
            id="release_date"
            placeholder="Select Date"
            {...register("release_date")}
          />
        </Field>

        <Field className="col-span-2 ">
          <Label htmlFor="poster_path">movie Url</Label>
          <Input
            type="text"
            id="poster_path"
            placeholder="https://"
            {...register("poster_path", {
              required: true,
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i,
                message: "Invalid URL",
              },
            })}
          />
        </Field>

        <Field>
          <Label htmlFor="vote_average">rating</Label>
          <RatingInput
            control={control}
            name={"vote_average"}
          />
        </Field>

        <Field className="col-span-2">
          <Label htmlFor="genres">genre</Label>
          <Select
            id="genres"
            {...register("genres", {
              setValueAs: (v) => [v],
              required: true,
            })}>
            {genres.map((genre) => (
              <option
                key={genre}
                value={genre}>
                {genre}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label htmlFor="runtime">runtime</Label>
          <RuntimeInput
            control={control}
            name={"runtime"}
            rules={{ required: true }}
          />
        </Field>

        <Field className="col-span-3">
          <Label htmlFor="overview">overview</Label>
          <Textarea
            id="overview"
            {...register("overview", {
              required: true,
            })}
          />
        </Field>
      </div>

      <div className="w-full flex justify-end mt-12">
        <Button
          type="reset"
          className=" text-red-400 border-red-400 border bg-transparent">
          reset
        </Button>

        <Button
          type="submit"
          className=" text-white bg-red-400  ml-3 ">
          submit
        </Button>
      </div>

      <div className="mt-2 text-white">{JSON.stringify(watch(), null, 3)}</div>
    </form>
  )
}

//* HELPERS
//
//
//
// **/

type MovieFormValues = Pick<
  Movie,
  | "title"
  | "genres"
  | "release_date"
  | "vote_average"
  | "runtime"
  | "overview"
  | "poster_path"
>

const ErrorMessage = (props: { message?: string }) => {
  if (!props.message) {
    return null
  }
  return <div className="text-red-500 text-xs mt-1">{props.message}</div>
}

const Button = (
  props: HTMLProps<HTMLButtonElement> & { type: "reset" | "submit" | "button" },
) => (
  <button
    {...props}
    className={`uppercase rounded py-3 px-12 cursor-pointer ${props.className}`}>
    {props.children}
  </button>
)

const Label = (props: HTMLProps<HTMLLabelElement>) => (
  <label
    {...props}
    className={`uppercase text-red-400 text-xs font-semibold opacity-80 ${props.className}`}>
    {props.children}
  </label>
)

const Input = (props: HTMLProps<HTMLInputElement>) => (
  <input
    {...props}
    className={`mt-2.5 rounded-none border-none! bg-neutral-700 p-3.5 font-montserrat text-white opacity-80 ${props.className}`}
    data-testid={props.id}
  />
)

const Field = (props: HTMLProps<HTMLDivElement>) => (
  <div
    {...props}
    className={`mt-4 flex flex-col sm:mt-0 ${props.className}`}>
    {props.children}
  </div>
)

const Select = (props: HTMLProps<HTMLSelectElement>) => (
  <select
    {...props}
    className={`mt-2.5 rounded-none border-none! bg-neutral-700 p-3.5 font-montserrat text-white opacity-80 ${props.className}`}
    data-testid={props.id}>
    {props.children}
  </select>
)

const Textarea = (props: HTMLProps<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className={`mt-2.5 rounded-none border-none! bg-neutral-700 p-3.5 font-montserrat text-white opacity-80 ${props.className}`}
    data-testid={props.id}
  />
)

const RuntimeInput = (
  props: HTMLProps<HTMLInputElement> & UseControllerProps<MovieFormValues>,
) => {
  const [inputRef] = useFormattedInput((v) => formatDuration(+v))
  const {
    field: { ref, onChange, value, ...rest },
  } = useController(props)

  return (
    <Input
      {...rest}
      type="text"
      id="runtime"
      placeholder="minutes"
      value={value || ""}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onChange(+e.target.value || null)
      }
      ref={(node) => {
        ref(node)
        inputRef.current = node
      }}
    />
  )
}

const RatingInput = (
  props: HTMLProps<HTMLInputElement> & UseControllerProps<MovieFormValues>,
) => {
  const patternRef = useOnlyAllowPattern(/^((\d*)|(\d+\.\d*))$/)
  const rangeRef = useKeepInputInRange({ min: 0, max: 10, fractionDigits: 1 })
  const {
    field: { ref, onBlur, onChange, ...rest },
  } = useController(props)

  return (
    <Input
      {...rest}
      type="text"
      id="vote_average"
      placeholder="7.8"
      onChange={onChange}
      onBlur={(e) => {
        onChange(+e.target.value || null)
        onBlur()
      }}
      ref={(node) => {
        ref(node)
        patternRef.current = node
        rangeRef.current = node
      }}
    />
  )
}
