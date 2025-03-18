import { fireEvent, renderHook } from "@testing-library/react"
import { useClickOutside } from "@/hooks/useClickOutside"
import userEvent, { UserEvent } from "@testing-library/user-event"

describe("useClickOutside", () => {
  let user: UserEvent
  const mockFn = jest.fn()
  const map: Record<string, EventListenerOrEventListenerObject> = {}

  beforeEach(() => {
    user = userEvent.setup()
    mockFn.mockReset()
    jest
      .spyOn(document, "addEventListener")
      .mockImplementation((event, handler) => {
        map[event] = handler as EventListener
      })
    jest.spyOn(document, "removeEventListener").mockImplementation((event) => {
      delete map[event]
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("should add mousedown event listener on mount", () => {
    // Arrange & Act
    renderHook(() => useClickOutside(mockFn))

    // Assert
    expect(document.addEventListener).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    )
    expect(map["mousedown"]).toBeDefined()
  })

  it("should remove mousedown event listener on unmount", () => {
    // Arrange
    const { unmount } = renderHook(() => useClickOutside(mockFn))

    // Act
    unmount()

    // Assert
    expect(document.removeEventListener).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    )
  })

  it("should call the callback when clicked outside the element", async () => {
    // Arrange
    jest.restoreAllMocks()

    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(mockFn))
    const divElement = document.createElement("div")
    const outsideElement = document.createElement("button")

    document.body.appendChild(divElement)
    document.body.appendChild(outsideElement)

    result.current.current = divElement
    // Act
    await user.click(outsideElement)

    // Assert
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(expect.any(MouseEvent))
  })

  it("should not call the callback when clicked inside the element", () => {
    // Arrange
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(mockFn))
    const divElement = document.createElement("div")
    const childElement = document.createElement("button")
    divElement.appendChild(childElement)
    Object.defineProperty(result.current, "current", { value: divElement })

    // Act
    const mouseEvent = new MouseEvent("mousedown", { bubbles: true })
    Object.defineProperty(mouseEvent, "target", { value: childElement })
    fireEvent(document, mouseEvent)

    // Assert
    expect(mockFn).not.toHaveBeenCalled()
  })
})
