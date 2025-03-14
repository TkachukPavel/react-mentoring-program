import { render, screen } from "@testing-library/react"
import GenreSelect from "../../components/GenreSelect"
import { Genre } from "../../types/genre"
import userEvent, { UserEvent } from "@testing-library/user-event"
describe("GenreSelect", () => {
  let user: UserEvent
  beforeEach(() => {
    user = userEvent.setup()
  })
  it("should render all genres", () => {
    const genres: Genre[] = ["All", "Documentary", "Comedy", "Horror", "Crime"]
    // Arrange
    render(
      <GenreSelect
        genres={genres}
        selectedGenre="All"
        onSelect={jest.fn()}
      />,
    )
    // Assert
    genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument()
    })
  })

  it("highlights selected genre", () => {
    // Arrange
    render(
      <GenreSelect
        genres={["All", "Documentary", "Comedy", "Horror", "Crime"]}
        selectedGenre="Comedy"
        onSelect={jest.fn()}
      />,
    )
    // Assert
    expect(screen.getByText("Comedy")).toHaveClass("border-rose-400!")
  })

  it("calls onSelect with the selected genre on genre click", async () => {
    // Arrange
    const onSelect = jest.fn()
    render(
      <GenreSelect
        genres={["All", "Documentary", "Comedy", "Horror", "Crime"]}
        selectedGenre="All"
        onSelect={onSelect}
      />,
    )
    // Act
    await user.click(screen.getByText("Comedy"))
    // Assert
    expect(onSelect).toHaveBeenCalledWith("Comedy")
  })
})
