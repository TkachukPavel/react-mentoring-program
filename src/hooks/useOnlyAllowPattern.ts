import { useEffect } from "react"

export const useOnlyAllowPattern = (
  inputRef: React.RefObject<HTMLInputElement | null>,
  pattern: RegExp,
) => {
  useEffect(() => {
    if (!inputRef.current) return

    const onKeyPress = (e: KeyboardEvent) => {
      if (!inputRef.current) return

      if (!pattern.test(inputRef.current.value + e.key)) {
        e.preventDefault()
      }
    }

    inputRef.current.addEventListener("keypress", onKeyPress)

    return () => {
      inputRef.current?.removeEventListener("keypress", onKeyPress)
    }
  }, [])
}
