import { render, screen } from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event"
import { SortControl } from "@/components/SortControl"

describe("SortControl", () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  it("should render sort control with provided selection", () => {
    // Arrange
    render(
      <SortControl
        selection="release_date"
        onSelectionChange={jest.fn()}
      />,
    )

    // Assert
    expect(screen.getByText("Sort by")).toBeInTheDocument()
    expect(screen.getByText("Release Date")).toBeInTheDocument()
  })

  it("should open dropdown when clicked", async () => {
    // Arrange
    render(
      <SortControl
        selection="release_date"
        onSelectionChange={jest.fn()}
      />,
    )

    // Act
    await user.click(screen.getByRole("button"))

    // Assert
    expect(
      screen.getAllByText("Title").find((el) => el.tagName === "LI"),
    ).toBeInTheDocument()
    expect(
      screen.getAllByText("Release Date").find((el) => el.tagName === "LI"),
    ).toBeInTheDocument()
  })

  it("calls onSelectionChange with the selected option on option click", async () => {
    // Arrange
    const onSelectionChange = jest.fn()
    render(
      <SortControl
        selection="release_date"
        onSelectionChange={onSelectionChange}
      />,
    )

    // Act
    await user.click(screen.getByRole("button"))
    await user.click(screen.getByText("Title"))

    // Assert
    expect(onSelectionChange).toHaveBeenCalledWith("title")
  })

  it("closes dropdown after selection", async () => {
    // Arrange
    render(
      <SortControl
        selection="release_date"
        onSelectionChange={jest.fn()}
      />,
    )

    // Act
    await user.click(screen.getByRole("button"))
    await user.click(screen.getByText("Title"))

    // Assert
    expect(screen.queryByRole("list")).not.toBeInTheDocument()
  })

  it("changes icon when dropdown is opened/closed", async () => {
    // Arrange
    render(
      <SortControl
        selection="release_date"
        onSelectionChange={jest.fn()}
      />,
    )

    // Initially shows down icon
    expect(screen.getByTitle("open menu")).toBeInTheDocument()

    // Act - open dropdown
    await user.click(screen.getByRole("button"))

    // Assert - shows up icon
    expect(screen.getByTitle("close menu")).toBeInTheDocument()
  })
})
