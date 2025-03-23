import { useEffect } from "react"

type Config = {
  max?: number
  min?: number
  fractionDigits?: number
}

export const useKeepInputInRange = (
  inputRef: React.RefObject<HTMLInputElement | null>,
  { max, min, fractionDigits }: Config,
) => {
  useEffect(() => {
    if (!inputRef.current) return

    const onBlur = () => {
      if (!inputRef.current) return

      let value = parseFloat(inputRef.current.value)

      if (!value) return

      if (max && value > max) {
        value = max
      }

      if (min && value < min) {
        value = min
      }

      inputRef.current.value = Intl.NumberFormat("en-US", {
        maximumFractionDigits: fractionDigits,
      }).format(value)
    }

    onBlur()

    inputRef.current.addEventListener("blur", onBlur)

    return () => {
      inputRef.current?.removeEventListener("blur", onBlur)
    }
  }, [])
}
