import { render, screen } from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event"
import { MovieForm } from "@/components/MovieForm"
import { genres } from "@/data/genres"

describe("MovieForm", () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  it("renders the form with 'add movie' title when mode is add", () => {
    render(<MovieForm mode="add" />)
    expect(screen.getByText(/add movie/i)).toBeInTheDocument()
  })

  it("renders the form with 'edit movie' title when mode is edit", () => {
    render(<MovieForm mode="edit" />)
    expect(screen.getByText(/edit movie/i)).toBeInTheDocument()
  })

  it("renders all form fields with correct labels", () => {
    render(<MovieForm mode="add" />)

    // Check for all the labels
    expect(screen.getByText(/title/i)).toBeInTheDocument()
    expect(screen.getByText(/release date/i)).toBeInTheDocument()
    expect(screen.getByText(/movie url/i)).toBeInTheDocument()
    expect(screen.getByText(/rating/i)).toBeInTheDocument()
    expect(screen.getByText(/genre/i)).toBeInTheDocument()
    expect(screen.getByText(/runtime/i)).toBeInTheDocument()
    expect(screen.getByText(/overview/i)).toBeInTheDocument()
  })

  it("renders inputs with correct placeholders", () => {
    render(<MovieForm mode="add" />)

    expect(screen.getByPlaceholderText("Select Date")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("https://")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("7.8")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("minutes")).toBeInTheDocument()
  })

  it("displays all genres in the dropdown", () => {
    render(<MovieForm mode="add" />)

    // Test that each genre is available in the dropdown
    genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument()
    })
  })

  it("accepts input in the title field", async () => {
    render(<MovieForm mode="add" />)

    const titleInput = document.getElementById("title") as HTMLInputElement
    await user.type(titleInput, "Test Movie Title")

    expect(titleInput.value).toBe("Test Movie Title")
  })

  it("accepts input in the movie URL field", async () => {
    render(<MovieForm mode="add" />)

    await user.type(
      screen.getByLabelText(/movie url/i),
      "https://example.com/movie",
    )

    expect(screen.getByLabelText(/movie url/i)).toHaveValue(
      "https://example.com/movie",
    )
  })

  it("accepts input in the overview field", async () => {
    render(<MovieForm mode="add" />)

    await user.type(
      screen.getByLabelText(/overview/i),
      "This is a test movie description",
    )

    expect(screen.getByLabelText(/overview/i)).toHaveValue(
      "This is a test movie description",
    )
  })

  it("formats runtime field", async () => {
    render(<MovieForm mode="add" />)

    await user.type(screen.getByLabelText(/runtime/i), "121")
    await user.click(document.body)

    expect(screen.getByLabelText(/runtime/i)).toHaveValue("2h 1m")

    await user.clear(screen.getByLabelText(/runtime/i))
    await user.click(document.body)

    expect(screen.getByLabelText(/runtime/i)).toHaveValue("")
  })
})
