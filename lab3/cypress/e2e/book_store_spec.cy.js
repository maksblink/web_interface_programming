describe('Book Store App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('filters by author', () => {
    cy.get('#filter-author').type('Test{enter}');
    cy.get('[data-cy="book-item"]').should('have.length.at.least', 1);
  });

  it('navigates to Add Book page and back', () => {
    cy.contains('Add Book').click();
    cy.url().should('include', '/new');

    cy.contains('← Back to Library').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('filters by pages', () => {
    cy.get('#filter-pages-min').type('500{enter}');
    cy.get('[data-cy="book-item"]').should('have.length', 0);
  });

  it('filters by description', () => {
    cy.get('#filter-description').type('ddfdf{enter}');
    cy.get('[data-cy="book-item"]').should('have.length.at.least', 1);
  });

  it('adds a new book and checks if it appears', () => {
    cy.visit('http://localhost:5173/new');

    cy.get('input[placeholder="Author"]').type('Test Author');
    cy.get('input[placeholder="Title"]').type('Test Title');
    cy.get('input[placeholder="Price"]').type('9');
    cy.get('input[placeholder="Pages"]').type('123');
    cy.get('input[placeholder="Description"]').type('Test description');

    cy.get('form').submit();

    cy.wait(1000);
    cy.visit('http://localhost:5173/');
    cy.contains('Test Author').should('exist');
    cy.contains('Test Title').should('exist');
  });

  it('shows login button when logged out', () => {
    cy.contains('Sign in with Google').should('exist');
  });

it('deletes a book', () => {
  cy.visit('http://localhost:5173/');

  cy.get('#filter-author').clear();
  cy.get('#filter-description').clear();
  cy.get('#filter-pages-min').clear();
  cy.get('#filter-pages-max').clear();

  cy.contains('Test Title').should('exist');

  cy.contains('Test Title')
    .parents('[data-cy="book-item"]')
    .within(() => {
      cy.contains('Delete').click();
    });

  cy.contains('Test Title').should('not.exist');
});

it('adds a book to favorites', () => {
  cy.visit('http://localhost:5173/');

  cy.contains('🤍 Add to Favorites').first().click();

  cy.contains('❤️ Remove Favorite').should('exist');
});

it('removes a book from favorites', () => {
  cy.visit('http://localhost:5173/');

  cy.contains('❤️ Remove Favorite').first().click();

  cy.contains('🤍 Add to Favorites').should('exist');
});

});
