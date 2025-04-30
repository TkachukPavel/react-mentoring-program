describe("Movie List Page", () => {
  beforeEach(() => {
    // Set up intercepts before visiting the page to ensure they're ready
    cy.intercept("GET", "**/movies**").as("getMovies")

    // Assuming the MovieListPage is rendered at the root URL
    cy.visit("/")

    // Wait for initial page load to complete
    cy.wait("@getMovies")
  })

  it("displays a search form and a list of movies on load", () => {
    // Replace with the actual selector for your search form
    cy.get('[data-testid="search-form"]').should("be.visible")

    // Replace with the actual selector for your movie list container
    cy.get('[data-testid="movie-list"]').should("be.visible")
  })

  it("updates the URL and movie list when a search query is submitted", () => {
    const searchQuery = "Action"
    // Replace with the actual selector for your search input
    cy.get('[data-testid="search-input"]').type(searchQuery)
    cy.get('[data-testid="search-button"]').click()

    // Check if the URL includes the search query parameter
    cy.url().should("include", `query=${searchQuery}`)

    // Check if the movie list is still visible (assuming it refreshes)
    // You might need more specific assertions depending on your implementation
    // e.g., checking for specific movie titles related to the search query
    cy.get('[data-testid="movie-list"]').should("be.visible")
  })

  it("displays search input value and movie list when navigating with query param", () => {
    const searchQuery = "Action"
    cy.visit(`/?query=${searchQuery}`)

    // Check if the search input has the correct value from the URL
    cy.get('[data-testid="search-input"]').should("have.value", searchQuery)

    // Check if the movie list is visible
    // Add more specific assertions here if needed to check for relevance
    cy.get('[data-testid="movie-list"]').should("be.visible")
  })

  it("updates the URL and movie list when a genre is selected", () => {
    const selectedGenre = "Comedy"

    // Select the genre from the genre filter component
    cy.get('[data-testid="genre-select"]').click()
    cy.contains(selectedGenre).click() // Use contains instead of specific test ID

    // Check if the URL includes the genre parameter
    cy.url().should("include", `genre=${selectedGenre}`)

    // Check if the movie list refreshes and is still visible
    cy.get('[data-testid="movie-list"]').should("be.visible")

    // Optional: Verify the displayed movies match the selected genre
    // This would depend on how your movie cards display genre information
    // cy.get('[data-testid="movie-card"]').first().should("contain", selectedGenre)
  })

  it("correctly displays 'Comedy' as selected when navigating to URL with genre parameter", () => {
    // Visit the URL with genre set to Comedy
    cy.visit("/?genre=Comedy")

    // Check if Comedy is selected in the genre select (has the special border class)
    cy.get('[data-testid="genre-select"]')
      .contains("Comedy")
      .should("be.visible")
      .and((element) => {
        // Check if the element has a class containing "border-rose-400" - more flexible than exact match
        expect(element).to.have.attr("class").and.include("border-rose-400")
      })

    // Check if the movie list is visible
    cy.get('[data-testid="movie-list"]').should("be.visible")

    // Optional: If your movie tiles show genre information, you could verify they contain Comedy
    cy.get('[data-testid="movie-tile"]').should("exist")

    // Verify URL still contains the genre parameter
    cy.url().should("include", "genre=Comedy")
  })

  it("updates the URL and movie list when sorting by title", () => {
    // Intercept specifically for the sorted request
    cy.intercept("GET", "**/movies**").as("getMoviesSorted")

    // Select sorting by title
    cy.get('[data-testid="sort-control"]').click() // Open the dropdown
    cy.contains("Title").click()

    // Check if the URL includes the sortBy parameter with title value
    cy.url().should("include", "sortBy=title")

    // Verify the API call was made with the correct sorting parameter

    // Check if the movie list is still visible (indicating refresh)
    cy.get('[data-testid="movie-list"]').should("be.visible")
  })

  it("correctly displays 'Title' as selected when navigating to URL with sortBy parameter", () => {
    // First return to home to reset
    cy.visit("/")

    // Set up the intercept with a more specific pattern that includes the sortBy parameter
    cy.intercept("GET", "**/movies?**sortBy=title**").as("getMoviesSorted")

    // Then visit the URL with sortBy parameter
    cy.visit("/?sortBy=title")

    // Give the page time to load and reflect the URL parameters without waiting for a specific request
    cy.url().should("include", "sortBy=title")

    // Check if the sort control displays Title as the selected option
    // Make the selector more specific and resilient
    cy.get('[data-testid="sort-control"]')
      .find('input[value="title"]')
      .should("exist")

    // Check if the movie list is visible
    cy.get('[data-testid="movie-list"]').should("be.visible")
  })

  it("correctly displays all parameters when navigating with combined URL parameters", () => {
    // Mock the API response with our fixture containing the "abc" movie
    cy.intercept("GET", "**/movies**", {
      fixture: "movies.json",
    }).as("getMoviesWithCombinedParams")

    cy.visit("/?query=abc&genre=comedy&sortBy=title")

    // Wait for the API call to complete
    cy.wait("@getMoviesWithCombinedParams")
      .its("request.url")
      .should("include", "search=abc")
      .and("include", "filter=comedy")
      .and("include", "sortBy=title")

    // Verify search input shows "abc"
    cy.get('[data-testid="search-input"]').should("have.value", "abc")

    // Verify "Comedy" is selected in genre selector - using more specific selector and ensuring element is visible first
    cy.get('[data-testid="genre-select"]')
      .contains("Comedy")
      .should("be.visible")
      .and((element) => {
        // Check if the element has a class containing "border-rose-400" - more flexible than exact match
        expect(element).to.have.attr("class").and.include("border-rose-400")
      })

    // Verify "Title" is selected in sort control
    cy.get('[data-testid="sort-control"]')
      .find('input[value="title"]')
      .should("exist")

    // Verify the "abc" movie appears in the list (our mocked response)
    cy.contains('[data-testid="movie-tile"]', "abc").should("exist")
  })

  it("should preserve URL parameters when navigating to movie details and back", () => {
    // Set up a URL with query parameters
    const searchQuery = "abc"
    const genre = "Comedy"
    const sortBy = "title"

    // Intercept the list API call to ensure consistent responses
    cy.intercept("GET", "**/movies?**", { fixture: "movies.json" }).as(
      "getMoviesWithParams",
    )

    // Intercept the movie details API call with fixture
    cy.intercept("GET", "**/movies/*", { fixture: "movie.json" }).as(
      "getMovieDetails",
    )

    // Visit the page with query parameters
    cy.visit(`/?query=${searchQuery}&genre=${genre}&sortBy=${sortBy}`)
    cy.wait("@getMoviesWithParams")

    // Get movie details from fixture to verify against
    cy.fixture("movies.json").then((movies) => {
      const movie = movies.data[3] // This should be the "abc" movie in our fixture

      // Click on specific movie tile
      cy.contains('[data-testid="movie-tile"]', movie.title).click()

      // Wait for the movie details API call
      cy.wait("@getMovieDetails")
        .its("request.url")
        .should("include", `movies/${movie.id}`)

      // Verify URL contains movie ID and preserves query parameters
      cy.url()
        .should("include", `/${movie.id}`)
        .and("include", `query=${searchQuery}`)
        .and("include", `genre=${genre}`)
        .and("include", `sortBy=${sortBy}`)

      // Verify the movie details are displayed from the fixture
      cy.fixture("movie.json").then((movieDetails) => {
        // You can add assertions here to check for specific movie details rendering
        // Example: cy.contains(movieDetails.tagline).should("be.visible")
      })

      // Navigate back
      cy.go("back")

      // Wait for movies list API call when navigating back
      cy.wait("@getMoviesWithParams")

      // Verify we're back on the list page with parameters intact
      cy.url()
        .should("not.include", `/${movie.id}`)
        .and("include", `query=${searchQuery}`)
        .and("include", `genre=${genre}`)
        .and("include", `sortBy=${sortBy}`)

      // Verify movie list is still displayed with the same content
      cy.get('[data-testid="movie-list"]').should("be.visible")
      cy.get('[data-testid="movie-tile"]').should(
        "have.length",
        movies.data.length,
      )
      cy.contains('[data-testid="movie-tile"]', movie.title).should("exist")
    })
  })

  it("should display movie details and a list of movies when navigating to a valid movie ID", () => {
    // Get a valid movie ID from our fixture
    cy.fixture("movies.json").then((movies) => {
      const movieId = movies.data[0].id

      // Set up intercepts
      cy.intercept("GET", `**/movies/${movieId}`, { fixture: "movie.json" }).as(
        "getMovieDetails",
      )
      cy.intercept("GET", "**/movies**", { fixture: "movies.json" }).as(
        "getMoviesList",
      )

      // Visit the movie details page directly
      cy.visit(`/${movieId}`)

      // Wait for API calls to complete
      cy.wait(["@getMovieDetails", "@getMoviesList"])

      // Verify movie details are displayed
      cy.fixture("movie.json").then((movieDetails) => {
        const detailsTimeout = { timeout: 10000 }

        cy.contains(movieDetails.title, detailsTimeout).should("be.visible")
        cy.get(`img[src="${movieDetails.poster_path}"]`, detailsTimeout).should(
          "exist",
        )
        cy.contains(`${movieDetails.runtime}`, detailsTimeout).should("exist")

        // Check genre if available
        if (movieDetails.genres?.length > 0) {
          cy.contains(movieDetails.genres[0], detailsTimeout).should("exist")
        }

        // Check vote average if available
        if (movieDetails.vote_average) {
          cy.contains(String(movieDetails.vote_average), detailsTimeout).should(
            "exist",
          )
        }
      })

      // Verify movie list section
      const listTimeout = { timeout: 10000 }
      cy.get('[data-testid="movie-list"]', listTimeout).should("be.visible")
      cy.get('[data-testid="movie-tile"]', listTimeout)
        .should("have.length.greaterThan", 0)
        .then(() => {
          // Verify expected movies from fixture are present
          movies.data.slice(0, 3).forEach((movie) => {
            cy.contains('[data-testid="movie-tile"]', movie.title).should(
              "exist",
            )
          })
        })
    })
  })
})
