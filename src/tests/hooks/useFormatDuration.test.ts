import { renderHook } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useFormattedInput } from "@/hooks/useFormatDuration"

describe("useFormattedInput", () => {
  let inputElement: HTMLInputElement
  let inputRef: React.RefObject<HTMLInputElement>
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    inputElement = document.createElement("input")
    document.body.appendChild(inputElement) // Need to append to document for userEvent
    inputRef = { current: inputElement }
  })

  afterEach(() => {
    document.body.removeChild(inputElement)
  })

  it("should format the value when input is not focused", async () => {
    // Arrange
    const formatter = jest.fn((value) => `formatted_${value}`)

    // Act
    renderHook(() => useFormattedInput(inputRef, formatter))

    // Type in the input
    await user.type(inputElement, "test")

    // Click outside to blur
    await user.click(document.body)

    // Assert
    expect(formatter).toHaveBeenCalledWith("test")
    expect(inputElement.value).toBe("formatted_test")
  })

  it("should show raw value when input is focused", async () => {
    // Arrange
    const formatter = jest.fn((value) => `formatted_${value}`)

    // Act
    renderHook(() => useFormattedInput(inputRef, formatter))

    // Type and blur to set initial formatted value
    await user.type(inputElement, "test")
    await user.click(document.body)

    // Focus the input
    await user.click(inputElement)

    // Assert
    expect(inputElement.value).toBe("test")
  })

  it("should update the value when input changes", async () => {
    // Arrange
    const formatter = jest.fn((value) => `formatted_${value}`)

    // Act
    renderHook(() => useFormattedInput(inputRef, formatter))

    // Type initial value
    await user.type(inputElement, "initial")

    // Clear and update the value
    await user.clear(inputElement)
    await user.type(inputElement, "updated")

    // Blur to show formatted value
    await user.click(document.body)

    // Assert
    expect(formatter).toHaveBeenCalledWith("updated")
    expect(inputElement.value).toBe("formatted_updated")
  })

  it("should return undefined when inputRef is null", () => {
    // Arrange
    const nullRef = { current: null }
    const formatter = jest.fn((value) => `formatted_${value}`)

    // Act
    const { result } = renderHook(() => useFormattedInput(nullRef, formatter))

    // Assert
    expect(result.current).toBeUndefined()
  })

  it("should clean up event listeners when unmounted", () => {
    // Arrange
    const removeEventListenerSpy = jest.spyOn(
      inputElement,
      "removeEventListener",
    )
    const formatter = jest.fn((value) => `formatted_${value}`)

    // Act
    const { unmount } = renderHook(() => useFormattedInput(inputRef, formatter))

    // Unmount the hook
    unmount()

    // Assert
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(3) // focus, change, blur
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "focus",
      expect.any(Function),
    )
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    )
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "blur",
      expect.any(Function),
    )
  })
})
