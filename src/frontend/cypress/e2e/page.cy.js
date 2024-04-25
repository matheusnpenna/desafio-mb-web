// https://on.cypress.io/api

describe('Page tests', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Seja bem vindo(a)')
  })

  it('fill fields correctly and click to register as PF', () => {
    // Step 1
    cy.visit('/')
    cy.get('#email').type('test@test.com')
    cy.get('[data-test-id="radio-input-pf"]').click()
    cy.get('button[type="submit"]').click()
    
    // Step 2
    cy.get('#name').type('Dev frontend test')
    cy.get('#document').type('03785850530')
    cy.get('#birth_date').type('14041995')
    cy.get('#phone').type('75991025971')
    cy.get('button[type="submit"]').click()
    
    // Step 3
    cy.get('#password').type('102030@Pass')
    cy.get('button[type="submit"]').click()

    // Step 4
    cy.get('button[type="submit"]').click()

    cy.contains('h1', 'Registro concluído')
  })

  it('fill fields correctly and click to register as PJ', () => {
    // Step 1
    cy.visit('/')
    cy.get('#email').type('test@test.com')
    cy.get('[data-test-id="radio-input-pj"]').click()
    cy.get('button[type="submit"]').click()
    
    // Step 2
    cy.get('#name').type('Dev frontend test')
    cy.get('#document').type('18213434000135')
    cy.get('#birth_date').type('14041995')
    cy.get('#phone').type('75991025971')
    cy.get('button[type="submit"]').click()
    
    // Step 3
    cy.get('#password').type('102030@Pass')
    cy.get('button[type="submit"]').click()

    // Step 4
    cy.get('button[type="submit"]').click()

    cy.contains('h1', 'Registro concluído')
  })
})
