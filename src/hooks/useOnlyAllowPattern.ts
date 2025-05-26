import { useEffect, useRef } from "react"

export const useOnlyAllowPattern = (pattern: RegExp) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = inputRef.current
    if (!el) return

    const onKeyPress = (e: KeyboardEvent) => {
      if (pattern.test(el.value + e.key)) return

      e.preventDefault()
    }

    el.addEventListener("keypress", onKeyPress)

    return () => {
      el.removeEventListener("keypress", onKeyPress)
    }
  }, [pattern])

  return inputRef
}
