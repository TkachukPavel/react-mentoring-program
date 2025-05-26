import { render, renderHook, screen } from "@testing-library/react"
import { useClickOutside } from "@/hooks/useClickOutside"
import userEvent, { UserEvent } from "@testing-library/user-event"

describe("useClickOutside", () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllMocks()
    render(<TestComponent />)
  })

  it("should work if no ref is set", () => {
    renderHook(() => useClickOutside<HTMLDivElement>(fn))
    expect(true).toBe(true)
  })

  it("should call the function when clicking outside the element", async () => {
    const outside = screen.getByTestId("outside")
    await user.click(outside)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("should not call the function when clicking inside the element", async () => {
    const inside = screen.getByTestId("inside")
    await user.click(inside)

    expect(fn).toHaveBeenCalledTimes(0)
  })
})

const fn = jest.fn()
const TestComponent = () => {
  const ref = useClickOutside<HTMLDivElement>(fn)

  return (
    <div>
      <div data-testid="outside" />
      <div
        data-testid="inside"
        ref={ref}
      />
    </div>
  )
}
