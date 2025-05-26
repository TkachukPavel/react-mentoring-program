import { useEffect, useRef } from "react"

export const useKeepInputInRange = (config: {
  max?: number
  min?: number
  fractionDigits?: number
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { max, min, fractionDigits = 2 } = config

  useEffect(() => {
    const el = inputRef.current
    if (!el) return

    const onBlur = () => {
      let value = parseFloat(el.value)

      if (!value && value !== 0) return

      if (max !== undefined && value > max) {
        value = max
      }

      if (min !== undefined && value < min) {
        value = min
      }

      el.value = Intl.NumberFormat("en-US", {
        maximumFractionDigits: fractionDigits,
      }).format(value)
    }

    onBlur()

    el.addEventListener("blur", onBlur)

    return () => {
      el.removeEventListener("blur", onBlur)
    }
  }, [fractionDigits, max, min])

  return inputRef
}
