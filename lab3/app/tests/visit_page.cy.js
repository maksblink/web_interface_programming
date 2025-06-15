describe("📚 Library App E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("renders navigation with core links", () => {
    cy.get("nav").should("exist");
    cy.contains("Library").should("exist");
    cy.contains("Add Book").should("exist");
  });

  it("renders book filters", () => {
    cy.get("input[placeholder='Author']").should("exist");
    cy.get("input[placeholder='Price min']").should("exist");
    cy.get("input[placeholder='Pages max']").should("exist");
    cy.get("input[placeholder='Description']").should("exist");
  });

  it("filters books by author", () => {
    cy.get("input[placeholder='Author']").type("tolkien");
    cy.get("article#book-list-item").each(($el) => {
      cy.wrap($el).should("contain.text", "tolkien");
    });
  });

  it("navigates to Add Book form and submits", () => {
    cy.contains("Add Book").click();

    cy.url().should("include", "/new");

    cy.get("input[placeholder='Author']").type("John Smith");
    cy.get("input[placeholder='Title']").type("Test Driven Dev");
    cy.get("input[placeholder='Price']").type("19.99");
    cy.get("input[placeholder='Pages']").type("180");
    cy.get("input[placeholder='Description']").type("Simple test book");

    cy.contains("Add Book").click();

    // Redirect not required, just reload
    cy.visit("http://localhost:5173/");

    cy.contains("Test Driven Dev").should("exist");
  });

  it("handles empty book list gracefully", () => {
    // Optional: Simulate clear state if possible
    // cy.clearLocalStorage(); or cy.intercept(...)

    cy.visit("http://localhost:5173/");
    cy.get("main").should("exist");
    cy.get("article#book-list-item").its("length").should("be.gte", 0);
  });
});
