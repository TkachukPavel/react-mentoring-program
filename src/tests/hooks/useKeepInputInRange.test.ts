import { renderHook } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useKeepInputInRange } from "@/hooks/useKeepInputInRange"

describe("useKeepInputInRange", () => {
  let inputElement: HTMLInputElement
  let inputRef: React.RefObject<HTMLInputElement>
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    inputElement = document.createElement("input")
    document.body.appendChild(inputElement)
    inputRef = { current: inputElement }
  })

  afterEach(() => {
    document.body.removeChild(inputElement)
  })

  it("should clamp value to max if it exceeds maximum", async () => {
    // Arrange
    const config = { max: 100, fractionDigits: 0 }

    // Act
    renderHook(() => useKeepInputInRange(inputRef, config))

    // Set a value above the max
    await user.type(inputElement, "150")

    // Blur the input to trigger formatting
    await user.click(document.body)

    // Assert
    expect(inputElement.value).toBe("100")
  })

  it("should clamp value to min if it is below minimum", async () => {
    // Arrange
    const config = { min: 10, fractionDigits: 0 }

    // Act
    renderHook(() => useKeepInputInRange(inputRef, config))

    // Set a value below the min
    await user.type(inputElement, "5")

    // Blur the input to trigger formatting
    await user.click(document.body)

    // Assert
    expect(inputElement.value).toBe("10")
  })

  it("should format the value with specified fraction digits", async () => {
    // Arrange
    const config = { fractionDigits: 2 }

    // Act
    renderHook(() => useKeepInputInRange(inputRef, config))

    // Type a decimal value
    await user.type(inputElement, "123.456")

    // Blur the input to trigger formatting
    await user.click(document.body)

    // Assert
    expect(inputElement.value).toBe("123.46")
  })

  it("should do nothing if the value is not a number", async () => {
    // Arrange
    const config = { max: 100, min: 0, fractionDigits: 2 }

    // Act
    renderHook(() => useKeepInputInRange(inputRef, config))

    // Type a non-numeric value
    await user.type(inputElement, "not-a-number")

    // Blur the input to trigger formatting
    await user.click(document.body)

    // Assert
    expect(inputElement.value).toBe("not-a-number")
  })

  it("should return undefined when inputRef is null", () => {
    // Arrange
    const nullRef = { current: null }
    const config = { max: 100, min: 0 }

    // Act
    const { result } = renderHook(() => useKeepInputInRange(nullRef, config))

    // Assert
    expect(result.current).toBeUndefined()
  })

  it("should clean up event listeners when unmounted", () => {
    // Arrange
    const removeEventListenerSpy = jest.spyOn(
      inputElement,
      "removeEventListener",
    )
    const config = { max: 100, min: 0 }

    // Act
    const { unmount } = renderHook(() => useKeepInputInRange(inputRef, config))

    // Unmount the hook
    unmount()

    // Assert
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "blur",
      expect.any(Function),
    )
  })
})
