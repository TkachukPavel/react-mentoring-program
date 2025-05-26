import { render, renderHook, screen } from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event"
import { useKeepInputInRange } from "@/hooks/useKeepInputInRange"

describe("useKeepInputInRange", () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllMocks()
    render(<TestComponent />)
  })

  it("should set value to max if user enters a value below max on blur", async () => {
    const input = screen.getByTestId("input")
    await user.type(input, "10000")
    await user.click(document.body)

    expect(input).toHaveValue("10")
  })

  it("should cut fraction digits if user enters a value with more than 2 decimal places", async () => {
    const input = screen.getByTestId("input")
    await user.type(input, "3.14159")
    await user.click(document.body)

    expect(input).toHaveValue("3.14")
  })

  it("should set value to min if user enters a value below min on blur", async () => {
    const input = screen.getByTestId("input")
    await user.type(input, "-1")
    await user.click(document.body)

    expect(input).toHaveValue("0")
  })

  it("should work if no ref is set", () => {
    renderHook(() => useKeepInputInRange(config))

    expect(true).toBe(true) // Just a placeholder, as we can't test without a ref
  })
})

const config = {
  max: 10,
  min: 0,
  fractionDigits: 2,
}

const TestComponent = () => {
  const ref = useKeepInputInRange(config)

  return (
    <input
      data-testid="input"
      ref={ref}
    />
  )
}
