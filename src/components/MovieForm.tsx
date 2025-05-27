import { genres } from "@/data/genres"
import { useFormattedInput } from "@/hooks/useFormatDuration"
import { useKeepInputInRange } from "@/hooks/useKeepInputInRange"
import { useOnlyAllowPattern } from "@/hooks/useOnlyAllowPattern"
import { Movie } from "@/types/movie"
import formatDuration from "@/utils/formatDuration"
import clsx from "clsx"
import { ChangeEvent, HTMLProps } from "react"
import {
  Controller,
  useController,
  UseControllerProps,
  useForm,
} from "react-hook-form"

export const MovieForm = (props: {
  movie?: Movie
  onSubmit: (movie: MovieFormValues) => void
  className?: string
}) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<MovieFormValues>({ values: props.movie, mode: "onBlur" })

  return (
    <form
      className={`font-montserrat min-w-[820px] ${props.className}`}
      onSubmit={handleSubmit((v) => props.onSubmit(v))}>
      <div className="gap-6 sm:grid grid-cols-3 w-full">
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

        <Field className="col-span-2">
          <Label htmlFor="poster_path">movie Url</Label>
          <Input
            type="text"
            id="poster_path"
            placeholder="https://"
            {...register("poster_path", {
              required: { value: true, message: "Poster URL is required" },
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i,
                message: "Invalid URL",
              },
            })}
          />
          <ErrorMessage message={errors.poster_path?.message} />
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
          <Controller
            control={control}
            name="genres"
            rules={{
              required: { value: true, message: "Please select a genre" },
            }}
            render={({ field: { onChange, value, ...rest } }) => (
              <Select
                {...rest}
                id="genres"
                value={value?.[0] ?? ""}
                {...register("genres", {
                  setValueAs: (v) => [v],
                  required: true,
                })}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  e.target.value && onChange([e.target.value])
                }>
                {genres.map((genre) => (
                  <option
                    key={genre}
                    value={genre}>
                    {genre}
                  </option>
                ))}
              </Select>
            )}
          />

          <ErrorMessage message={errors.genres?.message} />
        </Field>

        <Field>
          <Label htmlFor="runtime">runtime</Label>
          <RuntimeInput
            control={control}
            name={"runtime"}
            rules={{
              required: { value: true, message: `Please enter runtime` },
            }}
          />
          <ErrorMessage message={errors.runtime?.message} />
        </Field>

        <Field className="col-span-3">
          <Label htmlFor="overview">overview</Label>
          <Textarea
            id="overview"
            {...register("overview", {
              required: { value: true, message: "Overview is required" },
            })}
          />
          <ErrorMessage message={errors.overview?.message} />
        </Field>
      </div>

      <div className="flex justify-end mt-12 w-full">
        <Button
          type="reset"
          className="bg-transparent border border-red-400 text-red-400">
          reset
        </Button>

        <Button
          type="submit"
          disabled={!isValid}
          className={clsx("bg-red-400 ml-3 text-white", {
            "opacity-50 cursor-not-allowed!": !isValid,
          })}>
          submit
        </Button>
      </div>

      <div className="mt-2 text-white">{JSON.stringify(watch(), null, 3)}</div>
    </form>
  )
}

/*
 *--------------------------------------------------------------------
 *
 *  HELPERS
 *
 *---------------------------------------------------------------------
 */

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
  return <div className="mt-1 text-red-500 text-xs">{props.message}</div>
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
  const {
    field: { ref, onChange, value, ...rest },
  } = useController(props)

  const [inputRef] = useFormattedInput(
    (v) => formatDuration(!v ? undefined : +v),
    value?.toString(),
  )

  return (
    <Input
      {...rest}
      type="text"
      id="runtime"
      placeholder="minutes"
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onChange(+e.target.value || null)
      }
      value={inputRef.current?.value ?? ""}
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
