import { useEffect, useRef } from "react"

export const useClickOutside = <T extends HTMLElement>(
  fn: (event: MouseEvent) => void,
) => {
  const elRef = useRef<T>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const handleClickOutside = (event: MouseEvent) => {
      if (el.contains(event.target as Node)) return

      fn(event)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [fn])

  return elRef
}
