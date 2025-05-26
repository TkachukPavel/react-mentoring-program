import { render, screen } from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event"
import { MovieForm } from "@/components/MovieForm"
import { genres } from "@/data/genres"

describe("MovieForm", () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  it("renders all form fields with correct labels", () => {
    render(<MovieForm onSubmit={() => {}} />)

    // Check for all the labels
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/release date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/movie url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rating/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/runtime/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/overview/i)).toBeInTheDocument()
  })

  it("renders inputs with correct placeholders", () => {
    render(<MovieForm onSubmit={() => {}} />)

    expect(screen.getByPlaceholderText("Select Date")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("https://")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("7.8")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("minutes")).toBeInTheDocument()
  })

  it("displays all genres in the dropdown", () => {
    render(<MovieForm onSubmit={() => {}} />)

    // Test that each genre is available in the dropdown
    genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument()
    })
  })

  it("accepts input in the title field", async () => {
    render(<MovieForm onSubmit={() => {}} />)

    await user.type(screen.getByLabelText(/title/i), "Test")

    expect(screen.getByLabelText(/title/i)).toHaveValue("Test")
  })

  it("accepts input in the movie URL field", async () => {
    render(<MovieForm onSubmit={() => {}} />)

    await user.type(
      screen.getByLabelText(/movie url/i),
      "https://example.com/movie1",
    )

    expect(screen.getByLabelText(/movie url/i)).toHaveValue(
      "https://example.com/movie1",
    )
  })

  it("accepts input in the overview field", async () => {
    render(<MovieForm onSubmit={() => {}} />)

    await user.type(
      screen.getByLabelText(/overview/i),
      "This is a test movie description",
    )

    expect(screen.getByLabelText(/overview/i)).toHaveValue(
      "This is a test movie description",
    )
  })

  it("formats runtime field", async () => {
    render(<MovieForm onSubmit={() => {}} />)

    await user.type(screen.getByLabelText(/runtime/i), "121")
    await user.click(document.body)

    expect(screen.getByLabelText(/runtime/i)).toHaveValue("2h 1m")

    await user.clear(screen.getByLabelText(/runtime/i))
    await user.click(document.body)

    expect(screen.getByLabelText(/runtime/i)).toHaveValue("")
  })

  it("applies boundaries and formatting to the rating field", async () => {
    render(<MovieForm onSubmit={() => {}} />)
    const ratingInput = screen.getByLabelText(/rating/i)

    await user.type(ratingInput, "12.3")
    await user.click(document.body)

    expect(ratingInput).toHaveValue("10")

    await user.clear(ratingInput)
    await user.type(ratingInput, "5.123")
    await user.click(document.body)

    expect(ratingInput).toHaveValue("5.1")

    await user.clear(ratingInput)
    await user.type(ratingInput, "a")
    await user.click(document.body)

    expect(ratingInput).toHaveValue("")
  })

  it("submits the form with correct values", async () => {
    const mockSubmit = jest.fn()
    render(<MovieForm onSubmit={mockSubmit} />)

    // Fill out the form
    await user.type(screen.getByLabelText(/title/i), "Test Movie")

    // For date input
    const dateInput = screen.getByLabelText(/release date/i)
    await user.type(dateInput, "2023-05-10")

    await user.type(screen.getByLabelText(/movie url/i), "https://test.com")
    await user.type(screen.getByLabelText(/rating/i), "8.5")

    // For select dropdown
    const genreSelect = screen.getByLabelText(/genre/i)
    await user.selectOptions(genreSelect, genres[0])

    await user.type(screen.getByLabelText(/runtime/i), "120")
    await user.type(screen.getByLabelText(/overview/i), "Test overview")

    // Submit the form
    const submitButton = screen.getByText(/submit/i)
    await user.click(submitButton)

    // Check if onSubmit was called
    expect(mockSubmit).toHaveBeenCalled()
  })
})
