import userEvent, { UserEvent } from "@testing-library/user-event"
import { fireEvent, render, screen } from "@testing-library/react"
import { MovieTile } from "@/components/MovieTile"

describe("MovieTile", () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup({ skipHover: true })
  })

  const mockProps = {
    imageUrl: "https://example.com/image.jpg",
    movieName: "Test Movie",
    releaseYear: 2023,
    genres: ["Action", "Drama"],
    onClick: jest.fn(),
  }

  it("renders with correct props", () => {
    render(<MovieTile {...mockProps} />)

    // Check if image is rendered with correct src and alt
    const image = screen.getByAltText("Test Movie")
    expect(image).toBeInTheDocument()
    expect(image.getAttribute("src")).toBe("https://example.com/image.jpg")

    // Check if movie name is displayed
    expect(screen.getByText("Test Movie")).toBeInTheDocument()

    // Check if release year is displayed
    expect(screen.getByText("2023")).toBeInTheDocument()

    // Check if genres are displayed
    expect(screen.getByText("Action, Drama")).toBeInTheDocument()
  })

  it("calls onClick when clicked", async () => {
    render(<MovieTile {...mockProps} />)

    // Find the main container div and click it
    const container = screen.getByRole("img")

    await user.click(container)

    // Check if onClick was called
    expect(mockProps.onClick).toHaveBeenCalledTimes(1)
  })

  it("handles movies with many genres", () => {
    const manyGenresProps = {
      ...mockProps,
      genres: ["Action", "Drama", "Comedy", "Thriller", "Romance", "Sci-Fi"],
    }

    render(<MovieTile {...manyGenresProps} />)

    // Check if all genres are displayed properly
    expect(
      screen.getByText("Action, Drama, Comedy, Thriller, Romance, Sci-Fi"),
    ).toBeInTheDocument()
  })

  it("shows menu on hover and hides on mouseleave", async () => {
    render(<MovieTile {...mockProps} />)

    // Initially menu should not be present
    expect(screen.queryByText("Edit")).not.toBeInTheDocument()
    expect(screen.queryByText("Delete")).not.toBeInTheDocument()

    const movieTile = screen.getByAltText("Test Movie").closest("div")
    expect(movieTile).not.toBeNull()

    if (movieTile) {
      await user.hover(movieTile)
      await user.click(screen.getByTitle("open menu"))

      // Menu should be visible now
      expect(screen.getByText("Edit")).toBeInTheDocument()
      expect(screen.getByText("Delete")).toBeInTheDocument()

      // Move mouse away
      fireEvent(movieTile, new MouseEvent("mouseout", { bubbles: true }))

      // Menu should disappear
      expect(screen.queryByText("Edit")).not.toBeInTheDocument()
      expect(screen.queryByText("Delete")).not.toBeInTheDocument()
    }
  })
})
