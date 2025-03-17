import { render, screen } from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event"
import { Menu } from "@/components/Menu"

describe("Menu", () => {
  let user: UserEvent
  const mockAction1 = jest.fn()
  const mockAction2 = jest.fn()
  const menuItems = [
    { label: "Edit", action: mockAction1 },
    { label: "Delete", action: mockAction2 },
  ]

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllMocks()
  })

  it("should render toggle button when closed", () => {
    // Arrange
    render(<Menu menuItems={menuItems} />)

    // Assert
    expect(screen.queryByText("Edit")).not.toBeInTheDocument()
    expect(screen.queryByText("Delete")).not.toBeInTheDocument()
  })

  it("should open menu when toggle button is clicked", async () => {
    // Arrange
    render(<Menu menuItems={menuItems} />)

    // Act
    await user.click(screen.getByRole("button"))

    // Assert
    expect(screen.getByText("Edit")).toBeInTheDocument()
    expect(screen.getByText("Delete")).toBeInTheDocument()
  })

  it("should close menu when X button is clicked", async () => {
    // Arrange
    render(<Menu menuItems={menuItems} />)

    // Act
    await user.click(screen.getByRole("button"))
    await user.click(screen.getByTitle("close menu")) // X icon text representation

    // Assert
    expect(screen.queryByText("Edit")).not.toBeInTheDocument()
    expect(screen.queryByText("Delete")).not.toBeInTheDocument()
  })

  it("should call the action and close menu when menu item is clicked", async () => {
    // Arrange
    render(<Menu menuItems={menuItems} />)

    // Act
    await user.click(screen.getByRole("button"))
    await user.click(screen.getByText("Edit"))

    // Assert
    expect(mockAction1).toHaveBeenCalledTimes(1)
    expect(mockAction2).not.toHaveBeenCalled()
    expect(screen.queryByText("Edit")).not.toBeInTheDocument() // Menu should be closed
  })
})
