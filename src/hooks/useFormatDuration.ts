import { useEffect, useRef, useState } from "react"

export const useFormattedInput = (formatter: (v: string) => string) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState("")

  const formattedValue = formatter(value)

  useEffect(() => {
    if (!inputRef.current) return

    const el = inputRef.current

    setValue(inputRef.current.value)
    const onFocus = () => setIsFocused(true)
    const onBlur = () => setIsFocused(false)
    const onChange: EventListener = () =>
      setValue(inputRef.current?.value ?? "")

    el.addEventListener("focus", onFocus)
    el.addEventListener("change", onChange)
    el.addEventListener("blur", onBlur)

    return () => {
      el.removeEventListener("focus", onFocus)
      el.removeEventListener("change", onChange)
      el.removeEventListener("blur", onBlur)
    }
  }, [])

  useEffect(() => {
    if (!inputRef.current) return

    inputRef.current.value = isFocused ? value : formattedValue
  }, [formattedValue, isFocused, value])

  return [inputRef, formattedValue, value] as const
}
