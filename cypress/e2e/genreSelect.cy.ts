describe("Genre Selection", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("should display genres and allow selection", () => {
    const genres = ["All", "Documentary", "Comedy", "Horror", "Crime"]

    genres.forEach((genre) => {
      cy.contains(genre).should("be.visible")
    })

    cy.contains("All").should("have.class", "border-rose-400!")

    // Find the genre selector and verify it exists
    cy.contains("Comedy").should("be.visible")

    // Click on a genre and verify it gets selected
    cy.contains("Comedy").click()
    cy.contains("Comedy").should("have.class", "border-rose-400!")

    // Click on another genre
    cy.contains("Horror").click()
    cy.contains("Horror").should("have.class", "border-rose-400!")
    cy.contains("Comedy").should("not.have.class", "border-rose-400!")
  })
})
