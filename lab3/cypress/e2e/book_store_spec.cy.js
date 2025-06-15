describe('page spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('Filter author', () => {
    cy.get('input').should('have.id', 'filter-author').first().type('a{enter}');
    cy.get('[id="book-list-item"]').should('have.id', 'book-list-item').its('length').then(count => {
      expect(count).to.equal(1);
    });
  });

  it('find add book button and go to add book site', () => {
    // added wait bc site was rerendering
    cy.wait(100);
    cy.get('a').first().should('have.text', 'Add Book').click();
    cy.wait(100);
    cy.url().should('eq', 'http://localhost:5173/new');
  })

  it('visit /new then go back to main site', () => {
    cy.wait(100);
    cy.get('a').first().should('have.text', 'Add Book').click();
    
    cy.wait(100);
    cy.get('a').eq(1).should('have.text', 'Library').click();
    cy.url().should('eq', 'http://localhost:5173/');

    cy.get('[id="book-list-item"]').should('have.id', 'book-list-item').its('length').then(count => {
      expect(count).to.equal(5);
    });
  });

  it('filter by pages', () => {
    cy.get('#filter-pages-min').type('10{enter}');
    cy.get('[id="book-list-item"]').should('not.exist');
  });

  it('filter by description', () => {
    cy.get('#filter-description').type('ddfdf{enter}');
    cy.get('[id="book-list-item"]').should('have.id', 'book-list-item').its('length').then(count => {
      expect(count).to.equal(1);
    });
  });
})