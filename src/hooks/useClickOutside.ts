import { useEffect, useRef } from "react"

export const useClickOutside = <T extends HTMLElement>(
  fn: (event: MouseEvent) => void,
) => {
  const elRef = useRef<T>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (elRef.current && !elRef.current.contains(event.target as Node)) {
        fn(event)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return elRef
}
