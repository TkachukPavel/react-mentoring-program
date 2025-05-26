import { render, renderHook, screen } from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event"
import { useOnlyAllowPattern } from "@/hooks/useOnlyAllowPattern"

describe("useOnlyAllowPattern", () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllMocks()
    render(<TestComponent />)
  })

  it("should allow only characters matching the pattern", async () => {
    const input = screen.getByTestId("input")

    await user.type(input, "123")
    expect(input).toHaveValue("123")

    await user.type(input, "abc")
    expect(input).toHaveValue("123")
  })

  it("should work if no ref is set", () => {
    renderHook(() => useOnlyAllowPattern(pattern))

    expect(true).toBe(true)
  })
})

const pattern = /^[0-9]*$/
const TestComponent = () => {
  const ref = useOnlyAllowPattern(pattern)

  return (
    <input
      data-testid="input"
      ref={ref}
    />
  )
}
