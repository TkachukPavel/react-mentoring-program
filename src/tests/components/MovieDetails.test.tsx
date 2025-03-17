import { render, screen } from "@testing-library/react"
import formatDuration from "@/utils/formatDuration"
import { MovieDetails } from "@/components/MovieDetails"

describe("MovieDetails", () => {
  const mockProps = {
    imageUrl: "http://example.com/image.jpg",
    movieName: "Test Movie",
    releaseYear: 2023,
    rating: 8.5,
    duration: 120,
    description: "A test movie description",
    genres: ["Action", "Drama", "Sci-Fi"],
  }

  it("renders movie details correctly", () => {
    render(<MovieDetails {...mockProps} />)

    expect(screen.getByAltText("Test Movie")).toHaveAttribute(
      "src",
      mockProps.imageUrl,
    )
    expect(screen.getByText("Test Movie")).toBeInTheDocument()
    expect(screen.getByText("8.5")).toBeInTheDocument()
    expect(screen.getByText("Action, Drama, Sci-Fi")).toBeInTheDocument()
    expect(screen.getByText("2023")).toBeInTheDocument()
    expect(screen.getByText(formatDuration(120))).toBeInTheDocument()
    expect(screen.getByText("A test movie description")).toBeInTheDocument()
  })
})
