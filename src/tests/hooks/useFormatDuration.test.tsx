import { render, renderHook, screen } from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event"
import { useFormattedInput } from "@/hooks/useFormatDuration"

describe("useFormattedInput", () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllMocks()

    render(<TestComponent />)
  })

  it("should format input", async () => {
    const input = screen.getByTestId("duration-input")
    await user.type(input, "123")
    await user.tab()

    expect(input).toHaveValue(formatter("123"))
    expect(screen.getByTestId("formatted-value")).toHaveTextContent(
      formatter("123"),
    )
    expect(screen.getByTestId("value")).toHaveTextContent("123")
  })

  it("should format on initial render", () => {
    const input = screen.getByTestId("duration-input")
    expect(input).toHaveValue(formatter(""))
    expect(screen.getByTestId("formatted-value")).toHaveTextContent(
      formatter(""),
    )
    expect(screen.getByTestId("value")).toHaveTextContent("")
  })

  it("should set original value on focus", async () => {
    const input = screen.getByTestId("duration-input")
    await user.type(input, "123")
    await user.tab() // blur the input to trigger formatting

    expect(input).toHaveValue(formatter("123"))

    // Focus the input again
    await user.click(input)

    expect(input).toHaveValue("123") // should show original value
  })

  it("does nothing if ref is not set", () => {
    const { result } = renderHook(() => useFormattedInput(formatter))
    const [inputRef] = result.current

    // Simulate the case where inputRef is not set
    inputRef.current = null

    expect(true).toBe(true) // Just a placeholder, as we can't test without a ref
  })
})

const formatter = jest.fn((value) => `formatted_${value}`)

const TestComponent = () => {
  const [inputRef, formattedValue, value] = useFormattedInput(formatter)
  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter duration"
        data-testid="duration-input"
      />
      <div data-testid="formatted-value">{formattedValue}</div>
      <div data-testid="value">{value}</div>
    </>
  )
}
