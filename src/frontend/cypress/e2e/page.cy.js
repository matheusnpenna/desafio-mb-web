// https://on.cypress.io/api

describe('First page load', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Seja bem vindo(a)')
  })
})
