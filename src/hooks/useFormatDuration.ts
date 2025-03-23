import { useEffect, useState } from "react"

export const useFormattedInput = (
  inputRef: React.RefObject<HTMLInputElement | null>,
  formatter: (v: string) => string,
) => {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState("")

  const formattedValue = formatter(value)

  useEffect(() => {
    if (!inputRef.current) return

    setValue(inputRef.current.value)
    const onFocus = () => setIsFocused(true)
    const onBlur = () => setIsFocused(false)
    const onChange: EventListener = () =>
      setValue(inputRef.current?.value ?? "")

    inputRef.current.addEventListener("focus", onFocus)
    inputRef.current.addEventListener("change", onChange)
    inputRef.current.addEventListener("blur", onBlur)

    return () => {
      inputRef.current?.removeEventListener("focus", onFocus)
      inputRef.current?.removeEventListener("change", onChange)
      inputRef.current?.removeEventListener("blur", onBlur)
    }
  }, [])

  useEffect(() => {
    if (!inputRef.current) return

    inputRef.current.value = isFocused ? value : formattedValue
  }, [isFocused, value])
}
