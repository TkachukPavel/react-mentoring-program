import { render, screen } from "@testing-library/react"
import Counter from "../../components/Counter"
import userEvent, { UserEvent } from "@testing-library/user-event"

describe("Counter", () => {
  let user: UserEvent
  beforeEach(() => [(user = userEvent.setup())])
  it("should render initial value", () => {
    // Arrange
    const initialValue = 2
    render(<Counter initialValue={initialValue} />)

    // Assert
    const counterValue = screen.getByText(initialValue)
    expect(counterValue).toBeInTheDocument()
  })

  it("should increment the counter", async () => {
    // Arrange
    const initialValue = 2
    render(<Counter initialValue={initialValue} />)
    const incrementButton = screen.getByText("+")
    // Act
    await user.click(incrementButton)

    // Assert
    const counterValue = screen.getByText(initialValue + 1)
    expect(counterValue).toBeInTheDocument()
  })

  it("should decrement the counter", async () => {
    // Arrange
    const initialValue = 2
    render(<Counter initialValue={initialValue} />)
    const decrementButton = screen.getByText("-")
    // Act
    await user.click(decrementButton)

    // Assert
    const counterValue = screen.getByText(initialValue - 1)
    expect(counterValue).toBeInTheDocument()
  })
})
