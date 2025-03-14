import { render, screen } from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event"
import SearchForm from "@/components/SearchForm"

describe("SearchForm", () => {
  let user: UserEvent
  beforeEach(() => {
    user = userEvent.setup()
  })

  it("should render the search form with inital value provided", () => {
    // Arrange
    const initialQuery = "Hello"
    render(
      <SearchForm
        initialQuery={initialQuery}
        onSearch={jest.fn()}
      />,
    )
    const searchInput = screen.getByRole("textbox")

    // Expect
    expect(searchInput).toHaveValue(initialQuery)
  })

  it("should call onSearch with the search query", async () => {
    // Arrange
    const onSearch = jest.fn()
    render(
      <SearchForm
        initialQuery=""
        onSearch={onSearch}
      />,
    )
    const searchInput = screen.getByRole("textbox")
    const searchButton = screen.getByRole("button")

    // Act
    await user.type(searchInput, "Hello")
    await user.click(searchButton)

    // Assert
    expect(onSearch).toHaveBeenCalledWith("Hello")
  })

  it('should call onSearch with the search query when user presses "Enter"', async () => {
    // Arrange
    const onSearch = jest.fn()
    render(
      <SearchForm
        initialQuery=""
        onSearch={onSearch}
      />,
    )
    const searchInput = screen.getByRole("textbox")

    // Act
    await user.type(searchInput, "Hello{enter}")

    // Assert
    expect(onSearch).toHaveBeenCalledWith("Hello")
  })
})
