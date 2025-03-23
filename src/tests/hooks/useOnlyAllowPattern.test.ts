import { renderHook } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useOnlyAllowPattern } from "@/hooks/useOnlyAllowPattern"

describe("useOnlyAllowPattern", () => {
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

  it("should allow input that matches the pattern", async () => {
    // Arrange
    const pattern = /^\d*$/

    // Act
    renderHook(() => useOnlyAllowPattern(inputRef, pattern))

    // Type numeric values which should be allowed
    await user.type(inputElement, "123")

    // Assert
    expect(inputElement.value).toBe("123")
  })

  it("should prevent input that doesn't match the pattern", async () => {
    // Arrange
    const pattern = /^\d*$/

    // Act
    renderHook(() => useOnlyAllowPattern(inputRef, pattern))

    await user.type(inputElement, "a")

    // Assert
    // expect(preventDefaultMock).toHaveBeenCalled()
    expect(inputElement.value).toBe("")
  })

  it("should allow complex patterns", async () => {
    // Arrange
    const pattern = /^[a-c]*$/i // only a, b, c (case insensitive)

    // Act
    renderHook(() => useOnlyAllowPattern(inputRef, pattern))

    // Type allowed characters
    await user.type(inputElement, "abcABC")

    // Assert
    expect(inputElement.value).toBe("abcABC")
  })

  it("should return undefined when inputRef is null", () => {
    // Arrange
    const nullRef = { current: null }
    const pattern = /^\d*$/

    // Act
    const { result } = renderHook(() => useOnlyAllowPattern(nullRef, pattern))

    // Assert
    expect(result.current).toBeUndefined()
  })

  it("should clean up event listeners when unmounted", () => {
    // Arrange
    const removeEventListenerSpy = jest.spyOn(
      inputElement,
      "removeEventListener",
    )
    const pattern = /^\d*$/

    // Act
    const { unmount } = renderHook(() => useOnlyAllowPattern(inputRef, pattern))

    // Unmount the hook
    unmount()

    // Assert
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keypress",
      expect.any(Function),
    )
  })
})
