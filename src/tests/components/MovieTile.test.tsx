import userEvent, { UserEvent } from "@testing-library/user-event"
import { fireEvent, render, screen } from "@testing-library/react"
import { MovieTile } from "@/components/MovieTile"
import { movie } from "@/mocks/movie.mock"
import { BrowserRouter } from "react-router-dom"

describe("MovieTile", () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup({ skipHover: true })
  })

  const mockProps = {
    movie,

    onClick: jest.fn(),
  }

  it("renders with correct props", () => {
    render(
      <BrowserRouter>
        <MovieTile {...mockProps} />
      </BrowserRouter>,
    )

    // Check if image is rendered with correct src and alt
    const image = screen.getByAltText(movie.title)
    expect(image).toBeInTheDocument()
    expect(image.getAttribute("src")).toBe(movie.poster_path)

    // Check if movie name is displayed
    expect(screen.getByText(movie.title)).toBeInTheDocument()

    // Check if release year is displayed
    expect(
      screen.getByText(new Date(movie.release_date).getFullYear()),
    ).toBeInTheDocument()

    // Check if genres are displayed
    expect(screen.getByText(movie.genres.join(", "))).toBeInTheDocument()
  })

  it("calls onClick when clicked", async () => {
    render(<MovieTile {...mockProps} />, { wrapper: BrowserRouter })

    // Find the main container div and click it
    const container = screen.getByRole("img")

    await user.click(container)

    // Check if onClick was called
    expect(mockProps.onClick).toHaveBeenCalledTimes(1)
  })

  it("handles movies with many genres", () => {
    const genres = [
      "Action",
      "Drama",
      "Comedy",
      "Thriller",
      "Romance",
      "Sci-Fi",
    ]
    const manyGenresProps = {
      ...mockProps,
      movie: {
        ...mockProps.movie,
        genres,
      },
    }

    render(<MovieTile {...manyGenresProps} />, { wrapper: BrowserRouter })

    // Check if all genres are displayed properly
    expect(screen.getByText(genres.join(", "))).toBeInTheDocument()
  })

  it("shows menu on hover and hides on mouseleave", async () => {
    render(<MovieTile {...mockProps} />, { wrapper: BrowserRouter })

    // Initially menu should not be present
    expect(screen.queryByText("Edit")).not.toBeInTheDocument()
    expect(screen.queryByText("Delete")).not.toBeInTheDocument()

    const movieTile = screen.getByAltText(movie.title).closest("div")
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
