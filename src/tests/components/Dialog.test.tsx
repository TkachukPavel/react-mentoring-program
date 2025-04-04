import { render, screen } from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event"
import { Dialog } from "@/components/Dialog"

// Mock the createPortal functionality
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: React.ReactNode) => node,
}))

// Mock the focus-trap library
jest.mock("focus-trap", () => ({
  createFocusTrap: () => ({
    activate: jest.fn(),
    deactivate: jest.fn(),
  }),
}))

describe("Dialog", () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  it("should render with a title when provided", () => {
    // Arrange
    const title = "Test Dialog"
    render(
      <Dialog
        title={title}
        onClose={jest.fn()}>
        <div>Dialog content</div>
      </Dialog>,
    )

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it("should not render a title when not provided", () => {
    // Arrange
    render(
      <Dialog onClose={jest.fn()}>
        <div>Dialog content</div>
      </Dialog>,
    )

    // Assert
    expect(screen.queryByText(/test dialog/i)).not.toBeInTheDocument()
  })

  it("should render children content", () => {
    // Arrange
    const childContent = "Dialog child content"
    render(
      <Dialog onClose={jest.fn()}>
        <div>{childContent}</div>
      </Dialog>,
    )

    // Assert
    expect(screen.getByText(childContent)).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", async () => {
    // Arrange
    const onClose = jest.fn()
    render(
      <Dialog onClose={onClose}>
        <div>Dialog content</div>
      </Dialog>,
    )

    // Act
    await user.click(screen.getByRole("button"))

    // Assert
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
