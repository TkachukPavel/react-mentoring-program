import { useEffect, useRef, useState } from "react"

export const useFormattedInput = (
  formatter: (v: string) => string,
  initValue?: string,
) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState(initValue ?? "")

  const formattedValue = formatter(value)

  useEffect(() => {
    if (!inputRef.current) return

    const el = inputRef.current

    const onFocus = () => setIsFocused(true)
    const onBlur = () => setIsFocused(false)
    const onChange: EventListener = () =>
      setValue(inputRef.current?.value ?? "")

    el.addEventListener("focus", onFocus)
    el.addEventListener("blur", onBlur)
    el.addEventListener("change", onChange)

    return () => {
      el.removeEventListener("focus", onFocus)
      el.removeEventListener("change", onChange)
      el.removeEventListener("blur", onBlur)
    }
  }, [])

  useEffect(() => {
    if (!inputRef.current) return

    inputRef.current.value = isFocused ? value : formattedValue
  }, [isFocused, formattedValue, value])

  return [inputRef, formattedValue, value] as const
}
